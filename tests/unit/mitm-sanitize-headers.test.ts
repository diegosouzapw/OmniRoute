import test from "node:test";
import assert from "node:assert/strict";
import { sanitizeHeaders } from "../../src/mitm/sanitizeHeaders.ts";

// `set-cookie` is a response-side credential header. maskSecret()'s format
// heuristics (Bearer / sk- / >=40-char) do NOT match an arbitrary session or
// CSRF cookie, so before this fix a Set-Cookie value landed verbatim in the
// sanitized output (and thus in inspector JSON). It must be fully redacted.

test("sanitizeHeaders — set-cookie (string) is fully redacted", () => {
  const out = sanitizeHeaders({ "set-cookie": "session=abc123DEF; Path=/; HttpOnly" });
  assert.equal(out["set-cookie"], "[REDACTED]");
  assert.ok(!JSON.stringify(out).includes("abc123DEF"), "raw cookie value must not leak");
});

test("sanitizeHeaders — set-cookie (array of cookies) is fully redacted", () => {
  const out = sanitizeHeaders({
    "set-cookie": ["sid=s3cr3tValue; HttpOnly", "csrf=t0kenValue; Secure"],
  });
  assert.equal(out["set-cookie"], "[REDACTED]");
  assert.ok(!/s3cr3tValue|t0kenValue/.test(JSON.stringify(out)), "no cookie value may leak");
});

test("sanitizeHeaders — Set-Cookie header name is matched case-insensitively", () => {
  const out = sanitizeHeaders({ "Set-Cookie": "session=abc123DEF" });
  assert.equal(out["set-cookie"], "[REDACTED]");
});

test("sanitizeHeaders — authorization bearer token is still masked, not leaked", () => {
  const out = sanitizeHeaders({ authorization: "Bearer sk-proj-abcdefghijklmnop" });
  assert.ok(!out["authorization"].includes("sk-proj-abcdefghijklmnop"), "bearer token must be masked");
});

test("sanitizeHeaders — non-secret headers pass through unchanged", () => {
  const out = sanitizeHeaders({ "content-type": "application/json", "x-request-id": "req-42" });
  assert.equal(out["content-type"], "application/json");
  assert.equal(out["x-request-id"], "req-42");
});
