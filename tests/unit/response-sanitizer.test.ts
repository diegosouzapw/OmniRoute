import test from "node:test";
import assert from "node:assert/strict";

const {
  extractThinkingFromContent,
  sanitizeOpenAIResponse,
  sanitizeResponsesApiResponse,
  sanitizeStreamingChunk,
} = await import("../../open-sse/handlers/responseSanitizer.ts");

test("extractThinkingFromContent separates think blocks from visible content", () => {
  const parsed = extractThinkingFromContent(
    "Before<think>reasoning 1</think>middle<thinking>reasoning 2</thinking>after"
  );

  assert.equal(parsed.content, "Beforemiddleafter");
  assert.equal(parsed.thinking, "reasoning 1\n\nreasoning 2");
});

// #3821-review LEDGER-7 — the unclosed-reasoning-tag heuristic (#3605) reclassifies a
// dangling `<thought`-style tail as reasoning. Pin that a REAL visible prefix before such
// a tail is preserved as content (only a whitespace/§marker§ prefix collapses to ""), and
// that a non-reasoning tag like `<thoughtful>` is NOT captured.
test("extractThinkingFromContent preserves a real prefix before a dangling reasoning tag", () => {
  const parsed = extractThinkingFromContent("Here is the answer. <thought\nleftover reasoning");
  assert.equal(parsed.content, "Here is the answer.");
  assert.equal(parsed.thinking, "leftover reasoning");
});

test("extractThinkingFromContent: §marker§-only prefix collapses to empty content", () => {
  const parsed = extractThinkingFromContent("§54§ <thought\ninternal planning");
  assert.equal(parsed.content, "");
  assert.equal(parsed.thinking, "internal planning");
});

test("extractThinkingFromContent does NOT treat <thoughtful> as a reasoning tag", () => {
  const parsed = extractThinkingFromContent("See the <thoughtful> approach here");
  assert.equal(parsed.content, "See the <thoughtful> approach here");
  assert.equal(parsed.thinking, null);
});

test("sanitizeOpenAIResponse strips non-standard fields and preserves required top-level fields", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl_existing",
    object: "chat.completion",
    created: 123,
    model: "gpt-4.1",
    choices: [],
    x_groq: { ignored: true },
    service_tier: "premium",
  });

  assert.deepEqual(sanitized, {
    id: "chatcmpl_existing",
    object: "chat.completion",
    created: 123,
    model: "gpt-4.1",
    choices: [],
  });
});

test("sanitizeOpenAIResponse extracts thinking, collapses newlines, preserves reasoning_content with tool_calls, and preserves tool calls", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl_test",
    model: "gpt-4.1",
    choices: [
      {
        index: 2,
        finish_reason: "tool_calls",
        message: {
          role: "assistant",
          content: "Hello\n\n\n<think>internal chain</think>\n\nworld",
          tool_calls: [{ id: "call_1" }],
          function_call: { name: "legacy" },
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].index, 2);
  assert.equal((sanitized as any).choices[0].finish_reason, "tool_calls");
  (assert as any).equal((sanitized as any).choices[0].message.content, "Hello\n\nworld");
  assert.equal((sanitized as any).choices[0].message.reasoning_content, "internal chain");
  (assert as any).deepEqual((sanitized as any).choices[0].message.tool_calls, [{ id: "call_1" }]);
  assert.deepEqual((sanitized as any).choices[0].message.function_call, { name: "legacy" });
});

test("sanitizeOpenAIResponse extracts unclosed reasoning wrappers into reasoning_content", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "gpt-4.1",
    choices: [
      {
        message: {
          role: "assistant",
          content: "§54§ <thought\ninternal planning\n",
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].message.content, "");
  assert.equal((sanitized as any).choices[0].message.reasoning_content, "internal planning");
});

test("sanitizeOpenAIResponse preserves native reasoning_content when no visible content remains", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "gpt-4.1",
    choices: [
      {
        message: {
          role: "assistant",
          content: "<think>discard me</think>",
          reasoning_content: "provider reasoning",
        },
      },
    ],
  });

  assert.equal(((sanitized as any).choices[0].message as any).content, "");
  assert.equal((sanitized as any).choices[0].message.reasoning_content, "provider reasoning");
});

