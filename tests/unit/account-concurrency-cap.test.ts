import { after, beforeEach, describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-account-cap-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { updateProviderConnectionSchema } = await import("../../src/shared/validation/schemas.ts");

type Connection = Awaited<ReturnType<typeof providersDb.createProviderConnection>>;
type StoredConnection = Awaited<ReturnType<typeof providersDb.getProviderConnectionById>>;

function assertConnection(connection: Connection): asserts connection is NonNullable<Connection> {
  assert.ok(connection);
}

function assertStoredConnection(
  connection: StoredConnection
): asserts connection is NonNullable<StoredConnection> {
  assert.ok(connection);
}

function getConnectionId(connection: NonNullable<Connection>): string {
  assert.equal(typeof connection.id, "string");
  return connection.id as string;
}

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

async function createConnection(maxConcurrent: number | null): Promise<Connection> {
  return providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: `openai-${String(maxConcurrent)}-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "sk-test",
    maxConcurrent,
  });
}

beforeEach(async () => {
  await resetStorage();
});

after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

describe("maxConcurrent DB round-trip", () => {
  it("stores and retrieves maxConcurrent=3", async () => {
    const created = await createConnection(3);
    assertConnection(created);
    const connectionId = getConnectionId(created);

    const stored = await providersDb.getProviderConnectionById(connectionId);
    assertStoredConnection(stored);
    assert.equal(stored.maxConcurrent, 3);
  });

  it("stores and retrieves maxConcurrent=null", async () => {
    const created = await createConnection(null);
    assertConnection(created);
    const connectionId = getConnectionId(created);

    const stored = await providersDb.getProviderConnectionById(connectionId);
    assertStoredConnection(stored);
    assert.equal(stored.maxConcurrent, null);
  });

  it("stores and retrieves maxConcurrent=0", async () => {
    const created = await createConnection(3);
    assertConnection(created);
    const connectionId = getConnectionId(created);

    const updated = await providersDb.updateProviderConnection(connectionId, { maxConcurrent: 0 });
    assertConnection(updated);
    assert.equal(updated.maxConcurrent, 0);

    const stored = await providersDb.getProviderConnectionById(connectionId);
    assertStoredConnection(stored);
    assert.equal(stored.maxConcurrent, 0);
  });
});

describe("maxConcurrent validation", () => {
  it("rejects negative values", () => {
    const result = updateProviderConnectionSchema.safeParse({ maxConcurrent: -1 });

    assert.equal(result.success, false);
  });

  it("accepts positive integers", () => {
    const result = updateProviderConnectionSchema.safeParse({ maxConcurrent: 3 });

    assert.equal(result.success, true);
    assert.equal(result.data.maxConcurrent, 3);
  });

  it("accepts null/undefined as unlimited", () => {
    const nullResult = updateProviderConnectionSchema.safeParse({ maxConcurrent: null });
    const undefinedResult = updateProviderConnectionSchema.safeParse({ name: "unchanged" });

    assert.equal(nullResult.success, true);
    assert.equal(nullResult.data.maxConcurrent, null);
    assert.equal(undefinedResult.success, true);
    assert.equal(undefinedResult.data.maxConcurrent, undefined);
  });
});
