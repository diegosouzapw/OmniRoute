/**
 * A key's /v1/models must list the combos that key can actually dispatch.
 *
 * `allowedCombos` gates combos; `modelAccessMode` / `allowedModels` /
 * `blockedModels` gate provider models. The catalog only ever consulted the
 * latter, so a key with `modelAccessMode: "restricted"` and an empty
 * `allowedModels` received an EMPTY catalog — zero rows — while every combo in
 * its `allowedCombos` dispatched normally. The catalog contradicted the key.
 *
 * Observed on a live gateway: a key with 24 entries in `allowedCombos` and
 * `restricted` + `allowedModels: []` returned `{"object":"list","data":[]}`,
 * yet `claude-orchestrate` answered 200 on the same key.
 *
 * Listing a combo the key can already dispatch grants no new access, so the fix
 * is to gate combo rows on `allowedCombos` rather than hide them.
 *
 * Rules:
 *   R1 An absent allowedCombos means no combo restriction (matches validateComboAccess).
 *   R2 An explicit list admits exactly its combos.
 *   R3 The `combo/*` wildcard admits every combo.
 *   R4 The `combo/` prefix is normalised on both sides of the comparison.
 *   R5 An empty list admits nothing, and an empty combo name is never admitted.
 *   R6 The catalog routes combo rows through this gate, exempting auto/*.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const { isComboNameAllowedForKey } = await import("../../src/shared/utils/apiKeyPolicy.ts");
const { ALL_COMBOS_ACCESS_RULE } = await import("../../src/shared/constants/comboAccess.ts");

test("R1: an absent allowedCombos imposes no combo restriction", () => {
  assert.equal(isComboNameAllowedForKey(undefined, "codex-sol"), true);
  assert.equal(isComboNameAllowedForKey(null, "codex-sol"), true);
});

test("R2: an explicit list admits exactly its combos", () => {
  const allowed = ["codex-sol", "claude-haiku"];
  assert.equal(isComboNameAllowedForKey(allowed, "codex-sol"), true);
  assert.equal(isComboNameAllowedForKey(allowed, "claude-haiku"), true);
  assert.equal(isComboNameAllowedForKey(allowed, "gemini-pro"), false);
  // Names are compared whole — a prefix of an allowed name is not allowed.
  assert.equal(isComboNameAllowedForKey(allowed, "codex"), false);
  assert.equal(isComboNameAllowedForKey(allowed, "codex-sol-max"), false);
});

test("R3: the combo/* wildcard admits every combo", () => {
  assert.equal(isComboNameAllowedForKey([ALL_COMBOS_ACCESS_RULE], "anything-at-all"), true);
  assert.equal(isComboNameAllowedForKey([ALL_COMBOS_ACCESS_RULE], "codex-sol"), true);
});

test("R4: the combo/ prefix is normalised on both sides", () => {
  assert.equal(isComboNameAllowedForKey(["combo/codex-sol"], "codex-sol"), true);
  assert.equal(isComboNameAllowedForKey(["codex-sol"], "combo/codex-sol"), true);
});

test("R5: an empty list admits nothing; an empty name is never admitted", () => {
  assert.equal(isComboNameAllowedForKey([], "codex-sol"), false);
  assert.equal(isComboNameAllowedForKey(["codex-sol"], ""), false);
});

test("R6: the catalog gates combo rows on allowedCombos, exempting auto/*", () => {
  const catalog = fs.readFileSync(
    path.join(process.cwd(), "src/app/api/v1/models/catalog.ts"),
    "utf8"
  );
  assert.ok(
    catalog.includes('if (m.owned_by === "combo" && !String(m.id).startsWith("auto/"))'),
    "combo rows must take the allowedCombos branch, and auto/* must be exempt — " +
      "auto/* fails open at dispatch and is already gated by allowAutoCombos"
  );
  assert.ok(
    catalog.includes("isComboNameAllowedForKey(keyMeta.allowedCombos, String(m.id))"),
    "the branch must decide via the key's allowedCombos"
  );
});
