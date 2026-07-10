import { randomUUID } from "node:crypto";
import { getDbInstance } from "./core";

export interface OmniContextAuditEvent {
  id: string;
  ts: string;
  actorApiKeyId: string | null;
  action: string;
  projectId: string | null;
  artifactIds: string[];
  queryHash: string | null;
  meta: Record<string, unknown> | null;
}

interface AuditRow {
  id: string;
  ts: string;
  actor_api_key_id: string | null;
  action: string;
  project_id: string | null;
  artifact_ids_json: string | null;
  query_hash: string | null;
  meta_json: string | null;
}

function parseJsonArray(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function parseJsonObject(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

function rowToEvent(row: AuditRow): OmniContextAuditEvent {
  return {
    id: row.id,
    ts: row.ts,
    actorApiKeyId: row.actor_api_key_id,
    action: row.action,
    projectId: row.project_id,
    artifactIds: parseJsonArray(row.artifact_ids_json),
    queryHash: row.query_hash,
    meta: parseJsonObject(row.meta_json),
  };
}

export interface AppendAuditInput {
  action: string;
  actorApiKeyId?: string | null;
  projectId?: string | null;
  artifactIds?: string[];
  queryHash?: string | null;
  meta?: Record<string, unknown> | null;
}

/** Append audit event — never store prompt/artifact bodies. */
export function appendAuditEvent(input: AppendAuditInput): OmniContextAuditEvent {
  const db = getDbInstance();
  const id = randomUUID();
  const ts = new Date().toISOString();
  db.prepare(
    `INSERT INTO omnicontext_audit_log
      (id, ts, actor_api_key_id, action, project_id, artifact_ids_json, query_hash, meta_json)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    ts,
    input.actorApiKeyId ?? null,
    input.action,
    input.projectId ?? null,
    JSON.stringify(input.artifactIds ?? []),
    input.queryHash ?? null,
    input.meta ? JSON.stringify(input.meta) : null
  );
  return {
    id,
    ts,
    actorApiKeyId: input.actorApiKeyId ?? null,
    action: input.action,
    projectId: input.projectId ?? null,
    artifactIds: input.artifactIds ?? [],
    queryHash: input.queryHash ?? null,
    meta: input.meta ?? null,
  };
}

export function listAuditEvents(
  options: {
    projectId?: string;
    limit?: number;
  } = {}
): OmniContextAuditEvent[] {
  const db = getDbInstance();
  const limit = Math.min(Math.max(options.limit ?? 50, 1), 500);
  if (options.projectId) {
    const rows = db
      .prepare(
        `SELECT * FROM omnicontext_audit_log
         WHERE project_id = ?
         ORDER BY ts DESC
         LIMIT ?`
      )
      .all(options.projectId, limit) as AuditRow[];
    return rows.map(rowToEvent);
  }
  const rows = db
    .prepare(`SELECT * FROM omnicontext_audit_log ORDER BY ts DESC LIMIT ?`)
    .all(limit) as AuditRow[];
  return rows.map(rowToEvent);
}
