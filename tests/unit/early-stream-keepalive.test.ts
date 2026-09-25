/**
 * @file early-stream-keepalive.test.ts
 * @description Unit tests for withEarlyStreamKeepalive (fast/slow path, frames, abort).
 *
 * @changes
 * - [2026-08-16] - Assert Responses startup and recurring keepalives are neutral JSON events
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  __getDeadlineTokenRegistrySizeForTests,
  getDeadlineController,
  withDeadlineSignal,
  withEarlyStreamKeepalive,
  ANTHROPIC_PING_FRAME,
  OPENAI_KEEPALIVE_FRAME,
  OPENAI_STARTUP_FRAME,
  OPENAI_CHAT_ERROR_FRAME,
  OPENAI_RESPONSES_ERROR_FRAME,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";
import { takeEarlyKeepaliveBytes } from "../../open-sse/utils/earlyKeepaliveByteBuffer.ts";
import { OPENAI_RESPONSES_IN_PROGRESS_FRAME } from "../../open-sse/utils/sseHeartbeat.ts";

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
  assert.match(body, /: keepalive/, "should emit a keepalive comment before the body");
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
  assert.doesNotMatch(body, /: keepalive\n/);
  const firstFrame = body.split("\n\n")[0];
  assert.doesNotThrow(() => JSON.parse(firstFrame.slice("data: ".length)));
  assert.match(body, /data: \[DONE\]/);
});

test("OPENAI_STARTUP_FRAME is a parseable empty delta", () => {
  const decoded = new TextDecoder().decode(OPENAI_STARTUP_FRAME);
  assert.match(decoded, /^data: /);
  assert.doesNotMatch(decoded, /^:/, "must not be an SSE comment");

  const payload = JSON.parse(decoded.slice("data: ".length).trim());
  assert.equal(payload.object, "chat.completion.chunk");
  assert.deepEqual(payload.choices, [{ index: 0, delta: {}, finish_reason: null }]);
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
    startupFrame: OPENAI_STARTUP_FRAME,
  });

  const body = await readAll(result);
  const frames = body.split("\n\n").filter(Boolean);
  const firstPayload = JSON.parse(frames[0].slice("data: ".length));
  assert.deepEqual(firstPayload.choices[0].delta, {});

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

// Responses clients need both frequent raw bytes and occasional parsed events while
// upstream readiness is pending. Keep those cadences separate: comments cover the
// short idle-read timeout, while sparse response.in_progress events reset parsers that
// ignore comments without flooding the application event stream.
test("slow Responses handler uses comments plus sparse in_progress events", async () => {
  const slow = new Promise<Response>((resolve) => {
    setTimeout(() => resolve(sseResponse('data: {"type":"response.completed"}\n\n')), 900);
  });

  const result = await withEarlyStreamKeepalive(slow, {
    thresholdMs: 20,
    intervalMs: 250,
    startupFrame: OPENAI_RESPONSES_IN_PROGRESS_FRAME,
    applicationKeepalive: {
      frame: OPENAI_RESPONSES_IN_PROGRESS_FRAME,
      intervalMs: 500,
    },
  });

  const body = await readAll(result);
  const frames = body.split("\n\n").filter(Boolean);
  const earlyFrames = frames.slice(0, -1);
  // #14330: the frame now carries a required `sequence_number` and `response`
  // object so a strict Responses decoder does not abort on it.
  assert.deepEqual(JSON.parse(earlyFrames[0].slice("data: ".length)), {
    type: "response.in_progress",
    sequence_number: 1,
    response: { id: null, status: "in_progress" },
  });
  assert.ok(
    earlyFrames.some((frame) => frame === ": keepalive"),
    "transport ticks must remain lightweight SSE comments"
  );
  const applicationFrames = earlyFrames.filter((frame) => frame.startsWith("data: "));
  assert.ok(applicationFrames.length >= 2, "expected startup and sparse application keepalives");
  for (const frame of applicationFrames) {
    assert.deepEqual(JSON.parse(frame.slice("data: ".length)), {
      type: "response.in_progress",
      sequence_number: 1,
      response: { id: null, status: "in_progress" },
    });
    assert.doesNotMatch(frame, /output_item|reasoning|✨/);
  }
  assert.ok(
    applicationFrames.length < earlyFrames.length,
    "application events must be sparser than transport heartbeats"
  );
  assert.match(body, /data: {"type":"response.completed"}/, "real upstream body forwarded");
});

test("a correlationId records the startup frame and keepalive ticks, but not the forwarded body", async () => {
  const correlationId = "corr-record-test-1";
  const slow = new Promise<Response>((resolve) => {
    setTimeout(
      () => resolve(sseResponse("event: response.created\ndata: {}\n\ndata: [DONE]\n\n")),
      650
    );
  });

  const result = await withEarlyStreamKeepalive(slow, {
    thresholdMs: 25,
    intervalMs: 250,
    startupFrame: OPENAI_RESPONSES_IN_PROGRESS_FRAME,
    applicationKeepalive: {
      frame: OPENAI_RESPONSES_IN_PROGRESS_FRAME,
      intervalMs: 500,
    },
    correlationId,
  });
  await readAll(result);

  const recorded = takeEarlyKeepaliveBytes(correlationId).join("");
  assert.match(
    recorded,
    /data: {"type":"response\.in_progress","sequence_number":1,"response":/,
    "startup frame must be recorded"
  );
  assert.match(recorded, /: keepalive/, "transport heartbeat must be recorded");
  assert.doesNotMatch(
    recorded,
    /event: response\.created/,
    "the verbatim-forwarded real body must NOT be recorded here — the handler's own reqLogger already captures it, and double-recording would duplicate it in the persisted artifact"
  );
});

test("omitting correlationId leaves the buffer untouched (today's behavior, unchanged)", async () => {
  const correlationId = "corr-record-test-omitted";
  const slow = new Promise<Response>((resolve) => {
    setTimeout(() => resolve(sseResponse("event: response.created\ndata: {}\n\n")), 65);
  });

  const result = await withEarlyStreamKeepalive(slow, {
    thresholdMs: 25,
    intervalMs: 20,
    keepaliveFrame: OPENAI_RESPONSES_IN_PROGRESS_FRAME,
    startupFrame: OPENAI_RESPONSES_IN_PROGRESS_FRAME,
  });
  await readAll(result);

  assert.deepEqual(takeEarlyKeepaliveBytes(correlationId), []);
});

// A correlation id records the chat-frames variant (startup plus keepalive
// ticks) but not the forwarded body — mirrors the responses-frames variant above
// for the exact frames the /v1/chat/completions route passes.
test("a correlationId records the chat startup frame and keepalive ticks", async () => {
  const correlationId = "corr-record-chat-frames-1";
  const slow = new Promise<Response>((resolve) => {
    setTimeout(() => resolve(sseResponse('data: {"id":"chatcmpl-real"}\n\ndata: [DONE]\n\n')), 650);
  });

  const result = await withEarlyStreamKeepalive(slow, {
    thresholdMs: 25,
    intervalMs: 250,
    keepaliveFrame: OPENAI_KEEPALIVE_FRAME,
    startupFrame: OPENAI_STARTUP_FRAME,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
    correlationId,
  });
  await readAll(result);

  const recorded = takeEarlyKeepaliveBytes(correlationId).join("");
  assert.match(
    recorded,
    /data: \{"id":"chatcmpl-keepalive","object":"chat\.completion\.chunk"/,
    "startup frame must be recorded"
  );
  assert.equal(
    (recorded.match(/chatcmpl-keepalive/g) || []).length >= 2,
    true,
    "startup frame plus at least one recurring keepalive tick must be recorded"
  );
  assert.doesNotMatch(
    recorded,
    /chatcmpl-real/,
    "the verbatim-forwarded real body must NOT be recorded here — the handler's own reqLogger already captures it, and double-recording would duplicate it in the persisted artifact"
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
  assert.doesNotMatch(body, /: keepalive\n/, "must not fall back to the comment frame");
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
  assert.match(body, /: keepalive/);
  assert.match(body, /event: error/);
  assert.match(body, /rate limited/);
});

// Live incident territory (log ids 1784465227489-a2cbc0 / 1784457764961-73): the
// default ERROR_FRAME uses a named `event: error` SSE line, which is the Anthropic
// Messages API convention — correct for /v1/messages, but real OpenAI Chat
// Completions / Responses streams never send `event:` lines at all. A naive
// line-based parser (what most OpenAI-compatible clients use, not a full
// EventSource) can silently drop that line and/or desync on the following `data:`
// line, so the error would never reach the client — it just looks stuck.
test("OPENAI_CHAT_ERROR_FRAME is a plain data: line with no event: field", () => {
  const decoded = new TextDecoder().decode(OPENAI_CHAT_ERROR_FRAME);
  assert.doesNotMatch(decoded, /^event:/, "Chat Completions streams never use the event: field");
  assert.match(decoded, /^data: /);

  const payload = JSON.parse(decoded.replace(/^data: /, "").trim());
  assert.ok(payload.error?.message, "openai-node's stream parser checks for a top-level error key");
});

test("OPENAI_RESPONSES_ERROR_FRAME is a plain data: line discriminated by type, not event:", () => {
  const decoded = new TextDecoder().decode(OPENAI_RESPONSES_ERROR_FRAME);
  assert.doesNotMatch(decoded, /^event:/, "Responses API streams never use the event: field");
  assert.match(decoded, /^data: /);

  const payload = JSON.parse(decoded.replace(/^data: /, "").trim());
  assert.equal(
    payload.type,
    "error",
    "Responses API events are discriminated by a `type` field inside the JSON payload"
  );
});

test("errorFrame option overrides the default Anthropic-style event: error frame", async () => {
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

  const result = await withEarlyStreamKeepalive(slowFail, {
    thresholdMs: 20,
    intervalMs: 20,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
  });
  assert.equal(result.status, 200);

  const body = await readAll(result);
  assert.doesNotMatch(
    body,
    /^event: error/m,
    "must not fall back to the Anthropic-style event: error frame when a custom errorFrame is given"
  );
  // The real upstream error body ("rate limited") is forwarded verbatim, framed as a
  // plain data: line (matching errorFrame's format) instead of the generic fallback
  // message — this is the dynamic real-body branch, distinct from the static default.
  assert.match(body, /"error":\{"message":"rate limited","type":"rate_limit"\}/);
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
  const timed = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 5000));
  assert.equal(await Promise.race([drained, timed]), true, "stream should close after abort");
});

// Last-resort slow-path deadline: a handler that never resolves must not hold the
// client stream forever. At slowPathDeadlineMs the wrapper aborts the internal
// deadline controller (observable here because the test wires the helper-built
// controller straight into the wrapper), emits the route's errorFrame, closes the
// stream, and records exactly one correlated warn.
test("slow-path deadline emits errorFrame, aborts the deadline controller, warns once", async () => {
  const { wrappedReq, deadlineController } = withDeadlineSignal(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "m", stream: true }),
    })
  );
  assert.equal(deadlineController.signal.aborted, false);
  const warnings: Array<{ tag: string; message: string }> = [];
  const never = new Promise<Response>(() => {
    /* handler that never resolves */
  });

  const result = await withEarlyStreamKeepalive(never, {
    thresholdMs: 10,
    intervalMs: 15,
    signal: wrappedReq.signal,
    slowPathDeadlineMs: 50,
    deadlineController,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
    correlationId: "test-corr-1",
    log: { warn: (tag, message) => warnings.push({ tag, message }) },
  });
  assert.equal(result.status, 200);

  const body = await readAll(result);
  assert.match(body, /^data: /m, "deadline must emit the route error frame");
  assert.match(body, /"error":/, "deadline frame must carry the error payload");
  assert.equal(deadlineController.signal.aborted, true, "deadline must abort the controller");
  assert.equal(warnings.length, 1, "exactly one warn at expiration");
  assert.match(warnings[0]!.tag, /EARLY_KEEPALIVE/);
  assert.match(warnings[0]!.message, /test-corr-1/);
});

