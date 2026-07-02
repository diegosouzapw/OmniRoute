// Characterization of buildNonStreamingResponseHeaders — the cache-MISS response header builder
// extracted from handleChatCore's non-streaming success path (chatCore god-file decomposition,
// #3501). attachOmniRouteMetaHeaders + now are injected so the static headers, the meta payload,
// and the optional compression header are observable. Locks: Content-Type + cache MISS, latencyMs =
// now - startTime, and the compression header only when meta is present.
import { test } from "node:test";
import assert from "node:assert/strict";

const { buildNonStreamingResponseHeaders } = await import(
  "../../open-sse/handlers/chatCore/nonStreamingResponseHeaders.ts"
);

function makeDeps(now = 1000) {
  const metaCalls: Array<{ headers: Record<string, string>; meta: Record<string, unknown> }> = [];
  const deps = {
    attachOmniRouteMetaHeaders: (headers: Record<string, string>, meta: Record<string, unknown>) => {
      metaCalls.push({ headers, meta });
      headers["x-omniroute-meta"] = "attached";
    },
    now: () => now,
  } as Parameters<typeof buildNonStreamingResponseHeaders>[1];
  return { deps, metaCalls };
}

function baseArgs(overrides: Record<string, unknown> = {}) {
  return {
    provider: "openai",
    model: "gpt-x",
    startTime: 600,
    responseUsage: { prompt_tokens: 5 },
    estimatedCost: 0.0012,
    requestId: "req-1",
    compressionResponseMeta: undefined,
    ...overrides,
  } as Parameters<typeof buildNonStreamingResponseHeaders>[0];
}

test("static headers: Content-Type json + cache MISS", () => {
  const { deps } = makeDeps();
  const h = buildNonStreamingResponseHeaders(baseArgs(), deps);
  assert.equal(h["Content-Type"], "application/json");
  // cache marker key/value
  assert.ok(Object.values(h).includes("MISS"));
});

test("meta receives provider/model/cacheHit false/latency/usage/cost/requestId", () => {
  const { deps, metaCalls } = makeDeps(1000);
  buildNonStreamingResponseHeaders(baseArgs({ startTime: 600 }), deps);
  assert.equal(metaCalls.length, 1);
  const meta = metaCalls[0].meta;
  assert.equal(meta.provider, "openai");
  assert.equal(meta.model, "gpt-x");
  assert.equal(meta.cacheHit, false);
  assert.equal(meta.latencyMs, 400); // now 1000 - startTime 600
  assert.deepEqual(meta.usage, { prompt_tokens: 5 });
  assert.equal(meta.costUsd, 0.0012);
  assert.equal(meta.requestId, "req-1");
});

test("no compression meta → no compression header", () => {
  const { deps } = makeDeps();
  const h = buildNonStreamingResponseHeaders(baseArgs({ compressionResponseMeta: undefined }), deps);
  assert.ok(!Object.values(h).includes("engine:x"));
});

test("compression meta present → compression header set to that value", () => {
  const { deps } = makeDeps();
  const h = buildNonStreamingResponseHeaders(
    baseArgs({ compressionResponseMeta: "engine:x; source=header" }),
    deps
  );
  assert.ok(Object.values(h).includes("engine:x; source=header"));
});
