import test from "node:test";
import assert from "node:assert/strict";

import { logRoutingDecision } from "../../src/lib/a2a/routingLogger.ts";

test("logRoutingDecision records a routing decision with generated metadata", () => {
  const decision = logRoutingDecision({
    taskType: "chat",
    comboId: "combo-1",
    providerSelected: "openai",
    modelUsed: "gpt-4o-mini",
    score: 0.91,
    factors: [
      {
        name: "health",
        value: 1,
        weight: 0.5,
        contribution: 0.5,
      },
    ],
    fallbacksTriggered: [],
    success: true,
    latencyMs: 123,
    cost: 0.001,
  });

  assert.equal(typeof decision.requestId, "string");
  assert.match(decision.requestId, /^[0-9a-f-]{36}$/);
  assert.match(decision.timestamp, /^\d{4}-\d{2}-\d{2}T/);
  assert.equal(decision.providerSelected, "openai");
  assert.equal(decision.factors[0].name, "health");
});
