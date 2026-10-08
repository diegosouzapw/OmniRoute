import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import http from "node:http";
import os from "node:os";
import path from "node:path";
import type { AddressInfo } from "node:net";

// Through the real pieces of the chat path: a provider dispatch refused through a pool
// member, the capture on the applied-proxy sink, the merge at the log call site and
// safeLogEvents. With PROXY_SKIP_RECENTLY_FAILED on, the next pick of that pool skips the
// member (already before the fire-and-forget log settles); a locally generated failure does
// not; a provider outside the refusal scope does not. With the flag off nothing changes.

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pool-refused-path-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = "test-secret";

const core = await import("../../src/lib/db/core.ts");
const proxiesDb = await import("../../src/lib/db/proxies.ts");
const proxyLogger = await import("../../src/lib/proxyLogger.ts");
const memory = await import("../../open-sse/utils/proxyRefusalMemory.ts");
const proxyFetchModule = await import("../../open-sse/utils/proxyFetch.ts");
const { runWithCapture } = await import("../../open-sse/utils/providerRequestLogging.ts");
const { mergeAppliedProxySink, safeLogEvents } =
  await import("../../src/sse/handlers/chatHelpers.ts");

const capture = { capture: () => {}, body: (fallback: unknown) => fallback };
let server: http.Server;
let baseUrl = "";

test.before(async () => {
  server = http.createServer((req, res) => {
    const code = Number(new URL(req.url ?? "/", "http://local").searchParams.get("code") ?? 200);
    res.writeHead(code, { "content-type": "application/json" });
    res.end("{}");
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  baseUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

test.after(async () => {
  delete process.env.PROXY_SKIP_RECENTLY_FAILED;
  await new Promise<void>((resolve) => server.close(() => resolve()));
  proxyLogger.clearProxyLogs();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test.beforeEach(() => {
  memory.__resetProxyRefusalMemoryForTesting();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "true";
  proxyLogger.clearProxyLogs();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
});

async function twoMemberPool() {
  const members = [];
  for (const port of [9301, 9302]) {
    const proxy = await proxiesDb.createProxy({
      name: `m${port}`,
      type: "http",
      host: "10.4.1.1",
      port,
    });
    await proxiesDb.addProxyToScopePool("provider", "opencode", proxy.id);
    members.push({ type: "http", host: "10.4.1.1", port });
  }
  return members;
}

async function pickPort() {
  const resolved = await proxiesDb.resolveProxyForScopeFromRegistry("provider", "opencode");
  return (resolved as { proxy: { port: number } }).proxy.port;
}

// One request as chat.ts runs it: the executor pins a proxy on the sink, the provider
// dispatch goes through the patched fetch, then the log call merges the sink.
async function chatRequest(
  provider: string,
  pinned: unknown,
  code: number | null,
  onLogCalled: () => void = () => {}
) {
  const sink: { proxy: unknown; upstreamStatus?: number } = { proxy: null };
  await proxyFetchModule.runWithAppliedProxyCapture(sink, async () => {
    sink.proxy = pinned;
    if (code !== null) {
      await runWithCapture(capture, async () => {
        const res = await fetch(`${baseUrl}/v1/chat/completions?code=${code}`);
        await res.text();
      });
    }
  });
  // chat.ts fires this without awaiting it.
  const logged = safeLogEvents({
    result: { success: code === 200, status: code ?? 429, error: code === 200 ? null : "failed" },
    proxyInfo: mergeAppliedProxySink({ proxy: null, level: "provider", levelId: provider }, sink),
    proxyLatency: 1,
    provider,
    model: "m",
    sourceFormat: "openai",
    targetFormat: "openai",
    credentials: { connectionId: "conn-refused-path" },
    comboName: null,
    clientRawRequest: null,
  });
  onLogCalled();
  await logged;
}

test("a received refusal through a pool member makes the next pick skip it", async () => {
  const [first, second] = await twoMemberPool();
  assert.equal(await pickPort(), first.port);
  await chatRequest("opencode", first, 429);
  assert.equal(proxyLogger.getProxyLogs()[0].upstreamStatus, 429);
  assert.deepEqual([await pickPort(), await pickPort()], [second.port, second.port]);
});

test("the member is set aside as soon as the log call returns, not when the log settles", async () => {
  const [first, second] = await twoMemberPool();
  let avoidedAtCallSite: boolean | null = null;
  await chatRequest("opencode", first, 429, () => {
    avoidedAtCallSite = memory.isProxyAvoided(memory.proxyEgressKey(first));
  });
  assert.equal(avoidedAtCallSite, true, "a concurrent pick must already skip the refused member");
  assert.deepEqual([await pickPort(), await pickPort()], [second.port, second.port]);
});

test("with the flag opted out a received refusal leaves the member in rotation", async () => {
  const [first, second] = await twoMemberPool();
  process.env.PROXY_SKIP_RECENTLY_FAILED = "false";
  await chatRequest("opencode", first, 429);
  assert.equal(proxyLogger.getProxyLogs()[0].upstreamStatus, 429);
  assert.equal(memory.__proxyRefusalMemorySizeForTesting(), 0);
  assert.deepEqual([await pickPort(), await pickPort()], [first.port, second.port]);
});

test("a locally generated failure (no dispatch) leaves the member in rotation", async () => {
  const [first, second] = await twoMemberPool();
  await chatRequest("opencode", first, null);
  assert.equal(proxyLogger.getProxyLogs()[0].upstreamStatus, null);
  assert.deepEqual([await pickPort(), await pickPort()], [first.port, second.port]);
});

test("a refusal for a provider outside the scope leaves the member in rotation", async () => {
  const [first, second] = await twoMemberPool();
  await chatRequest("opencode-zen", first, 429);
  assert.deepEqual([await pickPort(), await pickPort()], [first.port, second.port]);
});
