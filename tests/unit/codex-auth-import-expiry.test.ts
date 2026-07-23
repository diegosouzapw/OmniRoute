import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseAndValidateCodexAuth } from "@/lib/oauth/utils/codexAuthImport";

/**
 * Guards fix for issue #6075:
 * Importing a Codex auth.json where id_token.exp is already expired (but
 * access_token.exp is still valid) created a broken connection because
 * extractExpiresAt() used id_token.exp — triggering an immediate refresh
 * that could invalidate the entire token family.
 *
 * Fix: extractExpiresAt now prefers access_token.exp over id_token.exp.
 */

// Helpers to build minimal signed-looking JWTs for testing.
// We only need valid base64url-encoded payloads; signature doesn't matter for parsing.
function buildFakeJwt(payload: Record<string, unknown>): string {
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `header.${encoded}.sig`;
}

const FUTURE = Math.floor(Date.now() / 1000) + 86400; // now + 1 day
const PAST = Math.floor(Date.now() / 1000) - 86400; // now - 1 day

const BASE_ACCOUNT_ID = "acc_test123";
const BASE_PAYLOAD_AUTH = { "https://api.openai.com/auth": { account_id: BASE_ACCOUNT_ID } };

function makeTokens(opts: { accessExp?: number | null; idExp?: number | null }) {
  const accessPayload = { ...(opts.accessExp !== undefined ? { exp: opts.accessExp } : {}) };
  const idPayload = {
    email: "user@example.com",
    ...(opts.idExp !== undefined ? { exp: opts.idExp } : {}),
    ...BASE_PAYLOAD_AUTH,
  };
  return {
    id_token: buildFakeJwt(idPayload),
    access_token: buildFakeJwt(accessPayload),
    refresh_token: "rt_valid_token",
  };
}

// tolerance in seconds when comparing derived expiry to the source exp claim
const TOLERANCE_S = 100;

describe("parseAndValidateCodexAuth — expiresAt derivation", () => {
  it("uses access_token.exp when it is valid even if id_token.exp is expired", () => {
    const tokens = makeTokens({ accessExp: FUTURE, idExp: PAST });
    const result = parseAndValidateCodexAuth({ tokens });

    // expiresAt should reflect the access token's future expiry, not the past id_token expiry
    assert.ok(result.expiresAt, "expected a non-null expiresAt");
    const parsed = new Date(result.expiresAt!).getTime() / 1000;
    assert.ok(Math.abs(parsed - FUTURE) < TOLERANCE_S, `expected ~${FUTURE}, got ${parsed}`);
  });

  it("falls back to id_token.exp when access_token has no exp claim", () => {
    // access_token has no exp field, id_token has a future exp
    const tokens = makeTokens({ accessExp: null, idExp: FUTURE });
    const result = parseAndValidateCodexAuth({ tokens });

    assert.ok(result.expiresAt, "expected a non-null expiresAt");
    const parsed = new Date(result.expiresAt!).getTime() / 1000;
    assert.ok(Math.abs(parsed - FUTURE) < TOLERANCE_S, `expected ~${FUTURE}, got ${parsed}`);
  });

  it("returns null expiresAt when neither token has an exp claim", () => {
    const tokens = makeTokens({ accessExp: null, idExp: null });
    const result = parseAndValidateCodexAuth({ tokens });
    assert.equal(result.expiresAt, null);
  });

  it("uses access_token.exp when both tokens have future expiries", () => {
    const accessExp = FUTURE + 3600;
    const idExp = FUTURE;
    const tokens = makeTokens({ accessExp, idExp });
    const result = parseAndValidateCodexAuth({ tokens });

    const parsed = new Date(result.expiresAt!).getTime() / 1000;
    assert.ok(Math.abs(parsed - accessExp) < TOLERANCE_S, `expected ~${accessExp}, got ${parsed}`);
  });

  it("preserves refresh_token from the auth.json (does not null it out)", () => {
    const tokens = makeTokens({ accessExp: FUTURE, idExp: PAST });
    const result = parseAndValidateCodexAuth({ tokens });
    assert.equal(result.refreshToken, "rt_valid_token");
  });
});
