/**
 * tests/unit/ui/comboFlowModel-breakers.test.ts
 *
 * TDD for U1b — enrichRunWithBreakers: overlays REAL circuit-breaker state
 * (from GET /api/monitoring/health → providerHealth[provider]) onto a combo run's
 * targets, so the cascade can show "CB: OPEN · retry 41s" instead of only the
 * error-string heuristic.
 * Run: node --import tsx/esm --test tests/unit/ui/comboFlowModel-breakers.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  enrichRunWithBreakers,
  comboRunToFlow,
  type ComboRunModel,
  type TargetNodeModel,
} from "../../../src/app/(dashboard)/dashboard/combos/live/comboFlowModel.ts";

function mkRun(
  targets: Array<Partial<TargetNodeModel> & { provider: string }>
): ComboRunModel {
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

describe("enrichRunWithBreakers", () => {
  it("returns null for a null run", () => {
    assert.equal(enrichRunWithBreakers(null, {}), null);
  });

  it("returns the same run reference when no health map is provided", () => {
    const run = mkRun([{ provider: "openai" }]);
    assert.equal(enrichRunWithBreakers(run, null), run);
    assert.equal(enrichRunWithBreakers(run, undefined), run);
  });

  it("attaches cbState + retryAfterMs for an OPEN provider breaker only", () => {
    const run = mkRun([{ provider: "openai" }, { provider: "anthropic" }]);
    const out = enrichRunWithBreakers(run, {
      openai: { state: "OPEN", retryAfterMs: 41000 },
    });
    assert.ok(out);
    assert.equal(out.targets[0].cbState, "OPEN");
    assert.equal(out.targets[0].cbRetryAfterMs, 41000);
    assert.equal(out.targets[1].cbState, undefined, "healthy/absent provider gets no badge");
  });

  it("does not attach a badge for a CLOSED (healthy) breaker", () => {
    const run = mkRun([{ provider: "openai" }]);
    const out = enrichRunWithBreakers(run, { openai: { state: "CLOSED", retryAfterMs: 0 } });
    assert.equal(out?.targets[0].cbState, undefined);
  });

  it("surfaces HALF_OPEN and DEGRADED states (case-insensitive)", () => {
    const run = mkRun([{ provider: "a" }, { provider: "b" }]);
    const out = enrichRunWithBreakers(run, {
      a: { state: "half_open", retryAfterMs: 5000 },
      b: { state: "DEGRADED" },
    });
    assert.equal(out?.targets[0].cbState, "HALF_OPEN");
    assert.equal(out?.targets[1].cbState, "DEGRADED");
  });

  it("does not mutate the input run (pure)", () => {
    const run = mkRun([{ provider: "openai" }]);
    enrichRunWithBreakers(run, { openai: { state: "OPEN", retryAfterMs: 1 } });
    assert.equal(run.targets[0].cbState, undefined, "original run must be untouched");
  });

  it("strips a stale cbState when the breaker recovers to CLOSED", () => {
    const run = mkRun([{ provider: "openai", cbState: "OPEN", cbRetryAfterMs: 9 }]);
    const out = enrichRunWithBreakers(run, { openai: { state: "CLOSED" } });
    assert.equal(out?.targets[0].cbState, undefined);
    assert.equal(out?.targets[0].cbRetryAfterMs, undefined);
  });

  it("ignores unknown breaker state strings", () => {
    const run = mkRun([{ provider: "openai" }]);
    const out = enrichRunWithBreakers(run, { openai: { state: "WEIRD" } });
    assert.equal(out?.targets[0].cbState, undefined);
  });

  it("comboRunToFlow carries cbState/cbRetryAfterMs into the target node data", () => {
    const run = mkRun([{ provider: "openai" }, { provider: "anthropic" }]);
    const enriched = enrichRunWithBreakers(run, {
      openai: { state: "OPEN", retryAfterMs: 41000 },
    });
    const { nodes } = comboRunToFlow(enriched as ComboRunModel);

    const target0 = nodes.find((n) => n.id === "target-0");
    assert.equal(target0?.data.cbState, "OPEN");
    assert.equal(target0?.data.cbRetryAfterMs, 41000);

    const target1 = nodes.find((n) => n.id === "target-1");
    assert.equal(target1?.data.cbState, undefined, "healthy provider node has no cbState");
  });
});
