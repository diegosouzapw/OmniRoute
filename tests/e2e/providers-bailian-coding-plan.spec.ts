import { expect, test } from "@playwright/test";

const DEFAULT_BAILIAN_URL = "https://coding-intl.dashscope.aliyuncs.com/apps/anthropic/v1";

test.describe("Bailian Coding Plan Provider", () => {
  test.describe.configure({ mode: "serial" });

  test("default URL visible and editable in Add API Key modal", async ({ page }) => {
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

    await page.goto("/dashboard/providers/bailian-coding-plan");
    await page.waitForLoadState("networkidle");

    const redirectedToLogin = page.url().includes("/login");
    test.skip(redirectedToLogin, "Authentication enabled without a login fixture.");

    const addKeyButton = page.getByRole("button", {
      name: /add.*api.*key|add.*key|add.*connection|connect/i,
    });

    if (
      await addKeyButton
        .first()
        .isVisible({ timeout: 5000 })
        .catch(() => false)
    ) {
      await addKeyButton.first().click();
    }

    const dialog = page.getByRole("dialog").first();
    await expect(dialog).toBeVisible({ timeout: 10000 });

    const baseUrlInput = dialog
      .getByLabel(/base.*url/i)
      .or(dialog.locator("input").filter({ has: page.locator("..").getByText(/base.*url/i) }));

    await expect(baseUrlInput).toBeVisible({ timeout: 5000 });

    const inputValue = await baseUrlInput.inputValue();
    expect(inputValue).toBe(DEFAULT_BAILIAN_URL);

    const nameInput = dialog.getByLabel(/name/i).or(dialog.locator("input").first());
    await nameInput.fill("Test Bailian Connection");

    const apiKeyInput = dialog
      .getByLabel(/api.*key/i)
      .or(dialog.locator('input[type="password"]').first());
    await apiKeyInput.fill("test-api-key-12345");

    const customUrl = "https://custom.example.com/anthropic/v1";
    await baseUrlInput.fill(customUrl);

    const saveButton = dialog
      .getByRole("button", {
        name: /save|add|create|connect/i,
      })
      .last();
    await expect(saveButton).toBeEnabled({ timeout: 5000 });
    await saveButton.click();

    await expect(dialog)
      .toBeHidden({ timeout: 10000 })
      .catch(() => undefined);

    expect(capturedPayloads.createProvider).toBeDefined();
    const payload = capturedPayloads.createProvider;
    expect(payload?.providerSpecificData).toBeDefined();
    expect((payload?.providerSpecificData as Record<string, unknown>)?.baseUrl).toBe(customUrl);
  });

  test("invalid URL blocks save with validation error", async ({ page }) => {
    let validationErrorCaptured = false;
    let createAttempted = false;

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
        createAttempted = true;
        await route.fulfill({
          status: 400,
          contentType: "application/json",
          body: JSON.stringify({
            message: "Invalid request",
            details: [
              {
                field: "providerSpecificData.baseUrl",
                message: "providerSpecificData.baseUrl must be a valid URL",
              },
            ],
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

    await page.goto("/dashboard/providers/bailian-coding-plan");
    await page.waitForLoadState("networkidle");

    const redirectedToLogin = page.url().includes("/login");
    test.skip(redirectedToLogin, "Authentication enabled without a login fixture.");

    const addKeyButton = page.getByRole("button", {
      name: /add.*api.*key|add.*key|add.*connection|connect/i,
    });

    if (
      await addKeyButton
        .first()
        .isVisible({ timeout: 5000 })
        .catch(() => false)
    ) {
      await addKeyButton.first().click();
    }

    const dialog = page.getByRole("dialog").first();
    await expect(dialog).toBeVisible({ timeout: 10000 });

    const baseUrlInput = dialog
      .getByLabel(/base.*url/i)
      .or(dialog.locator("input").filter({ has: page.locator("..").getByText(/base.*url/i) }));
    await expect(baseUrlInput).toBeVisible({ timeout: 5000 });

    const nameInput = dialog.getByLabel(/name/i).or(dialog.locator("input").first());
    await nameInput.fill("Test Invalid URL Connection");

    const apiKeyInput = dialog
      .getByLabel(/api.*key/i)
      .or(dialog.locator('input[type="password"]').first());
    await apiKeyInput.fill("test-api-key-12345");

    await baseUrlInput.fill("not-a-url");

    const saveButton = dialog
      .getByRole("button", {
        name: /save|add|create|connect/i,
      })
      .last();
    await saveButton.click();

    const errorLocator = page
      .locator("text=/invalid.*url|url.*invalid|must be a valid url/i")
      .or(
        page
          .locator(".text-red-500")
          .or(page.locator('[class*="error"]').or(page.locator('[class*="text-destructive"]')))
      );

    await page.waitForTimeout(1000);

    const errorVisible = await errorLocator.isVisible({ timeout: 5000 }).catch(() => false);

    if (!errorVisible) {
      await page.waitForTimeout(2000);
      const modalStillOpen = await dialog.isVisible();
      if (modalStillOpen) {
        validationErrorCaptured = true;
      }
    }

    expect(errorVisible).toBe(true);
    expect(createAttempted).toBe(false);
  });
});
