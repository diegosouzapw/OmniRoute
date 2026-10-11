import test from "node:test";
import assert from "node:assert/strict";
import {
  withEarlyStreamKeepalive,
  OPENAI_RESPONSES_ERROR_FRAME,
} from "../../open-sse/utils/earlyStreamKeepalive.ts";
import { buildErrorBody } from "../../open-sse/utils/error.ts";
import { SYNTHETIC_RESPONSES_SEQUENCE_NUMBER } from "../../open-sse/utils/responsesSequence.ts";
import {
  withUpstreamErrorDetail,
  MAX_UPSTREAM_ERROR_MESSAGE_LENGTH,
} from "../../open-sse/utils/upstreamErrorDetail.ts";

const upstreamDetail = "The selected model is not supported for this account.";

async function readFrame(body: string, status: number, headers: HeadersInit = {}) {
  const pending = new Promise<Response>((resolve) =>
    setTimeout(
      () =>
        resolve(
          new Response(body, {
            status,
            headers: { "Content-Type": "application/json", ...headers },
          })
        ),
      80
    )
  );
  const result = await withEarlyStreamKeepalive(pending, {
    thresholdMs: 10,
    intervalMs: 20,
    errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
  });
  assert.equal(result.status, 200);
  const text = await result.text();
  const data = [...text.matchAll(/^data: (.+)$/gm)].map((match) => match[1]);
  return JSON.parse(data.at(-1)!);
}

test("a delayed Responses error retains top-level metadata and supplies a nested error", async () => {
  const body = JSON.stringify(
    buildErrorBody(
      400,
      "Upstream error: 400",
      { detail: upstreamDetail },
      {
        code: "bad_request",
        type: "invalid_request_error",
      }
    )
  );
  const frame = await readFrame(body, 400);
  assert.equal(frame.type, "error");
  assert.equal(frame.code, "bad_request");
  assert.equal(frame.status_code, 400);
  assert.equal(frame.error_type, "invalid_request_error");
  assert.equal(frame.sequence_number, SYNTHETIC_RESPONSES_SEQUENCE_NUMBER);
  assert.deepEqual(frame.error, {
    type: "invalid_request_error",
    code: "bad_request",
    message: frame.message,
    param: null,
  });
});

test("a delayed error carries sanitized upstream detail in its display message", async () => {
  const body = JSON.stringify(
    buildErrorBody(400, "Upstream error: 400", { detail: upstreamDetail })
  );
  const frame = await readFrame(body, 400);
  assert.equal(frame.message, `Upstream error: 400 (${upstreamDetail})`);
  assert.equal(frame.error.message, frame.message);
});

test("the static Responses error frame supplies string-typed nested error fields", () => {
  const payload = JSON.parse(
    new TextDecoder()
      .decode(OPENAI_RESPONSES_ERROR_FRAME)
      .replace(/^data: /, "")
      .trim()
  );
  assert.equal(payload.type, "error");
  assert.equal(payload.code, null);
  assert.deepEqual(payload.error, {
    type: "stream_error",
    code: "stream_error",
    message: payload.message,
    param: null,
  });
});

test("a delayed 429 preserves its status and retry hint", async () => {
  const frame = await readFrame(
    JSON.stringify(
      buildErrorBody(429, "Slow down", null, {
        code: "rate_limit_error",
        type: "rate_limit_error",
      })
    ),
    429,
    { "Retry-After": "27" }
  );
  assert.equal(frame.status_code, 429);
  assert.equal(frame.retry_after_seconds, 27);
  assert.equal(frame.error.type, "rate_limit_error");
});

test("an error resolved before keepalive retains its original HTTP response", async () => {
  const body = JSON.stringify(buildErrorBody(400, "Bad input"));
  const original = new Response(body, { status: 400 });
  const result = await withEarlyStreamKeepalive(Promise.resolve(original), {
    thresholdMs: 100,
    errorFrame: OPENAI_RESPONSES_ERROR_FRAME,
  });
  assert.equal(result, original);
  assert.equal(result.status, 400);
  assert.equal(await result.text(), body);
});

test("display details are deduplicated and malformed details are ignored", () => {
  assert.equal(withUpstreamErrorDetail("Bad request", null), "Bad request");
  assert.equal(withUpstreamErrorDetail("Bad request", ["nope"]), "Bad request");
  assert.equal(
    withUpstreamErrorDetail("Bad request: nope", { detail: "nope" }),
    "Bad request: nope"
  );
  assert.equal(
    withUpstreamErrorDetail("Bad request", {
      detail: "nope",
      error: { message: "bad" },
      message: "nope",
    }),
    "Bad request (nope; bad)"
  );
});

test("display messages are bounded even without an upstream detail", () => {
  for (const details of [null, { detail: "y".repeat(5000) }]) {
    const message = withUpstreamErrorDetail("x".repeat(5000), details);
    assert.ok(message.length <= MAX_UPSTREAM_ERROR_MESSAGE_LENGTH);
    assert.ok(message.endsWith("..."));
  }
});

test("both the base message and appended detail redact synthetic credentials", async () => {
  const secret = "sk-proj-" + "A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8";
  const message = withUpstreamErrorDetail(`Invalid key ${secret}`, {
    detail: `Rejected ${secret}`,
  });
  assert.ok(!message.includes(secret), message);
  const body = JSON.stringify(
    buildErrorBody(401, "Upstream error: 401", { detail: `Invalid key ${secret}` })
  );
  const frame = await readFrame(body, 401);
  assert.ok(!JSON.stringify(frame).includes(secret));
});
