import test from "node:test";
import assert from "node:assert/strict";

const { antigravityToOpenAIResponse, geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

function createStreamingState() {
  return {
    toolCalls: new Map(),
  };
}

test("Gemini non-stream: single candidate text maps to one OpenAI choice", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-single",
      modelVersion: "gemini-2.5-flash",
      createTime: "2026-04-05T12:00:00.000Z",
      candidates: [
        {
          content: {
            parts: [{ text: "Hello from Gemini" }],
          },
          finishReason: "STOP",
        },
      ],
      usageMetadata: {
        promptTokenCount: 3,
        candidatesTokenCount: 5,
        totalTokenCount: 8,
      },
    },
    FORMATS.GEMINI,
    FORMATS.OPENAI
  );

  assert.equal((result as any).object, "chat.completion");
  (assert as any).equal((result as any).id, "chatcmpl-resp-single");
  (assert as any).equal((result as any).model, "gemini-2.5-flash");
  assert.equal((result as any).choices.length, 1);
  assert.equal((result as any).choices[0].message.role, "assistant");
  assert.equal((result as any).choices[0].message.content, "Hello from Gemini");
  assert.equal((result as any).choices[0].finish_reason, "stop");
  (assert as any).deepEqual((result as any).usage, {
    prompt_tokens: 3,
    completion_tokens: 5,
    total_tokens: 8,
  });
});

test("Gemini non-stream: multiple candidates keep multimodal content, reasoning and tool calls", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-multi",
      modelVersion: "gemini-2.5-pro",
      createTime: "2026-04-05T12:00:00.000Z",
      candidates: [
        {
          content: {
            parts: [
              { thought: true, text: "Plan first." },
              { text: "Answer:" },
              { inlineData: { mimeType: "image/png", data: "abc123" } },
              {
                functionCall: { id: "native-read-1", name: "read_file", args: { path: "/tmp/a" } },
              },
            ],
          },
          finishReason: "STOP",
        },
        {
          content: {
            parts: [{ text: "Second option" }],
          },
          finishReason: "MAX_TOKENS",
        },
      ],
      usageMetadata: {
        promptTokenCount: 4,
        candidatesTokenCount: 6,
        thoughtsTokenCount: 2,
        totalTokenCount: 12,
        cachedContentTokenCount: 1,
      },
    },
    FORMATS.GEMINI,
    (FORMATS as any).OPENAI
  );

  assert.equal((result as any).choices.length, 2);
  assert.equal(((result as any).choices as any)[0].finish_reason, "tool_calls");
  assert.equal(((result as any).choices[0] as any).message.reasoning_content, "Plan first.");
  assert.equal((result as any).choices[0].message.content[0].text, "Answer:");
  assert.equal(
    ((result as any).choices[0].message as any).content[1].image_url.url,
    "data:image/png;base64,abc123"
  );
  assert.equal((result as any).choices[0].message.tool_calls[0].function.name, "read_file");
  assert.equal(
    ((result as any).choices[0].message as any).tool_calls[0].function.arguments,
    JSON.stringify({ path: "/tmp/a" })
  );
  assert.equal((result as any).choices[0].message.tool_calls[0].id, "native-read-1");
  assert.equal(((result as any).choices[1].message as any).content, "Second option");
  (assert as any).equal((result as any).choices[1].finish_reason, "length");
  assert.equal((result as any).usage.prompt_tokens, 4);
  assert.equal((result as any).usage.completion_tokens, 8);
  (assert as any).equal((result as any).usage.total_tokens, 12);
  assert.equal((result as any).usage.prompt_tokens_details.cached_tokens, 1);
  assert.equal((result as any).usage.completion_tokens_details.reasoning_tokens, 2);
});

test("Gemini non-stream: promptFeedback-only block becomes content_filter", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-safety",
      modelVersion: "gemini-2.5-flash",
      promptFeedback: { blockReason: "SAFETY" },
    },
    FORMATS.GEMINI,
    (FORMATS as any).OPENAI
  );

  assert.equal((result as any).object, "chat.completion");
  assert.equal((result as any).choices.length, 1);
  assert.equal((result as any).choices[0].message.content, "");
  assert.equal((result as any).choices[0].finish_reason, "content_filter");
});

