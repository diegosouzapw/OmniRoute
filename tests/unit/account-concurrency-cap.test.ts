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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
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

describe("rateLimitOverrides.modelConcurrency schema", () => {
  it("accepts valid exact model keys and positive integer caps", () => {
    const result = updateProviderConnectionSchema.safeParse({
      rateLimitOverrides: { modelConcurrency: { "glm-5": 1, "glm-4.7": 3 } },
    });

    assert.equal(result.success, true);
    assert.deepEqual(result.data.rateLimitOverrides.modelConcurrency, {
      "glm-5": 1,
      "glm-4.7": 3,
    });
  });

  it("accepts the nested map alongside legacy scalar fields", () => {
    const result = updateProviderConnectionSchema.safeParse({
      rateLimitOverrides: { maxConcurrent: 4, rpm: 60, modelConcurrency: { "glm-5": 1 } },
    });

    assert.equal(result.success, true);
    assert.equal(result.data.rateLimitOverrides.maxConcurrent, 4);
    assert.equal(result.data.rateLimitOverrides.rpm, 60);
    assert.deepEqual(result.data.rateLimitOverrides.modelConcurrency, { "glm-5": 1 });
  });

  it("rejects zero, negative, and fractional caps", () => {
    for (const cap of [0, -1, 1.5]) {
      const result = updateProviderConnectionSchema.safeParse({
        rateLimitOverrides: { modelConcurrency: { "glm-5": cap } },
      });
      assert.equal(result.success, false, `cap ${cap} must be rejected`);
    }
  });

  it("rejects oversized model keys and non-object maps", () => {
    const longKey = `m-${"x".repeat(128)}`;
    const longResult = updateProviderConnectionSchema.safeParse({
      rateLimitOverrides: { modelConcurrency: { [longKey]: 1 } },
    });
    assert.equal(longResult.success, false);

    const arrayResult = updateProviderConnectionSchema.safeParse({
      rateLimitOverrides: { modelConcurrency: ["glm-5"] },
    });
    assert.equal(arrayResult.success, false);
  });

  it("treats null as absent and still rejects unknown scalar keys", () => {
    const nullResult = updateProviderConnectionSchema.safeParse({
      rateLimitOverrides: { rpm: 60, modelConcurrency: null },
    });
    assert.equal(nullResult.success, true);
    assert.equal(nullResult.data.rateLimitOverrides.modelConcurrency, undefined);

    const typoResult = updateProviderConnectionSchema.safeParse({
      rateLimitOverrides: { tmp: 60 },
    });
    assert.equal(typoResult.success, false);
  });
});

describe("modelConcurrency DB round-trip", () => {
  async function createWithOverrides(overrides: unknown) {
    return providersDb.createProviderConnection({
      provider: "openai",
      authType: "apikey",
      name: `openai-mc-${Math.random().toString(16).slice(2, 8)}`,
      apiKey: "sk-test",
      rateLimitOverrides: overrides,
    });
  }

  it("persists and reads back the nested map with scalars", async () => {
    const created = await createWithOverrides({
      maxConcurrent: 4,
      modelConcurrency: { "glm-5": 1, "glm-4.7": 3 },
    });
    assertConnection(created);
    const connectionId = getConnectionId(created);

    const stored = await providersDb.getProviderConnectionById(connectionId);
    assertStoredConnection(stored);
    assert.equal(stored.rateLimitOverrides.maxConcurrent, 4);
    assert.deepEqual(stored.rateLimitOverrides.modelConcurrency, {
      "glm-5": 1,
      "glm-4.7": 3,
    });
  });

  it("normalizes an empty map away while keeping scalars", async () => {
    const created = await createWithOverrides({ rpm: 60, modelConcurrency: {} });
    assertConnection(created);
    assert.equal(created.rateLimitOverrides.rpm, 60);
    assert.equal("modelConcurrency" in (created.rateLimitOverrides ?? {}), false);

    const stored = await providersDb.getProviderConnectionById(getConnectionId(created));
    assertStoredConnection(stored);
    assert.equal(stored.rateLimitOverrides.rpm, 60);
    assert.equal("modelConcurrency" in (stored.rateLimitOverrides ?? {}), false);
  });

  it("refuses to persist malformed maps instead of dropping intent", async () => {
    await assert.rejects(
      () =>
        createWithOverrides({
          modelConcurrency: { "glm-5": 0 },
        }),
      /Refusing to persist rateLimitOverrides with rejected keys: modelConcurrency\.glm-5/
    );
  });

  it("keeps the map on unrelated updates and clears it on null", async () => {
    const created = await createWithOverrides({ modelConcurrency: { "glm-5": 1 } });
    assertConnection(created);
    const connectionId = getConnectionId(created);

    const renamed = await providersDb.updateProviderConnection(connectionId, {
      name: "renamed",
    });
    assertConnection(renamed);
    assert.deepEqual(renamed.rateLimitOverrides.modelConcurrency, { "glm-5": 1 });

    const cleared = await providersDb.updateProviderConnection(connectionId, {
      rateLimitOverrides: null,
    });
    assertConnection(cleared);
    assert.equal(cleared.rateLimitOverrides, null);
  });
});
