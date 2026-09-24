#!/usr/bin/env node
/**
 * OmniRoute — Docs translation pipeline (hash-based, incremental).
 *
 * Source of truth: `config/i18n.json` (locale list) and the original English
 * markdown files at the repo root (`CLAUDE.md`, `GEMINI.md`, `README.md`, …)
 * plus `docs/*.md`.
 *
 * Targets land in `docs/i18n/<locale>/...` mirroring the source layout, with a
 * header (top H1 + language bar) and an `---` separator before the translated
 * body. This is the same shape the existing `check-docs-sync.mjs` already
 * understands.
 *
 * State: `.i18n-state.json` stores a SHA-256 hash for every source file and
 * for every produced target. Re-runs only retranslate files whose source hash
 * changed or whose target file is missing.
 *
 * Usage (driven by npm scripts in package.json):
 *   npm run i18n:run
 *   npm run i18n:run -- --locale=pt-BR
 *   npm run i18n:run -- --files=CLAUDE.md,docs/ARCHITECTURE.md
 *   npm run i18n:run -- --force
 *   npm run i18n:run:dry
 *   npm run i18n:run -- --adopt   (rebuild .i18n-state.json from disk, no API calls)
 *   npm run i18n:run -- --adopt --targets-only
 *                                 (re-hash only the mirrors on disk, keeping every
 *                                  source_hash — mechanical mirror rewrites stop
 *                                  showing up as `target changed` while genuine
 *                                  source drift is still reported)
 *
 * Backend (configured via env, never committed):
 *   OMNIROUTE_TRANSLATION_API_URL     e.g. https://cloud.omniroute.dev/v1
 *   OMNIROUTE_TRANSLATION_API_KEY     bearer token (kept out of logs)
 *   OMNIROUTE_TRANSLATION_MODEL       e.g. cx/gpt-5.6-sol
 *   OMNIROUTE_TRANSLATION_TIMEOUT_MS  optional, default 60000
 *   OMNIROUTE_TRANSLATION_CONCURRENCY optional, default 4
 */