// A handler that resolves under the deadline takes the normal path: verbatim
// forward, no error frame, no warn, timer cleaned up.
test("handler resolving under the deadline forwards with no error and no warn", async () => {
  const { deadlineController } = withDeadlineSignal(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "m", stream: true }),
    })
  );
  const warnings: Array<{ tag: string; message: string }> = [];
  const slow = new Promise<Response>((resolve) => {
    setTimeout(() => resolve(sseResponse("data: [DONE]\n\n")), 60);
  });

  const result = await withEarlyStreamKeepalive(slow, {
    thresholdMs: 10,
    intervalMs: 15,
    slowPathDeadlineMs: 5000,
    deadlineController,
    errorFrame: OPENAI_CHAT_ERROR_FRAME,
    correlationId: "test-corr-2",
    log: { warn: (tag, message) => warnings.push({ tag, message }) },
  });
  const body = await readAll(result);
  assert.match(body, /data: \[DONE\]/, "real body must be forwarded");
  assert.doesNotMatch(body, /"error":/, "no error frame when resolved in time");
  assert.equal(warnings.length, 0, "no warn when resolved in time");
  assert.equal(deadlineController.signal.aborted, false, "no abort when resolved in time");
});

// slowPathDeadlineMs <= 0 disables the deadline: a slow handler keeps the normal
// slow path with no abort and no warn.
test("slowPathDeadlineMs <= 0 disables the deadline", async () => {
  const { deadlineController } = withDeadlineSignal(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "m", stream: true }),
    })
  );
  const warnings: Array<{ tag: string; message: string }> = [];
  const slow = new Promise<Response>((resolve) => {
    setTimeout(() => resolve(sseResponse("data: [DONE]\n\n")), 80);
  });

  const result = await withEarlyStreamKeepalive(slow, {
    thresholdMs: 10,
    intervalMs: 15,
    slowPathDeadlineMs: 0,
    deadlineController,
    log: { warn: (tag, message) => warnings.push({ tag, message }) },
  });
  const body = await readAll(result);
  assert.match(body, /data: \[DONE\]/);
  assert.equal(warnings.length, 0, "disabled deadline must never warn");
  assert.equal(deadlineController.signal.aborted, false, "disabled deadline must never abort");
});

