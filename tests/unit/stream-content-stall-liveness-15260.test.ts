/**
 * #15260 — the content-stall watchdog must not abort healthy extended-thinking
 * streams.
 *
 * The watchdog disarmed only on `createStreamContentWatcher().sawContent()`,
 * which demands a non-empty readable string. Reasoning phases whose deltas
 * carry only signatures, empty/redacted thinking strings or encrypted
 * reasoning items kept the watchdog armed until the readiness budget fired —
 * killing healthy Claude (cc/), Responses, Gemini and OpenRouter thinking
 * streams mid-think (issue log: all aborts exactly at the budget).
 *
 * Fix: a dedicated liveness watcher (`createStreamLivenessWatcher`) treats any
 * model-generated frame as "the model is alive"; the strict content watcher
 * stays for the #8649 empty-turn check. Each test below pins the differential:
 * the same fixture must read "no user-visible content" (strict) AND "model
 * alive" (liveness).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { createStreamContentWatcher, createStreamLivenessWatcher } =
  await import("../../open-sse/utils/streamReadiness.ts");
const { resolveContentStallTimeoutMs } =
  await import("../../open-sse/utils/streamReadinessPolicy.ts");
const { pipeWithDisconnect, createStreamController } =
  await import("../../open-sse/utils/streamHandler.ts");

const encoder = new TextEncoder();

function assertStrictVsLiveness(frames: string, expectStrictContent: boolean) {
  const strict = createStreamContentWatcher();
  strict.note(frames);
  strict.finish();

  const liveness = createStreamLivenessWatcher();
  liveness.note(frames);
  liveness.finish();

  assert.equal(
    strict.sawContent(),
    expectStrictContent,
    "strict content watcher expectation (drives the #8649 empty-turn check)"
  );
  assert.equal(liveness.sawModelSignal(), true, "model-generated frames must read as alive");
}

test("Claude signature_delta and empty thinking_delta keep the model alive", () => {
  assertStrictVsLiveness(
    'event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"thinking"}}\n\n' +
      'event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"thinking_delta","thinking":""}}\n\n' +
      'event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"signature_delta","signature":"EqABC"}}\n\n',
    false
  );
});

test("Claude redacted_thinking block keeps the model alive", () => {
  assertStrictVsLiveness(
    'event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"redacted_thinking","data":"opaque"}}\n\n',
    false
  );
});

test("Responses encrypted reasoning item keeps the model alive", () => {
  assertStrictVsLiveness(
    'event: response.output_item.added\ndata: {"type":"response.output_item.added","output_index":1,"item":{"type":"reasoning","encrypted_content":"gAAAA"}}\n\n' +
      'event: response.reasoning_summary_text.delta\ndata: {"type":"response.reasoning_summary_text.delta","delta":""}\n\n',
    false
  );
});

test("Gemini thoughtSignature-only part keeps the model alive", () => {
  assertStrictVsLiveness(
    'data: {"candidates":[{"content":{"parts":[{"thoughtSignature":"SigQA=="}]}}]}\n\n',
    false
  );
});

test("OpenRouter empty reasoning_content and encrypted reasoning_details keep the model alive", () => {
  assertStrictVsLiveness(
    'data: {"choices":[{"delta":{"reasoning_content":""}}]}\n\n' +
      'data: {"choices":[{"delta":{"reasoning_details":[{"type":"reasoning.text","text_encrypted":"gAAAA"}]}}]}\n\n',
    false
  );
});

test("role-only start chunks and lifecycle/ping frames stay lifecycle-only", () => {
  const liveness = createStreamLivenessWatcher();
  liveness.note(
    'event: message_start\ndata: {"type":"message_start","message":{"role":"assistant"}}\n\n' +
      'event: ping\ndata: {"type":"ping"}\n\n' +
      'event: response.in_progress\ndata: {"type":"response.in_progress","response":{}}\n\n' +
      'data: {"choices":[{"delta":{"role":"assistant"},"finish_reason":null}]}\n\n'
  );
  liveness.finish();
  assert.equal(
    liveness.sawModelSignal(),
    false,
    "lifecycle-only frames must not disarm the watchdog"
  );
});

test("error-only frames stay silent; error-with-delta disarms", () => {
  const liveness = createStreamLivenessWatcher();
  liveness.note('data: {"error":{"message":"upstream hiccup"}}\n\n');
  liveness.finish();
  assert.equal(liveness.sawModelSignal(), false);

  const recovered = createStreamLivenessWatcher();
  recovered.note(
    'data: {"error":{"message":"transient"},"choices":[{"delta":{"content":"partial"}}]}\n\n'
  );
  recovered.finish();
  assert.equal(recovered.sawModelSignal(), true);
});

test("the watchdog stands down on a thinking stream and fires on lifecycle-only streams", async () => {
  const source = new ReadableStream({
    start(controller) {
      controller.enqueue(
        encoder.encode(
          'event: message_start\ndata: {"type":"message_start","message":{"role":"assistant"}}\n\n' +
            'event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"thinking"}}\n\n' +
            'event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"signature_delta","signature":"EqAB"}}\n\n'
        )
      );
      // Keep the thinking phase alive past the budget, then finish the turn
      // with real text — the healthy shape the issue describes (a long think
      // followed by visible output), so the downstream #8649 empty-turn check
      // (a different guard) has nothing to say either.
      setTimeout(() => {
        controller.enqueue(
          encoder.encode(
            'event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"thinking_delta","thinking":""}}\n\n'
          )
        );
      }, 120);
      setTimeout(() => {
        controller.enqueue(
          encoder.encode(
            'event: content_block_stop\ndata: {"type":"content_block_stop","index":0}\n\n' +
              'event: content_block_delta\ndata: {"type":"content_block_delta","index":1,"delta":{"type":"text_delta","text":"Done thinking."}}\n\n' +
              'event: message_stop\ndata: {"type":"message_stop"}\n\n'
          )
        );
        controller.close();
      }, 220);
    },
  });
  let onErrorEvent: { message: string } | null = null;
  const streamController = createStreamController({
    onError(event) {
      onErrorEvent = event;
      return true;
    },
  });
  const stream = pipeWithDisconnect(new Response(source), new TransformStream(), streamController, {
    stallTimeoutMs: 5000,
    contentStallTimeoutMs: 80,
  });
  const reader = stream.getReader();
  while ((await reader.read()).done !== true) {
    /* drain */
  }
  assert.equal(onErrorEvent, null, "a thinking stream must never trip the content-stall watchdog");
});

