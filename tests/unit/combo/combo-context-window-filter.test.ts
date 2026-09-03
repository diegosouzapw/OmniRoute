import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Regression tests for the context-aware combo compatibility filter.
// Context metadata is advisory: known-fitting targets are preferred, while
// unknown and catalog-too-small targets remain available for runtime fallback.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-context-filter-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../../src/lib/modelsDevSync.ts");
const { filterTargetsByRequestCompatibility, handleComboChat } =
  await import("../../../open-sse/services/combo.ts");
const { setModelContextOverride, removeModelContextOverride } =
  await import("../../../src/lib/db/modelContextOverrides.ts");

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

function capabilityEntryWithLimits(
  limitInput: number | null,
  limitContext: number | null,
  limitOutput = 4096
) {
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

test("known compatible context target is preferred while unknown targets remain fallback", () => {
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
    [
      "unit-known-context/million",
      "unit-unknown-context/mystery-a",
      "unit-known-context/tiny",
      "unit-unknown-context/mystery-b",
    ]
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

test("output-token limits remain a hard compatibility requirement", () => {
  saveModelsDevCapabilities({
    "unit-output-limit": {
      insufficient: capabilityEntryWithLimits(128_000, 128_000, 128),
      sufficient: capabilityEntryWithLimits(128_000, 128_000, 4_096),
    },
  });

  const out = filterTargetsByRequestCompatibility(
    [target("unit-output-limit/insufficient"), target("unit-output-limit/sufficient")],
    { messages: [{ role: "user", content: "hello" }], max_tokens: 512 },
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-output-limit/sufficient"]
  );
});

test("combo dispatches requests that only an approximate estimate marks oversized", async () => {
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
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
    log: noopLog,
  });

  assert.equal(response.status, 200);
  assert.equal(dispatches, 1);
});

test("round-robin dispatches requests that only an approximate estimate marks oversized", async () => {
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
      name: "known-context-overflow-round-robin",
      strategy: "round-robin",
      models: ["unit-known-context/tiny", "unit-known-context/small"],
    },
    handleSingleModel: async () => {
      dispatches += 1;
      return new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
    log: noopLog,
  });

  assert.equal(response.status, 200);
  assert.equal(dispatches, 1);
});

test("native Responses context reaches an all-Codex target beyond its catalog hint (#8932)", async () => {
  saveModelsDevCapabilities({
    codex: {
      large: capabilityEntry(272_000),
    },
  });
  let dispatches = 0;

  const response = await handleComboChat({
    body: bigContextBody(275_000),
    combo: {
      name: "native-codex-overflow",
      strategy: "priority",
      models: ["codex/large"],
    },
    clientManagedResponsesContext: true,
    isModelAvailable: async () => true,
    handleSingleModel: async () => {
      dispatches += 1;
      return new Response("ok", { status: 200 });
    },
    log: noopLog,
  });

  assert.notEqual(response.status, 400);
  assert.equal(dispatches, 1);
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

test("input-only maxInputTokens is demoted when the input itself exceeds the cap", () => {
  // #8944 made context metadata ADVISORY: a catalog-too-small target is no longer
  // removed (a stale catalog entry must never delete the only target that could
  // accept the request at runtime), it is ordered AFTER the known-fitting ones.
  // `too-small` has maxInputTokens = 1, which cannot hold the ~11-token input, so
  // it must lose the ordering to `huge` while remaining available as a fallback.
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
    ["unit-7039-too-small/huge", "unit-7039-too-small/too-small"]
  );
});

test("maxInputTokens defaulting to contextWindow is demoted when input + output exceeds the total window (#7039 follow-up)", () => {
  // Shared-window model where maxInputTokens equals the total window size. The
  // input alone fits the input cap but input + output overflows the window, so the
  // target must not be PREFERRED — since #8944 it is demoted rather than dropped.
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
    ["unit-7039-window/huge", "unit-7039-window/shared-window"]
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
    assert.deepEqual(out.map((entry) => entry.modelStr).sort(), [
      "unit-override/big",
      "unit-override/capped",
    ]);
  } finally {
    removeModelContextOverride("unit-override", "capped");
  }
});

