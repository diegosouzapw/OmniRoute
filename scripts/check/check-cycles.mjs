#!/usr/bin/env node
// scripts/check/check-cycles.mjs
// Gate: intra-repo import cycles (strongly connected components of the module graph).
//
// #15159 / G-01 — this gate used to print a FALSE GREEN. It reported
// "no cycles detected across 450 files" while being structurally unable to see
// most of the repository. Three independent blinds:
//
//   1. `defaultRoots` was five directories (`src/shared/components`, `src/lib/db`,
//      `src/lib/compliance`, `open-sse/translator`, `open-sse/mcp-server`) instead
//      of the two source trees. `src/lib/config`, `src/app`, `open-sse/services`,
//      `open-sse/handlers` … were never scanned. On a checkout without those five
//      directories it scanned **0 files** and still printed OK.
//   2. The specifier regex matched `import|export … from` only. Every dynamic
//      `import("…")` was invisible.
//   3. `if (!specifier.startsWith(".")) continue` dropped every `@/` and
//      `@omniroute/open-sse/` alias edge, i.e. most of the repo's own imports.
//
// Live casualty: `src/lib/db/settings.ts:359` does
// `await import("@/lib/config/runtimeSettings")`, and runtimeSettings imports
// settings back. check-circular-deps.mjs (dpdm, which resolves tsconfig paths)
// reports it as a real cycle; this gate could never have found it.
//
// The fix: walk the two real source trees, resolve tsconfig `paths` aliases, and
// collect specifiers from the TypeScript AST so dynamic `import()` is counted while
// type-position `typeof import("…")` is not (a regex cannot tell those apart, and
// counting them invents cycles that do not exist at runtime).
//
// Cycle count is a ratchet, not a hard zero: see config/quality/quality-baseline.json
// → metrics.cycles (G-02). Plain mode blocks on ANY cycle; `--ratchet` blocks only
// above the ceiling (fail-closed: a missing/invalid baseline also blocks).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Two source trees, not five directories. Anything else (`bin/`, `scripts/`,
// `electron/`) is tooling, not the module graph this gate polices.
export const DEFAULT_ROOTS = ["src", "open-sse"];

const SOURCE_EXTENSIONS = [".ts", ".tsx", ".mts", ".cts", ".js", ".jsx", ".mjs"];
const IGNORED_DIRS = new Set([
  "node_modules",
  ".next",
  ".git",
  "dist",
  "build",
  "coverage",
  ".claude",
  "_tasks",
]);

// ---------------------------------------------------------------------------
// tsconfig path aliases
// ---------------------------------------------------------------------------

/**
 * Read `compilerOptions.baseUrl` + `compilerOptions.paths` from tsconfig.json.
 * Tolerant by design: a missing/invalid tsconfig yields an empty alias table and
 * the gate still walks relative edges rather than crashing.
 *
 * @param {string} cwd
 * @returns {{ baseUrl: string, paths: Record<string, string[]> }}
 */
export function loadTsconfigAliases(cwd) {
  const tsconfigPath = path.join(cwd, "tsconfig.json");
  /** @type {{ baseUrl: string, paths: Record<string, string[]> }} */
  const empty = { baseUrl: cwd, paths: {} };

  if (!fs.existsSync(tsconfigPath)) return empty;

  try {
    // tsconfig.json allows comments and trailing commas; JSON.parse does not.
    const raw = fs
      .readFileSync(tsconfigPath, "utf8")
      .replace(/^\s*\/\/.*$/gm, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/,(\s*[}\]])/g, "$1");
    const parsed = JSON.parse(raw);
    const options = parsed?.compilerOptions ?? {};
    return {
      baseUrl: path.resolve(cwd, options.baseUrl ?? "."),
      paths: options.paths ?? {},
    };
  } catch {
    return empty;
  }
}

/**
 * Match a bare specifier against the tsconfig `paths` table.
 * Supports the two forms the repo uses: exact (`"@omniroute/open-sse"`) and
 * single-wildcard (`"@/*"`, `"@omniroute/open-sse/*"`).
 *
 * @param {string} specifier
 * @param {{ paths: Record<string, string[]> }} aliases
 * @returns {string[] | null} substitution targets, or null when no path matches.
 */
