import type { SqliteAdapter } from "./adapters/types";

/** Recover writes that can no longer block a body-export cursor. */
export function expirePendingCallLogDetails(db: SqliteAdapter, now: number = Date.now()): void {
  db.prepare(
    `UPDATE call_logs
        SET detail_state = 'missing', detail_pending_until = NULL
      WHERE detail_state = 'pending'
        AND (detail_pending_until IS NULL OR detail_pending_until <= ?)`
  ).run(now);
}

/** Only a still-pending write may publish its artifact after expiry recovery. */
export function publishPendingCallLogDetail(
  db: SqliteAdapter,
  id: string,
  artifact: { relPath: string; sizeBytes: number; sha256: string }
): boolean {
  const result = db
    .prepare(
      `UPDATE call_logs
        SET detail_state = 'ready', detail_pending_until = NULL,
            artifact_relpath = ?, artifact_size_bytes = ?, artifact_sha256 = ?
      WHERE id = ? AND detail_state = 'pending'
        AND detail_pending_until > ?`
    )
    .run(artifact.relPath, artifact.sizeBytes, artifact.sha256, id, Date.now());
  return result.changes === 1;
}

export function failPendingCallLogDetail(db: SqliteAdapter, id: string): void {
  db.prepare(
    `UPDATE call_logs SET detail_state = 'missing', detail_pending_until = NULL
      WHERE id = ? AND detail_state = 'pending'`
  ).run(id);
}
