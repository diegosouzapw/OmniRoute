import test from "node:test";
import assert from "node:assert/strict";

const {
  CLAUDE_OAUTH_TOOL_PREFIX,
  normalizeContentToString,
  openaiToClaudeRequest,
  openaiToClaudeRequestForAntigravity,
  stripEmptyTextBlocks,
} = await import("../../open-sse/translator/request/openai-to-claude.ts");
const { CLAUDE_SYSTEM_PROMPT } = await import("../../open-sse/config/constants.ts");
const { DEFAULT_THINKING_CLAUDE_SIGNATURE } =
  await import("../../open-sse/config/defaultThinkingSignature.ts");
const { getModelsByProviderId, supportsXHighEffort } =
  await import("../../open-sse/config/providerModels.ts");

function getClaudeEffortFixtures() {
  const claudeModels = getModelsByProviderId("claude");
  const xhighModel = claudeModels.find((model) => supportsXHighEffort("claude", model.id));
  const standardModel = claudeModels.find(
    (model) => supportsXHighEffort("claude", model.id) === false
  );
  assert.ok(xhighModel, "expected at least one Claude model with xhigh support");
  assert.ok(standardModel, "expected at least one Claude model without xhigh support");
  return { xhighModel, standardModel };
}

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
  // top_p is stripped when temperature is also present (Anthropic rejects both).
  assert.equal(result.top_p, undefined);
  assert.deepEqual(result.stop_sequences, ["DONE"]);
  assert.equal(result.system[0].text, "Rule A\nRule B\nRule C");
  assert.equal(result.messages[0].role, "user");
  assert.deepEqual(result.messages[0].content, [{ type: "text", text: "Hello" }]);
  assert.equal(result.messages[1].role, "assistant");
  assert.equal(result.messages[1].content[0].text, "Hi there");
  assert.deepEqual(result.messages[1].content[0].cache_control, { type: "ephemeral" });
});

test("OpenAI -> Claude strips top_p when temperature is also present", () => {
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [{ role: "user", content: "Hello" }],
      temperature: 0.25,
      top_p: 0.8,
    },
    false
  );

  assert.equal(result.temperature, 0.25);
  assert.equal(result.top_p, undefined);
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
  // #5312 RC-D: signature-less reasoning_content becomes a redacted_thinking
  // placeholder (no fabricated signature), not a thinking block.
  assert.equal(assistantMessage.content[0].type, "redacted_thinking");
  assert.equal(assistantMessage.content[0].data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  assert.equal(assistantMessage.content[0].signature, undefined);
  assert.equal(assistantMessage.content[0].thinking, undefined);
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
  assert.match(schemaResult.system[0].text, /strictly follows this JSON schema/i);
  assert.match(schemaResult.system[0].text, /"answer"/);

  const jsonObjectResult = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [{ role: "user", content: "Return JSON" }],
      tool_choice: { function: { name: "emit_json" } },
      response_format: { type: "json_object" },
    },
    false
  );

  assert.deepEqual(jsonObjectResult.tool_choice, { type: "tool", name: "emit_json" });
  assert.match(jsonObjectResult.system[0].text, /Respond ONLY with a JSON object/i);
});

test("OpenAI -> Claude turns reasoning settings into thinking budgets and expands max tokens", () => {
  // `claude-4-sonnet` is a fixture that doesn't match any spec. Unknown caps
  // should not get an implicit default; the translator only preserves the
  // response room + thinking budget relationship.
  // fitThinkingToMaxTokens floors response room at MIN_RESPONSE_ROOM (1024)
  // and targets max_tokens = responseRoom + budget capped at modelCap.
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
  // responseRoom=max(10,1024)=1024; target=1024+1024=2048
  assert.equal(effortResult.max_tokens, 2048);

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
  // responseRoom=max(1000,1024)=1024; target=1024+2000=3024
  assert.equal(explicitThinkingResult.max_tokens, 3024);
});

test("OpenAI -> Claude does not cap unknown models to a fallback maxOutputTokens", () => {
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [{ role: "user", content: "Reason about something hard" }],
      max_tokens: 32000,
      reasoning_effort: "high",
    },
    false
  );

  assert.equal(result.max_tokens, 163072);
  assert.deepEqual(result.thinking, { type: "enabled", budget_tokens: 131072 });
});

