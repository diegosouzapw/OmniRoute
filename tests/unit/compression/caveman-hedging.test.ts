import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getRulesForContext } from "../../../open-sse/services/compression/cavemanRules.ts";
import { applyRulesToText } from "../../../open-sse/services/compression/caveman.ts";

describe("hedging and context condensation rules", () => {
  it("should remove hedging phrases", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "hedging");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("It seems like this function is working correctly", rules);
    assert.ok(!text.toLowerCase().includes("it seems like"));
  });

  it("should convert explanatory prefix to shorter form", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "explanatory_prefix");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText(
      "The function appears to be handling the data processing",
      rules
    );
    assert.ok(text.includes("Function:"));
  });

  it("should convert questions to directives", () => {
    const rules = getRulesForContext("user").filter((r) => r.name === "question_to_directive");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("Can you explain why this error occurs?", rules);
    assert.ok(text.includes("Explain why"), `Expected 'Explain why' in output, got: ${text}`);
  });

  it("should convert context setup phrases", () => {
    const rules = getRulesForContext("user").filter((r) => r.name === "context_setup");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("I have the following code for review:", rules);
    assert.ok(text.includes("Code:"));
  });

  it("should convert intent clarification to Goal:", () => {
    const rules = getRulesForContext("user").filter((r) => r.name === "intent_clarification");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("What I'm trying to do is fix the authentication bug", rules);
    assert.ok(text.startsWith("Goal:"));
  });

  it("should remove background phrases", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "background_removal");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("As you may know, this is important", rules);
    assert.ok(!text.toLowerCase().includes("as you may know"));
  });

  it("should convert purpose statements", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "purpose_statement");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("for the purpose of testing", rules);
    assert.ok(text.includes("for testing"));
    assert.ok(!text.includes("purpose"));
  });

  it("should preserve meaning — key terms not removed", () => {
    const allRules = getRulesForContext("all");
    const { text } = applyRulesToText("Fix the authentication error in the login module", allRules);
    assert.ok(text.includes("authentication"), "Key term 'authentication' should be preserved");
    assert.ok(text.includes("error"), "Key term 'error' should be preserved");
    assert.ok(text.includes("login"), "Key term 'login' should be preserved");
  });
});
