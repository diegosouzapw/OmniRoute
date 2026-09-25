import test from "node:test";
import assert from "node:assert/strict";

const {
  judgeBufferedTurn,
  readBoundedResponseOutcome,
  hasOpenReasoning,
  FLUSH_EMPTY_RETRY_MAX_BYTES,
} = await import("../../open-sse/utils/emptyTurnRetry.ts");
const { FORMATS } = await import("../../open-sse/translator/formats.ts");

const ev = (o: unknown) => `event: ${(o as { type: string }).type}\ndata: ${JSON.stringify(o)}\n\n`;
const resp = { id: "resp_1", object: "response", status: "in_progress", output: [], model: "m" };
const muteTurn =
  ev({ type: "response.created", response: resp }) +
  ev({ type: "response.in_progress", response: resp });
const reasoningOpen = (t = "reasoning") =>
  muteTurn +
  ev({
    type: "response.output_item.added",
    output_index: 0,
    item: { id: "rs_1", type: t, summary: [] },
  });
const sse = (...frames: string[]) => frames.join("") + "data: [DONE]\n\n";

test("mute turn judged idle is never passed through", () => {
  const verdict = judgeBufferedTurn(
    { kind: "idle", text: muteTurn },
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    false
  );
  assert.equal(verdict.kind, "retry");
});

test("open reasoning without done is never a pass", () => {
  const verdict = judgeBufferedTurn(
    { kind: "idle", text: reasoningOpen() },
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    false
  );
  assert.equal(verdict.kind, "retry");
});

test("closed reasoning without content is a retry", () => {
  const text =
    reasoningOpen() +
    ev({
      type: "response.output_item.done",
      output_index: 0,
      item: { id: "rs_1", type: "reasoning" },
    });
  const verdict = judgeBufferedTurn(
    { kind: "idle", text },
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    false
  );
  assert.equal(verdict.kind, "retry");
});

test("real content stalled mid-turn stays a pass with an idle marker", () => {
  const text =
    muteTurn +
    ev({
      type: "response.output_text.delta",
      output_index: 0,
      content_index: 0,
      delta: "hello",
    });
  const verdict = judgeBufferedTurn(
    { kind: "idle", text },
    FORMATS.OPENAI_RESPONSES,
    FORMATS.OPENAI,
    false
  );
  assert.equal(verdict.kind, "pass");
  assert.equal((verdict as { idlePass?: true }).idlePass, true);
});

test("hasOpenReasoning tracks added without done", () => {
  assert.equal(hasOpenReasoning(reasoningOpen()), true);
  assert.equal(hasOpenReasoning(""), false);
  assert.equal(
    hasOpenReasoning(
      reasoningOpen() +
        ev({
          type: "response.output_item.done",
          output_index: 0,
          item: { id: "rs_1", type: "reasoning" },
        })
    ),
    false
  );
  assert.equal(
    hasOpenReasoning(muteTurn + ev({ type: "response.completed", response: resp })),
    false
  );
});

test("hasOpenReasoning covers truncated thinking items", () => {
  assert.equal(hasOpenReasoning(reasoningOpen("thinking")), true);
});

test("bounded read continues while reasoning is open, then ends on done", async () => {
  const enc = new TextEncoder();
  const doneText =
    reasoningOpen() +
    ev({
      type: "response.output_item.done",
      output_index: 0,
      item: { id: "rs_1", type: "reasoning" },
    });
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(enc.encode(reasoningOpen()));
      setTimeout(() => {
        controller.enqueue(enc.encode(sse(ev({ type: "response.completed", response: resp }))));
        controller.close();
      }, 120);
    },
  });
  const out = await readBoundedResponseOutcome(
    new Response(stream, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    50,
    { maxTotalMs: 2000 }
  );
  assert.equal(out.kind, "text", "open reasoning must extend the bounded read past one idle gap");
  assert.ok(
    out.kind === "text" && out.text.includes("response.completed"),
    "must read through done"
  );
  void doneText;
});

test("bounded read still ends idle at the ceiling when reasoning never closes", async () => {
  const enc = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(enc.encode(reasoningOpen()));
    },
  });
  const started = Date.now();
  try {
    const out = await readBoundedResponseOutcome(
      new Response(stream, { status: 200 }),
      FLUSH_EMPTY_RETRY_MAX_BYTES,
      50,
      { maxTotalMs: 300 }
    );
    assert.equal(out.kind, "idle", "the ceiling must end the continued read");
    assert.ok(Date.now() - started < 2000, "the ceiling must bound the continued read");
  } finally {
    await stream.cancel().catch(() => undefined);
  }
});

test("text reads without options are unchanged", async () => {
  const out = await readBoundedResponseOutcome(
    new Response(muteTurn, { status: 200 }),
    FLUSH_EMPTY_RETRY_MAX_BYTES,
    0
  );
  assert.deepEqual(out, { kind: "text", text: muteTurn });
});
