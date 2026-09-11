#!/usr/bin/env node
/**
 * ONE-OFF backfill — adds the 7 `usage.kiloPass*` keys (Kilo Pass usage meter,
 * added upstream in #12178) to every locale that is missing them, plus
 * `featureFlagOmnirouteDisableThinkingLevelVariantsDescription` to pt.json.
 *
 * Conventions followed:
 *   - Missing translations use the documented `__MISSING__:<english>` escape
 *     hatch (src/i18n/request.ts::deepMergeFallback, #7258) — the runtime
 *     serves the correct English until the translation pipeline catches up.
 *     This is exactly what pt-BR does for these same 7 keys.
 *   - pt.json gets pt-BR's real Portuguese translation for the flag key (same
 *     language, best available reference; all other locales have it).
 *
 * Run once: node scripts/ad-hoc/backfill-kilo-pass-keys.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.resolve(SCRIPT_DIR, "..", "..", "src", "i18n", "messages");

const KILO_KEYS = [
  "kiloAccountBalance",
  "kiloPassBonus",
  "kiloPassMeterLabel",
  "kiloPassPaid",
  "kiloPassRemaining",
  "kiloPassRenews",
  "kiloPassUsageLabel",
];
const FLAG_KEY = "featureFlagOmnirouteDisableThinkingLevelVariantsDescription";

const en = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, "en.json"), "utf8"));
const ptBr = JSON.parse(fs.readFileSync(path.join(MESSAGES_DIR, "pt-BR.json"), "utf8"));

// The reference: pt-BR marks these exact keys as pending translations.
const placeholderFor = (k) => `__MISSING__:${en.usage[k]}`;

/** Insert `entries` (ordered) into `obj` right after `afterKey` (or at the front). */
function insertAfter(obj, afterKey, entries) {
  const out = {};
  let inserted = false;
  for (const [k, v] of Object.entries(obj)) {
    out[k] = v;
    if (k === afterKey && !inserted) {
      Object.assign(out, entries);
      inserted = true;
    }
  }
  if (!inserted) Object.assign(out, entries); // anchor missing — append
  return out;
}

const files = fs.readdirSync(MESSAGES_DIR).filter((f) => f.endsWith(".json")).sort();
let changed = 0;

for (const file of files) {
  const locale = file.slice(0, -5);
  if (locale === "en") continue;
  const fullPath = path.join(MESSAGES_DIR, file);
  const data = JSON.parse(fs.readFileSync(fullPath, "utf8"));

  // 1. Kilo Pass keys
  const missing = KILO_KEYS.filter((k) => data.usage?.[k] === undefined);
  if (missing.length) {
    const entries = Object.fromEntries(missing.map((k) => [k, placeholderFor(k)]));
    // Anchor: de.json places kiloPass keys after kimiMonthlyUsed; use the last
    // grok* or kimi* key present so insertion is stable across locales.
    const anchor = ["kimiMonthlyUsed", "grokAdditionalCredits", "kimiAdditionalCredits"].find(
      (k) => data.usage?.[k] !== undefined
    );
    data.usage = insertAfter(data.usage, anchor, entries);
    changed++;
    console.log(`  ✓ ${file}: +${missing.length} usage.kiloPass* (${missing.join(", ")})`);
  }

  // 2. Flag description — only pt.json is missing it; use pt-BR's translation.
  if (data[FLAG_KEY] === undefined) {
    const value = ptBr[FLAG_KEY];
    // Anchor right after the last top-level featureFlag* key, keeping flags grouped.
    const flagKeys = Object.keys(data).filter((k) => k.startsWith("featureFlag"));
    const anchor = flagKeys.length ? flagKeys[flagKeys.length - 1] : null;
    const flagEntries = { [FLAG_KEY]: value };
    if (anchor && data[anchor] !== undefined) {
      const out = {};
      let inserted = false;
      for (const [k, v] of Object.entries(data)) {
        out[k] = v;
        if (k === anchor && !inserted) {
          Object.assign(out, flagEntries);
          inserted = true;
        }
      }
      if (!inserted) Object.assign(out, flagEntries);
      Object.keys(data).forEach((k) => delete data[k]);
      Object.assign(data, out);
    } else {
      Object.assign(data, flagEntries);
    }
    changed++;
    console.log(`  ✓ ${file}: +${FLAG_KEY}`);
  }

  if (missing.length || data[FLAG_KEY] !== undefined) {
    fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + "\n", "utf8");
  }
}

console.log(`\nBackfilled ${changed} file(s).`);
process.exit(0);