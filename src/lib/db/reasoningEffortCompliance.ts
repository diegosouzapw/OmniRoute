// Bounded call_logs reader: whether reasoning_effort=none was honored,
// per model, over a trailing window. The health route projects this onto
// each item; unknown is a legitimate state when the sample is empty.
import { getDbInstance } from "./core";

export type NoneHonoredEntry = { honored: boolean | null; sampleSize: number };

export type NoneHonoredSnapshot = {
  observedAt: string;
  window: { hours: number; sinceIso: string };
  entries: Map<string, NoneHonoredEntry>;
};

const DEFAULT_WINDOW_HOURS = 24;
const DEFAULT_CACHE_TTL_MS = 20_000;
const DEFAULT_MIN_SAMPLE = 3;

function readPositiveInt(raw: string | undefined, fallback: number): number {
  if (raw === undefined) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : fallback;
}

type NoneHonoredSettings = { windowHours: number; cacheTtlMs: number; minSample: number };

function readSettings(): NoneHonoredSettings {
  return {
    windowHours: readPositiveInt(process.env.NONE_HONORED_WINDOW_HOURS, DEFAULT_WINDOW_HOURS),
    cacheTtlMs: readPositiveInt(process.env.NONE_HONORED_CACHE_TTL_MS, DEFAULT_CACHE_TTL_MS),
    minSample: readPositiveInt(process.env.NONE_HONORED_MIN_SAMPLE, DEFAULT_MIN_SAMPLE),
  };
}

type ComplianceRow = { model_key: string | null; n: number; violated: number };

let cached: { at: number; snapshot: NoneHonoredSnapshot } | null = null;

function queryCompliance(db: ReturnType<typeof getDbInstance>, sinceIso: string): ComplianceRow[] {
  return db
    .prepare(
      `SELECT COALESCE(NULLIF(TRIM(requested_model), ''), TRIM(model)) AS model_key,
              COUNT(*) AS n,
              SUM(CASE WHEN COALESCE(tokens_reasoning, 0) > 0
                        OR reasoning_encrypted = 1
                        OR COALESCE(reasoning_chars, 0) > 0
                       THEN 1 ELSE 0 END) AS violated
       FROM call_logs
       WHERE timestamp >= ?
         AND TRIM(LOWER(reasoning_effort_requested)) = 'none'
       GROUP BY model_key`
    )
    .all(sinceIso) as ComplianceRow[];
}

export function getNoneHonoredSnapshot(
  db: ReturnType<typeof getDbInstance> = getDbInstance(),
  now: number = Date.now()
): NoneHonoredSnapshot {
  const { windowHours, cacheTtlMs, minSample } = readSettings();
  if (cached && now - cached.at < cacheTtlMs) return cached.snapshot;

  const sinceIso = new Date(now - windowHours * 3_600_000).toISOString();
  const entries = new Map<string, NoneHonoredEntry>();
  for (const row of queryCompliance(db, sinceIso)) {
    const key = typeof row.model_key === "string" ? row.model_key.trim() : "";
    if (key.length === 0) continue;
    const sampleSize = Number(row.n) || 0;
    entries.set(
      key,
      sampleSize < minSample
        ? { honored: null, sampleSize }
        : { honored: row.violated === 0, sampleSize }
    );
  }
  const snapshot: NoneHonoredSnapshot = {
    observedAt: new Date(now).toISOString(),
    window: { hours: windowHours, sinceIso },
    entries,
  };
  cached = { at: now, snapshot };
  return snapshot;
}

export function readNoneHonored(snapshot: NoneHonoredSnapshot, modelId: string): NoneHonoredEntry {
  return snapshot.entries.get(modelId) ?? { honored: null, sampleSize: 0 };
}

export function clearNoneHonoredCache(): void {
  cached = null;
}

export function noneHonoredCacheSizeForTest(): number {
  return cached ? 1 : 0;
}
