// Characterization tests — src/lib/memory (rail 3.8.55, Task 12 "caracterização B").
//
// Purpose: pin the PUBLIC surface and the observable behavior of the memory subsystem as it
// is TODAY, before the v4 extraction moves it out of the core. These tests describe what the
// code does, not what it should do: when current behavior looks wrong it is pinned under a
// `characterization: … currently …` title and listed in the task report as an issue
// candidate. Do NOT "fix" an assertion here to match a behavior change — a failure means the
// public contract moved and the extraction (or the change) must account for it.
import test from "node:test";
import assert from "node:assert/strict";
import "../_setup/isolateDataDir.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP ||= "true";

const core = await import("../../src/lib/db/core.ts");
const memory = await import("../../src/lib/memory/index.ts");

const { MemoryType } = memory;

/** createMemory schedules a fire-and-forget vector upsert via setImmediate; let it settle. */
async function drainSetImmediate(rounds = 3): Promise<void> {
  for (let i = 0; i < rounds; i++) {
    await new Promise((resolve) => setImmediate(resolve));
  }
}

function newMemory(overrides: Record<string, unknown> = {}) {
  return {
    apiKeyId: "char-key-a",
    sessionId: "char-session-1",
    type: MemoryType.FACTUAL,
    key: `char:${Math.random().toString(16).slice(2)}`,
    content: "The operator prefers TypeScript strict mode for new modules",
    metadata: { source: "characterization" },
    expiresAt: null,
    ...overrides,
  } as Parameters<typeof memory.createMemory>[0];
}

test.afterEach(async () => {
  await drainSetImmediate();
});

test.after(async () => {
  await drainSetImmediate();
  core.resetDbInstance();
});

// ─── (a) Public surface snapshot ─────────────────────────────────────────────

test("memory barrel (src/lib/memory/index.ts) exports exactly this surface", () => {
  assert.deepEqual(Object.keys(memory).sort(), [
    "CLAUDE_MEM_BACKEND_ID",
    "ClaudeMemBackend",
    "DEFAULT_MEMORY_SETTINGS",
    "GenericMemoryBackend",
    "KNOWN_BACKENDS",
    "MemoryType",
    "SQLiteBackend",
    "_resetVectorStoreSingleton",
    "createClaudeMemBackendFromSettings",
    "createGenericMemoryBackend",
    "createKnownBackend",
    "createMemory",
    "deleteMemory",
    "embed",
    "embedWithRetry",
    "engineStatus",
    "estimateTokens",
    "getMemory",
    "getMemorySettings",
    "getMemoryTokensUsed",
    "getVectorStore",
    "initMemoryBackends",
    "invalidateMemorySettingsCache",
    "keywordEngineStatus",
    "listEmbeddingProviders",
    "listMemories",
    "listMemoriesForDecay",
    "memoryManager",
    "normalizeMemorySettings",
    "recordMemoryAccess",
    "resolveEmbeddingSource",
    "retrieveMemories",
    "retrievePreview",
    "sanitizeFts5Query",
    "sqliteBackend",
    "toMemoryRetrievalConfig",
    "toMemorySettingsUpdates",
    "updateMemory",
    "withMeasuredDimensions",
  ]);
});

test("MemoryType enum values are the four persisted type strings", () => {
  assert.deepEqual(Object.values(MemoryType).sort(), [
    "episodic",
    "factual",
    "procedural",
    "semantic",
  ]);
});

test("importing the barrel registers the sqlite backend as the only, primary backend", () => {
  assert.deepEqual(memory.memoryManager.getRegisteredBackends(), [
    { id: "sqlite", displayName: "SQLite", isPrimary: true },
  ]);
  assert.equal(memory.memoryManager.getPrimaryBackend(), memory.sqliteBackend);
});

test("DEFAULT_MEMORY_SETTINGS keeps memory injection OFF by default", () => {
  assert.equal(memory.DEFAULT_MEMORY_SETTINGS.enabled, false);
  assert.equal(memory.DEFAULT_MEMORY_SETTINGS.maxTokens, 2000);
  assert.equal(memory.DEFAULT_MEMORY_SETTINGS.retentionDays, 30);
  assert.equal(memory.DEFAULT_MEMORY_SETTINGS.strategy, "hybrid");
  assert.equal(memory.DEFAULT_MEMORY_SETTINGS.primaryBackend, "sqlite");
});

// ─── (b) Entry-point contracts: store / recall (FTS) on a temp DB ────────────

