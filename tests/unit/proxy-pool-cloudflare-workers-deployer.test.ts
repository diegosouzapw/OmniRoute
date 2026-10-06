import test from "node:test";
import assert from "node:assert/strict";
import vm from "node:vm";

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
  assert.ok(/x-relay-auth/.test(src), "worker source must reference the x-relay-auth header");
  assert.ok(
    /401|Unauthorized/.test(src),
    "worker source must short-circuit unauthorised requests with 401"
  );
});

test("buildCloudflareWorkerScript blocks loopback / RFC1918 / link-local hosts (SSRF guard)", () => {
  // A leaked workers.dev URL must not be usable to scan internal networks.
  //
  // Asserted on the guard's BEHAVIOUR rather than on literal substrings of the
  // emitted source. The guard is now embedded from
  // `src/lib/proxyRelay/privateHostname.ts` and travels through the
  // transpiler, so comments are stripped and `169.254` is expressed as an
  // octet comparison — a substring grep stopped tracking what is actually
  // blocked, while the classes below are the property that matters.
  const src = buildCloudflareWorkerScript("tok");
  const binding = src.match(/const isPrivateHostname = [\s\S]*?;\s/);
  assert.ok(binding, "worker must embed the private-host guard");

  // node:vm, not new Function — Hard Rule #3 bans the Function constructor.
  const context: Record<string, unknown> = {};
  vm.createContext(context);
  vm.runInContext(`${binding[0]} globalThis.__guard = isPrivateHostname;`, context);
  const isPrivate = (context as { __guard?: (h: string) => boolean }).__guard;
  assert.equal(typeof isPrivate, "function", "embedded guard must be reachable");
  if (!isPrivate) return;

  for (const host of ["127.0.0.1", "localhost", "0.0.0.0"]) {
    assert.equal(isPrivate(host), true, `blocks loopback host ${host}`);
  }
  for (const host of ["10.0.0.1", "192.168.1.1", "172.16.0.1"]) {
    assert.equal(isPrivate(host), true, `blocks RFC1918 host ${host}`);
  }
  for (const host of ["169.254.169.254", "fe80::1"]) {
    assert.equal(isPrivate(host), true, `blocks link-local host ${host}`);
  }
  assert.equal(isPrivate("api.example.com"), false, "a public host stays reachable");
});

test("buildCloudflareWorkerScript uses Service Worker syntax, not an ES module (#6416/#6496)", () => {
  // Cloudflare's PUT /workers/scripts API parses a plain `application/javascript`
  // script part as Service Worker syntax regardless of any `main_module`
  // metadata — `main_module` requires the script to actually be an ES module
  // (top-level `export`), which rejects the upload with "Unexpected token
  // 'export'" (#6496). The handler must instead register a `fetch` event
  // listener (`addEventListener("fetch", ...)`), with no top-level `export`.
  const src = buildCloudflareWorkerScript("tok");
  assert.ok(
    !/^\s*export\s+default/m.test(src),
    "must not be an ES module (no top-level `export default`)"
  );
  assert.ok(
    /addEventListener\(\s*["']fetch["']/.test(src),
    "must register a fetch event listener (Service Worker syntax)"
  );
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
  // #9100: the relay branch now egresses through the pooled undici Agent
  // (deps.undiciFetch) instead of `originalFetch`, so the test injects the
  // relay sink via deps to keep the dispatch hermetic.
  const response = await runWithProxyContext(CLOUDFLARE_CTX, () =>
    proxyFetch(
      "https://api.anthropic.com/v1/messages?x=1",
      {
        method: "POST",
        headers: { "x-existing": "keep-me" },
      },
      { undiciFetch: relaySink as never }
    )
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
  const headers = buildVercelRelayHeaders("https://api.openai.com/v1/chat/completions", "cf-tok");
  assert.deepEqual(headers, {
    "x-relay-target": "https://api.openai.com",
    "x-relay-path": "/v1/chat/completions",
    "x-relay-auth": "cf-tok",
  });
});
