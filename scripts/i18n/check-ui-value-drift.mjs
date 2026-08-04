#!/usr/bin/env node
/**
 * OmniRoute — UI i18n VALUE-drift gate (CI gate, blocking).
 *
 * Catches the one i18n regression no existing gate can see: an English **value** is
 * rewritten and the translations derived from the previous English are left behind, so
 * every non-English user keeps reading confidently-worded, now-wrong copy.
 *
 * Real incident (fixed in #8463): `oauthModal.googleOAuthWarning` was rewritten when the
 * Antigravity login helper shipped (#5203). 39 of 43 locales kept the old text, which
 * told operators to "copy the full URL and paste it below" — a flow that cannot complete
 * for that provider family. Nobody noticed, because:
 *
 *   - `sync-ui-keys.mjs` only backfills keys that are ABSENT, never ones that are STALE;
 *   - `check-ui-keys-coverage.mjs` counts key presence, so a stale translation scores as
 *     fully covered;
 *   - `check-translation-drift.mjs` tracks the `docs/i18n/<locale>/**.md` documentation
 *     mirrors — it never looks at `src/i18n/messages/*.json` at all.
 *
 * How this gate works: it is DIFF-AWARE, not baseline-backed. It compares the English
 * catalog at the merge base against the working tree; for every key whose English value
 * changed, any locale still holding an untouched translation of it is stale.
 *
 * That deliberately freezes pre-existing debt: a diff cannot reveal which old English a
 * long-standing translation was derived from, so the gate judges only what the current
 * change touches. The alternative — a per-key hash baseline — would cost a ~600 KB
 * generated file (3x the largest existing baseline) that churns on every i18n PR.
 *
 * Two ways to satisfy it:
 *   1. update the affected translations, or
 *   2. set them to `__MISSING__:<new english>`, which makes the runtime fall back to the
 *      correct English (src/i18n/request.ts::deepMergeFallback, #7258) and queues the key
 *      for the translation pipeline.
 *
 * Usage:
 *   node scripts/i18n/check-ui-value-drift.mjs                 # strict (default), exit 1 on drift
 *   node scripts/i18n/check-ui-value-drift.mjs --warn          # report, exit 0
 *   node scripts/i18n/check-ui-value-drift.mjs --json          # machine-readable report
 *   BASE_REF=origin/release/vX.Y.Z node scripts/i18n/check-ui-value-drift.mjs
 *
 * Graceful SKIP (exit 0) when the base English catalog cannot be resolved — a shallow
 * clone without the base ref, or a brand-new catalog. Mirrors the base-unresolved SKIP in
 * `scripts/check/check-openapi-breaking.mjs`.
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const MESSAGES_REL = "src/i18n/messages";
const MESSAGES_DIR = path.join(ROOT, MESSAGES_REL);
const PLACEHOLDER_PREFIX = "__MISSING__:";

/** Flatten a nested message catalog into `{ "a.b.c": value }`. */
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
 * Pure core: which (key, locale) pairs carry a translation of a now-changed English value?
 *
 * @param {object} args
 * @param {object} args.baseEn      en.json at the base ref
 * @param {object} args.headEn      en.json in the working tree
 * @param {Record<string, object>} args.baseLocales  locale -> catalog at the base ref
 * @param {Record<string, object>} args.headLocales  locale -> catalog in the working tree
 * @returns {Array<{ key: string, locale: string }>} sorted, stable
 */
