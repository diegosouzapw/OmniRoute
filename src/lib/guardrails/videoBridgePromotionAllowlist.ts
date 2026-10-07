/**
 * @file videoBridgePromotionAllowlist.ts
 * @description Versioned per-model promotion allowlist for the Video Bridge FU-07/FU-09
 * evidence run (#11656): "Version a per-model promotion allowlist and expose experimental,
 * eligible, or hold status."
 *
 * The allowlist ships in `videoBridgePromotionAllowlist.json`, EMPTY with
 * `defaultStatus: "hold"` — no model is promoted without a real evidence run producing an
 * ELIGIBLE verdict (videoBridgePromotionEvaluator.ts) backed by a receipt (`evidenceRef`).
 * A future evidence run updates this file by adding/editing entries, never by flipping the
 * default.
 */

import { z } from "zod";

import allowlistFile from "./videoBridgePromotionAllowlist.json";

export const videoBridgePromotionAllowlistStatusSchema = z.enum([
  "experimental",
  "eligible",
  "hold",
]);

export type VideoBridgePromotionAllowlistStatus = z.infer<
  typeof videoBridgePromotionAllowlistStatusSchema
>;

const videoBridgePromotionAllowlistEntrySchema = z
  .object({
    /** Pointer to the evidence artifact backing this status (report path/URL/commit SHA). */
    evidenceRef: z.string().min(1),
    model: z.string().min(1),
    status: videoBridgePromotionAllowlistStatusSchema,
    updatedAt: z.string().min(1),
  })
  .strict();

export const videoBridgePromotionAllowlistSchema = z
  .object({
    defaultStatus: videoBridgePromotionAllowlistStatusSchema,
    generatedAt: z.string().min(1),
    models: z.array(videoBridgePromotionAllowlistEntrySchema),
    schemaVersion: z.literal(1),
  })
  .strict();

export type VideoBridgePromotionAllowlist = z.infer<typeof videoBridgePromotionAllowlistSchema>;

const VIDEO_BRIDGE_PROMOTION_ALLOWLIST: VideoBridgePromotionAllowlist =
  videoBridgePromotionAllowlistSchema.parse(allowlistFile);

/** Returns the frozen allowlist as validated at module load. */
export function listVideoBridgePromotionAllowlist(): VideoBridgePromotionAllowlist {
  return VIDEO_BRIDGE_PROMOTION_ALLOWLIST;
}

/**
 * Looks up a model's promotion status. A model absent from the allowlist returns
 * `defaultStatus` (currently always "hold") — never silently treated as eligible.
 */
export function getVideoBridgePromotionStatus(model: string): VideoBridgePromotionAllowlistStatus {
  const entry = VIDEO_BRIDGE_PROMOTION_ALLOWLIST.models.find((candidate) => candidate.model === model);
  return entry ? entry.status : VIDEO_BRIDGE_PROMOTION_ALLOWLIST.defaultStatus;
}
