/**
 * `/api/version-manager/{install,start,restart,stop}` download, unpack and run the
 * CLIProxyAPI binary, the same work as `/api/services/cliproxy/*`. They belong to the
 * loopback-only tier so that a management credential that leaks through a tunnel cannot
 * start a process, and the install route must constrain `version` like its sibling does,
 * because it is spliced into a GitHub release URL and an install directory.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omni-version-manager-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "version-manager-api-key-secret";
process.env.JWT_SECRET = "version-manager-jwt-secret";

const core = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("../../src/lib/db/settings.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const { isLocalOnlyPath, isLocalOnlyBypassableByManageScope } =
  await import("../../src/server/authz/routeGuard.ts");
const runtimeSettings = await import("../../src/lib/config/runtimeSettings.ts");
const installRoute = await import("../../src/app/api/version-manager/install/route.ts");

const originalFetch = globalThis.fetch;
let outboundCalls: string[] = [];

await updateSettings({ requireLogin: true, password: "configured-password-hash" });
const manageKey = await apiKeysDb.createApiKey("manage", "machine1234567890", ["manage"]);

test.beforeEach(() => {
  outboundCalls = [];
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    outboundCalls.push(String(input instanceof Request ? input.url : input));
    return new Response("{}", { status: 500 });
  }) as typeof fetch;
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  runtimeSettings.resetRuntimeSettingsStateForTests();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

for (const action of ["install", "start", "restart", "stop"]) {
  test(`POST /api/version-manager/${action} is loopback-only`, () => {
    assert.equal(isLocalOnlyPath(`/api/version-manager/${action}`, "POST"), true);
  });
}

test("a version-manager route added later is loopback-only unless it is a read-only exemption", () => {
  for (const method of ["GET", "POST"]) {
    assert.equal(isLocalOnlyPath("/api/version-manager/rollback", method), true, method);
  }
});

test("the read-only version-manager routes stay reachable for a remote dashboard", () => {
  assert.equal(isLocalOnlyPath("/api/version-manager/status", "GET"), false);
  assert.equal(isLocalOnlyPath("/api/version-manager/check-update", "GET"), false);
  assert.equal(isLocalOnlyPath("/api/version-manager/status", "POST"), true);
});

test("the version-manager routes cannot be opened to manage scope, even when configured", async () => {
  await runtimeSettings.applyRuntimeSettings(
    {
      localOnlyManageScopeBypassEnabled: true,
      localOnlyManageScopeBypassPrefixes: [
        "/api/version-manager/",
        "/api/version-manager/install",
        "/api/version-manager/start",
        "/api/version-manager/restart",
        "/api/version-manager/stop",
        "/api/resilience/connections",
      ],
    },
    { force: true }
  );
  // Control: the bypass is live, so the veto below is what keeps these routes closed.
  assert.equal(isLocalOnlyBypassableByManageScope("/api/resilience/connections"), true);
  for (const action of ["install", "start", "restart", "stop"]) {
    assert.equal(isLocalOnlyBypassableByManageScope(`/api/version-manager/${action}`), false);
  }
});

function installRequest(version: string) {
  return new Request("http://omniroute.example/api/version-manager/install", {
    method: "POST",
    headers: {
      authorization: `Bearer ${manageKey.key}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ tool: "cliproxy", version }),
  });
}

test("install rejects a version that would re-point the release lookup", async () => {
  for (const version of [
    "v/../../../../evil/x/releases/tags/1",
    "../../../../tmp/pwn",
    "1.0.0/../../x",
    "1.0.0?x=1",
    "1.0.0 && id",
  ]) {
    const res = await installRoute.POST(installRequest(version));
    assert.equal(res.status, 400, version);
  }
  assert.deepEqual(outboundCalls, []);
});

test("install still looks up an ordinary release version", async () => {
  const res = await installRoute.POST(installRequest("1.2.3"));
  assert.notEqual(res.status, 400);
  assert.ok(
    outboundCalls.some((url) => url.endsWith("/releases/tags/v1.2.3")),
    outboundCalls.join(", ")
  );
});

test("install rejects a tool other than CLIProxyAPI without downloading anything", async () => {
  const res = await installRoute.POST(
    new Request("http://omniroute.example/api/version-manager/install", {
      method: "POST",
      headers: {
        authorization: `Bearer ${manageKey.key}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ tool: "9router", version: "1.0.0" }),
    })
  );
  assert.equal(res.status, 400);
  assert.deepEqual(outboundCalls, []);
});
