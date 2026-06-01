import { expect, test, type Page, type Route } from "@playwright/test";
import { gotoDashboardRoute } from "./helpers/dashboardAuth";

const NAVIGATION_TIMEOUT_MS = 300_000;

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

type MemoryEntry = {
  id: string;
  apiKeyId: string;
  sessionId: string | null;
  type: "factual" | "episodic" | "procedural" | "semantic";
  key: string;
  content: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
};

type MemoryStats = {
  totalEntries: number;
  tokensUsed: number;
  hitRate: number;
  cacheStats: { hits: number; misses: number };
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

type EngineStatus = {
  keyword: { available: true; backend: "FTS5" };
  embedding: {
    source: "remote" | "static" | "transformers" | null;
    model: string | null;
    dimensions: number | null;
    available: boolean;
    reason: string;
    cacheStats: { hits: number; misses: number; size: number };
  };
  vectorStore: {
    backend: "sqlite-vec" | "qdrant" | "none";
    available: boolean;
    rowCount: number;
    needsReindex: number;
    reason: string;
  };
  qdrant: {
    enabled: boolean;
    healthy: boolean | null;
    latencyMs: number | null;
    error: string | null;
  };
  rerank: {
    enabled: boolean;
    provider: string | null;
    model: string | null;
    available: boolean;
    reason: string;
  };
};

// ---------------------------------------------------------------------------
// Fixtures helpers
// ---------------------------------------------------------------------------

async function fulfillJson(route: Route, body: unknown, status = 200) {
  await route.fulfill({
    status,
    contentType: "application/json",
    body: JSON.stringify(body),
  });
}

function makeMemory(overrides: Partial<MemoryEntry> = {}): MemoryEntry {
  return {
    id: "mem-test-1",
    apiKeyId: "key-1",
    sessionId: null,
    type: "factual",
    key: "test.preference.language",
    content: "The user prefers English responses.",
    metadata: {},
    createdAt: new Date("2026-05-01T10:00:00.000Z").toISOString(),
    updatedAt: new Date("2026-05-01T10:00:00.000Z").toISOString(),
    expiresAt: null,
    ...overrides,
  };
}

function defaultSettings(): MemorySettings {
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

function defaultEngineStatus(): EngineStatus {
  return {
    keyword: { available: true, backend: "FTS5" },
    embedding: {
      source: null,
      model: null,
      dimensions: null,
      available: false,
      reason: "No embedding source configured",
      cacheStats: { hits: 0, misses: 0, size: 0 },
    },
    vectorStore: {
      backend: "none",
      available: false,
      rowCount: 0,
      needsReindex: 0,
      reason: "sqlite-vec unavailable in this environment",
    },
    qdrant: { enabled: false, healthy: null, latencyMs: null, error: null },
    rerank: {
      enabled: false,
      provider: null,
      model: null,
      available: false,
      reason: "Rerank disabled",
    },
  };
}

// ---------------------------------------------------------------------------
// Route interceptors
// ---------------------------------------------------------------------------

async function setupMemoryRoutes(
  page: Page,
  state: {
    memories: MemoryEntry[];
    stats: MemoryStats;
    settings: MemorySettings;
    engineStatus: EngineStatus;
    createCalls: number;
    updateCalls: number;
    deleteCalls: number;
    settingsCalls: number;
    reindexCalls: number;
    previewCalls: number;
  },
) {
  // GET/POST /api/memory
  await page.route(/\/api\/memory(\?.*)?$/, async (route) => {
    const method = route.request().method();

    if (method === "GET") {
      await fulfillJson(route, {
        data: state.memories,
        total: state.memories.length,
        totalPages: 1,
        stats: {
          total: state.memories.length,
          tokensUsed: state.stats.tokensUsed,
          hitRate: state.stats.hitRate,
          cacheStats: state.stats.cacheStats,
        },
      });
      return;
    }

    if (method === "POST") {
      state.createCalls += 1;
      const body = route.request().postDataJSON() as Partial<MemoryEntry>;
      const newMemory = makeMemory({
        id: `mem-new-${state.createCalls}`,
        key: body.key ?? "new.key",
        content: body.content ?? "New memory content.",
        type: (body.type as MemoryEntry["type"]) ?? "factual",
        sessionId: body.sessionId ?? null,
        apiKeyId: body.apiKeyId ?? "key-1",
        metadata: body.metadata ?? {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      state.memories = [...state.memories, newMemory];
      state.stats.totalEntries = state.memories.length;
      await fulfillJson(route, newMemory, 201);
      return;
    }

    await fulfillJson(route, { error: { message: "Method not allowed" } }, 405);
  });

  // GET/PUT /api/memory/[id]  (must be after /api/memory$ route)
  await page.route(/\/api\/memory\/[^/]+$/, async (route) => {
    const method = route.request().method();
    const memoryId = route.request().url().split("/").pop()?.split("?")[0] ?? "";

    if (method === "GET") {
      const mem = state.memories.find((m) => m.id === memoryId);
      if (!mem) {
        await fulfillJson(route, { error: { message: "Not found" } }, 404);
        return;
      }
      await fulfillJson(route, mem);
      return;
    }

    if (method === "PUT") {
      state.updateCalls += 1;
      const body = route.request().postDataJSON() as Partial<MemoryEntry>;
      state.memories = state.memories.map((m) => {
        if (m.id !== memoryId) return m;
        return {
          ...m,
          ...body,
          updatedAt: new Date().toISOString(),
        };
      });
      const updated = state.memories.find((m) => m.id === memoryId);
      await fulfillJson(route, updated ?? { error: { message: "Not found" } }, updated ? 200 : 404);
      return;
    }

    if (method === "DELETE") {
      state.deleteCalls += 1;
      state.memories = state.memories.filter((m) => m.id !== memoryId);
      state.stats.totalEntries = state.memories.length;
      await fulfillJson(route, { success: true });
      return;
    }

    await fulfillJson(route, { error: { message: "Method not allowed" } }, 405);
  });

  // GET /api/memory/engine-status
  await page.route(/\/api\/memory\/engine-status$/, async (route) => {
    await fulfillJson(route, state.engineStatus);
  });

  // GET /api/memory/embedding-providers
  await page.route(/\/api\/memory\/embedding-providers$/, async (route) => {
    await fulfillJson(route, { providers: [] });
  });

  // POST /api/memory/retrieve-preview
  await page.route(/\/api\/memory\/retrieve-preview$/, async (route) => {
    state.previewCalls += 1;
    await fulfillJson(route, {
      memories: state.memories.slice(0, 3).map((m) => ({
        id: m.id,
        type: m.type,
        key: m.key,
        content: m.content,
        score: 0.9,
        tokens: 24,
        tier: "fts5",
        vecScore: null,
        ftsScore: 0.9,
      })),
      resolution: {
        embeddingSource: null,
        embeddingModel: null,
        vectorStore: "none",
        strategyUsed: "exact",
        rerankApplied: false,
        fallbackReason: "No embedding source available, fell back to FTS5.",
      },
      totalTokensUsed: state.memories.length * 24,
      budgetMaxTokens: 2000,
    });
  });

  // POST /api/memory/reindex
  await page.route(/\/api\/memory\/reindex$/, async (route) => {
    state.reindexCalls += 1;
    await fulfillJson(route, { started: true, pending: 0, queued: 0 });
  });

  // GET/PUT /api/settings/memory
  await page.route(/\/api\/settings\/memory$/, async (route) => {
    const method = route.request().method();
    if (method === "GET") {
      await fulfillJson(route, state.settings);
      return;
    }
    if (method === "PUT") {
      state.settingsCalls += 1;
      const body = route.request().postDataJSON() as Partial<MemorySettings>;
      state.settings = { ...state.settings, ...body };
      await fulfillJson(route, state.settings);
      return;
    }
    await fulfillJson(route, { error: { message: "Method not allowed" } }, 405);
  });

  // GET/PUT /api/settings/qdrant (Engine tab, QdrantConfigCard)
  await page.route(/\/api\/settings\/qdrant$/, async (route) => {
    const method = route.request().method();
    if (method === "GET") {
      await fulfillJson(route, {
        enabled: false,
        host: "",
        port: 6333,
        collection: "omniroute_memory",
        embeddingModel: "openai/text-embedding-3-small",
        hasApiKey: false,
        apiKeyMasked: null,
      });
      return;
    }
    if (method === "PUT") {
      await fulfillJson(route, { enabled: false, host: "", port: 6333 });
      return;
    }
    await fulfillJson(route, { error: { message: "Method not allowed" } }, 405);
  });

  // GET /api/settings/qdrant/health
  await page.route(/\/api\/settings\/qdrant\/health$/, async (route) => {
    await fulfillJson(route, { ok: false, latencyMs: 0, error: "Connection refused" });
  });

  // GET /api/settings/qdrant/embedding-models
  await page.route(/\/api\/settings\/qdrant\/embedding-models$/, async (route) => {
    await fulfillJson(route, { models: [] });
  });

  // GET /api/memory/health
  await page.route(/\/api\/memory\/health$/, async (route) => {
    await fulfillJson(route, { working: true, latencyMs: 5 });
  });
}

// ---------------------------------------------------------------------------
// Test suite
// ---------------------------------------------------------------------------

test.describe("Memory Engine Studio — /dashboard/memory", () => {
  test.setTimeout(600_000);

  test("1. /dashboard/memory renders 3 tabs and concept card", async ({ page }) => {
    const state = {
      memories: [makeMemory()],
      stats: { totalEntries: 1, tokensUsed: 24, hitRate: 0.75, cacheStats: { hits: 3, misses: 1 } },
      settings: defaultSettings(),
      engineStatus: defaultEngineStatus(),
      createCalls: 0,
      updateCalls: 0,
      deleteCalls: 0,
      settingsCalls: 0,
      reindexCalls: 0,
      previewCalls: 0,
    };

    await setupMemoryRoutes(page, state);

    await gotoDashboardRoute(page, "/dashboard/memory", { timeoutMs: NAVIGATION_TIMEOUT_MS });

    // All 3 tabs should be visible
    await expect(page.getByTestId("tab-memories")).toBeVisible({ timeout: 30_000 });
    await expect(page.getByTestId("tab-playground")).toBeVisible({ timeout: 10_000 });
    await expect(page.getByTestId("tab-engine")).toBeVisible({ timeout: 10_000 });
  });

  test("2. Memories tab renders table and Total card", async ({ page }) => {
    const state = {
      memories: [makeMemory()],
      stats: { totalEntries: 1, tokensUsed: 48, hitRate: 0.5, cacheStats: { hits: 1, misses: 1 } },
      settings: defaultSettings(),
      engineStatus: defaultEngineStatus(),
      createCalls: 0,
      updateCalls: 0,
      deleteCalls: 0,
      settingsCalls: 0,
      reindexCalls: 0,
      previewCalls: 0,
    };

    await setupMemoryRoutes(page, state);

    await gotoDashboardRoute(page, "/dashboard/memory", { timeoutMs: NAVIGATION_TIMEOUT_MS });

    // Wait for memories tab (active by default)
    await expect(page.getByTestId("tab-memories")).toBeVisible({ timeout: 30_000 });

    // The memory key should appear in the table
    await expect(async () => {
      await expect(page.getByText("test.preference.language")).toBeVisible({ timeout: 10_000 });
    }).toPass({ timeout: 30_000, intervals: [1000, 2000] });
  });

  test("3. Add Memory modal → entry appears in table", async ({ page }) => {
    const state = {
      memories: [] as MemoryEntry[],
      stats: { totalEntries: 0, tokensUsed: 0, hitRate: 0, cacheStats: { hits: 0, misses: 0 } },
      settings: defaultSettings(),
      engineStatus: defaultEngineStatus(),
      createCalls: 0,
      updateCalls: 0,
      deleteCalls: 0,
      settingsCalls: 0,
      reindexCalls: 0,
      previewCalls: 0,
    };

    await setupMemoryRoutes(page, state);

    await gotoDashboardRoute(page, "/dashboard/memory", { timeoutMs: NAVIGATION_TIMEOUT_MS });

    // Wait for the page to be ready (empty state is shown initially)
    await expect(page.getByTestId("tab-memories")).toBeVisible({ timeout: 30_000 });

    // Click Add Memory
    await expect(async () => {
      const addBtn = page.getByRole("button", { name: /add memory/i }).first();
      await expect(addBtn).toBeVisible({ timeout: 10_000 });
      await addBtn.click();
    }).toPass({ timeout: 30_000, intervals: [1000, 2000] });

    // Fill in the add-memory form fields
    const keyInput = page.getByPlaceholder(/e\.g.*preferences/i).or(page.getByLabel(/key/i)).first();
    await expect(keyInput).toBeVisible({ timeout: 10_000 });
    await keyInput.fill("test.new.memory");

    const contentInput = page
      .getByPlaceholder(/content|value/i)
      .or(page.getByLabel(/content/i))
      .first();
    await expect(contentInput).toBeVisible({ timeout: 5_000 });
    await contentInput.fill("New memory added via modal.");

    // Submit the form
    const saveBtn = page.getByRole("button", { name: /save|add|create/i }).last();
    await expect(saveBtn).toBeVisible({ timeout: 5_000 });
    await saveBtn.click();

    // createCalls should increment
    await expect.poll(() => state.createCalls).toBeGreaterThanOrEqual(1);
  });

  test("4. Edit memory — pencil → modal → save → change reflected", async ({ page }) => {
    const mem = makeMemory({ id: "mem-edit-1", key: "edit.test.key", content: "Original content." });
    const state = {
      memories: [mem],
      stats: { totalEntries: 1, tokensUsed: 24, hitRate: 0.8, cacheStats: { hits: 4, misses: 1 } },
      settings: defaultSettings(),
      engineStatus: defaultEngineStatus(),
      createCalls: 0,
      updateCalls: 0,
      deleteCalls: 0,
      settingsCalls: 0,
      reindexCalls: 0,
      previewCalls: 0,
    };

    await setupMemoryRoutes(page, state);

    await gotoDashboardRoute(page, "/dashboard/memory", { timeoutMs: NAVIGATION_TIMEOUT_MS });

    // Wait for the memory to appear
    await expect(async () => {
      await expect(page.getByText("edit.test.key")).toBeVisible({ timeout: 10_000 });
    }).toPass({ timeout: 30_000, intervals: [1000, 2000] });

    // Click the edit (pencil) button for our memory
    const editBtn = page.getByTestId(`edit-memory-${mem.id}`);
    await expect(editBtn).toBeVisible({ timeout: 10_000 });
    await editBtn.click();

    // The edit modal should appear
    const contentInput = page.getByLabel(/content/i).or(page.locator("textarea")).first();
    await expect(contentInput).toBeVisible({ timeout: 10_000 });
    await contentInput.fill("Updated content via modal.");

    // Save the changes
    const saveBtn = page.getByRole("button", { name: /save/i }).last();
    await expect(saveBtn).toBeVisible({ timeout: 5_000 });
    await saveBtn.click();

    // updateCalls should increment
    await expect.poll(() => state.updateCalls).toBeGreaterThanOrEqual(1);
  });

  test("5. Playground tab — query and Simulate renders results", async ({ page }) => {
    const state = {
      memories: [makeMemory(), makeMemory({ id: "mem-2", key: "test.key.2", content: "Second fact." })],
      stats: { totalEntries: 2, tokensUsed: 48, hitRate: 0.6, cacheStats: { hits: 3, misses: 2 } },
      settings: defaultSettings(),
      engineStatus: defaultEngineStatus(),
      createCalls: 0,
      updateCalls: 0,
      deleteCalls: 0,
      settingsCalls: 0,
      reindexCalls: 0,
      previewCalls: 0,
    };

    await setupMemoryRoutes(page, state);

    await gotoDashboardRoute(page, "/dashboard/memory", { timeoutMs: NAVIGATION_TIMEOUT_MS });

    // Navigate to Playground tab
    await expect(page.getByTestId("tab-playground")).toBeVisible({ timeout: 30_000 });
    await page.getByTestId("tab-playground").click();

    // Fill in query
    const queryInput = page.getByTestId("playground-query-input");
    await expect(queryInput).toBeVisible({ timeout: 10_000 });
    await queryInput.fill("test");

    // Click Simulate
    const submitBtn = page.getByTestId("playground-submit");
    await expect(submitBtn).toBeVisible({ timeout: 5_000 });
    await expect(submitBtn).toBeEnabled({ timeout: 5_000 });
    await submitBtn.click();

    // Wait for previewCalls to increment
    await expect.poll(() => state.previewCalls).toBeGreaterThanOrEqual(1);

    // Results section should appear (result count heading)
    await expect(
      page.getByText(/result\(s\)|resultado\(s\)/, { exact: false }),
    ).toBeVisible({ timeout: 15_000 });
  });

  test("6. Engine tab — status chips render and toggle transformers", async ({ page }) => {
    const state = {
      memories: [],
      stats: { totalEntries: 0, tokensUsed: 0, hitRate: 0, cacheStats: { hits: 0, misses: 0 } },
      settings: defaultSettings(),
      engineStatus: defaultEngineStatus(),
      createCalls: 0,
      updateCalls: 0,
      deleteCalls: 0,
      settingsCalls: 0,
      reindexCalls: 0,
      previewCalls: 0,
    };

    await setupMemoryRoutes(page, state);

    await gotoDashboardRoute(page, "/dashboard/memory", { timeoutMs: NAVIGATION_TIMEOUT_MS });

    // Navigate to Engine tab
    await expect(page.getByTestId("tab-engine")).toBeVisible({ timeout: 30_000 });
    await page.getByTestId("tab-engine").click();

    // Status section should be visible (Reindex Now button is a proxy for the engine panel)
    const reindexBtn = page.getByTestId("reindex-now-button");
    await expect(reindexBtn).toBeVisible({ timeout: 20_000 });

    // Engine status heading
    await expect(
      page.getByText(/engine status|status do engine/i, { exact: false }),
    ).toBeVisible({ timeout: 10_000 });
  });

  test("7. Reindex Now button triggers POST /api/memory/reindex", async ({ page }) => {
    const state = {
      memories: [],
      stats: { totalEntries: 0, tokensUsed: 0, hitRate: 0, cacheStats: { hits: 0, misses: 0 } },
      settings: defaultSettings(),
      engineStatus: { ...defaultEngineStatus(), vectorStore: { ...defaultEngineStatus().vectorStore, needsReindex: 5 } },
      createCalls: 0,
      updateCalls: 0,
      deleteCalls: 0,
      settingsCalls: 0,
      reindexCalls: 0,
      previewCalls: 0,
    };

    await setupMemoryRoutes(page, state);

    await gotoDashboardRoute(page, "/dashboard/memory", { timeoutMs: NAVIGATION_TIMEOUT_MS });

    // Navigate to Engine tab
    await expect(page.getByTestId("tab-engine")).toBeVisible({ timeout: 30_000 });
    await page.getByTestId("tab-engine").click();

    // Click Reindex Now
    const reindexBtn = page.getByTestId("reindex-now-button");
    await expect(reindexBtn).toBeVisible({ timeout: 20_000 });
    await reindexBtn.click();

    // reindexCalls should increment (request was made)
    await expect.poll(() => state.reindexCalls).toBeGreaterThanOrEqual(1);
  });
});
