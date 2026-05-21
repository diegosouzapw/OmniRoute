import test from "node:test";
import assert from "node:assert/strict";

const METRICS_OBJECT = {
  metrics: {
    openai: { totalRequests: 200, successRate: 0.97, avgLatencyMs: 450, errors: 6 },
    anthropic: { totalRequests: 120, successRate: 0.99, avgLatencyMs: 320, errors: 1 },
    gemini: { totalRequests: 80, successRate: 0.95, avgLatencyMs: 600, errors: 4 },
  },
};

const METRICS_ARRAY = {
  providers: [
    { provider: "openai", requests: 200, successRate: 0.97, avgLatencyMs: 450, errors: 6 },
    { provider: "anthropic", requests: 120, successRate: 0.99, avgLatencyMs: 320, errors: 1 },
  ],
};

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

test("runProvidersMetrics --output json normaliza objeto de metrics", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = (() => Promise.resolve(makeResp(METRICS_OBJECT))) as any;

  const { runProvidersMetrics } = await import("../../bin/cli/commands/providers.mjs");
  const out = await captureStdout(() =>
    runProvidersMetrics({ period: "24h", limit: 50 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed.length, 3);
  assert.ok(parsed.some((r: any) => r.provider === "openai"));
  assert.ok(parsed.some((r: any) => r.provider === "anthropic"));
});

test("runProvidersMetrics --output json aceita array de providers", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = (() => Promise.resolve(makeResp(METRICS_ARRAY))) as any;

  const { runProvidersMetrics } = await import("../../bin/cli/commands/providers.mjs");
  const out = await captureStdout(() =>
    runProvidersMetrics({ period: "24h", limit: 50 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.ok(parsed.length >= 1);
  assert.ok(parsed.some((r: any) => r.provider === "openai"));
});

test("runProvidersMetrics --limit trunca resultado", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = (() => Promise.resolve(makeResp(METRICS_OBJECT))) as any;

  const { runProvidersMetrics } = await import("../../bin/cli/commands/providers.mjs");
  const out = await captureStdout(() =>
    runProvidersMetrics({ period: "24h", limit: 2 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.equal(parsed.length, 2);
});

test("runProvidersMetrics envia --provider na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp(METRICS_OBJECT));
  }) as any;

  const { runProvidersMetrics } = await import("../../bin/cli/commands/providers.mjs");
  await captureStdout(() =>
    runProvidersMetrics({ period: "7d", provider: "openai", limit: 50 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("provider=openai"));
  assert.ok(capturedUrl.includes("period=7d"));
});

test("runProvidersMetrics exibe tabela com success rate formatada", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = (() => Promise.resolve(makeResp(METRICS_OBJECT))) as any;

  const { runProvidersMetrics } = await import("../../bin/cli/commands/providers.mjs");
  const out = await captureStdout(() =>
    runProvidersMetrics({ period: "24h", limit: 50 }, makeCmd("table") as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(out.includes("openai") || out.includes("Provider"));
  assert.ok(out.includes("%") || out.includes("Success"));
});

test("runProvidersMetrics retorna vazio quando endpoint retorna 404", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = (() => Promise.resolve(makeResp({}, 404))) as any;

  const { runProvidersMetrics } = await import("../../bin/cli/commands/providers.mjs");
  const out = await captureStdout(() =>
    runProvidersMetrics({ period: "24h", limit: 50 }, makeCmd() as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed.length, 0);
});
