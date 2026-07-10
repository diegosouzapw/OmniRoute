import { getSettings, updateSettings } from "@/lib/db/settings";
import type { AutoPublishMode, OmniContextSettings } from "./types";

export const DEFAULT_OMNICONTEXT_SETTINGS: OmniContextSettings = {
  enabled: false,
  injectBudgetTokens: 2000,
  retrieveTimeoutMs: 2000,
  gitProbeEnabled: false,
  autoPublish: "off",
};

let cachedSettings: OmniContextSettings | null = null;

function toBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

function clampInteger(value: unknown, fallback: number, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value)) return fallback;
  return Math.min(Math.max(Math.round(value), min), max);
}

function normalizeAutoPublish(value: unknown): AutoPublishMode {
  return value === "confirm" || value === "draft-only" || value === "off"
    ? value
    : DEFAULT_OMNICONTEXT_SETTINGS.autoPublish;
}

export function normalizeOmniContextSettings(
  rawSettings: Record<string, unknown> = {}
): OmniContextSettings {
  return {
    enabled: toBoolean(rawSettings.omnicontextEnabled, DEFAULT_OMNICONTEXT_SETTINGS.enabled),
    injectBudgetTokens: clampInteger(
      rawSettings.omnicontextInjectBudgetTokens,
      DEFAULT_OMNICONTEXT_SETTINGS.injectBudgetTokens,
      100,
      32000
    ),
    retrieveTimeoutMs: clampInteger(
      rawSettings.omnicontextRetrieveTimeoutMs,
      DEFAULT_OMNICONTEXT_SETTINGS.retrieveTimeoutMs,
      100,
      30000
    ),
    gitProbeEnabled: toBoolean(
      rawSettings.omnicontextGitProbeEnabled,
      DEFAULT_OMNICONTEXT_SETTINGS.gitProbeEnabled
    ),
    autoPublish: normalizeAutoPublish(rawSettings.omnicontextAutoPublish),
  };
}

export function toOmniContextSettingsUpdates(
  settings: Partial<OmniContextSettings>
): Record<string, unknown> {
  const updates: Record<string, unknown> = {};
  if (settings.enabled !== undefined) updates.omnicontextEnabled = settings.enabled;
  if (settings.injectBudgetTokens !== undefined) {
    updates.omnicontextInjectBudgetTokens = settings.injectBudgetTokens;
  }
  if (settings.retrieveTimeoutMs !== undefined) {
    updates.omnicontextRetrieveTimeoutMs = settings.retrieveTimeoutMs;
  }
  if (settings.gitProbeEnabled !== undefined) {
    updates.omnicontextGitProbeEnabled = settings.gitProbeEnabled;
  }
  if (settings.autoPublish !== undefined) updates.omnicontextAutoPublish = settings.autoPublish;
  return updates;
}

export function invalidateOmniContextSettingsCache(): void {
  cachedSettings = null;
}

export async function getOmniContextSettings(): Promise<OmniContextSettings> {
  if (cachedSettings) return cachedSettings;
  const raw = (await getSettings()) as Record<string, unknown>;
  cachedSettings = normalizeOmniContextSettings(raw);
  return cachedSettings;
}

export async function saveOmniContextSettings(
  partial: Partial<OmniContextSettings>
): Promise<OmniContextSettings> {
  const updates = toOmniContextSettingsUpdates(partial);
  const raw = (await updateSettings(updates)) as Record<string, unknown>;
  cachedSettings = normalizeOmniContextSettings(raw);
  return cachedSettings;
}

/** Env override for git probe — default OFF unless explicitly enabled. */
export function isGitProbeEnvEnabled(): boolean {
  const v = process.env.OMNIROUTE_OMNICONTEXT_GIT_PROBE;
  return typeof v === "string" && /^(1|true|yes|on)$/i.test(v.trim());
}
