import { test, after } from "node:test";
import assert from "node:assert/strict";

import { resolveAutoStrategyOrder } from "@omniroute/open-sse/services/combo/resolveAutoStrategy.ts";
import { resetDbInstance } from "@/lib/db/core.ts";

// resolveAutoStrategyOrder loads the LKGP via the DB singleton (dynamic import);
// release the handle so the node:test runner does not hang on teardown (learning #3).
after(() => {
  resetDbInstance();
});

// Split guard for Block J Task 2 (coupled slice): the `if (strategy === "auto")`
// branch of handleComboChat was extracted verbatim into resolveAutoStrategyOrder,
// with `buildAutoCandidates` injected (it lives in combo.ts, so a direct import
// would cycle). These tests pin the DI contract and the two control-flow exits
// that the host now forwards: an early 429 Response, and the default-ordering
// pass-through. The routable-selection path is covered end-to-end by the 60
// consumer tests (router-strategies / auto-combo-engine / combo-strategy-fallbacks).

const noopLog = {
  info() {},
  warn() {},
  error() {},
  debug() {},
} as never;

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

const baseDeps = (buildAutoCandidates: never) =>
  ({
    orderedTargets: [target("openai", "gpt-4o"), target("anthropic", "claude-3")],
    body: { messages: [{ role: "user", content: "hi" }] },
    combo: { id: "c1", name: "autoc", config: {} },
    settings: null,
    config: {},
    relayOptions: null,
    resilienceSettings: { quotaPreflight: { enabled: false } },
    log: noopLog,
    buildAutoCandidates,
  }) as never;

test("exports resolveAutoStrategyOrder", () => {
  assert.equal(typeof resolveAutoStrategyOrder, "function");
});

test("no candidates -> keeps default ordering, no explicit router", async () => {
  const build = (async () => []) as never;
  const result = await resolveAutoStrategyOrder(baseDeps(build));
  assert.ok(!("earlyResponse" in result));
  if ("orderedTargets" in result) {
    assert.equal(result.autoUsedExplicitRouter, false);
    // default ordering preserved (both original targets survive)
    assert.equal(result.orderedTargets.length, 2);
    assert.equal(result.orderedTargets[0].provider, "openai");
  }
});

test("all candidates quota-cutoff-blocked -> early 429 Response", async () => {
  const build = (async () => [
    {
      kind: "model",
      stepId: "s1",
      executionKey: "openai>gpt-4o",
      modelStr: "gpt-4o",
      provider: "openai",
      model: "gpt-4o",
      quotaCutoffBlocked: true,
    },
  ]) as never;
  const result = await resolveAutoStrategyOrder(baseDeps(build));
  assert.ok("earlyResponse" in result);
  if ("earlyResponse" in result) {
    assert.ok(result.earlyResponse instanceof Response);
    assert.equal(result.earlyResponse.status, 429);
  }
});
