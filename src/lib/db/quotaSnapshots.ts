import { getDbInstance, rowToCamel } from "./core";
import type { QuotaSnapshotRow, ProviderUtilizationPoint } from "@/shared/types/utilization";

type JsonRecord = Record<string, unknown>;

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

let lastCleanupAt = 0;

export function saveQuotaSnapshot(snapshot: Omit<QuotaSnapshotRow, "id" | "created_at">): void {
  const db = getDbInstance() as unknown as DbLike;
  const now = new Date().toISOString();

  try {
    db.prepare(
      `INSERT INTO quota_snapshots
       (provider, connection_id, window_key, remaining_percentage, is_exhausted,
        next_reset_at, window_duration_ms, raw_data, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      snapshot.provider,
      snapshot.connection_id,
      snapshot.window_key,
      snapshot.remaining_percentage,
      snapshot.is_exhausted,
      snapshot.next_reset_at,
      snapshot.window_duration_ms,
      snapshot.raw_data,
      now
    );
  } catch (err: any) {
    if (err?.message?.includes("no such table")) {
      console.warn(
        "[QuotaSnapshots] Skipping save: quota_snapshots table not found. Awaiting migration."
      );
      return;
    }
    throw err;
  }
}

export function getQuotaSnapshots(opts: {
  provider?: string;
  connectionId?: string;
  since: string;
  until?: string;
}): QuotaSnapshotRow[] {
  const db = getDbInstance() as unknown as DbLike;
  const conditions: string[] = ["created_at >= ?"];
  const params: unknown[] = [opts.since];

  if (opts.provider) {
    conditions.push("provider = ?");
    params.push(opts.provider);
  }

  if (opts.connectionId) {
    conditions.push("connection_id = ?");
    params.push(opts.connectionId);
  }

  if (opts.until) {
    conditions.push("created_at <= ?");
    params.push(opts.until);
  }

  try {
    const sql = `SELECT * FROM quota_snapshots WHERE ${conditions.join(" AND ")} ORDER BY created_at ASC`;
    const rows = db.prepare(sql).all(...params);
    return rows.map((r) => rowToCamel(r) as unknown as QuotaSnapshotRow);
  } catch (err: any) {
    if (err?.message?.includes("no such table")) {
      return [];
    }
    throw err;
  }
}

export function getAggregatedSnapshots(opts: {
  provider?: string;
  since: string;
  until?: string;
  bucketMinutes: number;
  aggregateBy?: "provider" | "connection";
}): ProviderUtilizationPoint[] {
  const db = getDbInstance() as unknown as DbLike;
  const conditions: string[] = ["created_at >= ?"];
  const params: unknown[] = [opts.since];

  if (opts.provider) {
    conditions.push("provider = ?");
    params.push(opts.provider);
  }

  if (opts.until) {
    conditions.push("created_at <= ?");
    params.push(opts.until);
  }

  const bucketSeconds = Number(opts.bucketMinutes) * 60;
  if (!Number.isFinite(bucketSeconds) || bucketSeconds <= 0) {
    throw new Error("Invalid bucket size");
  }

  const groupFields =
    opts.aggregateBy === "connection"
      ? "bucket, provider, connection_id, window_key"
      : "bucket, provider, window_key";
  const selectKey =
    opts.aggregateBy === "connection" ? "provider || ':' || connection_id as provider" : "provider";

  try {
    const sql = `
      SELECT
        datetime((strftime('%s', created_at) / ${bucketSeconds}) * ${bucketSeconds}, 'unixepoch') as bucket,
        ${selectKey},
        AVG(remaining_percentage) as remainingPct,
        MAX(is_exhausted) as isExhausted,
        window_key
      FROM quota_snapshots
      WHERE ${conditions.join(" AND ")}
      GROUP BY ${groupFields}
      ORDER BY bucket ASC
    `;

    const rows = db.prepare(sql).all(...params) as Array<{
      bucket: string;
      provider: string;
      remainingPct: number | null;
      isExhausted: number;
      windowKey: string;
    }>;

    return rows.map((r) => ({
      timestamp: r.bucket,
      provider: r.provider,
      remainingPct: r.remainingPct ?? 0,
      isExhausted: r.isExhausted === 1,
      windowKey: r.windowKey,
    }));
  } catch (err: any) {
    if (err?.message?.includes("no such table")) {
      return [];
    }
    throw err;
  }
}

export function cleanupOldSnapshots(retentionDays = 90): number {
  const now = Date.now();
  const cleanupThresholdMs = 6 * 60 * 60 * 1000;

  if (now - lastCleanupAt < cleanupThresholdMs) {
    return 0;
  }

  const db = getDbInstance() as unknown as DbLike;
  const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000).toISOString();

  try {
    const result = db.prepare("DELETE FROM quota_snapshots WHERE created_at < ?").run(cutoffDate);
    lastCleanupAt = now;
    return result.changes;
  } catch (err: any) {
    if (err?.message?.includes("no such table")) {
      return 0;
    }
    throw err;
  }
}