test("OpenAI -> Claude preserves xhigh only for Claude models that expose it", () => {
  const { xhighModel, standardModel } = getClaudeEffortFixtures();
  const preserved = openaiToClaudeRequest(
    xhighModel.id,
    {
      messages: [{ role: "user", content: "Think harder" }],
      reasoning_effort: "xhigh",
    },
    false
  );
  const downgraded = openaiToClaudeRequest(
    standardModel.id,
    {
      messages: [{ role: "user", content: "Think harder" }],
      max_tokens: 10,
      reasoning_effort: "xhigh",
    },
    false
  );

  assert.deepEqual(preserved.thinking, { type: "adaptive" });
  assert.deepEqual(preserved.output_config, { effort: "xhigh" });
  // standardModel (claude-opus-4-6) has output cap 128000.
  // Requested budget 131072 is cap-fitted: target=min(1024+131072, 128000)=128000;
  // fittedBudget=128000-1024=126976. budget shrinks to fit within model cap
  // rather than producing invalid max_tokens=139264 that Anthropic rejects with 400.
  assert.deepEqual(downgraded.thinking, { type: "enabled", budget_tokens: 126976 });
  assert.equal(downgraded.output_config, undefined);
  assert.equal(downgraded.max_tokens, 128000);
});

test("OpenAI -> Claude preserves max effort except for Haiku models", () => {
  const preserved = openaiToClaudeRequest(
    "claude-sonnet-4-6",
    {
      messages: [{ role: "user", content: "Think at max" }],
      reasoning_effort: "max",
    },
    false
  );
  const haiku = openaiToClaudeRequest(
    "claude-haiku-4-5-20251001",
    {
      messages: [{ role: "user", content: "Think at max" }],
      max_tokens: 10,
      reasoning_effort: "max",
    },
    false
  );

  assert.deepEqual(preserved.thinking, { type: "adaptive" });
  assert.deepEqual(preserved.output_config, { effort: "max" });
  assert.equal(haiku.output_config, undefined);
  assert.deepEqual(haiku.thinking, { type: "enabled", budget_tokens: 62976 });
  assert.equal(haiku.max_tokens, 64000);
});

test("OpenAI -> Claude fits thinking budget within a 128k output cap (regression)", () => {
  // Real-world OpenCode scenario: caller asks for max_tokens=32000 with high effort.
  // High effort maps to budget=131072. The previous naive
  // `budget + 8192 = 139264` exceeded the 128000 output cap and caused
  // HTTP 400 "max_tokens > 128000".
  // fitThinkingToMaxTokens must preserve caller's 32000 response room and
  // shrink budget to (128000 - 32000) = 96000.
  // Pinned on Opus 4.6 — a model that still uses manual budgets. Opus 4.7+/Fable 5 are
  // adaptive-only now (no budget_tokens), so their effort path is covered separately below.
  const result = openaiToClaudeRequest(
    "claude-opus-4-6",
    {
      messages: [{ role: "user", content: "Reason about something hard" }],
      max_tokens: 32000,
      reasoning_effort: "high",
    },
    false
  );

  assert.equal(result.max_tokens, 128000, "max_tokens must equal model cap, not 139264");
  assert.ok(result.thinking, "thinking should remain enabled");
  assert.equal((result.thinking as { type: string }).type, "enabled");
  assert.equal(
    (result.thinking as { budget_tokens: number }).budget_tokens,
    96000,
    "budget must shrink to (cap - caller max_tokens) to preserve response room"
  );
});

test("OpenAI -> Claude steers adaptive-only models via output_config.effort for EVERY level", () => {
  // Opus 4.7+/Fable 5 reject a manual `thinking.budget_tokens`/`type:"enabled"` with 400.
  // reasoning_effort low/medium/high must therefore map to adaptive + output_config.effort
  // (preserving the requested level), NOT to the budget buckets older models use.
  for (const effort of ["low", "medium", "high", "xhigh", "max"]) {
    for (const model of ["claude-opus-4-8", "claude-opus-4-7", "claude-fable-5"]) {
      const result = openaiToClaudeRequest(
        model,
        {
          messages: [{ role: "user", content: "Reason" }],
          max_tokens: 4000,
          reasoning_effort: effort,
        },
        false
      );
      assert.deepEqual(
        result.thinking,
        { type: "adaptive" },
        `${model} @ ${effort} must use adaptive thinking, never a manual budget`
      );
      assert.deepEqual(
        result.output_config,
        { effort },
        `${model} @ ${effort} must carry the effort on output_config`
      );
      assert.equal(
        (result.thinking as Record<string, unknown>).budget_tokens,
        undefined,
        `${model} @ ${effort} must NOT emit budget_tokens (hard 400 on adaptive-only models)`
      );
    }
  }
});

