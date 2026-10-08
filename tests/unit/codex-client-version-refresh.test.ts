import assert from "node:assert/strict";
import test from "node:test";
import * as codexClient from "../../open-sse/config/codexClient.ts";
import { fetchCodexDiscoveryModels } from "../../src/app/api/providers/[id]/models/discovery/codex.ts";

const REGISTRY_URL = "https://registry.npmjs.org/@openai%2Fcodex/latest";
const originalVersion = process.env.CODEX_CLIENT_VERSION;
const originalUserAgent = process.env.CODEX_USER_AGENT;
const registryResponse = (version = "0.160.1") => Response.json({ name: "@openai/codex", version });

test.beforeEach(() => {
  delete process.env.CODEX_CLIENT_VERSION;
  delete process.env.CODEX_USER_AGENT;
});

test.afterEach(() => {
  codexClient.resetCodexClientVersionCacheForTests?.();
  test.mock.restoreAll();
  if (originalVersion === undefined) delete process.env.CODEX_CLIENT_VERSION;
  else process.env.CODEX_CLIENT_VERSION = originalVersion;
  if (originalUserAgent === undefined) delete process.env.CODEX_USER_AGENT;
  else process.env.CODEX_USER_AGENT = originalUserAgent;
});

test("refresh uses official metadata without credentials and aligns synchronous headers", async () => {
  assert.equal(codexClient.getCodexClientVersion(), codexClient.DEFAULT_CODEX_CLIENT_VERSION);
  let calls = 0;
  const fetchImpl: codexClient.CodexClientVersionFetch = async (url, init) => {
    calls++;
    assert.equal(url, REGISTRY_URL);
    assert.deepEqual(init.headers, { Accept: "application/json" });
    assert.equal(init.redirect, "error");
    assert.equal(init.guard, "public-only");
    assert.equal(init.pinDns, true);
    assert.equal(init.retry, false);
    assert.ok(init.signal instanceof AbortSignal);
    return registryResponse();
  };
  assert.equal(await codexClient.refreshCodexClientVersion(fetchImpl), "0.160.1");
  assert.equal(codexClient.getCodexClientVersion(), "0.160.1");
  assert.equal(codexClient.getCodexDefaultHeaders().Version, "0.160.1");
  assert.match(codexClient.getCodexUserAgent(), /^codex-cli\/0\.160\.1 /);
  assert.equal(
    codexClient.getCodexCliRsHeaders()["User-Agent"],
    `${codexClient.CODEX_CLI_RS_ORIGINATOR}/0.160.1`
  );
  assert.equal(codexClient.getCodexBackendIdentityHeaders().Version, "0.160.1");
  assert.equal(calls, 1);
});

test("explicit version and user agent retain precedence, caller versions still pass through", async () => {
  process.env.CODEX_CLIENT_VERSION = "0.149.0";
  process.env.CODEX_USER_AGENT = "operator-client/1.0";
  assert.equal(
    await codexClient.refreshCodexClientVersion(async () => {
      assert.fail("an explicit version must not fetch metadata");
    }),
    "0.149.0"
  );
  assert.equal(codexClient.getCodexUserAgent(), "operator-client/1.0");
  assert.equal(codexClient.getCodexClientVersionFromHeaders({ version: "0.170.0" }), "0.170.0");
  delete process.env.CODEX_CLIENT_VERSION;
  await codexClient.refreshCodexClientVersion(async () => registryResponse());
  assert.equal(codexClient.getCodexUserAgent(), "operator-client/1.0");
});

test("fresh cache avoids lookup; expiry rechecks and concurrent callers share lookup", async () => {
  let now = 1_000;
  test.mock.method(Date, "now", () => now);
  let calls = 0;
  const fetchImpl = async () => {
    calls++;
    return registryResponse();
  };
  await Promise.all([
    codexClient.refreshCodexClientVersion(fetchImpl),
    codexClient.refreshCodexClientVersion(fetchImpl),
  ]);
  await codexClient.refreshCodexClientVersion(fetchImpl);
  assert.equal(calls, 1);
  now += 6 * 60 * 60 * 1_000 + 1;
  assert.equal(
    await codexClient.refreshCodexClientVersion(async () => {
      calls++;
      return registryResponse("0.161.0");
    }),
    "0.161.0"
  );
  assert.equal(calls, 2);
});

