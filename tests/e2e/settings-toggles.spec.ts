import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

test.describe("Settings Toggles", () => {
  const waitForSettingsShell = async (page) => {
    await expect(page.getByRole("tab", { name: /general/i }).first()).toBeVisible({
      timeout: 15000,
    });
  };

  const getDebugToggle = (page) =>
    page
      .getByText(/enable debug mode/i)
      .locator('xpath=ancestor::div[contains(@class, "flex items-center justify-between")][1]')
      .getByRole("switch");

  const getSidebarVisibilityToggle = (page, itemLabel: string) =>
    page
      .getByRole("tabpanel", { name: /appearance/i })
      .getByText(new RegExp(`^${itemLabel}$`, "i"))
      .locator('xpath=ancestor::div[contains(@class, "flex items-center justify-between")][1]')
      .getByRole("switch");

  const waitForSettingsPatch = (page) =>
    page.waitForResponse(
      (response) =>
        response.url().includes("/api/settings") &&
        response.request().method() === "PATCH" &&
        response.ok()
    );

  test("Debug mode toggle should work", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/settings");
    await waitForSettingsShell(page);
    await page.getByRole("tab", { name: /advanced/i }).click();

    const debugToggle = getDebugToggle(page);

    await expect(debugToggle).toBeVisible({ timeout: 15000 });
    await expect(debugToggle).toBeEnabled({ timeout: 15000 });

    const initialState = await debugToggle.getAttribute("aria-checked");
    await Promise.all([waitForSettingsPatch(page), debugToggle.click()]);
    await expect(debugToggle).toHaveAttribute(
      "aria-checked",
      initialState === "true" ? "false" : "true",
      { timeout: 15000 }
    );
  });

  test("Sidebar visibility toggle should work", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/settings");
    await waitForSettingsShell(page);
    await page.getByRole("tab", { name: /appearance/i }).click();

    const sidebarToggle = getSidebarVisibilityToggle(page, "Health");

    await expect(sidebarToggle).toBeVisible({ timeout: 15000 });

    const initialState = await sidebarToggle.getAttribute("aria-checked");
    await Promise.all([waitForSettingsPatch(page), sidebarToggle.click()]);
    await expect(sidebarToggle).toHaveAttribute(
      "aria-checked",
      initialState === "true" ? "false" : "true",
      { timeout: 15000 }
    );
  });

  test("Clear Cache button calls DELETE /api/cache", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/settings");
    await waitForSettingsShell(page);
    await page.getByRole("tab", { name: /general/i }).click();

    const clearBtn = page.getByRole("button", { name: /clear cache/i });
    await expect(clearBtn).toBeVisible({ timeout: 15000 });

    const [request] = await Promise.all([
      page.waitForRequest((req) => req.url().includes("/api/cache") && req.method() === "DELETE"),
      clearBtn.click(),
    ]);
    expect(request).toBeTruthy();
  });

  test("Purge Expired Logs button calls POST /api/settings/purge-logs", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/settings");
    await waitForSettingsShell(page);
    await page.getByRole("tab", { name: /general/i }).click();

    const purgeBtn = page.getByRole("button", { name: /purge expired logs/i });
    await expect(purgeBtn).toBeVisible({ timeout: 15000 });

    const [request] = await Promise.all([
      page.waitForRequest(
        (req) => req.url().includes("/api/settings/purge-logs") && req.method() === "POST"
      ),
      purgeBtn.click(),
    ]);
    expect(request).toBeTruthy();
  });

  test("Debug mode should persist after page reload", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/settings");
    await waitForSettingsShell(page);
    await page.getByRole("tab", { name: /advanced/i }).click();

    const debugToggle = getDebugToggle(page);

    await expect(debugToggle).toBeVisible({ timeout: 15000 });
    await expect(debugToggle).toBeEnabled({ timeout: 15000 });

    const initialState = await debugToggle.getAttribute("aria-checked");
    await Promise.all([waitForSettingsPatch(page), debugToggle.click()]);
    const nextState = initialState === "true" ? "false" : "true";
    await expect(debugToggle).toHaveAttribute("aria-checked", nextState, { timeout: 15000 });
    await page.reload();
    await waitForSettingsShell(page);
    await page.getByRole("tab", { name: /advanced/i }).click();
    const reloadedToggle = getDebugToggle(page);
    await expect(reloadedToggle).toBeEnabled({ timeout: 15000 });
    await expect(reloadedToggle).toHaveAttribute("aria-checked", nextState, {
      timeout: 15000,
    });
  });
});
