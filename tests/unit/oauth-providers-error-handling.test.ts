/**
 * Structural regression tests for OAuth provider error handling.
 *
 * These are text-based assertions on source files (no network calls).
 * They verify that each refresh function:
 *   - Exists with the expected signature
 *   - Handles the provider-specific unrecoverable error codes
 *   - Returns the normalized { error: "unrecoverable_refresh_error", code } sentinel
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "fs/promises";
import path from "path";

const root = path.resolve(import.meta.dirname, "../..");
const read = (rel: string) => readFile(path.join(root, rel), "utf8");

// ─── P0: GitLab Duo ───────────────────────────────────────────────────────────

test("P0: gitlab-duo is registered in providerRegistry", async () => {
  // The provider registry was modularized into per-provider plugin files (#3993),
  // so a text grep of providerRegistry.ts (now a thin re-export barrel) no longer
  // finds the literal key. Assert registration at runtime instead, preserving the
  // test's intent ("gitlab-duo is registered").
  const { REGISTRY, getRegistryEntry } = await import("../../open-sse/config/providerRegistry.ts");
  assert.ok("gitlab-duo" in REGISTRY, "gitlab-duo must be a key in REGISTRY");
  assert.ok(getRegistryEntry("gitlab-duo"), "getRegistryEntry('gitlab-duo') must be non-null");
});

test("P0: refreshGitLabDuoToken exists and handles invalid_grant as unrecoverable", async () => {
  // refreshGitLabDuoToken lives in its own co-located provider module since the
  // tokenRefresh.ts provider-extraction (originally proposed in #7338, redone
  // on tip) — tokenRefresh.ts now only re-exports it.
  const src = await read("open-sse/services/tokenRefresh/providers/gitlabDuo.ts");
  assert.match(
    src,
    /export\s+async\s+function\s+refreshGitLabDuoToken\(/,
    "refreshGitLabDuoToken must be exported"
  );

  // Extract the function body
  const fnMatch = src.match(/export\s+async\s+function\s+refreshGitLabDuoToken\([\s\S]+?\n\}/);
  assert.ok(fnMatch, "refreshGitLabDuoToken function body not found");
  assert.match(fnMatch[0], /invalid_grant/, "must detect invalid_grant");
  assert.match(fnMatch[0], /unrecoverable_refresh_error/, "must return unrecoverable sentinel");
});

test("P0: gitlab-duo case exists in _getAccessTokenInternal", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
  assert.match(src, /case\s+["']gitlab-duo["']/, "gitlab-duo case must exist in switch");
});

test("P0: gitlab-duo is in supportsTokenRefresh explicit set", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
  // Find the explicitlySupported Set
  const setMatch = src.match(/const\s+explicitlySupported\s*=\s*new\s+Set\(\[[\s\S]+?\]\)/);
  assert.ok(setMatch, "explicitlySupported Set not found");
  assert.match(setMatch[0], /["']gitlab-duo["']/, "gitlab-duo must be in explicitlySupported");
});

// ─── P1: Kimi Coding stable device_id ────────────────────────────────────────

test("P1: refreshKimiCodingToken accepts providerSpecificData parameter", async () => {
  // refreshKimiCodingToken lives in its own co-located provider module since
  // the tokenRefresh.ts provider-extraction (#7338, redone on tip).
  const src = await read("open-sse/services/tokenRefresh/providers/kimiCoding.ts");
  assert.match(
    src,
    /export\s+async\s+function\s+refreshKimiCodingToken\([^)]*providerSpecificData/,
    "refreshKimiCodingToken must accept providerSpecificData"
  );
});

test("P1: refreshKimiCodingToken does NOT use ephemeral Date.now() device ID", async () => {
  const src = await read("open-sse/services/tokenRefresh/providers/kimiCoding.ts");
  // Extract function body — match from declaration to next top-level export function
  const fnMatch = src.match(/export\s+async\s+function\s+refreshKimiCodingToken\([\s\S]+?\n\}/);
  assert.ok(fnMatch, "refreshKimiCodingToken function body not found");
  assert.doesNotMatch(
    fnMatch[0],
    /["']kimi-refresh-["']\s*\+\s*Date\.now\(\)/,
    "must NOT use ephemeral kimi-refresh-+Date.now() device ID"
  );
});

test("P1: refreshKimiCodingToken handles invalid_grant as unrecoverable", async () => {
  const src = await read("open-sse/services/tokenRefresh/providers/kimiCoding.ts");
  const fnMatch = src.match(/export\s+async\s+function\s+refreshKimiCodingToken\([\s\S]+?\n\}/);
  assert.ok(fnMatch, "refreshKimiCodingToken function body not found");
  assert.match(fnMatch[0], /invalid_grant/, "must detect invalid_grant");
  assert.match(fnMatch[0], /unrecoverable_refresh_error/, "must return unrecoverable sentinel");
});

test("P1: _getAccessTokenInternal passes providerSpecificData to refreshKimiCodingToken", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
  // The case for kimi-coding should pass credentials.providerSpecificData
  assert.match(
    src,
    /case\s+["']kimi-coding["']:[\s\S]{1,300}providerSpecificData/,
    "kimi-coding case must pass providerSpecificData"
  );
});

// ─── P1: GitHub Copilot sub-token health check ────────────────────────────────

test("P1: GitHub Copilot sub-token is refreshed by tokenHealthCheck", async () => {
  const src = await read("src/lib/tokenHealthCheck.ts");
  assert.match(src, /copilot|Copilot/i, "tokenHealthCheck must reference Copilot");
  // Must import refreshCopilotToken
  assert.match(src, /refreshCopilotToken/, "must import and call refreshCopilotToken");
});

test("P1: tokenHealthCheck checks copilotTokenExpiresAt before refreshing", async () => {
  const src = await read("src/lib/tokenHealthCheck.ts");
  assert.match(src, /copilotTokenExpiresAt/, "must check copilotTokenExpiresAt");
  assert.match(src, /toLowerCase\(\)\s*===\s*["']github["']/, "must be gated on github provider");
});

// ─── P1: case-insensitive provider comparisons (regression for #6947) ────────
//
// tokenHealthCheck.checkConnection() gates two decisions on `conn.provider`:
//   1. ROTATING_REFRESH_PROVIDERS.has(conn.provider) — skips the fixed-interval
//      refresh sweep for single-use-refresh-token providers (codex/openai/etc).
//   2. conn.provider === "github" — gates the Copilot sub-token refresh.
// Both membership tests were case-sensitive while `conn.provider` can be stored
// in mixed case (e.g. "OpenAI", "Github"), silently disabling the guard. These
// assertions are scoped to the exact statement (not a whole-file scan), so they
// fail against the unfixed source — verified against
// `git show origin/release/v3.8.47:src/lib/tokenHealthCheck.ts` (lines 535/758).

test("P1: ROTATING_REFRESH_PROVIDERS.has() normalizes conn.provider case before lookup", async () => {
  const src = await read("src/lib/tokenHealthCheck.ts");
  const assignMatch = src.match(
    /const\s+isRotatingProvider\s*=\s*ROTATING_REFRESH_PROVIDERS\.has\(\s*([\s\S]{0,80}?)\s*\);/
  );
  assert.ok(assignMatch, "isRotatingProvider assignment not found");
  const arg = assignMatch[1];
  assert.match(
    arg,
    /String\(\s*conn\.provider\s*\|\|\s*["']["']\s*\)\.toLowerCase\(\)/,
    "ROTATING_REFRESH_PROVIDERS.has() must lowercase-normalize conn.provider before the lookup " +
      "(bare `conn.provider` fails for 'OpenAI'/'Github' since the Set is all-lowercase)"
  );
});

test("P1: GitHub Copilot sub-token guard normalizes conn.provider case", async () => {
  // The post-refresh Copilot sub-token guard was extracted out of
  // tokenHealthCheck.ts into tokenHealthCheckCopilot.ts (own-growth file-size
  // rebalance for #7719); the structural guard now lives there.
  const src = await read("src/lib/tokenHealthCheckCopilot.ts");
  const guardMatch = src.match(
    /if\s*\(\s*String\(\s*conn\.provider\s*\|\|\s*["']["']\s*\)\.toLowerCase\(\)\s*(!==|===)\s*["']github["']\s*\)/
  );
  assert.ok(guardMatch, "Copilot sub-token provider guard not found");
  assert.match(
    guardMatch[0],
    /String\(\s*conn\.provider\s*\|\|\s*["']["']\s*\)\.toLowerCase\(\)/,
    "the Copilot sub-token refresh guard must lowercase-normalize conn.provider before comparing " +
      "to 'github' (bare `conn.provider === \"github\"` fails for mixed-case values like 'Github')"
  );
});

// ─── P2: Google invalid_grant ─────────────────────────────────────────────────

test("P2: refreshGoogleToken parses invalid_grant as unrecoverable", async () => {
  // refreshGoogleToken lives in its own co-located provider module since the
  // tokenRefresh.ts provider-extraction (#7338, redone on tip).
  const src = await read("open-sse/services/tokenRefresh/providers/google.ts");
  const fnMatch = src.match(/export\s+async\s+function\s+refreshGoogleToken\([\s\S]+?\n\}/);
  assert.ok(fnMatch, "refreshGoogleToken function body not found");
  assert.match(fnMatch[0], /invalid_grant/, "must detect invalid_grant");
  assert.match(fnMatch[0], /unrecoverable_refresh_error/, "must return unrecoverable sentinel");
});

// ─── P2: Kiro AWS InvalidGrantException ──────────────────────────────────────

test("P2: refreshKiroToken parses AWS InvalidGrantException", async () => {
  // refreshKiroToken lives in its own co-located provider module since the
  // tokenRefresh.ts provider-extraction (#7338, redone on tip).
  const src = await read("open-sse/services/tokenRefresh/providers/kiro.ts");
  const fnMatch = src.match(/export\s+async\s+function\s+refreshKiroToken\([\s\S]+?\n\}/);
  assert.ok(fnMatch, "refreshKiroToken function body not found");
  assert.match(
    fnMatch[0],
    /InvalidGrantException|ExpiredTokenException/,
    "must detect AWS error types"
  );
  assert.match(fnMatch[0], /unrecoverable_refresh_error/, "must return unrecoverable sentinel");
});

test("P2: refreshKiroToken handles AWS errors on both AWS OIDC and social auth paths", async () => {
  const src = await read("open-sse/services/tokenRefresh/providers/kiro.ts");
  const fnMatch = src.match(/export\s+async\s+function\s+refreshKiroToken\([\s\S]+?\n\}/);
  assert.ok(fnMatch, "refreshKiroToken function body not found");
  // Count occurrences of InvalidGrantException — should appear in both paths
  const matchCount = (fnMatch[0].match(/InvalidGrantException/g) || []).length;
  assert.ok(
    matchCount >= 2,
    `InvalidGrantException should be checked in both paths (found ${matchCount} occurrences)`
  );
});

// ─── P3: Claude error shape normalization ─────────────────────────────────────

test("P3: refreshClaudeOAuthToken normalizes invalid_grant to unrecoverable_refresh_error sentinel", async () => {
  // refreshClaudeOAuthToken lives in its own co-located provider module since
  // the tokenRefresh.ts provider-extraction (#7338, redone on tip).
  const src = await read("open-sse/services/tokenRefresh/providers/claudeOAuth.ts");
  const fnMatch = src.match(/export\s+async\s+function\s+refreshClaudeOAuthToken\([\s\S]+?\n\}/);
  assert.ok(fnMatch, "refreshClaudeOAuthToken function body not found");
  assert.match(
    fnMatch[0],
    /unrecoverable_refresh_error[\s\S]{1,100}invalid_grant|invalid_grant[\s\S]{1,100}unrecoverable_refresh_error/,
    "invalid_grant must map to unrecoverable_refresh_error sentinel"
  );
  // Must NOT return the old non-normalized shape { error: errorBody.error, code: "http_..." }
  assert.doesNotMatch(
    fnMatch[0],
    /code:\s*`http_\$\{response\.status\}`/,
    "must NOT return http_NNN code format for invalid_grant"
  );
});

// ─── P3: Windsurf Firebase errors ────────────────────────────────────────────

test("P3: refreshWindsurfToken parses Firebase USER_DISABLED/TOKEN_EXPIRED errors", async () => {
  // refreshWindsurfToken lives in its own co-located provider module since the
  // tokenRefresh.ts provider-extraction (#7338, redone on tip).
  const src = await read("open-sse/services/tokenRefresh/providers/windsurf.ts");
  const fnMatch = src.match(/export\s+async\s+function\s+refreshWindsurfToken\([\s\S]+?\n\}/);
  assert.ok(fnMatch, "refreshWindsurfToken function body not found");
  assert.match(
    fnMatch[0],
    /USER_DISABLED|TOKEN_EXPIRED|INVALID_REFRESH_TOKEN/,
    "must detect Firebase error codes"
  );
  assert.match(fnMatch[0], /unrecoverable_refresh_error/, "must return unrecoverable sentinel");
});

// ─── isUnrecoverableRefreshError consistency ──────────────────────────────────

test("isUnrecoverableRefreshError detects the normalized sentinel shape", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
  const fnMatch = src.match(/export\s+function\s+isUnrecoverableRefreshError\([\s\S]+?\n\}/);
  assert.ok(fnMatch, "isUnrecoverableRefreshError function body not found");
  assert.match(
    fnMatch[0],
    /unrecoverable_refresh_error/,
    "must detect unrecoverable_refresh_error"
  );
});
