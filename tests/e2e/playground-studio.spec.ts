import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

test.describe("Playground Studio", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the playground presets API so it does not require DB
    await page.route("**/api/playground/presets", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ presets: [] }),
      });
    });

    // Mock /v1/chat/completions with a streaming response for the Chat tab test
    await page.route("**/api/v1/chat/completions", async (route) => {
      const sseBody = [
        `data: ${JSON.stringify({ id: "chatcmpl-1", object: "chat.completion.chunk", model: "test-model", choices: [{ delta: { role: "assistant", content: "Hello" }, index: 0, finish_reason: null }] })}`,
        `data: ${JSON.stringify({ id: "chatcmpl-1", object: "chat.completion.chunk", model: "test-model", choices: [{ delta: { content: ", world!" }, index: 0, finish_reason: null }] })}`,
        `data: ${JSON.stringify({ id: "chatcmpl-1", object: "chat.completion.chunk", model: "test-model", choices: [{ delta: {}, index: 0, finish_reason: "stop" }], usage: { prompt_tokens: 10, completion_tokens: 5 } })}`,
        "data: [DONE]",
        "",
      ].join("\n");

      await route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: sseBody,
      });
    });
  });

  test("loads page and shows 4 tabs", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/playground");

    // Wait for the playground page to load
    await expect(page.locator("body")).toBeVisible();

    // The Studio should render 4 tabs in a tablist
    const tablist = page.getByRole("tablist").first();
    await expect(tablist).toBeVisible({ timeout: 15000 });

    // Check that all 4 tabs are present
    const chatTab = page.getByRole("tab", { name: /chat/i });
    const compareTab = page.getByRole("tab", { name: /compare/i });
    const apiTab = page.getByRole("tab", { name: /api/i });
    const buildTab = page.getByRole("tab", { name: /build/i });

    await expect(chatTab).toBeVisible({ timeout: 15000 });
    await expect(compareTab).toBeVisible({ timeout: 15000 });
    await expect(apiTab).toBeVisible({ timeout: 15000 });
    await expect(buildTab).toBeVisible({ timeout: 15000 });
  });

  test("switches to Compare tab and shows Add model button", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/playground");

    // Wait for tabs
    const compareTab = page.getByRole("tab", { name: /compare/i });
    await expect(compareTab).toBeVisible({ timeout: 15000 });

    // Click Compare tab
    await compareTab.click();

    // The Compare tab should show an "Add model" button
    const addModelButton = page.getByRole("button", { name: /add model/i });
    await expect(addModelButton).toBeVisible({ timeout: 10000 });
  });

  test("switches from Compare back to Chat tab", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/playground");

    const compareTab = page.getByRole("tab", { name: /compare/i });
    await expect(compareTab).toBeVisible({ timeout: 15000 });

    // Go to Compare
    await compareTab.click();

    // Go back to Chat
    const chatTab = page.getByRole("tab", { name: /chat/i });
    await chatTab.click();

    // Chat tab should be active
    await expect(chatTab).toHaveAttribute("aria-selected", "true");
  });

  test("Chat tab renders a message send area", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/playground");

    // Wait for the studio to load
    const chatTab = page.getByRole("tab", { name: /chat/i });
    await expect(chatTab).toBeVisible({ timeout: 15000 });

    // Chat tab should have a message input / send area
    const textarea = page
      .locator("textarea")
      .filter({ hasText: "" })
      .first();
    await expect(textarea).toBeVisible({ timeout: 10000 });
  });
});
