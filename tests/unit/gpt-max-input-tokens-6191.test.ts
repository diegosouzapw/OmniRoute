import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #6191: GPT-family codex models advertised their full 400K context window as
// BOTH context_length and max_input_tokens, so coding agents never triggered
// auto-compaction. The real usable input budget is smaller (~272K). These tests
// pin the distinct-input-cap behavior and guard the contextLength fallback for
// models that do NOT declare an explicit maxInputTokens.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-gpt-input-cap-6191-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");

function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(() => {
  resetStorage();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("codex gpt-5.5 reports max_input_tokens smaller than its context window (#6191)", () => {
  const caps = modelCapabilities.getResolvedModelCapabilities("codex/gpt-5.5");
  assert.equal(caps.contextWindow, 400000);
  assert.equal(caps.maxInputTokens, 272000);
  assert.ok(
    (caps.maxInputTokens ?? 0) < (caps.contextWindow ?? 0),
    "max_input_tokens must be strictly smaller than context_length so agents compact"
  );
});

test("all codex gpt-5.5 effort variants carry the distinct input cap (#6191)", () => {
  for (const modelId of [
    "codex/gpt-5.5-xhigh",
    "codex/gpt-5.5-high",
    "codex/gpt-5.5-medium",
    "codex/gpt-5.5-low",
  ]) {
    const caps = modelCapabilities.getResolvedModelCapabilities(modelId);
    assert.equal(caps.contextWindow, 400000, modelId);
    assert.equal(caps.maxInputTokens, 272000, modelId);
  }
});

test("regression: a model without maxInputTokens still falls back to its context window", () => {
  // codex gpt-5.4 declares no maxInputTokens, so max_input_tokens must equal
  // the context window (the historical fallback) — no under-reporting.
  const caps = modelCapabilities.getResolvedModelCapabilities("codex/gpt-5.4");
  assert.ok((caps.contextWindow ?? 0) > 0, "gpt-5.4 should have a context window");
  assert.equal(
    caps.maxInputTokens,
    caps.contextWindow,
    "without an explicit input cap, max_input_tokens falls back to context_length"
  );
});
