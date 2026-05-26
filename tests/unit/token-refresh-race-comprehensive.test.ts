import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "fs/promises";
import path from "path";

const root = path.resolve(import.meta.dirname, "../..");

const read = (rel: string) => readFile(path.join(root, rel), "utf8");

test("Fix A: getAccessToken accepts an onPersist parameter", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
  // Accepts either the legacy `(result: any) => Promise<void>` or the
  // refactored named-type form (RefreshPersistFn) — the latter is preferred
  // because it satisfies the t11 any-budget.
  assert.match(
    src,
    /export async function getAccessToken\([\s\S]{0,500}onPersist\?:\s*(?:RefreshPersistFn|\(result:\s*\w+\)\s*=>\s*Promise<void>)/,
    "getAccessToken must declare onPersist as the 5th parameter"
  );
});

test("Fix A: getAccessToken invokes onPersist INSIDE the per-connection mutex closure", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
  const closureMatch = src.match(/entry\.promise\s*=\s*\(async\s*\(\)\s*=>\s*\{([\s\S]+?)\}\)\(\)/);
  assert.ok(closureMatch, "Per-connection mutex closure must use the (async () => {...})() form");
  const closureBody = closureMatch![1];
  assert.match(
    closureBody,
    /effectiveOnPersist/,
    "The mutex closure body must reference effectiveOnPersist so the persist runs before the mutex releases"
  );
});

test("Fix A: runWithOnPersist + getActiveOnPersist are exported for executor plumbing", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
  assert.match(src, /export function runWithOnPersist\b/);
  assert.match(src, /export function getActiveOnPersist\b/);
  assert.match(src, /AsyncLocalStorage/);
});

test("Fix A: chatCore.ts wraps executor.refreshCredentials with runWithOnPersist", async () => {
  const src = await read("open-sse/handlers/chatCore.ts");
  assert.match(
    src,
    /runWithOnPersist\([\s\S]{0,200}executor\.refreshCredentials/,
    "chatCore.ts reactive 401 path must wrap refreshCredentials with runWithOnPersist"
  );
});

test("Fix A: base.ts proactive refresh also wraps refreshCredentials with runWithOnPersist", async () => {
  const src = await read("open-sse/executors/base.ts");
  assert.match(
    src,
    /runWithOnPersist\([\s\S]{0,200}this\.refreshCredentials/,
    "base.ts proactive needsRefresh branch must wrap refreshCredentials with runWithOnPersist"
  );
});

test("Fix B: refreshOAuthToken in test/route.ts includes connectionId in credentials", async () => {
  const src = await read("src/app/api/providers/[id]/test/route.ts");
  const fnIdx = src.indexOf("async function refreshOAuthToken(");
  assert.ok(fnIdx >= 0, "refreshOAuthToken function must exist");
  const fnSlice = src.slice(fnIdx, fnIdx + 2500);
  assert.match(
    fnSlice,
    /connectionId:\s*connection\.id/,
    "refreshOAuthToken credentials must include connectionId so Layer 1 (per-connection mutex) is used instead of Layer 2 (token-hash dedup)"
  );
  assert.match(
    fnSlice,
    /onPersist|async\s*\(refreshed\)\s*=>/,
    "refreshOAuthToken must pass an onPersist callback so the DB write is atomic with the network refresh"
  );
});

test("Fix C reverted: codexAuthImport does NOT refresh tokens on import (avoids family revocation on stale auth.json)", async () => {
  const src = await read("src/lib/oauth/utils/codexAuthImport.ts");
  assert.doesNotMatch(
    src,
    /refreshConnectionTokensOnImport\(/,
    "Fix C was reverted because auth.json files exported from Codex CLI are often partially rotated; refreshing with a stale refresh_token caused upstream to invalidate the entire token family"
  );
  assert.doesNotMatch(
    src,
    /import\s*\{[^}]*getAccessToken[^}]*\}\s*from\s*"@omniroute\/open-sse\/services\/tokenRefresh/,
    "codexAuthImport should not import getAccessToken (refresh-on-import was reverted)"
  );
});

test("Fix D: staleness fallback returns absolute expiresAt, not raw expiresIn", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
  // Locate the actual return statement, not the JSDoc mention.
  // The anchor is the log line "DB token is still valid. Skipping OAuth refresh."
  // which only appears in the code path (the JSDoc says "DB token is still valid it is").
  const idx = src.indexOf("DB token is still valid. Skipping");
  assert.ok(idx >= 0, "Staleness-valid log line not found");
  const slice = src.slice(idx, idx + 800);
  assert.match(
    slice,
    /expiresAt:\s*dbConnection\.expiresAt/,
    "Staleness fallback must return absolute expiresAt"
  );
  assert.doesNotMatch(
    slice,
    /expiresIn:\s*dbConnection\.expiresIn(?!\s*\/\/)/,
    "Staleness fallback must NOT return raw expiresIn (causes downstream lifetime extension)"
  );
});

