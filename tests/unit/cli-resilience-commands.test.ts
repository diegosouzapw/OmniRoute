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

test("resilience status busca /api/resilience", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ breakers: [], cooldowns: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/resilience");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/resilience"));
});

test("resilience breakers busca include=breakers", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ breakers: [{ provider: "openai", state: "closed" }] }));
  }) as any;

  await (globalThis.fetch as any)("/api/resilience?include=breakers");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("include=breakers"));
});

test("resilience cooldowns busca include=cooldowns", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ cooldowns: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/resilience?include=cooldowns");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("include=cooldowns"));
});

test("resilience lockouts busca /api/resilience/model-cooldowns", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ items: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/resilience/model-cooldowns");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/resilience/model-cooldowns"));
});

test("resilience reset envia provider e body correto", async () => {
  let capturedBody: any = null;
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    capturedMethod = opts?.method ?? "GET";
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ reset: true }));
  }) as any;

  await (globalThis.fetch as any)("/api/resilience/reset", {
    method: "POST",
    body: JSON.stringify({ provider: "openai", connectionId: "conn-1", allCooldowns: false }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedMethod, "POST");
  assert.equal(capturedBody.provider, "openai");
  assert.equal(capturedBody.connectionId, "conn-1");
});

test("resilience profile set chama MCP tool", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ result: {} }));
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/tools/call", {
    method: "POST",
    body: JSON.stringify({
      name: "omniroute_set_resilience_profile",
      arguments: { profile: "balanced" },
    }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.name, "omniroute_set_resilience_profile");
  assert.equal(capturedBody.arguments.profile, "balanced");
});

test("resilience.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/resilience.mjs");
  assert.equal(typeof mod.registerResilience, "function");
});