test("Gemini non-stream: restores sanitized tool names from the request map", () => {
  const sanitizedToolName = "read_multiple_files_with_validation_bundle_ab12cd34";
  const originalToolName =
    "mcp__filesystem__read_multiple_files_with_validation_and_metadata_bundle_v2";
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-tool-map",
      modelVersion: "gemini-2.5-pro",
      createTime: "2026-04-05T12:00:00.000Z",
      candidates: [
        {
          content: {
            parts: [
              {
                functionCall: {
                  name: sanitizedToolName,
                  args: { path: "/tmp/a" },
                },
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    FORMATS.GEMINI,
    FORMATS.OPENAI,
    new Map([[sanitizedToolName, originalToolName]])
  );

  assert.equal((result as any).choices[0].message.tool_calls[0].function.name, originalToolName);
});

test("Gemini non-stream: restores Antigravity _ide-cloaked tool names from the request map", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-ag-tool-map",
      modelVersion: "antigravity/gemini-2.5-pro",
      createTime: "2026-04-22T12:00:00.000Z",
      candidates: [
        {
          content: {
            parts: [
              {
                functionCall: {
                  name: "read_project_file_ide",
                  args: { path: "/tmp/a" },
                },
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    FORMATS.ANTIGRAVITY,
    FORMATS.OPENAI,
    new Map([["read_project_file_ide", "read_project_file"]])
  );

  assert.equal((result as any).choices[0].message.tool_calls[0].function.name, "read_project_file");
});

test("Gemini stream: first text chunk emits assistant role then content delta", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-stream",
      modelVersion: "gemini-2.5-pro",
      candidates: [
        {
          content: {
            parts: [{ text: "Hello" }],
          },
        },
      ],
    },
    state
  );

  assert.equal(result.length, 2);
  assert.equal(result[0].choices[0].delta.role, "assistant");
  assert.equal(result[1].choices[0].delta.content, "Hello");
  assert.equal(result[1].id, "chatcmpl-resp-stream");
});

test("Gemini stream: subsequent text chunks append content without re-emitting role", () => {
  const state = createStreamingState();
  geminiToOpenAIResponse(
    {
      responseId: "resp-stream",
      modelVersion: "gemini-2.5-pro",
      candidates: [{ content: { parts: [{ text: "Hel" }] } }],
    },
    state
  );

  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-stream",
      modelVersion: "gemini-2.5-pro",
      candidates: [{ content: { parts: [{ text: "lo" }] } }],
    },
    state
  );

  assert.equal(result.length, 1);
  assert.equal(result[0].choices[0].delta.role, undefined);
  assert.equal(result[0].choices[0].delta.content, "lo");
});

test("Gemini stream: reasoning, tool call, image and MAX_TOKENS finish are converted", () => {
  const state = {
    ...createStreamingState(),
    toolNameMap: new Map([
      [
        "weather_lookup_bundle_ab12cd34",
        "mcp__filesystem__read_multiple_files_with_validation_and_metadata_bundle_v2",
      ],
    ]),
  };
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-rich",
      modelVersion: "gemini-2.5-pro",
      candidates: [
        {
          content: {
            parts: [
              { thought: true, thoughtSignature: "sig-1", text: "Need a plan." },
              {
                functionCall: {
                  id: "native-call-1",
                  name: "weather_lookup_bundle_ab12cd34",
                  args: { city: "Sao Paulo" },
                },
              },
              { inlineData: { mimeType: "image/png", data: "imgdata" } },
            ],
          },
          finishReason: "MAX_TOKENS",
        },
      ],
      usageMetadata: {
        promptTokenCount: 4,
        candidatesTokenCount: 3,
        thoughtsTokenCount: 2,
        totalTokenCount: 9,
        cachedContentTokenCount: 1,
      },
    },
    state
  );

  assert.equal(result[1].choices[0].delta.reasoning_content, "Need a plan.");
  assert.equal(result[2].choices[0].delta.tool_calls[0].id, "native-call-1");
  assert.equal(
    result[2].choices[0].delta.tool_calls[0].function.name,
    "mcp__filesystem__read_multiple_files_with_validation_and_metadata_bundle_v2"
  );
  assert.equal(
    result[2].choices[0].delta.tool_calls[0].function.arguments,
    JSON.stringify({ city: "Sao Paulo" })
  );
  assert.equal(result[3].choices[0].delta.images[0].image_url.url, "data:image/png;base64,imgdata");
  assert.equal(result[4].choices[0].finish_reason, "length");
  assert.equal(result[4].usage.prompt_tokens, 4);
  assert.equal(result[4].usage.completion_tokens, 5);
  assert.equal(result[4].usage.prompt_tokens_details.cached_tokens, 1);
  assert.equal(result[4].usage.completion_tokens_details.reasoning_tokens, 2);
});

