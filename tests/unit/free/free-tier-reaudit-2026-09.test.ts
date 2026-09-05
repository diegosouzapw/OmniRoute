import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  FREE_MODEL_BUDGETS,
  computeFreeModelTotals,
} from "@omniroute/open-sse/config/freeModelCatalog.ts";
import { FREE_TIER_BUDGETS } from "@omniroute/open-sse/config/freeTierCatalog.ts";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry.ts";

/**
 * 2026-09-02 re-audit against the providers' own pages — the official pages
 * cited in the `// evidence:` comments next to each entry in
 * `open-sse/config/freeModelCatalog.data.ts`. Each test pins one verified
 * fact so the catalog cannot drift back to an invented number.
 */
const rows = (id: string) => FREE_MODEL_BUDGETS.filter((m) => m.provider === id);
const ids = (id: string) =>
  rows(id)
    .map((m) => m.modelId)
    .sort();

test("gemini publishes no per-model free limits any more — uncapped, never summed", () => {
  const g = rows("gemini");
  assert.ok(g.length >= 1);
  assert.ok(g.every((m) => m.freeType === "recurring-uncapped" && m.monthlyTokens === 0));
  assert.ok(computeFreeModelTotals().uncappedProviders.includes("gemini"));
});

test("ollama-cloud free plan has no published token cap — uncapped, never summed", () => {
  const o = rows("ollama-cloud");
  assert.ok(o.length >= 1);
  assert.ok(o.every((m) => m.freeType === "recurring-uncapped" && m.monthlyTokens === 0));
  assert.ok(computeFreeModelTotals().uncappedProviders.includes("ollama-cloud"));
});

test("groq free plan: 200K TPD per model × 30 = 6M per model, each cap independent", () => {
  assert.deepEqual(ids("groq"), [
    "openai/gpt-oss-120b",
    "openai/gpt-oss-20b",
    "openai/gpt-oss-safeguard-20b",
    "qwen/qwen3.6-27b",
    "qwen/qwen3.8-27b",
  ]);
  for (const m of rows("groq")) {
    assert.equal(m.monthlyTokens, 6_000_000, m.modelId);
    assert.equal(m.poolKey, null, `${m.modelId} is a per-model cap, not a shared pool`);
    assert.equal(m.freeType, "recurring-daily");
    assert.equal(m.hardStopGuaranteed, true);
  }
  // retired from the free tier on 2026-07-17 / 2026-08-16 (console.groq.com/docs/deprecations)
  for (const dead of [
    "llama-3.3-70b-versatile",
    "meta-llama/llama-4-scout-17b-16e-instruct",
    "qwen/qwen3-32b",
  ]) {
    assert.ok(!ids("groq").includes(dead), `${dead} must not be in the free catalog`);
  }
  const registryIds = new Set(REGISTRY.groq.models.map((m) => m.id));
  for (const id of ids("groq")) assert.ok(registryIds.has(id), `${id} must be routable`);
});

test("nara free plan: 7M tokens/day account-wide → 210M/month, one pool, the 8 plan models", () => {
  const free = [
    "agnes-2.0-flash",
    "agnes-2.5-flash",
    "laguna-s-2.1",
    "minimax-m3-free",
    "mistral-large",
    "mistral-medium-3-5",
    "qwen3.8-27b",
    "stepfun-3.7-flash",
  ];
  assert.deepEqual(ids("nara"), free);
  for (const m of rows("nara")) {
    assert.equal(m.monthlyTokens, 210_000_000, m.modelId);
    assert.equal(m.poolKey, "nara-free");
    assert.equal(m.freeType, "recurring-daily");
  }
  assert.deepEqual(REGISTRY.nara.models.map((m) => m.id).sort(), free);
});

test("mistral keeps its 1B pool only with a dated console verification on record", () => {
  const src = readFileSync(
    new URL("../../../open-sse/config/freeModelCatalog.data.ts", import.meta.url),
    "utf8"
  );
  const m = rows("mistral");
  assert.ok(m.length >= 1);
  const pooled = m.filter((r) => r.monthlyTokens > 0);
  if (pooled.length > 0) {
    // All-or-nothing: a mixed 1B/0 state is neither console-verified nor honestly uncapped.
    assert.equal(pooled.length, m.length, "every mistral row must carry the pooled 1B");
    assert.ok(
      pooled.every(
        (r) =>
          r.monthlyTokens === 1_000_000_000 &&
          r.poolKey === "mistral" &&
          r.freeType === "recurring-monthly"
      )
    );
    assert.match(
      src,
      /evidence: console-verified 20\d\d-\d\d-\d\d por \S+ \(https:\/\/console\.mistral\.ai/
    );
  } else {
    assert.ok(m.every((r) => r.monthlyTokens === 0 && r.freeType === "recurring-uncapped"));
  }
});

test("legacy provider-level catalog agrees with the per-model catalog for the re-audited providers", () => {
  assert.equal(FREE_TIER_BUDGETS.gemini, undefined);
  assert.equal(FREE_TIER_BUDGETS["ollama-cloud"], undefined);
  assert.equal(FREE_TIER_BUDGETS.groq, 30_000_000);
  assert.equal(FREE_TIER_BUDGETS.nara, 210_000_000);
});

test("modelscope: 250 魔粒/day → 6M/month, one pool, behind mainland real-name verification", () => {
  const m = rows("modelscope");
  assert.ok(m.length >= 1);
  for (const r of m) {
    assert.equal(r.monthlyTokens, 6_000_000, r.modelId);
    assert.equal(r.poolKey, "modelscope-free");
    assert.equal(r.freeType, "recurring-daily");
    assert.equal(r.eligibilityGate, "regional-identity");
    assert.equal(r.tos, "caution");
  }
  const t = computeFreeModelTotals();
  assert.equal(t.gatedRecurringTokens, 6_000_000);
  assert.deepEqual(t.gatedProviders, ["modelscope"]);
  assert.ok(!t.uncappedProviders.includes("modelscope"));
});

test("a shared pool never mixes gated and ungated entries", () => {
  const byPool = new Map<string, Set<string>>();
  for (const r of FREE_MODEL_BUDGETS) {
    if (!r.poolKey) continue;
    const gate = r.eligibilityGate ?? "none";
    const seen = byPool.get(r.poolKey) ?? new Set<string>();
    seen.add(gate);
    byPool.set(r.poolKey, seen);
  }
  for (const [poolKey, gates] of byPool) {
    assert.equal(
      gates.size,
      1,
      `pool ${poolKey} mixes eligibility gates: ${[...gates].join(", ")}`
    );
  }
});
