import { getDbInstance, rowToCamel, objToSnake } from "./core";
import { v4 as uuidv4 } from "uuid";

export interface FileRecord {
  id: string;
  bytes: number;
  createdAt: number;
  filename: string;
  purpose: string;
  content?: Buffer | null;
  mimeType?: string | null;
  apiKeyId?: string | null;
  status?: string | null;
  expiresAt?: number | null;
  deletedAt?: number | null;
}

const FILE_METADATA_COLUMNS =
  "id, bytes, created_at, filename, purpose, mime_type, api_key_id, status, expires_at, deleted_at";

export function createFile(file: Omit<FileRecord, "id" | "createdAt">): FileRecord {
  const db = getDbInstance();
  const id = "file-" + uuidv4().replaceAll("-", "").substring(0, 24);
  const createdAt = Math.floor(Date.now() / 1000);
  const record = { ...file, id, createdAt };

  const snakeRecord = objToSnake(record) as any;
  const keys = Object.keys(snakeRecord);
  const values = Object.values(snakeRecord);
  const placeholders = keys.map(() => "?").join(", ");

  db.prepare(`INSERT INTO files (${keys.join(", ")}) VALUES (${placeholders})`).run(...values);

  return record;
}

export function getFile(id: string): FileRecord | null {
  const db = getDbInstance();
  const row = db
    .prepare(`SELECT ${FILE_METADATA_COLUMNS} FROM files WHERE id = ? AND deleted_at IS NULL`)
    .get(id);
  return row ? (rowToCamel(row) as unknown as FileRecord) : null;
}

export function getFileContent(id: string): Buffer | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT content FROM files WHERE id = ? AND deleted_at IS NULL")
    .get(id) as { content: Buffer } | undefined;
  return row?.content || null;
}

export function listFiles(
  options: {
    apiKeyId?: string;
    purpose?: string;
    limit?: number;
    after?: string;
    order?: "asc" | "desc";
  } = {}
): FileRecord[] {
  const db = getDbInstance();
  const { apiKeyId, purpose, limit = 20, after, order = "desc" } = options;

  let query = `SELECT ${FILE_METADATA_COLUMNS} FROM files WHERE deleted_at IS NULL`;
  const params: any[] = [];

  if (apiKeyId) {
    query += " AND api_key_id = ?";
    params.push(apiKeyId);
  }

  if (purpose) {
    query += " AND purpose = ?";
    params.push(purpose);
  }

  if (after) {
    // Get the creation time of the 'after' file to use for pagination
    const afterFile = getFile(after);
    if (afterFile) {
      if (order === "desc") {
        query += " AND (created_at < ? OR (created_at = ? AND id < ?))";
      } else {
        query += " AND (created_at > ? OR (created_at = ? AND id > ?))";
      }
      params.push(afterFile.createdAt, afterFile.createdAt, after);
    }
  }

  query += ` ORDER BY created_at ${order === "asc" ? "ASC" : "DESC"}, id ${order === "asc" ? "ASC" : "DESC"}`;
  query += " LIMIT ?";
  params.push(limit);

  const rows = db.prepare(query).all(...params);
  return rows.map((row) => rowToCamel(row) as unknown as FileRecord);
}

export function updateFileStatus(id: string, status: string): boolean {
  const db = getDbInstance();
  const result = db.prepare("UPDATE files SET status = ? WHERE id = ?").run(status, id);
  return result.changes > 0;
}

export function formatFileResponse(file: FileRecord) {
  return {
    id: file.id,
    bytes: file.bytes,
    created_at: file.createdAt,
    filename: file.filename,
    object: "file",
    purpose: file.purpose,
    status: file.status || "validating",
    expires_at: file.expiresAt || null,
  };
}

export function deleteFile(id: string): boolean {
  const db = getDbInstance();
  const result = db
    .prepare("UPDATE files SET deleted_at = ?, content = NULL WHERE id = ?")
    .run(Math.floor(Date.now() / 1000), id);
  return result.changes > 0;
}