test("Gemini stream: stores thoughtSignature when signature-only part precedes functionCall", async () => {
  const { resolveGeminiThoughtSignature } =
    await import("../../open-sse/services/geminiThoughtSignatureStore.ts");
  const state = {
    ...createStreamingState(),
    signatureNamespace: "conn-antigravity-1",
  };
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-split-signature",
      modelVersion: "gemini-3-flash-agent",
      candidates: [
        {
          content: {
            parts: [
              { thoughtSignature: "sig-split-1" },
              {
                functionCall: {
                  id: "call_split_1",
                  name: "read_file",
                  args: { path: "/tmp/a" },
                },
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );

  const toolCall = result.find((event: any) => event.choices?.[0]?.delta?.tool_calls)?.choices[0]
    .delta.tool_calls[0];
  assert.equal(toolCall.id, "call_split_1");
  assert.equal(state.pendingThoughtSignature, null);
  assert.equal(resolveGeminiThoughtSignature("conn-antigravity-1:call_split_1"), "sig-split-1");
});

test("Gemini stream: converts textual Tool call block to structured tool_calls", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-textual-tool",
      modelVersion: "gemini-3.5-flash-low",
      candidates: [
        {
          content: {
            parts: [
              {
                text: '[Tool call: terminal]\nArguments: {"command":"sqlite3 ~/.omniroute/storage.sqlite \\"SELECT name FROM sqlite_master WHERE type=\'table\';\\""}',
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );

  const toolCall = result.find((event: any) => event.choices?.[0]?.delta?.tool_calls)?.choices[0]
    .delta.tool_calls[0];
  assert.ok(toolCall.id.startsWith("terminal-"));
  assert.equal(toolCall.function.name, "terminal");
  assert.equal(
    toolCall.function.arguments,
    JSON.stringify({
      command:
        "sqlite3 ~/.omniroute/storage.sqlite \"SELECT name FROM sqlite_master WHERE type='table';\"",
    })
  );
  assert.equal(
    result.some((event: any) => event.choices?.[0]?.delta?.content?.includes("[Tool call:")),
    false
  );
  assert.equal(result.at(-1).choices[0].finish_reason, "tool_calls");
});

test("Gemini stream: routes textual reasoning tags to reasoning_content before tool calls", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-textual-thought-tool",
      modelVersion: "gemini-3.5-flash-high",
      candidates: [
        {
          content: {
            parts: [
              {
                text: "§54§ <thought\nNeed to inspect first.",
              },
              {
                functionCall: {
                  id: "call_grep",
                  name: "grep",
                  args: { pattern: "Host", path: "/tmp/file" },
                },
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );

  assert.equal(
    result.some((event: any) => event.choices?.[0]?.delta?.content?.includes("<thought")),
    false
  );
  assert.equal(
    result.find((event: any) => event.choices?.[0]?.delta?.reasoning_content)?.choices[0].delta
      .reasoning_content,
    "Need to inspect first."
  );
  const toolCall = result.find((event: any) => event.choices?.[0]?.delta?.tool_calls)?.choices[0]
    .delta.tool_calls[0];
  assert.equal(toolCall.id, "call_grep");
  assert.equal(result.at(-1).choices[0].finish_reason, "tool_calls");
});

test("Antigravity/Agy stream: prompt-format thinking tags remain content before tool calls", () => {
  const state = createStreamingState();
  const result = antigravityToOpenAIResponse(
    {
      response: {
        responseId: "resp-agy-prompt-tags",
        modelVersion: "claude-opus-4-6-thinking",
        candidates: [
          {
            content: {
              parts: [
                { text: "<thinking>prompt-required section</thinking><content>answer</content>" },
                {
                  functionCall: {
                    id: "call_lookup",
                    name: "lookup",
                    args: { query: "status" },
                  },
                },
              ],
            },
            finishReason: "STOP",
          },
        ],
      },
    },
    state
  );

  const content = result.map((event: any) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content, "<thinking>prompt-required section</thinking><content>answer</content>");
  assert.equal(
    result.some((event: any) => event.choices?.[0]?.delta?.reasoning_content),
    false
  );
  const toolCall = result.find((event: any) => event.choices?.[0]?.delta?.tool_calls)?.choices[0]
    .delta.tool_calls[0];
  assert.equal(toolCall.id, "call_lookup");
});

test("Antigravity/Agy stream: native Gemini thought parts still become reasoning_content", () => {
  const state = createStreamingState();
  const result = antigravityToOpenAIResponse(
    {
      response: {
        responseId: "resp-agy-native-thought",
        modelVersion: "gemini-3.5-flash-low",
        candidates: [
          {
            content: {
              parts: [{ thought: true, text: "native thought" }, { text: "visible answer" }],
            },
            finishReason: "STOP",
          },
        ],
      },
    },
    state
  );

  assert.equal(
    result.find((event: any) => event.choices?.[0]?.delta?.reasoning_content)?.choices[0].delta
      .reasoning_content,
    "native thought"
  );
  assert.equal(
    result.find((event: any) => event.choices?.[0]?.delta?.content)?.choices[0].delta.content,
    "visible answer"
  );
});

test("Gemini stream: keeps textual reasoning hidden across split chunks", () => {
  const state = createStreamingState();

  const first = geminiToOpenAIResponse(
    {
      responseId: "resp-split-thought",
      modelVersion: "gemini-3.5-flash-high",
      candidates: [{ content: { parts: [{ text: "§54§ <tho" }] } }],
    },
    state
  );
  assert.equal(
    first.some((event: any) => event.choices?.[0]?.delta?.content),
    false
  );

  const second = geminiToOpenAIResponse(
    {
      responseId: "resp-split-thought",
      modelVersion: "gemini-3.5-flash-high",
      candidates: [{ content: { parts: [{ text: "ught\nNeed to inspect" }] } }],
    },
    state
  );
  assert.equal(
    (second ?? []).some((event: any) =>
      event.choices?.[0]?.delta?.content?.includes("Need to inspect")
    ),
    false
  );

  const third = geminiToOpenAIResponse(
    {
      responseId: "resp-split-thought",
      modelVersion: "gemini-3.5-flash-high",
      candidates: [{ content: { parts: [{ text: " more</tho" }] } }],
    },
    state
  );
  assert.equal(
    (third ?? []).some((event: any) => event.choices?.[0]?.delta?.content?.includes("more")),
    false
  );

  const fourth = geminiToOpenAIResponse(
    {
      responseId: "resp-split-thought",
      modelVersion: "gemini-3.5-flash-high",
      candidates: [{ content: { parts: [{ text: "ught>Visible answer" }] } }],
    },
    state
  );
  assert.equal(
    fourth.some(
      (event: any) => event.choices?.[0]?.delta?.reasoning_content === "Need to inspect more"
    ),
    true
  );
  assert.equal(
    fourth.some((event: any) => event.choices?.[0]?.delta?.content?.includes("ught>")),
    false
  );
  assert.equal(
    fourth.find((event: any) => event.choices?.[0]?.delta?.content)?.choices[0].delta.content,
    "Visible answer"
  );
});

test("Gemini stream: converts prefixed textual Tool call block with zero-width chars", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-textual-tool-prefixed",
      modelVersion: "gemini-3.5-flash-low",
      candidates: [
        {
          content: {
            parts: [
              {
                text: '(empty)[Tool call: terminal]\nArguments: {"command":"sqlite3 ~/.o\u200dmniroute/storage.sqlite"}',
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );

  const toolCall = result.find((event: any) => event.choices?.[0]?.delta?.tool_calls)?.choices[0]
    .delta.tool_calls[0];
  assert.ok(toolCall.id.startsWith("terminal-"));
  assert.equal(toolCall.function.name, "terminal");
  assert.equal(
    toolCall.function.arguments,
    JSON.stringify({
      command: "sqlite3 ~/.omniroute/storage.sqlite",
    })
  );
  assert.equal(
    result.some((event: any) => event.choices?.[0]?.delta?.content?.includes("[Tool call:")),
    false
  );
  assert.equal(result.at(-1).choices[0].finish_reason, "tool_calls");
});

test("Gemini stream: tool calls without native IDs keep deterministic fallback shape", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-tool-no-id",
      modelVersion: "gemini-3-flash-preview",
      candidates: [
        {
          content: {
            parts: [
              {
                thoughtSignature: "sig-2",
                functionCall: {
                  name: "read_file",
                  args: { file_path: "fixture.txt" },
                },
              },
            ],
          },
        },
      ],
    },
    state
  );

  const toolCall = result[1].choices[0].delta.tool_calls[0];
  assert.match(toolCall.id, /^read_file-\d+-0$/);
  assert.equal(toolCall.function.name, "read_file");
  assert.equal(toolCall.function.arguments, JSON.stringify({ file_path: "fixture.txt" }));
});

test("Gemini stream: safety block without candidates emits role chunk then content_filter finish", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-safety",
      modelVersion: "gemini-2.5-flash",
      promptFeedback: { blockReason: "SAFETY" },
    },
    state
  );

  assert.equal(result.length, 2);
  assert.equal(result[0].choices[0].delta.role, "assistant");
  assert.equal(result[1].choices[0].finish_reason, "content_filter");
});

test("Gemini stream: grounding metadata (citations) are extracted", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-grounding",
      modelVersion: "gemini-2.0-flash",
      candidates: [
        {
          content: { parts: [{ text: "Today is sunny." }] },
          groundingMetadata: {
            groundingChunks: [{ web: { title: "Weather Today", uri: "https://weather.com" } }],
          },
        },
      ],
    },
    state
  );

  assert.equal(result[1].choices[0].delta.content, "Today is sunny.");
  assert.deepEqual(result[2].choices[0].delta.citations, [
    { title: "Weather Today", url: "https://weather.com" },
  ]);
});

test("Gemini stream: null chunk is ignored", () => {
  assert.equal(geminiToOpenAIResponse(null, createStreamingState()), null);
});

test("Gemini stream: unwraps native functionCall args when emitted as JSON string", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-native-tool-json-string",
      modelVersion: "gemini-3.5-flash-low",
      candidates: [
        {
          content: {
            parts: [
              {
                functionCall: {
                  name: "terminal",
                  args: JSON.stringify({
                    command: 'ssh test-vps "systemctl cat omniroute.service"',
                  }),
                },
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );

  const toolCall = result.find((event: any) => event.choices?.[0]?.delta?.tool_calls)?.choices[0]
    .delta.tool_calls[0];
  assert.equal(toolCall.function.name, "terminal");
  assert.equal(
    toolCall.function.arguments,
    JSON.stringify({ command: 'ssh test-vps "systemctl cat omniroute.service"' })
  );
});

test("Gemini stream: converts JSON-string encoded textual Tool call arguments", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-textual-tool-json-string",
      modelVersion: "gemini-3.5-flash-low",
      candidates: [
        {
          content: {
            parts: [
              {
                text: '[Tool call: terminal]\nArguments: "{\\\"command\\\":\\\"ssh test-vps \\\\\\\"systemctl cat omniroute.service\\\\\\\"\\\"}"',
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );

  const toolCall = result.find((event: any) => event.choices?.[0]?.delta?.tool_calls)?.choices[0]
    .delta.tool_calls[0];
  assert.ok(toolCall.id.startsWith("terminal-"));
  assert.equal(toolCall.function.name, "terminal");
  assert.equal(
    toolCall.function.arguments,
    JSON.stringify({ command: 'ssh test-vps "systemctl cat omniroute.service"' })
  );
  assert.equal(
    result.some((event: any) => event.choices?.[0]?.delta?.content?.includes("[Tool call:")),
    false
  );
  assert.equal(result.at(-1).choices[0].finish_reason, "tool_calls");
});

test("Gemini stream: suppresses malformed textual Tool call marker", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-textual-tool-malformed",
      modelVersion: "gemini-3.5-flash-low",
      candidates: [
        {
          content: {
            parts: [
              {
                text: '[Tool call: terminal]\nArguments: {"command":"unterminated}',
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );

  assert.equal(
    result.some((event: any) => event.choices?.[0]?.delta?.content?.includes("[Tool call:")),
    false
  );
  assert.equal(
    result.some((event: any) => event.choices?.[0]?.delta?.tool_calls),
    false
  );
  assert.equal(result.at(-1).choices[0].finish_reason, "stop");
});

test("Gemini stream: handles textual Tool call block split across chunks", () => {
  const state = createStreamingState();
  const chunk1 = {
    responseId: "resp-split",
    modelVersion: "gemini-3.5-flash-low",
    candidates: [
      {
        content: {
          parts: [
            {
              text: "[Tool call: terminal]",
            },
          ],
        },
      },
    ],
  };
  const chunk2 = {
    responseId: "resp-split",
    modelVersion: "gemini-3.5-flash-low",
    candidates: [
      {
        content: {
          parts: [
            {
              text: '\nArguments: {"command":"whoami"}',
            },
          ],
        },
        finishReason: "STOP",
      },
    ],
  };

  const res1 = geminiToOpenAIResponse(chunk1, state) || [];
  const res2 = geminiToOpenAIResponse(chunk2, state) || [];

  const leakedContent = [...res1, ...res2]
    .map((event) => event.choices?.[0]?.delta?.content || "")
    .join("");

  assert.equal(leakedContent, "");

  const toolCalls = [...res1, ...res2].flatMap(
    (event) => event.choices?.[0]?.delta?.tool_calls || []
  );
  assert.equal(toolCalls.length, 1);
  assert.equal(toolCalls[0].function.name, "terminal");
  assert.equal(toolCalls[0].function.arguments, JSON.stringify({ command: "whoami" }));
});

test("Gemini stream: does not swallow false positive textual tool call in backticks", () => {
  const state = createStreamingState();
  const chunk1 = {
    responseId: "resp-false-positive",
    modelVersion: "gemini-3.5-flash-low",
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Как исправить: `[Tool call: ",
            },
          ],
        },
      },
    ],
  };
  const chunk2 = {
    responseId: "resp-false-positive",
    modelVersion: "gemini-3.5-flash-low",
    candidates: [
      {
        content: {
          parts: [
            {
              text: "terminal]` не будут проходить.",
            },
          ],
        },
        finishReason: "STOP",
      },
    ],
  };

  const res1 = geminiToOpenAIResponse(chunk1, state) || [];
  const res2 = geminiToOpenAIResponse(chunk2, state) || [];

  const leakedContent = [...res1, ...res2]
    .map((event) => event.choices?.[0]?.delta?.content || "")
    .join("");

  assert.equal(leakedContent, "Как исправить: `[Tool call: terminal]` не будут проходить.");

  const toolCalls = [...res1, ...res2].flatMap(
    (event) => event.choices?.[0]?.delta?.tool_calls || []
  );
  assert.equal(toolCalls.length, 0);
});

test("Gemini stream: does not swallow terminated trailing false positive textual tool call", () => {
  const state = createStreamingState();
  const chunk1 = {
    responseId: "resp-false-positive-terminated",
    modelVersion: "gemini-3.5-flash-low",
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Как исправить: `[Tool call: ",
            },
          ],
        },
        finishReason: "STOP",
      },
    ],
  };

  const res1 = geminiToOpenAIResponse(chunk1, state) || [];
  const leakedContent = res1.map((event) => event.choices?.[0]?.delta?.content || "").join("");

  assert.equal(leakedContent, "Как исправить: `[Tool call: ");
});

test("Gemini stream: flushes left part before textual tool call candidate and flushes whole text on stop if content was emitted", () => {
  const state = createStreamingState() as any;
  const chunk1 = {
    responseId: "resp-test-flush-left",
    modelVersion: "gemini-3.5-flash-low",
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Дмитрий, привет! Вот: `",
            },
          ],
        },
      },
    ],
  };

  const chunk2 = {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "[Tool call: terminal]\nArguments: {}\` не будут проходить.",
            },
          ],
        },
        finishReason: "STOP",
      },
    ],
  };

  const res1 = geminiToOpenAIResponse(chunk1, state) || [];
  const content1 = res1.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content1, "Дмитрий, привет! Вот: `");

  const res2 = geminiToOpenAIResponse(chunk2, state) || [];
  const content2 = res2.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content2, "[Tool call: terminal]\nArguments: {}\` не будут проходить.");
});

test("Gemini stream: splits mid-stream partial candidate but preserves tool call if complete", () => {
  const state = createStreamingState() as any;
  const chunk1 = {
    responseId: "resp-test-split-candidate",
    modelVersion: "gemini-3.5-flash-low",
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Текст до: `[Tool call: ",
            },
          ],
        },
      },
    ],
  };

  const chunk2 = {
    candidates: [
      {
        content: {
          parts: [
            {
              text: 'read_file]\nArguments: {"path": "/tmp/a"}',
            },
          ],
        },
        finishReason: "STOP",
      },
    ],
  };

  const res1 = geminiToOpenAIResponse(chunk1, state) || [];
  const content1 = res1.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content1, "Текст до: `");

  const res2 = geminiToOpenAIResponse(chunk2, state) || [];
  const content2 = res2.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content2, "");

  assert.equal(state.toolCalls.size, 1);
  const toolCall: any = Array.from(state.toolCalls.values())[0];
  assert.equal(toolCall.function.name, "read_file");
  assert.equal(toolCall.function.arguments, '{"path":"/tmp/a"}');
});

test("Gemini stream: index mismatch regression test with zero-width characters in prefix", () => {
  const state = createStreamingState();
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-textual-tool-index-mismatch",
      modelVersion: "gemini-3.5-flash-low",
      candidates: [
        {
          content: {
            parts: [
              {
                text: '\u200BКак исправить: [Tool call: terminal]\nArguments: {"command":"whoami"}',
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    state
  );

  const leakedContent = result
    .map((event: any) => event.choices?.[0]?.delta?.content || "")
    .join("");
  assert.equal(leakedContent, "Как исправить: ");

  const toolCalls = result.flatMap((event: any) => event.choices?.[0]?.delta?.tool_calls || []);
  assert.equal(toolCalls.length, 1);
  assert.equal(toolCalls[0].function.name, "terminal");
  assert.equal(toolCalls[0].function.arguments, '{"command":"whoami"}');
});

test("Gemini stream: partial tool call with (empty) prefix check at chunk end does not leak (empty)", () => {
  const state = createStreamingState();
  const chunk1 = {
    responseId: "resp-empty-leak",
    modelVersion: "gemini-3.5-flash-low",
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Результат: (empty)[Tool ca",
            },
          ],
        },
      },
    ],
  };

  const chunk2 = {
    candidates: [
      {
        content: {
          parts: [
            {
              text: 'll: terminal]\nArguments: {"command":"whoami"}',
            },
          ],
        },
        finishReason: "STOP",
      },
    ],
  };

  const res1 = geminiToOpenAIResponse(chunk1, state) || [];
  const content1 = res1.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content1, "Результат: "); // (empty) must be buffered, not leaked!

  const res2 = geminiToOpenAIResponse(chunk2, state) || [];
  const content2 = res2.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content2, "");

  assert.equal(state.toolCalls.size, 1);
  const toolCall: any = Array.from(state.toolCalls.values())[0];
  assert.equal(toolCall.function.name, "terminal");
  assert.equal(toolCall.function.arguments, '{"command":"whoami"}');
});

test("Gemini stream: parses textual tool call that starts in a subsequent chunk after prose has been emitted", () => {
  const state = createStreamingState() as any;
  const chunk1 = {
    responseId: "resp-test-after-prose",
    modelVersion: "gemini-3.5-flash-low",
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Generating response now... ",
            },
          ],
        },
      },
    ],
  };

  const chunk2 = {
    candidates: [
      {
        content: {
          parts: [
            {
              text: '[Tool call: web_search]\nArguments: {"query": "AI news"}',
            },
          ],
        },
        finishReason: "STOP",
      },
    ],
  };

  const res1 = geminiToOpenAIResponse(chunk1, state) || [];
  const content1 = res1.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content1, "Generating response now... ");

  const res2 = geminiToOpenAIResponse(chunk2, state) || [];
  const content2 = res2.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content2, "");

  assert.equal(state.toolCalls.size, 1);
  const toolCall: any = Array.from(state.toolCalls.values())[0];
  assert.equal(toolCall.function.name, "web_search");
  assert.equal(toolCall.function.arguments, '{"query":"AI news"}');
});

test("Gemini stream: checks lastParen before lastBracket when identifying partial (empty) markers with distinct chuncks", () => {
  const state = createStreamingState() as any;

  // Имитируем чанк, который кончается на частичный "(empty)[Tool call:" маркер, например "(em"
  const chunk1 = {
    responseId: "resp-test-empty-partial",
    modelVersion: "gemini-3.5-flash-low",
    candidates: [
      {
        content: {
          parts: [
            {
              text: "Result is here: (em",
            },
          ],
        },
      },
    ],
  };

  // Имитируем чанк, который содержит и "(", и "[", кончаясь на "(empty)[Tool"
  // Если бы мы проверяли lastBracket первым, мы бы отрезали по "[", оставив "(empty)" утекать пользователю.
  const chunk2 = {
    candidates: [
      {
        content: {
          parts: [
            {
              text: "pty)[Tool",
            },
          ],
        },
      },
    ],
  };

  const chunk3 = {
    candidates: [
      {
        content: {
          parts: [
            {
              text: " call: my_tool]\nArguments: {}",
            },
          ],
        },
        finishReason: "STOP",
      },
    ],
  };

  const res1 = geminiToOpenAIResponse(chunk1, state) || [];
  const content1 = res1.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content1, "Result is here: "); // (em задерживается в буфере

  const res2 = geminiToOpenAIResponse(chunk2, state) || [];
  const content2 = res2.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content2, ""); // (empty)[Tool задерживается в буфере полностью, (empty) не утекает

  const res3 = geminiToOpenAIResponse(chunk3, state) || [];
  const content3 = res3.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(content3, "");

  assert.equal(state.toolCalls.size, 1);
  const toolCall: any = Array.from(state.toolCalls.values())[0];
  assert.equal(toolCall.function.name, "my_tool");
  assert.equal(toolCall.function.arguments, "{}");
});

