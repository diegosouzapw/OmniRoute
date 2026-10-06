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
const { createSSETransformStreamWithLogger } = await import("../../open-sse/utils/stream.ts");

const encoder = new TextEncoder();

const sseFrame = (type: string, fields: Record<string, unknown> = {}) =>
  `event: ${type}\ndata: ${JSON.stringify({ type, ...fields })}\n\n`;

async function runPipe({
  format = "openai-responses",
  initial = "",
  repeat = null as string | null,
  repeatMs = 10,
  closeAt = null as number | null,
  closeFrame = "",
  active = 500,
  contentStall = 50,
}: {
  format?: string;
  initial?: string;
  repeat?: string | null;
  repeatMs?: number;
  closeAt?: number | null;
  closeFrame?: string;
  active?: number;
  contentStall?: number;
}) {
  const timers: Array<ReturnType<typeof setInterval>> = [];
  let stopped = false;
  let sourceController: ReadableStreamDefaultController | null = null;
  const cleanup = () => {
    stopped = true;
    for (const t of timers) {
      clearTimeout(t as unknown as ReturnType<typeof setTimeout>);
      clearInterval(t as unknown as ReturnType<typeof setInterval>);
    }
  };
  const push = (s: string) => {
    if (stopped || !sourceController) return;
    try {
      sourceController.enqueue(encoder.encode(s));
    } catch {
      // closed or errored; watchdog cleanup owns the rest
    }
  };
  const source = new ReadableStream({
    start(c) {
      sourceController = c;
      if (initial) push(initial);
      if (repeat) timers.push(setInterval(() => push(repeat), repeatMs));
      if (closeAt !== null) {
        timers.push(
          setTimeout(() => {
            if (stopped) return;
            if (closeFrame) push(closeFrame);
            try {
              sourceController?.close();
            } catch {
              // already closed
            }
            cleanup();
          }, closeAt)
        );
      }
    },
    cancel() {
      cleanup();
    },
  });
  const errors: string[] = [];
  const sc = createStreamController({
    provider: "test",
    model: "synthetic",
    clientResponseFormat: format,
    onError(e: { message: string }) {
      errors.push(e.message);
      return true;
    },
  });
  const transform =
    format === "openai"
      ? createSSETransformStreamWithLogger(
          "openai-responses",
          "openai",
          "codex",
          null,
          null,
          "synthetic"
        )
      : new TransformStream();
  const stream = pipeWithDisconnect(new Response(source), transform, sc, {
    stallTimeoutMs: 1000,
    activeTimeoutMs: active,
    contentStallTimeoutMs: contentStall,
  });
  let output = "";
  const decoder = new TextDecoder();
  try {
    for await (const chunk of stream) {
      output += decoder.decode(chunk, { stream: true });
    }
    output += decoder.decode();
  } catch {
    // onError returning true should suppress; drain defensively
  } finally {
    cleanup();
  }
  return { errors, output };
}

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
  // Base #15433 made non-empty thinking/signature payloads count as strict
  // content as well, so the strict expectation tracks that decision here;
  // liveness is what this branch owns.
  assertStrictVsLiveness(
    'event: content_block_start\ndata: {"type":"content_block_start","index":0,"content_block":{"type":"thinking"}}\n\n' +
      'event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"thinking_delta","thinking":""}}\n\n' +
      'event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"signature_delta","signature":"EqABC"}}\n\n',
    true
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
      // Keep the thinking phase alive with activity inside the sliding budget,
      // then finish the turn with real text — the healthy shape the issue
      // describes (a long think followed by visible output), so the downstream
      // #8649 empty-turn check (a different guard) has nothing to say either.
      setTimeout(() => {
        controller.enqueue(
          encoder.encode(
            'event: content_block_delta\ndata: {"type":"content_block_delta","index":0,"delta":{"type":"thinking_delta","thinking":""}}\n\n'
          )
        );
      }, 50);
      setTimeout(() => {
        controller.enqueue(
          encoder.encode(
            'event: content_block_stop\ndata: {"type":"content_block_stop","index":0}\n\n' +
              'event: content_block_delta\ndata: {"type":"content_block_delta","index":1,"delta":{"type":"text_delta","text":"Done thinking."}}\n\n' +
              'event: message_stop\ndata: {"type":"message_stop"}\n\n'
          )
        );
        controller.close();
      }, 100);
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

  // Lifecycle-only streams must still trip the watchdog: no model signal,
  // only lifecycle frames and keepalive.
  const lifecycle = await runPipe({
    format: "openai-responses",
    initial:
      sseFrame("response.created", { response: { id: "resp_lifecycle" } }) +
      sseFrame("response.in_progress", { response: { status: "in_progress" } }),
    repeat: ": keepalive\n\n",
    active: 2000,
    contentStall: 80,
  });
  assert.match(
    lifecycle.errors[0] ?? "",
    /stream content stall/,
    "a lifecycle-only stream must trip the content-stall watchdog"
  );
});

