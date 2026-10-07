/**
 * Auto-derived ingest byte budget for chat admission (#503-fanout).
 *
 * The legacy `chatBodyAdmission.ts` gate counted *requests* (default cap: 1)
 * instead of *bytes*, so any deployment serving coding-agent traffic (bodies
 * routinely > 256 KB) collapsed to an effective concurrency of 1-2 regardless
 * of how much RAM the host actually has. This module derives a byte budget
 * from the process's real memory ceiling — mirroring the auto-calibration
 * pattern already proven by `open-sse/utils/heapPressure.ts::computeHeapPressureThresholdMb`
 * (the v3.8.8 "resource pressure" outage was a fixed-number version of this
 * same mistake) — so the gate scales itself on a 512 MB container and a
 * 32 GB desktop alike, with no env tuning required.
 */
import v8 from "node:v8";

/** Fraction of the effective memory ceiling reserved for raw, not-yet-dispatched request bytes. */
export const INGEST_HEAP_FRACTION = 0.25;
/**
 * Transient heap multiplier per raw ingest byte during buffer → parse →
 * translate → dispatch (UTF-8 buffer + JS string + parsed object graph +
 * translated graph coexist briefly). Folded into the budget itself so a
 * request is charged its exact raw byte count, never a guessed multiple.
 */
export const INGEST_AMPLIFICATION = 8;
/**
 * Preserve liveness for ordinary agent requests on tiny hosts, accepting that
 * the floor can reserve a large share of a sub-128 MiB container.
 */
export const MIN_INGEST_BUDGET_BYTES = 8 * 1024 * 1024;
export const MAX_INGEST_BUDGET_BYTES = 2 * 1024 * 1024 * 1024;

export type IngestBudgetSource = "override" | "cgroup" | "v8_heap";

export interface IngestBudget {
  bytes: number;
  source: IngestBudgetSource;
  effectiveCeilingBytes: number;
}

function parsePositiveFinite(value: string | number | null | undefined): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

/**
 * Pure budget calculation — no I/O, no env reads. Callers supply the live
 * V8 heap ceiling and (optionally) a cgroup-derived constrained-memory
 * figure; the tighter of the two wins. `override` (when positive) always wins.
 */
export function computeIngestByteBudget(input: {
  heapSizeLimitBytes: number;
  constrainedMemoryBytes?: number | null;
  override?: string | number | null;
}): IngestBudget {
  const override = parsePositiveFinite(input.override);
  if (override !== null) {
    const bytes = Math.min(
      MAX_INGEST_BUDGET_BYTES,
      Math.max(MIN_INGEST_BUDGET_BYTES, Math.floor(override))
    );
    return { bytes, source: "override", effectiveCeilingBytes: bytes };
  }

  const heapLimit = parsePositiveFinite(input.heapSizeLimitBytes) ?? MIN_INGEST_BUDGET_BYTES;
  const constrained = parsePositiveFinite(input.constrainedMemoryBytes ?? null);
  const ceiling = constrained !== null ? Math.min(heapLimit, constrained) : heapLimit;
  const source: IngestBudgetSource =
    constrained !== null && constrained <= heapLimit ? "cgroup" : "v8_heap";

  const raw = Math.floor((ceiling * INGEST_HEAP_FRACTION) / INGEST_AMPLIFICATION);
  const bytes = Math.min(MAX_INGEST_BUDGET_BYTES, Math.max(MIN_INGEST_BUDGET_BYTES, raw));

  return { bytes, source, effectiveCeilingBytes: Math.floor(ceiling) };
}

/**
 * Best-effort cgroup/container memory ceiling. `process.constrainedMemory()`
 * (Node >=19.6/20.13) returns the cgroup limit on Linux containers and is
 * absent/undefined elsewhere (e.g. plain Windows/macOS hosts) — treated the
 * same as "no cgroup limit" so the V8 heap ceiling is used instead.
 */
function readConstrainedMemoryBytes(): number | null {
  try {
    const proc = process as NodeJS.Process & { constrainedMemory?: () => number };
    if (typeof proc.constrainedMemory !== "function") return null;
    const value = proc.constrainedMemory();
    return Number.isFinite(value) && value > 0 ? value : null;
  } catch {
    return null;
  }
}

let cachedBudget: IngestBudget | null = null;

/**
 * Resolve the process-wide ingest byte budget, cached after first call (like
 * `HEAP_PRESSURE_THRESHOLD_MB`) so the gate never re-reads cgroup/V8 state on
 * the hot path. `override` defaults to `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`.
 */
export function resolveIngestByteBudget(
  override: string | number | null | undefined = process.env.OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES
): IngestBudget {
  if (cachedBudget) return cachedBudget;
  cachedBudget = computeIngestByteBudget({
    heapSizeLimitBytes: v8.getHeapStatistics().heap_size_limit,
    constrainedMemoryBytes: readConstrainedMemoryBytes(),
    override,
  });
  return cachedBudget;
}

/** Test seam: force the next `resolveIngestByteBudget()` call to recompute. */
export function reloadIngestBudgetForTests(): void {
  cachedBudget = null;
}
