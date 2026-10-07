import test from "node:test";
import assert from "node:assert/strict";

const { validateResponseQuality } = await import("../../open-sse/services/combo.ts");
const { newStreamCtx, processFrame, ctxProducedSignal } =
  await import("../../open-sse/executors/cursor");

const encoder = new TextEncoder();
const silentLog = { warn: () => {} };

function sseStream(body: string): ReadableStream<Uint8Array> {
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(body));
      controller.close();
    },
  });
}

// ─── wire-format helpers (mirror the encoder's primitives) ──────────────────

function v(n: number): Buffer {
  const out: number[] = [];
  while (n > 0x7f) {
    out.push((n & 0x7f) | 0x80);
    n >>>= 7;
  }
  out.push(n);
  return Buffer.from(out);
}
function tag(field: number, wireType: number): Buffer {
  return v((field << 3) | wireType);
}
function lenPrefixed(field: number, payload: Buffer): Buffer {
  return Buffer.concat([tag(field, 2), v(payload.length), payload]);
}
// ASM { interaction_update (1): { turn_ended (14): {} } }
function buildTurnEndedPayload(): Buffer {
  const iu = lenPrefixed(14, Buffer.alloc(0));
  return lenPrefixed(1, iu);
}
// ASM { interaction_update (1): { text_delta (1): { text (1): str } } }
function buildTextDeltaPayload(text: string): Buffer {
  const tdu = lenPrefixed(1, Buffer.from(text, "utf8"));
  const iu = lenPrefixed(1, tdu);
  return lenPrefixed(1, iu);
}
// ASM { interaction_update (1): { token_delta (8): { count (1): n } } }
function buildTokenDeltaPayload(tokens: number): Buffer {
  const tokDelta = Buffer.concat([tag(1, 0), v(tokens)]);
  const iu = lenPrefixed(8, tokDelta);
  return lenPrefixed(1, iu);
}

// ─── the exact fabricated-empty shape the executor emits today ──────────────
// This is byte-for-byte what finalizeSseStream produces for a turn that
// decoded zero frames of signal: a synthetic role chunk, finish_reason:"stop",
// then [DONE]. Pre-v9 this shape passed the combo peek as {valid:true} and
// the client received a clean 200 with zero content.

// Retained as documentation of the exact wire shape this regression covers; the
// chain tests below build the stream inline. Underscore-prefixed to satisfy the
// repo's no-unused-vars convention (unused in the upstream commit too).
function _makeFabricatedEmptyCursorResponse(): Response {
  const chunks = [
    JSON.stringify({
      id: "chatcmpl-cursor-fabricated-empty",
      object: "chat.completion.chunk",
      model: "cursor/cursor-grok-4.6-high",
      choices: [{ index: 0, delta: { role: "assistant", content: "" }, finish_reason: null }],
    }),
    JSON.stringify({
      id: "chatcmpl-cursor-fabricated-empty",
      object: "chat.completion.chunk",
      model: "cursor/cursor-grok-4.6-high",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    }),
  ];
  const body = chunks.map((c) => `data: ${c}\n\n`).join("") + "data: [DONE]\n\n";
  return new Response(sseStream(body), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

test("v9 RED: ctx with turn_ended but zero signal reports no produced signal", () => {
  // A turn that ONLY saw turn_ended — the live grok-4.6 masked-empty case.
  const ctx = newStreamCtx("cursor/cursor-grok-4.6-high", () => {});
  processFrame(buildTurnEndedPayload(), ctx, new Set());
  assert.equal(ctx.endReason, "turn_ended");
  assert.equal(ctxProducedSignal(ctx), false, "turn_ended alone is not usable signal");
});

test("v9 control: ctx with text signal reports produced signal", () => {
  const ctx = newStreamCtx("cursor/cursor-grok-4.6-high", () => {});
  processFrame(buildTextDeltaPayload("answer"), ctx, new Set());
  processFrame(buildTurnEndedPayload(), ctx, new Set());
  assert.equal(ctxProducedSignal(ctx), true);
});

test("v9 control: ctx with only tokenDelta reports produced signal", () => {
  const ctx = newStreamCtx("cursor/cursor-grok-4.6-high", () => {});
  processFrame(buildTokenDeltaPayload(7), ctx, new Set());
  processFrame(buildTurnEndedPayload(), ctx, new Set());
  assert.equal(ctxProducedSignal(ctx), true);
});

test("v9 chain: fabricated-empty cursor stream now fails combo validation (regression: used to pass)", async () => {
  // The peek can no longer be relied on to distinguish — the executor now
  // errors the stream instead of fabricating this shape, so the peek sees a
  // stream error with no content and applies the v8 dead-before-token gate.
  // This test documents the chain: the peek's catch treats a stream error
  // before any content/terminator as invalid. Simulate the post-v9 executor
  // output directly: an erroring stream.
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.error(new Error("cursor-agent completed turn with no usable content"));
    },
  });
  const res = new Response(stream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, false, "executor-erroring empty stream must fail over");
  assert.match(out.reason ?? "", /no usable content|aborted before content/);
});

test("v9 chain: healthy cursor stream with real content still passes validation", async () => {
  const chunks = [
    JSON.stringify({
      id: "chatcmpl-cursor-healthy",
      object: "chat.completion.chunk",
      model: "cursor/cursor-grok-4.6-high",
      choices: [
        { index: 0, delta: { role: "assistant", content: "Working on it" }, finish_reason: null },
      ],
    }),
    JSON.stringify({
      id: "chatcmpl-cursor-healthy",
      object: "chat.completion.chunk",
      model: "cursor/cursor-grok-4.6-high",
      choices: [{ index: 0, delta: {}, finish_reason: "stop" }],
    }),
  ];
  const body = chunks.map((c) => `data: ${c}\n\n`).join("") + "data: [DONE]\n\n";
  const res = new Response(sseStream(body), {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
  const out = await validateResponseQuality(res, true, silentLog);
  assert.equal(out.valid, true);
});
