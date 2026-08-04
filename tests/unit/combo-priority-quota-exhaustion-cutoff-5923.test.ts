import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

/**
 * #5923 (Finding #4) — the quota-exhaustion preflight cutoff only ran for
 * strategy === "auto" (buildAutoCandidates / routableCandidates in combo.ts).
 * Priority/weighted/etc. strategies funneled through the shared executeTarget
 * per-target loop, which only checked the provider circuit breaker + model
 * lockout — never a per-(provider, connection) quota-exhaustion cutoff. A 0%-
 * remaining connection stayed eligible as the lead leg until it reactively
 * 429'd.
 *
 * Regression guard: with the quota-exhaustion opt-in enabled
 * (`resilienceSettings.quotaPreflight.enabled = true`), a "priority" combo
 * whose first-listed connection is at 0% remaining must skip straight to the
 * sibling connection of the SAME provider — never dispatching to the
 * exhausted connection. This must stay strictly per-connection: it must NOT
 * touch the provider circuit breaker (both connections belong to the same
 * provider, and the healthy one must remain fully eligible).
 */
const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-quota-cutoff-priority-5923-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const dbCore = await import("../../src/lib/db/core.ts");
const { handleComboChat } = await import("../../open-sse/services/combo.ts");
const { registerQuotaFetcher } = await import("../../open-sse/services/quotaPreflight.ts");
const { getCircuitBreaker } = await import("../../src/shared/utils/circuitBreaker.ts");

test.after(() => {
  dbCore.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

function makeLog() {
  return {
    info() {},
    warn() {},
    debug() {},
    error() {},
  };
}

function okResponse(model: string) {
  return Response.json({ choices: [{ message: { role: "assistant", content: model } }] });
}

const PROVIDER = "openai";
const EXHAUSTED_CONNECTION_ID = "conn-exhausted-5923";
const HEALTHY_CONNECTION_ID = "conn-healthy-5923";

test("#5923 priority combo skips a 0%-remaining lead connection but keeps the sibling connection eligible", async () => {
  registerQuotaFetcher(PROVIDER, async (connectionId: string) => {
    if (connectionId === EXHAUSTED_CONNECTION_ID) {
      return { used: 100, total: 100, percentUsed: 1 };
    }
    return { used: 5, total: 100, percentUsed: 0.05 };
  });

  const combo = {
    name: `priority-quota-cutoff-5923-${Date.now()}`,
    strategy: "priority",
    models: [
      {
        kind: "model",
        provider: PROVIDER,
        providerId: PROVIDER,
        model: "gpt-4o-mini",
        connectionId: EXHAUSTED_CONNECTION_ID,
        id: "step-a",
      },
      {
        kind: "model",
        provider: PROVIDER,
        providerId: PROVIDER,
        model: "gpt-4o-mini",
        connectionId: HEALTHY_CONNECTION_ID,
        id: "step-b",
      },
    ],
  };

  const calls: Array<string | null> = [];
  const response = await handleComboChat({
    body: { model: combo.name, messages: [{ role: "user", content: "hi" }] },
    combo,
    allCombos: [combo],
    isModelAvailable: undefined,
    relayOptions: undefined,
    signal: undefined,
    settings: {
      resilienceSettings: {
        quotaPreflight: {
          enabled: true,
          defaultThresholdPercent: 2,
          warnThresholdPercent: 20,
        },
      },
    },
    log: makeLog(),
    handleSingleModel: async (
      _body: unknown,
      modelStr: string,
      target?: { connectionId?: string | null }
    ) => {
      calls.push(target?.connectionId ?? null);
      return okResponse(modelStr);
    },
  } as Parameters<typeof handleComboChat>[0]);

  assert.equal(response.status, 200);
  assert.ok(calls.length > 0, "expected at least one dispatched target");
  assert.equal(
    calls[0],
    HEALTHY_CONNECTION_ID,
    "the 0%-remaining lead connection must be skipped; the sibling connection must be dispatched instead"
  );
  assert.ok(
    !calls.includes(EXHAUSTED_CONNECTION_ID),
    "the exhausted connection must never be dispatched to"
  );

  // Strictly per-connection — the provider circuit breaker must stay CLOSED.
  // Only one connection was skipped; the provider itself never failed.
  assert.equal(
    getCircuitBreaker(PROVIDER).getStatus().state,
    "CLOSED",
    "quota-exhaustion cutoff must never trip the whole-provider circuit breaker"
  );
});

test("#5923 priority combo does NOT skip a 0%-remaining connection when the cutoff setting is disabled (default)", async () => {
  const provider = "openai";
  const exhaustedConnectionId = "conn-exhausted-disabled-5923";
  registerQuotaFetcher(provider, async () => ({ used: 100, total: 100, percentUsed: 1 }));

  const combo = {
    name: `priority-quota-cutoff-disabled-5923-${Date.now()}`,
    strategy: "priority",
    models: [
      {
        kind: "model",
        provider,
        providerId: provider,
        model: "gpt-4o-mini",
        connectionId: exhaustedConnectionId,
        id: "step-a",
      },
    ],
  };

  const calls: Array<string | null> = [];
  const response = await handleComboChat({
    body: { model: combo.name, messages: [{ role: "user", content: "hi" }] },
    combo,
    allCombos: [combo],
    isModelAvailable: undefined,
    relayOptions: undefined,
    signal: undefined,
    // No resilienceSettings override → quotaPreflight.enabled defaults to false (opt-in).
    settings: {},
    log: makeLog(),
    handleSingleModel: async (
      _body: unknown,
      modelStr: string,
      target?: { connectionId?: string | null }
    ) => {
      calls.push(target?.connectionId ?? null);
      return okResponse(modelStr);
    },
  } as Parameters<typeof handleComboChat>[0]);

  assert.equal(response.status, 200);
  assert.deepEqual(
    calls,
    [exhaustedConnectionId],
    "with the cutoff setting OFF (default), the exhausted connection must still be dispatched to (unchanged auto-off behavior)"
  );
});
