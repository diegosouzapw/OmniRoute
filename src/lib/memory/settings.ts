import { getSettings } from "@/lib/db/settings";
import type { MemoryConfig } from "./types";

export interface MemorySettings {
  enabled: boolean;
  maxTokens: number;
  retentionDays: number;
  strategy: "recent" | "semantic" | "hybrid";
  skillsEnabled: boolean;
}

export const DEFAULT_MEMORY_SETTINGS: MemorySettings = {
  enabled: true,
  maxTokens: 2000,
  retentionDays: 30,
  strategy: "hybrid",
  skillsEnabled: false,
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

  return updates;
}

export function toMemoryRetrievalConfig(settings: MemorySettings): Partial<MemoryConfig> {
  const enabled = settings.enabled && settings.maxTokens > 0;

  return {
    enabled,
    maxTokens: enabled ? settings.maxTokens : 0,
    retrievalStrategy: settings.strategy === "recent" ? "exact" : settings.strategy,
    autoSummarize: false,
    persistAcrossModels: false,
    retentionDays: settings.retentionDays,
    scope: "apiKey",
  };
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
