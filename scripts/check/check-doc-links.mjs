#!/usr/bin/env node
/**
 * OmniRoute — internal documentation link checker.
 *
 * Scans every Markdown file under `docs/` (excluding mirrored translations,
 * screenshots, exported diagrams, and superpowers plans) for relative or
 * project-rooted internal links and verifies the referenced files exist on
 * disk. External URLs (http/https/mailto), telephone links, and pure
 * anchor-only links (#section) are ignored.
 *
 * Supported syntaxes:
 *   - Markdown links:     [label](path "optional title")
 *   - Reference links:    [label]: path "optional title"
 *   - HTML anchors:       <a href="path">
 *   - HTML image refs:    <img src="path">
 *
 * Usage:
 *   node scripts/check/check-doc-links.mjs            # strict (CI gate)
 *   node scripts/check/check-doc-links.mjs --report   # human report, exit 0
 *   node scripts/check/check-doc-links.mjs --json     # JSON to stdout
 *
 * Exit codes:
 *   0  ok (or --report mode)
 *   1  one or more broken internal links detected
 */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(SCRIPT_DIR, "..", "..");
const DOCS_ROOT = path.join(REPO_ROOT, "docs");

const EXCLUDE_PREFIXES = [
  path.join(DOCS_ROOT, "i18n") + path.sep,
  path.join(DOCS_ROOT, "screenshots") + path.sep,
  path.join(DOCS_ROOT, "superpowers") + path.sep,
  path.join(DOCS_ROOT, "diagrams", "exported") + path.sep,
];

function parseArgs(argv) {
  const opts = { report: false, json: false };
  for (const arg of argv.slice(2)) {
    if (arg === "--report") opts.report = true;
    else if (arg === "--json") opts.json = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(
        [
          "Usage: node scripts/check/check-doc-links.mjs [options]",
          "",
          "  --report   Print findings and exit 0 regardless",
          "  --json     Emit JSON report to stdout",
        ].join("\n")
      );
      process.exit(0);
    }
  }
  return opts;
}

function walkDocs(dir, out) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const prefixed = full + path.sep;
      if (EXCLUDE_PREFIXES.some((p) => prefixed.startsWith(p))) continue;
      walkDocs(full, out);
    } else if (entry.isFile() && full.endsWith(".md")) {
      if (EXCLUDE_PREFIXES.some((p) => full.startsWith(p))) continue;
      out.push(full);
    }
  }
}

function isExternal(target) {
  return (
    /^[a-z][a-z0-9+.-]*:/i.test(target) || // http:, https:, mailto:, tel:, data:, ftp: ...
    target.startsWith("//")
  );
}

function stripFragmentAndQuery(target) {
  let value = target;
  const hashAt = value.indexOf("#");
  if (hashAt !== -1) value = value.slice(0, hashAt);
  const queryAt = value.indexOf("?");
  if (queryAt !== -1) value = value.slice(0, queryAt);
  return value;
}

function extractLinks(content) {
  const links = [];
  // Strip fenced code blocks to avoid false positives.
  const sanitized = content.replace(/```[\s\S]*?```/g, (m) => " ".repeat(m.length));
  const lines = sanitized.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNumber = i + 1;

    // Markdown inline links: [text](target) — supports nested parens minimally.
    const inlineRe = /(!?)\[(?:[^\]]*)\]\(([^)\s]+(?:\s+"[^"]*")?)\)/g;
    let match;
    while ((match = inlineRe.exec(line)) !== null) {
      const raw = match[2].replace(/\s+"[^"]*"$/, "").trim();
      if (raw) links.push({ target: raw, line: lineNumber });
    }

    // Reference-style links: [label]: target  ("optional title")
    const refRe = /^\s{0,3}\[[^\]]+\]:\s+([^\s]+)(?:\s+"[^"]*")?\s*$/;
    const refMatch = line.match(refRe);
    if (refMatch) links.push({ target: refMatch[1], line: lineNumber });

    // HTML href / src
    const htmlRe = /\b(?:href|src)\s*=\s*"([^"]+)"/g;
    while ((match = htmlRe.exec(line)) !== null) {
      links.push({ target: match[1], line: lineNumber });
    }
  }

  return links;
}

function resolveTarget(sourceFile, target) {
  // /docs/foo.md, /foo, /reference/ENVIRONMENT.md → project-rooted.
  if (target.startsWith("/")) {
    return path.join(REPO_ROOT, target.replace(/^\/+/, ""));
  }
  // Otherwise resolve against the source file's directory.
  return path.resolve(path.dirname(sourceFile), target);
}

function probeExists(absPath) {
  if (fs.existsSync(absPath)) return true;
  // Allow links omitting `.md` (some doc viewers do this).
  if (!path.extname(absPath) && fs.existsSync(`${absPath}.md`)) return true;
  // Allow directory links resolving to an index/README.
  if (fs.existsSync(path.join(absPath, "README.md"))) return true;
  if (fs.existsSync(path.join(absPath, "index.md"))) return true;
  return false;
}

function main() {
  const opts = parseArgs(process.argv);

  if (!fs.existsSync(DOCS_ROOT)) {
    console.error("[doc-links] FAIL — docs/ directory not found");
    process.exit(1);
  }

  const files = [];
  walkDocs(DOCS_ROOT, files);

  /** @type {Array<{source:string, line:number, target:string, reason:string}>} */
  const broken = [];
  let checkedLinks = 0;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const links = extractLinks(content);
    for (const { target, line } of links) {
      if (!target) continue;
      if (target.startsWith("#")) continue; // anchor-only
      if (isExternal(target)) continue;
      const clean = stripFragmentAndQuery(target);
      if (!clean) continue; // e.g. "?query" alone — ignore
      checkedLinks++;
      const abs = resolveTarget(file, clean);
      if (!probeExists(abs)) {
        broken.push({
          source: path.relative(REPO_ROOT, file),
          line,
          target,
          reason: "missing",
        });
      }
    }
  }

  if (opts.json) {
    process.stdout.write(
      JSON.stringify(
        {
          ok: broken.length === 0,
          scannedFiles: files.length,
          checkedLinks,
          broken,
        },
        null,
        2
      ) + "\n"
    );
    process.exit(broken.length && !opts.report ? 1 : 0);
  }

  console.log(`[doc-links] scanned ${files.length} docs, checked ${checkedLinks} internal links`);

  if (broken.length === 0) {
    console.log("[doc-links] PASS — no broken internal links");
    process.exit(0);
  }

  // Group by source for readability.
  const bySource = new Map();
  for (const entry of broken) {
    if (!bySource.has(entry.source)) bySource.set(entry.source, []);
    bySource.get(entry.source).push(entry);
  }

  console.log(`[doc-links] FAIL — ${broken.length} broken link(s) in ${bySource.size} file(s):`);
  for (const [source, entries] of bySource) {
    console.log(`\n  ${source}`);
    for (const entry of entries) {
      console.log(`    line ${entry.line}: ${entry.target}`);
    }
  }

  process.exit(opts.report ? 0 : 1);
}

main();
