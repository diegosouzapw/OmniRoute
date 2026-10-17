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
    policy: z.enum(["segment_aware", "contact_sheet"]).optional(),
    modelRevision: z.string().min(1).optional(),
    candidateSha: z
      .string()
      .regex(/^[a-f0-9]{40}$/)
      .optional(),
    manifestDigest: z
      .string()
      .regex(/^[a-f0-9]{64}$/)
      .optional(),
    runIds: z
      .array(z.uuid())
      .length(2)
      .refine((ids) => ids[0] !== ids[1])
      .optional(),
  })
  .strict()
  .superRefine((entry, ctx) => {
    if (
      entry.status === "eligible" &&
      (!entry.policy ||
        !entry.modelRevision ||
        !entry.candidateSha ||
        !entry.manifestDigest ||
        !entry.runIds)
    ) {
      ctx.addIssue({
        code: "custom",
        message:
          "eligible entries require policy, model revision, candidate, corpus and two distinct run IDs",
      });
    }
  });

export const videoBridgePromotionAllowlistSchema = z
  .object({
    defaultStatus: z.literal("hold"),
    generatedAt: z.string().min(1),
    models: z.array(videoBridgePromotionAllowlistEntrySchema),
    schemaVersion: z.literal(1),
  })
  .strict()
  .superRefine((allowlist, ctx) => {
    const seen = new Set<string>();
    for (const [index, entry] of allowlist.models.entries()) {
      const key = JSON.stringify([
        entry.model,
        entry.policy,
        entry.modelRevision,
        entry.candidateSha,
      ]);
      if (seen.has(key)) {
        ctx.addIssue({
          code: "custom",
          message: "duplicate promotion execution context",
          path: ["models", index],
        });
      }
      seen.add(key);
    }
  });

export type VideoBridgePromotionAllowlist = z.infer<typeof videoBridgePromotionAllowlistSchema>;

const VIDEO_BRIDGE_PROMOTION_ALLOWLIST: VideoBridgePromotionAllowlist =
  videoBridgePromotionAllowlistSchema.parse(allowlistFile);

/** Returns the frozen allowlist as validated at module load. */
export function listVideoBridgePromotionAllowlist(): VideoBridgePromotionAllowlist {
  return structuredClone(VIDEO_BRIDGE_PROMOTION_ALLOWLIST);
}

export interface VideoBridgePromotionContext {
  policy: "segment_aware" | "contact_sheet";
  modelRevision: string;
  candidateSha: string;
}

export function resolveVideoBridgePromotionStatus(
  allowlist: VideoBridgePromotionAllowlist,
  model: string,
  context?: VideoBridgePromotionContext
): VideoBridgePromotionAllowlistStatus {
  if (!context || !videoBridgePromotionAllowlistSchema.safeParse(allowlist).success) return "hold";
  const entry = allowlist.models.find(
    (candidate) =>
      candidate.model === model &&
      candidate.policy === context.policy &&
      candidate.modelRevision === context.modelRevision &&
      candidate.candidateSha === context.candidateSha
  );
  return entry?.status ?? "hold";
}

/**
 * Looks up a model's promotion status. A model absent from the allowlist returns
 * `defaultStatus` (currently always "hold") — never silently treated as eligible.
 */
export function getVideoBridgePromotionStatus(
  model: string,
  context?: VideoBridgePromotionContext
): VideoBridgePromotionAllowlistStatus {
  return resolveVideoBridgePromotionStatus(VIDEO_BRIDGE_PROMOTION_ALLOWLIST, model, context);
}
