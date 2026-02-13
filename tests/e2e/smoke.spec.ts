import { test, expect } from "@playwright/test";

test.describe("Smoke — Static Pages", () => {
  test("landing page renders", async ({ page }) => {
    await page.goto("/landing");
    await expect(page).toHaveTitle(/OmniRoute/i);
    const hero = page.locator("h1").first();
    await expect(hero).toBeVisible();
  });

  test("/terms page renders all sections", async ({ page }) => {
    await page.goto("/terms");
    await expect(page).toHaveTitle(/Terms of Service/i);
    await expect(page.locator("h1")).toContainText("Terms of Service");
    // Verify at least 4 section headings
    const headings = page.locator("h2");
    await expect(headings).toHaveCount(6);
  });

  test("/privacy page renders all sections", async ({ page }) => {
    await page.goto("/privacy");
    await expect(page).toHaveTitle(/Privacy Policy/i);
    await expect(page.locator("h1")).toContainText("Privacy Policy");
    const headings = page.locator("h2");
    await expect(headings).toHaveCount(7);
  });

  test("back link on /terms navigates home", async ({ page }) => {
    await page.goto("/terms");
    const backLink = page.locator('a[href="/"]').first();
    await expect(backLink).toBeVisible();
  });
});