test("createMemory → getMemory round-trips the stored record", async () => {
  const created = await memory.createMemory(newMemory({ key: "char:roundtrip" }));

  assert.equal(typeof created.id, "string");
  assert.match(created.id, /^[0-9a-f-]{36}$/);
  assert.equal(created.apiKeyId, "char-key-a");
  assert.equal(created.type, "factual");
  assert.equal(created.accessCount, 0);
  assert.equal(created.lastAccessedAt, null);
  assert.ok(created.createdAt instanceof Date);

  const fetched = await memory.getMemory(created.id);
  assert.ok(fetched);
  assert.equal(fetched.id, created.id);
  assert.equal(fetched.content, created.content);
  assert.deepEqual(fetched.metadata, { source: "characterization" });
});

test("createMemory is an UPSERT on (apiKeyId, key): same id, content replaced, metadata merged", async () => {
  const first = await memory.createMemory(
    newMemory({ key: "char:upsert", content: "first value", metadata: { a: 1 } })
  );
  const second = await memory.createMemory(
    newMemory({ key: "char:upsert", content: "second value", metadata: { b: 2 } })
  );

  assert.equal(second.id, first.id);
  assert.equal(second.content, "second value");
  assert.deepEqual(second.metadata, { a: 1, b: 2 });

  // A different apiKeyId with the same key is a different record.
  const otherOwner = await memory.createMemory(
    newMemory({ apiKeyId: "char-key-b", key: "char:upsert", content: "other owner" })
  );
  assert.notEqual(otherOwner.id, first.id);
});

test("retrieveMemories recalls by keyword (FTS) and stays scoped to the apiKeyId", async () => {
  await memory.createMemory(
    newMemory({ apiKeyId: "char-recall", content: "Deploys happen through the blue pipeline" })
  );
  await memory.createMemory(
    newMemory({ apiKeyId: "char-recall", content: "Coffee is served at nine" })
  );
  await memory.createMemory(
    newMemory({ apiKeyId: "char-recall-other", content: "Deploys happen on Fridays elsewhere" })
  );

  const hits = await memory.retrieveMemories("char-recall", {
    query: "deploys pipeline",
    retrievalStrategy: "hybrid",
  });
  assert.deepEqual(
    hits.map((m) => m.content),
    ["Deploys happen through the blue pipeline"]
  );

  // `exact` without a query returns every live memory of the key, newest first.
  const all = await memory.retrieveMemories("char-recall", { retrievalStrategy: "exact" });
  assert.equal(all.length, 2);
  assert.ok(all.every((m) => m.apiKeyId === "char-recall"));
});

test("retrieveMemories records an access bump for every memory it returns", async () => {
  const created = await memory.createMemory(
    newMemory({ apiKeyId: "char-access", content: "Access counting fixture" })
  );
  const hits = await memory.retrieveMemories("char-access", { retrievalStrategy: "exact" });
  assert.deepEqual(
    hits.map((m) => m.id),
    [created.id]
  );

  const row = core
    .getDbInstance()
    .prepare("SELECT access_count, last_accessed_at FROM memories WHERE id = ?")
    .get(created.id) as { access_count: number; last_accessed_at: string | null };
  assert.equal(row.access_count, 1);
  assert.ok(row.last_accessed_at);
});

test("retrieveMemories enforces the token budget but always returns at least one hit", async () => {
  await memory.createMemory(newMemory({ apiKeyId: "char-budget", content: "a".repeat(400) }));
  await memory.createMemory(newMemory({ apiKeyId: "char-budget", content: "b".repeat(400) }));

  const hits = await memory.retrieveMemories("char-budget", {
    retrievalStrategy: "exact",
    maxTokens: 1,
  });
  assert.equal(hits.length, 1);
});

test("retrieveMemories returns [] when disabled or with a zero budget", async () => {
  await memory.createMemory(newMemory({ apiKeyId: "char-off", content: "should not surface" }));
  assert.deepEqual(await memory.retrieveMemories("char-off", { enabled: false }), []);
  assert.deepEqual(await memory.retrieveMemories("char-off", { maxTokens: 0 }), []);
});

test("sqliteBackend.search with an explicit maxTokens recalls through retrieveMemories", async () => {
  await memory.createMemory(
    newMemory({ apiKeyId: "char-backend", content: "Backend search fixture about kubernetes" })
  );
  const hits = await memory.sqliteBackend.search({
    apiKeyId: "char-backend",
    query: "kubernetes",
    maxTokens: 2000,
  });
  assert.deepEqual(
    hits.map((m) => m.content),
    ["Backend search fixture about kubernetes"]
  );
});

