import { getSettings, updateSettings } from "@/lib/db/settings";
import type {
  AutoPublishMode,
  OmniContextBackendMode,
  OmniContextEmbedSource,
  OmniContextSettings,
  UniversalHandoffSettings,
} from "./types";

export const DEFAULT_UNIVERSAL_HANDOFF_SETTINGS: UniversalHandoffSettings = {
  enabled: true,
  trigger: "on-switch",
  maxMessagesForSummary: 30,
  handoffModel: "",
  ttlMinutes: 300,
  preserveSystemPrompt: true,
};

export const DEFAULT_OMNICONTEXT_SETTINGS: OmniContextSettings = {
  enabled: false,
  injectBudgetTokens: 2000,
  retrieveTimeoutMs: 2000,
  gitProbeEnabled: false,
  autoPublish: "off",
  hybridRetrieve: false,
  embedSource: "local",
  preferStablePrefix: true,
  backend: "native",
  remoteBaseUrl: "",
  remoteApiKey: "",
  remoteTimeoutMs: 2000,
  dlpEnabled: false,
  departmentReviewRequired: true,
  universalHandoff: { ...DEFAULT_UNIVERSAL_HANDOFF_SETTINGS },
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

function normalizeBackend(value: unknown): OmniContextBackendMode {
  return value === "remote" ? "remote" : "native";
}

function normalizeEmbedSource(value: unknown): OmniContextEmbedSource {
  return value === "memory-auto" ? "memory-auto" : "local";
}

function normalizeUniversalHandoff(raw: unknown): UniversalHandoffSettings {
  const obj = raw && typeof raw === "object" ? (raw as Record<string, unknown>) : {};
  const triggerRaw = typeof obj.trigger === "string" ? obj.trigger : "on-switch";
  const trigger: UniversalHandoffSettings["trigger"] =
    triggerRaw === "always" || triggerRaw === "on-error" ? triggerRaw : "on-switch";
  return {
    enabled: toBoolean(obj.enabled, DEFAULT_UNIVERSAL_HANDOFF_SETTINGS.enabled),
    trigger,
    maxMessagesForSummary: clampInteger(
      obj.maxMessagesForSummary,
      DEFAULT_UNIVERSAL_HANDOFF_SETTINGS.maxMessagesForSummary,
      5,
      100
    ),
    handoffModel:
      typeof obj.handoffModel === "string"
        ? obj.handoffModel
        : DEFAULT_UNIVERSAL_HANDOFF_SETTINGS.handoffModel,
    ttlMinutes: clampInteger(
      obj.ttlMinutes,
      DEFAULT_UNIVERSAL_HANDOFF_SETTINGS.ttlMinutes,
      1,
      10080
    ),
    preserveSystemPrompt: toBoolean(
      obj.preserveSystemPrompt,
      DEFAULT_UNIVERSAL_HANDOFF_SETTINGS.preserveSystemPrompt
    ),
  };
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
    hybridRetrieve: toBoolean(
      rawSettings.omnicontextHybridRetrieve,
      DEFAULT_OMNICONTEXT_SETTINGS.hybridRetrieve
    ),
    embedSource: normalizeEmbedSource(rawSettings.omnicontextEmbedSource),
    preferStablePrefix: toBoolean(
      rawSettings.omnicontextPreferStablePrefix,
      DEFAULT_OMNICONTEXT_SETTINGS.preferStablePrefix
    ),
    backend: normalizeBackend(rawSettings.omnicontextBackend),
    remoteBaseUrl:
      typeof rawSettings.omnicontextRemoteBaseUrl === "string"
        ? rawSettings.omnicontextRemoteBaseUrl
        : "",
    remoteApiKey:
      typeof rawSettings.omnicontextRemoteApiKey === "string"
        ? rawSettings.omnicontextRemoteApiKey
        : "",
    remoteTimeoutMs: clampInteger(
      rawSettings.omnicontextRemoteTimeoutMs,
      DEFAULT_OMNICONTEXT_SETTINGS.remoteTimeoutMs,
      100,
      30000
    ),
    dlpEnabled: toBoolean(
      rawSettings.omnicontextDlpEnabled,
      DEFAULT_OMNICONTEXT_SETTINGS.dlpEnabled
    ),
    departmentReviewRequired: toBoolean(
      rawSettings.omnicontextDepartmentReviewRequired,
      DEFAULT_OMNICONTEXT_SETTINGS.departmentReviewRequired
    ),
    universalHandoff: normalizeUniversalHandoff(rawSettings.omnicontextUniversalHandoff),
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
  if (settings.hybridRetrieve !== undefined) {
    updates.omnicontextHybridRetrieve = settings.hybridRetrieve;
  }
  if (settings.embedSource !== undefined) {
    updates.omnicontextEmbedSource = settings.embedSource;
  }
  if (settings.preferStablePrefix !== undefined) {
    updates.omnicontextPreferStablePrefix = settings.preferStablePrefix;
  }
  if (settings.backend !== undefined) updates.omnicontextBackend = settings.backend;
  if (settings.remoteBaseUrl !== undefined) {
    updates.omnicontextRemoteBaseUrl = settings.remoteBaseUrl;
  }
  if (settings.remoteApiKey !== undefined) {
    updates.omnicontextRemoteApiKey = settings.remoteApiKey;
  }
  if (settings.remoteTimeoutMs !== undefined) {
    updates.omnicontextRemoteTimeoutMs = settings.remoteTimeoutMs;
  }
  if (settings.dlpEnabled !== undefined) updates.omnicontextDlpEnabled = settings.dlpEnabled;
  if (settings.departmentReviewRequired !== undefined) {
    updates.omnicontextDepartmentReviewRequired = settings.departmentReviewRequired;
  }
  if (settings.universalHandoff !== undefined) {
    updates.omnicontextUniversalHandoff = settings.universalHandoff;
  }
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
