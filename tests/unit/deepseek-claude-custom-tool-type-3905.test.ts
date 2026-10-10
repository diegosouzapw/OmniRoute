import test from "node:test";
import assert from "node:assert/strict";

// DeepSeek's Anthropic-compatible endpoint (api.deepseek.com/anthropic) only accepts
// versioned Claude tool types (web_search_20250305 / web_search_20260209); plain tools
// must omit `type`. Backfilling `type: "custom"` (#2195, needed by MiniMax) makes every
// Claude-format DeepSeek request with tools fail with HTTP 400
// "tools[0]: unknown variant `custom`". (port from 9router#3905 / 9router#3952)

const { normalizeClaudeToolsForDispatch } =
  await import("../../open-sse/handlers/chatCore/claudeToolDefaults.ts");

type Tool = Record<string, unknown>;

test("deepseek: does NOT backfill type:'custom' on typeless tools", () => {
  const tools = [{ name: "get_weather", description: "Get weather", input_schema: {} }];
  const out = normalizeClaudeToolsForDispatch(tools, "deepseek") as Tool[];
  assert.equal(out[0].type, undefined, "no type:'custom' may be injected for deepseek");
  assert.equal(out[0].name, "get_weather");
});

test("deepseek: strips a client-declared type:'custom', keeping versioned types", () => {
  const tools = [
    { type: "custom", name: "plain", input_schema: { type: "object" } },
    { type: "web_search_20250305", name: "web_search" },
  ];
  const out = normalizeClaudeToolsForDispatch(tools, "deepseek") as Tool[];
  assert.equal(out[0].type, undefined, "type:'custom' must be removed for deepseek");
  assert.deepEqual(out[0].input_schema, { type: "object" });
  assert.equal(out[1].type, "web_search_20250305");
});

test("minimax still gets the #2195 type:'custom' default", () => {
  const out = normalizeClaudeToolsForDispatch(
    [{ name: "t", input_schema: {} }],
    "minimax"
  ) as Tool[];
  assert.equal(out[0].type, "custom");
});

test("agentrouter still strips type:'custom'", () => {
  const out = normalizeClaudeToolsForDispatch(
    [{ type: "custom", name: "t" }, { name: "u" }],
    "agentrouter"
  ) as Tool[];
  assert.equal(out[0].type, undefined);
  assert.equal(out[1].type, undefined);
});
