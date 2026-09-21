import { z } from "zod";

/** No secret belongs in persisted/exportable combo configuration. */
export const omniJevConfigSchema = z
  .object({
    mode: z.enum(["methodology", "jev-api"]).default("methodology"),
    minConfidence: z.number().min(0).max(1).default(0.85),
    timeoutMs: z.number().int().min(25).max(3000).default(500),
    injectionEnabled: z.boolean().default(true),
    fallbackMode: z.enum(["similar-first", "rules"]).default("similar-first"),
  })
  .strict();

export type OmniJevConfig = z.infer<typeof omniJevConfigSchema>;

export function normalizeOmniJevConfig(input: unknown): OmniJevConfig {
  const result = omniJevConfigSchema.safeParse(input ?? {});
  return result.success ? result.data : omniJevConfigSchema.parse({});
}

export function isOmniJevStrategy(value: unknown): boolean {
  return value === "omni-jev" || value === "typesafe" || value === "jev";
}
