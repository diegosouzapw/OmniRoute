import { test, expect } from "@playwright/test";

test.describe("Settings Toggles", () => {
  test("Debug mode toggle should work", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("networkidle");
    await page.getByRole("tab", { name: /advanced/i }).click();

    const debugToggle = page.getByRole("switch").first();

    await expect(debugToggle).toBeVisible({ timeout: 5000 });

    const initialState = await debugToggle.getAttribute("aria-checked");
    await debugToggle.click();
    await expect(debugToggle).toHaveAttribute(
      "aria-checked",
      initialState === "true" ? "false" : "true",
      { timeout: 5000 }
    );
  });

  test("Sidebar visibility toggle should work", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("networkidle");
    await page.getByRole("tab", { name: /appearance/i }).click();

    const sidebarToggle = page.getByRole("switch").first();

    await expect(sidebarToggle).toBeVisible({ timeout: 5000 });

    const initialState = await sidebarToggle.getAttribute("aria-checked");
    await sidebarToggle.click();
    await expect(sidebarToggle).toHaveAttribute(
      "aria-checked",
      initialState === "true" ? "false" : "true",
      { timeout: 5000 }
    );
  });

  test("Debug mode should persist after page reload", async ({ page }) => {
    await page.goto("/dashboard/settings");
    await page.waitForLoadState("networkidle");
    await page.getByRole("tab", { name: /advanced/i }).click();

    const debugToggle = page.getByRole("switch").first();

    await expect(debugToggle).toBeVisible({ timeout: 5000 });

    const initialState = await debugToggle.getAttribute("aria-checked");
    await debugToggle.click();
    const nextState = initialState === "true" ? "false" : "true";
    await expect(debugToggle).toHaveAttribute("aria-checked", nextState, { timeout: 5000 });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.getByRole("tab", { name: /advanced/i }).click();
    await expect(debugToggle).toHaveAttribute("aria-checked", nextState, { timeout: 5000 });
  });
});
