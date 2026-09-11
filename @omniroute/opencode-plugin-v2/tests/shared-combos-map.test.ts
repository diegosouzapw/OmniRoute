import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mapComboToModelV2 } from "../src/shared/combos-map.js";

const member = (id: string, caps = {}) => ({
  id,
  context_length: 100000,
  max_output_tokens: 2000,
  capabilities: caps,
});

describe("mapComboToModelV2", () => {
  it("rolls up LCD: min context/output, AND of toolcall", () => {
    const m = mapComboToModelV2(
      {
        id: "combo-a",
        name: "A",
        models: [
          { kind: "model", model: "a" },
          { kind: "model", model: "b" },
        ],
      },
      [
        {
          ...member("a"),
          context_length: 100000,
          max_output_tokens: 2000,
          capabilities: { tool_calling: true },
        },
        {
          ...member("b"),
          context_length: 50000,
          max_output_tokens: 1000,
          capabilities: { tool_calling: false },
        },
      ],
      "omniroute",
      "https://gw.example.com"
    );
    assert.equal(m.limit.context, 50000);
    assert.equal(m.limit.output, 1000);
    assert.equal(m.capabilities.toolcall, false);
    assert.equal(m.api.id, "openai-compatible");
  });
  it("empty members short-circuit to all-false capabilities", () => {
    const m = mapComboToModelV2({ id: "combo-empty" }, [], "omniroute", "https://gw.example.com");
    assert.equal(m.capabilities.toolcall, false);
    assert.equal(m.capabilities.reasoning, false);
  });
  it("stamps the api block via resolveApiBlockV2 (openai-compatible by default)", () => {
    const m = mapComboToModelV2(
      { id: "combo-a", models: [{ kind: "model", model: "a" }] },
      [{ ...member("a") }],
      "omniroute",
      "https://gw.example.com"
    );
    assert.deepEqual(m.api, {
      id: "openai-compatible",
      url: "https://gw.example.com/v1",
      npm: "@ai-sdk/openai-compatible",
    });
  });
  it("routes an allowlisted combo id to anthropic even with mixed members", () => {
    const m = mapComboToModelV2(
      { id: "combo-a", models: [{ kind: "model", model: "gpt-x" }] },
      [{ ...member("gpt-x") }],
      "omniroute",
      "https://gw.example.com",
      { allowAnthropic: true, anthropicModels: ["combo-a"] }
    );
    assert.deepEqual(m.api, {
      id: "anthropic",
      url: "https://gw.example.com",
      npm: "@ai-sdk/anthropic",
    });
  });
});
