/**
 * The OpenCode endpoint follows the catalog the OpenCode client reads
 * (`models.opencode.ai/api.json`, `api` field) instead of a URL pinned at build time, and the
 * outbound headers follow what the client itself sends: `x-opencode-*` forwarded by prefix,
 * never `x-opencode-org-id` or `x-opencode-request`, and `Bearer public` without a key.
 *
 * No test touches the network: the catalog fetch is injected through the module's seam.
 */
import { afterEach, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { OpencodeExecutor } from "../../open-sse/executors/opencode.ts";
import { surfaceForProvider } from "../../open-sse/executors/opencodeFreeTierContract.ts";
import { _resetShapeMemoForTests } from "../../open-sse/executors/opencodeRequestShape.ts";
import { _resetToolObservationForTests } from "../../open-sse/executors/opencodeToolObservation.ts";
import {
  configurePublishedEndpointForTests,
  getPublishedEndpoint,
  refreshPublishedEndpoint,
  resetPublishedEndpointCache,
} from "../../open-sse/utils/opencodePublishedEndpoint.ts";

const REGISTRY = "https://opencode.ai/zen/v1";
const PUBLISHED = "https://opencode.ai/inference/v1";

let cacheDir: string;
let savedSynthesis: string | undefined;
let savedToken: string | undefined;

function catalogFetch(api: unknown, calls: string[] = []) {
  return async (url: string) => {
    calls.push(url);
    return new Response(JSON.stringify({ opencode: { id: "opencode", api } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };
}

function failingFetch(calls: string[] = []) {
  return async (url: string): Promise<Response> => {
    calls.push(url);
    throw new TypeError("fetch failed");
  };
}

function zenUrl(credentials: Record<string, unknown> | null = null, model = "gpt-5-nano") {
  return new OpencodeExecutor("opencode-zen").buildUrl(model, true, 0, credentials as never);
}

beforeEach(() => {
  _resetShapeMemoForTests();
  _resetToolObservationForTests();
  resetPublishedEndpointCache();
  cacheDir = mkdtempSync(join(tmpdir(), "opencode-published-endpoint-"));
  configurePublishedEndpointForTests({ cacheDir });
  savedSynthesis = process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS;
  savedToken = process.env.OPENCODE_ANONYMOUS_TOKEN;
  delete process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS;
  delete process.env.OPENCODE_ANONYMOUS_TOKEN;
});

afterEach(() => {
  resetPublishedEndpointCache();
  rmSync(cacheDir, { recursive: true, force: true });
  if (savedSynthesis === undefined) delete process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS;
  else process.env.OPENCODE_SYNTHESIZE_CLI_HEADERS = savedSynthesis;
  if (savedToken === undefined) delete process.env.OPENCODE_ANONYMOUS_TOKEN;
  else process.env.OPENCODE_ANONYMOUS_TOKEN = savedToken;
});

test("fresh catalog: requests go to its `api` field, anonymous ones with Bearer public", async () => {
  configurePublishedEndpointForTests({ fetchImpl: catalogFetch(PUBLISHED) });
  await refreshPublishedEndpoint();

  assert.equal(zenUrl(), `${PUBLISHED}/chat/completions`);
  const headers = new OpencodeExecutor("opencode-zen").buildHeaders(null, true, null, "big-pickle");
  assert.equal(headers["Authorization"], "Bearer public");
});

test("a connection base URL wins over the catalog", async () => {
  configurePublishedEndpointForTests({ fetchImpl: catalogFetch(PUBLISHED) });
  await refreshPublishedEndpoint();

  const url = zenUrl({ providerSpecificData: { baseUrl: "https://relay.example.com/v1" } });
  assert.equal(url, "https://relay.example.com/v1/chat/completions");
});

test("catalog unreachable at start: registry URL, then the catalog value once it answers", async () => {
  const calls: string[] = [];
  configurePublishedEndpointForTests({ fetchImpl: failingFetch(calls) });
  assert.equal(zenUrl(), `${REGISTRY}/chat/completions`);
  // The background read the getter started fails: the registry URL stays.
  await refreshPublishedEndpoint();
  assert.equal(getPublishedEndpoint("opencode-zen"), undefined);
  await refreshPublishedEndpoint();

  configurePublishedEndpointForTests({ fetchImpl: catalogFetch(PUBLISHED, calls) });
  // The getter never awaits: it starts a background read and keeps the registry URL.
  assert.equal(zenUrl(), `${REGISTRY}/chat/completions`);
  await refreshPublishedEndpoint();
  assert.equal(zenUrl(), `${PUBLISHED}/chat/completions`);
  assert.ok(calls.length >= 2);
});

test("catalog unreachable after a successful read: the persisted value is used", async () => {
  configurePublishedEndpointForTests({ fetchImpl: catalogFetch(PUBLISHED) });
  await refreshPublishedEndpoint();

  // Simulated restart: memory is gone, the catalog is down, the disk value remains.
  resetPublishedEndpointCache();
  configurePublishedEndpointForTests({ cacheDir, fetchImpl: failingFetch() });
  assert.equal(getPublishedEndpoint("opencode-zen"), PUBLISHED);
  await refreshPublishedEndpoint();
  assert.equal(zenUrl(), `${PUBLISHED}/chat/completions`);
});

for (const [label, value] of [
  ["another host", "https://evil.example.com/v1"],
  ["plain http", "http://opencode.ai/inference/v1"],
  ["embedded credentials", "https://user:pass@opencode.ai/inference/v1"],
  ["an explicit port", "https://opencode.ai:8443/inference/v1"],
  ["a look-alike host", "https://opencode.ai.evil.example.com/v1"],
] as const) {
  test(`a catalog value with ${label} is ignored`, async () => {
    configurePublishedEndpointForTests({ fetchImpl: catalogFetch(value) });
    await refreshPublishedEndpoint();
    assert.equal(getPublishedEndpoint("opencode-zen"), undefined);
    assert.equal(zenUrl(), `${REGISTRY}/chat/completions`);
  });
}

test("a fresh value never touches the network; a stale one starts exactly one refresh", async () => {
  const calls: string[] = [];
  configurePublishedEndpointForTests({ url: PUBLISHED, fetchImpl: catalogFetch(PUBLISHED, calls) });
  for (let i = 0; i < 5; i++) zenUrl();
  assert.equal(calls.length, 0);

  // An hour-old value is still fresh: the endpoint rarely moves, a refusal re-reads sooner.
  configurePublishedEndpointForTests({ url: PUBLISHED, fetchedAt: Date.now() - 60 * 60 * 1000 });
  for (let i = 0; i < 5; i++) zenUrl();
  assert.equal(calls.length, 0);

  configurePublishedEndpointForTests({
    url: PUBLISHED,
    fetchedAt: Date.now() - 7 * 60 * 60 * 1000,
  });
  for (let i = 0; i < 5; i++) assert.equal(zenUrl(), `${PUBLISHED}/chat/completions`);
  await refreshPublishedEndpoint();
  assert.equal(calls.length, 1);
});

test("a catalog that stays down is not re-read on every request", async () => {
  const calls: string[] = [];
  configurePublishedEndpointForTests({ fetchImpl: failingFetch(calls) });
  for (let i = 0; i < 5; i++) {
    assert.equal(zenUrl(), `${REGISTRY}/chat/completions`);
    await refreshPublishedEndpoint();
  }
  // The explicit awaits re-read; the getter itself started a single background read.
  const afterGetter = calls.length;
  for (let i = 0; i < 20; i++) zenUrl();
  assert.equal(calls.length, afterGetter);
});

test("after N refreshes the cache holds one value and the disk one file", async () => {
  configurePublishedEndpointForTests({ fetchImpl: catalogFetch(PUBLISHED) });
  for (let i = 0; i < 10; i++) await refreshPublishedEndpoint({ force: true });
  assert.deepEqual(readdirSync(cacheDir), ["opencode-published-endpoint.json"]);
  const persisted = JSON.parse(readFileSync(join(cacheDir, readdirSync(cacheDir)[0]), "utf8"));
  assert.equal(persisted.url, PUBLISHED);
  assert.deepEqual(Object.keys(persisted).sort(), ["fetchedAt", "url"]);
});

test("opencode-go keeps its registry URL whatever the catalog says", async () => {
  configurePublishedEndpointForTests({ fetchImpl: catalogFetch(PUBLISHED) });
  await refreshPublishedEndpoint();
  const go = new OpencodeExecutor("opencode-go");
  assert.equal(go.buildUrl("glm-5.1", true), "https://opencode.ai/zen/go/v1/chat/completions");
  assert.equal(getPublishedEndpoint("opencode-go"), undefined);
});

test("the surface is decided by provider, so a moved URL stays on the zen contract", () => {
  assert.equal(surfaceForProvider("opencode"), "zen");
  assert.equal(surfaceForProvider("oc"), "zen");
  assert.equal(surfaceForProvider("opencode-zen"), "zen");
  assert.equal(surfaceForProvider("opencode-go"), "go");
  assert.equal(surfaceForProvider("groq"), "other");
});

test("a connection base URL outside opencode.ai is a relay: no contract is imposed", () => {
  const relay = { apiKey: "", providerSpecificData: { baseUrl: "http://127.0.0.1:8080/v1" } };
  const own = { apiKey: "", providerSpecificData: { baseUrl: PUBLISHED } };
  assert.equal(surfaceForProvider("opencode-zen", relay.providerSpecificData.baseUrl), "other");
  assert.equal(surfaceForProvider("opencode-zen", own.providerSpecificData.baseUrl), "zen");
  // The contract streams gated requests; a relay keeps the caller's own choice.
  const accept = (credentials: unknown) =>
    new OpencodeExecutor("opencode-zen").buildHeaders(
      credentials as never,
      false,
      null,
      "big-pickle"
    ).Accept;
  assert.equal(accept(own), "text/event-stream");
  assert.equal(accept(relay), undefined);
});

const REFUSAL_BODY = JSON.stringify({
  type: "error",
  error: {
    type: "FreeTierError",
    message: "OpenCode's free tier can only be used from within OpenCode",
  },
});

async function executeAgainst(
  upstream: (url: string) => Response,
  tools?: unknown[],
  modelOverride?: string
) {
  const upstreamCalls: string[] = [];
  const originalFetch = globalThis.fetch;
  globalThis.fetch = (async (input: RequestInfo | URL) => {
    upstreamCalls.push(String(input));
    return upstream(String(input));
  }) as typeof globalThis.fetch;
  try {
    const model = modelOverride ?? "big-pickle";
    const result = (await new OpencodeExecutor("opencode-zen").execute({
      model,
      body: { model, stream: true, messages: [{ role: "user", content: "hi" }], tools },
      stream: true,
      signal: null,
      credentials: { apiKey: "test-key", accessToken: null, connectionId: "c" },
      log: { debug() {}, info() {}, warn() {}, error() {} },
    } as never)) as { response: Response };
    return { status: result.response.status, upstreamCalls };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("403 FreeTierError: one catalog re-read, and no extra upstream call", async () => {
  // Reference: the same refusal with the catalog re-read unavailable (no seam fetch).
  configurePublishedEndpointForTests({ url: PUBLISHED });
  const reference = await executeAgainst(() => new Response(REFUSAL_BODY, { status: 403 }));
  _resetShapeMemoForTests();
  _resetToolObservationForTests();

  const catalogCalls: string[] = [];
  configurePublishedEndpointForTests({
    url: PUBLISHED,
    fetchImpl: catalogFetch(PUBLISHED, catalogCalls),
  });
  const { status, upstreamCalls } = await executeAgainst(
    () => new Response(REFUSAL_BODY, { status: 403 })
  );
  await refreshPublishedEndpoint();
  assert.equal(status, 403);
  assert.deepEqual(upstreamCalls, reference.upstreamCalls);
  assert.deepEqual(catalogCalls, ["https://models.opencode.ai/api.json"]);
});

test("a refusal on a request carrying its own tools re-reads the catalog too", async () => {
  const catalogCalls: string[] = [];
  configurePublishedEndpointForTests({
    url: PUBLISHED,
    fetchImpl: catalogFetch(PUBLISHED, catalogCalls),
  });
  const tools = [{ type: "function", function: { name: "read", parameters: { type: "object" } } }];
  await executeAgainst(() => new Response(REFUSAL_BODY, { status: 403 }), tools);
  await refreshPublishedEndpoint();
  assert.equal(catalogCalls.length, 1);
});

test("N concurrent refusals share one catalog read", async () => {
  const catalogCalls: string[] = [];
  configurePublishedEndpointForTests({
    url: PUBLISHED,
    fetchImpl: catalogFetch(PUBLISHED, catalogCalls),
  });
  await Promise.all(
    [1, 2, 3].map(() => executeAgainst(() => new Response(REFUSAL_BODY, { status: 403 })))
  );
  await refreshPublishedEndpoint();
  assert.equal(catalogCalls.length, 1);
});

test("a non-refusal 403 does not re-read the catalog", async () => {
  const catalogCalls: string[] = [];
  configurePublishedEndpointForTests({
    url: PUBLISHED,
    fetchImpl: catalogFetch(PUBLISHED, catalogCalls),
  });
  await executeAgainst(() => new Response("Workspace access denied", { status: 403 }));
  await refreshPublishedEndpoint();
  assert.equal(catalogCalls.length, 0);
});

test("x-opencode-session-id and unknown x-opencode-* headers are forwarded as-is", () => {
  const headers = new OpencodeExecutor("opencode-zen").buildHeaders(
    null,
    true,
    {
      "x-opencode-session": "ses_0123456789abABCDEFGHIJKLMN",
      "X-OpenCode-Session-Id": "ses_0123456789abABCDEFGHIJKLMN",
      "x-opencode-something-new": "value",
    },
    "big-pickle"
  );
  assert.equal(headers["x-opencode-session-id"], "ses_0123456789abABCDEFGHIJKLMN");
  assert.equal(headers["x-opencode-something-new"], "value");
});

test("synthesis on, client without x-opencode-request: none goes out", () => {
  const headers = new OpencodeExecutor("opencode-zen").buildHeaders(
    null,
    true,
    { "x-opencode-session": "ses_0123456789abABCDEFGHIJKLMN" },
    "big-pickle",
    undefined,
    { model: "big-pickle", messages: [{ role: "user", content: "hi" }] }
  );
  assert.equal(headers["x-opencode-client"], "desktop");
  assert.equal(headers["x-opencode-request"], undefined);
});

test("a client x-opencode-request is not relayed", () => {
  const headers = new OpencodeExecutor("opencode-zen").buildHeaders(
    null,
    true,
    { "x-opencode-request": "msg_0123456789abABCDEFGHIJKLMN" },
    "big-pickle"
  );
  assert.equal(headers["x-opencode-request"], undefined);
});

test("a client x-opencode-org-id is not relayed", () => {
  const headers = new OpencodeExecutor("opencode-zen").buildHeaders(
    { apiKey: "sk-zen" } as never,
    true,
    { "x-opencode-org-id": "org_other", "x-opencode-project": "p" },
    "big-pickle"
  );
  assert.equal(headers["x-opencode-org-id"], undefined);
  assert.equal(headers["x-opencode-project"], "p");
});

test("keyed connection: Bearer on chat and Responses, x-api-key on Messages", () => {
  const executor = new OpencodeExecutor("opencode-zen");
  executor._requestFormat = "openai";
  assert.equal(executor.buildHeaders({ apiKey: "sk" } as never)["Authorization"], "Bearer sk");
  executor._requestFormat = "openai-responses";
  const responses = executor.buildHeaders({ apiKey: "sk" } as never);
  assert.equal(responses["Authorization"], "Bearer sk");
  assert.equal(responses["x-api-key"], undefined);
  executor._requestFormat = "claude";
  const messages = executor.buildHeaders({ apiKey: "sk" } as never);
  assert.equal(messages["x-api-key"], "sk");
  assert.equal(messages["Authorization"], undefined);
  executor._requestFormat = null;
});

test("OPENCODE_ANONYMOUS_TOKEN replaces the anonymous marker", () => {
  process.env.OPENCODE_ANONYMOUS_TOKEN = "custom-marker";
  const headers = new OpencodeExecutor("opencode-zen").buildHeaders(null, true, null, "big-pickle");
  assert.equal(headers["Authorization"], "Bearer custom-marker");
});

test("opencode-go without a key sends no anonymous marker", () => {
  const headers = new OpencodeExecutor("opencode-go").buildHeaders(null, true, null, "glm-5.1");
  assert.equal(headers["Authorization"], undefined);
});

const SSE_OK =
  'data: {"id":"c","object":"chat.completion.chunk","choices":[{"index":0,"delta":{"content":"ok"},"finish_reason":"stop"}]}\n\ndata: [DONE]\n\n';
const okStream = () =>
  new Response(SSE_OK, { status: 200, headers: { "Content-Type": "text/event-stream" } });

test("cold start: the first request waits for the catalog and goes to the published URL", async () => {
  const catalogCalls: string[] = [];
  configurePublishedEndpointForTests({ fetchImpl: catalogFetch(PUBLISHED, catalogCalls) });

  const { upstreamCalls } = await executeAgainst(okStream);

  assert.deepEqual(catalogCalls, ["https://models.opencode.ai/api.json"]);
  assert.equal(upstreamCalls[0], `${PUBLISHED}/chat/completions`);
});

test("cold start with the catalog down: registry URL, and one wait per 30 seconds at most", async () => {
  const catalogCalls: string[] = [];
  configurePublishedEndpointForTests({ fetchImpl: failingFetch(catalogCalls) });

  // A paid model (`unknown-model` is premium by the fail-safe rule): free-tier models go
  // to the inference base URL whatever the catalog says.
  const first = await executeAgainst(okStream, undefined, "unknown-model");
  const second = await executeAgainst(okStream, undefined, "unknown-model");

  assert.equal(first.upstreamCalls[0], `${REGISTRY}/chat/completions`);
  assert.equal(second.upstreamCalls[0], `${REGISTRY}/chat/completions`);
  assert.equal(catalogCalls.length, 1, "the second request did not wait for the catalog again");
});

test("under a test runner the real data directory is never read", () => {
  const dataDir = mkdtempSync(join(tmpdir(), "opencode-data-dir-"));
  const saved = process.env.DATA_DIR;
  try {
    mkdirSync(join(dataDir, "cache"), { recursive: true });
    writeFileSync(
      join(dataDir, "cache", "opencode-published-endpoint.json"),
      JSON.stringify({ url: PUBLISHED, fetchedAt: Date.now() })
    );
    process.env.DATA_DIR = dataDir;
    // No injected cache directory: only the registry URL may come out.
    resetPublishedEndpointCache();
    assert.equal(getPublishedEndpoint("opencode-zen"), undefined);
    assert.equal(zenUrl(), `${REGISTRY}/chat/completions`);
  } finally {
    if (saved === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = saved;
    rmSync(dataDir, { recursive: true, force: true });
  }
});
