import { test, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  REASONING_EFFORT_ORDER,
  parseReasoningEffortEnum,
  recordLearnedReasoningEffort,
  getLearnedReasoningEffort,
  __test_resetLearnedReasoningEffortCaps,
} from "../../../open-sse/services/learnedReasoningEffortCaps.ts";

beforeEach(() => {
  __test_resetLearnedReasoningEffortCaps();
});

after(() => {
  __test_resetLearnedReasoningEffortCaps();
});

// ── REASONING_EFFORT_ORDER ──────────────────────────────────────────────────

test("REASONING_EFFORT_ORDER is none < minimal < low < medium < high < xhigh < max < ultra", () => {
  assert.deepEqual(REASONING_EFFORT_ORDER, [
    "none",
    "minimal",
    "low",
    "medium",
    "high",
    "xhigh",
    "max",
    "ultra",
  ]);
});

test("REASONING_EFFORT_ORDER ends with ultra", () => {
  assert.equal(REASONING_EFFORT_ORDER.at(-1), "ultra");
});
test("parseReasoningEffortEnum extracts please use low, high, or max", () => {
  const err =
    "This model always engages in thinking and cannot be disabled; please use low, high, or max";
  assert.deepEqual(parseReasoningEffortEnum(err), ["low", "high", "max"]);
});
test("parseReasoningEffortEnum extracts please use with ultra", () => {
  assert.deepEqual(parseReasoningEffortEnum("please use low, high, max, ultra"), [
    "low",
    "high",
    "max",
    "ultra",
  ]);
});

// ── parseReasoningEffortEnum ────────────────────────────────────────────────

test("parseReasoningEffortEnum extracts the real OVH 422 enum (backtick-quoted)", () => {
  const err =
    "Failed to deserialize the JSON body into the target type: reasoning_effort: " +
    "unknown variant `xhigh`, expected one of `none`, `high`, `medium`, `low`, `minimal`";
  assert.deepEqual(parseReasoningEffortEnum(err), ["none", "high", "medium", "low", "minimal"]);
});

test("parseReasoningEffortEnum extracts a bare comma/and-joined enum with annotations", () => {
  const err =
    "Unexpected reasoning effort high. Supported types are xhigh (default), medium, and low.";
  assert.deepEqual(parseReasoningEffortEnum(err), ["xhigh", "medium", "low"]);
});

test("parseReasoningEffortEnum drops unrecognized tokens", () => {
  const err = "expected one of `none`, `turbo`, `high`";
  assert.deepEqual(parseReasoningEffortEnum(err), ["none", "high"]);
});

test("parseReasoningEffortEnum returns null for unrelated error text", () => {
  assert.equal(parseReasoningEffortEnum("connection refused"), null);
  assert.equal(parseReasoningEffortEnum(""), null);
  assert.equal(parseReasoningEffortEnum(null), null);
  assert.equal(parseReasoningEffortEnum(undefined), null);
});

test("parseReasoningEffortEnum returns null when the list has no recognized token", () => {
  assert.equal(parseReasoningEffortEnum("expected one of `foo`, `bar`"), null);
});

// ── recordLearnedReasoningEffort / getLearnedReasoningEffort ───────────────

test("records the highest recognized value from the accepted list", () => {
  const learned = recordLearnedReasoningEffort("ovh", "qwen3-coder-30b-a3b-instruct", [
    "none",
    "high",
    "medium",
    "low",
    "minimal",
  ]) as unknown as Set<string>;
  assert.ok(learned instanceof Set);
  assert.ok(learned.has("high"));
  assert.equal(
    (
      getLearnedReasoningEffort("ovh", "qwen3-coder-30b-a3b-instruct") as unknown as Set<string>
    ).has("high"),
    true
  );
});

test("returns null and stores nothing when acceptedValues has no recognized token", () => {
  const learned = recordLearnedReasoningEffort("acme", "model-x", ["foo", "bar"]);
  assert.equal(learned, null);
  assert.equal(getLearnedReasoningEffort("acme", "model-x"), null);
});

