#!/usr/bin/env node
/**
 * fill-missing-from-en.mjs — fills missing keys in all non-EN locale JSON files
 * with the EN fallback value. Does NOT add translation markers (__MISSING__).
 * Only fills keys that are absent — never overwrites existing translated values.
 *
 * Usage:
 *   node scripts/i18n/fill-missing-from-en.mjs
 *
 * Idempotent. Safe to run repeatedly.
 */
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = new URL("../../src/i18n/messages/", import.meta.url).pathname;
const EN = JSON.parse(readFileSync(join(ROOT, "en.json"), "utf-8"));

function fillMissing(target, source) {
  for (const k of Object.keys(source)) {
    if (typeof source[k] === "object" && source[k] !== null && !Array.isArray(source[k])) {
      target[k] = target[k] && typeof target[k] === "object" ? target[k] : {};
      fillMissing(target[k], source[k]);
    } else if (!(k in target)) {
      target[k] = source[k]; // fallback EN value
    }
  }
}

let touched = 0;
for (const file of readdirSync(ROOT)) {
  if (!file.endsWith(".json") || file === "en.json") continue;
  const path = join(ROOT, file);
  const data = JSON.parse(readFileSync(path, "utf-8"));
  const before = JSON.stringify(data);
  fillMissing(data, EN);
  const after = JSON.stringify(data);
  if (before !== after) {
    writeFileSync(path, JSON.stringify(data, null, 2) + "\n");
    touched++;
    console.log(`[i18n] filled missing in ${file}`);
  }
}
console.log(`[i18n] done — touched ${touched} locale files`);
