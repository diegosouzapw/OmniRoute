/**
 * Bounded call-log rotation and pruning.
 *
 * Extracted from callLogs.ts (#8249/#10125 file-size gate) — deletion of expired/overflow
 * rows, orphan artifact scanning, and the throttled rotation scheduler. Pure extraction, no
 * behavior change: callLogs.ts re-exports these symbols so existing importers are unaffected.
 */

import fs from "node:fs";
import path from "node:path";
import { getDbInstance } from "../db/core";
import {
  findReferencedArtifacts,
  selectCallLogIdsBefore,
  selectOverflowArtifactPaths,
} from "./callLogsBoundedQueries";
import {
  CALL_LOGS_DIR,
  deleteCallArtifact,
  type CallLogDetailState,
} from "./callLogArtifacts";
import { getCallLogMaxEntries, getCallLogRetentionDays, getCallLogsTableMaxRows } from "../logEnv";
import { isSqlitePagerCorruptError, notePagerCorruption } from "../db/healthCheck";

const CALL_LOG_ROTATE_THROTTLE_MS = 60_000;
const CALL_LOG_ROTATE_BATCH_SIZE = 100;
const CALL_LOG_ORPHAN_MIN_AGE_MS = 5 * 60_000;
let lastCallLogRotationScheduledAt = 0;
let callLogRotateInFlight = false;
let callLogRotateScheduled = false;

export type DeleteResult = {
  deletedRows: number;
  deletedArtifacts: number;
};

export function clearArtifactReference(relativePath: string, nextState: CallLogDetailState) {
  const db = getDbInstance();
  db.prepare(
    `
      UPDATE call_logs
      SET detail_state = ?,
          artifact_relpath = NULL,
          artifact_size_bytes = NULL,
          artifact_sha256 = NULL
      WHERE artifact_relpath = ?
    `
  ).run(nextState, relativePath);
}

// #5217: SQLite caps a statement at SQLITE_MAX_VARIABLE_NUMBER bound params
// (~999 on many builds). Callers like trimCallLogsToMaxRows() passed up to 5000
// ids in one `IN (...)` → "too many SQL variables" aborted trimming. Chunk well
// under the limit so each DELETE/SELECT stays valid.
const DELETE_ID_CHUNK_SIZE = 500;

function deleteCallLogRowsByIds(ids: string[]): DeleteResult {
  if (ids.length === 0) {
    return { deletedRows: 0, deletedArtifacts: 0 };
  }

  const db = getDbInstance();
  let deletedRows = 0;
  let deletedArtifacts = 0;

  for (let i = 0; i < ids.length; i += DELETE_ID_CHUNK_SIZE) {
    const chunk = ids.slice(i, i + DELETE_ID_CHUNK_SIZE);
    const placeholders = chunk.map(() => "?").join(", ");
    const rows = db
      .prepare(`SELECT artifact_relpath FROM call_logs WHERE id IN (${placeholders})`)
      .all(...chunk) as Array<{ artifact_relpath: string | null }>;

    const result = db.prepare(`DELETE FROM call_logs WHERE id IN (${placeholders})`).run(...chunk);
    deletedRows += result.changes;
    for (const row of rows) {
      if (deleteCallArtifact(row.artifact_relpath)) {
        deletedArtifacts++;
      }
    }
  }

  return {
    deletedRows,
    deletedArtifacts,
  };
}

type OrphanScanCursor = {
  baseDir: string;
  root: fs.Dir;
  day: fs.Dir | null;
  dayName: string | null;
  pendingDayName: string | null;
};

type OrphanScanBatch = {
  candidates: string[];
  exhausted: boolean;
  scannedEntries: number;
};

let orphanScanCursor: OrphanScanCursor | null = null;

function closeOrphanScanCursor(): void {
  try {
    orphanScanCursor?.day?.closeSync();
  } catch {}
  try {
    orphanScanCursor?.root.closeSync();
  } catch {}
  orphanScanCursor = null;
}

