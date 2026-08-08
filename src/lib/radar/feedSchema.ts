/**
 * feedSchema.ts — Zod schema for the OmniRoute Radar feed payload.
 *
 * This is the CLIENT-SIDE mirror of the server's feed schema.  The server
 * is the source of truth; this schema validates whatever we downloaded
 * before caching it locally.
 *
 * Schema version: 1
 */

import { z } from "zod";

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

const FreeTypeEnum = z.enum([
  "recurring-daily",
  "recurring-monthly",
  "recurring-uncapped",
  "recurring-credit",
  "keyless",
  "one-time-initial",
  "discontinued",
]);

const TosRiskEnum = z.enum(["ok", "caution", "avoid"]);

const SeverityEnum = z.enum(["info", "warn"]);

const TierEnum = z.enum(["community", "live"]);

/**
 * Exported so `sync.ts` can validate the `x-omniroute-feed-tier` response
 * header against the same allowed values, without duplicating the enum.
 */
export const RadarTierSchema = TierEnum;
export type RadarTier = z.infer<typeof RadarTierSchema>;

// ---------------------------------------------------------------------------
// Sub-schemas
// ---------------------------------------------------------------------------

const IntNullable = z.number().int().nullable();

/** D25: English is canonical; Portuguese is an optional localized companion. */
export const RadarLocalizedTextSchema = z.union([
  z.string(), // compatibility with schema-v1 feeds published before D25
  z.object({
    en: z.string().min(1),
    pt: z.string().min(1).optional(),
  }),
]);
export type RadarLocalizedText = z.infer<typeof RadarLocalizedTextSchema>;

/**
 * Budget is a discriminated union on `kind`:
 *   - per_model: tokensPerMonth (positive int)
 *   - shared_pool: poolId + tokensPerMonth (positive int)
 *   - rate_only: no additional fields
 */
const BudgetSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("per_model"),
    tokensPerMonth: z.number().int().positive(),
  }),
  z.object({
    kind: z.literal("shared_pool"),
    poolId: z.string(),
    tokensPerMonth: z.number().int().positive(),
  }),
  z.object({
    kind: z.literal("rate_only"),
  }),
]);

const LimitsSchema = z.object({
  rpm: IntNullable,
  rpd: IntNullable,
  tpm: IntNullable,
  tpd: IntNullable,
});

const CapabilitiesSchema = z.object({
  tools: z.boolean(),
  vision: z.boolean(),
  thinking: z.boolean(),
});

const SetupSchema = z
  .object({
    keyUrl: z.string().url().nullable(),
    steps: z.array(RadarLocalizedTextSchema),
  })
  .nullable();

// ---------------------------------------------------------------------------
// Referral (D28 — referral links / free credits)
// ---------------------------------------------------------------------------

const ReferralKindEnum = z.enum(["fixo", "campanha"]);

/** Referral URLs are always required to be https:// (never plain http). */
const HttpsUrlSchema = z
  .string()
  .url()
  .refine((v) => v.startsWith("https://"), { message: "Referral url must use https://" });

/**
 * Exported so `referralsFeedSchema.ts` (the standalone `/v1/referrals/latest`
 * feed schema) can reuse the exact same per-referral shape instead of
 * duplicating it — one definition, two feeds (the catalog's legacy embedded
 * `referrals` section below, kept for backward-compat with old cached
 * catalog feeds, and the live referrals-only feed).
 */
export const RadarReferralSchema = z.object({
  provider: z.string(),
  url: HttpsUrlSchema,
  kind: ReferralKindEnum,
  validUntil: z.string().nullable(),
  requiredAction: z.string().nullable(),
  isDefault: z.boolean(),
});

/**
 * `referrals` is a whole-object `.default()` (not just a per-field default)
 * so a cached feed downloaded before this section existed on the server
 * still parses cleanly — `parsed.referrals` resolves to `{fixed:[],
 * campaigns:[]}` instead of failing validation. `campaigns` also defaults
 * independently so a feed that has `referrals.fixed` but omits `campaigns`
 * (e.g. an intermediate server rollout) still parses.
 */
const RadarReferralsSchema = z
  .object({
    fixed: z.array(RadarReferralSchema).default([]),
    campaigns: z.array(RadarReferralSchema).default([]),
  })
  .default({ fixed: [], campaigns: [] });

// ---------------------------------------------------------------------------
// Model
// ---------------------------------------------------------------------------

const ModelSchema = z.object({
  provider: z.string(),
  modelId: z.string(),
  displayName: z.string(),
  familyId: z.string().nullable(),
  freeType: FreeTypeEnum,
  budget: BudgetSchema,
  limits: LimitsSchema,
  contextWindow: z.number().int().nullable(),
  capabilities: CapabilitiesSchema,
  trainsOnPrompts: z.boolean().nullable(),
  tosRisk: TosRiskEnum,
  setup: SetupSchema,
  enabled: z.boolean(),
});

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

const ProviderSchema = z.object({
  id: z.string(),
  name: z.string(),
});

// ---------------------------------------------------------------------------
// Quirk
// ---------------------------------------------------------------------------

const QuirkTargetSchema = z.object({
  provider: z.string(),
  modelGlob: z.string().nullable(),
});

const QuirkSchema = z.object({
  slug: z.string(),
  title: RadarLocalizedTextSchema,
  body: RadarLocalizedTextSchema,
  severity: SeverityEnum,
  targets: z.array(QuirkTargetSchema),
});

// ---------------------------------------------------------------------------
// Top-level feed schema
// ---------------------------------------------------------------------------

export const RadarFeedSchema = z.object({
  feed: z.literal("omniroute-radar"),
  schemaVersion: z.literal(1),
  version: z.string(),
  generatedAt: z.string().datetime(),
  // NOTE: this body field is not the entitlement decision. The server can
  // publish separate exact-byte live/community artifacts for one version,
  // while the selected request tier is still communicated by the header.
  // The tier ACTUALLY served is decided by the server per-request based on
  // the Authorization key, and is surfaced via the `x-omniroute-feed-tier`
  // response header instead. NEVER read this field for UI/display — use the
  // served-tier value that `sync.ts` derives from the header (falling back
  // to this field only when the header is absent, e.g. an older server).
  tier: TierEnum,
  counts: z.object({
    providers: z.number().int(),
    models: z.number().int(),
  }),
  providers: z.array(ProviderSchema),
  models: z.array(ModelSchema),
  quirks: z.array(QuirkSchema),
  referrals: RadarReferralsSchema,
  totals: z.object({
    dedupedTokensPerMonth: z.number().int(),
    modelCount: z.number().int(),
    poolCount: z.number().int(),
  }),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type RadarFeed = z.infer<typeof RadarFeedSchema>;
export type RadarModel = z.infer<typeof ModelSchema>;
export type RadarProvider = z.infer<typeof ProviderSchema>;
export type RadarQuirk = z.infer<typeof QuirkSchema>;
export type RadarBudget = z.infer<typeof BudgetSchema>;
export type RadarReferral = z.infer<typeof RadarReferralSchema>;
