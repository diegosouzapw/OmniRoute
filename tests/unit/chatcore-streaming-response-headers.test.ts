// Characterization of assembleStreamingResponseHeaders — the streaming response header builder
// extracted from handleChatCore's streaming success path (chatCore god-file decomposition, #3501).
// buildStreamingResponseHeaders is injected so the merge of upstream headers + request-id + the
// optional compression header is observable. Locks: zeroed latency/usage/cost at stream start, the
// x-omniroute-request-id, and the compression header only when meta is present.
import { test } from "node:test";
import assert from "node:assert/strict";

const { assembleStreamingResponseHeaders } = await import(
  "../../open-sse/handlers/chatCore/streamingResponseHeaders.ts"
);

function makeBuild() {
  const calls: Array<{ headers: unknown; meta: Record<string, unknown> }> = [];
  const build = (headers: unknown, meta: Record<string, unknown>) => {
    calls.push({ headers, meta });
    return { "x-upstream": "kept" };
  };
  return { build: build as Parameters<typeof assembleStreamingResponseHeaders>[1], calls };
}

function baseArgs(overrides: Record<string, unknown> = {}) {
  return {
    providerHeaders: new Headers({ "content-type": "text/event-stream" }),
    provider: "openai",
    model: "gpt-x",
    pendingRequestId: "preq-1",
    compressionResponseMeta: undefined,
    ...overrides,
  } as Parameters<typeof assembleStreamingResponseHeaders>[0];
}

test("merges upstream headers and sets x-omniroute-request-id", () => {
  const { build } = makeBuild();
  const h = assembleStreamingResponseHeaders(baseArgs(), build);
  assert.equal(h["x-upstream"], "kept");
  assert.equal(h["x-omniroute-request-id"], "preq-1");
});

test("buildStreamingResponseHeaders receives zeroed latency/usage/cost and cacheHit false", () => {
  const { build, calls } = makeBuild();
  assembleStreamingResponseHeaders(baseArgs(), build);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].meta.cacheHit, false);
  assert.equal(calls[0].meta.latencyMs, 0);
  assert.equal(calls[0].meta.usage, null);
  assert.equal(calls[0].meta.costUsd, 0);
  assert.equal(calls[0].meta.provider, "openai");
  assert.equal(calls[0].meta.model, "gpt-x");
});

test("no compression meta → no compression header", () => {
  const { build } = makeBuild();
  const h = assembleStreamingResponseHeaders(baseArgs({ compressionResponseMeta: undefined }), build);
  assert.ok(!Object.values(h).includes("engine:z"));
});

test("compression meta present → compression header set", () => {
  const { build } = makeBuild();
  const h = assembleStreamingResponseHeaders(
    baseArgs({ compressionResponseMeta: "engine:z; source=routing" }),
    build
  );
  assert.ok(Object.values(h).includes("engine:z; source=routing"));
});
