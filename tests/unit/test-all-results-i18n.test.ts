// Regression for the "Test all models" crash:
//   FORMATTING_ERROR: The intl string context variable "total" was not provided
//   to the string "{ok} of {total} models working"
//
// The two call sites (ProviderDetailPageClient.tsx, PassthroughModelsSection.tsx)
// passed { ok, error } while the en.json `testAllResults` template needs { ok, total }.
// The fix centralises the variable contract in testAllResultsText() so it can be
// validated against the REAL en.json template here.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { testAllResultsText } from "../../src/app/(dashboard)/dashboard/providers/[id]/providerPageHelpers.ts";

const enPath = join(dirname(fileURLToPath(import.meta.url)), "../../src/i18n/messages/en.json");
const en = JSON.parse(readFileSync(enPath, "utf8")) as Record<string, unknown>;

function findMessage(obj: Record<string, unknown>, key: string): string | null {
  for (const [k, v] of Object.entries(obj)) {
    if (k === key && typeof v === "string") return v;
    if (v && typeof v === "object") {
      const r = findMessage(v as Record<string, unknown>, key);
      if (r != null) return r;
    }
  }
  return null;
}

// Faithful-enough next-intl stand-in: formats the REAL en.json template and throws
// (as ICU MessageFormat / next-intl does) when a referenced {placeholder} has no value.
function makeIntlTranslator(message: string) {
  const fn = (_key: string, values?: Record<string, unknown>) =>
    message.replace(/\{(\w+)\}/g, (_m, name: string) => {
      if (!values || !(name in values)) {
        throw new Error(
          `FORMATTING_ERROR: The intl string context variable "${name}" was not provided to the string "${message}"`
        );
      }
      return String(values[name]);
    });
  return Object.assign(fn, { has: (_k: string) => true });
}

test("en.json defines the testAllResults message", () => {
  assert.ok(findMessage(en, "testAllResults"), "testAllResults must exist in en.json");
});

test("testAllResultsText satisfies every variable the en.json template references", () => {
  const template = findMessage(en, "testAllResults");
  assert.ok(template);
  const t = makeIntlTranslator(template);
  // Must NOT throw — this is the exact crash path: providerText sees the key present
  // and calls t(key, values); a missing variable raises FORMATTING_ERROR.
  let out = "";
  assert.doesNotThrow(() => {
    out = testAllResultsText(t, 1, 2);
  });
  assert.match(out, /1/);
  assert.match(out, /2/);
});

test("testAllResultsText falls back to a sensible English string when untranslated", () => {
  const tStub = Object.assign((k: string) => k, { has: (_k: string) => false });
  assert.equal(testAllResultsText(tStub, 3, 4), "3 of 4 models working");
});
