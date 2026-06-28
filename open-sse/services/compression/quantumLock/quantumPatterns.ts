/**
 * QuantumLock leaf module: category enum, span/config/stats types, constants, and the
 * fixed-order, ReDoS-bounded detection patterns. No imports — keeps every consumer one-way
 * (cycle-safe). See docs/superpowers/specs/2026-06-28-compression-quantumlock-design.md.
 */

export type QuantumCategory =
  | "uuid"
  | "unix_ts"
  | "long_hex"
  | "jwt"
  | "api_key_shape"
  | "request_id";

export interface VolatileSpan {
  start: number; // inclusive char offset into the system text
  end: number; // exclusive
  category: QuantumCategory;
}

export interface QuantumLockConfig {
  enabled: boolean;
  /** Subset of categories to stabilize. Absent/empty ⇒ all categories. */
  categories?: QuantumCategory[];
}

export interface QuantumLockStats {
  fragments: number;
  categories: Partial<Record<QuantumCategory, number>>;
}

/** Idempotency sentinel + tail header. Its presence in system text ⇒ already stabilized. */
export const TAIL_DELIM = "⟦QUANTUMLOCK⟧";

/** Positional, value-independent placeholder. Depends ONLY on match index. */
export const placeholderFor = (i: number): string => `⟦Q${i}⟧`;

interface QuantumPattern {
  category: QuantumCategory;
  pattern: RegExp;
}

/**
 * Detection order is FIXED: most-specific / widest first so a token is never split.
 * Every variable-length run is bounded ({N,M}) — no unbounded quantifier (anti-ReDoS).
 */
export const QUANTUM_PATTERNS: QuantumPattern[] = [
  // JWTs start with base64url of `{"` → "eyJ". Run first so the whole token wins.
  {
    category: "jwt",
    pattern: /\beyJ[A-Za-z0-9_-]{8,512}\.[A-Za-z0-9_-]{8,512}\.[A-Za-z0-9_-]{8,512}\b/g,
  },
  // Prefixed API keys (stripe/github/slack shapes).
  {
    category: "api_key_shape",
    pattern: /\b(?:sk|pk|rk|ghp|gho|xox[baprs])[-_][A-Za-z0-9]{16,200}\b/g,
  },
  // Bearer tokens. Bounded whitespace ([ \t]{1,4}) per the file convention (no unbounded \s+).
  {
    category: "api_key_shape",
    pattern: /\bBearer[ \t]{1,4}[A-Za-z0-9._-]{16,400}\b/g,
  },
  // Canonical UUID. Runs before long_hex so its inner hex is not re-claimed.
  {
    category: "uuid",
    pattern: /\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi,
  },
  // Correlation / request ids.
  {
    category: "request_id",
    pattern: /\b(?:req|trace|span|corr|request)[-_][A-Za-z0-9]{6,128}\b/gi,
  },
  // Digests / SHAs. After uuid/jwt so it never eats their inner hex.
  { category: "long_hex", pattern: /\b[0-9a-f]{16,128}\b/gi },
  // 10- or 13-digit unix epoch in the 2001–2033 window (leading 1). LAST so it never
  // fragments a longer token already claimed above.
  { category: "unix_ts", pattern: /\b1[0-9]{9}(?:[0-9]{3})?\b/g },
];
