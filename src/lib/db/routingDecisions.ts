/**
 * Routing Decisions DB Layer
 *
 * Persists A2A routing decisions to the `routing_decisions` table for
 * observability and post-hoc analysis. Each row captures the selected
 * provider, model, score, fallback chain, and W3C trace context.
 *
 * This module is the production persistence target for `routingLogger.ts`
 * (closes DEBT-011).
 *
 * @module lib/db/routingDecisions
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance } from "./core";
import type { RoutingDecision } from "@/lib/a2a/routingLogger";

export interface RoutingDecisionRow {
  id: string;
  taskType: string;
  comboId: string;
  provider: string;
  model: string;
  score: number;
  factors: string[];
  fallbacks: string[];
  success: boolean;
  latencyMs: number;
  cost: number;
  traceId?: string;
  spanId?: string;
  createdAt: string;
}

// ── Table existence cache ────────────────────────────────────────────────────

let _tableExists: boolean | undefined;

function tableExists(): boolean {
  if (_tableExists !== undefined) return _tableExists;
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'routing_decisions'",
    )
    .get() as { name?: string } | undefined;
  _tableExists = Boolean(row?.name);
  return _tableExists;
}

export function resetRoutingDecisionsTableCache(): void {
  _tableExists = undefined;
}

// ── Insert ───────────────────────────────────────────────────────────────────

/**
 * Persist a routing decision to the database.
 *
 * Automatically assigns a UUID if `decision.id` is not set.
 * Returns the assigned ID, or null if the table does not exist.
 */
export function saveRoutingDecision(
  decision: RoutingDecision,
): string | null {
  if (!tableExists()) return null;

  const db = getDbInstance();
  const id = decision.id ?? uuidv4();
  const createdAt = new Date().toISOString();

  db.prepare(
    `
    INSERT INTO routing_decisions
      (id, task_type, combo_id, provider, model, score, factors, fallbacks,
       success, latency_ms, cost, trace_id, span_id, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
  ).run(
    id,
    decision.taskType,
    decision.comboId,
    decision.providerSelected,
    decision.modelUsed,
    decision.score,
    JSON.stringify(decision.factors),
    JSON.stringify(decision.fallbacksTriggered),
    decision.success ? 1 : 0,
    decision.latencyMs,
    decision.cost,
    decision.traceId ?? null,
    decision.spanId ?? null,
    createdAt,
  );

  return id;
}

// ── Query ────────────────────────────────────────────────────────────────────

/**
 * Fetch recent routing decisions, newest first.
 */
export function getRoutingDecisions(
  limit = 50,
  offset = 0,
): RoutingDecisionRow[] {
  if (!tableExists()) return [];

  const db = getDbInstance();
  const rows = db
    .prepare(
      `
      SELECT * FROM routing_decisions
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
      `,
    )
    .all(limit, offset) as Array<Record<string, unknown>>;

  return rows.map(mapRow);
}

/**
 * Fetch routing decisions for a specific provider, newest first.
 */
export function getRoutingDecisionsByProvider(
  provider: string,
  limit = 50,
  offset = 0,
): RoutingDecisionRow[] {
  if (!tableExists()) return [];

  const db = getDbInstance();
  const rows = db
    .prepare(
      `
      SELECT * FROM routing_decisions
      WHERE provider = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
      `,
    )
    .all(provider, limit, offset) as Array<Record<string, unknown>>;

  return rows.map(mapRow);
}

/**
 * Get the total count of routing decisions.
 */
export function getRoutingDecisionCount(): number {
  if (!tableExists()) return 0;
  const db = getDbInstance();
  const row = db
    .prepare("SELECT COUNT(*) as cnt FROM routing_decisions")
    .get() as { cnt: number };
  return row?.cnt ?? 0;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function mapRow(row: Record<string, unknown>): RoutingDecisionRow {
  return {
    id: typeof row.id === "string" ? row.id : "",
    taskType: typeof row.task_type === "string" ? row.task_type : "",
    comboId: typeof row.combo_id === "string" ? row.combo_id : "",
    provider: typeof row.provider === "string" ? row.provider : "",
    model: typeof row.model === "string" ? row.model : "",
    score: typeof row.score === "number" ? row.score : 0,
    factors: parseJsonArray(row.factors),
    fallbacks: parseJsonArray(row.fallbacks),
    success: row.success === 1 || row.success === true,
    latencyMs: typeof row.latency_ms === "number" ? row.latency_ms : 0,
    cost: typeof row.cost === "number" ? row.cost : 0,
    traceId: typeof row.trace_id === "string" ? row.trace_id : undefined,
    spanId: typeof row.span_id === "string" ? row.span_id : undefined,
    createdAt: typeof row.created_at === "string" ? row.created_at : "",
  };
}

function parseJsonArray(value: unknown): string[] {
  if (Array.isArray(value)) return value.map(String);
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.map(String) : [];
    } catch {
      return [];
    }
  }
  return [];
}
