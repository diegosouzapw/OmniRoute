#!/usr/bin/env node
/**
 * OmniRoute — real-translation ratio gate (ratchet).
 *
 * `check-ui-keys-coverage.mjs` measures key parity and `__MISSING__:` markers;
 * a leaf copied verbatim from en.json (what `fill-missing-from-en.mjs` and
 * feature PRs produce) counts as "covered" there. This gate measures what a
 * user actually sees: for every locale, the share of leaves whose value is
 * identical to English, still a placeholder, or missing — minus the allowlist
 * in `untranslatable-keys.json`. The share may never grow beyond the baseline
 * in `config/quality/i18n-translation-baseline.json` (+ slack).
 *
 * Usage:
 *   node scripts/i18n/check-translation-ratio.mjs            # gate (exit 1 on regression)
 *   node scripts/i18n/check-translation-ratio.mjs --warn     # report regressions, exit 0
 *   node scripts/i18n/check-translation-ratio.mjs --report   # table only
 *   node scripts/i18n/check-translation-ratio.mjs --json
 *   node scripts/i18n/check-translation-ratio.mjs --update   # rewrite baseline with measured values
 *   node scripts/i18n/check-translation-ratio.mjs --locale=es,az
 */
import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");
const CONFIG_PATH = path.join(ROOT, "config", "i18n.json");
const ALLOWLIST_PATH = path.join(SCRIPT_DIR, "untranslatable-keys.json");
const BASELINE_PATH = path.join(ROOT, "config", "quality", "i18n-translation-baseline.json");
const SOURCE_LOCALE = "en";
const PLACEHOLDER_PREFIX = "__MISSING__:";

export function flattenLeaves(node, prefix = "", out = new Map()) {
  if (node && typeof node === "object" && !Array.isArray(node)) {
    for (const [key, value] of Object.entries(node)) {
      flattenLeaves(value, prefix ? `${prefix}.${key}` : key, out);
    }
  } else if (typeof node === "string") {
    out.set(prefix, node);
  }
  return out;
}

export function measureLocale(enFlat, localeFlat, untranslatable) {
  let total = 0;
  let identical = 0;
  let placeholder = 0;
  let missing = 0;
  for (const [key, enValue] of enFlat) {
    if (untranslatable.has(key)) continue;
    total += 1;
    const value = localeFlat.get(key);
    if (value === undefined) missing += 1;
    else if (value.startsWith(PLACEHOLDER_PREFIX)) placeholder += 1;
    else if (value === enValue) identical += 1;
  }
  const untranslated = identical + placeholder + missing;
  const ratio = total === 0 ? 0 : Number(((untranslated / total) * 100).toFixed(1));
  return { total, identical, placeholder, missing, untranslated, ratio };
}

export function compareToBaseline(measured, baseline, slack) {
  const regressions = [];
  for (const [locale, value] of Object.entries(measured)) {
    const base = baseline[locale] ?? 0;
    if (value > base + slack) regressions.push({ locale, measured: value, baseline: base });
  }
  return regressions;
}

function parseArgs(argv) {
  const opts = { report: false, json: false, update: false, warn: false, locales: null };
  for (const arg of argv.slice(2)) {
    if (arg === "--report") opts.report = true;
    else if (arg === "--json") opts.json = true;
    else if (arg === "--update") opts.update = true;
    else if (arg === "--warn") opts.warn = true;
    else if (arg.startsWith("--locale="))
      opts.locales = arg
        .slice(9)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
  }
  return opts;
}

async function loadJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

async function main() {
  const opts = parseArgs(process.argv);
  const config = await loadJson(CONFIG_PATH);
  const allow = new Set((await loadJson(ALLOWLIST_PATH)).keys ?? []);
  const enFlat = flattenLeaves(await loadJson(path.join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`)));
  const baselineDoc = existsSync(BASELINE_PATH)
    ? await loadJson(BASELINE_PATH)
    : { _comment: "", slack: 0.5, locales: {} };
  const slack = Number(baselineDoc.slack ?? 0.5);

  const codes = config.locales
    .map((l) => l.code)
    .filter((c) => c !== SOURCE_LOCALE)
    .filter((c) => !opts.locales || opts.locales.includes(c));

  const measured = {};
  const rows = [];
  for (const code of codes) {
    const file = path.join(MESSAGES_DIR, `${code}.json`);
    if (!existsSync(file)) {
      rows.push({ locale: code, error: "catalog missing" });
      measured[code] = 100;
      continue;
    }
    const m = measureLocale(enFlat, flattenLeaves(await loadJson(file)), allow);
    measured[code] = m.ratio;
    rows.push({ locale: code, ...m, baseline: baselineDoc.locales[code] ?? null });
  }

  if (opts.json) {
    console.log(JSON.stringify({ slack, rows }, null, 2));
  } else {
    console.log(
      "[i18n-ratio] locale  untranslated%  baseline  identical  placeholder  missing  total"
    );
    for (const r of rows.sort((a, b) => (b.ratio ?? 100) - (a.ratio ?? 100))) {
      if (r.error) {
        console.log(`[i18n-ratio] ${r.locale.padEnd(7)} ${r.error}`);
        continue;
      }
      console.log(
        `[i18n-ratio] ${r.locale.padEnd(7)} ${String(r.ratio).padStart(12)}  ${String(r.baseline ?? "-").padStart(8)}  ${String(r.identical).padStart(9)}  ${String(r.placeholder).padStart(11)}  ${String(r.missing).padStart(7)}  ${r.total}`
      );
    }
  }

  if (opts.update) {
    const next = {
      _comment:
        "Catraca de tradução real (valor idêntico ao en.json, placeholder ou ausente, fora do allowlist untranslatable-keys.json) em % por locale. Só pode cair. Atualize via `npm run i18n:check-ratio:update` quando um locale melhora. Valores medidos, nunca chutados.",
      slack,
      locales: Object.fromEntries(Object.entries({ ...baselineDoc.locales, ...measured }).sort()),
    };
    await fs.writeFile(BASELINE_PATH, JSON.stringify(next, null, 2) + "\n", "utf8");
    console.log(`[i18n-ratio] baseline updated: ${path.relative(ROOT, BASELINE_PATH)}`);
    return;
  }
  if (opts.report || opts.json) return;

  const regressions = compareToBaseline(measured, baselineDoc.locales, slack);
  if (regressions.length === 0) {
    console.log(`[i18n-ratio] OK — ${codes.length} locales within baseline (+${slack})`);
    return;
  }
  for (const r of regressions) {
    console.error(
      `[i18n-ratio] ${opts.warn ? "WARN" : "FAIL"} ${r.locale}: ${r.measured}% untranslated > baseline ${r.baseline}% (+${slack})`
    );
  }
  if (!opts.warn) process.exit(1);
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((err) => {
    console.error("[i18n-ratio] ERROR", err?.stack || err?.message || String(err));
    process.exit(1);
  });
}
