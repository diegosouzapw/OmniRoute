import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Structural test: locks the invariant that updateProviderCredentials is
 * called INSIDE the withConnectionRefreshMutex closure in checkAndRefreshToken.
 *
 * Background: with rotating refresh tokens (OpenAI/Codex), if the DB write
 * happens AFTER the mutex releases, a concurrent request can read stale
 * credentials and send the old refresh token. OpenAI detects this as
 * refresh_token_reused and permanently revokes the entire token family.
 *
 * This test parses the source text of tokenRefresh.ts and verifies that
 * the mutex closure body contains the DB write call. It is intentionally
 * a source-level check so it survives refactors that would re-introduce
 * the race (e.g., moving the write back outside).
 */
test("tokenRefresh.ts wraps updateProviderCredentials inside withConnectionRefreshMutex", async () => {
  const srcPath = path.resolve("src/sse/services/tokenRefresh.ts");
  const source = await readFile(srcPath, "utf8");

  // Locate the withConnectionRefreshMutex invocation in checkAndRefreshToken.
  // Match: withConnectionRefreshMutex(connectionId, async () => { ... })
  // The regex captures everything between the opening { and the matching }
  // of the async arrow function passed as the second argument.
  //
  // We look for the async closure form specifically — if someone reverts to
  // the non-async one-liner, this assertion will fire and force a review.
  const mutexCallIndex = source.indexOf("withConnectionRefreshMutex(connectionId, async () => {");
  assert.ok(
    mutexCallIndex !== -1,
    "withConnectionRefreshMutex must be called with an async arrow function closure (not a one-liner). " +
      "This ensures the DB write can be awaited inside before the mutex releases."
  );

  // Extract everything from the opening of the async closure to the
  // corresponding closing brace + ) that ends the mutex call.
  const closureStart = source.indexOf("{", mutexCallIndex);
  assert.ok(closureStart !== -1, "Could not locate opening brace of mutex closure");

  // Walk forward to find the matching closing brace.
  let depth = 0;
  let closureEnd = -1;
  for (let i = closureStart; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) {
        closureEnd = i;
        break;
      }
    }
  }
  assert.ok(closureEnd !== -1, "Could not locate closing brace of mutex closure");

  const closureBody = source.slice(closureStart, closureEnd + 1);

  assert.match(
    closureBody,
    /updateProviderCredentials/,
    "updateProviderCredentials DB write MUST be inside the withConnectionRefreshMutex " +
      "closure body. Moving it outside creates a race window where a concurrent request " +
      "reads stale credentials and re-uses a rotated refresh token, triggering " +
      "refresh_token_reused (permanent token family revocation on OpenAI/Codex)."
  );
});

/**
 * Complementary structural check: the unconditional updateProviderCredentials
 * call outside the mutex must be guarded by !connectionId (no-connectionId
 * fallback path only). This prevents a double-write that would bypass the
 * serialization guarantee.
 */
test("tokenRefresh.ts outer updateProviderCredentials call is guarded by !connectionId", async () => {
  const srcPath = path.resolve("src/sse/services/tokenRefresh.ts");
  const source = await readFile(srcPath, "utf8");

  // Find the checkAndRefreshToken function body.
  const fnStart = source.indexOf("export async function checkAndRefreshToken(");
  assert.ok(fnStart !== -1, "checkAndRefreshToken function not found in source");

  // Walk to find the full function body.
  const bodyStart = source.indexOf("{", fnStart);
  let depth = 0;
  let bodyEnd = -1;
  for (let i = bodyStart; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) {
        bodyEnd = i;
        break;
      }
    }
  }
  assert.ok(bodyEnd !== -1, "Could not locate closing brace of checkAndRefreshToken");

  const fnBody = source.slice(fnStart, bodyEnd + 1);

  // Count occurrences of updateProviderCredentials in the function body.
  const allOccurrences = [...fnBody.matchAll(/updateProviderCredentials/g)];

  // There must be at least 2: one inside the mutex closure, one in the
  // copilot block (lines ~212-218), and optionally one for the !connectionId guard.
  // The critical invariant: no bare updateProviderCredentials call appears
  // OUTSIDE the mutex without a !connectionId guard.

  // Locate the outer (non-mutex, non-copilot) call and verify it is inside
  // an `if (!connectionId)` block.
  const mutexCallEnd = fnBody.indexOf("})") + 2; // end of mutex call block
  const afterMutex = fnBody.slice(mutexCallEnd);

  // The first updateProviderCredentials after the mutex call (but before
  // the copilot section) should be guarded by !connectionId.
  const outerCallMatch = afterMutex.match(
    /if\s*\(\s*!connectionId\s*\)\s*\{[\s\S]*?updateProviderCredentials/
  );
  assert.ok(
    outerCallMatch !== null,
    "The updateProviderCredentials call outside the mutex closure MUST be inside " +
      "an `if (!connectionId)` guard. Without this guard, the DB write executes " +
      "twice when connectionId is set: once inside the mutex (correct) and once " +
      "after (race condition re-introduced)."
  );

  // Verify the total occurrence count is consistent (not 0 outside mutex).
  assert.ok(
    allOccurrences.length >= 2,
    `Expected at least 2 calls to updateProviderCredentials in checkAndRefreshToken ` +
      `(mutex closure + copilot block), got ${allOccurrences.length}`
  );
});
