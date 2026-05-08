import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getRulesForContext } from "../../../open-sse/services/compression/cavemanRules.ts";
import { applyRulesToText } from "../../../open-sse/services/compression/caveman.ts";
import { cavemanCompress } from "../../../open-sse/services/compression/caveman.ts";

describe("multi-turn dedup rules", () => {
  it("should replace repeated context references", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "repeated_context");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("As we discussed earlier, this needs fixing", rules);
    assert.ok(text.includes("See above"));
  });

  it("should replace repeated questions", () => {
    const rules = getRulesForContext("user").filter((r) => r.name === "repeated_question");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("Same question as before about the API", rules);
    assert.ok(text.includes("[same question]"));
  });

  it("should shorten reestablished context", () => {
    const rules = getRulesForContext("all").filter((r) => r.name === "reestablished_context");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText("Going back to the code above, I need help", rules);
    assert.ok(text.includes("Re:"));
  });

  it("should replace summaries with 'Summary:'", () => {
    const rules = getRulesForContext("assistant").filter((r) => r.name === "summary_replacement");
    assert.ok(rules.length > 0);
    const { text } = applyRulesToText(
      "To summarize what we've discussed, here are the key points:",
      rules
    );
    assert.ok(text.includes("Summary:"));
  });

  it("should handle multi-message scenarios", () => {
    const body = {
      messages: [
        {
          role: "user",
          content:
            "Please help me fix this TypeScript error: TypeError: Cannot read property of undefined",
        },
        {
          role: "assistant",
          content:
            "The error indicates you're trying to access a property on a null or undefined value. You should add a null check.",
        },
        {
          role: "user",
          content:
            "As we discussed earlier, I tried adding null checks but the error persists. Could you please provide a more detailed explanation of what might be causing this?",
        },
      ],
    };
    const result = cavemanCompress(body, {
      enabled: true,
      compressRoles: ["user", "assistant"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    });
    assert.equal(result.compressed, true);
    assert.ok(result.stats.rulesApplied && result.stats.rulesApplied.length > 0);
  });

  it("should NOT dedupe unique content", () => {
    const body = {
      messages: [
        { role: "user", content: "How do I implement OAuth 2.0 in my Express application?" },
        { role: "assistant", content: "You can use the passport library with the OAuth2Strategy." },
        { role: "user", content: "What about implementing rate limiting for the API endpoints?" },
      ],
    };
    const result = cavemanCompress(body, {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    });
    const lastUserMsg = result.body.messages[2].content as string;
    assert.ok(lastUserMsg.includes("rate limiting"), "Unique content should be preserved");
  });
});