test("sanitizeOpenAIResponse maps Claude-style usage fields and strips extras", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "claude-3-7-sonnet",
    choices: [],
    usage: {
      input_tokens: 11,
      output_tokens: 7,
      service_tier: "ignored",
      usage_breakdown: { ignored: true },
    },
  });

  assert.deepEqual((sanitized as any).usage, {
    prompt_tokens: 11,
    completion_tokens: 7,
    total_tokens: 18,
  });
});

test("sanitizeOpenAIResponse strips reasoning_details-derived reasoning_content when visible text exists", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "openrouter/model",
    choices: [
      {
        message: {
          role: "assistant",
          content: "Visible",
          reasoning_details: [
            { type: "reasoning.text", text: "first " },
            { type: "thinking", content: "second" },
            { type: "other", text: "ignored" },
          ],
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].message.reasoning_content, undefined);
});

test("sanitizeOpenAIResponse preserves DeepSeek V4 reasoning_content with visible text", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "deepseek-v4-pro",
    choices: [
      {
        message: {
          role: "assistant",
          content: "Visible answer",
          reasoning_content: "DeepSeek reasoning",
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].message.content, "Visible answer");
  assert.equal((sanitized as any).choices[0].message.reasoning_content, "DeepSeek reasoning");
});

test("sanitizeOpenAIResponse preserves DeepSeek V4 reasoning_details with visible text", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "deepseek-v4/reasoner",
    choices: [
      {
        message: {
          role: "assistant",
          content: "Visible answer",
          reasoning_details: [
            { type: "reasoning.text", text: "first " },
            { type: "thinking", content: "second" },
          ],
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].message.reasoning_content, "first second");
});

test("sanitizeOpenAIResponse still strips non-DeepSeek reasoning_content with visible text", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "o3-mini",
    choices: [
      {
        message: {
          role: "assistant",
          content: "Visible answer",
          reasoning_content: "OpenAI reasoning",
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].message.reasoning_content, undefined);
});

test("sanitizeOpenAIResponse keeps reasoning_details-derived reasoning_content for reasoning-only messages", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "openrouter/model",
    choices: [
      {
        message: {
          role: "assistant",
          content: "",
          reasoning_details: [
            { type: "reasoning.text", text: "first " },
            { type: "thinking", content: "second" },
          ],
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].message.reasoning_content, "first second");
});

test("sanitizeResponsesApiResponse converts chat completions tool calls into Responses output items", () => {
  const sanitized = sanitizeResponsesApiResponse({
    id: "chatcmpl_tool",
    object: "chat.completion",
    created: 123,
    model: "gpt-4.1",
    choices: [
      {
        index: 0,
        finish_reason: "tool_calls",
        message: {
          role: "assistant",
          content: "",
          reasoning_content: "Check web results first.",
          tool_calls: [
            {
              id: "call_web_search",
              type: "function",
              function: {
                name: "omniroute_web_search",
                arguments: '{"query":"omniroute"}',
              },
            },
          ],
        },
      },
    ],
    usage: {
      prompt_tokens: 12,
      completion_tokens: 5,
      prompt_tokens_details: { cached_tokens: 3 },
      completion_tokens_details: { reasoning_tokens: 2 },
    },
  });

  assert.equal((sanitized as any).object, "response");
  assert.equal((sanitized as any).id, "resp_chatcmpl_tool");
  assert.equal((sanitized as any).output[0].type, "reasoning");
  (assert as any).equal((sanitized as any).output[1].type, "function_call");
  (assert as any).equal((sanitized as any).output[1].call_id, "call_web_search");
  (assert as any).equal((sanitized as any).output[1].name, "omniroute_web_search");
  assert.equal((sanitized as any).usage.input_tokens, 12);
  assert.equal(((sanitized as any).usage as any).output_tokens, 5);
  assert.equal((sanitized as any).usage.input_tokens_details.cached_tokens, 3);
  assert.equal((sanitized as any).usage.output_tokens_details.reasoning_tokens, 2);
});

test("sanitizeResponsesApiResponse synthesizes an output[] message from output_text-only bodies (#4942 regression)", () => {
  const sanitized = sanitizeResponsesApiResponse({
    object: "response",
    status: "completed",
    model: "lmstudio/local",
    output_text: "  I prefer TypeScript.  ",
  }) as any;

  assert.equal(sanitized.object, "response");
  // output[] must be synthesized (was dropped before the fix → response flagged malformed)
  assert.equal(sanitized.output.length, 1);
  assert.equal(sanitized.output[0].type, "message");
  assert.equal(sanitized.output[0].role, "assistant");
  assert.equal(sanitized.output[0].content[0].type, "output_text");
  assert.equal(sanitized.output[0].content[0].text, "I prefer TypeScript.");
  // and output_text is re-derived (trimmed) from the synthesized item
  assert.equal(sanitized.output_text, "I prefer TypeScript.");
});

