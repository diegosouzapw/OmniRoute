import { expect, test } from "@playwright/test";

const a11yRoutes = [
  "/400",
  "/401",
  "/403",
  "/408",
  "/429",
  "/500",
  "/502",
  "/503",
  "/offline",
  "/maintenance",
  "/status",
  "/route-that-does-not-exist",
];

test.describe("A11y — Resilience Routes", () => {
  for (const route of a11yRoutes) {
    test(`${route} exposes semantic main landmark and heading`, async ({ page }) => {
      await page.goto(route);

      const mainLandmarks = page.locator("main, [role='main']");
      await expect(mainLandmarks).toHaveCount(1);

      const h1s = page.locator("h1");
      await expect(h1s).toHaveCount(1);

      const actionableControls = page.locator("a[href], button");
      await expect(actionableControls.first()).toBeVisible();
    });
  }

  test("keyboard navigation reaches first actionable element on error page", async ({ page }) => {
    await page.goto("/500");

    await page.keyboard.press("Tab");
    const activeTag = await page.evaluate(
      () => document.activeElement?.tagName?.toLowerCase() || null
    );

    expect(activeTag).not.toBeNull();
    expect(["a", "button"]).toContain(activeTag as string);
  });

  test("status page exposes live region during loading or status section after load", async ({
    page,
  }) => {
    await page.goto("/status");

    const liveRegion = page.locator("[role='status']");
    const statusSection = page.getByText("Provider Circuit Breaker State");

    const hasLiveRegion = (await liveRegion.count()) > 0;
    const hasStatusSection = (await statusSection.count()) > 0;

    expect(hasLiveRegion || hasStatusSection).toBeTruthy();
  });
});
