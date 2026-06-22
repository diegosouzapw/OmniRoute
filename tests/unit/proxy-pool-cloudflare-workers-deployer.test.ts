import test from "node:test";
import assert from "node:assert/strict";

// Port of upstream decolua/9router PR #1360: Cloudflare Workers as proxy relay.
//
// Architecture mirrors the existing Vercel relay (same x-relay-target /
// x-relay-path / x-relay-auth header spec, same SSRF guard inlined into the
// worker, same fail-closed missing-relayAuth check). Only the deployment
// target changes: instead of POSTing to the Vercel /v13/deployments API,
// we PUT a Worker script to Cloudflare's accounts/{accountId}/workers/scripts
// API and enable the workers.dev subdomain.
//
// Coverage:
//  1. buildCloudflareWorkerScript(relayAuth) returns an Edge-runtime worker
//     module whose source enforces the same x-relay-auth check as the
//     Vercel relay (so a leaked workers.dev URL cannot be used as an
//     open SSRF proxy by a third party).
//  2. proxyFetch's relay short-circuit treats type "cloudflare" the same
//     way as "vercel" — uses buildVercelRelayHeaders + routes to the
//     workers.dev origin, never the upstream target.
//  3. The proxyDispatcher / DB layer recognise "cloudflare" as a relay
//     type (extractRelayAuth fires, dispatcher returns the worker URL).

// --- Install the relay sink BEFORE importing the module under test. ---
type FetchCall = { input: unknown; init: RequestInit & { headers?: HeadersInit } };
const relayCalls: FetchCall[] = [];
const realGlobalFetch = globalThis.fetch;

const relaySink = (async (input: unknown, init: RequestInit = {}) => {
  relayCalls.push({ input, init });
  return Response.json({ via: "cloudflare-relay" });
}) as unknown as typeof globalThis.fetch;

globalThis.fetch = relaySink;

const proxyDispatcher = await import("../../open-sse/utils/proxyDispatcher.ts");
const { buildVercelRelayHeaders, proxyConfigToUrl } = proxyDispatcher;
const proxyFetchMod = await import("../../open-sse/utils/proxyFetch.ts");
const { proxyFetch, runWithProxyContext } = proxyFetchMod;

const cfDeploy = await import("../../src/lib/proxyRelay/cloudflareWorkerScript.ts");
const { buildCloudflareWorkerScript } = cfDeploy;

test.after(() => {
  globalThis.fetch = realGlobalFetch;
});

test.beforeEach(() => {
  relayCalls.length = 0;
});

// --------------------------------------------------------------------------
// 1. buildCloudflareWorkerScript — emitted worker source contract
// --------------------------------------------------------------------------

test("buildCloudflareWorkerScript embeds the supplied relayAuth literal", () => {
  const src = buildCloudflareWorkerScript("a-very-specific-secret-token");
  assert.ok(
    src.includes('"a-very-specific-secret-token"'),
    "worker source must embed the relayAuth secret as a string literal"
  );
});

test("buildCloudflareWorkerScript rejects requests without a valid x-relay-auth header", () => {
  // The worker source must enforce the same auth check as the Vercel relay:
  // a 401 short-circuit when x-relay-auth does not match the embedded token.
  // We don't run the worker here — we check the source contains the guard.
  const src = buildCloudflareWorkerScript("the-secret");
  assert.ok(
    /x-relay-auth/.test(src),
    "worker source must reference the x-relay-auth header"
  );
  assert.ok(
    /401|Unauthorized/.test(src),
    "worker source must short-circuit unauthorised requests with 401"
  );
});

test("buildCloudflareWorkerScript blocks loopback / RFC1918 / link-local hosts (SSRF guard)", () => {
  // Mirrors the Vercel relay's inlined SSRF guard. A leaked workers.dev URL
  // must not be usable to scan internal networks.
  const src = buildCloudflareWorkerScript("tok");
  // The guard recognises private CIDRs / loopback by literal substrings in
  // the inline function. These specific tokens are load-bearing.
  assert.ok(/127\.0\.0\.1|localhost/.test(src), "blocks loopback hosts");
  assert.ok(/192\.168|10\.|172/.test(src), "blocks RFC1918 hosts");
  assert.ok(/169\.254|link-local|fe80/.test(src), "blocks link-local hosts");
});

