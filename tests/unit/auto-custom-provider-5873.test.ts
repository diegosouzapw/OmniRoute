import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #5873 regression guard: custom OpenAI-/Anthropic-compatible providers have
// dynamic connection IDs (`*-compatible-*`) that are never keys of the static
// provider registry. The Auto-Combo virtual factory previously skipped any
// connection whose provider was absent from the registry, silently excluding
// every custom provider from `auto/` routing. It must now fall back to the
// connection's defaultModel instead.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-auto-custom-5873-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const virtualFactory = await import("../../open-sse/services/autoCombo/virtualFactory.ts");

type VirtualComboResult = Awaited<ReturnType<typeof virtualFactory.createVirtualAutoCombo>>;

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  await resetStorage();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });

  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
});

test("createVirtualAutoCombo includes custom openai-compatible providers via defaultModel (#5873)", async () => {
  const customProvider = "openai-compatible-chat-02669115-2545-4896-b003-cb4dac09d441";
  await providersDb.createProviderConnection({
    provider: customProvider,
    authType: "apikey",
    name: "My Custom LLM",
    apiKey: "sk-custom-key",
    defaultModel: "my-custom-model",
  });

  const combo: VirtualComboResult = await virtualFactory.createVirtualAutoCombo("fast");

  assert.equal(combo.strategy, "auto");
  const candidate = combo.models.find((model) => model.providerId === customProvider);
  assert.ok(
    candidate,
    "custom openai-compatible providers must not be excluded from auto/ routing"
  );
  assert.equal(candidate.model, `${customProvider}/my-custom-model`);
  assert.ok(combo.autoConfig.candidatePool.includes(customProvider));
});
