#!/usr/bin/env node
/**
 * OmniRoute — UI i18n key sync (next-intl message catalogs).
 *
 * Source of truth: `src/i18n/messages/en.json`. Every other locale JSON in
 * `src/i18n/messages/` should mirror the same key tree. This script replicates
 * any keys that are missing in a target locale, marking them with a
 * `__MISSING__:<english_value>` sentinel so reviewers (and the optional LLM
 * pass below) can spot them. It never overwrites an existing translated value.
 *
 * Usage (driven by npm scripts in package.json):
 *   npm run i18n:sync-ui
 *   npm run i18n:sync-ui -- --locale=pt-BR,zh-CN
 *   npm run i18n:sync-ui -- --dry-run
 *   npm run i18n:sync-ui -- --translate-markers
 *   npm run i18n:sync-ui -- --translate-markers --locale=pt-BR --concurrency=4
 *   npm run i18n:sync-ui -- --translate-markers --batch-size=40
 *
 * --translate-markers calls the OmniRoute translation backend (same env vars
 * as `run-translation.mjs`; the client lives in `lib/translate-backend.mjs`)
 * and replaces every `__MISSING__:<en>` placeholder with a translated string.
 * Missing env vars cause the script to fail fast — the markers stay in place
 * for a later run.
 *
 * --batch-size=N (default 1) translates up to N placeholders per request as
 * one JSON object instead of one request per string. A batch whose response
 * cannot be parsed (or whose upstream call fails) is retried string by
 * string, so the worst case degrades to the default per-string behaviour.
 *
 * Output examples:
 *   [i18n-ui-sync] pt-BR: +589 missing keys (589 __MISSING__, 0 translated)
 *   [i18n-ui-sync] pt-BR: +0 missing keys (already in sync)
 */

import { promises as fs, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

import {
  backendConfig,
  translateBatch,
  translateMultiLocaleBatch,
  translateString,
} from "./lib/translate-backend.mjs";

// ----- .env loader --------------------------------------------------------
// Loads variables from a local `.env` (gitignored) into process.env without
// pulling dotenv as a dependency. Already-set env vars take precedence so the
// shell / CI environment can still override.
(function loadDotEnv() {
  const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", ".env");
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
    /* ignore — script will fall back to the requireEnv error path */
  }
})();

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const CONFIG_PATH = path.join(ROOT, "config", "i18n.json");

const CATALOGS = {
  ui: {
    name: "ui",
    dir: path.join(ROOT, "src", "i18n", "messages"),
    allowlistPath: path.join(SCRIPT_DIR, "untranslatable-keys.json"),
  },
  cli: {
    name: "cli",
    dir: path.join(ROOT, "bin", "cli", "locales"),
    allowlistPath: path.join(SCRIPT_DIR, "untranslatable-cli-keys.json"),
  },
};

/** Which flat-JSON catalog family a run targets: the dashboard (`ui`) or the CLI (`cli`). */
export function resolveCatalog(name = "ui") {
  const catalog = CATALOGS[name];
  if (!catalog) throw new Error(`unknown catalog "${name}" (expected ui or cli)`);
  return catalog;
}

let MESSAGES_DIR = CATALOGS.ui.dir; // reassigned in main() from --catalog
const SOURCE_LOCALE = "en";
const PLACEHOLDER_PREFIX = "__MISSING__:";

// ----- Helpers -------------------------------------------------------------

function logInfo(...parts) {
  console.log("[i18n-ui-sync]", ...parts);
}
function logWarn(...parts) {
  console.warn("[i18n-ui-sync] WARN", ...parts);
}
function logError(...parts) {
  console.error("[i18n-ui-sync] ERROR", ...parts);
}

