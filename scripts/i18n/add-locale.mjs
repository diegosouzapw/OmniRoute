#!/usr/bin/env node
/**
 * OmniRoute — add one locale to every surface with a single command.
 *
 *   npm run i18n:add-locale -- --code=el --english=Greek --native=Ελληνικά --flag=🇬🇷 \
 *     [--aliases=el-gr] [--flag-file=gr.svg] [--rtl] [--docs=core|all | --files=<csv>] [--cli-full] \
 *     [--force-cli] [--site-dir=../omnirouteSite] [--batch-size=40] [--only=<phase,…>] \
 *     [--skip=<phase,…>] [--dry-run]
 *
 * Phases, in order. Every phase checks presence first, so re-running the command
 * for an already-added locale is a no-op apart from re-translating whatever is
 * still missing (`__MISSING__` markers, untranslated CLI / site keys):
 *
 *   config   config/i18n.json entry (+ aliases, rtl) — the single source of truth
 *   flag     docs/assets/flags/<cc>.svg from lipis/flag-icons (MIT) when missing
 *   ui       src/i18n/messages/<code>.json — scaffold, then sync-ui-keys --translate-markers;
 *            markers still __MISSING__ afterwards are reported and fail the run (exit 1)
 *   docs     docs/i18n/<code>/** via run-translation — the core set every existing locale
 *            carries (lib/docs-core-set.mjs; --docs=all for the full source set, --files=<csv>
 *            for an explicit list) — then the llm.txt / CHANGELOG.md mirror stubs
 *   cli      bin/cli/locales/<code>.json — generate-locales --code scaffold, then the
 *            common + program sections (--cli-full: every section) translated in batches
 *   readme   README flag link, docs/i18n/README.md row, docs/guides/I18N.md row, and the
 *            locale counts in llm.txt (+ sync-llm-mirrors), docs/README.md and
 *            docs/diagrams/i18n-flow.mmd
 *   bars     sync-language-bars — every 🌐 Languages bar gains the new locale
 *   site     <site-dir>/lang/<code>.json (translated), js/i18n.js SUPPORTED_LANGS and the
 *            language dropdowns (lib/site-scaffold.mjs); node --check on the edited JS
 *
 * A real run ends with Prettier on the touched repo files (never the site checkout).
 * `--dry-run` prints every
 * planned write / command — including the computed docs core set — and touches
 * nothing: no files, no network, no child processes.
 *
 * The translating phases (ui, docs, cli, site) need OMNIROUTE_TRANSLATION_API_URL,
 * _API_KEY and _MODEL (docs/guides/I18N.md → "Translation pipeline"); `.env` is loaded
 * automatically. Child scripts run through execFileSync with an argument array —
 * nothing is ever interpolated into a shell.
 */

import { promises as fs, existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { computeDocsCoreSet, docsLocaleDirs } from "./lib/docs-core-set.mjs";
import { buildMirrorBar } from "./lib/language-bar.mjs";
import {
  bumpCounts,
  buildMirrorStub,
  flagFileFor,
  insertDocsIndexRow,
  insertI18nGuideRow,
  insertLocaleEntry,
  insertReadmeFlagLink,
} from "./lib/locale-scaffold.mjs";
import { addDropdownOption, addSupportedLang } from "./lib/site-scaffold.mjs";
import { backendConfig, translateBatch, translateString } from "./lib/translate-backend.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");

