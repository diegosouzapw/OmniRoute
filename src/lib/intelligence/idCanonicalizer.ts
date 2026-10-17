/**
 * idCanonicalizer.ts — ID canonicalization with confidence scoring.
 */
import { resolveScoresAs } from "@omniroute/open-sse/services/autoCombo/scoresAs.ts";

export interface CanonicalMatch {
  canonicalId: string;
  sourceId: string;
  matchConfidence: number;
}

export function canonicalize(model: string): CanonicalMatch {
  const m = model.toLowerCase().trim();
  const { base, via } = resolveScoresAs(m);
  if (base && base !== m) {
    return { canonicalId: base, sourceId: m, matchConfidence: 0.95 };
  }
  return { canonicalId: m, sourceId: m, matchConfidence: 0.9 };
}
