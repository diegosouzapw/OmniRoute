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

export function saveAgentSessionMessage(
  db: SqliteAdapter,
  input: SaveAgentSessionMessageInput
): number {
  const toolsJson =
    input.toolNames && input.toolNames.length > 0
      ? JSON.stringify(input.toolNames.slice(0, 20))
      : null;

  const result = db
    .prepare(
      `INSERT INTO agent_session_messages (
        session_id, api_key_id, timestamp, provider, model, success,
        user_text, assistant_text, tool_names, truncated
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      input.sessionId,
      input.apiKeyId || null,
      input.timestamp,
      input.provider || null,
      input.model || null,
      input.success !== false ? 1 : 0,
      input.userText || null,
      input.assistantText || null,
      toolsJson,
      input.truncated ? 1 : 0
    );

  return Number(result.lastInsertRowid);
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
