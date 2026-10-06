/**
 * Closed client mirror of the private Radar offers feed contract.
 *
 * Keep this shape byte-compatible with `src/offers/schema.ts` in the private
 * server. The canonical fixture in `tests/fixtures/` pins that cross-repo
 * contract without embedding any real offer or partner data.
 */

import { z } from "zod";

const OFFER_ID_PATTERN = /^[a-z0-9][a-z0-9._-]{0,119}$/;
const PROVIDER_ID_PATTERN = /^[a-z0-9][a-z0-9._-]{0,119}$/;

export const RadarOfferLocalizedTextSchema = z
  .object({
    en: z.string().min(1),
    pt: z.string().min(1).optional(),
  })
  .strict();

export type RadarOfferLocalizedText = z.infer<typeof RadarOfferLocalizedTextSchema>;

const HttpsUrlSchema = z
  .string()
  .url()
  .superRefine((value, ctx) => {
    const parsed = new URL(value);
    if (parsed.protocol !== "https:" || parsed.username || parsed.password) {
      ctx.addIssue({ code: "custom", message: "offer URL must be credential-free HTTPS" });
    }
  });

const PercentBenefitSchema = z
  .object({
    kind: z.literal("percent_off"),
    basisPoints: z.number().int().min(1).max(10_000),
  })
  .strict();

const CreditBenefitSchema = z
  .object({
    kind: z.literal("credit"),
    amountMinor: z.number().int().positive(),
    currency: z.string().regex(/^[A-Z]{3}$/),
  })
  .strict();

const TrialBenefitSchema = z
  .object({
    kind: z.literal("trial_days"),
    days: z.number().int().min(1).max(3_650),
  })
  .strict();

export const RadarOfferBenefitSchema = z.discriminatedUnion("kind", [
  PercentBenefitSchema,
  CreditBenefitSchema,
  TrialBenefitSchema,
]);

export type RadarOfferBenefit = z.infer<typeof RadarOfferBenefitSchema>;

function isStrictlyBetter(benefit: RadarOfferBenefit, publicBenefit: RadarOfferBenefit): boolean {
  if (benefit.kind !== publicBenefit.kind) return false;
  if (benefit.kind === "percent_off" && publicBenefit.kind === "percent_off") {
    return benefit.basisPoints > publicBenefit.basisPoints;
  }
  if (benefit.kind === "trial_days" && publicBenefit.kind === "trial_days") {
    return benefit.days > publicBenefit.days;
  }
  if (benefit.kind === "credit" && publicBenefit.kind === "credit") {
    return (
      benefit.currency === publicBenefit.currency && benefit.amountMinor > publicBenefit.amountMinor
    );
  }
  return false;
}

export const RadarOfferSchema = z
  .object({
    id: z.string().regex(OFFER_ID_PATTERN),
    provider: z.string().regex(PROVIDER_ID_PATTERN),
    title: RadarOfferLocalizedTextSchema,
    description: RadarOfferLocalizedTextSchema,
    benefit: RadarOfferBenefitSchema,
    publicBenefit: RadarOfferBenefitSchema.nullable(),
    conditions: RadarOfferLocalizedTextSchema,
    validUntil: z.string().datetime().nullable(),
    url: HttpsUrlSchema,
    partner: z.boolean(),
  })
  .strict()
  .superRefine((offer, ctx) => {
    if (!offer.partner && offer.publicBenefit !== null) {
      ctx.addIssue({
        code: "custom",
        path: ["publicBenefit"],
        message: "official offer has no partner baseline",
      });
      return;
    }
    if (
      offer.partner &&
      (offer.publicBenefit === null || !isStrictlyBetter(offer.benefit, offer.publicBenefit))
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["publicBenefit"],
        message: "partner benefit must be strictly better than a comparable public benefit",
      });
    }
  });

export type RadarOffer = z.infer<typeof RadarOfferSchema>;

export const RadarOffersFeedSchema = z
  .object({
    feed: z.literal("omniroute-radar-offers"),
    schemaVersion: z.literal(1),
    version: z.string().regex(/^\d{4}\.\d{2}\.\d{2}\.\d+$/),
    generatedAt: z.string().datetime(),
    tier: z.literal("live"),
    count: z.number().int().nonnegative(),
    offers: z.array(RadarOfferSchema),
  })
  .strict()
  .superRefine((feed, ctx) => {
    if (feed.count !== feed.offers.length) {
      ctx.addIssue({ code: "custom", path: ["count"], message: "offer count mismatch" });
    }
  });

export type RadarOffersFeed = z.infer<typeof RadarOffersFeedSchema>;

export function filterActiveRadarOffers(
  offers: readonly RadarOffer[],
  now: Date = new Date()
): RadarOffer[] {
  const nowMs = now.getTime();
  return offers.filter(
    (offer) => offer.validUntil === null || Date.parse(offer.validUntil) > nowMs
  );
}

export function localizeRadarOfferText(text: RadarOfferLocalizedText, locale: string): string {
  return locale.toLowerCase().startsWith("pt") && text.pt ? text.pt : text.en;
}
