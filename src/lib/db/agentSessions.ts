/**
 * Agent sessions: one aggregate row per coding-agent session (see 197_agent_sessions.sql).
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