const PHASES = ["config", "flag", "ui", "docs", "cli", "readme", "bars", "site"];
// Phases whose outcome must agree with config/i18n.json ON DISK: the child scripts
// (ui, docs, cli, bars) read the locale list from there, and the readme edits list
// the locale on every surface the parity test checks against the config. For a
// brand-new locale they need the config phase in the same run. readme is guarded in
// dry-run too — its edits are computed in-process, so nothing else would flag the
// inconsistency — while the child-backed phases stay previewable (--only=docs).
const PHASES_REQUIRING_CONFIG_ON_DISK = ["ui", "docs", "cli", "readme", "bars"];
const PHASES_GUARDED_IN_DRY_RUN = ["readme"];
const PHASES_TRANSLATING = ["ui", "docs", "cli", "site"];
const FLAG_CDN = "https://raw.githubusercontent.com/lipis/flag-icons/main/flags/4x3/";
const SITE_PAGES = ["index.html", "why/index.html", "viral/index.html"];
const CLI_DEFAULT_SECTIONS = ["common", "program"];
const MIRROR_STUBS = [
  ["llm.txt", "OmniRoute"],
  ["CHANGELOG.md", "Changelog"],
];
const PLACEHOLDER_PREFIX = "__MISSING__:";
const LOCALE_CODE = /^[a-z]{2,3}(-[A-Z][A-Za-z]{1,3})?$/;
// docs/guides/I18N.md locale table row, capturing the code between backticks.
// Static on purpose: the code is compared as a string, so no CLI value ever
// reaches a RegExp constructor.
const I18N_GUIDE_ROW_RE = /^\| `([^`]+)` +\|/;
const ALIAS = /^[a-z]{2,3}(-[a-z0-9]{2,8})*$/;
const FORBIDDEN_KEYS = new Set(["__proto__", "prototype", "constructor"]);
const DEFAULT_BATCH_SIZE = 40;

const USAGE = `Usage: node scripts/i18n/add-locale.mjs --code=<code> --english=<name> --native=<name> --flag=<emoji> [options]

  --code=<code>         locale code, e.g. el, pt-PT, zh-TW (required)
  --english=<name>      English language name, e.g. Greek (required for a new locale)
  --native=<name>       native language name, e.g. Ελληνικά (required for a new locale)
  --flag=<emoji>        flag emoji, e.g. 🇬🇷 (required for a new locale)
  --aliases=<csv>       browser/OS tags resolving to this locale, e.g. el-gr
  --flag-file=<file>    docs/assets/flags/<file> when it cannot be derived from the emoji
  --rtl                 add the code to config/i18n.json "rtl"
  --docs=core|all       docs to translate: the core set every locale carries (default) or every source
  --files=<csv>         repo-relative English sources to translate instead of the core set (not with --docs=all)
  --cli-full            translate every CLI catalog section (default: common + program)
  --force-cli           retranslate CLI keys that already have a value
  --site-dir=<dir>      omnirouteSite checkout (relative to the repo root or absolute); skipped when absent
  --batch-size=<n>      strings per translation request (default ${DEFAULT_BATCH_SIZE})
  --only=<phase,…>      run only these phases
  --skip=<phase,…>      skip these phases
  --dry-run             print every planned write / command and touch nothing