export function parseArgs(argv) {
  const opts = {
    locales: null,
    dryRun: false,
    translateMarkers: false,
    retranslateIdentical: false,
    concurrency: null,
    batchSize: 1,
    localesPerRequest: 1,
    catalog: "ui",
  };
  for (const arg of argv.slice(2)) {
    if (arg === "--dry-run" || arg === "--dryrun") opts.dryRun = true;
    else if (arg === "--translate-markers") opts.translateMarkers = true;
    else if (arg === "--retranslate-identical") opts.retranslateIdentical = true;
    else if (arg.startsWith("--catalog=")) opts.catalog = arg.slice(10).trim();
    else if (arg.startsWith("--locale=")) {
      opts.locales = arg
        .slice(9)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (arg.startsWith("--locales=")) {
      opts.locales = arg
        .slice(10)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (arg.startsWith("--concurrency=")) {
      opts.concurrency = Number(arg.slice(14));
    } else if (arg.startsWith("--batch-size=")) {
      // Whole numbers only: a fractional size would make the slice windows
      // overlap; NaN / 0 / negatives mean "per-string" (1).
      opts.batchSize = Math.max(1, Math.floor(Number(arg.slice(13))) || 1);
    } else if (arg.startsWith("--locales-per-request=")) {
      // How many locales one translation request covers. Whole numbers only;
      // NaN / 0 / negatives mean "one locale per request" (1, the default).
      opts.localesPerRequest = Math.max(1, Math.floor(Number(arg.slice(22))) || 1);
    } else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/i18n/sync-ui-keys.mjs [options]",
          "",
          "  --locale=<csv>          Target locales (default: all except `en`)",
          "  --catalog=ui|cli        Catalog family (default ui = src/i18n/messages; cli = bin/cli/locales)",
          "  --retranslate-identical Flag leaves still identical to English (outside",
          "                          untranslatable-keys.json) as __MISSING__ so they get",
          "                          retranslated — only meaningful with --translate-markers",
          "  --dry-run               Report what would change, write nothing",
          "  --translate-markers     Call the translation backend to translate every",
          "                          __MISSING__:<en> placeholder",
          "  --concurrency=<n>       Parallel translation requests (default: env or 4)",
          "  --batch-size=<n>        Placeholders per translation request (default: 1).",
          "                          n>1 sends up to n strings as one JSON object; a batch",
          "                          that fails or cannot be parsed falls back to one-by-one",
          "  --locales-per-request=<n> Locales per translation request (default: 1).",
          "                          n>1 translates up to n locales per request, one JSON",
          "                          object per locale per line; a locale whose line cannot",
          "                          be parsed falls back to one locale at a time",
        ].join("\n")
      );
      process.exit(0);
    }
  }
  return opts;
}

async function loadConfig() {
  const raw = await fs.readFile(CONFIG_PATH, "utf8");
  const cfg = JSON.parse(raw);
  if (!cfg.default || !Array.isArray(cfg.locales)) {
    throw new Error("config/i18n.json: invalid shape (need `default` and `locales[]`)");
  }
  return cfg;
}

async function loadJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

/**
 * PR-4 of the locale expansion: a leaf whose value is byte-identical to the English source is
 * an untranslated copy unless `untranslatable-keys.json` says otherwise. Swap each one for a
 * `__MISSING__:<en>` placeholder so `translatePlaceholders` picks it up, and return how many
 * were flagged. Existing placeholders, real translations, empty strings and shape mismatches
 * are left untouched. Mutates `merged` in place.
 */
export function markIdenticalAsMissing(merged, source, untranslatable, prefix = "") {
  let count = 0;
  for (const [key, sourceValue] of Object.entries(source)) {
    if (FORBIDDEN_KEYS.has(key)) continue;
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const targetValue = merged[key];
    if (isPlainObject(sourceValue) && isPlainObject(targetValue)) {
      count += markIdenticalAsMissing(targetValue, sourceValue, untranslatable, fullKey);
    } else if (
      typeof sourceValue === "string" &&
      sourceValue !== "" &&
      targetValue === sourceValue &&
      !untranslatable.has(fullKey)
    ) {
      merged[key] = `${PLACEHOLDER_PREFIX}${sourceValue}`;
      count += 1;
    }
  }
  return count;
}

// Defensive: reject any key that could traverse into the object prototype
// chain when we copy/merge values across JSON trees. Our inputs are
// authored JSON we already control, but excluding these keys is a cheap
// safety net.
const FORBIDDEN_KEYS = new Set(["__proto__", "prototype", "constructor"]);

/**
 * Walks the source tree key-by-key. For each leaf in `source` that is not
 * present in `target` (or whose corresponding target path is an object when
 * source is a leaf, etc.), copies the source value into a new merged object,
 * prefixing scalar values with PLACEHOLDER_PREFIX. Existing translated keys
 * are preserved verbatim.
 *
 * Returns a tuple: { merged, addedPaths } so the caller can report the
 * additions and (optionally) translate them.
 */
