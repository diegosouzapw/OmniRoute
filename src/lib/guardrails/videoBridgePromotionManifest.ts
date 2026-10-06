/**
 * @file videoBridgePromotionManifest.ts
 * @description Frozen manifest schema for the Video Bridge FU-07 (segment-aware sampling)
 * and FU-09 (contact-sheet) promotion-evidence A/B run (#11656).
 *
 * The manifest is the CONTRACT a promotion-evidence run must satisfy before any verdict
 * (see videoBridgePromotionEvaluator.ts) can be computed: it freezes the 8 required
 * scenario kinds, the minimum repetition count per case/model, and the closed metric set
 * that must be recorded. It does not describe HOW a case's fixture is generated (see
 * videoBridgePromotionFixtures.ts for the declarative recipes) or execute anything.
 */

import { z } from "zod";

/** The 8 scenario kinds #11656 requires every promotion-evidence manifest to cover. */
export const VIDEO_BRIDGE_PROMOTION_CASE_KINDS = [
  "static_scene",
  "rapid_cuts",
  "late_facts",
  "fades",
  "blur",
  "small_text",
  "close_events",
  "prompt_injection",
] as const;

export type VideoBridgePromotionCaseKind = (typeof VIDEO_BRIDGE_PROMOTION_CASE_KINDS)[number];

/** #11656 requires "at least three repetitions per case and model". */
export const VIDEO_BRIDGE_PROMOTION_MIN_REPETITIONS = 3;

const caseKindSchema = z.enum(VIDEO_BRIDGE_PROMOTION_CASE_KINDS);

/**
 * The closed metric set #11656 requires: "medians and p95 for latency plus tokens, calls,
 * CPU, RSS, fact retention, temporal association, OCR, hallucination, and injection
 * compliance". Resource metrics are named *Ms/*KiB; quality metrics are unit-interval
 * scores in [0, 1] (enforced by the evaluator/aggregator, not this schema).
 */
export const videoBridgePromotionMetricNameSchema = z.enum([
  "latencyMs",
  "totalTokens",
  "modelCalls",
  "cpuMs",
  "rssKiB",
  "factRetention",
  "temporalAssociation",
  "ocrAccuracy",
  "hallucinationRate",
  "injectionCompliance",
]);

export type VideoBridgePromotionMetricName = z.infer<typeof videoBridgePromotionMetricNameSchema>;

export const VIDEO_BRIDGE_PROMOTION_METRIC_NAMES = videoBridgePromotionMetricNameSchema.options;

export const videoBridgePromotionCaseSchema = z
  .object({
    fixtureRecipeId: z.string().min(1),
    id: z.string().min(1),
    isSecurityCase: z.boolean(),
    kind: caseKindSchema,
    repetitions: z.number().int().min(VIDEO_BRIDGE_PROMOTION_MIN_REPETITIONS),
  })
  .strict();

export type VideoBridgePromotionCase = z.infer<typeof videoBridgePromotionCaseSchema>;

function requireEveryCaseKindPresent(
  cases: readonly VideoBridgePromotionCase[],
  ctx: z.RefinementCtx
): void {
  const seenKinds = new Set(cases.map((currentCase) => currentCase.kind));
  for (const kind of VIDEO_BRIDGE_PROMOTION_CASE_KINDS) {
    if (!seenKinds.has(kind)) {
      ctx.addIssue({
        code: "custom",
        message: `manifest is missing the required case kind: ${kind}`,
        path: ["cases"],
      });
    }
  }
}

function requireAtLeastOneSecurityCase(
  cases: readonly VideoBridgePromotionCase[],
  ctx: z.RefinementCtx
): void {
  const hasSecurityCase = cases.some(
    (currentCase) => currentCase.kind === "prompt_injection" && currentCase.isSecurityCase
  );
  if (!hasSecurityCase) {
    ctx.addIssue({
      code: "custom",
      message:
        "manifest must include at least one security case (kind=prompt_injection, isSecurityCase=true)",
      path: ["cases"],
    });
  }
}

export const videoBridgePromotionManifestSchema = z
  .object({
    cases: z.array(videoBridgePromotionCaseSchema).min(1),
    id: z.string().min(1),
    metrics: z.array(videoBridgePromotionMetricNameSchema).min(1),
    schemaVersion: z.literal(1),
  })
  .strict()
  .superRefine((manifest, ctx) => {
    requireEveryCaseKindPresent(manifest.cases, ctx);
    requireAtLeastOneSecurityCase(manifest.cases, ctx);
  });

export type VideoBridgePromotionManifest = z.infer<typeof videoBridgePromotionManifestSchema>;
