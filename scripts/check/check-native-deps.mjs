#!/usr/bin/env node
// scripts/check/check-native-deps.mjs
//
// Preflight gate: every package listed in `serverExternalPackages` must be
// RESOLVABLE before the Next.js build starts.
//
// Why this gate exists
// --------------------
// npm 11 (bundled with Node 24+) refuses to run install scripts for OPTIONAL
// dependencies unless they are approved. `better-sqlite3` is an
// optionalDependency whose install script compiles a native addon, so npm skips
// it, removes it from the tree, and still exits 0. Nothing in the install output
// says the package is gone.
//
// The build then dies several minutes later with:
//
//     Error: Module not found: Can't resolve 'better-sqlite3'
//
// which reads like a code error rather than an install one. `serverExternalPackages`
// does not save it: Turbopack has to RESOLVE a request before it can decide to
// externalise it, so an absent package is a hard build failure, not a no-op.
//
// This check turns that four-minute mystery into a one-second message naming the
// package and the fix. It only considers packages that are BOTH externalised and
// declared optional — a required dependency that is missing means `npm install`
// never ran, which every other part of the build already reports clearly.
//
// Escape hatch: OMNIROUTE_SKIP_NATIVE_DEP_CHECK=1 (for exotic vendored trees).
//
// See: docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { pathToFileURL } from "node:url";

const ROOT = process.cwd();

/**
 * Extract the `serverExternalPackages` string literals from next.config.mjs
 * source text.
 *
 * Parsed rather than imported: next.config.mjs pulls in the next-intl and
 * fumadocs-mdx plugins at module scope, so importing it from a preflight script
 * would need the very dependency tree this gate is meant to validate. A regex
 * over the array literal has no such bootstrap problem.
 *
 * Comment lines inside the array are ignored, so the documentation the repo keeps
 * between entries never leaks in as a package name.
 *
 * @param {string} source - contents of next.config.mjs
 * @returns {string[]} package names, in declaration order
 */
export function extractServerExternalPackages(source) {
  // Match the PROPERTY, not the word. next.config.mjs discusses
  // `serverExternalPackages` in a prose comment ~130 lines above the real
  // declaration (the #11343 note about resolveAlias winning over externals); a
  // bare indexOf lands on that comment and then grabs whichever array literal
  // comes next, which is a different key entirely.
  const decl = /(^|[\s{,;])serverExternalPackages\s*:\s*\[/m.exec(source);
  if (!decl) return [];

  const open = source.indexOf("[", decl.index);
  if (open === -1) return [];

  let depth = 0;
  let close = -1;
  for (let i = open; i < source.length; i++) {
    if (source[i] === "[") depth++;
    else if (source[i] === "]") {
      depth--;
      if (depth === 0) {
        close = i;
        break;
      }
    }
  }
  if (close === -1) return [];

  const body = source.slice(open + 1, close);
  const names = [];

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("//") || line.startsWith("*")) continue;
    // Drop any trailing line comment before harvesting literals, so a quoted word
    // inside an explanatory comment is never mistaken for a package name. No package
    // name contains "//", which makes this split safe.
    const code = line.split("//")[0];
    for (const match of code.matchAll(/["'`]([^"'`]+)["'`]/g)) names.push(match[1]);
  }

  return names;
}

/**
 * Is `name` resolvable from `rootDir`?
 *
 * Two probes, because neither alone is sufficient: the node_modules path check
 * misses packages hoisted elsewhere in a workspace, and require.resolve misses
 * packages whose `exports` map does not expose ./package.json.
 *
 * @param {string} name
 * @param {string} rootDir
 * @returns {boolean}
 */
export function isPackageResolvable(name, rootDir = ROOT) {
  if (fs.existsSync(path.join(rootDir, "node_modules", name, "package.json"))) return true;
  try {
    createRequire(path.join(rootDir, "package.json")).resolve(`${name}/package.json`);
    return true;
  } catch {
    return false;
  }
}

/**
 * Packages the build will fail to resolve: externalised, declared optional, absent.
 *
 * Restricted to optionalDependencies on purpose. Those are the only ones npm can
 * drop silently; a missing *required* dependency means install never ran, and that
 * is already obvious from every other failure it causes.
 *
 * @param {{externals: string[], optionalDeps: string[], rootDir?: string, resolver?: (n: string, r: string) => boolean}} input
 * @returns {string[]}
 */
export function findMissingExternals({
  externals,
  optionalDeps,
  rootDir = ROOT,
  resolver = isPackageResolvable,
}) {
  const optional = new Set(optionalDeps);
  return externals.filter((name) => optional.has(name) && !resolver(name, rootDir));
}

/**
 * Human-facing report for the missing packages. Returns "" when nothing is missing,
 * so callers can treat a falsy result as "all good".
 *
 * @param {string[]} missing
 * @returns {string}
 */
export function formatMissingReport(missing) {
  if (!missing.length) return "";

  const list = missing.map((n) => `  • ${n}`).join("\n");
  return [
    "[check-native-deps] FAIL — packages required by the build are not installed:",
    "",
    list,
    "",
    "These are optionalDependencies that npm skipped. npm 11 blocks install scripts",
    "for optional dependencies by default, drops the package, and still exits 0 — so",
    "`npm install` looked like it succeeded.",
    "",
    "They cannot simply be ignored: each one is listed in serverExternalPackages, and",
    "the bundler must resolve a request before it can externalise it. Without them the",
    "build fails with \"Module not found\" several minutes from now.",
    "",
    "Fix (any one of these):",
    `  1. npm install ${missing.join(" ")} --no-save --foreground-scripts`,
    `  2. npm approve-scripts ${missing.join(" ")} && npm install`,
    "  3. ./start.sh reinstall     (Linux/macOS)",
    "     START.cmd reinstall      (Windows)",
    "",
    "If the install fails on a missing C++ toolchain:",
    "  Linux   apt install build-essential python3",
    "  macOS   xcode-select --install",
    "  Windows Build Tools for Visual Studio (Desktop development with C++) + Python",
    "",
    "More detail: docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module",
    "",
    "Escape hatch for vendored trees: OMNIROUTE_SKIP_NATIVE_DEP_CHECK=1",
  ].join("\n");
}

function main() {
  if (process.env.OMNIROUTE_SKIP_NATIVE_DEP_CHECK === "1") {
    console.log("[check-native-deps] skipped (OMNIROUTE_SKIP_NATIVE_DEP_CHECK=1)");
    return;
  }

  const configPath = path.join(ROOT, "next.config.mjs");
  const pkgPath = path.join(ROOT, "package.json");

  if (!fs.existsSync(configPath) || !fs.existsSync(pkgPath)) {
    // Not a shape this gate understands. Never block a build over that.
    console.log("[check-native-deps] skipped (next.config.mjs or package.json not found)");
    return;
  }

  const externals = extractServerExternalPackages(fs.readFileSync(configPath, "utf8"));
  if (!externals.length) {
    console.log("[check-native-deps] skipped (no serverExternalPackages found)");
    return;
  }

  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const optionalDeps = Object.keys(pkg.optionalDependencies ?? {});

  const missing = findMissingExternals({ externals, optionalDeps, rootDir: ROOT });

  if (missing.length) {
    console.error(formatMissingReport(missing));
    process.exit(1);
  }

  console.log(
    `[check-native-deps] OK — all ${externals.length} externalised packages resolve ` +
      `(${optionalDeps.length} optional deps checked).`
  );
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
