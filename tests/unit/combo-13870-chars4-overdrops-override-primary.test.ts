import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Repro for #13870: the combo context-fit compat filter (filterTargetsByRequestCompatibility)
// uses the chars/4 estimate (estimateTokens) as the sole ground truth for ranking targets.
// On a repetitive agent-session body, chars/4 overstates the real tokenizer count by ~3-4x
// (issue measured 276,792 estimated vs 74,679 real for the same body). A user-defined combo
// whose primary/fallback members carry manual model_context_overrides sized for the REAL
// window (250k) gets those overrides evaluated against the inflated estimate, fail the
// context check, and are demoted behind the emergency (899k catalog) member -- even though
// the real request would have fit the primary with 3x headroom.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-13870-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { filterTargetsByRequestCompatibility } = await import("../../open-sse/services/combo.ts");
const { estimateTokens } = await import("../../open-sse/services/contextManager.ts");
const { setModelContextOverride, removeModelContextOverride } =
  await import("../../src/lib/db/modelContextOverrides.ts");

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

const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

function target(modelStr: string) {
  return {
    kind: "model" as const,
    stepId: modelStr,
    executionKey: modelStr,
    modelStr,
    provider: modelStr.split("/")[0],
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  };
}

function capabilityEntry(limitContext: number | null) {
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
    limit_output: 65_536,
    interleaved_field: null,
  };
}

function repetitiveAgentBody() {
  const toolResultChunk =
    '{"tool_call_id":"call_abc123","role":"tool","content":"' +
    "line of repeated structured tool output ".repeat(160) +
    '"}';
  const messages = [];
  for (let i = 0; i < 400; i++) {
    messages.push({ role: i % 2 === 0 ? "assistant" : "tool", content: toolResultChunk });
  }
  const tools = Array.from({ length: 25 }, (_, i) => ({
    type: "function",
    function: { name: `tool_${i}`, description: "d".repeat(200), parameters: { type: "object" } },
  }));
  return { messages, tools, max_tokens: 32000 };
}

test("#13870: chars/4 overestimate demotes a real-fitting override primary behind the catalog emergency member", () => {
  saveModelsDevCapabilities({
    "unit-13870-primary": { model: capabilityEntry(null) },
    "unit-13870-fallback": { model: capabilityEntry(null) },
    "unit-13870-emergency": { model: capabilityEntry(899_153) },
    "unit-13870-small": { model: capabilityEntry(128_450) },
  });

  setModelContextOverride("unit-13870-primary", "model", 250_000);
  setModelContextOverride("unit-13870-fallback", "model", 250_000);

  try {
    const body = repetitiveAgentBody();

    const estimated = estimateTokens({ messages: body.messages, tools: body.tools });
    assert.ok(
      estimated > 250_000 - 32_000,
      `expected the chars/4 estimate to exceed the override window; got ${estimated}`
    );

    const targets = [
      target("unit-13870-primary/model"),
      target("unit-13870-fallback/model"),
      target("unit-13870-emergency/model"),
      target("unit-13870-small/model"),
    ];

    const out = filterTargetsByRequestCompatibility(targets, body, noopLog);

    assert.equal(
      out[0].modelStr,
      "unit-13870-primary/model",
      `expected the real-fitting override primary to stay first, but the inflated ` +
        `chars/4 estimate promoted "${out[0].modelStr}" ahead of it -- this is the ` +
        `"collapse to the emergency member" reported in #13870`
    );
  } finally {
    removeModelContextOverride("unit-13870-primary", "model");
    removeModelContextOverride("unit-13870-fallback", "model");
  }
});