/**
 * Whether an English rewrite is COSMETIC — the same sentence, differently cased, spaced, or
 * terminally punctuated. A translation of the old string is still a correct translation of the
 * new one, so it must not be marked stale.
 *
 * Why this exists: `"Reset Defaults"` → `"Reset defaults"` marked the key stale in 41 locales
 * during the v3.8.49 cycle. Every one of those translations was still correct, and in locales
 * with no letter case the "fix" is not even expressible. Worse, the documented escape hatch
 * (a `__MISSING__:` placeholder) is BANNED in `vi` by tests/unit/i18n-vi-completeness.test.ts,
 * so `vi` had no legitimate way out of a purely cosmetic English edit.
 *
 * Deliberately narrow: ONLY letter case and trailing terminal punctuation.
 *
 * **Whitespace is NOT folded, on purpose.** A first version of this folded whitespace runs and
 * trimmed, and it collided with a pre-existing, deliberately conservative decision —
 * tests/unit/i18n-ui-value-drift.test.ts, "a value that only changes whitespace still counts as
 * an edit", whose comment reads: *"trailing-space churn is rare, and treating it as a no-op would
 * let a real reword slip through behind an innocuous-looking diff."* That call belongs to whoever
 * made it; the problem actually reported here was CASE
 * (`"Reset Defaults"` → `"Reset defaults"`, 41 locales invalidated), and quietly reversing
 * someone else's documented decision to fix something they never reported is not this change's
 * job. Narrowed to the reported scope instead.
 *
 * Any change to the words themselves — added or removed words, and any change inside an
 * interpolation like `{count}` — is a real rewrite and still flags.
 */
export function isCosmeticRewrite(before, after) {
  if (typeof before !== "string" || typeof after !== "string") return false;
  if (before === after) return true;
  const norm = (s) => s.replace(/[.:!?;,]+$/u, "").toLowerCase();
  return norm(before) === norm(after);
}

export function findStaleTranslations({ baseEn, headEn, baseLocales, headLocales }) {
  const baseFlat = flattenLeaves(baseEn);
  const headFlat = flattenLeaves(headEn);

  // Keys whose English copy was REWRITTEN by this change. A key absent from either side
  // is an add or a delete: nothing can be stale against text that did not exist, and a
  // renamed key (delete + add) is exactly the safe fix pattern.
  //
  // Cosmetic rewrites (case, spacing, trailing punctuation) are excluded — see
  // isCosmeticRewrite. They used to invalidate correct translations in 41 locales at once.
  const rewritten = Object.keys(headFlat).filter(
    (key) =>
      key in baseFlat &&
      baseFlat[key] !== headFlat[key] &&
      !isCosmeticRewrite(baseFlat[key], headFlat[key])
  );
  if (rewritten.length === 0) return [];

  const flatCache = new Map();
  const flatOf = (bag, locale) => {
    const cacheKey = `${bag === baseLocales ? "base" : "head"}:${locale}`;
    if (!flatCache.has(cacheKey)) flatCache.set(cacheKey, flattenLeaves(bag[locale]));
    return flatCache.get(cacheKey);
  };

  const stale = [];
  for (const locale of Object.keys(headLocales)) {
    if (locale === "en") continue; // the source of truth is never its own target
    const head = flatOf(headLocales, locale);
    const base = flatOf(baseLocales, locale);

    for (const key of rewritten) {
      const headValue = head[key];
      // Never translated here — that is `check-ui-keys-coverage`'s concern, not ours.
      if (headValue === undefined) continue;
      // Explicitly pending: the runtime serves the corrected English instead.
      if (typeof headValue === "string" && headValue.startsWith(PLACEHOLDER_PREFIX)) continue;
      // Refreshed alongside the English in this very change.
      if (base[key] !== headValue) continue;

      stale.push({ key, locale });
    }
  }

  return stale.sort((a, b) => a.key.localeCompare(b.key) || a.locale.localeCompare(b.locale));
}

function parseArgs(argv) {
  const opts = { mode: "strict", json: false };
  for (const arg of argv.slice(2)) {
    if (arg === "--warn") opts.mode = "warn";
    else if (arg === "--strict") opts.mode = "strict";
    else if (arg === "--json") opts.json = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/i18n/check-ui-value-drift.mjs [--strict|--warn] [--json]",
          "",
          "  --strict  (default) exit 1 when a rewritten English value leaves a stale translation",
          "  --warn    report drift but exit 0",
          "  --json    machine-readable report on stdout",
          "",
          "  BASE_REF  ref to diff against (default: derived from package.json version)",
        ].join("\n")
      );
      process.exit(0);
    }
  }
  return opts;
}

function readPackageVersion() {
  try {
    return JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).version ?? null;
  } catch {
    return null;
  }
}

