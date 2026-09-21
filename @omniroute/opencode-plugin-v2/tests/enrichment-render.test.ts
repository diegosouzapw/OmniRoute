import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { applyEnrichment } from "../src/shared/enrich.js";
import type { Model as ModelV2 } from "@opencode-ai/sdk/v2";

function model(id: string, name = id): ModelV2 {
  return {
    id,
    name,
    cost: { input: 0, output: 0, cache: { read: 0, write: 0 } },
  } as unknown as ModelV2;
}

describe("the enrichment overlay reaches the picker", () => {
  it("renders the upstream provider a model routes to", () => {
    const m = applyEnrichment(model("cc/sonnet"), {
      name: "Claude Sonnet 4.6",
      providerDisplayName: "Claude",
      providerAlias: "cc",
    });
    assert.equal(m.name, "Claude - Claude Sonnet 4.6");
  });

  it("marks a free model and states the budget the user actually gets", () => {
    const m = applyEnrichment(model("pol/grok"), {
      name: "Grok 4 Fast",
      providerDisplayName: "Pollinations",
      freeType: "recurring-monthly" as const,
      monthlyTokens: 1_000_000,
    });
    assert.match(m.name, /\[Free\]/);
    assert.match(m.name, /Grok 4 Fast/);
    assert.match(
      m.name,
      /tokens\/month/,
      "the budget the gateway reports is stated, not just the fact it is free"
    );
    assert.equal(m.name, "[Free] Pollinations - Grok 4 Fast · 1M tokens/month");
  });

  it("drops the tag when the caller turns it off", () => {
    const m = applyEnrichment(
      model("cc/sonnet"),
      { name: "Claude Sonnet 4.6", providerDisplayName: "Claude" },
      { providerTag: false }
    );
    assert.equal(m.name, "Claude Sonnet 4.6");
  });

  it("never tags a combo: it routes across providers, not to one", () => {
    const m = applyEnrichment(
      model("combo-fast", "Combo Fast"),
      { name: "Combo Fast", providerDisplayName: "Claude" },
      { isCombo: true }
    );
    assert.equal(m.name, "Combo Fast");
  });

  it("still overlays pricing", () => {
    const m = applyEnrichment(model("x"), { pricing: { input: 3, output: 15 } });
    assert.equal(m.cost.input, 3);
    assert.equal(m.cost.output, 15);
  });
});
