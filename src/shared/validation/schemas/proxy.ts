import { z } from "zod";
import { partialWithoutDefaults } from "@/shared/validation/partialWithoutDefaults";
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
import { PROXY_REGISTRY_STATUS_VALUES } from "@/shared/constants/proxyRegistryStatus";

export const proxyConfigSchema = z
  .object({
    type: z
      .preprocess(
        (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
        z.enum(["http", "https", "socks5"])
      )
      .optional(),
    host: z.string().trim().min(1).optional(),
    port: z.coerce.number().int().min(1).max(65535).optional(),
    username: z.string().optional(),
    password: z.string().optional(),
  })
  .strict();

export const updateProxyConfigSchema = z
  .object({
    proxy: proxyConfigSchema.nullable().optional(),
    global: proxyConfigSchema.nullable().optional(),
    providers: z.record(z.string().trim().min(1), proxyConfigSchema.nullable()).optional(),
    combos: z.record(z.string().trim().min(1), proxyConfigSchema.nullable()).optional(),
    keys: z.record(z.string().trim().min(1), proxyConfigSchema.nullable()).optional(),
    level: z.enum(["global", "provider", "combo", "key"]).optional(),
    id: z.string().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    const hasPayload =
      value.proxy !== undefined ||
      value.global !== undefined ||
      value.providers !== undefined ||
      value.combos !== undefined ||
      value.keys !== undefined ||
      value.level !== undefined;

    if (!hasPayload) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "No valid fields to update",
        path: [],
      });
    }

    if (value.level !== undefined && value.proxy === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "proxy is required when level is provided",
        path: ["proxy"],
      });
    }

    if (value.level && value.level !== "global" && !value.id?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "id is required for provider/combo/key level updates",
        path: ["id"],
      });
    }
  });

export const testProxySchema = z.object({
  proxy: z.object({
    type: z.string().optional(),
    host: z.string().trim().min(1, "proxy.host is required"),
    port: z.union([z.string(), z.number()]),
    username: z.string().optional(),
    password: z.string().optional(),
  }),
});

export const SCOPE_ID_REQUIRED_NON_GLOBAL_SCOPE = "scopeId is required for non-global scope";
export const SCOPE_ID_REQUIRED_SCOPED = "scopeId is required for provider/account/combo/key scope";

// Shared refinement: a non-global scope requires a non-blank scopeId.
// The message stays per call-site (frozen 400 contract), never unified.
export function requireScopeIdForNonGlobal(message: string) {
  return (value: { scope: string; scopeId?: string | null }, ctx: z.RefinementCtx) => {
    if (value.scope !== "global" && !value.scopeId?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message,
        path: ["scopeId"],
      });
    }
  };
}

export const inlineProxyAssignmentSchema = z
  .object({
    scope: z.enum(["global", "provider", "account", "combo", "key"]),
    scopeId: z.string().trim().nullable().optional(),
  })
  .strict()
  .superRefine(requireScopeIdForNonGlobal(SCOPE_ID_REQUIRED_NON_GLOBAL_SCOPE));

