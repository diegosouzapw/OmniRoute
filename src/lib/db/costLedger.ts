/**
 * db/costLedger.ts — Batched cost-event ledger (WP-S4).
 *
 * Wraps the existing recordCostEvent in db/costTracking.ts with a
 * configurable in-memory queue that flushes either when the row
 * threshold is reached or the time threshold elapses, whichever
 * comes first. Default: 100 rows or 1000 ms.
 *
 * Env knobs (per SOTA G4):
 *   - OMNIROUTE_LEDGER_FLUSH_ROWS  (default 100, integer >= 1)
 *   - OMNIROUTE_LEDGER_FLUSH_MS    (default 1000, integer >= 1)
 *
 * Failure mode: if the synchronous DB write throws inside the flush,
 * the rows are dropped (the existing per-event write path still
 * works for callers that need sync). The queue length is exposed
 * via ledgerQueueDepth() for ops dashboards and tests.
 */

import { recordCostEvent, type RecordCostEventInput } from "./costTracking.ts";

interface QueueEntry {
  input: RecordCostEventInput;
  enqueuedAtUnixMs: number;
}

let queue: QueueEntry[] = [];
let timer: ReturnType<typeof setTimeout> | null = null;
let flushing = false;

function readFlushRows(): number {
  const raw = process.env.OMNIROUTE_LEDGER_FLUSH_ROWS;
  if (raw === undefined || raw === "") return 100;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return 100;
  return n;
}

function readFlushMs(): number {
  const raw = process.env.OMNIROUTE_LEDGER_FLUSH_MS;
  if (raw === undefined || raw === "") return 1000;
  const n = Number.parseInt(raw, 10);
  if (!Number.isFinite(n) || n < 1) return 1000;
  return n;
}

export function enqueueCostEvent(input: RecordCostEventInput): void {
  queue.push({ input, enqueuedAtUnixMs: Date.now() });
  if (queue.length >= readFlushRows()) {
    void flushCostLedger();
  } else if (timer === null) {
    const ms = readFlushMs();
    timer = setTimeout(() => {
      timer = null;
      void flushCostLedger();
    }, ms);
  }
}

export async function flushCostLedger(): Promise<number> {
  if (flushing) return 0;
  if (queue.length === 0) return 0;
  flushing = true;
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  const batch = queue;
  queue = [];
  let ok = 0;
  for (const entry of batch) {
    try {
      recordCostEvent(entry.input);
      ok += 1;
    } catch {
      // Drop on error; the next event will retry its own write.
    }
  }
  flushing = false;
  return ok;
}

export function ledgerQueueDepth(): number {
  return queue.length;
}

export function _resetLedgerForTests(): void {
  queue = [];
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
  }
  flushing = false;
}
