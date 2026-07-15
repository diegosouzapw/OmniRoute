// @ts-check
import { test, expect } from "@playwright/test";

/**
 * Visual regression snapshots for key dashboard pages.
 *
 * Run: npx playwright test --config tests/visual/playwright.config.ts
 *
 * Update snapshots: npx playwright test --config tests/visual/playwright.config.ts --update-snapshots
 */

const BASE_URL = process.env.VISUAL_BASE_URL || "http://localhost:8080";

const SNAPSHOT_PAGES = [
  { path: "/", name: "dashboard-home" },
  { path: "/endpoint", name: "endpoint" },
  { path: "/settings", name: "settings" },
];

test.describe("Visual Regression", () => {
  SNAPSHOT_PAGES.forEach(({ path, name }) => {
    test(`${name} - matches snapshot`, async ({ page }) => {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle" });
      await page.waitForTimeout(1000); // Let any animations settle

      // Full page screenshot
      await expect(page).toHaveScreenshot(`${name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.02, // Allow 2% diff for antialiasing
      });
    });
  });

  test("dark theme matches snapshot", async ({ page }) => {
    // Toggle dark mode via localStorage
    await page.goto(BASE_URL, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("dashboard-dark.png", {
      fullPage: true,
      maxDiffPixelRatio: 0.02,
    });
  });
});
