import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-memory-category-"));
process.env.DATA_DIR = TEST_DATA_DIR;
const previousApiKeySecret = process.env.API_KEY_SECRET;
process.env.API_KEY_SECRET = "memory-category-test-api-key-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeys = await import("../../src/lib/db/apiKeys.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const localDb = { updateSettings };
const { GET } = await import("../../src/app/api/memory/route.ts");
let managementKey: string;

async function resetStorage() {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function insertMemoryRow({
  id,
  category,
  type = "factual",
  sessionId = "session-a",
  metadata,
}: {
  id: string;
  category?: string;
  type?: string;
  sessionId?: string;
  metadata?: string;
}) {
  const db = core.getDbInstance();
  const now = new Date().toISOString();
  const serializedMetadata = metadata ?? JSON.stringify(category === undefined ? {} : { category });

  db.prepare(
    `INSERT INTO memories (
      id, api_key_id, session_id, type, key, content, metadata, created_at, updated_at, expires_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    "key-a",
    sessionId,
    type,
    `memory:${id}`,
    `content ${id}`,
    serializedMetadata,
    now,
    now,
    null
  );
}

async function getMemories(query = "") {
  const response = await GET(
    new Request(`http://localhost/api/memory${query}`, {
      headers: { authorization: `Bearer ${managementKey}` },
    })
  );
  assert.equal(response.status, 200);
  return response.json();
}

test.beforeEach(async () => {
  await resetStorage();
  // Exercise the real authenticated management path in both local and CI
  // environments. INITIAL_PASSWORD in CI can enable login during bootstrap.
  await localDb.updateSettings({ requireLogin: true, setupComplete: true });
  const key = await apiKeys.createApiKey("memory-category-test", "memory-category-machine", [
    "manage",
  ]);
  managementKey = key.key;
});

test.after(() => {
  core.resetDbInstance();
  apiKeys.resetApiKeyState();
  if (previousApiKeySecret === undefined) delete process.env.API_KEY_SECRET;
  else process.env.API_KEY_SECRET = previousApiKeySecret;
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/memory still rejects an unauthenticated localhost URL", async () => {
  const response = await GET(new Request("http://localhost/api/memory"));
  assert.equal(response.status, 401);
});

test("GET /api/memory still rejects an inference-only API key", async () => {
  const key = await apiKeys.createApiKey("inference-only", "memory-category-machine");
  const response = await GET(
    new Request("http://localhost/api/memory", {
      headers: { authorization: `Bearer ${key.key}` },
    })
  );
  assert.equal(response.status, 403);
});

test("GET /api/memory filters by metadata.category and keeps totals in sync", async () => {
  insertMemoryRow({ id: "codegraph-1", category: "codegraph", type: "factual" });
  insertMemoryRow({ id: "codegraph-2", category: "codegraph", type: "semantic" });
  insertMemoryRow({ id: "decision-1", category: "decision", type: "episodic" });

  const body = await getMemories("?category=codegraph");

  assert.deepEqual(body.data.map((memory: { id: string }) => memory.id).sort(), [
    "codegraph-1",
    "codegraph-2",
  ]);
  assert.equal(body.total, 2);
  assert.equal(body.stats.total, 2);
  assert.deepEqual(body.stats.byType, { factual: 1, semantic: 1 });
});

test("GET /api/memory composes category with existing filters and pagination", async () => {
  insertMemoryRow({ id: "keep-1", category: "decision", type: "episodic", sessionId: "session-a" });
  insertMemoryRow({ id: "keep-2", category: "decision", type: "episodic", sessionId: "session-a" });
  insertMemoryRow({
    id: "wrong-type",
    category: "decision",
    type: "factual",
    sessionId: "session-a",
  });
  insertMemoryRow({
    id: "wrong-session",
    category: "decision",
    type: "episodic",
    sessionId: "session-b",
  });

  const body = await getMemories(
    "?category=decision&type=episodic&sessionId=session-a&limit=1&offset=1"
  );

  assert.equal(body.data.length, 1);
  assert.ok(["keep-1", "keep-2"].includes(body.data[0].id));
  assert.equal(body.total, 2);
  assert.equal(body.stats.total, 2);
  assert.deepEqual(body.stats.byType, { episodic: 2 });
});

test("GET /api/memory returns no matches for an unknown category", async () => {
  insertMemoryRow({ id: "known", category: "codegraph" });

  const body = await getMemories("?category=missing");

  assert.deepEqual(body.data, []);
  assert.equal(body.total, 0);
  assert.equal(body.stats.total, 0);
  assert.deepEqual(body.stats.byType, {});
});

test("GET /api/memory ignores malformed metadata when applying category filter", async () => {
  insertMemoryRow({ id: "valid", category: "codegraph" });
  insertMemoryRow({ id: "malformed", metadata: "{not-json" });

  const filtered = await getMemories("?category=codegraph");
  assert.deepEqual(
    filtered.data.map((memory: { id: string }) => memory.id),
    ["valid"]
  );
  assert.equal(filtered.total, 1);

  const unfiltered = await getMemories();
  assert.equal(unfiltered.total, 2);
});
