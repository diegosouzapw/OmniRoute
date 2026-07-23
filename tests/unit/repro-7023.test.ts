import test from "node:test";
import assert from "node:assert/strict";

// #7023 — deferred 3rd op from #6951/#6992. Codex Responses API strict mode forces
// every tool property into `required`, so a model that intends to OMIT an optional
// enum property (no declared `default`) must still emit *some* concrete value (e.g.
// `Agent.isolation: "remote"`). Neither #6992 op catches this: `drop-if-default` needs
// a declared default (none exists here); `drop-if-empty` needs an empty string/array
// (the emitted value is non-empty). This test proves the paired request/response
// transform: request-side widens optional enum properties to accept `null` (OpenAI's
// own documented nullable-union idiom for this exact strict-mode limitation), and
// response-side drops the key when the model emits `null` for a non-required property.

const { injectOptionalEnumOmissionSentinel, injectOptionalEnumOmissionForTools } = await import(
  "../../open-sse/translator/helpers/schemaCoercion.ts"
);
const { stripEmptyOptionalToolArgs } = await import(
  "../../open-sse/translator/response/openai-responses/pureHelpers.ts"
);
const { openaiResponsesToOpenAIResponse } = await import(
  "../../open-sse/translator/response/openai-responses.ts"
);
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const AGENT_SCHEMA = {
  type: "object",
  properties: {
    description: { type: "string" },
    isolation: { type: "string", enum: ["worktree", "remote"] },
  },
  required: ["description", "isolation"],
};

test("7023: injectOptionalEnumOmissionSentinel widens a no-default enum property not in required", () => {
  const schema = {
    type: "object",
    properties: {
      isolation: { type: "string", enum: ["worktree", "remote"] },
    },
    required: [],
  };
  const result = injectOptionalEnumOmissionSentinel(schema);
  assert.deepEqual(result.properties.isolation.enum, ["worktree", "remote", null]);
  assert.deepEqual(result.properties.isolation.type, ["string", "null"]);
  assert.match(result.properties.isolation.description, /null = omit this parameter/);
});

test("7023: injectOptionalEnumOmissionSentinel leaves a required enum property untouched", () => {
  const schema = {
    type: "object",
    properties: { isolation: { type: "string", enum: ["worktree", "remote"] } },
    required: ["isolation"],
  };
  const result = injectOptionalEnumOmissionSentinel(schema);
  assert.deepEqual(result.properties.isolation.enum, ["worktree", "remote"]);
  assert.equal(result.properties.isolation.type, "string");
});

test("7023: injectOptionalEnumOmissionSentinel leaves an enum property with a default untouched", () => {
  const schema = {
    type: "object",
    properties: { isolation: { type: "string", enum: ["worktree", "remote"], default: "worktree" } },
    required: [],
  };
  const result = injectOptionalEnumOmissionSentinel(schema);
  assert.deepEqual(result.properties.isolation.enum, ["worktree", "remote"]);
});

test("7023: injectOptionalEnumOmissionSentinel leaves a non-enum property untouched", () => {
  const schema = {
    type: "object",
    properties: { note: { type: "string" } },
    required: [],
  };
  const result = injectOptionalEnumOmissionSentinel(schema);
  assert.deepEqual(result, schema);
});

test("7023: injectOptionalEnumOmissionForTools transforms Responses-API shaped tools", () => {
  const tools = [
    {
      type: "function",
      name: "Agent",
      parameters: {
        type: "object",
        properties: { isolation: { type: "string", enum: ["worktree", "remote"] } },
        required: [],
      },
    },
  ];
  const result = injectOptionalEnumOmissionForTools(tools);
  assert.deepEqual(result[0].parameters.properties.isolation.enum, ["worktree", "remote", null]);
});

test("7023: injectOptionalEnumOmissionForTools passes non-plain-object entries through unchanged", () => {
  const tools = [null, "not-a-tool"];
  const result = injectOptionalEnumOmissionForTools(tools);
  assert.deepEqual(result, tools);
});

test("7023: translateRequest applies the injection only for targetFormat OPENAI_RESPONSES", () => {
  const body = {
    model: "gpt-5.1-codex",
    messages: [{ role: "user", content: "hi" }],
    tools: [
      {
        type: "function",
        function: {
          name: "Agent",
          parameters: {
            type: "object",
            properties: { isolation: { type: "string", enum: ["worktree", "remote"] } },
            required: [],
          },
        },
      },
    ],
  };

  const toResponses = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.1-codex",
    JSON.parse(JSON.stringify(body))
  );
  const responsesTool = toResponses.tools.find((t) => t.name === "Agent" || t?.function?.name === "Agent");
  const responsesParams = responsesTool.parameters ?? responsesTool.function?.parameters;
  assert.ok(responsesParams.properties.isolation.enum.includes(null));

  const toClaude = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    "claude-3-7-sonnet",
    JSON.parse(JSON.stringify(body))
  );
  const claudeTool = toClaude.tools.find((t) => String(t.name).includes("Agent"));
  const claudeSchema = claudeTool.input_schema ?? claudeTool.function?.parameters;
  assert.equal(claudeSchema.properties.isolation.enum.includes(null), false);
});

const AGENT_SCHEMA_OPTIONAL = {
  type: "object",
  properties: {
    description: { type: "string" },
    isolation: { type: ["string", "null"], enum: ["worktree", "remote", null] },
  },
  required: ["description"],
};

test("7023: stripEmptyOptionalToolArgs drops a null value for a non-required, schema-declared property", () => {
  const raw = JSON.stringify({ description: "d", isolation: null });
  const cleaned = JSON.parse(stripEmptyOptionalToolArgs(raw, "Agent", AGENT_SCHEMA_OPTIONAL));
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned, "isolation"), false);
  assert.equal(cleaned.description, "d");
});

test("7023: stripEmptyOptionalToolArgs preserves null for a required property (never drop what the schema demands)", () => {
  const schema = {
    type: "object",
    properties: { note: { type: ["string", "null"] } },
    required: ["note"],
  };
  const raw = JSON.stringify({ note: null });
  const cleaned = JSON.parse(stripEmptyOptionalToolArgs(raw, "SomeTool", schema));
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned, "note"), true);
});

test("7023: acceptance — codex Agent call emits isolation:null (post-injection idiom) -> client-visible call has no isolation key", () => {
  const state = { toolSchemas: new Map([["Agent", AGENT_SCHEMA_OPTIONAL]]) };

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
        arguments: JSON.stringify({ description: "no isolation intended", isolation: null }),
      },
    },
    state
  );

  const args = JSON.parse(done.choices[0].delta.tool_calls[0].function.arguments);
  assert.equal(Object.prototype.hasOwnProperty.call(args, "isolation"), false);
  assert.equal(args.description, "no isolation intended");
});

test("7023: negative — a legitimate isolation:'worktree' value is preserved unchanged", () => {
  const state = { toolSchemas: new Map([["Agent", AGENT_SCHEMA_OPTIONAL]]) };

  openaiResponsesToOpenAIResponse(
    { type: "response.output_item.added", item: { type: "function_call", call_id: "call_2", name: "Agent" } },
    state
  );
  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: {
        type: "function_call",
        call_id: "call_2",
        name: "Agent",
        arguments: JSON.stringify({ description: "explicit worktree", isolation: "worktree" }),
      },
    },
    state
  );

  const args = JSON.parse(done.choices[0].delta.tool_calls[0].function.arguments);
  assert.equal(args.isolation, "worktree");
});
