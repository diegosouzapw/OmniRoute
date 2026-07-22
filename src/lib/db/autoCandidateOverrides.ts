/**
 * db/autoCandidateOverrides.ts — Per-API-key candidate exclusions for `auto/*`
 * channels (#7819, Level 2 of the "per-user candidate control" feature).
 *
 * OmniRoute is single-tenant (no `users` table, no `user_id`/`userId` column
 * anywhere under `src/lib/db/`) — `apiKeyId` is the closest real per-caller
 * identity this app has, so overrides are keyed by (apiKeyId, autoChannel,
 * connectionId) rather than "per user". See the Open Question in the #7819
 * plan for the follow-up decision on whether this should instead be global.
 *
 * Mirrors the relational style of `reasoningRoutingRules.ts` / `apiKeyGroups.ts`
 * rather than the key_value JSON-blob pattern — exclusions are a simple
 * row-per-candidate set, which is simpler to index and reason about than a
 * JSON array column.
 */
import { randomUUID } from "node:crypto";
import { getDbInstance } from "./core";

export interface AutoCandidateOverride {
  id: string;
  apiKeyId: string;
  autoChannel: string;
  connectionId: string;
  excluded: boolean;
  createdAt: string;
}

type OverrideRow = {
  id: string;
  api_key_id: string;
  auto_channel: string;
  connection_id: string;
  excluded: number;
  created_at: string;
};

function rowToOverride(row: OverrideRow): AutoCandidateOverride {
  return {
    id: row.id,
    apiKeyId: row.api_key_id,
    autoChannel: row.auto_channel,
    connectionId: row.connection_id,
    excluded: row.excluded === 1,
    createdAt: row.created_at,
  };
}

/**
 * Returns the set of connection IDs excluded by this API key for this auto
 * channel. Empty set when no overrides exist (the default, unconfigured
 * path) — callers should treat an empty set as "no filtering needed" rather
 * than iterating a lookup for every candidate.
 */
export async function getExcludedConnectionIds(
  apiKeyId: string,
  autoChannel: string
): Promise<Set<string>> {
  if (!apiKeyId || !autoChannel) return new Set();
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT connection_id FROM auto_candidate_overrides
       WHERE api_key_id = ? AND auto_channel = ? AND excluded = 1`
    )
    .all(apiKeyId, autoChannel) as Array<{ connection_id: string }>;
  return new Set(rows.map((row) => row.connection_id));
}

/**
 * Sets (or clears) the excluded flag for one candidate connection, scoped to
 * one API key + auto channel. Idempotent — re-setting the same value is a
 * no-op write via UPSERT.
 */
export async function setExcluded(
  apiKeyId: string,
  autoChannel: string,
  connectionId: string,
  excluded: boolean
): Promise<AutoCandidateOverride> {
  const db = getDbInstance();
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare(
    `INSERT INTO auto_candidate_overrides
       (id, api_key_id, auto_channel, connection_id, excluded, created_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(api_key_id, auto_channel, connection_id)
     DO UPDATE SET excluded = excluded.excluded`
  ).run(id, apiKeyId, autoChannel, connectionId, excluded ? 1 : 0, createdAt);

  const row = db
    .prepare(
      `SELECT id, api_key_id, auto_channel, connection_id, excluded, created_at
       FROM auto_candidate_overrides
       WHERE api_key_id = ? AND auto_channel = ? AND connection_id = ?`
    )
    .get(apiKeyId, autoChannel, connectionId) as OverrideRow;
  return rowToOverride(row);
}

/** Lists all override rows for one API key + auto channel (excluded and not). */
export async function listOverrides(
  apiKeyId: string,
  autoChannel: string
): Promise<AutoCandidateOverride[]> {
  if (!apiKeyId || !autoChannel) return [];
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT id, api_key_id, auto_channel, connection_id, excluded, created_at
       FROM auto_candidate_overrides
       WHERE api_key_id = ? AND auto_channel = ?
       ORDER BY created_at ASC`
    )
    .all(apiKeyId, autoChannel) as OverrideRow[];
  return rows.map(rowToOverride);
}
