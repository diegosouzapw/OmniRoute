/**
 * db/scalingPolicies.ts — Auto-scaling policy definitions CRUD.
 *
 * Manages auto-scaling policies that control replica counts based on
 * metrics such as queue depth, token throughput, error rate, latency, etc.
 */

import { randomUUID } from "crypto";
import { getDbInstance } from "./core";

// ── Types ──

export interface ScalingPolicy {
  id: string;
  name: string;
  description: string;
  metric: string;
  threshold: number;
  minReplicas: number;
  maxReplicas: number;
  cooldownSeconds: number;
  scaleUpPolicyJson: string;
  scaleDownPolicyJson: string;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateScalingPolicyParams {
  name: string;
  description?: string;
  metric: string;
  threshold: number;
  minReplicas?: number;
  maxReplicas?: number;
  cooldownSeconds?: number;
  scaleUpPolicyJson?: string;
  scaleDownPolicyJson?: string;
  isActive?: boolean;
  createdBy?: string;
}

export interface UpdateScalingPolicyParams {
  name?: string;
  description?: string;
  metric?: string;
  threshold?: number;
  minReplicas?: number;
  maxReplicas?: number;
  cooldownSeconds?: number;
  scaleUpPolicyJson?: string;
  scaleDownPolicyJson?: string;
  isActive?: boolean;
  createdBy?: string;
}

type DbRow = Record<string, unknown>;

// ── Helpers ──

function rowToScalingPolicy(row: unknown): ScalingPolicy {
  const r = row as DbRow;
  return {
    id: String(r.id ?? ""),
    name: String(r.name ?? ""),
    description: String(r.description ?? ""),
    metric: String(r.metric ?? ""),
    threshold: Number(r.threshold) || 0,
    minReplicas: Number(r.min_replicas) || 2,
    maxReplicas: Number(r.max_replicas) || 20,
    cooldownSeconds: Number(r.cooldown_seconds) || 60,
    scaleUpPolicyJson: String(r.scale_up_policy_json ?? "{}"),
    scaleDownPolicyJson: String(r.scale_down_policy_json ?? "{}"),
    isActive: r.is_active === 1 || r.is_active === true,
    createdBy: String(r.created_by ?? ""),
    createdAt: String(r.created_at ?? ""),
    updatedAt: String(r.updated_at ?? ""),
  };
}

// ── CRUD ──

export function getScalingPolicy(id: string): ScalingPolicy | undefined {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM scaling_policies WHERE id = ?").get(id);
  return row ? rowToScalingPolicy(row) : undefined;
}

export function listScalingPolicies(filter?: {
  isActive?: boolean;
}): ScalingPolicy[] {
  const db = getDbInstance();
  const params: unknown[] = [];
  let sql = "SELECT * FROM scaling_policies WHERE 1=1";

  if (filter?.isActive != null) {
    sql += " AND is_active = ?";
    params.push(filter.isActive ? 1 : 0);
  }

  sql += " ORDER BY name ASC";
  const rows = db.prepare(sql).all(...params);
  return rows.map(rowToScalingPolicy);
}

export function createScalingPolicy(
  data: CreateScalingPolicyParams
): ScalingPolicy {
  const db = getDbInstance();
  const id = randomUUID();
  const now = new Date().toISOString();

  db.prepare(
    `INSERT INTO scaling_policies (
      id, name, description, metric, threshold,
      min_replicas, max_replicas, cooldown_seconds,
      scale_up_policy_json, scale_down_policy_json,
      is_active, created_by, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    data.name,
    data.description ?? "",
    data.metric,
    data.threshold,
    data.minReplicas ?? 2,
    data.maxReplicas ?? 20,
    data.cooldownSeconds ?? 60,
    data.scaleUpPolicyJson ?? "{}",
    data.scaleDownPolicyJson ?? "{}",
    data.isActive != null ? (data.isActive ? 1 : 0) : 1,
    data.createdBy ?? "",
    now,
    now
  );

  return getScalingPolicy(id)!;
}

export function updateScalingPolicy(
  id: string,
  data: Partial<UpdateScalingPolicyParams>
): ScalingPolicy | undefined {
  const db = getDbInstance();
  const existing = db
    .prepare("SELECT id FROM scaling_policies WHERE id = ?")
    .get(id);
  if (!existing) return undefined;

  const now = new Date().toISOString();
  const fields: string[] = ["updated_at = ?"];
  const params: unknown[] = [now];

  if (data.name !== undefined) {
    fields.push("name = ?");
    params.push(data.name);
  }
  if (data.description !== undefined) {
    fields.push("description = ?");
    params.push(data.description);
  }
  if (data.metric !== undefined) {
    fields.push("metric = ?");
    params.push(data.metric);
  }
  if (data.threshold !== undefined) {
    fields.push("threshold = ?");
    params.push(data.threshold);
  }
  if (data.minReplicas !== undefined) {
    fields.push("min_replicas = ?");
    params.push(data.minReplicas);
  }
  if (data.maxReplicas !== undefined) {
    fields.push("max_replicas = ?");
    params.push(data.maxReplicas);
  }
  if (data.cooldownSeconds !== undefined) {
    fields.push("cooldown_seconds = ?");
    params.push(data.cooldownSeconds);
  }
  if (data.scaleUpPolicyJson !== undefined) {
    fields.push("scale_up_policy_json = ?");
    params.push(data.scaleUpPolicyJson);
  }
  if (data.scaleDownPolicyJson !== undefined) {
    fields.push("scale_down_policy_json = ?");
    params.push(data.scaleDownPolicyJson);
  }
  if (data.isActive !== undefined) {
    fields.push("is_active = ?");
    params.push(data.isActive ? 1 : 0);
  }
  if (data.createdBy !== undefined) {
    fields.push("created_by = ?");
    params.push(data.createdBy);
  }

  params.push(id);
  db.prepare(
    `UPDATE scaling_policies SET ${fields.join(", ")} WHERE id = ?`
  ).run(...params);

  return getScalingPolicy(id);
}

export function deleteScalingPolicy(id: string): boolean {
  const db = getDbInstance();
  const result = db
    .prepare("DELETE FROM scaling_policies WHERE id = ?")
    .run(id);
  return result.changes > 0;
}
