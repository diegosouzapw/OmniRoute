import { getDbInstance } from "./core";

export interface OmniContextRepoMapEntry {
  repoKey: string;
  projectId: string;
  updatedAt: string;
}

interface RepoMapRow {
  repo_key: string;
  project_id: string;
  updated_at: string;
}

function rowToEntry(row: RepoMapRow): OmniContextRepoMapEntry {
  return {
    repoKey: row.repo_key,
    projectId: row.project_id,
    updatedAt: row.updated_at,
  };
}

function normalizeRepoKey(repoKey: string): string {
  return repoKey.trim().replace(/\.git$/i, "");
}

export function setRepoProjectMapping(repoKey: string, projectId: string): OmniContextRepoMapEntry {
  const db = getDbInstance();
  const key = normalizeRepoKey(repoKey);
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO omnicontext_repo_map (repo_key, project_id, updated_at)
     VALUES (?, ?, ?)
     ON CONFLICT(repo_key) DO UPDATE SET project_id = excluded.project_id, updated_at = excluded.updated_at`
  ).run(key, projectId, now);
  return { repoKey: key, projectId, updatedAt: now };
}

export function getProjectIdForRepo(repoKey: string): string | null {
  const db = getDbInstance();
  const key = normalizeRepoKey(repoKey);
  const row = db
    .prepare("SELECT project_id FROM omnicontext_repo_map WHERE repo_key = ?")
    .get(key) as { project_id: string } | undefined;
  return row?.project_id ?? null;
}

export function listRepoMap(): OmniContextRepoMapEntry[] {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT * FROM omnicontext_repo_map ORDER BY repo_key COLLATE NOCASE ASC")
    .all() as RepoMapRow[];
  return rows.map(rowToEntry);
}

export function deleteRepoMapping(repoKey: string): boolean {
  const db = getDbInstance();
  const result = db
    .prepare("DELETE FROM omnicontext_repo_map WHERE repo_key = ?")
    .run(normalizeRepoKey(repoKey));
  return result.changes > 0;
}
