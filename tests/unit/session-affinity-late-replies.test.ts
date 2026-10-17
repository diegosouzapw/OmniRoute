import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { SessionAccountAffinityRecord } from "../../src/lib/db/sessionAffinity/store.ts";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-late-replies-"));
process.env.DATA_DIR = dataDir;
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
delete process.env.REDIS_URL;
const core = await import("../../src/lib/db/core.ts");
const { sqliteSessionAffinityStore: local } =
  await import("../../src/lib/db/sessionAffinity/sqliteStore.ts");
const { RedisSessionAffinityStore } =
  await import("../../src/lib/db/sessionAffinity/redisStore.ts");
const now = 1_000_000;
const ttl = 60_000;
const provider = "codex";
const identityA = "a".repeat(64);
const identityB = "b".repeat(64);
function gate() {
  let resolve!: () => void;
  const promise = new Promise<void>((r) => {
    resolve = r;
  });
  return { promise, resolve };
}
const flush = () => new Promise<void>((resolve) => setImmediate(resolve));
function record(id: string, identity = identityA): SessionAccountAffinityRecord {
  return {
    connectionId: id,
    accountIdentity: identity,
    createdAt: new Date(now).toISOString(),
    lastUsedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + ttl).toISOString(),
  };
}
// Two socket-free FIFO clients share one server value. A held reply does not
// stop server execution, but later replies on that client wait behind it.
class Client {
  fail = false;
  hold = false;
  rejectLate = false;
  beforeMutation?: () => void;
  applied = gate();
  release = gate();
  private replyTail = Promise.resolve();
  constructor(readonly server: { raw: string | null }) {}
  async get(_key: string) {
    if (this.fail) throw new Error("synthetic outage");
    const raw = this.server.raw;
    await this.replyTail;
    return raw;
  }
  async set(_key: string, raw: string, _mode: "PX", _ttl: number) {
    this.server.raw = raw;
  }
  async del(_key: string) {
    const existed = this.server.raw !== null;
    this.server.raw = null;
    return Number(existed);
  }
  async eval(
    _script: string,
    _keys: number,
    _key: string,
    expected?: string,
    replacement?: string,
    duration?: number
  ) {
    if (this.fail) throw new Error("synthetic outage");
    let reply: unknown;
    if (expected === undefined) reply = [this.server.raw, this.server.raw === null ? -2 : ttl];
    else {
      this.beforeMutation?.();
      this.beforeMutation = undefined;
      const accepted = (this.server.raw ?? "") === expected;
      const existed = this.server.raw !== null;
      if (accepted) this.server.raw = replacement || null;
      reply = [
        accepted ? (replacement ? 1 : Number(existed)) : 0,
        this.server.raw,
        this.server.raw === null ? -2 : duration || ttl,
      ];
    }
    const earlier = this.replyTail;
    if (expected !== undefined && this.hold) {
      this.hold = false;
      this.replyTail = earlier.then(() => this.release.promise);
      this.applied.resolve();
      await this.replyTail;
      if (this.rejectLate) throw new Error("synthetic late command error");
    } else await earlier;
    return reply;
  }
}
function setup(timeout = 100, fallback = local) {
  const server = { raw: JSON.stringify(record("old-A")) as string | null };
  const clients = [new Client(server), new Client(server)];
  const stores = clients.map(
    (client) => new RedisSessionAffinityStore(async () => client, fallback, timeout)
  );
  return { server, clients, stores };
}
function seed(key: string, id = "old-A", identity = identityA) {
  local.upsert(key, provider, id, now, ttl, identity);
}
function readLocal(key: string) {
  return local.get(key, provider, ttl, now + 10);
}
test.beforeEach((t) => {
  t.mock.method(console, "warn", () => {});
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

for (const outcome of ["rejected", "accepted", "error"] as const) {
  test(`timeout after send removes its candidate on late ${outcome} reply`, async () => {
    const key = `synthetic-timeout-${outcome}`;
    const {
      server,
      clients: [a],
      stores: [s],
    } = setup();
    seed(key);
    const observed = await s.get(key, provider, ttl, now);
    assert.equal(observed?.connectionId, "old-A");
    if (outcome === "rejected")
      a.beforeMutation = () => {
        server.raw = JSON.stringify(record("winner-B", identityB));
      };
    a.rejectLate = outcome === "error";
    a.hold = true;
    const pending = s.upsert(key, provider, "losing-candidate", now + 1, ttl, identityA, observed);
    await a.applied.promise;
    await pending;
    assert.equal(
      readLocal(key)?.connectionId,
      "losing-candidate",
      "timeout still performs the existing local fallback"
    );
    if (outcome === "rejected") assert.equal(JSON.parse(server.raw!).connectionId, "winner-B");
    a.release.resolve();
    await flush();
    a.fail = true;
    assert.equal(
      await s.get(key, provider, ttl, now + 10),
      null,
      "late settlement cannot leave the timeout candidate authoritative locally"
    );
  });
}

for (const newer of ["different-id", "identity-conflict"] as const) {
  test(`late reply preserves a later outage pin with ${newer}`, async () => {
    const key = `synthetic-guard-${newer}`;
    const {
      clients: [a, b],
      stores: [s, other],
    } = setup();
    a.hold = true;
    const pending = s.upsert(key, provider, "candidate", now + 1, ttl, identityA);
    await a.applied.promise;
    await pending;
    b.fail = true;
    const id = newer === "different-id" ? "outage-B" : "candidate";
    await other.upsert(key, provider, id, now + 2, ttl, identityB);
    a.release.resolve();
    await flush();
    assert.equal(readLocal(key)?.connectionId, id);
    assert.equal(readLocal(key)?.accountIdentity, identityB);
  });
}

test("late touch cannot refresh the local row cleared by the initial Redis read", async () => {
  const key = "synthetic-touch-timeout";
  const {
    clients: [a],
    stores: [s],
  } = setup();
  seed(key, "outage-B", identityB);
  a.hold = true;
  const pending = s.touch(key, provider, now + 1, ttl);
  await a.applied.promise;
  await pending;
  assert.equal(readLocal(key), null, "the authoritative initial read already cleared outage-B");
  a.release.resolve();
  await flush();
  assert.equal(readLocal(key), null);
});

for (const operation of ["delete", "evict"] as const) {
  test(`late ${operation} cannot expose a rejected/evicted local pin across instances`, async () => {
    const key = `synthetic-cross-${operation}`;
    const {
      server,
      clients: [a, b],
      stores: [s, other],
    } = setup();
    seed(key);
    a.hold = true;
    const pending =
      operation === "delete" ? s.delete(key, provider) : s.evict(key, provider, "old-A", identityA);
    await a.applied.promise;
    assert.equal(server.raw, null);
    const newer = operation === "delete" ? "new-B" : "old-A";
    await other.upsert(
      key,
      provider,
      newer,
      now + 2,
      ttl,
      operation === "delete" ? identityB : identityA
    );
    assert.equal(JSON.parse(server.raw!).connectionId, newer);
    a.release.resolve();
    await pending;
    assert.equal(
      JSON.parse(server.raw!).connectionId,
      newer,
      "old CAS must not erase the newer shared pin"
    );
    a.fail = b.fail = true;
    assert.equal(
      await other.get(key, provider, ttl, now + 10),
      null,
      "accepted shared repin must never install a local mirror"
    );
    await other.upsert(
      key,
      provider,
      newer,
      now + 3,
      ttl,
      operation === "delete" ? identityB : identityA
    );
    assert.equal(readLocal(key)?.connectionId, newer, "a later outage fallback may pin again");
  });
}

for (const operation of ["upsert", "touch"] as const) {
  test(`held ${operation} reply racing eviction never reinstalls the evicted account`, async () => {
    const key = `synthetic-held-${operation}`;
    const {
      clients: [a],
      stores: [s, other],
    } = setup();
    seed(key);
    a.hold = true;
    const pending =
      operation === "upsert"
        ? s.upsert(key, provider, "old-A", now + 1, ttl, identityA)
        : s.touch(key, provider, now + 1, ttl);
    await a.applied.promise;
    assert.equal(await other.evict(key, provider, "old-A", identityA), true);
    a.release.resolve();
    await pending;
    assert.equal(readLocal(key), null);
  });
}

test("rejected candidate is not installed locally; shared winner remains routable", async () => {
  const key = "synthetic-rejection";
  const {
    server,
    clients: [a],
    stores: [s],
  } = setup();
  a.beforeMutation = () => {
    server.raw = JSON.stringify(record("winner-B", identityB));
  };
  const result = await s.upsert(key, provider, "loser", now + 1, ttl, identityA);
  assert.equal(result && result.connectionId, "winner-B");
  assert.equal(readLocal(key), null);
});

test("500 seeded schedules: local pins have outage provenance and no subsequent matching eviction", async (t) => {
  let state = 0x16472008;
  const random = (n: number) => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) % n;
  };
  const counts = { upsert: 0, touch: 0, delete: 0, evict: 0, timeout: 0, error: 0 };
  for (let schedule = 0; schedule < 500; schedule++) {
    const key = `synthetic-property-${schedule}`;
    let sequence = 0;
    let lastWrite: { id: string; identity?: string; at: number } | undefined;
    const evictions: Array<{ id: string; identity?: string; at: number }> = [];
    const capture = () => {
      const pin = readLocal(key);
      if (pin) lastWrite = { id: pin.connectionId, identity: pin.accountIdentity, at: ++sequence };
    };
    const fallback = {
      ...local,
      upsert(...args: Parameters<typeof local.upsert>) {
        local.upsert(...args);
        capture();
      },
      touch(...args: Parameters<typeof local.touch>) {
        local.touch(...args);
        capture();
      },
      evict(...args: Parameters<typeof local.evict>) {
        evictions.push({ id: args[2], identity: args[3], at: ++sequence });
        return local.evict(...args);
      },
    };
    // Short deadlines make hundreds of schedules practical; the timeout-after-send tests above
    // exercise the production 100 ms deadline.
    const { clients, stores } = setup(1, fallback);
    const pending: Promise<unknown>[] = [];
    for (let step = 0; step < 6; step++) {
      const index = random(2);
      const client = clients[index];
      const s = stores[index];
      const id = random(2) ? "account-A" : "account-B";
      const identity = id === "account-A" ? identityA : identityB;
      const mode = random(4);
      client.fail = mode === 0;
      if (client.fail) counts.error++;
      if (mode === 1 && !client.hold) {
        client.hold = true;
        counts.timeout++;
      }
      const operation = random(4);
      let call: Promise<unknown>;
      if (operation === 0) {
        counts.upsert++;
        call = s.upsert(key, provider, id, now + step, ttl, identity);
      } else if (operation === 1) {
        counts.touch++;
        call = s.touch(key, provider, now + step, ttl);
      } else if (operation === 2) {
        counts.delete++;
        call = s.delete(key, provider);
      } else {
        counts.evict++;
        call = s.evict(key, provider, id, identity);
      }
      // Interleave outstanding calls across clients, or wait through their timeout.
      if (random(2)) await call;
      else {
        pending.push(call);
        await flush();
      }
      if (random(3) === 0) client.release.resolve();
    }
    await Promise.all(pending);
    clients.forEach((client) => client.release.resolve());
    await flush();
    const pin = readLocal(key);
    if (pin) {
      assert.ok(lastWrite, `schedule ${schedule}: shared success installed local state`);
      assert.equal(pin.connectionId, lastWrite.id, `schedule ${schedule}: local writer provenance`);
      assert.equal(pin.accountIdentity, lastWrite.identity);
      assert.ok(
        !evictions.some(
          (event) =>
            event.at > lastWrite!.at &&
            (event.identity && pin.accountIdentity
              ? event.identity === pin.accountIdentity
              : event.id === pin.connectionId)
        ),
        `schedule ${schedule}: evicted account resurrected without an outage write`
      );
    }
  }
  for (const count of Object.values(counts)) assert.ok(count > 0);
  t.diagnostic(JSON.stringify({ seed: "0x16472008", schedules: 500, counts }));
});
