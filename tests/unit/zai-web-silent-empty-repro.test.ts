import test from "node:test";
import assert from "node:assert/strict";

const { buildZaiStreamingBody, parseZaiFrame } = await import(
  "../../open-sse/executors/zai-web/stream.ts"
);

/**
 * Hard Rule #6 — "never silently swallow errors in SSE streams".
 *
 * HTTP-level failures are already handled: `fetchUpstream` turns any `!ok`
 * response into a `makeErrorResult` with the sanitized body. The gap is a
 * **200 whose SSE body carries an error payload** — `parseZaiFrame` returns
 * null for it, `drainSseDeltas` drops it, and the stream closes with an empty
 * assistant message + stop + [DONE]. The caller sees a successful empty
 * completion: HTTP 200, `out=0`, "complete". That is the shape reported on
 * #8451, and it makes a rejected signature, an expired captcha and a stale
 * token all look identical.
 *
 * Scope note: returning null for a *contentless* frame is deliberate and
 * live-validated — z.ai sends phase frames with no `delta_content`, and
 * `executor-zai-web.test.ts` pins that ("returns null for frames with no usable
 * delta"). So this only adds recognition of affirmatively error-shaped frames;
 * "nothing parseable arrived" is left alone, because on this protocol that is
 * not by itself evidence of failure.
 */

function sseStream(...frames: string[]): ReadableStream<Uint8Array> {
  const enc = new TextEncoder();
  return new ReadableStream({
    start(c) {
      for (const f of frames) c.enqueue(enc.encode(`data: ${f}\n\n`));
      c.close();
    },
  });
}

async function readAll(stream: ReadableStream): Promise<string> {
  const reader = stream.getReader();
  const dec = new TextDecoder();
  let out = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    out += dec.decode(value as Uint8Array, { stream: true });
  }
  return out;
}

const emitChunk = (
  controller: ReadableStreamDefaultController,
  delta: Record<string, unknown>,
  finish?: string
) => {
  const payload = JSON.stringify({
    choices: [{ index: 0, delta, finish_reason: finish ?? null }],
  });
  controller.enqueue(new TextEncoder().encode(`data: ${payload}\n\n`));
};

const contentOf = (sse: string) =>
  [...sse.matchAll(/"content":"([^"]*)"/g)].map((m) => m[1]).join("");

test("parseZaiFrame classifies an error-shaped frame instead of discarding it", () => {
  assert.equal(parseZaiFrame({ error: "captcha expired" })?.error, "captcha expired");
  assert.equal(
    parseZaiFrame({ error: { detail: "signature invalid" } })?.error,
    "signature invalid"
  );
  assert.equal(
    parseZaiFrame({ data: { error: { message: "token expired" } } })?.error,
    "token expired"
  );
});

test("an error frame is terminal", () => {
  assert.equal(parseZaiFrame({ error: "nope" })?.done, true);
});

test("REGRESSION GUARD: contentless frames are still skipped, not reported as errors", () => {
  // Live-validated behaviour — z.ai emits phase frames with no delta_content.
  // Pinned by executor-zai-web.test.ts; re-asserted here because the error path
  // added below runs in the same function.
  assert.equal(parseZaiFrame({ data: { phase: "answer" } }), null);
  assert.equal(parseZaiFrame({ type: "chat:completion", data: { phase: "thinking" } }), null);
  assert.equal(parseZaiFrame({}), null);
  assert.equal(parseZaiFrame(null), null);
  assert.equal(parseZaiFrame("not-an-object"), null);
});

test("a 200 stream carrying an error frame surfaces it instead of finishing empty", async () => {
  const upstream = sseStream(JSON.stringify({ error: { detail: "signature invalid" } }));
  const out = await readAll(buildZaiStreamingBody(upstream, emitChunk, null));

  assert.match(contentOf(out), /signature invalid/, "the upstream's diagnosis must reach the caller");
  assert.match(contentOf(out), /\[Z\.ai error\]/, "tagged like the other web executors");
  assert.ok(out.includes('"finish_reason":"stop"'));
  assert.ok(out.includes("[DONE]"), "the stream still terminates cleanly for the client");
});

test("an error frame after partial content still surfaces, keeping what was streamed", async () => {
  const upstream = sseStream(
    JSON.stringify({ type: "chat:completion", data: { delta_content: "partial", phase: "answer" } }),
    JSON.stringify({ error: "stream aborted upstream" })
  );
  const out = await readAll(buildZaiStreamingBody(upstream, emitChunk, null));

  assert.match(contentOf(out), /partial/, "already-streamed content is preserved");
  assert.match(contentOf(out), /stream aborted upstream/, "and the failure is appended, not dropped");
});

test("control: a well-formed stream is untouched", async () => {
  const upstream = sseStream(
    JSON.stringify({ type: "chat:completion", data: { delta_content: "hello", phase: "answer" } }),
    JSON.stringify({ type: "chat:completion", data: { phase: "done", done: true } })
  );
  const out = await readAll(buildZaiStreamingBody(upstream, emitChunk, null));

  assert.equal(contentOf(out), "hello");
  assert.ok(!out.includes("[Z.ai error]"), "the happy path must stay clean");
});

test("control: a phase-only stream is not turned into an error", async () => {
  // The exact case the deliberate-null design exists for.
  const upstream = sseStream(
    JSON.stringify({ type: "chat:completion", data: { phase: "answer" } }),
    JSON.stringify({ type: "chat:completion", data: { delta_content: "hi", phase: "answer" } }),
    JSON.stringify({ type: "chat:completion", data: { phase: "done", done: true } })
  );
  const out = await readAll(buildZaiStreamingBody(upstream, emitChunk, null));

  assert.equal(contentOf(out), "hi");
  assert.ok(!out.includes("[Z.ai error]"));
});
