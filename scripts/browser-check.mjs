import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";

const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist", "--enable-unsafe-swiftshader"],
});
const report = [];
const errors = [];
await mkdir("artifacts", { recursive: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
page.on("pageerror", error => errors.push(error.message));
page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
try {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("heading", { level: 1 }).waitFor();
  await page.locator('canvas[data-scene-ready="true"]').waitFor({ timeout: 60000 });
  await page.waitForFunction(() => Number(document.querySelector("canvas")?.dataset.frame) > 3);
  const canvasSize = await page.locator("canvas").boundingBox();
  const stageSize = await page.locator(".scene-area").boundingBox();
  assert.ok(canvasSize.height >= stageSize.height - 5, "Canvas fills the hero stage");
  assert.equal(await page.locator("canvas").count(), 1);
  const markerBefore = await page.locator("canvas").getAttribute("data-route-marker");
  await page.waitForTimeout(400);
  assert.notEqual(await page.locator("canvas").getAttribute("data-route-marker"), markerBefore, "Route marker really moves in the scene");
  report.push("Real WebGL canvas mounted");
  await page.screenshot({ path: "artifacts/desktop-hero.png" });
  const cameraBefore = await page.locator("canvas").getAttribute("data-camera");
  await page.evaluate(() => window.scrollTo({ top: 400, behavior: "instant" }));
  await page.waitForTimeout(1200);
  assert.notEqual(await page.locator("canvas").getAttribute("data-camera"), cameraBefore);
  report.push("Camera changes on scroll");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.getByRole("button", { name: "Tạm dừng chuyển động 3D" }).click();
  await page.waitForTimeout(300);
  const frozen = await page.locator("canvas").getAttribute("data-frame");
  await page.waitForTimeout(400);
  assert.equal(await page.locator("canvas").getAttribute("data-frame"), frozen);
  report.push("Pause stops the render loop");
  await page.getByRole("button", { name: "Tiếp tục chuyển động 3D" }).click();
  await page.getByRole("tab", { name: "iMove Driver" }).click();
  await page.getByRole("tabpanel").getByRole("link", { name: "Khám phá iMove Driver" }).waitFor();
  await page.getByRole("tab", { name: "iMove Driver" }).press("ArrowRight");
  assert.equal(await page.getByRole("tab", { name: "iMove Merchant" }).getAttribute("aria-selected"), "true");
  await page.locator(".faq-item summary").first().click();
  assert.equal(await page.locator(".faq-item").first().getAttribute("open"), "");
  report.push("Tabs, keyboard navigation and FAQ work");

  for (const route of ["/gioi-thieu", "/dich-vu", "/tinh-nang", "/he-sinh-thai/user", "/he-sinh-thai/driver", "/he-sinh-thai/merchant", "/tai-ung-dung"]) {
    const response = await page.goto(base + route, { waitUntil: "networkidle" });
    assert.equal(response.status(), 200, route);
    await page.getByRole("heading", { level: 1 }).waitFor();
  }
  assert.equal(await page.locator(".app-download-card .store-button").count(), 6);
  await page.locator("#user").getByRole("button", { name: /App Store/ }).click();
  await page.getByRole("dialog").waitFor();
  await page.getByRole("button", { name: "Đóng thông tin" }).click();
  assert.equal(await page.getByRole("dialog").count(), 0);
  assert.equal(await page.locator(".qr-code svg").count(), 3);
  assert.equal(await page.locator('a[href*="play.google.com"],a[href*="apps.apple.com"]').count(), 0);
  report.push("All seven secondary routes, release dialog and website QR work; no unverified store links");

  await page.goto(base, { waitUntil: "networkidle" });
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.waitForTimeout(300);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, "overflow at " + width);
    await page.screenshot({ path: "artifacts/width-" + width + ".png" });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Mở menu" }).click();
  await page.getByRole("navigation", { name: "Điều hướng di động" }).waitFor();
  await page.getByRole("navigation", { name: "Điều hướng di động" }).press("Escape");
  assert.equal(await page.getByRole("button", { name: "Mở menu" }).getAttribute("aria-expanded"), "false");
  await page.getByRole("button", { name: "Mở menu" }).click();
  await page.locator(".header-cta").click();
  await page.waitForURL("**/tai-ung-dung");
  assert.equal(await page.getByRole("navigation", { name: "Điều hướng di động" }).count(), 0, "Header CTA closes the mobile menu on navigation");
  await page.getByRole("button", { name: "Mở menu" }).click();
  await page.locator(".site-header .brand").click();
  await page.waitForURL(base + "/");
  assert.equal(await page.getByRole("navigation", { name: "Điều hướng di động" }).count(), 0, "Logo closes the mobile menu on navigation");
  report.push("Responsive widths and mobile menu pass");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload({ waitUntil: "networkidle" });
  await page.locator('canvas[data-scene-ready="true"]').waitFor();
  await page.waitForTimeout(500);
  const still = await page.locator("canvas").getAttribute("data-frame");
  await page.waitForTimeout(500);
  assert.equal(await page.locator("canvas").getAttribute("data-frame"), still);
  assert.equal(await page.getByRole("button", { name: "Tạm dừng chuyển động 3D" }).count(), 0);
  const accessibility = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
  await writeFile("artifacts/accessibility.json", JSON.stringify(accessibility.violations, null, 2));
  assert.equal(accessibility.violations.length, 0, accessibility.violations.map(x => x.id + ": " + x.nodes.map(n => n.target.join(" ")).join(", ")).join("\n"));
  report.push("Reduced motion and accessibility audit pass");
  await page.screenshot({ path: "artifacts/mobile-full.png", fullPage: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: "artifacts/desktop-full.png", fullPage: true });

  const fallback = await context.newPage();
  await fallback.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (typeof type === "string" && type.startsWith("webgl")) return null;
      return original.call(this, type, ...args);
    };
  });
  await fallback.goto(base, { waitUntil: "networkidle" });
  await fallback.locator("[data-fallback]").waitFor();
  assert.equal(await fallback.getByRole("heading", { level: 1 }).count(), 1);
  await fallback.screenshot({ path: "artifacts/fallback.png" });
  await fallback.close();
  report.push("No-WebGL fallback preserves the page");
  const lostContextPage = await context.newPage();
  await lostContextPage.goto(base, { waitUntil: "networkidle" });
  await lostContextPage.locator('canvas[data-scene-ready="true"]').waitFor();
  await lostContextPage.evaluate(() => document.querySelector("canvas").getContext("webgl2").getExtension("WEBGL_lose_context").loseContext());
  await lostContextPage.locator("[data-fallback]").waitFor({ timeout: 3000 });
  await lostContextPage.close();
  report.push("Runtime WebGL context loss restores the fallback");
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log(report.join("\n"));
  await writeFile("artifacts/browser-report.json", JSON.stringify({ base, report, errors }, null, 2));
} catch (error) {
  await page.screenshot({ path: "artifacts/failure.png", fullPage: true }).catch(() => { });
  await writeFile("artifacts/browser-failure.json", JSON.stringify({ message: error.message, errors }, null, 2));
  throw error;
} finally {
  await browser.close();
}
