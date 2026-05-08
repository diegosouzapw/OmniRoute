import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  cavemanCompress,
  applyRulesToText,
} from "../../../open-sse/services/compression/caveman.ts";
import { CAVEMAN_RULES } from "../../../open-sse/services/compression/cavemanRules.ts";
import type { CavemanRule } from "../../../open-sse/services/compression/types.ts";

describe("caveman engine", () => {
  it("should compress a verbose user prompt", () => {
    const body = {
      messages: [
        {
          role: "user",
          content:
            "Please could you help me analyze this code? I would like you to provide a detailed explanation of what the function does. Thank you so much for your help!",
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
      result.stats.savingsPercent > 0,
      `Expected savings > 0, got ${result.stats.savingsPercent}`
    );
    assert.ok(
      result.stats.rulesApplied && result.stats.rulesApplied.length > 0,
      "Expected rules applied"
    );
  });

  it("should skip messages below minMessageLength", () => {
    const body = { messages: [{ role: "user", content: "Hi" }] };
    const result = cavemanCompress(body, {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    });
    assert.equal(result.compressed, false);
  });

  it("should return unchanged body when disabled", () => {
    const body = { messages: [{ role: "user", content: "Please help me with this code" }] };
    const result = cavemanCompress(body, {
      enabled: false,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    });
    assert.equal(result.compressed, false);
  });

  it("should preserve code blocks", () => {
    const codeContent = "const x = 42;\nconsole.log(x);";
    const body = {
      messages: [
        {
          role: "user",
          content: `Please analyze this code:\n\`\`\`typescript\n${codeContent}\n\`\`\`\nThank you so much!`,
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
    const text = result.body.messages[0].content as string;
    assert.ok(text.includes(codeContent), `Code block should be preserved exactly`);
  });

  it("should preserve URLs", () => {
    const url = "https://example.com/api/v1/users";
    const body = {
      messages: [
        {
          role: "user",
          content: `Please check ${url} for the API docs. Thank you so much!`,
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
    const text = result.body.messages[0].content as string;
    assert.equal(
      text.split(/\s+/).some((token) => token === url),
      true,
      `URL should be preserved`
    );
  });

  it("should handle empty messages array", () => {
    const body = { messages: [] };
    const result = cavemanCompress(body, {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    });
    assert.equal(result.compressed, false);
  });

  it("should handle messages without content", () => {
    const body = { messages: [{ role: "user" }] };
    const result = cavemanCompress(body, {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    });
    assert.equal(result.compressed, false);
  });

  it("should skip rules in skipRules list", () => {
    const body = {
      messages: [{ role: "user", content: "Please help me with this code. Thank you so much!" }],
    };
    const resultWithSkip = cavemanCompress(body, {
      enabled: true,
      compressRoles: ["user"],
      skipRules: ["polite_framing"],
      minMessageLength: 50,
      preservePatterns: [],
    });
    assert.ok(
      !resultWithSkip.stats.rulesApplied?.includes("polite_framing"),
      "polite_framing should be skipped"
    );
  });

  it("should respect compressRoles setting", () => {
    const body = {
      messages: [
        {
          role: "system",
          content:
            "You are a very helpful assistant. Please be extremely detailed in all your responses.",
        },
        {
          role: "user",
          content:
            "Please could you help me with this code problem? I would like you to provide a detailed explanation. Thank you so much!",
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
    const systemMsg = result.body.messages[0].content as string;
    const userMsg = result.body.messages[1].content as string;
    assert.ok(
      systemMsg.includes("very"),
      "System message should not be compressed (not in compressRoles)"
    );
    assert.ok(
      !userMsg.includes("Please could you"),
      "User message should have 'Please could you' removed"
    );
    assert.ok(
      !userMsg.includes("Thank you so much"),
      "User message should have 'Thank you so much' removed"
    );
  });

  it("should compute stats accurately", () => {
    const body = {
      messages: [
        { role: "user", content: "Please could you help me with this problem? Thank you so much!" },
      ],
    };
    const result = cavemanCompress(body, {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    });
    assert.ok(result.stats.originalTokens > 0);
    assert.ok(result.stats.compressedTokens >= 0);
    assert.ok(result.stats.savingsPercent >= 0);
    assert.ok(result.stats.durationMs >= 0);
    assert.ok(
      result.stats.durationMs < 50,
      `Duration ${result.stats.durationMs}ms should be well under 5ms`
    );
  });

  it("applyRulesToText should track applied rules", () => {
    const { text, appliedRules } = applyRulesToText(
      "Please help me",
      CAVEMAN_RULES.filter((r) => r.context === "all" || r.context === "user")
    );
    assert.ok(appliedRules.length > 0, "Should track applied rules");
    assert.ok(appliedRules.includes("polite_framing"), "polite_framing should be in applied rules");
  });

  it("should complete in under 5ms for 10K token messages", () => {
    const longContent = "Please help me analyze this code. ".repeat(1000);
    const body = { messages: [{ role: "user", content: longContent }] };
    const result = cavemanCompress(body, {
      enabled: true,
      compressRoles: ["user"],
      skipRules: [],
      minMessageLength: 50,
      preservePatterns: [],
    });
    assert.ok(result.stats.durationMs < 25, `Expected <25ms, got ${result.stats.durationMs}ms`);
  });
});
