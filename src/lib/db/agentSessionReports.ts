/**
 * Team report source rows: attributed usage_history requests, sliced per session, provider,
 * model, account, service tier and day. Reading requests (not the session aggregates) keeps the
 * time window exact and lets provider/account filters see every request a session made.
 */

import { cacheInclusiveInputSql, type AgentSessionTokens } from "./agentSessions";
import type { SqliteAdapter } from "./adapters/types";

export interface AgentSessionReportFilter {
  /** ISO timestamps (UTC, `toISOString()` form) bounding each request. */
  from?: string;
  to?: string;
  apiKeyId?: string;
  projectName?: string;
  client?: string;
  provider?: string;
  connectionId?: string;
}

export interface AgentSessionUsageSlice {
  sessionId: string;
  apiKeyId: string | null;
  apiKeyName: string | null;
  projectName: string | null;
  projectRepo: string | null;
  client: string | null;
  provider: string | null;
  model: string | null;
  connectionId: string | null;
  accountLabel: string | null;
  serviceTier: string;
  day: string;
  lastSeenAt: string;
  requests: number;
  /** Requests that consumed tokens; only these can be unpriced (same rule as agent_sessions). */
  requestsWithTokens: number;
  errors: number;
  tokens: AgentSessionTokens;
}

const FILTER_CONDITIONS: ReadonlyArray<[keyof AgentSessionReportFilter, string]> = [
  ["from", "uh.timestamp >= ?"],
  ["to", "uh.timestamp <= ?"],
  ["apiKeyId", "s.api_key_id = ?"],
  ["projectName", "s.project_name = ?"],
  ["client", "s.client = ?"],
  ["provider", "uh.provider = ?"],
  ["connectionId", "uh.connection_id = ?"],
];

function nullableString(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

export function listAgentSessionUsageSlices(
  db: SqliteAdapter,
  filter: AgentSessionReportFilter = {}
): AgentSessionUsageSlice[] {
  const conditions = ["uh.agent_session_id IS NOT NULL"];
  const params: string[] = [];
  for (const [field, condition] of FILTER_CONDITIONS) {
    const value = filter[field];
    if (!value) continue;
    conditions.push(condition);
    params.push(value);
  }

  // Session columns are functionally dependent on agent_session_id, so SQLite's bare-column
  // grouping returns the one session value.
  const rows = db
    .prepare(
      `SELECT uh.agent_session_id AS session_id, s.api_key_id, s.api_key_name,
              s.project_name, s.project_repo, s.client, uh.provider, uh.model, uh.connection_id,
              MAX(uh.account_label) AS account_label,
              COALESCE(NULLIF(uh.service_tier, ''), 'standard') AS service_tier,
              substr(uh.timestamp, 1, 10) AS day,
              MAX(uh.timestamp) AS last_seen_at,
              COUNT(*) AS requests,
              SUM(CASE WHEN COALESCE(uh.tokens_input, 0) + COALESCE(uh.tokens_output, 0)
                            + COALESCE(uh.tokens_cache_read, 0)
                            + COALESCE(uh.tokens_cache_creation, 0) > 0
                       THEN 1 ELSE 0 END) AS requests_with_tokens,
              SUM(CASE WHEN uh.success = 0 THEN 1 ELSE 0 END) AS errors,
              -- Per request: a row stored without its cached part gets it back before summing.
              COALESCE(SUM(${cacheInclusiveInputSql("uh.")}), 0) AS tokens_input,
              COALESCE(SUM(uh.tokens_output), 0) AS tokens_output,
              COALESCE(SUM(uh.tokens_cache_read), 0) AS tokens_cache_read,
              COALESCE(SUM(uh.tokens_cache_creation), 0) AS tokens_cache_creation,
              COALESCE(SUM(uh.tokens_reasoning), 0) AS tokens_reasoning
       FROM usage_history uh
       JOIN agent_sessions s ON s.id = uh.agent_session_id
       WHERE ${conditions.join(" AND ")}
       GROUP BY uh.agent_session_id, uh.provider, uh.model, uh.connection_id, service_tier, day`
    )
    .all(...params) as Record<string, unknown>[];

  return rows.map((row) => ({
    sessionId: String(row.session_id),
    apiKeyId: nullableString(row.api_key_id),
    apiKeyName: nullableString(row.api_key_name),
    projectName: nullableString(row.project_name),
    projectRepo: nullableString(row.project_repo),
    client: nullableString(row.client),
    provider: nullableString(row.provider),
    model: nullableString(row.model),
    connectionId: nullableString(row.connection_id),
    accountLabel: nullableString(row.account_label),
    serviceTier: String(row.service_tier),
    day: String(row.day),
    lastSeenAt: String(row.last_seen_at),
    requests: Number(row.requests ?? 0),
    requestsWithTokens: Number(row.requests_with_tokens ?? 0),
    errors: Number(row.errors ?? 0),
    tokens: {
      input: Number(row.tokens_input ?? 0),
      output: Number(row.tokens_output ?? 0),
      cacheRead: Number(row.tokens_cache_read ?? 0),
      cacheCreation: Number(row.tokens_cache_creation ?? 0),
      reasoning: Number(row.tokens_reasoning ?? 0),
    },
  }));
}
