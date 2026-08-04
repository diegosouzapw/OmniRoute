/**
 * Database module: Discovery Results
 *
 * CRUD for the automated provider-discovery tool (opt-in, default off). Rows
 * live in the `discovery_results` table (migration 074). The Discovery service
 * (`src/lib/discovery/`) writes findings here via {@link upsertDiscoveryResult};
 * the `/api/discovery/*` routes read/verify/delete them.
 *
 * See `_tasks/features-v3.8.42/gaps/DISCOVERY_TOOL_DESIGN.md` for the design.
 */

import { getDbInstance } from "./core";

export type DiscoveryMethod =
  | "free_tier"
  | "web_cookie"
  | "auto_register"
  | "trial"
  | "public_api";
export type DiscoveryAuthType = "none" | "cookie" | "api_key" | "oauth";
export type DiscoveryRiskLevel = "none" | "low" | "medium" | "high" | "critical";
export type DiscoveryStatus = "pending" | "testing" | "verified" | "rejected";

export interface DiscoveryResult {
  id?: number;
  providerId: string;
  method: DiscoveryMethod;
  endpoint?: string | null;
  authType: DiscoveryAuthType;
  models?: string[];
  rateLimit?: string | null;
  feasibility: number;
  riskLevel: DiscoveryRiskLevel;
  status: DiscoveryStatus;
  notes?: string | null;
  discoveredAt?: string;
  verifiedAt?: string | null;
}

interface DiscoveryRow {
  id: number;
  provider_id: string;
  method: string;
  endpoint: string | null;
  auth_type: string | null;
  models: string | null;
  rate_limit: string | null;
  feasibility: number | null;
  risk_level: string | null;
  status: string;
  notes: string | null;
  discovered_at: string;
  verified_at: string | null;
}

function rowToResult(row: DiscoveryRow): DiscoveryResult {
  let models: string[] | undefined;
  if (row.models) {
    try {
      const parsed = JSON.parse(row.models);
      if (Array.isArray(parsed)) models = parsed.map(String);
    } catch {
      models = undefined;
    }
  }
  return {
    id: row.id,
    providerId: row.provider_id,
    method: row.method as DiscoveryMethod,
    endpoint: row.endpoint,
    authType: (row.auth_type as DiscoveryAuthType) ?? "none",
    models,
    rateLimit: row.rate_limit,
    feasibility: row.feasibility ?? 0,
    riskLevel: (row.risk_level as DiscoveryRiskLevel) ?? "none",
    status: row.status as DiscoveryStatus,
    notes: row.notes,
    discoveredAt: row.discovered_at,
    verifiedAt: row.verified_at,
  };
}

/**
 * Insert or update a discovery finding. Uniqueness is keyed on
 * `(provider_id, method, endpoint)` (the table's UNIQUE constraint), so
 * re-discovering the same endpoint updates the existing row rather than
 * duplicating it. Returns the persisted row (with its id).
 */
export function upsertDiscoveryResult(result: DiscoveryResult): DiscoveryResult {
  const db = getDbInstance();
  const models = result.models ? JSON.stringify(result.models) : null;
  db.prepare(
    `INSERT INTO discovery_results
       (provider_id, method, endpoint, auth_type, models, rate_limit, feasibility, risk_level, status, notes)
     VALUES (@provider_id, @method, @endpoint, @auth_type, @models, @rate_limit, @feasibility, @risk_level, @status, @notes)
     ON CONFLICT(provider_id, method, endpoint) DO UPDATE SET
       auth_type = excluded.auth_type,
       models = excluded.models,
       rate_limit = excluded.rate_limit,
       feasibility = excluded.feasibility,
       risk_level = excluded.risk_level,
       status = excluded.status,
       notes = excluded.notes`
  ).run({
    provider_id: result.providerId,
    method: result.method,
    endpoint: result.endpoint ?? null,
    auth_type: result.authType,
    models,
    rate_limit: result.rateLimit ?? null,
    feasibility: result.feasibility,
    risk_level: result.riskLevel,
    status: result.status,
    notes: result.notes ?? null,
  });

  const row = db
    .prepare(
      `SELECT * FROM discovery_results
       WHERE provider_id = ? AND method = ? AND ifnull(endpoint, '') = ifnull(?, '')`
    )
    .get(result.providerId, result.method, result.endpoint ?? null) as DiscoveryRow | undefined;
  // The row was just written, so it must exist.
  return rowToResult(row!);
}

/**
 * List discovery results, optionally filtered to a single provider. Newest
 * findings first.
 */
export function getDiscoveryResults(providerId?: string): DiscoveryResult[] {
  const db = getDbInstance();
  const rows = providerId
    ? (db
        .prepare(
          "SELECT * FROM discovery_results WHERE provider_id = ? ORDER BY discovered_at DESC, id DESC"
        )
        .all(providerId) as DiscoveryRow[])
    : (db
        .prepare("SELECT * FROM discovery_results ORDER BY discovered_at DESC, id DESC")
        .all() as DiscoveryRow[]);
  return rows.map(rowToResult);
}

export function getDiscoveryResultById(id: number): DiscoveryResult | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM discovery_results WHERE id = ?").get(id) as
    | DiscoveryRow
    | undefined;
  return row ? rowToResult(row) : null;
}

/**
 * Mark a finding as verified, stamping `verified_at`. Returns the updated row,
 * or null if no row with that id exists.
 */
export function markVerified(id: number): DiscoveryResult | null {
  const db = getDbInstance();
  const info = db
    .prepare(
      "UPDATE discovery_results SET status = 'verified', verified_at = datetime('now') WHERE id = ?"
    )
    .run(id);
  if (info.changes === 0) return null;
  return getDiscoveryResultById(id);
}

/**
 * Delete a finding. Returns true if a row was removed, false if the id was not
 * found.
 */
export function deleteDiscoveryResult(id: number): boolean {
  const db = getDbInstance();
  const info = db.prepare("DELETE FROM discovery_results WHERE id = ?").run(id);
  return info.changes > 0;
}
