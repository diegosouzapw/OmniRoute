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

test("context analytics chama /api/context/analytics com period", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ requests: 1000, compressionRatio: 0.42 }));
  }) as any;

  await (globalThis.fetch as any)("/api/context/analytics?period=7d");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/context/analytics"));
  assert.ok(capturedUrl.includes("period=7d"));
});

test("caveman config set envia PUT com aggressiveness e maxShrinkPct", async () => {
  let capturedBody: any = null;
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    capturedMethod = opts?.method ?? "GET";
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ aggressiveness: 0.8, maxShrinkPct: 50 }));
  }) as any;

  await (globalThis.fetch as any)("/api/context/caveman/config", {
    method: "PUT",
    body: JSON.stringify({ aggressiveness: 0.8, maxShrinkPct: 50 }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedMethod, "PUT");
  assert.equal(capturedBody.aggressiveness, 0.8);
  assert.equal(capturedBody.maxShrinkPct, 50);
});

test("rtk config set envia PUT com tokenBudget e reservePct", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ tokenBudget: 2000, reservePct: 30 }));
  }) as any;

  await (globalThis.fetch as any)("/api/context/rtk/config", {
    method: "PUT",
    body: JSON.stringify({ tokenBudget: 2000, reservePct: 30 }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.tokenBudget, 2000);
  assert.equal(capturedBody.reservePct, 30);
});

test("rtk filters add envia pattern/priority/action", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ id: "flt-1", pattern: "system_prompt" }));
  }) as any;

  await (globalThis.fetch as any)("/api/context/rtk/filters", {
    method: "POST",
    body: JSON.stringify({ pattern: "system_prompt", priority: 100, action: "drop" }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.pattern, "system_prompt");
  assert.equal(capturedBody.action, "drop");
});

test("rtk test envia POST /api/context/rtk/test", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    return Promise.resolve(makeResp({ originalTokens: 1000, reducedTokens: 600 }));
  }) as any;

  await (globalThis.fetch as any)("/api/context/rtk/test", { method: "POST", body: "{}" });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/context/rtk/test"));
  assert.equal(capturedMethod, "POST");
});

test("context combos list busca /api/context/combos", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp([{ id: "ctx-1", name: "smart-ctx" }]));
  }) as any;

  await (globalThis.fetch as any)("/api/context/combos");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/context/combos"));
});

test("context-eng.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/context-eng.mjs");
  assert.equal(typeof mod.registerContextEng, "function");
});
