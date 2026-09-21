import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mapRawModelToModelV2, resolveApiBlockV2 } from "../src/shared/models-map.js";

describe("resolveApiBlockV2", () => {
  it("routes unknown ids to openai-compatible with /v1 suffix", () => {
    assert.deepEqual(resolveApiBlockV2("gpt-x", "https://gw.example.com"), {
      id: "openai-compatible",
      url: "https://gw.example.com/v1",
      npm: "@ai-sdk/openai-compatible",
    });
  });
  it("does not double the /v1 suffix", () => {
    assert.equal(
      resolveApiBlockV2("gpt-x", "https://gw.example.com/v1").url,
      "https://gw.example.com/v1"
    );
  });
  it("routes allowlisted full id to anthropic even with claude-like prefix elsewhere", () => {
    const out = resolveApiBlockV2("anthropic/claude-x", "https://gw.example.com/", {
      allowAnthropic: true,
      anthropicModels: ["anthropic/claude-x"],
    });
    assert.deepEqual(out, {
      id: "anthropic",
      url: "https://gw.example.com",
      npm: "@ai-sdk/anthropic",
    });
  });
  it("keeps a non-allowlisted id on openai-compatible when prefixes are emptied", () => {
    const out = resolveApiBlockV2("claude/openai-compatible-model", "https://gw.example.com", {
      allowAnthropic: true,
      anthropicModels: ["anthropic/claude-x"],
      anthropicPrefixes: [],
    });
    assert.equal(out.id, "openai-compatible");
  });
  it("routes a deprecated-prefix id to anthropic with a deprecation warning", () => {
    const warns: string[] = [];
    const origWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warns.push(String(args[0]));
    };
    try {
      const out = resolveApiBlockV2("cc/claude-x", "https://gw.example.com", {
        allowAnthropic: true,
        anthropicPrefixes: ["cc"],
      });
      assert.equal(out.id, "anthropic");
    } finally {
      console.warn = origWarn;
    }
    assert.ok(warns.some((w) => w.includes("deprecated")));
  });
});

describe("mapRawModelToModelV2", () => {
  it("prefixes bare ids, keeps slashed ids, maps capabilities", () => {
    const m = mapRawModelToModelV2(
      {
        id: "gpt-x",
        context_length: 128000,
        max_output_tokens: 4096,
        input_modalities: ["text", "image"],
        capabilities: { tool_calling: true, reasoning: true },
      },
      { providerId: "omniroute", baseURL: "https://gw.example.com" }
    );
    assert.equal(m.id, "omniroute/gpt-x");
    assert.equal(m.providerID, "omniroute");
    assert.equal(m.capabilities.toolcall, true);
    assert.equal(m.capabilities.reasoning, true);
    assert.equal(m.capabilities.input.image, true);
    assert.equal(m.limit.context, 128000);
    assert.equal(m.limit.output, 4096);
    assert.equal(m.api.id, "openai-compatible");
    assert.equal(m.status, "active");
  });
  it("maps effort_tiers to variants, omits key when absent", () => {
    const withTiers = mapRawModelToModelV2(
      { id: "r1", capabilities: { effort_tiers: ["low", "high"] } },
      { providerId: "omniroute", baseURL: "https://gw.example.com" }
    );
    assert.deepEqual(withTiers.variants, {
      low: { reasoningEffort: "low" },
      high: { reasoningEffort: "high" },
    });
    const without = mapRawModelToModelV2(
      { id: "r2" },
      { providerId: "omniroute", baseURL: "https://gw.example.com" }
    );
    assert.ok(!("variants" in without));
  });
});
