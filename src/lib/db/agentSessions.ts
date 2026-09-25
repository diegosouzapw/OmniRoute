/**
 * Agent sessions: one aggregate row per coding-agent session (see 190_agent_sessions.sql).
 * Written from inside saveRequestUsage's transaction, so a usage row and its session counters
 * always move together and dedup no-ops never double count.
 */

import { createHash, randomUUID } from "node:crypto";
import type { AgentContext } from "@omniroute/open-sse/handlers/chatCore/agentContext.ts";

import type { SqliteAdapter } from "./adapters/types";

/** Requests without a client session id join the key+project session seen this recently. */
export const AGENT_SESSION_IDLE_WINDOW_MS = 30 * 60 * 1000;

// A type alias (not an interface) so it stays assignable to the cost calculator's token record.
export type AgentSessionTokens = {
  input: number;
  output: number;
  cacheRead: number;
  cacheCreation: number;
  reasoning: number;
};

export interface AgentSessionUsage {
  context: AgentContext;
  apiKeyId: string | null;
  apiKeyName: string | null;
  timestamp: string;
  success: boolean;
  tokens: AgentSessionTokens;
  costUsd: number;
  /** false when the model has no pricing row and cost_usd could not include it. */
  priced: boolean;
  provider: string | null;
  model: string | null;
  connectionId: string | null;
}

function newSessionId(): string {
  return `as_${randomUUID().replace(/-/g, "").slice(0, 32)}`;
}

/** Scoped to the API key, so one key can never write into another key's session. */
function clientSessionRowId(apiKeyId: string | null, clientSessionId: string): string {
  const digest = createHash("sha256")
    .update(`${apiKeyId ?? ""}\x1f${clientSessionId}`)
    .digest("hex");
  return `as_${digest.slice(0, 32)}`;
}

function findIdleWindowSession(db: SqliteAdapter, usage: AgentSessionUsage): string | null {
  const cutoff = new Date(
    new Date(usage.timestamp).getTime() - AGENT_SESSION_IDLE_WINDOW_MS
  ).toISOString();
  const row = db
    .prepare(
      `SELECT id FROM agent_sessions
       WHERE api_key_id IS ? AND client_session_id IS NULL AND project_name = ?
         AND last_seen_at >= ?
       ORDER BY last_seen_at DESC LIMIT 1`
    )
    .get(usage.apiKeyId, usage.context.projectName, cutoff) as { id: string } | undefined;
  return row?.id ?? null;
}

function resolveSessionId(db: SqliteAdapter, usage: AgentSessionUsage): string {
  const { clientSessionId } = usage.context;
  if (clientSessionId) return clientSessionRowId(usage.apiKeyId, clientSessionId);
  return findIdleWindowSession(db, usage) ?? newSessionId();
}

const UPSERT_SQL = `
  INSERT INTO agent_sessions (
    id, api_key_id, api_key_name, client, client_session_id, project_name, project_repo,
    project_path, project_source, git_branch, first_seen_at, last_seen_at, request_count,
    error_count, tokens_input, tokens_output, tokens_cache_read, tokens_cache_creation,
    tokens_reasoning, cost_usd, unpriced_count, last_provider, last_model, last_connection_id
  ) VALUES (
    @id, @apiKeyId, @apiKeyName, @client, @clientSessionId, @projectName, @projectRepo,
    @projectPath, @projectSource, @gitBranch, @timestamp, @timestamp, 1,
    @errorCount, @tokensInput, @tokensOutput, @tokensCacheRead, @tokensCacheCreation,
    @tokensReasoning, @costUsd, @unpricedCount, @provider, @model, @connectionId
  )
  ON CONFLICT(id) DO UPDATE SET
    api_key_name = COALESCE(excluded.api_key_name, api_key_name),
    client = COALESCE(excluded.client, client),
    project_name = COALESCE(excluded.project_name, project_name),
    project_repo = COALESCE(excluded.project_repo, project_repo),
    project_path = COALESCE(excluded.project_path, project_path),
    project_source = COALESCE(excluded.project_source, project_source),
    git_branch = COALESCE(excluded.git_branch, git_branch),
    first_seen_at = MIN(first_seen_at, excluded.first_seen_at),
    last_seen_at = MAX(last_seen_at, excluded.last_seen_at),
    request_count = request_count + 1,
    error_count = error_count + excluded.error_count,
    tokens_input = tokens_input + excluded.tokens_input,
    tokens_output = tokens_output + excluded.tokens_output,
    tokens_cache_read = tokens_cache_read + excluded.tokens_cache_read,
    tokens_cache_creation = tokens_cache_creation + excluded.tokens_cache_creation,
    tokens_reasoning = tokens_reasoning + excluded.tokens_reasoning,
    cost_usd = cost_usd + excluded.cost_usd,
    unpriced_count = unpriced_count + excluded.unpriced_count,
    last_provider = COALESCE(excluded.last_provider, last_provider),
    last_model = COALESCE(excluded.last_model, last_model),
    last_connection_id = COALESCE(excluded.last_connection_id, last_connection_id)
`;

