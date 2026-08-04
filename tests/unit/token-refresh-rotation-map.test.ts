import test from "node:test";
import assert from "node:assert/strict";

// Unit tests for the token rotation map leaf extracted from tokenRefresh.ts.
// The rotation map caches RECENT refresh_token rotations so a stale caller can
// be redirected to the new tokens WITHOUT re-hitting upstream (which would
// trigger Auth0 family revocation on rotating-token providers like Codex).

const {
  getRefreshCacheKey,
  lookupRotation,
  recordRotation,
  _getTokenRotationMapStats,
  _clearTokenRotationMap,
} = await import("../../open-sse/services/tokenRefresh/rotationMap.ts");

test.beforeEach(() => {
  _clearTokenRotationMap();
});

test("getRefreshCacheKey is deterministic and provider-scoped", () => {
  const a = getRefreshCacheKey("codex", "refresh-1");
  const b = getRefreshCacheKey("codex", "refresh-1");
  const c = getRefreshCacheKey("openai", "refresh-1");
  assert.equal(a, b, "same (provider, token) must hash to the same key");
  assert.notEqual(a, c, "different provider must produce a different key");
  assert.match(a, /^codex:/, "key is prefixed with the provider id");
  // The raw refresh token must NOT appear in the key (it is hashed).
  assert.doesNotMatch(a, /refresh-1/);
});

test("recordRotation stores a rotation keyed by the OLD refresh token", () => {
  recordRotation("codex", "old-rt", {
    accessToken: "new-access",
    refreshToken: "new-rt",
    expiresIn: 3600,
  });
  const stats = _getTokenRotationMapStats();
  assert.equal(stats.size, 1);
  const hit = lookupRotation("codex", "old-rt");
  assert.ok(hit, "lookup by the old refresh token must find the cached rotation");
  assert.equal(hit.result.accessToken, "new-access");
  assert.equal(hit.result.refreshToken, "new-rt");
  assert.equal(hit.result.expiresIn, 3600);
});

test("recordRotation is a no-op when the refresh token did not rotate", () => {
  recordRotation("codex", "same-rt", {
    accessToken: "new-access",
    refreshToken: "same-rt",
    expiresIn: 3600,
  });
  assert.equal(_getTokenRotationMapStats().size, 0, "no rotation recorded when token unchanged");
  assert.equal(lookupRotation("codex", "same-rt"), undefined);
});

test("recordRotation is a no-op when the old refresh token is empty", () => {
  recordRotation("codex", "", {
    accessToken: "new-access",
    refreshToken: "new-rt",
  });
  assert.equal(_getTokenRotationMapStats().size, 0);
});

test("recordRotation is a no-op when the new refresh token is empty", () => {
  recordRotation("codex", "old-rt", {
    accessToken: "new-access",
    refreshToken: "",
  });
  assert.equal(_getTokenRotationMapStats().size, 0);
});

test("lookupRotation returns undefined for an unknown token", () => {
  assert.equal(lookupRotation("codex", "never-recorded"), undefined);
});

test("lookupRotation returns undefined for a different provider", () => {
  recordRotation("codex", "shared-rt", {
    accessToken: "a",
    refreshToken: "new-rt",
  });
  assert.equal(lookupRotation("openai", "shared-rt"), undefined, "rotation map is provider-scoped");
  assert.ok(lookupRotation("codex", "shared-rt"), "the original provider still hits");
});

test("_clearTokenRotationMap empties the map", () => {
  recordRotation("codex", "old-rt", { accessToken: "a", refreshToken: "new-rt" });
  assert.equal(_getTokenRotationMapStats().size, 1);
  _clearTokenRotationMap();
  assert.equal(_getTokenRotationMapStats().size, 0);
  assert.equal(lookupRotation("codex", "old-rt"), undefined);
});

test("_getTokenRotationMapStats reports the live entry count", () => {
  assert.equal(_getTokenRotationMapStats().size, 0);
  recordRotation("codex", "old-1", { accessToken: "a1", refreshToken: "new-1" });
  recordRotation("codex", "old-2", { accessToken: "a2", refreshToken: "new-2" });
  assert.equal(_getTokenRotationMapStats().size, 2);
  assert.equal(_getTokenRotationMapStats().entries, 2);
});
