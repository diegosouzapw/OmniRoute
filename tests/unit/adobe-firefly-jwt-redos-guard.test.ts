import { test } from "node:test";
import assert from "node:assert/strict";
import {
  decodeAdobeJwtPayload,
  extractAdobeCredentialToken,
  extractAdobeCookieHeader,
} from "../../open-sse/services/adobeFireflyClient.ts";

// CodeQL js/polynomial-redos (#754/#755/#756): the JWT-shaped extraction regexes in
// adobeFireflyClient.ts used unbounded `[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+`
// sequences over attacker-controlled cookie/HAR blobs. The fix bounds every segment to
// {1,4096} (CodeQL's endorsed remediation + the CLAUDE.md ReDoS convention). These tests
// guard the two things that could regress from that change:
//   (a) bounding stays GENEROUS enough that realistic long Adobe/IMS tokens still parse
//       (a naive over-tighten like {1,64} would truncate real tokens — this catches it),
//   (b) extraction on a pathological long input still completes within a hard time budget
//       (tripwire against a future catastrophic/exponential regression of these patterns).

function b64url(obj: unknown): string {
  return Buffer.from(JSON.stringify(obj)).toString("base64url");
}

const SHORT_JWT = `${b64url({ alg: "RS256", typ: "JWT" })}.${b64url({
  sub: "user-abc123",
  exp: 9999999999,
})}.c2lnbmF0dXJlLXBsYWNlaG9sZGVy`;

// Realistic Adobe/IMS token: payloads carry many scopes/claims and run well past a few
// hundred chars per segment. Segments here are ~1200 chars — comfortably inside {1,4096}
// but far beyond any accidental over-tightening.
const LONG_JWT = `${b64url({ alg: "RS256", typ: "JWT" })}.${b64url({
  sub: "user-abc123",
  scope: "x".repeat(1200),
  exp: 9999999999,
})}.${"s".repeat(700)}`;

test("decodeAdobeJwtPayload still decodes a short valid JWT", () => {
  const payload = decodeAdobeJwtPayload(SHORT_JWT);
  assert.ok(payload, "expected a decoded payload object");
  assert.equal(payload?.sub, "user-abc123");
});

test("decodeAdobeJwtPayload decodes a LONG token (bound {1,4096} must not truncate real tokens)", () => {
  const payload = decodeAdobeJwtPayload(LONG_JWT);
  assert.ok(payload, "long-token payload should decode — the {1,4096} bound must be generous");
  assert.equal(payload?.sub, "user-abc123");
});

test("decodeAdobeJwtPayload extracts a JWT embedded in a surrounding blob", () => {
  const payload = decodeAdobeJwtPayload(`noise-prefix ${LONG_JWT} noise-suffix`);
  assert.ok(payload);
  assert.equal(payload?.sub, "user-abc123");
});

test("extractAdobeCredentialToken finds a Bearer JWT in a header blob", () => {
  const token = extractAdobeCredentialToken(`Authorization: Bearer ${SHORT_JWT}`);
  assert.equal(token, SHORT_JWT);
});

test("JWT extraction stays within a hard time budget on pathological input (ReDoS tripwire)", () => {
  const pathological = "eyJ" + "a".repeat(200000) + "." + "a".repeat(200000);
  const start = process.hrtime.bigint();
  decodeAdobeJwtPayload(pathological);
  extractAdobeCredentialToken(`Authorization: Bearer ${pathological}`);
  extractAdobeCookieHeader(`cookie1=${pathological}; ${pathological}`);
  const elapsedMs = Number(process.hrtime.bigint() - start) / 1e6;
  assert.ok(
    elapsedMs < 1000,
    `JWT extraction on pathological input took ${elapsedMs.toFixed(1)}ms (budget 1000ms) — possible ReDoS regression`
  );
});
