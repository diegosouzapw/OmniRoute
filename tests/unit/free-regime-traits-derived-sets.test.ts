import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  FREE_REGIME_TRAITS,
  computeFreeModelTotals,
  freeTypesInBucket,
  grantsFreeAccess,
  type FreeModelFreeType,
} from "../../open-sse/config/freeModelCatalog.ts";

const ALL_FREE_TYPES: FreeModelFreeType[] = [
  "recurring-daily",
  "recurring-monthly",
  "recurring-credit",
  "recurring-uncapped",
  "one-time-initial",
  "keyless",
  "discontinued",
];

test("every free-tier regime is classified for every question the table answers", () => {
  assert.deepEqual(Object.keys(FREE_REGIME_TRAITS).sort(), [...ALL_FREE_TYPES].sort());
  for (const freeType of ALL_FREE_TYPES) {
    const traits = FREE_REGIME_TRAITS[freeType];
    assert.equal(typeof traits.grantsFreeAccess, "boolean", `${freeType}: grantsFreeAccess`);
    assert.equal(typeof traits.tokenBucket, "string", `${freeType}: tokenBucket`);
    assert.equal(
      typeof traits.allowsNoAuthShortcut,
      "boolean",
      `${freeType}: allowsNoAuthShortcut`
    );
  }
});

test("each regime declares the one totals bucket it feeds", () => {
  const buckets = Object.fromEntries(
    ALL_FREE_TYPES.map((t) => [t, FREE_REGIME_TRAITS[t].tokenBucket])
  );
  assert.deepEqual(buckets, {
    "recurring-daily": "steady-monthly",
    "recurring-monthly": "steady-monthly",
    keyless: "steady-monthly",
    "recurring-credit": "recurring-credit",
    "one-time-initial": "one-time-credit",
    "recurring-uncapped": "uncapped",
    discontinued: "none",
  });
});

test("the steady-headline set derived from the table is the one the totals were built on", () => {
  // Non-regression lock. Before this table existed, `RECURRING` was a hand-kept
  // literal; these three regimes are what the published homepage totals have
  // always summed. A fourth regime silently joining this bucket would inflate
  // the headline with no other test noticing.
  assert.deepEqual([...freeTypesInBucket("steady-monthly")].sort(), [
    "keyless",
    "recurring-daily",
    "recurring-monthly",
  ]);
});

test("a regime that grants no free access feeds no total", () => {
  for (const freeType of ALL_FREE_TYPES) {
    if (grantsFreeAccess(freeType)) continue;
    assert.equal(
      FREE_REGIME_TRAITS[freeType].tokenBucket,
      "none",
      `${freeType} does not grant free access, so it cannot feed a free-tier total`
    );
  }
});

test("only the keyless regime takes the no-auth shortcut", () => {
  const shortcut = ALL_FREE_TYPES.filter((t) => FREE_REGIME_TRAITS[t].allowsNoAuthShortcut);
  assert.deepEqual(shortcut, ["keyless"]);
});

test("the dashboard's own copy of the steady regimes still matches the derived set", () => {
  // FreeBudgetCard states the invariant it depends on: "Segments therefore sum
  // to `steadyRecurringTokens`". It cannot import the catalog — that would pull
  // every budget row into the client bundle — so the copy is guarded here
  // instead of being hoped for.
  const card = readFileSync(
    new URL(
      "../../src/app/(dashboard)/dashboard/usage/components/FreeBudgetCard.tsx",
      import.meta.url
    ),
    "utf8"
  );
  const literal = card.match(/const RECURRING_TYPES = new Set\(\[([^\]]*)\]\)/);
  assert.ok(literal, "RECURRING_TYPES literal not found in FreeBudgetCard.tsx");
  const clientSide = [...literal[1].matchAll(/"([^"]+)"/g)].map((m) => m[1]).sort();
  assert.deepEqual(clientSide, [...freeTypesInBucket("steady-monthly")].sort());
});

test("totals stay split across the buckets the table declares", () => {
  const totals = computeFreeModelTotals();
  assert.ok(totals.steadyRecurringTokens > 0);
  assert.ok(totals.steadyWithRecurringCreditsTokens >= totals.steadyRecurringTokens);
  assert.ok(totals.firstMonthRealisticTokens >= totals.steadyWithRecurringCreditsTokens);
  assert.ok(totals.uncappedProviders.length >= 3);
});
