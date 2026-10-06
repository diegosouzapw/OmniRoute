import test from "node:test";
import assert from "node:assert/strict";

// OpenCode `subagent.sessionID` is an optional plain string. Absence means "spawn a
// new child". Responses/Codex strict mode forces every declared property into
// `required`, so models invent fillers (`ses_`, `ses_new`, parent IDs) unless
// OmniRoute offers `null` as the omission sentinel and strips it before the client
// sees the tool call. This is the string counterpart of the #7023 enum sentinel.

const { injectOptionalStringOmissionSentinel, injectOptionalStringOmissionForTools } =
  await import("../../open-sse/translator/helpers/schemaCoercion.ts");
const { stripEmptyOptionalToolArgs } =
  await import("../../open-sse/translator/response/openai-responses/pureHelpers.ts");
const { openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");
const { translateRequest } = await import("../../open-sse/translator/index.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { extractToolSchemaMap } =
  await import("../../open-sse/translator/response/openai-responses/toolSchemas.ts");

const OMISSION_MARKER = "null = omit this parameter";

const OPENCODE_SUBAGENT_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    agent: { type: "string" },
    description: { type: "string" },
    prompt: { type: "string" },
    sessionID: {
      type: "string",
      description: "Continue a specific previous subagent conversation",
    },
    background: { type: "boolean" },
  },
  required: ["agent", "description", "prompt"],
};

const SUBAGENT_TOOL_CHAT = {
  type: "function",
  function: {
    name: "subagent",
    parameters: structuredClone(OPENCODE_SUBAGENT_SCHEMA),
  },
};

const SUBAGENT_TOOL_RESPONSES = {
  type: "function",
  name: "subagent",
  parameters: structuredClone(OPENCODE_SUBAGENT_SCHEMA),
};

const NATIVE_CUSTOM_TOOL = {
  type: "custom",
  name: "apply_patch",
  format: { type: "grammar", syntax: "lark", definition: "start: /.+/ " },
};

function findTool(tools, name) {
  return tools.find((t) => t?.name === name || t?.function?.name === name);
}

function toolParameters(tool) {
  return tool.parameters ?? tool.function?.parameters ?? tool.input_schema;
}

function sessionIdSchema(params) {
  return params.properties.sessionID;
}

function assertOmissionSentinel(prop) {
  assert.deepEqual(prop.type, ["string", "null"]);
  assert.match(
    prop.description,
    new RegExp(OMISSION_MARKER.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  );
  assert.equal(Array.isArray(prop.enum), false);
}

function collectArgs(chunks) {
  const list = Array.isArray(chunks) ? chunks : chunks ? [chunks] : [];
  let raw = "";
  let finishReason = null;
  for (const chunk of list) {
    const choice = chunk?.choices?.[0];
    if (!choice) continue;
    const args = choice.delta?.tool_calls?.[0]?.function?.arguments;
    if (typeof args === "string") raw += args;
    if (choice.finish_reason) finishReason = choice.finish_reason;
  }
  return { raw, finishReason, parsed: raw ? JSON.parse(raw) : null };
}

test("RED: translateRequest OpenAI→Responses widens optional default-less sessionID", () => {
  const body = {
    model: "gpt-5.1-codex",
    messages: [{ role: "user", content: "hi" }],
    tools: [structuredClone(SUBAGENT_TOOL_CHAT)],
  };

  const toResponses = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.1-codex",
    structuredClone(body)
  );
  const tool = findTool(toResponses.tools, "subagent");
  const params = toolParameters(tool);
  assertOmissionSentinel(sessionIdSchema(params));
  assert.equal(params.properties.agent.type, "string");
  assert.equal(params.properties.background.type, "boolean");
  assert.deepEqual(params.required, ["agent", "description", "prompt"]);
});

