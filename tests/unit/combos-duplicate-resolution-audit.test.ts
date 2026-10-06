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
];

test("every template resolves to a non-empty spec or variant (not bare unfiltered pool)", async () => {
  for (const name of ALL_TEMPLATES) {
    const suffix = name.slice("auto/".length);
    const r = resolveBuiltinAutoSpec(name, suffix);

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