test("offline refresh preserves last-known-good; failures are retried after a bounded delay", async () => {
  let now = 1_000;
  test.mock.method(Date, "now", () => now);
  let calls = 0;
  const offline = async () => {
    calls++;
    throw new Error("offline");
  };
  assert.equal(
    await codexClient.refreshCodexClientVersion(offline),
    codexClient.DEFAULT_CODEX_CLIENT_VERSION
  );
  await codexClient.refreshCodexClientVersion(offline);
  assert.equal(calls, 1);
  now += 5 * 60 * 1_000 + 1;
  assert.equal(
    await codexClient.refreshCodexClientVersion(async () => registryResponse()),
    "0.160.1"
  );
  now += 6 * 60 * 60 * 1_000 + 1;
  assert.equal(await codexClient.refreshCodexClientVersion(offline), "0.160.1");
  assert.equal(codexClient.getCodexClientVersion(), "0.160.1");
});

test("malformed metadata, prereleases, HTTP errors and downgrades cannot replace a known-good version", async () => {
  let now = 1_000;
  test.mock.method(Date, "now", () => now);
  await codexClient.refreshCodexClientVersion(async () => registryResponse());
  const invalid = [
    Response.json({ name: "wrong-package", version: "9.9.9" }),
    Response.json({ version: "9.9.9" }),
    registryResponse("0.170.0-beta.1"),
    registryResponse("0.01.0"),
    registryResponse("9.9.9\r\nInjected: evil"),
    registryResponse("0.9.0"),
    new Response("bad json"),
    new Response(null, { status: 503 }),
  ];
  for (const response of invalid) {
    now += 6 * 60 * 60 * 1_000 + 1;
    assert.equal(await codexClient.refreshCodexClientVersion(async () => response), "0.160.1");
  }
});

test("discovery refreshes before authenticated model fetch and accepts remote-only IDs", async () => {
  const requests: string[] = [];
  const models = await fetchCodexDiscoveryModels({
    accessToken: "test-token",
    providerSpecificData: { workspaceId: "test-account" },
    fetchImpl: async (url, init) => {
      requests.push(url);
      if (url === REGISTRY_URL) {
        assert.deepEqual(init.headers, { Accept: "application/json" });
        return registryResponse();
      }
      assert.equal(new URL(url).searchParams.get("client_version"), "0.160.1");
      assert.equal(init.headers.Version, "0.160.1");
      assert.match(init.headers["User-Agent"], /^codex-cli\/0\.160\.1 /);
      assert.equal(init.headers.Authorization, "Bearer test-token");
      assert.equal(init.headers["chatgpt-account-id"], "test-account");
      return Response.json({
        models: [{ slug: "gpt-future-remote-only", display_name: "Future" }],
      });
    },
  });
  assert.equal(requests.length, 2);
  assert.equal(requests[0], REGISTRY_URL);
  assert.equal(models?.[0].id, "gpt-future-remote-only");
});

test("registry failure still discovers models with fallback version; absent credentials do no work", async () => {
  const models = await fetchCodexDiscoveryModels({
    accessToken: "test-token",
    fetchImpl: async (url) => {
      if (url === REGISTRY_URL) throw new Error("registry blocked");
      assert.equal(
        new URL(url).searchParams.get("client_version"),
        codexClient.DEFAULT_CODEX_CLIENT_VERSION
      );
      return Response.json({ models: [{ slug: "gpt-known-model" }] });
    },
  });
  assert.equal(models?.[0].id, "gpt-known-model");
  assert.equal(
    await fetchCodexDiscoveryModels({
      accessToken: null,
      fetchImpl: async () => {
        assert.fail("no credentials must not fetch");
      },
    }),
    null
  );
});

test("oversized metadata bodies are cancelled and preserve fallback", async () => {
  let cancelled = false;
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new Uint8Array(64 * 1024 + 1));
    },
    cancel() {
      cancelled = true;
    },
  });
  assert.equal(
    await codexClient.refreshCodexClientVersion(async () => new Response(body)),
    codexClient.DEFAULT_CODEX_CLIENT_VERSION
  );
  assert.equal(cancelled, true);
});

test("stalled metadata body obeys the same request deadline", async () => {
  const controller = new AbortController();
  test.mock.method(AbortSignal, "timeout", (milliseconds: number) => {
    assert.equal(milliseconds, 5_000);
    return controller.signal;
  });
  const started = Promise.withResolvers<void>();
  let cancelled = false;
  const body = new ReadableStream<Uint8Array>({
    pull() {
      started.resolve();
    },
    cancel() {
      cancelled = true;
    },
  });
  const pending = codexClient.refreshCodexClientVersion(async () => new Response(body));
  await started.promise;
  controller.abort();
  assert.equal(await pending, codexClient.DEFAULT_CODEX_CLIENT_VERSION);
  assert.equal(cancelled, true);
});
