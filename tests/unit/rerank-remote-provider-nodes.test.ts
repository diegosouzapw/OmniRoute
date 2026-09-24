// Regression tests for provider-node eligibility on POST /v1/rerank.
//
// The route used to carry its own hardcoded host filter (localhost / 127.0.0.1 /
// 172.16.0.0/12), so a rerank node on any other host — a LAN box or Tailscale peer
// running TEI, Infinity, or vLLM — was silently dropped and the request fell through to
// "Invalid rerank model", even though the same node served /v1/embeddings without
// complaint and had passed the provider outbound URL policy at creation time.
//
// Eligibility now mirrors the audio routes (#3963): loopback nodes are always eligible,
// remote nodes are opt-in via RERANK_REMOTE_PROVIDER_NODES (default OFF) and must still
// pass the provider outbound URL policy (#5066 / #9123) — cloud-metadata hosts are never
// routed to, and strict `public-only` deployments never route to private hosts.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rerank-remote-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { isLoopbackNodeHost } = await import("../../src/shared/network/loopbackNodeHost.ts");
const { isEligibleProviderNodeHost, isRemoteNodeHostAllowedByPolicy } =
  await import("../../src/shared/network/providerNodeHost.ts");
const { RERANK_REMOTE_NODES_FLAG, selectRerankProviderNodes } =
  await import("../../src/app/api/v1/_shared/rerankProviderNodes.ts");
const { isLoopbackNodeHost: audioLoopback } =
  await import("../../open-sse/config/audioRegistry.ts");
const core = await import("../../src/lib/db/core.ts");
const { invalidateDbCache } = await import("../../src/lib/db/readCache.ts");
const { createProviderNode, createProviderConnection } =
  await import("../../src/lib/db/providers.ts");
const { POST } = await import("../../src/app/api/v1/rerank/route.ts");

const LOOPBACK_NODE = {
  id: "openai-compatible-rerank-loop",
  prefix: "loop",
  baseUrl: "http://127.0.0.1:8000/v1",
  apiType: "rerank",
};
const DOCKER_NODE = {
  id: "openai-compatible-rerank-docker",
  prefix: "dockernode",
  baseUrl: "http://172.18.0.5:8000/v1",
  apiType: "embeddings",
};
const LAN_NODE = {
  id: "openai-compatible-embeddings-lan",
  prefix: "skilled-mini",
  baseUrl: "http://10.10.50.19:8888/v1",
  apiType: "embeddings",
};
const METADATA_NODE = {
  id: "openai-compatible-rerank-imds",
  prefix: "imds",
  baseUrl: "http://169.254.169.254/v1",
  apiType: "rerank",
};
const PUBLIC_NODE = {
  id: "openai-compatible-rerank-public",
  prefix: "pub",
  baseUrl: "https://rerank.example.com/v1",
  apiType: "rerank",
};

const ENV_KEYS = [
  RERANK_REMOTE_NODES_FLAG,
  "OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS",
  "OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS",
  "OUTBOUND_SSRF_GUARD_ENABLED",
] as const;
const savedEnv: Record<string, string | undefined> = {};
for (const k of ENV_KEYS) savedEnv[k] = process.env[k];

function resetEnv() {
  for (const k of ENV_KEYS) {
    if (savedEnv[k] === undefined) delete process.env[k];
    else process.env[k] = savedEnv[k];
  }
}

