/**
 * Regression tests for the Cursor "Token expired" false positive.
 *
 * Observed live (2026-08-04): an imported IDE token whose real JWT `exp` was
 * ~8 weeks out was persisted with `expiresIn: 86400` (hardcoded 24h). One day
 * after import, `/api/providers/[id]/test` reported `401 "Token expired"` for
 * a perfectly valid token, marking a healthy provider dead.
 *
 * Ported to v3.8.50: `resolveCursorTokenTtlSeconds` derives the TTL from the
 * token's own `exp` claim and only falls back to 24h when there is none.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CursorService,
  resolveCursorTokenTtlSeconds,
  CURSOR_FALLBACK_TOKEN_TTL_SECONDS,
} from "../../src/lib/oauth/services/cursor";

/** Build an unsigned JWT with an arbitrary payload (signature is never checked). */
function makeJwt(payload: Record<string, unknown>): string {
  const b64 = (o: unknown) =>
    Buffer.from(JSON.stringify(o))
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  return `${b64({ alg: "RS256", typ: "JWT" })}.${b64(payload)}.sig`;
}

describe("resolveCursorTokenTtlSeconds (Token-expired false positive)", () => {
  const NOW = Date.UTC(2026, 7, 4, 12, 0, 0); // 2026-08-04T12:00:00Z

  it("derives the real multi-week TTL from the JWT exp claim", () => {
    // The exact shape observed live: token imported Aug 1, exp Sep 25.
    const exp = Math.floor(Date.UTC(2026, 8, 25, 14, 56, 51) / 1000);
    const token = makeJwt({
      sub: "auth0|user_01K4X0C3G7Z1MRG0RMFGMZY2MQ",
      aud: "https://cursor.com",
      exp,
    });

    const ttl = resolveCursorTokenTtlSeconds(token, NOW);

    // THE REGRESSION ASSERTION: the old code returned exactly 86400 here, which
    // is what wrote a bogus ~24h expires_at and produced the false 401.
    assert.notEqual(ttl, CURSOR_FALLBACK_TOKEN_TTL_SECONDS);
    assert.equal(ttl, Math.floor((exp * 1000 - NOW) / 1000));
    assert.ok(ttl > 40 * 24 * 3600, `expected >40 days of TTL, got ${ttl}s`);
  });

  it("persists an expires_at that keeps the connection valid past 24h", () => {
    // Directly models the import route's arithmetic:
    //   expiresAt = now + expiresIn * 1000
    // and the test route's isTokenExpired() 5-minute buffer.
    const exp = Math.floor(Date.UTC(2026, 8, 25, 0, 0, 0) / 1000);
    const token = makeJwt({ exp });

    const expiresAtMs = NOW + resolveCursorTokenTtlSeconds(token, NOW) * 1000;
    const threeDaysLater = NOW + 3 * 24 * 3600 * 1000;
    const buffer = 5 * 60 * 1000;

    // isTokenExpired(): expiresAt <= now + buffer
    assert.equal(
      expiresAtMs <= threeDaysLater + buffer,
      false,
      "token must NOT read as expired 3 days after import"
    );
  });

  it("returns a non-positive TTL for a genuinely expired token (no papering over)", () => {
    const exp = Math.floor(Date.UTC(2026, 7, 1, 0, 0, 0) / 1000); // 3 days before NOW
    const ttl = resolveCursorTokenTtlSeconds(makeJwt({ exp }), NOW);
    assert.ok(ttl < 0, `expected negative TTL, got ${ttl}`);
    // Must not silently become the 24h fallback — a real expiry has to surface.
    assert.notEqual(ttl, CURSOR_FALLBACK_TOKEN_TTL_SECONDS);
  });

  it("falls back to 24h for an opaque (non-JWT) token", () => {
    assert.equal(
      resolveCursorTokenTtlSeconds("not-a-jwt-just-a-long-opaque-string", NOW),
      CURSOR_FALLBACK_TOKEN_TTL_SECONDS
    );
  });

  it("falls back to 24h when the exp claim is missing or non-numeric", () => {
    assert.equal(
      resolveCursorTokenTtlSeconds(makeJwt({ sub: "x" }), NOW),
      CURSOR_FALLBACK_TOKEN_TTL_SECONDS
    );
    assert.equal(
      resolveCursorTokenTtlSeconds(makeJwt({ exp: "soon" }), NOW),
      CURSOR_FALLBACK_TOKEN_TTL_SECONDS
    );
  });

  it("falls back to 24h on undecodable payloads instead of throwing", () => {
    assert.equal(
      resolveCursorTokenTtlSeconds("aaa.!!!not-base64!!!.ccc", NOW),
      CURSOR_FALLBACK_TOKEN_TTL_SECONDS
    );
    assert.equal(resolveCursorTokenTtlSeconds("", NOW), CURSOR_FALLBACK_TOKEN_TTL_SECONDS);
  });
});

describe("CursorService.validateImportToken (call-site wiring)", () => {
  // Guards the WIRING, not just the helper: reverting the call site to a
  // hardcoded `expiresIn: 86400` leaves every helper test green, so without
  // this the regression is invisible.
  it("reports the JWT-derived TTL, not a hardcoded 24h", async () => {
    const exp = Math.floor(Date.now() / 1000) + 60 * 24 * 3600; // 60 days out
    const token = makeJwt({ sub: "auth0|u", aud: "https://cursor.com", exp });

    const data = await new CursorService().validateImportToken(
      token,
      "67f9471b-61c5-4857-8402-379bcf4f20ac"
    );

    assert.notEqual(data.expiresIn, CURSOR_FALLBACK_TOKEN_TTL_SECONDS);
    assert.ok(data.expiresIn > 50 * 24 * 3600, `expected >50d, got ${data.expiresIn}s`);
    assert.equal(data.authMethod, "imported");
    // And the value the import route actually persists must outlive 24h.
    const expiresAt = Date.now() + data.expiresIn * 1000;
    assert.ok(expiresAt > Date.now() + 2 * 24 * 3600 * 1000);
  });

  it("still falls back to 24h for an opaque token (no exp to read)", async () => {
    const data = await new CursorService().validateImportToken("x".repeat(120));
    assert.equal(data.expiresIn, CURSOR_FALLBACK_TOKEN_TTL_SECONDS);
  });
});
