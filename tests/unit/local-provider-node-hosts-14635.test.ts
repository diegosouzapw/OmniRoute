// Regression tests for #14635: operator-listed provider-node hosts (Docker/Compose service
// names) are treated like loopback nodes.
//
// A rerank/audio sidecar on the same Docker network is naturally addressed by its service
// name (`http://reranker:8080/v1`). The loopback class only knew `localhost`, `127.0.0.1`
// and 172.16.0.0/12 literals, so operators had to hard-code a container IP — one that
// Docker's IPAM can hand to a different container after a host reboot — and a service
// name was also sent through HTTP(S)_PROXY instead of straight to the sibling container.
//
// OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS (default empty = no behavior change) lists the
// hostnames to treat as local. IP literals and cloud-metadata names are never accepted.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-local-node-hosts-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { LOCAL_PROVIDER_NODE_HOSTS_ENV, getConfiguredLocalNodeHosts, isLocalProviderNodeHost } =
  await import("../../src/shared/network/localNodeHosts.ts");
const { isEligibleProviderNodeHost } = await import("../../src/shared/network/providerNodeHost.ts");
const { RERANK_REMOTE_NODES_FLAG, selectRerankProviderNodes } =
  await import("../../src/app/api/v1/_shared/rerankProviderNodes.ts");
const { selectAudioProviderNodes } =
  await import("../../src/app/api/v1/_shared/audioProviderNodes.ts");
const { resolveProxyForRequest } = await import("../../open-sse/utils/proxyFetch.ts");
const core = await import("../../src/lib/db/core.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { createProviderNode, createProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/v1/rerank/route.ts");

const SERVICE_NODE = {
  id: "openai-compatible-chat-reranker-svc",
  prefix: "sidecar",
  baseUrl: "http://reranker:8080/v1",
  apiType: "chat",
};
const OTHER_SERVICE_NODE = {
  id: "openai-compatible-chat-other-svc",
  prefix: "other",
  baseUrl: "http://tei:8080/v1",
  apiType: "chat",
};
const LOOPBACK_NODE = {
  id: "openai-compatible-rerank-loop",
  prefix: "loop",
  baseUrl: "http://127.0.0.1:8000/v1",
  apiType: "rerank",
};

const ENV_KEYS = [
  LOCAL_PROVIDER_NODE_HOSTS_ENV,
  RERANK_REMOTE_NODES_FLAG,
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "http_proxy",
  "https_proxy",
  "NO_PROXY",
  "no_proxy",
] as const;
const savedEnv: Record<string, string | undefined> = {};
for (const k of ENV_KEYS) savedEnv[k] = process.env[k];

function resetEnv() {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
}