test.describe("loopback host classification (shared)", () => {
  test("accepts localhost, 127.0.0.1 and 172.16/12; rejects ::1, LAN, public, user@host", () => {
    assert.equal(isLoopbackNodeHost("http://localhost:8080/v1"), true);
    assert.equal(isLoopbackNodeHost("http://127.0.0.1:8080/v1"), true);
    assert.equal(isLoopbackNodeHost("http://172.31.255.1:8080/v1"), true);
    assert.equal(isLoopbackNodeHost("http://[::1]:8080/v1"), false);
    assert.equal(isLoopbackNodeHost("http://10.10.50.19:8888/v1"), false);
    assert.equal(isLoopbackNodeHost("http://192.168.1.10:8888/v1"), false);
    assert.equal(isLoopbackNodeHost("https://rerank.example.com/v1"), false);
    assert.equal(isLoopbackNodeHost("http://localhost@evil.com/v1"), false);
    assert.equal(isLoopbackNodeHost("not a url"), false);
  });

  test("audio registry re-exports the shared definition", () => {
    assert.equal(audioLoopback, isLoopbackNodeHost);
  });
});

test.describe("remote node policy", () => {
  test.afterEach(() => resetEnv());

  test("local-first default (block-metadata): LAN allowed, cloud-metadata blocked", () => {
    delete process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;
    delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
    assert.equal(isRemoteNodeHostAllowedByPolicy(LAN_NODE.baseUrl), true);
    assert.equal(isRemoteNodeHostAllowedByPolicy(PUBLIC_NODE.baseUrl), true);
    assert.equal(isRemoteNodeHostAllowedByPolicy(METADATA_NODE.baseUrl), false);
    assert.equal(isRemoteNodeHostAllowedByPolicy("http://user:pw@10.10.50.19/v1"), false);
    assert.equal(isRemoteNodeHostAllowedByPolicy("ftp://10.10.50.19/v1"), false);
  });

  test("strict public-only: private hosts blocked, public allowed", () => {
    process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS = "false";
    delete process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS;
    assert.equal(isRemoteNodeHostAllowedByPolicy(LAN_NODE.baseUrl), false);
    assert.equal(isRemoteNodeHostAllowedByPolicy(PUBLIC_NODE.baseUrl), true);
    assert.equal(isRemoteNodeHostAllowedByPolicy(METADATA_NODE.baseUrl), false);
  });

  test("full opt-in (none): protocol/credential checks only", () => {
    process.env.OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS = "true";
    assert.equal(isRemoteNodeHostAllowedByPolicy(LAN_NODE.baseUrl), true);
    assert.equal(isRemoteNodeHostAllowedByPolicy("http://user:pw@10.10.50.19/v1"), false);
  });

  test("isEligibleProviderNodeHost: loopback always, remote only with allowRemote", () => {
    delete process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;
    assert.equal(isEligibleProviderNodeHost(LOOPBACK_NODE.baseUrl, { allowRemote: false }), true);
    assert.equal(isEligibleProviderNodeHost(LAN_NODE.baseUrl, { allowRemote: false }), false);
    assert.equal(isEligibleProviderNodeHost(LAN_NODE.baseUrl, { allowRemote: true }), true);
    assert.equal(isEligibleProviderNodeHost(METADATA_NODE.baseUrl, { allowRemote: true }), false);
  });
});

test.describe("selectRerankProviderNodes", () => {
  test.afterEach(() => resetEnv());

  test("flag off: only loopback/Docker nodes are selected (previous behavior)", () => {
    const selected = selectRerankProviderNodes(
      [LOOPBACK_NODE, DOCKER_NODE, LAN_NODE, METADATA_NODE, PUBLIC_NODE],
      { allowRemote: false }
    );
    assert.deepEqual(
      selected.map((p) => p.id),
      ["loop", "dockernode"]
    );
    assert.equal(selected[0].baseUrl, "http://127.0.0.1:8000/v1/rerank");
    assert.equal(selected[0].providerId, LOOPBACK_NODE.id);
  });

  test("flag on: LAN and public nodes join; cloud-metadata never does", () => {
    delete process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;
    const selected = selectRerankProviderNodes(
      [LOOPBACK_NODE, DOCKER_NODE, LAN_NODE, METADATA_NODE, PUBLIC_NODE],
      { allowRemote: true }
    );
    assert.deepEqual(
      selected.map((p) => p.id),
      ["loop", "dockernode", "skilled-mini", "pub"]
    );
    const lan = selected.find((p) => p.id === "skilled-mini");
    assert.equal(lan?.baseUrl, "http://10.10.50.19:8888/v1/rerank");
  });

  test("flag on under strict public-only policy: LAN node still excluded", () => {
    process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS = "false";
    const selected = selectRerankProviderNodes([LOOPBACK_NODE, LAN_NODE, PUBLIC_NODE], {
      allowRemote: true,
    });
    assert.deepEqual(
      selected.map((p) => p.id),
      ["loop", "pub"]
    );
  });

  test("skips rows without a base URL or prefix instead of throwing", () => {
    const selected = selectRerankProviderNodes(
      [
        { id: "x", prefix: "", baseUrl: "http://127.0.0.1:1/v1" },
        { id: "y", prefix: "y" },
      ],
      { allowRemote: true }
    );
    assert.deepEqual(selected, []);
  });
});

