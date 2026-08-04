import { createHash } from "node:crypto";
import type { EvalCase, ContentKind } from "./types.ts";

const KINDS: ContentKind[] = ["tool-output-json", "logs", "code", "prose", "multi-turn"];

/** Best-effort PII markers; captured cases must be anonymized BEFORE ingestion. */
const PII_PATTERNS: RegExp[] = [
  /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/, // email
  /\b\d{3}-\d{2}-\d{4}\b/,                          // US SSN shape
  /\b(?:\d[ -]*?){13,16}\b/,                        // card-number shape
];

function looksLikePII(text: string): boolean {
  return PII_PATTERNS.some((re) => re.test(text));
}

/**
 * Validate + sanity-check a corpus. Throws on a malformed case so a bad corpus
 * fails loudly rather than silently skewing results. Captured cases (captured === true)
 * are rejected on obvious PII markers (D-D5 anonymization bar); curated seed cases
 * (captured falsy) are trusted as already-vetted.
 */
export function loadCorpus(rawCases: EvalCase[]): EvalCase[] {
  return rawCases.map((c) => {
    if (!c.id || !c.context || !c.question) {
      throw new Error(`eval corpus: case "${c.id ?? "?"}" missing id/context/question`);
    }
    if (!KINDS.includes(c.kind)) {
      throw new Error(`eval corpus: case "${c.id}" has unknown kind "${c.kind}"`);
    }
    if (c.captured === true && looksLikePII(c.context)) {
      throw new Error(`eval corpus: captured case "${c.id}" contains an obvious PII marker — anonymize before ingestion`);
    }
    return c;
  });
}

/** Stable, order-independent sha-256 hex over the canonical case payloads (for the report stamp). */
export function hashCorpus(cases: EvalCase[]): string {
  const canonical = cases
    .map((c) => JSON.stringify([c.id, c.kind, c.context, c.question, c.gold ?? null]))
    .sort()
    .join("\n");
  return createHash("sha256").update(canonical).digest("hex");
}
