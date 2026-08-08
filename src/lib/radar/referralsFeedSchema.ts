/**
 * referralsFeedSchema.ts — Zod schema for the standalone Radar referrals feed
 * (`GET /v1/referrals/latest`).
 *
 * This is the CLIENT-SIDE mirror of the server's referrals feed schema — a
 * separate, always-current artifact from the catalog feed (`feedSchema.ts`),
 * introduced so referral links no longer inherit the catalog's up-to-30-day
 * community-tier snapshot delay. Reuses `RadarReferralSchema` (the per-link
 * shape) from `feedSchema.ts` so both feeds validate referrals identically.
 *
 * Schema version: 1
 */

import { z } from "zod";
import { RadarReferralSchema } from "./feedSchema";

// ---------------------------------------------------------------------------
// Top-level feed schema
// ---------------------------------------------------------------------------

export const RadarReferralsFeedSchema = z.object({
  feed: z.literal("omniroute-radar-referrals"),
  schemaVersion: z.literal(1),
  generatedAt: z.string().datetime(),
  referrals: z.object({
    fixed: z.array(RadarReferralSchema),
    campaigns: z.array(RadarReferralSchema),
  }),
});

// ---------------------------------------------------------------------------
// Inferred types
// ---------------------------------------------------------------------------

export type RadarReferralsFeed = z.infer<typeof RadarReferralsFeedSchema>;
