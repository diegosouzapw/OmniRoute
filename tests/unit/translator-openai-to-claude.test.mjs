import test from "node:test";
import assert from "node:assert/strict";

const {
  CLAUDE_OAUTH_TOOL_PREFIX,
  normalizeContentToString,
  openaiToClaudeRequest,
  openaiToClaudeRequestForAntigravity,
  stripEmptyTextBlocks,
} = await import("../../open-sse/translator/request/openai-to-claude.ts");
const {
  applyForwardingKeywordSettings,
  getDefaultForwardingKeywordConfig,
  getForwardingKeywordRulesForLane,
  normalizeForwardingKeywordConfig,
  setForwardingKeywordConfig,
  rewriteForwardedTextForLane,
  rewriteForwardedToolNameForLane,
} = await import("../../open-sse/config/forwardingKeywordRules.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { claudeToOpenAIResponse } =
  await import("../../open-sse/translator/response/claude-to-openai.ts");
const { CLAUDE_SYSTEM_PROMPT } = await import("../../open-sse/config/constants.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } =
  await import("../../open-sse/config/defaultThinkingSignature.ts");

test.beforeEach(() => {
  setForwardingKeywordConfig(getDefaultForwardingKeywordConfig());
});

test("OpenAI -> Claude helpers normalize array content and strip empty nested text blocks", () => {
  const normalized = normalizeContentToString([
    { type: "text", text: "Line 1" },
    { type: "image_url", image_url: { url: "https://example.com/ignored.png" } },
    { type: "text", text: "Line 2" },
  ]);

  assert.equal(normalized, "Line 1\nLine 2");

  const stripped = stripEmptyTextBlocks([
    { type: "text", text: "" },
    { type: "text", text: "keep" },
    {
      type: "tool_result",
      content: [
        { type: "text", text: "" },
        { type: "text", text: "nested" },
      ],
    },
  ]);

  assert.deepEqual(stripped, [
    { type: "text", text: "keep" },
    {
      type: "tool_result",
      content: [{ type: "text", text: "nested" }],
    },
  ]);
});

test("OpenAI -> Claude maps system messages, parameters and assistant cache markers", () => {
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [
        { role: "system", content: "Rule A" },
        {
          role: "system",
          content: [
            { type: "text", text: "Rule B" },
            { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
            { type: "text", text: "Rule C" },
          ],
        },
        { role: "user", content: "Hello" },
        { role: "assistant", content: "Hi there" },
      ],
      max_completion_tokens: 33,
      temperature: 0.25,
      top_p: 0.8,
      stop: ["DONE"],
    },
    true
  );

  assert.equal(result.model, "claude-4-sonnet");
  assert.equal(result.stream, true);
  assert.equal(result.max_tokens, 33);
  assert.equal(result.temperature, 0.25);
  assert.equal(result.top_p, 0.8);
  assert.deepEqual(result.stop_sequences, ["DONE"]);
  assert.equal(result.system[0].text, CLAUDE_SYSTEM_PROMPT);
  assert.equal(result.system[1].text, "Rule A\nRule B\nRule C");
  assert.equal(result.messages[0].role, "user");
  assert.deepEqual(result.messages[0].content, [{ type: "text", text: "Hello" }]);
  assert.equal(result.messages[1].role, "assistant");
  assert.equal(result.messages[1].content[0].text, "Hi there");
  assert.deepEqual(result.messages[1].content[0].cache_control, { type: "ephemeral" });
});

test("OpenAI -> Claude converts multimodal content, tool declarations, tool calls and tool results", () => {
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Inspect this" },
            { type: "image_url", image_url: { url: "data:image/png;base64,abc" } },
            { type: "image_url", image_url: { url: "https://example.com/cat.png" } },
          ],
        },
        {
          role: "assistant",
          reasoning_content: "Need a tool",
          content: [{ type: "text", text: "Calling tool" }],
          tool_calls: [
            {
              id: "call_weather",
              type: "function",
              function: {
                name: "weather.get",
                arguments: '{"city":"Tokyo"}',
              },
            },
            {
              id: "call_skip",
              type: "function",
              function: {
                name: "",
                arguments: "{}",
              },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_weather",
          content: [
            { type: "text", text: "" },
            { type: "text", text: "20C" },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "weather.get",
            description: "Read weather data",
            parameters: { type: "object" },
          },
        },
        {
          type: "function",
          function: {
            name: "",
            description: "skip me",
            parameters: { type: "object" },
          },
        },
      ],
    },
    false
  );

  assert.equal(result.tools.length, 1);
  assert.equal(result.tools[0].name, `${CLAUDE_OAUTH_TOOL_PREFIX}weather.get`);
  assert.deepEqual(result.tools[0].input_schema, { type: "object", properties: {} });
  assert.deepEqual(result.tools[0].cache_control, { type: "ephemeral", ttl: "1h" });
  assert.equal(result._toolNameMap.get(`${CLAUDE_OAUTH_TOOL_PREFIX}weather.get`), "weather.get");

  assert.equal(result.messages[0].role, "user");
  assert.equal(result.messages[0].content.length, 3);
  assert.deepEqual(result.messages[0].content[1], {
    type: "image",
    source: { type: "base64", media_type: "image/png", data: "abc" },
  });
  assert.deepEqual(result.messages[0].content[2], {
    type: "image",
    source: { type: "url", url: "https://example.com/cat.png" },
  });

  const assistantMessage = result.messages.find((message) => message.role === "assistant");
  assert.ok(assistantMessage, "expected an assistant message");
  assert.equal(assistantMessage.content[0].type, "thinking");
  assert.equal(assistantMessage.content[0].thinking, "Need a tool");
  assert.equal(assistantMessage.content[0].signature, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  assert.equal(assistantMessage.content[1].text, "Calling tool");
  assert.equal(assistantMessage.content[2].type, "tool_use");
  assert.equal(assistantMessage.content[2].name, `${CLAUDE_OAUTH_TOOL_PREFIX}weather.get`);
  assert.deepEqual(assistantMessage.content[2].input, { city: "Tokyo" });
  assert.deepEqual(assistantMessage.content[2].cache_control, { type: "ephemeral" });

  const toolResultMessage = result.messages.find(
    (message) =>
      message.role === "user" && message.content.some((block) => block.type === "tool_result")
  );
  assert.ok(toolResultMessage, "expected a translated tool_result message");
  assert.deepEqual(toolResultMessage.content[0], {
    type: "tool_result",
    tool_use_id: "call_weather",
    content: [{ type: "text", text: "20C" }],
  });
});

