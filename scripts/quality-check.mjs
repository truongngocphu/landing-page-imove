import { chromium } from "@playwright/test";
import assert from "node:assert/strict";

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});
const base = process.env.TEST_BASE_URL ?? "http://127.0.0.1:3000";
const failures = [];
try {
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, reducedMotion: "reduce" });
  const mobile = await mobileContext.newPage();
  await mobile.goto(base, { waitUntil: "networkidle" });
  await mobile.locator('canvas[data-scene-ready="true"]').waitFor();
  const ratio = await mobile.locator("canvas").evaluate(canvas => canvas.width / canvas.clientWidth);
  if (ratio > 1.05) failures.push("Mobile WebGL DPR must be capped at 1; got " + ratio.toFixed(2));
  await mobileContext.close();

  const restrictedContext = await browser.newContext();
  const restricted = await restrictedContext.newPage();
  const errors = [];
  restricted.on("pageerror", error => errors.push(error.message));
  await restricted.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (type, ...args) {
      if (typeof type === "string" && type.startsWith("webgl")) throw new DOMException("WebGL denied", "SecurityError");
      return original.call(this, type, ...args);
    };
  });
  await restricted.goto(base, { waitUntil: "networkidle" });
  if (errors.length) failures.push("WebGL capability denial must fall back without crashing: " + errors.join(", "));
  if (!(await restricted.locator("[data-fallback]").count())) failures.push("Restricted WebGL must preserve the illustrative fallback");
  await restrictedContext.close();
  assert.deepEqual(failures, []);
  console.log("Mobile DPR is capped at 1, including high-density screens");
  console.log("Denied WebGL context preserves the page without runtime errors");
} finally {
  await browser.close();
}