test.describe("OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS parsing", () => {
  test.afterEach(() => resetEnv());

  test("unset or blank means no extra local hosts", () => {
    delete process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV];
    assert.deepEqual([...getConfiguredLocalNodeHosts()], []);
    process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV] = "  ,  ";
    assert.deepEqual([...getConfiguredLocalNodeHosts()], []);
  });

  test("comma/whitespace separated, trimmed and lowercased", () => {
    process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV] = " Reranker, tei  infinity.svc.cluster.local ";
    assert.deepEqual([...getConfiguredLocalNodeHosts()].sort(), [
      "infinity.svc.cluster.local",
      "reranker",
      "tei",
    ]);
  });

  test("public FQDNs cannot bypass outbound policy and proxies through the local allowlist", () => {
    process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV] =
      "reranker,tei.internal,infinity.svc.cluster.local,foo.example.com";
    assert.deepEqual([...getConfiguredLocalNodeHosts()].sort(), [
      "infinity.svc.cluster.local",
      "reranker",
      "tei.internal",
    ]);
    assert.equal(isLocalProviderNodeHost("https://foo.example.com/v1"), false);
    assert.equal(
      isEligibleProviderNodeHost("https://foo.example.com/v1", { allowRemote: false }),
      false
    );
    process.env.HTTPS_PROXY = "http://egress-proxy:7890";
    delete process.env.NO_PROXY;
    delete process.env.no_proxy;
    assert.equal(resolveProxyForRequest("https://foo.example.com/v1").source, "env");
    assert.deepEqual(resolveProxyForRequest("https://tei.internal/v1"), {
      source: "direct",
      proxyUrl: null,
    });
  });

  test("IP literals and cloud-metadata names are never accepted, and each rejection is reported", () => {
    const warnings: string[] = [];
    const originalWarn = console.warn;
    console.warn = (...args: unknown[]) => {
      warnings.push(args.map(String).join(" "));
    };
    try {
      process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV] =
        "reranker,10.0.0.5,[::1],169.254.169.254,2852039166,0xa9fea9fe,0177.0.0.1,metadata,metadata.google.internal,metadata.goog,instance-data,reranker:8080,http://tei";
      assert.deepEqual([...getConfiguredLocalNodeHosts()], ["reranker"]);
    } finally {
      console.warn = originalWarn;
    }
    assert.equal(warnings.length, 1);
    for (const entry of [
      "10.0.0.5",
      "169.254.169.254",
      "2852039166",
      "0xa9fea9fe",
      "0177.0.0.1",
      "metadata.google.internal",
      "instance-data",
      "reranker:8080",
      "http://tei",
    ]) {
      assert.ok(warnings[0].includes(entry), `warning should name ${entry}`);
    }
  });
});

test.describe("isLocalProviderNodeHost", () => {
  test.afterEach(() => resetEnv());

  test("a service name is not local unless listed (default unchanged)", () => {
    delete process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV];
    assert.equal(isLocalProviderNodeHost(SERVICE_NODE.baseUrl), false);
    assert.equal(isLocalProviderNodeHost(LOOPBACK_NODE.baseUrl), true);
    assert.equal(isEligibleProviderNodeHost(SERVICE_NODE.baseUrl, { allowRemote: false }), false);
  });

  test("a listed service name is local; unlisted and userinfo URLs are not", () => {
    process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV] = "reranker";
    assert.equal(isLocalProviderNodeHost(SERVICE_NODE.baseUrl), true);
    assert.equal(isLocalProviderNodeHost("http://RERANKER:8080/v1"), true);
    assert.equal(isLocalProviderNodeHost(OTHER_SERVICE_NODE.baseUrl), false);
    assert.equal(isLocalProviderNodeHost("http://user:pw@reranker:8080/v1"), false);
    assert.equal(isEligibleProviderNodeHost(SERVICE_NODE.baseUrl, { allowRemote: false }), true);
  });
});

test.describe("provider-node selection honors listed hosts", () => {
  test.afterEach(() => resetEnv());

  test("rerank: listed service node joins with the remote flag off", () => {
    delete process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV];
    assert.deepEqual(
      selectRerankProviderNodes([LOOPBACK_NODE, SERVICE_NODE, OTHER_SERVICE_NODE], {
        allowRemote: false,
      }).map((p) => p.id),
      ["loop"]
    );

    process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV] = "reranker";
    const selected = selectRerankProviderNodes([LOOPBACK_NODE, SERVICE_NODE, OTHER_SERVICE_NODE], {
      allowRemote: false,
    });
    assert.deepEqual(
      selected.map((p) => p.id),
      ["loop", "sidecar"]
    );
    assert.equal(selected[1].baseUrl, "http://reranker:8080/v1/rerank");
  });

  test("audio: listed service node joins with the remote flag off and keeps its credential", () => {
    const node = { ...SERVICE_NODE, name: "sidecar", apiType: "audio-transcriptions" };
    const opts = {
      audioPath: "/audio/transcriptions",
      nodeApiType: "audio-transcriptions",
      allowRemote: false,
    };
    delete process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV];
    assert.deepEqual(selectAudioProviderNodes([node], opts), []);

    process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV] = "reranker";
    const [byPrefix] = selectAudioProviderNodes([node], opts);
    assert.equal(byPrefix?.id, "sidecar");
    assert.equal(byPrefix?.baseUrl, "http://reranker:8080/v1/audio/transcriptions");
    // Eligibility widens; the auth decision stays loopback-only, so a listed sidecar that
    // requires a token (TEI --api-key, Infinity behind a gateway) still receives it.
    assert.equal(byPrefix?.authType, "apikey");
    assert.equal(byPrefix?.credentialProviderId, node.id);
  });
});

