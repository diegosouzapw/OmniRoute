import test from "node:test";
import assert from "node:assert/strict";

const {
  isUselessEmptyTurn,
  summarizeReplayedUpstreamTurn,
  readBoundedResponseText,
  readBoundedResponseOutcome,
  judgeBufferedTurn,
  FLUSH_EMPTY_RETRY_MAX_BYTES,
} = await import("../../open-sse/utils/emptyTurnRetry.ts");
const { isEmptyTurnCore } = await import("../../open-sse/utils/streamEmptyChoices.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const base = {
  finishReason: "stop",
  contentText: "",
  reasoningText: "",
  forwardedValuableChunk: false,
  hasValidUsage: false,
  toolCallsPresent: false,
};

test("reasoning-only turn: stop + empty text + non-empty reasoning is an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, reasoningText: "some thinking trace" }), true);
});

test("zero-valuable-chunk turn: no valuable chunks and no valid usage is an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, finishReason: "" }), true);
});

test("non-empty content text is not an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, contentText: "hello" }), false);
});

test("valid usage alone is not an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, hasValidUsage: true }), false);
});

test("forwarded valuable chunk alone is not an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, forwardedValuableChunk: true }), false);
});

test("legit finish reasons are not empty turns", () => {
  for (const finishReason of ["length", "tool_calls", "content_filter"]) {
    assert.equal(isUselessEmptyTurn({ ...base, finishReason }), false);
  }
});

test("tool calls present are not an empty turn", () => {
  assert.equal(isUselessEmptyTurn({ ...base, toolCallsPresent: true }), false);
});

test("shared core matches the frozen guard condition", () => {
  assert.equal(isEmptyTurnCore(false, false), true);
  assert.equal(isEmptyTurnCore(true, false), false);
  assert.equal(isEmptyTurnCore(false, true), false);
});

test("memory cap is a positive bound", () => {
  assert.ok(FLUSH_EMPTY_RETRY_MAX_BYTES > 0);
});

function sse(...frames: string[]): string {
  return frames.map((f) => `data: ${f}\n\n`).join("") + "data: [DONE]\n\n";
}

const chatChunk = (delta: Record<string, unknown>, finish: string | null = null) =>
  JSON.stringify({
    id: "chatcmpl-probe",
    object: "chat.completion.chunk",
    model: "probe",
    choices: [{ delta, finish_reason: finish }],
  });

test("replay: reasoning-only chat turn classifies empty (parity with live transform)", () => {
  const body = sse(chatChunk({ reasoning_content: "thinking trace here" }), chatChunk({}, "stop"));
  const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI, FORMATS.OPENAI);
  assert.ok(summary, "replay must produce a summary");
  assert.equal(summary.reasoningText.length > 0, true);
  assert.equal(summary.contentText, "");
  assert.equal(isUselessEmptyTurn(summary), true);
});

test("replay: all-empty choices turn classifies empty", () => {
  const body = sse(
    JSON.stringify({
      id: "chatcmpl-probe",
      object: "chat.completion.chunk",
      model: "probe",
      choices: [],
    })
  );
  const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI, FORMATS.OPENAI);
  assert.ok(summary, "replay must produce a summary");
  assert.equal(isUselessEmptyTurn(summary), true);
});

test("replay: turn with real content classifies useful", () => {
  const body = sse(chatChunk({ content: "hello" }), chatChunk({}, "stop"));
  const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI, FORMATS.OPENAI);
  assert.ok(summary, "replay must produce a summary");
  assert.equal(isUselessEmptyTurn(summary), false);
});

test("replay: retry with content after empty first turn serves content", () => {
  const attempts = [
    sse(chatChunk({ reasoning_content: "only thinking" }), chatChunk({}, "stop")),
    sse(chatChunk({ content: "real answer" }), chatChunk({}, "stop")),
  ];
  let calls = 0;
  for (const body of attempts) {
    calls++;
    const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI, FORMATS.OPENAI);
    assert.ok(summary);
    if (calls === 1) {
      assert.equal(isUselessEmptyTurn(summary), true);
      continue;
    }
    assert.equal(isUselessEmptyTurn(summary), false);
  }
  assert.equal(calls, 2, "exactly 2 attempts: initial + 1 retry");
});

test("replay: retry also empty stays empty (fall back to current behavior)", () => {
  const body = sse(
    JSON.stringify({
      id: "chatcmpl-probe",
      object: "chat.completion.chunk",
      model: "probe",
      choices: [],
    })
  );
  for (let attempt = 0; attempt < 2; attempt++) {
    const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI, FORMATS.OPENAI);
    assert.ok(summary);
    assert.equal(isUselessEmptyTurn(summary), true);
  }
});

test("bounded read abandons past the cap without buffering everything", async () => {
  const big = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(
        new TextEncoder().encode("data: " + "x".repeat(FLUSH_EMPTY_RETRY_MAX_BYTES + 1) + "\n\n")
      );
      controller.close();
    },
  });
  const res = new Response(big, { status: 200 });
  const out = await readBoundedResponseText(res, FLUSH_EMPTY_RETRY_MAX_BYTES);
  assert.equal(out, null, "past-cap body must be abandoned, not buffered");
});

