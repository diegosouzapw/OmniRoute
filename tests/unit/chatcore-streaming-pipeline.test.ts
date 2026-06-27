// Characterization of assembleStreamingPipeline — the streaming transform-chain assembly extracted
// from handleChatCore's streaming success path (chatCore god-file decomposition, #3501). All
// transform factories are injected; a fake "stream" records each pipeThrough so the exact chain
// order and the branch conditions (PII explicit vs feature-flag, progress, echo) are observable
// without real ReadableStreams. Locks: transform order, the progress header side-effect, and the
// PII branch precedence (explicit createPiiTransform wins over the feature flag).
import { test } from "node:test";
import assert from "node:assert/strict";

const { assembleStreamingPipeline } = await import(
  "../../open-sse/handlers/chatCore/streamingPipeline.ts"
);

// A fake stream: each pipeThrough appends the transform's tag and returns a new fake stream.
function fakeStream(tag: string, log: string[]) {
  return {
    tag,
    pipeThrough(t: { __tag: string }) {
      log.push(t.__tag);
      return fakeStream(t.__tag, log);
    },
  };
}

function makeDeps(over: Record<string, unknown> = {}) {
  const log: string[] = [];
  const deps = {
    wantsProgress: () => false,
    pipeWithDisconnect: (..._a: unknown[]) => fakeStream("pii-base", log),
    isFeatureFlagEnabled: () => false,
    createPiiSseTransform: () => ({ __tag: "pii-flag" }),
    createProgressTransform: () => ({ __tag: "progress" }),
    createSseHeartbeatTransform: () => ({ __tag: "heartbeat" }),
    shapeForClientFormat: (f: unknown) => f,
    createModelEchoTransform: () => ({ __tag: "echo" }),
    ...over,
  } as Parameters<typeof assembleStreamingPipeline>[1];
  return { deps, log };
}

function baseArgs(over: Record<string, unknown> = {}) {
  return {
    providerResponse: {},
    transformStream: {},
    streamController: { signal: {} as AbortSignal },
    createPiiTransform: undefined,
    clientRawRequestHeaders: null,
    clientResponseFormat: "openai",
    echoModel: null,
    responseHeaders: {} as Record<string, string>,
    ...over,
  } as Parameters<typeof assembleStreamingPipeline>[0];
}

test("baseline (no pii, no progress, no echo) → only heartbeat in the chain", () => {
  const { deps, log } = makeDeps();
  assembleStreamingPipeline(baseArgs(), deps);
  assert.deepEqual(log, ["heartbeat"]);
});

test("feature-flag PII → pii-flag transform applied before heartbeat", () => {
  const { deps, log } = makeDeps({ isFeatureFlagEnabled: () => true });
  assembleStreamingPipeline(baseArgs(), deps);
  assert.deepEqual(log, ["pii-flag", "heartbeat"]);
});

test("explicit createPiiTransform wins over the feature flag", () => {
  const { deps, log } = makeDeps({ isFeatureFlagEnabled: () => true });
  const explicit = () => ({ __tag: "pii-explicit" });
  assembleStreamingPipeline(baseArgs({ createPiiTransform: explicit }), deps);
  assert.deepEqual(log, ["pii-explicit", "heartbeat"]);
});

test("progress enabled → progress transform + progress header set", () => {
  const { deps, log } = makeDeps({ wantsProgress: () => true });
  const args = baseArgs();
  assembleStreamingPipeline(args, deps);
  assert.deepEqual(log, ["progress", "heartbeat"]);
  assert.ok(Object.values(args.responseHeaders).includes("enabled"));
});

test("progress disabled → no progress header", () => {
  const { deps } = makeDeps({ wantsProgress: () => false });
  const args = baseArgs();
  assembleStreamingPipeline(args, deps);
  assert.deepEqual(args.responseHeaders, {});
});

test("echoModel set → echo transform applied last", () => {
  const { deps, log } = makeDeps();
  assembleStreamingPipeline(baseArgs({ echoModel: "alias-x" }), deps);
  assert.deepEqual(log, ["heartbeat", "echo"]);
});

test("full chain order: pii → progress → heartbeat → echo", () => {
  const { deps, log } = makeDeps({
    isFeatureFlagEnabled: () => true,
    wantsProgress: () => true,
  });
  assembleStreamingPipeline(baseArgs({ echoModel: "alias-x" }), deps);
  assert.deepEqual(log, ["pii-flag", "progress", "heartbeat", "echo"]);
});
