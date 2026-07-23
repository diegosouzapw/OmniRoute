/**
 * Issue #2359 — defensive null/non-string guards on `target.modelStr`.
 *
 * Combo entries with a malformed `modelStr` (regression after #2338 added
 * per-account LKGP routing) were crashing the combo dispatch path with
 * `TypeError: e.startsWith is not a function`. Add guards at the two
 * boundaries that consume `target.modelStr` and make sure neither throws
 * on a missing/non-string value.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// The LKGP fallback (and every non-auto strategy ordering) was extracted verbatim
// from combo.ts into the applyStrategyOrdering leaf (Block J Task 3); the guard
// scans follow the code to the leaf that now owns the `target.modelStr` usages.
const STRATEGY_SRC = path.resolve(
  __dirname,
  "../../open-sse/services/combo/applyStrategyOrdering.ts"
);
const TEST_ROUTE_SRC = path.resolve(__dirname, "../../src/app/api/combos/test/route.ts");

test("#2359 LKGP findIndex guards modelStr against non-string", () => {
  const src = fs.readFileSync(STRATEGY_SRC, "utf8");
  // The findIndex on orderedTargets must check `typeof target.modelStr === "string"`
  // before calling .startsWith. Anchor on the LKGP fallback branch.
  assert.ok(
    /typeof target\.modelStr === "string"[\s\S]{0,80}target\.modelStr\.startsWith/.test(src),
    "LKGP fallback must type-check target.modelStr before calling .startsWith"
  );
});

test("#2359 combo test route falls back instead of throwing on missing modelStr", () => {
  const src = fs.readFileSync(TEST_ROUTE_SRC, "utf8");
  // We expect the coerced local `modelStr` binding and a graceful early
  // return when the combo step is malformed.
  assert.ok(
    /typeof target\?\.modelStr === "string"/.test(src),
    "testComboTarget must coerce target.modelStr before lowercasing"
  );
  assert.ok(
    /Combo step is missing a model id/i.test(src),
    "testComboTarget must surface a helpful error on missing modelStr"
  );
});

test("#2359 strategy ordering has no remaining unguarded target.modelStr.<method> usages", () => {
  const src = fs.readFileSync(STRATEGY_SRC, "utf8");
  // Strip the line that contains the guard so the regex below only catches
  // direct, unguarded method calls.
  const stripped = src.replace(/typeof target\.modelStr === "string"[^\n]*\n[^\n]*/g, "");

  // Any `target.modelStr.<method>(` call that survives the strip means
  // there's still a code path that could explode on a non-string value.
  const RE =
    /target\.modelStr\.(?:startsWith|endsWith|includes|toLowerCase|toUpperCase|slice|trim)\b/;
  assert.ok(
    !RE.test(stripped),
    `Found an unguarded target.modelStr.<method> call. ` +
      `Audit the LKGP / sortTargets paths and add a typeof guard before calling string methods.`
  );
});
