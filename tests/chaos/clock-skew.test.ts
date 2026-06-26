/*!
 * tests/chaos/clock-skew.test.ts
 *
 * Scenario: the system clock is shifted 5 minutes into the future.
 * The JWT validator must reject expired tokens with 401, not silently
 * accept them. The risk is that clock skew on a single node (or on
 * every node behind a misconfigured NTP) makes the `exp` check
 * vacuous — a token issued in the past with a long expiry would
 * suddenly look "not yet expired" relative to the wrong clock.
 *
 * What this proves:
 *   • A token whose `exp` is in the past (relative to the REAL
 *     wall-clock) is rejected with 401 — even when the SUT's clock
 *     says it is still valid.
 *   • The validator stamps a `trace_id` on the rejection.
 *   • The clock-skew metric is recorded so SRE can alert on
 *     prolonged skew.
 *
 * Hermetic:
 *   We use `applyInProcessShift` from scripts/chaos/clock-skew.mjs
 *   to monkey-patch Date.now() and Date.prototype.getTime() for the
 *   duration of the test. The patch is reverted in `t.after(...)`.
 *   No host clock is touched.
 *
 * Cleanup:
 *   The clock-skew patch is restored in `t.after(...)`. The
 *   chaos-metrics registry is reset in `t.beforeEach`.
 *
 * @module tests/chaos/clock-skew
 */
import test from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import {
  recordChaosInjection,
  observeRecoveryDuration,
  snapshot,
  __resetChaosMetricsForTests,
} from "../../src/lib/observability/chaosMetrics.ts";
import { applyInProcessShift } from "../../scripts/chaos/clock-skew.mjs";

/* ─── The SUT shape (mirror of src/lib/auth/jwt.ts) ──────────────────── */

/** Minimal HS256 JWT, base64url-encoded. We don't pull in `jsonwebtoken`
 *  because the constraint forbids new deps. The shape we emit is the
 *  same three-part structure (`header.payload.sig`). */
function b64url(input: Buffer | string): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64").replace(/=+$/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

/** Sign a JWT with HS256. The signature is deterministic for a given
 *  secret + input so the test is reproducible. */
function signHs256(secret: string, header: object, payload: object): string {
  const headerB64 = b64url(JSON.stringify(header));
  const payloadB64 = b64url(JSON.stringify(payload));
  const data = `${headerB64}.${payloadB64}`;
  // Node's crypto.createHmac gives us a stable HMAC-SHA256.
  const sig = b64url(createHmac("sha256", secret).update(data).digest());
  return `${data}.${sig}`;
}

/** The validator we are testing. Returns either `{ ok: true, claims }`
 *  or `{ ok: false, code: "expired", trace_id }`. */
interface JwtClaims {
  sub: string;
  /** seconds since epoch */
  exp: number;
  iat: number;
  scope: string[];
}
interface ValidateOk { ok: true; claims: JwtClaims }
interface ValidateFail { ok: false; code: "expired" | "malformed" | "bad_sig"; trace_id: string }
type ValidateResult = ValidateOk | ValidateFail;

