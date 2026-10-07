import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-repro-8429-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDevSync = await import("../../src/lib/modelsDevSync.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");

function buildCapability(overrides: Record<string, unknown> = {}) {
  return {
    tool_call: null,
    reasoning: null,
    attachment: null,
    structured_output: null,
    temperature: null,
    modalities_input: "[]",
    modalities_output: "[]",
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: null,
    limit_context: null,
    limit_input: null,
    limit_output: null,
    interleaved_field: null,
    ...overrides,
  };
}

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});
test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("#8429: synced model_capabilities row written under models.dev mapping is unreachable via the canonical 'codex' provider id", () => {
  modelsDevSync.saveModelsDevCapabilities({
    openai: { "gpt-6-codex-preview": buildCapability({ tool_call: false }) },
    cx: { "gpt-6-codex-preview": buildCapability({ tool_call: false }) },
  });
  const viaAlias = modelsDevSync.getSyncedCapability("cx", "gpt-6-codex-preview");
  assert.equal(viaAlias?.tool_call, false, "row must exist under the alias 'cx'");

  const resolved = modelCapabilities.getResolvedModelCapabilities({
    provider: "codex",
    model: "gpt-6-codex-preview",
  });

  assert.equal(
    resolved.supportsTools,
    false,
    `expected synced tool_call=false to be resolved for provider "codex" (it was ${resolved.supportsTools})`
  );
});

test("#8429: synced model_capabilities row is unreachable via the canonical 'claude' provider id (same class, alias 'cc')", () => {
  modelsDevSync.saveModelsDevCapabilities({
    anthropic: { "claude-preview-9-9": buildCapability({ tool_call: false }) },
    cc: { "claude-preview-9-9": buildCapability({ tool_call: false }) },
  });
  const viaAlias = modelsDevSync.getSyncedCapability("cc", "claude-preview-9-9");
  assert.equal(viaAlias?.tool_call, false, "row must exist under the alias 'cc'");

  const resolved = modelCapabilities.getResolvedModelCapabilities({
    provider: "claude",
    model: "claude-preview-9-9",
  });

  assert.equal(
    resolved.supportsTools,
    false,
    `expected synced tool_call=false to be resolved for provider "claude" (it was ${resolved.supportsTools})`
  );
});
