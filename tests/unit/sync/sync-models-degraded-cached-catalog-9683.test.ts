/**
 * #9683 — "Importing Models" reported success with an expired API key.
 *
 * The import button posts to `/api/providers/{id}/sync-models`, which self-fetches
 * `/api/providers/{id}/models?refresh=true`. On an upstream 401 that route does not
 * fail: it falls back to a catalog it already has. It prefers the CACHE and only uses
 * the local catalog when there is no cache, so a provider that imported successfully
 * once takes the cache branch — `{ source: "cache", warning: "…(401)…" }` with HTTP
 * 200. `isDegradedLocalCatalog` only recognised `local_catalog`, so model-sync treated
 * that as a successful discovery, found every cached model already imported and
 * answered "No new models were added" instead of surfacing the credential error.
 *
 * The warning is the discriminator: `buildDiscoveryFallbackResponse` always attaches
 * one, while the ordinary non-refresh cache hit attaches none.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { isDegradedLocalCatalog, isDegradedCachedCatalog, isDegradedDiscovery } =
  await import("../../../src/app/api/providers/[id]/sync-models/degradedLocalCatalog.ts");

// The exact payload shapes `src/app/api/providers/[id]/models/route.ts` emits from
// `buildCachedDiscoveryResponse(cacheWarning)` on a failed probe.
const AUTH_FAILED_CACHE = {
  source: "cache",
  warning: "Models probe failed (401) — using cached catalog",
};
const BEDROCK_AUTH_FAILED_CACHE = {
  source: "cache",
  warning: "Auth failed (403) — using cached catalog",
};
const UNAVAILABLE_CACHE = {
  source: "cache",
  warning: "API unavailable — using cached catalog",
};
// `maybeReturnCachedDiscovery()` — an ordinary cache hit, built with no warning.
const HEALTHY_CACHE = { source: "cache" };

test("#9683: a 401 that degraded to the cached catalog is a failed discovery", () => {
  assert.equal(
    isDegradedCachedCatalog(AUTH_FAILED_CACHE),
    true,
    "an expired key must not be reported to the operator as a successful import"
  );
  assert.equal(isDegradedCachedCatalog(BEDROCK_AUTH_FAILED_CACHE), true);
  assert.equal(isDegradedDiscovery(AUTH_FAILED_CACHE), true);
});

test("#9683: any warning-carrying cache fallback is degraded, not only auth", () => {
  // The rule model-sync already applies to `local_catalog` is not auth-specific:
  // a degraded discovery must not be persisted as the synced catalog.
  assert.equal(isDegradedCachedCatalog(UNAVAILABLE_CACHE), true);
  assert.equal(isDegradedDiscovery(UNAVAILABLE_CACHE), true);
});

test("#9683: an ordinary cache hit stays a success", () => {
  assert.equal(isDegradedCachedCatalog(HEALTHY_CACHE), false);
  assert.equal(isDegradedDiscovery(HEALTHY_CACHE), false);
  for (const blank of ["", "   "]) {
    assert.equal(
      isDegradedCachedCatalog({ source: "cache", warning: blank }),
      false,
      "a blank warning is not a degradation signal"
    );
  }
  assert.equal(isDegradedCachedCatalog({ source: "cache", warning: 42 }), false);
});

test("#9683: only the cache source is judged by this predicate", () => {
  assert.equal(isDegradedCachedCatalog({ source: "api", warning: "anything" }), false);
  assert.equal(isDegradedCachedCatalog({ source: "local_catalog", warning: "x" }), false);
  assert.equal(isDegradedCachedCatalog({}), false);
  assert.equal(isDegradedCachedCatalog({ source: "" }), false);
  assert.equal(isDegradedCachedCatalog({ source: "  CACHE  ", warning: "x" }), true);
});

// ── #5460/#5465 must be unchanged ─────────────────────────────────────────

test("#9683: the local-catalog rule is untouched", () => {
  assert.equal(isDegradedLocalCatalog({ source: "local_catalog", intentional: true }), false);
  assert.equal(isDegradedLocalCatalog({ source: "local_catalog", intentional: false }), true);
  assert.equal(isDegradedLocalCatalog({ source: "cache", intentional: false }), false);

  assert.equal(
    isDegradedDiscovery({ source: "local_catalog", intentional: true }),
    false,
    "a provider whose local catalog is its only discovery source still syncs"
  );
  assert.equal(
    isDegradedDiscovery({
      source: "local_catalog",
      intentional: true,
      warning: "reka has no remote /models endpoint",
    }),
    false,
    "an intentional local catalog is not degraded just because it carries a warning"
  );
  assert.equal(isDegradedDiscovery({ source: "local_catalog", intentional: false }), true);
});

// ── Wiring ────────────────────────────────────────────────────────────────
// The predicate is only half the fix: the route has to consult the combined one.
// This assertion fails on the pre-fix tree, where the guard read
// `isDegradedLocalCatalog(modelsData)` and so never saw the cache fallback.

test("#9683: the sync-models route gates on the combined predicate", async () => {
  const { readFileSync } = await import("node:fs");
  const source = readFileSync(
    new URL("../../../src/app/api/providers/[id]/sync-models/route.ts", import.meta.url),
    "utf8"
  );
  assert.match(
    source,
    /if\s*\(\s*isDegradedDiscovery\(modelsData\)\s*\)/,
    "model-sync must refuse both degraded shapes, not just local_catalog"
  );
  assert.ok(
    !/isDegradedLocalCatalog\(modelsData\)/.test(source),
    "the narrow predicate must no longer be the route's only gate"
  );
});

// ── github_catalog is display fallback, not persist ────────────────────────
// Codex live-empty GET returns `{ source: "github_catalog", warning: "…" }`
// via buildResponse. That payload must be refuse-to-sync, same class as #9683
// cache fallback: live discovery failed, public models.json is not authoritative.

const GITHUB_CATALOG_FALLBACK = {
  source: "github_catalog",
  warning: "Codex live catalog unavailable — using GitHub model catalog",
};

test("github_catalog with a warning is a degraded discovery", () => {
  assert.equal(isDegradedDiscovery(GITHUB_CATALOG_FALLBACK), true);
  assert.equal(
    isDegradedDiscovery({
      source: "  GITHUB_CATALOG  ",
      warning: GITHUB_CATALOG_FALLBACK.warning,
    }),
    true,
    "source match is case-insensitive like cache"
  );
});

test("healthy api and warning-less cache stay successful discoveries", () => {
  assert.equal(isDegradedDiscovery({ source: "api" }), false);
  assert.equal(isDegradedDiscovery({ source: "api", warning: "anything" }), false);
  assert.equal(isDegradedDiscovery(HEALTHY_CACHE), false);
  assert.equal(
    isDegradedDiscovery({ source: "github_catalog" }),
    false,
    "github_catalog without a warning is not the Codex live-empty fallback"
  );
  for (const blank of ["", "   "]) {
    assert.equal(
      isDegradedDiscovery({ source: "github_catalog", warning: blank }),
      false,
      "a blank warning is not a degradation signal"
    );
  }
});
