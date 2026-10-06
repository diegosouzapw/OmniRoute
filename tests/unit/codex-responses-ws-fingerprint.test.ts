import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-codex-ws-fingerprint-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.APP_LOG_TO_FILE = "false";
process.env.OMNIROUTE_WS_BRIDGE_SECRET = "bridge-secret";

const core = await import("../../src/lib/db/core.ts");
const { createProviderConnection } = await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/internal/codex-responses-ws/route.ts");

function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(resetDb);
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("Codex internal websocket bridge prepare preserves original OAuth identity in off mode", async () => {
  await createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Codex WS off",
    accessToken: "oauth-token",
    isActive: true,
    testStatus: "active",
    providerSpecificData: { codexFingerprintMode: "off" },
  });

  const response = await POST(
    new Request("http://omniroute.local/api/internal/codex-responses-ws", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-omniroute-ws-bridge-secret": "bridge-secret",
      },
      body: JSON.stringify({
        action: "prepare",
        requestUrl: "http://omniroute.local/v1/responses",
        headers: { "session-id": "client-session", "thread-id": "client-thread" },
        response: { model: "codex/gpt-5.5", input: "hello" },
      }),
    })
  );
  const body = await response.json();

  assert.equal(response.status, 200, JSON.stringify(body));
  assert.equal(body.headers["session-id"], "client-session");
  assert.equal(body.headers["thread-id"], "client-thread");
});
