/**
 * bifrostModels.ts — DB domain module for the Bifrost Tier-1 router model catalog cache.
 *
 * Backs the `bifrost_models` + `bifrost_models_meta` tables (migration 100).
 * Replaces the implicit "ask Bifrost on every dispatch" pattern with a
 * stale-tolerant local cache.
 *
 * Cache contract:
 *   - `getBifrostModel(provider, id)` — single lookup, returns null when expired.
 *   - `listBifrostModelsForProvider(provider)` — full provider catalog, dropping expired.
 *   - `refreshBifrostModels(provider, fetcher)` — fetch from Bifrost, upsert.
 *   - `recordBifrostFetch(provider, status, modelCount)` — observability meta upsert.
 *   - `purgeExpiredBifrostModels()` — housekeeping, returns row count.
 *   - `purgeBifrostModelsByProvider(provider)` — operator manual purge.
 *
 * See: docs/adr/0031-bifrost-tier1-router.md § Provider identity model
 *      PLAN.md § 2.5.2 (B4)
 *      vendor/bifrost/VENDOR.md
 */

import { getDbInstance, rowToCamel } from "./core";

// ──────────────── Types ────────────────

export interface BifrostModel {
  provider: string;
  id: string;
  ownedBy: string | null;
  displayName: string | null;
  metadata: Record<string, unknown> | null;
  fetchedAt: string;
  expiresAt: string;
}

export interface BifrostModelMeta {
  provider: string;
  lastFetchedAt: string;
  lastStatus: "ok" | "error" | "partial";
  lastError: string | null;
  modelCount: number;
  fetchCount: number;
}

/** Shape of one entry in Bifrost's /v1/models response (OpenAI-compatible). */
export interface BifrostModelListEntry {
  id: string;
  object?: string;
  created?: number;
  owned_by?: string;
  /** Bifrost extensions: display name, context window, modalities, pricing tier. */
  display_name?: string;
  metadata?: Record<string, unknown>;
}

/** Result of a fetch-from-Bifrost operation. */
export interface BifrostRefreshResult {
  provider: string;
  fetched: number;
  upserted: number;
  unchanged: number;
  durationMs: number;
}

/** Fetcher callback signature; injected so callers can wire in tests + metrics. */
export type BifrostFetcher = (
  provider: string
) => Promise<BifrostModelListEntry[]> | BifrostModelListEntry[];

export class BifrostCacheError extends Error {
  constructor(
    message: string,
    readonly provider: string,
    readonly cause?: unknown
  ) {
    super(message);
    this.name = "BifrostCacheError";
  }
}

// ──────────────── Defaults ────────────────

/** Default TTL for cached rows when a refresh doesn't supply one (1 hour). */
export const BIFROST_DEFAULT_TTL_SECONDS = 60 * 60;

/** Reasonable upper bound on a single /v1/models response to avoid runaway DB growth. */
export const BIFROST_MAX_MODELS_PER_FETCH = 5_000;

// ──────────────── Helpers ────────────────

function rowToModel(row: Record<string, unknown>): BifrostModel | null {
  const camel = rowToCamel(row) ?? {};
  const provider = typeof camel.provider === "string" ? camel.provider : "";
  const id = typeof camel.id === "string" ? camel.id : "";
  if (!provider || !id) return null;

  let metadata: Record<string, unknown> | null = null;
  const rawMetadata = camel.metadata;
  if (typeof rawMetadata === "string" && rawMetadata.length > 0) {
    try {
      const parsed = JSON.parse(rawMetadata);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        metadata = parsed as Record<string, unknown>;
      }
    } catch {
      // Corrupted JSON: leave metadata null and let caller decide whether
      // to purge the row.
      metadata = null;
    }
  } else if (rawMetadata && typeof rawMetadata === "object" && !Array.isArray(rawMetadata)) {
    metadata = rawMetadata as Record<string, unknown>;
  }

  return {
    provider,
    id,
    ownedBy: typeof camel.ownedBy === "string" ? camel.ownedBy : null,
    displayName: typeof camel.displayName === "string" ? camel.displayName : null,
    metadata,
    fetchedAt: String(camel.fetchedAt ?? ""),
    expiresAt: String(camel.expiresAt ?? ""),
  };
}