/** `3.8.49` -> `origin/release/v3.8.49`, matching check-openapi-breaking's convention. */
function defaultBaseRef() {
  const version = readPackageVersion();
  return version && /^\d+\.\d+\.\d+$/.test(version) ? `origin/release/v${version}` : null;
}

function git(args) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}

/** Prefer the merge base so a base branch that advanced independently cannot false-positive. */
function resolveDiffBase(baseRef) {
  try {
    return git(["merge-base", "HEAD", baseRef]).trim();
  } catch {
    return baseRef; // shallow clone without common history — the tip is the best available
  }
}

function readCatalogAtRef(ref, relPath) {
  try {
    return JSON.parse(git(["show", `${ref}:${relPath}`]));
  } catch {
    return null;
  }
}

function readCatalogFromDisk(absPath) {
  try {
    return JSON.parse(fs.readFileSync(absPath, "utf8"));
  } catch {
    return null;
  }
}

function main() {
  const opts = parseArgs(process.argv);
  const baseRef = process.env.BASE_REF || defaultBaseRef();

  const emitSkip = (reason) => {
    if (opts.json) {
      process.stdout.write(JSON.stringify({ ok: true, skipped: true, reason }) + "\n");
    } else {
      console.log(`[i18n-value-drift] SKIP reason=${reason}`);
    }
    process.exit(0);
  };

  if (!baseRef) emitSkip("base-unresolved");

  const diffBase = resolveDiffBase(baseRef);
  const baseEn = readCatalogAtRef(diffBase, `${MESSAGES_REL}/en.json`);
  if (!baseEn) emitSkip("base-unresolved");

  const headEn = readCatalogFromDisk(path.join(MESSAGES_DIR, "en.json"));
  if (!headEn) emitSkip("head-en-unreadable");

  const locales = fs
    .readdirSync(MESSAGES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.slice(0, -5));

  const headLocales = {};
  const baseLocales = {};
  for (const locale of locales) {
    headLocales[locale] = readCatalogFromDisk(path.join(MESSAGES_DIR, `${locale}.json`)) ?? {};
    baseLocales[locale] = readCatalogAtRef(diffBase, `${MESSAGES_REL}/${locale}.json`) ?? {};
  }

  const stale = findStaleTranslations({ baseEn, headEn, baseLocales, headLocales });

  if (opts.json) {
    process.stdout.write(
      JSON.stringify({ ok: stale.length === 0, baseRef, diffBase, stale }, null, 2) + "\n"
    );
    process.exit(stale.length === 0 || opts.mode === "warn" ? 0 : 1);
  }

  if (stale.length === 0) {
    console.log(
      `[i18n-value-drift] PASS — no rewritten English value left a stale translation (base ${baseRef}).`
    );
    process.exit(0);
  }

  // Group by key so the report reads as "this string changed; these locales lag".
  const byKey = new Map();
  for (const { key, locale } of stale) {
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key).push(locale);
  }

  console.log(
    `[i18n-value-drift] ${byKey.size} English value(s) rewritten with ${stale.length} stale translation(s):`
  );
  for (const [key, affected] of byKey) {
    console.log(`  - ${key}`);
    console.log(`      stale in ${affected.length} locale(s): ${affected.join(", ")}`);
  }
  console.log("");
  console.log("  Fix either way:");
  console.log("    1. update those translations to match the new English, or");
  console.log(`    2. set them to "${PLACEHOLDER_PREFIX}<new english>" so the runtime serves`);
  console.log("       the corrected English until the translation pipeline catches up.");
  console.log("");
  console.log("  If the string's MEANING changed, prefer renaming the key instead — a new key");
  console.log("  cannot inherit a stale translation (see #8463).");

  if (opts.mode === "warn") {
    console.log("[i18n-value-drift] WARN — drift detected (warn mode, exiting 0).");
    process.exit(0);
  }
  console.log("[i18n-value-drift] FAIL — stale translations detected.");
  process.exit(1);
}

// Only run the CLI when invoked directly, so the pure helpers stay importable in tests.
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))
) {
  main();
}
