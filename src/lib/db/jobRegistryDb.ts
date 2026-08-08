/**
 * JobRegistry persistence layer.
 *
 * CRUD for the `jobs` and `job_runs` tables (migration 136). All timestamps are
 * ISO-8601 strings; the registry computes thresholds in JS (never SQL datetime
 * arithmetic) so comparisons are plain string compares.
 *
 * Column naming follows the rest of src/lib/db: snake_case in SQLite, camelCase in
 * the returned objects (mapRow). `enabled` is stored INTEGER (0/1), `config` is a
 * JSON string parsed/stringified at the boundary.
 */

import { getDbInstance } from "./core";
import type { JobRecord, JobRun } from "../jobRegistry/core";

function mapJob(row: any): JobRecord {
  return {
    id: row.id,
    type: row.type,
    cron: row.cron,
    intervalMs: row.interval_ms,
    enabled: row.enabled === 1,
    envFlag: row.env_flag,
    config: row.config ? JSON.parse(row.config) : {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapRun(row: any): JobRun {
  return {
    id: row.id,
    jobId: row.job_id,
    startedAt: row.started_at,
    finishedAt: row.finished_at,
    status: row.status,
    errorMessage: row.error_message,
    recordsAffected: row.records_affected ?? 0,
    durationMs: row.duration_ms,
  };
}

export function getAllJobs(): JobRecord[] {
  const db = getDbInstance();
  const rows = db.prepare("SELECT * FROM jobs ORDER BY id").all();
  return rows.map(mapJob);
}

export function getJob(id: string): JobRecord | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM jobs WHERE id = ?").get(id);
  return row ? mapJob(row) : null;
}

/**
 * Idempotent register: INSERT OR IGNORE on first sight, then a column-level UPDATE
 * that refreshes scheduling fields (type/cron/interval/env_flag/config) and bumps
 * updated_at - but NEVER overwrites `enabled` (the user's API-driven toggle) nor
 * `created_at`. Pass enabled=true for new jobs; the UPDATE simply skips the column.
 */
export function upsertJob(job: JobRecord): void {
  const db = getDbInstance();
  db.prepare(
    `INSERT INTO jobs (id, type, cron, interval_ms, enabled, env_flag, config, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
     ON CONFLICT(id) DO UPDATE SET
       type = excluded.type,
       cron = excluded.cron,
       interval_ms = excluded.interval_ms,
       env_flag = excluded.env_flag,
       config = excluded.config,
       updated_at = datetime('now')`
  ).run(
    job.id,
    job.type,
    job.cron,
    job.intervalMs,
    job.enabled ? 1 : 0,
    job.envFlag,
    JSON.stringify(job.config ?? {}),
    job.createdAt
  );
}

export function updateJobEnabled(id: string, enabled: boolean): void {
  const db = getDbInstance();
  db.prepare("UPDATE jobs SET enabled = ?, updated_at = datetime('now') WHERE id = ?").run(
    enabled ? 1 : 0,
    id
  );
}

export interface RecordRunOptions {
  startedAt?: string;
  durationMs?: number;
  errorMessage?: string;
  recordsAffected?: number;
}

/**
 * Insert a completed run. `startedAt` is captured by the registry before the handler
 * runs; `finishedAt` is derived from startedAt + durationMs so the two never drift.
 * A status='running' insert leaves finishedAt NULL (used to mark in-flight work).
 */
export function recordRun(
  jobId: string,
  status: JobRun["status"],
  opts: RecordRunOptions = {}
): void {
  const db = getDbInstance();
  const startedAt = opts.startedAt ?? new Date().toISOString();
  const finishedAt =
    status === "running"
      ? null
      : opts.startedAt && opts.durationMs != null
        ? new Date(new Date(opts.startedAt).getTime() + opts.durationMs).toISOString()
        : new Date().toISOString();
  db.prepare(
    `INSERT INTO job_runs (job_id, started_at, finished_at, status, error_message, records_affected, duration_ms)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    jobId,
    startedAt,
    finishedAt,
    status,
    opts.errorMessage ?? null,
    opts.recordsAffected ?? 0,
    opts.durationMs ?? null
  );
}

/**
 * Dual-dimension pruning: keep the most recent `maxRuns` OR anything younger than
 * `maxDays`. A run is deleted only when it is BOTH outside the recent-N window AND
 * older than maxDays - so a job that runs rarely keeps its full history.
 * All thresholds are ISO-8601 string compares (no SQL datetime math).
 */
export function pruneRuns(jobId: string, maxRuns = 100, maxDays = 30): void {
  const db = getDbInstance();
  const threshold = new Date(Date.now() - maxDays * 86_400_000).toISOString();
  db.prepare(
    `DELETE FROM job_runs
     WHERE job_id = ?
       AND id NOT IN (
         SELECT id FROM job_runs WHERE job_id = ? ORDER BY started_at DESC LIMIT ?
       )
       AND started_at < ?`
  ).run(jobId, jobId, maxRuns, threshold);
}

export function getRuns(jobId: string, limit = 20): JobRun[] {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT * FROM job_runs WHERE job_id = ? ORDER BY started_at DESC LIMIT ?")
    .all(jobId, limit);
  return rows.map(mapRun);
}

/**
 * Startup repair: any run still marked `running` whose started_at is older than
 * `timeoutMinutes` is a leftover from a crashed/hung process. Mark it `failure` so
 * the history is accurate and the slot frees up. The 5-minute default avoids
 * clobbering a genuinely in-flight run on a slow box.
 */
export function cleanupOrphanedRuns(timeoutMinutes = 5): void {
  const db = getDbInstance();
  const threshold = new Date(Date.now() - timeoutMinutes * 60_000).toISOString();
  db.prepare(
    `UPDATE job_runs
     SET status = 'failure',
         error_message = 'orphaned: exceeded timeout',
         finished_at = datetime('now')
     WHERE status = 'running' AND started_at < ?`
  ).run(threshold);
}
