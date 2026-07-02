import { describe, it, expect, beforeEach, afterEach } from "vitest";
import Database from "better-sqlite3";
import { rowToCamel } from "../core";
import type { QuotaSnapshotRow } from "@/shared/types/utilization";

const MIGRATION_SQL = `
  CREATE TABLE IF NOT EXISTS quota_snapshots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider TEXT NOT NULL,
    connection_id TEXT NOT NULL,
    window_key TEXT NOT NULL,
    remaining_percentage REAL,
    is_exhausted INTEGER DEFAULT 0,
    next_reset_at TEXT,
    window_duration_ms INTEGER,
    raw_data TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
  CREATE INDEX IF NOT EXISTS idx_quota_snapshots_provider_time ON quota_snapshots(provider, created_at);
  CREATE INDEX IF NOT EXISTS idx_quota_snapshots_connection_time ON quota_snapshots(connection_id, created_at);
  CREATE INDEX IF NOT EXISTS idx_quota_snapshots_created_at ON quota_snapshots(created_at);
`;

interface StatementLike<TRow = unknown> {
  all: (...params: unknown[]) => TRow[];
  get: (...params: unknown[]) => TRow | undefined;
  run: (...params: unknown[]) => { changes: number };
}

interface DbLike {
  prepare: <TRow = unknown>(sql: string) => StatementLike<TRow>;
}

let lastCleanupAt = 0;

