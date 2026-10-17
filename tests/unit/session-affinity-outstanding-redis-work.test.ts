import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { AffinityRedisClient } from "../../src/lib/db/sessionAffinity/redisStore.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-outstanding-affinity-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
const core = await import("../../src/lib/db/core.ts");
const { sqliteSessionAffinityStore: local } =
  await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const { RedisSessionAffinityStore } =
  await import("../../src/lib/db/sessionAffinity/redisStore.ts");
const { SESSION_AFFINITY_REDIS_TIMEOUT_MS: timeout } =
  await import("../../src/lib/db/sessionAffinity/storeFactory.ts");
const cap = 8;
const now = 1_000_000;
const ttl = 60_000;
const identity = "a".repeat(64);
const flush = () => new Promise<void>((resolve) => setImmediate(resolve));

class StalledRedis implements AffinityRedisClient {
  calls = 0;
  holding = true;
  pending: Array<{ resolve: (reply: unknown) => void; reject: (error: Error) => void }> = [];
  async get(_key: string): Promise<string | null> {
    throw new Error("unexpected synthetic get");
  }
  async set(_key: string, _value: string, _mode: "PX", _ttl: number) {
    throw new Error("unexpected synthetic set");
  }
  async del(_key: string): Promise<number> {
    throw new Error("unexpected synthetic del");
  }
  async eval(_script: string, _keys: number, _key: string, ...args: Array<string | number>) {
    this.calls++;
    if (!this.holding) return [1, args[1], ttl];
    return new Promise<unknown>((resolve, reject) => this.pending.push({ resolve, reject }));
  }
  settle(outcome: "resolve" | "reject") {
    for (const command of this.pending.splice(0)) {
      if (outcome === "resolve") command.resolve([1, null, -2]);
      else command.reject(new Error("synthetic late Redis failure"));
    }
  }
}

function write(store: InstanceType<typeof RedisSessionAffinityStore>, key: string) {
  return store.upsert(key, "codex", "synthetic-connection", now, ttl, identity, null);
}
function readLocal(key: string) {
  return local.get(key, "codex", ttl, now + 10);
}

