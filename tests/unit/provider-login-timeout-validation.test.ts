/**
 * OSS-050 — `POST /api/providers/[id]/login` accepted an unbounded `timeout`.
 *
 * The route parsed its body with `req.json().catch(() => ({}))` and gated
 * `timeout` with a bare `typeof body.timeout === "number"` check, then handed
 * the raw value to `inAppLoginService.startLogin()`. There
 * `maxPolls = Math.floor(maxTimeout / pollInterval)` turns it into a poll budget
 * that keeps a headful Playwright Chromium — and the service's single
 * `activeLogin` slot — alive, so `{"timeout": 1e12}` pinned both effectively
 * forever.
 *
 * The two provider-specific login services already clamp with exactly these
 * bounds (`clampAdobeFireflyLoginTimeout`, `clampTimeout`); only the generic
 * web-cookie path was unbounded. This suite pins the shared clamp and proves the
 * route applies it before the value reaches the service.
 *
 * Scope note: this route is LOCAL_ONLY (`LOCAL_ONLY_API_PATTERNS` in
 * src/server/authz/routeGuard.ts), so this is input-contract hardening on a
 * loopback-only surface, not a remotely reachable defect.
 *
 * mock.module() is unreliable under this tsx/ESM + node:test runner (see
 * tests/unit/rule12-error-sanitization-sweep.test.ts), so the exported
 * `inAppLoginService` singleton's method is monkey-patched and restored.
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import type { NextRequest } from "next/server";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-login-timeout-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "login-timeout-test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const loginRoute = await import("../../src/app/api/providers/[id]/login/route.ts");
const {
  LOGIN_TIMEOUT_DEFAULT_MS,
  LOGIN_TIMEOUT_MAX_MS,
  LOGIN_TIMEOUT_MIN_MS,
  clampLoginTimeoutMs,
} = await import("../../src/lib/api/loginTimeout.ts");
const { inAppLoginService } = await import("../../open-sse/services/inAppLoginService.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

// ── The shared clamp ────────────────────────────────────────────────────────

test("clampLoginTimeoutMs mirrors the sibling browser-login clamps", () => {
  // Bounds must stay byte-identical to clampAdobeFireflyLoginTimeout /
  // clampTimeout — a drift here re-splits the contract this fix unified.
  assert.equal(LOGIN_TIMEOUT_DEFAULT_MS, 300_000);
  assert.equal(LOGIN_TIMEOUT_MIN_MS, 15_000);
  assert.equal(LOGIN_TIMEOUT_MAX_MS, 600_000);

  // Absent / unusable → default.
  for (const bad of [undefined, null, "600000", {}, [], true, NaN, Infinity, -Infinity]) {
    assert.equal(
      clampLoginTimeoutMs(bad),
      LOGIN_TIMEOUT_DEFAULT_MS,
      `${JSON.stringify(String(bad))} should fall back to the default`
    );
  }

  // Below the floor → floor. This is the case that made a login unwinnable.
  assert.equal(clampLoginTimeoutMs(0), LOGIN_TIMEOUT_MIN_MS);
  assert.equal(clampLoginTimeoutMs(-1), LOGIN_TIMEOUT_MIN_MS);
  assert.equal(clampLoginTimeoutMs(14_999), LOGIN_TIMEOUT_MIN_MS);

  // Above the ceiling → ceiling. This is the resource-pin case.
  assert.equal(clampLoginTimeoutMs(600_001), LOGIN_TIMEOUT_MAX_MS);
  assert.equal(clampLoginTimeoutMs(1e12), LOGIN_TIMEOUT_MAX_MS);
  assert.equal(clampLoginTimeoutMs(Number.MAX_SAFE_INTEGER), LOGIN_TIMEOUT_MAX_MS);

  // In range → preserved, truncated to an integer (maxPolls floors it anyway).
  assert.equal(clampLoginTimeoutMs(15_000), 15_000);
  assert.equal(clampLoginTimeoutMs(120_000), 120_000);
  assert.equal(clampLoginTimeoutMs(600_000), 600_000);
  assert.equal(clampLoginTimeoutMs(120_000.9), 120_000);
});

// ── The route applies it before the value reaches the service ───────────────

function makeRequest(id: string, body: unknown): NextRequest {
  return new Request(`http://localhost/api/providers/${id}/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  }) as unknown as NextRequest;
}

/** Drive the real POST handler and return the `timeout` startLogin actually saw. */
async function capturedTimeoutFor(body: unknown): Promise<number | undefined> {
  const connection = await providersDb.createProviderConnection({
    // A generic web-cookie provider: not Adobe Firefly, not Conol, so the
    // request lands on the inAppLoginService path — the one that was unbounded.
    provider: "claude-web",
    authType: "web-cookie",
    name: "login-timeout-test",
    apiKey: "",
    isActive: true,
  });
  const id = String((connection as { id: string | number }).id);

  let seen: number | undefined;
  const original = inAppLoginService.startLogin.bind(inAppLoginService);
  inAppLoginService.startLogin = async (_providerId: string, options?: { timeout?: number }) => {
    seen = options?.timeout;
    return { success: false as const, error: "stubbed — not launching a browser" };
  };

  try {
    const res = await loginRoute.POST(makeRequest(id, body), {
      params: Promise.resolve({ id }),
    });
    // 400 is the stub's own "login did not succeed" answer; what matters is that
    // the handler reached the service at all.
    assert.equal(res.status, 400, "handler should have reached inAppLoginService");
  } finally {
    inAppLoginService.startLogin = original;
  }
  return seen;
}

test("POST /login clamps an absurd timeout to the ceiling", async () => {
  assert.equal(await capturedTimeoutFor({ timeout: 1e12 }), LOGIN_TIMEOUT_MAX_MS);
});

test("POST /login raises a below-floor timeout to the floor", async () => {
  assert.equal(await capturedTimeoutFor({ timeout: 1 }), LOGIN_TIMEOUT_MIN_MS);
});

test("POST /login falls back to the default for a missing or non-numeric timeout", async () => {
  assert.equal(await capturedTimeoutFor({}), LOGIN_TIMEOUT_DEFAULT_MS);
  assert.equal(await capturedTimeoutFor({ timeout: "600000" }), LOGIN_TIMEOUT_DEFAULT_MS);
});

test("POST /login preserves an in-range timeout", async () => {
  assert.equal(await capturedTimeoutFor({ timeout: 120_000 }), 120_000);
});

test("the clamped ceiling keeps inAppLoginService's poll budget bounded", async () => {
  // runBrowserLogin: maxPolls = Math.floor(maxTimeout / pollInterval), with
  // pollInterval defaulting to 1000ms. Unbounded input made this ~1e9 polls.
  const captured = await capturedTimeoutFor({ timeout: Number.MAX_SAFE_INTEGER });
  assert.ok(captured !== undefined, "route must pass an explicit timeout");
  assert.ok(
    Math.floor((captured as number) / 1000) <= 600,
    `poll budget must stay bounded, got ${Math.floor((captured as number) / 1000)}`
  );
});
