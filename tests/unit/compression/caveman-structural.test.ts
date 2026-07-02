import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getRulesForContext } from "../../../open-sse/services/compression/cavemanRules.ts";
import { applyRulesToText } from "../../../open-sse/services/compression/caveman.ts";
import { cavemanCompress } from "../../../open-sse/services/compression/caveman.ts";

describe("structural compression rules", () => {
  it("should simplify list conjunctions", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "list_conjunction");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("handles routing, and also load balancing", rules);
    assert.ok(!text.includes("and also"));
  });

  it("should simplify purpose phrases", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "purpose_phrases");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("in order to fix this bug", rules);
    assert.ok(text.startsWith("to "));
  });

  it("should simplify redundant quantifiers", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "redundant_quantifiers");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("each and every item", rules);
    assert.ok(text.includes("each"));
    assert.ok(!text.includes("every"));
  });

  it("should replace verbose connectors with 'also'", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "verbose_connectors");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("furthermore, this handles caching", rules);
    assert.ok(text.startsWith("also"));
  });

  it("should remove emphasis adverbs", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "emphasis_removal");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("this is very important", rules);
    assert.ok(!text.includes("very"));
    assert.ok(text.includes("important"));
  });

  it("should convert passive voice to active", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "passive_voice");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("The function is being used throughout the app", rules);
    assert.ok(text.includes("uses"));
  });

  it("should apply combined structural compression", () => {
    const body = {
      messages: [
        {
          role: "user",
          content:
            "I need you to provide a detailed analysis of the routing system. Furthermore, I would like you to explain each and every component in order to understand how they work together. Thank you so much!",
        },
      ],
    };
    const result = cavemanCompress(body, {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    });
    assert.equal(result.compressed, true);
    assert.ok(
      result.stats.savingsPercent > 10,
      `Expected meaningful savings, got ${result.stats.savingsPercent}%`
    );
  });
});
