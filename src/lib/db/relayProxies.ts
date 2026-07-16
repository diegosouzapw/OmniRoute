/**
 * Relay Proxy DB module
 *
 * Manages relay tokens, rate limits, and usage tracking for serverless relay proxies.
 */

import { randomBytes } from "node:crypto";
import { getDbInstance } from "./core";
import { rowToCamel } from "./core";

// ── Types ────────────────────────────────────────────────────────────────────

export interface RelayToken {
  id: string;
  name: string;
  tokenHash: string;
  tokenPrefix: string;
  description: string;
  comboId: string | null;
  allowedModels: string;
  maxTokensPerRequest: number;
  maxRequestsPerMinute: number;
  maxRequestsPerDay: number;
  maxCostPerDay: number;
  enabled: boolean;
  createdAt: number;
  updatedAt: number;
  expiresAt: number | null;
  lastUsedAt: number | null;
  metadata: string;
}

export interface RelayTokenRow {
  id: string;
  name: string;
  token_hash: string;
  token_prefix: string;
  description: string;
  combo_id: string | null;
  allowed_models: string;
  max_tokens_per_request: number;
  max_requests_per_minute: number;
  max_requests_per_day: number;
  max_cost_per_day: number;
  enabled: number;
  created_at: number;
  updated_at: number;
  expires_at: number | null;
  last_used_at: number | null;
  metadata: string;
}

export interface CreateRelayTokenInput {
  name: string;
  description?: string;
  comboId?: string;
  allowedModels?: string[];
  maxTokensPerRequest?: number;
  maxRequestsPerMinute?: number;
  maxRequestsPerDay?: number;
  maxCostPerDay?: number;
  expiresAt?: number;
  metadata?: Record<string, unknown>;
}

export interface RelayTokenWithSecret extends RelayToken {
  rawToken: string; // Only returned once on creation
}

export interface RelayLogRow {
  id: number;
  token_id: string;
  request_id: string | null;
  model: string | null;
  prompt_tokens: number;
  completion_tokens: number;
  cost: number;
  status: string;
  status_code: number;
  latency_ms: number;
  client_ip: string | null;
  user_agent: string | null;
  created_at: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function generateId(): string {
  return "rl_" + randomBytes(16).toString("hex");
}

function generateToken(): string {
  return "relay_" + randomBytes(24).toString("hex");
}

function hashToken(token: string): string {
  // Simple hash for token comparison (not bcrypt-heavy for performance)
  const { createHash } = require("node:crypto");
  return createHash("sha256").update(token).digest("hex");
}

// ── CRUD ─────────────────────────────────────────────────────────────────────

export function createRelayToken(input: CreateRelayTokenInput): RelayTokenWithSecret {
  const db = getDbInstance();
  const id = generateId();
  const rawToken = generateToken();
  const tokenHash = hashToken(rawToken);
  const now = Math.floor(Date.now() / 1000);

  const prefix = "rl_" + rawToken.slice(6, 14);

  db.prepare(
    `
    INSERT INTO relay_tokens (id, name, token_hash, token_prefix, description, combo_id, allowed_models,
      max_tokens_per_request, max_requests_per_minute, max_requests_per_day, max_cost_per_day,
      enabled, created_at, updated_at, expires_at, metadata)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?)
  `
  ).run(
    id,
    input.name,
    tokenHash,
    prefix,
    input.description || "",
    input.comboId || null,
    JSON.stringify(input.allowedModels || ["*"]),
    input.maxTokensPerRequest || 128000,
    input.maxRequestsPerMinute || 60,
    input.maxRequestsPerDay || 10000,
    input.maxCostPerDay || 0,
    now,
    now,
    input.expiresAt || null,
    JSON.stringify(input.metadata || {})
  );

  const token = db.prepare("SELECT * FROM relay_tokens WHERE id = ?").get(id) as RelayTokenRow;
  return { ...(rowToCamel(token) as unknown as RelayToken), rawToken };
}

export function getRelayTokens(): RelayToken[] {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT * FROM relay_tokens ORDER BY created_at DESC")
    .all() as RelayTokenRow[];
  return rows.map((r) => ({
    ...(rowToCamel(r) as unknown as RelayToken),
    enabled: r.enabled === 1,
  }));
}

export function getRelayToken(id: string): RelayToken | null {
  const db = getDbInstance();
  const row = db.prepare("SELECT * FROM relay_tokens WHERE id = ?").get(id) as
    RelayTokenRow | undefined;
  if (!row) return null;
  return { ...(rowToCamel(row) as unknown as RelayToken), enabled: row.enabled === 1 };
}

export function getRelayTokenByHash(
  tokenHash: string
): (RelayToken & { rawToken?: string }) | null {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT * FROM relay_tokens WHERE token_hash = ? AND enabled = 1")
    .get(tokenHash) as RelayTokenRow | undefined;
  if (!row) return null;
  return { ...(rowToCamel(row) as unknown as RelayToken), enabled: row.enabled === 1 };
}

export function updateRelayToken(
  id: string,
  updates: Partial<CreateRelayTokenInput>
): RelayToken | null {
  const db = getDbInstance();
  const now = Math.floor(Date.now() / 1000);
  const sets: string[] = ["updated_at = ?"];
  const params: unknown[] = [now];

  if (updates.name !== undefined) {
    sets.push("name = ?");
    params.push(updates.name);
  }
  if (updates.description !== undefined) {
    sets.push("description = ?");
    params.push(updates.description);
  }
  if (updates.comboId !== undefined) {
    sets.push("combo_id = ?");
    params.push(updates.comboId);
  }
  if (updates.allowedModels !== undefined) {
    sets.push("allowed_models = ?");
    params.push(JSON.stringify(updates.allowedModels));
  }
  if (updates.maxTokensPerRequest !== undefined) {
    sets.push("max_tokens_per_request = ?");
    params.push(updates.maxTokensPerRequest);
  }
  if (updates.maxRequestsPerMinute !== undefined) {
    sets.push("max_requests_per_minute = ?");
    params.push(updates.maxRequestsPerMinute);
  }
  if (updates.maxRequestsPerDay !== undefined) {
    sets.push("max_requests_per_day = ?");
    params.push(updates.maxRequestsPerDay);
  }
  if (updates.maxCostPerDay !== undefined) {
    sets.push("max_cost_per_day = ?");
    params.push(updates.maxCostPerDay);
  }

  params.push(id);
  db.prepare(`UPDATE relay_tokens SET ${sets.join(", ")} WHERE id = ?`).run(...params);
  return getRelayToken(id);
}

export function deleteRelayToken(id: string): void {
  const db = getDbInstance();
  db.prepare("DELETE FROM relay_tokens WHERE id = ?").run(id);
}

export function toggleRelayToken(id: string, enabled: boolean): RelayToken | null {
  const db = getDbInstance();
  const now = Math.floor(Date.now() / 1000);
  db.prepare("UPDATE relay_tokens SET enabled = ?, updated_at = ? WHERE id = ?").run(
    enabled ? 1 : 0,
    now,
    id
  );
  return getRelayToken(id);
}

// ── Usage / Rate Limit ───────────────────────────────────────────────────────

export function checkRateLimit(
  tokenId: string,
  existingToken?: RelayToken
): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const db = getDbInstance();
  let token = existingToken;
  if (!token) {
    const row = db.prepare("SELECT * FROM relay_tokens WHERE id = ?").get(tokenId) as
      RelayTokenRow | undefined;
    if (!row) return { allowed: false, remaining: 0, resetIn: 0 };
    token = rowToCamel(row) as unknown as RelayToken;
  }

