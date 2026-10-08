import assert from "node:assert/strict";
import test from "node:test";
import { readProof } from "../../src/lib/modelValidation/proofs.ts";

const frame = (value: unknown) => `data: ${JSON.stringify(value)}\n\n`;
const tool = frame({
  choices: [
    {
      index: 0,
      delta: {
        tool_calls: [{ index: 0, id: "call_1", function: { name: "echo", arguments: "{}" } }],
      },
      finish_reason: null,
    },
  ],
});
const finish = frame({ choices: [{ index: 0, delta: {}, finish_reason: "tool_calls" }] });
const response = (body: string) =>
  new Response(body, { headers: { "content-type": "text/event-stream" } });

test("stream proofs require an explicit finish and reject data after DONE", async () => {
  const signal = new AbortController().signal;
  for (const body of [
    tool + "data: [DONE]\n\n",
    "data: [DONE]\n\n" + tool + finish,
    tool + finish,
  ]) {
    await assert.rejects(() => readProof(response(body), signal, true), /proof/);
  }
  assert.equal(
    (await readProof(response(tool + finish + "data: [DONE]\n\n"), signal, true)).toolCalls.length,
    1
  );
});

test("proof reads cancel oversized and stalled streams", async () => {
  const signal = new AbortController().signal;
  await assert.rejects(() => readProof(response("x".repeat(65_537)), signal, true), /proof/);
  let cancelled = false;
  const controller = new AbortController();
  const stalled = new Response(
    new ReadableStream({
      cancel() {
        cancelled = true;
      },
    }),
    { headers: { "content-type": "text/event-stream" } }
  );
  const proof = readProof(stalled, controller.signal, true);
  controller.abort(new Error("test cancellation"));
  await assert.rejects(() => proof, /cancellation/);
  assert.equal(cancelled, true);
});
