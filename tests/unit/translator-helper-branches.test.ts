import test from "node:test";
import assert from "node:assert/strict";

const schemaCoercion = await import("../../open-sse/translator/helpers/schemaCoercion.ts");
const openaiHelper = await import("../../open-sse/translator/helpers/openaiHelper.ts");
const claudeHelper = await import("../../open-sse/translator/helpers/claudeHelper.ts");
const geminiHelper = await import("../../open-sse/translator/helpers/geminiHelper.ts");
const toolCallHelper = await import("../../open-sse/translator/helpers/toolCallHelper.ts");

const originalMathRandom = Math.random;

test.afterEach(() => {
  Math.random = originalMathRandom;
});

test("schemaCoercion recursively coerces schema numeric fields across object variants", () => {
  const result = schemaCoercion.coerceSchemaNumericFields({
    minimum: "1",
    maxItems: "5",
    properties: {
      nested: {
        minLength: "2",
        items: { maximum: "7" },
      },
    },
    patternProperties: {
      "^x-": { minProperties: "1" },
    },
    definitions: {
      one: { exclusiveMaximum: "9" },
    },
    $defs: {
      two: { minItems: "3" },
    },
    dependentSchemas: {
      dep: { maxProperties: "4" },
    },
    additionalProperties: { maximum: "8" },
    unevaluatedProperties: { minimum: "0" },
    prefixItems: [{ minimum: "11" }],
    anyOf: [{ maximum: "12" }],
    oneOf: [{ minimum: "13" }],
    allOf: [{ maxLength: "14" }],
    not: { minimum: "15" },
    if: { minimum: "16" },
    then: { maximum: "17" },
    else: { minItems: "18" },
  });

  assert.equal(result.minimum, 1);
  assert.equal(result.maxItems, 5);
  assert.equal(result.properties.nested.minLength, 2);
  assert.equal(result.properties.nested.items.maximum, 7);
  assert.equal(result.patternProperties["^x-"].minProperties, 1);
  assert.equal(result.definitions.one.exclusiveMaximum, 9);
  assert.equal(result.$defs.two.minItems, 3);
  assert.equal(result.dependentSchemas.dep.maxProperties, 4);
  assert.equal(result.additionalProperties.maximum, 8);
  assert.equal(result.unevaluatedProperties.minimum, 0);
  assert.equal(result.prefixItems[0].minimum, 11);
  assert.equal(result.anyOf[0].maximum, 12);
  assert.equal(result.oneOf[0].minimum, 13);
  assert.equal(result.allOf[0].maxLength, 14);
  assert.equal(result.not.minimum, 15);
  assert.equal(result.if.minimum, 16);
  assert.equal(result.then.maximum, 17);
  assert.equal(result.else.minItems, 18);

  assert.equal(schemaCoercion.coerceSchemaNumericFields("unchanged"), "unchanged");
  assert.deepEqual(schemaCoercion.coerceSchemaNumericFields(["2", { minimum: "3" }]), [
    "2",
    { minimum: 3 },
  ]);
});

test("schemaCoercion sanitizes descriptions, tool schemas, tool ids and deepseek reasoning placeholders", () => {
  const sanitizedOpenAI = schemaCoercion.sanitizeToolDescription({
    type: "function",
    function: { name: "weather", description: 42 },
  });
  assert.equal(sanitizedOpenAI.function.description, "42");

  const sanitizedClaude = schemaCoercion.sanitizeToolDescription({
    name: "weather",
    description: null,
  });
  assert.equal(sanitizedClaude.description, "");

  const sanitizedGemini = schemaCoercion.sanitizeToolDescription({
    functionDeclarations: [{ name: "one", description: 12 }, { name: "two" }],
  });
  assert.equal(sanitizedGemini.functionDeclarations[0].description, "12");
  assert.equal(sanitizedGemini.functionDeclarations[1].name, "two");
  assert.equal(schemaCoercion.sanitizeToolDescription("plain"), "plain");

  const coercedTools = schemaCoercion.coerceToolSchemas([
    {
      type: "function",
      function: { parameters: { minimum: "4" } },
    },
    {
      name: "claude-style",
      input_schema: { minItems: "2" },
    },
    {
      parameters: { maximum: "9" },
    },
    {
      functionDeclarations: [{ parameters: { minLength: "1" } }],
    },
    "untouched",
  ]);
  assert.equal(coercedTools[0].function.parameters.minimum, 4);
  assert.equal(coercedTools[1].input_schema.minItems, 2);
  assert.equal(coercedTools[2].parameters.maximum, 9);
  assert.equal(coercedTools[3].functionDeclarations[0].parameters.minLength, 1);
  assert.equal(coercedTools[4], "untouched");
  assert.equal(schemaCoercion.coerceToolSchemas("not-array"), "not-array");

  const descriptionList = schemaCoercion.sanitizeToolDescriptions([{ description: 7 }, "raw"]);
  assert.equal(descriptionList[0].description, "7");
  assert.equal(descriptionList[1], "raw");
  assert.equal(schemaCoercion.sanitizeToolDescriptions("raw"), "raw");

  assert.equal(schemaCoercion.sanitizeToolId("call.abc:123"), "call_abc_123");
  assert.match(schemaCoercion.sanitizeToolId(""), /^tool_[a-z0-9_]+$/);
  assert.match(schemaCoercion.sanitizeToolId(undefined), /^tool_[a-z0-9_]+$/);

  const injected = schemaCoercion.injectEmptyReasoningContentForToolCalls(
    [
      { role: "assistant", tool_calls: [{ id: "call_1" }] },
      { role: "assistant", tool_calls: [{ id: "call_2" }], reasoning_content: "keep" },
      { role: "user", tool_calls: [{ id: "call_3" }] },
    ],
    "deepseek"
  );
  assert.equal(injected[0].reasoning_content, "");
  assert.equal(injected[1].reasoning_content, "keep");
  assert.equal(injected[2].reasoning_content, undefined);
  assert.equal(
    schemaCoercion.injectEmptyReasoningContentForToolCalls([{ role: "assistant" }], "openai")[0]
      .reasoning_content,
    undefined
  );
});

