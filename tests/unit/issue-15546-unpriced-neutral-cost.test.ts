import test from "node:test";
import assert from "node:assert/strict";

import {
  OUTPUT_TOKEN_RATIO,
  resolvePoolCosts,
} from "../../open-sse/services/combo/candidateCost.ts";

type Pricing = { input?: number; output?: number } | null;
const table: Record<string, Pricing> = {
  "anthropic/claude-opus-4-1": { input: 15, output: 75 },
  "openai/gpt-4o-mini": { input: 0.15, output: 0.6 },
  "nvidia/llama-3": { input: 0.5 }, // input only
};
const lookup = async (provider: string, model: string): Promise<Pricing> =>
  table[`${provider}/${model}`] ?? null;

test("priced models blend input/output by OUTPUT_TOKEN_RATIO", async () => {
  const costs = await resolvePoolCosts(
    [{ provider: "anthropic", model: "claude-opus-4-1" }],
    lookup
  );
  assert.equal(
    costs.get("anthropic/claude-opus-4-1"),
    15 * (1 - OUTPUT_TOKEN_RATIO) + 75 * OUTPUT_TOKEN_RATIO
  );
});

test("unpriced model is neutral (pool median of priced), not a flat $1/M", async () => {
  const costs = await resolvePoolCosts(
    [
      { provider: "anthropic", model: "claude-opus-4-1" },
      { provider: "openai", model: "gpt-4o-mini" },
      { provider: "nvidia", model: "llama-3" },
      { provider: "mystery", model: "unknown-x" },
    ],
    lookup
  );
  const known = ["anthropic/claude-opus-4-1", "openai/gpt-4o-mini", "nvidia/llama-3"]
    .map((k) => costs.get(k) as number)
    .sort((a, b) => a - b);
  assert.equal(costs.get("mystery/unknown-x"), known[1]);
  assert.notEqual(costs.get("mystery/unknown-x"), 1);
});

test("unpriced model with no priced peers falls back to 1", async () => {
  const costs = await resolvePoolCosts([{ provider: "mystery", model: "unknown-x" }], lookup);
  assert.equal(costs.get("mystery/unknown-x"), 1);
});

test("lookup retries the bare model name when a namespaced id has no row", async () => {
  const costs = await resolvePoolCosts(
    [
      { provider: "openai", model: "gpt-4o-mini" },
      { provider: "openai", model: "org/gpt-4o-mini" },
    ],
    lookup
  );
  assert.equal(costs.get("openai/org/gpt-4o-mini"), costs.get("openai/gpt-4o-mini"));
});

test("a throwing lookup is treated as unpriced", async () => {
  const costs = await resolvePoolCosts([{ provider: "a", model: "b" }], async () => {
    throw new Error("db down");
  });
  assert.equal(costs.get("a/b"), 1);
});
