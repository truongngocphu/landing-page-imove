import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
const page = await context.newPage();
const errors = [];
const results = [];
page.on("pageerror", error => errors.push(error.message));
await mkdir("artifacts", { recursive: true });
try {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Mở menu" }).click();
  await page.locator(".header-cta").click();
  await page.waitForURL("**/tai-ung-dung");
  assert.equal(await page.locator("#mobile-menu").count(), 0, "Header download CTA closes the mobile menu");
  await page.getByRole("button", { name: "Mở menu" }).click();
  await page.locator("header .brand").click();
  await page.waitForURL(base + "/");
  assert.equal(await page.locator("#mobile-menu").count(), 0, "Brand navigation closes the mobile menu");
  results.push("Persistent header links close the mobile menu");

  for (const route of ["/", "/gioi-thieu", "/dich-vu", "/tinh-nang", "/he-sinh-thai/user", "/he-sinh-thai/driver", "/he-sinh-thai/merchant", "/tai-ung-dung"]) {
    const response = await page.goto(base + route, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200, route);
    assert.equal(await page.getByRole("heading", { level: 1 }).count(), 1, "Single page heading " + route);
    assert.equal(await page.locator("footer").count(), 1, "Single footer " + route);
    for (const [width, height] of [[390, 844], [768, 900], [1440, 1000], [844, 390]]) {
      await page.setViewportSize({ width, height });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "No overflow " + route + " " + width);
    }
    await page.setViewportSize({ width: 390, height: 844 });
    const audit = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
    const violations = audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) }));
    await writeFile("artifacts/accessibility-" + (route === "/" ? "home" : route.slice(1).replaceAll("/", "-")) + ".json", JSON.stringify(violations, null, 2));
    assert.equal(violations.length, 0, route + " " + JSON.stringify(violations));
    results.push(route + ": responsive, unique content and axe pass");
  }
  await page.goto(base + "/he-sinh-thai/not-an-app", { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: /Đường này chưa có/ }).waitFor();
  await page.goto(base + "/not-a-real-page", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Về trang chủ" }).click();
  await page.waitForURL(base + "/");
  results.push("Unknown routes show usable 404 recovery");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "artifacts/mobile-page.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "artifacts/preview.png" });
  assert.deepEqual(errors, []);
  await writeFile("artifacts/navigation-report.json", JSON.stringify({ base, results, errors }, null, 2));
  console.log(results.join("\n"));
} finally {
  await browser.close();
}
