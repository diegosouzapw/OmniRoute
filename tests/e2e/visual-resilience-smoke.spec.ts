import { expect, test } from "@playwright/test";

const visualRoutes = ["/400", "/500", "/status", "/offline", "/maintenance"];

test.describe("Visual Smoke — Resilience Routes", () => {
  for (const route of visualRoutes) {
    test(`${route} renders stable viewport without horizontal overflow`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(route);

      const screenshotBuffer = await page.screenshot({ fullPage: false });
      expect(screenshotBuffer.byteLength).toBeGreaterThan(10_000);

      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1
      );
      expect(hasOverflow).toBeFalsy();
    });
  }
});
