import test from "node:test";
import assert from "node:assert/strict";

// Isolated unit coverage for the capacity-limit merge policy, independent of
// the /api/providers/[id]/models route. See
// src/app/api/providers/[id]/models/discovery/codex.ts::mergeCapacityLimitConservatively
// and the guard test in tests/unit/provider-models-route-codex.test.ts (#7012).
const codexDiscovery = await import(
  "../../src/app/api/providers/[id]/models/discovery/codex.ts"
);

function liveModel(overrides: Record<string, unknown>) {
  return {
    id: "gpt-5.6-sol",
    name: "GPT 5.6 Sol Live",
    owned_by: "codex" as const,
    apiFormat: "responses" as const,
    supportedEndpoints: ["responses"] as ["responses"],
    ...overrides,
  };
}

test("mergeCodexLiveModelsWithLocalCatalog: pinned (local) limit wins when it is SMALLER than live", () => {
  const merged = codexDiscovery.mergeCodexLiveModelsWithLocalCatalog(
    [liveModel({ inputTokenLimit: 999999, outputTokenLimit: 999999 })],
    [
      {
        id: "gpt-5.6-sol",
        name: "GPT 5.6 Sol",
        maxInputTokens: 372000,
        maxOutputTokens: 128000,
      },
    ]
  );
  const model = merged.find((m) => m.id === "gpt-5.6-sol");
  // Pinned (372000/128000) is smaller than live (999999/999999) — the smaller,
  // safer value must win so requests never overrun the account's real budget.
  assert.equal(model?.inputTokenLimit, 372000);
  assert.equal(model?.outputTokenLimit, 128000);
  // Non-capacity fields are unaffected — live still wins on those.
  assert.equal(model?.name, "GPT 5.6 Sol Live");
});

test("mergeCodexLiveModelsWithLocalCatalog: live limit wins when the pinned (local) value is LARGER", () => {
  const merged = codexDiscovery.mergeCodexLiveModelsWithLocalCatalog(
    [liveModel({ inputTokenLimit: 100000, outputTokenLimit: 50000 })],
    [
      {
        id: "gpt-5.6-sol",
        name: "GPT 5.6 Sol",
        maxInputTokens: 372000,
        maxOutputTokens: 128000,
      },
    ]
  );
  const model = merged.find((m) => m.id === "gpt-5.6-sol");
  // Live (100000/50000) is smaller than pinned (372000/128000) here — the
  // smaller live value must win, not the larger pinned contract.
  assert.equal(model?.inputTokenLimit, 100000);
  assert.equal(model?.outputTokenLimit, 50000);
});

test("mergeCodexLiveModelsWithLocalCatalog: uses whichever side has a value when only one side defines it", () => {
  const liveOnly = codexDiscovery.mergeCodexLiveModelsWithLocalCatalog(
    [liveModel({ inputTokenLimit: 200000 })],
    [{ id: "gpt-5.6-sol", name: "GPT 5.6 Sol" }]
  );
  assert.equal(liveOnly.find((m) => m.id === "gpt-5.6-sol")?.inputTokenLimit, 200000);

  const pinnedOnly = codexDiscovery.mergeCodexLiveModelsWithLocalCatalog(
    [liveModel({ inputTokenLimit: undefined })],
    [{ id: "gpt-5.6-sol", name: "GPT 5.6 Sol", maxInputTokens: 372000 }]
  );
  assert.equal(pinnedOnly.find((m) => m.id === "gpt-5.6-sol")?.inputTokenLimit, 372000);
});