export function matchPathAlias(specifier, aliases) {
  const { paths } = aliases;
  if (!paths) return null;

  // Exact match wins over wildcard, matching TypeScript's own resolution order.
  if (Object.prototype.hasOwnProperty.call(paths, specifier)) {
    return paths[specifier];
  }

  for (const [pattern, targets] of Object.entries(paths)) {
    const star = pattern.indexOf("*");
    if (star === -1) continue;
    const prefix = pattern.slice(0, star);
    const suffix = pattern.slice(star + 1);
    if (!specifier.startsWith(prefix) || !specifier.endsWith(suffix)) continue;
    if (specifier.length < prefix.length + suffix.length) continue;
    const matched = specifier.slice(prefix.length, specifier.length - suffix.length);
    return targets.map((target) => target.replace("*", matched));
  }

  return null;
}

// ---------------------------------------------------------------------------
// Module resolution
// ---------------------------------------------------------------------------

function isFile(candidate) {
  try {
    return fs.statSync(candidate).isFile();
  } catch {
    return false;
  }
}

/**
 * Resolve a specifier to an on-disk file, trying explicit extension, every source
 * extension, then `index.*` — the same ladder TypeScript/NodeNext use.
 *
 * @param {string} fromFile
 * @param {string} specifier
 * @returns {string | null}
 */
export function resolveRelativeImport(fromFile, specifier) {
  const base = path.resolve(path.dirname(fromFile), specifier);

  if (path.extname(base) && isFile(base)) return base;

  for (const extension of SOURCE_EXTENSIONS) {
    const candidate = `${base}${extension}`;
    if (isFile(candidate)) return candidate;
  }

  for (const extension of SOURCE_EXTENSIONS) {
    const candidate = path.join(base, `index${extension}`);
    if (isFile(candidate)) return candidate;
  }

  return null;
}

/**
 * Resolve a specifier that is *not* relative: try tsconfig aliases first, then
 * `baseUrl`-relative, then give up (bare package specifiers are not ours to walk).
 *
 * @param {string} fromFile
 * @param {string} specifier
 * @param {{ baseUrl: string, paths: Record<string, string[]> }} aliases
 * @returns {string | null}
 */
export function resolveAliasedImport(fromFile, specifier, aliases) {
  const targets = matchPathAlias(specifier, aliases);
  if (targets) {
    for (const target of targets) {
      const resolved = resolveRelativeImport(fromFile, path.resolve(aliases.baseUrl, target));
      if (resolved) return resolved;
    }
  }

  // baseUrl-relative ("somePkg/x") — no path mapping needed.
  if (aliases.baseUrl) {
    const resolved = resolveRelativeImport(fromFile, path.resolve(aliases.baseUrl, specifier));
    if (resolved) return resolved;
  }

  return null;
}

// ---------------------------------------------------------------------------
// Specifier extraction (TypeScript AST)
// ---------------------------------------------------------------------------

let cachedTs = null;
function getTypeScript() {
  if (cachedTs) return cachedTs;
  try {
    cachedTs = require("typescript");
  } catch {
    cachedTs = null;
  }
  return cachedTs;
}

/**
 * Regex fallback used only when the TypeScript compiler cannot be loaded. It
 * deliberately ignores type-position `import("…")` is impossible here, so it errs
 * toward collecting fewer edges — under-reporting beats inventing cycles.
 */