test("OpenAI -> Claude keeps manual budgets for low/medium/high on pre-4.7 models (regression)", () => {
  // Opus 4.6 still supports manual extended thinking: the budget buckets must be untouched.
  const result = openaiToClaudeRequest(
    "claude-opus-4-6",
    {
      messages: [{ role: "user", content: "Reason" }],
      max_tokens: 20000,
      reasoning_effort: "medium",
    },
    false
  );
  assert.equal((result.thinking as { type: string }).type, "enabled");
  assert.equal((result.thinking as { budget_tokens: number }).budget_tokens, 10240);
  assert.equal(result.output_config, undefined);
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

test("OpenAI -> Claude preserves reasoning_content on assistant tool call messages when thinking is enabled", () => {
  // Bug: Kimi (and other thinking-enabled providers) require reasoning_content
  // on assistant messages that contain tool_calls. When reasoning_content is
  // present, it must be converted to a thinking block. When it's missing but
  // thinking is enabled, we must NOT drop the tool_calls.
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [
        { role: "user", content: "What is the weather?" },
        {
          role: "assistant",
          reasoning_content: "I need to check the weather",
          content: "Let me check that for you.",
          tool_calls: [
            {
              id: "call_weather_1",
              type: "function",
              function: {
                name: "get_weather",
                arguments: '{"location":"Tokyo"}',
              },
            },
          ],
        },
        {
          role: "tool",
          tool_call_id: "call_weather_1",
          content: "Sunny, 25C",
        },
        { role: "user", content: "Thanks!" },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "get_weather",
            description: "Get weather info",
            parameters: { type: "object", properties: {} },
          },
        },
      ],
      thinking: { type: "enabled", budget_tokens: 1024 },
    },
    false
  );

  // Find the assistant message with tool_calls
  const assistantMsgs = result.messages.filter((m) => m.role === "assistant");
  assert.equal(assistantMsgs.length, 1, "expected exactly one assistant message");

  const assistantMsg = assistantMsgs[0];
  // #5312 RC-D: reasoning_content becomes a signature-less redacted_thinking
  // placeholder; the real text is re-hydrated downstream (reasoningCache) for
  // non-Anthropic upstreams, while Anthropic accepts it without signature validation.
  const thinkingBlock = assistantMsg.content.find((b) => b.type === "redacted_thinking");
  const textBlock = assistantMsg.content.find((b) => b.type === "text");
  const toolUseBlock = assistantMsg.content.find((b) => b.type === "tool_use");

  assert.ok(thinkingBlock, "expected redacted_thinking placeholder from reasoning_content");
  assert.equal(thinkingBlock.data, DEFAULT_THINKING_CLAUDE_SIGNATURE);
  assert.equal(thinkingBlock.signature, undefined);
  assert.equal(
    assistantMsg.content.find((b) => b.type === "thinking"),
    undefined,
    "must NOT emit a thinking block with a fabricated signature (#5312)"
  );

  assert.ok(textBlock, "expected text block");
  assert.equal(textBlock.text, "Let me check that for you.");

  assert.ok(toolUseBlock, "expected tool_use block");
  assert.equal(toolUseBlock.name, `${CLAUDE_OAUTH_TOOL_PREFIX}get_weather`);
  assert.deepEqual(toolUseBlock.input, { location: "Tokyo" });
});

test("OpenAI -> Claude handles assistant tool call messages without reasoning_content when thinking is enabled", () => {
  // When thinking is enabled but the assistant message has no reasoning_content,
  // the message should still be translated correctly with tool_calls preserved.
  const result = openaiToClaudeRequest(
    "claude-4-sonnet",
    {
      messages: [
        { role: "user", content: "Call a tool" },
        {
          role: "assistant",
          content: "OK",
          tool_calls: [
            {
              id: "call_1",
              type: "function",
              function: {
                name: "do_thing",
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
            name: "do_thing",
            description: "Do a thing",
            parameters: { type: "object", properties: {} },
          },
        },
      ],
      thinking: { type: "enabled", budget_tokens: 1024 },
    },
    false
  );

  const assistantMsg = result.messages.find((m) => m.role === "assistant");
  assert.ok(assistantMsg, "expected assistant message");

  const toolUseBlock = assistantMsg.content.find((b) => b.type === "tool_use");
  assert.ok(toolUseBlock, "expected tool_use block to be preserved");
  assert.equal(toolUseBlock.name, `${CLAUDE_OAUTH_TOOL_PREFIX}do_thing`);
});

test("OpenAI -> Claude treats developer role as system (fix for Responses API → Claude path)", () => {
  const MARKER = "MAGIC_IDENTITY_847261";
  const result = openaiToClaudeRequest(
    "claude-sonnet-4-6",
    {
      messages: [
        { role: "developer", content: `You are ${MARKER}` },
        { role: "user", content: "What is your identity?" },
      ],
    },
    true
  );

  // developer content must appear in the system field, not as an assistant turn
  const systemText =
    typeof result.system === "string" ? result.system : JSON.stringify(result.system);
  assert.ok(systemText.includes(MARKER), "developer content must appear in Claude system field");

  // No message in the messages array should contain the marker
  for (const msg of result.messages) {
    const msgStr = JSON.stringify(msg);
    assert.ok(!msgStr.includes(MARKER), "developer content must NOT appear in messages array");
  }

  // Exactly one user message
  const userMessages = result.messages.filter((m) => m.role === "user");
  assert.equal(userMessages.length, 1, "expected exactly one user message");
});
