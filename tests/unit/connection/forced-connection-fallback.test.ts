import test from "node:test";
import assert from "node:assert/strict";

import {
  isForcedConnectionMissingFromPool,
  resolveForcedConnectionForCredentialPool,
} from "../../../src/sse/services/sessionAffinityPin.ts";

const conn = (id: string, rateLimitedUntil: string | null = null) => ({
  id,
  rateLimitedUntil,
});

test("resolveForcedConnectionForCredentialPool drops forced id when excluded after 429 fallback", () => {
  const excluded = new Set(["dead-account"]);
  assert.equal(
    resolveForcedConnectionForCredentialPool({
      forcedConnectionId: "dead-account",
      excludedConnectionIds: excluded,
      connections: [conn("dead-account"), conn("healthy-account")],
      allowRateLimitedConnections: false,
      bypassQuotaPolicy: false,
      isQuotaExhausted: () => false,
      isQuotaPolicyBlocked: () => false,
    }),
    null
  );
});

test("resolveForcedConnectionForCredentialPool keeps forced id when eligible", () => {
  assert.equal(
    resolveForcedConnectionForCredentialPool({
      forcedConnectionId: "healthy-account",
      excludedConnectionIds: new Set(),
      connections: [conn("healthy-account"), conn("other-account")],
      allowRateLimitedConnections: false,
      bypassQuotaPolicy: false,
      isQuotaExhausted: () => false,
      isQuotaPolicyBlocked: () => false,
    }),
    "healthy-account"
  );
});

test("resolveForcedConnectionForCredentialPool drops forced id on cooldown", () => {
  const future = new Date(Date.now() + 60_000).toISOString();
  assert.equal(
    resolveForcedConnectionForCredentialPool({
      forcedConnectionId: "cooling-account",
      excludedConnectionIds: new Set(),
      connections: [conn("cooling-account", future)],
      allowRateLimitedConnections: false,
      bypassQuotaPolicy: false,
      isQuotaExhausted: () => false,
      isQuotaPolicyBlocked: () => false,
    }),
    null
  );
});

test("resolveForcedConnectionForCredentialPool drops forced id when quota exhausted", () => {
  assert.equal(
    resolveForcedConnectionForCredentialPool({
      forcedConnectionId: "exhausted-account",
      excludedConnectionIds: new Set(),
      connections: [conn("exhausted-account")],
      allowRateLimitedConnections: false,
      bypassQuotaPolicy: false,
      isQuotaExhausted: (id) => id === "exhausted-account",
      isQuotaPolicyBlocked: () => false,
    }),
    null
  );
});

test("resolveForcedConnectionForCredentialPool with empty connections only checks exclusion", () => {
  assert.equal(
    resolveForcedConnectionForCredentialPool({
      forcedConnectionId: "pinned-account",
      excludedConnectionIds: new Set(),
      connections: [],
      allowRateLimitedConnections: false,
      bypassQuotaPolicy: false,
      isQuotaExhausted: () => true,
      isQuotaPolicyBlocked: () => true,
    }),
    "pinned-account"
  );
});

// --- isForcedConnectionMissingFromPool: the sibling-account-substitution fix ---
//
// getProviderCredentials() in src/sse/services/auth.ts calls this predicate BEFORE
// resolveForcedConnectionForCredentialPool() to decide whether an ineligible pin must
// fail closed (connections = []) instead of falling through to resolveForced...'s
// intentional pin-release cases, which correctly degrade to sibling fallback.

test("BUG CASE: forced connection deactivated (missing from active pool) is detected as missing", () => {
  // Reproduces the kw/claude-worker leak: primary is active, secondary is pinned but
  // has been deactivated, so it never appears in the active-connections pool at all.
  // It was never excluded (no failed attempt happened) — this must still be treated as
  // a hard failure, not folded into resolveForcedConnectionForCredentialPool's
  // intentional-release cases.
  const activePoolWithOnlyPrimary = [conn("claude-primary")];
  assert.equal(
    isForcedConnectionMissingFromPool(
      "claude-secondary",
      new Set(), // never excluded — this is not a post-failure fallback
      activePoolWithOnlyPrimary // secondary deactivated, so absent entirely
    ),
    true
  );
});

test("EXISTING BEHAVIOR: forced connection already excluded after a failed attempt is NOT missing-from-pool", () => {
  // The account is still present in the (active) pool — it 429'd and the retry loop
  // added it to excludedConnectionIds. This must keep going through
  // resolveForcedConnectionForCredentialPool's normal pin-release path, which lets a
  // healthy sibling take over, not through the new fail-closed path.
  assert.equal(
    isForcedConnectionMissingFromPool(
      "dead-account",
      new Set(["dead-account"]),
      [conn("dead-account"), conn("healthy-account")]
    ),
    false
  );
});

test("EXISTING BEHAVIOR: forced connection present but cooling down is NOT missing-from-pool", () => {
  // Present in the pool (just rate-limited) — must fall through to
  // resolveForcedConnectionForCredentialPool, which already handles cooldown correctly.
  assert.equal(
    isForcedConnectionMissingFromPool("cooling-account", new Set(), [conn("cooling-account")]),
    false
  );
});

test("EXISTING BEHAVIOR: forced connection present but quota-exhausted is NOT missing-from-pool", () => {
  // Present in the pool — quota exhaustion is resolveForcedConnectionForCredentialPool's
  // job (via isQuotaExhausted), not this predicate's.
  assert.equal(
    isForcedConnectionMissingFromPool("exhausted-account", new Set(), [conn("exhausted-account")]),
    false
  );
});

test("no forcing requested is never missing-from-pool", () => {
  assert.equal(isForcedConnectionMissingFromPool(null, new Set(), [conn("some-account")]), false);
});

test("REGRESSION: healthy sibling remains selectable when the forced pin is released after exclusion", () => {
  // End-to-end proof of test requirement #2: forced account already attempted
  // (excluded), a healthy sibling exists — the pin must release and the sibling must
  // still be reachable through the unchanged resolveForcedConnectionForCredentialPool
  // path, exactly as before this fix.
  const excluded = new Set(["primary-attempted-and-failed"]);
  const connections = [conn("primary-attempted-and-failed"), conn("healthy-sibling")];

  assert.equal(
    isForcedConnectionMissingFromPool("primary-attempted-and-failed", excluded, connections),
    false,
    "excluded-after-failure must not be treated as the new fail-closed case"
  );
  assert.equal(
    resolveForcedConnectionForCredentialPool({
      forcedConnectionId: "primary-attempted-and-failed",
      excludedConnectionIds: excluded,
      connections,
      allowRateLimitedConnections: false,
      bypassQuotaPolicy: false,
      isQuotaExhausted: () => false,
      isQuotaPolicyBlocked: () => false,
    }),
    null,
    "pin releases, letting normal account selection reach the healthy sibling"
  );
});
