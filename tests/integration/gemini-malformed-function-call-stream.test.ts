/**
 * tests/integration/gemini-malformed-function-call-stream.test.ts
 *
 * Chains the real Gemini -> OpenAI translator (open-sse/translator/response/
 * gemini-to-openai.ts) with the real Responses API transformer (open-sse/
 * transformer/responsesTransformer.ts) against the exact (sanitized) event
 * series captured from a live incident — see tests/fixtures/translation/
 * gemini-malformed-function-call-stream.json for the full sanitized fixture
 * and incident description (dashboard log id 1784489701456-d8c0e9).
 *
 * Gemini's own parser rejected an attempted tool call mid-turn and terminated
 * the stream with finishReason: MALFORMED_FUNCTION_CALL — a value that isn't
 * one of OpenAI's 5 documented finish_reason values (stop, length, tool_calls,
 * content_filter, function_call). Passed through raw, a real OpenAI-format
 * client (OpenClaw) has no handling for it at all and silently never notices
 * the turn failed. The fix (open-sse/translator/response/gemini-to-openai.ts)
 * synthesizes a tool_calls entry and finish_reason: "tool_calls" instead,
 * routing the failure into the ordinary "tool call arguments didn't parse"
 * path every OpenAI-compatible agent loop already handles.
 *
 * This test proves the fix holds for BOTH client-facing surfaces that share
 * this same translator output: Chat Completions (consumes the translator's
 * chunks directly) and the Responses API (consumes the same chunks through
 * the transformer chain) — using the identical real event series for both,
 * so a regression in either surface is caught against the same ground truth.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const { geminiToOpenAIResponse } =
  await import("../../open-sse/translator/response/gemini-to-openai.ts");
const { createResponsesApiTransformStream } =
  await import("../../open-sse/transformer/responsesTransformer.ts");

const FIXTURES_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../fixtures/translation"
);
const FIXTURE_PATH = path.join(FIXTURES_DIR, "gemini-malformed-function-call-stream.json");
// Follow-up live incident (log id 1784589106014-2a42f8): a REAL functionCall and a
// MALFORMED_FUNCTION_CALL finish arriving in the SAME turn — see the fixture's own
// "description" field for the full incident writeup.
const PARALLEL_FIXTURE_PATH = path.join(
  FIXTURES_DIR,
  "gemini-malformed-function-call-parallel-real-call-stream.json"
);

type GeminiChunk = Record<string, unknown>;
type OpenAIChunk = {
  choices: Array<{
    delta: {
      reasoning_content?: string;
      tool_calls?: Array<{
        id: string;
        type: string;
        function: { name: string; arguments: string };
      }>;
    };
    finish_reason: string | null;
  }>;
  usage?: { prompt_tokens: number; completion_tokens: number; total_tokens: number };
};
type ResponsesFunctionCallItem = {
  type: "function_call";
  call_id: string;
  name: string;
  arguments: string;
};
type ResponsesEventData = { type?: string; item?: ResponsesFunctionCallItem };

function asResponsesEventData(data: unknown): ResponsesEventData | null {
  return data && typeof data === "object" ? (data as ResponsesEventData) : null;
}

function loadFixtureChunks(fixturePath: string): GeminiChunk[] {
  const fixture = JSON.parse(fs.readFileSync(fixturePath, "utf8"));
  assert.ok(Array.isArray(fixture.chunks) && fixture.chunks.length > 0, "fixture must have chunks");
  return fixture.chunks;
}

/** Real Gemini -> OpenAI translation, exactly as the live streaming pipeline runs it. */
function translateFixtureToOpenAIChunks(fixturePath: string = FIXTURE_PATH): OpenAIChunk[] {
  const state: Record<string, unknown> = {
    functionIndex: 0,
    toolCalls: new Map(),
    messageId: "fixture-msg",
    model: "gemini-3.1-flash-lite",
  };
  const openaiChunks: OpenAIChunk[] = [];
  for (const chunk of loadFixtureChunks(fixturePath)) {
    const results = geminiToOpenAIResponse(chunk, state);
    if (results) openaiChunks.push(...(results as OpenAIChunk[]));
  }
  return openaiChunks;
}

