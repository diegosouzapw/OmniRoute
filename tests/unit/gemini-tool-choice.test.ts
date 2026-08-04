import test from "node:test";
import assert from "node:assert/strict";

// tool_choice was never read anywhere in the OpenAI -> Gemini request translator —
// result.toolConfig was unconditionally hardcoded to { mode: "VALIDATED" } whenever
// tools were present, regardless of what the caller sent. VALIDATED allows the model
// to respond with plain text OR a (schema-validated) function call at its own
// discretion; it never FORCES a call the way OpenAI's tool_choice: "required" (Gemini's
// ANY mode) does. Investigating a live report that gemini-3.1-flash-lite frequently
// narrates an intended tool call in plain text instead of emitting one (dashboard log
// id 1784591483850-49c408, zero functionCall parts, finishReason STOP, nothing but
// prose) surfaced that tool_choice: "required" had no way to reach Gemini at all —
// this is the fix, and the mechanism the live test compares against a baseline.

const { openaiToGeminiRequest, openaiToCloudCodeGeminiRequest } =
  await import("../../open-sse/translator/request/openai-to-gemini.ts");

type ToolConfigResult = {
  toolConfig?: { functionCallingConfig: { mode: string; allowedFunctionNames?: string[] } };
};

const SAMPLE_TOOLS = [
  {
    type: "function",
    function: { name: "run_command", description: "Run a shell command", parameters: {} },
  },
];

function baseBody(toolChoice?: unknown) {
  return {
    messages: [{ role: "user", content: "hi" }],
    tools: SAMPLE_TOOLS,
    ...(toolChoice !== undefined ? { tool_choice: toolChoice } : {}),
  };
}

test("no tool_choice (unset) keeps the existing VALIDATED default — no behavior change", () => {
  const result = openaiToGeminiRequest("gemini-2.5-pro", baseBody(), false) as ToolConfigResult;
  assert.equal(result.toolConfig?.functionCallingConfig.mode, "VALIDATED");
});

test('tool_choice: "auto" maps to VALIDATED (same as unset)', () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    baseBody("auto"),
    false
  ) as ToolConfigResult;
  assert.equal(result.toolConfig?.functionCallingConfig.mode, "VALIDATED");
});

test('tool_choice: "required" maps to Gemini ANY mode (forces a function call)', () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    baseBody("required"),
    false
  ) as ToolConfigResult;
  assert.equal(result.toolConfig?.functionCallingConfig.mode, "ANY");
});

test('tool_choice: "any" (OpenAI-compatible alias) also maps to ANY', () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    baseBody("any"),
    false
  ) as ToolConfigResult;
  assert.equal(result.toolConfig?.functionCallingConfig.mode, "ANY");
});

test('tool_choice: "none" maps to Gemini NONE mode (disables function calling)', () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    baseBody("none"),
    false
  ) as ToolConfigResult;
  assert.equal(result.toolConfig?.functionCallingConfig.mode, "NONE");
});

test("tool_choice forcing a specific function maps to ANY with allowedFunctionNames", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    baseBody({ type: "function", function: { name: "run_command" } }),
    false
  ) as ToolConfigResult;
  assert.equal(result.toolConfig?.functionCallingConfig.mode, "ANY");
  assert.deepEqual(result.toolConfig?.functionCallingConfig.allowedFunctionNames, ["run_command"]);
});

test("no tools present: toolConfig is not set regardless of tool_choice", () => {
  const result = openaiToGeminiRequest(
    "gemini-2.5-pro",
    { messages: [{ role: "user", content: "hi" }], tool_choice: "required" },
    false
  ) as ToolConfigResult;
  assert.equal(result.toolConfig, undefined);
});

// Antigravity / Cloud Code envelope path (wrapInCloudCodeEnvelope) previously
// re-derived its own hardcoded VALIDATED independently of the base translator —
// it now reuses whatever openaiToGeminiBase already computed from tool_choice.
test("Antigravity/Cloud Code path also honors tool_choice: required", () => {
  const result = openaiToCloudCodeGeminiRequest(
    "gemini-2.5-pro",
    baseBody("required"),
    false
  ) as ToolConfigResult;
  assert.equal(result.toolConfig?.functionCallingConfig.mode, "ANY");
});

test("Antigravity/Cloud Code path defaults to VALIDATED when tool_choice is unset (no regression)", () => {
  const result = openaiToCloudCodeGeminiRequest(
    "gemini-2.5-pro",
    baseBody(),
    false
  ) as ToolConfigResult;
  assert.equal(result.toolConfig?.functionCallingConfig.mode, "VALIDATED");
});
