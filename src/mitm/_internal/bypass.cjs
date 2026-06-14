/**
 * Bypass / passthrough routing primitives used by `src/mitm/server.cjs`.
 *
 * This file exists because:
 *   - `server.cjs` runs as a standalone CommonJS process and cannot import
 *     the ESM/TS source of `src/mitm/passthrough.ts` or
 *     `src/mitm/targets/index.ts`.
 *   - We still want unit tests to cover the bypass/passthrough decision
 *     without spawning the actual TLS server (which would require certs and
 *     ROUTER_API_KEY).
 *
 * Defaults MUST mirror `DEFAULT_BYPASS_PATTERNS` in
 * `src/mitm/passthrough.ts`. User bypass patterns are produced by
 * `src/mitm/manager.ts::writeBypassJson` and loaded by `server.cjs` at
 * boot from `<DATA_DIR>/mitm/bypass.json`.
 *
 * Plan reference:
 *   - 11-agent-bridge.plan.md §4.6 (passthrough/bypass)
 *   - master-plan-group-A.md §3.5 (header injection contract)
 *   - master-plan-group-A.md §12 #16 (passthrough acceptance criterion)
 */

"use strict";

// Default bypass patterns — banks, governments, SSO providers. Must stay in
// sync with src/mitm/passthrough.ts::DEFAULT_BYPASS_PATTERNS.
const DEFAULT_BYPASS_PATTERNS = [
  /\.bank\./i,
  /(^|\.)gov(\.|$)/i,
  /(^|\.)okta\.com$/i,
  /(^|\.)auth0\.com$/i,
];

/**
 * Match a hostname against a simple glob pattern (only `*` wildcard).
 * Linear, ReDoS-safe — mirrors `globMatch` in src/mitm/passthrough.ts.
 *
 * @param {string} hostname
 * @param {string} pattern
 * @returns {boolean}
 */
function bypassGlobMatch(hostname, pattern) {
  const segments = String(pattern).toLowerCase().split("*");
  if (segments.length > 9) return false;
  const h = String(hostname).toLowerCase();
  if (segments.length === 1) return h === segments[0];
  const first = segments[0];
  if (first && !h.startsWith(first)) return false;
  const last = segments[segments.length - 1];
  if (last && !h.endsWith(last)) return false;
  let pos = first.length;
  for (let i = 1; i < segments.length - 1; i++) {
    const seg = segments[i];
    if (seg === "") continue;
    const idx = h.indexOf(seg, pos);
    if (idx === -1) return false;
    pos = idx + seg.length;
  }
  if (last) {
    const minEnd = pos + last.length;
    if (minEnd > h.length) return false;
  }
  return true;
}

/**
 * Decide what to do with a connection (CONNECT or direct TLS) to `hostname`.
 * Returns one of:
 *   - "bypass": tunnel without TLS decrypt; never log body/headers.
 *   - "target": hostname matches the AgentBridge target set — proceed with
 *     local TLS termination.
 *   - "passthrough": neither bypass nor target — transparent TCP tunnel.
 *
 * Precedence matches `src/mitm/targets/index.ts::routeConnection`:
 *   bypass > target > passthrough
 *
 * @param {string} hostname
 * @param {Iterable<string>} targetHosts - set/array of known target hosts
 * @param {string[]} userBypassPatterns - lowercased user glob strings
 * @returns {"bypass" | "target" | "passthrough"}
 */
function routeBypass(hostname, targetHosts, userBypassPatterns) {
  if (!hostname) return "passthrough";
  const h = String(hostname).toLowerCase();
  if (DEFAULT_BYPASS_PATTERNS.some((re) => re.test(h))) return "bypass";
  const patterns = Array.isArray(userBypassPatterns) ? userBypassPatterns : [];
  if (patterns.some((p) => bypassGlobMatch(h, p))) return "bypass";
  // targetHosts may be a Set, an array, or any iterable with `.has` semantics.
  if (targetHosts && typeof targetHosts.has === "function") {
    if (targetHosts.has(h)) return "target";
  } else if (Array.isArray(targetHosts)) {
    if (targetHosts.includes(h)) return "target";
  }
  return "passthrough";
}

/**
 * Parse a `bypass.json` file content blob into an array of lowercased user
 * glob patterns. Pure function — no fs I/O — so this shim stays free of any
 * path-traversal surface (CWE-22). The actual file read lives in
 * `server.cjs`, which knows the trusted, pre-resolved file path.
 *
 * Returns [] when the input is missing or malformed — the proxy must keep
 * working even when the user has never customized the bypass list.
 *
 * @param {string} raw - file contents (utf-8 JSON) or empty string
 * @returns {string[]}
 */
function parseBypassJson(raw) {
  if (typeof raw !== "string" || raw.length === 0) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.patterns)) return [];
    return parsed.patterns
      .filter((p) => typeof p === "string" && p.length > 0)
      .map((p) => p.toLowerCase());
  } catch {
    return [];
  }
}

module.exports = {
  DEFAULT_BYPASS_PATTERNS,
  bypassGlobMatch,
  routeBypass,
  parseBypassJson,
};
