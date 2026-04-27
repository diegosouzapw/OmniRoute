import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-memory-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const store = await import("../../src/lib/memory/store.ts");
const memoryRoute = await import("../../src/app/api/memory/route.ts");
const { MemoryType } = await import("../../src/lib/memory/types.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function seedMemories() {
  await store.createMemory({
    apiKeyId: "key-a",
    sessionId: "session-a",
    type: MemoryType.FACTUAL,
    key: "typescript:guide",
    content: "TypeScript setup guide",
    metadata: {},
    expiresAt: null,
  });
  await store.createMemory({
    apiKeyId: "key-a",
    sessionId: "session-a",
    type: MemoryType.EPISODIC,
    key: "deploy:runbook",
    content: "Production deployment runbook",
    metadata: {},
    expiresAt: null,
  });
  await store.createMemory({
    apiKeyId: "key-a",
    sessionId: "session-a",
    type: MemoryType.SEMANTIC,
    key: "typescript:tooling",
    content: "Lint and editor integration",
    metadata: {},
    expiresAt: null,
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("GET /api/memory filters by q and returns matching stats", async () => {
  await seedMemories();

  const response = await memoryRoute.GET(
    new Request("http://localhost/api/memory?apiKeyId=key-a&q=typescript&limit=20&page=1")
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as any;

  assert.deepEqual(
    body.data.map((memory) => memory.key),
    ["typescript:tooling", "typescript:guide"]
  );
  assert.equal(body.total, 2);
  assert.equal(body.stats.total, 2);
  assert.deepEqual(body.stats.byType, { factual: 1, semantic: 1 });
});

test("GET /api/memory continues to honor limit+offset requests", async () => {
  await seedMemories();

  const response = await memoryRoute.GET(
    new Request("http://localhost/api/memory?apiKeyId=key-a&limit=1&offset=1")
  );

  assert.equal(response.status, 200);
  const body = (await response.json()) as any;

  assert.equal(body.data.length, 1);
  assert.equal(body.total, 3);
  assert.equal(body.page, 2);
});