test("openaiHelper filters content, normalizes tools and removes OpenAI-incompatible fields", () => {
  const body = {
    messages: [
      { role: "tool", content: "" },
      { role: "assistant", tool_calls: [{ id: "call_1" }], content: "" },
      {
        role: "assistant",
        content: [
          { type: "thinking", thinking: "plan first" },
          { type: "redacted_thinking", text: "skip" },
          { type: "text", text: "visible text" },
          { type: "image_url", image_url: { url: "https://example.com/a.png" }, signature: "x" },
          { type: "tool_use", id: "call_1" },
          { type: "tool_result", tool_use_id: "call_1", text: "done", cache_control: "drop" },
        ],
      },
      { role: "user", content: [{ type: "text", text: "   " }] },
      { role: "assistant", content: [{ type: "tool_result", tool_use_id: "call_2" }] },
    ],
    tools: [
      {
        name: "claude-tool",
        description: "Claude style",
        input_schema: { type: "object" },
      },
      {
        functionDeclarations: [
          { name: "gemini-tool", description: "Gemini style", parameters: { type: "object" } },
        ],
      },
      {
        type: "function",
        function: { name: "openai-tool", parameters: { type: "object" } },
      },
    ],
    tool_choice: { type: "tool", name: "forced_tool" },
    metadata: { remove: true },
    anthropic_version: "2023-06-01",
  };

  const result = openaiHelper.filterToOpenAIFormat(body);

  assert.equal(result.messages.length, 3);
  assert.equal(result.messages[2].reasoning_content, "plan first");
  assert.deepEqual(result.messages[2].content, [
    { type: "text", text: "visible text" },
    { type: "image_url", image_url: { url: "https://example.com/a.png" } },
    { type: "text", text: "[Tool Result: call_1]\ndone" },
  ]);
  assert.equal(result.tools.length, 3);
  assert.equal(result.tools[0].function.name, "claude-tool");
  assert.equal(result.tools[1].function.name, "gemini-tool");
  assert.equal(result.tools[2].function.name, "openai-tool");
  assert.deepEqual(result.tool_choice, { type: "function", function: { name: "forced_tool" } });
  assert.equal("metadata" in result, false);
  assert.equal("anthropic_version" in result, false);
});

test("openaiHelper keeps unmatched tool choices and deletes empty tools arrays", () => {
  const autoChoice = openaiHelper.filterToOpenAIFormat({
    messages: [{ role: "assistant", content: "" }],
    tools: [],
    tool_choice: { type: "auto" },
  });
  assert.equal(autoChoice.tool_choice, "auto");
  assert.equal("tools" in autoChoice, false);

  const requiredChoice = openaiHelper.filterToOpenAIFormat({
    messages: [{ role: "assistant", content: "" }],
    tool_choice: { type: "any" },
  });
  assert.equal(requiredChoice.tool_choice, "required");

  const untouched = { metadata: { keep: false } };
  assert.deepEqual(openaiHelper.filterToOpenAIFormat(untouched), {
    metadata: { keep: false },
  });
});

