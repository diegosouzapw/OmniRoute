import { getDbInstance } from "../db/core";
import { Memory, MemoryConfig, MemoryType } from "./types";
import { MemoryConfigSchema } from "./schemas";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("MEMORY_RETRIEVAL");

interface MemoryRow {
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
}

interface RetrievalOptions extends Partial<MemoryConfig> {
  query?: string;
  sessionId?: string;
}

/**
 * Simple token estimation function (roughly 1 token per 4 characters)
 */
export function estimateTokens(text: string): number {
  if (!text || typeof text !== "string") return 0;
  return Math.ceil(text.length / 4);
}

function hasTable(tableName: string): boolean {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(tableName) as { name?: string } | undefined;
  return row?.name === tableName;
}

function parseMetadata(raw: unknown): Record<string, unknown> {
  if (!raw || typeof raw !== "string") return {};
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

function rowToMemory(row: MemoryRow): Memory {
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
  };
}

function getRelevanceScore(memory: Memory, query: string): number {
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
    if (haystack.includes(normalizedQuery)) {
      score += 20;
    }

    for (const token of tokens) {
      if (!token) continue;

      if (haystack === memory.key.toLowerCase() && haystack.includes(token)) {
        score += 6;
        continue;
      }

      const matches = haystack.match(new RegExp(token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"));
      score += (matches?.length || 0) * 3;
    }
  }

  return score;
}

/**
 * Retrieve memories with token budget enforcement
 */
export async function retrieveMemories(
  apiKeyId: string,
  config: RetrievalOptions = {}
): Promise<Memory[]> {
  log.info("memory.retrieval.start", { apiKeyId, strategy: config.retrievalStrategy });

  // Validate and normalize config
  const normalizedConfig = MemoryConfigSchema.parse({
    enabled: true,
    maxTokens: 2000,
    retrievalStrategy: "exact",
    autoSummarize: false,
    persistAcrossModels: false,
    retentionDays: 30,
    scope: "apiKey",
    ...config,
  });

  if (!normalizedConfig.enabled || normalizedConfig.maxTokens <= 0) {
    return [];
  }

  const maxTokens = Math.min(Math.max(normalizedConfig.maxTokens, 1), 8000);
  const strategy = normalizedConfig.retrievalStrategy;

  const db = getDbInstance();
  const memories: Array<{ memory: Memory; score: number }> = [];
  let totalTokens = 0;

  const useModernTable = hasTable("memories");
  const tableName = useModernTable ? "memories" : "memory";
  const columns = useModernTable
    ? {
        apiKeyId: "api_key_id",
        sessionId: "session_id",
        createdAt: "created_at",
        expiresAt: "expires_at",
      }
    : {
        apiKeyId: "apiKeyId",
        sessionId: "sessionId",
        createdAt: "createdAt",
        expiresAt: "expiresAt",
      };

  // Build base query
  let query =
    `SELECT * FROM ${tableName} WHERE ${columns.apiKeyId} = ? ` +
    `AND (${columns.expiresAt} IS NULL OR datetime(${columns.expiresAt}) > datetime('now'))`;
  const params: any[] = [apiKeyId];

  if (normalizedConfig.scope === "session" && config.sessionId) {
    query += ` AND ${columns.sessionId} = ?`;
    params.push(config.sessionId);
  }

  if (normalizedConfig.retentionDays > 0) {
    const cutoff = new Date(
      Date.now() - normalizedConfig.retentionDays * 24 * 60 * 60 * 1000
    ).toISOString();
    query += ` AND datetime(${columns.createdAt}) >= datetime(?)`;
    params.push(cutoff);
  }

  // Execute query based on strategy
  let rows: MemoryRow[];
  const ftsAvailable = useModernTable && hasTable("memory_fts");

  switch (strategy) {
    case "semantic": {
      if (config.query && ftsAvailable) {
        const ftsQuery =
          `SELECT m.* FROM ${tableName} m ` +
          `JOIN memory_fts f ON m.memory_id = f.rowid ` +
          `WHERE f.memory_fts MATCH ? AND m.${columns.apiKeyId} = ? ` +
          `AND (m.${columns.expiresAt} IS NULL OR datetime(m.${columns.expiresAt}) > datetime('now'))` +
          (normalizedConfig.scope === "session" && config.sessionId
            ? ` AND m.${columns.sessionId} = ?`
            : "") +
          (normalizedConfig.retentionDays > 0
            ? ` AND datetime(m.${columns.createdAt}) >= datetime(?)`
            : "") +
          ` ORDER BY f.rank LIMIT 100`;
        const ftsParams: any[] = [config.query, apiKeyId];
        if (normalizedConfig.scope === "session" && config.sessionId) {
          ftsParams.push(config.sessionId);
        }
        if (normalizedConfig.retentionDays > 0) {
          const cutoff = new Date(
            Date.now() - normalizedConfig.retentionDays * 24 * 60 * 60 * 1000
          ).toISOString();
          ftsParams.push(cutoff);
        }
        try {
          rows = db.prepare(ftsQuery).all(...ftsParams) as MemoryRow[];
        } catch {
          rows = [];
        }
        if (rows.length === 0) {
          query += ` ORDER BY ${columns.createdAt} DESC LIMIT 100`;
          rows = db.prepare(query).all(...params) as MemoryRow[];
        }
      } else {
        query += ` ORDER BY ${columns.createdAt} DESC LIMIT 100`;
        rows = db.prepare(query).all(...params) as MemoryRow[];
      }
      break;
    }
    case "hybrid": {
      let ftsRows: MemoryRow[] = [];
      if (config.query && ftsAvailable) {
        const ftsQuery =
          `SELECT m.* FROM ${tableName} m ` +
          `JOIN memory_fts f ON m.memory_id = f.rowid ` +
          `WHERE f.memory_fts MATCH ? AND m.${columns.apiKeyId} = ? ` +
          `AND (m.${columns.expiresAt} IS NULL OR datetime(m.${columns.expiresAt}) > datetime('now'))` +
          (normalizedConfig.scope === "session" && config.sessionId
            ? ` AND m.${columns.sessionId} = ?`
            : "") +
          (normalizedConfig.retentionDays > 0
            ? ` AND datetime(m.${columns.createdAt}) >= datetime(?)`
            : "") +
          ` ORDER BY f.rank LIMIT 100`;
        const ftsParams: any[] = [config.query, apiKeyId];
        if (normalizedConfig.scope === "session" && config.sessionId) {
          ftsParams.push(config.sessionId);
        }
        if (normalizedConfig.retentionDays > 0) {
          const cutoff = new Date(
            Date.now() - normalizedConfig.retentionDays * 24 * 60 * 60 * 1000
          ).toISOString();
          ftsParams.push(cutoff);
        }
        try {
          ftsRows = db.prepare(ftsQuery).all(...ftsParams) as MemoryRow[];
        } catch {
          ftsRows = [];
        }
      }
      // Get chronological results for keyword scoring
      query += ` ORDER BY ${columns.createdAt} DESC LIMIT 100`;
      const keywordRows = db.prepare(query).all(...params) as MemoryRow[];

      // Union: FTS5 results first (higher relevance), then keyword results, dedup by id
      const seen = new Set<string | number>();
      rows = [];
      for (const row of [...ftsRows, ...keywordRows]) {
        const rowId = String(row.id);
        if (!seen.has(rowId)) {
          seen.add(rowId);
          rows.push(row);
        }
      }
      break;
    }
    case "exact":
    default: {
      query += ` ORDER BY ${columns.createdAt} DESC LIMIT 100`;
      rows = db.prepare(query).all(...params) as MemoryRow[];
    }
  }

  const rankedRows = rows
    .map((row) => {
      const memory = rowToMemory(row);
      const score = config.query ? getRelevanceScore(memory, config.query) : 0;
      return { memory, score };
    })
    .filter((entry) => !config.query || entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.memory.createdAt.getTime() - a.memory.createdAt.getTime();
    });

  // Process memories until budget exceeded
  for (const entry of rankedRows) {
    const memory = entry.memory;
    // Estimate tokens for this memory
    const memoryTokens = estimateTokens(memory.content);

    // Check if adding this memory would exceed budget
    if (totalTokens + memoryTokens > maxTokens) {
      // If we haven't added any memories yet, add this one anyway
      if (memories.length === 0) {
        memories.push(entry);
        totalTokens += memoryTokens;
      }
      break;
    }

    // Add memory to results
    memories.push(entry);
    totalTokens += memoryTokens;
  }

  const result = memories.map((entry) => entry.memory);
  log.info("memory.retrieval.complete", { apiKeyId, count: result.length });
  log.debug("memory.retrieval.selected", { ids: result.map((m) => m.id) });
  return result;
}
