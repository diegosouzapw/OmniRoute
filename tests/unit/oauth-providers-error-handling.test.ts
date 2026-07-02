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
  const src = await read("open-sse/services/tokenRefresh.ts");
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
  const src = await read("open-sse/services/tokenRefresh.ts");
  assert.match(
    src,
    /export\s+async\s+function\s+refreshKimiCodingToken\([^)]*providerSpecificData/,
    "refreshKimiCodingToken must accept providerSpecificData"
  );
});

test("P1: refreshKimiCodingToken does NOT use ephemeral Date.now() device ID", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
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
  const src = await read("open-sse/services/tokenRefresh.ts");
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
  assert.match(src, /conn\.provider\s*===\s*["']github["']/, "must be gated on github provider");
});

// ─── P2: Google invalid_grant ─────────────────────────────────────────────────

test("P2: refreshGoogleToken parses invalid_grant as unrecoverable", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
  const fnMatch = src.match(/export\s+async\s+function\s+refreshGoogleToken\([\s\S]+?\n\}/);
  assert.ok(fnMatch, "refreshGoogleToken function body not found");
  assert.match(fnMatch[0], /invalid_grant/, "must detect invalid_grant");
  assert.match(fnMatch[0], /unrecoverable_refresh_error/, "must return unrecoverable sentinel");
});

// ─── P2: Qwen invalid_grant ───────────────────────────────────────────────────

test("P2: refreshQwenToken handles invalid_grant in addition to invalid_request", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
  const fnMatch = src.match(/export\s+async\s+function\s+refreshQwenToken\([\s\S]+?\n\}/);
  assert.ok(fnMatch, "refreshQwenToken function body not found");
  assert.match(fnMatch[0], /invalid_grant/, "must detect invalid_grant");
  assert.match(fnMatch[0], /unrecoverable_refresh_error/, "must return unrecoverable sentinel");
});

// ─── P2: Kiro AWS InvalidGrantException ──────────────────────────────────────

test("P2: refreshKiroToken parses AWS InvalidGrantException", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
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
  const src = await read("open-sse/services/tokenRefresh.ts");
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
  const src = await read("open-sse/services/tokenRefresh.ts");
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
  const src = await read("open-sse/services/tokenRefresh.ts");
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