import { promises as fs, existsSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import crypto from "node:crypto";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { normalizeLocaleText } from "./glossary-normalize.mjs";
import { buildMirrorBar } from "./lib/language-bar.mjs";
import { adoptState, mergeAdoptedState, refreshTargetHashes } from "./lib/translation-state.mjs";

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

// Prettier is loaded lazily on first use so the script still runs (with a
// warning) in environments where node_modules has not been installed. The
// formatter is applied to every translated file before its hash is recorded,
// so a subsequent lint-staged Prettier pass cannot mutate the file content
// out from under `.i18n-state.json`.
let prettierMod = null;
async function getPrettier() {
  if (prettierMod !== null) return prettierMod;
  try {
    prettierMod = await import("prettier");
  } catch {
    prettierMod = false;
  }
  return prettierMod;
}

async function formatMarkdown(content, fileName) {
  const p = await getPrettier();
  if (!p) return content;
  try {
    return await p.format(content, { parser: "markdown", filepath: fileName });
  } catch (err) {
    logWarn(`prettier could not format ${fileName}: ${err.message}`);
    return content;
  }
}

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const CONFIG_PATH = path.join(ROOT, "config", "i18n.json");
const STATE_PATH = path.join(ROOT, ".i18n-state.json");
const DOCS_I18N_DIR = path.join(ROOT, "docs", "i18n");
const DOCS_DIR = path.join(ROOT, "docs");

// ----- Source set ----------------------------------------------------------
//
// Root-level markdown files that should be translated as `docs/i18n/<loc>/<name>`.
// Strict-mirror files (`llm.txt`, `CHANGELOG.md`) are intentionally NOT in this
// list — they are handled by `scripts/check-docs-sync.mjs` rules and are kept
// in sync by other tooling. Adding them here would conflict with that script.
const ROOT_DOC_SOURCES = [
  "CLAUDE.md",
  "GEMINI.md",
  "AGENTS.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "CODE_OF_CONDUCT.md",
  "README.md",
];

// File names inside `docs/` that should NOT be translated. Anything else with
// a `.md` extension at the top of `docs/` is treated as a source.
const DOCS_EXCLUDED_NAMES = new Set([
  "I18N.md", // Translator tooling docs — kept English-only for operators.
  "README.md", // Section index files — auto-generated, not prose translation targets.
]);

// Sub-trees we never recurse into when collecting sources.
const DOCS_EXCLUDED_SUBDIRS = new Set([
  "i18n",
  "screenshots",
  "superpowers",
  "diagrams",
  "reports",
]);

// ----- Helpers -------------------------------------------------------------

function logInfo(...parts) {
  console.log("[i18n-run]", ...parts);
}

function logWarn(...parts) {
  console.warn("[i18n-run] WARN", ...parts);
}

function logError(...parts) {
  console.error("[i18n-run] ERROR", ...parts);
}

function sha256(buffer) {
  return crypto.createHash("sha256").update(buffer).digest("hex");
}

function parseArgs(argv) {
  const opts = {
    locales: null,
    files: null,
    force: false,
    dryRun: false,
    adopt: false,
    targetsOnly: false,
    concurrency: null,
  };
  for (const arg of argv.slice(2)) {
    if (arg === "--force") opts.force = true;
    else if (arg === "--dry-run" || arg === "--dryrun") opts.dryRun = true;
    else if (arg === "--adopt") opts.adopt = true;
    else if (arg === "--targets-only") opts.targetsOnly = true;
    else if (arg.startsWith("--locale="))
      opts.locales = arg
        .slice(9)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else if (arg.startsWith("--locales="))
      opts.locales = arg
        .slice(10)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else if (arg.startsWith("--files="))
      opts.files = arg
        .slice(8)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    else if (arg.startsWith("--concurrency=")) opts.concurrency = Number(arg.slice(14));
    else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/i18n/run-translation.mjs [options]",
          "",
          "  --locale=<csv>       Target locales (default: all except `en`)",
          "  --files=<csv>        Relative paths to translate (default: all sources)",
          "  --force              Retranslate even when hashes match",
          "  --dry-run            Report what would happen but never call the API",
          "  --adopt              Rebuild .i18n-state.json from the files on disk (no API calls)",
          "  --targets-only       With --adopt: re-hash only the mirrors, keeping every source_hash",
          "  --concurrency=<n>    Parallel API requests (default: env CONCURRENCY or 4)",
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

async function loadState() {
  if (!existsSync(STATE_PATH)) return { sources: {} };
  try {
    const raw = await fs.readFile(STATE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && parsed.sources ? parsed : { sources: {} };
  } catch (err) {
    logWarn(`could not parse ${path.relative(ROOT, STATE_PATH)} — starting fresh (${err.message})`);
    return { sources: {} };
  }
}

async function saveState(state) {
  const json = JSON.stringify(state, null, 2) + "\n";
  await fs.writeFile(STATE_PATH, json, "utf8");
}

async function collectDocsSources() {
  const found = [];
  for (const entry of await fs.readdir(DOCS_DIR, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith(".md") && !DOCS_EXCLUDED_NAMES.has(entry.name)) {
      found.push(`docs/${entry.name}`);
    } else if (entry.isDirectory() && !DOCS_EXCLUDED_SUBDIRS.has(entry.name)) {
      // Recurse one level for organized doc groups (e.g. docs/features/*.md).
      const sub = path.join(DOCS_DIR, entry.name);
      for (const child of await fs.readdir(sub, { withFileTypes: true })) {
        if (
          child.isFile() &&
          child.name.endsWith(".md") &&
          !DOCS_EXCLUDED_NAMES.has(child.name) &&
          child.name.toLowerCase() !== "readme.md"
        ) {
          found.push(`docs/${entry.name}/${child.name}`);
        }
      }
    }
  }
  return found;
}

async function collectAllSources() {
  const rootSources = [];
  for (const name of ROOT_DOC_SOURCES) {
    const abs = path.join(ROOT, name);
    if (existsSync(abs)) rootSources.push(name);
  }
  const docsSources = await collectDocsSources();
  return [...rootSources, ...docsSources].sort();
}

function targetPathFor(relSource, locale) {
  // Root MDs (`CLAUDE.md`, …) → `docs/i18n/<loc>/CLAUDE.md`
  if (!relSource.includes("/")) {
    return path.join(DOCS_I18N_DIR, locale, relSource);
  }
  // `docs/X.md` → `docs/i18n/<loc>/docs/X.md`
  // `docs/features/Y.md` → `docs/i18n/<loc>/docs/features/Y.md`
  return path.join(DOCS_I18N_DIR, locale, relSource);
}

// Most docs sources open with a YAML front-matter block (`---` … `---`). The
// H1 sits behind it, so the heading helpers look past the block: otherwise the
// mirror gets the file name as its title and the front matter (plus a second
// heading) is translated into its body.
const FRONT_MATTER = /^---\r?\n[\s\S]*?\r?\n---\r?\n+/;

function stripFrontMatter(markdown) {
  return markdown.replace(FRONT_MATTER, "");
}

export function extractTopHeading(markdown) {
  const m = stripFrontMatter(markdown).match(/^# (.+)\r?\n/);
  return m ? m[1].trim() : null;
}

export function stripTopHeading(markdown) {
  return stripFrontMatter(markdown).replace(/^# .+\r?\n+/, "");
}

// ----- Translator backend --------------------------------------------------

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

const SYSTEM_PROMPT = (englishName, native) =>
  [
    `You are a professional translator for technical software documentation.`,
    `Translate the user's markdown content into ${englishName} (native: ${native}).`,
    `Preserve all markdown syntax EXACTLY: headings, lists, code blocks (\`\`\`), inline code (\`...\`), links, images, tables, blockquotes, HTML tags.`,
    `Do NOT translate: source code, URLs, file paths, command names (npm/git/curl/node/etc), environment variable names (UPPER_SNAKE_CASE),`,
    `version numbers, package names, shell flags, function/class identifiers, JSON keys.`,
    `Translate ALL prose, including comments inside code blocks IF they are clearly prose comments (lines starting with # or //).`,
    `Return ONLY the translated markdown — no preamble, no explanation, no surrounding fences.`,
  ].join(" ");

// Splits a markdown body into chunks of <= maxChars. Top-level `## ` headings
// are the preferred cut; a section that is still longer than maxChars is then
// split again on `### ` headings and paragraph boundaries, never inside a
// fenced code block. Before the second pass a single long section (README.md
// has a 16 KB one, USER_GUIDE.md a 20 KB one) became one oversized request
// that the slow fallback model could not answer inside the backend's
// 10-minute fetch timeout, and the biggest docs failed on every retry.
export function chunkMarkdown(markdown, maxChars = 6000) {
  if (markdown.length <= maxChars) return [markdown];
  const lines = markdown.split("\n");
  const sections = [];
  let buf = [];
  let size = 0;
  for (const line of lines) {
    if (line.startsWith("## ") && size > maxChars * 0.5) {
      sections.push(buf.join("\n"));
      buf = [line];
      size = line.length;
    } else {
      buf.push(line);
      size += line.length + 1;
    }
  }
  if (buf.length) sections.push(buf.join("\n"));
  return sections.flatMap((section) =>
    section.length <= maxChars ? [section] : splitOversizedSection(section, maxChars)
  );
}

const FENCE_LINE = /^\s*(```|~~~)/;

// Groups a section into blocks — a whole fenced code block, a heading-led run,
// or a paragraph ending at a blank line — and packs them greedily. A block that
// is itself larger than maxChars stays whole: cutting mid-paragraph or inside a
// fence would hand the model a fragment it cannot translate faithfully.
function splitOversizedSection(section, maxChars) {
  const blocks = [];
  let block = [];
  let inFence = false;
  for (const line of section.split("\n")) {
    const isFence = FENCE_LINE.test(line);
    if (inFence) {
      block.push(line);
      if (isFence) {
        inFence = false;
        blocks.push(block);
        block = [];
      }
      continue;
    }
    if (isFence) {
      if (block.length) blocks.push(block);
      block = [line];
      inFence = true;
      continue;
    }
    if (/^##+ /.test(line) && block.length) {
      blocks.push(block);
      block = [];
    }
    block.push(line);
    if (line.trim() === "") {
      blocks.push(block);
      block = [];
    }
  }
  if (block.length) blocks.push(block);

  const chunks = [];
  let current = [];
  let size = 0;
  for (const lines of blocks.flatMap((b) => splitOversizedRun(b, maxChars))) {
    const length = lines.join("\n").length + 1;
    if (size > 0 && size + length > maxChars) {
      chunks.push(current.join("\n"));
      current = [];
      size = 0;
    }
    current.push(...lines);
    size += length;
  }
  if (current.length) chunks.push(current.join("\n"));
  return chunks;
}

// A markdown table or a long bullet list has no blank line inside it, so the
// paragraph splitter kept PROVIDER_REFERENCE.md's 244-row table (40 KB) and
// FREE_TIERS.md's 71-item list (16 KB) as one block each, and the request for
// a verbose script outlived the upstream socket ("fetch failed" for Greek and
// Amharic on every attempt). An oversized block made only of table rows or
// list items (plus their indented continuation lines) is cut before an item
// line; the table header rows travel with the first group only.
const ITEM_LINE = /^\s*(\||[-*+]\s|\d+[.)]\s)/;
const CONTINUATION_LINE = /^\s+\S/;
function splitOversizedRun(lines, maxChars) {
  if (lines.join("\n").length <= maxChars) return [lines];
  const content = lines.filter((l) => l.trim() !== "");
  if (!content.every((l) => ITEM_LINE.test(l) || CONTINUATION_LINE.test(l))) return [lines];
  if (!ITEM_LINE.test(content[0])) return [lines];
  const groups = [];
  let group = [];
  let size = 0;
  for (const line of lines) {
    if (group.length && ITEM_LINE.test(line) && size + line.length + 1 > maxChars) {
      groups.push(group);
      group = [];
      size = 0;
    }
    group.push(line);
    size += line.length + 1;
  }
  if (group.length) groups.push(group);
  return groups;
}

// Chunks are rejoined with a blank line (they were cut on headings and
// paragraphs) — except at a seam between two table rows or two list items,
// where a blank line would break one table (or one tight list) into two.
// True when the text ends with a table row or a list item (its indented
// continuation lines included), i.e. a following item line belongs to the
// same run.
function endsInsideItemRun(text) {
  const lines = text.trimEnd().split("\n");
  let i = lines.length - 1;
  while (i > 0 && CONTINUATION_LINE.test(lines[i])) i--;
  return ITEM_LINE.test(lines[i] ?? "");
}

export function joinTranslatedChunks(parts) {
  let out = "";
  for (let i = 0; i < parts.length; i++) {
    if (i === 0) {
      out = parts[i];
      continue;
    }
    const nextFirst = parts[i].trimStart().split("\n")[0] ?? "";
    const seam = endsInsideItemRun(out) && ITEM_LINE.test(nextFirst) ? "\n" : "\n\n";
    out = out.trimEnd() + seam + parts[i].trimStart();
  }
  return out;
}

// ----- Section cache --------------------------------------------------------
// A mirror is retranslated section by section: the state remembers a short
// hash of every `## ` section of the source at the time of translation, and a
// later run only sends the sections whose hash changed, splicing the untouched
// translated sections of the mirror back in. Sections are matched by index
// only — an inserted or removed section shifts everything after it and costs
// a retranslation of the tail, which is acceptable.

// Section 0 is the preamble (text before the first `## `); every other section
// starts with its `## ` heading line. Joining with "\n\n" reproduces the body
// modulo trailing whitespace. A `## ` inside a fenced code block never splits.
export function splitSections(markdown) {
  const sections = [[]];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (FENCE_LINE.test(line)) inFence = !inFence;
    if (!inFence && /^## /.test(line) && sections.at(-1).length) sections.push([]);
    sections.at(-1).push(line);
  }
  return sections.map((s) => s.join("\n").replace(/\s+$/, ""));
}

export function sectionHashes(sections) {
  return sections.map((s) => sha256(Buffer.from(s.trim(), "utf8")).slice(0, 12));
}

// `null` means "no reuse possible — translate the whole body": no recorded
// hashes, or the mirror on disk does not have the section count the hashes
// were recorded for (a hand edit, or a mirror written by an older pipeline).
export function planSectionReuse({ previousHashes, sections, mirrorSections }) {
  if (!Array.isArray(previousHashes) || previousHashes.length !== mirrorSections.length) {
    return null;
  }
  if (previousHashes.length !== sections.length) return null;
  const now = sectionHashes(sections);
  const reuse = new Map();
  const translate = [];
  now.forEach((h, i) => {
    // A mirror section byte-equal to its source section is an untranslated copy (322 mirrors
    // of the 36 pre-expansion locales were adopted as English, 2026-09-16 audit) — never reuse it.
    // Section 0 of a mirror that starts with a YAML block is the old extractor's leaked
    // frontmatter (24 newer locales, 2026-09-16) — always rebuild it.
    const leakedFrontmatter = i === 0 && /^---\s*\n/.test(mirrorSections[i]);
    const untranslated = looksUntranslated(mirrorSections[i], sections[i]);
    if (h === previousHashes[i] && !untranslated && !leakedFrontmatter)
      reuse.set(i, mirrorSections[i]);
    else translate.push(i);
  });
  return { reuse, translate };
}

// The mirror without the prefix this script writes in front of the translated
// body: `# Title (native)`, the `🌐 **Languages:**` bar (older mirrors carry a
// translated label, so only the globe is pinned) and the `---` separator.
/**
 * A mirror whose source did not change can still need a rebuild: the pre-2026-09 extractor
 * leaked the source's YAML frontmatter into the body, and 322 mirrors of the pre-expansion
 * locales were plain English copies adopted as translated. Both are invisible to the hash
 * comparison, so the task loop asks this before skipping an up-to-date pair.
 */
/** Long prose lines (> 20 chars, not table/code/list scaffolding) of a markdown fragment. */
function proseLines(text) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 20 && !/^[`|#\-*\d\s]+$/.test(l));
}

/**
 * True when a mirror fragment is still (mostly) the English source: byte-equal, or ≥ 80 % of
 * its prose lines appear verbatim in the source. Fragments with < 3 prose lines fall back to
 * byte equality (code-only sections are legitimately identical).
 */
export function looksUntranslated(mirrorFragment, sourceFragment) {
  if (mirrorFragment.trim() === sourceFragment.trim()) return /[A-Za-z]{3,}/.test(sourceFragment);
  const mir = proseLines(mirrorFragment);
  if (mir.length < 3) return false;
  const src = new Set(proseLines(sourceFragment));
  return mir.filter((l) => src.has(l)).length / mir.length >= 0.8;
}

export function mirrorNeedsRebuild(mirrorText, sourceText) {
  const body = extractMirrorBody(mirrorText);
  if (/^---\s*\n[\s\S]{0,600}?\n---\s*\n/.test(body)) return true; // leaked frontmatter
  const sourceBody = stripTopHeading(sourceText.replace(/^---\n[\s\S]*?\n---\n+/, ""));
  return looksUntranslated(body, sourceBody); // still English
}

export function extractMirrorBody(mirrorText) {
  return mirrorText
    .replace(/^# .+\r?\n+/, "")
    .replace(/^🌐 .*\r?\n+/, "")
    .replace(/^---\r?\n+/, "");
}

// Bootstrap for targets translated before section hashes existed: walks the
// file's git history (newest first, at most 200 commits) and returns the text
// whose sha256 equals `sha` — the source that produced the mirror on disk — or
// `null` when it is not in reach (shallow clone, rewritten history).
export async function findSourceTextByHash(rel, sha, { cwd = ROOT } = {}) {
  let commits;
  try {
    commits = execFileSync("git", ["log", "--format=%H", "-n", "200", "--", rel], {
      cwd,
      encoding: "utf8",
    })
      .trim()
      .split("\n")
      .filter(Boolean);
  } catch {
    return null;
  }
  for (const commit of commits) {
    let text;
    try {
      text = execFileSync("git", ["show", `${commit}:${rel}`], {
        cwd,
        encoding: "utf8",
        maxBuffer: 1 << 28,
      });
    } catch {
      continue;
    }
    if (sha256(Buffer.from(text, "utf8")) === sha) return text;
  }
  return null;
}

// Decides which sections of a task can be spliced in from the mirror on disk.
// Targets recorded without `section_hashes` are bootstrapped from git history
// by the `source_hash` the state remembers for them.
/**
 * Bootstrap fallback: the recorded source_hash often belongs to a working-tree state that was
 * never committed as such (add-locale rewrites README/bars before translating), so an exact
 * hash lookup fails. The source as of the last commit before the translation's `updated_at`
 * is the closest committed ancestor — sections unchanged since then are safe to reuse.
 */
export function findSourceTextBefore(rel, isoDate, { cwd = ROOT } = {}) {
  try {
    const commit = execFileSync(
      "git",
      ["log", "-1", "--format=%H", `--before=${isoDate}`, "--", rel],
      {
        cwd,
        encoding: "utf8",
      }
    ).trim();
    if (!commit) return null;
    return execFileSync("git", ["show", `${commit}:${rel}`], {
      cwd,
      encoding: "utf8",
      maxBuffer: 1 << 28,
    });
  } catch {
    return null;
  }
}

export function mirrorLastCommitDate(mirrorRel, { cwd = ROOT } = {}) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", mirrorRel], {
      cwd,
      encoding: "utf8",
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

async function resolveSectionPlan({ task, state, opts, sections }) {
  if (task.missingTarget || opts.force) return null;
  const recorded = state.sources[task.rel]?.locales?.[task.locale];
  let previousHashes = recorded?.section_hashes;
  if (!previousHashes && recorded?.source_hash) {
    let oldText = await findSourceTextByHash(task.rel, recorded.source_hash);
    if (!oldText) {
      // `updated_at` is bumped by `--adopt`, so prefer the date of the last commit that
      // actually wrote the mirror (mirrors are only written by translation runs).
      const translatedAt =
        mirrorLastCommitDate(path.relative(ROOT, task.targetAbs)) || recorded.updated_at;
      if (translatedAt) oldText = findSourceTextBefore(task.rel, translatedAt);
    }
    if (oldText) previousHashes = sectionHashes(splitSections(stripTopHeading(oldText)));
  }
  if (!previousHashes) return null;
  const mirrorText = await fs.readFile(task.targetAbs, "utf8");
  const mirrorSections = splitSections(extractMirrorBody(mirrorText));
  return planSectionReuse({ previousHashes, sections, mirrorSections });
}

async function translateBody(body, localeEntry, backend) {
  const englishName = localeEntry.english ?? localeEntry.name;
  const native = localeEntry.native ?? localeEntry.name;
  const system = SYSTEM_PROMPT(englishName, native);
  const chunks = chunkMarkdown(body);
  const translated = [];
  for (let i = 0; i < chunks.length; i++) {
    const messages = [
      { role: "system", content: system },
      { role: "user", content: chunks[i] },
    ];
    const out = await callChat(messages, backend);
    translated.push(out.trim());
    if (chunks.length > 1) {
      logInfo(
        `  chunk ${i + 1}/${chunks.length} translated (${chunks[i].length} → ${out.length} chars)`
      );
    }
  }
  // Re-join with a blank line between chunks (we split on `## ` headings).
  // Then normalize terminology to the locale's canonical glossary — the model
  // reliably converts characters but not vocabulary habits, so zh-TW output
  // otherwise keeps mainland renderings (默認 for 預設, 緩存 for 快取) and
  // wrong-homophone conversions (上遊 for 上游, 儀錶板 for 儀表板).
  return normalizeLocaleText(joinTranslatedChunks(translated), localeEntry.code);
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

// ----- Main ----------------------------------------------------------------

/**
 * Merge one run's (source, locale) records into a freshly re-read state. Source-level
 * `source_hash` follows the record; untouched entries stay as the other runners left them.
 * `fallback` is this run's in-memory state, used only when the file could not be read.
 */
export function mergeStateUpdates(fresh, touched, fallback) {
  const base = fresh && fresh.sources ? fresh : fallback || { sources: {} };
  for (const { rel, locale, sourceHash, record } of touched) {
    const entry =
      base.sources[rel] || (base.sources[rel] = { source_hash: sourceHash, locales: {} });
    entry.source_hash = sourceHash;
    entry.locales[locale] = record;
  }
  return base;
}

async function main() {
  const opts = parseArgs(process.argv);
  const config = await loadConfig();
  const allSources = await collectAllSources();
  const state = await loadState();

  const sources = opts.files ? allSources.filter((s) => opts.files.includes(s)) : allSources;
  if (opts.files) {
    const missing = opts.files.filter((f) => !allSources.includes(f));
    if (missing.length) {
      logWarn(`--files contains paths not in the source set: ${missing.join(", ")}`);
    }
  }

  const docsExcluded = new Set(config.docsExcluded ?? ["en"]);
  let targetLocales = config.locales.map((l) => l.code).filter((code) => !docsExcluded.has(code));
  if (opts.locales) {
    targetLocales = targetLocales.filter((code) => opts.locales.includes(code));
    const missing = opts.locales.filter((c) => !config.locales.some((l) => l.code === c));
    if (missing.length) {
      logWarn(`--locale contains codes not in config/i18n.json: ${missing.join(", ")}`);
    }
  }

  logInfo(`sources: ${sources.length}`);
  logInfo(`locales: ${targetLocales.length} (${targetLocales.join(", ")})`);
  logInfo(`dry-run: ${opts.dryRun ? "yes" : "no"}, force: ${opts.force ? "yes" : "no"}`);

  if (opts.targetsOnly && !opts.adopt) {
    logError("--targets-only only applies to --adopt; re-run as `--adopt --targets-only`");
    process.exit(2);
  }

  if (opts.adopt && opts.targetsOnly) {
    // Covers the WHOLE recorded state (--files / --locale do not narrow it): the
    // point is to absorb a mechanical rewrite of the mirrors without touching a
    // single source_hash, so `i18n:check` keeps reporting the real source drift.
    const now = new Date().toISOString();
    const refreshed = await refreshTargetHashes({
      state,
      root: ROOT,
      targetPathFor: (rel, locale) => targetPathFor(rel, locale),
      now,
    });
    let recorded = 0;
    let rehashed = 0;
    let changed = 0;
    for (const [rel, entry] of Object.entries(refreshed.sources ?? {})) {
      for (const [locale, info] of Object.entries(entry.locales ?? {})) {
        recorded += 1;
        if (info.updated_at !== now) continue; // target missing on disk — left as recorded
        rehashed += 1;
        if (info.target_hash !== state.sources?.[rel]?.locales?.[locale]?.target_hash) changed += 1;
      }
    }
    const scope = `${rehashed}/${recorded} recorded targets re-hashed (${changed} changed), every source_hash kept`;
    const stateRel = path.relative(ROOT, STATE_PATH);
    if (opts.dryRun) {
      logInfo(
        `adopt --targets-only (dry-run): would refresh ${scope} in ${stateRel} — nothing written`
      );
      return;
    }
    await saveState(refreshed);
    logInfo(`adopt --targets-only: refreshed ${scope} in ${stateRel}`);
    return;
  }

  if (opts.adopt) {
    const adopted = await adoptState({
      root: ROOT,
      sources,
      locales: targetLocales,
      targetPathFor: (rel, locale) => targetPathFor(rel, locale),
    });
    const adoptedTargets = Object.values(adopted.sources).reduce(
      (n, entry) => n + Object.keys(entry.locales).length,
      0
    );
    const scope = `${sources.length} sources × ${targetLocales.length} locales (${adoptedTargets} existing targets)`;
    const stateRel = path.relative(ROOT, STATE_PATH);
    if (opts.dryRun) {
      logInfo(`adopt (dry-run): would adopt ${scope} into ${stateRel} — nothing written`);
      return;
    }
    // Merge, never overwrite: a filtered run (--files / --locale) must keep every
    // entry it did not re-hash, or the next i18n:run retranslates all of them.
    await saveState(mergeAdoptedState(state, adopted));
    logInfo(`adopted ${scope} into ${stateRel}`);
    return;
  }

  // Read backend env up front so dry-run can still print masked summary.
  let backend = null;
  if (!opts.dryRun) {
    backend = backendConfig();
    if (opts.concurrency) backend.concurrency = opts.concurrency;
    else backend.concurrency = Number(process.env.OMNIROUTE_TRANSLATION_CONCURRENCY || 4);
    logInfo(
      `backend: ${backend.apiUrl} (model=${backend.model}, concurrency=${backend.concurrency}, timeout=${backend.timeoutMs}ms)`
    );
  } else {
    const apiUrl = (process.env.OMNIROUTE_TRANSLATION_API_URL || "").replace(/\/$/, "");
    logInfo(`backend (dry-run): ${apiUrl || "<unset>"}`);
  }

  const limit = createLimiter(opts.dryRun ? 1 : backend.concurrency);

  let stats = { translated: 0, skipped: 0, failed: 0, considered: 0 };
  const failures = [];

  // Precompute source hashes once per source.
  const sourceHashes = new Map();
  for (const rel of sources) {
    const abs = path.join(ROOT, rel);
    const buf = await fs.readFile(abs);
    sourceHashes.set(rel, { hash: sha256(buf), text: buf.toString("utf8") });
  }

  // Build a flat queue of (source, locale) work units.
  const tasks = [];
  const touched = [];
  for (const rel of sources) {
    const { hash: sourceHash } = sourceHashes.get(rel);
    const entry =
      state.sources[rel] || (state.sources[rel] = { source_hash: sourceHash, locales: {} });
    entry.source_hash = sourceHash;

    for (const locale of targetLocales) {
      stats.considered++;
      const targetAbs = targetPathFor(rel, locale);
      const previous = entry.locales[locale];
      const sourceChanged = previous?.source_hash !== sourceHash;
      const missingTarget = !existsSync(targetAbs);
      const needsRebuild =
        !opts.force &&
        !sourceChanged &&
        !missingTarget &&
        mirrorNeedsRebuild(await fs.readFile(targetAbs, "utf8"), sourceHashes.get(rel).text);
      if (!opts.force && !sourceChanged && !missingTarget && !needsRebuild) {
        stats.skipped++;
        continue;
      }
      if (needsRebuild)
        logInfo(`${rel} → ${locale}: mirror needs a rebuild (English copy or leaked frontmatter)`);
      tasks.push({ rel, locale, targetAbs, sourceChanged, missingTarget });
    }
  }

  logInfo(
    `work units: ${tasks.length} (skipped up-to-date: ${stats.skipped} of ${stats.considered})`
  );

  if (opts.dryRun) {
    for (const t of tasks) {
      console.log(`  [DRY] ${t.rel} → ${path.relative(ROOT, t.targetAbs)}`);
    }
    logInfo(`dry-run complete — would translate ${tasks.length} files`);
    return;
  }

  const startMs = Date.now();

  await Promise.all(
    tasks.map((task) =>
      limit(async () => {
        const localeEntry = config.locales.find((l) => l.code === task.locale);
        const sourceText = sourceHashes.get(task.rel).text;
        const sourceHash = sourceHashes.get(task.rel).hash;
        const topHeading = extractTopHeading(sourceText);
        const body = stripTopHeading(sourceText);

        const sections = splitSections(body);
        let translatedBody;
        try {
          const plan = await resolveSectionPlan({ task, state, opts, sections });
          if (plan && plan.translate.length < sections.length) {
            const out = [...sections];
            for (const [i, text] of plan.reuse) out[i] = text;
            for (const i of plan.translate) {
              // An empty preamble (body opening with `## `) has nothing to send.
              out[i] = sections[i].trim()
                ? await translateBody(sections[i], localeEntry, backend)
                : "";
            }
            translatedBody = out.join("\n\n");
            logInfo(
              `${task.rel} → ${task.locale}: ${plan.translate.length}/${sections.length} sections retranslated`
            );
          } else {
            translatedBody = await translateBody(body, localeEntry, backend);
          }
        } catch (err) {
          stats.failed++;
          failures.push({ rel: task.rel, locale: task.locale, error: err.message });
          logError(`${task.rel} [${task.locale}] failed: ${err.message}`);
          return;
        }

        const heading = topHeading
          ? `# ${topHeading} (${localeEntry.native})`
          : `# ${path.basename(task.rel, ".md")} (${localeEntry.native})`;
        const langBar = buildMirrorBar(task.rel, task.locale, config);
        const rawContent = `${heading}\n\n${langBar}\n\n---\n\n${translatedBody.trim()}\n`;
        // Pre-format with Prettier (markdown parser) so the on-disk content
        // matches what `lint-staged` would produce. This keeps `target_hash`
        // stable across commit hooks.
        const finalContent = await formatMarkdown(rawContent, task.targetAbs);

        await fs.mkdir(path.dirname(task.targetAbs), { recursive: true });
        await fs.writeFile(task.targetAbs, finalContent, "utf8");

        const targetHash = sha256(Buffer.from(finalContent, "utf8"));
        const record = {
          source_hash: sourceHash,
          target_hash: targetHash,
          section_hashes: sectionHashes(sections),
          updated_at: new Date().toISOString(),
        };
        state.sources[task.rel].locales[task.locale] = record;
        touched.push({ rel: task.rel, locale: task.locale, sourceHash, record });

        stats.translated++;
        logInfo(`✓ ${task.rel} → ${task.locale} (${translatedBody.length} chars)`);
      })
    )
  );

  // Save state even on partial failure so future runs only retry what failed. Several
  // `--locale=<code>` runs execute in parallel during a batch, so re-read the file and merge
  // only this run's entries instead of overwriting the whole state (last writer used to win
  // and the other runners' work vanished from the state — 2026-09-16).
  await saveState(mergeStateUpdates(await loadState(), touched, state));

  const elapsedSec = ((Date.now() - startMs) / 1000).toFixed(1);
  logInfo(
    `summary: translated=${stats.translated}, skipped=${stats.skipped}, failed=${stats.failed}, total considered=${stats.considered}, elapsed=${elapsedSec}s`
  );

  if (failures.length) {
    logWarn(`${failures.length} failures:`);
    for (const f of failures) console.warn(`  - ${f.rel} [${f.locale}]: ${f.error}`);
    process.exit(1);
  }
}

const isDirectRun = import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  main().catch((err) => {
    logError(err?.stack || err?.message || String(err));
    process.exit(1);
  });
}
