import { after, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-batch-update-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { batchUpdateProviderConnectionsSchema, providersBatchTestSchema } = await import(
  "../../src/shared/validation/schemas.ts"
);

type Connection = Awaited<ReturnType<typeof providersDb.createProviderConnection>>;

function getConnectionId(connection: Connection): string {
  assert.ok(connection);
  assert.equal(typeof connection.id, "string");
  return connection.id as string;
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createConnection(isActive: boolean): Promise<Connection> {
  // Distinct apiKey per connection — createProviderConnection dedupes by key value (#3023)
  const suffix = Math.random().toString(16).slice(2, 10);
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `openai-${suffix}`,
    apiKey: `sk-test-${suffix}`,
    isActive,
  });
}

beforeEach(async () => {
  await resetStorage();
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

describe("batchUpdateProviderConnectionsSchema", () => {
  it("accepts a valid ids + isActive payload", () => {
    const result = batchUpdateProviderConnectionsSchema.safeParse({
      ids: ["conn-1", "conn-2"],
      isActive: false,
    });
    assert.equal(result.success, true);
  });

  it("rejects an empty ids array", () => {
    const result = batchUpdateProviderConnectionsSchema.safeParse({ ids: [], isActive: true });
    assert.equal(result.success, false);
  });

  it("rejects more than 100 ids", () => {
    const ids = Array.from({ length: 101 }, (_, i) => `conn-${i}`);
    const result = batchUpdateProviderConnectionsSchema.safeParse({ ids, isActive: true });
    assert.equal(result.success, false);
  });

  it("rejects a missing isActive flag", () => {
    const result = batchUpdateProviderConnectionsSchema.safeParse({ ids: ["conn-1"] });
    assert.equal(result.success, false);
  });

  it("rejects blank ids", () => {
    const result = batchUpdateProviderConnectionsSchema.safeParse({
      ids: ["  "],
      isActive: true,
    });
    assert.equal(result.success, false);
  });
});

describe("providersBatchTestSchema mode=selected", () => {
  it("accepts mode=selected with connectionIds", () => {
    const result = providersBatchTestSchema.safeParse({
      mode: "selected",
      connectionIds: ["conn-1", "conn-2"],
    });
    assert.equal(result.success, true);
  });

  it("rejects mode=selected without connectionIds", () => {
    const result = providersBatchTestSchema.safeParse({ mode: "selected" });
    assert.equal(result.success, false);
  });

  it("rejects mode=selected with an empty connectionIds array", () => {
    const result = providersBatchTestSchema.safeParse({ mode: "selected", connectionIds: [] });
    assert.equal(result.success, false);
  });

  it("rejects mode=selected with more than 100 connectionIds", () => {
    const connectionIds = Array.from({ length: 101 }, (_, i) => `conn-${i}`);
    const result = providersBatchTestSchema.safeParse({ mode: "selected", connectionIds });
    assert.equal(result.success, false);
  });

  it("still accepts other modes without connectionIds", () => {
    const result = providersBatchTestSchema.safeParse({ mode: "provider", providerId: "openai" });
    assert.equal(result.success, true);
  });
});

describe("bulk isActive update round-trip", () => {
  it("deactivates and reactivates multiple connections, reporting unknown ids", async () => {
    const first = getConnectionId(await createConnection(true));
    const second = getConnectionId(await createConnection(true));
    const ids = [first, second, "missing-id"];

    // Mirrors the PATCH /api/providers loop: update each id, partition results
    const updatedIds: string[] = [];
    const notFoundIds: string[] = [];
    for (const id of ids) {
      const updated = await providersDb.updateProviderConnection(id, { isActive: false });
      if (updated) updatedIds.push(id);
      else notFoundIds.push(id);
    }

    assert.deepEqual(updatedIds, [first, second]);
    assert.deepEqual(notFoundIds, ["missing-id"]);

    for (const id of [first, second]) {
      const stored = await providersDb.getProviderConnectionById(id);
      assert.ok(stored);
      assert.equal(Boolean(stored.isActive), false);
    }

    await providersDb.updateProviderConnection(first, { isActive: true });
    const reactivated = await providersDb.getProviderConnectionById(first);
    assert.ok(reactivated);
    assert.equal(Boolean(reactivated.isActive), true);
  });

  it("getProviderConnections without filter reaches inactive connections (mode=selected)", async () => {
    const activeId = getConnectionId(await createConnection(true));
    const inactiveId = getConnectionId(await createConnection(false));

    const all = (await providersDb.getProviderConnections()) as Array<{ id: string }>;
    const allIds = new Set(all.map((c) => c.id));
    assert.ok(allIds.has(activeId));
    assert.ok(allIds.has(inactiveId));

    const activeOnly = (await providersDb.getProviderConnections({ isActive: true })) as Array<{
      id: string;
    }>;
    const activeIds = new Set(activeOnly.map((c) => c.id));
    assert.ok(activeIds.has(activeId));
    assert.ok(!activeIds.has(inactiveId));

    // Mirrors the test-batch mode=selected filter
    const idSet = new Set([inactiveId]);
    const selected = all.filter((c) => idSet.has(c.id));
    assert.equal(selected.length, 1);
    assert.equal(selected[0].id, inactiveId);
  });
});
