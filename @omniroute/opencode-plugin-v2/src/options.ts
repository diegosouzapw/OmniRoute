import { z } from "zod";

import { DEFAULT_MODEL_CACHE_TTL_MS } from "./cache.js";
import type { ResolvedOptions } from "./catalog.js";
import { isHttpUrl } from "./shared/models-map.js";

const apiFormatSchema = z
  .object({
    allowAnthropic: z.boolean().optional(),
    anthropicModels: z.array(z.string()).optional(),
    // Deprecated v1 prefix list. Accepted (warn at resolve time) so copied
    // v1 configs keep routing; prefer anthropicModels (full IDs).
    anthropicPrefixes: z.array(z.string()).optional(),
  })
  .strict();

const timeoutsSchema = z
  .object({
    models: z.number().positive().optional(),
    combos: z.number().positive().optional(),
    autoCombos: z.number().positive().optional(),
    enrichment: z.number().positive().optional(),
  })
  .strict();

const pluginOptionsSchema = z
  .object({
    // Reaches a filesystem path (the on-disk catalog snapshot) and the
    // catalog keys, so it is bounded here rather than escaped at each use.
    providerId: z
      .string()
      .regex(/^[A-Za-z0-9._-]+$/, "providerId may only contain letters, digits, '.', '_' and '-'")
      .refine((v) => v !== "." && v !== "..", "providerId cannot be a path segment")
      .default("omniroute"),
    baseURL: z
      .string()
      .trim()
      .refine(isHttpUrl, "baseURL must be an http(s) URL, for example http://localhost:20128"),
    apiKey: z.string().optional(),
    displayName: z.string().optional(),
    managementReadToken: z.string().optional(),
    timeoutMs: z.number().positive().default(10000),
    timeouts: timeoutsSchema.optional(),
    logLevel: z.enum(["error", "warn", "info", "debug"]).optional(),
    startupDebug: z.boolean().optional(),
    modelCacheTtlMs: z.number().positive().optional(),
    visibleModels: z.array(z.string()).optional(),
    hiddenModels: z.array(z.string()).optional(),
    providersAllow: z.array(z.string()).optional(),
    usableOnly: z.boolean().default(false),
    freeOnly: z.boolean().default(false),
    toolsOnly: z.boolean().default(false),
    visionOnly: z.boolean().default(false),
    // Per-provider showcase size: how many models each provider keeps in
    // the default view. Absent means the catalog default below.
    showcasePerOwner: z.number().positive().optional(),
    freshPerOwner: z.number().positive().optional(),
    // Freshness window in days: entries dated within it publish via the
    // fresh branch. Absent means the catalog default below.
    freshWindowDays: z.number().positive().optional(),
    // Restore statically dropped entries named by 30-day usage analytics.
    // On by default; needs a management token.
    usageMemory: z.boolean().optional(),
    // v1 parity: enrichment overlay on by default (names + pricing).
    enrichment: z.boolean().default(true),
    // v1 parity: strip the JSON-Schema keywords Gemini rejects from tool
    // declarations bound for a Gemini model. On by default — leaving them in
    // fails the whole request with 400 INVALID_ARGUMENT.
    geminiSanitization: z.boolean().default(true),
    // v1 parity: prefix a model's display name with the upstream provider it
    // routes to, so the same model sold through two connections is
    // distinguishable in the picker.
    providerTag: z.boolean().default(true),
    // Inference telemetry is off by default: the host must opt in before the
    // plugin touches the sdk domain at all.
    telemetry: z.boolean().default(false),
    apiFormat: apiFormatSchema.optional(),
  })
  .strict();

export type PluginOptions = z.infer<typeof pluginOptionsSchema>;

/** Environment source for the management token (option wins over this). */
export const MANAGEMENT_TOKEN_ENV_VAR = "OMNIROUTE_MANAGEMENT_API_KEY";

/**
 * Resolve the management token: a non-empty option wins, then a non-empty
 * environment value, else absent. Empty counts as absent on both inputs, the
 * same rule the inference key follows; no trimming, the token is opaque.
 */
