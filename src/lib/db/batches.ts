import { getDbInstance, rowToCamel, objToSnake } from "./core";
import { deleteFile, deleteFileOwnedBy } from "./files";
import { v4 as uuidv4 } from "uuid";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("DB_BATCHES");

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
  // Normalize numeric date fields to ensure they are valid numbers
  const coerceNum = (v: any): number | null => {
    if (typeof v === "number" && Number.isFinite(v)) return v;
    if (v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
  };

  camel.createdAt = coerceNum(camel.createdAt) ?? 0;
  camel.inProgressAt = coerceNum(camel.inProgressAt);
  camel.expiresAt = coerceNum(camel.expiresAt);
  camel.finalizingAt = coerceNum(camel.finalizingAt);
  camel.completedAt = coerceNum(camel.completedAt);
  camel.failedAt = coerceNum(camel.failedAt);
  camel.expiredAt = coerceNum(camel.expiredAt);
  camel.cancellingAt = coerceNum(camel.cancellingAt);
  camel.cancelledAt = coerceNum(camel.cancelledAt);
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

export type BatchItemCheckpointStatus = "pending" | "processing" | "completed" | "errored";

export interface BatchItemCheckpoint {
  batchId: string;
  lineNumber: number;
  customId: string | null;
  status: BatchItemCheckpointStatus;
  result: any | null;
  error: any | null;
  createdAt: number;
  updatedAt: number;
}

function parseJsonColumn(value: unknown): any | null {
  if (value == null) return null;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function parseBatchItemCheckpoint(row: any): BatchItemCheckpoint {
  return {
    batchId: row.batch_id,
    lineNumber: Number(row.line_number),
    customId: row.custom_id ?? null,
    status: row.status,
    result: parseJsonColumn(row.result_json),
    error: parseJsonColumn(row.error_json),
    createdAt: Number(row.created_at),
    updatedAt: Number(row.updated_at),
  };
}

export function createBatch(
  batch: Omit<
    BatchRecord,
    | "id"
    | "createdAt"
    | "requestCountsTotal"
    | "requestCountsCompleted"
    | "requestCountsFailed"
    | "status"
  > & { status?: BatchRecord["status"] }
): BatchRecord {
  const db = getDbInstance();
  const id = "batch_" + uuidv4().replaceAll("-", "").substring(0, 24);
  const createdAt = Math.floor(Date.now() / 1000);
  const record: BatchRecord = {
    ...batch,
    id,
    createdAt,
    status: batch.status || "validating",
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

export function ensureBatchItemCheckpoints(
  batchId: string,
  items: Array<{ lineNumber: number; customId: string | null }>
): void {
  if (items.length === 0) return;

  const db = getDbInstance();
  const now = Math.floor(Date.now() / 1000);
  const insert = db.prepare(`
    INSERT OR IGNORE INTO batch_item_checkpoints (
      batch_id,
      line_number,
      custom_id,
      status,
      result_json,
      error_json,
      created_at,
      updated_at
    )
    VALUES (?, ?, ?, 'pending', NULL, NULL, ?, ?)
  `);

  const tx = db.transaction(() => {
    for (const item of items) {
      insert.run(batchId, item.lineNumber, item.customId, now, now);
    }
  });
  tx();
}

export function countBatchItemCheckpoints(batchId: string): number {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT COUNT(*) AS c FROM batch_item_checkpoints WHERE batch_id = ?")
    .get(batchId) as { c: number } | undefined;
  return row ? Number(row.c) : 0;
}

export function listBatchItemCheckpoints(batchId: string): BatchItemCheckpoint[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `
      SELECT batch_id, line_number, custom_id, status, result_json, error_json, created_at, updated_at
      FROM batch_item_checkpoints
      WHERE batch_id = ?
      ORDER BY line_number ASC
    `
    )
    .all(batchId);
  return rows.map((row) => parseBatchItemCheckpoint(row));
}

export function markBatchItemProcessing(
  batchId: string,
  item: { lineNumber: number; customId: string | null }
): void {
  const db = getDbInstance();
  const now = Math.floor(Date.now() / 1000);
  db.prepare(
    `
    INSERT INTO batch_item_checkpoints (
      batch_id,
      line_number,
      custom_id,
      status,
      result_json,
      error_json,
      created_at,
      updated_at
    )
    VALUES (?, ?, ?, 'processing', NULL, NULL, ?, ?)
    ON CONFLICT(batch_id, line_number) DO UPDATE SET
      custom_id = excluded.custom_id,
      status = 'processing',
      result_json = NULL,
      error_json = NULL,
      updated_at = excluded.updated_at
  `
  ).run(batchId, item.lineNumber, item.customId, now, now);
}

export function markBatchItemResult(
  batchId: string,
  item: { lineNumber: number; customId: string | null },
  result: any
): void {
  const db = getDbInstance();
  const now = Math.floor(Date.now() / 1000);
  db.prepare(
    `
    UPDATE batch_item_checkpoints
    SET custom_id = ?,
        status = 'completed',
        result_json = ?,
        error_json = NULL,
        updated_at = ?
    WHERE batch_id = ? AND line_number = ?
  `
  ).run(item.customId, JSON.stringify(result), now, batchId, item.lineNumber);
}

export function markBatchItemError(
  batchId: string,
  item: { lineNumber: number; customId: string | null },
  error: any
): void {
  const db = getDbInstance();
  const now = Math.floor(Date.now() / 1000);
  db.prepare(
    `
    UPDATE batch_item_checkpoints
    SET custom_id = ?,
        status = 'errored',
        result_json = NULL,
        error_json = ?,
        updated_at = ?
    WHERE batch_id = ? AND line_number = ?
  `
  ).run(item.customId, JSON.stringify(error), now, batchId, item.lineNumber);
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

export function countBatches(apiKeyId?: string): number {
  const db = getDbInstance();
  if (apiKeyId) {
    const row = db
      .prepare("SELECT COUNT(*) as c FROM batches WHERE api_key_id = ?")
      .get(apiKeyId) as { c: number } | undefined;
    return row ? Number(row.c) : 0;
  } else {
    const row = db.prepare("SELECT COUNT(*) as c FROM batches").get() as { c: number } | undefined;
    return row ? Number(row.c) : 0;
  }
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

export function deleteBatch(id: string): boolean {
  const db = getDbInstance();
  const batch = getBatch(id);
  if (!batch) return false;

  db.prepare("DELETE FROM batch_item_checkpoints WHERE batch_id = ?").run(id);

  // Soft-delete associated files (input, output, error) — but only when no
  // OTHER batch still references the same file id (#13681). A file shared
  // across batches (e.g. one input file reused for several batch submissions)
  // must survive as long as any sibling batch still points at it.
  if (batch.inputFileId && !isFileReferencedByOtherBatch(batch.inputFileId, [id])) {
    try {
      deleteFile(batch.inputFileId);
    } catch {
      /* ignore */
    }
  }
  if (batch.outputFileId && !isFileReferencedByOtherBatch(batch.outputFileId, [id])) {
    try {
      deleteFile(batch.outputFileId);
    } catch {
      /* ignore */
    }
  }
  if (batch.errorFileId && !isFileReferencedByOtherBatch(batch.errorFileId, [id])) {
    try {
      deleteFile(batch.errorFileId);
    } catch {
      /* ignore */
    }
  }

  const result = db.prepare("DELETE FROM batches WHERE id = ?").run(id);
  return result.changes > 0;
}

/**
 * Scope of a `deleteCompletedBatches` sweep. The intent is explicit on purpose:
 * a caller either names the API key whose batches it may sweep, or states
 * `allTenants: true` — there is no default that widens to the whole instance.
 */
export type DeleteCompletedBatchesScope = { apiKeyId: string } | { allTenants: true };

/** Both sweep modes commit in chunks of this many batches (SEC-D, LEDGER-4). */
export const INSTANCE_SWEEP_CHUNK = 200;

/**
 * Upper bound on the number of `INSTANCE_SWEEP_CHUNK`-sized chunks a single
 * `deleteCompletedBatches` call may run (#13680). `sweepLoop` is a synchronous
 * `for (;;)` over `better-sqlite3` — with no cap, one request could hold the
 * Node.js event loop for as long as it takes to sweep every completed batch on
 * the instance. 25 × 200 = 5000 batches/request is a judgment call, not a hard
 * constraint; any caller with more to sweep gets `hasMore: true` back and
 * resumes by calling again — resumption falls out naturally from rowid
 * ordering plus delete-as-you-go (already-swept rows are gone, so the next
 * SELECT picks up the next-lowest surviving rowid on its own; no cursor field
 * needed).
 */
export const MAX_CHUNKS_PER_REQUEST = 25;

/**
 * True when some batch OTHER than one of `excludeBatchIds` still references
 * `fileId` as its input/output/error file (#13681). Used before soft-deleting
 * a file to avoid nulling content a surviving batch still needs. Binds
 * `fileId` three times; when `excludeBatchIds` is empty the `NOT IN (...)`
 * clause is dropped entirely rather than emitted empty (`NOT IN ()` is invalid
 * SQL, and getting the guard wrong there would silently match everything).
 */
export function isFileReferencedByOtherBatch(fileId: string, excludeBatchIds: string[]): boolean {
  const db = getDbInstance();
  if (excludeBatchIds.length === 0) {
    const row = db
      .prepare(
        "SELECT 1 FROM batches WHERE input_file_id = ? OR output_file_id = ? OR error_file_id = ? LIMIT 1"
      )
      .get(fileId, fileId, fileId);
    return !!row;
  }
  const marks = excludeBatchIds.map(() => "?").join(",");
  const row = db
    .prepare(
      `SELECT 1 FROM batches WHERE (input_file_id = ? OR output_file_id = ? OR error_file_id = ?) AND id NOT IN (${marks}) LIMIT 1`
    )
    .get(fileId, fileId, fileId, ...excludeBatchIds);
  return !!row;
}

/**
 * Delete completed batches and the files they reference.
 *
 * `{ apiKeyId }` scopes the sweep to that key's own batches, exactly like
 * `listBatches`/`countBatches`. `{ allTenants: true }` sweeps the whole instance
 * and is reserved for an authenticated dashboard session — an ordinary inference
 * key that reached this without its own id would otherwise delete every tenant's
 * completed batches and null out their file contents (GHSA-wvxc-jp3v-5mg5). A
 * missing/empty `apiKeyId` without `allTenants` throws instead of silently
 * widening the sweep, and a scope carrying BOTH `apiKeyId` and `allTenants` is
 * rejected rather than widened.
 *
 * Batches whose `api_key_id` IS NULL are intentionally OUT of a key-scoped sweep:
 * a bulk destructive sweep must never reach records the key does not own, so
 * unowned batches are only swept by `{ allTenants: true }`. The single-item routes
 * apply the same rule through `canAccessOwnedRecord` in
 * `src/app/api/v1/_helpers/apiKeyScope.ts` (a null owner is denied to every
 * non-session caller — GHSA-2jm2-mpx8-6523).
 *
 * In key mode the file half is owner-scoped too: only files whose api_key_id is
 * the caller's are soft-deleted; a referenced file another tenant owns (or an
 * unowned one) is left intact and is not counted in deletedFiles.
 *
 * The file soft-deletes, the checkpoint DELETE and the batches DELETE for a set
 * of batch ids run in one transaction, so a mid-sweep failure rolls that set back
 * — within a chunk, no batch row is left pointing at a file whose content was
 * already nulled. BOTH modes walk the key's/instance's completed batches in
 * chunks of `INSTANCE_SWEEP_CHUNK` ids and commit that unit once per chunk
 * (SEC-D; key mode since the omni-code-sec proof run, LEDGER-4/20/21): the
 * SQLite write lock is held for one chunk at a time and never across chunks,
 * so the lowest-privilege caller — any valid API key — cannot hold the
 * instance's single writer for the length of its whole sweep. Each chunk stays
 * atomic: a failure inside chunk N leaves chunks < N committed, chunk N fully
 * rolled back, and rethrows. Each chunk's file soft-deletes now check whether
 * some batch OUTSIDE that chunk still references the file
 * (`isFileReferencedByOtherBatch`, #13681) — a file shared with a
 * non-completed sibling batch, or with a completed batch a LATER chunk hasn't
 * reached yet, survives this chunk. The only case that check cannot see is
 * pure timing: chunk 1 commits and nulls a file, then — before chunk 2 runs —
 * a NEW batch is created reusing that same file id. That race is inherent to
 * per-chunk commits and stays a known, accepted edge case; everything else
 * (a concurrently existing sibling, in any status, in any chunk) is now
 * guarded. The returned totals sum the chunks.
 *
 * A single call commits at most `MAX_CHUNKS_PER_REQUEST` chunks (#13680):
 * `better-sqlite3` is synchronous, so an unbounded loop would hold the event
 * loop for as long as it takes to sweep the whole key's/instance's backlog.
 * When the cap is hit with more rows still pending, the call returns
 * `hasMore: true` instead of continuing; the caller (the DELETE route) simply
 * calls again. Resumption needs no cursor: swept rows are gone, `rowid` only
 * increases, so the next call's `ORDER BY rowid LIMIT ?` picks up exactly
 * where the previous call left off.
 *
 * The loop must make progress: it remembers the first id of the previous chunk
 * and throws if the next chunk starts with the same id — the DELETE removed
 * nothing (e.g. a trigger ignored it), and re-selecting the same rows would
 * spin forever (LEDGER-22). Rows vanishing under a concurrent deleter are fine:
 * the next chunk then starts with a different id or is empty.
 *
 * The ids of a unit are bound as `IN (?, …)` placeholders. No statement ever
 * binds more than `INSTANCE_SWEEP_CHUNK` ids in either mode, so a tenant with
 * tens of thousands of completed batches never hits SQLite's default
 * SQLITE_MAX_VARIABLE_NUMBER (32766 since 3.32).
 */
export function deleteCompletedBatches(scope: DeleteCompletedBatchesScope): {
  deletedBatches: number;
  deletedFiles: number;
  hasMore: boolean;
} {
  const scopeObj = scope && typeof scope === "object" ? scope : {};
  const allTenants = "allTenants" in scopeObj && scopeObj.allTenants === true;
  const apiKeyId = "apiKeyId" in scopeObj ? scopeObj.apiKeyId : undefined;
  if (!allTenants && (typeof apiKeyId !== "string" || apiKeyId.trim() === "")) {
    throw new Error("deleteCompletedBatches: apiKeyId required unless allTenants");
  }
  // Presence, not truthiness: `{ allTenants: true, apiKeyId: "" }` (or null) is a
  // caller that named both fields and must be refused, not widened (LEDGER-18).
  if (allTenants && "apiKeyId" in scopeObj) {
    throw new Error("deleteCompletedBatches: apiKeyId and allTenants are mutually exclusive");
  }

  const db = getDbInstance();

  // One consistent unit: file soft-deletes → checkpoints → batch rows for a
  // given set of batch ids. Both modes run — and commit — it once per chunk of
  // INSTANCE_SWEEP_CHUNK ids, so a large sweep never holds one write lock for
  // the whole table (SEC-D, LEDGER-4) while each chunk stays atomic.
  const sweepIds = db.transaction((ids: string[]) => {
    if (ids.length === 0) return { deletedBatches: 0, deletedFiles: 0 };
    const marks = ids.map(() => "?").join(",");
    const rows = db
      .prepare(
        `SELECT input_file_id, output_file_id, error_file_id FROM batches WHERE id IN (${marks})`
      )
      .all(...ids) as Array<{
      input_file_id: string | null;
      output_file_id: string | null;
      error_file_id: string | null;
    }>;

    const fileIds = new Set<string>();
    for (const row of rows) {
      if (row.input_file_id) fileIds.add(row.input_file_id);
      if (row.output_file_id) fileIds.add(row.output_file_id);
      if (row.error_file_id) fileIds.add(row.error_file_id);
    }

    let deletedFiles = 0;
    for (const fid of fileIds) {
      // #13681: a file referenced by a batch outside this chunk (a different
      // chunk not yet processed, or any non-completed batch — completed
      // batches outside `ids` cannot exist since the SELECT above IS the
      // chunk) must survive this chunk's sweep.
      if (isFileReferencedByOtherBatch(fid, ids)) continue;
      try {
        // Key mode: only the key's OWN files. A batch may reference a file
        // another tenant (or nobody) owns; a bulk destructive sweep must not
        // reach it (SEC-C). Instance mode keeps the unconditional soft delete.
        const removed = allTenants ? deleteFile(fid) : deleteFileOwnedBy(fid, apiKeyId as string);
        if (removed) deletedFiles++;
      } catch (err) {
        log.warn("deleteCompletedBatches: file soft-delete failed", {
          fid,
          err: err instanceof Error ? err.message : String(err),
        });
      }
    }

    db.prepare(`DELETE FROM batch_item_checkpoints WHERE batch_id IN (${marks})`).run(...ids);
    const result = db.prepare(`DELETE FROM batches WHERE id IN (${marks})`).run(...ids);
    return { deletedBatches: result.changes, deletedFiles };
  });

  // The one chunk loop both modes share: select the next chunk of ids, sweep
  // it in its own committed transaction, sum. The only difference between the
  // modes is the SELECT that produces the next chunk. No outer transaction —
  // the write lock is released between chunks (LEDGER-4/20/21).
  const sweepLoop = (nextIds: () => string[]) => {
    const totals = { deletedBatches: 0, deletedFiles: 0, hasMore: false };
    let previousFirstId: string | null = null;
    let chunkCount = 0;
    for (;;) {
      const ids = nextIds();
      if (ids.length === 0) break;
      // Chunk cap (#13680): a single request commits at most
      // MAX_CHUNKS_PER_REQUEST chunks. This peek doesn't delete or count
      // anything — it only tells the caller whether more work remains so it
      // can call again (resumption is natural: already-swept rows are gone).
      if (chunkCount >= MAX_CHUNKS_PER_REQUEST) {
        totals.hasMore = true;
        break;
      }
      // Forward-progress guard (LEDGER-22): the chunk is re-selected from the
      // table after each commit, so a repeated first id means the previous
      // DELETE removed nothing and the loop would spin forever. A concurrent
      // deleter only makes rows vanish, which yields a different first id.
      if (ids[0] === previousFirstId) {
        throw new Error(`deleteCompletedBatches: no progress — chunk repeated (id ${ids[0]})`);
      }
      previousFirstId = ids[0];
      const part = sweepIds(ids);
      totals.deletedBatches += part.deletedBatches;
      totals.deletedFiles += part.deletedFiles;
      chunkCount++;
    }
    return totals;
  };

  const toIds = (rows: unknown[]) => (rows as Array<{ id: string }>).map((r) => r.id);

  if (!allTenants) {
    const keyChunk = db.prepare(
      "SELECT id FROM batches WHERE status = 'completed' AND api_key_id = ? ORDER BY rowid LIMIT ?"
    );
    return sweepLoop(() => toIds(keyChunk.all(apiKeyId, INSTANCE_SWEEP_CHUNK)));
  }

  const nextChunk = db.prepare(
    "SELECT id FROM batches WHERE status = 'completed' ORDER BY rowid LIMIT ?"
  );
  return sweepLoop(() => toIds(nextChunk.all(INSTANCE_SWEEP_CHUNK)));
}
