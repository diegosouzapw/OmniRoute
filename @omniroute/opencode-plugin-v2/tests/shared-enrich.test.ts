import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  applyEnrichment,
  buildCanonicalToAliasMap,
  canonicalDedupSet,
  countFreeTierMatch,
  lookupEnrichment,
  type OmniRouteEnrichmentMap,
} from "../src/shared/enrich.js";
import { mapRawModelToModelV2 } from "../src/shared/models-map.js";

const enrichment: OmniRouteEnrichmentMap = new Map([
  ["cc/model-x", { name: "Model X", providerAlias: "cc", providerCanonical: "claude" }],
  ["model-x", { name: "Model X", providerAlias: "cc", providerCanonical: "claude" }],
]);

describe("lookupEnrichment", () => {
  it("resolves a canonical id via the alias fallback chain", () => {
    const canonicalToAlias = buildCanonicalToAliasMap(enrichment);
    assert.equal(canonicalToAlias.get("claude"), "cc");
    const found = lookupEnrichment("claude/model-x", enrichment, canonicalToAlias);
    assert.equal(found?.name, "Model X");
  });

  // Regression tests for issue #14966: bare-key fallback must NOT carry over
  // provider-scoped metadata from an unrelated provider that happens to share
  // the same bare model id.
  it("#14966: strips provider-scoped metadata from a bare-key fallback hit", () => {
    // Simulates: enrichment has 'cc/glm-5.3' + bare 'glm-5.3' both owned by
    // Claude (alias='cc'). A generic-adapter model 'ih/glm-5.3' (InferHub)
    // should NOT inherit Claude's alias or display name via the bare-key hit.
    const map: OmniRouteEnrichmentMap = new Map([
      [
        "cc/glm-5.3",
        {
          name: "GLM 5.3",
          providerAlias: "cc",
          providerCanonical: "claude",
          providerDisplayName: "Claude",
          freeType: "credits" as const,
          creditTokens: 1_000_000,
        },
      ],
      [
        "glm-5.3",
        {
          name: "GLM 5.3",
          providerAlias: "cc",
          providerCanonical: "claude",
          providerDisplayName: "Claude",
          freeType: "credits" as const,
          creditTokens: 1_000_000,
        },
      ],
    ]);
    const canonicalToAlias = buildCanonicalToAliasMap(map);
    const result = lookupEnrichment("ih/glm-5.3", map, canonicalToAlias);
    assert.ok(result, "expected a result from bare-key fallback");
    // Model name is model-scoped — kept.
    assert.equal(result.name, "GLM 5.3");
    // Provider identity is provider-scoped — must be stripped.
    assert.equal(
      result.providerAlias,
      undefined,
      "providerAlias must not bleed through from a foreign provider"
    );
    assert.equal(
      result.providerDisplayName,
      undefined,
      "providerDisplayName must not bleed through from a foreign provider"
    );
    assert.equal(
      result.providerCanonical,
      undefined,
      "providerCanonical must not bleed through from a foreign provider"
    );
    // Free-tier budget belongs to the other provider — must be stripped.
    assert.equal(
      result.freeType,
      undefined,
      "freeType must not bleed through from a foreign provider"
    );
    assert.equal(
      result.creditTokens,
      undefined,
      "creditTokens must not bleed through from a foreign provider"
    );
  });

  it("#14966: bare-key sanitization keeps pricing for the model", () => {
    const map: OmniRouteEnrichmentMap = new Map([
      [
        "glm-5.3",
        {
          name: "GLM 5.3",
          providerAlias: "cc",
          providerDisplayName: "Claude",
          pricing: { input: 1, output: 2 },
        },
      ],
    ]);
    const result = lookupEnrichment("ih/glm-5.3", map, new Map());
    assert.ok(result);
    assert.deepEqual(result.pricing, { input: 1, output: 2 }, "pricing must survive sanitization");
    assert.equal(result.providerAlias, undefined);
    assert.equal(result.providerDisplayName, undefined);
  });

  it("#14966: direct namespaced hit is returned as-is (no sanitization)", () => {
    // 'cc/model-x' is a direct hit — it should be the full entry.
    const canonicalToAlias = buildCanonicalToAliasMap(enrichment);
    const found = lookupEnrichment("cc/model-x", enrichment, canonicalToAlias);
    assert.equal(found?.providerAlias, "cc");
    assert.equal(found?.providerCanonical, "claude");
  });
});

describe("applyEnrichment", () => {
  it("overlays the enrichment display name onto the model", () => {
    const model = mapRawModelToModelV2(
      { id: "cc/model-x" },
      { providerId: "omniroute", baseURL: "https://gw.example.com" }
    );
    applyEnrichment(model, { name: "Model X" });
    assert.equal(model.name, "Model X");
  });
});

describe("canonicalDedupSet", () => {
  it("drops the canonical twin when the alias row exists", () => {
    const canonicalToAlias = buildCanonicalToAliasMap(enrichment);
    const drop = canonicalDedupSet(
      [{ id: "cc/model-x" }, { id: "claude/model-x" }],
      canonicalToAlias
    );
    assert.ok(drop.has("claude/model-x"));
    assert.ok(!drop.has("cc/model-x"));
  });
});

describe("countFreeTierMatch", () => {
  it("counts free-tier lines the served ids reach", () => {
    const overlay: OmniRouteEnrichmentMap = new Map([
      ["m1", { freeType: "keyless" as const }],
      ["other", { freeType: "keyless" as const }],
    ]);
    const match = countFreeTierMatch(["m1"], overlay, new Map());
    assert.deepEqual(match, { total: 2, matched: 1, unmatched: 1 });
  });

  it("resolves matches through the alias fallback chain", () => {
    const overlay: OmniRouteEnrichmentMap = new Map([
      ["cc/model-x", { freeType: "keyless" as const }],
      ["other", { freeType: "keyless" as const }],
    ]);
    const canonicalToAlias = buildCanonicalToAliasMap(
      new Map([["cc/model-x", { providerAlias: "cc", providerCanonical: "claude" }]])
    );
    const match = countFreeTierMatch(["claude/model-x"], overlay, canonicalToAlias);
    assert.deepEqual(match, { total: 2, matched: 1, unmatched: 1 });
  });
});