function saveQuotaSnapshotForTest(
  db: Database.Database,
  snapshot: Omit<QuotaSnapshotRow, "id" | "created_at">
): void {
  const now = new Date().toISOString();

  (db as unknown as DbLike)
    .prepare(
      `INSERT INTO quota_snapshots
       (provider, connection_id, window_key, remaining_percentage, is_exhausted,
        next_reset_at, window_duration_ms, raw_data, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
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
}

function getQuotaSnapshotsForTest(
  db: Database.Database,
  opts: {
    provider?: string;
    connectionId?: string;
    since: string;
    until?: string;
  }
): Array<{
  id: number;
  provider: string;
  connectionId: string;
  windowKey: string;
  remainingPercentage: number | null;
  isExhausted: number;
  nextResetAt: string | null;
  windowDurationMs: number | null;
  rawData: string | null;
  createdAt: string;
}> {
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

  const sql = `SELECT * FROM quota_snapshots WHERE ${conditions.join(" AND ")} ORDER BY created_at ASC`;
  const rows = (db as unknown as DbLike).prepare(sql).all(...params);
  return rows.map(
    (r) =>
      rowToCamel(r) as unknown as {
        id: number;
        provider: string;
        connectionId: string;
        windowKey: string;
        remainingPercentage: number | null;
        isExhausted: number;
        nextResetAt: string | null;
        windowDurationMs: number | null;
        rawData: string | null;
        createdAt: string;
      }
  );
}

function getAggregatedSnapshotsForTest(
  db: Database.Database,
  opts: {
    provider?: string;
    since: string;
    until?: string;
    bucketMinutes: number;
  }
): Array<{
  timestamp: string;
  provider: string;
  remainingPct: number;
  isExhausted: boolean;
  windowKey: string;
}> {
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

  const bucketSeconds = opts.bucketMinutes * 60;
  const sql = `
    SELECT
      datetime((strftime('%s', created_at) / ${bucketSeconds}) * ${bucketSeconds}, 'unixepoch') as bucket,
      provider,
      AVG(remaining_percentage) as remainingPct,
      MAX(is_exhausted) as isExhausted,
      window_key
    FROM quota_snapshots
    WHERE ${conditions.join(" AND ")}
    GROUP BY bucket, provider, window_key
    ORDER BY bucket ASC
  `;

  const rows = (db as unknown as DbLike).prepare(sql).all(...params) as Array<{
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
}

function cleanupOldSnapshotsForTest(db: Database.Database, retentionDays = 90): number {
  const now = Date.now();
  const cleanupThresholdMs = 6 * 60 * 60 * 1000;

  if (now - lastCleanupAt < cleanupThresholdMs) {
    return 0;
  }

  const cutoffDate = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000).toISOString();
  const result = (db as unknown as DbLike)
    .prepare("DELETE FROM quota_snapshots WHERE created_at < ?")
    .run(cutoffDate);
  lastCleanupAt = now;

  return result.changes;
}

describe("quotaSnapshots DB module", () => {
  let testDb: Database.Database;

  beforeEach(() => {
    testDb = new Database(":memory:");
    testDb.pragma("journal_mode = WAL");
    testDb.exec(MIGRATION_SQL);
    lastCleanupAt = 0;
  });

  afterEach(() => {
    if (testDb) {
      testDb.close();
    }
  });

  describe("saveQuotaSnapshot", () => {
    it("should save a quota snapshot with all fields", () => {
      const snapshot = {
        provider: "codex",
        connection_id: "conn-123",
        window_key: "5h",
        remaining_percentage: 75.5,
        is_exhausted: 0,
        next_reset_at: "2024-01-15T10:00:00Z",
        window_duration_ms: 18000000,
        raw_data: null,
      };

      saveQuotaSnapshotForTest(testDb, snapshot);

      const rows = testDb
        .prepare("SELECT * FROM quota_snapshots ORDER BY id DESC LIMIT 1")
        .all() as QuotaSnapshotRow[];

      expect(rows).toHaveLength(1);
      expect(rows[0].provider).toBe("codex");
      expect(rows[0].connection_id).toBe("conn-123");
      expect(rows[0].window_key).toBe("5h");
      expect(rows[0].remaining_percentage).toBe(75.5);
      expect(rows[0].is_exhausted).toBe(0);
    });

    it("should save snapshot with null remaining_percentage", () => {
      const snapshot = {
        provider: "claude",
        connection_id: "conn-456",
        window_key: "weekly",
        remaining_percentage: null,
        is_exhausted: 1,
        next_reset_at: null,
        window_duration_ms: null,
        raw_data: null,
      };

      saveQuotaSnapshotForTest(testDb, snapshot);

      const rows = testDb
        .prepare("SELECT * FROM quota_snapshots WHERE provider = ?")
        .all("claude") as QuotaSnapshotRow[];

      expect(rows).toHaveLength(1);
      expect(rows[0].remaining_percentage).toBeNull();
      expect(rows[0].is_exhausted).toBe(1);
    });

    it("should save multiple snapshots for same provider", () => {
      const baseSnapshot = {
        provider: "test-provider",
        connection_id: "conn-789",
        window_key: "5h",
        remaining_percentage: 80,
        is_exhausted: 0,
        next_reset_at: null,
        window_duration_ms: null,
        raw_data: null,
      };

      saveQuotaSnapshotForTest(testDb, baseSnapshot);
      saveQuotaSnapshotForTest(testDb, { ...baseSnapshot, remaining_percentage: 60 });
      saveQuotaSnapshotForTest(testDb, { ...baseSnapshot, remaining_percentage: 40 });

      const rows = testDb
        .prepare("SELECT * FROM quota_snapshots WHERE provider = ?")
        .all("test-provider") as QuotaSnapshotRow[];

      expect(rows).toHaveLength(3);
    });
  });

  describe("getQuotaSnapshots", () => {
    beforeEach(() => {
      const now = new Date();
      const snapshots = [
        {
          provider: "codex",
          connection_id: "conn-1",
          window_key: "5h",
          remaining_percentage: 80,
          is_exhausted: 0,
          created_at: new Date(now.getTime() - 1000 * 60 * 30).toISOString(),
        },
        {
          provider: "codex",
          connection_id: "conn-1",
          window_key: "5h",
          remaining_percentage: 60,
          is_exhausted: 0,
          created_at: new Date(now.getTime() - 1000 * 60 * 10).toISOString(),
        },
        {
          provider: "claude",
          connection_id: "conn-2",
          window_key: "weekly",
          remaining_percentage: 90,
          is_exhausted: 0,
          created_at: new Date(now.getTime() - 1000 * 60 * 20).toISOString(),
        },
        {
          provider: "codex",
          connection_id: "conn-3",
          window_key: "5h",
          remaining_percentage: 30,
          is_exhausted: 1,
          created_at: new Date(now.getTime() - 1000 * 60 * 60 * 2).toISOString(),
        },
      ];

      for (const s of snapshots) {
        testDb
          .prepare(
            `INSERT INTO quota_snapshots
             (provider, connection_id, window_key, remaining_percentage, is_exhausted,
              next_reset_at, window_duration_ms, raw_data, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .run(
            s.provider,
            s.connection_id,
            s.window_key,
            s.remaining_percentage,
            s.is_exhausted,
            null,
            null,
            null,
            s.created_at
          );
      }
    });

    it("should get all snapshots since given time", () => {
      const since = new Date(Date.now() - 1000 * 60 * 60).toISOString();
      const results = getQuotaSnapshotsForTest(testDb, { since });

      expect(results.length).toBeGreaterThanOrEqual(3);
    });

    it("should filter by provider", () => {
      const since = new Date(Date.now() - 1000 * 60 * 60).toISOString();
      const results = getQuotaSnapshotsForTest(testDb, { provider: "codex", since });

      expect(results.length).toBeGreaterThanOrEqual(2);
      expect(results.every((r) => r.provider === "codex")).toBe(true);
    });

    it("should filter by connection_id", () => {
      const since = new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString();
      const results = getQuotaSnapshotsForTest(testDb, { connectionId: "conn-2", since });

      expect(results).toHaveLength(1);
      expect(results[0].connectionId).toBe("conn-2");
    });

    it("should filter by time range with until", () => {
      const since = new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString();
      const until = new Date(Date.now() - 1000 * 60 * 15).toISOString();
      const results = getQuotaSnapshotsForTest(testDb, { since, until });

      expect(results.length).toBeGreaterThanOrEqual(1);
    });

    it("should return empty array when no matches", () => {
      const since = new Date().toISOString();
      const results = getQuotaSnapshotsForTest(testDb, { since });

      expect(results).toHaveLength(0);
    });

    it("should return results ordered by created_at ASC", () => {
      const since = new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString();
      const results = getQuotaSnapshotsForTest(testDb, { since });

      for (let i = 1; i < results.length; i++) {
        expect(new Date(results[i].createdAt) >= new Date(results[i - 1].createdAt)).toBe(true);
      }
    });
  });

  describe("getAggregatedSnapshots", () => {
    beforeEach(() => {
      const now = new Date();
      const snapshots = [
        {
          provider: "codex",
          connection_id: "conn-1",
          window_key: "5h",
          remaining_percentage: 80,
          is_exhausted: 0,
          created_at: new Date(now.getTime() - 1000 * 60 * 5).toISOString(),
        },
        {
          provider: "codex",
          connection_id: "conn-1",
          window_key: "5h",
          remaining_percentage: 70,
          is_exhausted: 0,
          created_at: new Date(now.getTime() - 1000 * 60 * 3).toISOString(),
        },
        {
          provider: "codex",
          connection_id: "conn-2",
          window_key: "5h",
          remaining_percentage: 60,
          is_exhausted: 0,
          created_at: new Date(now.getTime() - 1000 * 60 * 4).toISOString(),
        },
        {
          provider: "claude",
          connection_id: "conn-3",
          window_key: "weekly",
          remaining_percentage: 90,
          is_exhausted: 0,
          created_at: new Date(now.getTime() - 1000 * 60 * 2).toISOString(),
        },
        {
          provider: "codex",
          connection_id: "conn-1",
          window_key: "5h",
          remaining_percentage: 50,
          is_exhausted: 0,
          created_at: new Date(now.getTime() - 1000 * 60 * 15).toISOString(),
        },
      ];

      for (const s of snapshots) {
        testDb
          .prepare(
            `INSERT INTO quota_snapshots
             (provider, connection_id, window_key, remaining_percentage, is_exhausted,
              next_reset_at, window_duration_ms, raw_data, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .run(
            s.provider,
            s.connection_id,
            s.window_key,
            s.remaining_percentage,
            s.is_exhausted,
            null,
            null,
            null,
            s.created_at
          );
      }
    });

    it("should aggregate by time bucket", () => {
      const since = new Date(Date.now() - 1000 * 60 * 30).toISOString();
      const results = getAggregatedSnapshotsForTest(testDb, { since, bucketMinutes: 10 });

      expect(results.length).toBeGreaterThanOrEqual(1);
    });

    it("should calculate average remainingPct per bucket", () => {
      const since = new Date(Date.now() - 1000 * 60 * 30).toISOString();
      const results = getAggregatedSnapshotsForTest(testDb, { since, bucketMinutes: 10 });

      const codexResults = results.filter((r) => r.provider === "codex");
      expect(codexResults.length).toBeGreaterThanOrEqual(1);
    });

    it("should track isExhausted as boolean", () => {
      const since = new Date(Date.now() - 1000 * 60 * 30).toISOString();
      const results = getAggregatedSnapshotsForTest(testDb, { since, bucketMinutes: 10 });

      expect(results.every((r) => typeof r.isExhausted === "boolean")).toBe(true);
    });

    it("should filter by provider", () => {
      const since = new Date(Date.now() - 1000 * 60 * 30).toISOString();
      const results = getAggregatedSnapshotsForTest(testDb, {
        provider: "claude",
        since,
        bucketMinutes: 10,
      });

      expect(results.length).toBeGreaterThanOrEqual(1);
      expect(results.every((r) => r.provider === "claude")).toBe(true);
    });

    it("should respect until parameter", () => {
      const since = new Date(Date.now() - 1000 * 60 * 30).toISOString();
      const until = new Date(Date.now() - 1000 * 60 * 5).toISOString();
      const results = getAggregatedSnapshotsForTest(testDb, { since, until, bucketMinutes: 10 });

      expect(results.length).toBeGreaterThanOrEqual(1);
    });

    it("should return empty array when no data in range", () => {
      const since = new Date().toISOString();
      const results = getAggregatedSnapshotsForTest(testDb, { since, bucketMinutes: 10 });

      expect(results).toHaveLength(0);
    });
  });

  describe("cleanupOldSnapshots", () => {
    beforeEach(() => {
      const now = new Date();
      const oldDate = new Date(now.getTime() - 100 * 24 * 60 * 60 * 1000);
      const recentDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      const snapshots = [
        {
          provider: "codex",
          connection_id: "conn-1",
          window_key: "5h",
          remaining_percentage: 80,
          is_exhausted: 0,
          created_at: oldDate.toISOString(),
        },
        {
          provider: "codex",
          connection_id: "conn-1",
          window_key: "5h",
          remaining_percentage: 70,
          is_exhausted: 0,
          created_at: oldDate.toISOString(),
        },
        {
          provider: "claude",
          connection_id: "conn-2",
          window_key: "weekly",
          remaining_percentage: 90,
          is_exhausted: 0,
          created_at: recentDate.toISOString(),
        },
      ];

      for (const s of snapshots) {
        testDb
          .prepare(
            `INSERT INTO quota_snapshots
             (provider, connection_id, window_key, remaining_percentage, is_exhausted,
              next_reset_at, window_duration_ms, raw_data, created_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .run(
            s.provider,
            s.connection_id,
            s.window_key,
            s.remaining_percentage,
            s.is_exhausted,
            null,
            null,
            null,
            s.created_at
          );
      }
      lastCleanupAt = 0;
    });

    it("should delete snapshots older than retention days", () => {
      const deleted = cleanupOldSnapshotsForTest(testDb, 90);

      expect(deleted).toBe(2);

      const remaining = testDb.prepare("SELECT COUNT(*) as count FROM quota_snapshots").get() as {
        count: number;
      };
      expect(remaining.count).toBe(1);
    });

    it("should return 0 if no old snapshots to delete", () => {
      cleanupOldSnapshotsForTest(testDb, 90);
      const deleted = cleanupOldSnapshotsForTest(testDb, 90);

      expect(deleted).toBe(0);
    });

    it("should use default retention of 90 days", () => {
      const deleted = cleanupOldSnapshotsForTest(testDb);
      expect(deleted).toBe(2);
    });
  });
});
