/**
 * Database access module for agent_session_messages (simplified conversation turns).
 * Stores user text, assistant text, and called tools per request turn.
 */

import type { SqliteAdapter } from "./adapters/types";

export interface AgentSessionMessageRecord {
  id: number;
  sessionId: string;
  apiKeyId: string | null;
  timestamp: string;
  provider: string | null;
  model: string | null;
  success: boolean;
  user: string | null;
  assistant: string | null;
  tools: string[];
  truncated: boolean;
}

export interface SaveAgentSessionMessageInput {
  sessionId: string;
  apiKeyId?: string | null;
  timestamp: string;
  provider?: string | null;
  model?: string | null;
  success?: boolean;
  userText?: string | null;
  assistantText?: string | null;
  toolNames?: string[] | null;
  truncated?: boolean;
  /** Shared by every attempt of one client request; a later attempt replaces the earlier turn. */
  requestKey?: string | null;
  /** Order of the attempt within its request; a save from an older attempt is ignored. */
  attemptSeq?: number | null;
}

export interface ListAgentSessionMessagesOptions {
  limit?: number;
  cursor?: number | null;
  order?: "asc" | "desc";
}

function rowToMessage(row: Record<string, unknown>): AgentSessionMessageRecord {
  let tools: string[] = [];
  if (typeof row.tool_names === "string" && row.tool_names.trim()) {
    try {
      const parsed = JSON.parse(row.tool_names);
      if (Array.isArray(parsed)) tools = parsed.filter((t): t is string => typeof t === "string");
    } catch {
      tools = [];
    }
  }

  return {
    id: Number(row.id),
    sessionId: String(row.session_id),
    apiKeyId: typeof row.api_key_id === "string" ? row.api_key_id : null,
    timestamp: String(row.timestamp),
    provider: typeof row.provider === "string" ? row.provider : null,
    model: typeof row.model === "string" ? row.model : null,
    success: row.success === 1 || row.success === true,
    user: typeof row.user_text === "string" ? row.user_text : null,
    assistant: typeof row.assistant_text === "string" ? row.assistant_text : null,
    tools,
    truncated: row.truncated === 1 || row.truncated === true,
  };
}

/**
 * How long the per-request turn state is kept after its last use. Combo fallback runs one
 * attempt per target for the same client request and only the latest attempt (the reply the
 * client received) is kept; long streamed attempts can take minutes, hence the margin.
 */
export const AGENT_SESSION_TURN_STATE_TTL_MS = 15 * 60_000;
const MAX_TRACKED_REQUESTS = 10_000;

interface RequestTurnState {
  rowId: number | null;
  latestSeq: number;
  discarded: boolean;
  touchedAt: number;
}

/** Insertion order is last-use order: every write re-inserts the key at the end. */
const turnStateByRequestKey = new Map<string, RequestTurnState>();

function readTurnState(requestKey: string, now: number): RequestTurnState | undefined {
  for (const [key, state] of turnStateByRequestKey) {
    const expired = now - state.touchedAt > AGENT_SESSION_TURN_STATE_TTL_MS;
    if (!expired && turnStateByRequestKey.size <= MAX_TRACKED_REQUESTS) break;
    turnStateByRequestKey.delete(key);
  }
  return turnStateByRequestKey.get(requestKey);
}

function writeTurnState(requestKey: string, state: Omit<RequestTurnState, "touchedAt">): void {
  turnStateByRequestKey.delete(requestKey);
  turnStateByRequestKey.set(requestKey, { ...state, touchedAt: Date.now() });
}

