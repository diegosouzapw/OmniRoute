import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  applyEnrichment,
  buildCanonicalToAliasMap,
  canonicalDedupSet,
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
