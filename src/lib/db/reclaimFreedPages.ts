/**
 * Post-cleanup space reclamation (#12821).
 *
 * Never run a full `VACUUM` from the cleanup scheduler. `node:sqlite` is
 * synchronous, so a full rebuild of a multi-hundred-MB file holds the event
 * loop for minutes — no route answers, `/healthz` included, and in-flight
 * streams stall. Full rebuilds belong to `vacuumScheduler`, which runs them in
 * the window the operator configured on the Storage page
 * (`scheduledVacuum` / `vacuumHour`).
 *
 * What we do instead depends on the database's `auto_vacuum` mode:
 *
 * - INCREMENTAL: freed pages sit on SQLite's freelist and
 *   `PRAGMA incremental_vacuum(N)` hands back at most N of them per call. We
 *   drain the list in ~1 MiB batches and pause between batches for about as
 *   long as the last batch took, so the event loop stays at least half free
 *   for requests. Whatever is left after the per-pass caps is picked up by the
 *   next pass.
 * - FULL: SQLite already returns freed pages on commit; nothing to do.
 * - NONE: `incremental_vacuum` is a no-op, so only a full rebuild can shrink
 *   the file. We record the request with `vacuumScheduler` and let it run in
 *   its configured window (or never, if the operator said so).
 *
 * In WAL mode reclaimed pages only reach the main file at a checkpoint. A pass
 * folds the WAL back periodically and finishes with a non-blocking PASSIVE
 * checkpoint. Never TRUNCATE a live WAL: other mapped SQLite handles can be
 * invalidated (SIGBUS; #14005). WAL high-water sizing is handled separately by
 * WAL maintenance.
 *
 * @module lib/db/reclaimFreedPages
 */

import type { SqliteAdapter } from "./adapters/types";
import { getDbInstance } from "./core";
import { requestFullVacuum } from "./vacuumScheduler";

/** Target bytes moved per `incremental_vacuum` call; converted to pages via `page_size`. */
const INCREMENTAL_VACUUM_BATCH_BYTES = 1024 * 1024;
/** Hard cap per cleanup pass (≈2 GiB at the target batch size); the rest waits for the next pass. */
const INCREMENTAL_VACUUM_MAX_BATCHES = 2048;
/** Wall-clock budget per cleanup pass, so a slow disk cannot turn a pass into a long tail. */
const INCREMENTAL_VACUUM_TIME_BUDGET_MS = 30_000;
/** Longest pause between batches; a batch pauses for as long as it took, capped here. */
const INCREMENTAL_VACUUM_MAX_PAUSE_MS = 250;
/** PASSIVE checkpoint cadence within a pass so the WAL is folded back as we go. */
const INCREMENTAL_VACUUM_CHECKPOINT_EVERY_BATCHES = 64;

// `PRAGMA auto_vacuum` values (https://sqlite.org/pragma.html#pragma_auto_vacuum): 0 = NONE.
const AUTO_VACUUM_FULL = 1;
const AUTO_VACUUM_INCREMENTAL = 2;

export type ReclaimStopReason =
  /** The freelist reached zero. */
  | "drained"
  /** The per-pass batch cap was hit; the remainder waits for the next pass. */
  | "max-batches"
  /** The per-pass wall-clock budget was hit; the remainder waits for the next pass. */
  | "time-budget"
  /** Another connection held the write lock (SQLITE_BUSY/LOCKED); retry next pass. */
  | "busy"
  /** The DB handle was closed under us (backup restore / import); retry next pass. */
  | "closed"
  /** A batch threw something other than BUSY; see `error`. Earlier batches are committed. */
  | "error";

export interface ReclaimFreedPagesResult {
  /**
   * - `incremental`: freed pages were reclaimed via bounded `incremental_vacuum` batches.
   * - `auto`: `auto_vacuum = FULL` — SQLite reclaims on commit, nothing to do here.
   * - `deferred`: `auto_vacuum = NONE` — a full VACUUM was requested from `vacuumScheduler`.
   * - `skipped`: the freelist was already empty.
   */
  mode: "incremental" | "auto" | "deferred" | "skipped";
  autoVacuum: number;
  pageSize: number;
  freelistBefore: number;
  freelistAfter: number;
  batches: number;
  durationMs: number;
  /** Only set for `incremental`. */
  stopReason?: ReclaimStopReason;
  /** Only set when `stopReason === "error"`. */
  error?: string;
}

export interface ReclaimFreedPagesOptions {
  /** @internal test seam — overrides the `page_size`-derived batch. */
  batchPages?: number;
  /** @internal test seam */
  maxBatches?: number;
  /** @internal test seam */
  timeBudgetMs?: number;
  /** @internal test seam — pause between batches; receives the last batch's duration in ms. */
  pause?: (lastBatchMs: number) => Promise<void>;
  /** @internal test seam */
  now?: () => number;
}

