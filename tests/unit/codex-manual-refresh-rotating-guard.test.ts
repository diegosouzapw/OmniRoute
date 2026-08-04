/**
 * Codex multi-account family-revocation cascade — manual/auto token refresh guard.
 *
 * `POST /api/providers/[id]/refresh` is the explicit "refresh this token" endpoint.
 * It rotates the refresh_token via getAccessToken. For rotating-refresh providers
 * (Codex/OpenAI share one Auth0 client_id) rotating several sibling accounts —
 * which happens when the dashboard auto-refreshes every expiring connection on a
 * page load, or when an OLD cached frontend bulk-calls this endpoint — makes Auth0
 * revoke the whole token family (openai/codex#9648) and kills every account but
 * the last. This was the LAST unguarded proactive-refresh entry point for rotating
 * providers (refreshAndUpdateCredentials and the connection-test route are already
 * guarded). It must skip the proactive refresh and defer to the reactive,
 * serialized 401 path. Non-rotating providers keep refreshing on demand.
 *
 * Mirrors the source-assertion style of token-refresh-race-comprehensive.test.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "../..");
const ROUTE = path.join(root, "src/app/api/providers/[id]/refresh/route.ts");
const read = () => readFile(ROUTE, "utf8");

test("manual refresh route imports rotationGroupFor", async () => {
  const src = await read();
  assert.match(
    src,
    /import\s*\{[^}]*rotationGroupFor[^}]*\}\s*from\s*["'][^"']*refreshSerializer/,
    "refresh route must import rotationGroupFor to detect rotating providers"
  );
});

test("manual refresh route skips proactive refresh for the OpenAI Auth0 family BEFORE calling getAccessToken", async () => {
  const src = await read();

  const guardIdx = src.search(/rotationGroup\s*===\s*["']openai-auth0["']/);
  assert.ok(
    guardIdx >= 0,
    "refresh route must only skip proactive refresh for the OpenAI Auth0 family"
  );

  const getAccessTokenIdx = src.indexOf("getAccessToken(");
  assert.ok(getAccessTokenIdx >= 0, "refresh route still calls getAccessToken for non-rotating providers");

  assert.ok(
    guardIdx < getAccessTokenIdx,
    "the OpenAI Auth0 guard must run BEFORE getAccessToken so the risky refresh_token is never exercised"
  );

  // The guard short-circuits with an early return (no token rotation).
  const guardBlock = src.slice(guardIdx, getAccessTokenIdx);
  assert.match(
    guardBlock,
    /return\b/,
    "the OpenAI Auth0 guard must return early (defer to the reactive 401 path) instead of refreshing"
  );
});

test("manual refresh route does not skip Kiro just because it is serialized", async () => {
  const src = await read();
  assert.doesNotMatch(
    src,
    /rotationGroupFor\s*\(\s*[\w.]*provider[\w.]*\s*\)\s*!==\s*null/,
    "a blanket rotation-group skip blocks Kiro manual refresh"
  );
  assert.match(
    src,
    /rotationGroup\s*===\s*["']openai-auth0["']/,
    "only the OpenAI Auth0 family should be skipped by the manual refresh route"
  );
});
