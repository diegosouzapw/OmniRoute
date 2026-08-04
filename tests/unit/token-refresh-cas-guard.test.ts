import test from "node:test";
import assert from "node:assert/strict";

// Unit tests for the CAS guard leaf extracted from tokenRefresh.ts (#4038).
// The CAS guard re-reads the row's refresh_token right before persisting and
// SKIPS the write when a concurrent writer already rotated it past the token
// the caller presented — preventing a revert that would invalidate the token
// family on rotating-token providers (Auth0/Anthropic).

const {
  runWithCasGuard,
  getActiveCasGuard,
  getCasGuardStats,
  _resetCasGuardStats,
  casGuardShouldSkipPersist,
} = await import("../../open-sse/services/tokenRefresh/casGuard.ts");

const silentLog = { info() {}, warn() {}, error() {} };

test.beforeEach(() => {
  _resetCasGuardStats();
});

test("getActiveCasGuard returns undefined outside a guard context", () => {
  assert.equal(getActiveCasGuard(), undefined);
});

test("runWithCasGuard exposes the guard via getActiveCasGuard inside the closure", async () => {
  const guard = { expectedRefreshToken: "R0", reread: async () => "R0" };
  await runWithCasGuard(guard, async () => {
    assert.equal(getActiveCasGuard(), guard);
  });
  assert.equal(getActiveCasGuard(), undefined, "guard is cleared after the closure resolves");
});

test("runWithCasGuard with a null/undefined guard runs the function unchanged", async () => {
  let ran = false;
  await runWithCasGuard(null, async () => {
    ran = true;
  });
  assert.equal(ran, true);
  assert.equal(getActiveCasGuard(), undefined);
});

test("casGuardShouldSkipPersist returns false when no guard is active", async () => {
  assert.equal(await casGuardShouldSkipPersist(silentLog), false);
  assert.equal(getCasGuardStats().skipped, 0);
  assert.equal(getCasGuardStats().persisted, 0);
});

test("casGuardShouldSkipPersist returns false when the guard has no expectedRefreshToken", async () => {
  const guard = { expectedRefreshToken: null, reread: async () => "R0" };
  await runWithCasGuard(guard, async () => {
    assert.equal(await casGuardShouldSkipPersist(silentLog), false);
  });
  assert.equal(getCasGuardStats().skipped, 0);
  assert.equal(getCasGuardStats().persisted, 0);
});

test("casGuardShouldSkipPersist SKIPS when the row rotated past the presented token", async () => {
  const guard = { expectedRefreshToken: "R0", reread: async () => "R_CONCURRENT" };
  await runWithCasGuard(guard, async () => {
    assert.equal(await casGuardShouldSkipPersist(silentLog), true);
  });
  assert.equal(getCasGuardStats().skipped, 1);
  assert.equal(getCasGuardStats().persisted, 0);
});

test("casGuardShouldSkipPersist PERSISTS when the row still holds the presented token", async () => {
  const guard = { expectedRefreshToken: "R0", reread: async () => "R0" };
  await runWithCasGuard(guard, async () => {
    assert.equal(await casGuardShouldSkipPersist(silentLog), false);
  });
  assert.equal(getCasGuardStats().skipped, 0);
  assert.equal(getCasGuardStats().persisted, 1);
});

test("casGuardShouldSkipPersist falls through to persist when reread throws (best-effort)", async () => {
  const guard = {
    expectedRefreshToken: "R0",
    reread: async () => {
      throw new Error("db unavailable");
    },
  };
  await runWithCasGuard(guard, async () => {
    assert.equal(await casGuardShouldSkipPersist(silentLog), false);
  });
  // reread failure returns false (do not skip persist) WITHOUT touching the
  // persisted counter — the counter only advances on a successful reread that
  // confirms the row is unchanged. The key guarantee is skipped stays 0.
  assert.equal(getCasGuardStats().skipped, 0, "reread failure must never block recovery");
  assert.equal(getCasGuardStats().persisted, 0);
});

test("casGuardShouldSkipPersist treats an empty reread as not-rotated", async () => {
  const guard = { expectedRefreshToken: "R0", reread: async () => null };
  await runWithCasGuard(guard, async () => {
    assert.equal(await casGuardShouldSkipPersist(silentLog), false);
  });
  assert.equal(getCasGuardStats().persisted, 1);
});

test("getCasGuardStats returns a snapshot copy (not the live counters)", () => {
  const guard = { expectedRefreshToken: "R0", reread: async () => "R0" };
  return runWithCasGuard(guard, async () => {
    await casGuardShouldSkipPersist(silentLog);
    const snap = getCasGuardStats();
    assert.equal(snap.persisted, 1);
    // Mutating the snapshot must not affect future stats.
    snap.persisted = 999;
    assert.equal(getCasGuardStats().persisted, 1);
  });
});

test("_resetCasGuardStats zeroes both counters", async () => {
  const guard = { expectedRefreshToken: "R0", reread: async () => "R_CONCURRENT" };
  await runWithCasGuard(guard, async () => {
    await casGuardShouldSkipPersist(silentLog);
  });
  assert.equal(getCasGuardStats().skipped, 1);
  _resetCasGuardStats();
  assert.equal(getCasGuardStats().skipped, 0);
  assert.equal(getCasGuardStats().persisted, 0);
});
