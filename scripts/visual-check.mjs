import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const context = await browser.newContext({ reducedMotion: "reduce" });
const page = await context.newPage();
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3002";
const facts = [];
await mkdir("artifacts", { recursive: true });
try {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(base, { waitUntil: "networkidle" });
    await page.locator('canvas[data-scene-ready="true"]').waitFor();
    await page.screenshot({ path: `artifacts/final-${width}-hero.png` });
    assert.equal(await page.locator("main h1").count(), 1);
    assert.equal(await page.locator("main .hero").count(), 1);
    for (const [name, selector] of [["ecosystem", "#he-sinh-thai"], ["downloads", ".download-section"], ["faq", "#cau-hoi"], ["footer", ".site-footer"]]) {
      await page.locator(selector).scrollIntoViewIfNeeded();
      await page.locator(selector).screenshot({ path: `artifacts/final-${width}-${name}.png`, style: ".site-header,.skip-link { visibility: hidden !important; }" });
    }
    const icons = await page.locator(".ecosystem-visual .lucide").evaluateAll((elements) => elements.map((element) => ({ width: element.getBoundingClientRect().width, height: element.getBoundingClientRect().height })));
    assert.ok(icons.every((icon) => icon.width < 35 && icon.height < 35), "App preview icons retain their intended size");
    facts.push({ width, height: await page.evaluate(() => document.documentElement.scrollHeight), heroCount: 1, icons });
  }
  for (const route of ["/gioi-thieu", "/dich-vu", "/tinh-nang", "/he-sinh-thai/user", "/he-sinh-thai/driver", "/he-sinh-thai/merchant", "/tai-ung-dung"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(base + route, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route);
    await page.screenshot({ path: `artifacts/final-${route.replaceAll("/", "-")}.png` });
  }
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto(base, { waitUntil: "networkidle" });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "Landscape overflow");
  await writeFile("artifacts/visual-report.json", JSON.stringify({ base, facts, landscape: "pass", mobileRoutes: 7 }, null, 2));
  console.log("Production screenshots checked at 390/1440px, mobile secondary routes and landscape; one hero and correctly sized icons.");
} finally { await browser.close(); }
