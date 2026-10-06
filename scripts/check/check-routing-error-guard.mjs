#!/usr/bin/env node
// scripts/check/check-routing-error-guard.mjs
// Gate: swallowed `catch` blocks and fire-and-forget `void (async ...)` on routing
// paths (open-sse/services/combo.ts + open-sse/services/combo/).
//
// Run with `npm run check:routing-error-guard`. It is NOT wired into CI; run it when
// touching routing error handling.
//
// Rule A (swallowed-catch): a `catch` block with no `throw` and no inline
// `// no-effect: <motif>` marker is a violation unless frozen in
// scripts/check/allowlist-routing-swallowed-catch.json. Entries are keyed by file +
// the normalized catch-body snippet (never by line number, so unrelated edits that
// shift lines do not break the gate) with a `count` for identical bodies in one file.
// More live catches than the frozen count → violation; fewer → stale entry (anti-rot:
// lower the count or remove the entry). Chained `.catch(...)` promise handlers are
// ignored by construction.
//
// Rule B (void-async): `void (async` is a violation unless an entry in
// scripts/check/allowlist-void-async.json names the file and an `anchor` substring
// found within the next VOID_ASYNC_ANCHOR_WINDOW lines of that site; a `reason` is
// mandatory and entries matching no site are stale.
//
// Output mirrors scripts/check/check-error-helper.mjs: `file:line :: rule :: hint`.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const cwd = process.cwd();

const SCOPE_FILES = [path.join(cwd, "open-sse/services/combo.ts")];
const SCOPE_DIRS = [path.join(cwd, "open-sse/services/combo")];
const VOID_ASYNC_ALLOWLIST_PATH = path.join(cwd, "scripts/check/allowlist-void-async.json");
const SWALLOWED_CATCH_ALLOWLIST_PATH = path.join(
  cwd,
  "scripts/check/allowlist-routing-swallowed-catch.json"
);