test("sanitizeResponsesApiResponse leaves output[] empty when output_text is blank", () => {
  const sanitized = sanitizeResponsesApiResponse({
    object: "response",
    status: "completed",
    output_text: "   ",
  }) as any;
  assert.equal(sanitized.output.length, 0);
  assert.equal(sanitized.output_text, undefined);
});

test("sanitizeResponsesApiResponse preserves native Responses payloads and usage details", () => {
  const sanitized = sanitizeResponsesApiResponse({
    id: "resp_native",
    object: "response",
    created_at: 456,
    model: "gpt-5.1-codex",
    status: "completed",
    output: [
      {
        id: "msg_1",
        type: "message",
        role: "assistant",
        content: [{ type: "output_text", text: "Hello\n\n\nworld", annotations: [] }],
      },
      {
        id: "fc_1",
        type: "function_call",
        call_id: "call_1",
        name: "lookup",
        arguments: { path: "/tmp/a" },
      },
    ],
    usage: {
      input_tokens: 20,
      output_tokens: 7,
      prompt_tokens_details: { cached_tokens: 4 },
      cache_creation_input_tokens: 1,
      completion_tokens_details: { reasoning_tokens: 3 },
    },
  });

  assert.equal((sanitized as any).object, "response");
  assert.equal(((sanitized as any).output[0] as any).content[0].text, "Hello\n\nworld");
  assert.equal((sanitized as any).output[1].arguments, '{"path":"/tmp/a"}');
  assert.equal((sanitized as any).output_text, "Hello\n\nworld");
  assert.equal((sanitized as any).usage.input_tokens, 20);
  (assert as any).equal((sanitized as any).usage.output_tokens, 7);
  assert.equal((sanitized as any).usage.input_tokens_details.cached_tokens, 4);
  assert.equal((sanitized as any).usage.input_tokens_details.cache_creation_tokens, 1);
  assert.equal((sanitized as any).usage.output_tokens_details.reasoning_tokens, 3);
});

test("sanitizeStreamingChunk keeps only safe chunk fields and preserves readable reasoning aliases", () => {
  const sanitized = sanitizeStreamingChunk({
    id: "chunk_1",
    object: "chat.completion.chunk",
    created: 456,
    model: "gpt-4.1",
    choices: [
      {
        index: 3,
        delta: {
          role: "assistant",
          content: "Line 1\n\n\nLine 2",
          reasoning: "stream reasoning",
          tool_calls: [{ id: "call_1" }],
        },
        finish_reason: "stop",
        logprobs: { mock: true },
      },
    ],
    usage: { input_tokens: 2, output_tokens: 1, secret: true },
    system_fingerprint: "fp_123",
    provider_debug: "drop-me",
  });

  assert.deepEqual(sanitized, {
    id: "chunk_1",
    object: "chat.completion.chunk",
    created: 456,
    model: "gpt-4.1",
    choices: [
      {
        index: 3,
        delta: {
          role: "assistant",
          content: "Line 1\n\nLine 2",
          reasoning: "stream reasoning",
          tool_calls: [{ id: "call_1" }],
        },
        finish_reason: "stop",
        logprobs: { mock: true },
      },
    ],
    usage: {
      prompt_tokens: 2,
      completion_tokens: 1,
      total_tokens: 3,
    },
    system_fingerprint: "fp_123",
  });
});

