import test from "node:test";
import assert from "node:assert/strict";

const { createStreamFailureFinalizers, finalizeStreamRequestLog } =
  await import("../../open-sse/utils/streamFailureFinalization.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");

type Captured = {
  status: number;
  errorCode?: string | null;
  responseBody: unknown;
  persistedCode?: string;
};

function runPipelineError(message: string, statusCode: number): Captured {
  let captured: Captured | null = null;
  const { onPipelineStreamError } = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => false,
    onStreamComplete: (payload) => {
      captured = {
        status: payload.status,
        errorCode: payload.errorCode,
        responseBody: payload.responseBody,
      };
    },
    persistFailureUsage: (status, errorCode) => {
      assert.equal(status, captured === null ? statusCode : (captured as Captured).status);
      if (captured) (captured as Captured).persistedCode = errorCode;
      else {
        captured = {
          status: statusCode,
          responseBody: null,
          persistedCode: errorCode,
        };
      }
    },
  });

  onPipelineStreamError({ message, statusCode });
  assert.ok(captured, "onStreamComplete must fire");
  return captured as Captured;
}

function bodyError(captured: Captured): { code?: string; type?: string } {
  const body = captured.responseBody as { error?: { code?: string; type?: string } };
  assert.ok(body?.error, "response body must carry an error envelope");
  return body.error as { code?: string; type?: string };
}

test("content stall watchdog failure is classified distinctly from transport failures", () => {
  const captured = runPipelineError(
    "stream content stall: no model output within 90000ms (lifecycle/heartbeat events only)",
    502
  );
  assert.equal(captured.status, 502);
  assert.equal(captured.errorCode, "stream_content_stall");
  assert.equal(captured.persistedCode, "stream_content_stall");
  assert.equal(bodyError(captured).code, "stream_content_stall");
  assert.equal(bodyError(captured).type, "stream_error");
});

test("literal terminated transport failure keeps its own classification", () => {
  const captured = runPipelineError("Agent execution terminated due to error", 502);
  assert.equal(captured.status, 502);
  assert.equal(captured.errorCode, "stream_terminated");
  assert.equal(captured.persistedCode, "stream_terminated");
  assert.equal(bodyError(captured).code, "stream_terminated");
});

test("socket-level failures without literal terminated stay generic", () => {
  for (const message of ["socket hang up", "read ECONNRESET"]) {
    const captured = runPipelineError(message, 502);
    assert.equal(captured.errorCode, "stream_pipeline_error");
    assert.equal(captured.persistedCode, "stream_pipeline_error");
  }
});

test("generic upstream failure and client disconnect are unchanged", () => {
  const generic = runPipelineError("Upstream stream error", 502);
  assert.equal(generic.errorCode, "stream_pipeline_error");

  const disconnected = runPipelineError("Client disconnected: request_signal_aborted", 499);
  assert.equal(disconnected.status, 499);
  assert.equal(disconnected.errorCode, "client_disconnected");
});

test("already-projected stall code does not loop", () => {
  const captured = runPipelineError("stream_content_stall observed upstream", 502);
  assert.equal(captured.errorCode, "stream_pipeline_error");
});

async function replayPipelineErrorToCompletedDetail(
  provider: string,
  message: string
): Promise<{ errorCode?: string | null } | null> {
  const connectionId = `conn-${provider}`;
  const pendingId = usageHistory.trackPendingRequest("model", provider, connectionId, true, {});
  assert.ok(typeof pendingId === "string");

  let completion: { status: number; error?: string | null; errorCode?: string | null } | null =
    null;
  const { onPipelineStreamError } = createStreamFailureFinalizers({
    isFailureCompletionRecorded: () => false,
    onStreamComplete: (payload) => {
      completion = {
        status: payload.status,
        error: payload.error,
        errorCode: payload.errorCode,
      };
    },
    persistFailureUsage: () => {},
  });
  onPipelineStreamError({ message, statusCode: 502 });
  assert.ok(completion, "onStreamComplete must fire");

  finalizeStreamRequestLog({
    pendingRequestId: pendingId as string,
    model: "model",
    provider,
    connectionId,
    status: (completion as { status: number }).status,
    error: (completion as { error?: string | null }).error,
    errorCode: (completion as { errorCode?: string | null }).errorCode,
  });

  return (
    (usageHistory.getCompletedDetails().get(pendingId as string) as {
      errorCode?: string | null;
    } | null) ?? null
  );
}

test("watchdog stall and terminated persist distinct completed-request codes", async () => {
  const stall = await replayPipelineErrorToCompletedDetail(
    "stall-code-functional",
    "stream content stall: no model output within 90000ms (lifecycle/heartbeat events only)"
  );
  assert.ok(stall, "stall finalization must persist the completed request detail");
  assert.equal(stall?.errorCode, "stream_content_stall");

  const terminated = await replayPipelineErrorToCompletedDetail(
    "terminated-code-functional",
    "Agent execution terminated due to error"
  );
  assert.ok(terminated, "terminated finalization must persist the completed request detail");
  assert.equal(terminated?.errorCode, "stream_terminated");
});
