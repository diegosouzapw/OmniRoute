import { expect, test, type Page } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

const resilienceSettings = {
  requestQueue: {
    autoEnableApiKeyProviders: true,
    requestsPerMinute: 100,
    minTimeBetweenRequestsMs: 200,
    concurrentRequests: 10,
    maxWaitMs: 120000,
  },
  connectionCooldown: {
    oauth: {
      baseCooldownMs: 60000,
      useUpstreamRetryHints: false,
      maxBackoffSteps: 8,
    },
    apikey: {
      baseCooldownMs: 3000,
      useUpstreamRetryHints: true,
      maxBackoffSteps: 5,
    },
  },
  providerBreaker: {
    oauth: {
      failureThreshold: 3,
      resetTimeoutMs: 60000,
    },
    apikey: {
      failureThreshold: 5,
      resetTimeoutMs: 30000,
    },
  },
  waitForCooldown: {
    enabled: true,
    maxRetries: 3,
    maxRetryWaitSec: 30,
  },
};

async function mockResilienceSettings(page: Page) {
  await page.route("**/api/resilience", async (route) => {
    const method = route.request().method();
    if (method === "GET") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(resilienceSettings),
      });
      return;
    }

    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        ok: true,
        ...resilienceSettings,
      }),
    });
  });
}

async function mockHealthPageApis(page: Page) {
  const now = new Date().toISOString();

  await page.route("**/api/monitoring/health", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        status: "error",
        system: {
          uptime: 3723,
          version: "3.7.0",
          nodeVersion: "22.12.0",
          memoryUsage: {
            rss: 64 * 1024 * 1024,
            heapUsed: 24 * 1024 * 1024,
            heapTotal: 48 * 1024 * 1024,
          },
        },
        providerHealth: {
          openai: {
            state: "OPEN",
            failures: 3,
            retryAfterMs: 15000,
            lastFailure: now,
          },
          gemini: {
            state: "HALF_OPEN",
            failures: 1,
            retryAfterMs: 5000,
            lastFailure: now,
          },
          groq: {
            state: "CLOSED",
            failures: 0,
            retryAfterMs: 0,
            lastFailure: null,
          },
        },
        providerSummary: {
          configuredCount: 3,
          activeCount: 2,
          monitoredCount: 3,
        },
        rateLimitStatus: {},
        lockouts: {},
        sessions: {
          activeCount: 0,
          stickyBoundCount: 0,
          byApiKey: {},
          top: [],
        },
        quotaMonitor: {
          active: 0,
          alerting: 0,
          exhausted: 0,
          errors: 0,
          byProvider: {},
          monitors: [],
        },
      }),
    });
  });

  await page.route("**/api/telemetry/summary", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ p50: 120, p95: 240, p99: 450, totalRequests: 18 }),
    });
  });

  await page.route("**/api/cache/stats", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ size: 3, maxSize: 100, hitRate: 50, hits: 2, misses: 2 }),
    });
  });

  await page.route("**/api/rate-limits", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        cacheStats: {
          defaultCount: 0,
          tool: { entries: 0, patterns: 0 },
          family: { entries: 0, patterns: 0 },
          session: { entries: 0, patterns: 0 },
        },
      }),
    });
  });

  await page.route("**/api/health/degradation", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        summary: { full: 0, reduced: 0, minimal: 0, default: 0 },
        features: [],
      }),
    });
  });

  await page.route("**/api/db/health", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        isHealthy: true,
        issues: [],
        repairedCount: 0,
        backupCreated: false,
      }),
    });
  });
}

async function mockProvidersPageApis(page: Page) {
  await page.route("**/api/providers", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        connections: [
          {
            id: "conn-openai-main",
            provider: "openai",
            authType: "apikey",
            name: "OpenAI Main",
            testStatus: "active",
          },
          {
            id: "conn-gemini-main",
            provider: "gemini",
            authType: "apikey",
            name: "Gemini Main",
            testStatus: "active",
          },
        ],
      }),
    });
  });

  await page.route("**/api/provider-nodes", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ nodes: [], ccCompatibleProviderEnabled: false }),
    });
  });

  await page.route("**/api/providers/expiration", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({}),
    });
  });

  await page.route("**/api/system/env/repair", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ available: false, missingCount: 0 }),
    });
  });
}