test("bounded read returns small bodies intact", async () => {
  const body = sse(chatChunk({ content: "hi" }));
  const res = new Response(body, { status: 200 });
  const out = await readBoundedResponseText(res, FLUSH_EMPTY_RETRY_MAX_BYTES);
  assert.equal(out, body);
});

test("bounded read outcome tells a read failure apart from an over-cap body", async () => {
  const failing = new ReadableStream<Uint8Array>({
    pull(controller) {
      controller.error(new TypeError("terminated"));
    },
  });
  const failed = await readBoundedResponseOutcome(
    new Response(failing, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES
  );
  assert.equal(failed.kind, "error", "a stream that throws while being read is a failure");

  const big = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("x".repeat(FLUSH_EMPTY_RETRY_MAX_BYTES + 1)));
      controller.close();
    },
  });
  const skipped = await readBoundedResponseOutcome(
    new Response(big, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES
  );
  assert.equal(skipped.kind, "skipped", "an over-cap body is passed through, not retried");

  const body = sse(chatChunk({ content: "hi" }));
  const ok = await readBoundedResponseOutcome(
    new Response(body, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES
  );
  assert.deepEqual(ok, { kind: "text", text: body });
});

test("bounded read returns skipped without awaiting a tee clone cancel", async () => {
  const BUDGET_MS = 2000;
  const neverClosing = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("x".repeat(FLUSH_EMPTY_RETRY_MAX_BYTES + 1)));
    },
  });
  let res: Response | undefined;
  const start = Date.now();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    res = new Response(neverClosing, { status: 200 });
    const outcome = await Promise.race([
      readBoundedResponseOutcome(res, FLUSH_EMPTY_RETRY_MAX_BYTES),
      new Promise<never>((_, rej) => {
        timer = setTimeout(() => rej(new Error("bounded read timed out")), BUDGET_MS);
      }),
    ]);
    assert.equal(outcome.kind, "skipped");
    assert.ok(Date.now() - start < BUDGET_MS, `expected bounded skipped well under ${BUDGET_MS}ms`);
  } finally {
    if (timer !== undefined) clearTimeout(timer);
    await res?.body?.cancel().catch(() => undefined);
  }
});

test("buffered turn verdict: a dropped stream retries unless the client went away", () => {
  const dropped = { kind: "error" } as const;
  const retry = judgeBufferedTurn(dropped, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, false);
  assert.equal(retry.kind, "retry");
  const gone = judgeBufferedTurn(dropped, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, true);
  assert.equal(gone.kind, "pass", "a client that disconnected must not cost another upstream call");
  const skipped = judgeBufferedTurn(
    { kind: "skipped" },
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    false
  );
  assert.equal(skipped.kind, "pass", "an unclassifiable turn passes through");
});

test("replay: Responses reasoning-only deltas without completed classify empty", () => {
  const body = [
    `data: ${JSON.stringify({ type: "response.reasoning_text.delta", delta: "thinking here" })}\n\n`,
    `data: ${JSON.stringify({ type: "response.reasoning_summary_text.done", text: "thinking here" })}\n\n`,
  ].join("");
  const summary = summarizeReplayedUpstreamTurn(body, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI);
  assert.ok(summary, "replay must produce a summary");
  assert.equal(isUselessEmptyTurn(summary), true);
});

test("a stalled stream with nothing usable is retried, not surfaced as an error", async () => {
  // An upstream that answers, sends a keepalive, then goes silent without ever
  // closing or erroring: buffering can never end on its own.
  const silent = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(": keepalive\n\n"));
    },
  });
  const started = Date.now();
  const out = await readBoundedResponseOutcome(
    new Response(silent, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    50
  );
  assert.equal(out.kind, "idle", "a stream that stops producing must end the buffered read");
  assert.ok(Date.now() - started < 2000, "the read must return on its own budget");

  const verdict = judgeBufferedTurn(out, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, false);
  assert.equal(verdict.kind, "retry", "nothing usable was produced: replay, never a bare failure");

  const gone = judgeBufferedTurn(out, FORMATS.OPENAI_RESPONSES, FORMATS.OPENAI, true);
  assert.equal(gone.kind, "pass", "a client that disconnected must not cost another dispatch");
});

test("a stalled stream that already carries content is passed through, not replayed", async () => {
  const partial = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(sse(chatChunk({ content: "hello" }))));
    },
  });
  const out = await readBoundedResponseOutcome(
    new Response(partial, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    50
  );
  assert.equal(out.kind, "idle");
  const verdict = judgeBufferedTurn(out, FORMATS.OPENAI, FORMATS.OPENAI, false);
  assert.equal(verdict.kind, "pass", "content already produced is worth keeping");
});

test("bounded read keeps no budget when the idle budget is zero", async () => {
  const body = sse(chatChunk({ content: "hi" }));
  const out = await readBoundedResponseOutcome(new Response(body, { status: 200 }), 256_000, 0);
  assert.deepEqual(out, { kind: "text", text: body }, "a disabled budget must not change reads");
});
