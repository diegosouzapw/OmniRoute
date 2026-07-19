import test from "node:test";
import assert from "node:assert/strict";

// #6951 — Codex Responses API strict mode forces every tool property into
// `required`, so the model always emits *some* value for "optional" params.
// `stripEmptyOptionalToolArgs` (open-sse/translator/response/openai-responses/pureHelpers.ts)
// used to be an allowlist of 2 tool names that only stripped empty-string/empty-array
// values, so a forced non-empty value on a non-allowlisted tool (or a schema-declared
// default value) was always forwarded verbatim to the client. This test proves the
// schema-aware normalization (drop-if-default, generalized drop-if-empty) added for #6951,
// and the end-to-end schema threading from the request's `tools[]` into the streaming
// call sites in `openai-responses.ts` (response.output_item.done handling).

const { stripEmptyOptionalToolArgs } = await import(
  "../../open-sse/translator/response/openai-responses/pureHelpers.ts"
);
const { extractToolSchemaMap } = await import(
  "../../open-sse/translator/response/openai-responses/toolSchemas.ts"
);
const { openaiResponsesToOpenAIResponse } = await import(
  "../../open-sse/translator/response/openai-responses.ts"
);

const AGENT_SCHEMA = {
  type: "object",
  properties: {
    description: { type: "string" },
    prompt: { type: "string" },
    subagent_type: { type: "string" },
    model: { type: "string" },
    run_in_background: { type: "boolean" },
    isolation: { type: "string", enum: ["local", "remote"], default: "local" },
    cloud_base_branch: { type: "string" },
  },
  // Responses API strict mode: every property is required, even "optional" ones.
  required: [
    "description",
    "prompt",
    "subagent_type",
    "model",
    "run_in_background",
    "isolation",
    "cloud_base_branch",
  ],
};

test("6951: drop-if-default — forced value equal to the schema default is stripped", () => {
  const raw = JSON.stringify({
    description: "x",
    prompt: "y",
    subagent_type: "claude",
    model: "sonnet",
    run_in_background: false,
    isolation: "local", // matches schema default -> indistinguishable from omission
    cloud_base_branch: "",
  });
  const cleaned = JSON.parse(stripEmptyOptionalToolArgs(raw, "Agent", AGENT_SCHEMA));
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned, "isolation"), false);
  // cloud_base_branch is required by this schema -> must NOT be stripped just for being empty.
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned, "cloud_base_branch"), true);
});

test("6951: generalized drop-if-empty — empty optional prop stripped for ANY tool when not in schema.required", () => {
  const schema = {
    type: "object",
    properties: { note: { type: "string" }, tags: { type: "array" } },
    required: [], // both optional
  };
  const raw = JSON.stringify({ note: "", tags: [] });
  const cleaned = JSON.parse(stripEmptyOptionalToolArgs(raw, "SomeOtherTool", schema));
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned, "note"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned, "tags"), false);
});

test("6951: required-by-schema empty prop is preserved (safety — not indistinguishable from omission)", () => {
  const schema = {
    type: "object",
    properties: { note: { type: "string" } },
    required: ["note"],
  };
  const raw = JSON.stringify({ note: "" });
  const cleaned = JSON.parse(stripEmptyOptionalToolArgs(raw, "SomeOtherTool", schema));
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned, "note"), true);
});

test("6951: no schema supplied — behavior unchanged (allowlist + empty-only, backward compatible)", () => {
  const raw = JSON.stringify({ query: "", tags: [] });
  assert.equal(stripEmptyOptionalToolArgs(raw, "SomeOtherTool"), raw);
});

test("6951: extractToolSchemaMap builds a name->schema map from Chat Completions tools[]", () => {
  const body = {
    tools: [
      { type: "function", function: { name: "Agent", parameters: AGENT_SCHEMA } },
      { type: "function", function: { name: "no_schema" } },
    ],
  };
  const map = extractToolSchemaMap(body);
  assert.equal(map?.get("Agent"), AGENT_SCHEMA);
  assert.equal(map?.has("no_schema"), false);
  assert.equal(extractToolSchemaMap({}), null);
});

test("6951: RED->GREEN — schema threaded end-to-end strips the default-valued isolation arg", () => {
  // Simulates createSSEStream's TranslateState carrying `toolSchemas` extracted from the
  // request body, as wired in open-sse/utils/stream.ts.
  const state = { toolSchemas: new Map([["Agent", AGENT_SCHEMA]]) };

  openaiResponsesToOpenAIResponse(
    { type: "response.output_item.added", item: { type: "function_call", call_id: "call_1", name: "Agent" } },
    state
  );
  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_1",
        name: "Agent",
        arguments: JSON.stringify({
          description: "d",
          prompt: "p",
          subagent_type: "claude",
          model: "sonnet",
          run_in_background: false,
          isolation: "local",
          cloud_base_branch: "",
        }),
      },
    },
    state
  );

  const args = JSON.parse(done.choices[0].delta.tool_calls[0].function.arguments);
  assert.equal(Object.prototype.hasOwnProperty.call(args, "isolation"), false);
  assert.equal(args.description, "d");
});
