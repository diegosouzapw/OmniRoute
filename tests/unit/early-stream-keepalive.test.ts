import test from "node:test";
import assert from "node:assert/strict";

import { withEarlyStreamKeepalive } from "../../open-sse/utils/earlyStreamKeepalive.ts";

async function readAll(response: Response): Promise<string> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let out = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) out += decoder.decode(value, { stream: true });
  }
  return out;
}

function sseResponse(bodyText: string): Response {
  return new Response(bodyText, {
    status: 200,
    headers: { "Content-Type": "text/event-stream" },
  });
}

// #2544: a handler that resolves quickly must be returned verbatim — same object,
// status, and headers — so the common (fast) path has zero behavior change.
test("fast handler is returned verbatim with headers preserved (#2544)", async () => {
  const original = new Response("data: hi\n\n", {
    status: 200,
    headers: { "Content-Type": "text/event-stream", "x-omniroute-provider": "openai" },
  });
  const result = await withEarlyStreamKeepalive(Promise.resolve(original), { thresholdMs: 1000 });

  assert.equal(result, original, "fast path should return the same Response object");
  assert.equal(result.headers.get("x-omniroute-provider"), "openai");
});

// #2544: when the handler is slow to produce its first byte (slow upstream / reasoning
// model), the wrapper must open the SSE response early, emit keepalive comments to keep
// strict clients (Codex's reqwest) from idle-timing-out, then forward the real body.
test("slow handler emits early keepalive then forwards the real body (#2544)", async () => {
  const slow = new Promise<Response>((resolve) => {
    setTimeout(
      () => resolve(sseResponse("event: response.created\ndata: {}\n\ndata: [DONE]\n\n")),
      120
    );
  });

  const result = await withEarlyStreamKeepalive(slow, { thresholdMs: 25, intervalMs: 20 });
  assert.equal(result.status, 200);
  assert.match(result.headers.get("content-type") || "", /text\/event-stream/);

  const body = await readAll(result);
  assert.match(body, /: omniroute-keepalive/, "should emit a keepalive comment before the body");
  assert.match(body, /event: response\.created/, "should forward the real upstream body");
  assert.match(body, /data: \[DONE\]/);
});

// #2544: a non-SSE error that arrives after we already committed to a 200 event-stream
// must be framed as an in-band `event: error` (the HTTP status can no longer change),
// not forwarded as raw JSON (which would be malformed SSE).
test("slow handler that errors emits an in-band error frame (#2544)", async () => {
  const slowFail = new Promise<Response>((resolve) => {
    setTimeout(
      () =>
        resolve(
          new Response(JSON.stringify({ error: { message: "rate limited", type: "rate_limit" } }), {
            status: 429,
            headers: { "Content-Type": "application/json" },
          })
        ),
      80
    );
  });

  const result = await withEarlyStreamKeepalive(slowFail, { thresholdMs: 20, intervalMs: 20 });
  assert.equal(result.status, 200, "already committed to 200 SSE before the error surfaced");

  const body = await readAll(result);
  assert.match(body, /: omniroute-keepalive/);
  assert.match(body, /event: error/);
  assert.match(body, /rate limited/);
});

// #2544: a fast rejection must propagate so the route's normal error handling runs —
// it must not be silently turned into a 200 stream.
test("fast handler rejection propagates instead of being swallowed (#2544)", async () => {
  await assert.rejects(
    () =>
      withEarlyStreamKeepalive(Promise.reject(new Error("upstream unreachable")), {
        thresholdMs: 1000,
      }),
    /upstream unreachable/
  );
});

// #2544: a client disconnect during the slow wait must stop the keepalive loop.
test("aborting the client signal stops the keepalive stream (#2544)", async () => {
  const controller = new AbortController();
  const never = new Promise<Response>(() => {
    /* handler that never resolves */
  });

  const result = await withEarlyStreamKeepalive(never, {
    thresholdMs: 10,
    intervalMs: 15,
    signal: controller.signal,
  });

  const reader = result.body!.getReader();
  // Drain a couple of keepalive frames, then abort.
  await reader.read();
  controller.abort();
  // After abort the stream should terminate (close) rather than hang forever.
  const drained = (async () => {
    while (true) {
      const { done } = await reader.read();
      if (done) return true;
    }
  })();
  const timed = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 500));
  assert.equal(await Promise.race([drained, timed]), true, "stream should close after abort");
});
