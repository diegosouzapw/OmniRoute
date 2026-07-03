import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression tests for the context-aware combo compatibility filter.
// Unknown context metadata is only safe as a fallback. Once the context filter
// has rejected known-too-small targets and a known-capacity target remains,
// unknown-context targets must not survive over it.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-context-filter-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { filterTargetsByRequestCompatibility } = await import("../../open-sse/services/combo.ts");

test.after(() => {
  core.resetDbInstance();
  if (ORIGINAL_DATA_DIR === undefined) {
    delete process.env.DATA_DIR;
  } else {
    process.env.DATA_DIR = ORIGINAL_DATA_DIR;
  }
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test.beforeEach(() => {
  clearModelsDevCapabilities();
});

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

function largeContextBody() {
  return {
    messages: [{ role: "user", content: "x".repeat(80_000) }],
  };
}

const noopLog = { info() {}, warn() {}, error() {}, debug() {} };

test("known compatible context target wins over unknown-context targets", () => {
  saveModelsDevCapabilities({
    "unit-known-context": {
      tiny: capabilityEntry(8_000),
      million: capabilityEntry(1_000_000),
    },
  });

  const out = filterTargetsByRequestCompatibility(
    [
      target("unit-unknown-context/mystery-a"),
      target("unit-known-context/tiny"),
      target("unit-known-context/million"),
      target("unit-unknown-context/mystery-b"),
    ],
    largeContextBody(),
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-known-context/million"]
  );
});

test("unknown-context targets keep strategy order when no known limit was rejected", () => {
  saveModelsDevCapabilities({
    "unit-known-context": {
      million: capabilityEntry(1_000_000),
    },
  });

  const out = filterTargetsByRequestCompatibility(
    [target("unit-unknown-context/mystery-a"), target("unit-known-context/million")],
    { messages: [{ role: "user", content: "hello" }] },
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-unknown-context/mystery-a", "unit-known-context/million"]
  );
});

test("unknown-context targets do not become the only survivors when no known-compatible context target exists", () => {
  saveModelsDevCapabilities({
    "unit-known-context": {
      tiny: capabilityEntry(8_000),
    },
  });

  const out = filterTargetsByRequestCompatibility(
    [
      target("unit-unknown-context/mystery-a"),
      target("unit-known-context/tiny"),
      target("unit-unknown-context/mystery-b"),
    ],
    largeContextBody(),
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-unknown-context/mystery-a", "unit-known-context/tiny", "unit-unknown-context/mystery-b"]
  );
});

test("all known-too-small context targets still fall back to strategy order", () => {
  saveModelsDevCapabilities({
    "unit-known-context": {
      tiny: capabilityEntry(8_000),
      small: capabilityEntry(16_000),
    },
  });

  const out = filterTargetsByRequestCompatibility(
    [target("unit-known-context/tiny"), target("unit-known-context/small")],
    largeContextBody(),
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-known-context/tiny", "unit-known-context/small"]
  );
});
