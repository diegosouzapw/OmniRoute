import { getDbInstance } from "../db/core";
import { Memory, MemoryConfig } from "./types";
import { MemoryConfigSchema } from "./schemas";
import { logger } from "../../../open-sse/utils/logger.ts";
import { sanitizeErrorMessage } from "../../../open-sse/utils/error.ts";
import { resolveEmbeddingSource, embed } from "./embedding";
import { getVectorStore } from "./vectorStore";
import { getMemorySettings } from "./settings";
import { recordMemoryAccess } from "./store";
import { stats as embeddingCacheStats } from "./embedding/cache";
import { getQdrantConfig, checkQdrantHealth, searchSemanticMemory } from "./qdrant";
import type { MemoryEngineStatus } from "@/shared/schemas/memory";
import { estimateTokens, parseMetadata, rowToMemory, getRelevanceScore } from "./retrieval/scoring";
import type { MemoryRow } from "./retrieval/scoring";

const log = logger("MEMORY_RETRIEVAL");

interface RetrievalOptions extends Partial<MemoryConfig> {
  query?: string;
  sessionId?: string;
}

// ──────────────── Types exposed publicly (§3.6) ────────────────

export interface RetrievePreviewItem {
  memory: Memory;
  score: number;
  tokens: number;
  tier: "fts5" | "vector" | "hybrid-rrf" | "qdrant";
  vecScore: number | null;
  ftsScore: number | null;
}

export interface RetrievePreviewResolution {
  embeddingSource: "remote" | "static" | "transformers" | null;
  embeddingModel: string | null;
  vectorStore: "sqlite-vec" | "qdrant" | "none";
  strategyUsed: "exact" | "semantic" | "hybrid";
  rerankApplied: boolean;
  fallbackReason: string | null;
}

export interface RetrievePreviewBundle {
  items: RetrievePreviewItem[];
  resolution: RetrievePreviewResolution;
  totalTokens: number;
  budgetMaxTokens: number;
}

export { estimateTokens } from "./retrieval/scoring";

// ──────────────── Helpers ────────────────

function hasTable(tableName: string): boolean {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?")
    .get(tableName) as { name?: string } | undefined;
  return row?.name === tableName;
}

/**
 * Fetch memories from SQLite by an array of IDs, preserving order.
 */
function fetchMemoriesByIds(ids: string[]): Memory[] {
  if (ids.length === 0) return [];
  const db = getDbInstance();
  const placeholders = ids.map(() => "?").join(", ");
  const rows = db
    .prepare(`SELECT * FROM memories WHERE id IN (${placeholders})`)
    .all(...ids) as MemoryRow[];

  const byId = new Map<string, Memory>();
  for (const row of rows) {
    byId.set(String(row.id), rowToMemory(row));
  }

  return ids.map((id) => byId.get(id)).filter((m): m is Memory => m !== undefined);
}

interface FtsColConfig {
  apiKeyCol: string;
  expiresCol: string;
  createdCol: string;
  sessionCol: string;
  tableName: string;
  query?: string;
  scope?: string;
  sessionId?: string;
  retentionDays?: number;
}

/**
 * Build the FTS5 rows for a given apiKeyId + config + query.
 * Returns MemoryRow array (or falls back to empty on error).
 */
function buildFtsRows(apiKeyId: string, config: FtsColConfig): MemoryRow[] {
  if (!config.query) return [];
  const db = getDbInstance();
  const {
    apiKeyCol,
    expiresCol,
    createdCol,
    sessionCol,
    tableName,
    query: q,
    scope,
    sessionId,
    retentionDays,
  } = config;

  let ftsQueryStr =
    `SELECT m.* FROM ${tableName} m ` +
    `JOIN memory_fts f ON m.memory_id = f.rowid ` +
    `WHERE f.memory_fts MATCH ? AND m.${apiKeyCol} = ? ` +
    `AND (m.${expiresCol} IS NULL OR datetime(m.${expiresCol}) > datetime('now'))`;
  if (scope === "session" && sessionId) {
    ftsQueryStr += ` AND m.${sessionCol} = ?`;
  }
  if (retentionDays && retentionDays > 0) {
    ftsQueryStr += ` AND datetime(m.${createdCol}) >= datetime(?)`;
  }
  ftsQueryStr += ` ORDER BY f.rank LIMIT 100`;

  const ftsParams: unknown[] = [q, apiKeyId];
  if (scope === "session" && sessionId) ftsParams.push(sessionId);
  if (retentionDays && retentionDays > 0) {
    const cutoff = new Date(Date.now() - retentionDays * 24 * 60 * 60 * 1000).toISOString();
    ftsParams.push(cutoff);
  }

  try {
    return db.prepare(ftsQueryStr).all(...ftsParams) as MemoryRow[];
  } catch {
    return [];
  }
}

