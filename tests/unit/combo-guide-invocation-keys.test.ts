import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const en = require("../../src/i18n/messages/en.json");

const invokeKeys = [
  "usageGuideInvokeTitle",
  "usageGuideInvokeDesc",
  "usageGuideInvokeAutoNote",
  "usageGuideInvokeOpenrouterNote",
];

test("combos: usage guide invocation keys exist in en.json with expected copy", () => {
  for (const key of invokeKeys) {
    assert.ok(
      typeof en.combos[key] === "string" && en.combos[key].length > 0,
      `combos.${key} missing`
    );
  }
  assert.match(en.combos.usageGuideInvokeDesc, /exact name/);
  assert.match(en.combos.usageGuideInvokeAutoNote, /does not use your combos/);
  assert.match(en.combos.usageGuideInvokeOpenrouterNote, /paid OpenRouter product/);
});

test("combos: ComboUsageGuide renders the invocation keys via getI18nOrFallback", () => {
  const page = readFileSync(
    path.join(import.meta.dirname, "../../src/app/(dashboard)/dashboard/combos/page.tsx"),
    "utf8"
  );
  for (const key of invokeKeys) {
    assert.ok(page.includes(`"${key}"`), `page.tsx references combos.${key}`);
  }
});
