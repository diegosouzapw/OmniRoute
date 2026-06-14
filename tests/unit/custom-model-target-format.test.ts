/**
 * Issue #2905 — custom models (added via the UI) on opencode-go / openai-compatible
 * nodes always routed as OpenAI-compatible because there was no way to set a
 * per-model `targetFormat`. `addCustomModel` didn't accept it, the API schema
 * stripped it, and routing (`getModelTargetFormat`, static-registry-only) never
 * saw it — so a custom model that needs the Anthropic Messages shape fell back
 * to the provider default ("openai").
 *
 * This test verifies the persistence + getModelInfo-injection chain: a custom
 * model saved with targetFormat: "claude" is surfaced on the resolved modelInfo
 * (which chatCore then uses before the provider default).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-custom-target-format-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const { getModelInfo } = await import("../../src/sse/services/model.ts");

test.before(async () => {
  await providersDb.createProviderNode({
    id: "openai-compatible-2905",
    type: "openai-compatible",
    name: "Gateway 2905",
    prefix: "g29",
    baseUrl: "https://proxy.example.com",
    chatPath: "/v1/chat/completions",
    modelsPath: "/v1/models",
  });
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#2905 addCustomModel persists targetFormat", async () => {
  await modelsDb.addCustomModel(
    "openai-compatible-2905",
    "my-claude-model",
    "My Claude Model",
    "manual",
    "chat-completions",
    ["chat"],
    "claude"
  );
  const models = (await modelsDb.getCustomModels("openai-compatible-2905")) as Array<{
    id: string;
    targetFormat?: string;
  }>;
  const saved = models.find((m) => m.id === "my-claude-model");
  assert.ok(saved, "custom model must be saved");
  assert.equal(saved.targetFormat, "claude", "targetFormat must be persisted");
});

test("#2905 getModelInfo surfaces the custom model targetFormat", async () => {
  const info = (await getModelInfo("g29/my-claude-model")) as {
    provider?: string;
    targetFormat?: string;
  };
  assert.equal(info.provider, "openai-compatible-2905", "must resolve to the custom node");
  assert.equal(info.targetFormat, "claude", "getModelInfo must inject the custom targetFormat");
});

test("#2905 a custom model without targetFormat surfaces none (provider default applies)", async () => {
  await modelsDb.addCustomModel(
    "openai-compatible-2905",
    "plain-model",
    "Plain Model",
    "manual",
    "chat-completions",
    ["chat"]
  );
  const info = (await getModelInfo("g29/plain-model")) as { targetFormat?: string };
  assert.equal(info.targetFormat, undefined, "no targetFormat → falls back to provider default");
});