function extractSpecifiersByRegex(fileContents) {
  const specs = [];
  const staticRe = /\b(?:import|export)\s+(?:[^"'`;]*?\sfrom\s*)?["']([^"']+)["']/g;
  let match = staticRe.exec(fileContents);
  while (match) {
    specs.push(match[1]);
    match = staticRe.exec(fileContents);
  }
  // Dynamic imports: require `import` immediately followed by `(` and a string
  // literal, and not preceded by `typeof` (that is a type-only position).
  const dynamicRe = /(?<!typeof\s)(?<![\w$.])import\s*\(\s*["']([^"']+)["']\s*\)/g;
  match = dynamicRe.exec(fileContents);
  while (match) {
    specs.push(match[1]);
    match = dynamicRe.exec(fileContents);
  }
  return specs;
}

/**
 * Collect every *runtime* module specifier in a file.
 *
 * Uses the TypeScript AST so that:
 *   - `await import("./x")` / `void import("./x")` / `import("./x").then(…)`
 *     count as edges (G-01 blind spot 2), while
 *   - `typeof import("./x")` in a type annotation does NOT (it is erased at
 *     compile time, so counting it would invent runtime cycles).
 *
 * @param {string} fileContents
 * @param {string} [fileName]
 * @returns {string[]}
 */
export function extractImportSpecifiers(fileContents, fileName = "module.ts") {
  const ts = getTypeScript();
  if (!ts) return extractSpecifiersByRegex(fileContents);

  /** @type {string[]} */
  const specs = [];
  /** @param {import("typescript").SourceFile} node */
  const addFromStringLiteral = (node) => {
    const argument = node.arguments?.[0];
    if (argument && ts.isStringLiteralLike(argument)) specs.push(argument.text);
  };

  /**
   * @param {import("typescript").Node} node
   */
  const visit = (node) => {
    // import x from "…" / import "…" / import type … — the type-only variants are
    // erased, but including them would only ever ADD edges; skip them explicitly
    // so the count matches what the runtime actually does.
    if (
      (ts.isImportDeclaration(node) ||
        ts.isExportDeclaration(node) ||
        ts.isImportEqualsDeclaration(node)) &&
      node.moduleSpecifier &&
      ts.isStringLiteralLike(node.moduleSpecifier)
    ) {
      const isTypeOnly =
        (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
        (node.importClause?.isTypeOnly === true || node.isTypeOnly === true);
      if (!isTypeOnly) specs.push(node.moduleSpecifier.text);
    }

    // Dynamic `import("…")`: a call whose callee is the `import` keyword.
    if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      addFromStringLiteral(node);
    }

    ts.forEachChild(node, visit);
  };

  const sourceFile = ts.createSourceFile(
    fileName,
    fileContents,
    ts.ScriptTarget.Latest,
    /* setParentNodes */ true,
    /\.tsx?$/.test(fileName) ? ts.ScriptKind.TSX : ts.ScriptKind.TS
  );
  visit(sourceFile);
  return specs;
}

// ---------------------------------------------------------------------------
// Graph + SCC
// ---------------------------------------------------------------------------

/**
 * Recursively list source files under `rootDir`, skipping vendored/build dirs.
 *
 * @param {string} absRoot
 * @returns {string[]}
 */
export function listSourceFiles(absRoot) {
  if (!fs.existsSync(absRoot)) return [];

  const files = [];
  const stack = [absRoot];

  while (stack.length > 0) {
    const current = stack.pop();
    let entries;
    try {
      entries = fs.readdirSync(current, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        if (!IGNORED_DIRS.has(entry.name)) stack.push(fullPath);
        continue;
      }

      // `.d.ts` files are ambient declarations, not modules in the graph.
      if (entry.name.endsWith(".d.ts")) continue;
      if (SOURCE_EXTENSIONS.includes(path.extname(entry.name))) files.push(path.resolve(fullPath));
    }
  }

  return files;
}

/**
 * @param {Map<string, Set<string>>} graph
 * @returns {string[][]} every strongly connected component, Tarjan.
 */
export function stronglyConnectedComponents(graph) {
  const indexMap = new Map();
  const lowLinkMap = new Map();
  const onStack = new Set();
  const stack = [];
  const components = [];
  let indexCounter = 0;

  function strongConnect(node) {
    indexMap.set(node, indexCounter);
    lowLinkMap.set(node, indexCounter);
    indexCounter += 1;
    stack.push(node);
    onStack.add(node);

    for (const neighbor of graph.get(node) || []) {
      if (!indexMap.has(neighbor)) {
        strongConnect(neighbor);
        lowLinkMap.set(node, Math.min(lowLinkMap.get(node), lowLinkMap.get(neighbor)));
      } else if (onStack.has(neighbor)) {
        lowLinkMap.set(node, Math.min(lowLinkMap.get(node), indexMap.get(neighbor)));
      }
    }

    if (lowLinkMap.get(node) === indexMap.get(node)) {
      const component = [];
      while (stack.length > 0) {
        const candidate = stack.pop();
        onStack.delete(candidate);
        component.push(candidate);
        if (candidate === node) break;
      }
      components.push(component);
    }
  }

  for (const node of graph.keys()) {
    if (!indexMap.has(node)) strongConnect(node);
  }

  return components;
}

function isSelfCycle(component, graph) {
  if (component.length !== 1) return false;
  const [file] = component;
  return (graph.get(file) || new Set()).has(file);
}

/**
 * Walk `roots` and return the import cycles among them.
 *
 * @param {string[]} roots repo-relative directories
 * @param {string} [cwd]
 * @returns {{ fileCount: number, cycles: string[][] }} cycles are posix,
 *   cwd-relative file paths, sorted, one entry per strongly connected component.
 */
export function analyzeCycles(roots, cwd = process.cwd()) {
  const aliases = loadTsconfigAliases(cwd);
  const files = roots.flatMap((root) => listSourceFiles(path.resolve(cwd, root)));
  const fileSet = new Set(files);
  const graph = new Map();

  for (const filePath of files) {
    let code;
    try {
      code = fs.readFileSync(filePath, "utf8");
    } catch {
      graph.set(filePath, new Set());
      continue;
    }

    const dependencies = new Set();
    for (const specifier of extractImportSpecifiers(code, filePath)) {
      const resolved = specifier.startsWith(".")
        ? resolveRelativeImport(filePath, specifier)
        : resolveAliasedImport(filePath, specifier, aliases);
      // Only edges inside the scanned set matter for a cycle within these roots.
      if (resolved && fileSet.has(resolved)) dependencies.add(resolved);
    }

    graph.set(filePath, dependencies);
  }

  const components = stronglyConnectedComponents(graph);
  const cycles = components
    .filter((component) => component.length > 1 || isSelfCycle(component, graph))
    .map((component) =>
      component.map((f) => path.relative(cwd, f).split(path.sep).join("/")).sort()
    )
    .sort((a, b) => b.length - a.length || a[0].localeCompare(b[0]));

  return { fileCount: graph.size, cycles };
}

// ---------------------------------------------------------------------------
// Ratchet baseline (G-02)
// ---------------------------------------------------------------------------

/**
 * Read the `cycles` ceiling from quality-baseline.json.
 * Missing/invalid baseline ⇒ null (main() then exits 1 — fail-closed).
 *
 * @param {string} [baselinePath]
 * @returns {number | null}
 */
export function readBaselineCyclesValue(baselinePath) {
  try {
    const parsed = JSON.parse(fs.readFileSync(baselinePath, "utf8"));
    const value = parsed?.metrics?.cycles?.value;
    return typeof value === "number" ? value : null;
  } catch {
    return null;
  }
}

/** Default location of the baseline, resolved from this script's own path. */
export function defaultBaselinePath() {
  return path.resolve(__dirname, "../../config/quality/quality-baseline.json");
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function main() {
  const argv = process.argv.slice(2);
  const ratchet = argv.includes("--ratchet");
  const roots = argv.filter((arg) => !arg.startsWith("--"));
  const scanRoots = roots.length > 0 ? roots : DEFAULT_ROOTS;

  const { fileCount, cycles } = analyzeCycles(scanRoots);

  if (cycles.length === 0) {
    console.log(
      `[cycles] OK - no cycles detected across ${fileCount} files in: ${scanRoots.join(", ")}`
    );
    process.exit(0);
  }

  console.error(
    `[cycles] FAIL - detected ${cycles.length} strongly connected component(s) across ${fileCount} files in: ${scanRoots.join(", ")}`
  );
  for (const component of cycles) {
    console.error(`\n- SCC (${component.length} files)`);
    for (const filePath of component) console.error(`  - ${filePath}`);
  }
  console.error(`\n[cycles] cycles=${cycles.length}`);

  if (ratchet) {
    const baseline = readBaselineCyclesValue(defaultBaselinePath());
    if (baseline !== null) {
      if (cycles.length > baseline) {
        console.error(
          `[cycles] RATCHET FAIL - ${cycles.length} cycles exceeds the quality-baseline.json ceiling of ${baseline}. Fix the cycles or re-baseline with a justification.`
        );
        process.exit(1);
      }
      console.log(
        `[cycles] RATCHET OK - ${cycles.length} cycles within the ceiling of ${baseline}.`
      );
      process.exit(0);
    }
  }

  process.exit(1);
}

// Importable from tests without executing the gate (which calls process.exit).
if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
