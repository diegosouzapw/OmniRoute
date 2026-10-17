import test from "node:test";
import assert from "node:assert/strict";

import { shouldMarkRefreshCapableExpired } from "../../src/lib/tokenHealthCheckExpiry.ts";

// #16984: kimi-coding device-flow grants are intermittently refresh-less with
// SHORT-LIVED tokens (observed expires_in: 900). The #5326 rule condemned a
// refresh-less row IMMEDIATELY — up to ~14 minutes before its token actually
// stopped working. A known FUTURE expiry must never be condemned, regardless
// of provider; unknown expiry keeps the provider-specific #5326 policy.

const NOW = Date.UTC(2026, 8, 20, 12, 0, 0);
const HOUR = 60 * 60 * 1000;

function kimiConnection(overrides: Record<string, unknown> = {}) {
  return {
    id: "conn-kimi",
    provider: "kimi-coding",
    testStatus: "active",
    accessToken: "ey…",
    refreshToken: null,
    apiKey: null,
    tokenExpiresAt: null,
    expiresAt: null,
    ...overrides,
  };
}

test("refresh-less kimi token WITH future known expiry is NOT condemned", () => {
  const conn = kimiConnection({ tokenExpiresAt: new Date(NOW + 15 * 60 * 1000).toISOString() });
  assert.equal(shouldMarkRefreshCapableExpired(conn, true, NOW), false);
});

test("refresh-less kimi token WITH past known expiry IS condemned (#5326 preserved)", () => {
  const conn = kimiConnection({ tokenExpiresAt: new Date(NOW - HOUR).toISOString() });
  assert.equal(shouldMarkRefreshCapableExpired(conn, true, NOW), true);
});

test("refresh-less kimi token with UNKNOWN expiry keeps the #5326 condemnation", () => {
  // No known expiry: the badge cannot claim "Token Expired", but for kimi the
  // missing refresh token with no expiry signal is treated as before — the
  // request path will surface the real 401.
  assert.equal(shouldMarkRefreshCapableExpired(kimiConnection(), true, NOW), true);
});

test("boundary: expiry exactly NOW is condemned (not treated as future)", () => {
  const conn = kimiConnection({ tokenExpiresAt: new Date(NOW).toISOString() });
  assert.equal(shouldMarkRefreshCapableExpired(conn, true, NOW), true);
});

test("claude setup-token behavior is unchanged by the future-expiry exemption", () => {
  const noExpiry = {
    id: "conn-claude",
    provider: "claude",
    testStatus: "active",
    accessToken: "sk-ant-oat01-…",
    refreshToken: null,
    apiKey: null,
    tokenExpiresAt: null,
    expiresAt: null,
  };
  assert.equal(shouldMarkRefreshCapableExpired(noExpiry, true, NOW), false);
  const past = {
    ...noExpiry,
    tokenExpiresAt: new Date(NOW - HOUR).toISOString(),
  };
  assert.equal(shouldMarkRefreshCapableExpired(past, true, NOW), true);
});
