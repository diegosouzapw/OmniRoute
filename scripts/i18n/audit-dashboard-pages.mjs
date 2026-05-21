#!/usr/bin/env node
/**
 * Audit every dashboard page for:
 *   1. Hardcoded user-visible strings in JSX (any language)
 *   2. t("...") calls that reference keys NOT present in en.json
 *
 * Output: a JSON report at scripts/i18n/_audit.json + a human summary on stdout.
 *
 * Scope: src/app/(dashboard)/**\/*.tsx
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname, relative, basename } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..", "..");
const EN_JSON_PATH = join(REPO_ROOT, "src/i18n/messages/en.json");
const DASHBOARD_ROOT = join(REPO_ROOT, "src/app/(dashboard)");
const OUT_PATH = join(__dirname, "_audit.json");

const enJsonRaw = JSON.parse(readFileSync(EN_JSON_PATH, "utf8"));

/**
 * Deep-convert a parsed JSON object into a Map tree.
 * Using Map sidesteps prototype-pollution concerns when keys are
 * derived from source-code scraping (CWE-915).
 */
function toMapTree(value) {
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(toMapTree);
  const m = new Map();
  for (const [k, v] of Object.entries(value)) m.set(k, toMapTree(v));
  return m;
}
const enJson = toMapTree(enJsonRaw);

/** Walk a directory recursively and return all .tsx files */
function walkTsx(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walkTsx(full));
    else if (entry.endsWith(".tsx")) out.push(full);
  }
  return out;
}

/** Walk a dotted path through the Map tree, returning the leaf or undefined */
function walkPath(parts) {
  let cursor = enJson;
  for (const p of parts) {
    if (!(cursor instanceof Map) || !cursor.has(p)) return undefined;
    cursor = cursor.get(p);
  }
  return cursor;
}

/** Check if a dotted key exists, supporting dotted namespaces too */
function keyExists(namespace, key) {
  const nsParts = namespace ? namespace.split(".") : [];
  const keyParts = key.split(".");
  return walkPath([...nsParts, ...keyParts]) !== undefined;
}

/** Extract useTranslations("ns") and getTranslations("ns") calls */
function extractNamespaces(source) {
  const namespaces = [];
  const reNs = /(?:useTranslations|getTranslations)\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/g;
  for (const m of source.matchAll(reNs)) {
    namespaces.push(m[1]);
  }
  // Without arg: bare, key must be fully qualified
  if (/(?:useTranslations|getTranslations)\s*\(\s*\)/.test(source)) namespaces.push(null);
  return namespaces;
}

