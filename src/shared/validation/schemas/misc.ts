import { z } from "zod";
import {
  ACCOUNT_FALLBACK_STRATEGY_VALUES,
  ROUTING_STRATEGY_VALUES,
} from "@/shared/constants/routingStrategies";
import { SUPPORTED_BATCH_ENDPOINTS } from "@/shared/constants/batchEndpoints";
import { MAX_REQUEST_BODY_LIMIT_MB, MIN_REQUEST_BODY_LIMIT_MB } from "@/shared/constants/bodySize";
import { COMBO_CONFIG_MODES } from "@/shared/constants/comboConfigMode";
import { providerAllowsOptionalApiKey } from "@/shared/constants/providers";
import { HIDEABLE_SIDEBAR_ITEM_IDS } from "@/shared/constants/sidebarVisibility";
import {
  isForbiddenUpstreamHeaderName,
  isForbiddenCustomHeaderName,
} from "@/shared/constants/upstreamHeaders";
import { MAX_TIMER_TIMEOUT_MS } from "@/shared/utils/runtimeTimeouts";


export function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export const CODEX_REASONING_EFFORT_VALUES = new Set(["none", "low", "medium", "high", "xhigh"]);

export const REQUEST_DEFAULT_SERVICE_TIER_VALUES = new Set(["default", "priority", "fast", "flex"]);

// ──── Auth Schemas ────

export const loginSchema = z.object({
  password: z.string().min(1, "Password is required").max(200),
});

export const dbBackupCleanupSchema = z.object({
  keepLatest: z.number().int().min(1).max(200).optional(),
  retentionDays: z.number().int().min(0).max(3650).optional(),
});

// ──── API Route Payload Schemas (T06) ────

export const modelIdSchema = z.string().trim().min(1, "Model is required").max(200);

export const nonEmptyStringSchema = z.string().trim().min(1, "Field is required");

export const policyActionSchema = z
  .object({
    action: z.enum(["unlock"]),
    identifier: z.string().trim().min(1).optional(),
  })
  .superRefine((value, ctx) => {
    if (value.action === "unlock" && !value.identifier) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "identifier is required for unlock action",
        path: ["identifier"],
      });
    }
  });

/** Align with `sanitizeUpstreamHeadersMap` — allow non-ASCII names; reject Host / hop-by-hop / whitespace / ":". */
export const upstreamHeaderNameSchema = z
  .string()
  .trim()
  .min(1)
  .max(128)
  .refine((s) => !/[\r\n\0]/.test(s), { message: "header name cannot contain control characters" })
  .refine((s) => !/\s/.test(s), { message: "header name cannot contain whitespace" })
  .refine((s) => !s.includes(":"), { message: "header name cannot contain ':'" })
  .refine((s) => !isForbiddenUpstreamHeaderName(s), { message: "header name is not allowed" });

export const upstreamHeaderValueSchema = z
  .string()
  .max(4096)
  .refine((s) => !/[\r\n]/.test(s), { message: "header value cannot contain line breaks" });

export const upstreamHeadersRecordSchema = z
  .record(upstreamHeaderNameSchema, upstreamHeaderValueSchema)
  .refine((rec) => Object.keys(rec).length <= 16, { message: "at most 16 custom headers" })
  .refine((rec) => !Object.keys(rec).some((k) => isForbiddenUpstreamHeaderName(k)), {
    message: "forbidden header name in record",
  });

export const modelCompatPerProtocolSchema = z
  .object({
    normalizeToolCallId: z.boolean().optional(),
    preserveOpenAIDeveloperRole: z.boolean().optional(),
    upstreamHeaders: upstreamHeadersRecordSchema.optional(),
  })
  .strict();

export const toggleRateLimitSchema = z.object({
  connectionId: z.string().trim().min(1, "connectionId is required"),
  enabled: z.boolean(),
});

export const jsonObjectSchema = z.record(z.string(), z.unknown());

export const resetStatsActionSchema = z.object({
  action: z.literal("reset-stats"),
});

export const ipFilterModeSchema = z.enum(["blacklist", "whitelist"]);

export const tempBanSchema = z.object({
  ip: z.string().trim().min(1),
  durationMs: z.coerce.number().int().min(1).optional(),
  reason: z.string().max(200).optional(),
});

export const updateIpFilterSchema = z
  .object({
    enabled: z.boolean().optional(),
    mode: ipFilterModeSchema.optional(),
    blacklist: z.array(z.string()).optional(),
    whitelist: z.array(z.string()).optional(),
    addBlacklist: z.string().optional(),
    removeBlacklist: z.string().optional(),
    addWhitelist: z.string().optional(),
    removeWhitelist: z.string().optional(),
    tempBan: tempBanSchema.optional(),
    removeBan: z.string().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (Object.keys(value).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }
  });

export const jsonRecordSchema = z.record(z.string(), z.unknown());

export const nonEmptyJsonRecordSchema = jsonRecordSchema.refine(
  (value) => Object.keys(value).length > 0,
  "Body must be a non-empty object"
);

export const dbBackupRestoreSchema = z.object({
  backupId: z.string().trim().min(1, "backupId is required"),
});

export const accessScheduleSchema = z.object({
  enabled: z.boolean(),
  from: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  until: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format"),
  days: z.array(z.number().int().min(0).max(6)).min(1, "At least one day is required").max(7),
  tz: z.string().min(1).max(100),
});

// Reuse the canonical upstream-headers record schema (control-char / whitespace
// / ":" / 128-name / 4096-value / max-16 guards) so per-provider custom headers
// inherit the same hardening as `modelCompat.upstreamHeaders` — then additionally
// reject auth header names (the credential layer owns those; the executor drops
// them at send time, so reject up front for an actionable error instead of a
// silent no-op). Single denylist source: isForbiddenCustomHeaderName.
export const customHeadersSchema = upstreamHeadersRecordSchema
  .refine((rec) => !Object.keys(rec).some((k) => isForbiddenCustomHeaderName(k)), {
    message:
      "Custom headers cannot include hop-by-hop, framing, or auth headers " +
      "(authorization / x-api-key / x-goog-api-key / api-key)",
  })
  .nullable()
  .optional();

export const codexProfileNameSchema = z.object({
  name: z.string().trim().min(1, "Profile name is required"),
});

export const codexProfileIdSchema = z.object({
  // profileId is interpolated into a filesystem path (`<PROFILES_DIR>/<id>.json`).
  // Constrain to a safe slug charset so request bodies cannot smuggle path
  // separators or `..` segments and escape PROFILES_DIR (path traversal).
  profileId: z
    .string()
    .trim()
    .min(1, "profileId is required")
    .regex(/^[a-zA-Z0-9._-]+$/, "profileId contains invalid characters")
    .refine((v) => v !== "." && v !== "..", "profileId is invalid"),
});

export const versionManagerToolSchema = z.object({
  tool: z.string().trim().min(1),
});

export const versionManagerInstallSchema = versionManagerToolSchema.extend({
  version: z.string().trim().optional(),
});

// ── Zed Credential Import Flow ──────────────────────────────────────────────────

export const confirmedAccountSchema = z.object({
  service: z.string().min(1).max(500),
  account: z.string().min(1).max(500),
  fingerprint: z.string().min(1).max(100),
});

export type ConfirmedAccount = z.infer<typeof confirmedAccountSchema>;