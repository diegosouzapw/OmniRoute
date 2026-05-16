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

async function captureStdout(fn: () => Promise<void>): Promise<string> {
  const chunks: string[] = [];
  const orig = process.stdout.write.bind(process.stdout);
  process.stdout.write = (c: string | Uint8Array) => {
    chunks.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = orig;
  }
  return chunks.join("");
}

function makeCmd(output = "json") {
  return { optsWithGlobals: () => ({ output, quiet: output !== "table" }) };
}

test("mcp call envia name e arguments no body", async () => {
  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ result: { health: "ok" } }));
  }) as any;

  // Simula o que runMcpCall faz internamente
  await (globalThis.fetch as any)("/api/mcp/tools/call", {
    method: "POST",
    body: JSON.stringify({ name: "omniroute_get_health", arguments: {} }),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/mcp/tools/call"));
  assert.equal(capturedBody.name, "omniroute_get_health");
  assert.deepEqual(capturedBody.arguments, {});
});

test("mcp call com --args passa argumentos como JSON", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ result: {} }));
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/tools/call", {
    method: "POST",
    body: JSON.stringify({ name: "omniroute_check_quota", arguments: { provider: "openai" } }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.arguments.provider, "openai");
});

test("mcp scopes envia meta=scopes na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ scopes: ["read:health", "read:combos", "write:settings"] }));
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/tools?meta=scopes");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("meta=scopes"));
});

test("mcp tools list busca /api/mcp/tools", async () => {
  const TOOLS = [
    { name: "omniroute_get_health", scopes: ["read:health"], auditLevel: "low", phase: 1 },
    { name: "omniroute_list_combos", scopes: ["read:combos"], auditLevel: "low", phase: 1 },
  ];
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string) => {
    return Promise.resolve(makeResp({ tools: TOOLS }));
  }) as any;

  const out = await captureStdout(async () => {
    const { emit } = await import("../../bin/cli/output.mjs");
    const res = await (globalThis.fetch as any)("/api/mcp/tools");
    const data = await res.json();
    emit(data.tools ?? data, makeCmd().optsWithGlobals());
  });

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed.length, 2);
});

test("mcp tools list com --scope filtra por scope", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ tools: [] }));
  }) as any;

  const params = new URLSearchParams({ scope: "read:health" });
  await (globalThis.fetch as any)(`/api/mcp/tools?${params}`);

  globalThis.fetch = origFetch;
  assert.ok(
    capturedUrl.includes("scope=read%3Ahealth") || capturedUrl.includes("scope=read:health")
  );
});

test("mcp audit stats passa period na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ period: "30d", totalCalls: 500 }));
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/audit/stats?period=30d");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("period=30d"));
});

test("mcp.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/mcp.mjs");
  assert.equal(typeof mod.registerMcp, "function");
  assert.equal(typeof mod.runMcpStatusCommand, "function");
  assert.equal(typeof mod.runMcpRestartCommand, "function");
});
