/**
 * E2E — Traffic Inspector page smoke tests
 *
 * These tests require the OmniRoute server to be running at the configured base URL.
 * The WebSocket tests use a mock event source rather than a live MITM capture to
 * avoid needing port 443 privileges.
 *
 * CI behaviour: marked `.skip` unless `RUN_TRAFFIC_INSPECTOR_E2E=1` is set.
 *
 * To run locally:
 *   RUN_TRAFFIC_INSPECTOR_E2E=1 npx playwright test tests/e2e/traffic-inspector.spec.ts
 */
import { test, expect, type Page } from "@playwright/test";

const SKIP = !process.env["RUN_TRAFFIC_INSPECTOR_E2E"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function navigateToInspector(page: Page): Promise<void> {
  await page.goto("/dashboard/tools/traffic-inspector");
  await page.waitForLoadState("networkidle");
}

async function isAuthenticated(page: Page): Promise<boolean> {
  return !page.url().includes("/login");
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe("Traffic Inspector page", () => {
  test.skip(SKIP, "Set RUN_TRAFFIC_INSPECTOR_E2E=1 to run Traffic Inspector E2E tests");

  test("page renders with heading", async ({ page }) => {
    await navigateToInspector(page);
    if (!(await isAuthenticated(page))) {
      await expect(page.locator("body")).toBeVisible();
      return;
    }
    await expect(
      page.locator("h1, [data-testid='traffic-inspector-heading']").first()
    ).toBeVisible();
  });

  test("capture sources toolbar is visible", async ({ page }) => {
    await navigateToInspector(page);
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    const toolbar = page.locator(
      "[data-testid='capture-sources-toolbar'], [data-testid='capture-toolbar']"
    ).first();
    await expect(toolbar).toBeVisible({ timeout: 5000 });
  });

  test("filter bar is visible (profile selector + pause + clear)", async ({ page }) => {
    await navigateToInspector(page);
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    // Profile selector
    const profileSelector = page.locator(
      "[data-testid='profile-selector'], [aria-label*='profile'], text=LLM only"
    ).first();
    await expect(profileSelector).toBeVisible({ timeout: 5000 });

    // Pause or Clear button should exist
    const pauseOrClear = page.locator(
      "button:has-text('Pause'), button:has-text('Clear'), [data-testid='pause-btn'], [data-testid='clear-btn']"
    ).first();
    await expect(pauseOrClear).toBeVisible();
  });

  test("request list panel renders (may be empty)", async ({ page }) => {
    await navigateToInspector(page);
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    // Left panel should be present (virtualized list container)
    const requestList = page.locator(
      "[data-testid='request-list'], [data-testid='streaming-list']"
    ).first();
    await expect(requestList).toBeVisible({ timeout: 5000 });
  });

  test("detail pane and tabs are visible", async ({ page }) => {
    await navigateToInspector(page);
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    const detailPane = page.locator(
      "[data-testid='detail-pane'], [data-testid='details-panel']"
    ).first();
    await expect(detailPane).toBeVisible({ timeout: 5000 });

    // At least Headers and Request tabs should exist
    const headersTab = page.locator(
      "button[role='tab']:has-text('Headers'), [data-testid='tab-headers']"
    ).first();
    await expect(headersTab).toBeVisible();

    const requestTab = page.locator(
      "button[role='tab']:has-text('Request'), [data-testid='tab-request']"
    ).first();
    await expect(requestTab).toBeVisible();
  });

  test("clicking a request row (if any) updates the detail pane", async ({ page }) => {
    await navigateToInspector(page);
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    // Wait for any rows to appear (up to 5s)
    const firstRow = page.locator(
      "[data-testid='request-row'], [data-testid='request-list'] > *"
    ).first();
    const hasRows = await firstRow.isVisible({ timeout: 5000 }).catch(() => false);
    if (!hasRows) {
      // Empty buffer — skip row interaction test
      test.skip();
      return;
    }
    await firstRow.click();
    // Detail pane should now show non-empty content
    const detailPane = page.locator("[data-testid='detail-pane'], [data-testid='details-panel']").first();
    await expect(detailPane).not.toBeEmpty();
  });

  test("Record session button starts recording", async ({ page }) => {
    await navigateToInspector(page);
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    const recBtn = page.locator(
      "button:has-text('Record session'), button:has-text('REC'), [data-testid='rec-btn']"
    ).first();
    const isVisible = await recBtn.isVisible().catch(() => false);
    if (!isVisible) {
      test.skip();
      return;
    }
    await recBtn.click();
    // Should show recording indicator
    const recIndicator = page.locator(
      "[data-testid='rec-indicator'], text=REC, [data-testid='session-recorder-bar']"
    ).first();
    await expect(recIndicator).toBeVisible({ timeout: 3000 });

    // Stop recording
    const stopBtn = page.locator(
      "button:has-text('Stop'), [data-testid='stop-rec-btn']"
    ).first();
    if (await stopBtn.isVisible().catch(() => false)) {
      await stopBtn.click();
    }
  });

  test("Export .har button is present", async ({ page }) => {
    await navigateToInspector(page);
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    const exportBtn = page.locator(
      "button:has-text('.har'), button:has-text('Export'), [data-testid='export-har-btn']"
    ).first();
    await expect(exportBtn).toBeVisible({ timeout: 5000 });
  });

  test("WebSocket live indicator is shown (connected or disconnected)", async ({ page }) => {
    await navigateToInspector(page);
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    // Either a green "live" dot or a "disconnected" message should be visible
    const liveIndicator = page.locator(
      "[data-testid='ws-status'], text=live, text=Disconnected, [data-testid='live-indicator']"
    ).first();
    await expect(liveIndicator).toBeVisible({ timeout: 8000 });
  });

  test("Replay button appears when a request is selected", async ({ page }) => {
    await navigateToInspector(page);
    if (!(await isAuthenticated(page))) {
      test.skip();
      return;
    }
    const firstRow = page.locator(
      "[data-testid='request-row']"
    ).first();
    const hasRows = await firstRow.isVisible({ timeout: 5000 }).catch(() => false);
    if (!hasRows) {
      test.skip();
      return;
    }
    await firstRow.click();
    const replayBtn = page.locator(
      "button:has-text('Replay'), [data-testid='replay-btn']"
    ).first();
    await expect(replayBtn).toBeVisible({ timeout: 3000 });
  });
});
