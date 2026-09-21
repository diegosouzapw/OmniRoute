import { z } from "zod";
import {
  OPENROUTER_PRESET_MAX_LENGTH,
  isOpenRouterPresetValue,
} from "@/shared/constants/openRouterPreset";

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

const CODEX_REASONING_EFFORT_VALUES = new Set(["none", "low", "medium", "high", "xhigh", "max"]);
const REQUEST_DEFAULT_SERVICE_TIER_VALUES = new Set(["default", "priority", "fast", "flex"]);
const CODEX_FINGERPRINT_MODE_VALUES = new Set(["off", "device", "session", "full"]);
const CACHE_PASSTHROUGH_VALUES = new Set(["strip", "openai-format", "claude-format"]);
const PEAK_HOUR_PROTECTION_MODES = new Set(["block", "avoid"]);
const PEAK_HOUR_PROTECTION_DAYS = new Set(["mon", "tue", "wed", "thu", "fri", "sat", "sun"]);
export const MAX_PROVIDER_SPECIFIC_TIMEOUT_MS = 86_400_000; // 24h — operator cap, anti-DoS

// #6880 — per-connection prompt-cache capability override, extracted so
// validateProviderSpecificData() stays under the complexity gate.
function validatePeakHourProtectionBlock(value: unknown, ctx: z.RefinementCtx): void {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.peakHourProtection must be an object",
      path: ["peakHourProtection"],
    });
    return;
  }
  const record = value as Record<string, unknown>;
  if (record.enabled !== undefined && typeof record.enabled !== "boolean") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.peakHourProtection.enabled must be a boolean",
      path: ["peakHourProtection", "enabled"],
    });
  }
  if (record.mode !== undefined && !PEAK_HOUR_PROTECTION_MODES.has(String(record.mode))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.peakHourProtection.mode must be block or avoid",
      path: ["peakHourProtection", "mode"],
    });
  }
  if (!Array.isArray(record.windows)) return;
  if (record.windows.length > 16) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.peakHourProtection.windows supports at most 16 windows",
      path: ["peakHourProtection", "windows"],
    });
  }
  record.windows.slice(0, 16).forEach((window, index) => {
    if (!window || typeof window !== "object" || Array.isArray(window)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "peak-hour windows must be objects",
        path: ["peakHourProtection", "windows", index],
      });
      return;
    }
    const entry = window as Record<string, unknown>;
    for (const key of ["startUtc", "endUtc"] as const) {
      if (typeof entry[key] !== "string" || !/^\d{1,2}:\d{2}$/.test(entry[key])) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `providerSpecificData.peakHourProtection.windows.${key} must be HH:MM UTC`,
          path: ["peakHourProtection", "windows", index, key],
        });
      }
    }
    if (entry.days !== undefined) {
      if (!Array.isArray(entry.days)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "providerSpecificData.peakHourProtection.windows.days must be an array",
          path: ["peakHourProtection", "windows", index, "days"],
        });
      } else if (entry.days.some((day) => !PEAK_HOUR_PROTECTION_DAYS.has(String(day)))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "providerSpecificData.peakHourProtection.windows.days contains an invalid day",
          path: ["peakHourProtection", "windows", index, "days"],
        });
      }
    }
  });
}

function validateCacheBlock(data: Record<string, unknown>, ctx: z.RefinementCtx): void {
  const cache = data.cache;
  if (cache === undefined) return;
  if (!cache || typeof cache !== "object" || Array.isArray(cache)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.cache must be an object",
      path: ["cache"],
    });
    return;
  }
  const cacheRecord = cache as Record<string, unknown>;
  const supportsPromptCaching = cacheRecord.supportsPromptCaching;
  if (supportsPromptCaching !== undefined && typeof supportsPromptCaching !== "boolean") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.cache.supportsPromptCaching must be a boolean",
      path: ["cache", "supportsPromptCaching"],
    });
  }
  const cacheControlPassthrough = cacheRecord.cacheControlPassthrough;
  if (
    cacheControlPassthrough !== undefined &&
    (typeof cacheControlPassthrough !== "string" ||
      !CACHE_PASSTHROUGH_VALUES.has(cacheControlPassthrough))
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        'providerSpecificData.cache.cacheControlPassthrough must be one of "strip", "openai-format", "claude-format"',
      path: ["cache", "cacheControlPassthrough"],
    });
  }
}

