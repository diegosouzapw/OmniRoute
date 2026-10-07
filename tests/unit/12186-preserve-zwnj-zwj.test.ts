import test from "node:test";
import assert from "node:assert/strict";

// #12186 — the response pipeline strips every zero-width code point in
// U+200B..U+200D to undo the request-side agent-word obfuscation (which inserts
// one U+200D after the first letter of an ASCII word). That blanket strip also
// deletes U+200C ZERO WIDTH NON-JOINER and U+200D ZERO WIDTH JOINER where they
// are part of the text itself: Persian half-space, Arabic/Indic shaping and
// emoji ZWJ sequences. These tests pin that linguistic joiners survive while the
// ASCII obfuscation marker is still removed.

const { sanitizeOpenAIResponse, sanitizeStreamingChunk } =
  await import("../../open-sse/handlers/responseSanitizer.ts");
const { parseTextualToolCallCandidate } = await import("../../open-sse/utils/textualToolCall.ts");
const { parseAntigravityTextualToolCall } =
  await import("../../open-sse/executors/antigravity/sseCollect.ts");
const { parseSSEToGeminiResponse } =
  await import("../../open-sse/handlers/sseParser/geminiResponse.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { stripObfuscationZeroWidth } = await import("../../open-sse/utils/zeroWidth.ts");
const { obfuscateSensitiveWords, getSensitiveWords } =
  await import("../../open-sse/services/claudeCodeObfuscation.ts");

// Exact word from the issue report: ارائه + U+200C + دهنده ("provider").
const PERSIAN_WORD = "ارائه\u200Cدهنده";
// Family emoji: MAN + ZWJ + WOMAN + ZWJ + GIRL.
const FAMILY_EMOJI = "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}";

function openAIChunk(delta: Record<string, unknown>) {
  return {
    id: "chatcmpl_12186",
    object: "chat.completion.chunk",
    created: 1,
    model: "auto",
    choices: [{ index: 0, delta, finish_reason: null }],
  };
}

test("#12186 sanitizeOpenAIResponse keeps Persian ZWNJ in non-stream message content", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl_12186",
    model: "auto",
    choices: [
      {
        index: 0,
        finish_reason: "stop",
        message: { role: "assistant", content: PERSIAN_WORD },
      },
    ],
  }) as unknown as { choices: { message: { content: string } }[] };

  assert.equal(sanitized.choices[0].message.content, PERSIAN_WORD);
});

test("#12186 sanitizeOpenAIResponse keeps joiners in text but still de-obfuscates ASCII agent words", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl_12186_mixed",
    model: "auto",
    choices: [
      {
        index: 0,
        finish_reason: "stop",
        message: {
          role: "assistant",
          content: `o\u200Dpencode ${PERSIAN_WORD} می\u200Cروم کتاب\u200Cها ${FAMILY_EMOJI} c\u200Dursor`,
        },
      },
    ],
  }) as unknown as { choices: { message: { content: string } }[] };

  assert.equal(
    sanitized.choices[0].message.content,
    `opencode ${PERSIAN_WORD} می\u200Cروم کتاب\u200Cها ${FAMILY_EMOJI} cursor`
  );
});

test("#12186 sanitizeOpenAIResponse still strips U+200B and U+FEFF from message content", () => {
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl_12186_zwsp",
    model: "auto",
    choices: [
      {
        index: 0,
        finish_reason: "stop",
        message: { role: "assistant", content: "\uFEFFhello\u200B world o\u200Bpencode" },
      },
    ],
  }) as unknown as { choices: { message: { content: string } }[] };

  assert.equal(sanitized.choices[0].message.content, "hello world opencode");
});

test("#12186 sanitizeOpenAIResponse keeps Persian ZWNJ inside tool-call arguments", () => {
  const args = JSON.stringify({ command: `echo ${PERSIAN_WORD}`, note: "o\u200Dpencode" });
  const sanitized = sanitizeOpenAIResponse({
    id: "chatcmpl_12186_tool",
    model: "auto",
    choices: [
      {
        index: 0,
        finish_reason: "tool_calls",
        message: {
          role: "assistant",
          content: "",
          tool_calls: [
            { id: "call_1", type: "function", function: { name: "run", arguments: args } },
          ],
        },
      },
    ],
  }) as unknown as {
    choices: { message: { tool_calls: { function: { arguments: string } }[] } }[];
  };

  assert.equal(
    sanitized.choices[0].message.tool_calls[0].function.arguments,
    JSON.stringify({ command: `echo ${PERSIAN_WORD}`, note: "opencode" })
  );
});

test("#12186 sanitizeStreamingChunk keeps Persian ZWNJ in OpenAI delta content", () => {
  const sanitized = sanitizeStreamingChunk(openAIChunk({ content: PERSIAN_WORD })) as unknown as {
    choices: { delta: { content: string } }[];
  };

  assert.equal(sanitized.choices[0].delta.content, PERSIAN_WORD);
});

