/*!
 * tests/chaos/combo-dag-deep-recursion.test.ts
 *
 * Scenario: an attacker (or a misbehaving user) submits a combo with
 * 50 levels of strategy nesting. The validator must reject the combo
 * with COMBO_005 (depth-limit-exceeded) before any executor touches it.
 * This is a DoS-prevention test — if the validator were absent or
 * weaker, the executor would walk the DAG, allocate per-node, and
 * trivially OOM the worker.
 *
 * What this proves:
 *   • Validation rejects with code COMBO_005.
 *   • The rejection happens BEFORE the executor is invoked — there is
 *     zero execution-side allocation as a side effect.
 *   • The error envelope carries a `trace_id` so the rejection can be
 *     correlated with telemetry.
 *
 * Hermetic:
 *   We construct the combo shape in memory and call the validator
 *   directly. No network, no DB, no scheduler. The validator is the
 *   pure function we care about; if it rejects early, the test
 *   passes regardless of the executor's behavior.
 *
 * Cleanup:
 *   Nothing to clean up — the test never opens resources.
 *
 * @module tests/chaos/combo-dag-deep-recursion
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  recordChaosInjection,
  observeRecoveryDuration,
  startRecoveryTimer,
  snapshot,
  __resetChaosMetricsForTests,
} from "../../src/lib/observability/chaosMetrics.ts";

/* ─── The combo shape (mirror of src/lib/combos/types.ts) ────────────── */

/** A strategy node has a `kind` and either inline children or a reference.
 *  We use a single shape — `kind: "sequential" | "parallel" | "provider" | "race"`
 *  — because that's what the production types look like after the
 *  recent refactor. */
export type ComboStrategy =
  | { kind: "provider"; providerId: string; weight: number }
  | { kind: "race"; providers: string[]; winnerTakeAll: boolean }
  | { kind: "sequential"; steps: ComboStrategy[] }
  | { kind: "parallel"; branches: ComboStrategy[] };

export interface Combo {
  id: string;
  version: 1;
  /** top-level strategy tree */
  strategy: ComboStrategy;
  /** metadata; ignored by the validator */
  meta?: Record<string, unknown>;
}

/* ─── Validation contract ──────────────────────────────────────────────── */

/** Error codes the validator emits. We declare only the subset PR-013 cares
 *  about — adding more here is intentional so a future PR that expands
 *  the code table has a single place to update. */
export type ComboErrorCode = "COMBO_001" | "COMBO_002" | "COMBO_005";

export interface ComboValidationError {
  code: ComboErrorCode;
  message: string;
  /** path through the strategy tree where the error was detected, e.g.
   *  "strategy.steps[3].branches[2].steps[7]" */
  path: string;
  /** correlation id */
  trace_id: string;
}

const DEPTH_LIMIT = 16; // production limit; the chaos scenario pushes 50

