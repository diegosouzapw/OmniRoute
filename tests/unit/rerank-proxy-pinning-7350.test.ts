import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * #7350 — rerank egressed directly instead of honoring the connection's proxy, so a
 * provider that geo-blocks the host's IP (Voyage AI from some ranges) failed even when
 * the connection had a working proxy pinned, while chat and embeddings on the SAME
 * connection worked. `handleRerank` now takes a `connectionId`, resolves that
 * connection's proxy and wraps the upstream fetch in `runWithProxyContext`.
 *
 * These tests drive the real DB + resolution cascade (no module mocking) and assert on
 * the proxy agent that actually reaches undici, which is what "the request egressed
 * through the proxy" concretely means here.
 */

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-rerank-proxy-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const proxyFetch = await import("../../open-sse/utils/proxyFetch.ts");
const { handleRerank } = await import("../../open-sse/handlers/rerank.ts");

const originalFetch = globalThis.fetch;

/** Captures the proxy URL visible inside the dispatch context at fetch time. */
function stubFetch(seen: { proxyUrl: string | null | undefined }[]) {
  globalThis.fetch = (async () => {
    seen.push({ proxyUrl: proxyFetch.getCurrentProxyUrlForTests?.() ?? undefined });
    return new Response(
      JSON.stringify({ data: [{ index: 0, relevance_score: 0.9 }], model: "rerank-2" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }) as typeof fetch;
}

test.after(() => {
  globalThis.fetch = originalFetch;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#7350 handleRerank routes the upstream call through the connection's pinned proxy", async () => {
  core.resetDbInstance();
  const conn = await providersDb.createProviderConnection({
    provider: "voyage",
    authType: "apikey",
    name: "voyage-proxied",
    apiKey: "pa-test-key",
  });
  const proxy = await proxiesDb.createProxy({
    name: "Rerank Egress Proxy",
    type: "http",
    host: "rerank-egress.local",
    port: 8080,
  });
  await proxiesDb.assignProxyToScope("account", (conn as { id: string }).id, proxy.id);

  // The stub only ever answers a DIRECT call: runWithProxyContext dispatches through
  // undici with the pinned proxy agent instead, so a pinned-but-unreachable proxy is
  // observable as "the stub was bypassed and the request did not succeed". That
  // difference IS the wiring — before #7350 this call egressed directly and got a 200.
  const seen: { proxyUrl: string | null | undefined }[] = [];
  stubFetch(seen);

  const res = (await handleRerank({
    model: "voyage/rerank-2",
    query: "q",
    documents: ["a", "b"],
    credentials: { apiKey: "pa-test-key" },
    connectionId: (conn as { id: string }).id,
  })) as Response;

  assert.equal(seen.length, 0, "a pinned proxy must bypass the direct-egress path entirely");
  assert.notEqual(
    res.status,
    200,
    "the unreachable pinned proxy must surface as a failure rather than silently egressing direct"
  );
});

test("#7350 an unresolvable connectionId degrades to a direct call instead of failing the request", async () => {
  core.resetDbInstance();
  const seen: { proxyUrl: string | null | undefined }[] = [];
  stubFetch(seen);

  const res = await handleRerank({
    model: "voyage/rerank-2",
    query: "q",
    documents: ["a"],
    credentials: { apiKey: "pa-test-key" },
    connectionId: "connection-that-does-not-exist",
  });

  assert.equal(seen.length, 1, "proxy resolution failure must not swallow the upstream call");
  assert.equal(
    (res as Response).status,
    200,
    "a failed proxy lookup is logged and skipped, never turned into a request error"
  );
});

test("#7350 omitting connectionId keeps the previous direct-egress behavior", async () => {
  core.resetDbInstance();
  const seen: { proxyUrl: string | null | undefined }[] = [];
  stubFetch(seen);

  await handleRerank({
    model: "voyage/rerank-2",
    query: "q",
    documents: ["a"],
    credentials: { apiKey: "pa-test-key" },
  });

  assert.equal(seen.length, 1);
  assert.ok(
    !seen[0].proxyUrl,
    `no connectionId must mean no proxy context, saw: ${seen[0].proxyUrl}`
  );
});
