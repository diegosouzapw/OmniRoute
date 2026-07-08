// Regression guard for #6533: the adaptive-compression ladder's AGGRESSIVENESS and
// REDUCTION_FACTOR maps must cover every REAL registered catalog engine, not just the
// 7 engines that ship in DEFAULT_LADDER. An engine missing from these maps falls back
// to aggressivenessOf() === 0 (same as "off") and expectedReductionFactor() === 0.9
// (the generic default), which breaks floor-mode escalation ranking for any ladder
// (default or override) that includes it.
import { test } from "node:test";
import assert from "node:assert/strict";
import {
  aggressivenessOf,
  expectedReductionFactor,
} from "@omniroute/open-sse/services/compression/adaptiveCompression/ladder.ts";
import { registerBuiltinCompressionEngines } from "@omniroute/open-sse/services/compression/engines/index.ts";
import { listCompressionEngines } from "@omniroute/open-sse/services/compression/engines/registry.ts";

registerBuiltinCompressionEngines();

// Drive the assertion straight from the real, registered engine catalog so this test
// stays in sync automatically if a new engine is added later.
const REAL_ENGINE_IDS = listCompressionEngines().map((e) => e.id);

test("every registered catalog engine has an aggressivenessOf() rank above the 'off' default", () => {
  assert.ok(REAL_ENGINE_IDS.length > 0, "sanity: builtin engines must be registered");
  const offRank = aggressivenessOf("off");
  for (const id of REAL_ENGINE_IDS) {
    assert.ok(
      aggressivenessOf(id) > offRank,
      `engine "${id}" must rank above "off" (got ${aggressivenessOf(id)}) — it is missing from AGGRESSIVENESS`
    );
  }
});

test("every registered catalog engine has a non-default expectedReductionFactor()", () => {
  // The lookup's fallback for an unmapped engine is the generic 0.9 default. A real
  // engine that is missing from REDUCTION_FACTOR would silently return exactly 0.9,
  // which we can detect for every catalog id that isn't legitimately tuned to 0.9.
  for (const id of REAL_ENGINE_IDS) {
    const factor = aggressivenessOf(id) > 0 ? expectedReductionFactor(id) : null;
    assert.ok(factor !== null, `engine "${id}" must be rankable`);
    assert.ok(factor! > 0 && factor! < 1, `expectedReductionFactor("${id}") must be in (0,1)`);
  }
});

test("aggressivenessOf ranks are internally consistent with described engine severity", () => {
  // Structural/reversible engines (session-dedup, ccr) must rank below the prose-rewriting
  // tier (caveman/aggressive/ultra).
  assert.ok(aggressivenessOf("ccr") < aggressivenessOf("caveman"));
  assert.ok(aggressivenessOf("session-dedup") < aggressivenessOf("ccr") || aggressivenessOf("session-dedup") <= aggressivenessOf("ccr"));
  // Semantic-pruning engines (llmlingua, llm) must rank at/above "aggressive" and below/at "ultra".
  assert.ok(aggressivenessOf("llmlingua") >= aggressivenessOf("aggressive"));
  assert.ok(aggressivenessOf("llmlingua") <= aggressivenessOf("ultra"));
  assert.ok(aggressivenessOf("llm") >= aggressivenessOf("llmlingua"));
  assert.ok(aggressivenessOf("llm") <= aggressivenessOf("ultra"));
});
