import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #11180 regression guard: a custom OpenAI-compatible connection pointing at a
// keyless local backend (llama.cpp / Ollama / vLLM started without an API key)
// carries no apiKey, no OAuth token and no provider-specific session data, so
// `hasUsableConnectionCredential` dropped it from `validConnections` before the
// auto/* candidate pool was built. The connection was active, tested and synced,
// yet structurally invisible to auto-routing with no log line and no UI hint.
//
// Keyless is the NORMAL configuration for a self-hosted backend, so a custom
// compatible connection must stay eligible. This gate is one step later than
// #5873 (registry-absent defaultModel fallback), whose guard still passes.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-keyless-11180-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");

type VirtualComboResult = Awaited<ReturnType<typeof virtualFactory.createVirtualAutoCombo>>;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("keyless custom openai-compatible connection enters the auto pool (#11180)", async () => {
  const customProvider = "openai-compatible-chat-c2fe8a44-f2fd-47b4-8893-6f1521804c45";
  await providersDb.createProviderConnection({
    provider: customProvider,
    authType: "apikey",
    name: "llamaAsimov",
    // Keyless local backend: llama-server --host 0.0.0.0 with no --api-key.
    apiKey: "",
    defaultModel: "Qwen3.8-27B-UD-Q4-DFlash-GGUF",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("fast");

  const candidate = combo.models.find((model) => model.providerId === customProvider);
  assert.ok(
    candidate,
    "a keyless custom-compatible connection must not be dropped by the credential gate"
  );
  assert.equal(candidate.model, `${customProvider}/Qwen3.8-27B-UD-Q4-DFlash-GGUF`);
  assert.ok(combo.autoConfig.candidatePool.includes(customProvider));
});

test("a keyless FIRST-PARTY provider connection stays out of the pool (#11180)", async () => {
  // The relaxation is scoped to custom compatible connection IDs. A first-party
  // provider with an empty key is an unconfigured connection, not a keyless
  // local backend, and must still be filtered out.
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "unconfigured openai",
    apiKey: "",
    defaultModel: "gpt-4o",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("fast");

  assert.equal(
    combo.autoConfig.candidatePool.includes("openai"),
    false,
    "an unconfigured first-party connection must remain excluded"
  );
});
