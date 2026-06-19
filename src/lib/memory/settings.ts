import { getSettings } from "@/lib/db/settings";
import type { MemoryConfig } from "./types";

export interface MemorySettings {
  enabled: boolean;
  maxTokens: number;
  retentionDays: number;
  strategy: "recent" | "semantic" | "hybrid";
  skillsEnabled: boolean;
  // Plan 21 — D9: new embedding / vector store fields
  embeddingSource: "remote" | "static" | "transformers" | "auto";
  embeddingProviderModel: string | null;
  transformersEnabled: boolean;
  staticEnabled: boolean;
  rerankEnabled: boolean;
  rerankProviderModel: string | null;
  vectorStore: "sqlite-vec" | "qdrant" | "auto";
}

export const DEFAULT_MEMORY_SETTINGS: MemorySettings = {
  // Off by default: enabling memory injects up to `maxTokens` (~2k) of retrieved
  // context into every chat request, which is billed — a surprising cost for new
  // installs and for clients that manage their own context. Opt in explicitly via
  // Settings → Memory (the UI warns about the token cost). Per-request opt-out is
  // also available via the `x-omniroute-no-memory` header. See
  // _tasks/PRD-2026-06-19-no-memory-header.md.
  enabled: false,
  maxTokens: 2000,
  retentionDays: 30,
  strategy: "hybrid",
  skillsEnabled: true,
  // Plan 21 — D9 defaults
  embeddingSource: "auto",
  embeddingProviderModel: null,
  transformersEnabled: false,
  staticEnabled: false,
  rerankEnabled: false,
  rerankProviderModel: null,
  vectorStore: "auto",
};

let cachedMemorySettings: MemorySettings | null = null;

function toBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function clampInteger(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(Math.max(Math.round(value), min), max);
}

function normalizeStrategy(value: unknown): MemorySettings["strategy"] {
  return value === "recent" || value === "semantic" || value === "hybrid"
    ? value
    : DEFAULT_MEMORY_SETTINGS.strategy;
}

function normalizeEmbeddingSource(value: unknown): MemorySettings["embeddingSource"] {
  return value === "remote" || value === "static" || value === "transformers" || value === "auto"
    ? value
    : DEFAULT_MEMORY_SETTINGS.embeddingSource;
}

function normalizeVectorStore(value: unknown): MemorySettings["vectorStore"] {
  return value === "sqlite-vec" || value === "qdrant" || value === "auto"
    ? value
    : DEFAULT_MEMORY_SETTINGS.vectorStore;
}

function normalizeNullableString(value: unknown, fallback: string | null): string | null {
  if (value === null || value === undefined) return fallback;
  return typeof value === "string" && value.length > 0 ? value : fallback;
}

export function normalizeMemorySettings(rawSettings: Record<string, unknown> = {}): MemorySettings {
  return {
    enabled: toBoolean(rawSettings.memoryEnabled, DEFAULT_MEMORY_SETTINGS.enabled),
    maxTokens: clampInteger(
      rawSettings.memoryMaxTokens,
      DEFAULT_MEMORY_SETTINGS.maxTokens,
      0,
      16000
    ),
    retentionDays: clampInteger(
      rawSettings.memoryRetentionDays,
      DEFAULT_MEMORY_SETTINGS.retentionDays,
      1,
      365
    ),
    strategy: normalizeStrategy(rawSettings.memoryStrategy),
    skillsEnabled: toBoolean(rawSettings.skillsEnabled, DEFAULT_MEMORY_SETTINGS.skillsEnabled),
    // Plan 21 — D9 new fields
    embeddingSource: normalizeEmbeddingSource(rawSettings.memoryEmbeddingSource),
    embeddingProviderModel: normalizeNullableString(
      rawSettings.memoryEmbeddingProviderModel,
      DEFAULT_MEMORY_SETTINGS.embeddingProviderModel
    ),
    transformersEnabled: toBoolean(
      rawSettings.memoryTransformersEnabled,
      DEFAULT_MEMORY_SETTINGS.transformersEnabled
    ),
    staticEnabled: toBoolean(rawSettings.memoryStaticEnabled, DEFAULT_MEMORY_SETTINGS.staticEnabled),
    rerankEnabled: toBoolean(rawSettings.memoryRerankEnabled, DEFAULT_MEMORY_SETTINGS.rerankEnabled),
    rerankProviderModel: normalizeNullableString(
      rawSettings.memoryRerankProviderModel,
      DEFAULT_MEMORY_SETTINGS.rerankProviderModel
    ),
    vectorStore: normalizeVectorStore(rawSettings.memoryVectorStore),
  };
}

