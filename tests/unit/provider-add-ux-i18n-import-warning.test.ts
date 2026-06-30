import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { extractImportWarning } from "../../src/app/(dashboard)/dashboard/providers/[id]/hooks/modelImportWarning.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const enRaw = readFileSync(
  join(__dirname, "..", "..", "src", "i18n", "messages", "en.json"),
  "utf8"
);
// en.json is namespaced (keys live nested under a parent object), so scan the raw text by
// the exact `"key": "value"` pair rather than a top-level lookup.
const en = JSON.parse(enRaw);
assert.ok(en && typeof en === "object", "en.json must parse to an object");

// ── A1: provider-add form i18n keys must carry real copy, not the auto-generated stub
// placeholders ("Validation Model Id Label" etc.) that shipped untranslated and surfaced
// verbatim in the Add-API-Key modal (#5421/#5426/#5428/#5429/#5431/#5435/#5439).
const STUB_KEYS: Array<[string, string]> = [
  ["validationModelIdLabel", "Validation Model Id Label"],
  ["validationModelIdPlaceholder", "Validation Model Id Placeholder"],
  ["validationModelIdHint", "Validation Model Id Hint"],
  ["accountIdLabel", "Account Id Label"],
  ["accountIdPlaceholder", "Account Id Placeholder"],
  ["accountIdHint", "Account Id Hint"],
];

for (const [key, stub] of STUB_KEYS) {
  test(`en.json '${key}' is real copy, not the untranslated stub`, () => {
    assert.ok(enRaw.includes(`"${key}":`), `${key} must exist in en.json`);
    assert.ok(
      !enRaw.includes(`"${key}": "${stub}"`),
      `${key} still ships the untranslated stub "${stub}"`
    );
  });
}

// ── A2: extractImportWarning surfaces the model-import route's `warning` field so a
// cached/local-catalog fallback is no longer silent (#5428/#5429/#5431).
test("extractImportWarning returns the warning string when present", () => {
  assert.equal(
    extractImportWarning({
      models: [{ id: "x" }],
      warning: "API unavailable — using local catalog",
    }),
    "API unavailable — using local catalog"
  );
});

test("extractImportWarning returns null when there is no warning", () => {
  assert.equal(extractImportWarning({ models: [{ id: "x" }] }), null);
  assert.equal(extractImportWarning({ warning: "" }), null);
  assert.equal(extractImportWarning({ warning: "   " }), null);
  assert.equal(extractImportWarning(null), null);
  assert.equal(extractImportWarning("nope"), null);
  assert.equal(extractImportWarning({ warning: 42 }), null);
});
