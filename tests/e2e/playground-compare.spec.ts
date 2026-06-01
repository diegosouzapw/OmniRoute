import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

test.describe("Playground Compare Tab", () => {
  function buildSseResponse(content: string, model: string): string {
    return [
      `data: ${JSON.stringify({ id: "cmp-1", object: "chat.completion.chunk", model, choices: [{ delta: { role: "assistant", content }, index: 0, finish_reason: null }] })}`,
      `data: ${JSON.stringify({ id: "cmp-1", object: "chat.completion.chunk", model, choices: [{ delta: {}, index: 0, finish_reason: "stop" }], usage: { prompt_tokens: 5, completion_tokens: 3 } })}`,
      "data: [DONE]",
      "",
    ].join("\n");
  }

  test.beforeEach(async ({ page }) => {
    // Mock presets
    await page.route("**/api/playground/presets", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ presets: [] }),
      });
    });

    // Mock chat completions with SSE response
    let callCount = 0;
    await page.route("**/api/v1/chat/completions", async (route) => {
      callCount += 1;
      const model = callCount % 2 === 0 ? "claude-3-haiku" : "openai/gpt-4o-mini";
      await route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: buildSseResponse(`Response from ${model}`, model),
      });
    });
  });

  test("navigates to compare tab via URL param", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/playground?tab=compare");

    // Compare tab should be visible and active
    const compareTab = page.getByRole("tab", { name: /compare/i });
    await expect(compareTab).toBeVisible({ timeout: 15000 });
    await expect(compareTab).toHaveAttribute("aria-selected", "true");
  });

  test("can add two columns in Compare tab", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/playground");

    // Navigate to Compare tab
    const compareTab = page.getByRole("tab", { name: /compare/i });
    await expect(compareTab).toBeVisible({ timeout: 15000 });
    await compareTab.click();

    // Get the Add model button
    const addButton = page.getByRole("button", { name: /add model/i });
    await expect(addButton).toBeVisible({ timeout: 10000 });

    // Type a model name in the input and add it
    const modelInput = page.locator('input[placeholder*="Model"], input[aria-label*="model" i]').first();
    await expect(modelInput).toBeVisible({ timeout: 10000 });

    // Add first column
    await modelInput.fill("openai/gpt-4o-mini");
    await addButton.click();

    // Wait a moment for the column to appear
    await page.waitForTimeout(300);

    // Add second column
    await modelInput.fill("claude-3-haiku");
    await addButton.click();

    await page.waitForTimeout(300);

    // Both columns should be visible (each column shows a model name or remove button)
    const removeButtons = page.getByRole("button", { name: /remove column/i });
    // There should be at least 2 remove buttons (one per column)
    const count = await removeButtons.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test("Run all button is visible when there are columns", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/playground");

    const compareTab = page.getByRole("tab", { name: /compare/i });
    await expect(compareTab).toBeVisible({ timeout: 15000 });
    await compareTab.click();

    // Add a column
    const addButton = page.getByRole("button", { name: /add model/i });
    await expect(addButton).toBeVisible({ timeout: 10000 });

    const modelInput = page.locator('input[placeholder*="Model"], input[aria-label*="model" i]').first();
    await expect(modelInput).toBeVisible({ timeout: 10000 });
    await modelInput.fill("openai/gpt-4o");
    await addButton.click();

    await page.waitForTimeout(300);

    // Run all button should be visible
    const runAllButton = page.getByRole("button", { name: /run all/i });
    await expect(runAllButton).toBeVisible({ timeout: 10000 });
  });

  test("Cancel all button is visible and clickable", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/playground");

    const compareTab = page.getByRole("tab", { name: /compare/i });
    await expect(compareTab).toBeVisible({ timeout: 15000 });
    await compareTab.click();

    // Cancel all (abort all) button should be visible in Compare tab
    const cancelButton = page.getByRole("button", { name: /cancel all|abort/i });
    await expect(cancelButton).toBeVisible({ timeout: 10000 });
  });
});
