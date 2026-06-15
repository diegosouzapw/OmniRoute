type JsonRecord = Record<string, unknown>;
const CLAUDE_CODE_COMPATIBLE_PROVIDER_PREFIX = "anthropic-compatible-cc-";

import { normalizeExcludedModelPatterns } from "@/domain/connectionModelRules";
import { normalizeRoutingTags } from "@/domain/tagRouter";
import { normalizeOpenRouterPreset } from "@/shared/constants/openRouterPreset";

export const CODEX_REASONING_EFFORT_VALUES = ["none", "low", "medium", "high", "xhigh"] as const;

export type CodexReasoningEffort = (typeof CODEX_REASONING_EFFORT_VALUES)[number];

const CODEX_REASONING_EFFORT_SET = new Set<string>(CODEX_REASONING_EFFORT_VALUES);

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

function normalizeString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const normalized = value.trim().toLowerCase();
  return normalized || undefined;
}

const BEDROCK_REGION_PATTERN = /^[a-z]{2}(?:-gov)?-[a-z]+-\d+$/i;

function normalizeAwsRegion(value: unknown): string | undefined {
  const normalized = normalizeString(value);
  if (!normalized || !BEDROCK_REGION_PATTERN.test(normalized)) return undefined;
  return normalized;
}

function hasNonEmptyString(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function isClaudeCodeCompatibleProvider(provider: string | null | undefined): boolean {
  return (
    typeof provider === "string" && provider.startsWith(CLAUDE_CODE_COMPATIBLE_PROVIDER_PREFIX)
  );
}

export function normalizeCodexReasoningEffort(value: unknown): CodexReasoningEffort | undefined {
  const normalized = normalizeString(value);
  if (!normalized || !CODEX_REASONING_EFFORT_SET.has(normalized)) {
    return undefined;
  }
  return normalized as CodexReasoningEffort;
}

export type CodexServiceTier = "default" | "priority" | "flex";

export function normalizeCodexServiceTier(value: unknown): CodexServiceTier | undefined {
  const normalized = normalizeString(value);
  if (!normalized) return undefined;
  if (normalized === "fast" || normalized === "priority") return "priority";
  if (normalized === "default" || normalized === "flex") return normalized;
  return undefined;
}

export function normalizeClaudeCodeCompatibleContext1m(value: unknown): true | undefined {
  return value === true ? true : undefined;
}

export function normalizeClaudeCodeCompatibleRedactThinking(value: unknown): true | undefined {
  return value === true ? true : undefined;
}

export function normalizeRequestDefaults(
  provider: string | null | undefined,
  value: unknown
): JsonRecord | undefined {
  const record = asRecord(value);
  if (Object.keys(record).length === 0) return undefined;

  const normalized: JsonRecord = { ...record };

  if (provider === "codex") {
    const reasoningEffort = normalizeCodexReasoningEffort(record.reasoningEffort);
    if (reasoningEffort) {
      normalized.reasoningEffort = reasoningEffort;
    } else {
      delete normalized.reasoningEffort;
    }

    const serviceTier = normalizeCodexServiceTier(record.serviceTier);
    if (serviceTier) {
      normalized.serviceTier = serviceTier;
    } else {
      delete normalized.serviceTier;
    }
  }

  if (isClaudeCodeCompatibleProvider(provider)) {
    const context1m = normalizeClaudeCodeCompatibleContext1m(record.context1m);
    if (context1m) {
      normalized.context1m = true;
    } else {
      delete normalized.context1m;
    }

    const redactThinking = normalizeClaudeCodeCompatibleRedactThinking(record.redactThinking);
    if (redactThinking) {
      normalized.redactThinking = true;
    } else {
      delete normalized.redactThinking;
    }
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

export function normalizeProviderSpecificData(
  provider: string | null | undefined,
  value: unknown
): JsonRecord | undefined {
  const record = asRecord(value);
  if (Object.keys(record).length === 0) return undefined;

  const normalized: JsonRecord = { ...record };

  if ("requestDefaults" in normalized) {
    const requestDefaults = normalizeRequestDefaults(provider, normalized.requestDefaults);
    if (requestDefaults) {
      normalized.requestDefaults = requestDefaults;
    } else {
      delete normalized.requestDefaults;
    }
  }

  if ("openaiStoreEnabled" in normalized && typeof normalized.openaiStoreEnabled !== "boolean") {
    delete normalized.openaiStoreEnabled;
  }

  if ("blockExtraUsage" in normalized && typeof normalized.blockExtraUsage !== "boolean") {
    delete normalized.blockExtraUsage;
  }

  // #2997: per-connection transient-cooldown opt-out — only persist a real boolean.
  if ("disableCooling" in normalized && typeof normalized.disableCooling !== "boolean") {
    delete normalized.disableCooling;
  }

  if ("autoFetchModels" in normalized && typeof normalized.autoFetchModels !== "boolean") {
    delete normalized.autoFetchModels;
  }

  if ("preset" in normalized) {
    const preset = provider === "openrouter" ? normalizeOpenRouterPreset(normalized.preset) : null;
    if (preset) {
      normalized.preset = preset;
    } else {
      delete normalized.preset;
    }
  }

  if (provider === "bedrock" && "region" in normalized) {
    const region = normalizeAwsRegion(normalized.region);
    if (region) {
      normalized.region = region;
    } else {
      delete normalized.region;
    }
  }

  if ("tag" in normalized) {
    if (typeof normalized.tag === "string") {
      const trimmedTag = normalized.tag.trim();
      if (trimmedTag) {
        normalized.tag = trimmedTag;
      } else {
        delete normalized.tag;
      }
    } else {
      delete normalized.tag;
    }
  }

  if ("tags" in normalized) {
    const tags = normalizeRoutingTags(normalized.tags);
    if (tags.length > 0) {
      normalized.tags = tags;
    } else {
      delete normalized.tags;
    }
  }

  if ("excludedModels" in normalized || "excluded_models" in normalized) {
    const excludedModels = normalizeExcludedModelPatterns(
      normalized.excludedModels ?? normalized.excluded_models
    );
    if (excludedModels.length > 0) {
      normalized.excludedModels = excludedModels;
    } else {
      delete normalized.excludedModels;
    }
    delete normalized.excluded_models;
  }

  return Object.keys(normalized).length > 0 ? normalized : undefined;
}

export function sanitizeProviderSpecificDataForResponse(value: unknown): JsonRecord | undefined {
  const record = asRecord(value);
  if (Object.keys(record).length === 0) return undefined;

  const sanitized: JsonRecord = { ...record };
  delete sanitized.consoleApiKey;
  delete sanitized.secretAccessKey;
  delete sanitized.awsSecretAccessKey;
  delete sanitized.sessionToken;
  delete sanitized.awsSessionToken;
  return sanitized;
}

export function isOpenAIResponsesStoreEnabled(providerSpecificData: unknown): boolean {
  return asRecord(providerSpecificData).openaiStoreEnabled === true;
}

export function buildOpenAIStoreSessionId(sessionId: unknown): string | undefined {
  if (!hasNonEmptyString(sessionId)) return undefined;

  const normalized = String(sessionId)
    .trim()
    .replace(/^ext:/i, "")
    .replace(/[^a-zA-Z0-9._:-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);

  if (!normalized) return undefined;
  return `omniroute-session-${normalized}`;
}

export function ensureOpenAIStoreSessionFallback(
  body: Record<string, unknown>,
  sessionId: unknown
): Record<string, unknown> {
  const explicitSessionId = body.session_id;
  const explicitConversationId = body.conversation_id;
  const promptCacheKey = body.prompt_cache_key ?? body.promptCacheKey;

  if (
    hasNonEmptyString(explicitSessionId) ||
    hasNonEmptyString(explicitConversationId) ||
    hasNonEmptyString(promptCacheKey)
  ) {
    return body;
  }

  const fallbackSessionId = buildOpenAIStoreSessionId(sessionId);
  if (!fallbackSessionId) return body;

  return {
    ...body,
    session_id: fallbackSessionId,
  };
}

export function getProviderRequestDefaults(
  provider: string | null | undefined,
  providerSpecificData: unknown
): JsonRecord {
  return normalizeRequestDefaults(provider, asRecord(providerSpecificData).requestDefaults) || {};
}

export function getCodexRequestDefaults(providerSpecificData: unknown): {
  reasoningEffort?: CodexReasoningEffort;
  serviceTier?: CodexServiceTier;
} {
  const defaults = getProviderRequestDefaults("codex", providerSpecificData);
  const reasoningEffort = normalizeCodexReasoningEffort(defaults.reasoningEffort);
  const serviceTier = normalizeCodexServiceTier(defaults.serviceTier);
  return {
    ...(reasoningEffort ? { reasoningEffort } : {}),
    ...(serviceTier ? { serviceTier } : {}),
  };
}

export function getClaudeCodeCompatibleRequestDefaults(providerSpecificData: unknown): {
  context1m?: true;
  redactThinking?: true;
} {
  const defaults = getProviderRequestDefaults(
    "anthropic-compatible-cc-default",
    providerSpecificData
  );
  const context1m = normalizeClaudeCodeCompatibleContext1m(defaults.context1m);
  const redactThinking = normalizeClaudeCodeCompatibleRedactThinking(defaults.redactThinking);
  return {
    ...(context1m ? { context1m } : {}),
    ...(redactThinking ? { redactThinking } : {}),
  };
}
