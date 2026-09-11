#!/usr/bin/env node
/**
 * OmniRoute — NEW-key i18n coverage gate (CI gate, blocking).
 *
 * Sibling of `check-ui-value-drift.mjs`. That one catches an English value that was
 * REWRITTEN while translations were left behind; this one catches an English key that was
 * ADDED while some locales never received it.
 *
 * Why no existing gate sees this (the incident it encodes): Phase 3 of the Orchestration
 * Canvas added eleven keys and translated them across the 42 locales that existed at the
 * time. Hours later the EU-language batch (#13044) took the repo to 51 locales. The nine
 * new files — el, et, ga, hr, lt, lv, mt, sl, sr — never received those eleven keys, so the
 * compare-runs panel rendered in English for those users.
 *
 * `check-ui-keys-coverage.mjs` could not catch it: it enforces an 80% floor PER LOCALE, and
 * eleven absent keys out of ~13,000 leaves coverage at 99.9%. A percentage per language
 * cannot express "this feature shipped untranslated" — an entire feature can land in a new
 * locale with no text and never move the number.
 *
 * `deepMergeFallback` (src/i18n/request.ts) does substitute English for an absent key, so
 * the failure mode is untranslated UI rather than blank UI. That is a real defect, not a
 * cosmetic one, and it is silent by construction.
 *
 * How this gate works: DIFF-AWARE, like its sibling. It compares the English catalog at the
 * merge base against the working tree; every key that is NEW in English must be present and
 * non-placeholder in every locale. Pre-existing gaps are deliberately frozen — this gate
 * judges only what the current change adds, so it can be turned on without a migration.
 *
 * Escape hatch, same as the sibling: set the value to `__MISSING__:<english>` to make the
 * runtime fall back to correct English and queue the key for the translation pipeline.
 * NOTE that `vi` bans placeholders (tests/unit/i18n-vi-completeness.test.ts), so `vi` needs
 * a real translation.
 *
 * Usage:
 *   node scripts/i18n/check-new-key-coverage.mjs            # strict, exit 1
 *   node scripts/i18n/check-new-key-coverage.mjs --warn     # report, exit 0
 *   node scripts/i18n/check-new-key-coverage.mjs --json
 *   BASE_REF=origin/release/vX.Y.Z node scripts/i18n/check-new-key-coverage.mjs
 *
 * Graceful SKIP (exit 0) when the base catalog cannot be resolved — shallow clone, or a
 * brand-new catalog. Mirrors the SKIP in check-ui-value-drift.mjs.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const MESSAGES_REL = "src/i18n/messages";
const PLACEHOLDER_PREFIX = "__MISSING__:";

/** Flatten a nested catalog into `{ "a.b.c": value }`. */
export function flattenLeaves(node, prefix = "", out = {}) {
  for (const [key, value] of Object.entries(node ?? {})) {
    const dotted = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      flattenLeaves(value, dotted, out);
    } else {
      out[dotted] = value;
    }
  }
  return out;
}

/**
 * Pure core: which (key, locale) pairs are keys new in English that a locale never got?
 *
 * A `__MISSING__:` placeholder counts as satisfied — it is the documented, runtime-correct
 * way to defer a translation.
 *
 * @param {object} args
 * @param {object} args.baseEn   en.json at the base ref
 * @param {object} args.headEn   en.json in the working tree
 * @param {Record<string, object>} args.headLocales  locale -> catalog in the working tree
 * @returns {Array<{ key: string, locale: string }>} sorted, stable
 */
export function findUntranslatedNewKeys({ baseEn, headEn, headLocales }) {
  const base = flattenLeaves(baseEn);
  const head = flattenLeaves(headEn);
  const newKeys = Object.keys(head).filter(
    (k) => !(k in base) && typeof head[k] === "string" && head[k].trim() !== ""
  );
  if (!newKeys.length) return [];

  const gaps = [];
  for (const [locale, catalog] of Object.entries(headLocales)) {
    const flat = flattenLeaves(catalog);
    for (const key of newKeys) {
      const value = flat[key];
      const satisfied =
        typeof value === "string" && (value.trim() !== "" || value.startsWith(PLACEHOLDER_PREFIX));
      if (!satisfied) gaps.push({ key, locale });
    }
  }
  gaps.sort((a, b) => a.key.localeCompare(b.key) || a.locale.localeCompare(b.locale));
  return gaps;
}

function git(args) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function readPackageVersion() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version;
  } catch {
    return null;
  }
}

function defaultBaseRef() {
  const v = readPackageVersion();
  return v && /^\d+\.\d+\.\d+$/.test(v) ? `origin/release/v${v}` : null;
}

function resolveDiffBase(baseRef) {
  try {
    return git(["merge-base", "HEAD", baseRef]).trim();
  } catch {
    return baseRef;
  }
}

function readCatalogAtRef(ref, relPath) {
  try {
    return JSON.parse(git(["show", `${ref}:${relPath}`]));
  } catch {
    return null;
  }
}

function main() {
  const argv = process.argv.slice(2);
  const opts = { json: argv.includes("--json"), warn: argv.includes("--warn") };
  const baseRef = process.env.BASE_REF || defaultBaseRef();

  const skip = (reason) => {
    if (opts.json) process.stdout.write(JSON.stringify({ ok: true, skipped: true, reason }) + "\n");
    else console.log(`[i18n-new-keys] SKIP reason=${reason}`);
    process.exit(0);
  };

  if (!baseRef) skip("base-unresolved");
  const base = resolveDiffBase(baseRef);
  const baseEn = readCatalogAtRef(base, `${MESSAGES_REL}/en.json`);
  if (!baseEn) skip("base-catalog-unreadable");

  const dir = path.join(ROOT, MESSAGES_REL);
  const headEn = JSON.parse(fs.readFileSync(path.join(dir, "en.json"), "utf8"));
  const headLocales = {};
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".json") || file === "en.json") continue;
    try {
      headLocales[file.replace(/\.json$/, "")] = JSON.parse(
        fs.readFileSync(path.join(dir, file), "utf8")
      );
    } catch {
      /* a malformed catalog is another gate's problem */
    }
  }

  const gaps = findUntranslatedNewKeys({ baseEn, headEn, headLocales });

  if (opts.json) {
    console.log(JSON.stringify({ ok: gaps.length === 0, gaps }, null, 2));
  }

  if (!gaps.length) {
    console.log(
      `[i18n-new-keys] PASS — every key new in English reached all ${Object.keys(headLocales).length} locale(s).`
    );
    return;
  }

  const byKey = new Map();
  for (const g of gaps) {
    if (!byKey.has(g.key)) byKey.set(g.key, []);
    byKey.get(g.key).push(g.locale);
  }
  const label = opts.warn ? "WARN" : "FAIL";
  console.error(
    `\n[i18n-new-keys] ${label} — ${byKey.size} new English key(s) missing from some locales:`
  );
  for (const [key, locales] of byKey) {
    console.error(`  ✗ ${key} — missing in ${locales.length}: ${locales.join(", ")}`);
  }
  console.error(
    "\n  Translate them, or set `__MISSING__:<english>` to defer (the runtime then falls back\n" +
      "  to English). `vi` bans placeholders — it needs a real translation."
  );
  if (!opts.warn) process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) main();
