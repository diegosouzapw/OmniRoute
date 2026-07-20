/**
 * ESM loader hook for path-alias resolution (#7791 + #7808).
 *
 * This file runs in Node's loader worker thread after being registered via
 * `module.register(url, data)` from `bin/aliasResolver.mjs`. It MUST NOT import
 * anything from the parent module — all inputs arrive through `initialize(data)`.
 *
 * Behaviour:
 * - Rewrites alias specifiers to absolute filesystem paths, mirroring
 *   tsconfig.json `paths`:
 *     - `@/*`                    → <root>/src/*
 *     - `@omniroute/open-sse`     → <root>/open-sse/index.*
 *     - `@omniroute/open-sse/*`   → <root>/open-sse/*
 * - Probes the usual source extensions (`.ts`, `.tsx`, `.js`, `.mjs`, `.cjs`,
 *   `.json`) plus `index.*` for directory imports.
 * - Returns `shortCircuit: true` only when a candidate file exists on disk;
 *   otherwise delegates to the next resolver (tsx/Node) so unrelated imports
 *   and legitimate "module not found" errors pass through unchanged.
 *
 * Why a separate file instead of an inline `data:` URL?
 * CodeQL's `js/incomplete-url-substring-sanitization` flags dynamic `new URL(...)`
 * construction with interpolated strings. A real file URL produced by
 * `pathToFileURL()` is a trusted, fully-parsed URL — no sanitization ambiguity.
 */
import { pathToFileURL } from "node:url";
import { join, relative, isAbsolute } from "node:path";
import { existsSync, statSync } from "node:fs";

let ROOT = "";

export function initialize(data) {
  ROOT = (data && data.root) || "";
}

const EXTENSIONS = [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json"];

/**
 * Alias prefix table — mirrors ALIAS_MAP in aliasResolver.mjs and
 * tsconfig.json `paths`. Processed top-to-bottom; first match wins.
 *
 * @type {Array<{prefix: string, target: string, exact: boolean}>}
 */
const ALIAS_TABLE = [
  { prefix: "@/", target: "src", exact: false },
  { prefix: "@omniroute/open-sse/", target: "open-sse", exact: false },
  { prefix: "@omniroute/open-sse", target: "open-sse", exact: true },
];

function tryResolveAliasFsPath(specifier) {
  if (!ROOT || typeof specifier !== "string") return null;

  // Find the first matching alias entry.
  let matchedEntry = null;
  let rest = null;
  for (const entry of ALIAS_TABLE) {
    if (specifier.startsWith(entry.prefix)) {
      const after = specifier.slice(entry.prefix.length);
      if (after.length === 0 && !entry.exact) continue;
      matchedEntry = entry;
      rest = after;
      break;
    }
  }
  if (!matchedEntry) return null;

  const targetDir = join(ROOT, matchedEntry.target);

  // Exact match (e.g. `@omniroute/open-sse`) → resolve to `<target>/index.*`.
  if (rest === "" || rest === undefined) {
    return probeIndex(targetDir);
  }

  // Guard against absolute-ish escapes.
  if (rest.startsWith("/") || rest.startsWith("\\")) return null;
  // Guard against path-traversal escapes.
  const segments = rest.split(/[\\\/]+/);
  if (segments.includes("..")) return null;

  const base = join(targetDir, rest);
  if (!isWithinRoot(targetDir, base)) return null;
  return probeFile(base) ?? probeIndex(base) ?? null;
}

function probeFile(base) {
  // Extension variants first — avoids matching a bare directory name.
  for (const ext of EXTENSIONS) {
    const candidate = base + ext;
    if (existsSync(candidate)) return candidate;
  }
  if (existsSync(base)) {
    try {
      const st = statSync(base);
      if (!st.isDirectory()) return base;
    } catch {}
  }
  return null;
}

function probeIndex(dir) {
  const indexBase = join(dir, "index");
  for (const ext of EXTENSIONS) {
    const candidate = indexBase + ext;
    if (existsSync(candidate)) return candidate;
  }
  return null;
}

/**
 * True when `candidate` resolves to a location inside `ancestor` (or is
 * `ancestor` itself). Path-normalization-aware defense against traversal.
 */
function isWithinRoot(ancestor, candidate) {
  const rel = relative(ancestor, candidate);
  return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
}

export function resolve(specifier, context, nextResolve) {
  const fsPath = tryResolveAliasFsPath(specifier);
  if (fsPath) {
    return {
      url: pathToFileURL(fsPath).href,
      shortCircuit: true,
    };
  }
  return nextResolve(specifier, context);
}
