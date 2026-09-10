import test from "node:test";
import assert from "node:assert/strict";

const { buildZaiStreamingBody, parseZaiFrame, collectZaiNonStreaming } =
  await import("../../open-sse/executors/zai-web/stream.ts");

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

async function readUntilError(stream: ReadableStream): Promise<{ output: string; error: unknown }> {
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let output = "";
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) return { output, error: null };
      output += decoder.decode(value as Uint8Array, { stream: true });
    }
  } catch (error) {
    return { output, error };
  } finally {
    reader.releaseLock();
  }
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

function errorPayloads(sse: string): Array<Record<string, unknown>> {
  return sse
    .split(/\r?\n/)
    .filter((line) => line.startsWith("data: ") && line !== "data: [DONE]")
    .map((line) => JSON.parse(line.slice(6)) as Record<string, unknown>)
    .filter((payload) => "error" in payload);
}

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

test("a 200 stream carrying an error frame emits a terminal error instead of false success", async () => {
  const upstream = sseStream(JSON.stringify({ error: { detail: "signature invalid" } }));
  const out = await readAll(buildZaiStreamingBody(upstream, emitChunk, null));

  assert.equal(contentOf(out), "", "an upstream failure must not become assistant content");
  assert.deepEqual(errorPayloads(out), [
    {
      error: {
        message: "Z.ai stream failed: signature invalid",
        type: "upstream_error",
        code: "zai_stream_error",
      },
    },
  ]);
  assert.ok(!out.includes("response.failed"), "Chat streams cannot emit Responses events");
  assert.ok(!out.includes('"finish_reason":"stop"'), "a failure must not report a normal stop");
  assert.ok(!out.includes("[DONE]"), "readiness must see an error-only pre-content stream");
});

test("an error after partial content preserves it, then errors the producer stream", async () => {
  const upstream = sseStream(
    JSON.stringify({
      type: "chat:completion",
      data: { delta_content: "partial", phase: "answer" },
    }),
    JSON.stringify({ error: "stream aborted upstream" })
  );
  const { output, error } = await readUntilError(buildZaiStreamingBody(upstream, emitChunk, null));

  assert.match(contentOf(output), /partial/, "already-streamed content is preserved");
  assert.match(String(error), /Z\.ai stream failed: stream aborted upstream/);
  assert.ok(!output.includes("response.failed"), "the producer stays protocol-neutral");
  assert.ok(
    !output.includes('"finish_reason":"stop"'),
    "partial output does not make failure success"
  );
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

// ── Non-streaming path (collectZaiNonStreaming) ───────────────────────────────

test("collectZaiNonStreaming rejects on an error frame instead of returning empty", async () => {
  const upstream = sseStream(JSON.stringify({ error: { detail: "captcha expired" } }));
  await assert.rejects(
    () => collectZaiNonStreaming(upstream),
    (err: Error) => {
      assert.match(err.message, /captcha expired/);
      return true;
    }
  );
});

test("collectZaiNonStreaming returns content when no error frame is present", async () => {
  const upstream = sseStream(
    JSON.stringify({ type: "chat:completion", data: { delta_content: "hello", phase: "answer" } }),
    JSON.stringify({ type: "chat:completion", data: { phase: "done", done: true } })
  );
  const result = await collectZaiNonStreaming(upstream);
  assert.equal(result.answer, "hello");
  assert.equal(result.reasoning, "");
});
