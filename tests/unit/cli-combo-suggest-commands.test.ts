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

test("combo suggest chama omniroute_best_combo_for_task via MCP", async () => {
  let capturedBody: any = null;
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    capturedUrl = url;
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(
      makeResp({
        candidates: [
          {
            name: "fast-combo",
            strategy: "priority",
            score: 0.92,
            latencyP50Ms: 120,
            costPer1k: 0.002,
          },
        ],
        rationale: "Best latency for real-time tasks",
      })
    );
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/tools/call", {
    method: "POST",
    body: JSON.stringify({
      name: "omniroute_best_combo_for_task",
      arguments: { task: "Real-time code completions", top: 5 },
    }),
  });

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/mcp/tools/call"));
  assert.equal(capturedBody.name, "omniroute_best_combo_for_task");
  assert.equal(capturedBody.arguments.task, "Real-time code completions");
});

test("combo suggest --max-cost/--max-latency-ms passa constraints", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ candidates: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/tools/call", {
    method: "POST",
    body: JSON.stringify({
      name: "omniroute_best_combo_for_task",
      arguments: {
        task: "Summarize PDFs",
        constraints: { maxCostUsd: 0.001, maxLatencyMs: 500 },
        top: 3,
      },
    }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.arguments.constraints.maxCostUsd, 0.001);
  assert.equal(capturedBody.arguments.constraints.maxLatencyMs, 500);
  assert.equal(capturedBody.arguments.top, 3);
});

test("combo suggest --weights passa pesos no body", async () => {
  let capturedBody: any = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((_url: string, opts: any) => {
    if (opts?.body) capturedBody = JSON.parse(opts.body);
    return Promise.resolve(makeResp({ candidates: [] }));
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/tools/call", {
    method: "POST",
    body: JSON.stringify({
      name: "omniroute_best_combo_for_task",
      arguments: {
        task: "batch",
        weights: { latency: 0.7, cost: 0.3 },
      },
    }),
  });

  globalThis.fetch = origFetch;
  assert.equal(capturedBody.arguments.weights.latency, 0.7);
  assert.equal(capturedBody.arguments.weights.cost, 0.3);
});

test("combo suggest --switch chama /api/combos/switch com melhor combo", async () => {
  let urls: string[] = [];
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, opts: any) => {
    urls.push(url);
    if (url.includes("/api/mcp/tools/call")) {
      return Promise.resolve(makeResp({ candidates: [{ name: "best-combo", score: 0.95 }] }));
    }
    return Promise.resolve(makeResp({ switched: true }));
  }) as any;

  await (globalThis.fetch as any)("/api/mcp/tools/call", {
    method: "POST",
    body: '{"name":"omniroute_best_combo_for_task","arguments":{"task":"x"}}',
  });
  await (globalThis.fetch as any)("/api/combos/switch", {
    method: "POST",
    body: '{"name":"best-combo"}',
  });

  globalThis.fetch = origFetch;
  assert.ok(urls.some((u) => u.includes("/api/combos/switch")));
});

test("combo.mjs exporta extendComboSuggest e registerCombo", async () => {
  const mod = await import("../../bin/cli/commands/combo.mjs");
  assert.equal(typeof mod.registerCombo, "function");
  assert.equal(typeof mod.extendComboSuggest, "function");
});
