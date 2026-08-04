/**
 * db/agenticConversations.ts — CRUD for the agentic conversation-tracking table.
 *
 * See open-sse/services/conversationTracker.ts for how `fingerprint_hash` and
 * `last_messages_hash` are computed and used to detect that a new request is a
 * continuation of a previous one.
 */

import { v4 as uuidv4 } from "uuid";
import { getDbInstance } from "./core";

export interface AgenticConversationRow {
  id: string;
  apiKeyId: string | null;
  fingerprintHash: string;
  lastMessageCount: number;
  lastMessagesHash: string;
  turnCount: number;
  firstSeenAt: string;
  lastSeenAt: string;
}

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

function toRow(value: unknown): AgenticConversationRow {
  const r = asRecord(value);
  return {
    id: String(r.id ?? ""),
    apiKeyId: typeof r.api_key_id === "string" ? r.api_key_id : null,
    fingerprintHash: String(r.fingerprint_hash ?? ""),
    lastMessageCount: Number(r.last_message_count ?? 0),
    lastMessagesHash: String(r.last_messages_hash ?? ""),
    turnCount: Number(r.turn_count ?? 1),
    firstSeenAt: String(r.first_seen_at ?? ""),
    lastSeenAt: String(r.last_seen_at ?? ""),
  };
}

export function createAgenticConversation(input: {
  id?: string;
  apiKeyId: string | null;
  fingerprintHash: string;
  lastMessageCount: number;
  lastMessagesHash: string;
}): AgenticConversationRow {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const id = input.id || `conv_${uuidv4()}`;

  db.prepare(
    `INSERT INTO agentic_conversations
       (id, api_key_id, fingerprint_hash, last_message_count, last_messages_hash, turn_count, first_seen_at, last_seen_at)
     VALUES (?, ?, ?, ?, ?, 1, ?, ?)`
  ).run(
    id,
    input.apiKeyId,
    input.fingerprintHash,
    input.lastMessageCount,
    input.lastMessagesHash,
    now,
    now
  );

  return {
    id,
    apiKeyId: input.apiKeyId,
    fingerprintHash: input.fingerprintHash,
    lastMessageCount: input.lastMessageCount,
    lastMessagesHash: input.lastMessagesHash,
    turnCount: 1,
    firstSeenAt: now,
    lastSeenAt: now,
  };
}

export function findAgenticConversationsByFingerprint(
  fingerprintHash: string
): AgenticConversationRow[] {
  const db = getDbInstance();
  const rows = db
    .prepare(
      `SELECT * FROM agentic_conversations WHERE fingerprint_hash = ? ORDER BY last_seen_at DESC LIMIT 20`
    )
    .all(fingerprintHash);
  return rows.map(toRow);
}

export function updateAgenticConversation(
  id: string,
  patch: { lastMessageCount: number; lastMessagesHash: string; turnCount: number }
): void {
  const db = getDbInstance();
  db.prepare(
    `UPDATE agentic_conversations
       SET last_message_count = ?, last_messages_hash = ?, turn_count = ?, last_seen_at = ?
     WHERE id = ?`
  ).run(patch.lastMessageCount, patch.lastMessagesHash, patch.turnCount, new Date().toISOString(), id);
}

/**
 * Upsert for the client-supplied `x-omniroute-session-id` path: the header
 * value is used directly as the conversation id, so this only needs to keep
 * `turn_count`/`last_seen_at` moving — the fingerprint/prefix-hash fields are
 * unused for header-pinned conversations (continuation is guaranteed by the
 * client, not detected heuristically).
 */
export function touchOrCreateExternalConversation(
  id: string,
  ctx: { apiKeyId: string | null }
): void {
  const db = getDbInstance();
  const now = new Date().toISOString();
  const existing = db.prepare(`SELECT id FROM agentic_conversations WHERE id = ?`).get(id);

  if (existing) {
    db.prepare(
      `UPDATE agentic_conversations SET turn_count = turn_count + 1, last_seen_at = ? WHERE id = ?`
    ).run(now, id);
    return;
  }

  db.prepare(
    `INSERT INTO agentic_conversations
       (id, api_key_id, fingerprint_hash, last_message_count, last_messages_hash, turn_count, first_seen_at, last_seen_at)
     VALUES (?, ?, '', 0, '', 1, ?, ?)`
  ).run(id, ctx.apiKeyId, now, now);
}