test("sanitizeStreamingChunk converts reasoning_details arrays in deltas", () => {
  const sanitized = sanitizeStreamingChunk({
    choices: [
      {
        delta: {
          reasoning_details: [{ type: "reasoning.text", text: "alpha" }, { content: "beta" }],
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].delta.reasoning_content, "alphabeta");
  assert.deepEqual((sanitized as any).choices[0].delta.reasoning_details, [
    { type: "reasoning.text", text: "alpha" },
    { content: "beta" },
  ]);
});

test("sanitizeStreamingChunk preserves client-readable reasoning deltas", () => {
  const sanitized = sanitizeStreamingChunk({
    choices: [
      {
        delta: {
          reasoning: "readable reasoning",
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].delta.reasoning, "readable reasoning");
  assert.equal((sanitized as any).choices[0].delta.reasoning_content, undefined);
});

test("sanitizeStreamingChunk preserves and mirrors Copilot reasoning_text deltas", () => {
  const sanitized = sanitizeStreamingChunk({
    choices: [
      {
        delta: {
          reasoning_text: "copilot reasoning",
        },
      },
    ],
  });

  assert.equal((sanitized as any).choices[0].delta.reasoning_text, "copilot reasoning");
  assert.equal((sanitized as any).choices[0].delta.reasoning_content, "copilot reasoning");
});

test("sanitizeStreamingChunk strips commentary content from Responses completed events", () => {
  const sanitized = sanitizeStreamingChunk({
    type: "response.completed",
    response: {
      id: "resp_1",
      object: "response",
      model: "gpt-5.1-codex",
      status: "completed",
      output_text: "hiddenshown",
      output: [
        {
          id: "msg_1",
          type: "message",
          role: "assistant",
          content: [
            { type: "output_text", text: "hidden", phase: "commentary" },
            { type: "output_text", text: "shown", phase: "final_answer" },
          ],
        },
      ],
    },
  });

  assert.equal((sanitized as any).response.output[0].content.length, 1);
  assert.equal((sanitized as any).response.output[0].content[0].text, "shown");
  assert.equal((sanitized as any).response.output_text, "shown");
});

test("sanitizeStreamingChunk marks internal Responses output_item events for omission", () => {
  const sanitized = sanitizeStreamingChunk({
    type: "response.output_item.done",
    item: {
      id: "msg_internal",
      type: "message",
      role: "assistant",
      phase: "commentary",
      content: [{ type: "output_text", text: "hidden" }],
    },
  });

  assert.equal((sanitized as any).__omniroute_omit_streaming_chunk, true);
  assert.equal("item" in (sanitized as any), false);
});

test("sanitizeOpenAIResponse preserves reasoning_content when tool_calls are present", () => {
  // Bug fix: Kimi and other thinking-enabled providers require reasoning_content
  // on assistant messages that contain tool_calls. The sanitizer was stripping
  // reasoning_content whenever visible content existed, breaking subsequent
  // requests with "thinking is enabled but reasoning_content is missing".
  const sanitized = sanitizeOpenAIResponse({
    model: "kimi-k2.6-thinking",
    choices: [
      {
        message: {
          role: "assistant",
          content: "Let me search for that.",
          reasoning_content: "I need to use the web search tool to find current information.",
          tool_calls: [
            {
              id: "call_search_1",
              type: "function",
              function: {
                name: "web_search",
                arguments: '{"query":"latest news"}',
              },
            },
          ],
        },
      },
    ],
  });

  const message = (sanitized as any).choices[0].message;
  assert.equal(message.content, "Let me search for that.");
  assert.equal(
    message.reasoning_content,
    "I need to use the web search tool to find current information.",
    "reasoning_content must be preserved when tool_calls are present"
  );
  assert.equal(message.tool_calls.length, 1);
  assert.equal(message.tool_calls[0].id, "call_search_1");
});

test("sanitizeOpenAIResponse still strips reasoning_content when no tool_calls exist", () => {
  // When there are no tool_calls, the original behavior should remain:
  // reasoning_content is stripped to avoid client rendering issues.
  const sanitized = sanitizeOpenAIResponse({
    model: "gpt-4.1",
    choices: [
      {
        message: {
          role: "assistant",
          content: "Hello world",
          reasoning_content: "Some internal reasoning",
        },
      },
    ],
  });

  const message = (sanitized as any).choices[0].message;
  assert.equal(message.content, "Hello world");
  assert.equal(message.reasoning_content, undefined);
});

test("sanitizeOpenAIResponse preserves reasoning_content when legacy function_call is present", () => {
  const sanitized = sanitizeOpenAIResponse({
    model: "kimi-k2.6-thinking",
    choices: [
      {
        message: {
          role: "assistant",
          content: "Let me calculate that.",
          reasoning_content: "I need to use the calculator function.",
          function_call: { name: "calculate", arguments: '{"expr":"1+1"}' },
        },
      },
    ],
  });

  const message = (sanitized as any).choices[0].message;
  assert.equal(message.content, "Let me calculate that.");
  assert.equal(
    message.reasoning_content,
    "I need to use the calculator function.",
    "reasoning_content must be preserved when legacy function_call is present"
  );
  assert.deepEqual(message.function_call, { name: "calculate", arguments: '{"expr":"1+1"}' });
});

test("sanitize functions return non-object inputs unchanged", () => {
  assert.equal(sanitizeOpenAIResponse(null), null);
  assert.equal(sanitizeStreamingChunk("raw text"), "raw text");
});

test("sanitizeOpenAIResponse converts textual pseudo tool-call content into structured tool_calls", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl_textual_tool_call",
    object: "chat.completion",
    created: 1,
    model: "MainAgent",
    choices: [
      {
        index: 0,
        finish_reason: "stop",
        message: {
          role: "assistant",
          content:
            'Проверю.\n[Tool call: terminal]\nArguments: {"command":"echo hermes_textual_toolcall_guard","timeout":10}',
        },
      },
    ],
  }) as any;

  const choice = sanitized.choices[0];
  assert.equal(choice.finish_reason, "tool_calls");
  assert.equal(choice.message.content, null);
  assert.equal(choice.message.tool_calls[0].type, "function");
  assert.equal(choice.message.tool_calls[0].function.name, "terminal");
  assert.deepEqual(JSON.parse(choice.message.tool_calls[0].function.arguments), {
    command: "echo hermes_textual_toolcall_guard",
    timeout: 10,
  });
  assert.equal(JSON.stringify(sanitized).includes("[Tool call:"), false);
  assert.equal(JSON.stringify(sanitized).includes("Arguments:"), false);
});

test("sanitizeOpenAIResponse suppresses malformed textual pseudo tool-call content", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl_malformed_textual_tool_call",
    object: "chat.completion",
    created: 1,
    model: "MainAgent",
    choices: [
      {
        index: 0,
        finish_reason: "stop",
        message: {
          role: "assistant",
          content: "[Tool call: terminal]\nArguments: {not json",
        },
      },
    ],
  }) as any;

  const choice = sanitized.choices[0];
  assert.equal(choice.finish_reason, "stop");
  assert.equal(choice.message.content, null);
  assert.equal(choice.message.tool_calls, undefined);
  assert.equal(JSON.stringify(sanitized).includes("[Tool call:"), false);
  assert.equal(JSON.stringify(sanitized).includes("Arguments:"), false);
});