test("buildCloudflareWorkerScript uses ESM default-export fetch handler (Workers Modules format)", () => {
  // Cloudflare's PUT /workers/scripts API expects a module-format worker
  // (main_module = index.js, content-type application/javascript+module).
  // The handler must be exposed as `export default { fetch }`.
  const src = buildCloudflareWorkerScript("tok");
  assert.ok(/export\s+default/.test(src), "must be an ES module (export default)");
  assert.ok(/fetch\s*\(/.test(src), "must export a fetch handler");
});

// --------------------------------------------------------------------------
// 2. proxyFetch — cloudflare type takes the relay short-circuit
// --------------------------------------------------------------------------

const CLOUDFLARE_CTX = {
  type: "cloudflare" as const,
  host: "omniroute-relay.acme.workers.dev",
  relayAuth: "live-cf-secret",
};

test("proxyFetch routes a cloudflare-type context through the relay endpoint with relay headers", async () => {
  const response = await runWithProxyContext(CLOUDFLARE_CTX, () =>
    proxyFetch("https://api.anthropic.com/v1/messages?x=1", {
      method: "POST",
      headers: { "x-existing": "keep-me" },
    })
  );

  assert.deepEqual(await response.json(), { via: "cloudflare-relay" });
  assert.equal(relayCalls.length, 1, "exactly one relay dispatch");
  const call = relayCalls[0];

  // Rewritten to the workers.dev origin, NOT the upstream target.
  assert.equal(call.input, "https://omniroute-relay.acme.workers.dev");

  const sentHeaders = new Headers(call.init.headers);
  assert.equal(sentHeaders.get("x-relay-target"), "https://api.anthropic.com");
  assert.equal(sentHeaders.get("x-relay-path"), "/v1/messages?x=1");
  assert.equal(sentHeaders.get("x-relay-auth"), "live-cf-secret");
  assert.equal(sentHeaders.get("x-existing"), "keep-me");
  assert.equal(call.init.method, "POST");
  assert.equal((call.init as { duplex?: string }).duplex, "half");
});

test("proxyFetch throws (without dispatching) when a cloudflare context is missing relayAuth", async () => {
  await assert.rejects(
    runWithProxyContext({ type: "cloudflare", host: "x.workers.dev" }, () =>
      proxyFetch("https://api.anthropic.com/v1/messages", { method: "POST" })
    ),
    /relay configuration error: missing relayAuth/
  );
  assert.equal(relayCalls.length, 0, "no relay dispatch when relayAuth is missing");
});

test("the missing-relayAuth error message does not leak internal [ProxyFetch] diagnostics", async () => {
  await runWithProxyContext({ type: "cloudflare", host: "x.workers.dev" }, async () => {
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

// --------------------------------------------------------------------------
// 3. proxyConfigToUrl — cloudflare type yields the worker https origin
// --------------------------------------------------------------------------

test("proxyConfigToUrl returns the cloudflare worker URL (no HTTP-proxy dispatcher needed)", () => {
  const url = proxyConfigToUrl({
    type: "cloudflare",
    host: "omniroute-relay.acme.workers.dev",
  });
  assert.equal(url, "https://omniroute-relay.acme.workers.dev");
});

// --------------------------------------------------------------------------
// 4. buildVercelRelayHeaders is shared (renamed-or-aliased? at minimum still
//    works for cloudflare — same header spec).
// --------------------------------------------------------------------------

test("buildVercelRelayHeaders is the shared relay-header builder used for cloudflare too", () => {
  const headers = buildVercelRelayHeaders(
    "https://api.openai.com/v1/chat/completions",
    "cf-tok"
  );
  assert.deepEqual(headers, {
    "x-relay-target": "https://api.openai.com",
    "x-relay-path": "/v1/chat/completions",
    "x-relay-auth": "cf-tok",
  });
});
