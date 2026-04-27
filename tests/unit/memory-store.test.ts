import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-memory-store-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const store = await import("../../src/lib/memory/store.ts");
const { MemoryType } = await import("../../src/lib/memory/types.ts");

async function resetStorage() {
  core.resetDbInstance();

  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: any) {
      if ((error?.code === "EBUSY" || error?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }

  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function insertMemoryRow({
  id,
  apiKeyId = "key-a",
  sessionId = "session-a",
  type = "factual",
  key = "memory:key",
  content = "stored content",
  metadata = "{}",
  createdAt = new Date().toISOString(),
  updatedAt = createdAt,
  expiresAt = null,
}) {
  const db = core.getDbInstance();
  db.prepare(
    `INSERT INTO memories (
      id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(id, apiKeyId, sessionId, type, key, content, metadata, createdAt, updatedAt, expiresAt);
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("memory store CRUD round-trip persists to the memories table and invalidates cache on update/delete", async () => {
  const expiresAt = new Date("2026-04-06T00:00:00.000Z");
  const created = await store.createMemory({
    apiKeyId: "key-a",
    sessionId: "session-a",
    type: MemoryType.FACTUAL,
    key: "preference:theme",
    content: "User prefers a compact dashboard",
    metadata: { source: "test" },
    expiresAt,
  });

  const fetched = await store.getMemory(created.id);
  assert.equal(fetched?.apiKeyId, "key-a");
  assert.equal(fetched?.key, "preference:theme");
  assert.deepEqual(fetched?.metadata, { source: "test" });
  assert.equal(fetched?.expiresAt?.toISOString(), expiresAt.toISOString());

  const updated = await store.updateMemory(created.id, {
    type: MemoryType.EPISODIC,
    key: "decision:layout",
    content: "Switched to the analytics-first layout",
    metadata: { source: "update" },
    expiresAt: null,
  });
  assert.equal(updated, true);

  const refreshed = await store.getMemory(created.id);
  assert.equal(refreshed?.type, MemoryType.EPISODIC);
  assert.equal(refreshed?.content, "Switched to the analytics-first layout");
  assert.deepEqual(refreshed?.metadata, { source: "update" });
  assert.equal(refreshed?.expiresAt, null);

  assert.equal(await store.deleteMemory(created.id), true);
  assert.equal(await store.getMemory(created.id), null);
  assert.equal(await store.deleteMemory(created.id), false);
});

test("getMemory returns null for invalid identifiers and tolerates malformed metadata rows", async () => {
  assert.equal(await store.getMemory(""), null);
  assert.equal(await store.getMemory("missing-id"), null);

  insertMemoryRow({
    id: "broken-metadata",
    metadata: "{not-json",
    content: "Corrupt metadata should not break reads",
  });

  const fetched = await store.getMemory("broken-metadata");
  assert.equal(fetched?.content, "Corrupt metadata should not break reads");
  assert.deepEqual(fetched?.metadata, {});
});

test("updateMemory returns false for missing ids and listMemories handles an empty store", async () => {
  assert.equal(await store.updateMemory("missing-id", { content: "noop" }), false);
  const result = await store.listMemories({ apiKeyId: "missing-key" });
  assert.deepEqual(result.data, []);
  assert.equal(result.total, 0);
});

test("listMemories filters by api key, type and session while preserving newest-first ordering", async () => {
  insertMemoryRow({
    id: "mem-1",
    apiKeyId: "key-a",
    sessionId: "session-a",
    type: "factual",
    key: "pref:1",
    content: "Older factual memory",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  });
  insertMemoryRow({
    id: "mem-2",
    apiKeyId: "key-a",
    sessionId: "session-a",
    type: "episodic",
    key: "decision:1",
    content: "Newest episodic memory",
    createdAt: "2026-04-03T00:00:00.000Z",
    updatedAt: "2026-04-03T00:00:00.000Z",
  });
  insertMemoryRow({
    id: "mem-3",
    apiKeyId: "key-b",
    sessionId: "session-b",
    type: "semantic",
    key: "semantic:1",
    content: "Different api key",
    createdAt: "2026-04-02T00:00:00.000Z",
    updatedAt: "2026-04-02T00:00:00.000Z",
  });

  const allForKeyA = await store.listMemories({ apiKeyId: "key-a" });
  const onlySessionA = await store.listMemories({ apiKeyId: "key-a", sessionId: "session-a" });
  const onlyEpisodic = await store.listMemories({ apiKeyId: "key-a", type: MemoryType.EPISODIC });

  assert.deepEqual(
    allForKeyA.data.map((memory) => memory.id),
    ["mem-2", "mem-1"]
  );
  assert.equal(allForKeyA.total, 2);
  assert.deepEqual(
    onlySessionA.data.map((memory) => memory.id),
    ["mem-2", "mem-1"]
  );
  assert.equal(onlySessionA.total, 2);
  assert.deepEqual(
    onlyEpisodic.data.map((memory) => memory.id),
    ["mem-2"]
  );
  assert.equal(onlyEpisodic.total, 1);
});

test("listMemories supports limit and offset pagination even when only offset is provided", async () => {
  insertMemoryRow({
    id: "page-1",
    content: "oldest",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  });
  insertMemoryRow({
    id: "page-2",
    content: "middle",
    createdAt: "2026-04-02T00:00:00.000Z",
    updatedAt: "2026-04-02T00:00:00.000Z",
  });
  insertMemoryRow({
    id: "page-3",
    content: "newest",
    createdAt: "2026-04-03T00:00:00.000Z",
    updatedAt: "2026-04-03T00:00:00.000Z",
  });

  const paged = await store.listMemories({ apiKeyId: "key-a", limit: 1, offset: 1 });
  const offsetOnly = await store.listMemories({ apiKeyId: "key-a", offset: 1 });

  assert.deepEqual(
    paged.data.map((memory) => memory.id),
    ["page-2"]
  );
  assert.equal(paged.total, 3);
  assert.deepEqual(
    offsetOnly.data.map((memory) => memory.id),
    ["page-2", "page-1"]
  );
  assert.equal(offsetOnly.total, 3);
});

test("listMemories applies query filtering before pagination and type stats", async () => {
  insertMemoryRow({
    id: "search-1",
    key: "typescript:guide",
    content: "TypeScript project setup",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  });
  insertMemoryRow({
    id: "search-2",
    type: "episodic",
    key: "deployment:note",
    content: "Production deployment checklist",
    createdAt: "2026-04-02T00:00:00.000Z",
    updatedAt: "2026-04-02T00:00:00.000Z",
  });
  insertMemoryRow({
    id: "search-3",
    type: "semantic",
    key: "tooling:typescript",
    content: "Editor plugins and linting",
    createdAt: "2026-04-03T00:00:00.000Z",
    updatedAt: "2026-04-03T00:00:00.000Z",
  });

  const filtered = await store.listMemories({
    apiKeyId: "key-a",
    query: "typescript",
    limit: 10,
  });

  assert.deepEqual(
    filtered.data.map((memory) => memory.id),
    ["search-3", "search-1"]
  );
  assert.equal(filtered.total, 2);
  assert.deepEqual(filtered.byType, { factual: 1, semantic: 1 });
});

test("listMemories supports page-based pagination (page 1)", async () => {
  insertMemoryRow({
    id: "pg-1",
    content: "first",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  });
  insertMemoryRow({
    id: "pg-2",
    content: "second",
    createdAt: "2026-04-02T00:00:00.000Z",
    updatedAt: "2026-04-02T00:00:00.000Z",
  });
  insertMemoryRow({
    id: "pg-3",
    content: "third",
    createdAt: "2026-04-03T00:00:00.000Z",
    updatedAt: "2026-04-03T00:00:00.000Z",
  });

  const page1 = await store.listMemories({ apiKeyId: "key-a", page: 1, limit: 2 });
  assert.deepEqual(
    page1.data.map((m) => m.id),
    ["pg-3", "pg-2"]
  );
  assert.equal(page1.total, 3);
});

test("listMemories supports page-based pagination (page 2 returns remainder)", async () => {
  insertMemoryRow({
    id: "pg-1",
    content: "first",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  });
  insertMemoryRow({
    id: "pg-2",
    content: "second",
    createdAt: "2026-04-02T00:00:00.000Z",
    updatedAt: "2026-04-02T00:00:00.000Z",
  });
  insertMemoryRow({
    id: "pg-3",
    content: "third",
    createdAt: "2026-04-03T00:00:00.000Z",
    updatedAt: "2026-04-03T00:00:00.000Z",
  });

  const page2 = await store.listMemories({ apiKeyId: "key-a", page: 2, limit: 2 });
  assert.deepEqual(
    page2.data.map((m) => m.id),
    ["pg-1"]
  );
  assert.equal(page2.total, 3);
});

test("listMemories returns empty data for a page beyond the result set", async () => {
  insertMemoryRow({
    id: "pg-1",
    content: "only entry",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  });

  const beyondPage = await store.listMemories({ apiKeyId: "key-a", page: 99, limit: 10 });
  assert.deepEqual(beyondPage.data, []);
  assert.equal(beyondPage.total, 1);
});

test("listMemories page parameter defaults to page 1 when omitted with limit", async () => {
  insertMemoryRow({
    id: "pg-1",
    content: "first",
    createdAt: "2026-04-01T00:00:00.000Z",
    updatedAt: "2026-04-01T00:00:00.000Z",
  });
  insertMemoryRow({
    id: "pg-2",
    content: "second",
    createdAt: "2026-04-02T00:00:00.000Z",
    updatedAt: "2026-04-02T00:00:00.000Z",
  });

  const defaultPage = await store.listMemories({ apiKeyId: "key-a", limit: 1 });
  assert.deepEqual(
    defaultPage.data.map((m) => m.id),
    ["pg-2"]
  );
  assert.equal(defaultPage.total, 2);
});
