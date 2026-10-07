#!/usr/bin/env node
/**
 * Validates the frontmatter of every Markdown file that fumadocs-mdx compiles.
 *
 * Why this gate exists: `source.config.ts` feeds `docs/**` globs to
 * `defineDocs()`, and fumadocs' default frontmatter schema REQUIRES a `title`
 * string. A doc added without frontmatter does not fail any docs gate — it
 * fails the **production build** with a generic Turbopack error
 * (`[MDX] invalid frontmatter … title: Invalid input: expected string,
 * received undefined`), which then cascades into `check:pack-artifact` and the
 * tarball boot-smoke. That is exactly how #12478 turned the release branch red
 * (base-red #12581): one new reference doc, no frontmatter, three failing
 * gates and an unbuildable branch.
 *
 * Catching it here costs milliseconds instead of a full Next build.
 *
 * The globs are read from `source.config.ts` rather than duplicated, so adding
 * a new docs directory there cannot silently escape this check.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const CONFIG_PATH = path.join(ROOT, "source.config.ts");

/** Extract the `files: [...]` globs declared in source.config.ts. */
function readConfiguredGlobs() {
  const src = fs.readFileSync(CONFIG_PATH, "utf-8");
  const block = src.match(/files\s*:\s*\[([\s\S]*?)\]/);
  if (!block) {
    console.error(
      "[docs-frontmatter] FAIL — could not locate the `files:` globs in source.config.ts"
    );
    process.exit(1);
  }
  const globs = [...block[1].matchAll(/["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
  if (globs.length === 0) {
    console.error("[docs-frontmatter] FAIL — source.config.ts declares no doc globs");
    process.exit(1);
  }
  return globs;
}

/** "./reference/**\/*.md" -> the directory under docs/ it covers. */
function globToDir(glob) {
  const cleaned = glob.replace(/^\.\//, "");
  const dir = cleaned.split("/**")[0];
  return path.join(ROOT, "docs", dir);
}

function walkMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkMarkdown(full));
    else if (entry.isFile() && entry.name.endsWith(".md")) out.push(full);
  }
  return out;
}

const violations = [];
const files = [...new Set(readConfiguredGlobs().flatMap((g) => walkMarkdown(globToDir(g))))];

for (const file of files) {
  const rel = path.relative(ROOT, file);
  const text = fs.readFileSync(file, "utf-8");

  if (!text.startsWith("---")) {
    violations.push(`${rel}: no frontmatter block (fumadocs requires a \`title\`)`);
    continue;
  }
  const end = text.indexOf("\n---", 3);
  if (end === -1) {
    violations.push(`${rel}: frontmatter block is never closed`);
    continue;
  }
  const frontmatter = text.slice(3, end);
  const title = frontmatter.match(/^\s*title\s*:\s*(.+)$/m);
  if (!title) {
    violations.push(`${rel}: frontmatter has no \`title\``);
  } else if (title[1].trim().replace(/^["']|["']$/g, "") === "") {
    violations.push(`${rel}: \`title\` is empty`);
  }
}

if (violations.length > 0) {
  console.error(
    `[docs-frontmatter] FAIL — ${violations.length} doc(s) would break the Next build:`
  );
  for (const v of violations) console.error(`  - ${v}`);
  console.error(
    "\nEvery Markdown file matched by source.config.ts is compiled by fumadocs-mdx and needs a\n" +
      'frontmatter block with a title, e.g.:\n\n---\ntitle: "Removed Providers"\nversion: 3.8.51\nlastUpdated: 2026-09-03\n---\n'
  );
  process.exit(1);
}

console.log(
  `[docs-frontmatter] OK — ${files.length} compiled doc(s) carry a valid frontmatter title.`
);
