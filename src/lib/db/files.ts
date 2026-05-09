import { getDbInstance, rowToCamel, objToSnake } from "./core";
import { v4 as uuidv4 } from "uuid";
import { DEFAULT_BATCH_EXPIRATION_SECONDS } from "@/shared/constants/batch";

export interface FileRecord {
  id: string;
  bytes: number;
  createdAt: number;
  filename: string;
  purpose: string;
  content?: Buffer | null;
  mimeType?: string | null;
  apiKeyId?: string | null;
  expiresAt?: number | null;
  deletedAt?: number | null;
}

const FILE_METADATA_COLUMNS =
  "id, bytes, created_at, filename, purpose, mime_type, api_key_id, expires_at, deleted_at";

export function createFile(file: Omit<FileRecord, "id" | "createdAt">): FileRecord {
  const db = getDbInstance();
  const id = "file-" + uuidv4().replaceAll("-", "").substring(0, 24);
  const createdAt = Math.floor(Date.now() / 1000);

  let expiresAt = file.expiresAt;
  if (expiresAt === undefined && file.purpose === "batch") {
    // Default: batch files expire after 30 days
    expiresAt = createdAt + DEFAULT_BATCH_EXPIRATION_SECONDS;
  }

  const record: FileRecord = {
    id,
    bytes: file.bytes,
    createdAt,
    filename: file.filename,
    purpose: file.purpose,
    content: file.content,
    mimeType: file.mimeType,
    apiKeyId: file.apiKeyId,
    expiresAt,
    deletedAt: null,
  };

  db.prepare(
    `
    INSERT INTO files (id, bytes, created_at, filename, purpose, content, mime_type, api_key_id, expires_at, deleted_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    record.id,
    record.bytes,
    record.createdAt,
    record.filename,
    record.purpose,
    record.content,
    record.mimeType,
    record.apiKeyId,
    record.expiresAt,
    record.deletedAt
  );

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

export function countFiles(options: { apiKeyId?: string; purpose?: string } = {}): number {
  const db = getDbInstance();
  const { apiKeyId, purpose } = options;
  let query = "SELECT COUNT(*) as c FROM files WHERE deleted_at IS NULL";
  const params: any[] = [];
  if (apiKeyId) {
    query += " AND api_key_id = ?";
    params.push(apiKeyId);
  }
  if (purpose) {
    query += " AND purpose = ?";
    params.push(purpose);
  }
  const row = db.prepare(query).get(...params) as { c: number } | undefined;
  return row ? Number(row.c) : 0;
}

export function formatFileResponse(file: FileRecord) {
  // Ensure numeric date fields are valid numbers to avoid NaN in API responses
  const createdAt =
    typeof file.createdAt === "number" && Number.isFinite(file.createdAt) ? file.createdAt : 0;
  const expiresAt =
    typeof file.expiresAt === "number" && Number.isFinite(file.expiresAt) ? file.expiresAt : null;

  return {
    id: file.id,
    bytes: file.bytes,
    created_at: createdAt,
    filename: file.filename,
    object: "file",
    purpose: file.purpose,
    expires_at: expiresAt,
  };
}

export function deleteFile(id: string): boolean {
  const db = getDbInstance();
  const result = db
    .prepare("UPDATE files SET deleted_at = ?, content = NULL WHERE id = ?")
    .run(Math.floor(Date.now() / 1000), id);
  return result.changes > 0;
}
