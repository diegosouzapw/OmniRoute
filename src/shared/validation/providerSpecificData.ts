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

const CODEX_REASONING_EFFORT_VALUES = new Set(["none", "low", "medium", "high", "xhigh"]);
const REQUEST_DEFAULT_SERVICE_TIER_VALUES = new Set(["default", "priority", "fast", "flex"]);

export function validateProviderSpecificData(
  data: Record<string, unknown> | undefined,
  ctx: z.RefinementCtx
): void {
  if (!data) return;

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

  const blockExtraUsage = data.blockExtraUsage;
  if (blockExtraUsage !== undefined && typeof blockExtraUsage !== "boolean") {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "providerSpecificData.blockExtraUsage must be a boolean",
      path: ["blockExtraUsage"],
    });
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
            "providerSpecificData.requestDefaults.reasoningEffort must be one of none, low, medium, high, xhigh",
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
    if (
      typeof clientProfile !== "string" ||
      !["ide", "harness", "cli", "sdk"].includes(normalized)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "providerSpecificData.clientProfile must be ide, harness, cli, or sdk (cli/sdk map to harness)",
        path: ["clientProfile"],
      });
    }
  }
}
