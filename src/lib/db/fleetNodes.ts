/**
 * db/fleetNodes.ts — Fleet node CRUD operations.
 *
 * Handles distributed fleet node management: registration, heartbeats,
 * status tracking, and listing with optional filtering.
 */

import { randomUUID } from "crypto";
import { getDbInstance } from "./core";

// ── Types ──

export interface FleetNode {
  id: string;
  hostname: string;
  region: string;
  zone: string;
  version: string;
  status: "online" | "draining" | "offline" | "decommissioned";
  role: "omniroute" | "bifrost" | "agent";
  cpuCores: number;
  memoryTotalBytes: number;
  gpuCount: number;
  labelsJson: string;
  ipAddress: string;
  agentPort: number;
  lastHeartbeat: string | null;
  firstSeen: string;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFleetNodeParams {
  hostname: string;
  region?: string;
  zone?: string;
  version?: string;
  status?: FleetNode["status"];
  role?: FleetNode["role"];
  cpuCores?: number;
  memoryTotalBytes?: number;
  gpuCount?: number;
  labelsJson?: string;
  ipAddress?: string;
  agentPort?: number;
}

export interface UpdateFleetNodeParams {
  hostname?: string;
  region?: string;
  zone?: string;
  version?: string;
  status?: FleetNode["status"];
  role?: FleetNode["role"];
  cpuCores?: number;
  memoryTotalBytes?: number;
  gpuCount?: number;
  labelsJson?: string;
  ipAddress?: string;
  agentPort?: number;
}

type DbRow = Record<string, unknown>;

// ── Helpers ──

function rowToFleetNode(row: unknown): FleetNode {
  const r = row as DbRow;
  return {
    id: String(r.id ?? ""),
    hostname: String(r.hostname ?? ""),
    region: String(r.region ?? ""),
    zone: String(r.zone ?? ""),
    version: String(r.version ?? ""),
    status: String(r.status ?? "online") as FleetNode["status"],
    role: String(r.role ?? "omniroute") as FleetNode["role"],
    cpuCores: Number(r.cpu_cores) || 0,
    memoryTotalBytes: Number(r.memory_total_bytes) || 0,
    gpuCount: Number(r.gpu_count) || 0,
    labelsJson: String(r.labels_json ?? "{}"),
    ipAddress: String(r.ip_address ?? ""),
    agentPort: Number(r.agent_port) || 9099,
    lastHeartbeat: r.last_heartbeat != null ? String(r.last_heartbeat) : null,
    firstSeen: String(r.first_seen ?? ""),
    lastSeen: String(r.last_seen ?? ""),
    createdAt: String(r.created_at ?? ""),
    updatedAt: String(r.updated_at ?? ""),
  };
}

// ── CRUD ──

export function getFleetNode(id: string): FleetNode | undefined {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM fleet_nodes WHERE id = ?").get(id);
  return row ? rowToFleetNode(row) : undefined;
}

export function listFleetNodes(filter?: {
  status?: string;
  region?: string;
}): FleetNode[] {
  const db = getDbInstance();
  const params: unknown[] = [];
  let sql = "SELECT * FROM fleet_nodes WHERE 1=1";

  if (filter?.status) {
    sql += " AND status = ?";
    params.push(filter.status);
  }
  if (filter?.region) {
    sql += " AND region = ?";
    params.push(filter.region);
  }

  sql += " ORDER BY hostname ASC";
  const rows = db.prepare(sql).all(...params);
  return rows.map(rowToFleetNode);
}

export function createFleetNode(data: CreateFleetNodeParams): FleetNode {
  const db = getDbInstance();
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO fleet_nodes (
      id, hostname, region, zone, version, status, role,
      cpu_cores, memory_total_bytes, gpu_count, labels_json,
      ip_address, agent_port,
      last_heartbeat, first_seen, last_seen, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    data.hostname,
    data.region ?? "",
    data.zone ?? "",
    data.version ?? "",
    data.status ?? "online",
    data.role ?? "omniroute",
    data.cpuCores ?? 0,
    data.memoryTotalBytes ?? 0,
    data.gpuCount ?? 0,
    data.labelsJson ?? "{}",
    data.ipAddress ?? "",
    data.agentPort ?? 9099,
    null,
    now,
    now,
    now,
    now
  );

  return getFleetNode(id)!;
}

export function updateFleetNode(
  id: string,
  data: Partial<UpdateFleetNodeParams>
): FleetNode | undefined {
  const db = getDbInstance();
  const existing = db.prepare("SELECT id FROM fleet_nodes WHERE id = ?").get(id);
  if (!existing) return undefined;

  const now = new Date().toISOString();
  const fields: string[] = ["updated_at = ?"];
  const params: unknown[] = [now];

  if (data.hostname !== undefined) {
    fields.push("hostname = ?");
    params.push(data.hostname);
  }
  if (data.region !== undefined) {
    fields.push("region = ?");
    params.push(data.region);
  }
  if (data.zone !== undefined) {
    fields.push("zone = ?");
    params.push(data.zone);
  }
  if (data.version !== undefined) {
    fields.push("version = ?");
    params.push(data.version);
  }
  if (data.status !== undefined) {
    fields.push("status = ?");
    params.push(data.status);
  }
  if (data.role !== undefined) {
    fields.push("role = ?");
    params.push(data.role);
  }
  if (data.cpuCores !== undefined) {
    fields.push("cpu_cores = ?");
    params.push(data.cpuCores);
  }
  if (data.memoryTotalBytes !== undefined) {
    fields.push("memory_total_bytes = ?");
    params.push(data.memoryTotalBytes);
  }
  if (data.gpuCount !== undefined) {
    fields.push("gpu_count = ?");
    params.push(data.gpuCount);
  }
  if (data.labelsJson !== undefined) {
    fields.push("labels_json = ?");
    params.push(data.labelsJson);
  }
  if (data.ipAddress !== undefined) {
    fields.push("ip_address = ?");
    params.push(data.ipAddress);
  }
  if (data.agentPort !== undefined) {
    fields.push("agent_port = ?");
    params.push(data.agentPort);
  }

  params.push(id);
  db.prepare(
    `UPDATE fleet_nodes SET ${fields.join(", ")} WHERE id = ?`
  ).run(...params);

  return getFleetNode(id);
}

export function deleteFleetNode(id: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM fleet_nodes WHERE id = ?").run(id);
  return result.changes > 0;
}

export function recordHeartbeat(id: string): void {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    "UPDATE fleet_nodes SET last_heartbeat = ?, last_seen = ?, updated_at = ? WHERE id = ?"
  ).run(now, now, now, id);
}

export function getFleetNodeCount(): number {
  const db = getDbInstance();
  const row = db.prepare("SELECT COUNT(*) as count FROM fleet_nodes").get() as DbRow;
  return Number(row.count) || 0;
}

export function getFleetNodesByStatus(status: string): FleetNode[] {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT * FROM fleet_nodes WHERE status = ? ORDER BY hostname ASC")
    .all(status);
  return rows.map(rowToFleetNode);
}
