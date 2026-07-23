import { Memory, MemoryType } from "../types";

export interface MemoryRow {
  id: string;
  api_key_id?: string;
  apiKeyId?: string;
  session_id?: string | null;
  sessionId?: string | null;
  type: MemoryType;
  key?: string | null;
  content: string;
  metadata?: string | null;
  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
  expires_at?: string | null;
  expiresAt?: string | null;
  access_count?: number | null;
  last_accessed_at?: string | null;
}

/**
 * Simple token estimation function (roughly 1 token per 4 characters)
 */
export function estimateTokens(text: string): number {
  if (!text || typeof text !== "string") return 0;
  return Math.ceil(text.length / 4);
}

export function parseMetadata(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "string") return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function rowToMemory(row: MemoryRow): Memory {
  const createdAt = row.created_at || row.createdAt || new Date().toISOString();
  const updatedAt = row.updated_at || row.updatedAt || createdAt;
  const expiresAt = row.expires_at ?? row.expiresAt ?? null;

  return {
    id: String(row.id),
    apiKeyId: String(row.api_key_id || row.apiKeyId || ""),
    sessionId: String(row.session_id ?? row.sessionId ?? ""),
    type: row.type as MemoryType,
    key: String(row.key || ""),
    content: String(row.content || ""),
    metadata: parseMetadata(row.metadata),
    createdAt: new Date(createdAt),
    updatedAt: new Date(updatedAt),
    expiresAt: expiresAt ? new Date(String(expiresAt)) : null,
    accessCount: typeof row.access_count === "number" ? row.access_count : 0,
    lastAccessedAt: row.last_accessed_at ? new Date(String(row.last_accessed_at)) : null,
  };
}

/**
 * Score a memory against a query using simple string matching (no dynamic RegExp).
 * Uses indexOf() for full-phrase matches and split-token substring checks only,
 * so there is no ReDoS risk — no user input is passed to RegExp().
 */
export function getRelevanceScore(memory: Memory, query: string): number {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return 0;

  const haystacks = [
    memory.content.toLowerCase(),
    memory.key.toLowerCase(),
    JSON.stringify(memory.metadata).toLowerCase(),
  ];
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

  let score = 0;
  for (const haystack of haystacks) {
    // Full phrase match (safe: literal string, not regex)
    if (haystack.includes(normalizedQuery)) {
      score += 20;
    }

    for (const token of tokens) {
      if (!token) continue;
      // Token-level substring count using indexOf loop (no RegExp on user input)
      if (haystack === memory.key.toLowerCase() && haystack.includes(token)) {
        score += 6;
        continue;
      }
      // Count occurrences via indexOf loop — avoids new RegExp(token)
      let pos = 0;
      let matchCount = 0;
      while ((pos = haystack.indexOf(token, pos)) !== -1) {
        matchCount++;
        pos += token.length;
      }
      score += matchCount * 3;
    }
  }

  return score;
}