/**
 * Exact-match lookup of the most recent call_logs row tagged with this
 * conversation id — used to build the "Full Conversation" transcript panel.
 * Deliberately NOT `pushLikeFilter`-based (that's substring/LIKE matching,
 * wrong for an exact id join).
 */
export function getLatestCallLogForConversation(conversationId: string): JsonRecord | null {
  const db = getDbInstance();
  const row = db
    .prepare(`SELECT * FROM call_logs WHERE session_tag = ? ORDER BY timestamp DESC LIMIT 1`)
    .get(conversationId);
  return row ? asRecord(row) : null;
}

export interface CallLogRef {
  id: string;
  timestamp: string;
}

/**
 * Every call_logs row for a conversation, ascending by timestamp — the sibling
 * of getLatestCallLogForConversation (DESC/LIMIT 1) used by the multi-row
 * transcript builder (src/mitm/inspector/multiRowConversation.ts). Only
 * id/timestamp are needed here; full bodies are loaded per-row via the
 * existing getCallLogById (src/lib/usage/callLogs.ts), matching the
 * established exportCallLogsSince loop pattern rather than a bespoke bulk
 * loader.
 */
export function getAllCallLogsForConversation(conversationId: string): CallLogRef[] {
  const db = getDbInstance();
  const rows = db
    .prepare(`SELECT id, timestamp FROM call_logs WHERE session_tag = ? ORDER BY timestamp ASC`)
    .all(conversationId);
  return rows.map((r) => {
    const rec = asRecord(r);
    return { id: String(rec.id ?? ""), timestamp: String(rec.timestamp ?? "") };
  });
}

export interface MultiTurnConversationRow extends AgenticConversationRow {
  lastCallLogId: string | null;
  lastModel: string | null;
  lastProvider: string | null;
  lastStatus: number | null;
}

/**
 * Conversations with turn_count >= 2 — filters out one-shot, non-agentic
 * traffic for the /dashboard/conversations list page. Joined to each
 * conversation's most recent call_logs row (by MAX(timestamp) per
 * session_tag) in a single query rather than one lookup per row, since this
 * is a list view that can have many conversations.
 */
export function listMultiTurnConversations(filter: {
  limit?: number;
  offset?: number;
} = {}): { rows: MultiTurnConversationRow[]; total: number } {
  const db = getDbInstance();
  const limit = Math.max(1, Math.min(filter.limit ?? 50, 200));
  const offset = Math.max(0, filter.offset ?? 0);

  const total = asRecord(
    db.prepare(`SELECT COUNT(*) as c FROM agentic_conversations WHERE turn_count >= 2`).get()
  ).c as number;

  const rows = db
    .prepare(
      `SELECT ac.*, latest.id as last_call_log_id, latest.model as last_model,
              latest.provider as last_provider, latest.status as last_status
       FROM agentic_conversations ac
       LEFT JOIN (
         SELECT cl1.id, cl1.session_tag, cl1.model, cl1.provider, cl1.status
         FROM call_logs cl1
         WHERE cl1.timestamp = (
           SELECT MAX(cl2.timestamp) FROM call_logs cl2 WHERE cl2.session_tag = cl1.session_tag
         )
       ) latest ON latest.session_tag = ac.id
       WHERE ac.turn_count >= 2
       ORDER BY ac.last_seen_at DESC
       LIMIT ? OFFSET ?`
    )
    .all(limit, offset);

  return {
    total: Number(total ?? 0),
    rows: rows.map((r) => {
      const rec = asRecord(r);
      return {
        ...toRow(rec),
        lastCallLogId: typeof rec.last_call_log_id === "string" ? rec.last_call_log_id : null,
        lastModel: typeof rec.last_model === "string" ? rec.last_model : null,
        lastProvider: typeof rec.last_provider === "string" ? rec.last_provider : null,
        lastStatus: typeof rec.last_status === "number" ? rec.last_status : null,
      };
    }),
  };
}
