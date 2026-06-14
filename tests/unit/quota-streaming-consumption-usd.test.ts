/**
 * tests/unit/quota-streaming-consumption-usd.test.ts
 *
 * Regression: the streaming quota-share POST-hook in chatCore recorded
 * `usd: 0` hardcoded, so USD-unit shared pools (e.g. DeepSeek `usd/monthly`)
 * never accrued cost on STREAMING traffic — the dominant request shape — and
 * therefore never blocked. The non-streaming path correctly used the computed
 * `estimatedCost`.
 *
 * Fix: extract a testable `recordStreamingConsumption` (with injectable
 * `calculateCost` + `schedule`) and a shared `buildConsumptionCost`, and wire
 * the real estimated cost into the streaming consumption record.
 */
import test from "node:test";
import assert from "node:assert/strict";
import type { RecordConsumptionInput } from "../../src/lib/quota/types.ts";

test("buildConsumptionCost — flows estimatedCost into usd (not hardcoded 0)", async () => {
  const { buildConsumptionCost } = await import("../../src/lib/quota/spendRecorder.ts");
  const cost = buildConsumptionCost({ prompt_tokens: 1000, completion_tokens: 500 }, 0.0234);
  assert.equal(cost.tokens, 1500);
  assert.equal(cost.usd, 0.0234);
  assert.equal(cost.requests, 1);
});

test("buildConsumptionCost — null usage → tokens 0, usd 0, requests 1", async () => {
  const { buildConsumptionCost } = await import("../../src/lib/quota/spendRecorder.ts");
  const cost = buildConsumptionCost(null, 0);
  assert.deepEqual(cost, { tokens: 0, usd: 0, requests: 1 });
});

test("buildConsumptionCost — coerces string tokens, clamps negative cost to 0", async () => {
  const { buildConsumptionCost } = await import("../../src/lib/quota/spendRecorder.ts");
  const cost = buildConsumptionCost({ prompt_tokens: "10", completion_tokens: "5" }, -1);
  assert.equal(cost.tokens, 15);
  assert.equal(cost.usd, 0);
});

test("recordStreamingConsumption — records REAL usd for a 200 stream (regression: was 0)", async () => {
  const { recordStreamingConsumption } = await import("../../src/lib/quota/spendRecorder.ts");
  const scheduled: RecordConsumptionInput[] = [];
  let calcArgs: { p: string; m: string } | null = null;
  await recordStreamingConsumption(
    {
      apiKeyId: "key-1",
      connectionId: "conn-1",
      provider: "deepseek",
      model: "deepseek-chat",
      streamUsage: { prompt_tokens: 2000, completion_tokens: 1000 },
      streamStatus: 200,
    },
    {
      calculateCost: async (p: string, m: string) => {
        calcArgs = { p, m };
        return 0.042;
      },
      schedule: (input) => scheduled.push(input),
    }
  );
  assert.equal(scheduled.length, 1);
  assert.equal(scheduled[0].cost.usd, 0.042, "streaming usd must reflect calculateCost, not 0");
  assert.equal(scheduled[0].cost.tokens, 3000);
  assert.equal(scheduled[0].cost.requests, 1);
  assert.equal(scheduled[0].apiKeyId, "key-1");
  assert.equal(scheduled[0].connectionId, "conn-1");
  assert.equal(scheduled[0].provider, "deepseek");
  assert.ok(calcArgs);
  assert.equal(calcArgs!.p, "deepseek");
  assert.equal(calcArgs!.m, "deepseek-chat");
});

test("recordStreamingConsumption — skips non-200 streams entirely", async () => {
  const { recordStreamingConsumption } = await import("../../src/lib/quota/spendRecorder.ts");
  const scheduled: RecordConsumptionInput[] = [];
  let calcCalled = false;
  await recordStreamingConsumption(
    {
      apiKeyId: "k",
      connectionId: "c",
      provider: "openai",
      model: "gpt-4",
      streamUsage: { prompt_tokens: 1 },
      streamStatus: 500,
    },
    {
      calculateCost: async () => {
        calcCalled = true;
        return 1;
      },
      schedule: (input) => scheduled.push(input),
    }
  );
  assert.equal(scheduled.length, 0);
  assert.equal(calcCalled, false);
});

test("recordStreamingConsumption — null usage still records requests:1 (usd 0), no cost call", async () => {
  const { recordStreamingConsumption } = await import("../../src/lib/quota/spendRecorder.ts");
  const scheduled: RecordConsumptionInput[] = [];
  let calcCalled = false;
  await recordStreamingConsumption(
    {
      apiKeyId: "k",
      connectionId: "c",
      provider: "openai",
      model: "gpt-4",
      streamUsage: null,
      streamStatus: 200,
    },
    {
      calculateCost: async () => {
        calcCalled = true;
        return 1;
      },
      schedule: (input) => scheduled.push(input),
    }
  );
  assert.equal(scheduled.length, 1);
  assert.equal(scheduled[0].cost.usd, 0);
  assert.equal(scheduled[0].cost.requests, 1);
  assert.equal(calcCalled, false, "no usage → no cost computation");
});

test("recordStreamingConsumption — missing apiKeyId/connectionId → no-op", async () => {
  const { recordStreamingConsumption } = await import("../../src/lib/quota/spendRecorder.ts");
  const scheduled: RecordConsumptionInput[] = [];
  await recordStreamingConsumption(
    {
      apiKeyId: null,
      connectionId: "c",
      provider: "openai",
      model: "gpt-4",
      streamUsage: { prompt_tokens: 1 },
      streamStatus: 200,
    },
    { calculateCost: async () => 1, schedule: (input) => scheduled.push(input) }
  );
  await recordStreamingConsumption(
    {
      apiKeyId: "k",
      connectionId: null,
      provider: "openai",
      model: "gpt-4",
      streamUsage: { prompt_tokens: 1 },
      streamStatus: 200,
    },
    { calculateCost: async () => 1, schedule: (input) => scheduled.push(input) }
  );
  assert.equal(scheduled.length, 0);
});

test("recordStreamingConsumption — calculateCost throwing → records usd 0, never throws", async () => {
  const { recordStreamingConsumption } = await import("../../src/lib/quota/spendRecorder.ts");
  const scheduled: RecordConsumptionInput[] = [];
  await recordStreamingConsumption(
    {
      apiKeyId: "k",
      connectionId: "c",
      provider: "openai",
      model: "gpt-4",
      streamUsage: { prompt_tokens: 100 },
      streamStatus: 200,
    },
    {
      calculateCost: async () => {
        throw new Error("pricing unavailable");
      },
      schedule: (input) => scheduled.push(input),
    }
  );
  assert.equal(scheduled.length, 1);
  assert.equal(scheduled[0].cost.usd, 0);
  assert.equal(scheduled[0].cost.tokens, 100);
});
