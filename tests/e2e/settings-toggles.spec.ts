import { test, expect } from "@playwright/test";

test.describe("Settings Toggles", () => {
  test("Debug mode toggle should work", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("networkidle");
    await page.click("text=Advanced");

    const debugToggle = page.locator('[aria-label*="debug" i], [data-testid*="debug" i]').first();

    await expect(debugToggle).toBeVisible({ timeout: 5000 });

    const initialState = await debugToggle.isChecked();
    await debugToggle.click();
    await expect(debugToggle).not.toBeChecked({ timeout: 5000 });
  });

  test("Sidebar visibility toggle should work", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("networkidle");
    await page.click("text=General");

    const sidebarToggle = page
      .locator('[aria-label*="sidebar" i], [data-testid*="sidebar" i]')
      .first();

    await expect(sidebarToggle).toBeVisible({ timeout: 5000 });

    const initialState = await sidebarToggle.isChecked();
    await sidebarToggle.click();
    await expect(sidebarToggle).not.toBeChecked({ timeout: 5000 });
  });

  test("Debug mode should persist after page reload", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("networkidle");
    await page.click("text=Advanced");

    const debugToggle = page.locator('[aria-label*="debug" i], [data-testid*="debug" i]').first();

    await expect(debugToggle).toBeVisible({ timeout: 5000 });

    const wasChecked = await debugToggle.isChecked();
    await debugToggle.click();
    await expect(debugToggle).not.toBeChecked({ timeout: 5000 });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.click("text=Advanced");
    await expect(debugToggle).not.toBeChecked({ timeout: 5000 });
  });
});
