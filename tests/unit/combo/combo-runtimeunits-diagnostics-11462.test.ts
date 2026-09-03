/**
 * #11462: the nested runtime-unit loop (open-sse/services/combo/runtimeUnits.ts,
 * used by the pipeline/fusion combo strategies via dispatchPrelude.ts and
 * fusionPanel.ts) had the same bare-`errorResponse()` gap as the round-robin
 * strategy's "Maximum combo retry limit reached" 503 — no diagnostics trace.
 */
import test from "node:test";
import assert from "node:assert/strict";

import { executeRuntimeUnitCombo } from "../../../open-sse/services/combo/runtimeUnits.ts";
import type { ResolvedComboUnit, ComboNestingContext } from "../../../open-sse/services/combo/types.ts";

function noopLog() {
  return { info: () => {}, warn: () => {}, error: () => {}, debug: () => {} };
}

function failResponse(): Response {
  return new Response(JSON.stringify({ error: { message: "upstream 500" } }), {
    status: 500,
    headers: { "content-type": "application/json" },
  });
}

test(
  "#11462: nested runtime-unit combo's attempt-budget-exceeded 503 must carry " +
    "the combo diagnostics trace (poolSize/attemptOrder/terminalReason)",
  async () => {
    const units: ResolvedComboUnit[] = [
      {
        kind: "model",
        stepId: "step-a",
        executionKey: "a",
        modelStr: "openai/ru-a",
        provider: "openai",
        providerId: null,
        connectionId: null,
        weight: 1,
        label: null,
      },
      {
        kind: "model",
        stepId: "step-b",
        executionKey: "b",
        modelStr: "anthropic/ru-b",
        provider: "anthropic",
        providerId: null,
        connectionId: null,
        weight: 1,
        label: null,
      },
    ];

    const nesting: ComboNestingContext = {
      depth: 0,
      maxDepth: 5,
      visitedComboNames: [],
      rootComboName: "ru-probe-11462",
      // Budget of 1 trips on the very first attempt, deterministically hitting the
      // terminal branch under test without needing every unit to actually fail.
      attemptBudget: { count: 0, limit: 1 },
    };

    const result = await executeRuntimeUnitCombo({
      body: { messages: [{ role: "user", content: "hi" }] },
      combo: { name: "ru-probe-11462", strategy: "pipeline" },
      strategy: "pipeline",
      units,
      handleSingleModel: async () => failResponse(),
      log: noopLog() as never,
      config: { maxRetries: 0 },
      allCombos: [],
      nesting,
      baseOptions: {} as never,
      runCombo: async () => failResponse(),
    });

    assert.equal(result.response.status, 503);
    const body = (await result.response.json()) as {
      error: { message: string };
      diagnostics?: { poolSize: number; attemptOrder: unknown[]; terminalReason: string };
    };
    assert.equal(body.error.message, "Maximum combo retry limit reached");
    assert.ok(body.diagnostics, "runtime-unit 503 should carry a diagnostics field");
    assert.ok(typeof body.diagnostics?.poolSize === "number");
    assert.ok(Array.isArray(body.diagnostics?.attemptOrder));
    assert.equal(body.diagnostics?.terminalReason, "max_attempts_exceeded");
  }
);
