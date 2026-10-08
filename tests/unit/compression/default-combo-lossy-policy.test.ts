import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-default-combo-lossy-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.REQUIRE_API_KEY = "false";
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "test-compression-secret";

const core = await import("../../../src/lib/db/core.ts");
const providersDb = await import("../../../src/lib/db/providers.ts");
const readCacheDb = await import("../../../src/lib/db/readCache.ts");
const compressionDb = await import("../../../src/lib/db/compression.ts");
const compressionCombosDb = await import("../../../src/lib/db/compressionCombos.ts");
const { handleChatCore } = await import("../../../open-sse/handlers/chatCore.ts");
const { resetAllCircuitBreakers } = await import("../../../src/shared/utils/circuitBreaker.ts");

const originalFetch = globalThis.fetch;
// rtk collapses a run of identical lines into this marker; session-dedup and lite leave it out.
const RTK_MARKER = /rtk:dropped \d+ repeated lines/;
const DEFAULT_COMBO_APPLIED = "Default compression combo applied: default-caveman";

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
  // chatCore writes the call log after the response resolves; let it land before closing.
  await new Promise((resolve) => setTimeout(resolve, 50));
  core.closeDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  if (ORIGINAL_DATA_DIR === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = ORIGINAL_DATA_DIR;
});

// Legacy settings: stacked default mode with the stored built-in rtk+caveman stacked pipeline.
// That is the state in which chatCore swaps in the default compression combo's pipeline.
async function storeLegacyStackedSettings() {
  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "stacked",
    autoTriggerTokens: 0,
    cavemanOutputMode: { enabled: false, intensity: "full", autoClarity: true },
    languageConfig: {
      enabled: false,
      defaultLanguage: "en",
      autoDetect: true,
      enabledPacks: ["en"],
    },
  });
}

async function sendRepeatedToolOutput(compressionHeader?: string) {
  const connection = await providersDb.createProviderConnection({
    provider: "openai",
    apiKey: "test-key",
    isActive: true,
  });
  let capturedBody: { messages?: Array<{ content?: string }> } | null = null;
  globalThis.fetch = async (_url: string | URL | Request, init?: RequestInit) => {
    if (init?.body) capturedBody = JSON.parse(init.body as string) as typeof capturedBody;
    return new Response(
      JSON.stringify({
        choices: [{ message: { role: "assistant", content: "ok" } }],
        usage: { prompt_tokens: 10, completion_tokens: 5, total_tokens: 15 },
      }),
      { status: 200, headers: { "content-type": "application/json" } }
    );
  };
  const debugLines: string[] = [];
  // chatCore reads request headers from a Headers instance or a plain object.
  const headers: Record<string, string> = compressionHeader
    ? { "x-omniroute-compression": compressionHeader }
    : {};

  const result = await handleChatCore({
    body: {
      model: "gpt-4",
      stream: false,
      messages: [
        { role: "tool", content: Array.from({ length: 8 }, () => "same noisy line").join("\n") },
      ],
    },
    modelInfo: { provider: "openai", model: "gpt-4" },
    credentials: { apiKey: "test-key" },
    log: {
      debug: (_tag: string, message: string) => debugLines.push(String(message)),
      info: () => {},
      warn: () => {},
      error: () => {},
    },
    clientRawRequest: { endpoint: "/v1/chat/completions", headers },
    connectionId: connection.id,
    onCredentialsRefreshed: () => {},
    onRequestSuccess: () => {},
    onStreamFailure: () => {},
    onDisconnect: () => {},
    userAgent: "test-agent",
    comboName: null,
  });

  assert.ok(result.success, "request should succeed");
  assert.ok(capturedBody, "the upstream fetch should receive the request body");
  return { toolContent: capturedBody.messages?.[0]?.content ?? "", debugLines };
}

test("a request without a compression header runs the seeded default combo's safe pipeline", async () => {
  await storeLegacyStackedSettings();

  const { toolContent, debugLines } = await sendRepeatedToolOutput();

  assert.ok(debugLines.includes(DEFAULT_COMBO_APPLIED), "the default-combo fallback should apply");
  assert.doesNotMatch(toolContent, RTK_MARKER);
});

test("a request without a compression header drops lossy steps added to the default combo", async () => {
  await storeLegacyStackedSettings();
  const edited = compressionCombosDb.setEngineInDefaultCombo("rtk", true);
  assert.ok(
    edited?.pipeline.some((step) => step.engine === "rtk"),
    "rtk should join the combo"
  );

  const { toolContent, debugLines } = await sendRepeatedToolOutput();

  assert.ok(debugLines.includes(DEFAULT_COMBO_APPLIED), "the default-combo fallback should apply");
  assert.doesNotMatch(toolContent, RTK_MARKER);
});

test("allow-lossy still runs the lossy steps of an edited default combo", async () => {
  await storeLegacyStackedSettings();
  compressionCombosDb.setEngineInDefaultCombo("rtk", true);

  const { toolContent, debugLines } = await sendRepeatedToolOutput("allow-lossy");

  assert.ok(debugLines.includes(DEFAULT_COMBO_APPLIED), "the default-combo fallback should apply");
  assert.match(toolContent, RTK_MARKER);
});

test("a named combo chosen by the compression header is not replaced by the default combo", async () => {
  await storeLegacyStackedSettings();
  compressionCombosDb.createCompressionCombo({
    name: "RTK only",
    pipeline: [{ engine: "rtk", intensity: "standard" }],
  });

  const { toolContent, debugLines } = await sendRepeatedToolOutput("RTK only");

  assert.ok(!debugLines.includes(DEFAULT_COMBO_APPLIED), "the header's combo should run");
  assert.match(toolContent, RTK_MARKER);
});
