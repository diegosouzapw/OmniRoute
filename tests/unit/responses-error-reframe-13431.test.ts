/**
 * @file responses-error-reframe-13431.test.ts
 * @description Verifies that when the Responses API route's early keepalive
 * encounters a non-SSE upstream error body, the error is re-framed as a
 * Responses-format event ({"type":"error",...}) instead of forwarded as a
 * Chat Completions-shaped error ({"error":{...}}) that Responses clients
 * ignore.  (#13431)
 */

import test from "node:test";
import assert from "node:assert/strict";
import {
  withEarlyStreamKeepalive,
  OPENAI_RESPONSES_ERROR_FRAME,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";

const ENCODER = new TextEncoder();
const DECODER = new TextDecoder();

async function drainStream(body: ReadableStream<Uint8Array>): Promise<string> {
  const reader = body.getReader();
  let text = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    text += DECODER.decode(value, { stream: true });
  }
  return text;
}

function makeNonSseResponse(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// ── Responses route re-frames Chat Completions-shaped upstream errors ─────

test("responses route re-frames Chat Completions-shaped upstream error", async () => {
  const upstreamError = {
    error: {
      message: "[400]: Invalid JSON payload received.",
      type: "invalid_request_error",
      code: "bad_request",
    },
    diagnostics: { attempted: 9 },
  };
  const handlerResponse = makeNonSseResponse(upstreamError);
  const delayed = new Promise<Response>((resolve) =>
    setTimeout(() => resolve(handlerResponse), 10)
  );

  const result = await withEarlyStreamKeepalive(delayed, {
    thresholdMs: 5,
    intervalMs: 50,
    errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
  });

  assert.equal(result.status, 200);
  const text = await drainStream(result.body!);

  // Find the data: line (skip keepalive frames)
  const dataLines = text.split("\n").filter((l) => l.startsWith("data: "));
  const errorDataLine = dataLines.find((l) => l.includes('"type":"error"'));
  assert.ok(errorDataLine, "should contain a data: line with type:error");

  const payload = JSON.parse(errorDataLine!.slice("data: ".length));
  assert.equal(payload.type, "error");
  assert.equal(payload.code, "bad_request");
  assert.ok(
    payload.message.includes("Invalid JSON payload"),
    "should preserve upstream error message"
  );
  assert.equal(payload.param, null);
});

// ── Responses route passes through already-correct Responses errors ──────

test("responses route passes through Responses-shaped error unchanged", async () => {
  const responsesError = {
    type: "error",
    code: "content_policy_violation",
    message: "Request rejected by content filter.",
    param: null,
  };
  const handlerResponse = makeNonSseResponse(responsesError);
  const delayed = new Promise<Response>((resolve) =>
    setTimeout(() => resolve(handlerResponse), 10)
  );

  const result = await withEarlyStreamKeepalive(delayed, {
    thresholdMs: 5,
    intervalMs: 50,
    errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
  });

  assert.equal(result.status, 200);
  const text = await drainStream(result.body!);

  const dataLines = text.split("\n").filter((l) => l.startsWith("data: "));
  const errorDataLine = dataLines.find((l) => l.includes('"type":"error"'));
  assert.ok(errorDataLine, "should contain a data: line with type:error");

  const payload = JSON.parse(errorDataLine!.slice("data: ".length));
  assert.equal(payload.type, "error");
  assert.equal(payload.code, "content_policy_violation");
  assert.equal(
    payload.message,
    "Request rejected by content filter."
  );
});

// ── Responses route wraps empty body in generic Responses error ───────────

test("responses route wraps empty upstream body in generic Responses error", async () => {
  const handlerResponse = makeNonSseResponse({});
  // Override to return empty body
  const emptyResponse = new Response("", {
    status: 500,
    headers: { "content-type": "application/json" },
  });
  const delayed = new Promise<Response>((resolve) =>
    setTimeout(() => resolve(emptyResponse), 10)
  );

  const result = await withEarlyStreamKeepalive(delayed, {
    thresholdMs: 5,
    intervalMs: 50,
    errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
  });

  assert.equal(result.status, 200);
  const text = await drainStream(result.body!);

  const dataLines = text.split("\n").filter((l) => l.startsWith("data: "));
  const errorDataLine = dataLines.find((l) => l.includes('"type":"error"'));
  assert.ok(errorDataLine, "should contain a data: line with type:error");

  const payload = JSON.parse(errorDataLine!.slice("data: ".length));
  assert.equal(payload.type, "error");
  assert.equal(payload.code, null);
  assert.equal(payload.param, null);
  assert.ok(
    typeof payload.message === "string" && payload.message.length > 0,
    "should have a non-empty message"
  );
});

// ── Chat Completions route does NOT re-frame (existing behavior) ─────────

test("chat completions route does NOT re-frame upstream error (existing behavior)", async () => {
  const CHAT_ERROR_FRAME = ENCODER.encode(
    `data: ${JSON.stringify({
      error: { message: "Upstream stream failed before completion.", type: "stream_error" },
    })}\n\n`
  );
  const upstreamError = {
    error: {
      message: "Something went wrong",
      type: "server_error",
      code: "internal",
    },
  };
  const handlerResponse = makeNonSseResponse(upstreamError);
  const delayed = new Promise<Response>((resolve) =>
    setTimeout(() => resolve(handlerResponse), 10)
  );

  const result = await withEarlyStreamKeepalive(delayed, {
    thresholdMs: 5,
    intervalMs: 50,
    errorFrame: CHAT_ERROR_FRAME,
  });

  assert.equal(result.status, 200);
  const text = await drainStream(result.body!);

  // The upstream error should be forwarded as-is (no type field wrapping)
  assert.ok(
    text.includes('"error":{') || text.includes('"error": {'),
    "should contain Chat Completions-shaped error (not Responses-wrapped)"
  );
  // Should NOT have a Responses-style type:"error" at top level
  const dataLines = text.split("\n").filter((l) => l.startsWith("data: "));
  const responsesLine = dataLines.find(
    (l) => l.includes('"type":"error"') && !l.includes('"error":{')
  );
  assert.ok(
    !responsesLine,
    "should NOT contain Responses-style error framing for Chat route"
  );
});

// ── Responses route wraps unparseable body in generic error ───────────────

test("responses route wraps unparseable body in generic Responses error", async () => {
  const garbageResponse = new Response("not json at all {{{", {
    status: 502,
    headers: { "content-type": "text/plain" },
  });
  const delayed = new Promise<Response>((resolve) =>
    setTimeout(() => resolve(garbageResponse), 10)
  );

  const result = await withEarlyStreamKeepalive(delayed, {
    thresholdMs: 5,
    intervalMs: 50,
    errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
  });

  assert.equal(result.status, 200);
  const text = await drainStream(result.body!);

  const dataLines = text.split("\n").filter((l) => l.startsWith("data: "));
  const errorDataLine = dataLines.find((l) => l.includes('"type":"error"'));
  assert.ok(errorDataLine, "should contain a data: line with type:error");

  const payload = JSON.parse(errorDataLine!.slice("data: ".length));
  assert.equal(payload.type, "error");
  assert.equal(payload.code, null);
  assert.equal(payload.param, null);
});