function readPragmaNumber(db: SqliteAdapter, pragma: string): number {
  const value = db.pragma(pragma, { simple: true });
  const numeric = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

function pauseBetweenBatches(lastBatchMs: number): Promise<void> {
  const delay = Math.min(INCREMENTAL_VACUUM_MAX_PAUSE_MS, Math.max(0, lastBatchMs));
  return new Promise((resolve) => setTimeout(resolve, delay));
}

function isBusyError(err: unknown): boolean {
  const details = err as { code?: unknown; errcode?: unknown; message?: unknown } | null;
  const code = details?.code ?? details?.errcode;
  // better-sqlite3 / bun:sqlite expose the symbolic code; node:sqlite exposes the numeric one.
  if (typeof code === "string" && /^SQLITE_(BUSY|LOCKED)/.test(code)) return true;
  if (code === 5 || code === 6) return true; // SQLITE_BUSY / SQLITE_LOCKED
  const message = err instanceof Error ? err.message : String(details?.message ?? err);
  return /database is locked|SQLITE_BUSY|SQLITE_LOCKED/i.test(message);
}

function checkpointQuietly(db: SqliteAdapter, mode: "PASSIVE"): void {
  if (!db.open) return;
  try {
    db.checkpoint(mode);
  } catch {
    // Best effort: WAL maintenance will retry later.
  }
}

/**
 * Reclaim pages freed by cleanup without blocking the event loop.
 *
 * Safe to call after every cleanup pass regardless of how many rows were
 * deleted: when the freelist is empty this is a handful of cheap PRAGMA reads.
 * Never throws for per-batch failures — the result carries `stopReason` (and
 * `error`) so callers can log partial progress. Exported for tests and for
 * callers that free space outside the scheduler.
 */
export async function reclaimFreedPages(
  options: ReclaimFreedPagesOptions = {}
): Promise<ReclaimFreedPagesResult> {
  const maxBatches = Math.max(1, Math.floor(options.maxBatches ?? INCREMENTAL_VACUUM_MAX_BATCHES));
  const timeBudgetMs = options.timeBudgetMs ?? INCREMENTAL_VACUUM_TIME_BUDGET_MS;
  const pause = options.pause ?? pauseBetweenBatches;
  const now = options.now ?? Date.now;

  const db = getDbInstance();
  const startedAt = now();
  const autoVacuum = readPragmaNumber(db, "auto_vacuum");
  const pageSize = readPragmaNumber(db, "page_size") || 4096;
  const freelistBefore = readPragmaNumber(db, "freelist_count");
  const batchPages = Math.max(
    1,
    Math.floor(options.batchPages ?? INCREMENTAL_VACUUM_BATCH_BYTES / pageSize)
  );

  const finish = (
    mode: ReclaimFreedPagesResult["mode"],
    freelistAfter: number,
    batches: number,
    stopReason?: ReclaimStopReason,
    error?: string
  ): ReclaimFreedPagesResult => ({
    mode,
    autoVacuum,
    pageSize,
    freelistBefore,
    freelistAfter,
    batches,
    durationMs: now() - startedAt,
    ...(stopReason ? { stopReason } : {}),
    ...(error ? { error } : {}),
  });

  if (freelistBefore <= 0) return finish("skipped", freelistBefore, 0);

  if (autoVacuum === AUTO_VACUUM_FULL) return finish("auto", freelistBefore, 0);

  if (autoVacuum !== AUTO_VACUUM_INCREMENTAL) {
    // NONE (or an unknown value): incremental reclamation is impossible.
    // Hand the decision to the scheduler; never rebuild here.
    requestFullVacuum(
      `cleanup left ${freelistBefore} free page(s) that auto_vacuum=${autoVacuum} cannot reclaim incrementally`
    );
    return finish("deferred", freelistBefore, 0);
  }

  let freelist = freelistBefore;
  let batches = 0;
  let lastBatchMs = 0;
  let stopReason: ReclaimStopReason = "drained";
  let error: string | undefined;

  while (freelist > 0) {
    if (batches >= maxBatches) {
      stopReason = "max-batches";
      break;
    }
    if (batches > 0) await pause(lastBatchMs);
    // The handle can be closed while we were paused (backup restore, DB import).
    if (!db.open) {
      stopReason = "closed";
      break;
    }

    const batchStartedAt = now();
    try {
      // `exec`, not `pragma()`: incremental_vacuum is a stepping pragma that frees one
      // page per step, and bun:sqlite's `all()` stops after the first zero-column row.
      db.exec(`PRAGMA incremental_vacuum(${batchPages})`);
    } catch (err) {
      if (isBusyError(err)) {
        stopReason = "busy";
      } else {
        stopReason = "error";
        error = err instanceof Error ? err.message : String(err);
      }
      break;
    }
    lastBatchMs = now() - batchStartedAt;
    batches += 1;
    freelist = readPragmaNumber(db, "freelist_count");

    if (batches % INCREMENTAL_VACUUM_CHECKPOINT_EVERY_BATCHES === 0) {
      checkpointQuietly(db, "PASSIVE");
    }
    if (freelist > 0 && now() - startedAt >= timeBudgetMs) {
      stopReason = "time-budget";
      break;
    }
  }

  // Fold reclaimed pages back without mutating live WAL file geometry.
  if (batches > 0) checkpointQuietly(db, "PASSIVE");

  return finish("incremental", freelist, batches, stopReason, error);
}

export function describeReclaim(result: ReclaimFreedPagesResult): string {
  switch (result.mode) {
    case "skipped":
      return "freelist already empty";
    case "auto":
      return `auto_vacuum=FULL reclaims on commit (${result.freelistBefore} page(s) pending)`;
    case "deferred":
      return `auto_vacuum=NONE — ${result.freelistBefore} free page(s) left for the scheduled VACUUM`;
    case "incremental": {
      const reclaimed = result.freelistBefore - result.freelistAfter;
      const mib = ((reclaimed * result.pageSize) / (1024 * 1024)).toFixed(1);
      const tail =
        result.freelistAfter > 0
          ? `, ${result.freelistAfter} left for the next pass (${result.stopReason})`
          : "";
      return (
        `reclaimed ${reclaimed} page(s) (~${mib} MiB) in ${result.batches} batch(es) ` +
        `over ${result.durationMs}ms${tail}`
      );
    }
  }
}
