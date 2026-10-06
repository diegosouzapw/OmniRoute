import test from "node:test";
import assert from "node:assert/strict";

// AgentRouter's upstream (New-API, Rust serde) only accepts versioned Claude tool
// types (web_search_20250305 / web_search_20260209); plain tools must omit `type`
// entirely. A tool carrying `type: "custom"` — whether client-declared (Claude
// Code v2.1+) or backfilled by defaultClaudeToolType() (#2195, MiniMax) — is a
// hard 400 "unknown variant `custom`" that crashes the client session.
// normalizeClaudeToolsForDispatch() routes per provider: agentrouter strips the
// custom discriminator, every other Claude-format target keeps the #2195 default.

const { normalizeClaudeToolsForDispatch } = await import(
  "../../open-sse/handlers/chatCore/claudeToolDefaults.ts"
);

test("agentrouter: strips an explicit type:'custom' discriminator, preserving all other fields", () => {
  const tools = [
    {
      type: "custom",
      name: "get_weather",
      description: "Get weather",
      input_schema: { type: "object", properties: {} },
    },
  ];
  const out = normalizeClaudeToolsForDispatch(tools, "agentrouter") as Array<
    Record<string, unknown>
  >;
  assert.equal(out[0].type, undefined, "type:'custom' must be removed");
  assert.equal(out[0].name, "get_weather");
  assert.equal(out[0].description, "Get weather");
  assert.deepEqual(out[0].input_schema, { type: "object", properties: {} });
});

test("agentrouter: does NOT default a missing type (typeless tools stay typeless)", () => {
  const tools = [{ name: "get_weather", description: "Get weather", input_schema: {} }];
  const out = normalizeClaudeToolsForDispatch(tools, "agentrouter") as Array<
    Record<string, unknown>
  >;
  assert.equal(out[0].type, undefined, "no type:'custom' may be backfilled for agentrouter");
});

test("agentrouter: preserves versioned/built-in tool types (only 'custom' is stripped)", () => {
  const tools = [
    { type: "web_search_20260209", name: "web_search" },
    { type: "computer_20241022", name: "computer" },
    { type: "custom", name: "plain" },
    { name: "typeless" },
  ];
  const out = normalizeClaudeToolsForDispatch(tools, "agentrouter") as Array<
    Record<string, unknown>
  >;
  assert.equal(out[0].type, "web_search_20260209");
  assert.equal(out[1].type, "computer_20241022");
  assert.equal(out[2].type, undefined, "custom is stripped");
  assert.equal(out[3].type, undefined, "typeless stays typeless");
});

test("non-agentrouter providers keep the #2195 behavior: missing type defaults to 'custom'", () => {
  const tools = [{ name: "get_weather", input_schema: {} }];
  for (const provider of ["minimax", "anthropic", "some-gateway"]) {
    const out = normalizeClaudeToolsForDispatch(tools, provider) as Array<
      Record<string, unknown>
    >;
    assert.equal(out[0].type, "custom", `${provider} must keep the MiniMax #2195 default`);
  }
});

test("non-agentrouter providers leave an explicit type:'custom' untouched", () => {
  const tools = [{ type: "custom", name: "a", input_schema: {} }];
  const out = normalizeClaudeToolsForDispatch(tools, "minimax") as Array<
    Record<string, unknown>
  >;
  assert.equal(out[0].type, "custom");
});

test("returns non-array input unchanged for any provider", () => {
  assert.equal(normalizeClaudeToolsForDispatch(undefined, "agentrouter"), undefined);
  assert.equal(normalizeClaudeToolsForDispatch(null, "agentrouter"), null);
  const obj = { not: "an array" };
  assert.equal(normalizeClaudeToolsForDispatch(obj, "agentrouter"), obj);
  assert.equal(normalizeClaudeToolsForDispatch(obj, "minimax"), obj);
});

test("does not mutate the original tool objects", () => {
  const explicit = { type: "custom", name: "x", input_schema: {} };
  const typeless = { name: "y", input_schema: {} };
  const out = normalizeClaudeToolsForDispatch([explicit, typeless], "agentrouter") as Array<
    Record<string, unknown>
  >;
  assert.equal(explicit.type, "custom", "original explicit tool must stay untouched");
  assert.equal(typeless.type, undefined, "original typeless tool must stay untouched");
  assert.equal(out[0].type, undefined);
});

test("passes non-object array entries through unchanged (no garbage wrapping)", () => {
  const tools = [
    { type: "custom", name: "real_tool", input_schema: {} }, // object → stripped
    null,
    "weird",
    42,
  ];
  const out = normalizeClaudeToolsForDispatch(tools, "agentrouter") as unknown[];
  assert.equal((out[0] as Record<string, unknown>).type, undefined, "real object gets stripped");
  assert.equal(out[1], null, "null passes through unchanged");
  assert.equal(out[2], "weird", "string passes through unchanged");
  assert.equal(out[3], 42, "number passes through unchanged");
});