test("#12186 sanitizeStreamingChunk keeps an emoji ZWJ sequence in OpenAI delta content", () => {
  const sanitized = sanitizeStreamingChunk(openAIChunk({ content: FAMILY_EMOJI })) as unknown as {
    choices: { delta: { content: string } }[];
  };

  assert.equal(sanitized.choices[0].delta.content, FAMILY_EMOJI);
});

test("#12186 sanitizeStreamingChunk keeps a delta that is only a ZWJ (emoji sequence split by the tokenizer)", () => {
  const sanitized = sanitizeStreamingChunk(openAIChunk({ content: "\u200D" })) as unknown as {
    choices: { delta: { content: string } }[];
  };

  assert.equal(sanitized.choices[0].delta.content, "\u200D");
});

test("#12186 sanitizeStreamingChunk still de-obfuscates an ASCII word split across deltas", () => {
  const first = sanitizeStreamingChunk(openAIChunk({ content: "o\u200D" })) as unknown as {
    choices: { delta: { content: string } }[];
  };
  const second = sanitizeStreamingChunk(openAIChunk({ content: "\u200Dpencode" })) as unknown as {
    choices: { delta: { content: string } }[];
  };

  assert.equal(first.choices[0].delta.content, "o");
  assert.equal(second.choices[0].delta.content, "pencode");
});

test("#12186 sanitizeStreamingChunk keeps Persian ZWNJ in reasoning_content deltas", () => {
  const sanitized = sanitizeStreamingChunk(
    openAIChunk({ reasoning_content: `${PERSIAN_WORD} c\u200Dursor` })
  ) as unknown as { choices: { delta: { reasoning_content: string } }[] };

  assert.equal(sanitized.choices[0].delta.reasoning_content, `${PERSIAN_WORD} cursor`);
});

test("#12186 sanitizeStreamingChunk keeps Persian ZWNJ in Anthropic text_delta events", () => {
  const sanitized = sanitizeStreamingChunk({
    type: "content_block_delta",
    index: 0,
    delta: { type: "text_delta", text: `${PERSIAN_WORD} ${FAMILY_EMOJI} a\u200Dider` },
  }) as unknown as { delta: { text: string } };

  assert.equal(sanitized.delta.text, `${PERSIAN_WORD} ${FAMILY_EMOJI} aider`);
});

test("#12186 sanitizeStreamingChunk keeps Persian ZWNJ in native response.output_text.delta", () => {
  const sanitized = sanitizeStreamingChunk({
    type: "response.output_text.delta",
    delta: PERSIAN_WORD,
  }) as unknown as { delta: string };

  assert.equal(sanitized.delta, PERSIAN_WORD);
});

test("#12186 sanitizeStreamingChunk keeps Persian ZWNJ in native response.output_text.done", () => {
  const sanitized = sanitizeStreamingChunk({
    type: "response.output_text.done",
    text: `${PERSIAN_WORD} o\u200Dpencode`,
  }) as unknown as { text: string };

  assert.equal(sanitized.text, `${PERSIAN_WORD} opencode`);
});

test("#12186 parseTextualToolCallCandidate keeps Persian ZWNJ in textual tool-call arguments", () => {
  const parsed = parseTextualToolCallCandidate(
    `[Tool call: terminal]\nArguments: {"command":"echo ${PERSIAN_WORD} o\u200Dpencode"}`
  );

  assert.ok(parsed && parsed.kind === "complete");
  assert.equal(parsed.name, "terminal");
  assert.deepEqual(parsed.args, { command: `echo ${PERSIAN_WORD} opencode` });
});

test("#12186 parseAntigravityTextualToolCall keeps Persian ZWNJ in textual tool-call arguments", () => {
  const parsed = parseAntigravityTextualToolCall(
    `[Tool call: terminal]\nArguments: {"command":"echo ${PERSIAN_WORD} o\u200Dpencode"}`
  );

  assert.ok(parsed);
  assert.equal(parsed.name, "terminal");
  assert.deepEqual(parsed.args, { command: `echo ${PERSIAN_WORD} opencode` });
});

test("#12186 parseSSEToGeminiResponse keeps Persian ZWNJ in textual tool-call arguments", () => {
  const text = `[Tool call: terminal]\nArguments: {"command":"echo ${PERSIAN_WORD}"}`;
  const rawSSE = `data: ${JSON.stringify({
    response: {
      candidates: [{ content: { parts: [{ text }] }, finishReason: "STOP" }],
    },
  })}`;

  const parsed = parseSSEToGeminiResponse(rawSSE, "gemini-2.5-flash") as {
    choices: { message: { tool_calls: { function: { arguments: string } }[] } }[];
  };

  assert.ok(parsed);
  assert.equal(
    parsed.choices[0].message.tool_calls[0].function.arguments,
    JSON.stringify({ command: `echo ${PERSIAN_WORD}` })
  );
});

