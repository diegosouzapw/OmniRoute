/**
 * Unit tests for PR #397 — Anthropic-format tools filter fix (#346)
 *
 * Verifies that tools arriving in Anthropic format (`tool.name` without `.function`)
 * are NOT dropped by the empty-name filter in chatCore.ts.
 * Before the fix, ALL anthropic-format tools were silently dropped, causing
 * `400: tool_choice.any may only be specified while providing tools` from Anthropic.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

// Inline the filter logic from chatCore.ts (lines 225-231 after #397 fix)
function filterEmptyNameTools(tools) {
  return tools.filter((tool) => {
    const fn = tool.function;
    const name = fn?.name ?? tool.name;
    return name && String(name).trim().length > 0;
  });
}

describe("tools empty-name filter — #346 / PR #397", () => {
  it("should keep tools with valid OpenAI format name (tool.function.name)", () => {
    const tools = [
      { type: "function", function: { name: "get_weather", description: "Get weather" } },
    ];
    assert.equal(filterEmptyNameTools(tools).length, 1);
  });

  it("should keep tools with valid Anthropic format name (tool.name)", () => {
    const tools = [
      { name: "get_weather", description: "Get weather", input_schema: { type: "object" } },
    ];
    assert.equal(filterEmptyNameTools(tools).length, 1);
  });

  it("should drop tools with empty OpenAI format name (tool.function.name = '')", () => {
    const tools = [{ type: "function", function: { name: "" } }];
    assert.equal(filterEmptyNameTools(tools).length, 0);
  });

  it("should drop tools with empty Anthropic format name (tool.name = '')", () => {
    const tools = [{ name: "", description: "Ghost tool", input_schema: { type: "object" } }];
    assert.equal(filterEmptyNameTools(tools).length, 0);
  });

  it("should NOT drop Anthropic-format tools when function wrapper is absent (regression for PR #397)", () => {
    // Before fix: fn was undefined, fn?.name was undefined, filter returned false → ALL tools dropped
    // After fix: fn?.name ?? tool.name → falls back to tool.name → keeps valid tools
    const tools = [
      {
        name: "search",
        description: "Search the web",
        input_schema: { type: "object", properties: {} },
      },
      { name: "code_exec", description: "Execute code", input_schema: { type: "object" } },
    ];
    const result = filterEmptyNameTools(tools);
    assert.equal(result.length, 2, "Both anthropic-format tools should be preserved");
  });

  it("should handle mixed format tools in the same array", () => {
    const tools = [
      { type: "function", function: { name: "openai_tool" } }, // OpenAI format
      { name: "anthropic_tool", input_schema: { type: "object" } }, // Anthropic format
      { type: "function", function: { name: "" } }, // Empty OpenAI — should be dropped
      { name: "", input_schema: { type: "object" } }, // Empty Anthropic — should be dropped
    ];
    const result = filterEmptyNameTools(tools);
    assert.equal(result.length, 2, "Should keep 2 valid tools (one of each format)");
    assert.ok(
      result.some((t) => t.function?.name === "openai_tool"),
      "OpenAI tool preserved"
    );
    assert.ok(
      result.some((t) => t.name === "anthropic_tool"),
      "Anthropic tool preserved"
    );
  });

  it("should handle tools with whitespace-only names", () => {
    const tools = [{ name: "   ", input_schema: { type: "object" } }];
    assert.equal(filterEmptyNameTools(tools).length, 0);
  });

  it("should handle null/undefined tool.name gracefully", () => {
    const tools = [
      { input_schema: { type: "object" } }, // Neither name nor function
      { name: null, input_schema: { type: "object" } },
    ];
    assert.equal(filterEmptyNameTools(tools).length, 0);
  });
});