export function saveAgentSessionMessage(
  db: SqliteAdapter,
  input: SaveAgentSessionMessageInput
): number {
  const toolsJson =
    input.toolNames && input.toolNames.length > 0
      ? JSON.stringify(input.toolNames.slice(0, 20))
      : null;
  const values = [
    input.apiKeyId || null,
    input.timestamp,
    input.provider || null,
    input.model || null,
    input.success !== false ? 1 : 0,
    input.userText || null,
    input.assistantText || null,
    toolsJson,
    input.truncated ? 1 : 0,
  ];
  const requestKey = input.requestKey || null;
  const attemptSeq = input.attemptSeq ?? 0;
  const state = requestKey ? readTurnState(requestKey, Date.now()) : undefined;
  if (
    state &&
    (attemptSeq < state.latestSeq || (attemptSeq === state.latestSeq && state.discarded))
  ) {
    return state.rowId ?? 0; // an older or dropped attempt finished saving late
  }

  if (requestKey && state?.rowId != null) {
    const updated = db
      .prepare(
        `UPDATE agent_session_messages SET
          api_key_id = ?, timestamp = ?, provider = ?, model = ?, success = ?,
          user_text = ?, assistant_text = ?, tool_names = ?, truncated = ?
        WHERE id = ? AND session_id = ?`
      )
      .run(...values, state.rowId, input.sessionId);
    if (Number(updated.changes) > 0) {
      writeTurnState(requestKey, { rowId: state.rowId, latestSeq: attemptSeq, discarded: false });
      return state.rowId;
    }
  }

  const result = db
    .prepare(
      `INSERT INTO agent_session_messages (
        session_id, api_key_id, timestamp, provider, model, success,
        user_text, assistant_text, tool_names, truncated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(input.sessionId, ...values);

  const rowId = Number(result.lastInsertRowid);
  if (requestKey) writeTurnState(requestKey, { rowId, latestSeq: attemptSeq, discarded: false });
  return rowId;
}

/**
 * Drops the turn of an attempt whose reply the client never got. Removes the request's stored
 * row, and a save of that attempt (or an older one) that lands later is ignored.
 */
export function discardAgentSessionMessageAttempt(
  db: SqliteAdapter,
  requestKey: string,
  attemptSeq: number
): void {
  const state = readTurnState(requestKey, Date.now());
  if (state && attemptSeq < state.latestSeq) return; // a newer attempt owns the turn
  if (state?.rowId != null) {
    db.prepare("DELETE FROM agent_session_messages WHERE id = ?").run(state.rowId);
  }
  writeTurnState(requestKey, { rowId: null, latestSeq: attemptSeq, discarded: true });
}

export function listAgentSessionMessages(
  db: SqliteAdapter,
  sessionId: string,
  options: ListAgentSessionMessagesOptions = {}
): { messages: AgentSessionMessageRecord[]; nextCursor: number | null } {
  const limit = Math.max(1, Math.min(Number(options.limit) || 50, 100));
  const order = options.order?.toLowerCase() === "desc" ? "DESC" : "ASC";
  const cursor = options.cursor ? Number(options.cursor) : null;

  const conditions = ["session_id = ?"];
  const params: unknown[] = [sessionId];

  if (cursor !== null && Number.isFinite(cursor)) {
    if (order === "ASC") {
      conditions.push("id > ?");
    } else {
      conditions.push("id < ?");
    }
    params.push(cursor);
  }

  // Fetch limit + 1 to check if there is a next page
  const rows = db
    .prepare(
      `SELECT id, session_id, api_key_id, timestamp, provider, model, success,
              user_text, assistant_text, tool_names, truncated
       FROM agent_session_messages
       WHERE ${conditions.join(" AND ")}
       ORDER BY id ${order}
       LIMIT ?`
    )
    .all(...params, limit + 1) as Record<string, unknown>[];

  const hasMore = rows.length > limit;
  const resultRows = hasMore ? rows.slice(0, limit) : rows;
  const messages = resultRows.map(rowToMessage);
  const nextCursor = hasMore && messages.length > 0 ? messages[messages.length - 1].id : null;

  return { messages, nextCursor };
}

export function deleteAgentSessionMessagesBefore(db: SqliteAdapter, beforeIso: string): number {
  const result = db
    .prepare("DELETE FROM agent_session_messages WHERE timestamp < ?")
    .run(beforeIso);
  return Number(result.changes);
}