// #3821-review LEDGER-4 — a signed native functionCall arriving while a textual
// `<thinking>` wrapper opened in an earlier chunk is still buffered must flush that
// buffered reasoning as reasoning_content, not silently discard it.
test("Gemini stream: open textual reasoning is flushed before a signed native tool call", () => {
  const state = createStreamingState();

  // chunk 1: opens a <thinking> wrapper with no close tag → buffered, nothing emitted.
  const r1 =
    geminiToOpenAIResponse(
      {
        responseId: "resp-flush-reasoning",
        modelVersion: "gemini-3-flash-agent",
        candidates: [{ content: { parts: [{ text: "<thinking>deep reasoning here" }] } }],
      },
      state
    ) || [];
  assert.ok(
    !r1.some((e: any) => e.choices?.[0]?.delta?.reasoning_content),
    "reasoning is still buffered (awaiting close tag) — nothing emitted yet"
  );

  // chunk 2: signed native functionCall while the reasoning wrapper is still open.
  const r2 =
    geminiToOpenAIResponse(
      {
        responseId: "resp-flush-reasoning",
        modelVersion: "gemini-3-flash-agent",
        candidates: [
          {
            content: {
              parts: [
                {
                  thoughtSignature: "sig-flush-1",
                  functionCall: { id: "call-flush-1", name: "do_thing", args: {} },
                },
              ],
            },
          },
        ],
      },
      state
    ) || [];

  const reasoningIdx = r2.findIndex((e: any) => e.choices?.[0]?.delta?.reasoning_content);
  const toolIdx = r2.findIndex((e: any) => e.choices?.[0]?.delta?.tool_calls);
  assert.equal(
    r2[reasoningIdx]?.choices[0].delta.reasoning_content,
    "deep reasoning here",
    "buffered textual reasoning must be flushed, not dropped, when a tool call arrives"
  );
  assert.equal(r2[toolIdx]?.choices[0].delta.tool_calls[0].id, "call-flush-1");
  assert.ok(
    reasoningIdx >= 0 && toolIdx > reasoningIdx,
    "reasoning is emitted before the tool call"
  );
});

