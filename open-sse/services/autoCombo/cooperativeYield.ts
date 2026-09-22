const DEFAULT_SLICE_MS = 6;

export interface CooperativeYieldBudget {
  readonly hasYielded: boolean;
  yieldIfDue(): Promise<void> | null;
  ensureYielded(): Promise<void>;
}

/** Time-budgeted event-loop fairness without fixed per-item scheduler overhead. */
export function createCooperativeYieldBudget(sliceMs = DEFAULT_SLICE_MS): CooperativeYieldBudget {
  let deadline = performance.now() + sliceMs;
  let yielded = false;

  const yieldTurn = () =>
    new Promise<void>((resolve) =>
      setImmediate(() => {
        yielded = true;
        deadline = performance.now() + sliceMs;
        resolve();
      })
    );

  return {
    get hasYielded() {
      return yielded;
    },
    yieldIfDue() {
      return performance.now() >= deadline ? yieldTurn() : null;
    },
    ensureYielded() {
      return yielded ? Promise.resolve() : yieldTurn();
    },
  };
}
