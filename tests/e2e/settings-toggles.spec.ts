import { test, expect } from "@playwright/test";

test.describe("Settings Toggles", () => {
  test("Debug mode toggle should work", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("networkidle");

    await page.click("text=Advanced");
    await page.waitForTimeout(500);

    const debugToggle = page.locator('[data-testid="debug-mode-toggle"]');
    await expect(debugToggle).toBeVisible({ timeout: 10000 });

    await debugToggle.click();
    await expect(debugToggle).not.toBeChecked({ timeout: 5000 });
  });

  test("Sidebar visibility toggle should work", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("networkidle");

    await page.click("text=Appearance");
    await page.waitForTimeout(500);

    const sidebarToggle = page.locator('[data-testid="sidebar-toggle-home"]').first();
    await expect(sidebarToggle).toBeVisible({ timeout: 10000 });

    await sidebarToggle.click();
    await expect(sidebarToggle).not.toBeChecked({ timeout: 5000 });
  });

  test("Debug mode should persist after page reload", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("networkidle");

    await page.click("text=Advanced");
    await page.waitForTimeout(500);

    const debugToggle = page.locator('[data-testid="debug-mode-toggle"]');
    await expect(debugToggle).toBeVisible({ timeout: 10000 });

    await debugToggle.click();
    await expect(debugToggle).not.toBeChecked({ timeout: 5000 });

    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.click("text=Advanced");
    await page.waitForTimeout(500);
    await expect(debugToggle).not.toBeChecked({ timeout: 10000 });
  });
});
