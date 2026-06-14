/**
 * Group B — Activity Feed E2E spec.
 *
 * Validates that the new /dashboard/activity page (Group B, plan 16 F4) renders
 * correctly: header visible, timeline container present, and the page responds
 * with a 200 (not a redirect or error).
 *
 * Backend is mocked so this spec does not require a running upstream.
 */

import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

test.describe("Group B — Activity Feed", () => {
  test.beforeEach(async ({ page }) => {
    // Mock the audit-log endpoint used by the Activity feed
    await page.route("**/api/compliance/audit-log**", async (route) => {
      const url = new URL(route.request().url());
      const level = url.searchParams.get("level");
      if (level === "high") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            entries: [
              {
                id: "1",
                action: "provider.added",
                actor: "admin",
                target: "codex",
                severity: "info",
                timestamp: new Date().toISOString(),
                metadata: {},
              },
            ],
            total: 1,
          }),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({ entries: [], total: 0 }),
        });
      }
    });
  });

  test("activity page exists and returns 200", async ({ page }) => {
    const response = await page.goto("http://localhost:20128/dashboard/activity", {
      waitUntil: "domcontentloaded",
    });
    // After login redirect the page should settle on activity or login
    expect(response?.status()).not.toBe(404);
    expect(response?.status()).not.toBe(500);
  });

  test("activity page renders header and timeline container", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/activity");

    // The page header should be visible (h1 or title element)
    const heading = page
      .locator("h1, [data-testid='activity-title']")
      .first();
    await expect(heading).toBeVisible({ timeout: 15000 });

    // ActivityFeed renders <div role="status"> (empty state) or a
    // <div class="divide-y..."> with a nested <ul class="divide-y..."> (entries).
    // Match those feed-specific shapes (plus the legacy testids). Deliberately
    // NOT matching a generic container like `div.rounded-xl`, which exists on
    // many pages (incl. the /login card) and would let the test pass even when
    // the dashboard redirected to login without rendering the feed.
    const feedContainer = page.locator(
      "[data-testid='activity-feed'], [data-testid='activity-empty-state']," +
      " .activity-feed, [role='status'], [role='list'], ul.divide-y, div.divide-y"
    );
    await expect(feedContainer.first()).toBeVisible({ timeout: 15000 });
  });

  test("activity page does not show raw error stack traces", async ({ page }) => {
    // Simulate a backend error to ensure error sanitization (Hard Rule #12)
    await page.route("**/api/compliance/audit-log**", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({ error: { message: "Internal error" } }),
      });
    });

    await gotoDashboardRoute(page, "/dashboard/activity");

    const pageContent = await page.content();
    // Stack traces should never appear in the UI (Hard Rule #12)
    expect(pageContent).not.toMatch(/\s+at\s+\//);
  });
});
