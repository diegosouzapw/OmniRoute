/**
 * db/fleetConfig.ts — Versioned fleet configuration CRUD.
 *
 * Manages the lifecycle of fleet-wide configuration snapshots with
 * versioning, status tracking, and checksum validation.
 */

import { randomUUID } from "crypto";
import { getDbInstance } from "./core";

// ── Types ──

export interface FleetConfig {
  id: string;
  version: number;
  configJson: string;
  checksum: string;
  appliedBy: string;
  appliedAt: string;
  status: "pending" | "applied" | "failed" | "rolled_back";
}

export interface CreateFleetConfigParams {
  configJson: string;
  checksum: string;
  appliedBy?: string;
  status?: FleetConfig["status"];
}

type DbRow = Record<string, unknown>;

// ── Helpers ──

function rowToFleetConfig(row: unknown): FleetConfig {
  const r = row as DbRow;
  return {
    id: String(r.id ?? ""),
    version: Number(r.version) || 1,
    configJson: String(r.config_json ?? "{}"),
    checksum: String(r.checksum ?? ""),
    appliedBy: String(r.applied_by ?? ""),
    appliedAt: String(r.applied_at ?? ""),
    status: String(r.status ?? "pending") as FleetConfig["status"],
  };
}

// ── CRUD ──

export function getLatestFleetConfig(): FleetConfig | undefined {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT * FROM fleet_config ORDER BY version DESC LIMIT 1")
    .get();
  return row ? rowToFleetConfig(row) : undefined;
}

export function createFleetConfig(data: CreateFleetConfigParams): FleetConfig {
  const db = getDbInstance();
  const id = randomUUID();
  const now = new Date().toISOString();

  // Determine next version number
  const latest = db
    .prepare("SELECT MAX(version) as max_ver FROM fleet_config")
    .get() as DbRow;
  const nextVersion = (Number(latest.max_ver) || 0) + 1;

  db.prepare(
    `INSERT INTO fleet_config (id, version, config_json, checksum, applied_by, applied_at, status)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    nextVersion,
    data.configJson,
    data.checksum,
    data.appliedBy ?? "",
    now,
    data.status ?? "pending"
  );

  return getLatestFleetConfig()!;
}

export function listFleetConfigHistory(limit?: number): FleetConfig[] {
  const db = getDbInstance();
  let sql = "SELECT * FROM fleet_config ORDER BY version DESC";
  const params: unknown[] = [];

  if (limit != null) {
    sql += " LIMIT ?";
    params.push(limit);
  }

  const rows = db.prepare(sql).all(...params);
  return rows.map(rowToFleetConfig);
}

export function updateFleetConfigStatus(id: string, status: string): boolean {
  const db = getDbInstance();
  const result = db
    .prepare("UPDATE fleet_config SET status = ? WHERE id = ?")
    .run(status, id);
  return result.changes > 0;
}
