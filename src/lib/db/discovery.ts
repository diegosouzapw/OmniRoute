/**
 * Discovery results CRUD — stores discovered provider access methods.
 *
 * @module db/discovery
 */

import { getDbInstance } from "./core";
import { logger } from "../../open-sse/utils/logger";

const log = logger("DB_DISCOVERY");

export interface DiscoveryResult {
  id?: number;
  providerId: string;
  method: "free_tier" | "web_cookie" | "auto_register" | "trial" | "public_api";
  authType: "none" | "cookie" | "api_key" | "oauth";
  endpoint?: string;
  modelsJson?: string;
  rateLimit?: string;
  feasibility?: number;
  riskLevel?: "none" | "low" | "medium" | "high" | "critical";
  status?: "pending" | "testing" | "verified" | "rejected";
  notes?: string;
  discoveredAt?: string;
  verifiedAt?: string;
}

export function insertDiscoveryResult(result: DiscoveryResult): number {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const stmt = db.prepare(`
    INSERT INTO discovery_results (provider_id, method, auth_type, endpoint, models_json, rate_limit, feasibility, risk_level, status, notes, discovered_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const info = stmt.run(
    result.providerId,
    result.method,
    result.authType,
    result.endpoint ?? null,
    result.modelsJson ?? "[]",
    result.rateLimit ?? null,
    result.feasibility ?? 0,
    result.riskLevel ?? "none",
    result.status ?? "pending",
    result.notes ?? null,
    now
  );
  log.info("discovery_result.inserted", { id: info.lastInsertRowid, providerId: result.providerId });
  return info.lastInsertRowid as number;
}

export function listDiscoveryResults(status?: string): DiscoveryResult[] {
  const db = getDbInstance();
  const rows = status
    ? db.prepare("SELECT * FROM discovery_results WHERE status = ? ORDER BY discovered_at DESC").all(status)
    : db.prepare("SELECT * FROM discovery_results ORDER BY discovered_at DESC").all();
  return (rows as Record<string, unknown>[]).map(rowToResult);
}

export function getDiscoveryResultById(id: number): DiscoveryResult | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM discovery_results WHERE id = ?").get(id) as Record<string, unknown> | undefined;
  return row ? rowToResult(row) : null;
}

export function updateDiscoveryStatus(id: number, status: string, notes?: string): boolean {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const result = db
    .prepare("UPDATE discovery_results SET status = ?, notes = COALESCE(?, notes), verified_at = CASE WHEN ? = 'verified' THEN ? ELSE verified_at END, updated_at = ? WHERE id = ?")
    .run(status, notes ?? null, status, now, now, id);
  return result.changes > 0;
}

export function deleteDiscoveryResult(id: number): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM discovery_results WHERE id = ?").run(id);
  return result.changes > 0;
}

function rowToResult(row: Record<string, unknown>): DiscoveryResult {
  return {
    id: row.id as number,
    providerId: row.provider_id as string,
    method: row.method as DiscoveryResult["method"],
    authType: row.auth_type as DiscoveryResult["authType"],
    endpoint: row.endpoint as string | undefined,
    modelsJson: row.models_json as string | undefined,
    rateLimit: row.rate_limit as string | undefined,
    feasibility: row.feasibility as number,
    riskLevel: row.risk_level as DiscoveryResult["riskLevel"],
    status: row.status as DiscoveryResult["status"],
    notes: row.notes as string | undefined,
    discoveredAt: row.discovered_at as string,
    verifiedAt: row.verified_at as string | undefined,
  };
}