test("sanitizeOpenAIResponse strips leaked internal to=functions tool envelopes from assistant text", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl_internal_tool_envelope",
    object: "chat.completion",
    created: 1,
    model: "MainAgent",
    choices: [
      {
        index: 0,
        finish_reason: "stop",
        message: {
          role: "assistant",
          content:
            'Vou verificar agora.\n\nto=functions.run_in_terminal  tokenjson\n{"command":"pwd","explanation":"Teste","goal":"Teste","mode":"sync","isBackground":false,"timeout":120000}\n\nResumo final.',
        },
      },
    ],
  }) as any;

  const message = sanitized.choices[0].message;
  assert.equal(message.content, "Vou verificar agora.\n\nResumo final.");
  assert.equal(JSON.stringify(sanitized).includes("to=functions.run_in_terminal"), false);
  assert.equal(JSON.stringify(sanitized).includes('"command":"pwd"'), false);
});

test("sanitizeResponsesApiResponse strips leaked multi_tool_use envelopes from Responses output_text", () => {
  const sanitized = sanitizeResponsesApiResponse({
    id: "resp_internal_tool_envelope",
    object: "response",
    created_at: 1,
    model: "gpt-5.1-codex",
    status: "completed",
    output: [
      {
        id: "msg_1",
        type: "message",
        role: "assistant",
        content: [
          {
            type: "output_text",
            text: 'Antes.\n\nto=multi_tool_use.parallel  junkjson\n{"tool_uses":[{"recipient_name":"functions.read_file","parameters":{"filePath":"/tmp/a","startLine":1,"endLine":10}}]}\n\nDepois.',
            annotations: [],
          },
        ],
      },
    ],
  }) as any;

  assert.equal(sanitized.output[0].content[0].text, "Antes.\n\nDepois.");
  assert.equal(sanitized.output_text, "Antes.\n\nDepois.");
  assert.equal(JSON.stringify(sanitized).includes("to=multi_tool_use.parallel"), false);
  assert.equal(JSON.stringify(sanitized).includes("recipient_name"), false);
});
