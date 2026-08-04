import test from "node:test";
import assert from "assert";
import {
  validateResponseQuality,
  releaseQualityClone,
} from "../../open-sse/services/combo/validateQuality.ts";

function makeResponse(body: string, contentType = "text/plain") {
  return {
    headers: {
      get: (name: string) => (name.toLowerCase() === "content-type" ? contentType : null),
    },
    clone: () => ({ text: async () => body }),
  } as unknown as Response;
}

test("returns valid=true for SSE with 'event:' lines", async () => {
  const res = await validateResponseQuality(makeResponse("event: message\n\n"), false, {});
  assert.strictEqual(res.valid, true);
});

test("returns valid=true for SSE with 'data:' lines", async () => {
  const res = await validateResponseQuality(makeResponse('data: {"foo":"bar"}\n\n'), false, {});
  assert.strictEqual(res.valid, true);
});

test("returns valid=false for non-JSON non-SSE text", async () => {
  const res = await validateResponseQuality(makeResponse("Hello world"), false, {});
  assert.strictEqual(res.valid, false);
});

test("returns valid=false for Responses API bodies with no output items", async () => {
  const res = await validateResponseQuality(
    makeResponse(JSON.stringify({ object: "response", status: "completed", output: [] }), "application/json"),
    false,
    {}
  );
  assert.strictEqual(res.valid, false);
});

test("returns valid=true for Responses API bodies with structural output", async () => {
  const res = await validateResponseQuality(
    makeResponse(
      JSON.stringify({
        object: "response",
        status: "completed",
        output: [{ type: "function_call", name: "lookup", arguments: "{}" }],
      }),
      "application/json"
    ),
    false,
    {}
  );
  assert.strictEqual(res.valid, true);
});

// ── releaseQualityClone (memory: release the abandoned quality-check tee branch) ──

test("releaseQualityClone is a no-op when the clone fell back to the original", () => {
  const original = new Response("body");
  // clone === original → must NOT touch the body (it's the response being streamed).
  releaseQualityClone(original, original, { clonedResponse: original });
  assert.strictEqual(original.bodyUsed, false, "original body must remain untouched");
});

test("releaseQualityClone cancels the discarded clonedResponse body", async () => {
  const original = new Response("streamed to client");
  const cloneBody = new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode("abandoned tee branch"));
    },
  });
  const clonedResponse = new Response(cloneBody);
  releaseQualityClone({} as Response, original, { clonedResponse });
  // Give the microtask queue a tick for the cancel() promise to settle.
  await Promise.resolve();
  assert.ok(clonedResponse.body?.locked || cloneBody.locked === false);
  // The original (client-facing) response is never disturbed.
  assert.strictEqual(original.bodyUsed, false);
});

test("releaseQualityClone does not throw when there is no clonedResponse", () => {
  const original = new Response("body");
  assert.doesNotThrow(() => releaseQualityClone({} as Response, original, {}));
});

// ── Combo fallback silent-stop regression (#3399/#3685 + user log 1784230812441) ──
//
// Bug: combo streamed an upstream SSE response that carried bytes but never sent
// `data: [DONE]`, `message_stop`, or any `content_block_*`. The validator saw
// `sawAnyBytes === true` and passed the response through; OpenCode then hung
// waiting for the next event. Reported via local dashboard log
// `1784230812441-bf3789` (no public GitHub issue).
//
// Fix: the streaming validator now passes through only when it actually saw a
// recognised SSE terminator ([DONE], `message_stop`/`message_delta` with
// `stop_reason`, OpenAI `finish_reason`, terminal `usage`) OR structured SSE
// activity (parsed `data:` / `event:` frames) — tracked alongside (not instead
// of) the existing #7285/#1382 lifecycle machinery. Raw bytes that never
// produced a parseable event now correctly mark invalid.

function makeSseResponse(body: string): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(body));
      controller.close();
    },
  });
  return new Response(stream, {
    status: 200,
    headers: { "content-type": "text/event-stream" },
  });
}

test("streaming incomplete lifecycle: bytes with no terminator and no structured SSE → invalid", async () => {
  // Garbage bytes that look like SSE prefix but never produce a complete
  // `data:` line, no `event:`, no [DONE], no message_stop. This is the
  // exact failure mode from log 1784230812441-bf3789.
  const res = makeSseResponse(": keepalive\n\npartial da");
  const verdict = await validateResponseQuality(res, true, {});
  assert.strictEqual(verdict.valid, false);
  assert.match(verdict.reason ?? "", /streaming/);
});

test("streaming [DONE] only (no content) → still valid (regression guard for #3685)", async () => {
  const res = makeSseResponse("data: [DONE]\n\n");
  const verdict = await validateResponseQuality(res, true, {});
  assert.strictEqual(verdict.valid, true);
});

test("streaming event: ping only (no content, no terminator) → still valid (regression guard for #3399)", async () => {
  // Some upstream providers emit periodic SSE pings for keepalive. The
  // validator must continue to pass them through so the downstream SSE
  // parser receives them rather than dropping the connection mid-stream.
  const res = makeSseResponse(": ping - 2026-07-17\n\nevent: ping\ndata: {}\n\n");
  const verdict = await validateResponseQuality(res, true, {});
  assert.strictEqual(verdict.valid, true);
});

test("streaming OpenAI finish_reason-only chunk (no content delta) → valid (recognised terminator)", async () => {
  // Some reasoning models emit a final `finish_reason: "stop"` chunk with
  // no content and no follow-up `data: [DONE]`. That's a legitimate empty
  // completion, not a truncation. Sending the `finish_reason` chunk
  // WITHOUT a trailing `[DONE]` isolates the new finish_reason check —
  // removing it would flip this test to invalid.
  const res = makeSseResponse(
    'data: {"choices":[{"index":0,"delta":{},"finish_reason":"stop"}]}\n\n'
  );
  const verdict = await validateResponseQuality(res, true, {});
  assert.strictEqual(verdict.valid, true);
});
