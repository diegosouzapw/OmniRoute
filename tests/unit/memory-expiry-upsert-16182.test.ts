import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";
import "../_setup/isolateDataDir.ts";

process.env.DISABLE_SQLITE_AUTO_BACKUP ||= "true";

const core = await import("../../src/lib/db/core.ts");
const store = await import("../../src/lib/memory/store.ts");
const { MemoryType } = await import("../../src/lib/memory/types.ts");

function input(key: string, expiresAt: Date | null = null) {
  return {
    apiKeyId: "expiry-owner-a",
    sessionId: "expiry-session-a",
    type: MemoryType.FACTUAL,
    key,
    content: "Original memory",
    metadata: { source: "expiry-regression", retained: true },
    expiresAt,
  };
}

async function drainWrites() {
  for (let round = 0; round < 3; round++) {
    await new Promise((resolve) => setImmediate(resolve));
  }
}

async function persisted(id: string, apiKeyId = "expiry-owner-a") {
  const result = await store.listMemories({ apiKeyId });
  const row = result.data.find((memory) => memory.id === id);
  assert.ok(row, "the record must be present in SQLite, independently of the ID cache");
  return row;
}

test.afterEach(drainWrites);
test.after(async () => {
  await drainWrites();
  core.resetDbInstance();
});

test("INSERT serializes a Date and returns the same expiration through SQLite", async () => {
  const expiresAt = new Date("2035-01-02T03:04:05.678Z");
  const created = await store.createMemory(input("insert-date", expiresAt));
  assert.ok(created.expiresAt instanceof Date);
  assert.equal(created.expiresAt.toISOString(), expiresAt.toISOString());
  assert.equal((await persisted(created.id)).expiresAt?.toISOString(), expiresAt.toISOString());
});

test("UPSERT adds a Date to an existing permanent memory without replacing its ID", async () => {
  const created = await store.createMemory(input("add-date"));
  const expiresAt = new Date("2035-02-03T04:05:06.789Z");
  const updated = await store.createMemory(input("add-date", expiresAt));
  assert.equal(updated.id, created.id);
  assert.equal(updated.expiresAt?.toISOString(), expiresAt.toISOString());
  assert.equal((await persisted(created.id)).expiresAt?.toISOString(), expiresAt.toISOString());
});

test("UPSERT accepts an unchanged Date on the same owner and key", async () => {
  const expiresAt = new Date("2035-03-04T05:06:07.890Z");
  const created = await store.createMemory(input("same-date", expiresAt));
  const updated = await store.createMemory(input("same-date", expiresAt));
  assert.equal(updated.id, created.id);
  assert.equal((await persisted(created.id)).expiresAt?.toISOString(), expiresAt.toISOString());
});

test("UPSERT changes expiration while preserving ownership, metadata and access telemetry", async () => {
  const original = input("changed-date", new Date("2035-04-05T06:07:08.901Z"));
  const created = await store.createMemory(original);
  const otherOwner = await store.createMemory({ ...original, apiKeyId: "expiry-owner-b" });
  store.recordMemoryAccess([created.id]);
  store.recordMemoryAccess([created.id]);
  const before = await store.getMemory(created.id);
  assert.equal(before?.accessCount, 2);
  assert.ok(before.lastAccessedAt instanceof Date);

  const expiresAt = new Date("2036-05-06T07:08:09.012Z");
  const updated = await store.createMemory({
    ...original,
    expiresAt,
    sessionId: "expiry-session-updated",
    type: MemoryType.EPISODIC,
    content: "Updated memory",
    metadata: { source: "upsert", added: "new" },
  });
  assert.equal(updated.id, created.id);
  assert.equal(updated.createdAt.toISOString(), created.createdAt.toISOString());
  assert.equal(updated.accessCount, 2);
  assert.equal(updated.lastAccessedAt?.toISOString(), before.lastAccessedAt.toISOString());
  assert.deepEqual(updated.metadata, { source: "upsert", retained: true, added: "new" });
  assert.equal(updated.sessionId, "expiry-session-updated");
  assert.equal(updated.type, MemoryType.EPISODIC);
  const cached = await store.getMemory(created.id);
  assert.equal(cached?.content, "Updated memory");
  assert.equal(cached?.expiresAt?.toISOString(), expiresAt.toISOString());
  assert.equal(
    (await persisted(otherOwner.id, "expiry-owner-b")).expiresAt?.toISOString(),
    original.expiresAt?.toISOString()
  );
  assert.equal((await store.listMemories({ apiKeyId: "expiry-owner-b" })).total, 1);

  await drainWrites();
  core.resetDbInstance();
  // A fresh process has neither the in-memory record cache nor an open DB handle.
  const cold = spawnSync(
    process.execPath,
    [
      "--import",
      "tsx/esm",
      "--input-type=module",
      "--eval",
      `
    const { getMemory } = await import("./src/lib/memory/store.ts");
    const { resetDbInstance } = await import("./src/lib/db/core.ts");
    try {
      console.log("EXPIRY16182:" + JSON.stringify(await getMemory(process.env.MEMORY_EXPIRY_READ_ID)));
    } finally { resetDbInstance(); }
  `,
    ],
    {
      cwd: new URL("../..", import.meta.url),
      env: { ...process.env, MEMORY_EXPIRY_READ_ID: created.id },
      encoding: "utf8",
    }
  );
  assert.equal(cold.status, 0, cold.stderr);
  const line = cold.stdout.split("\n").find((value) => value.startsWith("EXPIRY16182:"));
  assert.ok(line, "the fresh process must return the persisted record");
  assert.deepEqual(
    JSON.parse(line.slice("EXPIRY16182:".length)),
    JSON.parse(JSON.stringify(updated))
  );
});

for (const mode of ["null", "omitted"] as const) {
  test(`UPSERT with ${mode} expiration clears a previous Date`, async () => {
    const key = `clear-${mode}`;
    const created = await store.createMemory(input(key, new Date("2035-06-07T08:09:10.123Z")));
    const replacement = input(key);
    if (mode === "omitted") delete replacement.expiresAt;
    const updated = await store.createMemory(replacement);
    assert.equal(updated.id, created.id);
    assert.equal(updated.expiresAt, null);
    assert.equal((await store.getMemory(created.id))?.expiresAt, null);
    assert.equal((await persisted(created.id)).expiresAt, null);
  });
}
