// tests/unit/chatcore-stage-trace.test.ts
// Characterization of stageTrace — the per-request [STAGE_TRACE] checkpoint logger extracted from
// handleChatCore (chatCore god-file decomposition, #3501). Locks: the disabled no-op, the
// `${traceId} ${label} t=${elapsed}ms` format, serialized extra, and the [unserializable] fallback.
import { test } from "node:test";
import assert from "node:assert/strict";
import { stageTrace } from "../../open-sse/handlers/chatCore/stageTrace.ts";

function makeLog() {
  const calls: Array<[string, string]> = [];
  return { calls, log: { info: (tag: string, msg: string) => calls.push([tag, msg]) } };
}

test("is a no-op when tracing is disabled", () => {
  const { calls, log } = makeLog();
  stageTrace("post_translation", undefined, { traceEnabled: false, startTime: 0, traceId: "abc", log });
  assert.equal(calls.length, 0);
});

test("emits a STAGE_TRACE line with trace id, label and elapsed ms", () => {
  const { calls, log } = makeLog();
  stageTrace("post_executor", undefined, {
    traceEnabled: true,
    startTime: Date.now() - 5,
    traceId: "abc123",
    log,
  });
  assert.equal(calls.length, 1);
  assert.equal(calls[0][0], "STAGE_TRACE");
  assert.match(calls[0][1], /^abc123 post_executor t=\d+ms$/);
});

test("appends serialized extra context", () => {
  const { calls, log } = makeLog();
  stageTrace("pre_executor", { attempt: 2 }, {
    traceEnabled: true,
    startTime: Date.now(),
    traceId: "id",
    log,
  });
  assert.match(calls[0][1], /\{"attempt":2\}$/);
});

test("falls back to [unserializable] for circular extra", () => {
  const { calls, log } = makeLog();
  const circular: Record<string, unknown> = {};
  circular.self = circular;
  stageTrace("x", circular, { traceEnabled: true, startTime: Date.now(), traceId: "id", log });
  assert.match(calls[0][1], /\[unserializable\]$/);
});