async function mockIntelligentCombosPageApis(page: Page) {
  await page.route("**/api/combos", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        combos: [
          {
            id: "combo-auto",
            name: "combo-auto",
            models: ["openai/gpt-4o-mini", "gemini/gemini-2.5-pro"],
            strategy: "auto",
            config: {
              candidatePool: ["openai", "gemini", "anthropic"],
              modePack: "ship-fast",
              explorationRate: 0.15,
            },
            isActive: true,
          },
        ],
      }),
    });
  });

  await page.route("**/api/combos/metrics", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ metrics: {} }),
    });
  });

  await page.route("**/api/providers", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        connections: [
          { id: "conn-openai", provider: "openai", name: "OpenAI", testStatus: "active" },
          { id: "conn-gemini", provider: "gemini", name: "Gemini", testStatus: "active" },
          {
            id: "conn-anthropic",
            provider: "anthropic",
            name: "Anthropic",
            testStatus: "active",
          },
        ],
      }),
    });
  });

  await page.route("**/api/provider-nodes", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ nodes: [] }),
    });
  });

  await page.route("**/api/settings/proxy", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ combos: {} }),
    });
  });
}

test.describe("Resilience Plan Alignment", () => {
  test("resilience settings page only shows the plan-aligned cooldown fields", async ({ page }) => {
    await mockResilienceSettings(page);

    await gotoDashboardRoute(page, "/dashboard/settings?tab=resilience");
    await expect(
      page.getByRole("heading", { name: "Connection Cooldown", exact: true })
    ).toBeVisible({ timeout: 15000 });
    await expect(page.getByText("Base cooldown", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Use upstream retry hints", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Max backoff steps", { exact: true }).first()).toBeVisible();
    await expect(page.getByText(/Rate-limit fallback/i)).toHaveCount(0);
  });

  test("health page renders provider breaker runtime state for multiple providers", async ({
    page,
  }) => {
    await mockHealthPageApis(page);

    await gotoDashboardRoute(page, "/dashboard/health");
    await expect(page.getByText("Provider Health")).toBeVisible({ timeout: 15000 });
    await expect(page.getByText("OpenAI")).toBeVisible();
    await expect(page.getByText("Gemini")).toBeVisible();
    await expect(page.getByText("Groq")).toBeVisible();
    await expect(page.getByText("Recovering", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Down", { exact: true }).first()).toBeVisible();
  });

  test("providers page no longer requests legacy model availability data", async ({ page }) => {
    let availabilityRequests = 0;

    await mockProvidersPageApis(page);
    await page.route("**/api/models/availability", async (route) => {
      availabilityRequests += 1;
      await route.fulfill({
        status: 410,
        contentType: "application/json",
        body: JSON.stringify({ error: "removed" }),
      });
    });

    await gotoDashboardRoute(page, "/dashboard/providers");
    await expect(page.getByText("OpenAI").first()).toBeVisible({ timeout: 15000 });

    expect(availabilityRequests).toBe(0);
    await expect(page.getByText(/Model Availability/i)).toHaveCount(0);
  });

  test("intelligent combo panel stays config-only and does not fetch breaker runtime state", async ({
    page,
  }) => {
    let monitoringHealthRequests = 0;

    await mockIntelligentCombosPageApis(page);
    await page.route("**/api/monitoring/health", async (route) => {
      monitoringHealthRequests += 1;
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({ providerHealth: {} }),
      });
    });

    await gotoDashboardRoute(page, "/dashboard/combos?filter=intelligent");
    await expect(page.getByText("Intelligent Routing Dashboard")).toBeVisible({ timeout: 15000 });
    const healthRequestsAfterPanelVisible = monitoringHealthRequests;
    await page.waitForTimeout(500);

    expect(monitoringHealthRequests).toBe(healthRequestsAfterPanelVisible);
    await expect(page.getByText("Routing Inputs", { exact: true })).toBeVisible();
    await expect(page.getByText(/Excluded Providers/i)).toHaveCount(0);
    await expect(page.getByText(/Incident Mode/i)).toHaveCount(0);
  });
});
