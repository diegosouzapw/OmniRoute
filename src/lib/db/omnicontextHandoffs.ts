import { randomUUID } from "node:crypto";
import { getDbInstance, rowToCamel } from "./core";

export type HandoffStatus = "active" | "resumed" | "closed";

export interface OmniContextHandoff {
  id: string;
  projectId: string;
  artifactId: string | null;
  status: HandoffStatus;
  fromApiKeyId: string | null;
  resumedByApiKeyId: string | null;
  goal: string;
  currentStatus: string;
  decisionsMd: string;
  approachesMd: string;
  blockersMd: string;
  nextStepsMd: string;
  pointersJson: string | null;
  createdAt: string;
  updatedAt: string;
  closedAt: string | null;
  expiresAt: string | null;
}

export interface CreateHandoffInput {
  projectId: string;
  goal: string;
  currentStatus?: string;
  decisionsMd?: string;
  approachesMd?: string;
  blockersMd?: string;
  nextStepsMd?: string;
  pointers?: Record<string, unknown>;
  fromApiKeyId?: string | null;
  artifactId?: string | null;
  expiresAt?: string | null;
}

function mapRow(row: Record<string, unknown> | undefined): OmniContextHandoff | null {
  if (!row) return null;
  return rowToCamel(row) as OmniContextHandoff;
}

export function createHandoff(input: CreateHandoffInput): OmniContextHandoff {
  const db = getDbInstance();
  const id = randomUUID();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO omnicontext_handoffs (
      id, project_id, artifact_id, status, from_api_key_id, goal, current_status,
      decisions_md, approaches_md, blockers_md, next_steps_md, pointers_json,
      created_at, updated_at, expires_at
    ) VALUES (?, ?, ?, 'active', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.projectId,
    input.artifactId ?? null,
    input.fromApiKeyId ?? null,
    input.goal,
    input.currentStatus ?? "",
    input.decisionsMd ?? "",
    input.approachesMd ?? "",
    input.blockersMd ?? "",
    input.nextStepsMd ?? "",
    input.pointers ? JSON.stringify(input.pointers) : null,
    now,
    now,
    input.expiresAt ?? null
  );
  return getHandoffById(id)!;
}

export function getHandoffById(id: string): OmniContextHandoff | null {
  const db = getDbInstance();
  const row = db.prepare(`SELECT * FROM omnicontext_handoffs WHERE id = ?`).get(id) as
    Record<string, unknown> | undefined;
  return mapRow(row);
}

export function listHandoffs(params: {
  projectId: string;
  status?: HandoffStatus;
  limit?: number;
}): OmniContextHandoff[] {
  const db = getDbInstance();
  const limit = Math.min(Math.max(params.limit ?? 50, 1), 200);
  let sql = `SELECT * FROM omnicontext_handoffs WHERE project_id = ?`;
  const args: unknown[] = [params.projectId];
  if (params.status) {
    sql += ` AND status = ?`;
    args.push(params.status);
  }
  sql += ` ORDER BY updated_at DESC LIMIT ?`;
  args.push(limit);
  const rows = db.prepare(sql).all(...args) as Record<string, unknown>[];
  return rows.map((r) => mapRow(r)!);
}

export function resumeHandoff(
  id: string,
  resumedByApiKeyId: string | null
): OmniContextHandoff | null {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `UPDATE omnicontext_handoffs
     SET status = 'resumed', resumed_by_api_key_id = ?, updated_at = ?
     WHERE id = ? AND status = 'active'`
  ).run(resumedByApiKeyId, now, id);
  return getHandoffById(id);
}

export function closeHandoff(id: string): OmniContextHandoff | null {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `UPDATE omnicontext_handoffs
     SET status = 'closed', closed_at = ?, updated_at = ?
     WHERE id = ? AND status IN ('active', 'resumed')`
  ).run(now, now, id);
  return getHandoffById(id);
}

export function formatHandoffMarkdown(h: OmniContextHandoff): string {
  const parts = [
    `# Handoff: ${h.goal}`,
    "",
    `## Status`,
    h.currentStatus || "(none)",
    "",
    `## Decisions`,
    h.decisionsMd || "(none)",
    "",
    `## Approaches tried`,
    h.approachesMd || "(none)",
    "",
    `## Blockers`,
    h.blockersMd || "(none)",
    "",
    `## Next steps`,
    h.nextStepsMd || "(none)",
  ];
  return parts.join("\n");
}
