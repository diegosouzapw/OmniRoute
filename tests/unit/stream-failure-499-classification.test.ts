import test from "node:test";
import assert from "node:assert/strict";

const { createStreamFailureFinalizers } = await import(
  "../../open-sse/utils/streamFailureFinalization.ts"
);

test("createStreamFailureFinalizers: 499 client disconnect body is client_disconnected", () => {
  let captured: { status: number; responseBody: unknown; errorCode?: string | null } | null =
    null;

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

  handleStreamFailure({
    status: 502,
    message: "Upstream stream error",
    code: "stream_pipeline_error",
    type: "stream_error",
  });

  const body = captured as { error: { type?: string; code?: string } };
  assert.equal(body.error.type, "stream_error");
  assert.equal(body.error.code, "stream_pipeline_error");
});