test("RED: same-format Responses applies string omission without flattening native tools", () => {
  const body = {
    model: "gpt-5.1-codex",
    input: [{ role: "user", content: "hi" }],
    tools: [structuredClone(SUBAGENT_TOOL_RESPONSES), structuredClone(NATIVE_CUSTOM_TOOL)],
  };

  const sameFormat = translateRequest(
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.1-codex",
    structuredClone(body)
  );
  const functionTool = findTool(sameFormat.tools, "subagent");
  assertOmissionSentinel(sessionIdSchema(toolParameters(functionTool)));

  const custom = sameFormat.tools.find((t) => t.name === "apply_patch");
  assert.equal(custom.type, "custom");
  assert.deepEqual(custom.format, NATIVE_CUSTOM_TOOL.format);
  assert.equal(custom.parameters, undefined);
});

test("characterization: non-Responses target leaves sessionID unchanged", () => {
  const body = {
    model: "claude-3-7-sonnet",
    messages: [{ role: "user", content: "hi" }],
    tools: [structuredClone(SUBAGENT_TOOL_CHAT)],
  };
  const toClaude = translateRequest(
    FORMATS.OPENAI,
    FORMATS.CLAUDE,
    "claude-3-7-sonnet",
    structuredClone(body)
  );
  const tool = toClaude.tools.find((t) => String(t.name).includes("subagent"));
  const schema = toolParameters(tool);
  assert.equal(schema.properties.sessionID.type, "string");
  assert.equal(
    String(schema.properties.sessionID.description || "").includes(OMISSION_MARKER),
    false
  );
});

test("characterization: required string stays non-nullable; unmarked required null is kept", () => {
  const requiredOnly = injectOptionalStringOmissionSentinel({
    type: "object",
    properties: { sessionID: { type: "string" } },
    required: ["sessionID"],
  });
  assert.equal(requiredOnly.properties.sessionID.type, "string");

  const requiredNull = stripEmptyOptionalToolArgs(
    { sessionID: null, agent: "explore" },
    "subagent",
    {
      type: "object",
      properties: { sessionID: { type: "string" }, agent: { type: "string" } },
      required: ["sessionID", "agent"],
    }
  );
  assert.equal(Object.prototype.hasOwnProperty.call(requiredNull, "sessionID"), true);
  assert.equal(requiredNull.sessionID, null);
});

test("characterization: optional string with default stays unsentinelled through translateRequest", () => {
  const body = {
    model: "gpt-5.1-codex",
    messages: [{ role: "user", content: "hi" }],
    tools: [
      {
        type: "function",
        function: {
          name: "subagent",
          parameters: {
            type: "object",
            properties: {
              agent: { type: "string" },
              sessionID: { type: "string", default: "" },
            },
            required: ["agent"],
          },
        },
      },
    ],
  };
  const toResponses = translateRequest(
    FORMATS.OPENAI,
    FORMATS.OPENAI_RESPONSES,
    "gpt-5.1-codex",
    structuredClone(body)
  );
  const params = toolParameters(findTool(toResponses.tools, "subagent"));
  assert.equal(params.properties.sessionID.type, "string");
  assert.equal(
    String(params.properties.sessionID.description || "").includes(OMISSION_MARKER),
    false
  );
});

test("characterization: optional unmarked null is already stripped; real IDs are kept", () => {
  const optionalSchema = structuredClone(OPENCODE_SUBAGENT_SCHEMA);
  const stripped = stripEmptyOptionalToolArgs(
    {
      agent: "explore",
      description: "spawn",
      prompt: "do work",
      sessionID: null,
    },
    "subagent",
    optionalSchema
  );
  assert.equal(Object.prototype.hasOwnProperty.call(stripped, "sessionID"), false);

  const kept = stripEmptyOptionalToolArgs(
    {
      agent: "explore",
      description: "continue",
      prompt: "do work",
      sessionID: "ses_valid_child",
    },
    "subagent",
    optionalSchema
  );
  assert.equal(kept.sessionID, "ses_valid_child");
});

