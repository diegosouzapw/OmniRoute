import test from "node:test";
import assert from "node:assert/strict";

import {
  withEarlyStreamKeepalive,
  ANTHROPIC_PING_FRAME,
  OPENAI_KEEPALIVE_FRAME,
  OPENAI_STARTUP_THINKING_FRAME,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";

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

// Anthropic clients (Claude Code, the Anthropic SDK) ignore SSE comments for their
// stream/first-token watchdog and abort+retry on a slow first token. The /v1/messages
// route keeps the connection warm with a REAL `event: ping` instead of the comment frame.
test("ANTHROPIC_PING_FRAME is a real Anthropic ping event (not a comment)", () => {
  const decoded = new TextDecoder().decode(ANTHROPIC_PING_FRAME);
  assert.equal(decoded, 'event: ping\ndata: {"type":"ping"}\n\n');
  assert.doesNotMatch(decoded, /^:/, "must not be an SSE comment");
});

test("OPENAI_KEEPALIVE_FRAME is a JSON-parseable OpenAI streaming chunk", () => {
  const decoded = new TextDecoder().decode(OPENAI_KEEPALIVE_FRAME);
  assert.match(decoded, /^data: /);
  assert.doesNotMatch(decoded, /^:/, "must not be an SSE comment");

  const payload = JSON.parse(decoded.slice("data: ".length).trim());
  assert.equal(payload.object, "chat.completion.chunk");
  assert.deepEqual(payload.choices, [{ index: 0, delta: {}, finish_reason: null }]);
});

test("slow handler emits the custom OpenAI keepalive chunk before the body", async () => {
  const slow = new Promise<Response>((resolve) => {
    setTimeout(() => resolve(sseResponse("data: [DONE]\n\n")), 120);
  });

  const result = await withEarlyStreamKeepalive(slow, {
    thresholdMs: 25,
    intervalMs: 20,
    keepaliveFrame: OPENAI_KEEPALIVE_FRAME,
  });

  const body = await readAll(result);
  assert.doesNotMatch(body, /: omniroute-keepalive/);
  const firstFrame = body.split("\n\n")[0];
  assert.doesNotThrow(() => JSON.parse(firstFrame.slice("data: ".length)));
  assert.match(body, /data: \[DONE\]/);
});

// #7360 follow-up: many clients time out waiting for the first SSE byte, and
// during a long Gemini rate-limit cooldown wait there's nothing real to send
// yet — OPENAI_STARTUP_THINKING_FRAME gives them a real, visible "we're still
// working on it" reasoning delta instead of an empty/no-op keepalive.
test("OPENAI_STARTUP_THINKING_FRAME is a reasoning_content delta chunk with the expected text", () => {
  const decoded = new TextDecoder().decode(OPENAI_STARTUP_THINKING_FRAME);
  assert.match(decoded, /^data: /);
  assert.doesNotMatch(decoded, /^:/, "must not be an SSE comment");

  const payload = JSON.parse(decoded.slice("data: ".length).trim());
  assert.equal(payload.object, "chat.completion.chunk");
  assert.deepEqual(payload.choices, [
    {
      index: 0,
      delta: { reasoning_content: "OmniRoute: got request, sending to provider" },
      finish_reason: null,
    },
  ]);
});

test("slow handler emits startupFrame once, then falls back to keepaliveFrame on later ticks", async () => {
  // intervalMs is floored at 250ms (see withEarlyStreamKeepalive), so the handler
  // must resolve well past one full tick to reliably observe an interval keepalive
  // before the real body arrives.
  const slow = new Promise<Response>((resolve) => {
    setTimeout(() => resolve(sseResponse("data: [DONE]\n\n")), 650);
  });

  const result = await withEarlyStreamKeepalive(slow, {
    thresholdMs: 20,
    intervalMs: 250,
    keepaliveFrame: OPENAI_KEEPALIVE_FRAME,
    startupFrame: OPENAI_STARTUP_THINKING_FRAME,
  });

  const body = await readAll(result);
  const frames = body.split("\n\n").filter(Boolean);
  const firstPayload = JSON.parse(frames[0].slice("data: ".length));
  assert.equal(
    firstPayload.choices[0].delta.reasoning_content,
    "OmniRoute: got request, sending to provider",
    "the very first frame must carry the startup thinking text"
  );

  // At least one subsequent keepalive tick should have fired before the real
  // body arrived (interval 30ms, handler resolves at 150ms) — those ticks use
  // the lightweight keepaliveFrame, not a repeat of the startup text.
  const laterKeepalives = frames
    .slice(1, -1) // drop the startup frame and the final real "[DONE]" frame
    .map((f) => JSON.parse(f.slice("data: ".length)));
  assert.ok(laterKeepalives.length > 0, "expected at least one interval keepalive tick");
  for (const tick of laterKeepalives) {
    assert.deepEqual(tick.choices[0].delta, {}, "interval ticks stay the lightweight empty delta");
  }
  assert.match(body, /data: \[DONE\]/);
});

test("startupFrame defaults to keepaliveFrame when omitted (no behavior change)", async () => {
  const slow = new Promise<Response>((resolve) => {
    setTimeout(() => resolve(sseResponse("data: [DONE]\n\n")), 120);
  });

  const result = await withEarlyStreamKeepalive(slow, {
    thresholdMs: 25,
    intervalMs: 20,
    keepaliveFrame: OPENAI_KEEPALIVE_FRAME,
    // no startupFrame passed
  });

  const body = await readAll(result);
  const firstFrame = body.split("\n\n")[0];
  const firstPayload = JSON.parse(firstFrame.slice("data: ".length));
  assert.deepEqual(
    firstPayload.choices[0].delta,
    {},
    "first frame falls back to the plain keepaliveFrame when no startupFrame is configured"
  );
});

test("slow handler emits the custom keepaliveFrame (Anthropic ping) before the body", async () => {
  const slow = new Promise<Response>((resolve) => {
    setTimeout(
      () => resolve(sseResponse("event: message_start\ndata: {}\n\ndata: [DONE]\n\n")),
      120
    );
  });

  const result = await withEarlyStreamKeepalive(slow, {
    thresholdMs: 25,
    intervalMs: 20,
    keepaliveFrame: ANTHROPIC_PING_FRAME,
  });

  const body = await readAll(result);
  assert.match(body, /event: ping\ndata: {"type":"ping"}/, "should emit a real ping event");
  assert.doesNotMatch(body, /: omniroute-keepalive/, "must not fall back to the comment frame");
  assert.match(body, /event: message_start/, "should forward the real upstream body");
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
