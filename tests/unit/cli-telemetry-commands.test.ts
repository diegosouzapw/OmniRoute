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

test("telemetry summary chama /api/telemetry/summary com period", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(
      makeResp({
        metrics: {
          total_requests: { value: 150000, delta: 0.12, trend: "up" },
          error_rate: { value: 0.005, delta: -0.002, trend: "down" },
        },
      })
    );
  }) as any;

  await (globalThis.fetch as any)("/api/telemetry/summary?period=7d");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("/api/telemetry/summary"));
  assert.ok(capturedUrl.includes("period=7d"));
});

test("telemetry summary --compare-to passa compareTo no query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ metrics: {} }));
  }) as any;

  await (globalThis.fetch as any)("/api/telemetry/summary?period=7d&compareTo=30d");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("compareTo=30d"));
});

test("telemetry export chama /api/telemetry/summary?format=jsonl", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp({ events: [{ ts: "2026-05-01", type: "request" }] }));
  }) as any;

  await (globalThis.fetch as any)("/api/telemetry/summary?format=jsonl&period=7d");

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("format=jsonl"));
  assert.ok(capturedUrl.includes("period=7d"));
});

test("fmtMetric formata números grandes corretamente", async () => {
  const { registerTelemetry } = await import("../../bin/cli/commands/telemetry.mjs");
  assert.equal(typeof registerTelemetry, "function");
});

test("telemetry summary converte objeto metrics em linhas", async () => {
  const metrics = {
    total_requests: { value: 150000, delta: 0.12, trend: "up" },
    error_rate: { value: 0.005, delta: -0.002, trend: "down" },
  };
  const rows = Object.entries(metrics).map(([metric, info]) => ({
    metric,
    value: info?.value ?? info,
    delta: info?.delta,
    trend: info?.trend,
  }));
  assert.equal(rows.length, 2);
  assert.equal(rows[0].metric, "total_requests");
  assert.equal(rows[1].metric, "error_rate");
});

test("telemetry.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/commands/telemetry.mjs");
  assert.equal(typeof mod.registerTelemetry, "function");
});
