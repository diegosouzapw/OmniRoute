import test from "node:test";
import assert from "node:assert/strict";

const providersDb = await import("../../src/lib/db/providers.ts");
const rateLimitManager = await import("../../open-sse/services/rateLimitManager.ts");
const core = await import("../../src/lib/db/core.ts");

test.afterEach(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  try {
    core.resetDbInstance();
  } catch {
    // ignore — no instance open
  }
});

test.after(async () => {
  await rateLimitManager.__resetRateLimitManagerForTests();
  try {
    core.resetDbInstance();
  } catch {
    // ignore — no instance open
  }
});

test("operator override survives a simulated restart with limiter unchanged", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "restart preserve check",
    apiKey: "sk-rl-restart-1",
    isActive: true,
    rateLimitProtection: true,
    rateLimitOverrides: { rpm: 60, minTime: 100, maxConcurrent: 2 },
  });
  try {
    const readCache = await import("../../src/lib/db/readCache.ts");
    readCache.invalidateDbCache("connections");
    await rateLimitManager.initializeRateLimits();
    assert.equal(rateLimitManager.isRateLimitEnabled(conn.id), true);
    // Drive one request through the limiter so it materializes (explicit
    // protection only marks the connection; the limiter is created lazily).
    await rateLimitManager.withRateLimit("openai", conn.id, null, async () => "ok");
    const before = await rateLimitManager.__getLimiterStateForTests("openai", conn.id);
    assert.ok(before, "limiter must exist after initialize");
    assert.equal(before.reservoir, 59);

    // Simulated restart: full in-memory reset (mirrors a real process restart
    // where memory is lost and the DB is the source of truth), then re-init.
    await rateLimitManager.__resetRateLimitManagerForTests();
    const readCache2 = await import("../../src/lib/db/readCache.ts");
    readCache2.invalidateDbCache("connections");
    await rateLimitManager.initializeRateLimits();
    await rateLimitManager.withRateLimit("openai", conn.id, null, async () => "ok");
    const after = await rateLimitManager.__getLimiterStateForTests("openai", conn.id);
    assert.ok(after, "limiter must exist after re-initialize");
    assert.equal(after.reservoir, 59);
    assert.equal(after.key, before.key);
  } finally {
    await providersDb.deleteProviderConnection(conn.id);
    await rateLimitManager.__resetRateLimitManagerForTests();
    try {
      core.resetDbInstance();
    } catch {
      // ignore — no instance open
    }
  }
});

test("sibling ids do not cross-apply overrides through substring matching", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "sibling first",
    apiKey: "sk-rl-sibling-a",
    isActive: true,
    rateLimitProtection: true,
    rateLimitOverrides: { rpm: 60 },
  });
  const conn2 = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "sibling second",
    apiKey: "sk-rl-sibling-b",
    isActive: true,
    rateLimitProtection: true,
    rateLimitOverrides: { rpm: 120 },
  });
  try {
    const readCache = await import("../../src/lib/db/readCache.ts");
    readCache.invalidateDbCache("connections");
    await rateLimitManager.initializeRateLimits();
    await rateLimitManager.withRateLimit("openai", conn.id, null, async () => "a");
    await rateLimitManager.withRateLimit("openai", conn2.id, null, async () => "b");
    const a = await rateLimitManager.__getLimiterStateForTests("openai", conn.id);
    const b = await rateLimitManager.__getLimiterStateForTests("openai", conn2.id);
    assert.ok(a && b);
    // Real ids are UUIDs (collision-free); assert each limiter carries its own rpm.
    // One request consumed one token, so reservoirs read rpm-1.
    assert.equal(a.reservoir, 59);
    assert.equal(b.reservoir, 119);
  } finally {
    await providersDb.deleteProviderConnection(conn.id);
    await providersDb.deleteProviderConnection(conn2.id);
    await rateLimitManager.__resetRateLimitManagerForTests();
    try {
      core.resetDbInstance();
    } catch {
      // ignore — no instance open
    }
  }
});

test("four connections keep canonical rpm across a simulated restart", async () => {
  const created: Array<{ id: string }> = [];
  try {
    for (let i = 0; i < 4; i++) {
      created.push(
        await providersDb.createProviderConnection({
          provider: "openai",
          authType: "apikey",
          name: `restart group conn ${i}`,
          apiKey: `sk-rl-group-${i}`,
          isActive: true,
          rateLimitProtection: true,
          rateLimitOverrides: { rpm: 30 + i },
        })
      );
    }
    await rateLimitManager.initializeRateLimits();
    for (const c of created) {
      await rateLimitManager.withRateLimit("openai", c.id, null, async () => "ok");
    }
    await rateLimitManager.__resetRateLimitManagerForTests();
    const readCacheF1 = await import("../../src/lib/db/readCache.ts");
    readCacheF1.invalidateDbCache("connections");
    await rateLimitManager.initializeRateLimits();
    for (const c of created) {
      await rateLimitManager.withRateLimit("openai", c.id, null, async () => "ok");
    }
    for (let i = 0; i < 4; i++) {
      const state = await rateLimitManager.__getLimiterStateForTests("openai", created[i].id);
      assert.ok(state, `limiter ${i} must exist after restart`);
      // One request per limiter consumed one token before the snapshot.
      assert.equal(state.reservoir, 30 + i - 1);
    }
  } finally {
    for (const c of created) {
      await providersDb.deleteProviderConnection(c.id);
    }
    await rateLimitManager.__resetRateLimitManagerForTests();
    try {
      core.resetDbInstance();
    } catch {
      // ignore — no instance open
    }
  }
});