test("RED: strictified required sessionID with OmniRoute marker still drops null", () => {
  const strictified = {
    type: "object",
    additionalProperties: false,
    properties: {
      agent: { type: "string" },
      description: { type: "string" },
      prompt: { type: "string" },
      sessionID: {
        type: ["string", "null"],
        description: `Continue a specific previous subagent conversation (${OMISSION_MARKER})`,
      },
      background: { type: "boolean" },
    },
    required: ["agent", "description", "prompt", "sessionID", "background"],
  };
  const stripped = stripEmptyOptionalToolArgs(
    {
      agent: "explore",
      description: "spawn",
      prompt: "do work",
      sessionID: null,
    },
    "subagent",
    strictified
  );
  assert.equal(Object.prototype.hasOwnProperty.call(stripped, "sessionID"), false);
  assert.equal(stripped.agent, "explore");
});

test("characterization: empty sessionID is stripped; nested optional strings are not widened", () => {
  const emptyStripped = stripEmptyOptionalToolArgs(
    {
      agent: "explore",
      description: "spawn",
      prompt: "do work",
      sessionID: "",
    },
    "subagent",
    OPENCODE_SUBAGENT_SCHEMA
  );
  assert.equal(Object.prototype.hasOwnProperty.call(emptyStripped, "sessionID"), false);

  const nested = injectOptionalStringOmissionSentinel({
    type: "object",
    properties: {
      items: {
        type: "array",
        items: {
          type: "object",
          properties: { sessionID: { type: "string" } },
          required: [],
        },
      },
      wrapper: {
        anyOf: [{ type: "object", properties: { sessionID: { type: "string" } } }],
      },
      $defs: {
        child: { type: "object", properties: { sessionID: { type: "string" } } },
      },
    },
    required: [],
  });
  assert.equal(nested.properties.items.items.properties.sessionID.type, "string");
  assert.equal(nested.properties.wrapper.anyOf[0].properties.sessionID.type, "string");
  assert.equal(nested.properties.$defs.child.properties.sessionID.type, "string");

  const mixedUnion = injectOptionalStringOmissionSentinel({
    type: "object",
    properties: { value: { type: ["string", "number"] } },
    required: [],
  });
  assert.deepEqual(mixedUnion.properties.value.type, ["string", "number"]);
});

test("characterization: string omission injection is idempotent", () => {
  const once = injectOptionalStringOmissionSentinel(structuredClone(OPENCODE_SUBAGENT_SCHEMA));
  const twice = injectOptionalStringOmissionSentinel(once);
  assertOmissionSentinel(sessionIdSchema(twice));
  assert.equal(twice.properties.sessionID.description.split(OMISSION_MARKER).length - 1, 1);
  const toolsOnce = injectOptionalStringOmissionForTools([
    structuredClone(SUBAGENT_TOOL_RESPONSES),
  ]);
  const toolsTwice = injectOptionalStringOmissionForTools(toolsOnce);
  assertOmissionSentinel(toolParameters(toolsTwice[0]).properties.sessionID);
});

test("characterization: fragmented deltas + output_item.done emit cleaned lowercase subagent args", () => {
  const schema = {
    type: "object",
    properties: {
      agent: { type: "string" },
      description: { type: "string" },
      prompt: { type: "string" },
      sessionID: {
        type: ["string", "null"],
        description: `Continue a specific previous subagent conversation (${OMISSION_MARKER})`,
      },
    },
    required: ["agent", "description", "prompt"],
  };
  const state = { toolSchemas: new Map([["subagent", schema]]) };
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_1", name: "subagent" },
    },
    state
  );
  const raw = JSON.stringify({
    agent: "explore",
    description: "spawn",
    prompt: "do work",
    sessionID: null,
  });
  const firstDelta = openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", delta: raw.slice(0, 40) },
    state
  );
  const secondDelta = openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", delta: raw.slice(40) },
    state
  );
  const done = openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.done",
      item: { type: "function_call", call_id: "call_1", name: "subagent", arguments: raw },
    },
    state
  );

  assert.equal(firstDelta, null);
  assert.equal(secondDelta, null);
  const args = JSON.parse(done.choices[0].delta.tool_calls[0].function.arguments);
  assert.equal(Object.prototype.hasOwnProperty.call(args, "sessionID"), false);
  assert.equal(args.agent, "explore");
  assert.equal(args.prompt, "do work");
});

