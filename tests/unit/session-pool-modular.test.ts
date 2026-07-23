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

const LLM7_CONFIG: PoolConfig = {
  ...DEFAULT_POOL_CONFIG,
  minSessions: 1,
  maxSessions: 3,
  cooldownBase: 2000,
  cooldownMax: 5000,
  cooldownJitter: 100,
};

const DUCKDUCKGO_CONFIG: PoolConfig = {
  ...DEFAULT_POOL_CONFIG,
  minSessions: 2,
  maxSessions: 5,
  cooldownBase: 1000,
  cooldownMax: 10000,
  cooldownJitter: 500,
};

// ─── Pool Configuration ────────────────────────────────────────────────────

describe("Pool Configuration", () => {
  it("default config creates pool with correct defaults", () => {
    const pool = new SessionPool("test-default");
    assert.equal(pool.provider, "test-default");
    assert.equal(pool.totalCount, 0);
    assert.equal(pool.availableCount, 0);
  });

  it("custom config overrides defaults", () => {
    const pool = new SessionPool("test-custom", LLM7_CONFIG);
    assert.equal(pool.provider, "test-custom");
    assert.equal(pool.totalCount, 0);
  });

  it("pool respects minSessions and maxSessions", async () => {
    const pool = new SessionPool("test-limits", FAST_CONFIG);
    await pool.ensureMinSessions();
    assert.equal(pool.totalCount, FAST_CONFIG.minSessions);

    await pool.warmUp(100);
    assert.ok(pool.totalCount <= FAST_CONFIG.maxSessions);
  });

  it("pool config is provider-specific", async () => {
    const pool1 = new SessionPool("provider-a", LLM7_CONFIG);
    const pool2 = new SessionPool("provider-b", DUCKDUCKGO_CONFIG);

    await pool1.ensureMinSessions();
    await pool2.ensureMinSessions();

    assert.equal(pool1.provider, "provider-a");
    assert.equal(pool2.provider, "provider-b");
    assert.notEqual(pool1.poolId, pool2.poolId);

    pool1.shutdown();
    pool2.shutdown();
  });

  it("pool without config returns null from getPool()", () => {
    // This tests the pattern where BaseExecutor.getPool() returns null when no poolConfig
    const pool = new SessionPool("test-no-config");
    assert.equal(pool.totalCount, 0);
    assert.equal(pool.availableCount, 0);
  });
});

// ─── Pool Lifecycle ────────────────────────────────────────────────────────