// #8944: "dropped" became "demoted" — the small-catalog target survives as a
// runtime fallback but must never outrank the one whose known limit fits.
test("without an override the small-catalog target is ordered last for the large request", () => {
  saveModelsDevCapabilities({
    "unit-override": {
      big: capabilityEntry(1_000_000),
      capped: capabilityEntry(8_000),
    },
  });
  // No override: capped (8K) is catalog-too-small, so it stays behind the
  // known-compatible target while remaining available as a runtime fallback.
  const out = filterTargetsByRequestCompatibility(
    [target("unit-override/capped"), target("unit-override/big")],
    largeContextBody(),
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-override/big", "unit-override/capped"]
  );
});

// #12273: real Claude Code requests always carry `tools`, and the auto/coding
// pool mixes coding-capable providers with providers whose catalog marks
// toolCalling=false. Those non-coding targets are HARD-rejected (tools), so the
// compat filter can collapse the whole pool to a single too-small-context
// coding model (e.g. mimo-v2.5-free at 200k) for a much larger request — the
// larger-context model was never assembled into the candidate pool. Routing to
// that sole survivor is a guaranteed context_length_exceeded, so the filter
// must fall back to the full pool instead of silently pinning the request.
test("#12273 single known-too-small survivor falls back to the full pool", () => {
  saveModelsDevCapabilities({
    "unit-collapse": {
      small: capabilityEntry(200_000),
    },
    "unit-noncoding": {
      nocoder: { ...capabilityEntry(1_000_000), tool_call: false },
    },
  });
  const body = {
    ...bigContextBody(300_000),
    tools: [{ type: "function" }], // Claude Code always sends tools
  };

  const out = filterTargetsByRequestCompatibility(
    [target("unit-collapse/small"), target("unit-noncoding/nocoder")],
    body,
    noopLog
  );

  // nocoder is hard-rejected (toolCalling=false); small (200k) is the only
  // compatible survivor but is known to be too small for a 300k request, so the
  // filter returns the full pool rather than dispatch to a guaranteed failure.
  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-collapse/small", "unit-noncoding/nocoder"]
  );
});

// Guard against regression: when the single survivor's window DOES fit the
// request, the filter still collapses (existing behavior preserved).
test("#12273 single compatible target that fits is still collapsed", () => {
  saveModelsDevCapabilities({
    "unit-collapse": {
      big: capabilityEntry(1_000_000),
    },
    "unit-noncoding": {
      nocoder: { ...capabilityEntry(1_000_000), tool_call: false },
    },
  });
  const body = {
    ...bigContextBody(300_000),
    tools: [{ type: "function" }],
  };

  const out = filterTargetsByRequestCompatibility(
    [target("unit-collapse/big"), target("unit-noncoding/nocoder")],
    body,
    noopLog
  );

  // big (1M) fits the 300k request, so the collapse is legitimate.
  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-collapse/big"]
  );
});

// #12278: unknown context is advisory, not "known too small". Collapsing to a
// single survivor whose context limit is unknown must NOT restore hard-rejected
// targets (output_tokens here; vision is covered by combo-vision-aware-routing).
test("#12273 unknown-context sole survivor does not restore hard-rejected targets", () => {
  saveModelsDevCapabilities({
    "unit-output": {
      tiny: capabilityEntryWithLimits(128_000, 128_000, 4096),
    },
  });
  const body = {
    messages: [{ role: "user", content: "hello" }],
    max_tokens: 32_000,
  };

  const out = filterTargetsByRequestCompatibility(
    [target("unit-unknown/mystery"), target("unit-output/tiny")],
    body,
    noopLog
  );

  assert.deepEqual(
    out.map((entry) => entry.modelStr),
    ["unit-unknown/mystery"]
  );
});