export function mergeMissing(source, target) {
  const addedPaths = [];

  function walk(srcNode, tgtNode, prefix) {
    if (!isPlainObject(srcNode)) {
      // Source is a leaf. If target is missing or shape-mismatched, insert.
      if (tgtNode === undefined) {
        addedPaths.push(prefix);
        return typeof srcNode === "string" ? `${PLACEHOLDER_PREFIX}${srcNode}` : srcNode;
      }
      // Existing value (even if string starts with placeholder) is kept.
      return tgtNode;
    }

    // Source is an object — produce a prototype-less object preserving source
    // key order. Using Object.create(null) guarantees no inherited keys can
    // leak through later lookups, and we skip any key that resolves to a
    // built-in prototype property name as a defense in depth.
    const out = Object.create(null);
    for (const [key, value] of Object.entries(srcNode)) {
      if (FORBIDDEN_KEYS.has(key)) continue;
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      let tgtChild;
      if (isPlainObject(tgtNode) && Object.prototype.hasOwnProperty.call(tgtNode, key)) {
        tgtChild = tgtNode[key];
      }
      out[key] = walk(value, tgtChild, nextPrefix);
    }
    return out;
  }

  const merged = walk(source, target, "");
  return { merged, addedPaths };
}

function countPlaceholders(node) {
  if (typeof node === "string") return node.startsWith(PLACEHOLDER_PREFIX) ? 1 : 0;
  if (!isPlainObject(node)) return 0;
  let total = 0;
  for (const value of Object.values(node)) total += countPlaceholders(value);
  return total;
}

// ----- Translator backend --------------------------------------------------
// The chat-completions client (`backendConfig`, `translateString`,
// `translateBatch`) lives in `./lib/translate-backend.mjs` so the other i18n
// tooling can share it. Only the concurrency limiter stays here.

// Simple promise-based semaphore (avoid runtime deps).
export function createLimiter(max) {
  let active = 0;
  const queue = [];
  const next = () => {
    if (!queue.length || active >= max) return;
    active++;
    const { fn, resolve, reject } = queue.shift();
    fn()
      .then((v) => {
        active--;
        resolve(v);
        next();
      })
      .catch((err) => {
        active--;
        reject(err);
        next();
      });
  };
  return (fn) =>
    new Promise((resolve, reject) => {
      queue.push({ fn, resolve, reject });
      next();
    });
}

/**
 * Slices locale codes into consecutive groups of up to `size` codes, keeping
 * the input order (config / on-disk order). An empty input emits no chunk.
 */
export function chunkLocales(codes, size) {
  const n = Math.max(1, Math.floor(Number(size) || 1));
  const chunks = [];
  for (let i = 0; i < codes.length; i += n) chunks.push(codes.slice(i, i + n));
  return chunks;
}

function stripPlaceholder(value) {
  return typeof value === "string" && value.startsWith(PLACEHOLDER_PREFIX)
    ? value.slice(PLACEHOLDER_PREFIX.length)
    : value;
}

/**
 * Unions the placeholder maps of one locale chunk into translation tasks.
 * `placeholdersByLocale` maps each locale code to its `path → english` map
 * (walked from that locale's merged tree, same order as `translatePlaceholders`
 * uses). Tasks keep first-seen walk order, extras appended in encounter order,
 * and each task names the locales that carry the path.
 *
 * A path whose English source diverges across the chunk is excluded from the
 * multi-locale request and reported in `divergent` (same path with a
 * different source text per locale cannot share one request); the caller
 * translates those one locale at a time.
 *
 * @returns {{ tasks: Array<{ path: string, en: string, locales: string[] }>, divergent: Array<{ path: string, perLocale: Map<string, string> }> }}
 */
export function collectChunkTasks(placeholdersByLocale, { splitDivergent = false } = {}) {
  const order = [];
  const seen = new Map();
  for (const [code, byPath] of placeholdersByLocale) {
    for (const [path, rawEn] of byPath) {
      const en = stripPlaceholder(rawEn);
      if (!seen.has(path)) {
        seen.set(path, { en, locales: [code], perLocale: new Map([[code, en]]) });
        order.push(path);
      } else {
        const entry = seen.get(path);
        entry.perLocale.set(code, en);
        if (entry.en === en) {
          if (!entry.locales.includes(code)) entry.locales.push(code);
        } else if (!splitDivergent) {
          if (!entry.locales.includes(code)) entry.locales.push(code);
        }
      }
    }
  }
  const tasks = [];
  const divergent = [];
  for (const path of order) {
    const entry = seen.get(path);
    const distinct = new Set(entry.perLocale.values());
    if (splitDivergent && distinct.size > 1) {
      divergent.push({ path, perLocale: entry.perLocale });
    } else {
      tasks.push({ path, en: entry.en, locales: entry.locales });
    }
  }
  return { tasks, divergent };
}