// A client abort before the deadline keeps the existing disconnect path: no
// error frame, no deadline warn, timer cleaned up.
test("client abort before the deadline emits no error frame and no deadline warn", async () => {
  const clientController = new AbortController();
  const { wrappedReq, deadlineController } = withDeadlineSignal(
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "m", stream: true }),
      signal: clientController.signal,
    })
  );
  const warnings: Array<{ tag: string; message: string }> = [];
  const never = new Promise<Response>(() => {
    /* handler that never resolves */
  });

  const result = await withEarlyStreamKeepalive(never, {
    thresholdMs: 10,
    intervalMs: 15,
    signal: wrappedReq.signal,
    slowPathDeadlineMs: 5000,
    deadlineController,
    log: { warn: (tag, message) => warnings.push({ tag, message }) },
  });
  const reader = result.body!.getReader();
  await reader.read();
  clientController.abort();
  const drained = (async () => {
    while (true) {
      const { done } = await reader.read();
      if (done) return true;
    }
  })();
  const timed = new Promise<boolean>((resolve) => setTimeout(() => resolve(false), 5000));
  assert.equal(await Promise.race([drained, timed]), true, "stream should close after abort");
  assert.equal(warnings.length, 0, "client abort must not emit a deadline warn");
  assert.equal(
    deadlineController.signal.aborted,
    false,
    "client abort must not trip the deadline controller"
  );
});

