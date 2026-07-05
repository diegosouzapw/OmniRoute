/**
 * Unit tests for the "Configured Only" filter on the Free Provider Rankings page.
 *
 * Phase 1 of #6150 — verifies the toggle state, filtering logic, status column,
 * cleanup flag, and i18n keys exist in the source code.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "../..");
const read = (p: string) => readFileSync(join(root, p), "utf8");
const pageSrc = read("src/app/(dashboard)/dashboard/free-provider-rankings/page.tsx");
const en = JSON.parse(read("src/i18n/messages/en.json"));

test("page declares configuredOnly state", () => {
  assert.ok(pageSrc.includes("useState(false)"), "configuredOnly defaults to false");
  assert.ok(pageSrc.includes("setConfiguredOnly"), "setConfiguredOnly setter exists");
});

test("page declares configuredProviderIds state", () => {
  assert.ok(pageSrc.includes("configuredProviderIds"), "configuredProviderIds state exists");
  assert.ok(pageSrc.includes("Set<string>"), "configuredProviderIds is typed as Set<string>");
});

test("page fetches /api/providers on mount", () => {
  assert.ok(pageSrc.includes('fetch("/api/providers")'), "fetches /api/providers");
  assert.ok(pageSrc.includes("conn?.provider"), "uses optional chaining for conn.provider");
});

test("useEffect has cleanup flag to prevent stale state updates", () => {
  assert.ok(pageSrc.includes("let active = true"), "declares cleanup flag");
  assert.ok(pageSrc.includes("if (!active) return"), "guards state update with active flag");
  assert.ok(pageSrc.includes("active = false"), "cleanup function sets active to false");
});

test("displayedRankings filters by configuredProviderIds when toggle is on", () => {
  assert.ok(pageSrc.includes("displayedRankings"), "displayedRankings derived variable exists");
  assert.ok(
    pageSrc.includes("configuredProviderIds.has(r.id)"),
    "filters rankings by configuredProviderIds.has(r.id)"
  );
  assert.ok(
    pageSrc.includes("configuredOnly\n    ? rankings.filter"),
    "conditional: when configuredOnly is true, filters rankings"
  );
});

test("toggle switch has accessible attributes", () => {
  assert.ok(pageSrc.includes('role="switch"'), "toggle has role=switch");
  assert.ok(
    pageSrc.includes("aria-checked={configuredOnly}"),
    "toggle has aria-checked bound to configuredOnly"
  );
  assert.ok(
    pageSrc.includes('htmlFor="configured-only-toggle"'),
    "label is linked to toggle via htmlFor"
  );
});

test("table has a 'Configured' status column", () => {
  assert.ok(pageSrc.includes('t("colConfigured")'), "table header includes colConfigured key");
  assert.ok(
    pageSrc.includes("configuredProviderIds.has(provider.id)"),
    "status column checks configuredProviderIds"
  );
});

test("empty state shows noConfiguredProviders when toggle is on", () => {
  assert.ok(
    pageSrc.includes('t("noConfiguredProviders")'),
    "empty state uses noConfiguredProviders i18n key"
  );
  assert.ok(
    pageSrc.includes("configuredOnly && rankings.length > 0"),
    "shows noConfiguredProviders only when toggle is on and data exists"
  );
});

test("i18n: en.json has all required filter keys", () => {
  const keys = en.freeProviderRankingsPage;
  assert.ok(keys, "freeProviderRankingsPage namespace exists in en.json");
  assert.equal(typeof keys.configuredOnly, "string", "configuredOnly is a string");
  assert.equal(typeof keys.configuredOnlyHint, "string", "configuredOnlyHint is a string");
  assert.equal(typeof keys.noConfiguredProviders, "string", "noConfiguredProviders is a string");
  assert.equal(typeof keys.colConfigured, "string", "colConfigured is a string");
  assert.ok(keys.configuredOnly.length > 0, "configuredOnly is non-empty");
  assert.ok(keys.configuredOnlyHint.length > 0, "configuredOnlyHint is non-empty");
  assert.ok(keys.noConfiguredProviders.length > 0, "noConfiguredProviders is non-empty");
  assert.ok(keys.colConfigured.length > 0, "colConfigured is non-empty");
});
