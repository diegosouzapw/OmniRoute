import test from "node:test";
import assert from "node:assert/strict";

const ANALYTICS_RESPONSE = {
  byProvider: [
    {
      provider: "openai",
      totalRequests: 150,
      totalTokensIn: 50000,
      totalTokensOut: 20000,
      totalCost: 0.42,
    },
    {
      provider: "anthropic",
      totalRequests: 80,
      totalTokensIn: 30000,
      totalTokensOut: 12000,
      totalCost: 0.18,
    },
  ],
  byModel: [
    {
      model: "gpt-4o",
      totalRequests: 100,
      totalTokensIn: 40000,
      totalTokensOut: 16000,
      totalCost: 0.35,
    },
    {
      model: "claude-3-5-sonnet",
      totalRequests: 80,
      totalTokensIn: 30000,
      totalTokensOut: 12000,
      totalCost: 0.18,
    },
  ],
  byDay: [
    {
      date: "2026-05-14",
      totalRequests: 50,
      totalTokensIn: 20000,
      totalTokensOut: 8000,
      totalCost: 0.15,
    },
    {
      date: "2026-05-15",
      totalRequests: 60,
      totalTokensIn: 22000,
      totalTokensOut: 9000,
      totalCost: 0.17,
    },
  ],
};

function makeResp(data: unknown, status = 200) {
  const obj = {
    ok: status < 400,
    status,
    exitCode: status >= 200 && status < 300 ? 0 : 1,
    json: () => Promise.resolve(data),
    text: () => Promise.resolve(JSON.stringify(data)),
    headers: new Headers(),
  };
  obj.json = obj.json.bind(obj);
  obj.text = obj.text.bind(obj);
  return obj;
}

function mockFetch() {
  return (url: string) => {
    if (url.includes("/api/usage/analytics")) {
      return Promise.resolve(makeResp(ANALYTICS_RESPONSE));
    }
    return Promise.resolve(makeResp({}, 404));
  };
}

async function captureOutput(fn: () => Promise<void>): Promise<{ stdout: string; stderr: string }> {
  const out: string[] = [];
  const err: string[] = [];
  const origOut = process.stdout.write.bind(process.stdout);
  const origErr = process.stderr.write.bind(process.stderr);
  process.stdout.write = (c: string | Uint8Array) => {
    out.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  process.stderr.write = (c: string | Uint8Array) => {
    err.push(typeof c === "string" ? c : c.toString());
    return true;
  };
  try {
    await fn();
  } finally {
    process.stdout.write = origOut;
    process.stderr.write = origErr;
  }
  return { stdout: out.join(""), stderr: err.join("") };
}

test("runCostCommand exibe tabela com provedores", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runCostCommand } = await import("../../bin/cli/commands/cost.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "table", quiet: false }) };
  const { stdout } = await captureOutput(() =>
    runCostCommand({ period: "30d", groupBy: "provider", limit: 100 }, cmd as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(stdout.includes("openai") || stdout.includes("Group"));
});

test("runCostCommand --output json retorna array de rows", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runCostCommand } = await import("../../bin/cli/commands/cost.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const { stdout } = await captureOutput(() =>
    runCostCommand({ period: "30d", groupBy: "provider", limit: 100 }, cmd as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(stdout);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].group, "openai");
  assert.ok(parsed[0].costUsd > 0);
  assert.ok(parsed[0].costPct > 0);
});

test("runCostCommand --group-by model usa byModel do response", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runCostCommand } = await import("../../bin/cli/commands/cost.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const { stdout } = await captureOutput(() =>
    runCostCommand({ period: "7d", groupBy: "model", limit: 100 }, cmd as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(stdout);
  assert.ok(Array.isArray(parsed));
  assert.ok(parsed.some((r: any) => r.group === "gpt-4o"));
});

test("runCostCommand --group-by day usa byDay do response", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runCostCommand } = await import("../../bin/cli/commands/cost.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const { stdout } = await captureOutput(() =>
    runCostCommand({ period: "7d", groupBy: "day", limit: 100 }, cmd as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(stdout);
  assert.ok(Array.isArray(parsed));
  assert.ok(parsed.some((r: any) => r.group.includes("2026-05")));
});

test("runCostCommand imprime total em stderr", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runCostCommand } = await import("../../bin/cli/commands/cost.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "table", quiet: false }) };
  const { stderr } = await captureOutput(() =>
    runCostCommand({ period: "30d", groupBy: "provider", limit: 100 }, cmd as any)
  );

  globalThis.fetch = origFetch;
  assert.ok(stderr.includes("Total:") && stderr.includes("$"));
});

test("runCostCommand --since/--until envia startDate/endDate na query", async () => {
  let capturedUrl = "";
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string) => {
    capturedUrl = url;
    return Promise.resolve(makeResp(ANALYTICS_RESPONSE));
  }) as any;

  const { runCostCommand } = await import("../../bin/cli/commands/cost.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  await captureOutput(() =>
    runCostCommand(
      { since: "2026-01-01", until: "2026-05-01", groupBy: "provider", limit: 100 },
      cmd as any
    )
  );

  globalThis.fetch = origFetch;
  assert.ok(capturedUrl.includes("startDate=2026-01-01"));
  assert.ok(capturedUrl.includes("endDate=2026-05-01"));
  assert.ok(!capturedUrl.includes("range="));
});

test("runCostCommand --limit trunca resultado", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runCostCommand } = await import("../../bin/cli/commands/cost.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const { stdout } = await captureOutput(() =>
    runCostCommand({ period: "30d", groupBy: "provider", limit: 1 }, cmd as any)
  );

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(stdout);
  assert.equal(parsed.length, 1);
});
