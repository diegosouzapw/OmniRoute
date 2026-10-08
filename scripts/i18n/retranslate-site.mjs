#!/usr/bin/env node
/**
 * OmniRoute — site catalog retranslator (omnirouteSite/lang/<code>.json).
 *
 * The site catalogs are flat { "dotted.key": "text" } files translated once by
 * add-locale; 10 % of their leaves were still verbatim English on 2026-09-16
 * (th 25 %). For every locale, the leaves equal to lang/_source.en.json —
 * outside untranslatable-site-keys.json — are sent to the translation backend
 * in batches and written back in place (key order preserved). Same backend
 * env as sync-ui-keys (`OMNIROUTE_TRANSLATION_*`, loaded from the repo-root
 * `.env` when present).
 *
 * A batch whose answer cannot be trusted (see `parseBatchResponse`) is retried
 * one string at a time; a leaf that still fails keeps its English value so the
 * next run picks it up again. Each catalog is written as soon as its locale is
 * done, so an aborted run keeps the locales already finished.
 *
 * Usage:
 *   node scripts/i18n/retranslate-site.mjs --site-dir=../omnirouteSite \
 *     [--locale=th,phi] [--dry-run] [--batch-size=40]
 */
import { existsSync, readFileSync } from "node:fs";
import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { backendConfig, translateBatch, translateString } from "./lib/translate-backend.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const ALLOWLIST = path.join(SCRIPT_DIR, "untranslatable-site-keys.json");
const LOG_PREFIX = "[site-retranslate]";

// ----- .env loader --------------------------------------------------------
// Same loader as sync-ui-keys.mjs: variables from the repo-root `.env`
// (gitignored) land in process.env unless the shell already set them.
function loadDotEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!existsSync(envPath)) return;
  try {
    const raw = readFileSync(envPath, "utf8");
    for (const rawLine of raw.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#")) continue;
      const eq = line.indexOf("=");
      if (eq <= 0) continue;
      const key = line.slice(0, eq).trim();
      if (!key || process.env[key] !== undefined) continue;
      let value = line.slice(eq + 1);
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch {
    /* ignore — backendConfig() reports the missing variables */
  }
}

/**
 * Keys of `source` whose `target` value is still the verbatim English string,
 * outside `allow`. Missing target keys are not "identical copies" (that is a
 * sync problem, not a translation one); empty and non-string source leaves are
 * skipped. Sorted so the batches are deterministic.
 *
 * @param {Record<string, string>} source  lang/_source.en.json
 * @param {Record<string, string>} target  lang/<code>.json
 * @param {Set<string>} allow              keys that must stay English
 * @returns {string[]}
 */
export function findSiteIdenticalKeys(source, target, allow) {
  return Object.keys(source)
    .filter(
      (k) =>
        k in target &&
        typeof source[k] === "string" &&
        source[k] !== "" &&
        target[k] === source[k] &&
        !allow.has(k)
    )
    .sort();
}

function parseArgs(argv) {
  const o = { siteDir: null, locales: null, dryRun: false, batchSize: 40 };
  for (const a of argv.slice(2)) {
    if (a.startsWith("--site-dir=")) o.siteDir = path.resolve(ROOT, a.slice("--site-dir=".length));
    else if (a.startsWith("--locale="))
      o.locales = a
        .slice("--locale=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else if (a === "--dry-run") o.dryRun = true;
    else if (a.startsWith("--batch-size="))
      o.batchSize = Math.max(1, Number(a.slice("--batch-size=".length)) || 40);
    else throw new Error(`unknown argument: ${a}`);
  }
  if (!o.siteDir) throw new Error("--site-dir=<omnirouteSite checkout> is required");
  return o;
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

/**
 * Translates `keys` of `source` for one locale, writing into `target` in place.
 * Returns { translated, failed } counts.
 */
async function translateLocale(keys, source, target, localeEntry, backend, batchSize) {
  let translated = 0;
  let failed = 0;
  for (let i = 0; i < keys.length; i += batchSize) {
    const slice = keys.slice(i, i + batchSize);
    try {
      const out = await translateBatch(
        slice.map((id) => ({ id, text: source[id] })),
        localeEntry,
        backend
      );
      for (const id of slice) {
        const value = out.get(id);
        if (typeof value === "string" && value.trim()) {
          target[id] = value.trim();
          translated++;
        } else {
          failed++;
        }
      }
    } catch (err) {
      console.warn(
        `${LOG_PREFIX} ${localeEntry.code}: batch of ${slice.length} failed (${err.message}) — retrying one by one`
      );
      for (const id of slice) {
        try {
          const value = await translateString(source[id], localeEntry, backend);
          if (typeof value === "string" && value.trim()) {
            target[id] = value.trim();
            translated++;
          } else {
            failed++;
          }
        } catch (inner) {
          failed++;
          console.warn(`${LOG_PREFIX} ${localeEntry.code}: ${id} failed (${inner.message})`);
        }
      }
    }
  }
  return { translated, failed };
}

async function main() {
  const o = parseArgs(process.argv);
  if (!o.dryRun) loadDotEnv();
  const langDir = path.join(o.siteDir, "lang");
  const source = await readJson(path.join(langDir, "_source.en.json"));
  const allow = new Set((await readJson(ALLOWLIST)).keys ?? []);
  const config = await readJson(path.join(ROOT, "config", "i18n.json"));
  const codes = (o.locales ?? config.locales.map((l) => l.code)).filter((c) => c !== "en");
  const backend = o.dryRun ? null : backendConfig();
  let total = 0;
  let failedTotal = 0;
  for (const code of codes) {
    const file = path.join(langDir, `${code}.json`);
    const localeEntry = config.locales.find((l) => l.code === code);
    if (!localeEntry) {
      console.warn(`${LOG_PREFIX} ${code}: not in config/i18n.json, skipped`);
      continue;
    }
    let target;
    try {
      target = await readJson(file);
    } catch {
      console.warn(`${LOG_PREFIX} ${code}: no catalog, skipped`);
      continue;
    }
    const keys = findSiteIdenticalKeys(source, target, allow);
    console.log(
      `${LOG_PREFIX} ${code}: ${keys.length} English leaves${o.dryRun ? " (dry-run)" : ""}`
    );
    if (o.dryRun || keys.length === 0) continue;
    const { translated, failed } = await translateLocale(
      keys,
      source,
      target,
      localeEntry,
      backend,
      o.batchSize
    );
    total += translated;
    failedTotal += failed;
    if (translated > 0) await fs.writeFile(file, JSON.stringify(target, null, 2) + "\n", "utf8");
    if (failed > 0) console.warn(`${LOG_PREFIX} ${code}: ${failed} leaves still English`);
  }
  console.log(
    `${LOG_PREFIX} done — ${total} leaves rewritten across ${codes.length} locales` +
      (failedTotal > 0 ? ` (${failedTotal} failed)` : "")
  );
  if (failedTotal > 0) process.exitCode = 1;
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((e) => {
    console.error(`${LOG_PREFIX} ${e.message}`);
    process.exitCode = 1;
  });
}