test("OpenAI -> Claude maps tool_choice and injects response_format instructions into system", () => {
  const schemaResult = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [{ role: "user", content: "Return JSON" }],
      tool_choice: "required",
      response_format: {
        type: "json_schema",
        json_schema: {
          schema: {
            type: "object",
            properties: { answer: { type: "string" } },
            required: ["answer"],
          },
        },
      },
    },
    false
  );

  assert.deepEqual(schemaResult.tool_choice, { type: "any" });
  assert.match(schemaResult.system[1].text, /strictly follows this JSON schema/i);
  assert.match(schemaResult.system[1].text, /"answer"/);

  const jsonObjectResult = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [{ role: "user", content: "Return JSON" }],
      tool_choice: { function: { name: "emit_json" } },
      response_format: { type: "json_object" },
    },
    false
  );

  assert.deepEqual(jsonObjectResult.tool_choice, {
    type: "tool",
    name: `${CLAUDE_OAUTH_TOOL_PREFIX}emit_json`,
  });

  const claudeNativeToolChoiceResult = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [{ role: "user", content: "Use the existing Claude-native tool choice" }],
      tool_choice: { type: "tool", name: `${CLAUDE_OAUTH_TOOL_PREFIX}emit_json` },
    },
    false
  );

  assert.deepEqual(claudeNativeToolChoiceResult.tool_choice, {
    type: "tool",
    name: `${CLAUDE_OAUTH_TOOL_PREFIX}emit_json`,
  });
  assert.match(jsonObjectResult.system[1].text, /Respond ONLY with a JSON object/i);
});

test("OpenAI -> Claude turns reasoning settings into thinking budgets and expands max tokens", () => {
  const effortResult = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [{ role: "user", content: "Think harder" }],
      max_tokens: 10,
      reasoning_effort: "low",
    },
    false
  );

  assert.deepEqual(effortResult.thinking, { type: "enabled", budget_tokens: 1024 });
  assert.equal(effortResult.max_tokens, 9216);

  const explicitThinkingResult = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [{ role: "user", content: "Think harder" }],
      max_completion_tokens: 1000,
      thinking: { type: "enabled", budget_tokens: 2000, max_tokens: 3000 },
    },
    false
  );

  assert.deepEqual(explicitThinkingResult.thinking, {
    type: "enabled",
    budget_tokens: 2000,
    max_tokens: 3000,
  });
  assert.equal(explicitThinkingResult.max_tokens, 10192);
});

