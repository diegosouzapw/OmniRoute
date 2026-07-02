import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-model-metadata-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const registry = await import("../../src/lib/modelMetadataRegistry.ts");

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
});

test("canonical model metadata merges static and synced capabilities into one record", async () => {
  modelsDevSync.saveModelsDevCapabilities({
    openai: {
      "gpt-4o": {
        tool_call: true,
        reasoning: true,
        attachment: true,
        structured_output: true,
        temperature: true,
        modalities_input: JSON.stringify(["text", "image"]),
        modalities_output: JSON.stringify(["text"]),
        knowledge_cutoff: "2025-03",
        release_date: "2025-01-01",
        last_updated: "2025-04-01",
        status: "stable",
        family: "gpt-4",
        open_weights: false,
        limit_context: 256000,
        limit_input: 256000,
        limit_output: 16384,
        interleaved_field: null,
      },
    },
  });

  const metadata = registry.getCanonicalModelMetadata({ provider: "openai", model: "gpt-4o" });

  assert.ok(metadata);
  assert.equal(metadata.provider, "openai");
  assert.equal(metadata.providerAlias, "openai");
  assert.equal(metadata.capabilities.toolCalling, true);
  assert.equal(metadata.capabilities.vision, true);
  assert.equal(metadata.limits.contextWindow, 256000);
  assert.equal(metadata.limits.maxOutputTokens, 16384);
  assert.deepEqual(metadata.modalities.input, ["text", "image"]);
  assert.equal(metadata.metadata.family, "gpt-4");
  assert.equal(metadata.metadata.source.syncedCapability, true);
});

test("resolveModelAliasLookup returns stored alias resolution with metadata", async () => {
  await modelsDb.setModelAlias("fast-default", "openai/gpt-4o");

  const resolved = await registry.resolveModelAliasLookup("fast-default");

  assert.equal(resolved.ok, true);
  if (!resolved.ok) return;
  assert.equal(resolved.value.source, "stored_alias");
  assert.equal(resolved.value.resolvedAlias, "openai/gpt-4o");
  assert.equal(resolved.value.metadata.model, "gpt-4o");
});

test("resolveModelAliasLookup flags ambiguous raw model IDs instead of guessing", async () => {
  const resolved = await registry.resolveModelAliasLookup("claude-sonnet-4-6");

  assert.equal(resolved.ok, false);
  if (resolved.ok) return;
  assert.equal(resolved.error.code, registry.MODEL_ALIAS_AMBIGUOUS);
  assert.equal(resolved.error.status, 409);
  assert.ok((resolved.error.candidates || []).some((candidate) => candidate.startsWith("cc/")));
});
