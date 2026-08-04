/**
 * tests/unit/ui/comboFlowModel.test.ts
 *
 * TDD for `comboFlowModel` — the pure reducer/model core of Tela B.
 * Run: node --import tsx/esm --test tests/unit/ui/comboFlowModel.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  classifyFailKind,
  reduceComboEvent,
  comboRunToFlow,
  type ComboRunModel,
  type ComboEventInput,
} from "../../../src/app/(dashboard)/dashboard/combos/live/comboFlowModel.ts";

import { FLOW_EDGE_COLORS } from "../../../src/shared/components/flow/edgeStyles.ts";

// ── helpers ───────────────────────────────────────────────────────────────

function mkAttempt(
  targetIndex: number,
  strategy = "priority",
  provider = `prov${targetIndex}`,
  model = `model${targetIndex}`
): ComboEventInput {
  return {
    comboName: "test-combo",
    targetIndex,
    provider,
    model,
    type: "attempt",
    strategy,
    timestamp: 1000 + targetIndex,
  };
}

function mkFailed(
  targetIndex: number,
  error: string,
  provider = `prov${targetIndex}`,
  model = `model${targetIndex}`
): ComboEventInput {
  return {
    comboName: "test-combo",
    targetIndex,
    provider,
    model,
    type: "failed",
    error,
    latencyMs: 100,
    timestamp: 2000 + targetIndex,
  };
}

function mkSucceeded(
  targetIndex: number,
  provider = `prov${targetIndex}`,
  model = `model${targetIndex}`
): ComboEventInput {
  return {
    comboName: "test-combo",
    targetIndex,
    provider,
    model,
    type: "succeeded",
    latencyMs: 42,
    timestamp: 3000 + targetIndex,
  };
}

// Full 6-event cascade:
// attempt(0) → failed(0,"429 rate limited") → attempt(1) → failed(1,"circuit open") → attempt(2) → succeeded(2)
function buildFullRun(): ComboRunModel {
  let run: ComboRunModel | null = null;
  run = reduceComboEvent(run, mkAttempt(0));
  run = reduceComboEvent(run, mkFailed(0, "429 rate limited"));
  run = reduceComboEvent(run, mkAttempt(1));
  run = reduceComboEvent(run, mkFailed(1, "circuit open"));
  run = reduceComboEvent(run, mkAttempt(2));
  run = reduceComboEvent(run, mkSucceeded(2));
  return run;
}

// ── classifyFailKind ──────────────────────────────────────────────────────

describe("classifyFailKind", () => {
  it("returns undefined when error is absent", () => {
    assert.equal(classifyFailKind(undefined), undefined);
    assert.equal(classifyFailKind(""), undefined);
  });

  it("returns 'rate-limit' for 429 messages", () => {
    assert.equal(classifyFailKind("429 Too Many Requests"), "rate-limit");
    assert.equal(classifyFailKind("upstream rate limit exceeded"), "rate-limit");
    assert.equal(classifyFailKind("RATE_LIMIT_EXCEEDED"), "rate-limit");
  });

  it("returns 'circuit-open' for circuit breaker messages", () => {
    assert.equal(classifyFailKind("circuit open"), "circuit-open");
    assert.equal(classifyFailKind("Provider circuit breaker is open"), "circuit-open");
    assert.equal(classifyFailKind("CIRCUIT_OPEN"), "circuit-open");
  });

  it("returns 'cooldown' for cooldown messages", () => {
    assert.equal(classifyFailKind("connection cooldown active"), "cooldown");
    assert.equal(classifyFailKind("cooldown period"), "cooldown");
  });

  it("returns 'other' for unrecognized error strings", () => {
    assert.equal(classifyFailKind("Internal server error"), "other");
    assert.equal(classifyFailKind("timeout"), "other");
    assert.equal(classifyFailKind("some unknown failure"), "other");
  });

  it("circuit-open takes precedence over rate-limit when both match", () => {
    // edge: a message with both circuit and rate — circuit wins by regex ordering
    const result = classifyFailKind("circuit open after 429");
    assert.equal(result, "circuit-open");
  });
});

// ── reduceComboEvent ──────────────────────────────────────────────────────

describe("reduceComboEvent — basic events", () => {
  it("creates a new run on first attempt event (null input)", () => {
    const run = reduceComboEvent(null, mkAttempt(0));

    assert.equal(run.comboName, "test-combo");
    assert.equal(run.strategy, "priority");
    assert.equal(run.outcome, "running");
    assert.ok(run.startedAt > 0);
    assert.equal(run.finishedAt, undefined);
    assert.equal(run.targets.length, 1);
    assert.equal(run.targets[0].targetIndex, 0);
    assert.equal(run.targets[0].provider, "prov0");
    assert.equal(run.targets[0].model, "model0");
    assert.equal(run.targets[0].state, "attempting");
  });

  it("marks target as failed and sets failKind on failed event", () => {
    let run = reduceComboEvent(null, mkAttempt(0));
    run = reduceComboEvent(run, mkFailed(0, "429 rate limited"));

    assert.equal(run.targets[0].state, "failed");
    assert.equal(run.targets[0].failKind, "rate-limit");
    assert.equal(run.targets[0].error, "429 rate limited");
    assert.equal(run.outcome, "running"); // not done yet
  });

  it("marks target as succeeded and sets outcome + finishedAt on succeeded event", () => {
    let run = reduceComboEvent(null, mkAttempt(0));
    run = reduceComboEvent(run, mkSucceeded(0));

    assert.equal(run.targets[0].state, "succeeded");
    assert.equal(run.targets[0].latencyMs, 42);
    assert.equal(run.outcome, "succeeded");
    assert.ok(run.finishedAt != null);
  });
});

describe("reduceComboEvent — full cascade (3 targets)", () => {
  it("produces 3 targets ordered by targetIndex", () => {
    const run = buildFullRun();

    assert.equal(run.targets.length, 3);
    assert.equal(run.targets[0].targetIndex, 0);
    assert.equal(run.targets[1].targetIndex, 1);
    assert.equal(run.targets[2].targetIndex, 2);
  });

  it("states are [failed, failed, succeeded]", () => {
    const run = buildFullRun();

    assert.equal(run.targets[0].state, "failed");
    assert.equal(run.targets[1].state, "failed");
    assert.equal(run.targets[2].state, "succeeded");
  });

  it("failKinds are [rate-limit, circuit-open, undefined]", () => {
    const run = buildFullRun();

    assert.equal(run.targets[0].failKind, "rate-limit");
    assert.equal(run.targets[1].failKind, "circuit-open");
    assert.equal(run.targets[2].failKind, undefined);
  });

  it("outcome is 'succeeded' and finishedAt is set", () => {
    const run = buildFullRun();

    assert.equal(run.outcome, "succeeded");
    assert.ok(run.finishedAt != null);
  });

  it("strategy is set from the attempt payload", () => {
    const run = buildFullRun();

    assert.equal(run.strategy, "priority");
  });
});

describe("reduceComboEvent — ordering", () => {
  it("keeps targets sorted by targetIndex even if events arrive out of order", () => {
    // Unusual but defensive: attempt(2) then attempt(0)
    let run = reduceComboEvent(null, mkAttempt(2));
    run = reduceComboEvent(run, mkAttempt(0));

    assert.equal(run.targets[0].targetIndex, 0);
    assert.equal(run.targets[1].targetIndex, 2);
  });

  it("idempotently applies a repeated attempt for the same target", () => {
    let run = reduceComboEvent(null, mkAttempt(0));
    run = reduceComboEvent(run, mkAttempt(0)); // duplicate

    assert.equal(run.targets.length, 1);
    assert.equal(run.targets[0].state, "attempting");
  });
});

describe("reduceComboEvent — comboName key", () => {
  it("ignores events for a different comboName when run already exists", () => {
    let run = reduceComboEvent(null, mkAttempt(0));

    // Event for a different combo — should be ignored, run returned unchanged
    const alienEvent: ComboEventInput = {
      comboName: "other-combo",
      targetIndex: 99,
      provider: "alien",
      model: "alien",
      type: "failed",
      error: "some error",
      timestamp: 9999,
    };
    run = reduceComboEvent(run, alienEvent);

    assert.equal(run.targets.length, 1);
    assert.equal(run.comboName, "test-combo");
  });
});

// ── comboRunToFlow ────────────────────────────────────────────────────────

describe("comboRunToFlow", () => {
  it("returns N+3 nodes for N targets (request + strategy + N targets + response)", () => {
    const run = buildFullRun();
    const { nodes } = comboRunToFlow(run);

    // 3 targets → 1 request + 1 strategy + 3 targets + 1 response = 6 nodes
    assert.equal(nodes.length, 6, `expected 6 nodes, got ${nodes.length}`);
  });

  it("node types: first=request, second=strategy, N middle=target, last=response", () => {
    const run = buildFullRun();
    const { nodes } = comboRunToFlow(run);

    assert.equal(nodes[0].type, "request");
    assert.equal(nodes[1].type, "strategy");
    assert.equal(nodes[2].type, "target");
    assert.equal(nodes[3].type, "target");
    assert.equal(nodes[4].type, "target");
    assert.equal(nodes[5].type, "response");
  });

  it("target nodes carry provider, model, state, failKind in data", () => {
    const run = buildFullRun();
    const { nodes } = comboRunToFlow(run);

    const t0 = nodes[2];
    assert.equal((t0.data as Record<string, unknown>).provider, "prov0");
    assert.equal((t0.data as Record<string, unknown>).model, "model0");
    assert.equal((t0.data as Record<string, unknown>).state, "failed");
    assert.equal((t0.data as Record<string, unknown>).failKind, "rate-limit");

    const t2 = nodes[4];
    assert.equal((t2.data as Record<string, unknown>).state, "succeeded");
    assert.equal((t2.data as Record<string, unknown>).failKind, undefined);
  });

  it("strategy node carries the strategy name in data", () => {
    const run = buildFullRun();
    const { nodes } = comboRunToFlow(run);

    assert.equal((nodes[1].data as Record<string, unknown>).strategy, "priority");
    assert.equal((nodes[1].data as Record<string, unknown>).targetCount, 3);
  });

  it("edges: N+3 sequential edges (one per node-to-node link)", () => {
    const run = buildFullRun();
    const { edges } = comboRunToFlow(run);

    // 6 nodes → 5 edges: request→strategy, strategy→t0, t0→t1, t1→t2, t2→response
    assert.equal(edges.length, 5, `expected 5 edges, got ${edges.length}`);
  });

  it("each edge connects consecutive nodes in order", () => {
    const run = buildFullRun();
    const { nodes, edges } = comboRunToFlow(run);

    for (let i = 0; i < edges.length; i++) {
      assert.equal(edges[i].source, nodes[i].id, `edge[${i}].source mismatch`);
      assert.equal(edges[i].target, nodes[i + 1].id, `edge[${i}].target mismatch`);
    }
  });

  it("failed edges are styled with error color", () => {
    const run = buildFullRun();
    const { edges } = comboRunToFlow(run);

    // edge[2] is strategy→t0 (failed)… actually edges are: [0]req→strat, [1]strat→t0, [2]t0→t1, [3]t1→t2, [4]t2→resp
    // edge for t0 (failed): index 1 (strategy→t0)
    // The edge going INTO t0 should reflect t0 state
    const t0IncomingEdge = edges[1]; // strategy→target0
    const style = t0IncomingEdge.style as Record<string, unknown> | undefined;
    assert.ok(style != null, "edge should have style");
    assert.equal(style.stroke, FLOW_EDGE_COLORS.error, "failed target edge should be error color");
  });

  it("succeeded edge is styled with active/green color", () => {
    const run = buildFullRun();
    const { edges } = comboRunToFlow(run);

    // edge[4] is t2→response (t2 succeeded)
    const t2ResponseEdge = edges[4];
    const style = t2ResponseEdge.style as Record<string, unknown> | undefined;
    assert.ok(style != null);
    assert.equal(
      style.stroke,
      FLOW_EDGE_COLORS.active,
      "succeeded target edge should be active/green color"
    );
  });

  it("idle/attempting edges are styled with idle or last-used color (not error/green)", () => {
    // A run with one target still attempting
    let run = reduceComboEvent(null, mkAttempt(0));
    const { edges } = comboRunToFlow(run);

    // edge[1] = strategy→t0 (attempting)
    const attemptingEdge = edges[1];
    const style = attemptingEdge.style as Record<string, unknown> | undefined;
    assert.ok(style != null);
    assert.notEqual(style.stroke, FLOW_EDGE_COLORS.error);
    assert.notEqual(style.stroke, FLOW_EDGE_COLORS.active);
  });

  it("produces deterministic node IDs", () => {
    const run = buildFullRun();
    const { nodes } = comboRunToFlow(run);

    assert.equal(nodes[0].id, "request");
    assert.equal(nodes[1].id, "strategy");
    assert.equal(nodes[2].id, "target-0");
    assert.equal(nodes[3].id, "target-1");
    assert.equal(nodes[4].id, "target-2");
    assert.equal(nodes[5].id, "response");
  });
});
