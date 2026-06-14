/**
 * Passthrough / bypass logic for the MITM server.
 * Determines which hostnames should be tunneled without TLS decryption.
 *
 * Precedence: bypass list > target match > passthrough default.
 * Source: plano 11 §4.6 (origin: llm-interceptor filters.py::ignore_hosts)
 */

/**
 * Built-in bypass patterns — hosts that must NEVER be TLS-decrypted.
 * Banks, government sites, and corporate SSO providers.
 */
export const DEFAULT_BYPASS_PATTERNS: RegExp[] = [
  /\.bank\./i,
  /(^|\.)gov(\.|$)/i,
  /(^|\.)okta\.com$/i,
  /(^|\.)auth0\.com$/i,
];

/**
 * Match a hostname against a simple glob pattern (only * as wildcard, no ** or ?).
 * Implemented without RegExp to avoid ReDoS on user-supplied patterns (CWE-1333).
 * Uses a linear split-and-check algorithm: split by '*', verify each segment appears
 * in order within the lowercase hostname.
 */
export function globMatch(hostname: string, pattern: string): boolean {
  // Guard: reject patterns with more than 8 segments (after split) to bound complexity
  const segments = pattern.toLowerCase().split("*");
  if (segments.length > 9) return false;

  const h = hostname.toLowerCase();

  // No wildcard — exact match
  if (segments.length === 1) return h === segments[0];

  // Must start with the first segment (if non-empty)
  const first = segments[0];
  if (first && !h.startsWith(first)) return false;

  // Must end with the last segment (if non-empty)
  const last = segments[segments.length - 1];
  if (last && !h.endsWith(last)) return false;

  // Walk through middle segments verifying each appears after the previous match
  let pos = first.length;
  for (let i = 1; i < segments.length - 1; i++) {
    const seg = segments[i];
    if (seg === "") continue; // consecutive wildcards — skip
    const idx = h.indexOf(seg, pos);
    if (idx === -1) return false;
    pos = idx + seg.length;
  }

  // Ensure the last fixed segment doesn't overlap with middle matches
  if (last) {
    const minEnd = pos + last.length;
    if (minEnd > h.length) return false;
  }

  return true;
}

/**
 * Determine if a hostname should be bypassed (tunneled without TLS decryption).
 *
 * @param hostname - The target hostname (SNI or Host header value)
 * @param userBypass - User-configured bypass patterns (glob strings or regexes)
 * @returns true if the hostname should be tunneled without inspection
 */
export function shouldBypass(hostname: string, userBypass: string[]): boolean {
  // Default bypass patterns take precedence
  if (DEFAULT_BYPASS_PATTERNS.some((re) => re.test(hostname))) return true;

  // User-defined bypass patterns (glob strings)
  return userBypass.some((p) => globMatch(hostname, p));
}
