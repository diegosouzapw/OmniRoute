/**
 * Opt-in reasoning budget floor (`OMNIROUTE_REASONING_MIN_BUDGET`).
 *
 * - Env unset/invalid: budgets pass through verbatim — #9507 no-enlargement
 *   contract unchanged.
 * - Env set to floor F: budgets in [256, F) on thinking models are raised to
 *   min(F, model output cap). Probes (<256) stay verbatim (#6274). Budgets >= F
 *   unchanged. Non-thinking models unaffected.
 *
 * Uses the same modelsDev capability-seeding harness as
 * reasoning-token-buffer-6274.test.ts so capabilities resolve deterministically.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-min-budget-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const {
  resolveReasoningBufferedMaxTokens,
  REASONING_BUFFER_MIN_TRIGGER,
  REASONING_MIN_BUDGET_ENV,
} = await import("../../open-sse/services/reasoningTokenBuffer.ts");

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
  saveModelsDevCapabilities({
    zhipu: {
      "glm-5.2": capabilityEntry(200000, { reasoning: true, limit_output: 65536 }),
      "glm-5.2-output-cap-40000": capabilityEntry(200000, {
        reasoning: true,
        limit_output: 40000,
      }),
    },
    openai: {
      "gpt-5.4": capabilityEntry(200000, { reasoning: false, limit_output: 65536 }),
    },
  });
});

test.after(() => {
  clearModelsDevCapabilities();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

const THINKING = "zhipu/glm-5.2";
const ENV = REASONING_MIN_BUDGET_ENV;
function setEnv(v: string | undefined) {
  if (v === undefined) delete process.env[ENV];
  else process.env[ENV] = v;
}

test("env unset: 512 stays 512 (no enlargement without opt-in)", () => {
  setEnv(undefined);
  assert.equal(resolveReasoningBufferedMaxTokens(THINKING, 512), 512);
});

test("env=4096: 512 is raised to 4096", () => {
  setEnv("4096");
  assert.equal(resolveReasoningBufferedMaxTokens(THINKING, 512), 4096);
});

test("env=4096: boundary 4095 raised, 4096 unchanged, 8192 unchanged", () => {
  setEnv("4096");
  assert.equal(resolveReasoningBufferedMaxTokens(THINKING, 4095), 4096);
  assert.equal(resolveReasoningBufferedMaxTokens(THINKING, 4096), 4096);
  assert.equal(resolveReasoningBufferedMaxTokens(THINKING, 8192), 8192);
});

test("probes below REASONING_BUFFER_MIN_TRIGGER stay verbatim even with floor set", () => {
  setEnv("4096");
  assert.equal(resolveReasoningBufferedMaxTokens(THINKING, 1), 1);
  assert.equal(
    resolveReasoningBufferedMaxTokens(THINKING, REASONING_BUFFER_MIN_TRIGGER - 1),
    REASONING_BUFFER_MIN_TRIGGER - 1
  );
});

test("floor is clamped by the model output cap", () => {
  setEnv("50000");
  assert.equal(resolveReasoningBufferedMaxTokens("zhipu/glm-5.2-output-cap-40000", 512), 40000);
});

test("invalid env value is ignored (verbatim passthrough)", () => {
  setEnv("not-a-number");
  assert.equal(resolveReasoningBufferedMaxTokens(THINKING, 512), 512);
});

test("non-thinking model unaffected by floor (returns null = no adjustment)", () => {
  setEnv("4096");
  assert.equal(resolveReasoningBufferedMaxTokens("openai/gpt-5.4", 512), null);
});
