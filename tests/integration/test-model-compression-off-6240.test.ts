// #6240 — the dashboard "Test model" action must be a clean connection test: it must NOT carry
// the operator's globally-enabled Output Styles system-prompt injection (e.g. "Ultra terse").
//
// Root cause: Phase 4A of handleChatCore (open-sse/handlers/chatCore.ts) injects the Output
// Styles system message whenever the operator's global `compression.enabled` flag is on,
// completely independent of the per-request `x-omniroute-compression` header/mode. The internal
// "Test model" request builder (src/lib/api/modelTestRunner.ts::buildInternalChatRequest) never
// sent that header, so a globally-enabled output style always leaked into test-model calls.
//
// This test locks the *chatCore* half of the fix directly: with Output Styles globally enabled,
// a request carrying `x-omniroute-compression: off` must NOT get the styles system message
// injected, while an otherwise-identical request without the header still does (so we're
// actually testing the new gate, not something else disabling output styles).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-testmodel-compression-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-testmodel-compression-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const readCacheDb = await import("../../src/lib/db/readCache.ts");
const compressionDb = await import("../../src/lib/db/compression.ts");
const { handleChatCore } = await import("../../open-sse/handlers/chatCore.ts");
const { resetAllCircuitBreakers } = await import("../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;

async function resetStorage() {
  globalThis.fetch = originalFetch;
  resetAllCircuitBreakers();
  readCacheDb.invalidateDbCache();
  await new Promise((resolve) => setTimeout(resolve, 20));
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  globalThis.fetch = originalFetch;
  core.closeDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    // best-effort cleanup
  }
});

async function runChatCore(opts: {
  provider: string;
  model: string;
  connectionId: string;
  headers: Headers;
  apiKeyInfo?: { id?: string; name?: string; compressionEnabled?: boolean };
  messageContent?: string;
}) {
  let capturedBody: { messages?: Array<{ role?: string; content?: string }> } | null = null;
  globalThis.fetch = async (_url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) {
      capturedBody = JSON.parse(init.body as string) as typeof capturedBody;
    }
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "ok" } }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };

  try {
    const result = await handleChatCore({
      body: {
        model: opts.model,
        stream: false,
        messages: [{ role: "user", content: opts.messageContent ?? "ping" }],
      },
      modelInfo: { provider: opts.provider, model: opts.model },
      credentials: { apiKey: "test-key" },
      log: { debug: () => {}, info: () => {}, warn: () => {}, error: () => {} },
      clientRawRequest: { endpoint: "/v1/chat/completions", headers: opts.headers },
      connectionId: opts.connectionId,
      apiKeyInfo: opts.apiKeyInfo,
      onCredentialsRefreshed: () => {},
      onRequestSuccess: () => {},
      onStreamFailure: () => {},
      onDisconnect: () => {},
      userAgent: "test-agent",
      comboName: null,
    });
    assert.ok(result.success, "Request should succeed");
    return { capturedBody, response: result.response as Response };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("chatCore: x-omniroute-compression: off suppresses Output Styles injection even with the operator's global style enabled (#6240)", async () => {
  const provider = "openai";
  const model = "gpt-4";

  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    autoTriggerTokens: 0,
    cavemanOutputMode: {
      enabled: true,
      intensity: "full",
      autoClarity: true,
    },
  });

  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  // Sanity check: WITHOUT the opt-out header, the globally-enabled style still injects (proves
  // the fixture actually exercises Output Styles, so the assertion below is meaningful).
  const withoutOptOut = await runChatCore({
    provider,
    model,
    connectionId: connection.id,
    headers: new Headers(),
  });
  // #13383: preserve the initial user turn; inject the style after it.
  assert.equal(withoutOptOut.capturedBody?.messages?.[0]?.role, "user");
  const styleMessage = withoutOptOut.capturedBody?.messages?.at(-1);
  assert.equal(styleMessage?.role, "system");
  assert.match(styleMessage?.content ?? "", /OmniRoute Output Styles/);

  // The "Test model" connection test sends x-omniroute-compression: off — must be clean.
  const testModelBody = await runChatCore({
    provider,
    model,
    connectionId: connection.id,
    headers: new Headers({ "x-omniroute-compression": "off" }),
  });
  const testModelFirstMessage = testModelBody.capturedBody?.messages?.[0];
  assert.ok(
    !testModelFirstMessage || testModelFirstMessage.role !== "system",
    "Test-model request (compression:off) must not receive an injected Output Styles system message"
  );
  const anyMessageHasMarker = (testModelBody.capturedBody?.messages ?? []).some((m) =>
    (m?.content ?? "").includes("OmniRoute Output Styles")
  );
  assert.equal(
    anyMessageHasMarker,
    false,
    "No message in the compression:off request should carry the Output Styles marker"
  );
});

test("chatCore: a per-key opt-out wins over request headers and Output Styles (#2101)", async () => {
  const provider = "openai";
  const model = "gpt-4";
  const originalContent = "Keep these trailing spaces   \n\n\nand this newline run.";

  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "lite",
    autoTriggerTokens: 0,
    // Force the adaptive planner to escalate any non-empty prompt. The per-key opt-out must
    // remain a hard kill even when a context budget would otherwise select a stacked plan.
    contextBudget: {
      mode: "floor",
      policy: "absolute",
      outputReserve: 0,
      safetyMargin: 0,
      pct: 1,
      absoluteBudget: 1,
    },
    cavemanOutputMode: {
      enabled: true,
      intensity: "full",
      autoClarity: true,
    },
  });

  const connection = await providersDb.createProviderConnection({
    provider,
    apiKey: "test-key",
    isActive: true,
  });

  const enabled = await runChatCore({
    provider,
    model,
    connectionId: connection.id,
    headers: new Headers({ "x-omniroute-compression": "default" }),
    apiKeyInfo: { compressionEnabled: true },
    messageContent: originalContent,
  });
  assert.equal(enabled.capturedBody?.messages?.[0]?.role, "user");
  assert.equal(enabled.capturedBody?.messages?.at(-1)?.role, "system");
  assert.match(enabled.capturedBody?.messages?.at(-1)?.content ?? "", /OmniRoute Output Styles/);

  const disabled = await runChatCore({
    provider,
    model,
    connectionId: connection.id,
    headers: new Headers({ "x-omniroute-compression": "default" }),
    apiKeyInfo: { compressionEnabled: false },
    messageContent: originalContent,
  });

  assert.deepEqual(disabled.capturedBody?.messages, [{ role: "user", content: originalContent }]);
  assert.equal(disabled.response.headers.get("x-omniroute-compression"), "off; source=off");
});
