// open-sse/services/compression/engines/session-dedup/fuzzy.ts
import { storeBlock } from "../ccr/index.ts";

type MessageLike = { role?: string; content?: unknown; [key: string]: unknown };

/** Hard cap on blocks compared in the fuzzy O(n²) pass (fail-safe bound). */
export const MAX_FUZZY_BLOCKS = 200;

/** FNV-1a 32-bit hash (deterministic, cheap, no Math.random). */
function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Set of k-word shingle hashes (default k=3). Empty when the text has < k words. */
export function shingles(text: string, k = 3): Set<number> {
  const words = text.split(/\s+/).filter(Boolean);
  const out = new Set<number>();
  if (words.length < k) return out;
  for (let i = 0; i + k <= words.length; i++) {
    out.add(fnv1a(words.slice(i, i + k).join(" ")));
  }
  return out;
}

/** Jaccard similarity |a∩b| / |a∪b| (0..1; 0 when both empty). */
export function jaccard(a: Set<number>, b: Set<number>): number {
  if (a.size === 0 && b.size === 0) return 0;
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  let inter = 0;
  for (const x of small) if (large.has(x)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

export interface FuzzyBlock {
  text: string;
  index: number;
}
export interface NearDuplicate {
  block: FuzzyBlock;
  matchedIndex: number;
  similarity: number;
}

/**
 * For each block, find the EARLIER block with the highest Jaccard ≥ minJaccard.
 * O(n²); returns [] when blocks.length > maxBlocks (fail-safe bound, no blowup).
 */
export function findNearDuplicates(
  blocks: FuzzyBlock[],
  minJaccard: number,
  maxBlocks: number,
  shingleSize = 3
): NearDuplicate[] {
  if (blocks.length > maxBlocks) return [];
  const sets = blocks.map((b) => shingles(b.text, shingleSize));
  const out: NearDuplicate[] = [];
  for (let i = 0; i < blocks.length; i++) {
    let best = -1;
    let bestSim = 0;
    for (let j = 0; j < i; j++) {
      const sim = jaccard(sets[i], sets[j]);
      if (sim >= minJaccard && sim > bestSim) {
        bestSim = sim;
        best = j;
      }
    }
    if (best >= 0) {
      out.push({ block: blocks[i], matchedIndex: blocks[best].index, similarity: bestSim });
    }
  }
  return out;
}

export interface FuzzyPassOptions {
  minJaccard: number;
  shingleSize: number;
  maxBlocks: number;
  minBlockChars: number;
  principalId?: string;
}
export interface FuzzyPassResult {
  messages: MessageLike[];
  fuzzyCount: number;
}

/**
 * Near-duplicate second pass over WHOLE string-content messages. A later message ≥minJaccard
 * similar to an earlier one is stored in the CCR store and replaced inline with a recoverable
 * `[CCR retrieve …]` marker (only when the marker shrinks). FAIL-OPEN: any error → no-op.
 */
export function applyFuzzyPass(messages: MessageLike[], opts: FuzzyPassOptions): FuzzyPassResult {
  try {
    const blocks: FuzzyBlock[] = [];
    for (let i = 0; i < messages.length; i++) {
      const m = messages[i];
      if (m.role === "system") continue;
      if (typeof m.content === "string" && m.content.length >= opts.minBlockChars) {
        blocks.push({ text: m.content, index: i });
      }
    }
    if (blocks.length < 2) return { messages, fuzzyCount: 0 };

    const nearDups = findNearDuplicates(blocks, opts.minJaccard, opts.maxBlocks, opts.shingleSize);
    if (nearDups.length === 0) return { messages, fuzzyCount: 0 };

    const replacements = new Map<number, string>();
    for (const nd of nearDups) {
      const hash = storeBlock(nd.block.text, opts.principalId);
      const marker = `[CCR retrieve hash=${hash} chars=${nd.block.text.length}]`;
      if (marker.length < nd.block.text.length) replacements.set(nd.block.index, marker);
    }
    if (replacements.size === 0) return { messages, fuzzyCount: 0 };

    const out = messages.map((m, i) =>
      replacements.has(i) ? { ...m, content: replacements.get(i) } : m
    );
    return { messages: out, fuzzyCount: replacements.size };
  } catch {
    return { messages, fuzzyCount: 0 };
  }
}

/**
 * Resolve the `fuzzy` step-config (a bare boolean OR `{ enabled, minJaccard?, shingleSize? }`)
 * and run the near-duplicate pass. Returns the messages unchanged + `fuzzyCount: 0` when disabled.
 * Keeps the engine's `apply()` thin (config normalization + dispatch live here).
 */
export function runFuzzyPass(
  messages: MessageLike[],
  stepConfig: Record<string, unknown>,
  minBlockChars: number,
  principalId?: string
): FuzzyPassResult {
  const raw = stepConfig["fuzzy"] as
    | boolean
    | { enabled?: boolean; minJaccard?: number; shingleSize?: number }
    | undefined;
  const cfg = typeof raw === "boolean" ? { enabled: raw } : raw;
  if (!cfg?.enabled) return { messages, fuzzyCount: 0 };
  return applyFuzzyPass(messages, {
    minJaccard: typeof cfg.minJaccard === "number" ? cfg.minJaccard : 0.85,
    shingleSize: typeof cfg.shingleSize === "number" ? cfg.shingleSize : 3,
    maxBlocks: MAX_FUZZY_BLOCKS,
    minBlockChars,
    principalId,
  });
}
