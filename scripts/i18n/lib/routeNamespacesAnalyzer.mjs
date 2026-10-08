/**
 * Route-namespace analyzer for the per-layout i18n message splitting.
 *
 * Computes, from the actual source tree, which next-intl namespaces each
 * route section needs in its serialized client payload:
 *
 *  - `root`    — namespaces for the root layout provider (public surface:
 *                login, status, docs, error pages, … plus the root-level
 *                client components).
 *  - `chrome`  — namespaces needed by the shared dashboard shell rendered by
 *                `src/app/(dashboard)/layout.tsx` (Header, Sidebar, …).
 *  - `home`    — the dashboard home route (`/dashboard` page.tsx + the
 *                component files that live directly under `dashboard/`).
 *  - `sections`— one entry per top-level section directory under
 *                `src/app/(dashboard)/dashboard/` that (recursively) contains
 *                a page.tsx.
 *
 * Only CLIENT components contribute namespaces: `"use client"` files call
 * `useTranslations`, whose messages must be present in the provider payload
 * the page serializes. Server components translate at render time on the
 * server and never serialize their catalog.
 *
 * The analysis deliberately over-approximates (crude "use client" detection,
 * all dotted string-literal calls in no-arg useTranslations files, dynamic
 * imports followed): a false extra namespace costs a few KB, a missed one
 * renders MISSING_MESSAGE errors in production.
 *
 * Used by `scripts/i18n/generate-route-namespaces.mjs` (writes the generated
 * map + section layouts) and by `tests/unit/i18n-route-namespaces.test.ts`
 * (asserts the committed map is fresh — run the generator after intentional
 * changes).
 */

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = resolve(__dirname, "..", "..", "..");

const SRC_ROOT = join(REPO_ROOT, "src");
const APP_ROOT = join(SRC_ROOT, "app");
const DASHBOARD_ROOT = join(APP_ROOT, "(dashboard)");
const SECTIONS_ROOT = join(DASHBOARD_ROOT, "dashboard");

const SKIP_DIRS = new Set(["node_modules", ".next", ".claude", ".git", "_tasks", "__pycache__"]);

const CLIENT_DIRECTIVE = /["']use client["']/;

function walkFiles(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name) || entry.name.startsWith("_")) continue;
      walkFiles(join(dir, entry.name), out);
    } else if (/\.(tsx|ts|jsx|js|mjs)$/.test(entry.name)) {
      out.push(join(dir, entry.name));
    }
  }
  return out;
}

function isClientSource(source) {
  // Directive prologue only — over-approximate on purpose (see header).
  return CLIENT_DIRECTIVE.test(source.slice(0, 400));
}

function importsOf(source) {
  const specs = [];
  const staticRe = /(?:import|export)[\s\S]*?from\s*["']([^"']+)["']/g;
  const dynamicRe = /import\s*\(\s*["']([^"']+)["']\s*\)/g;
  for (const re of [staticRe, dynamicRe]) {
    let match;
    while ((match = re.exec(source)) !== null) {
      specs.push(match[1]);
    }
  }
  return specs;
}

function resolveSpec(spec, fromFile) {
  let base;
  if (spec.startsWith("@/")) {
    base = join(SRC_ROOT, spec.slice(2));
  } else if (spec.startsWith("./") || spec.startsWith("../")) {
    base = resolve(dirname(fromFile), spec);
  } else {
    return null; // external package, @omniroute/open-sse (server engine), etc.
  }
  const candidates = [
    base,
    `${base}.tsx`,
    `${base}.ts`,
    `${base}.jsx`,
    `${base}.js`,
    `${base}.mjs`,
    join(base, "index.tsx"),
    join(base, "index.ts"),
    join(base, "index.js"),
  ];
  for (const candidate of candidates) {
    try {
      if (statSync(candidate).isFile()) return candidate;
    } catch {
      // try next candidate
    }
  }
  return null;
}

/**
 * Namespaces referenced by a client file. Handles both the common
 * `useTranslations("ns")` literal form and the rare no-arg
 * `useTranslations()` root form — for the latter, only calls made through
 * the exact variables assigned from `useTranslations()` are collected
 * (scanning every string call in the file would swallow unrelated keys).
 */