function hasTokens(tokens: AgentSessionTokens): boolean {
  return tokens.input + tokens.output + tokens.cacheRead + tokens.cacheCreation > 0;
}

/**
 * Adds one request to its agent session and returns the session id. Callers must only pass
 * contexts that carry a session id or a project (see hasAgentIdentity).
 */
export function recordAgentSessionUsage(db: SqliteAdapter, usage: AgentSessionUsage): string {
  const id = resolveSessionId(db, usage);
  const { context, tokens } = usage;
  db.prepare(UPSERT_SQL).run({
    id,
    apiKeyId: usage.apiKeyId,
    apiKeyName: usage.apiKeyName,
    client: context.client,
    clientSessionId: context.clientSessionId,
    projectName: context.projectName,
    projectRepo: context.projectRepo,
    projectPath: context.projectPath,
    projectSource: context.projectSource,
    gitBranch: context.gitBranch,
    timestamp: usage.timestamp,
    errorCount: usage.success ? 0 : 1,
    tokensInput: tokens.input,
    tokensOutput: tokens.output,
    tokensCacheRead: tokens.cacheRead,
    tokensCacheCreation: tokens.cacheCreation,
    tokensReasoning: tokens.reasoning,
    costUsd: usage.costUsd,
    unpricedCount: !usage.priced && hasTokens(tokens) ? 1 : 0,
    provider: usage.provider,
    model: usage.model,
    connectionId: usage.connectionId,
  });
  return id;
}

export interface AgentSessionRecord {
  id: string;
  apiKeyId: string | null;
  apiKeyName: string | null;
  client: string | null;
  clientSessionId: string | null;
  projectName: string | null;
  projectRepo: string | null;
  projectPath: string | null;
  projectSource: string | null;
  gitBranch: string | null;
  firstSeenAt: string;
  lastSeenAt: string;
  requestCount: number;
  errorCount: number;
  tokens: {
    input: number;
    output: number;
    cacheRead: number;
    cacheCreation: number;
    reasoning: number;
    total: number;
  };
  costUsd: number;
  unpricedCount: number;
  lastProvider: string | null;
  lastModel: string | null;
  lastConnectionId?: string | null;
}

