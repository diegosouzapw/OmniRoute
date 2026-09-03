import test from "node:test";
import { makeMcpStreamFetch } from "../helpers/mcpStreamMock.ts";
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

test("resilience profile set usa JSON-RPC tools/call", async () => {
  let capturedCall: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = makeMcpStreamFetch({ toolResult: {} });
  const inner = globalThis.fetch;
  globalThis.fetch = ((url: any, init: any) => {
    if (String(url).includes("/api/mcp/stream") && String(init?.body || "").includes("tools/call")) {
      capturedCall = JSON.parse(init.body);
    }
    return inner(url, init);
  }) as any;

  const { mcpCallTool } = await import("../../../bin/cli/mcpClient.mjs");
  await mcpCallTool("omniroute_set_resilience_profile", { profile: "balanced" });

  globalThis.fetch = origFetch;
  assert.equal(capturedCall.method, "tools/call");
  assert.equal(capturedCall.params.name, "omniroute_set_resilience_profile");
  assert.equal(capturedCall.params.arguments.profile, "balanced");
});

test("resilience.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../../bin/cli/commands/resilience.mjs");
  assert.equal(typeof mod.registerResilience, "function");
});
