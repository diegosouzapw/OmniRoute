import { test, expect } from "@playwright/test";

test.describe("Settings Toggles", () => {
  test("Debug mode toggle should work", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("domcontentloaded");

    await page.getByRole("tab", { name: "Advanced" }).click();

    const debugToggle = page.getByTestId("debug-mode-toggle");
    await expect(debugToggle).toBeVisible({ timeout: 10000 });

    await debugToggle.click();
    await expect(debugToggle).not.toBeChecked({ timeout: 5000 });
  });

  test("Sidebar visibility toggle should work", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("domcontentloaded");

    await page.getByRole("tab", { name: "Appearance" }).click();

    const sidebarToggle = page.getByTestId("sidebar-toggle-home");
    await expect(sidebarToggle).toBeVisible({ timeout: 10000 });

    await sidebarToggle.click();
    await expect(sidebarToggle).not.toBeChecked({ timeout: 5000 });
  });

  test("Debug mode should persist after page reload", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("domcontentloaded");

    await page.getByRole("tab", { name: "Advanced" }).click();

    const debugToggle = page.getByTestId("debug-mode-toggle");
    await expect(debugToggle).toBeVisible({ timeout: 10000 });

    await debugToggle.click();
    await expect(debugToggle).not.toBeChecked({ timeout: 5000 });

    await page.reload();
    await page.waitForLoadState("domcontentloaded");

    await page.getByRole("tab", { name: "Advanced" }).click();
    await expect(debugToggle).toBeVisible({ timeout: 10000 });
    await expect(debugToggle).not.toBeChecked({ timeout: 10000 });
  });
});
