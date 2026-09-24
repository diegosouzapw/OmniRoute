// Characterization of assembleStreamingResponseHeaders — the streaming response header builder
// extracted from handleChatCore's streaming success path (chatCore god-file decomposition, #3501).
// buildStreamingResponseHeaders is injected so the merge of upstream headers + request-id + the
// optional compression header is observable. Locks: zeroed latency/usage/cost at stream start, the
// x-omniroute-request-id, and the compression header only when meta is present.
import { test } from "node:test";
import assert from "node:assert/strict";

const { assembleStreamingResponseHeaders } =
  await import("../../open-sse/handlers/chatCore/streamingResponseHeaders.ts");

function makeBuild() {
  const calls: Array<{
    headers: unknown;
    meta: Record<string, unknown>;
    log: unknown;
    options: unknown;
  }> = [];
  const build = (
    headers: unknown,
    meta: Record<string, unknown>,
    log?: unknown,
    options?: unknown
  ) => {
    calls.push({ headers, meta, log, options });
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
  const h = assembleStreamingResponseHeaders(
    baseArgs({ compressionResponseMeta: undefined }),
    build
  );
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

test("forwards fallbackAttempts into the streaming meta payload", () => {
  const { build, calls } = makeBuild();
  assembleStreamingResponseHeaders(baseArgs({ fallbackAttempts: 2 }), build);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].meta.fallbackAttempts, 2);
});

test("omitted fallbackAttempts does not invent a count", () => {
  const { build, calls } = makeBuild();
  assembleStreamingResponseHeaders(baseArgs(), build);
  assert.equal("fallbackAttempts" in calls[0].meta, false);
});

// #13638/#14116: pool/combo routing can serve a response from an account other
// than the caller's own, and the upstream x-codex-*-used-percent/-reset/-credits
// headers then describe a quota that is not the caller's. This locks the wiring
// between chatCore's `isForeignAccount` flag and buildStreamingResponseHeaders's
// options argument — without it the strip in responseHeaders.ts is unreachable
// dead code on every production call path.
test("isForeignAccount true forwards { isForeignAccount: true } as buildStreamingResponseHeaders' 4th arg", () => {
  const { build, calls } = makeBuild();
  assembleStreamingResponseHeaders(baseArgs({ isForeignAccount: true }), build);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].options, { isForeignAccount: true });
});

test("isForeignAccount omitted forwards { isForeignAccount: false } (direct path unaffected)", () => {
  const { build, calls } = makeBuild();
  assembleStreamingResponseHeaders(baseArgs(), build);
  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].options, { isForeignAccount: false });
});
