import { getDbInstance, rowToCamel, objToSnake } from "./core";
import { v4 as uuidv4 } from "uuid";

function parseBatchRow(row: any): BatchRecord {
  const camel = rowToCamel(row) as any;
  if (camel.metadata && typeof camel.metadata === "string") {
    try {
      camel.metadata = JSON.parse(camel.metadata);
    } catch {
      camel.metadata = null;
    }
  }
  if (camel.errors && typeof camel.errors === "string") {
    try {
      camel.errors = JSON.parse(camel.errors);
    } catch {
      camel.errors = null;
    }
  }
  if (camel.usage && typeof camel.usage === "string") {
    try {
      camel.usage = JSON.parse(camel.usage);
    } catch {
      camel.usage = null;
    }
  }
  return camel as BatchRecord;
}

export interface BatchRecord {
  id: string;
  endpoint: string;
  completionWindow: string;
  status:
    | "validating"
    | "failed"
    | "in_progress"
    | "finalizing"
    | "completed"
    | "expired"
    | "cancelling"
    | "cancelled";
  inputFileId: string;
  outputFileId?: string | null;
  errorFileId?: string | null;
  createdAt: number;
  inProgressAt?: number | null;
  expiresAt?: number | null;
  finalizingAt?: number | null;
  completedAt?: number | null;
  failedAt?: number | null;
  expiredAt?: number | null;
  cancellingAt?: number | null;
  cancelledAt?: number | null;
  requestCountsTotal: number;
  requestCountsCompleted: number;
  requestCountsFailed: number;
  metadata?: Record<string, any> | null;
  apiKeyId?: string | null;
  errors?: any | null;
  model?: string | null;
  usage?: any | null;
  outputExpiresAfterSeconds?: number | null;
  outputExpiresAfterAnchor?: string | null;
}

export function createBatch(
  batch: Omit<
    BatchRecord,
    | "id"
    | "createdAt"
    | "status"
    | "requestCountsTotal"
    | "requestCountsCompleted"
    | "requestCountsFailed"
  >
): BatchRecord {
  const db = getDbInstance();
  const id = "batch_" + uuidv4().replaceAll("-", "").substring(0, 24);
  const createdAt = Math.floor(Date.now() / 1000);
  const record: BatchRecord = {
    ...batch,
    id,
    createdAt,
    status: "validating",
    requestCountsTotal: 0,
    requestCountsCompleted: 0,
    requestCountsFailed: 0,
    errors: batch.errors || null,
    model: batch.model || null,
    usage: batch.usage || null,
    outputExpiresAfterSeconds: batch.outputExpiresAfterSeconds || null,
    outputExpiresAfterAnchor: batch.outputExpiresAfterAnchor || null,
  };

  const snakeRecord = objToSnake({
    ...record,
    metadata: record.metadata ? JSON.stringify(record.metadata) : null,
    errors: record.errors ? JSON.stringify(record.errors) : null,
    usage: record.usage ? JSON.stringify(record.usage) : null,
  }) as any;
  const keys = Object.keys(snakeRecord);
  const values = Object.values(snakeRecord);
  const placeholders = keys.map(() => "?").join(", ");

  db.prepare(`INSERT INTO batches (${keys.join(", ")}) VALUES (${placeholders})`).run(...values);

  return record;
}

export function getBatch(id: string): BatchRecord | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM batches WHERE id = ?").get(id);
  if (!row) return null;
  return parseBatchRow(row);
}

export function updateBatch(id: string, updates: Partial<BatchRecord>): boolean {
  const db = getDbInstance();
  const snakeUpdates = objToSnake(updates) as any;
  if (snakeUpdates.metadata && typeof snakeUpdates.metadata !== "string") {
    snakeUpdates.metadata = JSON.stringify(snakeUpdates.metadata);
  }
  if (snakeUpdates.errors && typeof snakeUpdates.errors !== "string") {
    snakeUpdates.errors = JSON.stringify(snakeUpdates.errors);
  }
  if (snakeUpdates.usage && typeof snakeUpdates.usage !== "string") {
    snakeUpdates.usage = JSON.stringify(snakeUpdates.usage);
  }

  const keys = Object.keys(snakeUpdates);
  if (keys.length === 0) return false;

  const setClause = keys.map((k) => `${k} = ?`).join(", ");
  const values = Object.values(snakeUpdates);

  const result = db.prepare(`UPDATE batches SET ${setClause} WHERE id = ?`).run(...values, id);
  return result.changes > 0;
}

export function listBatches(apiKeyId?: string, limit: number = 20, after?: string): BatchRecord[] {
  const db = getDbInstance();
  const afterBatch = after ? getBatch(after) : null;
  let rows: any[];
  if (apiKeyId) {
    if (afterBatch) {
      rows = db
        .prepare(
          "SELECT * FROM batches WHERE api_key_id = ? AND (created_at < ? OR (created_at = ? AND id < ?)) ORDER BY created_at DESC, id DESC LIMIT ?"
        )
        .all(apiKeyId, afterBatch.createdAt, afterBatch.createdAt, after, limit);
    } else {
      rows = db
        .prepare(
          "SELECT * FROM batches WHERE api_key_id = ? ORDER BY created_at DESC, id DESC LIMIT ?"
        )
        .all(apiKeyId, limit);
    }
  } else if (afterBatch) {
    rows = db
      .prepare(
        "SELECT * FROM batches WHERE (created_at < ? OR (created_at = ? AND id < ?)) ORDER BY created_at DESC, id DESC LIMIT ?"
      )
      .all(afterBatch.createdAt, afterBatch.createdAt, after, limit);
  } else {
    rows = db.prepare("SELECT * FROM batches ORDER BY created_at DESC, id DESC LIMIT ?").all(limit);
  }
  return rows.map((row) => parseBatchRow(row));
}

export function getPendingBatches(): BatchRecord[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT * FROM batches WHERE status IN ('validating', 'in_progress', 'finalizing', 'cancelling')"
    )
    .all();
  return rows.map((row) => parseBatchRow(row));
}

export function getTerminalBatches(): BatchRecord[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      "SELECT * FROM batches WHERE status IN ('completed', 'failed', 'cancelled', 'expired') ORDER BY created_at ASC"
    )
    .all();
  return rows.map((row) => parseBatchRow(row));
}