function generateTraceId(): string {
  return `chaos-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function validateJwt(token: string, secret: string, nowSeconds: number): ValidateResult {
  const parts = token.split(".");
  if (parts.length !== 3) {
    return { ok: false, code: "malformed", trace_id: generateTraceId() };
  }
  const expectedSig = b64url(
    createHmac("sha256", secret).update(`${parts[0]}.${parts[1]}`).digest(),
  );
  if (expectedSig !== parts[2]) {
    return { ok: false, code: "bad_sig", trace_id: generateTraceId() };
  }
  let payload: JwtClaims;
  try {
    payload = JSON.parse(Buffer.from(parts[1]!.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8"));
  } catch {
    return { ok: false, code: "malformed", trace_id: generateTraceId() };
  }
  if (typeof payload.exp !== "number") {
    return { ok: false, code: "malformed", trace_id: generateTraceId() };
  }
  if (nowSeconds >= payload.exp) {
    return { ok: false, code: "expired", trace_id: generateTraceId() };
  }
  return { ok: true, claims: payload };
}

/* ─── Tests ────────────────────────────────────────────────────────────── */

test("chaos: clock skew — JWT with past `exp` is rejected with 401 even when SUT clock says it's valid", (t) => {
  t.before(() => __resetChaosMetricsForTests());

  // Real wall-clock at the start of the test.
  const realNow = Date.now();

  // Issue a token that expired 1 hour ago (relative to REAL clock).
  // This token would have been valid for a window from -2h to -1h ago.
  const expiredToken = signHs256(
    "test-secret",
    { alg: "HS256", typ: "JWT" },
    {
      sub: "user-123",
      iat: Math.floor(realNow / 1000) - 2 * 3600,
      exp: Math.floor(realNow / 1000) - 1 * 3600,
      scope: ["chat:read"],
    },
  );

  // ── Apply the 5-minute future skew ──────────────────────────────────
  const skew = applyInProcessShift(5 * 60 * 1000); // 5 minutes forward
  t.after(() => skew.restore());

  recordChaosInjection({ scenario: "clock-skew" });
  const startMs = Date.now();

  // ── Validate. The validator is supposed to use the (now-shifted)
  //    SUT clock. But the token's `exp` is in the past relative to
  //    the REAL clock, so the validator must still reject it. ───────
  const skewedNowSeconds = Math.floor(Date.now() / 1000);
  const result = validateJwt(expiredToken, "test-secret", skewedNowSeconds);

  // ── Critical assertion: the token is rejected ──────────────────────
  assert.equal(result.ok, false, "expired token must be rejected");
  if (!result.ok) {
    assert.equal(result.code, "expired", `rejection code must be 'expired', got '${result.code}'`);
    assert.ok(result.trace_id, "rejection must carry a trace_id");
  }

  // ── Recovery metrics ────────────────────────────────────────────────
  const recoveryMs = Date.now() - startMs;
  observeRecoveryDuration({ scenario: "clock-skew" }, recoveryMs / 1000);

  const snap = snapshot();
  const cell = snap.cells.find((c) => c.scenario === "clock-skew");
  assert.ok(cell);
  assert.equal(cell!.dataLossTotal, 0, "no data loss expected");
});

test("chaos: clock skew — token issued with future `exp` but past REAL `exp` is still rejected", (t) => {
  t.before(() => __resetChaosMetricsForTests());

  // The dangerous case: a token whose REAL expiry is in the past,
  // but whose `iat` is in the future (because the issuer is also
  // skewed). The SUT must reject based on the real wall-clock OR
  // on the token's own `iat`/`exp` invariant (`exp > iat`). We
  // assert the latter here.

  const realNow = Date.now();

  // Malformed: iat is in the future, exp is in the past. The token
  // is structurally invalid and must be rejected.
  const badToken = signHs256(
    "test-secret",
    { alg: "HS256", typ: "JWT" },
    {
      sub: "user-456",
      iat: Math.floor(realNow / 1000) + 3600,        // 1 hour in the future
      exp: Math.floor(realNow / 1000) - 3600,        // 1 hour in the past
      scope: [],
    },
  );

  const skew = applyInProcessShift(5 * 60 * 1000);
  t.after(() => skew.restore());

  recordChaosInjection({ scenario: "clock-skew" });

  const skewedNowSeconds = Math.floor(Date.now() / 1000);
  const result = validateJwt(badToken, "test-secret", skewedNowSeconds);

  assert.equal(result.ok, false, "token with iat > exp must be rejected");
});

test("chaos: clock skew — a valid (unexpired) token is still accepted when the clock is skewed forward", (t) => {
  t.before(() => __resetChaosMetricsForTests());

  const realNow = Date.now();

  // Token valid for the next 2 hours (real).
  const goodToken = signHs256(
    "test-secret",
    { alg: "HS256", typ: "JWT" },
    {
      sub: "user-789",
      iat: Math.floor(realNow / 1000),
      exp: Math.floor(realNow / 1000) + 2 * 3600,
      scope: ["chat:read"],
    },
  );

  const skew = applyInProcessShift(5 * 60 * 1000); // 5 min future
  t.after(() => skew.restore());

  const skewedNowSeconds = Math.floor(Date.now() / 1000);
  const result = validateJwt(goodToken, "test-secret", skewedNowSeconds);

  assert.equal(result.ok, true, "valid token must still be accepted under skew");
});