/** Feeds already-translated OpenAI chat chunks through the real Responses API transformer. */
async function transformToResponsesEvents(
  openaiChunks: OpenAIChunk[]
): Promise<Array<{ event: string | null; data: unknown }>> {
  const stream = createResponsesApiTransformStream();
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const output: string[] = [];
  const readerTask = (async () => {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      output.push(decoder.decode(value));
    }
  })();

  for (const chunk of openaiChunks) {
    await writer.write(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
  }
  await writer.close();
  await readerTask;

  return output
    .join("")
    .trim()
    .split("\n\n")
    .filter(Boolean)
    .map((entry) => {
      const lines = entry.split("\n");
      const eventLine = lines.find((l) => l.startsWith("event: "));
      const dataLine = lines.find((l) => l.startsWith("data: "));
      const rawData = dataLine ? dataLine.slice("data: ".length) : null;
      return {
        event: eventLine ? eventLine.slice("event: ".length) : null,
        data: rawData && rawData !== "[DONE]" ? JSON.parse(rawData) : rawData,
      };
    });
}

// ── Chat Completions surface ────────────────────────────────────────────────

test("Chat Completions: malformed-tool-call stream ends in a client-usable tool_calls, not a raw error string", () => {
  const openaiChunks = translateFixtureToOpenAIChunks();
  assert.ok(openaiChunks.length > 0, "expected at least one translated chunk");

  // The reasoning ("thought") content from the live incident's planning steps
  // must still come through untouched — this fix only changes the terminal
  // finish_reason/tool_calls handling, not the reasoning stream.
  const reasoningDeltas = openaiChunks
    .map((c) => c.choices?.[0]?.delta?.reasoning_content)
    .filter((v): v is string => typeof v === "string" && v.length > 0);
  assert.ok(reasoningDeltas.length >= 3, "expected the 3 planning/thought deltas to survive");
  assert.match(reasoningDeltas[0], /Initiating the Workflow/);

  const toolCallChunk = openaiChunks.find((c) => c.choices?.[0]?.delta?.tool_calls);
  assert.ok(toolCallChunk, "expected a synthesized tool_calls delta chunk");
  const toolCall = toolCallChunk!.choices[0].delta.tool_calls[0];
  assert.equal(toolCall.type, "function");
  assert.equal(typeof toolCall.id, "string");
  const parsedArgs = JSON.parse(toolCall.function.arguments);
  assert.equal(parsedArgs.error, "MALFORMED_FUNCTION_CALL");
  assert.match(parsedArgs.message, /Malformed function call/);
  // Sanitized fixture content, not the real incident's personal paths/URLs.
  assert.doesNotMatch(parsedArgs.message, /\/home\/ping\//);
  assert.doesNotMatch(parsedArgs.message, /academicwork|senterprise|hiq\.se/);

  const finalChunk = openaiChunks.at(-1)!;
  assert.equal(
    finalChunk.choices[0].finish_reason,
    "tool_calls",
    "finish_reason must be the standard OpenAI value a real client can act on"
  );
  // Never leak the raw Gemini string as the terminal signal.
  assert.notEqual(finalChunk.choices[0].finish_reason, "malformed_function_call");

  // Usage from the fixture's final chunk must still flow through untouched.
  assert.equal(finalChunk.usage?.prompt_tokens, 24512);
  assert.ok((finalChunk.usage?.completion_tokens ?? 0) > 0);
});

// ── Responses API surface (same fixture, chained through the transformer) ──

test("Responses API: malformed-tool-call stream ends in a real function_call output item, not response.failed", async () => {
  const openaiChunks = translateFixtureToOpenAIChunks();
  const events = await transformToResponsesEvents(openaiChunks);

  const eventTypes = events.map((e) => e.event).filter(Boolean);
  assert.ok(eventTypes.includes("response.output_item.added"), "expected an output item to open");

  const functionCallDone = events.find(
    (e) =>
      e.event === "response.output_item.done" &&
      asResponsesEventData(e.data)?.item?.type === "function_call"
  );
  assert.ok(functionCallDone, "expected a completed function_call output item");
  const funcItem = asResponsesEventData(functionCallDone!.data)!.item!;
  assert.equal(typeof funcItem.call_id, "string");
  const parsedArgs = JSON.parse(funcItem.arguments);
  assert.equal(parsedArgs.error, "MALFORMED_FUNCTION_CALL");

  const completed = events.find((e) => e.event === "response.completed");
  assert.ok(completed, "expected a normal response.completed terminal event, not an error");
  assert.notEqual(asResponsesEventData(completed!.data)?.type, "response.failed");

  // The transformer must never surface this as an in-band error event either —
  // that would be the same class of "client sees nothing actionable" failure
  // this whole fix exists to prevent, just on the Responses API side.
  assert.ok(
    !eventTypes.includes("error") && !eventTypes.includes("response.failed"),
    `expected no error-shaped event, got: ${eventTypes.join(", ")}`
  );

  const doneMarker = events.at(-1);
  assert.equal(doneMarker?.data, "[DONE]");
});

test("both surfaces agree: exactly one synthesized tool call, sourced from the same translated chunks", async () => {
  const openaiChunks = translateFixtureToOpenAIChunks();
  const toolCallChunks = openaiChunks.filter((c) => c.choices?.[0]?.delta?.tool_calls);
  assert.equal(toolCallChunks.length, 1, "expected exactly one synthesized tool_calls chunk");

  const events = await transformToResponsesEvents(openaiChunks);
  const functionCallItems = events.filter(
    (e) =>
      e.event === "response.output_item.done" &&
      asResponsesEventData(e.data)?.item?.type === "function_call"
  );
  assert.equal(functionCallItems.length, 1, "expected exactly one function_call output item");
});

// ── Second fixture: a REAL tool call arriving in the SAME turn as a malformed one ──
//
// See tests/fixtures/translation/gemini-malformed-function-call-parallel-real-call-stream.json
// for the full incident writeup (log id 1784589106014-2a42f8). This is the case the
// first version of the fix got wrong: it skipped synthesizing anything whenever a real
// tool call already existed, silently discarding the malformed attempt's information.
// Both the real call and the synthesized failure must reach the client.

test("Chat Completions: a real tool call alongside a malformed one keeps BOTH — the failure is not silently dropped", () => {
  const openaiChunks = translateFixtureToOpenAIChunks(PARALLEL_FIXTURE_PATH);

  const toolCallChunks = openaiChunks.filter((c) => c.choices?.[0]?.delta?.tool_calls);
  assert.equal(toolCallChunks.length, 2, "expected the real call AND the synthesized failure");

  const realCall = toolCallChunks[0].choices[0].delta.tool_calls![0];
  assert.equal(realCall.function.name, "check_status");

  const syntheticCall = toolCallChunks[1].choices[0].delta.tool_calls![0];
  assert.equal(syntheticCall.function.name, "malformed_tool_call");
  const parsedArgs = JSON.parse(syntheticCall.function.arguments);
  assert.equal(parsedArgs.error, "MALFORMED_FUNCTION_CALL");
  assert.match(parsedArgs.message, /exec/);

  const finalChunk = openaiChunks.at(-1)!;
  assert.equal(finalChunk.choices[0].finish_reason, "tool_calls");
});

test("Responses API: a real tool call alongside a malformed one produces TWO function_call output items", async () => {
  const openaiChunks = translateFixtureToOpenAIChunks(PARALLEL_FIXTURE_PATH);
  const events = await transformToResponsesEvents(openaiChunks);

  const functionCallItems = events
    .filter(
      (e) =>
        e.event === "response.output_item.done" &&
        asResponsesEventData(e.data)?.item?.type === "function_call"
    )
    .map((e) => asResponsesEventData(e.data)!.item!);

  assert.equal(
    functionCallItems.length,
    2,
    "expected both the real and synthesized function_call items"
  );
  assert.ok(functionCallItems.some((item) => item.name === "check_status"));
  assert.ok(functionCallItems.some((item) => item.name === "malformed_tool_call"));

  const completed = events.find((e) => e.event === "response.completed");
  assert.ok(completed, "expected a normal response.completed terminal event, not an error");
});
