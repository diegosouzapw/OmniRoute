import {
  QUANTUM_PATTERNS,
  type QuantumLockConfig,
  type VolatileSpan,
} from "./quantumPatterns.ts";

interface PrioritizedSpan extends VolatileSpan {
  prio: number;
}

/**
 * Detect non-semantic volatile spans in `text`, in the FIXED pattern order, then merge
 * overlapping spans so a token is never double-replaced. Pure + fail-open: a throwing
 * pattern aborts the scan and returns [] (QuantumLock must never corrupt a request).
 *
 * Merge rule (widest wins): sort by start asc, then by width desc, then by priority asc
 * (earlier pattern = higher precedence); greedily keep a span only if it starts at/after
 * the last accepted span's end.
 */
export function detectVolatileSpans(text: string, cfg: QuantumLockConfig): VolatileSpan[] {
  if (!text) return [];
  const allow = cfg.categories && cfg.categories.length > 0 ? new Set(cfg.categories) : null;
  const raw: PrioritizedSpan[] = [];

  try {
    QUANTUM_PATTERNS.forEach(({ category, pattern }, prio) => {
      if (allow && !allow.has(category)) return;
      pattern.lastIndex = 0;
      let m: RegExpExecArray | null;
      while ((m = pattern.exec(text)) !== null) {
        if (m[0].length === 0) {
          pattern.lastIndex++;
          continue;
        }
        raw.push({ start: m.index, end: m.index + m[0].length, category, prio });
      }
    });
  } catch {
    return [];
  }

  raw.sort((a, b) => a.start - b.start || b.end - a.end || a.prio - b.prio);

  // Greedy non-overlapping sweep: accept a span only if it starts at/after the last accepted
  // span's end. A nested or PARTIALLY-overlapping span is dropped whole (never split) — this is
  // always SAFE (it can only under-stabilize, never corrupt text or shift placeholder numbering).
  // With the current `\b`-anchored patterns true partial overlaps are unreachable; the drop rule
  // is the conservative default if a future pattern can produce one.
  const merged: VolatileSpan[] = [];
  let lastEnd = -1;
  for (const s of raw) {
    if (s.start >= lastEnd) {
      merged.push({ start: s.start, end: s.end, category: s.category });
      lastEnd = s.end;
    }
  }
  return merged;
}