test("claudeHelper validates content, ordering and request preparation branches", () => {
  assert.equal(claudeHelper.hasValidContent({ content: " hello " }), true);
  assert.equal(claudeHelper.hasValidContent({ content: [{ type: "tool_use", id: "call" }] }), true);
  assert.equal(claudeHelper.hasValidContent({ content: [{ type: "text", text: "   " }] }), false);

  assert.deepEqual(claudeHelper.fixToolUseOrdering([{ role: "user", content: "single" }]), [
    { role: "user", content: "single" },
  ]);

  const reordered = claudeHelper.fixToolUseOrdering([
    {
      role: "assistant",
      content: [
        { type: "text", text: "before" },
        { type: "tool_use", id: "call_1", name: "lookup", input: {} },
        { type: "text", text: "after" },
      ],
    },
    { role: "assistant", content: [{ type: "tool_result", tool_use_id: "call_1", content: [] }] },
  ]);
  assert.deepEqual(reordered[0].content, [
    { type: "tool_result", tool_use_id: "call_1", content: [] },
    { type: "text", text: "before" },
    { type: "tool_use", id: "call_1", name: "lookup", input: {} },
  ]);

  const prepared = claudeHelper.prepareClaudeRequest(
    {
      system: [
        { type: "text", text: "one", cache_control: { type: "ephemeral" } },
        { type: "text", text: "two", cache_control: { type: "ephemeral" } },
      ],
      messages: [
        { role: "user", content: [{ type: "text", text: "first question" }] },
        { role: "assistant", content: "first answer" },
        { role: "user", content: [{ type: "text", text: "follow up" }] },
        {
          role: "assistant",
          content: [
            { type: "text", text: "before tool" },
            { type: "tool_use", id: "call_1", name: "lookup", input: {} },
            { type: "text", text: "drop after" },
            { type: "redacted_thinking", text: "keep" },
          ],
        },
        {
          role: "user",
          content: [
            { type: "tool_result", tool_use_id: "call_1", content: "ok" },
            { type: "tool_result", content: "drop missing id" },
          ],
        },
        {
          role: "assistant",
          content: [
            { type: "thinking", thinking: "old", signature: "replace" },
            { type: "tool_use", id: "call_2", name: " ", input: {} },
            { type: "text", text: "" },
          ],
        },
      ],
      thinking: { type: "enabled" },
      tools: [
        { name: "", description: "drop me" },
        { name: "deferred", defer_loading: true, cache_control: { type: "ephemeral" } },
        { name: "kept-tool", cache_control: { type: "ephemeral" } },
      ],
    },
    "claude",
    false
  );

  assert.deepEqual(prepared.system[0], { type: "text", text: "one" });
  assert.deepEqual(prepared.system[1], {
    type: "text",
    text: "two",
    cache_control: { type: "ephemeral", ttl: "1h" },
  });
  assert.equal(prepared.messages.length, 6);
  assert.equal(prepared.messages[2].content.at(-1).cache_control.type, "ephemeral");
  assert.equal(prepared.messages[4].content[0].type, "tool_result");
  assert.deepEqual(
    prepared.messages[5].content.map((block) => block.type),
    ["thinking", "text"]
  );
  assert.ok(prepared.messages[5].content[0].signature);
  assert.equal(prepared.tools.length, 2);
  assert.equal(prepared.tools[0].cache_control, undefined);
  assert.deepEqual(prepared.tools[1].cache_control, { type: "ephemeral", ttl: "1h" });

  const preserved = claudeHelper.prepareClaudeRequest(
    {
      messages: [
        {
          role: "assistant",
          content: [{ type: "text", text: "keep cache", cache_control: { type: "ephemeral" } }],
        },
      ],
      tools: [{ name: "kept", cache_control: { type: "ephemeral" } }],
    },
    "openai",
    true
  );
  assert.deepEqual(preserved.messages[0].content[0].cache_control, { type: "ephemeral" });
  assert.deepEqual(preserved.tools[0].cache_control, { type: "ephemeral" });
});

