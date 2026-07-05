// Regression guard for #6041 — the generic OAuth route threw an unhandled
// `Unknown provider: zed` 500 when the dashboard hit /api/oauth/zed/authorize.
// Zed is a keychain-import-only provider (listed in the OAuth catalog so the UI
// shows it, but with no OAuth handler), so the route now returns a clear 400
// pointing at the Import flow instead of crashing.
//
// DB handles released in test.after (CLAUDE.md learning: unreleased SQLite
// handles hang node:test).

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-oauth-6041-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");

test.before(async () => {
  // The guard runs BEFORE the auth check, but disable login so any fall-through
  // path is exercised without a 401 masking the result.
  await settingsDb.updateSettings({ requireLogin: false });
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function get(provider: string, action: string) {
  const request = new Request(`http://localhost:20128/api/oauth/${provider}/${action}`);
  return route.GET(request, { params: Promise.resolve({ provider, action }) });
}

test("#6041 GET /oauth/zed/authorize returns a graceful 400, not a 500 'Unknown provider'", async () => {
  const res = await get("zed", "authorize");
  assert.equal(res.status, 400, "must be a clean 400, not a 500 crash");
  const body = await res.json();
  assert.ok(body.error, "error message present");
  assert.match(body.error, /Import/i, "must point the user at the Import flow");
  assert.doesNotMatch(body.error, /Unknown provider/i, "must not leak the raw 'Unknown provider' error");
  // Never leak a stack trace (ERROR_SANITIZATION).
  assert.doesNotMatch(body.error, /at \//, "must not leak a stack trace");
});

test("#6041 other keychain OAuth actions for zed are also handled gracefully", async () => {
  for (const action of ["device-code", "exchange", "poll"]) {
    const res = await get("zed", action);
    assert.equal(res.status, 400, `zed/${action} must be a clean 400`);
    const body = await res.json();
    assert.match(body.error, /Import/i, `zed/${action} points at Import`);
  }
});

test("#6041 POST /oauth/zed/exchange is also guarded (no 500)", async () => {
  const request = new Request("http://localhost:20128/api/oauth/zed/exchange", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  const res = await route.POST(request, {
    params: Promise.resolve({ provider: "zed", action: "exchange" }),
  });
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.match(body.error, /Import/i);
});