test("monotonic decrease: a later, higher accepted-list never ratchets the cap back up", () => {
  recordLearnedReasoningEffort("acme", "model-x", ["none", "low", "medium"]);
  const learned = recordLearnedReasoningEffort("acme", "model-x", [
    "none",
    "low",
    "medium",
    "high",
    "xhigh",
  ]) as unknown as Set<string>;
  assert.equal(learned.size, 3);
  assert.ok(learned.has("medium"));
  assert.equal((getLearnedReasoningEffort("acme", "model-x") as unknown as Set<string>).size, 3);
});

test("a later, lower accepted-list does ratchet the cap down", () => {
  recordLearnedReasoningEffort("acme", "model-x", ["none", "low", "medium", "high"]);
  const learned = recordLearnedReasoningEffort("acme", "model-x", [
    "none",
    "low",
  ]) as unknown as Set<string>;
  assert.equal(learned.size, 2);
  assert.ok(learned.has("low"));
  assert.equal((getLearnedReasoningEffort("acme", "model-x") as unknown as Set<string>).size, 2);
});

// #11295: nearest-tier semantics (smallest accepted >= demand) — unified with
// the declared/static clamp. Was downgrade-only (greatest accepted <= demand,
// medium→low) before #11295.
test("clampToLearned medium→high when accepted is low,high,max (nearest-tier, #11295)", async () => {
  const { clampToLearned } = await import("../../../open-sse/services/learnedReasoningEffortCaps.ts");
  assert.equal(clampToLearned("medium", new Set(["low", "high", "max"])), "high");
});
// #11295: xhigh(rank 5) has no accepted tier >= it among {low,high,max}
// (max=6 IS >= 5, so nearest-tier picks max) — was downgrade-only high before.
test("clampToLearned xhigh→max when accepted is low,high,max (nearest-tier, #11295)", async () => {
  const { clampToLearned } = await import("../../../open-sse/services/learnedReasoningEffortCaps.ts");
  assert.equal(clampToLearned("xhigh", new Set(["low", "high", "max"])), "max");
});
test("clampToLearned ultra→max when accepted is low,high,max", async () => {
  const { clampToLearned } = await import("../../../open-sse/services/learnedReasoningEffortCaps.ts");
  assert.equal(clampToLearned("ultra", new Set(["low", "high", "max"])), "max");
});
test("clampToLearned ultra→medium when accepted is low,medium", async () => {
  const { clampToLearned } = await import("../../../open-sse/services/learnedReasoningEffortCaps.ts");
  assert.equal(clampToLearned("ultra", new Set(["low", "medium"])), "medium");
});
test("clampToLearned high→medium when accepted is low,medium", async () => {
  const { clampToLearned } = await import("../../../open-sse/services/learnedReasoningEffortCaps.ts");
  assert.equal(clampToLearned("high", new Set(["low", "medium"])), "medium");
});
test("clampToLearned returns null when already accepted", async () => {
  const { clampToLearned } = await import("../../../open-sse/services/learnedReasoningEffortCaps.ts");
  assert.equal(clampToLearned("low", new Set(["low", "high", "max"])), null);
});
// #11295: a sub-floor demand (below every accepted value) now maps to the
// accepted floor instead of returning null. Pre-#11295 this returned null —
// no clamp — so the too-low value passed straight through to the upstream,
// which 400'd again on every subsequent request without ever learning a
// lower floor.
test("clampToLearned maps sub-floor demand to the accepted floor instead of null (#11295)", async () => {
  const { clampToLearned } = await import("../../../open-sse/services/learnedReasoningEffortCaps.ts");
  assert.equal(clampToLearned("low", new Set(["high", "max"])), "high");
});
test("clampToLearned returns null for turbo (not in ORDER)", async () => {
  const { clampToLearned } = await import("../../../open-sse/services/learnedReasoningEffortCaps.ts");
  assert.equal(clampToLearned("turbo", new Set(["low", "high", "max"])), null);
});
// #11295: none is below the learned floor {low,high,max} — nearest-tier maps
// it to the floor (low) instead of returning null (no clamp, upstream 400s
// again with no chance to ever learn a lower floor).
test("clampToLearned maps none to the floor (low) when accepted is low,high,max (#11295)", async () => {
  const { clampToLearned } = await import("../../../open-sse/services/learnedReasoningEffortCaps.ts");
  assert.equal(clampToLearned("none", new Set(["low", "high", "max"])), "low");
});
test("recordLearned stores Set and getLearned returns Set", () => {
  const s = recordLearnedReasoningEffort("acme", "m1", ["low", "high", "max"]);
  assert.ok(s instanceof Set);
  assert.deepEqual([...(s as unknown as Set<string>)].sort(), ["high", "low", "max"]);
  const g = getLearnedReasoningEffort("acme", "m1");
  assert.ok(g instanceof Set);
});
test("monotonicity incomparable: keep existing when neither subset", () => {
  recordLearnedReasoningEffort("acme", "m4", ["low", "high", "max"]);
  const s4 = recordLearnedReasoningEffort("acme", "m4", ["low", "medium"]);
  assert.equal((s4 as unknown as Set<string>).size, 3);
  assert.ok((s4 as unknown as Set<string>).has("high"));
});
test("getLearnedReasoningEffort returns null for unknown provider+model", () => {
  assert.equal(getLearnedReasoningEffort("acme", "unknown-model"), null);
});