// #3821-review LEDGER-15 — a reasoning-only chunk interrupting a partially-buffered
// textual "[Tool call: ...]" must not strand the buffer; it resolves once the rest of
// the tool-call text arrives (or at finishReason).
test("Gemini stream: partial textual tool call survives a reasoning-only chunk", () => {
  const state = createStreamingState();

  // chunk 1: partial textual tool call (incomplete JSON) → buffered.
  geminiToOpenAIResponse(
    {
      responseId: "resp-interleave",
      modelVersion: "gemini-3.5-flash-low",
      candidates: [
        { content: { parts: [{ text: '[Tool call: terminal]\nArguments: {"command":"ls' }] } },
      ],
    },
    state
  );

  // chunk 2: a reasoning-only chunk fully consumed as reasoning_content.
  const r2 =
    geminiToOpenAIResponse(
      {
        responseId: "resp-interleave",
        modelVersion: "gemini-3.5-flash-low",
        candidates: [{ content: { parts: [{ text: "<thinking>pondering</thinking>" }] } }],
      },
      state
    ) || [];
  assert.equal(
    r2.find((e: any) => e.choices?.[0]?.delta?.reasoning_content)?.choices[0].delta
      .reasoning_content,
    "pondering"
  );
  assert.ok(
    typeof state.textualToolCallBuffer === "string" &&
      state.textualToolCallBuffer.includes("[Tool call: terminal]"),
    "the partial tool-call buffer must survive the reasoning-only chunk"
  );

  // chunk 3: completes the tool-call text + finishReason → resolves to a structured call.
  const r3 =
    geminiToOpenAIResponse(
      {
        responseId: "resp-interleave",
        modelVersion: "gemini-3.5-flash-low",
        candidates: [{ content: { parts: [{ text: '"}' }] }, finishReason: "STOP" }],
      },
      state
    ) || [];
  const toolCall = r3.find((e: any) => e.choices?.[0]?.delta?.tool_calls)?.choices[0].delta
    .tool_calls[0];
  assert.ok(toolCall, "the textual tool call resolves after the reasoning-only interruption");
  assert.equal(toolCall.function.name, "terminal");
});