test("#12186 Gemini non-stream translation keeps Persian ZWNJ in textual tool-call arguments", () => {
  const result = translateNonStreamingResponse(
    {
      responseId: "resp-12186",
      modelVersion: "gemini-2.5-flash",
      candidates: [
        {
          content: {
            parts: [
              {
                text: `[Tool call: terminal]\nArguments: {"command":"echo ${PERSIAN_WORD} o\u200Dpencode"}`,
              },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    FORMATS.GEMINI,
    FORMATS.OPENAI
  ) as { choices: { message: { tool_calls: { function: { arguments: string } }[] } }[] };

  assert.equal(
    result.choices[0].message.tool_calls[0].function.arguments,
    JSON.stringify({ command: `echo ${PERSIAN_WORD} opencode` })
  );
});

test("#12186 Gemini stream translation keeps Persian ZWNJ in text emitted before a textual tool call", () => {
  const result = geminiToOpenAIResponse(
    {
      responseId: "resp-12186-stream",
      modelVersion: "gemini-2.5-flash",
      candidates: [
        {
          content: {
            parts: [
              { text: `${PERSIAN_WORD}: [Tool call: terminal]\nArguments: {"command":"whoami"}` },
            ],
          },
          finishReason: "STOP",
        },
      ],
    },
    { toolCalls: new Map() }
  ) as Array<{ choices?: { delta?: { content?: string; tool_calls?: unknown[] } }[] }>;

  const leakedContent = result.map((event) => event.choices?.[0]?.delta?.content || "").join("");
  assert.equal(leakedContent, `${PERSIAN_WORD}: `);

  const toolCalls = result.flatMap((event) => event.choices?.[0]?.delta?.tool_calls || []);
  assert.equal(toolCalls.length, 1);
});

test("#12186 stripObfuscationZeroWidth keeps ZWNJ/ZWJ that belong to the text", () => {
  for (const text of [
    PERSIAN_WORD,
    "می\u200Cروم نمی\u200Cدانم کتاب\u200Cها",
    FAMILY_EMOJI,
    "\u{1F3F3}\u{FE0F}\u200D\u{1F308}",
    "\u200D",
    "\u{1F468}\u200D",
    "\u200D\u{1F469}",
    "\u200C",
  ]) {
    assert.equal(stripObfuscationZeroWidth(text), text);
  }
});

test("#12186 stripObfuscationZeroWidth reverses the request-side obfuscation for every default agent word", () => {
  const original = `Use ${getSensitiveWords().join(", ")} in ${PERSIAN_WORD} ${FAMILY_EMOJI}`;
  const obfuscated = obfuscateSensitiveWords(original);

  assert.notEqual(obfuscated, original);
  assert.equal(stripObfuscationZeroWidth(obfuscated), original);
});

test("#12186 stripObfuscationZeroWidth removes joiners only between ASCII word characters", () => {
  assert.equal(stripObfuscationZeroWidth("o\u200Dpencode"), "opencode");
  assert.equal(stripObfuscationZeroWidth("roo_\u200Dcline 4\u200D2"), "roo_cline 42");
  assert.equal(stripObfuscationZeroWidth("a\u200Cb"), "ab");
  assert.equal(stripObfuscationZeroWidth("o\u200D\u200D\u200Cpencode"), "opencode");
  assert.equal(stripObfuscationZeroWidth("o\u200D"), "o");
  assert.equal(stripObfuscationZeroWidth("\u200Dpencode"), "pencode");
  assert.equal(stripObfuscationZeroWidth("x \u200D y"), "x \u200D y");
  // Neither side ASCII-adjacent on both ends: a joiner next to whitespace is not
  // an obfuscation marker and is left alone.
  assert.equal(stripObfuscationZeroWidth("x\u200D \u200Dy"), "x\u200D \u200Dy");
});

test("#12186 stripObfuscationZeroWidth still removes U+200B and U+FEFF anywhere", () => {
  assert.equal(stripObfuscationZeroWidth(`\u200B${PERSIAN_WORD}\uFEFF`), PERSIAN_WORD);
  assert.equal(stripObfuscationZeroWidth("\uFEFF"), "");
  assert.equal(stripObfuscationZeroWidth("o\u200B\u200Dp"), "op");
  assert.equal(stripObfuscationZeroWidth("\u200BКак исправить"), "Как исправить");
});

test("#12186 stripObfuscationZeroWidth returns the same reference when nothing needs stripping", () => {
  const text = `plain ${PERSIAN_WORD}`;
  assert.equal(stripObfuscationZeroWidth(text), text);
  assert.equal(stripObfuscationZeroWidth(""), "");
});
