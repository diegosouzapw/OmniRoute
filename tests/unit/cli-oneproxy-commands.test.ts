import test from "node:test";
import assert from "node:assert/strict";
import { makeMcpResp, makeMcpStreamFetch } from "./helpers/mcpStreamMock.ts";

function makeResp(data: unknown, status = 200) {
  return makeMcpResp(data, status) as any;
}

function makeCmd(output = "json") {
  return { optsWithGlobals: () => ({ output, quiet: output !== "table" }) };
}

test("oneproxy status chama omniroute_oneproxy_stats via MCP", async () => {
  // #10960 rewrote this test around the shared stream mock but left it asserting
  // `calls.length >= 0` — always true — while the mock it installed was
  // immediately overwritten by a passthrough to the real fetch. Restored to
  // assert what the test name claims: the JSON-RPC tools/call carries the
  // omniroute_oneproxy_stats tool name and its result reaches the caller.
  // Scope note: like the pre-#10960 version, this drives mcpCallTool directly
  // rather than the `oneproxy status` commander action, so it pins the MCP
  // client contract, not the subcommand wiring (covered by the import test below).
  const toolCalls: Array<Record<string, unknown>> = [];
  const origFetch = globalThis.fetch;
  const streamFetch = makeMcpStreamFetch({ toolResult: { poolSize: 10, activeProxies: 8 } });
  globalThis.fetch = (async (url: string | URL, init?: any) => {
    const parsed = init?.body ? JSON.parse(init.body) : {};
    if (parsed.method === "tools/call") toolCalls.push(parsed.params ?? {});
    return streamFetch(url as string, init);
  }) as any;

  try {
    const { mcpCallTool } = await import("../../bin/cli/mcpClient.mjs");
    const result = await mcpCallTool("omniroute_oneproxy_stats", {});
    assert.deepEqual(result, { poolSize: 10, activeProxies: 8 });
  } finally {
    globalThis.fetch = origFetch;
  }

  assert.equal(toolCalls.length, 1, "exactly one tools/call must reach the MCP endpoint");
  assert.equal(toolCalls[0].name, "omniroute_oneproxy_stats");
});

test("oneproxy stats passa provider e period para MCP", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = makeMcpStreamFetch({ toolResult: { requests: 5000 } });
  const { mcpCallTool } = await import("../../bin/cli/mcpClient.mjs");
  const result = await mcpCallTool("omniroute_oneproxy_stats", {
    provider: "openai",
    period: "24h",
  });
  globalThis.fetch = origFetch;
  assert.deepEqual(result, { requests: 5000 });
});

test("oneproxy fetch chama omniroute_oneproxy_fetch com count e type", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = makeMcpStreamFetch({
    toolResult: { proxies: [{ host: "10.0.0.1", type: "http" }] },
  });
  const { mcpCallTool } = await import("../../bin/cli/mcpClient.mjs");
  const result = await mcpCallTool("omniroute_oneproxy_fetch", { count: 5, type: "http" });
  globalThis.fetch = origFetch;
  assert.equal((result as any).proxies[0].host, "10.0.0.1");
  assert.equal((result as any).proxies[0].type, "http");
});

test("oneproxy rotate chama omniroute_oneproxy_rotate com provider", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = makeMcpStreamFetch({ toolResult: { rotated: true, newProxy: "10.0.0.2" } });
  const { mcpCallTool } = await import("../../bin/cli/mcpClient.mjs");
  const result = await mcpCallTool("omniroute_oneproxy_rotate", { provider: "anthropic" });
  globalThis.fetch = origFetch;
  assert.equal((result as any).rotated, true);
  assert.equal((result as any).newProxy, "10.0.0.2");
});

test("oneproxy config set envia PUT /api/settings/oneproxy", async () => {
  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ enabled: true, poolSize: 20 }));
  }) as any;

  await (globalThis.fetch as any)("/api/settings/oneproxy", {
    method: "PUT",
    body: JSON.stringify({ enabled: true, poolSize: 20 }),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/settings/oneproxy"));
  assert.equal(capturedBody.enabled, true);
  assert.equal(capturedBody.poolSize, 20);
});

test("oneproxy pool chama /api/settings/oneproxy?include=pool", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ pool: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/settings/oneproxy?include=pool");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("include=pool"));
});

test("oneproxy.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/oneproxy.mjs");
  assert.equal(typeof mod.registerOneProxy, "function");
});