export interface ListAgentSessionsFilter {
  apiKeyId?: string | null;
  projectName?: string | null;
  client?: string | null;
  /** Sessions with at least one request through this provider / connection. */
  provider?: string | null;
  connectionId?: string | null;
  from?: string | null;
  to?: string | null;
  sort?: "lastSeen" | "firstSeen" | "requests" | "tokens" | "cost";
  order?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

export interface AgentSessionRecentUsage {
  id: number;
  timestamp: string;
  provider: string | null;
  model: string | null;
  tokens: {
    input: number;
    output: number;
    cacheRead: number;
    cacheCreation: number;
    reasoning: number;
  };
  latencyMs: number;
  ttftMs: number;
  status: string | null;
  success: boolean;
  connectionId?: string | null;
}

function rowToAgentSessionRecord(row: Record<string, unknown>): AgentSessionRecord {
  const input = Number(row.tokens_input ?? 0);
  const output = Number(row.tokens_output ?? 0);
  const cacheRead = Number(row.tokens_cache_read ?? 0);
  const cacheCreation = Number(row.tokens_cache_creation ?? 0);
  const reasoning = Number(row.tokens_reasoning ?? 0);
  return {
    id: String(row.id),
    apiKeyId: typeof row.api_key_id === "string" ? row.api_key_id : null,
    apiKeyName: typeof row.api_key_name === "string" ? row.api_key_name : null,
    client: typeof row.client === "string" ? row.client : null,
    clientSessionId: typeof row.client_session_id === "string" ? row.client_session_id : null,
    projectName: typeof row.project_name === "string" ? row.project_name : null,
    projectRepo: typeof row.project_repo === "string" ? row.project_repo : null,
    projectPath: typeof row.project_path === "string" ? row.project_path : null,
    projectSource: typeof row.project_source === "string" ? row.project_source : null,
    gitBranch: typeof row.git_branch === "string" ? row.git_branch : null,
    firstSeenAt: String(row.first_seen_at),
    lastSeenAt: String(row.last_seen_at),
    requestCount: Number(row.request_count ?? 0),
    errorCount: Number(row.error_count ?? 0),
    tokens: {
      input,
      output,
      cacheRead,
      cacheCreation,
      reasoning,
      total: input + output + cacheRead + cacheCreation,
    },
    costUsd: Number(row.cost_usd ?? 0),
    unpricedCount: Number(row.unpriced_count ?? 0),
    lastProvider: typeof row.last_provider === "string" ? row.last_provider : null,
    lastModel: typeof row.last_model === "string" ? row.last_model : null,
    lastConnectionId: typeof row.last_connection_id === "string" ? row.last_connection_id : null,
  };
}

const SORT_COLUMNS: Record<string, string> = {
  lastSeen: "last_seen_at",
  firstSeen: "first_seen_at",
  requests: "request_count",
  tokens: "(tokens_input + tokens_output + tokens_cache_read + tokens_cache_creation)",
  cost: "cost_usd",
};

export function listAgentSessions(
  db: SqliteAdapter,
  filter: ListAgentSessionsFilter = {}
): { sessions: AgentSessionRecord[]; total: number } {
  const conditions: string[] = [];
  const params: unknown[] = [];

  if (filter.apiKeyId !== undefined) {
    if (filter.apiKeyId === null) {
      conditions.push("api_key_id IS NULL");
    } else {
      conditions.push("api_key_id = ?");
      params.push(filter.apiKeyId);
    }
  }

  if (filter.projectName) {
    conditions.push("project_name = ?");
    params.push(filter.projectName);
  }

  if (filter.client) {
    conditions.push("client = ?");
    params.push(filter.client);
  }

  const requestFilters: Array<[string, string | null | undefined]> = [
    ["provider", filter.provider],
    ["connection_id", filter.connectionId],
  ];
  for (const [column, value] of requestFilters) {
    if (!value) continue;
    conditions.push(
      `EXISTS (SELECT 1 FROM usage_history uh
               WHERE uh.agent_session_id = agent_sessions.id AND uh.${column} = ?)`
    );
    params.push(value);
  }

  if (filter.from) {
    conditions.push("last_seen_at >= ?");
    params.push(filter.from);
  }

  if (filter.to) {
    conditions.push("last_seen_at <= ?");
    params.push(filter.to);
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const sortCol = SORT_COLUMNS[filter.sort || "lastSeen"] || "last_seen_at";
  const sortOrder = filter.order?.toLowerCase() === "asc" ? "ASC" : "DESC";

  const limit = Math.max(1, Math.min(Number(filter.limit) || 20, 100));
  const offset = Math.max(0, Number(filter.offset) || 0);

  const countRow = db
    .prepare(`SELECT COUNT(*) as count FROM agent_sessions ${whereClause}`)
    .get(...params) as { count: number } | undefined;
  const total = Number(countRow?.count ?? 0);

  const rows = db
    .prepare(
      `SELECT * FROM agent_sessions
       ${whereClause}
       ORDER BY ${sortCol} ${sortOrder}, id DESC
       LIMIT ? OFFSET ?`
    )
    .all(...params, limit, offset) as Record<string, unknown>[];

  return {
    sessions: rows.map(rowToAgentSessionRecord),
    total,
  };
}

export function getAgentSessionById(
  db: SqliteAdapter,
  id: string,
  apiKeyId?: string
): AgentSessionRecord | null {
  const query = apiKeyId
    ? "SELECT * FROM agent_sessions WHERE id = ? AND api_key_id = ?"
    : "SELECT * FROM agent_sessions WHERE id = ?";
  const params = apiKeyId ? [id, apiKeyId] : [id];
  const row = db.prepare(query).get(...params) as Record<string, unknown> | undefined;
  return row ? rowToAgentSessionRecord(row) : null;
}

export function getAgentSessionRecentUsage(
  db: SqliteAdapter,
  sessionId: string,
  limit = 50
): AgentSessionRecentUsage[] {
  const boundedLimit = Math.max(1, Math.min(limit, 100));
  const rows = db
    .prepare(
      `SELECT id, timestamp, provider, model, tokens_input, tokens_output,
              tokens_cache_read, tokens_cache_creation, tokens_reasoning,
              latency_ms, ttft_ms, status, success, connection_id
       FROM usage_history
       WHERE agent_session_id = ?
       ORDER BY timestamp DESC, id DESC
       LIMIT ?`
    )
    .all(sessionId, boundedLimit) as Record<string, unknown>[];

  return rows.map((row) => ({
    id: Number(row.id),
    timestamp: String(row.timestamp),
    provider: typeof row.provider === "string" ? row.provider : null,
    model: typeof row.model === "string" ? row.model : null,
    tokens: {
      input: Number(row.tokens_input ?? 0),
      output: Number(row.tokens_output ?? 0),
      cacheRead: Number(row.tokens_cache_read ?? 0),
      cacheCreation: Number(row.tokens_cache_creation ?? 0),
      reasoning: Number(row.tokens_reasoning ?? 0),
    },
    latencyMs: Number(row.latency_ms ?? 0),
    ttftMs: Number(row.ttft_ms ?? 0),
    status: typeof row.status === "string" ? row.status : null,
    success: row.success === 1 || row.success === true,
    connectionId: typeof row.connection_id === "string" ? row.connection_id : null,
  }));
}
