/**
 * ESM loader hook for `@/` path aliases (#7791).
 *
 * This file runs in Node's loader worker thread after being registered via
 * `module.register(url, data)` from `bin/aliasResolver.mjs`. It MUST NOT import
 * anything from the parent module — all inputs arrive through `initialize(data)`.
 *
 * Behaviour:
 * - Rewrites `@/...` specifiers to absolute filesystem paths under `<root>/src/`,
 *   mirroring the `paths: { "@/*": ["./src/*"] }` mapping from tsconfig.json.
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
import { join } from "node:path";
import { existsSync } from "node:fs";

let ROOT = "";

export function initialize(data) {
  ROOT = (data && data.root) || "";
}

const EXTENSIONS = [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json"];

function tryResolveAliasFsPath(specifier) {
  if (!ROOT || typeof specifier !== "string" || !specifier.startsWith("@/")) {
    return null;
  }
  const rest = specifier.slice(2);
  // Guard against absolute-ish escapes (`@//etc/passwd`, `@/\x00`).
  if (rest.startsWith("/") || rest.startsWith("\\")) return null;
  const base = join(ROOT, "src", rest);
  if (existsSync(base)) return base;
  for (const ext of EXTENSIONS) {
    const candidate = base + ext;
    if (existsSync(candidate)) return candidate;
  }
  // Directory import: `@/shared/utils` → `.../utils/index.ts`
  const indexBase = join(base, "index");
  for (const ext of EXTENSIONS) {
    const candidate = indexBase + ext;
    if (existsSync(candidate)) return candidate;
  }
  return null;
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
