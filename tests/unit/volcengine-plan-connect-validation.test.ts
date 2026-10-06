/**
 * tests/unit/volcengine-plan-connect-validation.test.ts
 *
 * Hard Rule #7 (Zod on every input) for the volcengine-plan connect routes.
 *
 * These three routes read `await request.json()` and then hand the raw fields
 * to the auto-login service after ad-hoc `typeof` checks. The t06
 * route-validation gate flags exactly that shape, and the gap is real: an
 * unvalidated body reaches a service that drives a headless browser login.
 *
 * The two session routes are the fast, deterministic probes: today an invalid
 * body reaches the session lookup and comes back 404 (or coerces silently —
 * `String(body.code ?? "")` turns 123 into "123"); after the fix the body is
 * rejected with 400 BEFORE the session is ever looked up.
 *
 * DATA_DIR is redirected to a temp dir BEFORE the route imports, since the
 * auth pipeline touches the DB singleton at import time. With a fresh DB no
 * password is set, so requireManagementAuth() lets the request through and
 * the assertions actually reach the body-validation branch.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-volc-connect-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-volc-connect-secret";

const core = await import("../../src/lib/db/core.ts");
const codeRoute =
  await import("../../src/app/api/providers/volcengine-plan/connect/[sessionId]/code/route.ts");
const identityRoute =
  await import("../../src/app/api/providers/volcengine-plan/connect/[sessionId]/identity/route.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function post(body: unknown): Request {
  return new Request("http://localhost/api/providers/volcengine-plan/connect/sess-unknown/code", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

const params = Promise.resolve({ sessionId: "sess-unknown-for-validation-test" });

// ── code route ───────────────────────────────────────────────────────────────

test("code route rejects a non-string code with 400 instead of coercing it", async () => {
  // Before the fix: `String(body.code ?? "")` happily turns 123 into "123" and
  // the route answers 404 (unknown session) — the bad type never surfaces.
  const res = await codeRoute.POST(post({ code: 123 }), { params });
  assert.equal(res.status, 400);
  const body = (await res.json()) as { error?: string };
  assert.match(String(body.error), /invalid|code/i);
});

test("code route rejects a missing code with 400", async () => {
  const res = await codeRoute.POST(post({ captcha: "abcd" }), { params });
  assert.equal(res.status, 400);
});

test("code route rejects a non-string captcha with 400", async () => {
  const res = await codeRoute.POST(post({ code: "123456", captcha: 99 }), { params });
  assert.equal(res.status, 400);
});

test("code route validates the body BEFORE the session lookup", async () => {
  // The session id is unknown, so an unvalidated route answers 404. A validated
  // one must answer 400: the body is refused before any session state is read.
  const res = await codeRoute.POST(post({ code: 123 }), { params });
  assert.notEqual(res.status, 404);
  assert.equal(res.status, 400);
});

// ── identity route ───────────────────────────────────────────────────────────

test("identity route rejects a non-integer index with 400 before the session lookup", async () => {
  const res = await identityRoute.POST(post({ index: "not-a-number" }), { params });
  assert.equal(res.status, 400);
  assert.notEqual(res.status, 404);
});

test("identity route rejects a negative index with 400", async () => {
  const res = await identityRoute.POST(post({ index: -1 }), { params });
  assert.equal(res.status, 400);
});

test("identity route rejects a non-numeric timeout with 400", async () => {
  const res = await identityRoute.POST(post({ index: 0, timeout: "soon" }), { params });
  assert.equal(res.status, 400);
});

// ── gate contract ────────────────────────────────────────────────────────────

test("all three connect routes parse their body through a Zod schema (t06 gate)", () => {
  const ROOT = path.join(import.meta.dirname, "..", "..");
  const files = [
    "src/app/api/providers/volcengine-plan/connect/route.ts",
    "src/app/api/providers/volcengine-plan/connect/[sessionId]/code/route.ts",
    "src/app/api/providers/volcengine-plan/connect/[sessionId]/identity/route.ts",
  ];
  for (const rel of files) {
    const src = fs.readFileSync(path.join(ROOT, rel), "utf8");
    assert.ok(
      src.includes("validateBody(") || src.includes(".safeParse("),
      `${rel} must validate its body with Zod (check:route-validation:t06)`
    );
  }
});
