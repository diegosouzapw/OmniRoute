import { test } from "node:test";
import assert from "node:assert/strict";

import { parseAutoConfig } from "@omniroute/open-sse/services/combo/autoConfig.ts";
import { DEFAULT_WEIGHTS } from "@omniroute/open-sse/services/autoCombo/scoring.ts";

// Split guard for Block J Task 2: parseAutoConfig was extracted verbatim from
// handleComboChat's inline auto-strategy config block. These assertions pin the
// pure derivation so the extraction stays behavior-identical.

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
  assert.equal(cfg.weights, DEFAULT_WEIGHTS);
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
  const customWeights = { latency: 1 } as never;
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
  assert.equal(cfg.weights, customWeights);
  assert.equal(cfg.explorationRate, 0.3);
  assert.equal(cfg.budgetCap, 5);
  assert.equal(cfg.modePack, "coding");
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
