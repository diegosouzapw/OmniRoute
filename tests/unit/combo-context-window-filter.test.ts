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
const { filterTargetsByRequestCompatibility, getKnownContextOverflow, handleComboChat } =
  await import("../../open-sse/services/combo.ts");
const { setModelContextOverride, removeModelContextOverride } =
  await import("../../src/lib/db/modelContextOverrides.ts");

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

function capabilityEntryWithLimits(limitInput: number | null, limitContext: number | null, limitOutput = 4096) {
  return {
    ...capabilityEntry(limitContext),
    limit_input: limitInput,
    limit_output: limitOutput,
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

// Build a body whose input estimates to roughly `tokens` tokens. estimateTokens
// is `ceil(charCount / 4)` over the JSON-serialized payload, so a run of
// `tokens * 4` characters lands the estimate near `tokens` (the wrapper is
// negligible at this scale).
function bigContextBody(tokens: number) {
  return {
    messages: [{ role: "user", content: "x".repeat(tokens * 4) }],
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

test("known context overflow reports the largest target limit", () => {
  saveModelsDevCapabilities({
    "unit-known-context": {
      tiny: capabilityEntry(8_000),
      small: capabilityEntry(16_000),
    },
  });

  const overflow = getKnownContextOverflow(
    [target("unit-known-context/tiny"), target("unit-known-context/small")],
    largeContextBody()
  );

  assert.ok(overflow);
  assert.ok(overflow.requiredContextTokens > overflow.maxKnownContextTokens);
  assert.equal(overflow.maxKnownContextTokens, 16_000);
  assert.equal(overflow.targetCount, 2);
});

test("#7177 an empty messages array is not counted as real content at an exact-boundary limit", () => {
  // Regression: some combo entrypoints default a caller-omitted `messages` to `[]`. The
  // estimator used to JSON.stringify whatever keys were merely *present* on the body,
  // so an empty array still contributed a few phantom "structural" tokens (JSON braces/
  // brackets), which was enough to trip a false-positive overflow when max_tokens exactly
  // equals the target's context window (a common config where limit_input === limit_output
  // === limit_context) even though there is no real input to account for.
  saveModelsDevCapabilities({
    "unit-known-context": {
      exact: capabilityEntry(4_096),
    },
  });

  const overflow = getKnownContextOverflow([target("unit-known-context/exact")], {
    messages: [],
    max_tokens: 4_096,
  });

  assert.equal(overflow, null);
});

test("unknown context metadata keeps overflow detection fail-open", () => {
  saveModelsDevCapabilities({
    "unit-known-context": {
      tiny: capabilityEntry(8_000),
    },
  });

  const overflow = getKnownContextOverflow(
    [target("unit-known-context/tiny"), target("unit-unknown-context/mystery")],
    largeContextBody()
  );

  assert.equal(overflow, null);
});

test("combo rejects a known oversized request before upstream dispatch", async () => {
  saveModelsDevCapabilities({
    "unit-known-context": {
      tiny: capabilityEntry(8_000),
      small: capabilityEntry(16_000),
    },
  });
  let dispatches = 0;

  const response = await handleComboChat({
    body: largeContextBody(),
    combo: {
      name: "known-context-overflow",
      strategy: "priority",
      models: ["unit-known-context/tiny", "unit-known-context/small"],
    },
    handleSingleModel: async () => {
      dispatches += 1;
      return new Response("unexpected", { status: 200 });
    },
    log: noopLog,
  });

  assert.equal(response.status, 400);
  assert.equal(dispatches, 0);
  const body = await response.json();
  assert.equal(body.error.code, "context_length_exceeded");
  assert.equal(body.diagnostics.terminalReason, "context_length_exceeded");
  assert.equal(body.diagnostics.attempted, 0);
});

test("input-only maxInputTokens is not double-counted against the output reserve (#7039)", () => {
  // Faithful reproduction of #7039 (Codex gpt-5.5-xhigh):
  //   maxInputTokens = 272_000, contextWindow = 400_000, maxOutputTokens = 128_000
  // With max_tokens = 32_000 the OLD code required
  //   maxInputTokens >= estimatedInputTokens + 32_000
  // i.e. it allowed only ~240K of input against a real 272K input cap — the
  // output reserve was double-counted against an already input-only cap. Here
  // the input (~256K tokens) sits between the buggy allowance (240K) and the
  // real cap (272K): the fix keeps the target, the bug drops it.
  saveModelsDevCapabilities({
    "unit-7039": {
      "codex-like": capabilityEntryWithLimits(272_000, 400_000, 128_000),
      huge: capabilityEntryWithLimits(1_000_000, 1_000_000, 500_000),
    },
  });

  const out = filterTargetsByRequestCompatibility(
    [target("unit-7039/codex-like"), target("unit-7039/huge")],
    { ...bigContextBody(256_000), max_tokens: 32_000 },
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-7039/codex-like", "unit-7039/huge"]
  );
});

test("small input-only maxInputTokens keeps a target whose input fits even though output reserve would overflow the cap (#7039)", () => {
  // A second, lightweight reproduction: with maxInputTokens = 100 the input-only
  // cap comfortably holds the ~11-token input, but the old code compared it
  // against input + output (~411) and rejected the target. The fix keeps it.
  saveModelsDevCapabilities({
    "unit-7039-small": {
      "input-capped": capabilityEntryWithLimits(100, 1_000_000, 500),
      huge: capabilityEntryWithLimits(1_000_000, 1_000_000, 500_000),
    },
  });

  const out = filterTargetsByRequestCompatibility(
    [target("unit-7039-small/input-capped"), target("unit-7039-small/huge")],
    { messages: [{ role: "user", content: "hello" }], max_tokens: 400 },
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-7039-small/input-capped", "unit-7039-small/huge"]
  );
});

test("input-only maxInputTokens still rejects when the input itself exceeds the cap", () => {
  // The fix must not let a genuinely-too-small input cap pass. `too-small` has
  // maxInputTokens = 1, which cannot even hold the ~11-token input, so it must
  // still be dropped while the compatible target survives.
  saveModelsDevCapabilities({
    "unit-7039-too-small": {
      "too-small": capabilityEntryWithLimits(1, 1_000_000, 500),
      huge: capabilityEntryWithLimits(1_000_000, 1_000_000, 500_000),
    },
  });

  const out = filterTargetsByRequestCompatibility(
    [target("unit-7039-too-small/too-small"), target("unit-7039-too-small/huge")],
    { messages: [{ role: "user", content: "hello" }], max_tokens: 400 },
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-7039-too-small/huge"]
  );
});

test("maxInputTokens defaulting to contextWindow still rejects when input + output exceeds the total window (#7039 follow-up)", () => {
  // Shared-window model where maxInputTokens equals the total window size.
  // The input alone fits the input cap, but input + output overflows the
  // window, so the target must be rejected instead of passing on the input cap.
  saveModelsDevCapabilities({
    "unit-7039-window": {
      "shared-window": capabilityEntryWithLimits(400_000, 400_000, 200_000),
      huge: capabilityEntryWithLimits(1_000_000, 1_000_000, 500_000),
    },
  });

  const out = filterTargetsByRequestCompatibility(
    [target("unit-7039-window/shared-window"), target("unit-7039-window/huge")],
    { messages: [{ role: "user", content: "x".repeat(350_000 * 4) }], max_tokens: 100_000 },
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-7039-window/huge"]
  );
});

// A persisted model_context_override (Feature 5004 — operator-set or
// auto-discovered) reflects a target's real usable window and must win over the
// static catalog limit for server-side routing. Otherwise a provider whose
// catalog `maxInputTokens` is a deliberately smaller client-facing hint (set
// below the true window so coding agents auto-compact, #6191) gets wrongly
// dropped for large-context requests, collapsing the fallback pool.
test("model_context_override lets a small-catalog target survive a large-context request", () => {
  saveModelsDevCapabilities({
    "unit-override": {
      big: capabilityEntry(1_000_000),
      capped: capabilityEntry(8_000),
    },
  });
  setModelContextOverride("unit-override", "capped", 1_000_000);
  try {
    const out = filterTargetsByRequestCompatibility(
      [target("unit-override/capped"), target("unit-override/big")],
      largeContextBody(),
      noopLog
    );
    assert.deepEqual(
      out.map((entry) => entry.modelStr).sort(),
      ["unit-override/big", "unit-override/capped"]
    );
  } finally {
    removeModelContextOverride("unit-override", "capped");
  }
});

test("without an override the small-catalog target is still dropped for the large request", () => {
  saveModelsDevCapabilities({
    "unit-override": {
      big: capabilityEntry(1_000_000),
      capped: capabilityEntry(8_000),
    },
  });
  // No override: capped (8K) is genuinely too small and must be filtered out,
  // guarding the override read-path from masking a real too-small target.
  const out = filterTargetsByRequestCompatibility(
    [target("unit-override/capped"), target("unit-override/big")],
    largeContextBody(),
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-override/big"]
  );
});
