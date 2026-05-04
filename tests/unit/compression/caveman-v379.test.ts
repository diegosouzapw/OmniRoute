import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { cavemanCompress } from "../../../open-sse/services/compression/caveman.ts";
import {
  getCavemanRuleMetadata,
  getRuleByName,
} from "../../../open-sse/services/compression/cavemanRules.ts";
import { applyCompression } from "../../../open-sse/services/compression/strategySelector.ts";

function compress(content: string, options = {}) {
  const result = cavemanCompress(
    { messages: [{ role: "user", content }] },
    {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 0,
      preservePatterns: [],
      intensity: "full",
      ...options,
    }
  );
  return result.body.messages[0].content as string;
}

describe("Caveman v3.7.9 rule parity", () => {
  it("removes articles, pleasantries, leader phrases, and redundant phrasing", () => {
    const text = compress(
      "Sure, I will make sure to explain the reason is because the function uses a database."
    );
    assert.doesNotMatch(text, /\bSure\b/i);
    assert.doesNotMatch(text, /^I will\b/i);
    assert.doesNotMatch(text, /\bmake sure to\b/i);
    assert.doesNotMatch(text, /\bthe reason is because\b/i);
    assert.doesNotMatch(text, /\bthe function\b/i);
    assert.match(text, /\bensure\b/i);
    assert.match(text, /\bbecause\b/i);
    assert.match(text, /\bdatabase\b/i);
  });

  it("recapitalizes sentence starts after removals", () => {
    const text = compress("Sure, the database connection fails. of course the fix is simple.");
    assert.match(text, /^Database/);
    assert.match(text, /\. Fix/);
  });

  it("supports intensity sub-levels for standard mode", () => {
    const lite = compress("The database request uses the response object.", { intensity: "lite" });
    const full = compress("The database request uses the response object.", { intensity: "full" });
    const ultra = compress("The database request uses the response object.", {
      intensity: "ultra",
    });

    assert.match(lite, /\bThe\b/);
    assert.doesNotMatch(full, /\bThe\b/);
    assert.match(ultra, /\bDB\b/);
    assert.match(ultra, /\breq\b/);
    assert.match(ultra, /\bres\b/);
  });

  it("preserves articles before proper nouns, numbers, and code-like tokens", () => {
    const text = compress(
      "Use the OpenAI API, the 404 error, the config.api.endpoint() function, and the database."
    );

    assert.match(text, /\bthe OpenAI API\b/);
    assert.match(text, /\bthe 404 error\b/);
    assert.match(text, /\bthe config\.api\.endpoint\(\) function\b/);
    assert.doesNotMatch(text, /\bthe database\b/i);
  });

  it("removes upstream Caveman pleasantry variants without breaking make sure to", () => {
    const text = compress(
      "Thanks, thank you, glad to help, I'd be glad to, no problem, you're welcome, absolutely. Please make sure to review the database."
    );

    for (const phrase of [
      "thanks",
      "thank you",
      "glad to help",
      "I'd be glad to",
      "no problem",
      "you're welcome",
      "absolutely",
    ]) {
      assert.doesNotMatch(text, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
    }
    assert.match(text, /\bensure review database\b/i);
  });

  it("keeps system prompts unchanged when preserveSystemPrompt is enabled", () => {
    const body = {
      messages: [
        {
          role: "system",
          content: "The assistant should make sure to preserve the detailed policy.",
        },
        {
          role: "user",
          content: "Please make sure to summarize the database response.",
        },
      ],
    };
    const result = applyCompression(body, "standard", {
      config: {
        enabled: true,
        defaultMode: "standard",
        autoTriggerMode: "standard",
        autoTriggerTokens: 0,
        cacheMinutes: 5,
        preserveSystemPrompt: true,
        comboOverrides: {},
        cavemanConfig: {
          enabled: true,
          compressRoles: ["system", "user"],
          skipRules: [],
          minMessageLength: 0,
          preservePatterns: [],
          intensity: "full",
        },
      },
    });

    const messages = result.body.messages as Array<{ role: string; content: string }>;
    assert.equal(messages[0].content, body.messages[0].content);
    assert.doesNotMatch(messages[1].content, /\bPlease\b/i);
  });

  it("preserves multimodal non-text parts in aggressive and ultra modes", () => {
    const body = {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Please make sure to explain the database response.".repeat(20) },
            { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
          ],
        },
      ],
    };

    for (const mode of ["aggressive", "ultra"] as const) {
      const result = applyCompression(body, mode, {
        config: {
          enabled: true,
          defaultMode: mode,
          autoTriggerTokens: 0,
          cacheMinutes: 5,
          preserveSystemPrompt: true,
          comboOverrides: {},
          aggressive: undefined,
          ultra: {
            enabled: true,
            compressionRate: 0.5,
            minScoreThreshold: 0.3,
            slmFallbackToAggressive: true,
            maxTokensPerMessage: 0,
          },
        },
      });
      const content = (result.body.messages as typeof body.messages)[0].content;
      assert.ok(Array.isArray(content));
      assert.deepEqual(content[1], body.messages[0].content[1]);
    }
  });

  it("exposes metadata for new rule names", () => {
    const metadata = getCavemanRuleMetadata();
    for (const ruleName of [
      "articles",
      "pleasantries",
      "leader_phrases",
      "redundant_phrasing",
      "ultra_abbreviations",
    ]) {
      assert.ok(getRuleByName(ruleName), `missing rule ${ruleName}`);
      const rule = metadata.find((entry) => entry.name === ruleName);
      assert.ok(rule?.category, `missing metadata category for ${ruleName}`);
      assert.ok(rule?.intensities?.length, `missing metadata intensities for ${ruleName}`);
    }
  });
});