/**
 * Walks a merged tree, finding every leaf that starts with PLACEHOLDER_PREFIX
 * and replacing it with the translation produced by the backend.
 *
 * Translations happen with bounded concurrency. On failure, the placeholder
 * is preserved so a later run can retry.
 *
 * With `batchSize > 1` the placeholders are grouped into requests of up to
 * `batchSize` strings (one JSON object per request). A batch whose response
 * cannot be parsed — or whose upstream call fails — is retried one string at
 * a time, so a bad batch never loses more than the per-string path would.
 */
export function collectPlaceholderPaths(merged) {
  const paths = [];
  function walk(node, prefix) {
    if (typeof node === "string") {
      if (node.startsWith(PLACEHOLDER_PREFIX)) paths.push(prefix);
      return;
    }
    if (!isPlainObject(node)) return;
    for (const [key, value] of Object.entries(node)) {
      walk(value, prefix ? `${prefix}.${key}` : key);
    }
  }
  walk(merged, "");
  return paths;
}

function getByPath(root, dotted) {
  return dotted
    .split(".")
    .reduce((node, key) => (isPlainObject(node) ? node[key] : undefined), root);
}

function setByPath(root, dotted, value) {
  const keys = dotted.split(".");
  let node = root;
  for (let i = 0; i < keys.length - 1; i++) node = node[keys[i]];
  node[keys[keys.length - 1]] = value;
}

async function translatePlaceholders(merged, localeEntry, backend, concurrency, batchSize = 1) {
  return translatePlaceholdersExport(merged, localeEntry, backend, concurrency, batchSize);
}

export async function translatePlaceholdersExport(
  merged,
  localeEntry,
  backend,
  concurrency,
  batchSize = 1
) {
  const tasks = [];
  function collect(node, parent, key) {
    if (typeof node === "string") {
      if (node.startsWith(PLACEHOLDER_PREFIX)) {
        const englishValue = node.slice(PLACEHOLDER_PREFIX.length);
        tasks.push({ parent, key, englishValue });
      }
      return;
    }
    if (!isPlainObject(node)) return;
    for (const [k, v] of Object.entries(node)) {
      collect(v, node, k);
    }
  }
  collect(merged, null, null);

  if (tasks.length === 0) return { translated: 0, failed: 0 };

  const limit = createLimiter(concurrency);
  let translatedCount = 0;
  let failed = 0;

  if (batchSize > 1) {
    const groups = [];
    for (let i = 0; i < tasks.length; i += batchSize) groups.push(tasks.slice(i, i + batchSize));
    await Promise.all(
      groups.map((group) =>
        limit(async () => {
          const entries = group.map((task, i) => ({ id: `s${i}`, text: task.englishValue }));
          try {
            const translated = await translateBatch(entries, localeEntry, backend);
            group.forEach((task, i) => {
              task.parent[task.key] = translated.get(`s${i}`);
              translatedCount++;
            });
          } catch (err) {
            logWarn(
              `batch of ${group.length} failed for ${localeEntry.code} (${err.message}) — retrying one by one`
            );
            for (const task of group) {
              try {
                task.parent[task.key] = await translateString(
                  task.englishValue,
                  localeEntry,
                  backend
                );
                translatedCount++;
              } catch (inner) {
                failed++;
                logWarn(`translation failed for ${localeEntry.code}: ${inner.message}`);
              }
            }
          }
        })
      )
    );
    return { translated: translatedCount, failed };
  }

  await Promise.all(
    tasks.map((task) =>
      limit(async () => {
        try {
          const value = await translateString(task.englishValue, localeEntry, backend);
          task.parent[task.key] = value;
          translatedCount++;
        } catch (err) {
          // Keep the __MISSING__ marker so subsequent runs can retry.
          failed++;
          logWarn(`translation failed for ${localeEntry.code}: ${err.message}`);
        }
      })
    )
  );
  return { translated: translatedCount, failed };
}

