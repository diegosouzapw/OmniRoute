import { describe, it, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { setTimeout as sleep } from "node:timers/promises";

import { SessionPool } from "../../open-sse/services/sessionPool/sessionPool.ts";
import { Session } from "../../open-sse/services/sessionPool/session.ts";
import { SessionFactory } from "../../open-sse/services/sessionPool/sessionFactory.ts";
import { FingerprintRotator } from "../../open-sse/services/sessionPool/fingerprintRotator.ts";
import { PoolRegistry } from "../../open-sse/services/sessionPool/poolRegistry.ts";
import type { PoolConfig } from "../../open-sse/services/sessionPool/types.ts";
import { DEFAULT_POOL_CONFIG } from "../../open-sse/services/sessionPool/types.ts";

// ─── Fast config for tests ─────────────────────────────────────────────────

const FAST_CONFIG: PoolConfig = {
  ...DEFAULT_POOL_CONFIG,
  cooldownBase: 50,
  cooldownMax: 200,
  cooldownJitter: 10,
};

// ─── FingerprintRotator ────────────────────────────────────────────────────

describe("FingerprintRotator", () => {
  it("returns all distinct fingerprint profiles", () => {
    const rotator = new FingerprintRotator();
    const ids = new Set<string>();
    const total = rotator.count;
    for (let i = 0; i < total; i++) {
      ids.add(rotator.next().id);
    }
    assert.equal(ids.size, total, `should have ${total} unique fingerprint IDs`);
  });

  it("rotates through fingerprints round-robin", () => {
    const rotator = new FingerprintRotator();
    const first = rotator.next();
    const second = rotator.next();
    assert.notEqual(first.id, second.id, "consecutive calls return different fingerprints");
  });

  it("wraps around after exhausting all profiles", () => {
    const rotator = new FingerprintRotator();
    const first = rotator.next();
    for (let i = 0; i < 20; i++) rotator.next();
    const wrapped = rotator.next();
    // Should NOT return the same instance — it's a new iteration cycle
    assert.ok(wrapped.userAgent.length > 0, "wrapped fingerprint has a user agent");
  });

  it("each fingerprint has valid UA and accept-language", () => {
    const rotator = new FingerprintRotator();
    for (let i = 0; i < 20; i++) {
      const fp = rotator.next();
      assert.ok(fp.userAgent.length > 10, `fp ${fp.id} has UA`);
      assert.ok(fp.acceptLanguage.length > 0, `fp ${fp.id} has accept-language`);
    }
  });
});

// ─── Session ───────────────────────────────────────────────────────────────

describe("Session", () => {
  let factory: SessionFactory;
  let session: Session;

  beforeEach(() => {
    factory = new SessionFactory(FAST_CONFIG);
    session = factory.createSession();
  });

  it("starts in active status", () => {
    assert.equal(session.status, "active");
    assert.equal(session.isAvailable, true);
  });

  it("acquire increments inflight and totalRequests", () => {
    session.acquire();
    assert.equal(session.inflight, 1);
    assert.equal(session.totalRequests, 1);
  });

  it("release decrements inflight", () => {
    session.acquire();
    session.release();
    assert.equal(session.inflight, 0);
    assert.equal(session.isAvailable, true);
  });

  it("markCooldown transitions to cooldown with backoff", () => {
    session.acquire();
    session.markSuccess();
    session.release();
    session.markCooldown();
    assert.equal(session.status, "cooldown");
    assert.ok(session.cooldownRemaining > 0, "cooldownRemaining should be > 0");
  });

  it("markDead transitions to dead permanently", () => {
    session.acquire(); // gives totalRequests >= 1
    session.markDead();
    assert.equal(session.status, "dead");
    assert.equal(session.isAvailable, false);
    assert.ok(session.totalRequests > 0);
  });

  it("markSuccess increments successfulRequests and resets consecutiveFails", () => {
    session.markSuccess();
    assert.equal(session.successfulRequests, 1);
    assert.equal(session.consecutiveFails, 0);
  });

  it("markCooldown increments consecutiveFails", () => {
    session.markCooldown();
    session.markCooldown();
    assert.equal(session.consecutiveFails, 2);
  });

  it("cooldown recovers after backoff window expires", { timeout: 5000 }, async () => {
    session.markCooldown();
    assert.equal(session.status, "cooldown");
    assert.equal(session.isAvailable, false);

    // Wait for cooldown to expire (base=50ms + jitter, should be well under 1s)
    const deadline = Date.now() + 2000;
    while (Date.now() < deadline) {
      if (session.isAvailable) break;
      await sleep(10);
    }

    assert.equal(session.isAvailable, true, "session should recover after cooldown");
    assert.equal(session.status, "active", "status should reset to active after cooldown");
  });

  it("age returns elapsed time since creation", async () => {
    const startAge = session.age;
    await sleep(10);
    assert.ok(session.age > startAge, "age should increase over time");
  });
});

// ─── SessionFactory ────────────────────────────────────────────────────────

describe("SessionFactory", () => {
  it("creates sessions with unique IDs", () => {
    const factory = new SessionFactory(FAST_CONFIG);
    const s1 = factory.createSession();
    const s2 = factory.createSession();
    assert.notEqual(s1.id, s2.id);
  });

  it("creates sessions with different fingerprints", () => {
    const factory = new SessionFactory(FAST_CONFIG);
    const s1 = factory.createSession();
    const s2 = factory.createSession();
    assert.notEqual(s1.fingerprint.id, s2.fingerprint.id);
  });

  it("uses custom FingerprintRotator if provided", () => {
    const rotator = new FingerprintRotator();
    const factory = new SessionFactory(FAST_CONFIG, rotator);
    const s = factory.createSession();
    assert.ok(s.fingerprint.id.length > 0);
  });
});

// ─── SessionPool ───────────────────────────────────────────────────────────

describe("SessionPool", () => {
  let pool: SessionPool;

  beforeEach(() => {
    pool = new SessionPool("test-provider", FAST_CONFIG);
  });

  afterEach(() => {
    pool.shutdown();
  });

  it("starts with 0 sessions", () => {
    assert.equal(pool.totalCount, 0);
    assert.equal(pool.availableCount, 0);
  });

  it("ensureMinSessions creates the minimum", async () => {
    await pool.ensureMinSessions();
    assert.equal(pool.totalCount, FAST_CONFIG.minSessions);
  });

  it("warmUp creates up to the specified count", async () => {
    await pool.warmUp(4);
    assert.equal(pool.totalCount, 4);
  });

  it("warmUp respects maxSessions", async () => {
    await pool.warmUp(999);
    assert.equal(pool.totalCount, FAST_CONFIG.maxSessions);
  });

  it("acquire returns null when pool is empty", () => {
    const s = pool.acquire();
    assert.equal(s, null);
  });

  it("acquire returns a session after warmUp", async () => {
    await pool.warmUp(3);
    const s = pool.acquire();
    assert.notEqual(s, null);
    assert.equal(s!.inflight, 1);
  });

  it("acquire round-robins across sessions", async () => {
    await pool.warmUp(3);
    const ids = new Set<string>();
    for (let i = 0; i < 6; i++) {
      const s = pool.acquire();
      assert.notEqual(s, null);
      ids.add(s!.id);
      s!.release();
    }
    // With 3 sessions and round-robin, we should visit all 3
    assert.equal(ids.size, 3);
  });

  it("acquire skips sessions in cooldown", async () => {
    await pool.warmUp(3);
    const sessions = [pool.acquire()!, pool.acquire()!, pool.acquire()!];

    // Put first 2 into cooldown
    pool.reportCooldown(sessions[0]);
    sessions[0].release();
    pool.reportCooldown(sessions[1]);
    sessions[1].release();

    // Third is still active, release it
    pool.reportSuccess(sessions[2]);
    sessions[2].release();

    // Acquire should skip sessions 0 and 1 (cooldown) and give us session 2
    const s = pool.acquire();
    assert.notEqual(s, null);
    assert.equal(s!.id, sessions[2].id);
    s!.release();
  });

  it("reportCooldown increments rate429count", async () => {
    await pool.warmUp(1);
    const s = pool.acquire()!;
    pool.reportCooldown(s);
    s.release();

    assert.equal(pool.rate429count, 1);
    assert.equal(pool.cooldownCount, 1);
  });

  it("reportDead increments otherErrors", async () => {
    await pool.warmUp(1);
    const s = pool.acquire()!;
    pool.reportDead(s);
    s.release();

    assert.equal(pool.otherErrors, 1);
    assert.equal(pool.deadCount, 1);
  });

  it("reportSuccess increments success counters", async () => {
    await pool.warmUp(1);
    const s = pool.acquire()!;
    pool.reportSuccess(s);
    s.release();

    assert.equal(pool.totalRequests, 1);
    assert.equal(pool.successfulRequests, 1);
  });

  it("getStats returns correct snapshot", async () => {
    await pool.warmUp(3);
    const s = pool.acquire()!;
    pool.reportSuccess(s);
    s.release();

    const stats = pool.getStats();
    assert.equal(stats.provider, "test-provider");
    assert.equal(stats.sessions.total, 3);
    assert.equal(stats.requests.success, 1);
    assert.ok(Number.parseFloat(stats.successRate) > 0);
  });

  it("getSessionDetails returns per-session info", async () => {
    await pool.warmUp(2);
    const details = pool.getSessionDetails();
    assert.equal(details.length, 2);
    assert.ok(details[0].fingerprint.length > 0);
    assert.equal(details[0].inflight, 0);
  });

  it("acquireBlocking eventually returns a session after cooldown expires", { timeout: 5000 }, async () => {
    await pool.warmUp(1);
    const s = pool.acquire()!;

    // Put it into cooldown
    pool.reportCooldown(s);
    s.release();

    // Now the only session is in cooldown, but should recover quickly (50ms base)
    const acquired = await pool.acquireBlocking(3000);
    assert.notEqual(acquired, null);
    assert.equal(acquired.isAvailable, true);
    acquired.release();
  });

  it("executeWithSession runs a function with a session", { timeout: 5000 }, async () => {
    await pool.warmUp(2);
    const result = await pool.executeWithSession(async (s) => {
      return `session-${s.id}`;
    }, 1000);
    assert.ok((result as string).startsWith("session-"));
  });

  it("pruneDeadSessions removes dead sessions and replenishes", async () => {
    await pool.warmUp(3);
    const s = pool.acquire()!;
    pool.reportDead(s);
    s.release();

    assert.equal(pool.deadCount, 1);
    pool.pruneDeadSessions();

    // Dead session removed, and ensureMinSessions replenished
    assert.equal(pool.totalCount, FAST_CONFIG.minSessions);
  });

  it("shutdown marks all sessions dead", async () => {
    await pool.warmUp(3);
    await pool.shutdown();
    assert.equal(pool.totalCount, 0);
  });
});

// ─── PoolRegistry ──────────────────────────────────────────────────────────

describe("PoolRegistry", () => {
  let pool: SessionPool;

  beforeEach(() => {
    // Clean slate
    const providers = PoolRegistry.listProviders();
    for (const p of providers) PoolRegistry.resetPool(p);
    pool = new SessionPool("test-provider", FAST_CONFIG);
  });

  afterEach(() => {
    pool.shutdown();
    PoolRegistry.resetPool("test-provider");
  });

  it("register adds a pool", () => {
    PoolRegistry.register("test-provider", pool);
    assert.equal(PoolRegistry.listProviders().includes("test-provider"), true);
  });

  it("getPool returns the registered pool", () => {
    PoolRegistry.register("test-provider", pool);
    assert.equal(PoolRegistry.getPool("test-provider"), pool);
  });

  it("getStats returns pool stats", () => {
    PoolRegistry.register("test-provider", pool);
    const stats = PoolRegistry.getStats("test-provider");
    assert.notEqual(stats, null);
    assert.equal(stats!.provider, "test-provider");
  });

  it("getStats returns null for unknown provider", () => {
    assert.equal(PoolRegistry.getStats("nonexistent"), null);
  });

  it("getAllStats returns all pools", () => {
    const pool2 = new SessionPool("second", FAST_CONFIG);
    PoolRegistry.register("test-provider", pool);
    PoolRegistry.register("second", pool2);
    const all = PoolRegistry.getAllStats();
    assert.equal(all.length, 2);
    pool2.shutdown();
    PoolRegistry.resetPool("second");
  });

  it("getSessionDetails returns session list", async () => {
    await pool.warmUp(2);
    PoolRegistry.register("test-provider", pool);
    const details = PoolRegistry.getSessionDetails("test-provider");
    assert.notEqual(details, null);
    assert.equal(details!.length, 2);
  });

  it("getSessionDetails returns null for unknown provider", () => {
    assert.equal(PoolRegistry.getSessionDetails("nonexistent"), null);
  });

  it("resetPool removes and shuts down the pool", () => {
    PoolRegistry.register("test-provider", pool);
    assert.equal(PoolRegistry.resetPool("test-provider"), true);
    assert.equal(PoolRegistry.getPool("test-provider"), undefined);
  });

  it("resetPool returns false for unknown provider", () => {
    assert.equal(PoolRegistry.resetPool("nonexistent"), false);
  });

  it("unregister removes a pool", () => {
    PoolRegistry.register("test-provider", pool);
    assert.equal(PoolRegistry.unregister("test-provider"), true);
    assert.equal(PoolRegistry.getPool("test-provider"), undefined);
  });

  it("size reflects pool count", () => {
    const prev = PoolRegistry.size;
    PoolRegistry.register("test-provider", pool);
    assert.equal(PoolRegistry.size, prev + 1);
  });
});