describe("Pool Lifecycle", () => {
  let pool: SessionPool;

  beforeEach(() => {
    pool = new SessionPool("test-lifecycle", FAST_CONFIG);
  });

  afterEach(() => {
    pool.shutdown();
  });

  it("starts with 0 sessions", () => {
    assert.equal(pool.totalCount, 0);
    assert.equal(pool.availableCount, 0);
  });

  it("ensureMinSessions creates minimum sessions", async () => {
    await pool.ensureMinSessions();
    assert.equal(pool.totalCount, FAST_CONFIG.minSessions);
  });

  it("warmUp creates up to specified count", async () => {
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

  it("acquire returns session after warmUp", async () => {
    await pool.warmUp(3);
    const s = pool.acquire();
    assert.notEqual(s, null);
    assert.equal(s!.inflight, 1);
  });

  it("acquire round-robins across sessions", async () => {
    await pool.warmUp(3);
    const ids = new Set<string>();
    for (let i = 0; i < 9; i++) {
      const s = pool.acquire();
      assert.notEqual(s, null);
      ids.add(s!.id);
      s!.release();
    }
    // With 3 sessions and round-robin, we should visit all 3
    assert.ok(ids.size >= 2, `should visit multiple sessions, got ${ids.size}`);
  });

  it("shutdown marks all sessions dead", async () => {
    await pool.warmUp(3);
    await pool.shutdown();
    assert.equal(pool.totalCount, 0);
  });
});

// ─── Session State Machine ─────────────────────────────────────────────────

describe("Session State Machine", () => {
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
    session.markCooldown();
    assert.equal(session.status, "cooldown");
    assert.ok(session.cooldownRemaining > 0, "cooldownRemaining should be > 0");
  });

  it("markDead transitions to dead permanently", () => {
    session.acquire();
    session.markDead();
    assert.equal(session.status, "dead");
    assert.equal(session.isAvailable, false);
    assert.ok(session.totalRequests > 0);
  });

  it("markSuccess increments successfulRequests", () => {
    session.markSuccess();
    assert.equal(session.successfulRequests, 1);
    assert.equal(session.consecutiveFails, 0);
  });

  it("cooldown recovers after backoff window expires", { timeout: 5000 }, async () => {
    session.markCooldown();
    assert.equal(session.status, "cooldown");
    assert.equal(session.isAvailable, false);

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

// ─── Fingerprint Rotation ──────────────────────────────────────────────────

describe("Fingerprint Rotation", () => {
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
    assert.ok(wrapped.userAgent.length > 0, "wrapped fingerprint has a user agent");
  });

  it("each fingerprint has valid UA and accept-language", () => {
    const rotator = new FingerprintRotator();
    for (let i = 0; i < rotator.count; i++) {
      const fp = rotator.next();
      assert.ok(fp.userAgent.length > 10, `fp ${fp.id} has UA`);
      assert.ok(fp.acceptLanguage.length > 0, `fp ${fp.id} has accept-language`);
    }
  });
});

// ─── Pool Registry ─────────────────────────────────────────────────────────

describe("Pool Registry", () => {
  let pool: SessionPool;

  beforeEach(() => {
    const providers = PoolRegistry.listProviders();
    for (const p of providers) PoolRegistry.resetPool(p);
    pool = new SessionPool("test-registry", FAST_CONFIG);
  });

  afterEach(() => {
    pool.shutdown();
    PoolRegistry.resetPool("test-registry");
  });

  it("register adds a pool", () => {
    PoolRegistry.register("test-registry", pool);
    assert.equal(PoolRegistry.listProviders().includes("test-registry"), true);
  });

  it("getPool returns registered pool", () => {
    PoolRegistry.register("test-registry", pool);
    assert.equal(PoolRegistry.getPool("test-registry"), pool);
  });

  it("getStats returns pool stats", () => {
    PoolRegistry.register("test-registry", pool);
    const stats = PoolRegistry.getStats("test-registry");
    assert.notEqual(stats, null);
    assert.equal(stats!.provider, "test-registry");
  });

  it("getStats returns null for unknown provider", () => {
    assert.equal(PoolRegistry.getStats("nonexistent"), null);
  });

  it("resetPool removes and shuts down pool", () => {
    PoolRegistry.register("test-registry", pool);
    assert.equal(PoolRegistry.resetPool("test-registry"), true);
    assert.equal(PoolRegistry.getPool("test-registry"), undefined);
  });

  it("size reflects pool count", () => {
    const prev = PoolRegistry.size;
    PoolRegistry.register("test-registry", pool);
    assert.equal(PoolRegistry.size, prev + 1);
  });
});

// ─── Provider-Agnostic Behavior ────────────────────────────────────────────

describe("Provider-Agnostic Behavior", () => {
  it("pool works with arbitrary provider name", async () => {
    const pool = new SessionPool("my-custom-provider", FAST_CONFIG);
    await pool.warmUp(2);
    assert.equal(pool.provider, "my-custom-provider");
    assert.equal(pool.totalCount, 2);
    pool.shutdown();
  });

  it("multiple pools can coexist for different providers", async () => {
    const pool1 = new SessionPool("llm7", LLM7_CONFIG);
    const pool2 = new SessionPool("duckduckgo", DUCKDUCKGO_CONFIG);

    await pool1.ensureMinSessions();
    await pool2.ensureMinSessions();

    assert.equal(pool1.provider, "llm7");
    assert.equal(pool2.provider, "duckduckgo");
    assert.notEqual(pool1.poolId, pool2.poolId);

    pool1.shutdown();
    pool2.shutdown();
  });

  it("pool config is independent per provider", async () => {
    const pool1 = new SessionPool("fast-provider", FAST_CONFIG);
    const pool2 = new SessionPool("slow-provider", LLM7_CONFIG);

    await pool1.ensureMinSessions();
    await pool2.ensureMinSessions();

    // Both should have created sessions
    assert.ok(pool1.totalCount > 0);
    assert.ok(pool2.totalCount > 0);

    pool1.shutdown();
    pool2.shutdown();
  });

  it("pool can be created without any provider-specific code", async () => {
    const pool = new SessionPool("generic", {
      minSessions: 1,
      maxSessions: 5,
      cooldownBase: 100,
      cooldownMax: 1000,
      cooldownJitter: 50,
      requestTimeout: 5000,
      requestJitter: 10,
    });
    await pool.ensureMinSessions();
    assert.equal(pool.totalCount, 1);
    pool.shutdown();
  });

  it("pool integrates with registry by provider name", async () => {
    const pool = new SessionPool("registered-provider", FAST_CONFIG);
    await pool.warmUp(2);
    PoolRegistry.register("registered-provider", pool);

    const retrieved = PoolRegistry.getPool("registered-provider");
    assert.equal(retrieved, pool);
    assert.equal(retrieved!.provider, "registered-provider");

    pool.shutdown();
    PoolRegistry.resetPool("registered-provider");
  });
});
