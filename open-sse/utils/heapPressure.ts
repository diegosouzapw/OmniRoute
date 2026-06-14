import v8 from "node:v8";

/**
 * Compute the V8 heap-pressure shed threshold (MB).
 *
 * The chat pipeline rejects new requests with a 503 once `heapUsed` exceeds this
 * value, to avoid hard "JavaScript heap out of memory" crashes under concurrent
 * large-context load. The threshold is derived from the process's *actual* V8
 * heap ceiling (`heap_size_limit`, which reflects `--max-old-space-size` when set,
 * otherwise Node's RAM-derived default) so it auto-adapts across 1 GB / 2 GB /
 * large VPS instead of using a fixed number.
 *
 * A fixed default was the bug: 200 MB sat *below* the app's ~260 MB working set,
 * so the guard rejected every request once the heap warmed up (the v3.8.8
 * "resource pressure" outage). We shed at 85% of the ceiling — leaving headroom
 * for in-flight requests + GC — with a floor that always clears the runtime
 * baseline so a small/undersized heap never rejects all traffic.
 *
 * @param heapSizeLimitMb  `v8.getHeapStatistics().heap_size_limit` expressed in MB
 * @param override         `HEAP_PRESSURE_THRESHOLD_MB` env value — wins when it
 *                         parses to a positive number; invalid/unset → auto-calibrate
 */
export function computeHeapPressureThresholdMb(
  heapSizeLimitMb: number,
  override?: string | number | null
): number {
  const explicit = Number(override);
  if (Number.isFinite(explicit) && explicit > 0) return Math.floor(explicit);
  // Shed at 85% of the heap ceiling, but never below a floor that clears the
  // runtime's own ~260 MB baseline (+ margin) so an undersized heap degrades to
  // "guard never fires" rather than "guard rejects everything".
  const SHED_RATIO = 0.85;
  const FLOOR_MB = 400;
  return Math.max(Math.round(heapSizeLimitMb * SHED_RATIO), FLOOR_MB);
}

/**
 * Heap-pressure threshold (MB) resolved once at module load from the live V8 heap
 * ceiling. Read by `open-sse/handlers/chatCore.ts`'s memory-pressure guard.
 */
export const HEAP_PRESSURE_THRESHOLD_MB = computeHeapPressureThresholdMb(
  v8.getHeapStatistics().heap_size_limit / (1024 * 1024),
  process.env.HEAP_PRESSURE_THRESHOLD_MB
);