Phases, in order: ${PHASES.join(", ")}
The translating phases (${PHASES_TRANSLATING.join(", ")}) need OMNIROUTE_TRANSLATION_API_URL / _API_KEY / _MODEL
(docs/guides/I18N.md → "Translation pipeline"); .env is loaded automatically.`;

// ----- .env loader ---------------------------------------------------------
// Same semantics as sync-ui-keys.mjs / run-translation.mjs: variables already
// set in the environment win over the file.
function loadDotEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!existsSync(envPath)) return;
  try {
    for (const rawLine of readFileSync(envPath, "utf8").split(/\r?\n/)) {
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
    /* ignore — backendConfig() reports the missing variable */
  }
}

// ----- CLI -----------------------------------------------------------------

function parsePhaseList(value, flag) {
  const set = new Set(
    value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );
  for (const phase of set) {
    if (!PHASES.includes(phase)) {
      throw new Error(`${flag}: unknown phase "${phase}" (known: ${PHASES.join(", ")})`);
    }
  }
  return set;
}

function parseArgs(argv) {
  const o = {
    code: null,
    english: null,
    native: null,
    flag: null,
    aliases: [],
    flagFile: null,
    rtl: false,
    docs: "core",
    files: null,
    cliFull: false,
    forceCli: false,
    siteDir: null,
    batchSize: DEFAULT_BATCH_SIZE,
    only: null,
    skip: new Set(),
    dryRun: false,
  };
  for (const arg of argv.slice(2)) {
    const eq = arg.indexOf("=");
    const key = eq === -1 ? arg : arg.slice(0, eq);
    const value = eq === -1 ? "" : arg.slice(eq + 1);
    switch (key) {
      case "--help":
      case "-h":
        console.log(USAGE);
        process.exit(0);
        break;
      case "--code":
        o.code = value;
        break;
      case "--english":
        o.english = value;
        break;
      case "--native":
        o.native = value;
        break;
      case "--flag":
        o.flag = value;
        break;
      case "--aliases":
        o.aliases = value
          .split(",")
          .map((s) => s.trim().toLowerCase())
          .filter(Boolean);
        break;
      case "--flag-file":
        o.flagFile = value;
        break;
      case "--rtl":
        o.rtl = true;
        break;
      case "--docs":
        o.docs = value;
        break;
      case "--files":
        o.files = value
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        break;
      case "--cli-full":
        o.cliFull = true;
        break;
      case "--force-cli":
        o.forceCli = true;
        break;
      case "--site-dir":
        o.siteDir = path.resolve(ROOT, value);
        break;
      case "--batch-size":
        // Whole numbers only; NaN / 0 / negatives fall back to the default.
        o.batchSize = Math.max(1, Math.floor(Number(value)) || DEFAULT_BATCH_SIZE);
        break;
      case "--only":
        o.only = parsePhaseList(value, "--only");
        break;
      case "--skip":
        o.skip = parsePhaseList(value, "--skip");
        break;
      case "--dry-run":
        o.dryRun = true;
        break;
      default:
        throw new Error(`unknown argument ${arg}\n\n${USAGE}`);
    }
  }
  if (!o.code) throw new Error(`--code is required\n\n${USAGE}`);
  if (!LOCALE_CODE.test(o.code)) {
    throw new Error(`invalid locale code "${o.code}" (expected e.g. el, pt-PT, zh-TW)`);
  }
  if (!["core", "all"].includes(o.docs)) {
    throw new Error(`--docs must be "core" or "all" (got "${o.docs}")`);
  }
  if (o.files && o.files.length === 0) {
    throw new Error("--files needs at least one repo-relative path");
  }
  if (o.files && o.docs === "all") throw new Error("--files and --docs=all are mutually exclusive");
  for (const alias of o.aliases) {
    if (!ALIAS.test(alias))
      throw new Error(`invalid alias "${alias}" (lower-case BCP-47, e.g. el-gr)`);
  }
  return o;
}

function selectPhases(o) {
  return PHASES.filter((phase) => (!o.only || o.only.has(phase)) && !o.skip.has(phase));
}

// ----- Helpers -------------------------------------------------------------

const log = (...parts) => console.log("[add-locale]", ...parts);
const warn = (...parts) => console.warn("[add-locale] WARN", ...parts);
const dryTag = (ctx) => (ctx.dry ? "[DRY] " : "");

function insideRepo(file) {
  const relative = path.relative(ROOT, file);
  return Boolean(relative) && !relative.startsWith("..") && !path.isAbsolute(relative);
}

/** Repo-relative POSIX path for files inside the repo, absolute otherwise (site files). */
function display(file) {
  return insideRepo(file) ? path.relative(ROOT, file).split(path.sep).join("/") : file;
}

const readText = (file) => fs.readFile(file, "utf8");
const readJson = async (file) => JSON.parse(await readText(file));

async function writeFile(ctx, file, text) {
  log(`${dryTag(ctx)}write ${display(file)}`);
  ctx.touched.add(file);
  if (ctx.dry) return;
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, text, "utf8");
}

function runNode(ctx, script, args = [], note = "") {
  const command = ["node", display(script), ...args].join(" ");
  log(`${dryTag(ctx)}${command}${note ? ` — ${note}` : ""}`);
  if (ctx.dry) return;
  execFileSync(process.execPath, [script, ...args], { cwd: ROOT, stdio: "inherit" });
}

/** `{ id: "a.b.c", text }` for every string leaf of a nested catalog. */
function flattenLeaves(node, prefix = "", out = []) {
  if (typeof node === "string") {
    out.push({ id: prefix, text: node });
  } else if (node && typeof node === "object" && !Array.isArray(node)) {
    for (const [key, value] of Object.entries(node)) {
      if (FORBIDDEN_KEYS.has(key)) continue;
      flattenLeaves(value, prefix ? `${prefix}.${key}` : key, out);
    }
  }
  return out;
}

/** Leaves still carrying the `__MISSING__:` placeholder that sync-ui-keys leaves behind. */
const countMarkers = (leaves) =>
  leaves.filter((leaf) => leaf.text.startsWith(PLACEHOLDER_PREFIX)).length;

function getDeep(node, id) {
  let cursor = node;
  for (const segment of id.split(".")) {
    if (!cursor || typeof cursor !== "object") return undefined;
    cursor = cursor[segment];
  }
  return cursor;
}

function setDeep(node, id, value) {
  const segments = id.split(".");
  if (segments.some((segment) => FORBIDDEN_KEYS.has(segment))) {
    throw new Error(`refusing to write key ${id}`);
  }
  let cursor = node;
  for (const segment of segments.slice(0, -1)) {
    if (!cursor[segment] || typeof cursor[segment] !== "object") cursor[segment] = {};
    cursor = cursor[segment];
  }
  cursor[segments[segments.length - 1]] = value;
}

async function walkFiles(dir, out = []) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) await walkFiles(abs, out);
    else out.push(abs);
  }
  return out;
}

/** Files under docs/ that carry a 🌐 Languages bar — what sync-language-bars rewrites. */
async function countLanguageBarFiles() {
  let count = 0;
  for (const file of await walkFiles(path.join(ROOT, "docs"))) {
    if (!file.endsWith(".md") && path.basename(file) !== "llm.txt") continue;
    const text = await readText(file);
    if (text.split("\n").some((line) => line.startsWith("🌐 **Languages:**"))) count += 1;
  }
  return count;
}

/**
 * Translates `entries` (`{ id, text }`) in batches of `--batch-size`; a batch
 * that fails or cannot be parsed is retried one string at a time. Strings that
 * still fail are left out of the result and recorded in `ctx.failures`, so a
 * later run fills them in (the run exits 1 to flag them).
 */
async function translateEntries(ctx, entries, label) {
  ctx.backend ??= backendConfig();
  const out = new Map();
  const size = ctx.o.batchSize;
  const batches = Math.ceil(entries.length / size);
  for (let i = 0; i < entries.length; i += size) {
    const chunk = entries.slice(i, i + size);
    try {
      const translated = await translateBatch(chunk, ctx.entry, ctx.backend);
      for (const { id } of chunk) out.set(id, translated.get(id));
    } catch (err) {
      warn(
        `${label}: batch ${i / size + 1}/${batches} failed (${err.message}) — retrying one by one`
      );
      for (const { id, text } of chunk) {
        try {
          const value = await translateString(text, ctx.entry, ctx.backend);
          if (!value) throw new Error("empty translation");
          out.set(id, value);
        } catch (inner) {
          ctx.failures.push(`${label}: ${id} (${inner.message})`);
        }
      }
    }
    log(`${label}: ${Math.min(i + size, entries.length)}/${entries.length} strings translated`);
  }
  return out;
}

// ----- Phases --------------------------------------------------------------

async function phaseConfig(ctx) {
  if (ctx.nextConfigText === ctx.configText) {
    log(`config: ${ctx.code} already configured — nothing to change`);
    return;
  }
  const changes = [];
  if (!ctx.stored) changes.push(`add ${ctx.code} entry`);
  if (ctx.o.rtl && !ctx.before.rtl.includes(ctx.code)) changes.push("add to rtl");
  log(`config: ${changes.join(", ")} (total locales → ${ctx.total})`);
  await writeFile(ctx, ctx.configPath, ctx.nextConfigText);
}

async function phaseFlag(ctx) {
  const file = path.join(ROOT, "docs", "assets", "flags", ctx.flagFile);
  if (existsSync(file)) {
    log(`flag: ${display(file)} present`);
    return;
  }
  const url = `${FLAG_CDN}${ctx.flagFile}`;
  log(`${dryTag(ctx)}fetch ${url} → ${display(file)}`);
  if (ctx.dry) return;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `flag download failed (${res.status}) for ${url} — place docs/assets/flags/${ctx.flagFile} manually (or pass --flag-file) and re-run`
    );
  }
  const svg = await res.text();
  if (!svg.trimStart().startsWith("<svg")) throw new Error(`flag download is not an SVG: ${url}`);
  await writeFile(ctx, file, svg);
}

async function phaseUi(ctx) {
  const dir = path.join(ROOT, "src", "i18n", "messages");
  const file = path.join(dir, `${ctx.code}.json`);
  const source = flattenLeaves(await readJson(path.join(dir, "en.json")));
  const existing = existsSync(file) ? flattenLeaves(await readJson(file)) : null;
  // sync-ui-keys only fills locales that already exist on disk.
  if (!existing) await writeFile(ctx, file, "{}\n");
  const have = new Set((existing ?? []).map((leaf) => leaf.id));
  const missing = source.filter((leaf) => !have.has(leaf.id)).length;
  const markers = countMarkers(existing ?? []);
  log(
    `ui: ${source.length} source keys — ${missing} missing, ${markers} __MISSING__ markers → ${missing + markers} to translate`
  );
  if (missing + markers === 0) {
    log(`ui: ${display(file)} already complete`);
    return;
  }
  runNode(
    ctx,
    path.join(SCRIPT_DIR, "sync-ui-keys.mjs"),
    [`--locale=${ctx.code}`, "--translate-markers", `--batch-size=${ctx.o.batchSize}`],
    `writes ${display(file)}`
  );
  ctx.touched.add(file);
  // sync-ui-keys keeps a marker for every string it could not translate and still
  // exits 0; a committed marker turns the i18n-ui-coverage CI shard red, so the
  // leftovers are counted here and fail this run like the cli / site loops do.
  if (ctx.dry) {
    log(
      `[DRY] then re-count the __MISSING__ markers left in ${display(file)} — leftovers fail the run`
    );
    return;
  }
  const leftover = countMarkers(flattenLeaves(await readJson(file)));
  log(`ui: ${leftover} __MISSING__ markers left in ${display(file)}`);
  if (leftover > 0) {
    ctx.failures.push(
      `ui: ${leftover} keys still __MISSING__ (re-run add-locale or sync-ui-keys --translate-markers)`
    );
  }
}

async function phaseDocs(ctx) {
  const localeDir = path.join(ROOT, "docs", "i18n", ctx.code);
  let files = null;
  if (ctx.o.files) {
    files = ctx.o.files;
    for (const rel of files) {
      if (!existsSync(path.join(ROOT, rel))) {
        throw new Error(`docs: --files entry "${rel}" has no English source at the repo root`);
      }
    }
    log(`docs: explicit source list (--files) = ${files.length} files`);
  } else if (ctx.o.docs === "core") {
    // The target locale is left out of the intersection: a partial earlier run
    // of the same locale must not shrink the set it is being caught up to.
    const peers = {
      ...ctx.config,
      locales: ctx.config.locales.filter((locale) => locale.code !== ctx.code),
    };
    files = computeDocsCoreSet({ root: ROOT, config: peers });
    if (files.length === 0) {
      throw new Error(
        "docs: no existing locale mirror to derive the core set from — use --docs=all"
      );
    }
    // The thinnest mirrors bound the intersection — a partial peer shows up here.
    const sizes = [];
    for (const code of docsLocaleDirs({ root: ROOT, config: peers })) {
      const count = (await walkFiles(path.join(ROOT, "docs", "i18n", code))).length;
      sizes.push({ code, count });
    }
    sizes.sort((a, b) => a.count - b.count || a.code.localeCompare(b.code, "en"));
    const smallest = sizes
      .slice(0, 3)
      .map((peer) => `${peer.code} ${peer.count}`)
      .join(", ");
    log(
      `docs: core set = ${files.length} files (intersection of ${sizes.length} existing locale mirrors; smallest mirrors: ${smallest})`
    );
  } else {
    log("docs: full source set (--docs=all)");
  }
  if (ctx.dry && files) {
    for (const rel of files) {
      const target = path.join(localeDir, rel);
      log(`[DRY] write ${display(target)} (via run-translation)`);
      ctx.touched.add(target);
    }
  }
  runNode(
    ctx,
    path.join(SCRIPT_DIR, "run-translation.mjs"),
    [`--locale=${ctx.code}`, ...(files ? [`--files=${files.join(",")}`] : [])],
    `writes docs/i18n/${ctx.code}/**`
  );
  if (!ctx.dry && !existsSync(localeDir)) {
    warn(`docs: ${display(localeDir)} was not created — skipping the llm.txt / CHANGELOG.md stubs`);
    return;
  }
  for (const [fileName, heading] of MIRROR_STUBS) {
    const target = path.join(localeDir, fileName);
    if (existsSync(target)) {
      log(`docs: ${display(target)} present`);
      continue;
    }
    const body = (await readText(path.join(ROOT, fileName))).replace(/^# .+\r?\n+/, "");
    const stub = buildMirrorStub({
      heading,
      native: ctx.entry.native ?? ctx.entry.name,
      bar: buildMirrorBar(fileName, ctx.code, ctx.config),
      body,
    });
    await writeFile(ctx, target, stub);
  }
}

async function phaseCli(ctx) {
  const dir = path.join(ROOT, "bin", "cli", "locales");
  const catalogPath = path.join(dir, `${ctx.code}.json`);
  const en = await readJson(path.join(dir, "en.json"));
  const sections = ctx.o.cliFull
    ? Object.keys(en)
    : CLI_DEFAULT_SECTIONS.filter((section) => section in en);
  if (existsSync(catalogPath)) {
    log(`cli: ${display(catalogPath)} present`);
  } else {
    runNode(
      ctx,
      path.join(ROOT, "bin", "cli", "scripts", "generate-locales.mjs"),
      [`--code=${ctx.code}`],
      `scaffolds ${display(catalogPath)}`
    );
  }
  const catalog = existsSync(catalogPath) ? await readJson(catalogPath) : {};
  const source = flattenLeaves(
    Object.fromEntries(sections.map((section) => [section, en[section]]))
  );
  const pending = ctx.o.forceCli
    ? source
    : source.filter(({ id }) => typeof getDeep(catalog, id) !== "string");
  const scope = ctx.o.cliFull ? `every section (${sections.length})` : sections.join(" + ");
  log(
    `cli: ${source.length} keys in ${scope} — ${pending.length} to translate${ctx.o.forceCli ? " (--force-cli)" : ""}`
  );
  if (pending.length === 0) {
    log(`cli: ${display(catalogPath)} already translated`);
    return;
  }
  if (ctx.dry) {
    log(`[DRY] write ${display(catalogPath)}`);
    ctx.touched.add(catalogPath);
    return;
  }
  const translated = await translateEntries(ctx, pending, "cli");
  for (const [id, text] of translated) setDeep(catalog, id, text);
  await writeFile(ctx, catalogPath, JSON.stringify(catalog, null, 2) + "\n");
}

async function phaseReadme(ctx) {
  const { entry, total, code } = ctx;
  // Static pattern + string comparison: never build a RegExp from the CLI --code value.
  const hasGuideRow = (text) =>
    text.split("\n").some((line) => I18N_GUIDE_ROW_RE.exec(line)?.[1] === code);
  const edits = [
    [
      "README.md",
      (t) =>
        t.includes(`href="docs/i18n/${code}/README.md"`)
          ? t
          : insertReadmeFlagLink(t, entry, total),
    ],
    [
      "docs/i18n/README.md",
      (t) => (t.includes(`(\`${code}\`)`) ? t : insertDocsIndexRow(t, entry, total)),
    ],
    [
      "docs/guides/I18N.md",
      (t) => (hasGuideRow(t) ? t : insertI18nGuideRow(t, entry, total, ctx.config.rtl)),
    ],
    ["llm.txt", (t) => bumpCounts(t, total)],
    [
      "docs/README.md",
      (t) =>
        t.replace(
          /in \d+ locales \(plus the English originals — \d+ languages in total\)/,
          `in ${total - 1} locales (plus the English originals — ${total} languages in total)`
        ),
    ],
    ["docs/diagrams/i18n-flow.mmd", (t) => t.replace(/\(\d+ langs\)/, `(${total} langs)`)],
  ];
  let llmChanged = false;
  for (const [rel, transform] of edits) {
    const file = path.join(ROOT, rel);
    const text = await readText(file);
    const next = transform(text);
    if (next === text) {
      log(`readme: ${rel} up to date`);
      continue;
    }
    await writeFile(ctx, file, next);
    if (rel === "llm.txt") llmChanged = true;
  }
  // llm.txt mirrors are strict copies of the root body (check-docs-sync).
  if (llmChanged) {
    runNode(ctx, path.join(SCRIPT_DIR, "sync-llm-mirrors.mjs"), [], "re-syncs docs/i18n/*/llm.txt");
  }
}

