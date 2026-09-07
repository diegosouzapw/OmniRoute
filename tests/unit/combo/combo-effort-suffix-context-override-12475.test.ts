import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// #12475: effort-suffixed combo targets must inherit the base model's
// model_context_overrides row. Without that, the compat filter falls back to
// the static catalog and inverts priority order (Diego confirmed the
// chokepoint is resolveContextOverrideVerdict).

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-12475-effort-override-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { setModelContextOverride, removeModelContextOverride } =
  await import("../../../src/lib/db/modelContextOverrides.ts");
const { evaluateContextLimit } =
  await import("../../../open-sse/services/combo/contextOverrideGate.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../../src/lib/modelsDevSync.ts");
const { filterTargetsByRequestCompatibility } = await import("../../../open-sse/services/combo.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  clearModelsDevCapabilities();
});

const LARGE_REQ = {
  estimatedInputTokens: 300_000,
  requiredContextTokens: 348_000,
};

function capabilityEntry(limitContext: number) {
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
  };
}

function target(modelStr: string) {
  return {
    kind: "model" as const,
    stepId: modelStr,
    executionKey: modelStr,
    modelStr,
    provider: modelStr.includes("/") ? modelStr.split("/")[0] : modelStr,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

function bigContextBody(tokens: number) {
  return {
    messages: [{ role: "user", content: "x".repeat(tokens * 4) }],
  };
}

const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

test("#12475 GLM-5.3-high inherits the GLM-5.3 override (catalog 200k would reject)", () => {
  setModelContextOverride("unit-12475", "GLM-5.3", 385_351);
  try {
    const verdict = evaluateContextLimit(
      { maxInputTokens: 200_000, contextWindow: 200_000 },
      LARGE_REQ,
      "unit-12475/GLM-5.3-high"
    );
    assert.equal(verdict, true, "base override 385351 must fit 348k after stripping -high");
  } finally {
    removeModelContextOverride("unit-12475", "GLM-5.3");
  }
});

test("#12475 GLM-5.2-high spec 1M must not shadow the GLM-5.2 override", () => {
  setModelContextOverride("unit-12475", "GLM-5.2", 128_450);
  try {
    const verdict = evaluateContextLimit(
      { maxInputTokens: 1_000_000, contextWindow: 1_000_000 },
      LARGE_REQ,
      "unit-12475/GLM-5.2-high"
    );
    assert.equal(verdict, false, "base override 128450 must reject 348k even when spec says 1M");
  } finally {
    removeModelContextOverride("unit-12475", "GLM-5.2");
  }
});

test("#12475 exact variant override still wins over the base row", () => {
  setModelContextOverride("unit-12475", "GLM-5.3", 385_351);
  setModelContextOverride("unit-12475", "GLM-5.3-high", 10_000);
  try {
    const verdict = evaluateContextLimit(
      { maxInputTokens: 200_000, contextWindow: 200_000 },
      LARGE_REQ,
      "unit-12475/GLM-5.3-high"
    );
    assert.equal(verdict, false, "an explicit GLM-5.3-high row must not inherit the larger base");
  } finally {
    removeModelContextOverride("unit-12475", "GLM-5.3-high");
    removeModelContextOverride("unit-12475", "GLM-5.3");
  }
});

test("#12475 xhigh / mixed-case suffix also inherit", () => {
  setModelContextOverride("unit-12475", "GLM-5.3-Flash", 899_153);
  try {
    const verdict = evaluateContextLimit(
      { maxInputTokens: 200_000, contextWindow: 200_000 },
      LARGE_REQ,
      "unit-12475/GLM-5.3-Flash-xhigh"
    );
    assert.equal(verdict, true, "GLM-5.3-Flash-xhigh must inherit GLM-5.3-Flash");
  } finally {
    removeModelContextOverride("unit-12475", "GLM-5.3-Flash");
  }
});

test("#12475 filter prefers the larger-window effort variant, not the spec-inflated one", () => {
  saveModelsDevCapabilities({
    "unit-12475": {
      "GLM-5.3-high": capabilityEntry(200_000),
      "GLM-5.2-high": capabilityEntry(1_000_000),
    },
  });
  setModelContextOverride("unit-12475", "GLM-5.3", 1_000_000);
  setModelContextOverride("unit-12475", "GLM-5.2", 128_000);
  try {
    const out = filterTargetsByRequestCompatibility(
      [target("unit-12475/GLM-5.2-high"), target("unit-12475/GLM-5.3-high")],
      bigContextBody(300_000),
      noopLog
    );
    assert.equal(out[0]?.modelStr, "unit-12475/GLM-5.3-high");
    assert.equal(out[1]?.modelStr, "unit-12475/GLM-5.2-high");
  } finally {
    removeModelContextOverride("unit-12475", "GLM-5.3");
    removeModelContextOverride("unit-12475", "GLM-5.2");
  }
});
