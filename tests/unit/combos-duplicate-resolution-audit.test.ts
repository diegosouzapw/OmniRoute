/**
 * Audit: every built-in auto-combo template must resolve to SOME spec or variant
 * (not an empty object that produces a full unfiltered pool).
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-duplicate-audit-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET ?? "dup-audit-secret";

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const { AUTO_TEMPLATE_VARIANTS, AUTO_SUFFIX_VARIANTS, AUTO_FAMILY_IDS } =
  await import("@omniroute/open-sse/services/autoCombo/builtinCatalog");
const { resolveBuiltinAutoSpec } =
  await import("@omniroute/open-sse/services/autoCombo/builtinCatalog");
const advertisedAuto = await import("../../src/app/api/v1/models/autoCatalogIds.ts");

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {}
});

const ALL_TEMPLATES = [
  ...Object.keys(AUTO_TEMPLATE_VARIANTS),
  ...AUTO_SUFFIX_VARIANTS,
  ...AUTO_FAMILY_IDS,
  // The two ids the catalog derivation adds on top of the source lists,
  // kept literal so the audit stays independent of the derived module.
  "auto",
  "auto/lkgp",
];

test("every template resolves to a non-empty spec or variant (not bare unfiltered pool)", async () => {
  // The catalog announces exactly the derived set — the audit covers that
  // same set, so a derivation regression dropping an id fails here.
  assert.deepEqual(new Set(ALL_TEMPLATES), new Set(advertisedAuto.getAdvertisedAutoIds()));
  for (const name of ALL_TEMPLATES) {
    const suffix = name.replace(/^auto\/?/, "");
    const r = resolveBuiltinAutoSpec(name, suffix);

    // The bare default id is materialized by the dedicated branch, not the
    // resolver — the resolver must keep returning the empty spec for it, so
    // a future resolver change that starts mapping it is caught here.
    if (name === "auto") {
      assert.ok(
        JSON.stringify(r) === "{}",
        "the bare default id must keep resolving to the empty spec it bypasses"
      );
      continue;
    }
    // The derived auto/lkgp id must resolve to its variant through the
    // unchanged resolver — a resolver regression dropping it fails here.
    if (name === "auto/lkgp") {
      assert.ok(JSON.stringify(r) !== "{}", "auto/lkgp must keep resolving to its variant spec");
    }
    // auto/chat-style templates legitimately return {variant: undefined} — that IS the "unconstrained" spec.
    if (Object.prototype.hasOwnProperty.call(AUTO_TEMPLATE_VARIANTS, name)) {
      continue;
    }
    // Family IDs handled by duplicate route fallback
    if (AUTO_FAMILY_IDS.includes(name)) {
      continue;
    }

    assert.ok(
      JSON.stringify(r) !== "{}",
      `${name} resolved to empty spec — would produce full unfiltered pool`
    );
  }
});
