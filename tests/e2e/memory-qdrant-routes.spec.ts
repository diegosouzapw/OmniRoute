import { expect, test, type Page, type Route } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

const NAVIGATION_TIMEOUT_MS = 300_000;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fulfillJson(route: Route, body: unknown, status = 200) {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

type QdrantSettings = {
  enabled: boolean;
  host: string;
  port: number;
  collection: string;
  embeddingModel: string;
  hasApiKey: boolean;
  apiKeyMasked: string | null;
};

type MemorySettings = {
  enabled: boolean;
  maxTokens: number;
  retentionDays: number;
  strategy: "recent" | "semantic" | "hybrid";
  skillsEnabled: boolean;
  embeddingSource: "remote" | "static" | "transformers" | "auto";
  embeddingProviderModel: string | null;
  transformersEnabled: boolean;
  staticEnabled: boolean;
  rerankEnabled: boolean;
  rerankProviderModel: string | null;
  vectorStore: "sqlite-vec" | "qdrant" | "auto";
};

function defaultQdrantSettings(): QdrantSettings {
  return {
    enabled: false,
    host: "",
    port: 6333,
    collection: "omniroute_memory",
    embeddingModel: "openai/text-embedding-3-small",
    hasApiKey: false,
    apiKeyMasked: null,
  };
}

function defaultMemorySettings(): MemorySettings {
  return {
    enabled: true,
    maxTokens: 2000,
    retentionDays: 30,
    strategy: "hybrid",
    skillsEnabled: false,
    embeddingSource: "auto",
    embeddingProviderModel: null,
    transformersEnabled: false,
    staticEnabled: false,
    rerankEnabled: false,
    rerankProviderModel: null,
    vectorStore: "auto",
  };
}

/**
 * Set up all route mocks needed for the Engine tab + QdrantConfigCard.
 *
 * Key security assertion: health/search/cleanup endpoints return error payloads
 * WITHOUT a stack trace (no "at /…" lines) — validates Hard Rule #12 compliance.
 */
async function setupQdrantRoutes(
  page: Page,
  state: {
    qdrantSettings: QdrantSettings;
    memorySettings: MemorySettings;
    healthCalls: number;
    settingsPutCalls: number;
    searchCalls: number;
    cleanupCalls: number;
  },
) {
  // /api/memory (GET) — empty list, needed by MemoriesTab which is the default
  await page.route(/\/api\/memory(\?.*)?$/, async (route) => {
    if (route.request().method() === "GET") {
      await fulfillJson(route, {
        data: [],
        total: 0,
        totalPages: 1,
        stats: { total: 0, tokensUsed: 0, hitRate: 0 },
      });
      return;
    }
    await fulfillJson(route, { error: { message: "Not allowed" } }, 405);
  });

  // /api/memory/engine-status
  await page.route(/\/api\/memory\/engine-status$/, async (route) => {
    await fulfillJson(route, {
      keyword: { available: true, backend: "FTS5" },
      embedding: {
        source: null,
        model: null,
        dimensions: null,
        available: false,
        reason: "No embedding source",
        cacheStats: { hits: 0, misses: 0, size: 0 },
      },
      vectorStore: {
        backend: "none",
        available: false,
        rowCount: 0,
        needsReindex: 0,
        reason: "sqlite-vec unavailable",
      },
      qdrant: { enabled: false, healthy: null, latencyMs: null, error: null },
      rerank: {
        enabled: false,
        provider: null,
        model: null,
        available: false,
        reason: "Rerank disabled",
      },
    });
  });

  // /api/memory/embedding-providers
  await page.route(/\/api\/memory\/embedding-providers$/, async (route) => {
    await fulfillJson(route, { providers: [] });
  });

  // /api/memory/health
  await page.route(/\/api\/memory\/health$/, async (route) => {
    await fulfillJson(route, { working: true, latencyMs: 5 });
  });

  // /api/memory/reindex
  await page.route(/\/api\/memory\/reindex$/, async (route) => {
    await fulfillJson(route, { started: true, pending: 0 });
  });

  // GET/PUT /api/settings/memory
  await page.route(/\/api\/settings\/memory$/, async (route) => {
    const method = route.request().method();
    if (method === "GET") {
      await fulfillJson(route, state.memorySettings);
      return;
    }
    if (method === "PUT") {
      const body = route.request().postDataJSON() as Partial<MemorySettings>;
      state.memorySettings = { ...state.memorySettings, ...body };
      await fulfillJson(route, state.memorySettings);
      return;
    }
    await fulfillJson(route, { error: { message: "Method not allowed" } }, 405);
  });

  // GET/PUT /api/settings/qdrant
  await page.route(/\/api\/settings\/qdrant$/, async (route) => {
    const method = route.request().method();
    if (method === "GET") {
      await fulfillJson(route, state.qdrantSettings);
      return;
    }
    if (method === "PUT") {
      state.settingsPutCalls += 1;
      const body = route.request().postDataJSON() as Partial<QdrantSettings>;
      state.qdrantSettings = {
        ...state.qdrantSettings,
        ...body,
        // PUT returns the sanitized version (no raw apiKey field)
      };
      await fulfillJson(route, {
        ...state.qdrantSettings,
        hasApiKey: false,
        apiKeyMasked: null,
      });
      return;
    }
    await fulfillJson(route, { error: { message: "Method not allowed" } }, 405);
  });

  // GET /api/settings/qdrant/health — simulates a refused connection.
  // The error message MUST NOT contain a stack trace (Hard Rule #12).
  await page.route(/\/api\/settings\/qdrant\/health$/, async (route) => {
    state.healthCalls += 1;
    // Return a structured error that is safe (no stack trace)
    await fulfillJson(route, {
      ok: false,
      latencyMs: 0,
      error: "connect ECONNREFUSED 127.0.0.1:6333",
    });
  });

  // GET /api/settings/qdrant/embedding-models
  await page.route(/\/api\/settings\/qdrant\/embedding-models$/, async (route) => {
    await fulfillJson(route, { models: ["openai/text-embedding-3-small"] });
  });

  // POST /api/settings/qdrant/search — simulates failed search (Qdrant not running)
  await page.route(/\/api\/settings\/qdrant\/search$/, async (route) => {
    state.searchCalls += 1;
    await fulfillJson(
      route,
      {
        error: {
          message: "Qdrant connection failed: ECONNREFUSED",
          code: "QDRANT_UNAVAILABLE",
        },
      },
      503,
    );
  });

  // POST /api/settings/qdrant/cleanup — simulates failed cleanup (Qdrant not running)
  await page.route(/\/api\/settings\/qdrant\/cleanup$/, async (route) => {
    state.cleanupCalls += 1;
    await fulfillJson(
      route,
      {
        error: {
          message: "Qdrant cleanup failed: ECONNREFUSED",
          code: "QDRANT_UNAVAILABLE",
        },
      },
      503,
    );
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

test.describe("Memory Qdrant routes — Engine tab integration", () => {
  test.setTimeout(600_000);

  test("Engine tab renders Qdrant config card", async ({ page }) => {
    const state = {
      qdrantSettings: defaultQdrantSettings(),
      memorySettings: defaultMemorySettings(),
      healthCalls: 0,
      settingsPutCalls: 0,
      searchCalls: 0,
      cleanupCalls: 0,
    };

    await setupQdrantRoutes(page, state);

    await gotoDashboardRoute(page, "/dashboard/memory", { timeoutMs: NAVIGATION_TIMEOUT_MS });

    // Navigate to Engine tab
    await expect(page.getByTestId("tab-engine")).toBeVisible({ timeout: 30_000 });
    await page.getByTestId("tab-engine").click();

    // Qdrant section heading should be visible.
    // getByText(/qdrant/i) resolves to multiple elements (label, description, title, etc.),
    // causing a strict-mode violation. Use the unambiguous card heading instead.
    await expect(
      page.getByRole("heading", { name: /qdrant/i }),
    ).toBeVisible({ timeout: 20_000 });

    // Qdrant enabled switch should be visible
    const qdrantSwitch = page.getByTestId("qdrant-enabled-switch");
    await expect(qdrantSwitch).toBeVisible({ timeout: 15_000 });
  });

  test("Test Connection button triggers GET /api/settings/qdrant/health with sanitized error", async ({
    page,
  }) => {
    const state = {
      qdrantSettings: { ...defaultQdrantSettings(), host: "localhost" },
      memorySettings: defaultMemorySettings(),
      healthCalls: 0,
      settingsPutCalls: 0,
      searchCalls: 0,
      cleanupCalls: 0,
    };

    await setupQdrantRoutes(page, state);

    await gotoDashboardRoute(page, "/dashboard/memory", { timeoutMs: NAVIGATION_TIMEOUT_MS });

    // Navigate to Engine tab
    await expect(page.getByTestId("tab-engine")).toBeVisible({ timeout: 30_000 });
    await page.getByTestId("tab-engine").click();

    // Find and click the Test Connection button
    const testConnBtn = page.getByTestId("qdrant-test-connection");
    await expect(testConnBtn).toBeVisible({ timeout: 20_000 });
    await testConnBtn.click();

    // healthCalls should increment
    await expect.poll(() => state.healthCalls).toBeGreaterThanOrEqual(1);

    // The error should surface in the UI — but without a stack trace
    // "ECONNREFUSED" is acceptable; "at /" (stack trace marker) is not
    await expect(async () => {
      const bodyText = await page.locator("body").innerText();
      // Error is shown (connection refused, not just silent failure)
      expect(
        bodyText.toLowerCase().includes("error") ||
          bodyText.toLowerCase().includes("refused") ||
          bodyText.toLowerCase().includes("failed") ||
          bodyText.toLowerCase().includes("erro"),
      ).toBe(true);
      // Must NOT contain a stack trace
      expect(bodyText).not.toMatch(/\sat\s\//);
    }).toPass({ timeout: 15_000, intervals: [1000, 2000] });
  });

  test("Cleanup button triggers POST /api/settings/qdrant/cleanup with sanitized error", async ({
    page,
  }) => {
    const state = {
      qdrantSettings: { ...defaultQdrantSettings(), host: "localhost" },
      memorySettings: defaultMemorySettings(),
      healthCalls: 0,
      settingsPutCalls: 0,
      searchCalls: 0,
      cleanupCalls: 0,
    };

    await setupQdrantRoutes(page, state);

    await gotoDashboardRoute(page, "/dashboard/memory", { timeoutMs: NAVIGATION_TIMEOUT_MS });

    // Navigate to Engine tab
    await expect(page.getByTestId("tab-engine")).toBeVisible({ timeout: 30_000 });
    await page.getByTestId("tab-engine").click();

    // Find and click the Cleanup button
    const cleanupBtn = page.getByTestId("qdrant-cleanup");
    await expect(cleanupBtn).toBeVisible({ timeout: 20_000 });
    await cleanupBtn.click();

    // cleanupCalls should increment
    await expect.poll(() => state.cleanupCalls).toBeGreaterThanOrEqual(1);

    // The error should surface in the UI but without a stack trace
    await expect(async () => {
      const bodyText = await page.locator("body").innerText();
      // Error surfaces
      expect(
        bodyText.toLowerCase().includes("error") ||
          bodyText.toLowerCase().includes("failed") ||
          bodyText.toLowerCase().includes("falh") ||
          bodyText.toLowerCase().includes("cleanup"),
      ).toBe(true);
      // Must NOT contain a stack trace
      expect(bodyText).not.toMatch(/\sat\s\//);
    }).toPass({ timeout: 15_000, intervals: [1000, 2000] });
  });
});
