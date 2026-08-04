import { test } from "node:test";
import assert from "node:assert/strict";

import { parseAutoConfig } from "@omniroute/open-sse/services/combo/autoConfig.ts";
import { DEFAULT_WEIGHTS, normalizeScoringWeights } from "@omniroute/open-sse/services/autoCombo/scoring.ts";
import { MODE_PACKS } from "@omniroute/open-sse/services/autoCombo/modePacks.ts";

// Split guard for Block J Task 2: parseAutoConfig was extracted verbatim from
// handleComboChat's inline auto-strategy config block. These assertions pin the
// pure derivation so the extraction stays behavior-identical.
//
// #8008 (prompt-cache affinity) added a `cacheAffinity` scoring factor and made
// parseAutoConfig run configured/mode-pack weights through `normalizeScoringWeights()`
// so independently-tuned UI weights always sum to a valid distribution and always
// carry the new key. That is an intentional behavior change: `cfg.weights` is now a
// freshly normalized object rather than a reference to `DEFAULT_WEIGHTS` /
// `MODE_PACKS[...]` / the caller's raw weights object, so these assertions compare
// against `normalizeScoringWeights(...)` (structural equality) instead of the
// pre-#8008 reference-equality checks.

const target = (provider: string, modelStr: string) =>
  ({ provider, modelStr, executionKey: `${provider}>${modelStr}` }) as never;

test("defaults: rules strategy, provider-derived pool, default weights", () => {
  const cfg = parseAutoConfig({ name: "c", config: {} } as never, [
    target("openai", "gpt-4o"),
    target("anthropic", "claude-3"),
    target("openai", "gpt-4o-mini"),
  ]);
  assert.equal(cfg.routingStrategy, "rules");
  assert.deepEqual(cfg.candidatePool, ["openai", "anthropic"]);
  assert.deepEqual(cfg.weights, normalizeScoringWeights(DEFAULT_WEIGHTS));
  assert.equal(cfg.explorationRate, 0.05);
  assert.equal(cfg.budgetCap, undefined);
  assert.equal(cfg.modePack, undefined);
});

test("routerStrategy takes precedence over routingStrategy/strategyName", () => {
  const cfg = parseAutoConfig(
    {
      name: "c",
      autoConfig: {
        routerStrategy: "lkgp",
        routingStrategy: "cost",
        strategyName: "p2c",
      },
    } as never,
    []
  );
  assert.equal(cfg.routingStrategy, "lkgp");
});

test("explicit candidatePool, weights, exploration and budget are honored", () => {
  // A well-formed ScoringWeights object (not an arbitrary key) — since #8008,
  // configured weights are run through normalizeScoringWeights(), which only
  // recognizes the real ScoringWeights keys and zeroes out/ignores anything else,
  // then re-normalizes the distribution to sum to 1.
  const customWeights = { ...DEFAULT_WEIGHTS, latencyInv: 1 } as never;
  const cfg = parseAutoConfig(
    {
      name: "c",
      autoConfig: {
        candidatePool: ["glm", "openai"],
        weights: customWeights,
        explorationRate: 0.3,
        budgetCap: 5,
        modePack: "coding",
      },
    } as never,
    [target("ignored", "x")]
  );
  assert.deepEqual(cfg.candidatePool, ["glm", "openai"]);
  assert.deepEqual(cfg.weights, normalizeScoringWeights(customWeights));
  assert.equal(cfg.explorationRate, 0.3);
  assert.equal(cfg.budgetCap, 5);
  assert.equal(cfg.modePack, "coding");
});

test("valid modePack overrides configured weights for fallback scoring", () => {
  const cfg = parseAutoConfig(
    {
      name: "c",
      autoConfig: {
        weights: { ...DEFAULT_WEIGHTS, latencyInv: 0 },
        modePack: "ship-fast",
      },
    } as never,
    []
  );

  assert.equal(cfg.modePack, "ship-fast");
  assert.deepEqual(cfg.weights, normalizeScoringWeights(MODE_PACKS["ship-fast"]));
});

test("config.auto is preferred over top-level config", () => {
  const cfg = parseAutoConfig(
    { name: "c", config: { auto: { routerStrategy: "cost" }, routerStrategy: "rules" } } as never,
    []
  );
  assert.equal(cfg.routingStrategy, "cost");
});

test("non-finite explorationRate falls back to 0.05", () => {
  const cfg = parseAutoConfig(
    { name: "c", autoConfig: { explorationRate: "not-a-number" } } as never,
    []
  );
  assert.equal(cfg.explorationRate, 0.05);
});
