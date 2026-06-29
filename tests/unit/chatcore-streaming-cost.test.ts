// Characterization of recordStreamingCost — the streaming per-request cost recording extracted
// from handleChatCore's onStreamComplete (chatCore god-file decomposition, #3501). Sync
// fire-and-forget; calculateCost and recordCost are injected, so both are observable without a DB.
// Locks: the guard (missing api-key OR usage → no-op), recordCost with the resolved cost, and the
// estimatedCost<=0 skip.
import { test } from "node:test";
import assert from "node:assert/strict";

const { recordStreamingCost } = await import(
  "../../open-sse/handlers/chatCore/streamingCost.ts"
);

function spies(costValue: number) {
  const recorded: Array<{ apiKeyId: string; cost: number }> = [];
  const costArgs: Array<{ provider: string; model: string }> = [];
  return {
    recorded,
    costArgs,
    calculateCost: async (provider: string, model: string) => {
      costArgs.push({ provider, model });
      return costValue;
    },
    recordCost: (apiKeyId: string, cost: number) => {
      recorded.push({ apiKeyId, cost });
    },
  };
}

async function waitFor(pred: () => boolean, timeoutMs = 2000): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline && !pred()) {
    await new Promise((r) => setTimeout(r, 10));
  }
}

test("missing apiKeyId → no-op (calculateCost never called)", async () => {
  const s = spies(0.5);
  recordStreamingCost({
    apiKeyId: null,
    provider: "openai",
    model: "gpt-x",
    streamUsage: { prompt_tokens: 10 },
    serviceTier: "standard",
    calculateCost: s.calculateCost,
    recordCost: s.recordCost,
  });
  await new Promise((r) => setTimeout(r, 50));
  assert.equal(s.costArgs.length, 0);
  assert.equal(s.recorded.length, 0);
});

test("missing streamUsage → no-op", async () => {
  const s = spies(0.5);
  recordStreamingCost({
    apiKeyId: "key-1",
    provider: "openai",
    model: "gpt-x",
    streamUsage: null,
    calculateCost: s.calculateCost,
    recordCost: s.recordCost,
  });
  await new Promise((r) => setTimeout(r, 50));
  assert.equal(s.costArgs.length, 0);
  assert.equal(s.recorded.length, 0);
});

test("valid input records the resolved cost against the api key", async () => {
  const s = spies(0.0073);
  recordStreamingCost({
    apiKeyId: "key-1",
    provider: "deepseek",
    model: "deepseek-chat",
    streamUsage: { prompt_tokens: 100, completion_tokens: 50 },
    serviceTier: "standard",
    calculateCost: s.calculateCost,
    recordCost: s.recordCost,
  });
  await waitFor(() => s.recorded.length > 0);
  assert.equal(s.costArgs[0].provider, "deepseek");
  assert.equal(s.recorded.length, 1);
  assert.equal(s.recorded[0].apiKeyId, "key-1");
  assert.equal(s.recorded[0].cost, 0.0073);
});

test("estimatedCost <= 0 does not record", async () => {
  const s = spies(0);
  recordStreamingCost({
    apiKeyId: "key-1",
    provider: "openai",
    model: "gpt-x",
    streamUsage: { prompt_tokens: 1 },
    calculateCost: s.calculateCost,
    recordCost: s.recordCost,
  });
  await waitFor(() => s.costArgs.length > 0);
  await new Promise((r) => setTimeout(r, 30));
  assert.equal(s.costArgs.length, 1);
  assert.equal(s.recorded.length, 0);
});