function readOrphanCandidates(
  baseDir: string,
  candidateLimit: number,
  scanLimit: number
): OrphanScanBatch {
  let scannedEntries = 0;
  if (!orphanScanCursor || orphanScanCursor.baseDir !== baseDir) {
    closeOrphanScanCursor();
    if (scannedEntries >= scanLimit) {
      return { candidates: [], exhausted: false, scannedEntries };
    }
    scannedEntries++;
    orphanScanCursor = {
      baseDir,
      root: fs.opendirSync(baseDir),
      day: null,
      dayName: null,
      pendingDayName: null,
    };
  }

  const candidates: string[] = [];
  let exhausted = false;
  while (candidates.length < candidateLimit && scannedEntries < scanLimit) {
    if (!orphanScanCursor.day) {
      if (orphanScanCursor.pendingDayName) {
        scannedEntries++;
        const dayName = orphanScanCursor.pendingDayName;
        orphanScanCursor.pendingDayName = null;
        try {
          orphanScanCursor.day = fs.opendirSync(path.join(baseDir, dayName));
          orphanScanCursor.dayName = dayName;
        } catch {
          continue;
        }
        continue;
      }

      scannedEntries++;
      const dayEntry = orphanScanCursor.root.readSync();
      if (!dayEntry) {
        closeOrphanScanCursor();
        exhausted = true;
        break;
      }
      if (!dayEntry.isDirectory()) continue;
      orphanScanCursor.pendingDayName = dayEntry.name;
      continue;
    }

    scannedEntries++;
    const fileEntry = orphanScanCursor.day.readSync();
    if (!fileEntry) {
      try {
        orphanScanCursor.day.closeSync();
      } catch {}
      orphanScanCursor.day = null;
      orphanScanCursor.dayName = null;
      continue;
    }
    if (!fileEntry.isFile() || !fileEntry.name.endsWith(".json")) continue;
    candidates.push(path.posix.join(orphanScanCursor.dayName!, fileEntry.name));
  }
  return { candidates, exhausted, scannedEntries };
}

export function cleanupOrphanCallLogFiles(
  baseDir = CALL_LOGS_DIR,
  options: { maxCandidates?: number; maxScanEntries?: number; minAgeMs?: number } = {}
) {
  if (!baseDir || !fs.existsSync(baseDir)) return 0;

  const maxCandidates = options.maxCandidates ?? Number.POSITIVE_INFINITY;
  const maxScanEntries = options.maxScanEntries ?? Number.POSITIVE_INFINITY;
  const minAgeMs = options.minAgeMs ?? 0;
  if (maxCandidates <= 0 || maxScanEntries <= 0) return 0;

  try {
    let deleted = 0;
    let remainingCandidates = maxCandidates;
    let remainingScanEntries = maxScanEntries;
    while (remainingCandidates > 0 && remainingScanEntries > 0) {
      const { candidates, exhausted, scannedEntries } = readOrphanCandidates(
        baseDir,
        Math.min(remainingCandidates, DELETE_ID_CHUNK_SIZE),
        remainingScanEntries
      );
      remainingCandidates -= candidates.length;
      remainingScanEntries -= scannedEntries;
      const oldEnough = candidates.filter((relativePath) => {
        if (minAgeMs <= 0) return true;
        try {
          return Date.now() - fs.statSync(path.join(baseDir, relativePath)).mtimeMs >= minAgeMs;
        } catch {
          return false;
        }
      });
      const referenced = findReferencedArtifacts(oldEnough);
      for (const relativePath of oldEnough) {
        if (!referenced.has(relativePath) && deleteCallArtifact(relativePath, baseDir)) deleted++;
      }
      if (exhausted || scannedEntries === 0) break;
    }
    return deleted;
  } catch (error) {
    closeOrphanScanCursor();
    console.error("[callLogs] Failed to prune orphan request artifacts:", (error as Error).message);
    return 0;
  }
}

export function cleanupOverflowCallLogFiles(
  baseDir = CALL_LOGS_DIR,
  maxEntries?: number,
  maxDeletes = Number.POSITIVE_INFINITY
) {
  if (!baseDir || !fs.existsSync(baseDir)) return 0;

  const limit = maxEntries ?? getCallLogMaxEntries();
  if (!Number.isInteger(limit) || limit < 1 || maxDeletes <= 0) return 0;

  try {
    let deleted = 0;
    while (deleted < maxDeletes) {
      const paths = selectOverflowArtifactPaths(
        limit,
        Math.min(DELETE_ID_CHUNK_SIZE, maxDeletes - deleted)
      );
      if (paths.length === 0) break;
      let progress = 0;
      for (const relativePath of paths) {
        if (deleteCallArtifact(relativePath, baseDir)) {
          clearArtifactReference(relativePath, "missing");
          deleted++;
          progress++;
        }
      }
      if (progress === 0) break;
    }
    return deleted;
  } catch (error) {
    console.error(
      "[callLogs] Failed to prune overflow request artifacts:",
      (error as Error).message
    );
    return 0;
  }
}

