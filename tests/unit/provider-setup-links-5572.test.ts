import test from "node:test";
import assert from "node:assert/strict";

// #5572 / #5574 / #5576 — three provider setup links pointed at 404 pages.
// This guards the corrected (verified-live) URLs so the dead paths cannot
// silently return.
const { SEARCH_PROVIDERS } = await import("../../src/shared/constants/providers/search.ts");
const { APIKEY_PROVIDERS_INFERENCE } = await import(
  "../../src/shared/constants/providers/apikey/inference-hosts.ts"
);

const websites = () =>
  [
    ...Object.values(SEARCH_PROVIDERS as Record<string, { website?: string }>),
    ...Object.values(APIKEY_PROVIDERS_INFERENCE as Record<string, { website?: string }>),
  ]
    .map((p) => p.website)
    .filter((w): w is string => typeof w === "string");

test("#5572/#5574/#5576 provider setup links avoid the known-404 paths", () => {
  const deadPaths = [
    "ollama.com/settings/api-keys", // #5572 — Ollama key page moved to /settings/keys
    "searchapi.io/docs\"", // #5574 — bare /docs 404s; use /docs/google
    "you.com/docs/search/overview", // #5576 — moved to /business/api/
  ];
  for (const dead of deadPaths) {
    for (const w of websites()) {
      assert.ok(!`${w}"`.includes(dead), `provider link still points at a dead URL: ${w}`);
    }
  }
});

test("#5572/#5574/#5576 corrected provider setup links", () => {
  const search = SEARCH_PROVIDERS as Record<string, { website?: string }>;
  const inference = APIKEY_PROVIDERS_INFERENCE as Record<string, { website?: string }>;
  assert.equal(search["searchapi-search"]?.website, "https://www.searchapi.io/docs/google");
  assert.equal(search["youcom-search"]?.website, "https://you.com/business/api/");
  assert.equal(search["ollama-search"]?.website, "https://ollama.com/settings/keys");
  assert.equal(inference["ollama-cloud"]?.website, "https://ollama.com/settings/keys");
});
