/**
 * @file videoBridgePromotionDigest.ts
 * @description Privacy boundary for the Video Bridge promotion-evidence run (#11656):
 * "Persist metrics and response digests only; never raw private media or model responses."
 *
 * `buildPersistablePromotionRecord` is the ONLY sanctioned way to turn a raw per-run
 * observation into something that may be written to disk/DB/report JSON — it keeps the
 * metric numbers and a sha256 digest of the model's response text, and drops the raw text
 * itself. `assertNoRawPromotionPayloadLeak` is a defense-in-depth guard callers can run
 * before persisting, so a future refactor that accidentally reintroduces a raw field fails
 * loudly instead of silently shipping raw model output into a stored artifact.
 */

import { createHash } from "node:crypto";

import type { VideoBridgePromotionMetricName } from "./videoBridgePromotionManifest";

export interface RawPromotionObservation {
  caseId: string;
  metrics: Partial<Record<VideoBridgePromotionMetricName, number>>;
  model: string;
  /** Raw model response text. MUST NOT reach `PersistablePromotionRecord`. */
  rawResponseText: string;
}

export interface PersistablePromotionRecord {
  caseId: string;
  metrics: Partial<Record<VideoBridgePromotionMetricName, number>>;
  model: string;
  responseDigest: string;
}

export function digestPromotionText(rawText: string): string {
  return createHash("sha256").update(rawText).digest("hex");
}

/** Reduces a raw observation to the metrics + a response digest — never the raw text itself. */
export function buildPersistablePromotionRecord(
  observation: RawPromotionObservation
): PersistablePromotionRecord {
  return {
    caseId: observation.caseId,
    metrics: { ...observation.metrics },
    model: observation.model,
    responseDigest: digestPromotionText(observation.rawResponseText),
  };
}

/**
 * Defense-in-depth: throws if a record's serialized form still contains the raw text it was
 * supposed to have been digested from. A no-op when `rawText` is empty (nothing to leak).
 */
export function assertNoRawPromotionPayloadLeak(
  record: Readonly<Record<string, unknown>>,
  rawText: string
): void {
  if (rawText.length === 0) return;
  const serialized = JSON.stringify(record);
  if (serialized.includes(rawText)) {
    throw new Error(
      "Video Bridge promotion record retained a raw response payload — persistence must be metrics + digest only"
    );
  }
}