/**
 * gheUrl must parse and use HTTPS. Shared by the Zod refinement above and by the
 * OAuth route's raw entry points (searchParams / device-flow extraData), so a
 * malformed or non-HTTPS enterprise URL is rejected before any upstream fetch.
 */
export function isValidGheUrl(raw: string): boolean {
  try {
    return new URL(raw).protocol === "https:";
  } catch {
    return false;
  }
}

export function validateProviderSpecificData(
  data: Record<string, unknown> | undefined,
  ctx: z.RefinementCtx
): void {
  if (!data) return;

  const gheUrl = data.gheUrl;
  if (gheUrl !== undefined) {
    if (typeof gheUrl !== "string") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "providerSpecificData.gheUrl must be a string",
        path: ["gheUrl"],
      });
    } else {
      try {
        const parsed = new URL(gheUrl);
        if (parsed.protocol !== "https:") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "providerSpecificData.gheUrl must use HTTPS",
            path: ["gheUrl"],
          });
        }
      } catch {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "providerSpecificData.gheUrl must be a valid HTTPS URL",
          path: ["gheUrl"],
        });
      }
    }
  }

  const baseUrl = data.baseUrl;
  if (baseUrl !== undefined && (typeof baseUrl !== "string" || !isHttpUrl(baseUrl))) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.baseUrl must be a valid http(s) URL",
      path: ["baseUrl"],
    });
  }

  const customUserAgent = data.customUserAgent;
  if (
    customUserAgent !== undefined &&
    customUserAgent !== null &&
    (typeof customUserAgent !== "string" || customUserAgent.length > 500)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.customUserAgent must be a string up to 500 chars",
      path: ["customUserAgent"],
    });
  }

  const cx = data.cx;
  if (cx !== undefined && cx !== null && (typeof cx !== "string" || cx.length > 500)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.cx must be a string up to 500 chars",
      path: ["cx"],
    });
  }

  const region = data.region;
  if (
    region !== undefined &&
    region !== null &&
    (typeof region !== "string" || region.length > 64)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.region must be a string up to 64 chars",
      path: ["region"],
    });
  }

  const openaiStoreEnabled = data.openaiStoreEnabled;
  if (openaiStoreEnabled !== undefined && typeof openaiStoreEnabled !== "boolean") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.openaiStoreEnabled must be a boolean",
      path: ["openaiStoreEnabled"],
    });
  }

  const codexFingerprintMode = data.codexFingerprintMode;
  if (codexFingerprintMode !== undefined && codexFingerprintMode !== null) {
    const normalized =
      typeof codexFingerprintMode === "string" ? codexFingerprintMode.trim().toLowerCase() : "";
    if (normalized && !CODEX_FINGERPRINT_MODE_VALUES.has(normalized)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "providerSpecificData.codexFingerprintMode must be one of off, device, session, full",
        path: ["codexFingerprintMode"],
      });
    }
  }

  const preserveEncryptedReasoning = data.preserveEncryptedReasoning;
  if (preserveEncryptedReasoning !== undefined && typeof preserveEncryptedReasoning !== "boolean") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.preserveEncryptedReasoning must be a boolean",
      path: ["preserveEncryptedReasoning"],
    });
  }

  const blockExtraUsage = data.blockExtraUsage;
  if (blockExtraUsage !== undefined && typeof blockExtraUsage !== "boolean") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.blockExtraUsage must be a boolean",
      path: ["blockExtraUsage"],
    });
  }

  const peakHourProtection = data.peakHourProtection;
  if (peakHourProtection !== undefined && peakHourProtection !== null) {
    validatePeakHourProtectionBlock(peakHourProtection, ctx);
  }

  const autoFetchModels = data.autoFetchModels;
  if (autoFetchModels !== undefined && typeof autoFetchModels !== "boolean") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.autoFetchModels must be a boolean",
      path: ["autoFetchModels"],
    });
  }

  const disableStreamOptions = data.disableStreamOptions;
  if (disableStreamOptions !== undefined && typeof disableStreamOptions !== "boolean") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.disableStreamOptions must be a boolean",
      path: ["disableStreamOptions"],
    });
  }

  const preset = data.preset;
  if (preset !== undefined && preset !== null && !isOpenRouterPresetValue(preset)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `providerSpecificData.preset must be a string up to ${OPENROUTER_PRESET_MAX_LENGTH} chars`,
      path: ["preset"],
    });
  }

  const requestDefaults = data.requestDefaults;
  if (requestDefaults !== undefined) {
    if (!requestDefaults || typeof requestDefaults !== "object" || Array.isArray(requestDefaults)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "providerSpecificData.requestDefaults must be an object",
        path: ["requestDefaults"],
      });
    } else {
      const requestDefaultsRecord = requestDefaults as Record<string, unknown>;
      const reasoningEffort = requestDefaultsRecord.reasoningEffort;
      if (
        reasoningEffort !== undefined &&
        reasoningEffort !== null &&
        (typeof reasoningEffort !== "string" ||
          !CODEX_REASONING_EFFORT_VALUES.has(reasoningEffort.trim().toLowerCase()))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "providerSpecificData.requestDefaults.reasoningEffort must be one of none, low, medium, high, xhigh, max",
          path: ["requestDefaults", "reasoningEffort"],
        });
      }

      const serviceTier = requestDefaultsRecord.serviceTier;
      if (
        serviceTier !== undefined &&
        serviceTier !== null &&
        (typeof serviceTier !== "string" ||
          !REQUEST_DEFAULT_SERVICE_TIER_VALUES.has(serviceTier.trim().toLowerCase()))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "providerSpecificData.requestDefaults.serviceTier must be one of default, priority, fast, flex when provided",
          path: ["requestDefaults", "serviceTier"],
        });
      }

      for (const booleanKey of ["context1m", "redactThinking", "summarizeThinking"] as const) {
        const value = requestDefaultsRecord[booleanKey];
        if (value === undefined || value === null || typeof value === "boolean") continue;
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `providerSpecificData.requestDefaults.${booleanKey} must be a boolean`,
          path: ["requestDefaults", booleanKey],
        });
      }
    }
  }

  validateCacheBlock(data, ctx);

  const consoleApiKey = data.consoleApiKey;
  if (consoleApiKey !== undefined && consoleApiKey !== null && typeof consoleApiKey !== "string") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.consoleApiKey must be a string",
      path: ["consoleApiKey"],
    });
  }
  if (typeof consoleApiKey === "string" && consoleApiKey.length > 10000) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.consoleApiKey must be at most 10000 characters",
      path: ["consoleApiKey"],
    });
  }

  const newApiUserId = data.newApiUserId;
  if (newApiUserId !== undefined && newApiUserId !== null && typeof newApiUserId !== "string") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.newApiUserId must be a string",
      path: ["newApiUserId"],
    });
  }
  if (typeof newApiUserId === "string" && newApiUserId.length > 256) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.newApiUserId must be at most 256 characters",
      path: ["newApiUserId"],
    });
  }

  for (const key of ["openCodeGoWorkspaceId", "opencodeGoWorkspaceId", "workspaceId"] as const) {
    const value = data[key];
    if (value !== undefined && value !== null && typeof value !== "string") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `providerSpecificData.${key} must be a string`,
        path: [key],
      });
    }
    if (typeof value === "string" && value.length > 1000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `providerSpecificData.${key} must be at most 1000 characters`,
        path: [key],
      });
    }
  }

  for (const key of [
    "openCodeGoAuthCookie",
    "opencodeGoAuthCookie",
    "authCookie",
    "ollamaUsageCookie",
    "ollamaCloudUsageCookie",
    "ollamaCloudCookie",
    "usageCookie",
    "alibabaConsoleCookie",
    "alibabaConsoleSecToken",
    "qwenCloudCookie",
    "qwenCloudSecToken",
    "volcConsoleCookie",
  ] as const) {
    const value = data[key];
    if (value !== undefined && value !== null && typeof value !== "string") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `providerSpecificData.${key} must be a string`,
        path: [key],
      });
    }
    if (typeof value === "string" && value.length > 10000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `providerSpecificData.${key} must be at most 10000 characters`,
        path: [key],
      });
    }
  }

  for (const key of [
    "glmOrganizationId",
    "bigmodelOrganization",
    "glmOrganization",
    "glmProjectId",
    "bigmodelProject",
    "glmProject",
  ] as const) {
    const value = data[key];
    if (value !== undefined && value !== null && typeof value !== "string") {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `providerSpecificData.${key} must be a string`,
        path: [key],
      });
    }
    if (typeof value === "string" && value.length > 200) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `providerSpecificData.${key} must be at most 200 characters`,
        path: [key],
      });
    }
  }

  const glmOrganizationId =
    (typeof data.glmOrganizationId === "string" && data.glmOrganizationId.trim()) ||
    (typeof data.bigmodelOrganization === "string" && data.bigmodelOrganization.trim()) ||
    (typeof data.glmOrganization === "string" && data.glmOrganization.trim()) ||
    "";
  const glmProjectId =
    (typeof data.glmProjectId === "string" && data.glmProjectId.trim()) ||
    (typeof data.bigmodelProject === "string" && data.bigmodelProject.trim()) ||
    (typeof data.glmProject === "string" && data.glmProject.trim()) ||
    "";
  if (Boolean(glmOrganizationId) !== Boolean(glmProjectId)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message:
        "providerSpecificData.glmOrganizationId and glmProjectId must both be set for GLM team plan quota",
      path: glmOrganizationId ? ["glmProjectId"] : ["glmOrganizationId"],
    });
  }

  const groupTag = data.tag;
  if (
    groupTag !== undefined &&
    groupTag !== null &&
    (typeof groupTag !== "string" || groupTag.length > 100)
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.tag must be a string up to 100 chars",
      path: ["tag"],
    });
  }

  const routingTags = data.tags;
  if (routingTags !== undefined && routingTags !== null) {
    if (!Array.isArray(routingTags) || routingTags.length > 50) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "providerSpecificData.tags must be an array with at most 50 items",
        path: ["tags"],
      });
    } else if (
      routingTags.some(
        (tag) => typeof tag !== "string" || tag.trim().length === 0 || tag.trim().length > 64
      )
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "providerSpecificData.tags must contain non-empty strings up to 64 characters each",
        path: ["tags"],
      });
    }
  }

  const excludedModels = data.excludedModels ?? data.excluded_models;
  if (excludedModels !== undefined && excludedModels !== null) {
    if (typeof excludedModels === "string") {
      if (excludedModels.length > 5000) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "providerSpecificData.excludedModels string must be up to 5000 chars",
          path: ["excludedModels"],
        });
      }
    } else if (!Array.isArray(excludedModels) || excludedModels.length > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "providerSpecificData.excludedModels must be an array with at most 100 items",
        path: ["excludedModels"],
      });
    } else if (
      excludedModels.some(
        (pattern) =>
          typeof pattern !== "string" ||
          pattern.trim().length === 0 ||
          pattern.trim().length > 200 ||
          pattern.trim() === "**"
      )
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "providerSpecificData.excludedModels must contain non-empty patterns up to 200 characters",
        path: ["excludedModels"],
      });
    }
  }

  const clientProfile = data.clientProfile;
  if (clientProfile !== undefined && clientProfile !== null) {
    const normalized = typeof clientProfile === "string" ? clientProfile.trim().toLowerCase() : "";
    if (typeof clientProfile !== "string" || !["ide", "cli"].includes(normalized)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "providerSpecificData.clientProfile must be ide or cli",
        path: ["clientProfile"],
      });
    }
  }

  const newApiAggregatorBalance = data.newApiAggregatorBalance;
  if (
    newApiAggregatorBalance !== undefined &&
    newApiAggregatorBalance !== null &&
    typeof newApiAggregatorBalance !== "boolean"
  ) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.newApiAggregatorBalance must be a boolean",
      path: ["newApiAggregatorBalance"],
    });
  }

  const quotaPerUnit = data.quotaPerUnit;
  if (quotaPerUnit !== undefined && quotaPerUnit !== null) {
    if (typeof quotaPerUnit !== "number" || !Number.isFinite(quotaPerUnit) || quotaPerUnit <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "providerSpecificData.quotaPerUnit must be a positive number",
        path: ["quotaPerUnit"],
      });
    }
  }

  // Per-connection operator timeout tier: a slow model must not monopolize an
  // executor slot indefinitely. Bounded to 24h (anti-DoS); below 1ms is
  // meaningless.
  const timeoutMs = data.timeoutMs;
  if (timeoutMs !== undefined && timeoutMs !== null) {
    if (
      typeof timeoutMs !== "number" ||
      !Number.isInteger(timeoutMs) ||
      timeoutMs < 1 ||
      timeoutMs > MAX_PROVIDER_SPECIFIC_TIMEOUT_MS
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `providerSpecificData.timeoutMs must be an integer between 1 and ${MAX_PROVIDER_SPECIFIC_TIMEOUT_MS}`,
        path: ["timeoutMs"],
      });
    }
  }
}