/**
 * Builds one chunk's translation work without submitting anything: divergent
 * paths are kept aside for the single-locale fallback, convergent paths are
 * sliced into groups of `batchSize` keys sharing one multi-locale request.
 * Pure planning — every network call happens in `runLocaleGroup`, submitted
 * through the shared limiter by `runLocaleChunks` (never nested).
 *
 * @returns {{ divergent: Array<{ path: string, perLocale: Map<string, string> }>, groups: Array<{ entries: Array<{ id: string, text: string }>, codes: string[], tasks: Array<{ path: string, en: string, locales: string[] }> }> }}
 */
export function planLocaleChunk(chunk, ctx) {
  const { mergedByLocale, config, opts } = ctx;
  const batchSize = opts.batchSize ?? 1;
  const byLocale = new Map();
  for (const code of chunk) {
    const merged = mergedByLocale.get(code);
    if (!merged) continue;
    const byPath = new Map();
    for (const p of collectPlaceholderPaths(merged)) {
      byPath.set(p, getByPath(merged, p));
    }
    if (byPath.size > 0) byLocale.set(code, byPath);
  }
  if (byLocale.size === 0) return { divergent: [], groups: [] };
  const known = (code) => config.locales.some((l) => l.code === code);
  const { tasks, divergent } = collectChunkTasks(byLocale, { splitDivergent: true });
  const kept = tasks.filter((task) => task.locales.some(known));
  const groups = [];
  for (let i = 0; i < kept.length; i += batchSize) {
    const slice = kept.slice(i, i + batchSize);
    groups.push({
      entries: slice.map((task) => ({ id: task.path, text: task.en })),
      codes: [...new Set(slice.flatMap((task) => task.locales))].filter(known),
      tasks: slice,
    });
  }
  return { divergent, groups };
}

/**
 * Runs one planned group: one multi-locale request, then the single-locale
 * fallback for every (locale, path) still untranslated. Returns per-locale
 * translated and failed counts so the caller never shares one stats object
 * across locales. Counts successful wrapper calls (`multiRequests` /
 * `singleRequests`) plus locales whose line could not be read
 * (`failedLocales`); the 6-request-vs-66 gateway count stays with the live
 * measurement, which also sees retries inside the chat client.
 */
