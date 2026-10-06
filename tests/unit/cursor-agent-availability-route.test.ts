/**
 * GET /api/providers/cursor/agent-availability (Cursor renewal plan, Task 5).
 *
 * Real fake-cursor-agent-binary + HOME-override technique (see
 * tests/unit/cursor-renewal.test.ts) to drive getCachedCursorAgentAvailability()
 * for real — no mocking, same rationale as every other Cursor test file in
 * this plan (no DI seam, no mock.module() support in this harness).
 *
 * getCachedCursorAgentAvailability() has a module-level 5-minute TTL cache
 * with no exported reset hook, so this file only exercises ONE truth value
 * through the live route (the "unauthenticated" default state a fresh test
 * fixture naturally has) — a second call within the same process would
 * silently replay the FIRST call's cached result regardless of a changed
 * fixture, which would look like a passing assertion for the wrong reason.
 * The "authenticated -> true" mapping is verified in a separate file
 * (tests/unit/cursor-agent-availability-route-authenticated.test.ts, its own
 * process, so its own fresh cache) — the TTL cache's own behavior (reuse
 * within the window, fresh spawn after expiry) is covered directly in
 * tests/unit/cursor-renewal.test.ts.
 *
 * DATA_DIR is overridden to a temp dir BEFORE any import below, since loading
 * src/server/authz/policies/management.ts transitively touches the real DB
 * singleton at import time.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

process.env.NODE_ENV = "test";
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-availability-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { GET } = await import("../../src/app/api/providers/cursor/agent-availability/route.ts");
const { managementPolicy } = await import("../../src/server/authz/policies/management.ts");

const FAKE_CURSOR_AGENT_SCRIPT = `#!/usr/bin/env node
const args = process.argv.slice(2);
if (args[0] === "status") {
  const mode = process.env.FAKE_CURSOR_AGENT_STATUS_MODE || "unauthenticated";
  if (mode === "authenticated") {
    process.stdout.write(JSON.stringify({ status: "authenticated", isAuthenticated: true }));
  } else {
    process.stdout.write(JSON.stringify({ status: "unauthenticated", isAuthenticated: false }));
  }
}
`;

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

function writeFakeCursorAgentBinary(destPath: string): void {
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, FAKE_CURSOR_AGENT_SCRIPT, { mode: 0o755 });
  fs.chmodSync(destPath, 0o755);
}

const originalHome = process.env.HOME;
const originalUserProfile = process.env.USERPROFILE;
const tmpHome = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-agent-availability-home-"));
process.env.HOME = tmpHome;
process.env.USERPROFILE = tmpHome;
process.env.FAKE_CURSOR_AGENT_STATUS_MODE = "unauthenticated";
writeFakeCursorAgentBinary(path.join(tmpHome, ".local", "bin", "cursor-agent"));

test.after(() => {
  process.env.HOME = originalHome;
  if (originalUserProfile !== undefined) process.env.USERPROFILE = originalUserProfile;
  else delete process.env.USERPROFILE;
  delete process.env.FAKE_CURSOR_AGENT_STATUS_MODE;
  fs.rmSync(tmpHome, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("returns {cursorAgentAvailable: false} and ONLY that field when cursor-agent is unauthenticated", async () => {
  const res = await GET();
  const body = (await res.json()) as Record<string, unknown>;

  assert.equal(res.status, 200);
  assert.deepEqual(Object.keys(body), ["cursorAgentAvailable"]);
  assert.equal(body.cursorAgentAvailable, false);
  assert.equal(body.accessToken, undefined);
  assert.equal(body.machineId, undefined);
});

// Loopback enforcement happens unconditionally before any auth check (Hard
// Rules #15 + #17): a non-loopback caller with NO credentials at all must
// still be rejected by the managementPolicy pipeline itself — never by an
// in-route check (this route intentionally has none; see route.ts's own
// comment on why).
test("a non-loopback, unauthenticated request is rejected by managementPolicy (403 LOCAL_ONLY), not by the route", async () => {
  const requestPath = "/api/providers/cursor/agent-availability";
  const outcome = await managementPolicy.evaluate({
    request: {
      method: "GET",
      headers: new Headers(),
      url: `https://dashboard.example${requestPath}`,
      nextUrl: { pathname: requestPath },
    },
    classification: {
      routeClass: "MANAGEMENT",
      normalizedPath: requestPath,
      reason: "management_api",
    },
    requestId: "req_cursor_agent_availability_test",
  } as unknown as Parameters<typeof managementPolicy.evaluate>[0]);

  assert.equal(outcome.allow, false);
  if (!outcome.allow) {
    assert.equal(outcome.status, 403);
    assert.equal(outcome.code, "LOCAL_ONLY");
  }
});
