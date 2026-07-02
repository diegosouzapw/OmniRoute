import { getDbInstance } from "./core";

export interface CacheStatsEntry {
  provider: string;
  model?: string;
  compressionMode: string;
  cacheControlPresent: boolean;
  estimatedCacheHit: boolean;
  tokensSavedCompression: number;
  tokensSavedCaching: number;
  netSavings: number;
}

export interface CacheStatsSummary {
  totalRequests: number;
  avgNetSavings: number;
  cacheHitRate: number;
  byProvider: Record<string, { count: number; avgNetSavings: number; cacheHitRate: number }>;
}

export function recordCacheStats(entry: CacheStatsEntry): void {
  const db = getDbInstance();

  const sql = `INSERT INTO compression_cache_stats (
    provider, 
    model, 
    compression_mode, 
    cache_control_present, 
    estimated_cache_hit, 
    tokens_saved_compression, 
    tokens_saved_caching, 
    net_savings
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.prepare(sql).run(
    entry.provider,
    entry.model ?? "",
    entry.compressionMode,
    entry.cacheControlPresent ? 1 : 0,
    entry.estimatedCacheHit ? 1 : 0,
    entry.tokensSavedCompression,
    entry.tokensSavedCaching,
    entry.netSavings
  );
}

export function getCacheStatsSummary(since?: Date): CacheStatsSummary {
  const db = getDbInstance();
  const whereClause = since ? "WHERE created_at >= ?" : "";
  const params = since ? [since.toISOString()] : [];

  // Global aggregates
  const globalRow = since
    ? (db
        .prepare(
          `SELECT COUNT(*) as totalRequests, AVG(net_savings) as avgNetSavings, SUM(estimated_cache_hit) * 1.0 / COUNT(*) as cacheHitRate FROM compression_cache_stats WHERE created_at >= ?`
        )
        .get(since.toISOString()) as
        | { totalRequests: number; avgNetSavings: number; cacheHitRate: number }
        | undefined)
    : (db
        .prepare(
          `SELECT COUNT(*) as totalRequests, AVG(net_savings) as avgNetSavings, SUM(estimated_cache_hit) * 1.0 / COUNT(*) as cacheHitRate FROM compression_cache_stats`
        )
        .get() as
        | { totalRequests: number; avgNetSavings: number; cacheHitRate: number }
        | undefined);

  if (!globalRow || globalRow.totalRequests === 0) {
    return { totalRequests: 0, avgNetSavings: 0, cacheHitRate: 0, byProvider: {} };
  }

  // Per-provider aggregates
  const providerRows = since
    ? (db
        .prepare(
          `SELECT provider, COUNT(*) as count, AVG(net_savings) as avgNetSavings, SUM(estimated_cache_hit) * 1.0 / COUNT(*) as cacheHitRate FROM compression_cache_stats WHERE created_at >= ? GROUP BY provider`
        )
        .all(since.toISOString()) as Array<{
        provider: string;
        count: number;
        avgNetSavings: number;
        cacheHitRate: number;
      }>)
    : (db
        .prepare(
          `SELECT provider, COUNT(*) as count, AVG(net_savings) as avgNetSavings, SUM(estimated_cache_hit) * 1.0 / COUNT(*) as cacheHitRate FROM compression_cache_stats GROUP BY provider`
        )
        .all() as Array<{
        provider: string;
        count: number;
        avgNetSavings: number;
        cacheHitRate: number;
      }>);

  const byProvider: Record<string, { count: number; avgNetSavings: number; cacheHitRate: number }> =
    {};
  for (const row of providerRows) {
    byProvider[row.provider] = {
      count: row.count,
      avgNetSavings: row.avgNetSavings,
      cacheHitRate: row.cacheHitRate,
    };
  }

  return {
    totalRequests: globalRow.totalRequests,
    avgNetSavings: globalRow.avgNetSavings ?? 0,
    cacheHitRate: globalRow.cacheHitRate ?? 0,
    byProvider,
  };
}
