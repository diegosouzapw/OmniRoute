import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Regression guard for #6290.
 *
 * On the provider detail page the connection-status filter labels
 * (`providers.filterAll/filterActive/filterError/filterBanned/filterCreditsExhausted`)
 * rendered as `__MISSING__:All`, `__MISSING__:Active`, ... for non-English
 * locales. The keys existed in the correct `providers` namespace in en.json,
 * but the locale mirrors carried the `__MISSING__:` sentinel (or omitted the
 * key entirely) — mirror translation debt, not a namespace mismatch.
 *
 * Every shipped locale under src/i18n/messages/ MUST have a real, non-sentinel,
 * present value for these five keys.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(__dirname, "..", "..", "src", "i18n", "messages");
const PLACEHOLDER_PREFIX = "__MISSING__:";
const FILTER_KEYS = [
  "filterAll",
  "filterActive",
  "filterError",
  "filterBanned",
  "filterCreditsExhausted",
] as const;

function localeFiles(): string[] {
  return readdirSync(MESSAGES_DIR)
    .filter((f) => f.endsWith(".json"))
    .sort();
}

test("every shipped locale has real (non-__MISSING__, present) providers.filter* labels (#6290)", () => {
  const offenders: string[] = [];

  for (const file of localeFiles()) {
    const locale = file.replace(/\.json$/, "");
    const json = JSON.parse(readFileSync(path.join(MESSAGES_DIR, file), "utf8"));
    const providers = json.providers ?? {};

    for (const key of FILTER_KEYS) {
      const value = providers[key];
      if (value === undefined || value === null) {
        offenders.push(`${locale}: providers.${key} is ABSENT`);
        continue;
      }
      if (typeof value !== "string" || value.trim() === "") {
        offenders.push(`${locale}: providers.${key} is empty/non-string`);
        continue;
      }
      if (value.startsWith(PLACEHOLDER_PREFIX)) {
        offenders.push(`${locale}: providers.${key} is sentinel "${value}"`);
      }
    }
  }

  assert.equal(
    offenders.length,
    0,
    `Untranslated provider filter labels (#6290 regression):\n${offenders.join("\n")}`
  );
});