test("listMemories / deleteMemory contracts", async () => {
  const created = await memory.createMemory(newMemory({ apiKeyId: "char-list" }));
  const listed = await memory.listMemories({ apiKeyId: "char-list" });
  assert.equal(listed.total, 1);
  assert.deepEqual(
    listed.data.map((m) => m.id),
    [created.id]
  );
  assert.equal(listed.byType.factual, 1);

  assert.equal(await memory.deleteMemory(created.id), true);
  assert.equal(await memory.getMemory(created.id), null);
  assert.equal(await memory.deleteMemory(created.id), false);
});

test("pure helpers: sanitizeFts5Query and estimateTokens", () => {
  assert.equal(
    memory.sanitizeFts5Query('deploy OR "drop" NEAR(x)'),
    '"deploy" "OR" "drop" "NEAR" "x"'
  );
  assert.equal(memory.sanitizeFts5Query("***"), "");
  assert.equal(memory.sanitizeFts5Query(undefined), "");
  assert.equal(memory.estimateTokens("abcd"), 1);
  assert.equal(memory.estimateTokens("abcde"), 2);
  assert.equal(memory.estimateTokens(""), 0);
});

// ─── (c) Invalid input — current behavior ────────────────────────────────────

test("getMemory / updateMemory / deleteMemory reject empty ids without throwing", async () => {
  assert.equal(await memory.getMemory(""), null);
  assert.equal(await memory.updateMemory("", { content: "x" }), false);
  assert.equal(await memory.deleteMemory(""), false);
  assert.equal(await memory.getMemory("does-not-exist"), null);
});

test("retrieveMemories rejects an unknown strategy / negative budget with a ZodError", async () => {
  await assert.rejects(
    memory.retrieveMemories("char-key-a", { retrievalStrategy: "bogus" } as never),
    (err: Error) => err.name === "ZodError"
  );
  await assert.rejects(
    memory.retrieveMemories("char-key-a", { maxTokens: -1 }),
    (err: Error) => err.name === "ZodError"
  );
});

test("createMemory with an unknown type fails at the DB CHECK constraint (no schema guard)", async () => {
  await assert.rejects(memory.createMemory(newMemory({ type: "bogus" })), (err: Error) =>
    /CHECK constraint failed/.test(err.message)
  );
});

test("memoryManager.configure rejects an unregistered primary backend", () => {
  assert.throws(
    () => memory.memoryManager.configure("not-a-backend"),
    /Primary backend "not-a-backend" not registered/
  );
  // The failed configure leaves the sqlite primary intact.
  assert.equal(memory.memoryManager.getPrimaryBackend().id, "sqlite");
});

test("characterization: createMemory UPSERT with a Date expiresAt currently throws (insert path stores it)", async () => {
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  // INSERT path: converts expiresAt with toISOString() — works.
  const created = await memory.createMemory(newMemory({ key: "char:upsert-expiry", expiresAt }));
  assert.ok(created.expiresAt instanceof Date);

  // UPDATE (upsert) path: binds the raw Date to SQLite — better-sqlite3 refuses it.
  await assert.rejects(
    memory.createMemory(newMemory({ key: "char:upsert-expiry", expiresAt, content: "v2" })),
    (err: Error) =>
      err instanceof TypeError &&
      /can only bind numbers, strings, bigints, buffers, and null/.test(err.message)
  );
});

test("sqliteBackend and memoryManager preserve the default search budget (#16183)", async () => {
  const created = await memory.createMemory(
    newMemory({ apiKeyId: "char-nomax", content: "Search without budget fixture" })
  );
  // Omitting the optional budget preserves the central retrieval default.
  const direct = await memory.sqliteBackend.search({ apiKeyId: "char-nomax", query: "budget" });
  const managed = await memory.memoryManager.search({ apiKeyId: "char-nomax", query: "budget" });
  assert.deepEqual(
    direct.map((item) => item.id),
    [created.id]
  );
  assert.deepEqual(
    managed.map((item) => item.id),
    [created.id]
  );
});

test("sqliteBackend.search honors SearchConfig.limit (#16185)", async () => {
  for (const n of [1, 2, 3]) {
    await memory.createMemory(
      newMemory({ apiKeyId: "char-limit", content: `limit fixture number ${n} widget` })
    );
  }
  const hits = await memory.sqliteBackend.search({
    apiKeyId: "char-limit",
    query: "widget",
    limit: 1,
    maxTokens: 2000,
  });
  assert.equal(hits.length, 1);
  assert.equal(hits[0].apiKeyId, "char-limit");
  assert.match(hits[0].content, /widget/);
});
