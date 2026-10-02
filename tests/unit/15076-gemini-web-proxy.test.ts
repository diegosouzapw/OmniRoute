// Regression test for #15076: gemini-web launches its own Chromium through the private lease
// in open-sse/executors/gemini-web/browserLease.ts and opened each request's context with
// only a user agent. No proxy was ever applied, so every Gemini page load went out directly,
// and from a region where gemini.google.com is blocked the request timed out at page.goto().
// On the chat path, execute() runs inside the proxy context the chat handler resolved for the
// request (per-key, connection, provider, combo or global), so that proxy has to win. Outside
// any request context the provider or global proxy applies, as the shared browser pool does
// for claude-web and chatgpt-web (#3492). An edge relay, which a browser cannot use, fails the
// request on both paths (the #6246 fail-closed policy) unless PROXY_FAIL_OPEN=true.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// Isolated DATA_DIR before anything opens the SQLite store.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-15076-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const { GeminiWebExecutor } = await import("../../open-sse/executors/gemini-web.ts");
const { resetGeminiBrowserLeaseForTests } =
  await import("../../open-sse/executors/gemini-web/browserLease.ts");
const { runWithDirectFetchContext, runWithProxyContext } =
  await import("../../open-sse/utils/proxyFetch.ts");
const { __setProxyHealthTcpCheckForTesting } = await import("../../src/lib/proxyHealth.ts");
const playwright = await import("playwright");

const originalLaunch = playwright.chromium.launch;
const originalNoProxy = process.env.NO_PROXY;
const originalFailOpen = process.env.PROXY_FAIL_OPEN;

// runWithProxyContext probes the proxy's TCP port in the background; answer it here so no
// socket is opened. The fake browser below never connects anywhere either.
__setProxyHealthTcpCheckForTesting(async () => true);

// What the chat path puts in the request context for a proxy assigned to the connection.
const connectionProxy = {
  type: "http",
  host: "connection-proxy.example.com",
  port: 3128,
  username: "conn user",
  password: "p@ss:word",
};
const providerProxy = {
  server: "http://proxy.example.com:8080",
  username: "user",
  password: "secret",
};
const relayProxy = (type: string) => ({
  type,
  host: `${type}-relay.example.invalid`,
  port: 443,
  relayAuth: "token",
});

function restoreEnv(name: string, value: string | undefined) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

test.afterEach(async () => {
  playwright.chromium.launch = originalLaunch;
  restoreEnv("NO_PROXY", originalNoProxy);
  restoreEnv("PROXY_FAIL_OPEN", originalFailOpen);
  await resetGeminiBrowserLeaseForTests();
  await settingsDb.deleteProxyForLevel("provider", "gemini-web");
  await settingsDb.deleteProxyForLevel("global", null);
  await proxiesDb.assignProxyToScope("provider", "gemini-web", null);
  await proxiesDb.assignProxyToScope("global", null, null);
});

