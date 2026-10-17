/**
 * publicai.ts — PublicAI index snapshot → model_intelligence rows.
 *
 * Remediation of AUDIT_TASKS.md 1.3: the old `score → index → 50` fallback
 * presented the midpoint 50 as evidence. Rows with neither field are now
 * skipped instead of being assigned a fabricated score.
 */
import type { ModelIntelligenceEntry } from "../../db/modelIntelligence.ts";
import { asFinite, asRecord, clamp01, fanOutCategories, normId } from "./shared.ts";

export interface PublicAIEntry {
  id?: string;
  model?: string;
  index?: number;
  score?: number;
}

/** PublicAI score/index values arrive on a 0–100 scale. */
const PUBLICAI_PERCENT_SCALE = 100;

export function transformPublicAI(
  entries: PublicAIEntry[] | null | undefined
): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
  const out: Array<Omit<ModelIntelligenceEntry, "syncedAt">> = [];
  if (!Array.isArray(entries)) return out;
  for (const entry of entries) {
    const record = asRecord(entry);
    if (record === null) continue;
    const model = normId(record.model ?? record.id);
    if (!model) continue;
    const raw = asFinite(record.score) ?? asFinite(record.index);
    // No usable signal: skip the row, never fabricate a score.
    if (raw === null) continue;
    const score = clamp01(raw / PUBLICAI_PERCENT_SCALE);
    // One scalar per model — no per-category signal exists, so the same
    // score fans out to all 7 categories (see fanOutCategories).
    out.push(
      ...fanOutCategories({ model, source: "publicai_index", score })
    );
  }
  return out;
}
