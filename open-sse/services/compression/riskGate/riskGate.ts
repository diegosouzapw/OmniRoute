import { RISK_PATTERNS, SELF_EVIDENT, type RiskCategory } from "./riskPatterns.ts";

export interface RiskGateConfig {
  enabled: boolean;
  /** Subset of categories to scan for. Absent/empty ⇒ all categories. */
  categories?: RiskCategory[];
}

export interface RiskSpan {
  start: number; // inclusive char offset
  end: number; // exclusive
  category: RiskCategory;
}

interface Hit {
  start: number;
  end: number;
  category: RiskCategory;
}

const SHORT_SECTION = 200;
const MIN_DDL = 2;
const VCS_LINE = /^(?:commit [0-9a-f]{7,40}|Author:|Date:|diff --git |@@ |[+-]{3} )/m;
const DIFF_HUNK_LINE = /^[+-]/;

function isLikelyVcsContext(text: string): boolean {
  return VCS_LINE.test(text);
}

/** Collect raw regex hits for enabled categories (no guards yet). */
function collectRegexHits(text: string, enabled: Set<RiskCategory>): Hit[] {
  const hits: Hit[] = [];
  for (const { category, regex } of RISK_PATTERNS) {
    if (!enabled.has(category)) continue;
    regex.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = regex.exec(text)) !== null) {
      if (m[0].length === 0) {
        regex.lastIndex++;
        continue;
      }
      hits.push({ start: m.index, end: m.index + m[0].length, category });
    }
  }
  return hits;
}

/** True when the hit's line starts with a diff marker (`+`/`-`). */
function inDiffHunk(text: string, start: number): boolean {
  const lineStart = text.lastIndexOf("\n", start - 1) + 1;
  return DIFF_HUNK_LINE.test(text.slice(lineStart, lineStart + 1));
}

/** Structural k8s Secret detector: a YAML doc carrying `kind: Secret` + `data:`. */
function detectK8sSecret(text: string): Hit[] {
  const hits: Hit[] = [];
  const kindRe = /^kind:[ \t]*Secret\b/gm;
  let m: RegExpExecArray | null;
  while ((m = kindRe.exec(text)) !== null) {
    // Document boundaries: nearest `---`/start before, nearest `---`/end after.
    const prevSep = text.lastIndexOf("\n---", m.index);
    const docStart = prevSep === -1 ? 0 : prevSep + 1;
    const nextSep = text.indexOf("\n---", m.index);
    const docEnd = nextSep === -1 ? text.length : nextSep + 1;
    const doc = text.slice(docStart, docEnd);
    if (/^\s*(?:data|stringData):/m.test(doc)) {
      hits.push({ start: docStart, end: docEnd, category: "k8s_secret" });
    }
  }
  return hits;
}

function mergeSpans(spans: RiskSpan[]): RiskSpan[] {
  if (spans.length <= 1) return spans;
  const sorted = [...spans].sort((a, b) => a.start - b.start);
  const out: RiskSpan[] = [sorted[0]];
  for (let i = 1; i < sorted.length; i++) {
    const last = out[out.length - 1];
    const cur = sorted[i];
    if (cur.start <= last.end) {
      last.end = Math.max(last.end, cur.end);
    } else {
      out.push(cur);
    }
  }
  return out;
}

/**
 * Detect spans that should be shielded from compression. Pure and fail-open:
 * any internal error yields an empty result (never throws).
 */
export function detectRiskSpans(text: string, cfg: RiskGateConfig): RiskSpan[] {
  try {
    if (!text) return [];
    const enabled = new Set<RiskCategory>(
      cfg.categories?.length
        ? cfg.categories
        : (["stack_trace", "private_key", "secret_assignment", "k8s_secret", "db_migration", "legal"] as RiskCategory[])
    );
    const vcs = isLikelyVcsContext(text);

    const regexHits = collectRegexHits(text, enabled);
    const k8sHits = enabled.has("k8s_secret") ? detectK8sSecret(text) : [];

    // db_migration: require >=MIN_DDL hits; drop those inside a diff hunk.
    const ddl = regexHits.filter((h) => h.category === "db_migration" && !(vcs && inDiffHunk(text, h.start)));
    const ddlPromoted: RiskSpan[] =
      ddl.length >= MIN_DDL ? [{ start: ddl[0].start, end: ddl[ddl.length - 1].end, category: "db_migration" }] : [];

    // Guarded categories: secret_assignment, stack_trace, legal.
    const guarded = regexHits.filter(
      (h) => h.category === "secret_assignment" || h.category === "stack_trace" || h.category === "legal"
    );
    const selfEvident = regexHits.filter((h) => h.category === "private_key");

    // Count corroborating signals (self-evident + promoted-ddl + k8s + guarded).
    const signalCount = selfEvident.length + (ddlPromoted.length ? 1 : 0) + k8sHits.length + guarded.length;
    const shortSection = !vcs && text.length < SHORT_SECTION;
    const guardedPromoted = signalCount >= 2 || shortSection ? guarded : [];

    const promoted: RiskSpan[] = [
      ...selfEvident.map((h) => ({ start: h.start, end: h.end, category: h.category })),
      ...k8sHits.map((h) => ({ start: h.start, end: h.end, category: h.category })),
      ...ddlPromoted,
      ...guardedPromoted.map((h) => ({ start: h.start, end: h.end, category: h.category })),
    ];

    return mergeSpans(promoted);
  } catch {
    return [];
  }
}
