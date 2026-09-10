import assert from "node:assert/strict";

import type { RequestFailedPayload } from "../../src/lib/events/types.ts";

const RESULT_PREFIX = "DASHBOARD_FAILURE_PROBE_RESULT=";

async function main(): Promise<void> {
  assert.ok(process.env.DATA_DIR, "probe requires an isolated DATA_DIR");
  assert.ok(process.env.OMNIROUTE_PLUGINS_DIR, "probe requires an isolated plugins directory");
  assert.ok(process.env.API_KEY_SECRET, "probe requires a synthetic API_KEY_SECRET");

  const { persistAttemptLogs } = await import("../../open-sse/handlers/chatCore/attemptLogging.ts");
  const eventBus = await import("../../src/lib/events/eventBus.ts");
  const dbCore = await import("../../src/lib/db/core.ts");
  const callLogs = await import("../../src/lib/usage/callLogs.ts");

  let unsubscribe: (() => void) | undefined;
  try {
    globalThis.__omnirouteEventBus = undefined;
    const hostileError = new Error(
      "Provider failed in /srv/omniroute/src/private/provider.ts:42:7 with " +
        "api_key='sk-live-dashboard-secret'"
    );
    hostileError.stack =
      `${hostileError.name}: ${hostileError.message}\n` +
      "    at dispatch (/srv/omniroute/src/private/transport.ts:91:3)";
    const rawDiagnostic = hostileError.stack;
    const traceId = "trace-dashboard-redaction";
    const callLogId = "call-log-dashboard-redaction";

    const deliveredPromise = new Promise<RequestFailedPayload>((resolve, reject) => {
      const timeout = setTimeout(() => {
        unsubscribe?.();
        reject(new Error("timed out waiting for persistAttemptLogs request.failed event"));
      }, 10_000);
      unsubscribe = eventBus.on("request.failed", (payload) => {
        if (payload.id !== traceId) return;
        clearTimeout(timeout);
        unsubscribe?.();
        unsubscribe = undefined;
        resolve(payload);
      });
    });

    persistAttemptLogs(
      {
        status: 502,
        tokens: {},
        responseBody: null,
        error: rawDiagnostic,
      },
      {
        traceId,
        provider: "private-provider",
        connectionId: null,
        model: "private-model",
        skillRequestId: "skill-dashboard-redaction",
        detailedLoggingEnabled: false,
        reqLogger: null,
        pendingRequestId: callLogId,
        clientRawRequest: { endpoint: "/v1/chat/completions" },
        requestedModel: "private-model",
        credentials: null,
        startTime: Date.now() - 37,
        body: { model: "private-model", messages: [] },
        sourceFormat: "openai",
        targetFormat: "openai",
        comboName: null,
        comboStepId: null,
        comboExecutionKey: null,
        tokensCompressed: null,
        apiKeyInfo: null,
        noLogEnabled: false,
        correlationId: null,
        modelPinned: false,
        sessionTag: null,
      }
    );

    const delivered = await deliveredPromise;
    assert.equal(delivered.id, traceId);
    assert.equal(delivered.statusCode, 502);
    assert.equal(delivered.model, "private-model");
    assert.equal(delivered.provider, "private-provider");
    assert.ok(delivered.latencyMs >= 0);
    assert.equal(delivered.error, "Error: Provider failed in <path> with api_key='[REDACTED]'");
    assert.doesNotMatch(delivered.error, /sk-live-dashboard-secret|\/srv\/omniroute|\n/);

    const replayed = eventBus
      .getEventHistory(undefined, 10)
      .find(
        (entry) =>
          entry.event === "request.failed" &&
          (entry.payload as RequestFailedPayload | undefined)?.id === traceId
      );
    assert.ok(replayed, "late subscribers must have the safe request.failed history entry");
    assert.deepEqual(replayed.payload, delivered);

    const writerDrained = await callLogs.waitForCallLogSaves(10_000);
    assert.equal(writerDrained, true, "call-log write must drain");
    const persisted = await callLogs.getCallLogById(callLogId);
    assert.ok(persisted, "failed attempt must still be available to internal diagnostics");
    assert.equal(persisted.error, rawDiagnostic);

    console.log(
      RESULT_PREFIX +
        JSON.stringify({
          delivered,
          replayMatches: JSON.stringify(replayed.payload) === JSON.stringify(delivered),
          internalRawPreserved: persisted.error === rawDiagnostic,
          writerDrained,
        })
    );
  } finally {
    unsubscribe?.();
    try {
      await callLogs.waitForCallLogSaves(10_000);
      await callLogs.closeCallLogSaves(10_000);
    } finally {
      dbCore.resetDbInstance();
    }
  }
}

await main();
