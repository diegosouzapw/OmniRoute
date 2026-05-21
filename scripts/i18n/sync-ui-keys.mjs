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
 *
 * --translate-markers calls the OmniRoute translation backend (same env vars
 * as `run-translation.mjs`) and replaces every `__MISSING__:<en>` placeholder
 * with a translated string. Missing env vars cause the script to fail
 * fast — the markers stay in place for a later run.
 *
 * Output examples:
 *   [i18n-ui-sync] pt-BR: +589 missing keys (589 __MISSING__, 0 translated)
 *   [i18n-ui-sync] pt-BR: +0 missing keys (already in sync)
 */

import { promises as fs, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

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
const MESSAGES_DIR = path.join(ROOT, "src", "i18n", "messages");
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

function parseArgs(argv) {
  const opts = {
    locales: null,
    dryRun: false,
    translateMarkers: false,
    concurrency: null,
  };
  for (const arg of argv.slice(2)) {
    if (arg === "--dry-run" || arg === "--dryrun") opts.dryRun = true;
    else if (arg === "--translate-markers") opts.translateMarkers = true;
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
    } else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/i18n/sync-ui-keys.mjs [options]",
          "",
          "  --locale=<csv>          Target locales (default: all except `en`)",
          "  --dry-run               Report what would change, write nothing",
          "  --translate-markers     Call the translation backend to translate every",
          "                          __MISSING__:<en> placeholder",
          "  --concurrency=<n>       Parallel translation requests (default: env or 4)",
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
function mergeMissing(source, target) {
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
        // Read the property via Object.entries instead of dynamic bracket
        // access to keep static analyzers happy.
        const entry = Object.entries(tgtNode).find(([k]) => k === key);
        tgtChild = entry ? entry[1] : undefined;
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

// ----- Translator backend (mirrors run-translation.mjs) --------------------

function requireEnv(name) {
  const v = process.env[name];
  if (!v || !v.trim()) {
    throw new Error(
      `Missing required env var: ${name}. Set it in .env (see docs/guides/I18N.md → "Translation pipeline").`
    );
  }
  return v.trim();
}

function backendConfig() {
  const apiUrl = requireEnv("OMNIROUTE_TRANSLATION_API_URL").replace(/\/$/, "");
  const apiKey = requireEnv("OMNIROUTE_TRANSLATION_API_KEY");
  const model = requireEnv("OMNIROUTE_TRANSLATION_MODEL");
  const timeoutMs = Number(process.env.OMNIROUTE_TRANSLATION_TIMEOUT_MS || 60000);
  return { apiUrl, apiKey, model, timeoutMs };
}

async function callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry = 0) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(`${apiUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.15,
        stream: false,
      }),
      signal: ctrl.signal,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      const transient = res.status === 408 || res.status === 429 || res.status >= 500;
      if (transient && retry < 1) {
        const wait = 1500 + retry * 1500;
        logWarn(`upstream ${res.status} — retrying after ${wait}ms`);
        await new Promise((r) => setTimeout(r, wait));
        return callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry + 1);
      }
      throw new Error(`upstream ${res.status}: ${text.slice(0, 200)}`);
    }
    const json = await res.json();
    const content = json?.choices?.[0]?.message?.content;
    if (typeof content !== "string" || !content) {
      throw new Error("upstream returned empty content");
    }
    return content;
  } catch (err) {
    if (err?.name === "AbortError") {
      if (retry < 1) {
        logWarn(`timeout after ${timeoutMs}ms — retrying`);
        return callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry + 1);
      }
      throw new Error(`timeout after ${timeoutMs}ms`);
    }
    if (
      retry < 1 &&
      err instanceof TypeError &&
      /fetch failed|ECONN|ENOTFOUND|network/i.test(String(err.cause ?? err.message))
    ) {
      logWarn(`network error: ${err.message} — retrying`);
      await new Promise((r) => setTimeout(r, 1500));
      return callChat(messages, { apiUrl, apiKey, model, timeoutMs }, retry + 1);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// Simple promise-based semaphore (avoid runtime deps).
function createLimiter(max) {
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

const TRANSLATION_SYSTEM = (englishName, native) =>
  [
    `You are a professional translator for technical software UI strings.`,
    `Translate the user's English UI string into ${englishName} (native: ${native}).`,
    `Return ONLY the translated string — no quotes, no commentary, no surrounding markdown.`,
    `Preserve placeholders such as {name}, {{count}}, %s, %d, and any HTML tags exactly.`,
    `Do NOT translate command names (npm/git/curl/etc), code identifiers, URLs, or environment variable names.`,
    `Keep the same casing style (Title Case stays Title Case, sentence case stays sentence case).`,
    `Keep punctuation and trailing whitespace identical to the source.`,
  ].join(" ");

async function translateString(englishValue, localeEntry, backend) {
  const englishName = localeEntry.english ?? localeEntry.name;
  const native = localeEntry.native ?? localeEntry.name;
  const messages = [
    { role: "system", content: TRANSLATION_SYSTEM(englishName, native) },
    { role: "user", content: englishValue },
  ];
  const out = await callChat(messages, backend);
  return out.trim();
}

/**
 * Walks a merged tree, finding every leaf that starts with PLACEHOLDER_PREFIX
 * and replacing it with the translation produced by the backend.
 *
 * Translations happen with bounded concurrency. On failure, the placeholder
 * is preserved so a later run can retry.
 */
async function translatePlaceholders(merged, localeEntry, backend, concurrency) {
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
  let translated = 0;
  let failed = 0;
  await Promise.all(
    tasks.map((task) =>
      limit(async () => {
        try {
          const value = await translateString(task.englishValue, localeEntry, backend);
          task.parent[task.key] = value;
          translated++;
        } catch (err) {
          // Keep the __MISSING__ marker so subsequent runs can retry.
          failed++;
          logWarn(`translation failed for ${localeEntry.code}: ${err.message}`);
        }
      })
    )
  );
  return { translated, failed };
}

// ----- Main ----------------------------------------------------------------

async function processLocale(locale, source, config, opts, backend) {
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
  const placeholderCountBefore = countPlaceholders(merged);

  let translateStats = { translated: 0, failed: 0 };
  if (opts.translateMarkers && placeholderCountBefore > 0 && backend) {
    const localeEntry = config.locales.find((l) => l.code === locale);
    if (!localeEntry) {
      logWarn(`${locale}: not present in config/i18n.json — skipping translation`);
    } else {
      const concurrency =
        opts.concurrency ?? Number(process.env.OMNIROUTE_TRANSLATION_CONCURRENCY || 4);
      translateStats = await translatePlaceholders(merged, localeEntry, backend, concurrency);
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
    logInfo(
      `backend: ${backend.apiUrl} (model=${backend.model}, concurrency=${backend.concurrency}, timeout=${backend.timeoutMs}ms)`
    );
  }

  const startMs = Date.now();
  let totalAdded = 0;
  let totalTranslated = 0;
  for (const locale of targetLocales) {
    const result = await processLocale(locale, source, config, opts, backend);
    totalAdded += result.addedPaths.length;
    totalTranslated += result.translated;
  }
  const elapsedSec = ((Date.now() - startMs) / 1000).toFixed(1);
  logInfo(
    `summary: locales=${targetLocales.length}, added=${totalAdded}, translated=${totalTranslated}, elapsed=${elapsedSec}s`
  );
}

const isDirectRun = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((err) => {
    logError(err?.stack || err?.message || String(err));
    process.exit(1);
  });
}