export function resolveManagementReadToken(optionValue: string | undefined): string | undefined {
  if (optionValue !== undefined && optionValue.length > 0) return optionValue;
  const fromEnv = process.env[MANAGEMENT_TOKEN_ENV_VAR];
  if (fromEnv !== undefined && fromEnv.length > 0) return fromEnv;
  return undefined;
}

/** Per-endpoint timeout defaults (v1 parity). `timeoutMs` is the global fallback. */
export const DEFAULT_TIMEOUT_MS = 10_000 as const;

export interface EndpointTimeouts {
  models: number;
  combos: number;
  enrichment: number;
}

export function resolveTimeouts(
  opts: Pick<PluginOptions, "timeoutMs" | "timeouts">
): EndpointTimeouts {
  const fallback =
    typeof opts.timeoutMs === "number" && opts.timeoutMs > 0 ? opts.timeoutMs : DEFAULT_TIMEOUT_MS;
  return {
    models: opts.timeouts?.models ?? fallback,
    combos: opts.timeouts?.combos ?? fallback,
    enrichment: opts.timeouts?.enrichment ?? fallback,
  };
}

/**
 * Parse the plugin block of `opencode.json`.
 *
 * A rejected option aborts the whole plugin, and the host reports that as a
 * bare load failure with the validator's raw dump attached — which is how a
 * single mistyped key turns into a wall of JSON and an empty model picker. The
 * schema is strict on purpose (a silently ignored option is worse), so the
 * least we owe the user is a first line naming what to fix.
 */
export function parsePluginOptions(raw: unknown): PluginOptions {
  const result = pluginOptionsSchema.safeParse(raw);
  if (result.success) return result.data;
  const problems = result.error.issues.map((issue) => {
    const at = issue.path.length > 0 ? issue.path.join(".") : "(root)";
    const unknown = issue.code === "unrecognized_keys" ? issue.keys.join(", ") : undefined;
    return unknown !== undefined ? `unknown option "${unknown}"` : `${at}: ${issue.message}`;
  });
  throw new Error(`[omniroute-v2] invalid plugin options — ${problems.join("; ")}`);
}

/**
 * Map parsed options to the catalog's runtime shape. Lives here (not
 * index.ts) so tests reach it without importing the plugin entrypoint, whose
 * `@opencode/plugin` runtime import is a devDependency absent from the
 * caller's tree — importing index.ts fails at module load there.
 */
export function toResolvedOptions(parsed: PluginOptions): ResolvedOptions {
  return {
    providerId: parsed.providerId,
    baseURL: parsed.baseURL,
    apiKey: parsed.apiKey ?? process.env.OMNIROUTE_API_KEY ?? "",
    managementReadToken: resolveManagementReadToken(parsed.managementReadToken),
    timeoutMs: parsed.timeoutMs,
    timeouts: parsed.timeouts,
    logLevel: parsed.logLevel,
    startupDebug: parsed.startupDebug,
    providerTag: parsed.providerTag,
    modelCacheTtlMs:
      typeof parsed.modelCacheTtlMs === "number" && parsed.modelCacheTtlMs > 0
        ? parsed.modelCacheTtlMs
        : DEFAULT_MODEL_CACHE_TTL_MS,
    displayName: parsed.displayName,
    apiFormat: parsed.apiFormat,
    visibleModels: parsed.visibleModels,
    hiddenModels: parsed.hiddenModels,
    providersAllow: parsed.providersAllow,
    usableOnly: parsed.usableOnly,
    freeOnly: parsed.freeOnly,
    toolsOnly: parsed.toolsOnly,
    visionOnly: parsed.visionOnly,
    showcasePerOwner: parsed.showcasePerOwner,
    freshPerOwner: parsed.freshPerOwner,
    freshWindowDays: parsed.freshWindowDays,
    usageMemory: parsed.usageMemory,
    enrichment: parsed.enrichment,
  };
}

/**
 * The host reads the plugin id from the module, before any option is known, so
 * it cannot carry the configured provider id. Publishing two gateways from one
 * install is a `providerId` matter — that one does reach the catalog.
 */
export const PLUGIN_ID = "omniroute-v2";

export function providerIdFor(providerId: string): string {
  return providerId;
}

export function integrationIdFor(providerId: string): string {
  return providerId;
}
