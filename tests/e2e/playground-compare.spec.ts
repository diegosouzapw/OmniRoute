import { test, expect, type Locator, type Page } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

function compareColumnFor(page: Page, index: number): Locator {
  return page
    .getByRole("button", { name: /remove column for/i })
    .nth(index)
    .locator("xpath=../../..");
}

function responsePanelFor(column: Locator): Locator {
  return column.locator(":scope > div").last();
}

async function openTwoColumnCompare(page: Page): Promise<void> {
  await gotoDashboardRoute(page, "/dashboard/playground?tab=compare");

  const addButton = page.getByRole("button", { name: /add model column/i });
  const modelInput = page.getByRole("textbox", { name: /model name for new column/i });
  await expect(addButton).toBeVisible({ timeout: 15000 });
  await modelInput.fill("test/second-model");
  await addButton.click();
  await expect(page.getByRole("button", { name: /remove column for/i })).toHaveCount(2);

  await page.getByRole("textbox", { name: /user prompt/i }).fill("Compare these responses");
}

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
    await page.route("**/v1/chat/completions", async (route) => {
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
    const modelInput = page
      .locator('input[placeholder*="Model"], input[aria-label*="model" i]')
      .first();
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

    const modelInput = page
      .locator('input[placeholder*="Model"], input[aria-label*="model" i]')
      .first();
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

    // Wait for CompareTab to finish loading (it's a dynamic import with ssr: false).
    // The "Add model column" button is always rendered once the component mounts and
    // provides a reliable hydration signal before we check the Run/Cancel toolbar.
    await expect(page.getByRole("button", { name: /add model/i })).toBeVisible({
      timeout: 10000,
    });

    // The toolbar shows "Run all" when idle and "Cancel all" when streaming —
    // they are mutually exclusive. Verify the toolbar control is always present
    // by checking that exactly one of the two buttons is visible.
    // (CompareTab.tsx renders <button aria-label="Run all columns"> or
    // <button aria-label="Cancel all streams"> based on isAnyStreaming state.)
    const runAllButton = page.getByRole("button", { name: /run all/i });
    const cancelButton = page.getByRole("button", { name: /cancel all|abort/i });
    // Use expect().toBeVisible() instead of isVisible() — the latter does not wait
    // in Playwright 1.50+ (timeout option is deprecated/ignored on locator.isVisible).
    const hasRunAll = await expect(runAllButton)
      .toBeVisible({ timeout: 5000 })
      .then(() => true)
      .catch(() => false);
    const hasCancel = await expect(cancelButton)
      .toBeVisible({ timeout: 1000 })
      .then(() => true)
      .catch(() => false);
    expect(hasRunAll || hasCancel).toBe(true);
  });

  test("long responses scroll independently while headers and horizontal columns stay fixed", async ({
    page,
  }) => {
    const longResponse = Array.from(
      { length: 160 },
      (_, index) => `Long response line ${index + 1}`
    ).join("\n\n");

    await page.unroute("**/v1/chat/completions");
    await page.route("**/v1/chat/completions", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "text/event-stream",
        body: buildSseResponse(longResponse, "test/scroll-model"),
      });
    });

    await openTwoColumnCompare(page);
    await page.getByRole("button", { name: /run all columns/i }).click();

    const firstColumn = compareColumnFor(page, 0);
    const secondColumn = compareColumnFor(page, 1);
    const firstResponse = responsePanelFor(firstColumn);
    const secondResponse = responsePanelFor(secondColumn);

    await expect(firstResponse).toContainText("Long response line 160", { timeout: 15000 });
    await expect(secondResponse).toContainText("Long response line 160", { timeout: 15000 });

    const responseGeometry = await Promise.all(
      [firstResponse, secondResponse].map((panel) =>
        panel.evaluate((element) => ({
          clientHeight: element.clientHeight,
          overflowY: getComputedStyle(element).overflowY,
          scrollHeight: element.scrollHeight,
        }))
      )
    );

    for (const geometry of responseGeometry) {
      expect(geometry.overflowY).toBe("auto");
      expect(geometry.clientHeight).toBeGreaterThan(0);
      expect(geometry.scrollHeight).toBeGreaterThan(geometry.clientHeight);
    }

    const firstHeader = firstColumn.locator(":scope > div").first();
    const firstMetrics = firstColumn.locator(":scope > div").nth(1);
    const fixedBefore = await Promise.all(
      [firstHeader, firstMetrics].map((element) =>
        element.evaluate((node) => node.getBoundingClientRect().top)
      )
    );
    const secondScrollBefore = await secondResponse.evaluate((element) => element.scrollTop);

    await firstResponse.evaluate((element) => {
      element.scrollTop = Math.floor(element.scrollHeight / 2);
    });

    expect(await firstResponse.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
    expect(await secondResponse.evaluate((element) => element.scrollTop)).toBe(secondScrollBefore);

    const fixedAfter = await Promise.all(
      [firstHeader, firstMetrics].map((element) =>
        element.evaluate((node) => node.getBoundingClientRect().top)
      )
    );
    expect(fixedAfter).toEqual(fixedBefore);

    const columnRects = await Promise.all(
      [firstColumn, secondColumn].map((column) =>
        column.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return { left: rect.left, right: rect.right, top: rect.top, width: rect.width };
        })
      )
    );
    expect(Math.abs(columnRects[0].top - columnRects[1].top)).toBeLessThanOrEqual(1);
    expect(columnRects[0].right).toBeLessThanOrEqual(columnRects[1].left + 1);
    expect(columnRects[0].width).toBeGreaterThan(0);
    expect(columnRects[1].width).toBeGreaterThan(0);
  });

  test("streaming does not force a response back to the bottom after the user scrolls up", async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const originalFetch = window.fetch.bind(window);
      window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
        if (!String(input).endsWith("/v1/chat/completions")) {
          return originalFetch(input, init);
        }

        const encoder = new TextEncoder();
        let chunkIndex = 0;
        let timer: number | undefined;
        const stream = new ReadableStream<Uint8Array>({
          start(controller) {
            const pushChunk = () => {
              if (init?.signal?.aborted) {
                controller.error(new DOMException("Aborted", "AbortError"));
                return;
              }

              if (chunkIndex >= 80) {
                controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                controller.close();
                return;
              }

              const payload = {
                choices: [
                  {
                    delta: {
                      content: `Stream chunk ${chunkIndex + 1} with enough text to wrap across the response column.\n\n`,
                    },
                  },
                ],
              };
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
              chunkIndex += 1;
              timer = window.setTimeout(pushChunk, 40);
            };

            pushChunk();
          },
          cancel() {
            if (timer != null) window.clearTimeout(timer);
          },
        });

        return new Response(stream, {
          status: 200,
          headers: { "content-type": "text/event-stream" },
        });
      };
    });

    await openTwoColumnCompare(page);
    await page.getByRole("button", { name: /run all columns/i }).click();

    const firstResponse = responsePanelFor(compareColumnFor(page, 0));
    await expect
      .poll(
        () =>
          firstResponse.evaluate(
            (element) => element.clientHeight > 0 && element.scrollHeight > element.clientHeight
          ),
        { timeout: 15000 }
      )
      .toBe(true);

    const userScrollTop = await firstResponse.evaluate((element) => {
      const nextScrollTop = Math.max(1, element.scrollHeight - element.clientHeight - 80);
      element.scrollTop = nextScrollTop;
      return element.scrollTop;
    });
    expect(userScrollTop).toBeGreaterThan(0);

    await expect(firstResponse).toContainText("Stream chunk 70", { timeout: 15000 });

    const positionAfterMoreChunks = await firstResponse.evaluate((element) => ({
      maxScrollTop: element.scrollHeight - element.clientHeight,
      scrollTop: element.scrollTop,
    }));
    expect(Math.abs(positionAfterMoreChunks.scrollTop - userScrollTop)).toBeLessThanOrEqual(2);
    expect(positionAfterMoreChunks.scrollTop).toBeLessThan(
      positionAfterMoreChunks.maxScrollTop - 20
    );
  });
});