test("Responses dot-delta events alone count as activity without preceding reasoning", () => {
  const types = [
    "response.output_text.delta",
    "response.reasoning_summary_text.delta",
    "response.function_call_arguments.delta",
  ];
  for (const type of types) {
    const strict = createStreamContentWatcher();
    const liveness = createStreamLivenessWatcher();
    const frame = sseFrame(type, { delta: "" });
    strict.note(frame);
    strict.finish();
    liveness.note(frame);
    liveness.finish();
    assert.equal(strict.sawContent(), false, `${type}: empty delta is not user-visible content`);
    assert.equal(liveness.sawModelSignal(), true, `${type}: empty delta must read as alive`);
    assert.equal(liveness.activityCount(), 1, `${type}: activity counter must advance`);
  }
});

test("SSE event header identifies a reasoning item without JSON type", () => {
  const frame =
    "event: response.output_item.added\ndata: " +
    JSON.stringify({
      output_index: 0,
      item: { id: "rs_test", type: "reasoning", encrypted_content: "synthetic-opaque" },
    }) +
    "\n\n";
  const liveness = createStreamLivenessWatcher();
  liveness.note(frame);
  liveness.finish();
  assert.equal(liveness.sawModelSignal(), true, "event header type must count as activity");
});

for (const format of ["openai-responses", "openai"]) {
  test(`Active Responses text survives first-content budget: ${format}`, async () => {
    const created = sseFrame("response.created", {
      response: { id: "resp_test", status: "in_progress", output: [] },
    });
    const text = sseFrame("response.output_text.delta", {
      item_id: "msg_test",
      output_index: 1,
      content_index: 0,
      delta: "hello",
    });
    const completed = sseFrame("response.completed", {
      response: {
        id: "resp_test",
        status: "completed",
        output: [
          {
            id: "msg_test",
            type: "message",
            role: "assistant",
            content: [{ type: "output_text", text: "hello" }],
          },
        ],
        usage: { input_tokens: 1, output_tokens: 1 },
      },
    });
    const r = await runPipe({
      format,
      initial: created + text,
      repeat: text,
      closeAt: 130,
      closeFrame: completed,
      active: 500,
      contentStall: 50,
    });
    assert.deepEqual(r.errors, []);
    assert.ok(r.output.includes("hello"));
  });
}

test("Reasoning item then keepalive-only stalls one activity budget later", async () => {
  const created = sseFrame("response.created", {
    response: { id: "resp_test", status: "in_progress", output: [] },
  });
  const added = sseFrame("response.output_item.added", {
    output_index: 0,
    item: { id: "rs_test", type: "reasoning", encrypted_content: "synthetic-opaque" },
  });
  const r = await runPipe({
    format: "openai-responses",
    initial: created + added,
    repeat: ": keepalive\n\n",
    active: 2000,
    contentStall: 50,
  });
  assert.match(r.errors[0] ?? "", /stream content stall/);
  assert.ok(!r.output.includes("hello"));
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
