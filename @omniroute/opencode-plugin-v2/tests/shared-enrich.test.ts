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

// #14966: a bare-id fallback hit is model-scoped evidence, but the entry it returns is
// provider-scoped. A generic-adapter row (`ih/glm-5.3`, owned_by `ih`) must not borrow
// an unrelated provider's label, free budget or pricing from the bare `glm-5.3` key.
describe("lookupEnrichment bare-id fallback (#14966)", () => {
  const foreign: OmniRouteEnrichmentMap = new Map([
    [
      "kimi-k3",
      {
        name: "kimi-k3",
        providerAlias: "ollama-cloud",
        providerCanonical: "ollama-cloud",
        providerDisplayName: "Ollama-cloud",
        freeType: "recurring-credit",
        creditTokens: 1_000_000,
        pricing: { input: 0, output: 0 },
      },
    ],
    [
      "nova-3",
      {
        name: "Nova 3 (Transcription)",
        providerAlias: "deepgram",
        providerCanonical: "deepgram",
        providerDisplayName: "Deepgram",
        pricing: { input: 1, output: 2 },
      },
    ],
  ]);
  const c2a = buildCanonicalToAliasMap(foreign);

  it("keeps only the model name when the bare entry belongs to another provider", () => {
    const hit = lookupEnrichment("ih/kimi-k3", foreign, c2a, "ih");
    assert.deepEqual(hit, { name: "kimi-k3" });
  });

  it("keeps only the model name when the row owner is unknown", () => {
    const hit = lookupEnrichment("ih/kimi-k3", foreign, c2a);
    assert.deepEqual(hit, { name: "kimi-k3" });
  });

  it("keeps the whole entry when the row is owned by the entry's provider", () => {
    const hit = lookupEnrichment("dg/nova-3", foreign, c2a, "deepgram");
    assert.equal(hit?.providerDisplayName, "Deepgram");
    assert.deepEqual(hit?.pricing, { input: 1, output: 2 });
  });

  it("does not change a direct hit", () => {
    const direct: OmniRouteEnrichmentMap = new Map([
      ["ih/kimi-k3", { name: "Kimi K3", providerAlias: "ih", providerDisplayName: "InferHub" }],
    ]);
    const hit = lookupEnrichment("ih/kimi-k3", direct, new Map(), "ih");
    assert.equal(hit?.providerDisplayName, "InferHub");
  });
});
