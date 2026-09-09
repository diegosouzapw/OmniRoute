/**
 * openrouter-provider-limits-13080.test.ts
 *
 * #13080 asked for a credit balance in Provider Quota. For OpenRouter the
 * fetcher already computed one — `getOpenrouterUsage` returns a USD `credits`
 * quota, `services/usage.ts` dispatches `case "openrouter"`, and
 * USAGE_FETCHER_PROVIDERS declares it wired — but neither app-side gate listed
 * it, so `isSupportedUsageConnection` refused every OpenRouter connection and
 * the sync never asked. Same shape as #9603 (bailian) and #11722.
 *
 * The drift guard below is the part that matters: it is what makes the next
 * instance of this fail loudly instead of shipping as a silently missing card.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { isSupportedUsageConnection } = await import("../../src/lib/usage/providerLimits.ts");
const { USAGE_SUPPORTED_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
const { USAGE_FETCHER_PROVIDERS } = await import("../../open-sse/services/usage.ts");

const conn = (provider: string, authType = "apikey") =>
  ({ id: `c-${provider}`, provider, authType }) as never;

test("an OpenRouter API-key connection reaches the usage sync", () => {
  assert.ok(
    (USAGE_FETCHER_PROVIDERS as readonly string[]).includes("openrouter"),
    "precondition: openrouter is declared as having a wired usage fetcher"
  );
  assert.ok(isSupportedUsageConnection(conn("openrouter")));
});

test("both gates have to list it, not just one", () => {
  // isSupportedUsageConnection is an AND of USAGE_SUPPORTED_PROVIDERS and, for
  // apikey auth, PROVIDER_LIMITS_APIKEY_PROVIDERS. Adding only the first entry
  // leaves the connection refused, so assert the membership that the boolean
  // above cannot distinguish -- otherwise half the fix would look complete.
  assert.ok((USAGE_SUPPORTED_PROVIDERS as readonly string[]).includes("openrouter"));

  // An unknown provider is still refused, so the assertion above is not just
  // "the function returns true for everything".
  assert.equal(isSupportedUsageConnection(conn("not-a-provider")), false);
  // And a listed provider on an auth type the apikey gate does not cover.
  assert.equal(isSupportedUsageConnection(conn("openrouter", "basic")), false);
});

/**
 * Providers that have a wired fetcher and are deliberately absent from the
 * app-side list. Each entry needs a reason; an unexplained one is the bug this
 * test exists to catch.
 *
 * These three predate #13080 and I could not establish from the tree whether
 * they are intentional, so they are pinned rather than "fixed" -- the set may
 * not grow silently, and a maintainer can convert any of them into a real
 * entry (or a documented reason) without this test having guessed for them.
 */
const FETCHER_WITHOUT_APP_ENTRY = new Set(["opencode", "opencode-zen", "xai"]);

test("no provider gains a usage fetcher without an app-side entry", () => {
  const supported = new Set(USAGE_SUPPORTED_PROVIDERS as readonly string[]);
  const unlisted = (USAGE_FETCHER_PROVIDERS as readonly string[]).filter(
    (provider) => !supported.has(provider)
  );

  assert.deepEqual(
    unlisted.slice().sort(),
    [...FETCHER_WITHOUT_APP_ENTRY].sort(),
    "a provider with a usage fetcher is missing from USAGE_SUPPORTED_PROVIDERS. " +
      "Add it there (and to PROVIDER_LIMITS_APIKEY_PROVIDERS if its auth is an " +
      "API key), or add it to FETCHER_WITHOUT_APP_ENTRY with the reason."
  );
});
