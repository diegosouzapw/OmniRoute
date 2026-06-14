/**
 * #3226 — NVIDIA NIM validation must be able to bypass the global proxy/TLS
 * patched fetch (the undici dispatcher stalls against NVIDIA's endpoint → 504).
 *
 * The mechanism: `safeOutboundFetch({ bypassProxyPatch: true })` resolves the
 * native fetch via `getOriginalFetch()` and threads it to `fetchWithTimeout`
 * as `fetchFn`, which calls it instead of the (patched) `globalThis.fetch`.
 * These tests guard the wiring at its two seams.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { fetchWithTimeout } = await import("../../src/shared/utils/fetchTimeout.ts");
const { getOriginalFetch } = await import("../../open-sse/utils/proxyFetch.ts");

const originalGlobalFetch = globalThis.fetch;

test.afterEach(() => {
  globalThis.fetch = originalGlobalFetch;
});

test("#3226 fetchWithTimeout uses the provided fetchFn instead of globalThis.fetch", async () => {
  let globalCalled = false;
  let fnCalled = false;
  globalThis.fetch = async () => {
    globalCalled = true;
    return Response.json({ via: "global" });
  };
  const customFetch = (async () => {
    fnCalled = true;
    return Response.json({ via: "custom" });
  }) as unknown as typeof globalThis.fetch;

  const res = await fetchWithTimeout("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    timeoutMs: 100,
    fetchFn: customFetch,
  });

  assert.equal(fnCalled, true, "provided fetchFn must be used");
  assert.equal(globalCalled, false, "patched globalThis.fetch must be bypassed");
  assert.deepEqual(await res.json(), { via: "custom" });
});

test("#3226 fetchWithTimeout falls back to globalThis.fetch when no fetchFn is given", async () => {
  let globalCalled = false;
  globalThis.fetch = async () => {
    globalCalled = true;
    return Response.json({ via: "global" });
  };

  await fetchWithTimeout("https://example.test/x", { method: "GET", timeoutMs: 100 });
  assert.equal(globalCalled, true);
});

test("#3226 getOriginalFetch returns a callable native fetch (the un-patched reference)", () => {
  const native = getOriginalFetch();
  assert.equal(typeof native, "function");
});