const NO_EFFECT_MARKER = /\/\/\s*no-effect\s*:/;
const THROW_PATTERN = /\bthrow\b/;
const VOID_ASYNC_PATTERN = /\bvoid\s*\(\s*async\b/;
export const SNIPPET_MAX_LENGTH = 120;
export const VOID_ASYNC_ANCHOR_WINDOW = 25;

function stripStringsAndComments(source) {
  // Length-preserving mask: every string/comment char becomes a space (newlines
  // kept) so offsets and line numbers survive. Keyword scans use the masked copy;
  // marker reads and snippets use the raw slice at the same offsets.
  const chars = source.split("");
  const blank = (from, to) => {
    for (let i = from; i < to; i++) if (chars[i] !== "\n") chars[i] = " ";
  };
  let i = 0;
  while (i < chars.length) {
    const c = chars[i];
    const next = chars[i + 1];
    if (c === "/" && next === "/") {
      let j = i;
      while (j < chars.length && chars[j] !== "\n") j++;
      blank(i, j);
      i = j;
    } else if (c === "/" && next === "*") {
      const end = source.indexOf("*/", i + 2);
      const j = end === -1 ? chars.length : end + 2;
      blank(i, j);
      i = j;
    } else if (c === '"' || c === "'" || c === "`") {
      let j = i + 1;
      while (j < chars.length && (chars[j] !== c || chars[j - 1] === "\\") && chars[j] !== "\n")
        j++;
      blank(i, Math.min(j + 1, chars.length));
      i = Math.min(j + 1, chars.length);
    } else {
      i++;
    }
  }
  return chars.join("");
}

function skipBalanced(masked, i, open, close) {
  let depth = 0;
  while (i < masked.length) {
    if (masked[i] === open) depth++;
    else if (masked[i] === close) {
      depth--;
      if (depth === 0) return i;
    }
    i++;
  }
  return -1;
}

function findCatchBlocks(source) {
  const masked = stripStringsAndComments(source);
  const blocks = [];
  const catchKeyword = /\bcatch\b/g;
  let match;
  while ((match = catchKeyword.exec(masked)) !== null) {
    if (match.index > 0 && masked[match.index - 1] === ".") continue;
    let i = match.index + 5;
    while (i < masked.length && /\s/.test(masked[i])) i++;
    if (masked[i] === "(") {
      const closeParen = skipBalanced(masked, i, "(", ")");
      if (closeParen === -1) continue;
      i = closeParen + 1;
    }
    while (i < masked.length && /\s/.test(masked[i])) i++;
    if (masked[i] !== "{") continue;
    const end = skipBalanced(masked, i, "{", "}");
    if (end === -1) continue;
    blocks.push({
      line: source.slice(0, match.index).split("\n").length,
      body: source.slice(i + 1, end),
      maskedBody: masked.slice(i + 1, end),
    });
    catchKeyword.lastIndex = end + 1;
  }
  return blocks;
}

/** Line-independent identity of a catch body: whitespace-collapsed raw text, truncated. */
export function catchSnippet(body) {
  return body.replace(/\s+/g, " ").trim().slice(0, SNIPPET_MAX_LENGTH);
}

/** Every catch that neither rethrows nor carries a `// no-effect:` marker. */
export function collectSwallowedCatches(files) {
  const swallowed = [];
  for (const { path: rel, source } of files) {
    for (const block of findCatchBlocks(source)) {
      if (THROW_PATTERN.test(block.maskedBody)) continue;
      if (NO_EFFECT_MARKER.test(block.body)) continue;
      swallowed.push({ file: rel, line: block.line, snippet: catchSnippet(block.body) });
    }
  }
  return swallowed;
}

const entryKey = (file, snippet) => `${file} :: ${snippet}`;

/**
 * Compare live swallowed catches against the frozen allowlist.
 * @returns {{ violations: string[], stale: string[] }}
 */
export function evaluateSwallowedCatches(files, frozenEntries = []) {
  const allowed = new Map();
  for (const entry of frozenEntries) {
    allowed.set(entryKey(entry.file, entry.snippet), entry);
  }
  const live = new Map();
  for (const hit of collectSwallowedCatches(files)) {
    const key = entryKey(hit.file, hit.snippet);
    if (!live.has(key)) live.set(key, []);
    live.get(key).push(hit);
  }

  const violations = [];
  for (const [key, hits] of live) {
    const entry = allowed.get(key);
    const frozenCount = entry ? Number(entry.count ?? 1) : 0;
    if (entry && !String(entry.reason ?? "").trim()) {
      violations.push(`${hits[0].file}:${hits[0].line} :: swallowed-catch :: entry needs a reason`);
    }
    for (const hit of hits.slice(frozenCount)) {
      violations.push(
        `${hit.file}:${hit.line} :: swallowed-catch :: add 'throw' or '// no-effect: <motif>'` +
          (hit.snippet ? ` (body: ${hit.snippet})` : " (empty body)")
      );
    }
  }

  const stale = [];
  for (const [key, entry] of allowed) {
    const liveCount = live.get(key)?.length ?? 0;
    const frozenCount = Number(entry.count ?? 1);
    if (liveCount < frozenCount) {
      stale.push(`${key} (frozen ${frozenCount}, live ${liveCount})`);
    }
  }
  return { violations, stale };
}

/**
 * Rule B. An allowlist entry covers a `void (async` site only when its anchor appears
 * within VOID_ASYNC_ANCHOR_WINDOW lines of that site in the same file.
 * @returns {{ violations: string[], stale: string[] }}
 */
export function evaluateVoidAsyncSites(files, allowlist = []) {
  const violations = [];
  const used = new Set();
  for (const { path: rel, source } of files) {
    const lines = source.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (!VOID_ASYNC_PATTERN.test(lines[i])) continue;
      const window = lines.slice(i, i + VOID_ASYNC_ANCHOR_WINDOW).join("\n");
      const entry = allowlist.find(
        (candidate) => candidate.file === rel && window.includes(candidate.anchor)
      );
      if (!entry) {
        violations.push(
          `${rel}:${i + 1} :: void-async :: await the async work, attach a .catch, or add an allowlist entry`
        );
        continue;
      }
      used.add(entry);
      if (!String(entry.reason ?? "").trim()) {
        violations.push(`${rel}:${i + 1} :: void-async :: allowlist entry needs a reason`);
      }
    }
  }
  const stale = allowlist
    .filter((entry) => !used.has(entry))
    .map((entry) => `${entry.file} :: ${entry.anchor}`);
  return { violations, stale };
}

function loadEntries(allowlistPath) {
  const raw = JSON.parse(fs.readFileSync(allowlistPath, "utf8"));
  return raw.entries ?? raw;
}

function collectFiles() {
  const files = [];
  const push = (p) => {
    files.push({
      path: path.relative(cwd, p).replace(/\\/g, "/"),
      source: fs.readFileSync(p, "utf8"),
    });
  };
  for (const file of SCOPE_FILES) {
    if (fs.existsSync(file)) push(file);
  }
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (/\.tsx?$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) push(p);
    }
  };
  for (const dir of SCOPE_DIRS) walk(dir);
  return files;
}

function main() {
  const files = collectFiles();
  const catchEntries = loadEntries(SWALLOWED_CATCH_ALLOWLIST_PATH);
  const voidEntries = loadEntries(VOID_ASYNC_ALLOWLIST_PATH);
  const catches = evaluateSwallowedCatches(files, catchEntries);
  const voids = evaluateVoidAsyncSites(files, voidEntries);

  const violations = [...catches.violations, ...voids.violations];
  const stale = [...catches.stale, ...voids.stale];
  if (violations.length) {
    console.error(
      `[check-routing-error-guard] ${violations.length} violation(s) on routing paths:\n` +
        violations.map((v) => `  ✗ ${v}`).join("\n")
    );
  }
  if (stale.length) {
    console.error(
      `[check-routing-error-guard] ${stale.length} stale allowlist entr(y/ies) — the site was fixed or changed; shrink or remove the entry:\n` +
        stale.map((s) => `  ✗ ${s}`).join("\n")
    );
  }
  if (violations.length || stale.length) {
    process.exitCode = 1;
    return;
  }
  console.log(
    `[check-routing-error-guard] OK (${files.length} files scanned, ${catchEntries.length} frozen catch entries, ${voidEntries.length} void-async entries)`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
