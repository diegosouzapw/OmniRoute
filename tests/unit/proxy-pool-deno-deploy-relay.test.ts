import test from "node:test";
import assert from "node:assert/strict";

// Port of decolua/9router PR #1437 — Deno Deploy relays.
// OmniRoute already supports Vercel-typed relays (#2743 test). Deno Deploy is a
// second cloud edge runtime that ships the same x-relay-{target,path,auth}
// envelope: from the dispatch path's perspective the two are interchangeable.
//
// This test pins three contracts the port must respect:
//   1. The deny-list of "this is a relay, not a TCP proxy" types is shared
//      between vercel and deno via a single RELAY_TYPES set in proxyDispatcher
//      (no copy-pasted `type === "vercel"` branches that would diverge).
//   2. proxyConfigToUrl returns the relay URL verbatim for type:"deno" (callers
//      use buildRelayHeaders() + fetch directly, just like vercel).
//   3. proxyFetch routes a type:"deno" context through the relay branch with
//      the same x-relay-* headers and never touches the TCP dispatcher path
//      (which would fail loudly against the fake hostname).

// --- Install the relay sink BEFORE importing the module under test. ---
type FetchCall = { input: unknown; init: RequestInit & { headers?: HeadersInit } };
const relayCalls: FetchCall[] = [];
const realGlobalFetch = globalThis.fetch;

const relaySink = (async (input: unknown, init: RequestInit = {}) => {
  relayCalls.push({ input, init });
  return Response.json({ via: "deno-relay" });
}) as unknown as typeof globalThis.fetch;

globalThis.fetch = relaySink;

const proxyDispatcher = await import("../../open-sse/utils/proxyDispatcher.ts");
const { proxyConfigToUrl, RELAY_TYPES } = proxyDispatcher;
const proxyFetchMod = await import("../../open-sse/utils/proxyFetch.ts");
const { proxyFetch, runWithProxyContext } = proxyFetchMod;

test.after(() => {
  globalThis.fetch = realGlobalFetch;
});

test.beforeEach(() => {
  relayCalls.length = 0;
});

test("RELAY_TYPES is the single source of truth for relay-typed proxies", () => {
  // Both edge-relay types route through the x-relay-* envelope, not a TCP
  // dispatcher. Centralising the set prevents the upstream PR-1437 mistake of
  // adding `|| type === "deno"` at every callsite (one is bound to be missed).
  assert.ok(RELAY_TYPES instanceof Set, "RELAY_TYPES must be a Set");
  assert.ok(RELAY_TYPES.has("vercel"), "vercel is a relay type");
  assert.ok(RELAY_TYPES.has("deno"), "deno is a relay type");
  assert.ok(!RELAY_TYPES.has("http"), "http is NOT a relay type");
  assert.ok(!RELAY_TYPES.has("socks5"), "socks5 is NOT a relay type");
});

test("proxyConfigToUrl returns the relay URL verbatim for type:'deno'", () => {
  const url = proxyConfigToUrl({
    type: "deno",
    host: "my-relay.example-org.deno.net",
  });
  assert.equal(url, "https://my-relay.example-org.deno.net");
});

test("proxyFetch routes a deno-type context through the relay endpoint with relay headers", async () => {
  const DENO_CTX = {
    type: "deno" as const,
    host: "my-relay.example-org.deno.net",
    relayAuth: "deno-relay-secret",
  };

  const response = await runWithProxyContext(DENO_CTX, () =>
    proxyFetch("https://api.anthropic.com/v1/messages?x=1", {
      method: "POST",
      headers: { "x-existing": "keep-me" },
    })
  );

  assert.deepEqual(await response.json(), { via: "deno-relay" });
  assert.equal(relayCalls.length, 1, "exactly one relay dispatch");

  const call = relayCalls[0];
  assert.equal(call.input, "https://my-relay.example-org.deno.net");

  const sentHeaders = new Headers(call.init.headers);
  assert.equal(sentHeaders.get("x-relay-target"), "https://api.anthropic.com");
  assert.equal(sentHeaders.get("x-relay-path"), "/v1/messages?x=1");
  assert.equal(sentHeaders.get("x-relay-auth"), "deno-relay-secret");
  assert.equal(sentHeaders.get("x-existing"), "keep-me");
  assert.equal(call.init.method, "POST");
  assert.equal((call.init as { duplex?: string }).duplex, "half");
});

test("proxyFetch fails closed when a deno context is missing relayAuth", async () => {
  await assert.rejects(
    runWithProxyContext({ type: "deno", host: "relay.example-org.deno.net" }, () =>
      proxyFetch("https://api.anthropic.com/v1/messages", { method: "POST" })
    ),
    /relay configuration error: missing relayAuth/i
  );
  assert.equal(relayCalls.length, 0, "no relay dispatch when relayAuth is missing");
});
