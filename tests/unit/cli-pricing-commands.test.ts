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

test("runPricingSync chama POST /api/pricing/sync", async () => {
  let capturedUrl = "";
  let capturedMethod = "";
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    capturedMethod = opts?.method ?? "GET";
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ updated: 42, synced: true }));
  }) as any;

  const { runPricingSync } = await import("../../bin/cli/commands/pricing.mjs");
  await captureStdout(() => runPricingSync({ provider: "openai", force: true }, makeCmd() as any));

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/pricing/sync"));
  assert.equal(capturedMethod, "POST");
  assert.equal(capturedBody.provider, "openai");
  assert.equal(capturedBody.force, true);
});

test("runPricingList busca /api/pricing com filtros", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ items: [] }));
  }) as any;

  const { runPricingList } = await import("../../bin/cli/commands/pricing.mjs");
  await captureStdout(() =>
    runPricingList({ provider: "anthropic", model: "claude-3", limit: 50 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/pricing"));
  assert.ok(capturedUrl.includes("provider=anthropic"));
  assert.ok(capturedUrl.includes("model=claude-3"));
});

test("pricing get busca modelo específico", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ model: "gpt-4o", inputPer1M: 2.5, outputPer1M: 10.0 }));
  }) as any;

  await (globalThis.fetch as any)("/api/pricing?model=gpt-4o");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("model=gpt-4o"));
});

test("pricing defaults show busca /api/pricing/defaults", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ inputPer1M: 1.0, outputPer1M: 3.0 }));
  }) as any;

  await (globalThis.fetch as any)("/api/pricing/defaults");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/pricing/defaults"));
});

test("pricing defaults set envia body correto", async () => {
  let capturedBody: any = null;
  let capturedMethod = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    capturedMethod = opts?.method ?? "GET";
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ inputPer1M: 1.5, outputPer1M: 5.0 }));
  }) as any;

  await (globalThis.fetch as any)("/api/pricing/defaults", {
    method: "PUT",
    body: JSON.stringify({ inputPer1M: 1.5, outputPer1M: 5.0 }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedMethod, "PUT");
  assert.equal(capturedBody.inputPer1M, 1.5);
  assert.equal(capturedBody.outputPer1M, 5.0);
});

test("pricing diff passa diff=true na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ diff: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/pricing?diff=true");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("diff=true"));
});

test("pricing.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/pricing.mjs");
  assert.equal(typeof mod.registerPricing, "function");
  assert.equal(typeof mod.runPricingSync, "function");
  assert.equal(typeof mod.runPricingList, "function");
});