test("Fix D: src/sse wrapper prefers expiresAt over expiresIn when recomputing", async () => {
  const src = await read("src/sse/services/tokenRefresh.ts");
  // The recompute block in checkAndRefreshToken
  assert.match(
    src,
    /expiresAt:\s*newCredentials\.expiresAt\s*\?\s*newCredentials\.expiresAt/,
    "checkAndRefreshToken must prefer the absolute expiresAt before falling back to expiresIn arithmetic"
  );
});

test("Fix E: chatCore.ts moves credentials mutation INSIDE the mutex closure via persistFn", async () => {
  const src = await read("open-sse/handlers/chatCore.ts");
  // The persistFn closure must do BOTH the Object.assign AND the user callback
  const persistFnMatch = src.match(
    /const\s+persistFn\s*=[\s\S]{0,800}Object\.assign\(credentials,[\s\S]{0,300}onCredentialsRefreshed/
  );
  assert.ok(
    persistFnMatch,
    "chatCore.ts must build persistFn that both Object.assigns credentials and calls onCredentialsRefreshed, so both happen INSIDE the mutex"
  );
});

test("Fix F removed: no over-eager skip that would bypass legitimate refreshes", async () => {
  const src = await read("open-sse/services/tokenRefresh.ts");
  // Fix F was intentionally removed because it skipped refreshes that the
  // caller (checkAndRefreshToken) had already decided were needed. Verify the
  // dead-code branch is gone (no `credentials.accessToken === dbConnection.accessToken`
  // skip path remains).
  assert.doesNotMatch(
    src,
    /credentials\.accessToken\s*===\s*dbConnection\.accessToken[\s\S]{0,300}Skipping OAuth refresh/,
    "Fix F was removed because it caused legitimate refreshes to be skipped"
  );
});

test("Mutex consolidation: src/sse wrapper no longer holds its own connectionRefreshMutex map", async () => {
  const src = await read("src/sse/services/tokenRefresh.ts");
  // It's OK to keep a withConnectionRefreshMutex shim for back-compat, but
  // the actual Map should not be re-instantiated here (use the open-sse one).
  const hasOwnMap = /const\s+connectionRefreshMutex\s*=\s*new\s+Map/.test(src);
  if (hasOwnMap) {
    // If a Map remains, the file must clearly document that it is a deprecated
    // shim — otherwise it's a regression that recreates the dual-mutex bug.
    assert.match(
      src,
      /deprecated|legacy|shim|redundant|kept for back-compat/i,
      "If src/sse keeps its own connectionRefreshMutex Map, the file must document it as deprecated/legacy"
    );
  }
});

test("Imports: chatCore.ts imports runWithOnPersist from open-sse tokenRefresh", async () => {
  const src = await read("open-sse/handlers/chatCore.ts");
  assert.match(src, /runWithOnPersist/);
  assert.match(src, /from\s+"\.\.\/services\/tokenRefresh\.ts"/);
});

test("Imports: base.ts imports runWithOnPersist from open-sse tokenRefresh", async () => {
  const src = await read("open-sse/executors/base.ts");
  assert.match(src, /runWithOnPersist/);
  assert.match(src, /from\s+"\.\.\/services\/tokenRefresh\.ts"/);
});
