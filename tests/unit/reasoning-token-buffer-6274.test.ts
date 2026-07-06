/**
 * #6274 — the reasoning-token buffer must not inflate probe-sized max_tokens.
 *
 * Claude Code's `/model` capability check sends `max_tokens: 1`; for a thinking-
 * capable model with a large output cap (e.g. glm-5.2) the #3587 headroom heuristic
 * (`max(current + 1000, ceil(current * 1.5))`) rewrote it to 1001 and forwarded that
 * upstream. A tiny explicit budget below REASONING_BUFFER_MIN_TRIGGER (256) is a
 * probe and must pass through verbatim; genuine budgets keep the #3587 headroom.
 *
 * Kept standalone against the pure `resolveReasoningBufferedMaxTokens` rather than
 * extending the frozen `combo-routing-engine.test.ts` god-file.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-reasoning-buffer-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } = await import(
  "../../src/lib/modelsDevSync.ts"
);
const { resolveReasoningBufferedMaxTokens, REASONING_BUFFER_MIN_TRIGGER } = await import(
  "../../open-sse/services/reasoningTokenBuffer.ts"
);

function capabilityEntry(limitContext: unknown, overrides: Record<string, unknown> = {}) {
  return {
    tool_call: true,
    reasoning: false,
    attachment: false,
    structured_output: true,
    temperature: true,
    modalities_input: JSON.stringify(["text"]),
    modalities_output: JSON.stringify(["text"]),
    knowledge_cutoff: null,
    release_date: null,
    last_updated: null,
    status: null,
    family: null,
    open_weights: false,
    limit_context: limitContext,
    limit_input: limitContext,
    limit_output: 4096,
    interleaved_field: null,
    ...overrides,
  };
}

test.before(() => {
  // A thinking-capable model with a large output cap: the #3587 guards all pass.
  saveModelsDevCapabilities({
    zhipu: {
      "glm-5.2": capabilityEntry(200000, { reasoning: true, limit_output: 65536 }),
    },
  });
});

test.after(() => {
  clearModelsDevCapabilities();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#6274 reasoning buffer does not inflate probe-sized max_tokens", () => {
  // The Claude-Code `/model` probe (max_tokens: 1) must pass through (was 1001).
  assert.equal(
    resolveReasoningBufferedMaxTokens("zhipu/glm-5.2", 1),
    1,
    "probe-sized max_tokens=1 must not be inflated"
  );
  // Just below the trigger threshold is still treated as a probe.
  assert.equal(
    resolveReasoningBufferedMaxTokens("zhipu/glm-5.2", REASONING_BUFFER_MIN_TRIGGER - 1),
    REASONING_BUFFER_MIN_TRIGGER - 1,
    "budgets below REASONING_BUFFER_MIN_TRIGGER are respected verbatim"
  );
  // At the threshold, headroom resumes: max(256 + 1000, ceil(256 * 1.5)) = 1256.
  assert.equal(
    resolveReasoningBufferedMaxTokens("zhipu/glm-5.2", REASONING_BUFFER_MIN_TRIGGER),
    1256,
    "budgets at the threshold receive reasoning headroom"
  );
  // A realistic reasoning budget still gets buffered: max(32000 + 1000, 48000) = 48000.
  assert.equal(
    resolveReasoningBufferedMaxTokens("zhipu/glm-5.2", 32000),
    48000,
    "genuine reasoning budgets keep the #3587 headroom"
  );
});