test.describe("POST /v1/rerank routes to a LAN provider node only when opted in", () => {
  const originalFetch = globalThis.fetch;

  test.before(async () => {
    const now = new Date().toISOString();
    await createProviderNode({
      id: LAN_NODE.id,
      name: "skilled-mini",
      type: "openai",
      prefix: LAN_NODE.prefix,
      baseUrl: LAN_NODE.baseUrl,
      apiType: LAN_NODE.apiType,
      createdAt: now,
      updatedAt: now,
    });
    await createProviderConnection({
      id: "conn-skilled-mini-1",
      provider: LAN_NODE.id,
      authType: "apikey",
      name: "skilled-mini",
      apiKey: "test-token",
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
        model: "skilled-mini/bge-reranker-v2-m3",
        query: "what is a cat",
        documents: ["a cat is a small animal", "the stock market fell"],
      }),
    });
  }

  test("flag off: LAN node is invisible and the request fails as an invalid model", async () => {
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
    assert.equal(upstreamCalled, false, "must not contact the remote node when opted out");
  });

  test("flag on: request is forwarded to the LAN node's /v1/rerank with the node credential", async () => {
    process.env[RERANK_REMOTE_NODES_FLAG] = "true";
    delete process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS;
    const calls: Array<{ url: string; auth: string | null; body: Record<string, unknown> }> = [];
    globalThis.fetch = async (url: string | URL | Request, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      calls.push({
        url: String(url),
        auth: headers.get("authorization"),
        body: JSON.parse(String(init?.body || "{}")),
      });
      return new Response(
        JSON.stringify({
          results: [
            { index: 0, relevance_score: 0.98 },
            { index: 1, relevance_score: 0.01 },
          ],
        }),
        { status: 200, headers: { "content-type": "application/json" } }
      );
    };

    const res = await POST(rerankRequest(), {});
    assert.equal(res.status, 200);
    const data = (await res.json()) as { results: Array<{ index: number }> };
    assert.deepEqual(
      data.results.map((r) => r.index),
      [0, 1]
    );
    assert.equal(calls.length, 1);
    assert.equal(calls[0].url, "http://10.10.50.19:8888/v1/rerank");
    assert.equal(calls[0].auth, "Bearer test-token");
    assert.equal(calls[0].body.model, "bge-reranker-v2-m3");
    assert.deepEqual(calls[0].body.documents, ["a cat is a small animal", "the stock market fell"]);
    assert.equal(res.headers.get("X-OmniRoute-Provider"), "skilled-mini");
  });

  test("flag on but strict public-only policy: LAN node stays excluded", async () => {
    process.env[RERANK_REMOTE_NODES_FLAG] = "true";
    process.env.OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS = "false";
    let upstreamCalled = false;
    globalThis.fetch = async () => {
      upstreamCalled = true;
      return new Response("{}", { status: 200 });
    };

    const res = await POST(rerankRequest(), {});
    assert.equal(res.status, 400);
    assert.equal(upstreamCalled, false);
  });
});
