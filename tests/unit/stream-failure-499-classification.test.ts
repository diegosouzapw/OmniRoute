import test from "node:test";
import assert from "node:assert/strict";

const { createStreamFailureFinalizers } =
  await import("../../open-sse/utils/streamFailureFinalization.ts");
const { formatTranslatedStreamError } = await import("../../open-sse/utils/streamErrorFormat.ts");

test("createStreamFailureFinalizers: 499 client disconnect body is client_disconnected", () => {
  let captured: { status: number; responseBody: unknown; errorCode?: string | null } | null = null;

  const { onPipelineStreamError } = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => false,
    onStreamComplete: (payload) => {
      captured = {
        status: payload.status,
        responseBody: payload.responseBody,
        errorCode: payload.errorCode,
      };
    },
    persistFailureUsage: () => {},
  });

  onPipelineStreamError({
    message: "Client disconnected: request_signal_aborted",
    statusCode: 499,
  });

  assert.ok(captured, "onStreamComplete must fire");
  assert.equal(captured.status, 499);
  assert.equal(captured.errorCode, "client_disconnected");

  const body = captured.responseBody as {
    error: { type?: string; code?: string; message: string };
  };
  assert.equal(body.error.type, "client_disconnected");
  assert.equal(body.error.code, "client_disconnected");
});

test("createStreamFailureFinalizers: caller classification survives into response body", () => {
  let captured: unknown = null;

  const { handleStreamFailure } = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => false,
    onStreamComplete: (payload) => {
      captured = payload.responseBody;
    },
    persistFailureUsage: () => {},
  });

  const handled = handleStreamFailure({
    status: 502,
    message: "Upstream stream error",
    code: "stream_pipeline_error",
    type: "stream_error",
  });

  assert.equal(handled, true, "the callback contract reports that the stream failure was handled");
  const body = captured as { error: { type?: string; code?: string } };
  assert.equal(body.error.type, "stream_error");
  assert.equal(body.error.code, "stream_pipeline_error");
});

test("formatTranslatedStreamError projects unsafe upstream classification fields", () => {
  const unsafeCode = "bad access_token=TOP_SECRET /home/alice/code.ts";
  const unsafeType = "bad_type\n    at /home/alice/type.ts:1:2";
  const text = formatTranslatedStreamError({
    error: {
      status: 502,
      message: "Upstream failed",
      code: unsafeCode,
      type: unsafeType,
    },
  });
  const dataLine = text.split("\n").find((line) => line.startsWith("data: {"));
  assert.ok(dataLine, "OpenAI SSE must contain a JSON data line");
  const payload = JSON.parse(dataLine.slice(6)) as {
    error: { code?: string; type?: string };
  };

  assert.equal(payload.error.code, "bad_gateway");
  assert.equal(payload.error.type, "server_error");
  assert.ok(!text.includes("TOP_SECRET"));
  assert.ok(!text.includes("/home/alice"));
});

test("formatTranslatedStreamError preserves safe rate-limit classification", () => {
  const text = formatTranslatedStreamError({
    error: {
      status: 429,
      message: "Weekly quota reached",
      code: "usage_limit_reached",
      type: "rate_limit_error",
    },
  });
  const dataLine = text.split("\n").find((line) => line.startsWith("data: {"));
  assert.ok(dataLine, "OpenAI SSE must contain a JSON data line");
  const payload = JSON.parse(dataLine.slice(6)) as {
    error: { code?: string; type?: string };
  };

  assert.equal(payload.error.code, "usage_limit_reached");
  assert.equal(payload.error.type, "rate_limit_error");
});
