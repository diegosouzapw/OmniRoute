import assert from "node:assert/strict";
import { test } from "node:test";

import { executeCostAnalysis } from "../../src/lib/a2a/skills/costAnalysis.ts";
import type { A2ATask } from "../../src/lib/a2a/taskManager.ts";

// #7879: the cost-analysis A2A skill migrated its local `toNumber` to the
// canonical `@/shared/utils/numeric` helper. This test proves the 0-fallback
// semantics for missing/non-numeric analytics fields still hold after the
// migration (the whole point of the tier-1 move).

function buildTask(): A2ATask {
  const now = new Date().toISOString();
  return {
    id: "test-task",
    skill: "cost-analysis",
    state: "working",
    input: { skill: "cost-analysis", messages: [{ role: "user", content: "cost report" }] },
    artifacts: [],
    events: [],
    metadata: {},
    createdAt: now,
    updatedAt: now,
    expiresAt: now,
  };
}

test("executeCostAnalysis: missing/non-numeric summary fields fall back to 0", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        summary: {
          totalCost: "abc", // non-numeric -> 0
          // totalRequests missing entirely -> 0
          fallbackRatePct: null, // -> 0
        },
        byProvider: {},
        byModel: {},
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )) as typeof fetch;

  const result = await executeCostAnalysis(buildTask());

  assert.equal(result.metadata.totalCost, 0);
  assert.equal(result.metadata.totalRequests, 0);
  assert.equal(result.metadata.providerCosts.length, 0);
  assert.equal(result.metadata.modelCosts.length, 0);
});

test("executeCostAnalysis: numeric-string summary fields coerce correctly", async (t) => {
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });

  globalThis.fetch = (async () =>
    new Response(
      JSON.stringify({
        summary: { totalCost: "12.5", totalRequests: "42", fallbackRatePct: "3.2" },
        byProvider: {
          openai: { cost: "1.5", requests: "3", tokens: "100" },
        },
        byModel: {},
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )) as typeof fetch;

  const result = await executeCostAnalysis(buildTask());

  assert.equal(result.metadata.totalCost, 12.5);
  assert.equal(result.metadata.totalRequests, 42);
  assert.equal(result.metadata.providerCosts[0]?.cost, 1.5);
  assert.equal(result.metadata.providerCosts[0]?.requests, 3);
});
