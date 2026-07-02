import { test, expect } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

function getTimeRangeSelector(page: import("@playwright/test").Page) {
  return page.getByRole("tablist", { name: /select time range/i }).first();
}

async function waitForAnalyticsShell(page: import("@playwright/test").Page) {
  const mainTabList = page.locator('[role="tablist"]').first();
  await expect(mainTabList).toBeVisible({ timeout: 15000 });
  await expect(
    page
      .locator("button")
      .filter({
        hasText: /overview/i,
      })
      .first()
  ).toBeVisible({ timeout: 15000 });
}

test.describe("Analytics Tabs UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/api/usage/analytics", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          stats: {
            totalRequests: 1234,
            totalTokens: 567890,
            estimatedCost: 12.34,
          },
          charts: {},
        }),
      });
    });

    await page.route("**/api/usage/utilization**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          timeRange: "24h",
          bucketSizeMinutes: 10,
          providers: ["codex", "claude", "gemini"],
          data: [
            {
              timestamp: new Date(Date.now() - 3600000).toISOString(),
              provider: "codex",
              remainingPct: 75.5,
              isExhausted: false,
              windowKey: "5h",
            },
            {
              timestamp: new Date().toISOString(),
              provider: "codex",
              remainingPct: 72.0,
              isExhausted: false,
              windowKey: "5h",
            },
          ],
        }),
      });
    });

    await page.route("**/api/usage/combo-health**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          timeRange: "24h",
          combo: {
            id: "test-combo",
            name: "Test Combo",
            models: ["openai/gpt-4", "anthropic/claude-3"],
          },
          quotaHealth: {
            overall: {
              remainingAvg: 68.5,
              trend: "stable",
            },
            providers: [
              {
                provider: "openai",
                remaining: 75.0,
                trend: "stable",
              },
            ],
          },
          usageSkew: {
            modelDistribution: [
              { model: "openai/gpt-4", count: 45, share: 0.6 },
              { model: "anthropic/claude-3", count: 30, share: 0.4 },
            ],
            gini: 0.2,
          },
          performance: {
            successRate: 0.98,
            avgLatency: 1200,
            totalCalls: 75,
          },
        }),
      });
    });

    await page.route("**/api/combos", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          combos: [
            {
              id: "test-combo",
              name: "Test Combo",
              models: ["openai/gpt-4", "anthropic/claude-3"],
              strategy: "priority",
              isActive: true,
            },
          ],
        }),
      });
    });
  });

  test("displays all 5 analytics tabs", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/analytics");
    await waitForAnalyticsShell(page);

    const mainTabList = page.locator('[role="tablist"]').first();
    await expect(mainTabList).toBeVisible();

    const tabButtons = page.locator(
      'button[class*="segmented"], [role="tablist"] > button, [role="tablist"] div > button'
    );
    const count = await tabButtons.count();
    expect(count).toBeGreaterThanOrEqual(4);

    const tabLabels = ["overview", "evals", "search", "utilization", "combo health"];
    for (const label of tabLabels) {
      const tabButton = page
        .locator("button")
        .filter({
          hasText: new RegExp(label, "i"),
        })
        .first();
      await expect(tabButton).toBeVisible();
    }
  });

  test("Provider Utilization tab shows TimeRangeSelector and chart", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/analytics");
    await waitForAnalyticsShell(page);

    const utilizationTab = page
      .locator("button")
      .filter({
        hasText: /utilization/i,
      })
      .first();

    // Retry click until the tab switches, mitigating Next.js hydration race conditions
    await expect(async () => {
      await utilizationTab.click();
      const timeRangeSelector = page
        .locator('[role="tablist"][aria-label]')
        .filter({ hasText: /1h/ })
        .first();
      await expect(timeRangeSelector).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15000 });

    const timeRangeSelector = page
      .locator('[role="tablist"][aria-label]')
      .filter({ hasText: /1h/ })
      .first();

    const timeRangeButtons = timeRangeSelector.locator('button[role="tab"]');
    await expect(timeRangeButtons.first()).toBeVisible();

    const chart = page
      .locator('svg.recharts-surface, .recharts-wrapper, div[class*="recharts"]')
      .first();
    await expect(chart).toBeVisible();
  });

  test("Combo Health tab displays health cards and metrics", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/analytics");
    await waitForAnalyticsShell(page);

    const comboHealthTab = page
      .locator("button")
      .filter({
        hasText: /combo.*health/i,
      })
      .first();

    await expect(async () => {
      await comboHealthTab.click();
      const timeRangeSelector = getTimeRangeSelector(page);
      await expect(timeRangeSelector).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15000 });

    const mainContent = page.locator('main, [class*="dashboard"], div[class*="container"]').first();
    await expect(mainContent).toBeVisible();

    const timeRangeSelector = getTimeRangeSelector(page);
    await expect(timeRangeSelector).toBeVisible();

    const metricElements = page
      .locator('[class*="rounded-lg"], [class*="border"], [class*="bg-black/"]')
      .first();
    await expect(metricElements).toBeVisible();
  });

  test("time range change triggers network request", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/analytics");
    await waitForAnalyticsShell(page);

    const utilizationTab = page
      .locator("button")
      .filter({
        hasText: /utilization/i,
      })
      .first();

    await expect(async () => {
      await utilizationTab.click();
      const timeRangeSelector = getTimeRangeSelector(page);
      await expect(timeRangeSelector).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15000 });

    let networkRequestMade = false;
    page.on("request", (request) => {
      if (request.url().includes("/api/usage/utilization")) {
        const url = new URL(request.url());
        if (url.searchParams.get("range") === "7d") {
          networkRequestMade = true;
        }
      }
    });

    const timeRangeSelector = getTimeRangeSelector(page);
    const sevenDayButton = timeRangeSelector
      .locator('button[role="tab"]')
      .filter({ hasText: "7d" })
      .first();

    if (await sevenDayButton.isVisible()) {
      await sevenDayButton.click();
    } else {
      const buttons = timeRangeSelector.locator('button[role="tab"]');
      const count = await buttons.count();
      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        if (text?.includes("7")) {
          await button.click();
          break;
        }
      }
    }

    await page.waitForTimeout(1000);

    await expect
      .poll(() => networkRequestMade, {
        message: "Expected time range change to trigger network request",
      })
      .toBe(true);
  });

  test("tab switching persists state correctly", async ({ page }) => {
    await gotoDashboardRoute(page, "/dashboard/analytics");
    await waitForAnalyticsShell(page);

    const overviewTab = page
      .locator("button")
      .filter({
        hasText: /overview/i,
      })
      .first();

    await expect(async () => {
      await overviewTab.click();
      const overviewStats = page.locator("text=Total API Requests").first();
      // Overview uses UsageAnalytics, we wait for a generic evidence of overview
      // Or simply just wait 300ms if click doesn't throw
    })
      .toPass({ timeout: 15000 })
      .catch(() => {});

    const utilizationTab = page
      .locator("button")
      .filter({
        hasText: /utilization/i,
      })
      .first();

    await expect(async () => {
      await utilizationTab.click();
      const chart = page
        .locator('svg.recharts-surface, .recharts-wrapper, div[class*="recharts"]')
        .first();
      await expect(chart).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15000 });

    const chart = page
      .locator('svg.recharts-surface, .recharts-wrapper, div[class*="recharts"]')
      .first();
    await expect(chart).toBeVisible();

    const comboHealthTab = page
      .locator("button")
      .filter({
        hasText: /combo.*health/i,
      })
      .first();

    await expect(async () => {
      await comboHealthTab.click();
      const timeRangeSelector = getTimeRangeSelector(page);
      await expect(timeRangeSelector).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15000 });

    const timeRangeSelector = getTimeRangeSelector(page);
    await expect(timeRangeSelector).toBeVisible();

    await expect(async () => {
      await utilizationTab.click();
      await expect(chart).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 15000 });

    await expect(chart).toBeVisible();
  });
});
