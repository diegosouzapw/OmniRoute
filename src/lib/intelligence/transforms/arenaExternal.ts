/**
 * arenaExternal.ts — External Arena ELO snapshot → model_intelligence rows.
 *
 * Remediation of AUDIT_TASKS.md 1.2 (drop the `elo → score → 1000`
 * fallback: rows with neither field are skipped, not assigned a fabricated
 * ELO), 1.4 (single min/max loop instead of Math.min/Math.max spread), and
 * 3.5 (named constants). The 0.4 + 0.58 normalisation window intentionally
 * matches arenaEloSync.ts:398 so the external mirror ranks on the same band.
 */
import type { ModelIntelligenceEntry } from "../../db/modelIntelligence.ts";
import { asFinite, asRecord, clamp01, fanOutCategories, normId } from "./shared.ts";

export interface ArenaExtEntry {
  model?: string;
  score?: number;
  elo?: number;
  votes?: number;
  rank?: number;
}

/** Floor of the normalised task-fit band (mirrors arenaEloSync.ts:398). */
const ARENA_FIT_FLOOR = 0.4;
/** Width of the normalised task-fit band (mirrors arenaEloSync.ts:398). */
const ARENA_FIT_WIDTH = 0.58;
/** Guard against a zero ELO range (all models tied) dividing by zero. */
const ARENA_MIN_RANGE = 1;

export function transformArenaExternal(
  entries: ArenaExtEntry[] | null | undefined
): Array<Omit<ModelIntelligenceEntry, "syncedAt">> {
  const out: Array<Omit<ModelIntelligenceEntry, "syncedAt">> = [];
  if (!Array.isArray(entries)) return out;
  // Single min/max loop over the usable ELO signal (1.4): no spread over an
  // unbounded array, no parallel scores[] index array.
  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;
  for (const entry of entries) {
    const record = asRecord(entry);
    if (record === null) continue;
    const elo = asFinite(record.elo) ?? asFinite(record.score);
    if (elo === null) continue;
    if (elo < min) min = elo;
    if (elo > max) max = elo;
  }
  if (min === Number.POSITIVE_INFINITY) return out;
  const range = max - min || ARENA_MIN_RANGE;
  for (const entry of entries) {
    const record = asRecord(entry);
    if (record === null) continue;
    const model = normId(record.model);
    if (!model) continue;
    const elo = asFinite(record.elo) ?? asFinite(record.score);
    // No usable signal: skip the row, never fabricate an ELO.
    if (elo === null) continue;
    const score = clamp01(ARENA_FIT_FLOOR + ARENA_FIT_WIDTH * ((elo - min) / range));
    // One scalar per model — no per-category signal exists, so the same
    // score fans out to all 7 categories (see fanOutCategories).
    out.push(
      ...fanOutCategories({
        model,
        source: "arena_elo_external",
        score,
        eloRaw: elo,
      })
    );
  }
  return out;
}