test("getLearnedReasoningEffort is keyed case-insensitively on provider+model", () => {
  recordLearnedReasoningEffort("OVH", "Qwen3-Coder-30B", ["none", "high"]);
  assert.ok(
    (getLearnedReasoningEffort("ovh", "qwen3-coder-30b") as unknown as Set<string>).has("high")
  );
  assert.ok(
    (getLearnedReasoningEffort("OVH", "QWEN3-CODER-30B") as unknown as Set<string>).has("high")
  );
});

test("different providers for the same model id have independent caps", () => {
  recordLearnedReasoningEffort("ovh", "shared-model", ["none", "high"]);
  assert.equal(getLearnedReasoningEffort("openrouter", "shared-model"), null);
});

test("handles empty/null provider or model gracefully", () => {
  assert.equal(getLearnedReasoningEffort("", "m"), null);
  assert.equal(getLearnedReasoningEffort("p", ""), null);
  assert.equal(getLearnedReasoningEffort(null, "m"), null);
  assert.equal(getLearnedReasoningEffort("p", null), null);
  assert.equal(recordLearnedReasoningEffort("", "m", ["high"]), null);
  assert.equal(recordLearnedReasoningEffort("p", "", ["high"]), null);
});

// ── getLearnedReasoningEffortForModel ────────────────────────────────────────

import { getLearnedReasoningEffortForModel } from "../../../open-sse/services/learnedReasoningEffortCaps.ts";

test("getLearnedReasoningEffortForModel finds a set recorded under any provider key", () => {
  recordLearnedReasoningEffort("openai-compatible-chat-eaff6869", "X-Preview-F-Free", [
    "low",
    "high",
    "max",
  ]);
  const set = getLearnedReasoningEffortForModel("x-preview-f-free");
  assert.ok(set);
  assert.deepEqual([...set].sort(), ["high", "low", "max"]);
});

test("getLearnedReasoningEffortForModel intersects when multiple providers disagree", () => {
  recordLearnedReasoningEffort("conn-a", "shared-model", ["low", "high", "max"]);
  recordLearnedReasoningEffort("conn-b", "shared-model", ["low"]);
  const set = getLearnedReasoningEffortForModel("shared-model");
  assert.ok(set);
  assert.deepEqual([...set], ["low"]);
});

test("getLearnedReasoningEffortForModel returns null when nothing learned or empty model", () => {
  assert.equal(getLearnedReasoningEffortForModel("never-learned"), null);
  assert.equal(getLearnedReasoningEffortForModel(""), null);
  assert.equal(getLearnedReasoningEffortForModel(undefined), null);
});

test("recordLearnedReasoningEffort warns when every token is unrecognized", () => {
  const warnings: string[] = [];
  const orig = console.warn;
  console.warn = (msg: string) => warnings.push(msg);
  try {
    const result = recordLearnedReasoningEffort("p", "m", ["bogus-one", "bogus-two"]);
    assert.equal(result, null);
    assert.ok(warnings.some((w) => w.includes("reasoning_effort") && w.includes("bogus-one")));
  } finally {
    console.warn = orig;
  }
});