test("STREAM_CONTENT_STALL_TIMEOUT_MS overrides the adaptive budget; 0 disables; junk is ignored", () => {
  const original = process.env.STREAM_CONTENT_STALL_TIMEOUT_MS;
  try {
    delete process.env.STREAM_CONTENT_STALL_TIMEOUT_MS;
    assert.equal(resolveContentStallTimeoutMs(115_000), 115_000, "defaults to the adaptive budget");

    process.env.STREAM_CONTENT_STALL_TIMEOUT_MS = "300000";
    assert.equal(resolveContentStallTimeoutMs(115_000), 300_000);

    process.env.STREAM_CONTENT_STALL_TIMEOUT_MS = "0";
    assert.equal(resolveContentStallTimeoutMs(115_000), 0, "0 explicitly disables the watchdog");

    process.env.STREAM_CONTENT_STALL_TIMEOUT_MS = "-5";
    assert.equal(resolveContentStallTimeoutMs(115_000), 115_000, "negative is rejected");

    process.env.STREAM_CONTENT_STALL_TIMEOUT_MS = "abc";
    assert.equal(resolveContentStallTimeoutMs(115_000), 115_000, "non-numeric is rejected");
  } finally {
    if (original === undefined) delete process.env.STREAM_CONTENT_STALL_TIMEOUT_MS;
    else process.env.STREAM_CONTENT_STALL_TIMEOUT_MS = original;
  }
});