  const now = Math.floor(Date.now() / 1000);
  const minuteWindow = Math.floor(now / 60) * 60;
  const dayWindow = Math.floor(now / 86400) * 86400;

  // Check minute rate
  const minuteRow = db
    .prepare(
      "SELECT request_count, cost FROM relay_rate_limits WHERE token_id = ? AND window_start = ?"
    )
    .get(tokenId, minuteWindow) as { request_count: number; cost: number } | undefined;

  const minuteCount = minuteRow?.request_count || 0;
  if (minuteCount >= token.maxRequestsPerMinute) {
    return { allowed: false, remaining: 0, resetIn: 60 - (now % 60) };
  }

  // Check daily rate
  const dayRow = db
    .prepare(
      "SELECT SUM(request_count) as total FROM relay_rate_limits WHERE token_id = ? AND window_start >= ?"
    )
    .get(tokenId, dayWindow) as { total: number } | undefined;

  const dayCount = dayRow?.total || 0;
  if (dayCount >= token.maxRequestsPerDay) {
    return { allowed: false, remaining: 0, resetIn: 86400 - (now % 86400) };
  }

  const remaining = Math.min(
    token.maxRequestsPerMinute - minuteCount,
    token.maxRequestsPerDay - dayCount
  );

  return { allowed: true, remaining, resetIn: 60 - (now % 60) };
}

export function recordRelayUsage(
  tokenId: string,
  params: {
    requestId?: string;
    model?: string;
    promptTokens?: number;
    completionTokens?: number;
    cost?: number;
    status?: string;
    statusCode?: number;
    latencyMs?: number;
    clientIp?: string;
    userAgent?: string;
  }
): void {
  const db = getDbInstance();
  const now = Math.floor(Date.now() / 1000);
  const minuteWindow = Math.floor(now / 60) * 60;

  // Update rate limit window
  db.prepare(
    `
    INSERT INTO relay_rate_limits (token_id, window_start, request_count, cost)
    VALUES (?, ?, 1, ?)
    ON CONFLICT(token_id, window_start) DO UPDATE SET
      request_count = request_count + 1,
      cost = cost + ?
  `
  ).run(tokenId, minuteWindow, params.cost || 0, params.cost || 0);

  // Update last_used_at
  db.prepare("UPDATE relay_tokens SET last_used_at = ? WHERE id = ?").run(now, tokenId);

  // Insert log
  db.prepare(
    `
    INSERT INTO relay_logs (token_id, request_id, model, prompt_tokens, completion_tokens, cost,
      status, status_code, latency_ms, client_ip, user_agent, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  ).run(
    tokenId,
    params.requestId || null,
    params.model || null,
    params.promptTokens || 0,
    params.completionTokens || 0,
    params.cost || 0,
    params.status || "success",
    params.statusCode || 200,
    params.latencyMs || 0,
    params.clientIp || null,
    params.userAgent || null,
    now
  );
}

export function getRelayUsage(
  tokenId: string,
  since: number
): { requestCount: number; totalCost: number } {
  const db = getDbInstance();
  const row = db
    .prepare(
      "SELECT COUNT(*) as request_count, COALESCE(SUM(cost), 0) as total_cost FROM relay_logs WHERE token_id = ? AND created_at >= ?"
    )
    .get(tokenId, since) as { request_count: number; total_cost: number };
  return { requestCount: row.request_count, totalCost: row.total_cost };
}

export function getRelayLogs(tokenId?: string, limit = 50): RelayLogRow[] {
  const db = getDbInstance();
  if (tokenId) {
    return db
      .prepare("SELECT * FROM relay_logs WHERE token_id = ? ORDER BY created_at DESC LIMIT ?")
      .all(tokenId, limit) as RelayLogRow[];
  }
  return db
    .prepare("SELECT * FROM relay_logs ORDER BY created_at DESC LIMIT ?")
    .all(limit) as RelayLogRow[];
}
