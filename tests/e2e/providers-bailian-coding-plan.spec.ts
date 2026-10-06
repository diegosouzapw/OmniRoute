import { expect, test } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

// #7882 replaced this provider's free-text Base URL field with a region step:
// the endpoint is now derived from the choice ("global-sg" ->
// token-plan.ap-southeast-1.maas.aliyuncs.com, "china-beijing" ->
// token-plan.cn-beijing.maas.aliyuncs.com,
// see src/shared/constants/alibabaProviderRegions.ts), so the modal persists
// providerSpecificData.region instead of a baseUrl. A per-connection base-URL
// override still exists, but it moved to Advanced in the edit-connection modal.

test.describe("Bailian Coding Plan Provider", () => {
  test.describe.configure({ mode: "serial" });

  test("region step persists the international (Singapore) choice", async ({ page }) => {
    const capturedPayloads: { createProvider?: Record<string, unknown> } = {};

    await page.route("**/api/providers", async (route) => {
      const method = route.request().method();
      if (method === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ connections: [] }),
        });
        return;
      }

      if (method === "POST") {
        const payload = route.request().postDataJSON();
        capturedPayloads.createProvider = payload;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            connection: {
              id: "conn-bailian-test",
              provider: "bailian-coding-plan",
              name: payload.name || "Test Connection",
              testStatus: "active",
              providerSpecificData: payload.providerSpecificData,
            },
          }),
        });
        return;
      }

      await route.fulfill({ status: 405 });
    });

    await page.route("**/api/providers/validate", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ valid: true }),
      });
    });

    await page.route("**/api/provider-nodes", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ nodes: [] }),
      });
    });

    await gotoDashboardRoute(page, "/dashboard/providers/bailian-coding-plan");
    await page.waitForLoadState("domcontentloaded");

    // Dismiss any pre-existing dialog/overlay that may appear on page load
    const preExistingDialog = page.getByRole("dialog").first();
    if (await preExistingDialog.isVisible({ timeout: 2000 }).catch(() => false)) {
      await page.keyboard.press("Escape");
      await preExistingDialog.waitFor({ state: "hidden", timeout: 3000 }).catch(() => {});
    }

    const addKeyButton = page.getByRole("button", {
      name: /add.*api.*key|add.*key|add.*connection|connect|adicionar.*chave/i,
    });

    // Wait for the button to appear instead of immediately checking visibility
    await addKeyButton.first().waitFor({ state: "visible", timeout: 15000 });
    await expect(addKeyButton.first()).toBeEnabled({ timeout: 5000 });
    await addKeyButton.first().click();

    const dialog = page.getByRole("dialog").first();
    await expect(dialog).toBeVisible({ timeout: 10000 });

    const regionStep = dialog.getByTestId("alibaba-region-step");
    await expect(regionStep).toBeVisible({ timeout: 15000 });
    await expect(regionStep.locator("[data-region]")).toHaveCount(2);
    await regionStep.locator('[data-region="global-sg"]').click();

    const nameInput = dialog.getByLabel(/name/i).or(dialog.locator("input").first());
    await nameInput.fill("Test Bailian Connection");

    const apiKeyInput = dialog
      .getByLabel(/api.*key/i)
      .or(dialog.locator('input[type="password"]').first());
    await apiKeyInput.fill("test-api-key-12345");

    const saveButton = dialog
      .getByRole("button", {
        name: /save|add|create|connect/i,
      })
      .last();
    await expect(saveButton).toBeEnabled({ timeout: 15000 });
    await saveButton.click();

    await expect(dialog)
      .toBeHidden({ timeout: 10000 })
      .catch(() => undefined);

    expect(capturedPayloads.createProvider).toBeDefined();
    const payload = capturedPayloads.createProvider;
    expect(payload?.providerSpecificData).toBeDefined();
    expect((payload?.providerSpecificData as Record<string, unknown>)?.region).toBe("global-sg");
  });

  // The old "invalid URL blocks save" case tested client-side validation of the
  // free-text Base URL field, which #7882 removed for this provider — an invalid
  // URL is no longer reachable from this modal. Replaced with the other half of
  // the region contract: the China-mainland choice must persist as typed, since
  // that is what selects the token-plan.cn-beijing.maas.aliyuncs.com endpoint.
  test("region step persists the China-mainland (Beijing) choice", async ({ page }) => {
    const capturedPayloads: { createProvider?: Record<string, unknown> } = {};

    await page.route("**/api/providers", async (route) => {
      const method = route.request().method();
      if (method === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ connections: [] }),
        });
        return;
      }

      if (method === "POST") {
        const payload = route.request().postDataJSON();
        capturedPayloads.createProvider = payload;
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            connection: {
              id: "conn-bailian-cn",
              provider: "bailian-coding-plan",
              name: payload.name || "Test Connection",
              testStatus: "active",
              providerSpecificData: payload.providerSpecificData,
            },
          }),
        });
        return;
      }

      await route.fulfill({ status: 405 });
    });

    await page.route("**/api/providers/validate", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ valid: true }),
      });
    });

    await page.route("**/api/provider-nodes", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ nodes: [] }),
      });
    });

    await gotoDashboardRoute(page, "/dashboard/providers/bailian-coding-plan");
    await page.waitForLoadState("domcontentloaded");

    // Dismiss any pre-existing dialog/overlay that may appear on page load
    const preExistingDialog = page.getByRole("dialog").first();
    if (await preExistingDialog.isVisible({ timeout: 2000 }).catch(() => false)) {
      await page.keyboard.press("Escape");
      await preExistingDialog.waitFor({ state: "hidden", timeout: 3000 }).catch(() => {});
    }

    const addKeyButton = page.getByRole("button", {
      name: /add.*api.*key|add.*key|add.*connection|connect|adicionar.*chave/i,
    });

    // Wait for the button to appear instead of immediately checking visibility
    await addKeyButton.first().waitFor({ state: "visible", timeout: 15000 });
    await expect(addKeyButton.first()).toBeEnabled({ timeout: 5000 });
    await addKeyButton.first().click();

    const dialog = page.getByRole("dialog").first();
    await expect(dialog).toBeVisible({ timeout: 10000 });

    const regionStep = dialog.getByTestId("alibaba-region-step");
    await expect(regionStep).toBeVisible({ timeout: 15000 });
    await regionStep.locator('[data-region="china-beijing"]').click();

    const nameInput = dialog.getByLabel(/name/i).or(dialog.locator("input").first());
    await nameInput.fill("Test Bailian CN Connection");

    const apiKeyInput = dialog
      .getByLabel(/api.*key/i)
      .or(dialog.locator('input[type="password"]').first());
    await apiKeyInput.fill("test-api-key-12345");

    const saveButton = dialog
      .getByRole("button", {
        name: /save|add|create|connect/i,
      })
      .last();
    await expect(saveButton).toBeEnabled({ timeout: 15000 });
    await saveButton.click();

    await expect(dialog)
      .toBeHidden({ timeout: 10000 })
      .catch(() => undefined);

    expect(capturedPayloads.createProvider).toBeDefined();
    const payload = capturedPayloads.createProvider;
    expect(payload?.providerSpecificData).toBeDefined();
    expect((payload?.providerSpecificData as Record<string, unknown>)?.region).toBe(
      "china-beijing"
    );
  });
});
