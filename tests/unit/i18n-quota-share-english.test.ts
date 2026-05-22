import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const EN = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
  "src",
  "i18n",
  "messages",
  "en.json"
);

// Regression for #2540: the English source-of-truth (en.json) had Portuguese values for the
// quota-share Beta strings, which then propagated to every locale as __MISSING__ placeholders
// and surfaced as Portuguese on /dashboard/costs/quota-share. Guard that these stay English.
const PT_MARKERS = /configuração|não persiste|aplicação|divisão|cota|salva em/i;

test("#2540 en.json quotaShare Beta strings are English, not Portuguese", () => {
  const en = JSON.parse(fs.readFileSync(EN, "utf-8"));
  const qs = en.quotaShare ?? {};
  for (const key of ["betaConfigSavedPrefix", "betaConfigSavedSuffix"]) {
    const value = qs[key];
    assert.equal(typeof value, "string", `${key} must exist`);
    assert.ok(!PT_MARKERS.test(value), `${key} must not contain Portuguese text (got: "${value}")`);
  }
  assert.match(qs.betaConfigSavedPrefix, /Configuration is saved/i);
});
