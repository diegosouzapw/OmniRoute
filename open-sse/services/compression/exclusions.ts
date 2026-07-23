/**
 * Compression Exclusions (#8034) — per-model/endpoint exclusion filter.
 *
 * Lets an operator name model ids / `provider/model` targets that must NEVER be
 * compressed. Matching targets bypass the whole compression pipeline and pass
 * through byte-identical (see `chatCore.ts` — the check runs before any engine
 * executes). Default (empty/absent list) preserves pre-existing behavior exactly.
 *
 * Pattern syntax: `*` is the only wildcard. Every other regex metacharacter is
 * escaped before the pattern is compiled, so a pattern like `gpt-5.6` matches the
 * literal string only (not `gpt-5x6`) — never build a regex from raw operator
 * input without escaping (ReDoS convention, see CLAUDE.md).
 */

const MAX_EXCLUSIONS = 200;

export type CompressionExclusions = string[];

/** Escape every regex metacharacter except `*`, which the caller re-inserts as `.*`. */
function escapeExceptWildcard(pattern: string): string {
  return pattern.replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
}

/** Compile a single normalized (already lowercased/trimmed) pattern into a bounded regex. */
function compilePattern(pattern: string): RegExp {
  return new RegExp(`^${escapeExceptWildcard(pattern)}$`);
}

/**
 * Normalizes a raw settings value into a bounded list of lowercase, trimmed, deduped
 * patterns. Drops non-strings and blanks. Caps length so a pathological settings value
 * cannot make the per-request check expensive.
 */
export function normalizeCompressionExclusions(raw: unknown): CompressionExclusions {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const result: CompressionExclusions = [];
  for (const entry of raw) {
    if (typeof entry !== "string") continue;
    const trimmed = entry.trim().toLowerCase();
    if (!trimmed || seen.has(trimmed)) continue;
    seen.add(trimmed);
    result.push(trimmed);
    if (result.length >= MAX_EXCLUSIONS) break;
  }
  return result;
}

/**
 * True when the given target matches any configured exclusion pattern. Matches
 * case-insensitively against both the bare model id and the `provider/model`
 * composite, so `gpt-5-6`, `openai/gpt-5-6` and `openai/*` all work.
 */
export function isCompressionExcluded(
  target: { provider?: string | null; model?: string | null },
  exclusions: CompressionExclusions | undefined
): boolean {
  if (!exclusions || exclusions.length === 0) return false;

  const model = (target.model ?? "").trim().toLowerCase();
  const provider = (target.provider ?? "").trim().toLowerCase();
  if (!model && !provider) return false;

  const composite = provider && model ? `${provider}/${model}` : "";

  for (const pattern of exclusions) {
    if (!pattern) continue;
    const regex = compilePattern(pattern);
    if (model && regex.test(model)) return true;
    if (composite && regex.test(composite)) return true;
  }
  return false;
}
