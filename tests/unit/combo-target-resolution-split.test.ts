import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Split guard for the #3501 god-file decomposition (PR 2): the target-resolution
// stage of handleComboChat (wildcard expansion → weighted step groups → known
// context overflow → strategy ordering → stickiness/eval/compat/context filters →
// task-aware reorder → prompt-cache affinity → pre-screen) was extracted verbatim
// into resolveComboTargetPipeline. These tests pin the leaf's own contract: the
// shape it hands back to the attempt loop, the pass-through ordering for the plain
// `priority` path, and the `earlyResponse` exit for a request that exceeds every
// target's known context window. The strategy-specific branches stay covered
// end-to-end by the combo-* consumer suites through combo.ts.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-target-resolution-"));
const ORIGINAL_DATA_DIR = process.env.DATA_DIR;
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const { saveModelsDevCapabilities, clearModelsDevCapabilities } =
  await import("../../src/lib/modelsDevSync.ts");
const { resolveComboTargetPipeline } =
  await import("../../open-sse/services/combo/targetResolution.ts");

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

const noopLog = { info() {}, warn() {}, error() {}, debug() {} } as never;

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

const deps = (overrides: Record<string, unknown> = {}): never =>
  ({
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: { id: "c1", name: "c1", models: ["openai/gpt-4o", "anthropic/claude-3"], config: {} },
    strategy: "priority",
    config: {},
    settings: null,
    allCombos: null,
    relayOptions: null,
    signal: null,
    apiKeyAllowedConnections: null,
    log: noopLog,
    resilienceSettings: { providerCooldown: { enabled: false } },
    isModelAvailable: undefined,
    handleSingleModelWithTimeout: async () => new Response("{}"),
    buildAutoCandidates: async () => [],
    ...overrides,
  }) as never;

test("exports resolveComboTargetPipeline", () => {
  assert.equal(typeof resolveComboTargetPipeline, "function");
});

test("priority strategy resolves combo models into orderedTargets in declared order", async () => {
  const result = await resolveComboTargetPipeline(deps());
  assert.ok(!("earlyResponse" in result), "expected a resolved pipeline, not an early response");
  if ("earlyResponse" in result) return;
  assert.deepEqual(
    result.orderedTargets.map((t) => t.modelStr),
    ["openai/gpt-4o", "anthropic/claude-3"]
  );
});

test("returns the derived values the attempt loop consumes", async () => {
  const result = await resolveComboTargetPipeline(deps());
  assert.ok(!("earlyResponse" in result));
  if ("earlyResponse" in result) return;
  assert.equal(typeof result.stickyWeightedLimit, "number");
  assert.equal(typeof result.getWeightedStepKeyForTarget, "function");
  assert.ok(result.preScreenMap instanceof Map);
  assert.equal(result.sticky.messageHash === null || typeof result.sticky.messageHash, "string");
  // Non-weighted strategies have no weighted step resolution, so the mapper is a
  // constant null — the sticky-weighted write-back in combo.ts is then skipped.
  assert.equal(result.getWeightedStepKeyForTarget(result.orderedTargets[0]), null);
});

test("an empty combo yields an empty target pool (combo.ts turns it into a 404)", async () => {
  const result = await resolveComboTargetPipeline(deps({ combo: { name: "empty", models: [] } }));
  assert.ok(!("earlyResponse" in result));
  if ("earlyResponse" in result) return;
  assert.deepEqual(result.orderedTargets, []);
});

test("request exceeding every known context window returns a 400 earlyResponse", async () => {
  saveModelsDevCapabilities({
    "unit-target-resolution": {
      tiny: capabilityEntry(8_000),
      small: capabilityEntry(16_000),
    },
  });

  const result = await resolveComboTargetPipeline(
    deps({
      combo: {
        id: "c2",
        name: "known-context-overflow",
        models: ["unit-target-resolution/tiny", "unit-target-resolution/small"],
        config: {},
      },
      body: { messages: [{ role: "user", content: "word ".repeat(200_000) }] },
    })
  );

  assert.ok("earlyResponse" in result, "expected a context-overflow early response");
  if (!("earlyResponse" in result)) return;
  assert.equal(result.earlyResponse.status, 400);
  const body = (await result.earlyResponse.json()) as {
    error?: { code?: string };
    diagnostics?: { terminalReason?: string; attempted?: number };
  };
  assert.equal(body.error?.code, "context_length_exceeded");
  assert.equal(body.diagnostics?.terminalReason, "context_length_exceeded");
  assert.equal(body.diagnostics?.attempted, 0);
});
