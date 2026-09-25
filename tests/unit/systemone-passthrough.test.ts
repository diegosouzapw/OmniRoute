import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-systemone-passthrough-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { handleSystemOneProxy } = await import("../../open-sse/handlers/systemone.ts");
const { JEV_INPUT_USD_PER_MTOK, TYPESAFE_SYSTEMONE_URL } =
  await import("../../src/lib/providers/typesafe.ts");
const { computeCostFromPricing } = await import("../../src/lib/usage/costCalculator.ts");
const { getDefaultPricing } = await import("../../src/shared/constants/pricing.ts");
const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const auth = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

const REQUEST_BODY = {
  state: "Help! My payouts have been failing for 3 days.",
  model: "jev-latest",
  questions: {
    is_urgent: { type: "noul", instructions: "Does this convey urgency?" },
  },
};

const UPSTREAM_BODY = {
  model: "jev-1.13.0",
  answers: { is_urgent: { type: "noul", noul: 0.92 } },
  usage: { input_tokens: 1_000_000, output_tokens: 48_000 },
};

test("systemone proxy POSTs the original JSON to api.typesafe.ai with Bearer auth", async () => {
  const originalFetch = globalThis.fetch;
  let captured: { url: string; init: RequestInit } | null = null;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    captured = { url: String(url), init: init || {} };
    return new Response(JSON.stringify(UPSTREAM_BODY), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }) as typeof fetch;

  try {
    const response = await handleSystemOneProxy({
      body: REQUEST_BODY,
      credentials: { apiKey: "ts-test-key", connectionId: "conn-ts-1" },
      saveCallLog: () => {},
    });
    assert.equal(response.status, 200);
    assert.ok(captured);
    assert.equal(captured.url, TYPESAFE_SYSTEMONE_URL);
    assert.equal(captured.init.method, "POST");
    const headers = captured.init.headers as Record<string, string>;
    assert.equal(headers.Authorization, "Bearer ts-test-key");
    assert.equal(captured.init.body, JSON.stringify(REQUEST_BODY));
    const json = (await response.json()) as typeof UPSTREAM_BODY;
    assert.equal(json.model, "jev-1.13.0");
    assert.equal(json.usage.input_tokens, 1_000_000);
    assert.equal(json.usage.output_tokens, 48_000);
    assert.equal(json.answers.is_urgent.noul, 0.92);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("systemone success logs the response model, input tokens, and input-only $0.042/Mtok cost", async () => {
  const originalFetch = globalThis.fetch;
  const logs: Array<Record<string, unknown>> = [];
  globalThis.fetch = (async () =>
    new Response(JSON.stringify(UPSTREAM_BODY), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as typeof fetch;

  try {
    await handleSystemOneProxy({
      body: REQUEST_BODY,
      credentials: { apiKey: "ts-test-key", connectionId: "conn-ts-1" },
      requestedModel: "jev-latest",
      saveCallLog: (entry) => {
        logs.push(entry as unknown as Record<string, unknown>);
      },
    });
    await Promise.resolve();
    assert.equal(logs.length, 1);
    const entry = logs[0];
    assert.equal(entry.model, "jev-1.13.0");
    assert.equal(entry.requestedModel, "jev-latest");
    assert.equal(entry.provider, "typesafe");
    assert.equal(entry.path, "/v1/systemone");
    const tokens = entry.tokens as { input_tokens: number; output_tokens: number };
    assert.equal(tokens.input_tokens, 1_000_000);
    assert.equal(tokens.output_tokens, 48_000);
    const expectedCost = 1_000_000 * (JEV_INPUT_USD_PER_MTOK / 1_000_000);
    assert.equal(entry.costUsd, expectedCost);
    assert.ok((entry.costUsd as number) > 0);
    const outputWouldAdd = 48_000 * (JEV_INPUT_USD_PER_MTOK / 1_000_000);
    assert.notEqual(entry.costUsd, expectedCost + outputWouldAdd);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("systemone default pricing is input-only so output tokens do not add cost", () => {
  const pricing = getDefaultPricing() as Record<
    string,
    Record<string, { input: number; output: number }>
  >;
  const row = pricing.typesafe["jev-1.13.0"];
  assert.equal(row.input, 0.042);
  assert.equal(row.output, 0);
  const cost = computeCostFromPricing(row, {
    input_tokens: 1_000_000,
    output_tokens: 50_000,
  });
  assert.equal(cost, 0.042);
});

test("systemone 429 returns upstream status and cools the credential using retry-after", async () => {
  const originalFetch = globalThis.fetch;
  const conn = await providersDb.createProviderConnection({
    provider: "typesafe",
    authType: "apikey",
    apiKey: "ts-test-key",
    isActive: true,
    testStatus: "active",
  });
  const connId = String(conn.id);
  const before = Date.now();

  globalThis.fetch = (async () =>
    new Response(JSON.stringify({ error: "Too Many Requests" }), {
      status: 429,
      headers: { "Content-Type": "application/json", "retry-after": "12" },
    })) as typeof fetch;

  try {
    const response = await handleSystemOneProxy({
      body: REQUEST_BODY,
      credentials: { apiKey: "ts-test-key", connectionId: connId },
      requestedModel: "jev-latest",
      saveCallLog: () => {},
    });
    assert.equal(response.status, 429);
    const json = (await response.json()) as { error: string };
    assert.equal(json.error, "Too Many Requests");
    assert.equal(response.headers.get("retry-after"), "12");

    const after = await providersDb.getProviderConnectionById(connId);
    assert.ok(after?.rateLimitedUntil, "connection cooldown timestamp must be persisted");
    const untilMs = new Date(String(after.rateLimitedUntil)).getTime();
    assert.ok(
      Number.isFinite(untilMs),
      `rateLimitedUntil must parse, got ${after.rateLimitedUntil}`
    );
    assert.ok(
      untilMs >= before + 11_000 && untilMs <= before + 15_000,
      `expected retry-after 12s cooldown, got ${untilMs - before}ms (until ${after.rateLimitedUntil})`
    );

    const credentials = await auth.getProviderCredentials("typesafe");
    const skipped =
      !credentials ||
      (typeof credentials === "object" &&
        "allRateLimited" in credentials &&
        (credentials as { allRateLimited?: boolean }).allRateLimited === true);
    assert.equal(
      skipped,
      true,
      "cooled typesafe credential must not be selected until retry-after"
    );
  } finally {
    globalThis.fetch = originalFetch;
  }
});
