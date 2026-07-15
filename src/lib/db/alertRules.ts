/**
 * db/alertRules.ts — Fleet alert configuration CRUD.
 *
 * Defines alert rules that trigger notifications based on metric thresholds,
 * conditions (gt, lt, eq, change_percent), duration windows, and severity levels.
 */

import { randomUUID } from "crypto";
import { getDbInstance } from "./core";

// ── Types ──

export interface AlertRule {
  id: string;
  name: string;
  metric: string;
  condition: "gt" | "lt" | "eq" | "change_percent";
  threshold: number;
  durationSeconds: number;
  severity: "info" | "warning" | "critical";
  channelsJson: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAlertRuleParams {
  name: string;
  metric: string;
  condition: AlertRule["condition"];
  threshold: number;
  durationSeconds?: number;
  severity?: AlertRule["severity"];
  channelsJson?: string;
  isActive?: boolean;
}

export interface UpdateAlertRuleParams {
  name?: string;
  metric?: string;
  condition?: AlertRule["condition"];
  threshold?: number;
  durationSeconds?: number;
  severity?: AlertRule["severity"];
  channelsJson?: string;
  isActive?: boolean;
}

type DbRow = Record<string, unknown>;

// ── Helpers ──

function rowToAlertRule(row: unknown): AlertRule {
  const r = row as DbRow;
  return {
    id: String(r.id ?? ""),
    name: String(r.name ?? ""),
    metric: String(r.metric ?? ""),
    condition: String(r.condition ?? "gt") as AlertRule["condition"],
    threshold: Number(r.threshold) || 0,
    durationSeconds: Number(r.duration_seconds) || 60,
    severity: String(r.severity ?? "warning") as AlertRule["severity"],
    channelsJson: String(r.channels_json ?? "[]"),
    isActive: r.is_active === 1 || r.is_active === true,
    createdAt: String(r.created_at ?? ""),
    updatedAt: String(r.updated_at ?? ""),
  };
}

// ── CRUD ──

export function getAlertRule(id: string): AlertRule | undefined {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM alert_rules WHERE id = ?").get(id);
  return row ? rowToAlertRule(row) : undefined;
}

export function listAlertRules(filter?: { isActive?: boolean }): AlertRule[] {
  const db = getDbInstance();
  const params: unknown[] = [];
  let sql = "SELECT * FROM alert_rules WHERE 1=1";

  if (filter?.isActive != null) {
    sql += " AND is_active = ?";
    params.push(filter.isActive ? 1 : 0);
  }

  sql += " ORDER BY name ASC";
  const rows = db.prepare(sql).all(...params);
  return rows.map(rowToAlertRule);
}

export function createAlertRule(data: CreateAlertRuleParams): AlertRule {
  const db = getDbInstance();
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO alert_rules (
      id, name, metric, condition, threshold,
      duration_seconds, severity, channels_json,
      is_active, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    data.name,
    data.metric,
    data.condition,
    data.threshold,
    data.durationSeconds ?? 60,
    data.severity ?? "warning",
    data.channelsJson ?? "[]",
    data.isActive != null ? (data.isActive ? 1 : 0) : 1,
    now,
    now
  );

  return getAlertRule(id)!;
}

export function updateAlertRule(
  id: string,
  data: Partial<UpdateAlertRuleParams>
): AlertRule | undefined {
  const db = getDbInstance();
  const existing = db
    .prepare("SELECT id FROM alert_rules WHERE id = ?")
    .get(id);
  if (!existing) return undefined;

  const now = new Date().toISOString();
  const fields: string[] = ["updated_at = ?"];
  const params: unknown[] = [now];

  if (data.name !== undefined) {
    fields.push("name = ?");
    params.push(data.name);
  }
  if (data.metric !== undefined) {
    fields.push("metric = ?");
    params.push(data.metric);
  }
  if (data.condition !== undefined) {
    fields.push("condition = ?");
    params.push(data.condition);
  }
  if (data.threshold !== undefined) {
    fields.push("threshold = ?");
    params.push(data.threshold);
  }
  if (data.durationSeconds !== undefined) {
    fields.push("duration_seconds = ?");
    params.push(data.durationSeconds);
  }
  if (data.severity !== undefined) {
    fields.push("severity = ?");
    params.push(data.severity);
  }
  if (data.channelsJson !== undefined) {
    fields.push("channels_json = ?");
    params.push(data.channelsJson);
  }
  if (data.isActive !== undefined) {
    fields.push("is_active = ?");
    params.push(data.isActive ? 1 : 0);
  }

  params.push(id);
  db.prepare(
    `UPDATE alert_rules SET ${fields.join(", ")} WHERE id = ?`
  ).run(...params);

  return getAlertRule(id);
}

export function deleteAlertRule(id: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("DELETE FROM alert_rules WHERE id = ?").run(id);
  return result.changes > 0;
}