export async function runLocaleGroup(plan, ctx) {
  const { mergedByLocale, config, backend, counters } = ctx;
  const multi = ctx.multi ?? translateMultiLocaleBatch;
  const singleBatch = ctx.singleBatch ?? translateBatch;
  const singleString = ctx.singleString ?? translateString;
  const perLocale = new Map();
  const failedBy = new Map();
  const bump = (code, n = 1) => perLocale.set(code, (perLocale.get(code) ?? 0) + n);
  const fail = (code, n = 1) => failedBy.set(code, (failedBy.get(code) ?? 0) + n);

  for (const { path: p, perLocale: sources } of plan.divergent ?? []) {
    for (const [code, en] of sources) {
      const localeEntry = config.locales.find((l) => l.code === code);
      if (!localeEntry) {
        logWarn(`${code}: not present in config/i18n.json — skipping translation`);
        failedBy.set(code, (failedBy.get(code) ?? 0) + 1);
        continue;
      }
      try {
        const out = await singleBatch([{ id: "s0", text: en }], localeEntry, backend);
        setByPath(mergedByLocale.get(code), p, out.get("s0"));
        counters.singleRequests++;
        bump(code);
      } catch {
        try {
          const value = await singleString(en, localeEntry, backend);
          setByPath(mergedByLocale.get(code), p, value);
          counters.singleRequests++;
          bump(code);
        } catch (inner) {
          fail(code);
          logWarn(`translation failed for ${code}: ${inner.message}`);
        }
      }
    }
  }

  for (const group of plan.groups ?? []) {
    const localeEntries = group.codes
      .map((code) => config.locales.find((l) => l.code === code))
      .filter(Boolean);
    const missingCodes = group.codes.filter((code) => !config.locales.some((l) => l.code === code));
    for (const code of missingCodes) {
      logWarn(`${code}: not present in config/i18n.json — skipping translation`);
      fail(code, group.tasks.filter((task) => task.locales.includes(code)).length);
    }
    if (localeEntries.length === 0) continue;
    const done = new Set();
    try {
      const out = await multi(group.entries, localeEntries, backend);
      counters.multiRequests++;
      for (const [code, values] of out.perLocale) {
        for (const task of group.tasks) {
          if (!task.locales.includes(code)) continue;
          const value = values.get(task.path);
          if (typeof value === "string") {
            setByPath(mergedByLocale.get(code), task.path, value);
            bump(code);
            done.add(`${code}::${task.path}`);
          }
        }
      }
      for (const code of out.failedLocales ?? []) {
        logWarn(`multi-locale line unreadable for ${code} — retrying one locale at a time`);
        counters.failedLocales++;
      }
      // Locales the answer never mentioned fail the same way.
      const answered = new Set([...out.perLocale.keys(), ...(out.failedLocales ?? [])]);
      for (const entry of localeEntries) {
        if (!answered.has(entry.code)) {
          logWarn(`multi-locale answer missing ${entry.code} — retrying one locale at a time`);
          counters.failedLocales++;
        }
      }
    } catch (err) {
      logWarn(
        `multi-locale batch of ${group.tasks.length} keys x ${localeEntries.length} locales failed (${err.message}) — retrying one locale at a time`
      );
    }
    // Per-locale fallback for every (locale, path) still untranslated.
    const pending = new Map();
    for (const task of group.tasks) {
      for (const entry of localeEntries) {
        if (!task.locales.includes(entry.code)) continue;
        if (done.has(`${entry.code}::${task.path}`)) continue;
        if (!pending.has(entry.code)) pending.set(entry.code, []);
        pending.get(entry.code).push({ task, entry });
      }
    }
    for (const [code, items] of pending) {
      const entry = items[0].entry;
      const batchEntries = items.map(({ task: pendingTask }, i) => ({
        id: `s${i}`,
        text: pendingTask.en,
      }));
      try {
        const out = await singleBatch(batchEntries, entry, backend);
        counters.singleRequests++;
        items.forEach(({ task }, i) => {
          setByPath(mergedByLocale.get(code), task.path, out.get(`s${i}`));
          bump(code);
          done.add(`${code}::${task.path}`);
        });
      } catch {
        for (const { task } of items) {
          try {
            const value = await singleString(task.en, entry, backend);
            counters.singleRequests++;
            setByPath(mergedByLocale.get(code), task.path, value);
            bump(code);
          } catch (inner) {
            fail(code);
            logWarn(`translation failed for ${code}: ${inner.message}`);
          }
        }
      }
    }
  }
  return { perLocale, failedBy };
}

/**
 * Runs every chunk's planned groups through the shared limiter — one limiter
 * hop per group, never nested, so more chunks than slots cannot deadlock.
 * Small helper kept so tests can drive the exact fan-out `main` uses.
 */
export async function runLocaleChunks(plans, ctx) {
  const { limit } = ctx;
  const jobs = [];
  for (const plan of plans) {
    if (plan.divergent.length > 0) {
      jobs.push(limit(() => runLocaleGroup({ divergent: plan.divergent, groups: [] }, ctx)));
    }
    for (const group of plan.groups) {
      jobs.push(limit(() => runLocaleGroup({ divergent: [], groups: [group] }, ctx)));
    }
  }
  return Promise.all(jobs);
}

// ----- Main ----------------------------------------------------------------

async function processLocale(locale, source, config, opts, backend) {
  const { merged, addedPaths } = await loadMergedLocale(locale, source, opts);
  const placeholderCountBefore = countPlaceholders(merged);

  let translateStats = { translated: 0, failed: 0 };
  if (opts.translateMarkers && placeholderCountBefore > 0 && backend) {
    const localeEntry = config.locales.find((l) => l.code === locale);
    if (!localeEntry) {
      logWarn(`${locale}: not present in config/i18n.json — skipping translation`);
    } else {
      const concurrency =
        opts.concurrency ?? Number(process.env.OMNIROUTE_TRANSLATION_CONCURRENCY || 4);
      translateStats = await translatePlaceholders(
        merged,
        localeEntry,
        backend,
        concurrency,
        opts.batchSize
      );
    }
  }

  const placeholderCountAfter = countPlaceholders(merged);
  const totalMissing = addedPaths.length;
  const stillPlaceholder = placeholderCountAfter;

  const summary = `${locale}: +${totalMissing} missing keys (${stillPlaceholder} __MISSING__, ${translateStats.translated} translated${translateStats.failed ? `, ${translateStats.failed} failed` : ""})`;

  if (opts.dryRun) {
    logInfo(`[DRY] ${summary}`);
    return { addedPaths, translated: translateStats.translated };
  }

  // Only write when something changed. (json-stable serialization)
  const before = existsSync(localePath) ? await fs.readFile(localePath, "utf8") : "";
  const after = JSON.stringify(merged, null, 2) + "\n";
  if (before === after) {
    logInfo(`${locale}: already in sync (no changes)`);
    return { addedPaths, translated: translateStats.translated };
  }
  await fs.writeFile(localePath, after, "utf8");
  logInfo(summary);
  return { addedPaths, translated: translateStats.translated };
}

