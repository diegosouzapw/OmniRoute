import test from "node:test";
import assert from "node:assert/strict";

// Port of 9router#2196 (fixes #2195): Claude's tool schema requires each tool to
// carry an explicit `type` discriminator. Anthropic's first-party API infers
// "custom" when omitted, but strict Anthropic-compatible gateways (e.g. MiniMax)
// reject the payload with HTTP 400. defaultClaudeToolType() backfills the missing
// `type` so legacy Claude-format tool definitions survive strict gateways.

const { defaultClaudeToolType } = await import(
  "../../open-sse/handlers/chatCore/claudeToolDefaults.ts"
);

test("backfills type:'custom' on a Claude tool missing the type field", () => {
  const tools = [
    { name: "get_weather", description: "Get weather", input_schema: { type: "object" } },
  ];
  const out = defaultClaudeToolType(tools) as Array<Record<string, unknown>>;
  assert.equal(out[0].type, "custom");
  // Other fields are preserved untouched.
  assert.equal(out[0].name, "get_weather");
  assert.equal(out[0].description, "Get weather");
  assert.deepEqual(out[0].input_schema, { type: "object" });
});

test("leaves tools that already declare a type untouched", () => {
  const tools = [
    { type: "custom", name: "a", input_schema: {} },
    { type: "computer_20241022", name: "computer" },
    { type: "bash_20241022", name: "bash" },
  ];
  const out = defaultClaudeToolType(tools) as Array<Record<string, unknown>>;
  assert.deepEqual(
    out.map((t) => t.type),
    ["custom", "computer_20241022", "bash_20241022"]
  );
  // Non-custom built-in tool types must be preserved, not overwritten.
  assert.equal(out[1].type, "computer_20241022");
});

test("normalizes a mixed array — only the type-less entries get defaulted", () => {
  const tools = [
    { type: "computer_20241022", name: "computer" },
    { name: "get_weather", input_schema: {} },
  ];
  const out = defaultClaudeToolType(tools) as Array<Record<string, unknown>>;
  assert.equal(out[0].type, "computer_20241022");
  assert.equal(out[1].type, "custom");
});

test("returns non-array input unchanged (no tools / undefined)", () => {
  assert.equal(defaultClaudeToolType(undefined), undefined);
  assert.equal(defaultClaudeToolType(null), null);
  const obj = { not: "an array" };
  assert.equal(defaultClaudeToolType(obj), obj);
});

test("does not mutate the original tool objects (returns new entries for defaulted tools)", () => {
  const original = { name: "x", input_schema: {} };
  const tools = [original];
  const out = defaultClaudeToolType(tools) as Array<Record<string, unknown>>;
  assert.equal(original.type, undefined, "original tool must stay untouched");
  assert.equal(out[0].type, "custom");
});