test.after(() => {
  __setProxyHealthTcpCheckForTesting(null);
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

// A fake Chromium that records the options of every context it opens. The page never sees
// a StreamGenerate response, so the executor ends with its "no response" 502 right after.
function fakeBrowser(contextOptions: Array<Record<string, unknown>>) {
  return {
    newContext: async (options: Record<string, unknown>) => {
      contextOptions.push(options);
      return {
        addCookies: async () => {},
        newPage: async () => ({
          on: () => {},
          goto: async () => {},
          waitForTimeout: async () => {},
          waitForSelector: async () => ({ click: async () => {} }),
          keyboard: { type: async () => {}, insertText: async () => {}, press: async () => {} },
        }),
        close: async () => {},
      };
    },
    close: async () => {},
  };
}

// Sends one request, by default outside any proxy context, or inside one the way the chat
// path runs execute(), and returns the response and the options of every context it opened.
async function runExecutor(
  inContext: (run: () => Promise<unknown>) => Promise<unknown> = (run) => run(),
  log: unknown = null
) {
  const contextOptions: Array<Record<string, unknown>> = [];
  playwright.chromium.launch = (async () => fakeBrowser(contextOptions)) as never;
  const result = (await inContext(() =>
    new GeminiWebExecutor().execute({
      model: "gemini-3.1-pro",
      body: { messages: [{ role: "user", content: "hello" }], stream: false },
      stream: false,
      credentials: { apiKey: "raw-psid-value" },
      signal: AbortSignal.timeout(5000),
      log,
    } as never)
  )) as { response: Response };
  return { response: result.response, contextOptions };
}

async function openOneContext(
  inContext?: (run: () => Promise<unknown>) => Promise<unknown>,
  log?: unknown
) {
  const { contextOptions } = await runExecutor(inContext, log);
  assert.equal(contextOptions.length, 1, "one browser context per request");
  return contextOptions[0];
}

async function assertRelayRejected(inContext?: (run: () => Promise<unknown>) => Promise<unknown>) {
  const { response, contextOptions } = await runExecutor(inContext);
  assert.equal(response.status, 503);
  assert.equal(response.headers.get("X-Omni-Fallback-Hint"), "connection_cooldown");
  const body = (await response.json()) as { error?: { code?: string; message?: string } };
  assert.equal(body.error?.code, "proxy_unavailable");
  assert.match(body.error?.message ?? "", /edge relay/);
  assert.match(body.error?.message ?? "", /PROXY_FAIL_OPEN=true/);
  assert.equal(contextOptions.length, 0, "no browser context, and no other proxy in its place");
}

async function setProviderProxy() {
  await settingsDb.setProxyForLevel("provider", "gemini-web", {
    type: "http",
    host: "proxy.example.com",
    port: 8080,
    username: "user",
    password: "secret",
  });
}

// A vercel relay from the proxy registry, assigned the way the dashboard assigns it.
async function assignRelay(scope: "provider" | "global") {
  const relay = (await proxiesDb.createProxy({
    name: `${scope} relay`,
    type: "vercel",
    host: "vercel-relay.example.invalid",
    port: 443,
    notes: JSON.stringify({ relayAuth: "token" }),
  })) as { id: string };
  await proxiesDb.assignProxyToScope(scope, scope === "provider" ? "gemini-web" : null, relay.id);
}

test("#15076: outside a request context, the browser context uses the provider's proxy", async () => {
  await setProviderProxy();

  const options = await openOneContext();

  assert.deepEqual(options.proxy, providerProxy);
  assert.equal(typeof options.userAgent, "string");
});

test("#15076: the global proxy applies when gemini-web has no proxy of its own", async () => {
  await settingsDb.setProxyForLevel("global", null, {
    type: "socks5",
    host: "10.0.0.2",
    port: 1080,
  });

  const options = await openOneContext();

  assert.deepEqual(options.proxy, { server: "socks5://10.0.0.2:1080" });
});

test("#15076: with no proxy configured the context opens without one, as before", async () => {
  const options = await openOneContext();

  assert.equal("proxy" in options, false);
  assert.equal(typeof options.userAgent, "string");
});

test("#15076: the proxy resolved for the request wins over the provider's proxy", async () => {
  await setProviderProxy();

  const options = await openOneContext((run) => runWithProxyContext(connectionProxy, run));

  assert.deepEqual(options.proxy, {
    server: "http://connection-proxy.example.com:3128",
    username: "conn user",
    password: "p@ss:word",
  });
});

test("#15076: a request sent direct stays direct instead of taking the provider's proxy", async () => {
  await setProviderProxy();
  // Control: outside any request context the provider's proxy applies.
  assert.deepEqual((await openOneContext()).proxy, providerProxy);

  // The chat path resolved no proxy for the request (for example Proxy Off on the connection).
  const noProxy = await openOneContext((run) => runWithProxyContext(null, run));
  assert.equal("proxy" in noProxy, false);
  // The explicit direct context.
  const directContext = await openOneContext((run) => runWithDirectFetchContext(run));
  assert.equal("proxy" in directContext, false);
  // NO_PROXY covers Gemini, as it does for fetch.
  process.env.NO_PROXY = "gemini.google.com";
  const bypassed = await openOneContext((run) => runWithProxyContext(connectionProxy, run));
  assert.equal("proxy" in bypassed, false);
});

test("#15076: an edge relay in the request context fails the request, with no other proxy in its place", async () => {
  await setProviderProxy();
  // Control: a proxy in the same place is applied.
  const proxied = await openOneContext((run) => runWithProxyContext(connectionProxy, run));
  assert.equal(
    (proxied.proxy as { server?: string } | undefined)?.server,
    "http://connection-proxy.example.com:3128"
  );

  for (const type of ["vercel", "deno"]) {
    await assertRelayRejected((run) => runWithProxyContext(relayProxy(type), run));
  }
});

test("#15076: an edge relay saved as the provider or global proxy fails the request outside a request context", async () => {
  await assignRelay("provider");
  await assertRelayRejected();

  await proxiesDb.assignProxyToScope("provider", "gemini-web", null);
  await assignRelay("global");
  await assertRelayRejected();
});

test("#15076: with PROXY_FAIL_OPEN=true an edge relay loads Gemini directly and logs a warning", async () => {
  process.env.PROXY_FAIL_OPEN = "true";
  // A plain provider proxy is set too: the relay must not be swapped for it.
  await setProviderProxy();
  const warnings: string[] = [];
  const log = { warn: (_tag: string, message: string) => warnings.push(message) };

  const inRequest = await openOneContext(
    (run) => runWithProxyContext(relayProxy("vercel"), run),
    log
  );
  assert.equal("proxy" in inRequest, false);
  assert.equal(warnings.length, 1);
  assert.match(warnings[0], /PROXY_FAIL_OPEN=true/);

  await assignRelay("provider");
  const outsideRequest = await openOneContext(undefined, log);
  assert.equal("proxy" in outsideRequest, false);
  assert.equal(warnings.length, 2);
});