async function main() {
  const opts = parseArgs(process.argv);
  const catalog = resolveCatalog(opts.catalog);
  MESSAGES_DIR = catalog.dir;
  logInfo(`catalog: ${catalog.name} (${path.relative(ROOT, catalog.dir)})`);
  const config = await loadConfig();

  const sourcePath = path.join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`);
  if (!existsSync(sourcePath)) {
    throw new Error(`Source messages file not found: ${sourcePath}`);
  }
  const source = await loadJson(sourcePath);

  // Locales = every code in config except `en`, intersected with locales that
  // already exist on disk (so we never silently create unknown locale files).
  const onDisk = new Set(
    (await fs.readdir(MESSAGES_DIR)).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5))
  );

  let targetLocales = config.locales
    .map((l) => l.code)
    .filter((code) => code !== SOURCE_LOCALE && onDisk.has(code));

  if (opts.locales) {
    const missingFromConfig = opts.locales.filter((c) => !config.locales.some((l) => l.code === c));
    if (missingFromConfig.length) {
      logWarn(`--locale contains codes not in config/i18n.json: ${missingFromConfig.join(", ")}`);
    }
    targetLocales = targetLocales.filter((code) => opts.locales.includes(code));
  }

  logInfo(`source: ${path.relative(ROOT, sourcePath)}`);
  logInfo(`locales: ${targetLocales.length} (${targetLocales.join(", ")})`);
  logInfo(
    `dry-run: ${opts.dryRun ? "yes" : "no"}, translate-markers: ${opts.translateMarkers ? "yes" : "no"}`
  );

  let backend = null;
  if (opts.translateMarkers && !opts.dryRun) {
    backend = backendConfig();
    backend.concurrency =
      opts.concurrency ?? Number(process.env.OMNIROUTE_TRANSLATION_CONCURRENCY || 4);
    const batchInfo = opts.batchSize > 1 ? `, batch=${opts.batchSize}` : "";
    const localesInfo =
      (opts.localesPerRequest ?? 1) > 1 ? `, locales-per-request=${opts.localesPerRequest}` : "";
    logInfo(
      `backend: ${backend.apiUrl} (model=${backend.model}, concurrency=${backend.concurrency}${batchInfo}${localesInfo}, timeout=${backend.timeoutMs}ms)`
    );
  }

  const startMs = Date.now();
  let totalAdded = 0;
  let totalTranslated = 0;
  let multiRequests = 0;
  let singleRequests = 0;
  let failedLocales = 0;
  const localesPerRequest = opts.localesPerRequest ?? 1;
  if (localesPerRequest > 1 && opts.translateMarkers && !opts.dryRun && backend) {
    // Multi-locale path: merge every locale first, fan every planned group
    // out through one shared limiter (one hop per group, never nested),
    // then write each file sequentially in config order (same order and
    // same write rule as the single-locale loop below).
    const mergedByLocale = new Map();
    const addedByLocale = new Map();
    for (const locale of targetLocales) {
      const loaded = await loadMergedLocale(locale, source, opts);
      mergedByLocale.set(locale, loaded.merged);
      addedByLocale.set(locale, loaded.addedPaths);
    }
    const concurrency =
      opts.concurrency ?? Number(process.env.OMNIROUTE_TRANSLATION_CONCURRENCY || 4);
    const limit = createLimiter(concurrency);
    const counters = { multiRequests: 0, singleRequests: 0, failedLocales: 0 };
    const chunkCtx = { config, opts, backend, limit, counters, mergedByLocale };
    const chunks = chunkLocales(targetLocales, localesPerRequest);
    // Per-locale translated counts: groups land on disjoint (locale, path)
    // sets, so increments below never race on one key.
    const translatedByLocale = new Map(targetLocales.map((code) => [code, 0]));
    const failedByLocale = new Map(targetLocales.map((code) => [code, 0]));
    const plans = chunks.map((chunk) => planLocaleChunk(chunk, chunkCtx));
    const results = await runLocaleChunks(plans, chunkCtx);
    for (const stats of results) {
      for (const [code, n] of stats.perLocale) {
        translatedByLocale.set(code, (translatedByLocale.get(code) ?? 0) + n);
      }
      for (const [code, n] of stats.failedBy) {
        failedByLocale.set(code, (failedByLocale.get(code) ?? 0) + n);
      }
    }
    multiRequests = counters.multiRequests;
    singleRequests = counters.singleRequests;
    failedLocales = counters.failedLocales;
    for (const locale of targetLocales) {
      const merged = mergedByLocale.get(locale);
      const addedPaths = addedByLocale.get(locale);
      const stats = {
        translated: translatedByLocale.get(locale) ?? 0,
        failed: failedByLocale.get(locale) ?? 0,
      };
      totalAdded += addedPaths.length;
      totalTranslated += stats.translated;
      await writeLocaleResult(locale, merged, addedPaths, stats, opts);
    }
  } else {
    for (const locale of targetLocales) {
      const result = await processLocale(locale, source, config, opts, backend);
      totalAdded += result.addedPaths.length;
      totalTranslated += result.translated;
    }
  }
  const elapsedSec = ((Date.now() - startMs) / 1000).toFixed(1);
  const requestsInfo =
    localesPerRequest > 1 && multiRequests + singleRequests > 0
      ? `, requests=${multiRequests + singleRequests} (multi=${multiRequests}, single=${singleRequests}${failedLocales ? `, failed-locales=${failedLocales}` : ""})`
      : "";
  logInfo(
    `summary: locales=${targetLocales.length}, added=${totalAdded}, translated=${totalTranslated}${localesPerRequest > 1 ? `, locales-per-request=${localesPerRequest}` : ""}${requestsInfo}, elapsed=${elapsedSec}s`
  );
}

/**
 * Loads one locale file, merges the missing keys and flags identical leaves
 * for retranslation. Shared by the single-locale `processLocale` and the
 * multi-locale fan-out in `main` so both read files the same way.
 */
async function loadMergedLocale(locale, source, opts) {
  const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
  let target = {};
  if (existsSync(localePath)) {
    try {
      target = await loadJson(localePath);
    } catch (err) {
      logWarn(`${locale}: failed to parse existing JSON — starting fresh (${err.message})`);
      target = {};
    }
  } else {
    logWarn(`${locale}: messages file did not exist — creating it`);
  }
  const { merged, addedPaths } = mergeMissing(source, target);
  if (opts.retranslateIdentical && locale !== SOURCE_LOCALE) {
    const allow = new Set((await loadJson(resolveCatalog(opts.catalog).allowlistPath)).keys ?? []);
    const flagged = markIdenticalAsMissing(merged, source, allow);
    logInfo(`${locale}: ${flagged} English leaves flagged for retranslation`);
  }
  return { merged, addedPaths };
}

async function writeLocaleResult(locale, merged, addedPaths, stats, opts) {
  const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const placeholderCountAfter = countPlaceholders(merged);
  const summary = `${locale}: +${addedPaths.length} missing keys (${placeholderCountAfter} __MISSING__, ${stats.translated} translated${stats.failed ? `, ${stats.failed} failed` : ""})`;
  if (opts.dryRun) {
    logInfo(`[DRY] ${summary}`);
    return { addedPaths, translated: stats.translated };
  }
  const before = existsSync(localePath) ? await fs.readFile(localePath, "utf8") : "";
  const after = JSON.stringify(merged, null, 2) + "\n";
  if (before === after) {
    logInfo(`${locale}: already in sync (no changes)`);
    return { addedPaths, translated: stats.translated };
  }
  await fs.writeFile(localePath, after, "utf8");
  logInfo(summary);
  return { addedPaths, translated: stats.translated };
}

const isDirectRun = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((err) => {
    logError(err?.stack || err?.message || String(err));
    process.exit(1);
  });
}
