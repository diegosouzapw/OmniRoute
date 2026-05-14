#!/usr/bin/env node
// Detects hardcoded old versions / stale dates in docs that should follow the current release.
// Uses hardcoded regexes to avoid dynamic RegExp() (ReDoS concern flagged by semgrep).
// Exits 0 if clean, 1 (in --strict mode) if drift detected.
//
// Run: node scripts/check/check-deprecated-versions.mjs
// Strict: node scripts/check/check-deprecated-versions.mjs --strict

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const DOCS_DIR = path.join(ROOT, "docs");
const PKG_JSON = path.join(ROOT, "package.json");
const STRICT = process.argv.includes("--strict");

function currentVersion() {
  try {
    return JSON.parse(fs.readFileSync(PKG_JSON, "utf8")).version || "0.0.0";
  } catch {
    return "0.0.0";
  }
}

// Hardcoded set of obviously-stale version patterns. Update when bumping major/minor.
// These match any version <= v3.6.x or any pre-3 major.
const STALE_VERSION_PATTERNS = [
  /\bv?[12]\.\d+\.\d+\b/, // 1.x.x / 2.x.x
  /\bv?3\.[0-6]\.\d+\b/, // 3.0.x..3.6.x
];

const SAFE_CONTEXTS =
  /(historical|archive|legacy|previously|deprecated|since|introduced|was|originally|fix|fixed)/i;

// Dates older than 60 days are considered stale for "Last updated" / "Last consolidated".
const STALE_DATE_DAYS = 60;
const today = new Date();

const LAST_UPDATED_RE = /Last (?:updated|consolidated|generated)[^\d]{0,30}(\d{4}-\d{2}-\d{2})/i;

function isStaleDate(yyyy_mm_dd) {
  const d = new Date(yyyy_mm_dd);
  if (Number.isNaN(d.getTime())) return false;
  const ageDays = (today - d) / (1000 * 60 * 60 * 24);
  return ageDays > STALE_DATE_DAYS;
}

const IGNORED_DIRS = new Set(["archive", "i18n", "superpowers"]);
const IGNORED_BASENAMES = new Set(["CHANGELOG.md", "RFC-AUTO-ASSESSMENT-DRAFT.md"]);

function walkDocs(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (IGNORED_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkDocs(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      if (IGNORED_BASENAMES.has(entry.name)) continue;
      out.push(full);
    }
  }
  return out;
}

function main() {
  const cur = currentVersion();
  console.log(`Version drift report (current: v${cur})`);
  console.log("=".repeat(40));

  const files = walkDocs(DOCS_DIR);
  let drift = 0;

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const txt = fs.readFileSync(file, "utf8");
    const lines = txt.split("\n");
    const issues = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.length > 500) continue; // skip very long lines (likely code blocks / data)

      // 1. Stale version refs
      for (const re of STALE_VERSION_PATTERNS) {
        const m = re.exec(line);
        if (m && !SAFE_CONTEXTS.test(line)) {
          issues.push({
            line: i + 1,
            type: "stale-version",
            match: m[0],
            text: line.trim().slice(0, 100),
          });
          break;
        }
      }
      // 2. Stale "Last updated/consolidated/generated" dates
      const dateMatch = LAST_UPDATED_RE.exec(line);
      if (dateMatch && isStaleDate(dateMatch[1])) {
        issues.push({
          line: i + 1,
          type: "stale-date",
          match: dateMatch[1],
          text: line.trim().slice(0, 100),
        });
      }
    }

    if (issues.length > 0) {
      console.log(`\n  ${rel}`);
      for (const iss of issues.slice(0, 5)) {
        console.log(`    L${iss.line} [${iss.type}] ${iss.match}: ${iss.text}`);
      }
      if (issues.length > 5) console.log(`    ... and ${issues.length - 5} more`);
      drift += issues.length;
    }
  }

  console.log();
  if (drift > 0) {
    console.warn(`⚠ ${drift} potential drift(s) detected across ${files.length} doc files.`);
    if (STRICT) process.exit(1);
  } else {
    console.log(`✓ No drift detected across ${files.length} doc files.`);
  }
}

main();
