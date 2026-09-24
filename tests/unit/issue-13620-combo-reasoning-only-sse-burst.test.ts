/**
 * Issue #13620 — combo quality-gate bounded peek buffers bare `delta.reasoning`
 * SSE chunks (Ollama Cloud shape) because `hasOpenAICompatibleStreamValue()`
 * (open-sse/utils/streamHelpers.ts) only recognizes `content`,
 * `reasoning_content`, `reasoning_text`, and `tool_calls` — not bare
 * `reasoning`. As a result the peek loop never exits on a reasoning-only
 * chunk and keeps buffering every reasoning delta until the first real
 * `content` delta arrives (client sees dead silence, then a single burst),
 * and a stream that finishes with reasoning-only content is rejected as an
 * "empty completion" (secondary 502 failure mode).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { isKnownNonClaudeStreamPayload } = await import("../../open-sse/utils/streamHelpers.ts");
const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");

const encoder = new TextEncoder();
const silentLog = { warn: () => {} };

test("#13620 root cause: isKnownNonClaudeStreamPayload must recognize bare delta.reasoning (Ollama Cloud shape)", () => {
  const parsed = {
    choices: [
      { index: 0, delta: { role: "assistant", content: "", reasoning: "We" }, finish_reason: null },
    ],
  };
  const recognized = isKnownNonClaudeStreamPayload(parsed);
  assert.equal(
    recognized,
    true,
    "bare delta.reasoning must be recognized as stream content so the combo peek stops buffering immediately, " +
      "matching hasValuableContent()/hasAnyReasoningSignal() which already treat it as real signal"
  );
});

// Emits ONE physical Uint8Array chunk per SSE frame (mirrors real network
// framing, unlike a single enqueue() of the whole body) and counts how many
// chunks the underlying stream has handed out by the time the caller stops
// reading — this is what actually distinguishes "peek recognizes the first
// reasoning delta and stops buffering there" from "peek keeps consuming
// (buffering) every reasoning chunk until the content chunk arrives".
function makeReasoningOnlyThenContentStream(): {
  response: Response;
  chunksPulled: { count: number };
} {
  const frames = [
    { choices: [{ index: 0, delta: { role: "assistant", content: "", reasoning: "We" } }] },
    { choices: [{ index: 0, delta: { content: "", reasoning: " need" } }] },
    { choices: [{ index: 0, delta: { content: "", reasoning: " to think." } }] },
    { choices: [{ index: 0, delta: { content: "Hello" } }] },
    { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
  ].map((c) => encoder.encode(`data: ${JSON.stringify(c)}\n\n`));
  frames.push(encoder.encode("data: [DONE]\n\n"));

  const chunksPulled = { count: 0 };
  let idx = 0;
  const stream = new ReadableStream<Uint8Array>({
    pull(controller) {
      if (idx >= frames.length) {
        controller.close();
        return;
      }
      controller.enqueue(frames[idx++]);
      chunksPulled.count = idx;
    },
  });
  return {
    response: new Response(stream, {
      status: 200,
      headers: { "content-type": "text/event-stream" },
    }),
    chunksPulled,
  };
}

test("#13620 behavioral: peek must stop buffering at the first reasoning delta, not wait for content", async () => {
  const { response, chunksPulled } = makeReasoningOnlyThenContentStream();
  const out = await validateResponseQuality(response, true, silentLog);
  assert.equal(out.valid, true, `expected valid, got reason: ${out.reason}`);
  assert.ok(out.clonedResponse, "expected a clonedResponse to replay/forward the stream");

  // Frame indices: 0-2 = reasoning-only deltas, 3 = content, 4 = finish_reason, 5 = [DONE].
  // Correct: the peek recognizes frame 0 immediately via a single reader.read() call.
  // The WHATWG ReadableStream spec itself speculatively pulls one extra chunk into its
  // internal queue right after that read() resolves (default highWaterMark backpressure
  // refill) — so up to 2 physical chunks may be pulled even when the peek loop performs
  // exactly one logical read. That prefetch is unavoidable engine behavior, not something
  // validateResponseQuality controls, so the threshold below allows for it.
  // Bug: the peek loop itself keeps calling reader.read() through frames 0-2 (each
  // triggering its own follow-up prefetch), only stopping at frame 3 -> 4-5 chunks pulled.
  assert.ok(
    chunksPulled.count <= 2,
    "expected the peek to stop after at most 1 logical read (<=2 chunks pulled, accounting for " +
      `ReadableStream's own one-chunk-ahead prefetch); actual: ${chunksPulled.count} chunks were ` +
      "pulled before the peek recognized any content — this is the reasoning-prefix burst-buffering bug"
  );
});

function makeReasoningOnlyTerminatedStream(): Response {
  const chunks = [
    { choices: [{ index: 0, delta: { role: "assistant", reasoning: "Deep" } }] },
    { choices: [{ index: 0, delta: { reasoning: " thinking..." } }] },
    { choices: [{ index: 0, delta: {}, finish_reason: "stop" }] },
  ];
  const body = chunks.map((c) => `data: ${JSON.stringify(c)}\n\n`).join("") + "data: [DONE]\n\n";
  return new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(body));
        controller.close();
      },
    }),
    { status: 200, headers: { "content-type": "text/event-stream" } }
  );
}

test("#13620 secondary failure mode: reasoning-only stream that terminates cleanly must not be rejected as an empty completion", async () => {
  const res = makeReasoningOnlyTerminatedStream();
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(
    out.valid,
    true,
    `expected valid (reasoning-only is real output, mirrors the non-streaming validator's ` +
      `reasoning_content ?? reasoning acceptance) — got reason: ${out.reason}`
  );
});
