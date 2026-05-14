#!/usr/bin/env node
/**
 * OmniRoute — UI i18n key coverage gate.
 *
 * Compares every `src/i18n/messages/<locale>.json` against `en.json` and
 * reports:
 *   - total_en:    total leaves in en.json
 *   - present:     leaves present in the locale (any shape match)
 *   - missing:     leaves absent in the locale
 *   - placeholder: leaves whose value starts with __MISSING__:
 *   - coverage:    (present - placeholder) / total_en * 100
 *
 * Usage:
 *   npm run i18n:check-ui-coverage              # threshold 80, fail on drop
 *   npm run i18n:check-ui-coverage -- --threshold=75
 *   npm run i18n:check-ui-coverage -- --report  # informational tabular output
 *   npm run i18n:check-ui-coverage -- --json    # machine-readable report
 *
 * Exits 1 when any locale falls below `--threshold` (default 80), unless
 * `--report` is set, in which case the table is printed and exit code is 0.
 */

import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");
const CONFIG_PATH = path.join(ROOT, "config", "i18n.json");
const SOURCE_LOCALE = "en";
const PLACEHOLDER_PREFIX = "__MISSING__:";

function logInfo(...parts) {
  console.log("[i18n-ui-coverage]", ...parts);
}
function logWarn(...parts) {
  console.warn("[i18n-ui-coverage] WARN", ...parts);
}

function parseArgs(argv) {
  const opts = { threshold: 80, report: false, json: false };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith("--threshold=")) {
      opts.threshold = Number(arg.slice(12));
    } else if (arg === "--report") {
      opts.report = true;
    } else if (arg === "--json") {
      opts.json = true;
    } else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/i18n/check-ui-keys-coverage.mjs [options]",
          "",
          "  --threshold=<n>   Minimum coverage % for every locale (default 80)",
          "  --report          Print full coverage table, exit 0 regardless",
          "  --json            Emit JSON report to stdout",
        ].join("\n")
      );
      process.exit(0);
    }
  }
  if (!Number.isFinite(opts.threshold) || opts.threshold < 0 || opts.threshold > 100) {
    throw new Error(`Invalid --threshold value: ${opts.threshold}`);
  }
  return opts;
}

async function loadJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function collectLeafPaths(obj, prefix = "") {
  const paths = [];
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key;
    if (isPlainObject(value)) {
      paths.push(...collectLeafPaths(value, next));
    } else {
      paths.push(next);
    }
  }
  return paths;
}

// Reject any segment that could traverse into the object prototype chain. This
// is defensive — our inputs are JSON files we authored, but the static
// scanner correctly flags any dynamic indexing with untrusted-looking keys.
const FORBIDDEN_KEY_SEGMENTS = new Set(["__proto__", "prototype", "constructor"]);

function lookupPath(obj, dotPath) {
  const parts = dotPath.split(".");
  let cur = obj;
  for (const part of parts) {
    if (!isPlainObject(cur)) return undefined;
    if (FORBIDDEN_KEY_SEGMENTS.has(part)) return undefined;
    if (!Object.prototype.hasOwnProperty.call(cur, part)) return undefined;
    // Use Map-like get via Object.entries to avoid dynamic bracket access
    // patterns the static analyzer warns about. We already validated the key
    // exists as an own property above.
    const entry = Object.entries(cur).find(([k]) => k === part);
    cur = entry ? entry[1] : undefined;
  }
  return cur;
}

function pad(str, width) {
  const s = String(str);
  return s.length >= width ? s : s + " ".repeat(width - s.length);
}
function padLeft(str, width) {
  const s = String(str);
  return s.length >= width ? s : " ".repeat(width - s.length) + s;
}