// Loopback rerank URL — localhost only, never routed over the network.
// nosemgrep: javascript.lang.security.audit.non-literal-regexp.non-literal-regexp
const RERANK_LOOPBACK_URL = "http://127.0.0.1:20128/v1/rerank";

/**
 * Apply reranking via /v1/rerank (loopback-only) if rerankEnabled + rerankProviderModel is set.
 * Returns reordered array (or original order on any error — rerank failure never fails retrieval).
 *
 * Security note: the URL is a hardcoded loopback address (127.0.0.1:20128) — it never
 * carries sensitive data over a network link. HTTP is safe for loopback-only IPC.
 * nosemgrep: javascript.lang.security.detect-non-literal-url
 */
async function applyRerank<T extends { memory: Memory; score: number }>(
  items: T[],
  query: string,
  rerankProviderModel: string
): Promise<T[]> {
  if (items.length === 0) return items;

  try {
    const documents = items.map((item) => item.memory.content);
    const body = {
      model: rerankProviderModel,
      query,
      documents,
      top_n: items.length,
    };

    const res = await fetch(RERANK_LOOPBACK_URL, {
      // nosemgrep: typescript.react.security.react-insecure-request.react-insecure-request
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) {
      log.warn("memory.rerank.http_fail", {
        status: res.status,
        model: rerankProviderModel,
      });
      return items;
    }

    const data = (await res.json()) as {
      results?: Array<{ index: number; relevance_score: number }>;
    };

    if (!Array.isArray(data.results) || data.results.length === 0) {
      return items;
    }

    // Build reordered list using the index references from the rerank response
    const reordered: T[] = [];
    for (const r of data.results) {
      const idx = r.index;
      if (typeof idx === "number" && idx >= 0 && idx < items.length) {
        const item = items[idx];
        if (item) reordered.push({ ...item, score: r.relevance_score });
      }
    }
    // Append any items not mentioned in results (safety net)
    const mentionedIndices = new Set(data.results.map((r) => r.index));
    for (let i = 0; i < items.length; i++) {
      if (!mentionedIndices.has(i)) {
        const item = items[i];
        if (item) reordered.push(item);
      }
    }
    return reordered;
  } catch (err: unknown) {
    log.warn("memory.rerank.error", {
      error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
      model: rerankProviderModel,
    });
    return items;
  }
}

// ──────────────── Main retrieval function (hot path — signature PRESERVED) ────────────────

/**
 * Retrieve memories with token budget enforcement.
 * Signature PRESERVED: retrieveMemories(apiKeyId: string, config: RetrievalOptions = {})
 * Hot path: open-sse/handlers/chatCore.ts calls this unchanged.
 */
/**
 * Public retrieval entry point. Delegates to the tiered retrieval below, then records a
 * TV6 access bump for every memory actually injected (best-effort, fire-and-forget — never
 * blocks or fails the retrieval). `retrievePreview` deliberately does NOT call this, so a
 * dry-run preview never inflates access counts.
 */
export async function retrieveMemories(
  apiKeyId: string,
  config: RetrievalOptions = {}
): Promise<Memory[]> {
  const result = await retrieveMemoriesInternal(apiKeyId, config);
  if (result.length > 0) {
    recordMemoryAccess(result.map((m) => m.id));
  }
  return result;
}

async function retrieveMemoriesInternal(
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
  // Plan 21 FAIL #2 fix: include "qdrant" in the tier union so that the
  // Qdrant tier-2 branch in semantic/hybrid below can push hits with that tier.
  const memories: Array<{
    memory: Memory;
    score: number;
    tier: "fts5" | "vector" | "hybrid-rrf" | "qdrant";
  }> = [];
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
  const params: unknown[] = [apiKeyId];

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

  // Load extended settings for embedding/vector-store resolution
  const settings = await getMemorySettings();

  // Execute query based on strategy
  let rows: MemoryRow[];
  const ftsAvailable = useModernTable && hasTable("memory_fts");

  const ftsColConfig: FtsColConfig = {
    apiKeyCol: columns.apiKeyId,
    expiresCol: columns.expiresAt,
    createdCol: columns.createdAt,
    sessionCol: columns.sessionId,
    tableName,
    query: config.query,
    scope: normalizedConfig.scope,
    sessionId: config.sessionId,
    retentionDays: normalizedConfig.retentionDays,
  };

  switch (strategy) {
    case "semantic": {
      // Attempt vector search if embedding + vector store are available
      if (config.query && useModernTable) {
        const resolution = resolveEmbeddingSource(settings);
        if (resolution.source !== null) {
          // Plan 21 FAIL #2 fix (Bug #1): when the user opted into Qdrant
          // (settings.vectorStore === "qdrant"), route the semantic search to
          // Qdrant first. If Qdrant is unreachable or returns nothing, fall
          // through to sqlite-vec — preserving the "degrades to sqlite-vec /
          // FTS5" contract of §7.
          if (settings.vectorStore === "qdrant") {
            try {
              const qres = await searchSemanticMemory(config.query, 100, {
                apiKeyId,
              });
              if (qres.ok && qres.results && qres.results.length > 0) {
                const hitIds = qres.results.map((r) => r.id);
                const hitMemories = fetchMemoriesByIds(hitIds);
                const scoreMap = new Map(qres.results.map((r) => [r.id, r.score]));
                let qdrantItems = hitMemories.map((m) => ({
                  memory: m,
                  score: scoreMap.get(m.id) ?? 0,
                  tier: "qdrant" as const,
                }));
                if (settings.rerankEnabled && settings.rerankProviderModel && config.query) {
                  qdrantItems = (await applyRerank(
                    qdrantItems,
                    config.query,
                    settings.rerankProviderModel
                  )) as typeof qdrantItems;
                }
                for (const entry of qdrantItems) {
                  const memoryTokens = estimateTokens(entry.memory.content);
                  if (totalTokens + memoryTokens > maxTokens) {
                    if (memories.length === 0) {
                      memories.push(entry);
                      totalTokens += memoryTokens;
                    }
                    break;
                  }
                  memories.push(entry);
                  totalTokens += memoryTokens;
                }
                log.info("memory.retrieval.complete", {
                  apiKeyId,
                  count: memories.length,
                  tier: "qdrant",
                });
                return memories.map((e) => e.memory);
              }
            } catch (err: unknown) {
              log.warn("memory.retrieval.qdrant.fail", {
                error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
              });
              // fall through to sqlite-vec degradation
            }
          }

          const embeddingResult = await embed(config.query, settings);
          if ("vector" in embeddingResult) {
            const vec = getVectorStore();
            if (vec) {
              try {
                await vec.ensureReady(resolution);
                const hits = await vec.searchVector(embeddingResult.vector, 100, apiKeyId);
                const hitIds = hits.map((h) => h.memoryId);
                const hitMemories = fetchMemoriesByIds(hitIds);
                const scoreMap = new Map(hits.map((h) => [h.memoryId, h.score]));

                let rankedItems = hitMemories.map((m) => ({
                  memory: m,
                  score: scoreMap.get(m.id) ?? 0,
                  tier: "vector" as const,
                }));

                // Apply rerank if enabled
                if (settings.rerankEnabled && settings.rerankProviderModel && config.query) {
                  rankedItems = (await applyRerank(
                    rankedItems,
                    config.query,
                    settings.rerankProviderModel
                  )) as typeof rankedItems;
                }

                // Token budget enforcement
                for (const entry of rankedItems) {
                  const memoryTokens = estimateTokens(entry.memory.content);
                  if (totalTokens + memoryTokens > maxTokens) {
                    if (memories.length === 0) {
                      memories.push(entry);
                      totalTokens += memoryTokens;
                    }
                    break;
                  }
                  memories.push(entry);
                  totalTokens += memoryTokens;
                }

                log.info("memory.retrieval.complete", {
                  apiKeyId,
                  count: memories.length,
                  tier: "vector",
                });
                return memories.map((e) => e.memory);
              } catch (err: unknown) {
                log.warn("memory.retrieval.vector.fail", {
                  error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
                });
                // Fall through to FTS5 degradation
              }
            }
          }
        }
      }

      // Degraded path: FTS5 keyword
      if (config.query && ftsAvailable) {
        rows = buildFtsRows(apiKeyId, ftsColConfig);
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
      // Attempt hybrid vector+FTS5 search if embedding + vector store are available
      if (config.query && useModernTable) {
        const resolution = resolveEmbeddingSource(settings);
        if (resolution.source !== null) {
          // Plan 21 FAIL #2 fix: tier-2 Qdrant route also covers hybrid strategy.
          // Qdrant is vector-only (no FTS5 fusion), so this acts as the vector
          // half of the hybrid contract. If Qdrant is down or empty, fall through
          // to sqlite-vec's hybrid RRF (FTS5 + vector).
          if (settings.vectorStore === "qdrant") {
            try {
              const qres = await searchSemanticMemory(config.query, 100, {
                apiKeyId,
              });
              if (qres.ok && qres.results && qres.results.length > 0) {
                const hitIds = qres.results.map((r) => r.id);
                const hitMemories = fetchMemoriesByIds(hitIds);
                const scoreMap = new Map(qres.results.map((r) => [r.id, r.score]));
                let qdrantItems = hitMemories.map((m) => ({
                  memory: m,
                  score: scoreMap.get(m.id) ?? 0,
                  tier: "qdrant" as const,
                }));
                if (settings.rerankEnabled && settings.rerankProviderModel && config.query) {
                  qdrantItems = (await applyRerank(
                    qdrantItems,
                    config.query,
                    settings.rerankProviderModel
                  )) as typeof qdrantItems;
                }
                for (const entry of qdrantItems) {
                  const memoryTokens = estimateTokens(entry.memory.content);
                  if (totalTokens + memoryTokens > maxTokens) {
                    if (memories.length === 0) {
                      memories.push(entry);
                      totalTokens += memoryTokens;
                    }
                    break;
                  }
                  memories.push(entry);
                  totalTokens += memoryTokens;
                }
                log.info("memory.retrieval.complete", {
                  apiKeyId,
                  count: memories.length,
                  tier: "qdrant",
                });
                return memories.map((e) => e.memory);
              }
            } catch (err: unknown) {
              log.warn("memory.retrieval.qdrant.fail", {
                error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
              });
              // fall through to sqlite-vec hybrid RRF
            }
          }

          const embeddingResult = await embed(config.query, settings);
          if ("vector" in embeddingResult) {
            const vec = getVectorStore();
            if (vec) {
              try {
                await vec.ensureReady(resolution);
                const hybridHits = await vec.searchHybrid(
                  embeddingResult.vector,
                  config.query,
                  100,
                  apiKeyId
                );
                const hitIds = hybridHits.map((h) => h.memoryId);
                const hitMemories = fetchMemoriesByIds(hitIds);
                const scoreMap = new Map(
                  hybridHits.map((h) => [
                    h.memoryId,
                    { rrfScore: h.rrfScore, vecDistance: h.vecDistance, ftsScore: h.ftsScore },
                  ])
                );

                let rankedHybridItems = hitMemories.map((m) => {
                  const sc = scoreMap.get(m.id);
                  return {
                    memory: m,
                    score: sc?.rrfScore ?? 0,
                    tier: "hybrid-rrf" as const,
                  };
                });

                // Apply rerank if enabled
                if (settings.rerankEnabled && settings.rerankProviderModel && config.query) {
                  rankedHybridItems = (await applyRerank(
                    rankedHybridItems,
                    config.query,
                    settings.rerankProviderModel
                  )) as typeof rankedHybridItems;
                }

                // Token budget enforcement
                for (const entry of rankedHybridItems) {
                  const memoryTokens = estimateTokens(entry.memory.content);
                  if (totalTokens + memoryTokens > maxTokens) {
                    if (memories.length === 0) {
                      memories.push(entry);
                      totalTokens += memoryTokens;
                    }
                    break;
                  }
                  memories.push(entry);
                  totalTokens += memoryTokens;
                }

                log.info("memory.retrieval.complete", {
                  apiKeyId,
                  count: memories.length,
                  tier: "hybrid-rrf",
                });
                return memories.map((e) => e.memory);
              } catch (err: unknown) {
                log.warn("memory.retrieval.hybrid.fail", {
                  error: sanitizeErrorMessage(err instanceof Error ? err.message : String(err)),
                });
                // Fall through to FTS5 degradation
              }
            }
          }
        }
      }

      // Degraded path: FTS5 + keyword union
      let ftsRows: MemoryRow[] = [];
      if (config.query && ftsAvailable) {
        ftsRows = buildFtsRows(apiKeyId, ftsColConfig);
      }
      // Get chronological results for keyword scoring
      query += ` ORDER BY ${columns.createdAt} DESC LIMIT 100`;
      const keywordRows = db.prepare(query).all(...params) as MemoryRow[];

      // Union: FTS5 results first (higher relevance), then keyword results, dedup by id
      const seen = new Set<string>();
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
      return { memory, score, tier: "fts5" as const };
    })
    .filter((entry) => !config.query || entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.memory.createdAt.getTime() - a.memory.createdAt.getTime();
    });

  // Process memories until budget exceeded
  for (const entry of rankedRows) {
    const memory = entry.memory;
    const memoryTokens = estimateTokens(memory.content);

    if (totalTokens + memoryTokens > maxTokens) {
      if (memories.length === 0) {
        memories.push(entry);
        totalTokens += memoryTokens;
      }
      break;
    }

    memories.push(entry);
    totalTokens += memoryTokens;
  }

  const result = memories.map((entry) => entry.memory);
  log.info("memory.retrieval.complete", { apiKeyId, count: result.length });
  log.debug("memory.retrieval.selected", { ids: result.map((m) => m.id) });
  return result;
}

// ──────────────── retrievePreview (§3.6 — dry-run for Playground) ────────────────

/**
 * Dry-run of retrieveMemories.
 * Returns the full bundle (items + resolution metadata) WITHOUT injecting into chat.
 * If apiKeyId is null, tests against all memories (global scope).
 */
export async function retrievePreview(
  apiKeyId: string | null,
  query: string,
  options: { strategy: "exact" | "semantic" | "hybrid"; maxTokens: number; limit: number }
): Promise<RetrievePreviewBundle> {
  const { strategy, maxTokens, limit } = options;

  const settings = await getMemorySettings();
  const resolution = resolveEmbeddingSource(settings);

  let fallbackReason: string | null = null;
  let rerankApplied = false;

  const result: RetrievePreviewItem[] = [];
  let totalTokens = 0;

  const useModernTable = hasTable("memories");
  const ftsAvailable = useModernTable && hasTable("memory_fts");
  const db = getDbInstance();

  const tableName = useModernTable ? "memories" : "memory";
  const apiKeyCol = useModernTable ? "api_key_id" : "apiKeyId";
  const expiresCol = useModernTable ? "expires_at" : "expiresAt";
  const createdCol = useModernTable ? "created_at" : "createdAt";

  // Determine vector store backend
  let vectorStoreBackend: "sqlite-vec" | "qdrant" | "none" = "none";
  const vec = getVectorStore();
  if (vec) vectorStoreBackend = "sqlite-vec";

  if (strategy === "semantic" || strategy === "hybrid") {
    if (resolution.source !== null && query) {
      // Plan 21 FAIL #2 fix: when settings.vectorStore === "qdrant",
      // the Playground must show what production retrieval would actually
      // see — Qdrant tier-2. Falls through to sqlite-vec on failure.
      if (settings.vectorStore === "qdrant") {
        try {
          const qres = await searchSemanticMemory(
            query,
            limit,
            apiKeyId ? { apiKeyId } : undefined
          );
          if (qres.ok && qres.results && qres.results.length > 0) {
            const hitIds = qres.results.map((r) => r.id);
            const hitMemories = fetchMemoriesByIds(hitIds).slice(0, limit);
            const scoreMap = new Map(qres.results.map((r) => [r.id, r.score]));
            let items: Array<{
              memory: Memory;
              score: number;
              tier: "qdrant";
              vecScore: number | null;
              ftsScore: null;
            }> = hitMemories.map((m) => ({
              memory: m,
              score: scoreMap.get(m.id) ?? 0,
              tier: "qdrant" as const,
              vecScore: scoreMap.get(m.id) ?? null,
              ftsScore: null,
            }));

            if (settings.rerankEnabled && settings.rerankProviderModel) {
              items = (await applyRerank(
                items,
                query,
                settings.rerankProviderModel
              )) as typeof items;
              rerankApplied = true;
            }

            for (const item of items) {
              if (result.length >= limit) break;
              const tokens = estimateTokens(item.memory.content);
              if (totalTokens + tokens > maxTokens && result.length > 0) break;
              result.push({ ...item, tokens });
              totalTokens += tokens;
            }

            return {
              items: result,
              resolution: {
                embeddingSource: resolution.source,
                embeddingModel: resolution.model,
                vectorStore: "qdrant",
                strategyUsed: strategy,
                rerankApplied,
                fallbackReason: null,
              },
              totalTokens,
              budgetMaxTokens: maxTokens,
            };
          }
          // Qdrant returned nothing — fall through to sqlite-vec for parity
          // with production (so the Playground reflects the same fallback).
          fallbackReason = "Qdrant returned 0 results — falling back to sqlite-vec";
        } catch (err: unknown) {
          fallbackReason = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
          log.warn("memory.preview.qdrant.fail", { error: fallbackReason });
        }
      }

      const embeddingResult = await embed(query, settings);

      if ("vector" in embeddingResult) {
        if (vec) {
          try {
            await vec.ensureReady(resolution);

            if (strategy === "semantic") {
              const hits = await vec.searchVector(
                embeddingResult.vector,
                limit,
                apiKeyId ?? undefined
              );
              const hitIds = hits.map((h) => h.memoryId);
              const hitMemories = fetchMemoriesByIds(hitIds).slice(0, limit);
              const scoreMap = new Map(hits.map((h) => [h.memoryId, h.score]));

              let items: Array<{
                memory: Memory;
                score: number;
                tier: "vector";
                vecScore: number | null;
                ftsScore: null;
              }> = hitMemories.map((m) => ({
                memory: m,
                score: scoreMap.get(m.id) ?? 0,
                tier: "vector" as const,
                vecScore: scoreMap.get(m.id) ?? null,
                ftsScore: null,
              }));

              if (settings.rerankEnabled && settings.rerankProviderModel) {
                items = (await applyRerank(
                  items,
                  query,
                  settings.rerankProviderModel
                )) as typeof items;
                rerankApplied = true;
              }

              for (const item of items) {
                if (result.length >= limit) break;
                const tokens = estimateTokens(item.memory.content);
                if (totalTokens + tokens > maxTokens && result.length > 0) break;
                result.push({ ...item, tokens });
                totalTokens += tokens;
              }
            } else {
              // hybrid
              const hybridHits = await vec.searchHybrid(
                embeddingResult.vector,
                query,
                limit,
                apiKeyId ?? undefined
              );
              const hitIds = hybridHits.map((h) => h.memoryId);
              const hitMemories = fetchMemoriesByIds(hitIds);
              const scoreMap = new Map(
                hybridHits.map((h) => [
                  h.memoryId,
                  {
                    rrfScore: h.rrfScore,
                    vecDistance: h.vecDistance,
                    ftsScore: h.ftsScore,
                  },
                ])
              );

              let items = hitMemories.slice(0, limit).map((m) => {
                const sc = scoreMap.get(m.id);
                return {
                  memory: m,
                  score: sc?.rrfScore ?? 0,
                  tier: "hybrid-rrf" as const,
                  vecScore: sc?.vecDistance != null ? 1 / (1 + sc.vecDistance) : null,
                  ftsScore: sc?.ftsScore ?? null,
                };
              });

              if (settings.rerankEnabled && settings.rerankProviderModel) {
                items = (await applyRerank(
                  items,
                  query,
                  settings.rerankProviderModel
                )) as typeof items;
                rerankApplied = true;
              }

              for (const item of items) {
                if (result.length >= limit) break;
                const tokens = estimateTokens(item.memory.content);
                if (totalTokens + tokens > maxTokens && result.length > 0) break;
                result.push({ ...item, tokens });
                totalTokens += tokens;
              }
            }

            return {
              items: result,
              resolution: {
                embeddingSource: resolution.source,
                embeddingModel: resolution.model,
                vectorStore: vectorStoreBackend,
                strategyUsed: strategy,
                rerankApplied,
                fallbackReason: null,
              },
              totalTokens,
              budgetMaxTokens: maxTokens,
            };
          } catch (err: unknown) {
            fallbackReason = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
            log.warn("memory.preview.vector.fail", { error: fallbackReason });
          }
        } else {
          fallbackReason = "sqlite-vec not available (degraded to FTS5)";
        }
      } else {
        // EmbeddingError
        fallbackReason =
          "message" in embeddingResult ? (embeddingResult.message as string) : "embedding falhou";
      }
    } else if (!query) {
      fallbackReason = "query vazia — usando FTS5";
    } else {
      fallbackReason = resolution.reason;
    }
  }

  // FTS5 fallback path (or strategy=exact)
  let baseQuery = `SELECT * FROM ${tableName}`;
  const baseParams: unknown[] = [];

  if (apiKeyId) {
    baseQuery += ` WHERE ${apiKeyCol} = ?`;
    baseParams.push(apiKeyId);
    baseQuery += ` AND (${expiresCol} IS NULL OR datetime(${expiresCol}) > datetime('now'))`;
  } else {
    baseQuery += ` WHERE (${expiresCol} IS NULL OR datetime(${expiresCol}) > datetime('now'))`;
  }

  if (strategy === "exact") {
    baseQuery += ` ORDER BY ${createdCol} DESC LIMIT ?`;
    baseParams.push(limit);

    const rows = db.prepare(baseQuery).all(...baseParams) as MemoryRow[];
    for (const row of rows) {
      if (result.length >= limit) break;
      const memory = rowToMemory(row);
      const score = query ? getRelevanceScore(memory, query) : 0;
      const tokens = estimateTokens(memory.content);
      if (totalTokens + tokens > maxTokens && result.length > 0) break;
      result.push({ memory, score, tokens, tier: "fts5", vecScore: null, ftsScore: null });
      totalTokens += tokens;
    }
  } else {
    // Semantic/hybrid degraded to FTS5
    let ftsRows: MemoryRow[] = [];
    if (query && ftsAvailable) {
      const ftsQueryStr = apiKeyId
        ? `SELECT m.* FROM ${tableName} m JOIN memory_fts f ON m.memory_id = f.rowid WHERE f.memory_fts MATCH ? AND m.${apiKeyCol} = ? ORDER BY f.rank LIMIT ?`
        : `SELECT m.* FROM ${tableName} m JOIN memory_fts f ON m.memory_id = f.rowid WHERE f.memory_fts MATCH ? ORDER BY f.rank LIMIT ?`;
      const ftsP: unknown[] = apiKeyId ? [query, apiKeyId, limit] : [query, limit];
      try {
        ftsRows = db.prepare(ftsQueryStr).all(...ftsP) as MemoryRow[];
      } catch {
        ftsRows = [];
      }
    }

    if (ftsRows.length === 0) {
      baseQuery += ` ORDER BY ${createdCol} DESC LIMIT ?`;
      baseParams.push(limit);
      ftsRows = db.prepare(baseQuery).all(...baseParams) as MemoryRow[];
    }

    for (const row of ftsRows) {
      if (result.length >= limit) break;
      const memory = rowToMemory(row);
      const score = query ? getRelevanceScore(memory, query) : 0;
      const tokens = estimateTokens(memory.content);
      if (totalTokens + tokens > maxTokens && result.length > 0) break;
      result.push({ memory, score, tokens, tier: "fts5", vecScore: null, ftsScore: null });
      totalTokens += tokens;
    }
  }

  return {
    items: result,
    resolution: {
      embeddingSource: resolution.source,
      embeddingModel: resolution.model,
      vectorStore: vectorStoreBackend,
      strategyUsed: strategy,
      rerankApplied,
      fallbackReason,
    },
    totalTokens,
    budgetMaxTokens: maxTokens,
  };
}

// ──────────────── engineStatus (§3.2) ────────────────

/**
 * Returns the current status of the memory engine (for the Engine tab in the UI).
 * Matches MemoryEngineStatusSchema from @/shared/schemas/memory.
 */
export async function engineStatus(): Promise<MemoryEngineStatus> {
  const settings = await getMemorySettings();
  const resolution = resolveEmbeddingSource(settings);
  const cacheStats = embeddingCacheStats();

  // Vector store
  const vec = getVectorStore();
  let vecBackend: "sqlite-vec" | "qdrant" | "none" = "none";
  let vecAvailable = false;
  let vecRowCount = 0;
  let vecNeedsReindex = 0;
  let vecReason = "sqlite-vec not available";

  if (vec) {
    vecBackend = "sqlite-vec";
    vecAvailable = true;
    try {
      const s = await vec.stats();
      vecRowCount = s.rowCount;
      vecNeedsReindex = s.needsReindex;
      vecReason = `sqlite-vec active, dim=${s.activeDim ?? "null"}`;
    } catch {
      vecReason = "sqlite-vec active but stats failed";
    }
  } else {
    vecReason = "sqlite-vec not available — using FTS5 only";
  }

  // Qdrant
  let qdrantEnabled = false;
  let qdrantHealthy: boolean | null = null;
  let qdrantLatencyMs: number | null = null;
  let qdrantError: string | null = null;

  try {
    const qdrantCfg = await getQdrantConfig();
    qdrantEnabled = qdrantCfg.enabled;
    if (qdrantEnabled) {
      const health = await checkQdrantHealth();
      qdrantHealthy = health.ok;
      qdrantLatencyMs = health.latencyMs;
      qdrantError = health.error ? sanitizeErrorMessage(health.error) : null;

      // Plan 21 FAIL #2 fix: only claim vectorStore=qdrant when the user
      // explicitly opted into it (settings.vectorStore === "qdrant"). Before,
      // the status reported "qdrant" whenever the cluster was healthy even
      // though the retrieval path always used sqlite-vec — engineStatus lied.
      if (qdrantHealthy && settings.vectorStore === "qdrant") {
        vecBackend = "qdrant";
        vecAvailable = true;
        vecReason = `Qdrant configured at ${qdrantCfg.host}:${qdrantCfg.port}`;
      }
    }
  } catch (err: unknown) {
    qdrantError = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
  }

  // Rerank
  let rerankAvailable = false;
  let rerankReason = "rerank disabled";
  if (settings.rerankEnabled && settings.rerankProviderModel) {
    rerankAvailable = true;
    rerankReason = `rerank active: ${settings.rerankProviderModel}`;
  } else if (settings.rerankEnabled && !settings.rerankProviderModel) {
    rerankReason = "rerank enabled but provider not configured";
  }

  const rerankParts = settings.rerankProviderModel?.split("/") ?? [];
  const rerankProvider = rerankParts.length >= 2 ? (rerankParts[0] ?? null) : null;
  const rerankModel =
    rerankParts.length >= 2
      ? rerankParts.slice(1).join("/")
      : (settings.rerankProviderModel ?? null);

  return {
    keyword: { available: true, backend: "FTS5" },
    embedding: {
      source: resolution.source,
      model: resolution.model,
      dimensions: resolution.dimensions,
      available: resolution.source !== null,
      reason: resolution.reason,
      cacheStats,
    },
    vectorStore: {
      backend: vecBackend,
      available: vecAvailable,
      rowCount: vecRowCount,
      needsReindex: vecNeedsReindex,
      reason: vecReason,
    },
    qdrant: {
      enabled: qdrantEnabled,
      healthy: qdrantHealthy,
      latencyMs: qdrantLatencyMs,
      error: qdrantError,
    },
    rerank: {
      enabled: settings.rerankEnabled,
      provider: rerankProvider,
      model: rerankModel,
      available: rerankAvailable,
      reason: rerankReason,
    },
  };
}
