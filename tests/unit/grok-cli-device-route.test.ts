import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-grok-device-route-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const route = await import("../../src/app/api/oauth/[provider]/[action]/route.ts");

const originalFetch = globalThis.fetch;

test.before(async () => {
  await settingsDb.updateSettings({ requireLogin: false });
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("grok-cli poll does not require a PKCE code verifier", async () => {
  let upstreamBody = "";
  globalThis.fetch = (async (_input, init) => {
    upstreamBody = String(init?.body);
    return new Response(
      JSON.stringify({
        error: "authorization_pending",
        error_description: "User has not yet authorized",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;

  const request = new Request("http://localhost:20128/api/oauth/grok-cli/poll", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deviceCode: "opaque-device-code" }),
  });
  const response = await route.POST(request, {
    params: Promise.resolve({ provider: "grok-cli", action: "poll" }),
  });
  const body = await response.json();
  const params = new URLSearchParams(upstreamBody);

  assert.equal(response.status, 200);
  assert.equal(body.success, false);
  assert.equal(body.pending, true);
  assert.equal(body.error, "authorization_pending");
  assert.equal(params.get("device_code"), "opaque-device-code");
});
