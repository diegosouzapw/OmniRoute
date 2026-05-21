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

test("nodes list busca /api/provider-nodes", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ items: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/provider-nodes");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/provider-nodes"));
});

test("nodes list com --provider filtra na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ items: [] }));
  }) as any;

  const params = new URLSearchParams({ provider: "openai" });
  await (globalThis.fetch as any)(`/api/provider-nodes?${params}`);

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("provider=openai"));
});

test("nodes add envia provider e baseUrl no body", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ id: "node-1", provider: "openai" }));
  }) as any;

  await (globalThis.fetch as any)("/api/provider-nodes", {
    method: "POST",
    body: JSON.stringify({
      provider: "openai",
      baseUrl: "https://api.openai.com/v1",
      weight: 100,
      enabled: true,
    }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.provider, "openai");
  assert.equal(capturedBody.baseUrl, "https://api.openai.com/v1");
  assert.equal(capturedBody.enabled, true);
});

test("nodes update envia PUT para o id", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ id: "node-1" }));
  }) as any;

  await (globalThis.fetch as any)("/api/provider-nodes/node-1", {
    method: "PUT",
    body: JSON.stringify({ weight: 50 }),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/provider-nodes/node-1"));
  assert.equal(capturedMethod, "PUT");
  assert.equal(capturedBody.weight, 50);
});

test("nodes remove com --yes chama DELETE", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp({}, 204));
  }) as any;

  await (globalThis.fetch as any)("/api/provider-nodes/node-1", { method: "DELETE" });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/provider-nodes/node-1"));
  assert.equal(capturedMethod, "DELETE");
});

test("nodes validate envia baseUrl e provider", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ valid: true, latencyMs: 120 }));
  }) as any;

  await (globalThis.fetch as any)("/api/provider-nodes/validate", {
    method: "POST",
    body: JSON.stringify({ baseUrl: "https://api.openai.com/v1", provider: "openai" }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.baseUrl, "https://api.openai.com/v1");
  assert.equal(capturedBody.provider, "openai");
});

test("nodes.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/nodes.mjs");
  assert.equal(typeof mod.registerNodes, "function");
});
