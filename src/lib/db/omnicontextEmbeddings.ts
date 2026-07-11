import { getDbInstance } from "./core";

export interface ArtifactEmbedding {
  artifactId: string;
  projectId: string;
  model: string;
  dims: number;
  vector: number[];
  updatedAt: string;
}

export function upsertArtifactEmbedding(input: {
  artifactId: string;
  projectId: string;
  model: string;
  vector: number[];
}): void {
  const db = getDbInstance();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO omnicontext_artifact_embeddings
      (artifact_id, project_id, model, dims, vector_json, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)
     ON CONFLICT(artifact_id) DO UPDATE SET
       model = excluded.model,
       dims = excluded.dims,
       vector_json = excluded.vector_json,
       updated_at = excluded.updated_at`
  ).run(
    input.artifactId,
    input.projectId,
    input.model,
    input.vector.length,
    JSON.stringify(input.vector),
    now
  );
}

export function listProjectEmbeddings(projectId: string): ArtifactEmbedding[] {
  const db = getDbInstance();
  const rows = db
    .prepare(`SELECT * FROM omnicontext_artifact_embeddings WHERE project_id = ?`)
    .all(projectId) as Array<{
    artifact_id: string;
    project_id: string;
    model: string;
    dims: number;
    vector_json: string;
    updated_at: string;
  }>;
  return rows.map((row) => ({
    artifactId: row.artifact_id,
    projectId: row.project_id,
    model: row.model,
    dims: row.dims,
    vector: parseVector(row.vector_json),
    updatedAt: row.updated_at,
  }));
}

export function deleteArtifactEmbedding(artifactId: string): void {
  const db = getDbInstance();
  db.prepare(`DELETE FROM omnicontext_artifact_embeddings WHERE artifact_id = ?`).run(artifactId);
}

function parseVector(raw: string): number[] {
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((n) => Number(n)).filter((n) => Number.isFinite(n));
  } catch {
    return [];
  }
}

export function cosineSimilarity(a: number[], b: number[]): number {
  const n = Math.min(a.length, b.length);
  if (n === 0) return 0;
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < n; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}