async function phaseBars(ctx) {
  const note = `rewrites the 🌐 Languages bar of every file under docs/ that carries one (${await countLanguageBarFiles()} today) — adds ${ctx.entry.flag} [${ctx.code}]`;
  runNode(ctx, path.join(SCRIPT_DIR, "sync-language-bars.mjs"), [], note);
}

async function phaseSite(ctx) {
  const siteDir = ctx.o.siteDir;
  if (!siteDir) {
    log("site: --site-dir not given — skipped");
    return;
  }
  if (!existsSync(siteDir)) {
    warn(`site: ${siteDir} does not exist — skipping the site phase`);
    return;
  }
  const sourcePath = path.join(siteDir, "lang", "_source.en.json");
  if (!existsSync(sourcePath)) {
    throw new Error(`site: ${sourcePath} not found — is --site-dir the omnirouteSite checkout?`);
  }

  // lang/<code>.json — flat keys; only the ones without a translation yet.
  const source = await readJson(sourcePath);
  const langPath = path.join(siteDir, "lang", `${ctx.code}.json`);
  const existing = existsSync(langPath) ? await readJson(langPath) : {};
  const entries = Object.entries(source)
    .filter(([id, text]) => typeof text === "string" && typeof existing[id] !== "string")
    .map(([id, text]) => ({ id, text }));
  log(
    `site: ${Object.keys(source).length} keys in lang/_source.en.json — ${entries.length} to translate`
  );
  if (entries.length === 0) {
    log(`site: ${langPath} already complete`);
  } else if (ctx.dry) {
    log(`[DRY] write ${langPath}`);
  } else {
    const translated = await translateEntries(ctx, entries, "site");
    const out = { ...existing };
    for (const [id, text] of translated) out[id] = text;
    await writeFile(ctx, langPath, JSON.stringify(out, null, 2) + "\n");
  }

  // js/i18n.js — SUPPORTED_LANGS.
  const jsPath = path.join(siteDir, "js", "i18n.js");
  const js = await readText(jsPath);
  const nextJs = addSupportedLang(js, ctx.code);
  if (nextJs === js) {
    log(`site: js/i18n.js already lists ${ctx.code}`);
  } else {
    await writeFile(ctx, jsPath, nextJs);
    log(`${dryTag(ctx)}node --check ${jsPath}`);
    if (!ctx.dry) execFileSync(process.execPath, ["--check", jsPath], { stdio: "inherit" });
  }

  // Language dropdowns.
  for (const page of SITE_PAGES) {
    const file = path.join(siteDir, page);
    if (!existsSync(file)) {
      warn(`site: ${page} not found — skipped`);
      continue;
    }
    const html = await readText(file);
    const next = addDropdownOption(html, {
      code: ctx.code,
      flag: ctx.entry.flag,
      native: ctx.entry.native ?? ctx.entry.name,
    });
    if (next === html) log(`site: ${page} already lists ${ctx.code}`);
    else await writeFile(ctx, file, next);
  }
}

