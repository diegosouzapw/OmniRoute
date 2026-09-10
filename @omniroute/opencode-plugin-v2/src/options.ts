import { z } from "zod";

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
    baseURL: z.string().url(),
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
    usableOnly: z.boolean().default(false),
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
    apiFormat: apiFormatSchema.optional(),
  })
  .strict();

export type PluginOptions = z.infer<typeof pluginOptionsSchema>;

/** Per-endpoint timeout defaults (v1 parity). `timeoutMs` is the global fallback. */
export const DEFAULT_TIMEOUT_MS = 10_000 as const;
/** Auto-combos keep the v1 5s budget; the field is resolved now for the P3 port. */
export const DEFAULT_AUTO_COMBOS_TIMEOUT_MS = 5_000 as const;

export interface EndpointTimeouts {
  models: number;
  combos: number;
  autoCombos: number;
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
    autoCombos: opts.timeouts?.autoCombos ?? DEFAULT_AUTO_COMBOS_TIMEOUT_MS,
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
