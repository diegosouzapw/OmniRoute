/**
 * cc-discovery usage metrics — aggregate counters for the Claude Code
 * discovery-alias feature (see src/lib/ccDiscoveryAliasResolve.ts and
 * src/app/api/v1/models/catalog.ts).
 *
 * Tracks:
 *  - how many requests were served after resolving a `claude/…` mirror id
 *    back to its real model/combo (per-total and per-model breakdown)
 *  - how many `GET /v1/models` catalog hits came from a Claude Code client
 *    (detected by the `claude-cli` User-Agent substring, the same signal
 *    open-sse/utils/bypassHandler.ts already uses)
 *
 * Deliberately reuses the generic `key_value` namespace/key store (the same
 * pattern as src/lib/db/sessionAccountAffinity.ts) instead of a dedicated
 * migration — this is a v1 aggregate-counter feature, not a per-event log,
 * so no new table is warranted.
 *
 * Every write is best-effort: a DB hiccup here must never break the request
 * it is instrumenting (mirrors src/lib/db/pluginMetrics.ts).
 */
import { getDbInstance } from "./core";

const NAMESPACE = "ccDiscoveryMetrics";
const TOTAL_KEY = "req:total";
const HIT_KEY = "discovery:hits";
const MODEL_KEY_PREFIX = "req:model:";

export interface CcDiscoveryMetrics {
  aliasRequests: number;
  discoveryHits: number;
  byModel: Record<string, number>;
}

function modelKey(realModelId: string): string {
  return `${MODEL_KEY_PREFIX}${realModelId}`;
}

function incrementCounter(key: string): void {
  // Atomic upsert increment — a single statement so two concurrent requests
  // never lose a count the way a read-then-write pair would. `value` is TEXT, so
  // CAST it to INTEGER for the arithmetic; an absent row starts at '1' via the
  // INSERT branch, and a non-numeric prior value CASTs to 0 → 1 on update.
  getDbInstance()
    .prepare(
      `INSERT INTO key_value (namespace, key, value) VALUES (?, ?, '1')
       ON CONFLICT(namespace, key)
       DO UPDATE SET value = CAST(CAST(value AS INTEGER) + 1 AS TEXT)`
    )
    .run(NAMESPACE, key);
}

/**
 * Record one request served via a resolved `claude/…` discovery alias.
 * `realModelId` is the id AFTER stripping (e.g. `kimi/kimi-k2.6`, `my-combo`).
 * Never throws — a metrics failure must not affect the request it instruments.
 */
export function incrementCcAliasRequestCount(realModelId: string): void {
  try {
    incrementCounter(TOTAL_KEY);
    if (typeof realModelId === "string" && realModelId.length > 0) {
      incrementCounter(modelKey(realModelId));
    }
  } catch {
    // Best-effort: DB hiccup should never break the request it instruments.
  }
}

/**
 * Record one `GET /v1/models` hit whose User-Agent identified it as a
 * Claude Code discovery request.
 */
export function incrementCcDiscoveryHitCount(): void {
  try {
    incrementCounter(HIT_KEY);
  } catch {
    // Best-effort — same rationale as incrementCcAliasRequestCount.
  }
}

/**
 * Read the aggregated cc-discovery metrics. Never throws — returns the
 * zero-value shape on any DB failure so a monitoring read never 500s.
 */
export function getCcDiscoveryMetrics(): CcDiscoveryMetrics {
  try {
    const db = getDbInstance();
    const rows = db
      .prepare("SELECT key, value FROM key_value WHERE namespace = ?")
      .all(NAMESPACE) as Array<{ key?: unknown; value?: unknown }>;

    let aliasRequests = 0;
    let discoveryHits = 0;
    const byModel: Record<string, number> = {};

    for (const row of rows) {
      if (typeof row.key !== "string") continue;
      const value = typeof row.value === "string" ? parseInt(row.value, 10) : Number(row.value);
      const count = Number.isFinite(value) && value >= 0 ? value : 0;

      if (row.key === TOTAL_KEY) {
        aliasRequests = count;
      } else if (row.key === HIT_KEY) {
        discoveryHits = count;
      } else if (row.key.startsWith(MODEL_KEY_PREFIX)) {
        byModel[row.key.slice(MODEL_KEY_PREFIX.length)] = count;
      }
    }

    return { aliasRequests, discoveryHits, byModel };
  } catch {
    return { aliasRequests: 0, discoveryHits: 0, byModel: {} };
  }
}