export function toMemorySettingsUpdates(
  settings: Partial<MemorySettings>
): Record<string, unknown> {
  const updates: Record<string, unknown> = {};

  if (settings.enabled !== undefined) updates.memoryEnabled = settings.enabled;
  if (settings.maxTokens !== undefined) updates.memoryMaxTokens = settings.maxTokens;
  if (settings.retentionDays !== undefined) updates.memoryRetentionDays = settings.retentionDays;
  if (settings.strategy !== undefined) updates.memoryStrategy = settings.strategy;
  if (settings.skillsEnabled !== undefined) updates.skillsEnabled = settings.skillsEnabled;
  // Plan 21 — D9 new fields
  if (settings.embeddingSource !== undefined)
    updates.memoryEmbeddingSource = settings.embeddingSource;
  if (settings.embeddingProviderModel !== undefined)
    updates.memoryEmbeddingProviderModel = settings.embeddingProviderModel;
  if (settings.transformersEnabled !== undefined)
    updates.memoryTransformersEnabled = settings.transformersEnabled;
  if (settings.staticEnabled !== undefined) updates.memoryStaticEnabled = settings.staticEnabled;
  if (settings.rerankEnabled !== undefined) updates.memoryRerankEnabled = settings.rerankEnabled;
  if (settings.rerankProviderModel !== undefined)
    updates.memoryRerankProviderModel = settings.rerankProviderModel;
  if (settings.vectorStore !== undefined) updates.memoryVectorStore = settings.vectorStore;

  return updates;
}

export function toMemoryRetrievalConfig(
  settings: MemorySettings,
  extra: { query?: string } = {}
): Partial<MemoryConfig> & { query?: string } {
  const enabled = settings.enabled && settings.maxTokens > 0;

  const config: Partial<MemoryConfig> & { query?: string } = {
    enabled,
    maxTokens: enabled ? settings.maxTokens : 0,
    retrievalStrategy: settings.strategy === "recent" ? "exact" : settings.strategy,
    autoSummarize: false,
    persistAcrossModels: false,
    retentionDays: settings.retentionDays,
    scope: "apiKey",
  };

  // Plan 21 FAIL #1 fix: forward the last user message as `query` so that
  // semantic / hybrid strategies actually exercise the vector store in the
  // chat hot path (chatCore.ts), not only in the Playground.
  //
  // BUT only for query-driven strategies. The "recent" strategy (mapped to the
  // internal "exact" path) is recency-based: it must return the most recent
  // memories regardless of the current prompt. Forwarding a query there makes
  // retrieveMemories apply relevance filtering (score > 0), which silently
  // drops recent memories whose text doesn't overlap the prompt — breaking the
  // "recent" contract. So skip query forwarding when strategy === "recent".
  if (extra.query && extra.query.trim().length > 0 && settings.strategy !== "recent") {
    config.query = extra.query.trim();
  }

  return config;
}

export async function getMemorySettings(): Promise<MemorySettings> {
  if (cachedMemorySettings !== null) {
    return cachedMemorySettings;
  }

  const settings = (await getSettings()) as Record<string, unknown>;
  cachedMemorySettings = normalizeMemorySettings(settings);
  return cachedMemorySettings;
}

export function invalidateMemorySettingsCache(): void {
  cachedMemorySettings = null;
}