function isExpiredRow(row: { expiresAt?: string | null }): boolean {
  if (!row.expiresAt) return false;
  return new Date(row.expiresAt).getTime() < Date.now();
}

function computeExpiresAt(ttlSeconds: number): string {
  const ttl = Number.isFinite(ttlSeconds) && ttlSeconds > 0
    ? Math.floor(ttlSeconds)
    : BIFROST_DEFAULT_TTL_SECONDS;
  return new Date(Date.now() + ttl * 1000).toISOString();
}

function safeParseEntry(entry: BifrostModelListEntry, provider: string): {
  provider: string;
  id: string;
  ownedBy: string | null;
  displayName: string | null;
  metadataJson: string | null;
} | null {
  if (!entry || typeof entry !== "object" || typeof entry.id !== "string" || entry.id.length === 0) {
    return null;
  }

  const ownedBy = typeof entry.owned_by === "string" && entry.owned_by.length > 0
    ? entry.owned_by
    : null;
  const displayName = typeof entry.display_name === "string" && entry.display_name.length > 0
    ? entry.display_name
    : null;

  let metadataJson: string | null = null;
  if (entry.metadata && typeof entry.metadata === "object") {
    try {
      metadataJson = JSON.stringify(entry.metadata);
    } catch {
      metadataJson = null;
    }
  }

  return { provider, id: entry.id, ownedBy, displayName, metadataJson };
}

// ──────────────── CRUD ────────────────

/**
 * Look up a single model. Returns null if missing or expired.
 * Set `includeExpired = true` to bypass the TTL check (debug-only).
 */
export function getBifrostModel(
  provider: string,
  id: string,
  includeExpired = false
): BifrostModel | null {
  if (!provider || !id) return null;

  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT provider, id, owned_by, display_name, metadata,
              fetched_at, expires_at
       FROM bifrost_models
       WHERE provider = ? AND id = ?`
    )
    .get(provider, id) as Record<string, unknown> | undefined;

  if (!row) return null;

  const model = rowToModel(row);
  if (!model) return null;

  if (!includeExpired && isExpiredRow(model)) return null;
  return model;
}

/**
 * List all non-expired cached models for a provider. Useful for dashboard
 * "what does Bifrost say about this provider?" views.
 */
export function listBifrostModelsForProvider(provider: string): BifrostModel[] {
  if (!provider) return [];

  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT provider, id, owned_by, display_name, metadata,
              fetched_at, expires_at
       FROM bifrost_models
       WHERE provider = ?
         AND datetime(expires_at) > datetime('now')
       ORDER BY id ASC`
    )
    .all(provider) as Record<string, unknown>[];

  const out: BifrostModel[] = [];
  for (const row of rows) {
    const model = rowToModel(row);
    if (model) out.push(model);
  }
  return out;
}

/**
 * Return the cache-state metadata for a provider, or null if never fetched.
 */
