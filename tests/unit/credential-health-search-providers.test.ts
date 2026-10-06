/**
 * Regression test for #9970 — credential-health scheduler burns real billed
 * API queries for search providers.
 *
 * Search-provider "validation" (SEARCH_VALIDATOR_CONFIGS, e.g. tavily-search)
 * issues a real upstream query (POST api.tavily.com/search) rather than a
 * cheap auth probe. The scheduler's periodic sweep() must exclude connections
 * whose provider id is registered in SEARCH_VALIDATOR_CONFIGS so it never
 * fires a billed query on a timer.
 *
 * Mirrors the source-inspection style of
 * tests/unit/credential-health-active-connections-9180.test.ts.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const schedulerSource = fs.readFileSync(
  new URL("../../src/lib/credentialHealth/scheduler.ts", import.meta.url),
  "utf8"
);

const searchProvidersSource = fs.readFileSync(
  new URL("../../src/lib/providers/validation/searchProviders.ts", import.meta.url),
  "utf8"
);

function getSweepConnectionSelection(): string {
  const start = schedulerSource.indexOf("export async function sweep(): Promise<void>");
  assert.notEqual(start, -1, "credential-health sweep must exist");

  const end = schedulerSource.indexOf("\n    if (connections.length === 0) return;", start);
  assert.notEqual(end, -1, "credential-health connection-selection block must exist");

  return schedulerSource.slice(start, end);
}

test("#9970 scheduler imports SEARCH_VALIDATOR_CONFIGS to classify billed-query providers", () => {
  assert.match(
    schedulerSource,
    /import\s*\{\s*SEARCH_VALIDATOR_CONFIGS\s*\}\s*from\s*"@\/lib\/providers\/validation\/searchProviders"/,
    "scheduler.ts must import SEARCH_VALIDATOR_CONFIGS from the search-provider validators module"
  );
});

test("#9970 sweep() excludes search providers from the connection-selection filter", () => {
  const selection = getSweepConnectionSelection();

  assert.match(
    selection,
    /SEARCH_VALIDATOR_CONFIGS/,
    "sweep()'s connection-selection block must reference SEARCH_VALIDATOR_CONFIGS to exclude search providers"
  );

  assert.match(
    selection,
    /!\(conn\.provider in SEARCH_VALIDATOR_CONFIGS\)/,
    "sweep() must filter out connections whose provider id is a registered search-validator provider"
  );
});

test("#9970 sweep() still keeps API-key + OAuth eligibility intact (no regression on #9180)", () => {
  const selection = getSweepConnectionSelection();

  assert.match(
    selection,
    /getProviderConnections\(\{\s*isActive:\s*true\s*\}\)/,
    "the scheduler must still request only active provider connections"
  );

  assert.match(
    selection,
    /conn\.authType === "apikey"/,
    "API-key connections must remain eligible"
  );

  assert.match(selection, /conn\.authType === "oauth"/, "OAuth connections must remain eligible");
});

test("#9970 trust anchor: SEARCH_VALIDATOR_CONFIGS providers target real billed upstream endpoints", () => {
  // Sanity-check the assumption driving the fix: the search validators really
  // do fire live upstream queries (not just an auth ping), so excluding them
  // from the periodic sweep is the correct trade-off.
  assert.match(
    searchProvidersSource,
    /api\.tavily\.com\/search/,
    "tavily-search validator must target the real Tavily search endpoint"
  );

  assert.match(
    searchProvidersSource,
    /export const SEARCH_VALIDATOR_CONFIGS/,
    "SEARCH_VALIDATOR_CONFIGS must be exported so the scheduler can reference it"
  );
});
