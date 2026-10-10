import assert from "node:assert/strict";
import test from "node:test";
import "../_setup/isolateDataDir.ts";
import type { A2ATask } from "../../src/lib/a2a/taskManager.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.OMNIROUTE_A2A_MEMORY_HITS;

const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { collectMemoryHits } = await import("../../src/lib/a2a/taskExecution.ts");
const { sqliteBackend, memoryManager, retrieveMemories, MemoryType } =
  await import("../../src/lib/memory/index.ts");

const createdIds: string[] = [];
let sequence = 0;

async function seed(owner: string, contents: string[]) {
  const memories = [];
  for (const content of contents) {
    const memory = await sqliteBackend.create({
      apiKeyId: owner,
      sessionId: "search-contract",
      type: MemoryType.FACTUAL,
      key: `search-contract-${++sequence}`,
      content,
    });
    createdIds.push(memory.id);
    memories.push(memory);
  }
  return memories;
}

async function drainScheduledWrites() {
  // createMemory schedules a vector upsert; embeddings are unconfigured in this temp DB.
  for (let round = 0; round < 3; round++) {
    await new Promise<void>((resolve) => setImmediate(resolve));
  }
}

test.afterEach(async () => {
  await drainScheduledWrites();
  for (const id of createdIds.splice(0)) await sqliteBackend.delete(id);
});

test.after(async () => {
  await drainScheduledWrites();
  await memoryManager.shutdown();
  resetDbInstance();
});

test("setup control: SQLite persists a matching memory and direct retrieval finds it", async () => {
  const [stored] = await seed("setup-owner", ["The staging cluster is called aurora"]);
  assert.equal((await sqliteBackend.get(stored.id))?.content, stored.content);
  const direct = await retrieveMemories("setup-owner", { query: "aurora staging" });
  assert.deepEqual(
    direct.map((memory) => memory.id),
    [stored.id]
  );
  assert.equal(memoryManager.getPrimaryBackend(), sqliteBackend);
});

test("#16183: SQLite search uses the central budget when both optional fields are omitted", async () => {
  const [stored] = await seed("defaults-owner", ["The staging cluster is called aurora"]);
  const hits = await sqliteBackend.search({ apiKeyId: "defaults-owner", query: "aurora staging" });
  assert.deepEqual(
    hits.map((memory) => memory.id),
    [stored.id]
  );
});

test("#16183: explicitly undefined optional fields behave like omitted fields", async () => {
  const [stored] = await seed("undefined-owner", ["Aurora staging is ready"]);
  const hits = await sqliteBackend.search({
    apiKeyId: "undefined-owner",
    query: "aurora",
    maxTokens: undefined,
    strategy: undefined,
  });
  assert.deepEqual(
    hits.map((memory) => memory.id),
    [stored.id]
  );
});

test("#16183: memoryManager preserves a real default SQLite search result", async () => {
  const [stored] = await seed("manager-owner", ["Aurora staging is ready"]);
  const hits = await memoryManager.search({ apiKeyId: "manager-owner", query: "aurora" });
  assert.deepEqual(
    hits.map((memory) => memory.id),
    [stored.id]
  );
});

for (const strategy of ["exact", "hybrid", "semantic"] as const) {
  test(`explicit ${strategy} strategy and budget preserve owner isolation`, async () => {
    const [stored] = await seed("strategy-owner", ["Aurora staging is ready"]);
    await seed("foreign-owner", ["Aurora staging is private"]);
    await seed("strategy-owner", ["Coffee is served at nine"]);
    const hits = await sqliteBackend.search({
      apiKeyId: "strategy-owner",
      query: "aurora",
      maxTokens: 2000,
      strategy,
    });
    assert.deepEqual(
      hits.map((memory) => memory.id),
      [stored.id]
    );
  });
}

test("default search does not return another owner's memory or an unrelated query", async () => {
  await seed("private-owner", ["Aurora staging is ready"]);
  assert.deepEqual(await sqliteBackend.search({ apiKeyId: "other-owner", query: "aurora" }), []);
  assert.deepEqual(await sqliteBackend.search({ apiKeyId: "private-owner", query: "volcano" }), []);
});

