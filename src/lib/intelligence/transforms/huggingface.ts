/**
 * huggingface.ts — Hugging Face model metadata → model_intelligence rows.
 *
 * Remediation of AUDIT_TASKS.md 3.5: the log10 weights and blend factors are
 * named constants below. Rows with no usable signal (both downloads and
 * likes missing/non-positive) are skipped, never fabricated.
 */
import type { ModelIntelligenceEntry } from "../../db/modelIntelligence.ts";
import { asFinite, asRecord, clamp01, fanOutCategories, normId } from "./shared.ts";

export interface HFEntry {
  id?: string;
  modelId?: string;
  downloads?: number;
  likes?: number;
}

/** log10 orders of magnitude spanning the downloads signal. */
const HF_DOWNLOADS_LOG_RANGE = 6;
/** log10 orders of magnitude spanning the likes signal. */
const HF_LIKES_LOG_RANGE = 5;
/** Blend weight for the downloads component of the popularity score. */
const HF_DOWNLOADS_WEIGHT = 0.7;
/** Blend weight for the likes component of the popularity score. */
const HF_LIKES_WEIGHT = 0.3;

export function transformHuggingFace(
  entries: HFEntry[] | null | undefined
): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
  const out: Array<Omit<ModelIntelligenceEntry, "syncedAt">> = [];
  if (!Array.isArray(entries)) return out;
  for (const entry of entries) {
    const record = asRecord(entry);
    if (record === null) continue;
    const model = normId(record.modelId ?? record.id);
    if (!model) continue;
    const downloads = asFinite(record.downloads);
    const likes = asFinite(record.likes);
    // No usable signal: skip the row, never fabricate a score.
    if (downloads === null && likes === null) continue;
    if ((downloads ?? 0) <= 0 && (likes ?? 0) <= 0) continue;
    const downloadsPart =
      downloads !== null && downloads > 0
        ? (Math.log10(downloads + 1) / HF_DOWNLOADS_LOG_RANGE) * HF_DOWNLOADS_WEIGHT
        : 0;
    const likesPart =
      likes !== null && likes > 0
        ? (Math.log10(likes + 1) / HF_LIKES_LOG_RANGE) * HF_LIKES_WEIGHT
        : 0;
    const score = clamp01(downloadsPart + likesPart);
    // Popularity is one scalar per model — no per-category signal exists, so
    // the same score fans out to all 7 categories (see fanOutCategories).
    out.push(
      ...fanOutCategories({ model, source: "huggingface_meta", score })
    );
  }
  return out;
}
