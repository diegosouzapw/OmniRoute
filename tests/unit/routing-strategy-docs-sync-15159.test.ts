// Doc-sync guard for audit #15159 — DOC-01.
//
// Several documents state how many routing strategies the combo engine supports,
// and they had all drifted independently from the code:
//
//   AGENTS.md:87                        "19 public strategies" + inline list
//                                        missing `quota-weighted`
//   AGENTS.md:427                       "19 strategies"
//   open-sse/services/AGENTS.md:12      "Strategies (17)" — and its list is missing
//                                        `p2c`, `quota-weighted`, `cache-optimized`
//                                        and `pipeline`
//   docs/routing/AUTO-COMBO.md:279      "19 routing strategies"
//   docs/routing/AUTO-COMBO.md:828      "(19 strategies)"
//   docs/i18n/bs/AGENTS.md:90, :414     "19 javnih strategija" (hand-maintained fork)
//   docs/routing/AUTO-COMBO.md table    missing the `quota-weighted` ROW entirely,
//                                        even though AGENTS.md calls this document
//                                        "the full strategy table"
//
// The count is asserted against the code rather than hardcoded, so adding a
// strategy and updating the prose stays a two-step chore instead of a silent lie.
// `quota-share` is deliberately NOT public (`INTERNAL_ROUTING_STRATEGY_VALUES`),
// so it must never appear in these lists.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

import {
  INTERNAL_ROUTING_STRATEGY_VALUES,
  ROUTING_STRATEGY_VALUES,
} from "../../src/shared/constants/routingStrategies.ts";

const PUBLIC = [...ROUTING_STRATEGY_VALUES] as string[];
const INTERNAL = [...INTERNAL_ROUTING_STRATEGY_VALUES] as string[];

function doc(path: string): string {
  return readFileSync(new URL(`../../${path}`, import.meta.url), "utf8");
}

/**
 * Strategy ids from the "All Routing Strategies" table only.
 *
 * Scoped deliberately: the document has other tables whose first column is also a
 * backticked id (`| `auto` | default | ... |` at the top of the file), so a
 * whole-document scan double-counts. Matching the section keeps the assertion
 * about the table AGENTS.md actually points at.
 */
function tableStrategies(markdown: string): string[] {
  const start = markdown.indexOf("## All Routing Strategies");
  assert.notEqual(start, -1, "AUTO-COMBO.md must keep its 'All Routing Strategies' section");
  const rest = markdown.slice(start);
  // Stop at the next H2 so a later section's tables cannot leak in.
  const end = rest.slice(3).search(/^## /m);
  const section = end === -1 ? rest : rest.slice(0, end + 3);
  // `0-9` is required: `p2c` is a real strategy id, and a `[a-z-]` class silently
  // drops it — which is exactly how this test would pass while the table is
  // incomplete.
  return [...section.matchAll(/^\|\s*`([a-z0-9-]+)`/gm)].map((m) => m[1]);
}

test("DOC-01: the code exposes a non-trivial public strategy set", () => {
  // Guards the test itself: if the constant ever empties, every count assertion
  // below would pass vacuously.
  assert.ok(PUBLIC.length >= 20, `expected >= 20 public strategies, got ${PUBLIC.length}`);
  assert.ok(PUBLIC.includes("quota-weighted"), "quota-weighted must be public");
  assert.ok(!PUBLIC.includes("quota-share"), "quota-share must stay internal");
  assert.deepEqual(INTERNAL, ["quota-share"]);
});

test("DOC-01: AGENTS.md states the real count and lists every public strategy", () => {
  const text = doc("AGENTS.md");

  const count = text.match(/(\d+)\s+public strategies/);
  assert.ok(count, "AGENTS.md must state a public-strategy count");
  assert.equal(
    Number(count[1]),
    PUBLIC.length,
    `AGENTS.md says ${count[1]} public strategies but the code has ${PUBLIC.length}`
  );

  const line = text.split("\n").find((l) => /public strategies/.test(l)) ?? "";
  const missing = PUBLIC.filter((strategy) => !line.includes(strategy));
  assert.deepEqual(
    missing,
    [],
    `AGENTS.md's inline strategy list is missing: ${missing.join(", ")}`
  );
});

test("DOC-01: the AGENTS.md reference-table row agrees with the code", () => {
  const text = doc("AGENTS.md");
  const row = text.split("\n").find((l) => /Auto-Combo \(.*strategies\)/.test(l));

  assert.ok(row, "AGENTS.md must have the Auto-Combo reference-table row");
  const count = row.match(/(\d+)\s+strategies/);
  assert.ok(count, "the reference-table row must state a strategy count");
  assert.equal(
    Number(count[1]),
    PUBLIC.length,
    `the reference-table row says ${count[1]} strategies, code has ${PUBLIC.length}`
  );
});

test("DOC-01: open-sse/services/AGENTS.md states the real count and full list", () => {
  const text = doc("open-sse/services/AGENTS.md");
  const line = text.split("\n").find((l) => /\*\*Strategies\*\*/.test(l));

  assert.ok(line, "open-sse/services/AGENTS.md must document the strategies");

  const count = line.match(/\((\d+)\)/);
  assert.ok(count, "the strategies line must state a count in parentheses");
  assert.equal(
    Number(count[1]),
    PUBLIC.length,
    `open-sse/services/AGENTS.md says ${count[1]}, code has ${PUBLIC.length}`
  );

  // `P2C` is the one documented in caps; normalize so the check is not a
  // formatting trap that hides a genuinely missing entry.
  const normalized = line.replace(/`P2C`/g, "`p2c`");
  const missing = PUBLIC.filter((strategy) => !normalized.includes(`\`${strategy}\``));
  assert.deepEqual(missing, [], `open-sse/services/AGENTS.md is missing: ${missing.join(", ")}`);
});

test("DOC-01: AUTO-COMBO.md count and full strategy table match the code", () => {
  const text = doc("docs/routing/AUTO-COMBO.md");

  const counts = [...text.matchAll(/(\d+)\s+(?:routing\s+)?strategies/g)].map((m) => Number(m[1]));
  assert.ok(
    counts.length >= 2,
    "AUTO-COMBO.md must state the count in prose and in its file table"
  );
  for (const count of counts) {
    assert.equal(
      count,
      PUBLIC.length,
      `AUTO-COMBO.md states ${count} strategies, code has ${PUBLIC.length}`
    );
  }

  const rows = tableStrategies(text);
  assert.deepEqual(
    rows.slice().sort(),
    PUBLIC.slice().sort(),
    "the AUTO-COMBO.md strategy table must have exactly one row per public strategy"
  );
});

test("DOC-01: the bs i18n fork agrees with the code too", () => {
  // docs/i18n/bs/AGENTS.md is a hand-maintained translation fork (DOC-03), so it
  // drifts silently. It is the only AGENTS.md mirror tracked in the repo.
  const text = doc("docs/i18n/bs/AGENTS.md");
  const line = text.split("\n").find((l) => /javnih strategija/.test(l));

  assert.ok(line, "the bs mirror must carry the strategy sentence");
  const count = line.match(/(\d+)\s+javnih strategija/);
  assert.ok(count, "the bs mirror must state a strategy count");
  assert.equal(
    Number(count[1]),
    PUBLIC.length,
    `docs/i18n/bs/AGENTS.md says ${count[1]}, code has ${PUBLIC.length}`
  );

  const missing = PUBLIC.filter((strategy) => !line.includes(strategy));
  assert.deepEqual(missing, [], `docs/i18n/bs/AGENTS.md is missing: ${missing.join(", ")}`);
});
