import test from "node:test";
import assert from "node:assert/strict";

function makeResp(data: unknown, status = 200) {
  const obj = {
    ok: status < 400,
    status,
    exitCode: status < 400 ? 0 : 1,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
  };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

function makeCmd(output = "json") {
  return { optsWithGlobals: () => ({ output, quiet: output !== "table" }) };
}

test("oneproxy status chama omniroute_oneproxy_stats via MCP", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ poolSize: 10, activeProxies: 8 }));
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/tools/call", {
    method: "POST",
    body: JSON.stringify({ name: "omniroute_oneproxy_stats", arguments: {} }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.name, "omniroute_oneproxy_stats");
});

test("oneproxy stats passa provider e period para MCP", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ requests: 5000 }));
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/tools/call", {
    method: "POST",
    body: JSON.stringify({
      name: "omniroute_oneproxy_stats",
      arguments: { provider: "openai", period: "24h" },
    }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.arguments.provider, "openai");
  assert.equal(capturedBody.arguments.period, "24h");
});

test("oneproxy fetch chama omniroute_oneproxy_fetch com count e type", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ proxies: [{ host: "10.0.0.1", type: "http" }] }));
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/tools/call", {
    method: "POST",
    body: JSON.stringify({
      name: "omniroute_oneproxy_fetch",
      arguments: { count: 5, type: "http" },
    }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.name, "omniroute_oneproxy_fetch");
  assert.equal(capturedBody.arguments.count, 5);
  assert.equal(capturedBody.arguments.type, "http");
});

test("oneproxy rotate chama omniroute_oneproxy_rotate com provider", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ rotated: true, newProxy: "10.0.0.2" }));
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/tools/call", {
    method: "POST",
    body: JSON.stringify({
      name: "omniroute_oneproxy_rotate",
      arguments: { provider: "anthropic" },
    }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.name, "omniroute_oneproxy_rotate");
  assert.equal(capturedBody.arguments.provider, "anthropic");
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
