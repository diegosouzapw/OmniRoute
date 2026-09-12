import test from "node:test";
import assert from "node:assert/strict";
import { attemptCompatRejectedFallback } from "../../open-sse/services/combo/comboCompatFallback.ts";
import type { ResolvedComboTarget } from "../../open-sse/services/combo/types.ts";

function modelTarget(overrides: Partial<ResolvedComboTarget> = {}): ResolvedComboTarget {
  return {
    kind: "model",
    stepId: "s1",
    executionKey: "ek-1",
    modelStr: "openai/compat-b",
    provider: "openai",
    providerId: null,
    connectionId: "c1",
    weight: 1,
    label: null,
    ...overrides,
  };
}

test("compat fallback stamps fallbackAttempts from the rejected-target index", async () => {
  const seen: Array<{ model: string; fallbackAttempts?: number }> = [];
  const targets = [
    modelTarget({ executionKey: "ek-0", stepId: "s0", modelStr: "openai/compat-a" }),
    modelTarget({ executionKey: "ek-1", stepId: "s1", modelStr: "openai/compat-b" }),
  ];
  const ok = () =>
    new Response(JSON.stringify({ choices: [{ message: { content: "ok" } }] }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  const result = await attemptCompatRejectedFallback(
    targets,
    { messages: [] },
    {
      handleSingleModel: async (_body, modelStr, target) => {
        seen.push({
          model: modelStr,
          fallbackAttempts: (target as { fallbackAttempts?: number } | undefined)?.fallbackAttempts,
        });
        if (modelStr === "openai/compat-a") {
          return new Response("fail", { status: 500 });
        }
        return ok();
      },
      log: { info() {}, warn() {}, debug() {}, error() {} },
      strategy: "round-robin",
    }
  );
  assert.equal(result?.ok, true);
  assert.equal(seen.length, 2);
  assert.equal(seen[0].fallbackAttempts, 0);
  assert.equal(seen[1].fallbackAttempts, 1);
});