// The rebuild-fallback token map is keyed by strings, so without an explicit
// release every streamed request left one entry behind forever. After N requests
// through the wrapper — fast path, slow path, deadline expiry and client abort —
// the map must be back to its original size, and the released token must no
// longer resolve through a header-only lookup.
test("deadline token registry returns to its original size after N requests", async () => {
  const baseline = __getDeadlineTokenRegistrySizeForTests();
  const makeReq = (signal?: AbortSignal) =>
    new Request("http://localhost/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
      signal,
    });
  const N = 20;
  let lastHeaders: Headers | null = null;
  for (let i = 0; i < N; i += 1) {
    // fast path
    {
      const { wrappedReq, deadlineController } = withDeadlineSignal(makeReq());
      lastHeaders = wrappedReq.headers;
      const r = await withEarlyStreamKeepalive(Promise.resolve(sseResponse("data: [DONE]\n\n")), {
        thresholdMs: 50,
        signal: wrappedReq.signal,
        deadlineController,
      });
      await readAll(r);
    }
    // slow path, handler resolves
    {
      const { wrappedReq, deadlineController } = withDeadlineSignal(makeReq());
      const slow = new Promise<Response>((resolve) =>
        setTimeout(() => resolve(sseResponse("data: [DONE]\n\n")), 20)
      );
      const r = await withEarlyStreamKeepalive(slow, {
        thresholdMs: 5,
        intervalMs: 50,
        signal: wrappedReq.signal,
        deadlineController,
      });
      await readAll(r);
    }
    // deadline expiry
    {
      const { wrappedReq, deadlineController } = withDeadlineSignal(makeReq());
      const r = await withEarlyStreamKeepalive(new Promise<Response>(() => {}), {
        thresholdMs: 5,
        intervalMs: 50,
        signal: wrappedReq.signal,
        slowPathDeadlineMs: 15,
        deadlineController,
        errorFrame: OPENAI_CHAT_ERROR_FRAME,
      });
      await readAll(r);
    }
    // client abort
    {
      const client = new AbortController();
      const { wrappedReq, deadlineController } = withDeadlineSignal(makeReq(client.signal));
      const r = await withEarlyStreamKeepalive(new Promise<Response>(() => {}), {
        thresholdMs: 5,
        intervalMs: 50,
        signal: wrappedReq.signal,
        slowPathDeadlineMs: 5000,
        deadlineController,
      });
      const reader = r.body!.getReader();
      await reader.read();
      client.abort();
      while (!(await reader.read()).done) {
        /* drain */
      }
    }
  }
  assert.equal(
    __getDeadlineTokenRegistrySizeForTests(),
    baseline,
    "every request must release its deadline token entry"
  );
  assert.equal(
    getDeadlineController({ headers: lastHeaders! }),
    null,
    "a released token must not resolve through the header fallback"
  );
});