test.beforeEach((t) => {
  t.mock.method(console, "warn", () => {});
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const outcome of ["resolve", "reject"] as const) {
  test(`stalled Redis work plateaus across timeout batches and resumes after late ${outcome}`, async (t) => {
    const client = new StalledRedis();
    let acquisitions = 0;
    const store = new RedisSessionAffinityStore(
      async () => {
        acquisitions++;
        return client;
      },
      local,
      timeout
    );
    const sizes: number[] = [];
    try {
      for (let batch = 0; batch < 4; batch++) {
        const keys = Array.from({ length: 10 }, (_, i) => `synthetic-${outcome}-${batch}-${i}`);
        const started = performance.now();
        await Promise.all(keys.map((key) => write(store, key)));
        // Allow scheduler overhead while still detecting a caller waiting on a stalled reply.
        assert.ok(performance.now() - started < timeout + 500);
        for (const key of keys) assert.equal(readLocal(key)?.connectionId, "synthetic-connection");
        sizes.push(client.pending.length);
      }
      assert.deepEqual(sizes, [cap, cap, cap, cap]);
      assert.equal(acquisitions, cap, "saturation bypasses even client acquisition");
      assert.equal(client.calls, cap, "caller deadlines must not release admission slots");

      let bypassFinished = false;
      const bypass = write(store, `synthetic-${outcome}-immediate`).then(() => {
        bypassFinished = true;
      });
      await flush();
      assert.equal(bypassFinished, true, "a full store falls back without another deadline wait");
      await bypass;
      const unchanged = `synthetic-${outcome}-0-0`;
      const newer = `synthetic-${outcome}-0-1`;
      const bypassed = `synthetic-${outcome}-0-9`;
      const oldBytes = local.getSerialized(newer, "codex");
      local.upsert(newer, "codex", "synthetic-connection", now + 1, ttl, identity);
      const newBytes = local.getSerialized(newer, "codex");
      assert.notEqual(
        newBytes,
        oldBytes,
        "same account and connection but different serialized value"
      );
      client.settle(outcome);
      await flush();
      assert.equal(readLocal(unchanged), null, "late settlement removes the exact timeout write");
      assert.equal(local.getSerialized(newer, "codex"), newBytes, "newer exact bytes survive");
      assert.ok(readLocal(bypassed), "an operation never sent to Redis has no late cleanup");

      const recovered = Array.from(
        { length: cap },
        (_, i) => `synthetic-${outcome}-recovered-${i}`
      );
      const pending = recovered.map((key) => write(store, key));
      await flush();
      assert.equal(
        client.pending.length,
        cap,
        "all slots are reusable only after actual settlement"
      );
      client.settle(outcome);
      await Promise.all(pending);
      client.holding = false;
      const healthy = `synthetic-${outcome}-healthy`;
      await write(store, healthy);
      assert.equal(
        readLocal(healthy),
        null,
        "healthy Redis resumes without installing a local pin"
      );
      assert.equal(client.calls, cap * 2 + 1);
      t.diagnostic(JSON.stringify({ timeout, cap, sizes, resumedCalls: client.calls }));
    } finally {
      client.settle(outcome);
      await flush();
    }
  });
}

test("capacity fallback warnings are throttled and reset after Redis recovery", async (t) => {
  const warnings: unknown[][] = [];
  t.mock.method(console, "warn", (...args: unknown[]) => warnings.push(args));
  const client = new StalledRedis();
  const store = new RedisSessionAffinityStore(async () => client, local, timeout);
  try {
    for (let cycle = 0; cycle < 2; cycle++) {
      await Promise.all(
        Array.from({ length: cap }, (_, i) => write(store, `synthetic-warning-${cycle}-${i}`))
      );
      for (let i = 0; i < 5; i++) await write(store, `synthetic-capacity-${cycle}-${i}`);
      assert.equal(
        warnings.filter(
          ([message]) =>
            message === "[SESSION_AFFINITY] Redis capacity reached; falling back to SQLite."
        ).length,
        cycle + 1,
        "repeated saturated calls log once until a healthy Redis reply resets the throttle"
      );
      client.settle("resolve");
      await flush();
      client.holding = false;
      await write(store, `synthetic-warning-recovery-${cycle}`);
      client.holding = true;
    }
    assert.ok(
      warnings.every(
        (args) =>
          args.length === 1 &&
          [
            "[SESSION_AFFINITY] Redis timeout; falling back to SQLite.",
            "[SESSION_AFFINITY] Redis capacity reached; falling back to SQLite.",
          ].includes(String(args[0]))
      ),
      "warnings contain only fixed states, never raw Redis errors or command values"
    );
  } finally {
    client.settle("resolve");
    await flush();
  }
});

test("outstanding admission is per store and includes stalled client acquisition", async () => {
  const client = new StalledRedis();
  let acquisitions = 0;
  let release!: (client: AffinityRedisClient) => void;
  const acquisition = new Promise<AffinityRedisClient>((resolve) => {
    release = resolve;
  });
  const store = new RedisSessionAffinityStore(
    () => {
      acquisitions++;
      return acquisition;
    },
    local,
    timeout
  );
  try {
    for (let batch = 0; batch < 3; batch++) {
      await Promise.all(
        Array.from({ length: 10 }, (_, i) => write(store, `synthetic-acquisition-${batch}-${i}`))
      );
    }
    assert.equal(acquisitions, cap, "pending acquisition also retains its admission slot");
    const other = new RedisSessionAffinityStore(async () => client, local, timeout);
    await write(other, "synthetic-independent-store");
    assert.equal(client.calls, 1, "a saturated instance does not block another store");
    release(client);
    await flush();
    assert.equal(client.calls, 1, "expired acquisitions do not send a late command");
    client.settle("resolve");
    await flush();
    client.holding = false;
    await write(store, "synthetic-acquisition-recovered");
    assert.equal(client.calls, 2);
    assert.equal(readLocal("synthetic-acquisition-recovered"), null);
  } finally {
    release(client);
    client.settle("resolve");
    await flush();
  }
});
