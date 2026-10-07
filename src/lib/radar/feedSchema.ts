/**
 * feedSchema.ts — Zod schema for the OmniRoute Radar feed payload.
 *
 * This is the CLIENT-SIDE mirror of the server's feed schema.  The server
 * is the source of truth; this schema validates whatever we downloaded
 * before caching it locally.
 *
 * Schema versions: v1 legacy + v2 with explicit unknown model metadata.
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

const CapabilitiesV1Schema = z.object({
  tools: z.boolean(),
  vision: z.boolean(),
  thinking: z.boolean(),
});

const CapabilitiesV2Schema = z.object({
  tools: z.boolean().nullable(),
  vision: z.boolean().nullable(),
  thinking: z.boolean().nullable(),
});

const MetadataEvidenceUrlSchema = z
  .string()
  .url()
  .superRefine((value, ctx) => {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
      ctx.addIssue({ code: "custom", message: "metadata evidence must use credential-free HTTPS" });
    }
  });

const SetupKeyUrlSchema = z
  .string()
  .url()
  .superRefine((value, ctx) => {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password || parsed.port) {
      ctx.addIssue({
        code: "custom",
        message: "setup key URL must use credential-free HTTPS on the default port",
      });
    }
  });

const SetupSchema = z
  .object({
    keyUrl: SetupKeyUrlSchema.nullable(),
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

const ModelV1Schema = z.object({
  provider: z.string(),
  modelId: z.string(),
  displayName: z.string(),
  familyId: z.string().nullable(),
  freeType: FreeTypeEnum,
  budget: BudgetSchema,
  limits: LimitsSchema,
  contextWindow: z.number().int().nullable(),
  capabilities: CapabilitiesV1Schema,
  trainsOnPrompts: z.boolean().nullable(),
  tosRisk: TosRiskEnum,
  /** Real quota, but behind a regional identity verification (counted apart on the client). */
  eligibilityGate: z.enum(["regional-identity"]).nullable().optional(),
  setup: SetupSchema,
  enabled: z.boolean(),
});

const ModelV2Schema = ModelV1Schema.extend({
  contextWindow: z.number().int().positive().nullable(),
  capabilities: CapabilitiesV2Schema,
  metadataEvidenceUrls: z.array(MetadataEvidenceUrlSchema),
}).superRefine((model, ctx) => {
  const hasMetadata =
    model.contextWindow !== null ||
    Object.values(model.capabilities).some((capability) => capability !== null);
  if (hasMetadata && model.metadataEvidenceUrls.length === 0) {
    ctx.addIssue({ code: "custom", message: "known model metadata requires evidence" });
  }
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

const RadarFeedV1Schema = z.object({
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
  models: z.array(ModelV1Schema),
  quirks: z.array(QuirkSchema),
  referrals: RadarReferralsSchema,
  totals: z.object({
    dedupedTokensPerMonth: z.number().int(),
    modelCount: z.number().int(),
    poolCount: z.number().int(),
  }),
});

const RadarFeedV2Schema = RadarFeedV1Schema.extend({
  schemaVersion: z.literal(2),
  models: z.array(ModelV2Schema),
});

const RawRadarFeedSchema = z.discriminatedUnion("schemaVersion", [
  RadarFeedV1Schema,
  RadarFeedV2Schema,
]);

export const RadarFeedSchema = RawRadarFeedSchema.transform((feed) => {
  if (feed.schemaVersion === 2) return feed;
  return {
    ...feed,
    models: feed.models.map((model) => ({
      ...model,
      // The v1 builder used false as an absence placeholder. True was never
      // a default, so it remains factual; false is normalized to unknown.
      capabilities: {
        tools: model.capabilities.tools || null,
        vision: model.capabilities.vision || null,
        thinking: model.capabilities.thinking || null,
      },
      metadataEvidenceUrls: [],
    })),
  };
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type RadarFeed = z.infer<typeof RadarFeedSchema>;
export type RadarModel = z.infer<typeof ModelV2Schema>;
export type RadarProvider = z.infer<typeof ProviderSchema>;
export type RadarQuirk = z.infer<typeof QuirkSchema>;
export type RadarBudget = z.infer<typeof BudgetSchema>;
export type RadarReferral = z.infer<typeof RadarReferralSchema>;
