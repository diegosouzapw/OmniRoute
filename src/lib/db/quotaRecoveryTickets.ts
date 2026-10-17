/** Durable, opt-in recovery state for unanswered quota-failed requests. */
import { createHash, randomUUID } from "node:crypto";
import { getDbInstance } from "./core";
import { decrypt, encrypt, isEncryptionEnabled, looksEncrypted } from "./encryption";

export type QuotaRecoveryState =
  "pending" | "running" | "completed" | "failed" | "needs_confirmation" | "cancelled" | "expired";

export interface QuotaRecoveryTicket {
  id: string;
  apiKeyId: string;
  turnKey: string;
  endpoint: "chat/completions" | "responses";
  state: QuotaRecoveryState;
  attemptCount: number;
  nextAttemptAt: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

type TicketRow = {
  id: string;
  api_key_id: string;
  turn_key: string;
  request_hash: string;
  endpoint: QuotaRecoveryTicket["endpoint"];
  state: QuotaRecoveryState;
  attempt_count: number;
  next_attempt_at: string;
  expires_at: string;
  created_at: string;
  updated_at: string;
  request_ciphertext: string;
  result_ciphertext: string | null;
};

function toTicket(row: TicketRow): QuotaRecoveryTicket {
  return {
    id: row.id,
    apiKeyId: row.api_key_id,
    turnKey: row.turn_key,
    endpoint: row.endpoint,
    state: row.state,
    attemptCount: row.attempt_count,
    nextAttemptAt: row.next_attempt_at,
    expiresAt: row.expires_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function encryptRequired(payload: string): string {
  if (!isEncryptionEnabled()) {
    throw new Error("Quota recovery requires STORAGE_ENCRYPTION_KEY");
  }
  const ciphertext = encrypt(payload);
  if (!looksEncrypted(ciphertext)) {
    throw new Error("Quota recovery payload encryption failed");
  }
  return ciphertext as string;
}

function getRow(id: string): TicketRow | undefined {
  return getDbInstance().prepare("SELECT * FROM quota_recovery_tickets WHERE id = ?").get(id) as
    TicketRow | undefined;
}

export function enqueueQuotaRecoveryTicket(input: {
  apiKeyId: string;
  turnKey: string;
  endpoint: QuotaRecoveryTicket["endpoint"];
  requestPayload: string;
  nextAttemptAt: string;
  expiresAt: string;
}): QuotaRecoveryTicket {
  const ciphertext = encryptRequired(input.requestPayload);
  const db = getDbInstance();
  const now = new Date().toISOString();
  const id = randomUUID();
  const requestHash = createHash("sha256")
    .update(input.endpoint)
    .update("\0")
    .update(input.requestPayload)
    .digest("hex");
  db.prepare(
    `INSERT OR IGNORE INTO quota_recovery_tickets
      (id, api_key_id, turn_key, request_hash, endpoint, request_ciphertext, next_attempt_at,
       expires_at, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    id,
    input.apiKeyId,
    input.turnKey,
    requestHash,
    input.endpoint,
    ciphertext,
    input.nextAttemptAt,
    input.expiresAt,
    now,
    now
  );
  const row = db
    .prepare("SELECT * FROM quota_recovery_tickets WHERE api_key_id = ? AND turn_key = ?")
    .get(input.apiKeyId, input.turnKey) as TicketRow;
  if (row.request_hash !== requestHash) {
    throw new Error("Recovery turn identity was reused with a different request");
  }
  return toTicket(row);
}

export function getQuotaRecoveryTicket(id: string, apiKeyId: string): QuotaRecoveryTicket | null {
  const row = getRow(id);
  return row?.api_key_id === apiKeyId ? toTicket(row) : null;
}

/** Claim before dispatch. A crash while running is ambiguous and must not auto-replay. */
export function claimQuotaRecoveryTicket(id: string, now = new Date()): QuotaRecoveryTicket | null {
  const db = getDbInstance();
  const iso = now.toISOString();
  const updated = db
    .prepare(
      `UPDATE quota_recovery_tickets
       SET state = 'running', attempt_count = attempt_count + 1, updated_at = ?
       WHERE id = ? AND state = 'pending' AND next_attempt_at <= ? AND expires_at > ?`
    )
    .run(iso, id, iso, iso);
  return updated.changes === 1 ? toTicket(getRow(id)!) : null;
}

export function listDueQuotaRecoveryTickets(now = new Date(), limit = 25): QuotaRecoveryTicket[] {
  const iso = now.toISOString();
  const rows = getDbInstance()
    .prepare(
      `SELECT * FROM quota_recovery_tickets
       WHERE state = 'pending' AND next_attempt_at <= ? AND expires_at > ?
       ORDER BY next_attempt_at, created_at LIMIT ?`
    )
    .all(iso, iso, Math.max(1, Math.min(limit, 100))) as TicketRow[];
  return rows.map(toTicket);
}

export function readQuotaRecoveryRequest(id: string): string | null {
  const row = getRow(id);
  if (row?.state !== "running" || !looksEncrypted(row.request_ciphertext)) return null;
  return decrypt(row.request_ciphertext) ?? null;
}

export function completeQuotaRecoveryTicket(id: string, resultPayload: string): boolean {
  const ciphertext = encryptRequired(resultPayload);
  const changed = getDbInstance()
    .prepare(
      `UPDATE quota_recovery_tickets
       SET state = 'completed', result_ciphertext = ?, request_ciphertext = '', updated_at = ?
       WHERE id = ? AND state = 'running'`
    )
    .run(ciphertext, new Date().toISOString(), id);
  return changed.changes === 1;
}

export function readQuotaRecoveryResult(id: string, apiKeyId: string): string | null {
  const row = getRow(id);
  if (row?.api_key_id !== apiKeyId || row.state !== "completed" || !row.result_ciphertext) {
    return null;
  }
  if (!looksEncrypted(row.result_ciphertext)) return null;
  return decrypt(row.result_ciphertext) ?? null;
}

export function rescheduleQuotaRecoveryTicket(id: string, nextAttemptAt: string): boolean {
  const changed = getDbInstance()
    .prepare(
      `UPDATE quota_recovery_tickets SET state = 'pending', next_attempt_at = ?, updated_at = ?
       WHERE id = ? AND state = 'running'`
    )
    .run(nextAttemptAt, new Date().toISOString(), id);
  return changed.changes === 1;
}

export function failQuotaRecoveryTicket(id: string): boolean {
  const changed = getDbInstance()
    .prepare(
      `UPDATE quota_recovery_tickets
       SET state = 'failed', request_ciphertext = '', updated_at = ?
       WHERE id = ? AND state = 'running'`
    )
    .run(new Date().toISOString(), id);
  return changed.changes === 1;
}

export function markQuotaRecoveryNeedsConfirmation(id: string): boolean {
  const changed = getDbInstance()
    .prepare(
      `UPDATE quota_recovery_tickets
       SET state = 'needs_confirmation', updated_at = ?
       WHERE id = ? AND state = 'running'`
    )
    .run(new Date().toISOString(), id);
  return changed.changes === 1;
}

/** A dispatch may have reached upstream before a process died. Require a client decision. */
export function reconcileInterruptedQuotaRecoveries(): number {
  const changed = getDbInstance()
    .prepare(
      `UPDATE quota_recovery_tickets SET state = 'needs_confirmation', updated_at = ?
       WHERE state = 'running'`
    )
    .run(new Date().toISOString());
  return changed.changes;
}

/** A long-dead dispatch is ambiguous; do not replay it after a restart. */
export function reconcileStaleRunningQuotaRecoveries(
  now = new Date(),
  staleMs = 30 * 60_000
): number {
  const changed = getDbInstance()
    .prepare(
      `UPDATE quota_recovery_tickets SET state = 'needs_confirmation', updated_at = ?
       WHERE state = 'running' AND updated_at < ?`
    )
    .run(now.toISOString(), new Date(now.getTime() - staleMs).toISOString());
  return changed.changes;
}

export function cancelQuotaRecoveryTicket(id: string, apiKeyId: string): boolean {
  const changed = getDbInstance()
    .prepare(
      `UPDATE quota_recovery_tickets
       SET state = 'cancelled', request_ciphertext = '', result_ciphertext = NULL, updated_at = ?
       WHERE id = ? AND api_key_id = ? AND state IN ('pending', 'needs_confirmation')`
    )
    .run(new Date().toISOString(), id, apiKeyId);
  return changed.changes === 1;
}

export function expireQuotaRecoveryTickets(now = new Date()): number {
  const iso = now.toISOString();
  const changed = getDbInstance()
    .prepare(
      `UPDATE quota_recovery_tickets
       SET state = 'expired', request_ciphertext = '', result_ciphertext = NULL, updated_at = ?
       WHERE expires_at <= ? AND state IN ('pending', 'completed', 'failed', 'needs_confirmation')`
    )
    .run(iso, iso);
  return changed.changes;
}