function namespacesOfClientFile(source) {
  const namespaces = new Set();
  const scoped = /useTranslations\(\s*["']([^"']+)["']\s*\)/g;
  let match;
  while ((match = scoped.exec(source)) !== null) {
    namespaces.add(match[1].split(".")[0]);
  }
  const rootVarRe = /(?:const|let|var)\s+(\w+)\s*=\s*useTranslations\(\s*\)/g;
  while ((match = rootVarRe.exec(source)) !== null) {
    const callRe = new RegExp(
      `\\b${match[1]}\\(\\s*["']([a-zA-Z0-9_-]+(?:\\.[a-zA-Z0-9_-]+)*)["']`,
      "g"
    );
    let call;
    while ((call = callRe.exec(source)) !== null) {
      namespaces.add(call[1].split(".")[0]);
    }
  }
  return namespaces;
}

const fileCache = new Map();

function readCached(file) {
  let cached = fileCache.get(file);
  if (cached === undefined) {
    try {
      cached = readFileSync(file, "utf8");
    } catch {
      cached = null;
    }
    fileCache.set(file, cached);
  }
  return cached;
}

/** BFS over the import graph from entry files; unions client namespaces. */
function closureNamespaces(entryFiles) {
  const namespaces = new Set();
  const visited = new Set();
  const queue = [...entryFiles];
  while (queue.length > 0) {
    const file = queue.shift();
    if (!file || visited.has(file)) continue;
    visited.add(file);
    const source = readCached(file);
    if (source === null) continue;
    if (isClientSource(source)) {
      for (const ns of namespacesOfClientFile(source)) namespaces.add(ns);
    }
    for (const spec of importsOf(source)) {
      const resolved = resolveSpec(spec, file);
      if (resolved && !visited.has(resolved)) queue.push(resolved);
    }
  }
  return namespaces;
}

function hasPageRecursively(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return false;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name) || entry.name.startsWith("_")) continue;
    const full = join(dir, entry.name);
    if (entry.isFile() && entry.name === "page.tsx") return true;
    if (entry.isDirectory() && hasPageRecursively(full)) return true;
  }
  return false;
}

/** Top-level UI route directories under src/app (public surface). */
function publicRouteDirs() {
  return readdirSync(APP_ROOT, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !SKIP_DIRS.has(entry.name) &&
        !entry.name.startsWith("_") &&
        entry.name !== "(dashboard)" &&
        entry.name !== "api" &&
        hasPageRecursively(join(APP_ROOT, entry.name))
    )
    .map((entry) => join(APP_ROOT, entry.name));
}

/** All client-reachable namespaces for the analysis. */
export function analyzeRouteNamespaces() {
  fileCache.clear();

  // Root layout provider: root-level files (excluding global-error, which
  // ships its own provider) + every public top-level route's subtree.
  const rootFiles = readdirSync(APP_ROOT)
    .filter(
      (name) => /\.(tsx|ts)$/.test(name) && name !== "global-error.tsx" && !name.endsWith(".css")
    )
    .map((name) => join(APP_ROOT, name));
  for (const dir of publicRouteDirs()) {
    rootFiles.push(...walkFiles(dir));
  }
  const root = closureNamespaces(rootFiles);

  // Dashboard chrome: everything reachable from the (dashboard) root layout.
  const chrome = closureNamespaces([join(DASHBOARD_ROOT, "layout.tsx")]);

  // Dashboard home: files directly under dashboard/ (page + companions).
  const homeFiles = readdirSync(SECTIONS_ROOT)
    .filter((name) => /\.(tsx|ts)$/.test(name))
    .map((name) => join(SECTIONS_ROOT, name));
  const home = new Set([...chrome]);
  for (const ns of closureNamespaces(homeFiles)) home.add(ns);

  // Sections: one entry per top-level dir under dashboard/ with a page.
  const sections = {};
  const sectionDirs = readdirSync(SECTIONS_ROOT, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isDirectory() &&
        !SKIP_DIRS.has(entry.name) &&
        !entry.name.startsWith("_") &&
        hasPageRecursively(join(SECTIONS_ROOT, entry.name))
    )
    .map((entry) => entry.name)
    .sort();
  for (const name of sectionDirs) {
    const set = new Set([...chrome]);
    for (const ns of closureNamespaces(walkFiles(join(SECTIONS_ROOT, name)))) set.add(ns);
    sections[name] = [...set].sort();
  }

  return {
    root: [...root].sort(),
    chrome: [...chrome].sort(),
    home: [...home].sort(),
    sections,
  };
}

/** Section names in canonical order (used by generator + test alike). */
export function sectionNames(analysis) {
  return Object.keys(analysis.sections).sort();
}

/** Relative path helper for reporting. */
export function rel(file) {
  return relative(REPO_ROOT, file);
}
