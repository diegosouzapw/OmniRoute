/**
 * #11181 — the `lkgpEnabled` settings toggle must actually reach RoutingContext.
 *
 * `LKGPStrategyImpl.select()` guards with `context.lkgpEnabled === false`
 * (open-sse/services/autoCombo/routerStrategy.ts), and the setting is persisted
 * by the Routing settings tab (src/shared/validation/settingsSchemas.ts). But the
 * RoutingContext literal built in resolveAutoStrategyOrder() never carried the
 * field, so the guard could never fire in production.
 *
 * tests/unit/router-strategies.test.ts already covers the guard — but it hands
 * the strategy a context it built itself, so it stays green whether or not the
 * production construction site populates the field. These tests drive
 * resolveAutoStrategyOrder() with a *persisted* setting instead, which is the
 * only level at which the wiring is observable.
 */
import { test, after } from "node:test";
import assert from "node:assert/strict";

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-lkgp-11181-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const { resolveAutoStrategyOrder } =
  await import("@omniroute/open-sse/services/combo/resolveAutoStrategy.ts");
const settingsDb = await import("@/lib/db/settings.ts");
const { resetDbInstance } = await import("@/lib/db/core.ts");

after(() => {
  resetDbInstance();
});

const target = (provider: string, modelStr: string): never =>
  ({
    kind: "model",
    stepId: "s1",
    executionKey: `${provider}>${modelStr}`,
    modelStr,
    provider,
    providerId: null,
    connectionId: null,
    weight: 1,
    label: null,
  }) as never;

const candidate = (provider: string, model: string, overrides: Record<string, unknown> = {}) => ({
  kind: "model",
  stepId: "s1",
  executionKey: `${provider}>${model}`,
  modelStr: model,
  provider,
  model,
  quotaRemaining: 100,
  quotaTotal: 100,
  circuitBreakerState: "CLOSED",
  costPer1MTokens: 1,
  p95LatencyMs: 100,
  latencyStdDev: 10,
  errorRate: 0,
  ...overrides,
});

// "cheap" wins under the rules scorer (cheapest + fastest + most stable);
// "pricey" only ever wins by being the persisted last-known-good provider.
const candidates = () =>
  [
    candidate("openai", "cheap-model", {
      costPer1MTokens: 0.01,
      p95LatencyMs: 10,
      latencyStdDev: 1,
    }),
    candidate("anthropic", "pricey-model", {
      costPer1MTokens: 50,
      p95LatencyMs: 5000,
      latencyStdDev: 900,
    }),
  ] as never;

function capturingLog() {
  const entries: string[] = [];
  const push = (_tag: unknown, msg: unknown) => entries.push(String(msg));
  return { entries, info: push, warn: push, error: push, debug: push };
}

async function runWithSettings(comboName: string, settings: Record<string, unknown> | null) {
  // The LKGP pin resolveAutoStrategyOrder reads is getLKGP(combo.name, combo.id || combo.name).
  await settingsDb.setLKGP(comboName, comboName, "anthropic");

  const log = capturingLog();
  const result = await resolveAutoStrategyOrder({
    orderedTargets: [target("openai", "cheap-model"), target("anthropic", "pricey-model")],
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: {
      id: comboName,
      name: comboName,
      autoConfig: {
        routerStrategy: "lkgp",
        candidatePool: ["openai", "anthropic"],
        explorationRate: 0,
      },
    },
    settings,
    config: {},
    relayOptions: null,
    resilienceSettings: { quotaPreflight: { enabled: false } },
    log,
    buildAutoCandidates: (async () => candidates()) as never,
  } as never);

  assert.ok("orderedTargets" in result, "expected an ordering result, not an earlyResponse");
  const selection = log.entries.find((entry) => entry.startsWith("Auto selection:")) ?? "";
  return { result, selection };
}

test("control — with lkgpEnabled unset the LKGP pin still wins (guard must not over-fire)", async () => {
  const { result, selection } = await runWithSettings("lkgp-11181-default", null);
  assert.match(selection, /LKGP: using last known good provider anthropic/);
  if ("orderedTargets" in result) {
    assert.equal(result.orderedTargets[0].provider, "anthropic");
  }
});

test("#11181 — a persisted lkgpEnabled:false makes the lkgp strategy delegate to rules", async () => {
  const { result, selection } = await runWithSettings("lkgp-11181-disabled", {
    lkgpEnabled: false,
  });

  // The whole point of the toggle: the LKGP pin must be ignored and the 16-factor
  // rules scorer must pick the winner instead.
  assert.doesNotMatch(
    selection,
    /LKGP: using last known good provider/,
    `lkgpEnabled:false must disable LKGP selection, got: ${selection}`
  );
  assert.match(selection, /RulesStrategy: score=/, `expected rules fallback, got: ${selection}`);
  if ("orderedTargets" in result) {
    assert.equal(result.orderedTargets[0].provider, "openai");
  }
});
