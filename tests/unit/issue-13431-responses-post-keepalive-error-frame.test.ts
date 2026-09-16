/**
 * Regression test for #13431.
 *
 * `withEarlyStreamKeepalive`'s dynamic real-upstream-body branch
 * (`open-sse/utils/earlyStreamKeepalive.ts`) only distinguished Anthropic's named
 * `event: error` framing from a plain `data:` line. It did not distinguish Chat
 * Completions' `data: {"error":...}` shape from Responses' `data: {"type":"error",...}`
 * shape, so on `/v1/responses` the raw upstream body (Chat-Completions-shaped) went out
 * untouched, with no top-level `type` field. Responses clients (openai-python's Responses
 * stream iterator, Codex's own SSE parser) dispatch on `type` and silently drop a frame
 * without it, so the stream ends with no `response.completed`/`response.failed` and the
 * client reports "stream disconnected before completion" instead of the real upstream
 * error.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  withEarlyStreamKeepalive,
  OPENAI_RESPONSES_ERROR_FRAME,
  OPENAI_CHAT_ERROR_FRAME,
  ANTHROPIC_PING_FRAME,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";

async function readAll(response: Response): Promise<string> {
  const reader = response.body!.getReader();
  const decoder = new TextDecoder();
  let out = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    out += decoder.decode(value);
  }
  return out;
}

function lastDataPayload(body: string): Record<string, unknown> {
  const dataLines = [...body.matchAll(/^data: (.+)$/gm)].map((m) => m[1]);
  return JSON.parse(dataLines[dataLines.length - 1]);
}

test("Responses route: post-keepalive JSON error body must carry a `type` field (#13431)", async () => {
  // Shape actually produced by combo failure (Chat-Completions-shaped: top-level
  // `error` key, no `type` discriminator) — this is the real body from the issue.
  const upstreamErrorBody = JSON.stringify({
    error: {
      message: 'Unknown name "encrypted" ... Cannot find field.',
      type: "invalid_request_error",
      code: "bad_request",
    },
    diagnostics: { attempted: 9, terminalReason: "[400]: ..." },
  });

  const slowFail = new Promise<Response>((resolve) => {
    setTimeout(
      () =>
        resolve(
          new Response(upstreamErrorBody, {
            status: 400,
            headers: { "Content-Type": "application/json" },
          })
        ),
      80
    );
  });

  const result = await withEarlyStreamKeepalive(slowFail, {
    thresholdMs: 20,
    intervalMs: 20,
    errorFrame: OPENAI_RESPONSES_ERROR_FRAME, // exactly what src/app/api/v1/responses/route.ts passes
  });

  assert.equal(result.status, 200, "already committed to 200 SSE before the error surfaced");

  const lastPayload = lastDataPayload(await readAll(result));

  assert.ok(
    typeof lastPayload.type === "string" && lastPayload.type.length > 0,
    `Responses API events must be discriminated by a top-level \`type\` field; ` +
      `got ${JSON.stringify(lastPayload)} — a Responses client (Codex) drops any ` +
      `frame without \`type\` and reports "stream disconnected before completion" ` +
      `instead of surfacing the real upstream error.`
  );
  assert.equal(lastPayload.type, "error");
  assert.equal(lastPayload.message, 'Unknown name "encrypted" ... Cannot find field.');
  assert.equal(lastPayload.code, "bad_request");
});

test("Responses route: non-JSON/empty post-keepalive error body falls back to a safe `type:error` frame (#13431)", async () => {
  const slowFail = new Promise<Response>((resolve) => {
    setTimeout(
      () =>
        resolve(
          new Response("not json at all", {
            status: 502,
            headers: { "Content-Type": "text/plain" },
          })
        ),
      80
    );
  });

  const result = await withEarlyStreamKeepalive(slowFail, {
    thresholdMs: 20,
    intervalMs: 20,
    errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
  });

  const lastPayload = lastDataPayload(await readAll(result));

  assert.equal(lastPayload.type, "error");
  assert.ok(
    typeof lastPayload.message === "string" && lastPayload.message.length > 0,
    `fallback frame must never be opaque/empty; got ${JSON.stringify(lastPayload)}`
  );
});

test("Chat Completions route: post-keepalive JSON error body stays verbatim pass-through (regression guard) (#13431)", async () => {
  const upstreamErrorBody = JSON.stringify({
    error: { message: "boom", type: "invalid_request_error", code: "bad_request" },
  });

  const slowFail = new Promise<Response>((resolve) => {
    setTimeout(
      () =>
        resolve(
          new Response(upstreamErrorBody, {
            status: 400,
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

  const lastPayload = lastDataPayload(await readAll(result));

  // Unchanged: verbatim pass-through, top-level `error` key, no reshaping.
  assert.equal(lastPayload.type, undefined);
  assert.equal((lastPayload as { error: { message: string } }).error.message, "boom");
});

test("Anthropic /v1/messages route: post-keepalive named event: error framing stays unaffected (regression guard) (#13431)", async () => {
  const slowFail = new Promise<Response>((resolve) => {
    setTimeout(
      () =>
        resolve(
          new Response(JSON.stringify({ type: "error", error: { message: "boom" } }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
          })
        ),
      80
    );
  });

  const result = await withEarlyStreamKeepalive(slowFail, {
    thresholdMs: 20,
    intervalMs: 20,
    keepaliveFrame: ANTHROPIC_PING_FRAME,
    // default errorFrame (Anthropic `event: error`) is used when omitted.
  });

  const body = await readAll(result);
  assert.match(body, /^event: error\n/m, "Anthropic path must keep its named SSE event line");
});