test("OpenAI -> Claude can disable OAuth prefixes and Antigravity strips Claude-only prompting", () => {
  const baseBody = {
    messages: [
      { role: "system", content: "User rules" },
      { role: "user", content: "Run a tool" },
      {
        role: "assistant",
        tool_calls: [
          {
            id: "call_1",
            type: "function",
            function: { name: "read_file", arguments: "{}" },
          },
        ],
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "read_file",
          description: "Read a file",
          parameters: { type: "object", properties: {} },
        },
      },
    ],
  };

  const noPrefix = openaiToClaudeRequest(
    "claude-4-sonnet",
    { ...baseBody, _disableToolPrefix: true },
    false
  );

  assert.equal(noPrefix.tools[0].name, "read_file");
  assert.equal(noPrefix._toolNameMap, undefined);
  assert.equal(
    noPrefix.messages[1].content.find((block) => block.type === "tool_use").name,
    "read_file"
  );

  const antigravity = openaiToClaudeRequestForAntigravity("claude-4-sonnet", baseBody, false);
  assert.equal(
    antigravity.system.some((block) => String(block.text).includes("Claude Code")),
    false
  );
  assert.equal(antigravity.system[0].text, "User rules");
  assert.equal(antigravity.tools[0].name, "read_file");
  assert.equal(
    antigravity.messages[1].content.find((block) => block.type === "tool_use").name,
    "read_file"
  );
});

test("OpenAI -> Claude rewrites confirmed lexical triggers only on the prefixed OAuth lane", () => {
  const oauthResult = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [
        {
          role: "system",
          content: "Use background_output, background_cancel, and <directories>src/</directories>",
        },
        {
          role: "assistant",
          reasoning_content: "Prefer background_output before background_cancel",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: {
                name: "background_output",
                arguments: "{}",
              },
            },
          ],
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "background_cancel",
            description: "Cancel background work",
            parameters: { type: "object", properties: {} },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "background_cancel" } },
    },
    false
  );

  assert.match(oauthResult.system[1].text, /background_result/);
  assert.match(oauthResult.system[1].text, /background_stop/);
  assert.match(oauthResult.system[1].text, /directories:\nsrc\//);
  assert.doesNotMatch(oauthResult.system[1].text, /background_output/);
  assert.doesNotMatch(oauthResult.system[1].text, /background_cancel/);
  assert.doesNotMatch(oauthResult.system[1].text, /<directories>/);
  assert.equal(oauthResult.tools[0].name, `${CLAUDE_OAUTH_TOOL_PREFIX}background_stop`);
  assert.deepEqual(oauthResult.tool_choice, {
    type: "tool",
    name: `${CLAUDE_OAUTH_TOOL_PREFIX}background_stop`,
  });
  assert.equal(
    oauthResult._toolNameMap.get(`${CLAUDE_OAUTH_TOOL_PREFIX}background_stop`),
    "background_cancel"
  );
  assert.equal(
    oauthResult.messages[0].content.find((block) => block.type === "thinking").thinking,
    "Prefer background_result before background_stop"
  );
  assert.equal(
    oauthResult.messages[0].content.find((block) => block.type === "tool_use").name,
    `${CLAUDE_OAUTH_TOOL_PREFIX}background_result`
  );

  const passthroughResult = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      _disableToolPrefix: true,
      messages: [
        { role: "system", content: "Use background_output and <directories>src/</directories>" },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "background_cancel",
            description: "Cancel background work",
            parameters: { type: "object", properties: {} },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "background_cancel" } },
    },
    false
  );

  assert.match(passthroughResult.system[1].text, /background_output/);
  assert.match(passthroughResult.system[1].text, /<directories>src\/<\/directories>/);
  assert.equal(passthroughResult.tools[0].name, "background_cancel");
  assert.deepEqual(passthroughResult.tool_choice, { type: "tool", name: "background_cancel" });
});

