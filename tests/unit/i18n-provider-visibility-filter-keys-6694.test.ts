import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Regression guard for #6694.
 *
 * On the provider detail page the visibility + free/paid filter row
 * (`providers.filterVisible/filterHidden/freeFilterAll/freeFilterFreeOnly/
 * freeFilterPaidOnly/showVisibleOnly/showHiddenOnly/filterByVisibility/
 * hideAllModels`) rendered as the literal `__MISSING__:<english>` sentinel in
 * 15 locales (including pt-BR) because those keys were mirrored by
 * scripts/i18n/sync-ui-keys.mjs but never translated.
 *
 * This is a DISJOINT key set from #6290 (filterAll/filterActive/filterError/
 * filterBanned/filterCreditsExhausted, guarded by
 * tests/unit/i18n-provider-filter-keys-6290.test.ts).
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(__dirname, "..", "..", "src", "i18n", "messages");
const PLACEHOLDER_PREFIX = "__MISSING__:";
const FILTER_KEYS = [
  "filterVisible",
  "filterHidden",
  "freeFilterAll",
  "freeFilterFreeOnly",
  "freeFilterPaidOnly",
  "showVisibleOnly",
  "showHiddenOnly",
  "filterByVisibility",
  "hideAllModels",
] as const;

function localeFiles(): string[] {
  return readdirSync(MESSAGES_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
}

test("every shipped locale has real (non-__MISSING__) providers visibility filter labels (#6694)", () => {
  const offenders: string[] = [];

  for (const file of localeFiles()) {
    const locale = file.replace(/\.json$/, "");
    const json = JSON.parse(readFileSync(path.join(MESSAGES_DIR, file), "utf8"));
    const providers = json.providers ?? {};

    for (const key of FILTER_KEYS) {
      const value = providers[key];
      // Absent is harmless here (t.has() is false -> clean English fallback fires).
      if (value === undefined || value === null) continue;
      if (typeof value === "string" && value.startsWith(PLACEHOLDER_PREFIX)) {
        offenders.push(`${locale}: providers.${key} is sentinel "${value}"`);
      }
    }
  }

  assert.equal(
    offenders.length,
    0,
    `Untranslated provider visibility filter labels (#6694 regression):\n${offenders.join("\n")}`
  );
});
