import test from "node:test";
import assert from "node:assert/strict";

import {
  shouldMarkRefreshCapableExpired,
  stopTokenHealthCheck,
} from "../../src/lib/tokenHealthCheck.ts";

stopTokenHealthCheck();

const NOW = Date.UTC(2026, 8, 20, 12, 0, 0);
const HOUR = 60 * 60 * 1000;

/** A `claude setup-token` connection: long-lived, refresh-less BY DESIGN, no stored expiry. */
function setupTokenConnection(overrides: Record<string, unknown> = {}) {
  return {
    id: "conn-1",
    provider: "claude",
    testStatus: "active",
    accessToken: "sk-ant-oat01-…",
    refreshToken: null,
    apiKey: null,
    tokenExpiresAt: null,
    expiresAt: null,
    ...overrides,
  };
}

test("refreshLessLongLivedToken_WithNoKnownExpiry_IsNotMarkedExpired", () => {
  // Regression for #14261. The sweep condemned a credential that had just served
  // traffic, purely because refreshToken was absent. Absence of a recovery
  // mechanism is not evidence of expiry.
  assert.equal(shouldMarkRefreshCapableExpired(setupTokenConnection(), true, NOW), false);
});

test("refreshLessToken_PastItsKnownExpiry_IsStillMarkedExpired", () => {
  // #5326 must keep working: when the row DOES carry an expiry and it has passed,
  // the dashboard badge says "Token Expired", so testStatus has to agree.
  const conn = setupTokenConnection({ tokenExpiresAt: new Date(NOW - HOUR).toISOString() });
  assert.equal(shouldMarkRefreshCapableExpired(conn, true, NOW), true);
});

test("refreshLessToken_BeforeItsKnownExpiry_IsNotMarkedExpired", () => {
  const conn = setupTokenConnection({ tokenExpiresAt: new Date(NOW + HOUR).toISOString() });
  assert.equal(shouldMarkRefreshCapableExpired(conn, true, NOW), false);
});

test("expiredToken_OnProviderWithoutRefreshSupport_IsNotMarkedExpired", () => {
  // #8407: providers outside supportsTokenRefresh() are skipped entirely.
  const conn = setupTokenConnection({
    provider: "devin-cli",
    tokenExpiresAt: new Date(NOW - HOUR).toISOString(),
  });
  assert.equal(shouldMarkRefreshCapableExpired(conn, false, NOW), false);
});

test("expiredCursorImport_IsNotMarkedExpired", () => {
  const conn = setupTokenConnection({
    provider: "cursor",
    tokenExpiresAt: new Date(NOW - HOUR).toISOString(),
  });
  assert.equal(shouldMarkRefreshCapableExpired(conn, true, NOW), false);
});

test("expiredApiKeyOnlyConnection_IsNotMarkedExpired", () => {
  const conn = setupTokenConnection({
    apiKey: "sk-…",
    tokenExpiresAt: new Date(NOW - HOUR).toISOString(),
  });
  assert.equal(shouldMarkRefreshCapableExpired(conn, true, NOW), false);
});

test("alreadyTerminalOrCoolingDownConnection_IsNotReStamped", () => {
  // The request path owns `unavailable`; terminal states must not be clobbered.
  for (const testStatus of ["unavailable", "banned", "credits_exhausted", "expired"]) {
    const conn = setupTokenConnection({
      testStatus,
      tokenExpiresAt: new Date(NOW - HOUR).toISOString(),
    });
    assert.equal(
      shouldMarkRefreshCapableExpired(conn, true, NOW),
      false,
      `testStatus=${testStatus} must not be re-stamped by the sweep`
    );
  }
});

test("refreshLessAntigravity_WithNoKnownExpiry_IsStillMarkedExpired", () => {
  // #5326 contract, asserted by tests/unit/token-health-check-cursor.test.ts too:
  // antigravity's flow ALWAYS mints a refresh token, so a missing one there is
  // genuinely broken auth and must stay terminal. The #14261 relaxation is scoped
  // to providers that also issue refresh-less long-lived tokens.
  const conn = setupTokenConnection({ provider: "antigravity" });
  assert.equal(shouldMarkRefreshCapableExpired(conn, true, NOW), true);
});

test("expiryAcceptsEpochSecondsAndMillis_ConsistentlyWithTheBadge", () => {
  // The badge parses the same field through parseTokenExpiryMs, which accepts
  // seconds, millis and ISO strings — the gate must not disagree by unit.
  const past = NOW - HOUR;
  assert.equal(
    shouldMarkRefreshCapableExpired(setupTokenConnection({ expiresAt: past }), true, NOW),
    true
  );
  assert.equal(
    shouldMarkRefreshCapableExpired(
      setupTokenConnection({ expiresAt: Math.floor(past / 1000) }),
      true,
      NOW
    ),
    true
  );
});