test("RED: incomplete-stream flush emits cleaned lowercase subagent arguments", () => {
  const schema = {
    type: "object",
    properties: {
      agent: { type: "string" },
      description: { type: "string" },
      prompt: { type: "string" },
      sessionID: {
        type: ["string", "null"],
        description: `Continue a specific previous subagent conversation (${OMISSION_MARKER})`,
      },
    },
    required: ["agent", "description", "prompt"],
  };
  const state = { toolSchemas: new Map([["subagent", schema]]) };
  openaiResponsesToOpenAIResponse(
    {
      type: "response.output_item.added",
      item: { type: "function_call", call_id: "call_1", name: "subagent" },
    },
    state
  );
  const raw = JSON.stringify({
    agent: "explore",
    description: "spawn",
    prompt: "do work",
    sessionID: null,
  });
  openaiResponsesToOpenAIResponse(
    { type: "response.function_call_arguments.delta", delta: raw },
    state
  );
  const flushed = openaiResponsesToOpenAIResponse(null, state);
  const { parsed, finishReason } = collectArgs(flushed);
  assert.ok(parsed);
  assert.equal(Object.prototype.hasOwnProperty.call(parsed, "sessionID"), false);
  assert.equal(parsed.agent, "explore");
  assert.equal(finishReason, "tool_calls");
});

test("RED: non-streaming Responses translation drops sessionID null when given the schema", () => {
  const schema = {
    type: "object",
    properties: {
      agent: { type: "string" },
      description: { type: "string" },
      prompt: { type: "string" },
      sessionID: {
        type: ["string", "null"],
        description: `Continue a specific previous subagent conversation (${OMISSION_MARKER})`,
      },
    },
    required: ["agent", "description", "prompt", "sessionID"],
  };
  const responseBody = {
    id: "resp_1",
    object: "response",
    output: [
      {
        type: "function_call",
        call_id: "call_1",
        name: "subagent",
        arguments: JSON.stringify({
          agent: "explore",
          description: "spawn",
          prompt: "do work",
          sessionID: null,
        }),
      },
    ],
  };
  const translated = translateNonStreamingResponse(
    responseBody,
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    null,
    new Map([["subagent", schema]])
  );
  const args = JSON.parse(translated.choices[0].message.tool_calls[0].function.arguments);
  assert.equal(Object.prototype.hasOwnProperty.call(args, "sessionID"), false);
  assert.equal(args.agent, "explore");
});

test("characterization: non-streaming keeps a real sessionID and legacy empty cleanup without schema", () => {
  const withId = translateNonStreamingResponse(
    {
      id: "resp_2",
      object: "response",
      output: [
        {
          type: "function_call",
          call_id: "call_2",
          name: "subagent",
          arguments: JSON.stringify({
            agent: "explore",
            description: "continue",
            prompt: "do work",
            sessionID: "ses_valid_child",
          }),
        },
      ],
    },
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI
  );
  const kept = JSON.parse(withId.choices[0].message.tool_calls[0].function.arguments);
  assert.equal(kept.sessionID, "ses_valid_child");

  const noSchema = translateNonStreamingResponse(
    {
      id: "resp_3",
      object: "response",
      output: [
        {
          type: "function_call",
          call_id: "call_3",
          name: "other",
          arguments: { note: "", tags: [] },
        },
      ],
    },
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI
  );
  const cleaned = JSON.parse(noSchema.choices[0].message.tool_calls[0].function.arguments);
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned, "note"), false);
  assert.equal(Object.prototype.hasOwnProperty.call(cleaned, "tags"), false);
});

test("characterization: extractToolSchemaMap still keys OpenCode subagent by lowercase name", () => {
  const map = extractToolSchemaMap({ tools: [structuredClone(SUBAGENT_TOOL_RESPONSES)] });
  assert.ok(map?.has("subagent"));
  assert.equal(map.get("subagent").properties.sessionID.type, "string");
});
