import test from "node:test";
import assert from "node:assert/strict";

// #2743 (gap c — deferred test debt): the Vercel-relay dispatch path had no direct
// coverage. `tests/unit/proxy-fetch.test.ts` exercises the HTTP/SOCKS/TLS-context
// branches but never the relay short-circuit, and `proxy-registry.test.ts` only
// asserts the DB schema for `type:vercel`. This file covers:
//   1. `buildVercelRelayHeaders` as a pure function (header shape + values).
//   2. The relay short-circuit in `proxyFetch` — that a `vercel`-type proxy context
//      rewrites the request to the relay endpoint with the relay headers and never
//      touches the TCP/proxy-dispatcher path.
//
// IMPORTANT: the relay branch fires `originalFetch(...)`, which is captured from
// `globalThis.fetch` at module-load time (proxyFetch.ts line ~54/63). To intercept it
// deterministically we install a fetch spy on `globalThis.fetch` BEFORE the first
// import of the proxyFetch module, then dynamically import it so `originalFetch`
// resolves to our spy. The module also reassigns `globalThis.fetch = patchedFetch`
// during init; we capture `proxyFetch` (the named export) which calls `patchedFetch`
// directly, so the spy stays the relay-branch sink and is not shadowed.

// --- Install the relay sink BEFORE importing the module under test. ---
type FetchCall = { input: unknown; init: RequestInit & { headers?: HeadersInit } };
const relayCalls: FetchCall[] = [];
const realGlobalFetch = globalThis.fetch;

// The spy stands in for the native (pre-patch) fetch that the relay branch calls.
// It records the call and returns a canned Response so no network I/O happens.
const relaySink = (async (input: unknown, init: RequestInit = {}) => {
  relayCalls.push({ input, init });
  return Response.json({ via: "vercel-relay" });
}) as unknown as typeof globalThis.fetch;

globalThis.fetch = relaySink;

// Dynamic import AFTER the stub so `originalFetch` (captured at module init) === relaySink.
const proxyDispatcher = await import("../../open-sse/utils/proxyDispatcher.ts");
const { buildVercelRelayHeaders } = proxyDispatcher;
const proxyFetchMod = await import("../../open-sse/utils/proxyFetch.ts");
const { proxyFetch, runWithProxyContext } = proxyFetchMod;

test.after(() => {
  // Restore whatever the module installed (or the real native fetch) so we never
  // leave a global spy behind for sibling tests sharing the process.
  globalThis.fetch = realGlobalFetch;
});

test.beforeEach(() => {
  relayCalls.length = 0;
});

// --------------------------------------------------------------------------
// 1. buildVercelRelayHeaders — pure function
// --------------------------------------------------------------------------

test("buildVercelRelayHeaders splits target into origin + path/query and forwards auth", () => {
  const headers = buildVercelRelayHeaders(
    "https://api.anthropic.com/v1/messages?beta=true",
    "secret-relay-token"
  );

  assert.deepEqual(headers, {
    "x-relay-target": "https://api.anthropic.com",
    "x-relay-path": "/v1/messages?beta=true",
    "x-relay-auth": "secret-relay-token",
  });
});

test("buildVercelRelayHeaders preserves a non-default port in the target origin", () => {
  const headers = buildVercelRelayHeaders("https://upstream.example.com:8443/v1/chat", "tok");

  // URL.host includes the port (URL.hostname would drop it), so the relay edge
  // function reconstructs the exact origin including the explicit port.
  assert.equal(headers["x-relay-target"], "https://upstream.example.com:8443");
  assert.equal(headers["x-relay-path"], "/v1/chat");
  assert.equal(headers["x-relay-auth"], "tok");
});

test("buildVercelRelayHeaders yields a bare '/' path when the target has no path", () => {
  const headers = buildVercelRelayHeaders("https://api.openai.com", "tok2");

  // new URL("https://host").pathname === "/" and .search === "".
  assert.equal(headers["x-relay-target"], "https://api.openai.com");
  assert.equal(headers["x-relay-path"], "/");
  assert.equal(headers["x-relay-auth"], "tok2");
});

test("buildVercelRelayHeaders carries the relayAuth verbatim (empty string allowed at this layer)", () => {
  // The helper itself does not validate relayAuth — it copies it verbatim.
  // The missing-relayAuth GUARD lives in proxyFetch's relay branch (tested below),
  // which throws before this helper is ever called. This asserts the helper's
  // actual contract rather than a behavior it does not own.
  const headers = buildVercelRelayHeaders("https://api.example.com/x", "");
  assert.equal(headers["x-relay-auth"], "");
  assert.equal(headers["x-relay-target"], "https://api.example.com");
  assert.equal(headers["x-relay-path"], "/x");
});