test("geminiHelper converts content, safely parses JSON and cleans complex schemas", () => {
  assert.deepEqual(geminiHelper.convertOpenAIContentToParts("hello"), [{ text: "hello" }]);
  assert.deepEqual(
    geminiHelper.convertOpenAIContentToParts([
      { type: "text", text: "hello" },
      { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
      { type: "file_url", file_url: { url: "not-a-data-url" } },
    ]),
    [{ text: "hello" }, { inlineData: { mimeType: "image/png", data: "abc" } }]
  );

  assert.equal(
    geminiHelper.extractTextContent([
      { type: "text", text: "A" },
      { type: "image_url", image_url: { url: "https://example.com" } },
      { type: "text", text: "B" },
    ]),
    "AB"
  );
  assert.equal(geminiHelper.extractTextContent({ no: "text" }), "");
  assert.deepEqual(geminiHelper.tryParseJSON('{"ok":true}'), { ok: true });
  assert.equal(geminiHelper.tryParseJSON("{broken"), null);
  assert.equal(geminiHelper.tryParseJSON(42), 42);
  assert.match(geminiHelper.generateRequestId(), /^agent-/);
  assert.match(geminiHelper.generateSessionId(), /^-/);

  const schema = {
    type: ["null", "object"],
    properties: {},
    required: ["missing"],
    anyOf: [{ type: "null" }, { type: "string", enum: [1, 2] }],
    oneOf: [{ type: "null" }, { type: "array", items: { type: "integer", enum: [1, 2] } }],
    allOf: [
      { properties: { a: { type: "string", minLength: 2 } }, required: ["a"] },
      { properties: { b: { const: "fixed" } }, required: ["b"] },
    ],
    additionalProperties: false,
    patternProperties: { "^x-": { type: "number" } },
    if: { type: "string" },
    then: { type: "string" },
    else: { type: "string" },
    default: "remove",
    examples: ["remove"],
  };

  const cleaned = geminiHelper.cleanJSONSchemaForAntigravity(schema);
  assert.equal(cleaned.type, "array");
  assert.deepEqual(cleaned.required.sort(), ["a", "b"]);
  assert.equal(cleaned.properties.a.minLength, undefined);
  assert.deepEqual(cleaned.properties.b.enum, ["fixed"]);
  assert.deepEqual(cleaned.enum, ["1", "2"]);
  assert.equal(cleaned.items.type, "integer");
  assert.equal(cleaned.additionalProperties, undefined);
  assert.equal(cleaned.patternProperties, undefined);
  assert.equal(cleaned.if, undefined);
  assert.equal(cleaned.default, undefined);
  assert.equal(cleaned.examples, undefined);

  const placeholder = geminiHelper.cleanJSONSchemaForAntigravity({
    type: "object",
    properties: {},
  });
  assert.deepEqual(placeholder.required, ["reason"]);
  assert.equal(placeholder.properties.reason.type, "string");
});

test("toolCallHelper normalizes ids, links tool responses and inserts missing tool results", () => {
  let randomCalls = 0;
  Math.random = () => ((randomCalls++ % 50) + 1) / 100;

  const body = toolCallHelper.ensureToolCallIds(
    {
      messages: [
        {
          role: "assistant",
          tool_calls: [
            { function: { name: "first", arguments: { city: "Tokyo" } } },
            { id: "  ", function: { name: "second", arguments: "{}" } },
          ],
        },
        { role: "tool", content: "first result" },
        { role: "tool", content: "second result" },
      ],
    },
    { use9CharId: true }
  );

  assert.equal(body.messages[0].tool_calls[0].type, "function");
  assert.equal(typeof body.messages[0].tool_calls[0].function.arguments, "string");
  assert.match(body.messages[0].tool_calls[0].id, /^[a-zA-Z0-9]{9}$/);
  assert.match(body.messages[1].tool_call_id, /^[a-zA-Z0-9]{9}$/);
  assert.match(body.messages[2].tool_call_id, /^[a-zA-Z0-9]{9}$/);

  const missingResponseFixed = toolCallHelper.fixMissingToolResponses({
    messages: [
      {
        role: "assistant",
        tool_calls: [{ id: "call_a", function: { name: "lookup", arguments: "{}" } }],
      },
      { role: "user", content: "no tool result here" },
      {
        role: "assistant",
        content: [{ type: "tool_use", id: "call_b", name: "search", input: {} }],
      },
      {
        role: "user",
        content: [{ type: "tool_result", tool_use_id: "call_b", content: "done" }],
      },
    ],
  });

  assert.equal(missingResponseFixed.messages[1].role, "tool");
  assert.equal(missingResponseFixed.messages[1].tool_call_id, "call_a");
  assert.equal(missingResponseFixed.messages[1].content, "");
  assert.deepEqual(
    toolCallHelper.getToolCallIds({
      role: "assistant",
      tool_calls: [{ id: "call_a" }],
      content: [{ type: "tool_use", id: "call_b" }],
    }),
    ["call_a", "call_b"]
  );
  assert.equal(toolCallHelper.getToolCallIds({ role: "user" }).length, 0);
  assert.equal(
    toolCallHelper.hasToolResults({ role: "tool", tool_call_id: "call_a" }, ["call_a"]),
    true
  );
  assert.equal(
    toolCallHelper.hasToolResults(
      { role: "user", content: [{ type: "tool_result", tool_use_id: "call_b" }] },
      ["call_b"]
    ),
    true
  );
  assert.equal(toolCallHelper.hasToolResults({ role: "user", content: [] }, []), false);
  assert.deepEqual(toolCallHelper.fixMissingToolResponses({ messages: null }), { messages: null });
});
