import { randomUUID } from "node:crypto";
import { getDbInstance, rowToCamel } from "./core";

export type ArtifactType =
  "summary" | "decision" | "blocker" | "snippet" | "handoff" | "stable_prefix";

export type ArtifactTrustTier = "draft" | "member" | "lead_approved" | "stable";
export type ArtifactStatus = "active" | "pending" | "deleted";
export type ArtifactPublishPolicy = "auto" | "review_required" | "lead_only";

export interface OmniContextArtifact {
  id: string;
  projectId: string;
  type: ArtifactType;
  title: string;
  body: string;
  version: number;
  supersedesId: string | null;
  classification: string;
  trustTier: ArtifactTrustTier;
  publishPolicy: ArtifactPublishPolicy;
  status: ArtifactStatus;
  ticketId: string | null;
  repo: string | null;
  branch: string | null;
  tagsJson: string | null;
  createdByApiKeyId: string | null;
  approvedByApiKeyId: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
  staleAfterAt: string | null;
  departmentId?: string | null;
  legalHold?: boolean;
}

export interface CreateArtifactInput {
  projectId: string;
  type: ArtifactType;
  title: string;
  body: string;
  trustTier?: ArtifactTrustTier;
  publishPolicy?: ArtifactPublishPolicy;
  status?: ArtifactStatus;
  ticketId?: string | null;
  repo?: string | null;
  branch?: string | null;
  tags?: string[];
  createdByApiKeyId?: string | null;
  supersedesId?: string | null;
  expiresAt?: string | null;
  staleAfterAt?: string | null;
  departmentId?: string | null;
}

function mapRow(row: Record<string, unknown> | undefined): OmniContextArtifact | null {
  if (!row) return null;
  const camel = rowToCamel(row) as OmniContextArtifact & { legalHold?: unknown };
  if (camel && "legalHold" in camel) {
    camel.legalHold = camel.legalHold === true || camel.legalHold === 1;
  }
  return camel;
}

