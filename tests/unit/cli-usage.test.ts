import test from "node:test";
import assert from "node:assert/strict";

const ANALYTICS_DATA = {
  byProvider: [
    {
      provider: "openai",
      totalRequests: 100,
      totalTokensIn: 40000,
      totalTokensOut: 16000,
      totalCost: 0.35,
    },
    {
      provider: "anthropic",
      totalRequests: 50,
      totalTokensIn: 20000,
      totalTokensOut: 8000,
      totalCost: 0.15,
    },
  ],
};
const BUDGET_DATA = {
  budgets: [
    { scope: "global", period: "monthly", limit: 100, used: 42.5, remaining: 57.5, pct: 0.425 },
  ],
};
const QUOTA_DATA = {
  providers: [
    { provider: "openai", limit: 1000000, used: 500000, remaining: 500000, state: "available" },
  ],
};
const LOGS_DATA = {
  logs: [
    {
      id: "1",
      createdAt: "2026-05-15T10:00:00Z",
      apiKey: "sk-test-key",
      provider: "openai",
      model: "gpt-4o",
      tokensIn: 100,
      tokensOut: 50,
      cost: 0.001,
      latencyMs: 500,
      status: 200,
    },
    {
      id: "2",
      createdAt: "2026-05-15T10:01:00Z",
      apiKey: "sk-test-key",
      provider: "anthropic",
      model: "claude-3-5-sonnet",
      tokensIn: 80,
      tokensOut: 40,
      cost: 0.0008,
      latencyMs: 400,
      status: 200,
    },
  ],
};
const UTILIZATION_DATA = [{ apiKey: "sk-test-key", requests: 150, cost: 0.5, avgLatency: 450 }];
const HISTORY_DATA = { items: [{ id: "a", model: "gpt-4o", provider: "openai", cost: 0.01 }] };
const PROXY_LOGS_DATA = {
  logs: [{ id: "p1", path: "/v1/chat/completions", method: "POST", status: 200 }],
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

function mockFetch(overrides: Record<string, unknown> = {}) {
  return (url: string) => {
    if (url.includes("/api/usage/analytics"))
      return Promise.resolve(makeResp(overrides.analytics ?? ANALYTICS_DATA));
    if (url.includes("/api/usage/budget"))
      return Promise.resolve(makeResp(overrides.budget ?? BUDGET_DATA));
    if (url.includes("/api/usage/quota"))
      return Promise.resolve(makeResp(overrides.quota ?? QUOTA_DATA));
    if (url.includes("/api/usage/call-logs"))
      return Promise.resolve(makeResp(overrides.logs ?? LOGS_DATA));
    if (url.includes("/api/usage/utilization"))
      return Promise.resolve(makeResp(overrides.utilization ?? UTILIZATION_DATA));
    if (url.includes("/api/usage/history"))
      return Promise.resolve(makeResp(overrides.history ?? HISTORY_DATA));
    if (url.includes("/api/usage/proxy-logs"))
      return Promise.resolve(makeResp(overrides.proxyLogs ?? PROXY_LOGS_DATA));
    return Promise.resolve(makeResp({}, 404));
  };
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

test("runUsageAnalytics exibe providers em json", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runUsageAnalytics } = await import("../../bin/cli/commands/usage.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const out = await captureStdout(() => runUsageAnalytics({ period: "30d" }, cmd as any));

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed[0].provider, "openai");
  assert.ok(parsed[0].costUsd > 0);
});

test("runBudgetList exibe budgets", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runBudgetList } = await import("../../bin/cli/commands/usage.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const out = await captureStdout(() => runBudgetList({}, cmd as any));

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed[0].scope, "global");
  assert.ok(parsed[0].limit > 0);
});

test("runUsageQuota exibe providers de quota", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runUsageQuota } = await import("../../bin/cli/commands/usage.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const out = await captureStdout(() => runUsageQuota({}, cmd as any));

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed[0].provider, "openai");
});

test("runUsageLogs exibe logs com mascaramento de API key", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runUsageLogs } = await import("../../bin/cli/commands/usage.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "table", quiet: false }) };
  const out = await captureStdout(() => runUsageLogs({ limit: 10 }, cmd as any));

  globalThis.fetch = origFetch;
  assert.ok(!out.includes("sk-test-key") || out.includes("***"));
});

test("runUsageLogs --output json retorna rows com campos esperados", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runUsageLogs } = await import("../../bin/cli/commands/usage.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const out = await captureStdout(() => runUsageLogs({ limit: 10 }, cmd as any));

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.equal(parsed.length, 2);
  assert.ok(typeof parsed[0].provider === "string");
  assert.ok(typeof parsed[0].tokens === "number");
});

test("runUsageHistory exibe histórico", async () => {
  const origFetch = globalThis.fetch;
  globalThis.fetch = mockFetch() as any;

  const { runUsageHistory } = await import("../../bin/cli/commands/usage.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "json", quiet: true }) };
  const out = await captureStdout(() => runUsageHistory({ limit: 50 }, cmd as any));

  globalThis.fetch = origFetch;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
  assert.ok(parsed.length >= 1);
});

test("runBudgetSet envia POST com amount, scope e period", async () => {
  let capturedBody: unknown = null;
  const origFetch = globalThis.fetch;
  globalThis.fetch = ((url: string, init: any) => {
    if (url.includes("/api/usage/budget") && init?.method === "POST") {
      capturedBody = JSON.parse(init.body);
    }
    return Promise.resolve(makeResp({ ok: true }));
  }) as any;

  const { runBudgetSet } = await import("../../bin/cli/commands/usage.mjs");
  const cmd = { optsWithGlobals: () => ({ output: "table", quiet: false }) };
  await captureStdout(() => runBudgetSet("50", { scope: "global", period: "monthly" }, cmd as any));

  globalThis.fetch = origFetch;
  assert.ok(capturedBody !== null);
  assert.equal((capturedBody as any).amount, 50);
  assert.equal((capturedBody as any).scope, "global");
});