async function main() {
  const opts = parseArgs(process.argv);

  const sourcePath = path.join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`);
  if (!existsSync(sourcePath)) {
    throw new Error(`Source messages file not found: ${sourcePath}`);
  }
  const source = await loadJson(sourcePath);
  const enPaths = collectLeafPaths(source);
  const totalEn = enPaths.length;

  // Locale set: every <code>.json on disk except en, intersected with config.
  let configCodes = null;
  if (existsSync(CONFIG_PATH)) {
    try {
      const cfg = JSON.parse(await fs.readFile(CONFIG_PATH, "utf8"));
      if (Array.isArray(cfg.locales)) {
        configCodes = new Set(cfg.locales.map((l) => l.code));
      }
    } catch {
      /* ignore — fall back to disk listing only */
    }
  }
  const onDisk = (await fs.readdir(MESSAGES_DIR))
    .filter((f) => f.endsWith(".json") && f !== `${SOURCE_LOCALE}.json`)
    .map((f) => f.slice(0, -5))
    .filter((code) => (configCodes ? configCodes.has(code) : true))
    .sort();

  const results = [];
  for (const locale of onDisk) {
    const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
    let target;
    try {
      target = await loadJson(localePath);
    } catch (err) {
      logWarn(`${locale}: failed to parse JSON (${err.message})`);
      results.push({
        locale,
        total_en: totalEn,
        present: 0,
        missing: totalEn,
        placeholder: 0,
        coverage: 0,
      });
      continue;
    }

    let present = 0;
    let missing = 0;
    let placeholder = 0;
    for (const dotPath of enPaths) {
      const value = lookupPath(target, dotPath);
      if (value === undefined) {
        missing++;
        continue;
      }
      // Treat plain objects at scalar positions as missing — shape mismatch.
      if (isPlainObject(value)) {
        missing++;
        continue;
      }
      present++;
      if (typeof value === "string" && value.startsWith(PLACEHOLDER_PREFIX)) {
        placeholder++;
      }
    }
    const real = present - placeholder;
    const coverage = totalEn === 0 ? 100 : (real / totalEn) * 100;
    results.push({ locale, total_en: totalEn, present, missing, placeholder, coverage });
  }

  const failures = results.filter((r) => r.coverage < opts.threshold);

  if (opts.json) {
    process.stdout.write(
      JSON.stringify(
        {
          source: SOURCE_LOCALE,
          totalKeys: totalEn,
          threshold: opts.threshold,
          ok: failures.length === 0,
          results,
        },
        null,
        2
      ) + "\n"
    );
    if (failures.length && !opts.report) process.exit(1);
    return;
  }

  // Human-readable output (table).
  const localeW = Math.max(8, ...results.map((r) => r.locale.length));
  const header =
    pad("locale", localeW) +
    "  " +
    padLeft("coverage", 10) +
    "  " +
    padLeft("real", 6) +
    "  " +
    padLeft("present", 7) +
    "  " +
    padLeft("missing", 7) +
    "  " +
    padLeft("placeholder", 11) +
    "  " +
    padLeft("total_en", 8);
  console.log(header);
  console.log("-".repeat(header.length));
  for (const r of results) {
    const real = r.present - r.placeholder;
    const pct = `${r.coverage.toFixed(1)}%`;
    const marker = r.coverage < opts.threshold ? " ✗" : "";
    console.log(
      pad(r.locale, localeW) +
        "  " +
        padLeft(pct, 10) +
        "  " +
        padLeft(real, 6) +
        "  " +
        padLeft(r.present, 7) +
        "  " +
        padLeft(r.missing, 7) +
        "  " +
        padLeft(r.placeholder, 11) +
        "  " +
        padLeft(r.total_en, 8) +
        marker
    );
  }

  if (failures.length) {
    if (opts.report) {
      logInfo(
        `${failures.length} locale(s) below threshold ${opts.threshold}% — report mode, exiting 0.`
      );
    } else {
      logInfo(`FAIL — ${failures.length} locale(s) below threshold ${opts.threshold}%.`);
      for (const f of failures) {
        console.log(`  - ${f.locale}: ${f.coverage.toFixed(1)}%`);
      }
      process.exit(1);
    }
  } else {
    logInfo(`PASS — all ${results.length} locale(s) at or above ${opts.threshold}% coverage.`);
  }
}

const isDirectRun = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((err) => {
    console.error("[i18n-ui-coverage] ERROR", err?.stack || err?.message || String(err));
    process.exit(1);
  });
}
