import { randomUUID } from "node:crypto";
import { getDbInstance } from "./core";

export type FeedbackVerdict = "helpful" | "harmful";

export interface OmniContextFeedback {
  id: string;
  projectId: string;
  artifactId: string;
  verdict: FeedbackVerdict;
  actorApiKeyId: string | null;
  retrieveId: string | null;
  note: string | null;
  createdAt: string;
}

interface FeedbackRow {
  id: string;
  project_id: string;
  artifact_id: string;
  verdict: string;
  actor_api_key_id: string | null;
  retrieve_id: string | null;
  note: string | null;
  created_at: string;
}

function rowToFeedback(row: FeedbackRow): OmniContextFeedback {
  return {
    id: row.id,
    projectId: row.project_id,
    artifactId: row.artifact_id,
    verdict: row.verdict as FeedbackVerdict,
    actorApiKeyId: row.actor_api_key_id,
    retrieveId: row.retrieve_id,
    note: row.note,
    createdAt: row.created_at,
  };
}

export interface CreateFeedbackInput {
  projectId: string;
  artifactId: string;
  verdict: FeedbackVerdict;
  actorApiKeyId?: string | null;
  retrieveId?: string | null;
  note?: string | null;
}

export function createFeedback(input: CreateFeedbackInput): OmniContextFeedback {
  const db = getDbInstance();
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  db.prepare(
    `INSERT INTO omnicontext_feedback
      (id, project_id, artifact_id, verdict, actor_api_key_id, retrieve_id, note, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.projectId,
    input.artifactId,
    input.verdict,
    input.actorApiKeyId ?? null,
    input.retrieveId ?? null,
    input.note ?? null,
    createdAt
  );
  return {
    id,
    projectId: input.projectId,
    artifactId: input.artifactId,
    verdict: input.verdict,
    actorApiKeyId: input.actorApiKeyId ?? null,
    retrieveId: input.retrieveId ?? null,
    note: input.note ?? null,
    createdAt,
  };
}

export function listFeedback(params: {
  projectId: string;
  artifactId?: string;
  limit?: number;
}): OmniContextFeedback[] {
  const db = getDbInstance();
  const limit = Math.min(Math.max(params.limit ?? 50, 1), 200);
  let sql = `SELECT * FROM omnicontext_feedback WHERE project_id = ?`;
  const args: unknown[] = [params.projectId];
  if (params.artifactId) {
    sql += ` AND artifact_id = ?`;
    args.push(params.artifactId);
  }
  sql += ` ORDER BY created_at DESC LIMIT ?`;
  args.push(limit);
  const rows = db.prepare(sql).all(...args) as FeedbackRow[];
  return rows.map(rowToFeedback);
}

export function countFeedbackByVerdict(projectId: string): {
  helpful: number;
  harmful: number;
} {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT verdict, COUNT(*) AS c FROM omnicontext_feedback
       WHERE project_id = ? GROUP BY verdict`
    )
    .all(projectId) as Array<{ verdict: string; c: number }>;
  const out = { helpful: 0, harmful: 0 };
  for (const row of rows) {
    if (row.verdict === "helpful") out.helpful = row.c;
    if (row.verdict === "harmful") out.harmful = row.c;
  }
  return out;
}