export function deleteCallLogsBefore(
  cutoff: string,
  maxDeletes = Number.POSITIVE_INFINITY
): DeleteResult {
  let deletedRows = 0;
  let deletedArtifacts = 0;
  while (deletedRows < maxDeletes) {
    const ids = selectCallLogIdsBefore(cutoff, Math.min(5000, maxDeletes - deletedRows));
    if (ids.length === 0) break;
    const result = deleteCallLogRowsByIds(ids);
    deletedRows += result.deletedRows;
    deletedArtifacts += result.deletedArtifacts;
    if (result.deletedRows === 0) break;
  }
  return { deletedRows, deletedArtifacts };
}

export function trimCallLogsToMaxRows(
  maxRows = getCallLogsTableMaxRows(),
  maxDeletes = Number.POSITIVE_INFINITY
) {
  if (!Number.isInteger(maxRows) || maxRows < 1 || maxDeletes <= 0) {
    return { deletedRows: 0, deletedArtifacts: 0 };
  }

  const db = getDbInstance();
  let deletedRows = 0;
  let deletedArtifacts = 0;

  while (deletedRows < maxDeletes) {
    const currentCount = db.prepare("SELECT COUNT(*) AS cnt FROM call_logs").get() as {
      cnt: number;
    };
    if (currentCount.cnt <= maxRows) break;

    const toDelete = Math.min(currentCount.cnt - maxRows, 5000, maxDeletes - deletedRows);
    const ids = db
      .prepare("SELECT id FROM call_logs ORDER BY timestamp ASC LIMIT ?")
      .all(toDelete)
      .map((row) => String((row as { id: string }).id));
    const result = deleteCallLogRowsByIds(ids);
    deletedRows += result.deletedRows;
    deletedArtifacts += result.deletedArtifacts;
    if (result.deletedRows === 0) break;
  }

  return { deletedRows, deletedArtifacts };
}

let callLogRotatePaused = false;

export function isCallLogRotatePaused(): boolean {
  return callLogRotatePaused;
}

export function resetCallLogRotateFence(): void {
  callLogRotatePaused = false;
}

export function handleCallLogRotateError(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.error("[callLogs] Failed to rotate request artifacts:", message);
  if (!isSqlitePagerCorruptError(error)) return;
  callLogRotatePaused = true;
  notePagerCorruption("call-log-rotate", error);
  console.error(
    "[callLogs] SQLITE_CORRUPT during rotation; pausing further rotate writes. Check /api/db/health."
  );
}

export function rotateCallLogs() {
  if (callLogRotatePaused) return;
  try {
    if (!CALL_LOGS_DIR || !fs.existsSync(CALL_LOGS_DIR)) return;

    const retentionMs = getCallLogRetentionDays() * 24 * 60 * 60 * 1000;
    const cutoff = new Date(Date.now() - retentionMs).toISOString();

    deleteCallLogsBefore(cutoff, CALL_LOG_ROTATE_BATCH_SIZE);
    trimCallLogsToMaxRows(getCallLogsTableMaxRows(), CALL_LOG_ROTATE_BATCH_SIZE);
    cleanupOverflowCallLogFiles(CALL_LOGS_DIR, getCallLogMaxEntries(), CALL_LOG_ROTATE_BATCH_SIZE);
    cleanupOrphanCallLogFiles(CALL_LOGS_DIR, {
      maxCandidates: CALL_LOG_ROTATE_BATCH_SIZE,
      maxScanEntries: CALL_LOG_ROTATE_BATCH_SIZE,
      minAgeMs: CALL_LOG_ORPHAN_MIN_AGE_MS,
    });
  } catch (error) {
    handleCallLogRotateError(error);
  }
}

function runScheduledCallLogRotation() {
  if (callLogRotateInFlight) return;
  callLogRotateInFlight = true;
  setImmediate(() => {
    try {
      rotateCallLogs();
    } catch (error) {
      handleCallLogRotateError(error);
    } finally {
      callLogRotateInFlight = false;
    }
  });
}

export function scheduleCallLogRotation() {
  if (!CALL_LOGS_DIR) return;
  const elapsed = Date.now() - lastCallLogRotationScheduledAt;
  if (elapsed >= CALL_LOG_ROTATE_THROTTLE_MS) {
    lastCallLogRotationScheduledAt = Date.now();
    runScheduledCallLogRotation();
    return;
  }
  if (callLogRotateScheduled) return;
  callLogRotateScheduled = true;
  lastCallLogRotationScheduledAt = Date.now();
  const timer = setTimeout(() => {
    callLogRotateScheduled = false;
    runScheduledCallLogRotation();
  }, CALL_LOG_ROTATE_THROTTLE_MS - elapsed);
  timer.unref?.();
}
