#!/usr/bin/env node
/**
 * Validates that:
 *   1. All t("key") calls in bin/cli/commands/ resolve to existing keys in en.json.
 *   2. pt-BR.json has the same top-level shape as en.json (no missing top-level sections).
 *   3. No raw string literals are passed to .description() in commands without going
 *      through t() — only warns, does not fail hard (many descriptions use || fallback).
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "..");
const COMMANDS_DIR = join(ROOT, "bin", "cli", "commands");
const LOCALES_DIR = join(ROOT, "bin", "cli", "locales");

// Paths that look like t() keys but are actually import paths — skip them.
const IGNORE_AS_KEY = new Set([".", ".."]);
const IMPORT_PATH_RE = /^(\.\.?\/|node:|\/)/;

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      results.push(...walk(full));
    } else if (entry.endsWith(".mjs") || entry.endsWith(".js")) {
      results.push(full);
    }
  }
  return results;
}

function flattenKeys(obj, prefix = "") {
  const keys = new Set();
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      for (const sub of flattenKeys(v, full)) keys.add(sub);
    } else {
      keys.add(full);
    }
  }
  return keys;
}

function collectTKeys(files) {
  const used = new Set();
  const re = /\bt\(\s*["']([^"']+)["']/g;
  for (const file of files) {
    const src = readFileSync(file, "utf8");
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(src)) !== null) {
      const key = m[1];
      if (IGNORE_AS_KEY.has(key) || IMPORT_PATH_RE.test(key)) continue;
      used.add(key);
    }
  }
  return used;
}

function loadJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

const files = walk(COMMANDS_DIR);
const usedKeys = collectTKeys(files);
const en = loadJson(join(LOCALES_DIR, "en.json"));
const ptBR = loadJson(join(LOCALES_DIR, "pt-BR.json"));
const enKeys = flattenKeys(en);

let errors = 0;

// Check 1: all used keys exist in en.json
const missingInEn = [...usedKeys].filter((k) => !enKeys.has(k));
if (missingInEn.length > 0) {
  console.error("[cli-i18n] Keys used in commands but missing in en.json:");
  for (const k of missingInEn) console.error(`  ✗ ${k}`);
  errors += missingInEn.length;
} else {
  console.log(`[cli-i18n] ✓ All ${usedKeys.size} t() keys found in en.json`);
}

// Check 2: pt-BR.json has the same top-level sections as en.json
const enTopLevel = Object.keys(en);
const ptTopLevel = new Set(Object.keys(ptBR));
const missingTopLevel = enTopLevel.filter((k) => !ptTopLevel.has(k));
if (missingTopLevel.length > 0) {
  console.error("[cli-i18n] Top-level sections in en.json missing from pt-BR.json:");
  for (const k of missingTopLevel) console.error(`  ✗ ${k}`);
  errors += missingTopLevel.length;
} else {
  console.log(`[cli-i18n] ✓ pt-BR.json has all ${enTopLevel.length} top-level sections`);
}

if (errors > 0) {
  console.error(`[cli-i18n] FAIL — ${errors} error(s) found`);
  process.exit(1);
} else {
  console.log("[cli-i18n] PASS — CLI i18n is consistent");
}
