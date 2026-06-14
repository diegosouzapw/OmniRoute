/**
 * tests/unit/quota-share-layout-v2.test.ts
 *
 * Task 4 — source-level assertions for the "all groups" default,
 * stacked group sections, and 3-column card grid in QuotaSharePageClient.
 *
 * Pattern mirrors tests/unit/quota-groups-ui.test.ts (source-scan).
 * Node.js native test runner — no DOM setup required.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const PAGE_CLIENT_PATH = join(
  ROOT,
  "src/app/(dashboard)/dashboard/costs/quota-share/QuotaSharePageClient.tsx"
);

const EN_PATH = join(ROOT, "src/i18n/messages/en.json");
const PT_PATH = join(ROOT, "src/i18n/messages/pt-BR.json");

const pageSrc = readFileSync(PAGE_CLIENT_PATH, "utf8");

// ── 1. Default state is "all" ────────────────────────────────────────────────

test('QuotaSharePageClient: selectedGroupId defaults to "all"', () => {
  assert.ok(
    pageSrc.includes('useState<string>("all")'),
    'QuotaSharePageClient must default selectedGroupId to "all" via useState<string>("all")'
  );
});

// ── 2. "All groups" option in <select> ──────────────────────────────────────

test('QuotaSharePageClient: <select> has an option with value="all" using t("allGroups")', () => {
  assert.ok(
    pageSrc.includes('value="all"'),
    'QuotaSharePageClient <select> must include an <option value="all">'
  );
  assert.ok(
    pageSrc.includes('t("allGroups")') || pageSrc.includes("t('allGroups')"),
    'The "all" option must use the t("allGroups") i18n key'
  );
});

// ── 3. Multi-group render (groupsToRender iteration) ─────────────────────────

test("QuotaSharePageClient: renders groups by iterating groupsToRender (all-groups mode)", () => {
  // Must derive groupsToRender (or equivalent) and map over it
  assert.ok(
    pageSrc.includes("groupsToRender"),
    "QuotaSharePageClient must define groupsToRender to iterate over groups"
  );
  // The render must map over groupsToRender to produce per-group sections
  assert.ok(
    pageSrc.includes("groupsToRender.map") || pageSrc.includes("groupsToRender.filter") || pageSrc.includes(".map((g)") || pageSrc.includes(".map((g, "),
    "QuotaSharePageClient must map over groupsToRender to render one section per group"
  );
});

test("QuotaSharePageClient: computes groupsToRender from selectedGroupId === \"all\" check", () => {
  // The all-groups path: selectedGroupId === "all" ? groups : groups.filter(...)
  assert.ok(
    pageSrc.includes('selectedGroupId === "all"'),
    'QuotaSharePageClient must branch on selectedGroupId === "all" when computing groupsToRender'
  );
});

// ── 4. 3-column grid ──────────────────────────────────────────────────────────

test("QuotaSharePageClient: card grid uses xl:grid-cols-3", () => {
  assert.ok(
    pageSrc.includes("xl:grid-cols-3"),
    "QuotaSharePageClient card grid className must include xl:grid-cols-3"
  );
});

test("QuotaSharePageClient: card grid uses md:grid-cols-2", () => {
  assert.ok(
    pageSrc.includes("md:grid-cols-2"),
    "QuotaSharePageClient card grid className must include md:grid-cols-2 (intermediate breakpoint)"
  );
});

// ── 5. Rename button hidden/disabled when "all" is selected ──────────────────

test('QuotaSharePageClient: rename button is hidden/disabled when selectedGroupId === "all"', () => {
  // When selectedGroupId === "all", the rename button should be hidden or disabled.
  // The old guard was `selectedGroupId !== "group-demo"`.
  // New guard must exclude "all" (either explicit !== "all" or a more general check).
  assert.ok(
    pageSrc.includes('selectedGroupId !== "all"') ||
      // guard via a truthy group lookup (groups.find(g.id === selectedGroupId) is falsy for "all")
      pageSrc.includes("groups.find((g) => g.id === selectedGroupId)") ||
      pageSrc.includes("groups.find(g => g.id === selectedGroupId)"),
    'Rename button must be hidden when selectedGroupId === "all" (guard via !== "all" or group lookup)'
  );
});

// ── 6. i18n parity: allGroups key ────────────────────────────────────────────

test('i18n en.json: quotaShare.allGroups exists and equals "All groups"', () => {
  const en = JSON.parse(readFileSync(EN_PATH, "utf8")) as Record<
    string,
    Record<string, string>
  >;
  assert.equal(
    typeof en["quotaShare"]?.["allGroups"],
    "string",
    "en.json must have quotaShare.allGroups"
  );
  assert.equal(
    en["quotaShare"]["allGroups"],
    "All groups",
    'en.json quotaShare.allGroups must equal "All groups"'
  );
});

test('i18n pt-BR.json: quotaShare.allGroups exists and equals "Todos os grupos"', () => {
  const pt = JSON.parse(readFileSync(PT_PATH, "utf8")) as Record<
    string,
    Record<string, string>
  >;
  assert.equal(
    typeof pt["quotaShare"]?.["allGroups"],
    "string",
    "pt-BR.json must have quotaShare.allGroups"
  );
  assert.equal(
    pt["quotaShare"]["allGroups"],
    "Todos os grupos",
    'pt-BR.json quotaShare.allGroups must equal "Todos os grupos"'
  );
});

test("i18n parity: allGroups present in both en and pt-BR", () => {
  const en = JSON.parse(readFileSync(EN_PATH, "utf8")) as Record<
    string,
    Record<string, string>
  >;
  const pt = JSON.parse(readFileSync(PT_PATH, "utf8")) as Record<
    string,
    Record<string, string>
  >;
  assert.ok("allGroups" in (en["quotaShare"] ?? {}), "en.json missing quotaShare.allGroups");
  assert.ok("allGroups" in (pt["quotaShare"] ?? {}), "pt-BR.json missing quotaShare.allGroups");
});
