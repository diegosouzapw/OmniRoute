/** Closed client mirror of the private Radar Intel feed contract. */

import { z } from "zod";

const ID_PATTERN = /^[a-z0-9][a-z0-9._-]{0,119}$/;
const CATEGORY_PATTERN = /^[a-z0-9][a-z0-9._-]{0,79}$/;
const MODEL_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,239}$/;

export const RadarIntelRankingSchema = z
  .object({
    rank: z.number().int().positive(),
    provider: z.string().regex(ID_PATTERN),
    modelId: z.string().regex(MODEL_ID_PATTERN),
    category: z.string().regex(CATEGORY_PATTERN),
    rating: z.number().int(),
    matches: z.number().int().nonnegative(),
    wins: z.number().int().nonnegative(),
    losses: z.number().int().nonnegative(),
    draws: z.number().int().nonnegative(),
  })
  .strict()
  .superRefine((ranking, ctx) => {
    if (ranking.matches !== ranking.wins + ranking.losses + ranking.draws) {
      ctx.addIssue({ code: "custom", path: ["matches"], message: "match counters disagree" });
    }
  });

const CatalogDeltaSchema = z
  .object({
    current: z.number().int().nonnegative(),
    added: z.number().int().nonnegative(),
    removed: z.number().int().nonnegative(),
  })
  .strict();

export const RadarIntelCatalogSchema = z
  .object({
    currentVersion: z.string().regex(/^\d{4}\.\d{2}\.\d{2}\.\d+$/),
    previousVersion: z
      .string()
      .regex(/^\d{4}\.\d{2}\.\d{2}\.\d+$/)
      .nullable(),
    currentGeneratedAt: z.string().datetime(),
    ageDays: z.number().int().nonnegative(),
    freshness: z.enum(["fresh", "aging", "stale"]),
    providers: CatalogDeltaSchema,
    models: CatalogDeltaSchema,
    trend: z.enum(["growing", "stable", "shrinking"]),
  })
  .strict();

export const RadarIntelFeedSchema = z
  .object({
    feed: z.literal("omniroute-radar-intel"),
    schemaVersion: z.literal(1),
    version: z.string().regex(/^\d{4}\.\d{2}\.\d{2}\.\d+$/),
    generatedAt: z.string().datetime(),
    tier: z.literal("live"),
    methodology: z
      .object({
        kind: z.literal("elo"),
        initialRating: z.literal(1000),
        kFactor: z.literal(32),
      })
      .strict(),
    rankings: z.array(RadarIntelRankingSchema),
    catalog: RadarIntelCatalogSchema,
  })
  .strict();

export type RadarIntelFeed = z.infer<typeof RadarIntelFeedSchema>;
export type RadarIntelRanking = z.infer<typeof RadarIntelRankingSchema>;
export type RadarIntelCatalog = z.infer<typeof RadarIntelCatalogSchema>;
