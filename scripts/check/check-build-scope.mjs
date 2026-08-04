#!/usr/bin/env node
// check-build-scope.mjs — guards against worktrees / cruft leaking into the
// TypeScript build scope and poisoning `next build`.
//
// Root cause of the 2026-06-25 build OOM/GC-livelock incident: `tsconfig.json`
// uses `include: ["**/*.ts","**/*.tsx","**/*.js","**/*.jsx"]` (recursive glob),
// and 69 git worktrees under `.claude/worktrees/` were NOT in `exclude` — so the
// TS scope ballooned to 355,215 files (vs 4,547 real source files) and `next build`
// processed ~70x the codebase, OOMing even at a 64 GB heap. The CI built fine
// because its checkout is clean.
//
// This gate counts the .ts/.tsx/.js/.jsx files that tsconfig's include would match
// (respecting its top-level exclude dirs) and FAILS if the count exceeds a
// threshold — catching a leak BEFORE it detonates the build. Heap size is NOT the
// fix for an over-large scope; a clean scope is.
//
// Usage: node scripts/check/check-build-scope.mjs [--max N] [--json]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const args = process.argv.slice(2);
const MAX = Number(args[args.indexOf("--max") + 1]) || 12000;
const JSON_OUT = args.includes("--json");

const EXT = new Set([".ts", ".tsx", ".js", ".jsx"]);

// Read tsconfig.json exclude (the source of truth for what's out of scope).
const tsconfigPath = path.join(ROOT, "tsconfig.json");
let exclude = [];
try {
  exclude = JSON.parse(fs.readFileSync(tsconfigPath, "utf8")).exclude || [];
} catch {
  console.error("[build-scope] could not read tsconfig.json exclude — aborting");
  process.exit(2);
}
// Always skip VCS + the exclude dirs (normalise to bare top-level names).
const SKIP_DIRS = new Set([".git", ...exclude.map((e) => e.replace(/^\.\//, "").replace(/\/.*$/, ""))]);

let count = 0;
const byTop = {};
function walk(dir, top) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    if (e.isSymbolicLink()) continue; // don't follow symlinks (e.g. node_modules)
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      walk(full, top);
    } else if (EXT.has(path.extname(e.name))) {
      count++;
      byTop[top] = (byTop[top] || 0) + 1;
    }
  }
}

for (const e of fs.readdirSync(ROOT, { withFileTypes: true })) {
  if (!e.isDirectory()) {
    if (EXT.has(path.extname(e.name))) {
      count++;
      byTop["(root)"] = (byTop["(root)"] || 0) + 1;
    }
    continue;
  }
  if (SKIP_DIRS.has(e.name)) continue;
  walk(path.join(ROOT, e.name), e.name);
}

if (JSON_OUT) {
  console.log(JSON.stringify({ count, max: MAX, byTop }, null, 2));
} else {
  console.log(`[build-scope] ${count} .ts/.tsx/.js/.jsx files in tsconfig scope (max ${MAX})`);
  const top = Object.entries(byTop)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
  for (const [d, n] of top) console.log(`            ${String(n).padStart(7)}  ${d}`);
}

if (count > MAX) {
  console.error(
    `\n❌ [build-scope] scope of ${count} files exceeds ${MAX} — something is leaking into the\n` +
      `   tsconfig include scope (worktree, vendored copy, or build output). This poisons\n` +
      `   \`next build\` (OOM/GC-livelock). Add the offending dir to tsconfig.json "exclude"\n` +
      `   (and .dockerignore). Worktrees MUST live under .claude/worktrees/ (already excluded).\n` +
      `   Heap size does NOT fix this — a clean scope does. See incident 2026-06-25.`
  );
  process.exit(1);
}
console.log("✅ [build-scope] OK — no leak into the build scope.");
