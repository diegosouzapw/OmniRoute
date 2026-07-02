import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  CAVEMAN_RULES,
  getRulesForContext,
  getRuleByName,
} from "../../../open-sse/services/compression/cavemanRules.ts";

describe("cavemanRules", () => {
  it("should have 29+ rules", () => {
    assert.ok(CAVEMAN_RULES.length >= 29, `Expected 29+ rules, got ${CAVEMAN_RULES.length}`);
  });

  it("every rule should have a name, pattern, replacement, and context", () => {
    for (const rule of CAVEMAN_RULES) {
      assert.ok(rule.name, "Rule missing name");
      assert.ok(rule.pattern instanceof RegExp, `Rule ${rule.name} missing pattern`);
      assert.ok(rule.replacement !== undefined, `Rule ${rule.name} missing replacement`);
      assert.ok(
        ["all", "user", "system", "assistant"].includes(rule.context),
        `Rule ${rule.name} has invalid context: ${rule.context}`
      );
    }
  });

  it("all regex patterns should compile", () => {
    for (const rule of CAVEMAN_RULES) {
      assert.doesNotThrow(() => rule.pattern.test("test"), `Rule ${rule.name} pattern fails`);
    }
  });

  it("getRulesForContext filters correctly", () => {
    const userRules = getRulesForContext("user");
    const systemRules = getRulesForContext("system");
    const assistantRules = getRulesForContext("assistant");

    assert.ok(userRules.length >= 20, `Expected 20+ user rules, got ${userRules.length}`);
    assert.ok(systemRules.length >= 15, `Expected 15+ system rules, got ${systemRules.length}`);
    assert.ok(
      assistantRules.length >= 15,
      `Expected 15+ assistant rules, got ${assistantRules.length}`
    );

    for (const rule of userRules) {
      assert.ok(
        rule.context === "all" || rule.context === "user",
        `User rules should include ${rule.name}`
      );
    }
  });

  it("getRuleByName returns correct rule", () => {
    const rule = getRuleByName("polite_framing");
    assert.ok(rule);
    assert.equal(rule.name, "polite_framing");

    const missing = getRuleByName("nonexistent_rule");
    assert.equal(missing, undefined);
  });

  it("polite_framing removes 'please'", () => {
    const rule = getRuleByName("polite_framing");
    assert.ok(rule);
    const result = "Please analyze this code".replace(rule.pattern, rule.replacement);
    assert.ok(
      !result.toLowerCase().includes("please"),
      `Expected 'please' removed, got: ${result}`
    );
  });

  it("hedging removes 'it seems like'", () => {
    const rule = getRuleByName("hedging");
    assert.ok(rule);
    const result = "It seems like this works".replace(rule.pattern, rule.replacement);
    assert.ok(
      !result.toLowerCase().includes("it seems like"),
      `Expected hedging removed, got: ${result}`
    );
  });

  it("verbose_instructions compresses", () => {
    const rule = getRuleByName("verbose_instructions");
    assert.ok(rule);
    const result = "provide a detailed explanation".replace(
      rule.pattern,
      typeof rule.replacement === "function"
        ? (...args: string[]) => rule.replacement(args[0], ...args.slice(1))
        : rule.replacement
    );
    assert.ok(result.includes("provide"), `Expected 'provide', got: ${result}`);
    assert.ok(!result.includes("detailed"), `Expected 'detailed' removed, got: ${result}`);
  });

  it("filler_adverbs removes 'basically'", () => {
    const rule = getRuleByName("filler_adverbs");
    assert.ok(rule);
    const result = "This is basically a test".replace(rule.pattern, rule.replacement);
    assert.ok(
      !result.toLowerCase().includes("basically"),
      `Expected 'basically' removed, got: ${result}`
    );
  });

  it("excessive_gratitude removes 'Thank you so much'", () => {
    const rule = getRuleByName("excessive_gratitude");
    assert.ok(rule);
    const result = "Thank you so much for your help!".replace(rule.pattern, rule.replacement);
    assert.ok(
      !result.toLowerCase().includes("thank you so much"),
      `Expected gratitude removed, got: ${result}`
    );
  });

  it("context_setup converts 'Here is my code' to 'Code:'", () => {
    const rule = getRuleByName("context_setup");
    assert.ok(rule);
    const result = "Here is my code for review:".replace(rule.pattern, rule.replacement);
    assert.ok(result.includes("Code:"), `Expected 'Code:', got: ${result}`);
  });

  it("intent_clarification converts intent to 'Goal:'", () => {
    const rule = getRuleByName("intent_clarification");
    assert.ok(rule);
    const result = "What I'm trying to do is fix the bug".replace(rule.pattern, rule.replacement);
    assert.ok(result.startsWith("Goal:"), `Expected 'Goal:', got: ${result}`);
  });

  it("purpose_phrases converts 'in order to' to 'to'", () => {
    const rule = getRuleByName("purpose_phrases");
    assert.ok(rule);
    const result = "in order to fix this".replace(rule.pattern, rule.replacement);
    assert.ok(result.startsWith("to "), `Expected 'to ', got: ${result}`);
    assert.ok(!result.includes("in order"), `Expected 'in order' removed, got: ${result}`);
  });

  it("passive_voice converts 'is being used' to 'uses'", () => {
    const rule = getRuleByName("passive_voice");
    assert.ok(rule);
    const result = "The function is being used".replace(
      rule.pattern,
      typeof rule.replacement === "function"
        ? (...args: string[]) => rule.replacement(args[0])
        : rule.replacement
    );
    assert.ok(result.includes("uses"), `Expected 'uses', got: ${result}`);
  });

  it("repeated_context converts to 'See above'", () => {
    const rule = getRuleByName("repeated_context");
    assert.ok(rule);
    const result = "As we discussed earlier, this needs fixing".replace(
      rule.pattern,
      rule.replacement
    );
    assert.ok(result.includes("See above"), `Expected 'See above', got: ${result}`);
  });

  it("emphasis_removal removes 'very' before adjectives", () => {
    const rule = getRuleByName("emphasis_removal");
    assert.ok(rule);
    const result = "This is very important".replace(rule.pattern, rule.replacement);
    assert.ok(!result.includes("very"), `Expected 'very' removed, got: ${result}`);
    assert.ok(result.includes("important"), `Expected 'important' kept, got: ${result}`);
  });
});
