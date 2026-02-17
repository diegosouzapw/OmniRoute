/**
 * Provider Schema Validation — Phase 7.2
 *
 * Zod schemas for provider constant validation.
 * Validates FREE_PROVIDERS, OAUTH_PROVIDERS, and APIKEY_PROVIDERS
 * at module load time to catch configuration drift early.
 *
 * @module shared/validation/providerSchema
 */

import { z } from "zod";

export const ProviderSchema = z.object({
  id: z.string().min(1),
  alias: z.string().min(1),
  name: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color (#RRGGBB)"),
  textIcon: z.string().optional(),
  website: z.string().url().optional(),
  passthroughModels: z.boolean().optional(),
});

export const ProvidersMapSchema = z.record(z.string(), ProviderSchema);

/**
 * Validate a providers map, throwing a descriptive error on failure.
 * @param {Record<string, object>} map - The providers map to validate
 * @param {string} name - Name of the map for error messages
 */
export function validateProviders(map, name) {
  const result = ProvidersMapSchema.safeParse(map);
  if (!result.success) {
    const issues = result.error.issues.map((i) => `  ${i.path.join(".")}: ${i.message}`).join("\n");
    console.error(`[PROVIDER VALIDATION] ${name} has invalid entries:\n${issues}`);
    throw new Error(`Provider validation failed for ${name}`);
  }
}