test("Forwarding keyword rules stay proxy-local and data-driven", () => {
  const rules = getForwardingKeywordRulesForLane("claude-oauth-prefixed");

  assert.deepEqual(
    rules.toolNames.map((rule) => [rule.match, rule.replace]),
    [
      ["background_output", "background_result"],
      ["background_cancel", "background_stop"],
    ]
  );
  assert.equal(
    rewriteForwardedToolNameForLane("claude-oauth-prefixed", "background_output"),
    "background_result"
  );
  assert.equal(rewriteForwardedToolNameForLane("claude-oauth-prefixed", "read_file"), "read_file");
  assert.equal(
    rewriteForwardedTextForLane(
      "claude-oauth-prefixed",
      "background_cancel <directories>src/</directories>"
    ),
    "background_stop directories:\nsrc/"
  );
});

test("Forwarding keyword normalization rejects blank match and tag boundaries", () => {
  const normalized = normalizeForwardingKeywordConfig({
    "claude-oauth-prefixed": {
      toolNames: [
        { match: "   ", replace: "ignored" },
        { match: " background_output ", replace: "background_result" },
      ],
      text: [{ match: "", replace: "ignored" }],
      tags: [
        {
          open: "   ",
          openReplacement: "ignored",
          close: "</directories>",
          closeReplacement: "",
        },
      ],
    },
  });

  assert.deepEqual(normalized["claude-oauth-prefixed"].toolNames, [
    { match: "background_output", replace: "background_result" },
  ]);
  assert.deepEqual(normalized["claude-oauth-prefixed"].text, []);
  assert.deepEqual(normalized["claude-oauth-prefixed"].tags, []);
});

test("Forwarding keyword settings reset to defaults only after successful settings load", () => {
  setForwardingKeywordConfig({
    "claude-oauth-prefixed": {
      toolNames: [{ match: "background_output", replace: "bg_out" }],
      text: [{ match: "background_output", replace: "bg_out" }],
      tags: [],
    },
  });

  applyForwardingKeywordSettings({});

  assert.deepEqual(
    getForwardingKeywordRulesForLane("claude-oauth-prefixed"),
    getDefaultForwardingKeywordConfig()["claude-oauth-prefixed"]
  );
});

test("OpenAI-compatible -> Claude -> OpenAI-compatible preserves original tool names", () => {
  const request = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [{ role: "user", content: "Run the tool" }],
      tools: [
        {
          type: "function",
          function: {
            name: "background_cancel",
            description: "Cancel work",
            parameters: { type: "object", properties: {} },
          },
        },
      ],
    },
    false
  );

  const nonStreamingResponse = translateNonStreamingResponse(
    {
      id: "msg_1",
      model: "claude-4-sonnet",
      content: [{ type: "tool_use", id: "call_1", name: request.tools[0].name, input: {} }],
      usage: { input_tokens: 10, output_tokens: 5 },
    },
    "claude",
    "openai",
    request._toolNameMap
  );

  assert.equal(
    nonStreamingResponse.choices[0].message.tool_calls[0].function.name,
    "background_cancel"
  );

  const streamingChunks = claudeToOpenAIResponse(
    {
      type: "content_block_start",
      index: 0,
      content_block: { type: "tool_use", id: "call_1", name: "proxy_background_result" },
    },
    {
      toolCallIndex: 0,
      toolCalls: new Map(),
      toolNameMap: new Map([["proxy_background_result", "background_output"]]),
    }
  );

  assert.equal(
    streamingChunks[0].choices[0].delta.tool_calls[0].function.name,
    "background_output"
  );
});

test("OpenAI -> Claude stores tool name mappings for assistant tool calls without declared tools", () => {
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "background_output", arguments: "{}" },
            },
          ],
        },
      ],
    },
    false
  );

  assert.equal(
    result._toolNameMap.get(`${CLAUDE_OAUTH_TOOL_PREFIX}background_result`),
    "background_output"
  );
});

test("OpenAI -> Claude rewrites nested tool_result text on the prefixed OAuth lane", () => {
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [
        {
          role: "assistant",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: { name: "background_output", arguments: "{}" },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_1",
          content: [
            {
              type: "text",
              text: "background_output <directories>src/</directories>",
            },
          ],
        },
      ],
    },
    false
  );

  const toolResultMessage = result.messages.find(
    (message) =>
      message.role === "user" && message.content.some((block) => block.type === "tool_result")
  );

  assert.deepEqual(toolResultMessage.content[0], {
    type: "tool_result",
    tool_use_id: "call_1",
    content: [{ type: "text", text: "background_result directories:\nsrc/" }],
  });
});