test("#16185: limits cap the ranked prefix without changing the omitted-limit result", async () => {
  await seed("limit-owner", ["widget widget widget", "widget widget", "widget"]);
  const config = { apiKeyId: "limit-owner", query: "widget", maxTokens: 2000 };
  const full = await sqliteBackend.search(config);
  assert.equal(full.length, 3, "setup provides more than one matching memory");
  for (const limit of [1, 2, 5]) {
    const hits = await sqliteBackend.search({ ...config, limit });
    assert.deepEqual(
      hits.map((memory) => memory.id),
      full.slice(0, limit).map((memory) => memory.id)
    );
  }
});

test("#16185: default budget and limit work together through memoryManager", async () => {
  await seed("manager-limit-owner", ["widget widget widget", "widget widget", "widget"]);
  const hits = await memoryManager.search({
    apiKeyId: "manager-limit-owner",
    query: "widget",
    limit: 1,
  });
  assert.equal(hits.length, 1);
  assert.equal(hits[0].apiKeyId, "manager-limit-owner");
});

test("zero result limit returns no hits", async () => {
  await seed("zero-limit-owner", ["widget"]);
  assert.deepEqual(
    await sqliteBackend.search({
      apiKeyId: "zero-limit-owner",
      query: "widget",
      maxTokens: 2000,
      limit: 0,
    }),
    []
  );
});

for (const limit of [-1, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
  test(`invalid result limit ${limit} is rejected rather than rounded or sliced negatively`, async () => {
    await seed("invalid-limit-owner", ["widget", "widget second"]);
    await assert.rejects(
      sqliteBackend.search({
        apiKeyId: "invalid-limit-owner",
        query: "widget",
        maxTokens: 2000,
        limit,
      }),
      RangeError
    );
  });
}

test("an explicit zero token budget remains zero even with a positive result limit", async () => {
  await seed("zero-budget-owner", ["widget"]);
  assert.deepEqual(
    await sqliteBackend.search({
      apiKeyId: "zero-budget-owner",
      query: "widget",
      maxTokens: 0,
      limit: 1,
    }),
    []
  );
});

test("a small token budget retains the central first-hit behavior without filling the limit", async () => {
  await seed("small-budget-owner", [
    "widget ".repeat(100),
    "widget ".repeat(90),
    "widget ".repeat(80),
  ]);
  const hits = await sqliteBackend.search({
    apiKeyId: "small-budget-owner",
    query: "widget",
    maxTokens: 1,
    limit: 3,
  });
  assert.equal(hits.length, 1);
  assert.equal(hits[0].apiKeyId, "small-budget-owner");
});

test("invalid explicit token budgets still reject through the central schema", async () => {
  for (const maxTokens of [-1, 1.5]) {
    await assert.rejects(
      sqliteBackend.search({ apiKeyId: "invalid-budget-owner", query: "widget", maxTokens }),
      (error: Error) => error.name === "ZodError"
    );
  }
});

function keylessTask(query: string): A2ATask {
  return {
    id: "memory-contract-task",
    skill: "smart-routing",
    state: "working",
    input: { skill: "smart-routing", messages: [{ role: "user", content: query }] },
    artifacts: [],
    events: [],
    metadata: {},
    createdAt: "2026-10-10T00:00:00.000Z",
    updatedAt: "2026-10-10T00:00:00.000Z",
    expiresAt: "2026-10-11T00:00:00.000Z",
  };
}

test("#16184: real keyless A2A recall returns the persisted SQLite hit and truncates its snippet", async () => {
  const [stored] = await seed("mcp", ["Aurora staging ".repeat(20)]);
  await seed("foreign-a2a-owner", ["Aurora staging private"]);
  const direct = await retrieveMemories("mcp", { query: "aurora staging" });
  assert.deepEqual(
    direct.map((memory) => memory.id),
    [stored.id]
  );
  const hits = await collectMemoryHits(keylessTask("aurora staging"));
  assert.deepEqual(hits, [
    { id: stored.id, key: stored.key, type: stored.type, snippet: stored.content.slice(0, 200) },
  ]);
  assert.equal(hits[0].snippet.length, 200);
});

test("#16184/#16185: real A2A recall caps matching SQLite memories at five", async () => {
  const stored = await seed(
    "mcp",
    Array.from({ length: 7 }, (_, index) => `Aurora staging node ${index}`)
  );
  await seed("foreign-a2a-owner", ["Aurora staging private"]);
  const hits = await collectMemoryHits(keylessTask("aurora staging"));
  assert.equal(hits.length, 5);
  assert.equal(new Set(hits.map((hit) => hit.id)).size, 5);
  assert.ok(hits.every((hit) => stored.some((memory) => memory.id === hit.id)));
});
