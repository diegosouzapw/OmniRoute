import test from "node:test";
import assert from "node:assert/strict";

const { FORMATS } = await import("../../open-sse/translator/formats.ts");
const { translateNonStreamingResponse } =
  await import("../../open-sse/handlers/responseTranslator.ts");
const { extractResponsesReasoningSummaryText } =
  await import("../../open-sse/translator/response/openai-responses/pureHelpers.ts");
const { openaiResponsesToOpenAIResponse } =
  await import("../../open-sse/translator/response/openai-responses.ts");

const SEG_A = "**Planning exact formatted output**";
const SEG_B = "**Confirming exact reproduction requirement**";
const EXPECTED = `${SEG_A}\n\n${SEG_B}`;

function readReasoning(msg) {
  if (!msg) return null;
  return (
    msg.reasoning_content ??
    msg.reasoning ??
    (Array.isArray(msg.reasoning_summary)
      ? msg.reasoning_summary.map((p) => p?.text ?? "").join("")
      : null)
  );
}

test("#9500 site 1: non-streaming reasoning summary parts joined with separator", () => {
  const responseBody = {
    object: "response",
    model: "cx/gpt-test",
    output: [
      {
        type: "reasoning",
        id: "rs_1",
        summary: [
          { type: "summary_text", text: SEG_A },
          { type: "summary_text", text: SEG_B },
        ],
      },
      { type: "message", content: [{ type: "output_text", text: "ok" }] },
    ],
    usage: {},
  };
  const projected = translateNonStreamingResponse(
    responseBody,
    FORMATS.OPENAI_RESPONSES, // target — flattens into chat.completion
    FORMATS.OPENAI // source
  );
  const msg = projected?.choices?.[0]?.message;
  const reasoning = readReasoning(msg);
  assert.ok(reasoning !== null, `could not locate reasoning field: ${JSON.stringify(msg)}`);
  assert.equal(
    reasoning,
    EXPECTED,
    `segments must be separated by "\n\n", got: ${JSON.stringify(reasoning)}`
  );
});

test("#9500 site 2: extractResponsesReasoningSummaryText joins with separator", () => {
  const item = {
    type: "reasoning",
    id: "rs_1",
    summary: [
      { type: "summary_text", text: SEG_A },
      { type: "summary_text", text: SEG_B },
    ],
  };
  const text = extractResponsesReasoningSummaryText(item);
  assert.equal(text, EXPECTED, `helper must join with "\n\n", got: ${JSON.stringify(text)}`);
});

test("#9500 site 3: streaming emits separator when summary_index changes", () => {
  const state = {
    started: false,
    chatId: null,
    created: null,
    toolCallIndex: 0,
    finishReasonSent: false,
  };
  const delta1 = openaiResponsesToOpenAIResponse(
    {
      type: "response.reasoning_summary_text.delta",
      delta: SEG_A,
      item_id: "rs_1",
      output_index: 0,
      summary_index: 0,
    },
    state
  );
  assert.ok(delta1, "first delta should produce a chunk");
  const a = delta1.choices[0].delta.reasoning_content ?? delta1.choices[0].delta.reasoning_text;

  const delta2 = openaiResponsesToOpenAIResponse(
    {
      type: "response.reasoning_summary_text.delta",
      delta: SEG_B,
      item_id: "rs_1",
      output_index: 0,
      summary_index: 1,
    },
    state
  );
  assert.ok(delta2, "second delta should produce a chunk");
  const b = delta2.choices[0].delta.reasoning_content ?? delta2.choices[0].delta.reasoning_text;

  assert.ok(
    b.startsWith("\n\n"),
    `new-segment delta must be prefixed with "\n\n", got: ${JSON.stringify(b)}`
  );
  assert.equal(b, `\n\n${SEG_B}`);
  assert.equal(a, SEG_A);
});