const PHASE_RUNNERS = {
  config: phaseConfig,
  flag: phaseFlag,
  ui: phaseUi,
  docs: phaseDocs,
  cli: phaseCli,
  readme: phaseReadme,
  bars: phaseBars,
  site: phaseSite,
};

async function runPrettier(ctx, phases) {
  // Repo files only: nothing under --site-dir (the site repo has its own tooling and
  // Prettier config, and it may live inside this checkout, e.g. _mono_repo/), nothing
  // outside the repo root, and only the kinds Prettier has a parser for — llm.txt and
  // the .mmd diagram would make it exit 2.
  const siteDir = ctx.o.siteDir;
  const underSite = (file) =>
    siteDir !== null && (file === siteDir || file.startsWith(`${siteDir}${path.sep}`));
  const files = new Set(
    [...ctx.touched].filter(
      (file) => insideRepo(file) && !underSite(file) && /\.(json|md)$/.test(file)
    )
  );
  const localeDir = path.join(ROOT, "docs", "i18n", ctx.code);
  if (!ctx.dry && phases.includes("docs") && existsSync(localeDir)) {
    for (const file of await walkFiles(localeDir)) if (file.endsWith(".md")) files.add(file);
  }
  if (files.size === 0) return;
  const bin = path.join(ROOT, "node_modules", "prettier", "bin", "prettier.cjs");
  if (!existsSync(bin)) {
    warn("prettier is not installed (node_modules) — skipping the formatting pass");
    return;
  }
  const list = [...files].sort();
  log(`${dryTag(ctx)}prettier --write ${list.length} file(s): ${list.map(display).join(" ")}`);
  if (ctx.dry) return;
  execFileSync(process.execPath, [bin, "--write", "--log-level=warn", ...list], {
    cwd: ROOT,
    stdio: "inherit",
  });
}