export function getBifrostModelMeta(provider: string): BifrostModelMeta | null {
  if (!provider) return null;

  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT provider, last_fetched_at, last_status, last_error,
              model_count, fetch_count
       FROM bifrost_models_meta
       WHERE provider = ?`
    )
    .get(provider) as Record<string, unknown> | undefined;

  if (!row) return null;

  const camel = rowToCamel(row) ?? {};
  const lastStatus = String(camel.lastStatus ?? "ok");
  if (lastStatus !== "ok" && lastStatus !== "error" && lastStatus !== "partial") {
    return null;
  }

  return {
    provider: String(camel.provider ?? provider),
    lastFetchedAt: String(camel.lastFetchedAt ?? ""),
    lastStatus,
    lastError: typeof camel.lastError === "string" ? camel.lastError : null,
    modelCount: typeof camel.modelCount === "number" ? camel.modelCount : 0,
    fetchCount: typeof camel.fetchCount === "number" ? camel.fetchCount : 0,
  };
}

/**
 * Refresh the cache for a single provider. Fetches via `fetcher`, upserts the
 * result rows, and records cache-state metadata. Throws BifrostCacheError on
 * fatal failure (network/parse); partial-success behavior is configurable.
 */
export async function refreshBifrostModels(
  provider: string,
  fetcher: BifrostFetcher,
  options?: {
    ttlSeconds?: number;
    /**
     * If true, a non-empty list with some parse failures is treated as
     * "partial" success (still upserts what parsed). Default true.
     */
    allowPartial?: boolean;
  }
): Promise<BifrostRefreshResult> {
  if (!provider) throw new BifrostCacheError("provider is required", provider);
  if (typeof fetcher !== "function") {
    throw new BifrostCacheError("fetcher must be a function", provider);
  }

  const allowPartial = options?.allowPartial ?? true;
  const ttlSeconds = options?.ttlSeconds ?? BIFROST_DEFAULT_TTL_SECONDS;
  const expiresAt = computeExpiresAt(ttlSeconds);

  const startedAt = Date.now();
  let rawList: BifrostModelListEntry[];
  try {
    const result = await Promise.resolve(fetcher(provider));
    if (!Array.isArray(result)) {
      throw new Error("fetcher did not return an array");
    }
    rawList = result;
  } catch (err) {
    recordBifrostFetch(provider, "error", 0, errMsg(err));
    throw new BifrostCacheError(
      `failed to fetch models for ${provider}: ${errMsg(err)}`,
      provider,
      err
    );
  }

  if (rawList.length > BIFROST_MAX_MODELS_PER_FETCH) {
    recordBifrostFetch(
      provider,
      "error",
      0,
      `response exceeded max ${BIFROST_MAX_MODELS_PER_FETCH} entries`
    );
    throw new BifrostCacheError(
      `Bifrost /v1/models for ${provider} returned ${rawList.length} entries (max ${BIFROST_MAX_MODELS_PER_FETCH})`,
      provider
    );
  }

  let upserted = 0;
  let unchanged = 0;
  const parsed: ReturnType<typeof safeParseEntry>[] = [];
  for (const entry of rawList) {
    const p = safeParseEntry(entry, provider);
    if (p) parsed.push(p);
  }

  if (parsed.length === 0) {
    recordBifrostFetch(provider, "error", 0, "no valid entries in response");
    throw new BifrostCacheError(
      `no valid model entries for ${provider} (${rawList.length} raw)`,
      provider
    );
  }

  const db = getDbInstance();
  const upsertStmt = db.prepare(
    `INSERT INTO bifrost_models
       (provider, id, owned_by, display_name, metadata, fetched_at, expires_at)
     VALUES (?, ?, ?, ?, ?, datetime('now'), ?)
     ON CONFLICT(provider, id) DO UPDATE SET
       owned_by = excluded.owned_by,
       display_name = excluded.display_name,
       metadata = excluded.metadata,
       fetched_at = excluded.fetched_at,
       expires_at = excluded.expires_at`
  );

  const txn = db.transaction((rows: ReturnType<typeof safeParseEntry>[]) => {
    let count = 0;
    for (const r of rows) {
      if (!r) continue;
      upsertStmt.run(
        r.provider,
        r.id,
        r.ownedBy,
        r.displayName,
        r.metadataJson,
        expiresAt
      );
      count += 1;
    }
    return count;
  });

  try {
    upserted = txn(parsed);
    unchanged = rawList.length - parsed.length;
  } catch (err) {
    recordBifrostFetch(provider, "error", 0, errMsg(err));
    throw new BifrostCacheError(
      `failed to upsert models for ${provider}: ${errMsg(err)}`,
      provider,
      err
    );
  }

  const partial = parsed.length < rawList.length;
  if (partial && !allowPartial) {
    recordBifrostFetch(
      provider,
      "error",
      parsed.length,
      `${rawList.length - parsed.length} entries failed to parse`
    );
    throw new BifrostCacheError(
      `partial fetch for ${provider}: ${parsed.length}/${rawList.length} parsed`,
      provider
    );
  }

  recordBifrostFetch(provider, partial ? "partial" : "ok", parsed.length);

  return {
    provider,
    fetched: rawList.length,
    upserted,
    unchanged,
    durationMs: Date.now() - startedAt,
  };
}

/**
 * Upsert a cache-state row. Public so callers can record manual sync events
 * without a full fetch (e.g. when Bifrost returns a 304 Not Modified).
 */
export function recordBifrostFetch(
  provider: string,
  status: "ok" | "error" | "partial",
  modelCount: number,
  lastError: string | null = null
): void {
  if (!provider) return;
  if (status !== "ok" && status !== "error" && status !== "partial") {
    throw new Error(`invalid status: ${String(status)}`);
  }
  if (!Number.isFinite(modelCount) || modelCount < 0) {
    throw new Error(`modelCount must be a non-negative finite number, got ${modelCount}`);
  }

  const db = getDbInstance();
  const meta = getBifrostModelMeta(provider);
  const fetchCount = (meta?.fetchCount ?? 0) + 1;

  db.prepare(
    `INSERT INTO bifrost_models_meta
       (provider, last_fetched_at, last_status, last_error, model_count, fetch_count)
     VALUES (?, datetime('now'), ?, ?, ?, ?)
     ON CONFLICT(provider) DO UPDATE SET
       last_fetched_at = excluded.last_fetched_at,
       last_status = excluded.last_status,
       last_error = excluded.last_error,
       model_count = excluded.model_count,
       fetch_count = excluded.fetch_count`
  ).run(provider, status, lastError, modelCount, fetchCount);
}

/**
 * Delete all expired rows (both `bifrost_models` and `bifrost_models_meta`
 * last-fetched-when-expired). Returns total rows purged.
 * Recommended to call on a cron (e.g. hourly).
 */
export function purgeExpiredBifrostModels(): number {
  const db = getDbInstance();
  const modelsResult = db
    .prepare(`DELETE FROM bifrost_models WHERE datetime(expires_at) < datetime('now')`)
    .run();
  return modelsResult.changes ?? 0;
}

/**
 * Operator-triggered full purge for a provider. Used when Bifrost provider
 * is decommissioned, or when a known-bad fetch polluted the cache.
 */
export function purgeBifrostModelsByProvider(provider: string): {
  deletedModels: number;
  deletedMeta: number;
} {
  if (!provider) return { deletedModels: 0, deletedMeta: 0 };

  const db = getDbInstance();
  const models = db
    .prepare(`DELETE FROM bifrost_models WHERE provider = ?`)
    .run(provider);
  const meta = db
    .prepare(`DELETE FROM bifrost_models_meta WHERE provider = ?`)
    .run(provider);
  return {
    deletedModels: models.changes ?? 0,
    deletedMeta: meta.changes ?? 0,
  };
}

/**
 * List all cache-state meta rows. Useful for the dashboard's "Bifrost cache
 * health" panel. Returns newest first.
 */
export function listBifrostModelMeta(): BifrostModelMeta[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT provider, last_fetched_at, last_status, last_error,
              model_count, fetch_count
       FROM bifrost_models_meta
       ORDER BY last_fetched_at DESC`
    )
    .all() as Record<string, unknown>[];

  const out: BifrostModelMeta[] = [];
  for (const row of rows) {
    const camel = rowToCamel(row) ?? {};
    const lastStatus = String(camel.lastStatus ?? "ok");
    if (lastStatus !== "ok" && lastStatus !== "error" && lastStatus !== "partial") {
      continue;
    }
    out.push({
      provider: String(camel.provider ?? ""),
      lastFetchedAt: String(camel.lastFetchedAt ?? ""),
      lastStatus,
      lastError: typeof camel.lastError === "string" ? camel.lastError : null,
      modelCount: typeof camel.modelCount === "number" ? camel.modelCount : 0,
      fetchCount: typeof camel.fetchCount === "number" ? camel.fetchCount : 0,
    });
  }
  return out;
}

// ──────────────── Util ────────────────

function errMsg(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}
