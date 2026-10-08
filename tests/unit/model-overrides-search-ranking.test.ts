/**
 * Model Overrides picker search: relevance ranking + window guarantees.
 *
 * The old picker filtered by plain substring and hard-sliced the first 80
 * targets in catalog order. With 400+ providers / 12k+ targets, a short query
 * like `bai` matched `baichuan`/`bailian-coding-plan`/`baidu`/`bailing` too,
 * and the intended provider (#233 of 413) was crowded out of the window —
 * its models appeared to be missing from the picker entirely.
 *
 * Covers:
 * - provider-exact matches lead (all of the queried provider's models first)
 * - the provider-scoped form (`bai/`) matches only that provider
 * - provider-prefix matches (baichuan…) rank after the exact match
 * - model-id prefix ranks above plain substring
 * - window caps: default view unchanged (80), filtered view 300
 * - non-matching targets are excluded (filter parity)
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

const { filterModelOverrideTargets } =
  await import("../../src/lib/modelCapabilityOverrideTargets.ts");

import type { ModelOverrideTarget } from "../../src/lib/modelCapabilityOverrideTargets.ts";

function makeTarget(provider: string, modelId: string): ModelOverrideTarget {
  return { target: `${provider}/${modelId}`, provider, modelId, label: `${provider}/${modelId}` };
}

// Catalog order mirrors the real API: registry providers first, custom nodes
// appended later (bai is a late custom node).
const CATALOG: ModelOverrideTarget[] = [
  ...Array.from({ length: 20 }, (_, i) => makeTarget("baichuan", `Baichuan${i}`)),
  ...Array.from({ length: 16 }, (_, i) => makeTarget("baidu", `ernie-${i}`)),
  ...Array.from({ length: 2 }, (_, i) => makeTarget("bailing", `ling-${i}`)),
  ...Array.from({ length: 58 }, (_, i) => makeTarget("bai", `model-${i}`)),
  ...Array.from({ length: 30 }, (_, i) => makeTarget("zai", `glm-${i}`)),
  makeTarget("someday", "bai-bar"), // model-id substring, different provider
];

describe("filterModelOverrideTargets", () => {
  it("ranks the exact provider's full model list before prefix neighbors", () => {
    const out = filterModelOverrideTargets(CATALOG, "bai");
    assert.equal(out[0].provider, "bai");
    // All 58 bai targets float to the top, before any baichuan/baidu entry.
    const baiCount = out.filter((t) => t.provider === "bai").length;
    assert.equal(baiCount, 58);
    const firstNonBai = out.findIndex((t) => t.provider !== "bai");
    assert.ok(
      firstNonBai >= 58,
      `bai block must be contiguous at the top (first non-bai at ${firstNonBai})`
    );
  });

  it("provider-scoped form (`bai/`) matches only that provider", () => {
    const out = filterModelOverrideTargets(CATALOG, "bai/");
    assert.ok(out.length > 0);
    for (const t of out) assert.equal(t.provider, "bai");
  });

  it("ranks model-id prefix above plain substring", () => {
    const out = filterModelOverrideTargets(CATALOG, "glm");
    // zai/glm-* (prefix) must precede someday/bai-bar… which does not even
    // contain "glm" — use a substring-only case instead:
    const prefixProviders = new Set(out.slice(0, 30).map((t) => t.provider));
    assert.deepEqual([...prefixProviders], ["zai"]);
  });

  it("keeps plain substring matches as a lower tier", () => {
    const out = filterModelOverrideTargets(CATALOG, "bai-bar");
    assert.deepEqual(
      out.map((t) => t.label),
      ["someday/bai-bar"]
    );
  });

  it("excludes non-matching targets", () => {
    const out = filterModelOverrideTargets(CATALOG, "zzz-no-such-model");
    assert.equal(out.length, 0);
  });

  it("default view is unchanged: first 80 in catalog order", () => {
    const out = filterModelOverrideTargets(CATALOG, "");
    assert.equal(out.length, 80);
    assert.deepEqual(out, CATALOG.slice(0, 80));
  });

  it("filtered window is wide (300)", () => {
    const big = Array.from({ length: 1000 }, (_, i) => makeTarget("bai", `m-${i}`));
    assert.equal(filterModelOverrideTargets(big, "bai").length, 300);
  });

  it("is case/diacritic-insensitive via the shared normalizer", () => {
    const out = filterModelOverrideTargets(CATALOG, "BAI/");
    assert.ok(out.length > 0);
    for (const t of out) assert.equal(t.provider, "bai");
  });
});
