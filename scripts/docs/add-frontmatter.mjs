#!/usr/bin/env node
/**
 * add-frontmatter.mjs — one-shot helper that ensures every documentation
 * file under docs/<sub>/*.md and docs/README.md has a YAML frontmatter
 * header with `title`, `version`, and `lastUpdated`.
 *
 * Idempotent: docs that already have a `---` block at the top are skipped
 * (the existing frontmatter is preserved as-is). Files without a leading
 * `# Title` heading fall back to the basename humanized as a title.
 *
 * Excludes: docs/i18n/, docs/screenshots/, docs/superpowers/,
 *           docs/diagrams/exported/. Subfolder READMEs are included.
 *
 * Usage: node scripts/docs/add-frontmatter.mjs [--version X.Y.Z] [--date YYYY-MM-DD]
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, "..", "..");
const DOCS_DIR = path.join(ROOT, "docs");

const EXCLUDE_PREFIXES = [
  "docs/i18n/",
  "docs/screenshots/",
  "docs/superpowers/",
  "docs/diagrams/exported/",
];

const args = process.argv.slice(2);
let version = "3.8.0";
let lastUpdated = "2026-05-13";
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === "--version" && args[i + 1]) {
    version = args[i + 1];
    i += 1;
  } else if (args[i] === "--date" && args[i + 1]) {
    lastUpdated = args[i + 1];
    i += 1;
  }
}

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, files);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full);
    }
  }
  return files;
}

function isExcluded(rel) {
  return EXCLUDE_PREFIXES.some((p) => rel === p || rel.startsWith(p));
}

function hasFrontmatter(content) {
  return /^---\r?\n/.test(content);
}

function extractTopHeading(content) {
  const lines = content.replace(/^﻿/, "").split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^#\s+(.+?)\s*$/);
    if (m) return m[1].trim();
    // Allow blank/HTML-comment lines before the first heading
    if (line.trim() === "" || /^<!--/.test(line.trim())) continue;
    // Anything else (e.g. badge image, paragraph) — no usable heading
    return null;
  }
  return null;
}

function humanizeBasename(filePath) {
  const base = path.basename(filePath, ".md");
  if (base.toLowerCase() === "readme") {
    const parent = path.basename(path.dirname(filePath));
    if (parent && parent !== "." && parent !== "docs") {
      const cap = parent.charAt(0).toUpperCase() + parent.slice(1);
      return `${cap} Docs`;
    }
    return "Documentation";
  }
  return base
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function buildFrontmatter(title) {
  // Quote title with double quotes; escape backslashes first, then double quotes.
  const safe = title.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return [
    `---`,
    `title: "${safe}"`,
    `version: ${version}`,
    `lastUpdated: ${lastUpdated}`,
    `---`,
    ``,
  ].join("\n");
}

async function main() {
  const allFiles = await walk(DOCS_DIR);
  const targets = allFiles
    .map((abs) => ({ abs, rel: path.relative(ROOT, abs).replace(/\\/g, "/") }))
    .filter(({ rel }) => !isExcluded(rel));

  let added = 0;
  let skipped = 0;
  let noHeading = [];

  for (const { abs, rel } of targets) {
    const content = await fs.readFile(abs, "utf8");
    if (hasFrontmatter(content)) {
      skipped += 1;
      continue;
    }
    let title = extractTopHeading(content);
    if (!title) {
      title = humanizeBasename(abs);
      noHeading.push(rel);
    }
    const fm = buildFrontmatter(title);
    const next = `${fm}\n${content.replace(/^﻿/, "")}`;
    await fs.writeFile(abs, next, "utf8");
    added += 1;
    console.log(`[add-frontmatter] added → ${rel}`);
  }

  console.log(`[add-frontmatter] done — added=${added} skipped=${skipped} total=${targets.length}`);
  if (noHeading.length > 0) {
    console.log(
      `[add-frontmatter] fallback title used (no leading H1) for: ${noHeading.join(", ")}`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
