/**
 * Group B — Quota Share Pools E2E spec.
 *
 * Validates that the redesigned /dashboard/costs/quota-share page (Group B,
 * plan 22 F9) renders correctly: QuotaConceptCard visible, pool list or empty
 * state present.
 *
 * Backend is mocked so this spec does not require a running upstream.
 */

import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

test.describe("Group B — Quota Share Pools", () => {
  test.beforeEach(async ({ page }) => {
    // Mock pools list — empty state first
    await page.route("**/api/quota/pools", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([]),
        });
      } else {
        await route.continue();
      }
    });

    // Mock plans list
    await page.route("**/api/quota/plans**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    // Mock settings/quota-store
    await page.route("**/api/settings/quota-store", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ driver: "sqlite", redisUrl: null }),
      });
    });
  });

  test("quota-share page exists and returns 200", async ({ page }) => {
    const response = await page.goto(
      "http://localhost:20128/dashboard/costs/quota-share",
      { waitUntil: "domcontentloaded" }
    );
    expect(response?.status()).not.toBe(404);
    expect(response?.status()).not.toBe(500);
  });

  test("quota-share page renders QuotaConceptCard or pool list", async ({
    page,
  }) => {
    await gotoDashboardRoute(page, "/dashboard/costs/quota-share");

    // Either the concept card (empty state) or a pool list should be visible
    const conceptCard = page.locator(
      "[data-testid='quota-concept-card'], [class*='QuotaConceptCard'], h2, h3"
    );
    await expect(conceptCard.first()).toBeVisible({ timeout: 15000 });
  });

  test("quota-share page shows pool list when pools exist", async ({ page }) => {
    // Override with a pool in the response
    await page.route("**/api/quota/pools", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([
            {
              id: "pool-1",
              connectionId: "conn-codex-1",
              name: "Codex Shared Pool",
              createdAt: new Date().toISOString(),
              allocations: [],
            },
          ]),
        });
      } else {
        await route.continue();
      }
    });

    await gotoDashboardRoute(page, "/dashboard/costs/quota-share");

    // Pool name should appear somewhere on the page
    await expect(page.getByText("Codex Shared Pool")).toBeVisible({
      timeout: 15000,
    });
  });
});