export function createArtifact(input: CreateArtifactInput): OmniContextArtifact {
  const db = getDbInstance();
  const id = randomUUID();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO omnicontext_artifacts (
      id, project_id, type, title, body, version, supersedes_id, classification,
      trust_tier, publish_policy, status, ticket_id, repo, branch, tags_json,
      created_by_api_key_id, created_at, updated_at, expires_at, stale_after_at,
      department_id, legal_hold
    ) VALUES (?, ?, ?, ?, ?, 1, ?, 'internal', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`
  ).run(
    id,
    input.projectId,
    input.type,
    input.title,
    input.body,
    input.supersedesId ?? null,
    input.trustTier ?? "member",
    input.publishPolicy ?? "auto",
    input.status ?? "active",
    input.ticketId ?? null,
    input.repo ?? null,
    input.branch ?? null,
    input.tags ? JSON.stringify(input.tags) : null,
    input.createdByApiKeyId ?? null,
    now,
    now,
    input.expiresAt ?? null,
    input.staleAfterAt ?? null,
    input.departmentId ?? null
  );
  return getArtifactById(id)!;
}

export function getArtifactById(id: string): OmniContextArtifact | null {
  const db = getDbInstance();
  const row = db.prepare(`SELECT * FROM omnicontext_artifacts WHERE id = ?`).get(id) as
    Record<string, unknown> | undefined;
  return mapRow(row);
}

export function listArtifacts(params: {
  projectId: string;
  type?: ArtifactType;
  status?: ArtifactStatus;
  limit?: number;
}): OmniContextArtifact[] {
  const db = getDbInstance();
  const limit = Math.min(Math.max(params.limit ?? 50, 1), 200);
  let sql = `SELECT * FROM omnicontext_artifacts WHERE project_id = ?`;
  const args: unknown[] = [params.projectId];
  if (params.type) {
    sql += ` AND type = ?`;
    args.push(params.type);
  }
  if (params.status) {
    sql += ` AND status = ?`;
    args.push(params.status);
  } else {
    sql += ` AND status != 'deleted'`;
  }
  sql += ` ORDER BY updated_at DESC LIMIT ?`;
  args.push(limit);
  const rows = db.prepare(sql).all(...args) as Record<string, unknown>[];
  return rows.map((r) => mapRow(r)!);
}

export function softDeleteArtifact(id: string): boolean {
  const db = getDbInstance();
  const hold = db.prepare(`SELECT legal_hold FROM omnicontext_artifacts WHERE id = ?`).get(id) as
    { legal_hold?: number } | undefined;
  if (hold && hold.legal_hold === 1) {
    throw new Error("Artifact is under legal hold");
  }
  const result = db
    .prepare(
      `UPDATE omnicontext_artifacts SET status = 'deleted', updated_at = ? WHERE id = ? AND status != 'deleted'`
    )
    .run(new Date().toISOString(), id);
  return result.changes > 0;
}

export function approveArtifact(
  id: string,
  approvedByApiKeyId: string | null
): OmniContextArtifact | null {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `UPDATE omnicontext_artifacts
     SET status = 'active', trust_tier = 'lead_approved', approved_by_api_key_id = ?, updated_at = ?
     WHERE id = ? AND status = 'pending'`
  ).run(approvedByApiKeyId, now, id);
  return getArtifactById(id);
}

export interface ArtifactSearchHit {
  artifact: OmniContextArtifact;
  rank: number;
}

/** FTS5 keyword search within a project. Empty query returns recent active artifacts. */
export function searchArtifacts(params: {
  projectId: string;
  query: string;
  limit?: number;
  includeDraft?: boolean;
}): ArtifactSearchHit[] {
  const db = getDbInstance();
  const limit = Math.min(Math.max(params.limit ?? 20, 1), 50);
  const q = params.query.trim();

  if (!q) {
    return listArtifacts({
      projectId: params.projectId,
      status: "active",
      limit,
    }).map((artifact, i) => ({ artifact, rank: 1 / (i + 1) }));
  }

  // Escape FTS5 special chars for safe MATCH (hyphens are FTS operators)
  const safe = q
    .replace(/["']/g, " ")
    .replace(/-/g, " ")
    .replace(/[^\w\s.]/g, " ")
    .trim();
  if (!safe) {
    return listArtifacts({
      projectId: params.projectId,
      status: "active",
      limit,
    }).map((artifact, i) => ({ artifact, rank: 1 / (i + 1) }));
  }

  const matchQuery = safe
    .split(/\s+/)
    .filter(Boolean)
    .map((t) => `${t}*`)
    .join(" OR ");

  const statusFilter = params.includeDraft
    ? `status IN ('active', 'pending')`
    : `status = 'active'`;

  try {
    const rows = db
      .prepare(
        `SELECT a.*, bm25(omnicontext_artifact_fts) AS fts_rank
         FROM omnicontext_artifact_fts f
         JOIN omnicontext_artifacts a ON a.rowid = f.rowid
         WHERE omnicontext_artifact_fts MATCH ?
           AND a.project_id = ?
           AND a.${statusFilter}
         ORDER BY fts_rank
         LIMIT ?`
      )
      .all(matchQuery, params.projectId, limit) as Array<Record<string, unknown>>;

    return rows.map((row) => {
      const ftsRank = typeof row.fts_rank === "number" ? row.fts_rank : 0;
      const { fts_rank: _drop, ...rest } = row;
      return {
        artifact: mapRow(rest)!,
        // bm25 is lower-is-better; invert for ranking score
        rank: 1 / (1 + Math.abs(ftsRank)),
      };
    });
  } catch {
    // FTS parse failure → fall back to LIKE
    const like = `%${safe.slice(0, 64)}%`;
    const rows = db
      .prepare(
        `SELECT * FROM omnicontext_artifacts
         WHERE project_id = ? AND ${statusFilter}
           AND (title LIKE ? OR body LIKE ?)
         ORDER BY updated_at DESC LIMIT ?`
      )
      .all(params.projectId, like, like, limit) as Record<string, unknown>[];
    return rows.map((r, i) => ({ artifact: mapRow(r)!, rank: 1 / (i + 1) }));
  }
}

export function getStablePrefix(projectId: string): OmniContextArtifact | null {
  const db = getDbInstance();
  const row = db
    .prepare(
      `SELECT * FROM omnicontext_artifacts
       WHERE project_id = ? AND type = 'stable_prefix' AND status = 'active'
       ORDER BY updated_at DESC LIMIT 1`
    )
    .get(projectId) as Record<string, unknown> | undefined;
  return mapRow(row);
}