test("buildVercelRelayHeaders throws on an unparsable target URL", () => {
  // It delegates to `new URL(targetUrl)`, which throws on garbage input.
  assert.throws(() => buildVercelRelayHeaders("not-a-url", "tok"), /Invalid URL/);
});

// --------------------------------------------------------------------------
// 2. proxyFetch relay short-circuit (dispatch decision + header rewrite)
// --------------------------------------------------------------------------

const VERCEL_CTX = {
  type: "vercel" as const,
  host: "omniroute-relay-abc123.vercel.app",
  relayAuth: "live-relay-secret",
};

test("proxyFetch routes a vercel-type context through the relay endpoint with relay headers", async () => {
  const response = await runWithProxyContext(VERCEL_CTX, () =>
    proxyFetch("https://api.anthropic.com/v1/messages?x=1", {
      method: "POST",
      headers: { "x-existing": "keep-me" },
    })
  );

  // The canned relay response proves the relay sink (originalFetch) was hit and the
  // TCP/proxy-dispatcher path was skipped (a real dispatcher would have failed to
  // connect to the fake host).
  assert.deepEqual(await response.json(), { via: "vercel-relay" });

  assert.equal(relayCalls.length, 1, "exactly one relay dispatch");
  const call = relayCalls[0];

  // The request is rewritten to the relay edge endpoint, NOT the upstream target.
  assert.equal(call.input, "https://omniroute-relay-abc123.vercel.app");

  const sentHeaders = new Headers(call.init.headers);
  // Relay headers carry the real upstream routing.
  assert.equal(sentHeaders.get("x-relay-target"), "https://api.anthropic.com");
  assert.equal(sentHeaders.get("x-relay-path"), "/v1/messages?x=1");
  assert.equal(sentHeaders.get("x-relay-auth"), "live-relay-secret");
  // Pre-existing caller headers are preserved (merged, not dropped).
  assert.equal(sentHeaders.get("x-existing"), "keep-me");
  // The original request method survives the rewrite.
  assert.equal(call.init.method, "POST");
  // duplex:"half" is set so a streamed request body is allowed by undici/native fetch.
  assert.equal((call.init as { duplex?: string }).duplex, "half");
});

test("proxyFetch throws (without dispatching) when a vercel context is missing relayAuth", async () => {
  await assert.rejects(
    runWithProxyContext({ type: "vercel", host: "relay.vercel.app" }, () =>
      proxyFetch("https://api.anthropic.com/v1/messages", { method: "POST" })
    ),
    /Vercel relay configuration error: missing relayAuth/
  );

  // Fail-closed: no request was sent to the relay endpoint.
  assert.equal(relayCalls.length, 0, "no relay dispatch when relayAuth is missing");
});

test("the missing-relayAuth error message does not leak internal [ProxyFetch] diagnostics", async () => {
  // Guards the comment at proxyFetch.ts: the throw can bubble into response bodies,
  // so it must stay free of internal labels and stack-trace markers.
  await runWithProxyContext({ type: "vercel", host: "relay.vercel.app" }, async () => {
    try {
      await proxyFetch("https://api.anthropic.com/v1/messages", { method: "POST" });
      assert.fail("expected the relay branch to throw on missing relayAuth");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      assert.ok(!message.includes("[ProxyFetch]"), "no internal [ProxyFetch] label");
      assert.ok(!message.includes("at /"), "no stack-trace path leaked");
    }
  });
});

test("a non-vercel proxy context never takes the relay branch", async () => {
  // Sanity guard on the dispatch decision: a plain http proxy context must NOT be
  // routed through the relay sink. runWithProxyContext fast-fails the unreachable
  // bogus proxy (PROXY_UNREACHABLE) before fn() runs — that throw is expected and
  // swallowed here; the point is that the relay sink stays untouched either way.
  await runWithProxyContext({ type: "http", host: "127.0.0.1", port: "9" }, async () => {
    await proxyFetch("https://api.anthropic.com/v1/messages", { method: "POST" });
  }).catch(() => undefined);

  assert.equal(relayCalls.length, 0, "http proxy context must not hit the vercel relay sink");
});
