import { extractPreservedBlocks } from "./preservation.ts";

export interface FidelityGateConfig {
  enabled: boolean;
  /** % of input protected tokens that must survive. Default 95. */
  minTokenSurvivalPercent?: number;
  /** % of input JSON keys that must survive. Default 90. */
  minJsonKeyPercent?: number;
  /** Require every input number literal to appear in the output. Default true. */
  checkNumericIntegrity?: boolean;
  /** Require every input @@…@@ hunk header to appear in the output. Default true. */
  checkDiffHunks?: boolean;
}

export type FidelityInvariant = "protected-tokens" | "numeric" | "json-keys" | "diff-hunks";

export interface FidelityResult {
  passed: boolean;
  failedInvariant?: FidelityInvariant;
  detail?: string;
}

const CRITICAL_KINDS = new Set([
  "url",
  "const_case",
  "env_var",
  "version",
  "dotted_identifier",
  "function_call",
  "file_path",
  "inline_code",
]);

// Anti-ReDoS: all quantifiers are bounded.
// NUMERIC_RE matches a number plus any trailing run of digits/dots/commas (e.g. "1,3" in a diff
// hunk, "1," in JSON). This is intentional: comparing the same literal slice in input vs output
// keeps the check structural-aware and ReDoS-bounded ({0,40}).
const NUMERIC_RE = /\d[\d.,]{0,40}/g;
const JSON_KEY_RE = /"([A-Za-z_$][\w$-]{0,80})"\s*:/g;
const HUNK_RE = /@@ -\d{1,9}(?:,\d{1,9})? \+\d{1,9}(?:,\d{1,9})? @@/g;

function survivalRatio(needles: string[], haystack: string): number {
  if (needles.length === 0) return 1;
  let survived = 0;
  for (const n of needles) if (haystack.includes(n)) survived++;
  return survived / needles.length;
}

function uniq(values: Iterable<string>): string[] {
  return Array.from(new Set(values));
}

/**
 * Deterministic per-step fidelity check. Returns {passed:false, failedInvariant, detail}
 * on the FIRST failing invariant (cheap→expensive order), else {passed:true}.
 * FAIL-OPEN: any internal error → {passed:true} (a verifier bug must never block compression).
 */
export function checkFidelity(
  inputText: string,
  outputText: string,
  cfg: FidelityGateConfig
): FidelityResult {
  try {
    const tokens = uniq(
      extractPreservedBlocks(inputText)
        .blocks.filter((b) => CRITICAL_KINDS.has(b.kind))
        .map((b) => b.content.trim())
        .filter((c) => c.length > 0)
    );
    const minTok = (cfg.minTokenSurvivalPercent ?? 95) / 100;
    const tokRatio = survivalRatio(tokens, outputText);
    if (tokRatio < minTok) {
      return {
        passed: false,
        failedInvariant: "protected-tokens",
        detail: `tokens protegidos ${Math.round(tokRatio * 100)}% < ${Math.round(minTok * 100)}%`,
      };
    }

    if (cfg.checkDiffHunks !== false) {
      for (const h of uniq(inputText.match(HUNK_RE) ?? [])) {
        if (!outputText.includes(h)) {
          return {
            passed: false,
            failedInvariant: "diff-hunks",
            detail: `hunk "${h}" ausente no output`,
          };
        }
      }
    }

    if (cfg.checkNumericIntegrity !== false) {
      for (const num of uniq(inputText.match(NUMERIC_RE) ?? [])) {
        if (!outputText.includes(num)) {
          return {
            passed: false,
            failedInvariant: "numeric",
            detail: `número "${num}" ausente no output`,
          };
        }
      }
    }

    const keys = uniq(Array.from(inputText.matchAll(JSON_KEY_RE), (m) => m[1]));
    if (keys.length > 0) {
      const minKey = (cfg.minJsonKeyPercent ?? 90) / 100;
      const keyRatio = survivalRatio(
        keys.map((k) => `"${k}"`),
        outputText
      );
      if (keyRatio < minKey) {
        return {
          passed: false,
          failedInvariant: "json-keys",
          detail: `chaves JSON ${Math.round(keyRatio * 100)}% < ${Math.round(minKey * 100)}%`,
        };
      }
    }

    return { passed: true };
  } catch {
    return { passed: true };
  }
}
