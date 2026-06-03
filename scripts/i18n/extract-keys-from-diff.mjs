#!/usr/bin/env node
/**
 * Extract NEW i18n keys created by subagents from git diff.
 *
 * For each modified .tsx file, walk the unified diff and pair "-" lines
 * (containing literal English text) with their following "+" lines
 * (now using `t("key")`). When we find a stable pairing, record the key
 * and its original English value.
 *
 * The output is a per-namespace map ready to merge into en.json.
 */
import { execSync } from "node:child_process";

const diff = execSync('git diff --unified=0 "src/app/(dashboard)"', {
  encoding: "utf8",
  maxBuffer: 32 * 1024 * 1024,
});

const blocks = diff.split(/^diff --git /m).slice(1);

const allPairs = []; // { file, removed, added }

for (const block of blocks) {
  const headLine = block.split("\n")[0];
  const fileMatch = headLine.match(/b\/(.+?)$/);
  const file = fileMatch ? fileMatch[1] : "?";
  const lines = block.split("\n");

  // Walk in groups: consecutive "-" lines, then consecutive "+" lines.
  // Pair them positionally (removed[i] ↔ added[i]).
  let removed = [];
  let added = [];
  function flush() {
    const n = Math.min(removed.length, added.length);
    for (let i = 0; i < n; i++) allPairs.push({ file, removed: removed[i], added: added[i] });
    // If removed.length > added.length, pair remaining removed with last added (multi-string in one new line)
    if (removed.length > added.length && added.length > 0) {
      for (let i = added.length; i < removed.length; i++) {
        allPairs.push({ file, removed: removed[i], added: added[added.length - 1] });
      }
    }
    removed = [];
    added = [];
  }
  for (const line of lines) {
    if (line.startsWith("---") || line.startsWith("+++")) continue;
    if (line.startsWith("-")) {
      if (added.length) flush();
      removed.push(line.slice(1));
    } else if (line.startsWith("+")) {
      added.push(line.slice(1));
    } else {
      flush();
    }
  }
  flush();
}

/** Patterns inside JSX or attribute strings */
const T_CALL_RE = /\bt\(\s*["']([^"']+)["']\s*\)/g;
const JSX_TEXT_RE = />([^<>{}\n]+)</g;
const ATTR_RE = /\b(?:title|placeholder|aria-label|alt|label)\s*=\s*["']([^"']+)["']/g;

const newKeys = new Map(); // key -> { value, file }

function recordKey(key, value, file) {
  const trimmed = value.trim();
  if (!trimmed) return;
  // Ignore if value contains JSX expression syntax — those were dynamic
  if (/^\{|\}$/.test(trimmed)) return;
  if (!newKeys.has(key)) {
    newKeys.set(key, { value: trimmed, file });
  }
}

for (const { file, removed, added } of allPairs) {
  // Extract every t("xxx") key from the "added" line
  const tKeys = [...added.matchAll(T_CALL_RE)].map((m) => m[1]);
  if (!tKeys.length) continue;

  // Extract candidate strings from the "removed" line: JSX text + attr values
  const candidates = [];
  for (const m of removed.matchAll(JSX_TEXT_RE)) candidates.push(m[1]);
  for (const m of removed.matchAll(ATTR_RE)) candidates.push(m[1]);

  // Direct strings without surrounding markup (rare)
  // Apply tag removal repeatedly until stable to prevent incomplete sanitization
  // (e.g. "<scr<script>ipt>" collapsing into "<script>" after a single pass)
  let stripped = removed;
  let prev;
  do {
    prev = stripped;
    stripped = stripped.replace(/<[^<>]+>/g, "");
  } while (stripped !== prev);
  stripped = stripped.replace(/\bt\([^)]*\)/g, "").trim();
  if (stripped && /[A-Za-z]/.test(stripped)) candidates.push(stripped);

  // For each tKey in added, try to align with the candidate at the same index.
  // The agents typically replaced strings in the same left-to-right order.
  for (let i = 0; i < tKeys.length; i++) {
    const candidate = candidates[i] ?? candidates[candidates.length - 1];
    if (!candidate) continue;
    recordKey(tKeys[i], candidate, file);
  }
}

// Group by file's primary namespace via useTranslations() call in file
import { readFileSync } from "node:fs";
function inferNamespaceForFile(file) {
  try {
    const src = readFileSync(file, "utf8");
    const m = src.match(/useTranslations\s*\(\s*["']([^"']+)["']\s*\)/);
    return m?.[1] ?? "common";
  } catch {
    return "common";
  }
}

const byNamespace = new Map();
for (const [key, { value, file }] of newKeys) {
  const ns = inferNamespaceForFile(file);
  if (!byNamespace.has(ns)) byNamespace.set(ns, []);
  byNamespace.get(ns).push({ key, value });
}

for (const [ns, items] of byNamespace) {
  console.log(`\nNEW_KEYS_FOR_NAMESPACE: ${ns}`);
  console.log("{");
  for (const { key, value } of items) {
    // Escape value for JSON
    console.log(`  ${JSON.stringify(key)}: ${JSON.stringify(value)},`);
  }
  console.log("}");
}
console.log(`\nTotal extracted: ${newKeys.size} keys across ${byNamespace.size} namespaces`);
