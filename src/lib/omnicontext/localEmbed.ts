/**
 * Deterministic local hash embedding for OmniContext hybrid retrieve.
 * Avoids coupling to Memory's vec_memories store; optional Memory embed() upgrade path.
 */

const DIMS = 64;

/** Simple bag-of-hashed-tokens embedding — stable across runs, no network. */
export function localHashEmbed(text: string, dims = DIMS): number[] {
  const vec = new Array<number>(dims).fill(0);
  const tokens = text
    .toLowerCase()
    .normalize("NFKC")
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1);
  if (tokens.length === 0) return vec;
  for (const token of tokens) {
    let h = 2166136261;
    for (let i = 0; i < token.length; i++) {
      h ^= token.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    const idx = Math.abs(h) % dims;
    vec[idx] += 1;
    vec[(idx + 1) % dims] += 0.5;
  }
  // L2 normalize
  let norm = 0;
  for (const v of vec) norm += v * v;
  norm = Math.sqrt(norm) || 1;
  return vec.map((v) => v / norm);
}

export const LOCAL_EMBED_MODEL = "omnicontext-local-hash";
export const LOCAL_EMBED_DIMS = DIMS;
