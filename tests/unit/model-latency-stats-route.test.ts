import assert from "node:assert/strict";
import test from "node:test";

const route = await import("../../src/app/api/usage/model-latency-stats/route.ts");
const usageHistory = await import("../../src/lib/usage/usageHistory.ts");
const localDb = await import("../../src/lib/localDb.ts");

const CONNECTION_ENTRY = {
  provider: "openai",
  model: "gpt-4o",
  connectionId: "primary",
  key: "openai/gpt-4o/primary",
  totalRequests: 12,
  successfulRequests: 11,
  successRate: 11 / 12,
  avgLatencyMs: 240,
  avgTtftMs: 120,
  avgTokensPerSecond: 38.5,
  p50LatencyMs: 220,
  p95LatencyMs: 390,
  p99LatencyMs: 410,
  latencyStdDev: 35,
  windowHours: 24,
};

test("validates and defaults model latency query parameters", () => {
  const parsed = route.parseModelLatencyStatsQuery(
    "http://localhost/api/usage/model-latency-stats?provider=openai&connectionId=primary"
  );

  assert.equal(parsed.success, true);
  if (!parsed.success) return;
  assert.equal(parsed.data.windowHours, 24);
  assert.equal(parsed.data.minSamples, 1);
  assert.equal(parsed.data.maxRows, 10_000);
  assert.equal(parsed.data.keyByConnectionId, true);
  assert.equal(parsed.data.connectionId, "primary");
});

test("rejects out-of-bounds and invalid query parameters", () => {
  assert.equal(
    route.parseModelLatencyStatsQuery(
      "http://localhost/api/usage/model-latency-stats?windowHours=0"
    ).success,
    false
  );
  assert.equal(
    route.parseModelLatencyStatsQuery(
      "http://localhost/api/usage/model-latency-stats?keyByConnectionId=yes"
    ).success,
    false
  );
});

test("preserves connection-qualified TTFT, TPS, and evidence fields", async () => {
  let receivedOptions: unknown;
  const parsed = route.parseModelLatencyStatsQuery(
    "http://localhost/api/usage/model-latency-stats?windowHours=6&minSamples=2&connectionId=primary"
  );
  assert.equal(parsed.success, true);
  if (!parsed.success) return;

  const response = await route.buildModelLatencyStatsResponse(parsed.data, async (options) => {
    receivedOptions = options;
    return { [CONNECTION_ENTRY.key]: CONNECTION_ENTRY };
  });

  assert.deepEqual(receivedOptions, {
    windowHours: 6,
    minSamples: 2,
    maxRows: 10_000,
    connectionId: "primary",
    keyByConnectionId: true,
  });
  assert.equal(response.count, 1);
  assert.equal(response.entries[0].connectionId, "primary");
  assert.equal(response.entries[0].totalRequests, 12);
  assert.equal(response.entries[0].successfulRequests, 11);
  assert.equal(response.entries[0].avgTtftMs, 120);
  assert.equal(response.entries[0].avgTokensPerSecond, 38.5);
});

test("filters entries and supports aggregate mode", async () => {
  const parsed = route.parseModelLatencyStatsQuery(
    "http://localhost/api/usage/model-latency-stats?provider=openai&model=gpt-4o&keyByConnectionId=false"
  );
  assert.equal(parsed.success, true);
  if (!parsed.success) return;

  const response = await route.buildModelLatencyStatsResponse(parsed.data, async () => ({
    "openai/gpt-4o": { ...CONNECTION_ENTRY, key: "openai/gpt-4o", connectionId: undefined },
    "anthropic/claude": {
      ...CONNECTION_ENTRY,
      provider: "anthropic",
      model: "claude",
      key: "anthropic/claude",
      connectionId: undefined,
    },
  }));

  assert.equal(response.keyByConnectionId, false);
  assert.equal(response.count, 1);
  assert.equal(response.entries[0].key, "openai/gpt-4o");
});

test("GET returns latency entries from usage history", async () => {
  const timestamp = new Date(Date.now() - 60_000).toISOString();
  await usageHistory.saveRequestUsage({
    provider: "openai",
    model: "gpt-4o",
    connectionId: "primary",
    success: true,
    latencyMs: 240,
    timeToFirstTokenMs: 120,
    tokens: { input: 10, output: 100 },
    timestamp,
  });

  const response = await route.GET(
    new Request(
      "http://localhost/api/usage/model-latency-stats?windowHours=1&minSamples=1&provider=openai"
    )
  );

  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.count, 1);
  assert.equal(body.entries[0].provider, "openai");
  assert.equal(body.entries[0].connectionId, "primary");
  assert.equal(body.entries[0].avgTtftMs, 120);
});

test("GET returns a structured 400 for invalid latency query parameters", async () => {
  const response = await route.GET(
    new Request("http://localhost/api/usage/model-latency-stats?minSamples=0")
  );

  assert.equal(response.status, 400);
  const body = await response.json();
  assert.equal(body.error?.message, "Too small: expected number to be >0");
});

test("GET returns a structured 500 when latency stats loading fails", async () => {
  await localDb.updateSettings({ requireLogin: false });
  const request = {
    headers: new Headers(),
    get url() {
      throw new Error("malformed request URL");
    },
  };
  const response = await route.GET(request as Request);
  assert.equal(response.status, 500);
  const body = await response.json();
  assert.equal(body.error?.message, "Failed to load model latency stats");
});