// ----- Main ----------------------------------------------------------------

async function main() {
  loadDotEnv();
  const o = parseArgs(process.argv);
  const phases = selectPhases(o);
  if (phases.length === 0) throw new Error("no phase left to run (check --only / --skip)");

  const configPath = path.join(ROOT, "config", "i18n.json");
  const configText = await readText(configPath);
  const before = JSON.parse(configText);
  const stored = before.locales.find((locale) => locale.code === o.code) ?? null;
  if (!stored) {
    for (const required of ["english", "native", "flag"]) {
      if (!o[required]) {
        throw new Error(
          `--${required} is required (${o.code} is not in config/i18n.json yet)\n\n${USAGE}`
        );
      }
    }
  } else {
    for (const field of ["english", "native", "flag"]) {
      if (o[field] && o[field] !== stored[field]) {
        warn(
          `--${field}=${o[field]} differs from config/i18n.json (${stored[field]}) — the stored value wins`
        );
      }
    }
    if (o.aliases.length && JSON.stringify(o.aliases) !== JSON.stringify(stored.aliases ?? [])) {
      warn(
        `--aliases=${o.aliases.join(",")} is ignored for an already-configured locale (config/i18n.json keeps ${stored.aliases?.length ? stored.aliases.join(",") : "none"}) — edit the config entry by hand`
      );
    }
  }

  // The working entry: the stored one for a known locale, else built from the
  // arguments. `flagFile` is a helper key that is never written to the config.
  const entry = stored
    ? { ...stored, ...(o.flagFile ? { flagFile: o.flagFile } : {}) }
    : {
        code: o.code,
        label: o.code.toUpperCase(),
        name: o.native,
        native: o.native,
        english: o.english,
        flag: o.flag,
        ...(o.aliases.length ? { aliases: o.aliases } : {}),
        ...(o.flagFile ? { flagFile: o.flagFile } : {}),
      };
  const flagFile = flagFileFor(entry); // fails fast for a flag the file name cannot be derived from

  // config/i18n.json after this run (in memory; the config phase writes it).
  let nextConfigText = stored ? configText : insertLocaleEntry(configText, entry);
  if (o.rtl) {
    const cfg = JSON.parse(nextConfigText);
    if (!cfg.rtl.includes(o.code)) {
      cfg.rtl = [...cfg.rtl, o.code].sort();
      nextConfigText = JSON.stringify(cfg, null, 2) + "\n";
    }
  }
  const config = JSON.parse(nextConfigText);
  const total = config.locales.length;

  const ctx = {
    o,
    dry: o.dryRun,
    code: o.code,
    entry,
    flagFile,
    stored,
    before,
    config,
    total,
    configPath,
    configText,
    nextConfigText,
    touched: new Set(),
    failures: [],
    backend: null,
  };

  if (!stored && !phases.includes("config")) {
    const needing = phases.filter(
      (phase) =>
        PHASES_REQUIRING_CONFIG_ON_DISK.includes(phase) &&
        (!o.dryRun || PHASES_GUARDED_IN_DRY_RUN.includes(phase))
    );
    if (needing.length) {
      throw new Error(
        `config/i18n.json does not list ${o.code} yet and the ${needing.join(", ")} phase(s) need it on disk — run the config phase first (add it to --only or drop it from --skip)`
      );
    }
  }
  // Fail before the first write when a translating phase has no backend.
  if (!o.dryRun && phases.some((phase) => PHASES_TRANSLATING.includes(phase))) {
    ctx.backend = backendConfig();
  }

  log(
    `${dryTag(ctx)}${o.code} (${entry.english ?? entry.name}, ${entry.flag}) — phases: ${phases.join(", ")} — locales after: ${total}`
  );
  for (const phase of phases) {
    log(`--- ${phase} ---`);
    await PHASE_RUNNERS[phase](ctx);
  }
  log("--- prettier ---");
  await runPrettier(ctx, phases);

  if (ctx.failures.length) {
    warn(
      `${ctx.failures.length} string(s) could not be translated — re-run the command to fill them in:`
    );
    for (const failure of ctx.failures) console.warn(`  - ${failure}`);
    process.exitCode = 1;
  }
  log(
    `${dryTag(ctx)}done: ${o.code} (${entry.english ?? entry.name}) — total locales now ${total}`
  );
  log(
    "next: node --import tsx/esm --test tests/unit/i18n-locale-surfaces-parity.test.ts && npm run i18n:check-ui-coverage && npm run check:docs-all"
  );
}

main().catch((err) => {
  console.error("[add-locale] ERROR", err?.stack || err?.message || String(err));
  process.exit(1);
});
