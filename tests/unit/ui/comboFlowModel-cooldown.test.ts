/**
 * tests/unit/ui/comboFlowModel-cooldown.test.ts
 *
 * TDD for F5.1 (Combo U1b Slice 2) — enrichRunWithConnectionCooldown: overlays the
 * real per-provider connection-cooldown summary (from GET /api/monitoring/health →
 * connectionHealth[provider]) onto a combo run's targets, so the cascade can badge
 * "cooldown 2/3 · 28s" alongside the circuit-breaker badge.
 *
 * Mirrors comboFlowModel-breakers.test.ts (Slice 1).
 * Run: node --import tsx/esm --test tests/unit/ui/comboFlowModel-cooldown.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  enrichRunWithConnectionCooldown,
  comboRunToFlow,
  type ComboRunModel,
  type TargetNodeModel,
} from "../../../src/app/(dashboard)/dashboard/combos/live/comboFlowModel.ts";

function mkRun(targets: Array<Partial<TargetNodeModel> & { provider: string }>): ComboRunModel {
  return {
    comboName: "c",
    strategy: "priority",
    outcome: "running",
    startedAt: 0,
    targets: targets.map((t, i) => ({
      targetIndex: i,
      provider: t.provider,
      model: t.model ?? "m",
      state: t.state ?? "idle",
      ...t,
    })),
  };
}

describe("enrichRunWithConnectionCooldown", () => {
  it("returns null for a null run", () => {
    assert.equal(enrichRunWithConnectionCooldown(null, {}), null);
  });

  it("returns the same run reference when no health map is provided", () => {
    const run = mkRun([{ provider: "openai" }]);
    assert.equal(enrichRunWithConnectionCooldown(run, null), run);
    assert.equal(enrichRunWithConnectionCooldown(run, undefined), run);
  });

  it("attaches cooldown count/total/retry for a provider with cooling connections", () => {
    const run = mkRun([{ provider: "anthropic" }, { provider: "openai" }]);
    const out = enrichRunWithConnectionCooldown(run, {
      anthropic: { coolingDown: 2, total: 3, soonestRetryAfterMs: 28_000 },
    });
    assert.ok(out);
    assert.equal(out.targets[0].cooldownCount, 2);
    assert.equal(out.targets[0].cooldownTotal, 3);
    assert.equal(out.targets[0].cooldownRetryAfterMs, 28_000);
    assert.equal(
      out.targets[1].cooldownCount,
      undefined,
      "provider with no cooldown gets no badge"
    );
  });

  it("does not attach a badge when coolingDown is 0 or absent", () => {
    const run = mkRun([{ provider: "a" }, { provider: "b" }]);
    const out = enrichRunWithConnectionCooldown(run, {
      a: { coolingDown: 0, total: 2, soonestRetryAfterMs: 0 },
      b: {},
    });
    assert.equal(out?.targets[0].cooldownCount, undefined);
    assert.equal(out?.targets[1].cooldownCount, undefined);
  });

  it("does not mutate the input run (pure)", () => {
    const run = mkRun([{ provider: "openai" }]);
    enrichRunWithConnectionCooldown(run, {
      openai: { coolingDown: 1, total: 1, soonestRetryAfterMs: 5000 },
    });
    assert.equal(run.targets[0].cooldownCount, undefined, "original run must be untouched");
  });

  it("strips a stale cooldown badge when the provider's connections recover", () => {
    const run = mkRun([
      { provider: "openai", cooldownCount: 2, cooldownTotal: 3, cooldownRetryAfterMs: 9000 },
    ]);
    const out = enrichRunWithConnectionCooldown(run, {
      openai: { coolingDown: 0, total: 3, soonestRetryAfterMs: 0 },
    });
    assert.equal(out?.targets[0].cooldownCount, undefined);
    assert.equal(out?.targets[0].cooldownTotal, undefined);
    assert.equal(out?.targets[0].cooldownRetryAfterMs, undefined);
  });

  it("comboRunToFlow carries the cooldown fields into the target node data", () => {
    const run = mkRun([{ provider: "anthropic" }, { provider: "openai" }]);
    const enriched = enrichRunWithConnectionCooldown(run, {
      anthropic: { coolingDown: 1, total: 2, soonestRetryAfterMs: 12_000 },
    });
    const { nodes } = comboRunToFlow(enriched as ComboRunModel);

    const target0 = nodes.find((n) => n.id === "target-0");
    assert.equal(target0?.data.cooldownCount, 1);
    assert.equal(target0?.data.cooldownTotal, 2);
    assert.equal(target0?.data.cooldownRetryAfterMs, 12_000);

    const target1 = nodes.find((n) => n.id === "target-1");
    assert.equal(target1?.data.cooldownCount, undefined, "healthy provider node has no cooldown");
  });

  it("composes with enrichRunWithBreakers without clobbering cbState", async () => {
    const { enrichRunWithBreakers } =
      await import("../../../src/app/(dashboard)/dashboard/combos/live/comboFlowModel.ts");
    const run = mkRun([{ provider: "anthropic" }]);
    const withBreaker = enrichRunWithBreakers(run, {
      anthropic: { state: "OPEN", retryAfterMs: 41_000 },
    });
    const both = enrichRunWithConnectionCooldown(withBreaker, {
      anthropic: { coolingDown: 1, total: 2, soonestRetryAfterMs: 5000 },
    });
    assert.equal(both?.targets[0].cbState, "OPEN", "breaker overlay survives the cooldown overlay");
    assert.equal(both?.targets[0].cooldownCount, 1);
  });
});
