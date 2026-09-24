/**
 * Follow-up of #13431. After the early keepalive commits `/v1/responses` to HTTP 200,
 * a handler error response became a `type:error` frame that kept only code/message/param.
 * Clients lost the HTTP status and Retry-After, so they could not tell a permanent error
 * (403 model not allowed) from a transient one (429/503) and retried permanent errors.
 * The frame now also carries `status_code`, `error_type` and `retry_after_seconds`.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  withEarlyStreamKeepalive,
  OPENAI_RESPONSES_ERROR_FRAME,
  OPENAI_CHAT_ERROR_FRAME,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";
import { SYNTHETIC_RESPONSES_SEQUENCE_NUMBER } from "../../open-sse/utils/responsesSequence.ts";

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

function slow(body: string, status: number, headers: Record<string, string> = {}) {
  return new Promise<Response>((resolve) => {
    setTimeout(
      () =>
        resolve(
          new Response(body, {
            status,
            headers: { "Content-Type": "application/json", ...headers },
          })
        ),
      80
    );
  });
}

async function responsesFrame(response: Promise<Response>) {
  const result = await withEarlyStreamKeepalive(response, {
    thresholdMs: 20,
    intervalMs: 20,
    errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
  });
  assert.equal(result.status, 200, "committed to 200 before the error surfaced");
  return lastDataPayload(await readAll(result));
}

const errorBody = (type: string, code: string, message = "boom") =>
  JSON.stringify({ error: { message, type, code } });

test("429 keeps its status, error type and Retry-After seconds", async () => {
  const frame = await responsesFrame(
    slow(errorBody("rate_limit_error", "rate_limit_exceeded"), 429, { "Retry-After": "30" })
  );
  assert.equal(frame.type, "error");
  assert.equal(frame.code, "rate_limit_exceeded");
  assert.equal(frame.status_code, 429);
  assert.equal(frame.error_type, "rate_limit_error");
  assert.equal(frame.retry_after_seconds, 30);
  assert.equal(frame.sequence_number, SYNTHETIC_RESPONSES_SEQUENCE_NUMBER);
});

test("403 permission error has a status and no retry hint", async () => {
  const frame = await responsesFrame(slow(errorBody("permission_error", "permission_denied"), 403));
  assert.equal(frame.status_code, 403);
  assert.equal(frame.error_type, "permission_error");
  assert.equal("retry_after_seconds" in frame, false);
});

test("an HTTP-date Retry-After becomes seconds from now, clamped to 3600", async () => {
  const soon = new Date(Date.now() + 90_000).toUTCString();
  const near = await responsesFrame(
    slow(errorBody("server_error", "service_unavailable"), 503, { "Retry-After": soon })
  );
  assert.equal(near.status_code, 503);
  assert.ok(
    typeof near.retry_after_seconds === "number" &&
      near.retry_after_seconds >= 85 &&
      near.retry_after_seconds <= 90,
    `got ${near.retry_after_seconds}`
  );

  const far = await responsesFrame(
    slow(errorBody("server_error", "service_unavailable"), 503, { "Retry-After": "999999" })
  );
  assert.equal(far.retry_after_seconds, 3600);
});

test("falls back to x-omniroute-retry-after-seconds when Retry-After is absent", async () => {
  const frame = await responsesFrame(
    slow(errorBody("rate_limit_error", "rate_limit_exceeded"), 429, {
      "x-omniroute-retry-after-seconds": "12",
    })
  );
  assert.equal(frame.retry_after_seconds, 12);
});

test("a body without error.type still carries status_code but no error_type", async () => {
  const frame = await responsesFrame(slow(JSON.stringify({ message: "plain" }), 502));
  assert.equal(frame.status_code, 502);
  assert.equal(frame.message, "plain");
  assert.equal("error_type" in frame, false);
});

test("fast path is unchanged: real status and headers, no frame", async () => {
  const result = await withEarlyStreamKeepalive(
    Promise.resolve(
      new Response(errorBody("rate_limit_error", "rate_limit_exceeded"), {
        status: 429,
        headers: { "Content-Type": "application/json", "Retry-After": "30" },
      })
    ),
    { thresholdMs: 200, intervalMs: 20, errorFrame: OPENAI_RESPONSES_ERROR_FRAME }
  );
  assert.equal(result.status, 429);
  assert.equal(result.headers.get("retry-after"), "30");
});

test("chat-format frames are untouched (no status_code added)", async () => {
  const result = await withEarlyStreamKeepalive(
    slow(errorBody("rate_limit_error", "rate_limit_exceeded"), 429, { "Retry-After": "30" }),
    { thresholdMs: 20, intervalMs: 20, errorFrame: OPENAI_CHAT_ERROR_FRAME }
  );
  const payload = lastDataPayload(await readAll(result));
  assert.equal("status_code" in payload, false);
});