/** Extract every t("key", ...) and t.rich("key", ...) — capture the literal key only */
function extractTCalls(source) {
  const out = new Set();
  // t("..."), t('...') — match only quoted string literals (skip template literals)
  const re = /\bt(?:Or[A-Z][A-Za-z]*)?(?:\.\w+)?\s*\(\s*["']([^"']+)["']/g;
  for (const m of source.matchAll(re)) out.add(m[1]);
  // translateOrFallback("key", fallback) — also t("key") style
  for (const m of source.matchAll(/translateOrFallback\s*\(\s*["']([^"']+)["']/g)) {
    out.add(m[1]);
  }
  return [...out];
}

/**
 * Find candidate hardcoded user-visible strings in JSX.
 *
 * Patterns we detect:
 *  A. JSX text:   >Some text<       (must contain a letter, length >= 2)
 *  B. JSX attrs:  title="..."  placeholder="..."  aria-label="..."  alt="..."
 *  C. Toast/error literals:   toast.error("...")  toast.success("...")
 *
 * We DELIBERATELY skip:
 *  - strings inside {t(...)} or {tOrFallback(...)}
 *  - strings inside import statements
 *  - strings inside CSS class names (className/style)
 *  - URLs (start with /, http, mailto:, #)
 *  - All-uppercase/snake constants (CONSTANT_VAR)
 *  - pure-symbol strings (no letters)
 *  - lonely-word JSX text that is a console.log / pino call argument
 */
// TS / JS noise that the naive regex picks up between two `>` chars
const TS_TYPE_NOISE = new Set([
  "Promise",
  "Record",
  "Map",
  "Set",
  "Array",
  "ReadonlyArray",
  "Partial",
  "Pick",
  "Omit",
  "Required",
  "Readonly",
  "Awaited",
  "ReturnType",
  "Parameters",
  "void | Promise",
  "Promise | undefined",
]);

function findHardcodedStrings(source) {
  const findings = [];
  const lines = source.split("\n");

  // (A) JSX text between > and <  — fragile but good enough for an audit pass
  let lineIdx = 0;
  for (const line of lines) {
    lineIdx++;
    // Skip obvious non-JSX lines (imports, single-line comments, JSDoc lines)
    if (
      /^\s*(import|export\s+(type|interface)|\/\/|\*|\/\*|type\s+\w+\s*=|interface\s+)/.test(line)
    )
      continue;
    // Skip lines that are *clearly* TypeScript signatures
    if (
      /:\s*(Promise|Record|Map|Set|Array|Partial|Pick|Omit|Required|Readonly|Awaited)\s*</.test(
        line
      )
    )
      continue;
    // Neutralise arrow functions and TS generics that confuse the regex
    const safe = line
      .replace(/=>/g, "__ARROW__")
      .replace(/<\/?\w[\w.-]*\s*\/?>/g, (m) => m) // keep JSX tags
      .replace(/<\w[\w.,?:|\s]*?>/g, "__GEN__"); // strip TS generics like <T> or <T, U>

    let m;
    const re = />([^<>{}\n]+)</g;
    while ((m = re.exec(safe)) !== null) {
      const raw = m[1].trim();
      if (!raw) continue;
      if (!/[A-Za-zÀ-ÿ一-鿿Ѐ-ӿ֐-׿؀-ۿ]/.test(raw)) continue;
      if (raw.length < 2) continue;
      if (raw.startsWith("{") || raw.endsWith("}")) continue;
      if (/^[A-Z0-9_]+$/.test(raw)) continue; // CONSTANT
      if (/^(https?:\/\/|\/|mailto:|#)/.test(raw)) continue; // URL/path
      if (/^[a-z][a-z_0-9]*$/.test(raw) && raw.length < 22) continue; // icon/id slug
      if (TS_TYPE_NOISE.has(raw)) continue;
      // operator/expression debris like "0 && foo.size", "x !== y"
      if (/(&&|\|\||==|!=|<=|>=|=>|\?\s*:|\?\.|\.\w+\()/.test(raw)) continue;
      // pure number or simple variable.member with no spaces
      if (/^[\w.]+$/.test(raw) && !raw.includes(" ")) continue;
      findings.push({ kind: "jsx-text", line: lineIdx, value: raw });
    }
  }

  // (B) JSX attributes that are user-visible
  const attrRe = /\b(title|placeholder|aria-label|alt|label)\s*=\s*["'`]([^"'`{}\n]{2,})["'`]/g;
  lineIdx = 0;
  for (const line of lines) {
    lineIdx++;
    if (/^\s*(import|\/\/|\*|\/\*)/.test(line)) continue;
    let m;
    const re = new RegExp(attrRe.source, "g");
    while ((m = re.exec(line)) !== null) {
      const value = m[2].trim();
      if (!/[A-Za-zÀ-ÿ一-鿿]/.test(value)) continue;
      if (/^[a-z][a-z_0-9-]*$/.test(value) && value.length < 16) continue; // probably an id/key
      findings.push({ kind: `attr:${m[1]}`, line: lineIdx, value });
    }
  }

  // (C) toast.* and Error() arguments that look like user copy (length > 5, has a space)
  lineIdx = 0;
  const callRe =
    /\b(toast\.(error|success|info|warn|warning|message))\s*\(\s*["'`]([^"'`]{3,})["'`]/g;
  for (const line of lines) {
    lineIdx++;
    let m;
    const re = new RegExp(callRe.source, "g");
    while ((m = re.exec(line)) !== null) {
      findings.push({ kind: `toast:${m[2]}`, line: lineIdx, value: m[3].trim() });
    }
  }

  return findings;
}

/** Find t() calls whose key does NOT exist in en.json */
function findMissingKeys(namespaces, tKeys) {
  const missing = [];
  for (const key of tKeys) {
    // A key may itself contain dots — handle namespace dotted into key
    let found = false;
    for (const ns of namespaces) {
      if (keyExists(ns, key)) {
        found = true;
        break;
      }
    }
    // Also accept fully qualified bare-namespace keys (like "common.foo" with no useTranslations)
    if (!found && key.includes(".")) {
      const [maybeNs, ...rest] = key.split(".");
      if (keyExists(maybeNs, rest.join("."))) found = true;
    }
    if (!found) missing.push(key);
  }
  return missing;
}

const files = walkTsx(DASHBOARD_ROOT);
const report = [];

for (const file of files) {
  const rel = relative(REPO_ROOT, file);
  const src = readFileSync(file, "utf8");
  const namespaces = extractNamespaces(src);
  const tCalls = extractTCalls(src);
  const hardcoded = findHardcodedStrings(src);
  const missing = findMissingKeys(namespaces.length ? namespaces : [null], tCalls);
  // Only include files that have ANY user-visible content
  if (!namespaces.length && !tCalls.length && !hardcoded.length) continue;
  report.push({
    file: rel,
    namespaces,
    tCallCount: tCalls.length,
    missingKeys: missing,
    hardcodedCount: hardcoded.length,
    hardcoded,
  });
}

writeFileSync(OUT_PATH, JSON.stringify(report, null, 2));

// Human summary
let totalMissing = 0;
let totalHardcoded = 0;
console.log("# i18n audit — dashboard pages\n");
console.log(`Scanned ${report.length} files with user-visible content.\n`);
const onlyIssues = report
  .map((r) => ({ ...r, total: r.missingKeys.length + r.hardcoded.length }))
  .filter((r) => r.total > 0)
  .sort((a, b) => b.total - a.total);

for (const r of onlyIssues) {
  totalMissing += r.missingKeys.length;
  totalHardcoded += r.hardcoded.length;
  console.log(`\n## ${r.file}`);
  console.log(`   ns=${JSON.stringify(r.namespaces)}  t() calls=${r.tCallCount}`);
  if (r.missingKeys.length) {
    console.log(`   ✗ missing keys (${r.missingKeys.length}):`);
    for (const k of r.missingKeys) console.log(`       - ${k}`);
  }
  if (r.hardcoded.length) {
    console.log(`   ✗ hardcoded strings (${r.hardcoded.length}):`);
    for (const h of r.hardcoded.slice(0, 30)) {
      console.log(`       L${h.line} [${h.kind}] ${JSON.stringify(h.value)}`);
    }
    if (r.hardcoded.length > 30) console.log(`       ... (+${r.hardcoded.length - 30} more)`);
  }
}

console.log(`\n# Summary`);
console.log(`Files with issues:    ${onlyIssues.length}`);
console.log(`Missing keys total:   ${totalMissing}`);
console.log(`Hardcoded strings:    ${totalHardcoded}`);
console.log(`Report file:          ${relative(REPO_ROOT, OUT_PATH)}`);