test.describe("environment proxy bypass for listed hosts", () => {
  test.afterEach(() => resetEnv());

  test("listed host goes direct; unlisted service name still uses HTTPS_PROXY", () => {
    process.env.HTTP_PROXY = "http://egress-proxy:7890";
    process.env.HTTPS_PROXY = "http://egress-proxy:7890";
    delete process.env.http_proxy;
    delete process.env.https_proxy;
    delete process.env.NO_PROXY;
    delete process.env.no_proxy;

    delete process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV];
    assert.equal(resolveProxyForRequest("http://reranker:8080/v1/rerank").source, "env");

    process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV] = "reranker";
    assert.deepEqual(resolveProxyForRequest("http://reranker:8080/v1/rerank"), {
      source: "direct",
      proxyUrl: null,
    });
    assert.equal(resolveProxyForRequest("http://tei:8080/v1/rerank").source, "env");
  });
});

test.describe("POST /v1/rerank reaches a listed service-name node", () => {
  const originalFetch = globalThis.fetch;

  test.before(async () => {
    const now = new Date().toISOString();
    await createProviderNode({
      id: SERVICE_NODE.id,
      name: "sidecar",
      type: "openai-compatible",
      prefix: SERVICE_NODE.prefix,
      baseUrl: SERVICE_NODE.baseUrl,
      apiType: SERVICE_NODE.apiType,
      createdAt: now,
      updatedAt: now,
    });
    await createProviderConnection({
      id: "conn-sidecar-1",
      provider: SERVICE_NODE.id,
      authType: "apikey",
      name: "sidecar",
      apiKey: "sidecar-token",
      createdAt: now,
      updatedAt: now,
    });
    invalidateDbCache("nodes");
    invalidateDbCache("connections");
  });

  test.afterEach(() => {
    globalThis.fetch = originalFetch;
    resetEnv();
  });

  test.after(() => {
    core.resetDbInstance();
    try {
      fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    } catch {
      // ignore
    }
  });

  function rerankRequest() {
    return new Request("http://localhost/v1/rerank", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        model: "sidecar/bge-reranker-v2-m3",
        query: "what is a cat",
        documents: ["a cat is a small animal", "the stock market fell"],
      }),
    });
  }

  test("unlisted: the node is invisible and the request fails as an invalid model", async () => {
    delete process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV];
    delete process.env[RERANK_REMOTE_NODES_FLAG];
    let upstreamCalled = false;
    globalThis.fetch = async () => {
      upstreamCalled = true;
      return new Response("{}", { status: 200 });
    };

    const res = await POST(rerankRequest(), {});
    assert.equal(res.status, 400);
    const body = await res.json();
    assert.match(String(body?.error?.message ?? ""), /Invalid rerank model/);
    assert.equal(upstreamCalled, false);
  });

  test("listed: forwarded to the service name with the node credential, remote flag off", async () => {
    process.env[LOCAL_PROVIDER_NODE_HOSTS_ENV] = "reranker";
    delete process.env[RERANK_REMOTE_NODES_FLAG];
    const calls: Array<{ url: string; auth: string | null }> = [];
    globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
      calls.push({ url: String(url), auth: new Headers(init?.headers).get("authorization") });
      return new Response(
        JSON.stringify({
          results: [
            { index: 0, relevance_score: 0.97 },
            { index: 1, relevance_score: 0.02 },
          ],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    };

    const res = await POST(rerankRequest(), {});
    assert.equal(res.status, 200);
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "http://reranker:8080/v1/rerank");
    assert.equal(calls[0].auth, "Bearer sidecar-token");
  });
});
