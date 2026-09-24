import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const testRoot = fs.mkdtempSync(path.join(os.tmpdir(), "omni-video-provider-error-"));
const originalEnv = {
  DATA_DIR: process.env.DATA_DIR,
  OMNIROUTE_PLUGINS_DIR: process.env.OMNIROUTE_PLUGINS_DIR,
  API_KEY_SECRET: process.env.API_KEY_SECRET,
  DISABLE_SQLITE_AUTO_BACKUP: process.env.DISABLE_SQLITE_AUTO_BACKUP,
};
process.env.DATA_DIR = path.join(testRoot, "data");
process.env.OMNIROUTE_PLUGINS_DIR = path.join(testRoot, "plugins");
process.env.API_KEY_SECRET = "video-provider-error-test-key";
process.env.DISABLE_SQLITE_AUTO_BACKUP = "true";
fs.mkdirSync(process.env.DATA_DIR, { recursive: true });
fs.mkdirSync(process.env.OMNIROUTE_PLUGINS_DIR, { recursive: true });

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { waitForCallLogSaves } = await import("../../src/lib/usage/callLogs.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { closeSharedLoggerResource } = await import("../../src/shared/utils/loggerResource.ts");

const CANARY = "VIDEO_CUE_PRIVATE_SENTINEL_7D2";
const upstreamMessage = `Authentication failed; cue ${CANARY}`;

async function invokeFailure(observed: boolean) {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: observed ? "video error" : "ordinary error",
    apiKey: "video-provider-error-key",
    isActive: true,
    testStatus: "active",
  });
  const body = {
    model: "openai/gpt-4o-mini",
    stream: false,
    messages: [{ role: "user", content: `[Video 1] transcript: ${CANARY}` }],
  };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () =>
    new Response(JSON.stringify({ error: { message: upstreamMessage } }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });

  try {
    const response = await handleChatCore({
      body,
      modelInfo: { provider: "openai", model: "gpt-4o-mini", extendedContext: false },
      credentials: { apiKey: "video-provider-error-key", providerSpecificData: {} },
      log: null,
      clientRawRequest: {
        endpoint: "/v1/chat/completions",
        body,
        headers: new Headers({ accept: "application/json" }),
      },
      connectionId: connection.id,
      videoBridgeLog: observed ? { observed: true, redaction: [] } : undefined,
      skipResourcePressureGuard: true,
    });
    assert.ok(response.response instanceof Response, "chatCore returns a client Response");
    const clientBody = await response.response.text();
    const stored = await providersDb.getProviderConnectionById(connection.id);
    return {
      status: response.status,
      clientBody,
      lastError: stored?.lastError ?? "",
      lastErrorType: stored?.lastErrorType ?? "",
      testStatus: stored?.testStatus ?? "",
    };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test.after(async () => {
  await waitForCallLogSaves(5000);
  core.resetDbInstance();
  await closeSharedLoggerResource();
  for (const [name, value] of Object.entries(originalEnv)) {
    if (value === undefined) delete process.env[name];
    else process.env[name] = value;
  }
  fs.rmSync(testRoot, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("observed video provider failures omit echoed cues from retained connection errors", async () => {
  await core.ensureDbInitialized();
  const ordinary = await invokeFailure(false);
  const observed = await invokeFailure(true);

  assert.equal(ordinary.status, 401);
  assert.equal(observed.status, ordinary.status);
  assert.equal(observed.clientBody, ordinary.clientBody, "client-visible failure stays unchanged");
  assert.equal(observed.lastErrorType, ordinary.lastErrorType, "failure class stays unchanged");
  assert.equal(observed.testStatus, ordinary.testStatus, "connection state stays unchanged");
  assert.match(ordinary.lastError, /VIDEO_CUE_PRIVATE_SENTINEL_7D2/);
  assert.doesNotMatch(observed.lastError, /VIDEO_CUE_PRIVATE_SENTINEL_7D2/);
});