export const proxyRegistryFieldsSchema = z
  .object({
    name: z.string().trim().min(1, "name is required").max(120),
    type: z
      .preprocess(
        (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
        z.enum(["http", "https", "socks5", "vercel", "deno", "cloudflare"])
      )
      .optional(),
    host: z.string().trim().min(1, "host is required").max(255),
    port: z.coerce.number().int().min(1).max(65535),
    username: z.string().optional(),
    password: z.string().optional(),
    region: z.string().trim().max(64).nullable().optional(),
    notes: z.string().trim().max(1000).nullable().optional(),
    // No default: zod 4 applies it under .partial() too, which rewrote the stored status
    // on every update or import that omitted it. New rows still start active in the DB.
    status: z.enum(PROXY_REGISTRY_STATUS_VALUES).optional(),
    source: z
      .enum([
        "manual",
        "oneproxy",
        "dashboard-custom",
        "vercel-relay",
        "deno-relay",
        "cloudflare-relay",
      ])
      .optional(),
    // Address-family egress policy (#3777): "auto" keeps the prior dual-stack behavior;
    // "ipv4"/"ipv6" pin the connection to that family (no v4 leak under an IPv6-only proxy).
    // Defaulted to "auto" only by createProxyRegistrySchema: an update or a re-import that
    // omits it keeps the stored family.
    family: z.enum(["auto", "ipv4", "ipv6"]).optional(),
  })
  .strict();

export const createProxyRegistrySchema = proxyRegistryFieldsSchema
  .extend({
    type: z
      .preprocess(
        (value) => (typeof value === "string" ? value.trim().toLowerCase() : value),
        z.enum(["http", "https", "socks5", "vercel", "deno", "cloudflare"])
      )
      .optional()
      .default("http"),
    family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
    assignment: inlineProxyAssignmentSchema.optional(),
  })
  .strict();

export const updateProxyRegistrySchema = partialWithoutDefaults(proxyRegistryFieldsSchema)
  .extend({
    id: z.string().trim().min(1, "id is required"),
    assignment: inlineProxyAssignmentSchema.optional(),
  })
  .strict();

export const bulkImportProxiesSchema = z
  .object({
    items: z
      .array(proxyRegistryFieldsSchema)
      .min(1, "At least one proxy is required")
      .max(100, "Maximum 100 proxies per import"),
  })
  .strict();

export const proxyAssignmentSchema = z
  .object({
    scope: z.enum(["global", "provider", "account", "combo", "key"]),
    scopeId: z.string().trim().nullable().optional(),
    proxyId: z.string().trim().nullable().optional(),
  })
  .strict()
  .superRefine(requireScopeIdForNonGlobal(SCOPE_ID_REQUIRED_SCOPED));

export const bulkProxyAssignmentSchema = z
  .object({
    scope: z.enum(["global", "provider", "account", "combo", "key"]),
    scopeIds: z.array(z.string().trim().min(1)).optional().default([]),
    proxyId: z.string().trim().nullable().optional(),
  })
  .strict()
  .superRefine((value, ctx) => {
    if (
      value.scope !== "global" &&
      (!Array.isArray(value.scopeIds) || value.scopeIds.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "scopeIds is required for provider/account/combo/key scope",
        path: ["scopeIds"],
      });
    }
  });

// #6365 proxy pools — a scope may hold MULTIPLE proxies (a rotation pool). These
// schemas gate the pool-membership add/remove and the per-scope rotation strategy.
// Kept in lockstep with `ProxyRotationStrategy` in src/lib/db/proxies/types.ts.
export const PROXY_POOL_ROTATION_STRATEGY_VALUES = [
  "round-robin",
  "random",
  "sticky",
  "latency",
] as const;

// Add/remove one proxy to/from a scope's pool. proxyId is REQUIRED (unlike the
// single-assign schema where a null proxyId clears the assignment).
export const proxyPoolMemberSchema = z
  .object({
    scope: z.enum(["global", "provider", "account", "combo", "key"]),
    scopeId: z.string().trim().nullable().optional(),
    proxyId: z.string().trim().min(1, "proxyId is required"),
  })
  .strict()
  .superRefine(requireScopeIdForNonGlobal(SCOPE_ID_REQUIRED_SCOPED));

// GET /api/settings/proxies/pool/egress-observation query (#13581). Same scope vocabulary and
// scopeId rule as the pool routes: an unknown scope is rejected, never read as "global".
export const proxyPoolEgressObservationQuerySchema = z
  .object({
    scope: z.enum(["global", "provider", "account", "combo", "key"]),
    scopeId: z.string().trim().max(256).nullable().optional(),
  })
  .superRefine(requireScopeIdForNonGlobal(SCOPE_ID_REQUIRED_SCOPED));

// Set a scope pool's rotation strategy. Optional sticky window (minutes) only
// applies to the `sticky` strategy; ignored otherwise.
export const proxyRotationStrategySchema = z
  .object({
    scope: z.enum(["global", "provider", "account", "combo", "key"]),
    scopeId: z.string().trim().nullable().optional(),
    strategy: z.enum(PROXY_POOL_ROTATION_STRATEGY_VALUES),
    stickyWindowMinutes: z.number().int().min(1).max(1440).optional(),
  })
  .strict()
  .superRefine(requireScopeIdForNonGlobal(SCOPE_ID_REQUIRED_SCOPED));
