/**
 * usage-provider-list-drift.test.ts
 *
 * `fetcherProviders.ts` and `supportedProviders.ts` are sibling pure-data lists
 * that have to agree: the first says a provider has a wired
 * `getUsageForProvider`, the second says the dashboard and server gates will
 * accept its usage. A provider in the first but not the second computes a quota
 * nobody asks for; one in the second but not the first is accepted and then
 * falls through the dispatcher to `default: "Usage API not implemented"`.
 *
 * Nothing compared them, and that seam has now produced the same bug three
 * times — #9603 (bailian: "fetcher existed, list entry missing"), #11722, and
 * #12256 (openrouter credits, requested again in #13080 six days after the fix
 * landed because the card had never appeared). `usage-families-split.test.ts`
 * pins the dispatcher against `fetcherProviders.ts`, so the open-sse side
 * cannot drift; this pins the other edge.
 *
 * Divergences are allowed but must be declared with a reason. An undeclared one
 * is the bug.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { USAGE_FETCHER_PROVIDERS } =
  await import("../../open-sse/services/usage/fetcherProviders.ts");
const { USAGE_SUPPORTED_PROVIDERS } =
  await import("../../open-sse/services/usage/supportedProviders.ts");

/**
 * Has a usage fetcher, deliberately not offered to the dashboard.
 *
 * These three predate this test and I could not establish intent from the tree,
 * so they are pinned rather than "corrected" — the set may not grow silently,
 * and converting any entry into a real dashboard listing is a call for someone
 * who knows why it was left out. `xai-oauth`/`xao` *are* listed while the
 * API-key `xai` is not, which reads like it could be deliberate.
 */
const FETCHER_WITHOUT_DASHBOARD_ENTRY = new Set(["opencode", "opencode-zen", "xai"]);

/**
 * Offered to the dashboard with no fetcher behind it.
 *
 * `xiaomi-mimo-token-plan` is inert rather than broken: it authenticates by API
 * key and is absent from `PROVIDER_LIMITS_APIKEY_PROVIDERS`, so
 * `isSupportedUsageConnection` refuses it before the dispatcher is ever
 * reached. Listed here so the entry is understood as dead config instead of
 * being "fixed" into a live path that would return "Usage API not implemented".
 */
const DASHBOARD_ENTRY_WITHOUT_FETCHER = new Set(["xiaomi-mimo-token-plan"]);

const sorted = (values: Iterable<string>) => [...values].sort();

test("every provider with a usage fetcher is offered to the dashboard", () => {
  const supported = new Set(USAGE_SUPPORTED_PROVIDERS);
  const undeclared = USAGE_FETCHER_PROVIDERS.filter(
    (provider) => !supported.has(provider) && !FETCHER_WITHOUT_DASHBOARD_ENTRY.has(provider)
  );

  assert.deepEqual(
    undeclared,
    [],
    "these providers have a getUsageForProvider implementation but are missing from " +
      "USAGE_SUPPORTED_PROVIDERS, so their quota is computed and never requested. " +
      "Add them there (and to PROVIDER_LIMITS_APIKEY_PROVIDERS if they authenticate " +
      "by API key), or add them to FETCHER_WITHOUT_DASHBOARD_ENTRY with the reason."
  );
});

test("every provider offered to the dashboard has a usage fetcher", () => {
  const fetchers = new Set<string>(USAGE_FETCHER_PROVIDERS);
  const undeclared = USAGE_SUPPORTED_PROVIDERS.filter(
    (provider) => !fetchers.has(provider) && !DASHBOARD_ENTRY_WITHOUT_FETCHER.has(provider)
  );

  assert.deepEqual(
    undeclared,
    [],
    "these providers are in USAGE_SUPPORTED_PROVIDERS with no dispatcher case, so " +
      "getUsageForProvider returns 'Usage API not implemented'. Add a fetcher, drop " +
      "the entry, or declare it in DASHBOARD_ENTRY_WITHOUT_FETCHER with the reason."
  );
});

test("the declared divergences are the real ones, not stale", () => {
  // Without this, an entry whose drift has since been fixed would sit in the
  // allowlists forever, quietly excusing a future recurrence of the same id.
  const supported = new Set(USAGE_SUPPORTED_PROVIDERS);
  const fetchers = new Set<string>(USAGE_FETCHER_PROVIDERS);

  assert.deepEqual(
    sorted(USAGE_FETCHER_PROVIDERS.filter((p) => !supported.has(p))),
    sorted(FETCHER_WITHOUT_DASHBOARD_ENTRY),
    "FETCHER_WITHOUT_DASHBOARD_ENTRY lists an id that no longer diverges — remove it"
  );
  assert.deepEqual(
    sorted(USAGE_SUPPORTED_PROVIDERS.filter((p) => !fetchers.has(p))),
    sorted(DASHBOARD_ENTRY_WITHOUT_FETCHER),
    "DASHBOARD_ENTRY_WITHOUT_FETCHER lists an id that no longer diverges — remove it"
  );
});

test("neither list has duplicates", () => {
  // A duplicated id makes the counts lie and hides a paste error in a 50-entry
  // literal, which is how a wrong id survives review.
  assert.deepEqual(
    sorted(new Set(USAGE_FETCHER_PROVIDERS)),
    sorted(USAGE_FETCHER_PROVIDERS),
    "USAGE_FETCHER_PROVIDERS contains a duplicate"
  );
  assert.deepEqual(
    sorted(new Set(USAGE_SUPPORTED_PROVIDERS)),
    sorted(USAGE_SUPPORTED_PROVIDERS),
    "USAGE_SUPPORTED_PROVIDERS contains a duplicate"
  );
});