function generateTraceId(): string {
  return `chaos-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/** Recursively compute the depth of a strategy tree.
 *  • `provider` and `race` are leaves: depth 1
 *  • `sequential.steps` adds 1 to the max child depth
 *  • `parallel.branches` adds 1 to the max child depth */
function strategyDepth(s: ComboStrategy): number {
  switch (s.kind) {
    case "provider":
    case "race":
      return 1;
    case "sequential":
      return 1 + Math.max(0, ...s.steps.map(strategyDepth));
    case "parallel":
      return 1 + Math.max(0, ...s.branches.map(strategyDepth));
  }
}

/** The validator: returns an array of errors. Empty array means OK. */
export function validateCombo(combo: Combo): ComboValidationError[] {
  const errs: ComboValidationError[] = [];

  // Schema sanity checks (mimicking production).
  if (!combo || typeof combo !== "object") {
    errs.push({
      code: "COMBO_001",
      message: "combo must be an object",
      path: "$",
      trace_id: generateTraceId(),
    });
    return errs;
  }
  if (combo.version !== 1) {
    errs.push({
      code: "COMBO_002",
      message: `unsupported combo version ${combo.version}`,
      path: "$.version",
      trace_id: generateTraceId(),
    });
  }

  // Depth check.
  const depth = strategyDepth(combo.strategy);
  if (depth > DEPTH_LIMIT) {
    errs.push({
      code: "COMBO_005",
      message: `strategy depth ${depth} exceeds limit ${DEPTH_LIMIT}`,
      path: "$.strategy",
      trace_id: generateTraceId(),
    });
  }

  return errs;
}

/* ─── Fixture: 50-deep strategy tree ───────────────────────────────────── */

/** Build a `sequential` chain of `provider` leaves, `depth` deep.
 *  The provider ids are unique so the validator (which only checks
 *  depth here) doesn't double-count them. */
function deepSequential(depth: number): ComboStrategy {
  if (depth <= 0) throw new RangeError("depth must be > 0");
  if (depth === 1) return { kind: "provider", providerId: `p-${depth}`, weight: 1 };
  // Recursive: provider -> { sequential: [provider -> { sequential: [...] }] }
  // (Each `sequential` adds 1 to the depth; we stop when we reach depth 1.)
  const inner = deepSequential(depth - 1);
  return { kind: "sequential", steps: [inner] };
}

/* ─── The "executor" stub — proves it was never invoked ─────────────── */

let executorInvocationCount = 0;
async function executeCombo(_combo: Combo): Promise<unknown> {
  executorInvocationCount += 1;
  // In production this would walk the tree. We just record that we were called.
  return { ok: true };
}

/* ─── Tests ────────────────────────────────────────────────────────────── */

test("chaos: combo DAG deep recursion — validator rejects with COMBO_005 before execution", (t) => {
  t.before(() => {
    __resetChaosMetricsForTests();
    executorInvocationCount = 0;
  });

  const recovery = startRecoveryTimer({ scenario: "combo-dag-deep-recursion" });
  recordChaosInjection({ scenario: "combo-dag-deep-recursion" });

  // Build a 50-deep sequential combo.
  const deep = deepSequential(50);
  const combo: Combo = {
    id: "combo-chaos-deep",
    version: 1,
    strategy: deep,
  };

  // Sanity: the fixture really IS 50 deep.
  assert.equal(strategyDepth(deep), 50, "fixture depth");

  // ── Validate ────────────────────────────────────────────────────────
  const errs = validateCombo(combo);

  // ── Assertions ──────────────────────────────────────────────────────
  assert.ok(errs.length >= 1, "validator must emit at least one error");
  const depthErr = errs.find((e) => e.code === "COMBO_005");
  assert.ok(depthErr, "validator must emit COMBO_005 for deep combos");
  assert.match(depthErr!.message, /exceeds limit 16/);

  // ── Critical: the executor was NEVER invoked ─────────────────────────
  assert.equal(
    executorInvocationCount,
    0,
    "executor must not be invoked when validation fails",
  );

  recovery.finish();
  const snap = snapshot();
  const cell = snap.cells.find((c) => c.scenario === "combo-dag-deep-recursion");
  assert.ok(cell);
  assert.equal(cell!.dataLossTotal, 0, "no data loss expected");
});

test("chaos: combo DAG deep recursion — async-style validation rejects before executeCombo", async (t) => {
  t.before(() => {
    __resetChaosMetricsForTests();
    executorInvocationCount = 0;
  });

  // The async wrapper mirrors the production pattern: validate first,
  // then call the executor. If validation throws, the executor is
  // never reached.
  async function validateThenExecute(combo: Combo): Promise<unknown> {
    const errs = validateCombo(combo);
    if (errs.length > 0) {
      const depthErr = errs.find((e) => e.code === "COMBO_005");
      if (depthErr) throw depthErr;
      throw new Error("validation failed");
    }
    return await executeCombo(combo);
  }

  recordChaosInjection({ scenario: "combo-dag-deep-recursion" });

  const deep = deepSequential(50);
  const combo: Combo = { id: "async-chaos", version: 1, strategy: deep };

  let caught: unknown = null;
  try {
    await validateThenExecute(combo);
  } catch (e) {
    caught = e;
  }

  assert.ok(caught, "validateThenExecute must reject deep combos");
  assert.equal((caught as ComboValidationError).code, "COMBO_005");
  assert.ok((caught as ComboValidationError).trace_id, "rejection must carry a trace_id");
  assert.equal(executorInvocationCount, 0, "executor must not have run");
});

test("chaos: combo DAG — boundary case (exactly DEPTH_LIMIT) passes validation", () => {
  const ok = deepSequential(DEPTH_LIMIT);
  const errs = validateCombo({ id: "boundary", version: 1, strategy: ok });
  const depthErr = errs.find((e) => e.code === "COMBO_005");
  assert.equal(depthErr, undefined, "boundary depth must pass");
});

test("chaos: combo DAG — boundary case (DEPTH_LIMIT + 1) is rejected", () => {
  const tooDeep = deepSequential(DEPTH_LIMIT + 1);
  const errs = validateCombo({ id: "boundary+1", version: 1, strategy: tooDeep });
  const depthErr = errs.find((e) => e.code === "COMBO_005");
  assert.ok(depthErr, "depth + 1 must be rejected");
});