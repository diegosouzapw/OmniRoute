/**
 * ESM path-alias resolver for global installs.
 *
 * Problem (#7791): when OmniRoute is installed via `npm i -g omniroute`, the
 * package files live under `node_modules/omniroute/`. tsx's tsconfig-path
 * resolution does not apply there, so specifiers like `@/shared/utils/featureFlags`
 * (declared in tsconfig.json `paths` as `@/* → ./src/*`) or
 * `@omniroute/open-sse/services/usage` fail with `ERR_MODULE_NOT_FOUND`.
 * The CLI crashes before any command can run.
 *
 * Fix: register a Node ESM `resolve` hook that rewrites alias specifiers to
 * absolute file URLs. Covers all tsconfig.json `paths` entries:
 *   - `@/*`             → `./src/*`
 *   - `@omniroute/open-sse`    → `./open-sse/index.ts`
 *   - `@omniroute/open-sse/*`  → `./open-sse/*`
 * The hook runs after tsx so `.ts` extensions are already handled, and only
 * intercepts matched prefixes — everything else falls through to Node's
 * default resolver.
 *
 * Exposed as pure functions so the mapping logic is unit-testable without a
 * running module loader.
 */

import { existsSync, statSync } from "node:fs";
import { dirname, join, relative, isAbsolute } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/**
 * Alias mapping table — mirrors tsconfig.json `paths`.
 * Processed top-to-bottom; first matching prefix wins.
 *
 * Each entry:
 *   prefix  — specifier prefix to match (e.g. `"@/"`, `"@omniroute/open-sse/"`)
 *   target  — directory name under the package root (e.g. `"src"`, `"open-sse"`)
 *   exact   — if true, the prefix also matches when the specifier equals the
 *             prefix *without* a trailing slash (e.g. `@omniroute/open-sse` →
 *             `<root>/open-sse/index.ts`).
 *
 * Exported for tests/consumers.
 */
export const ALIAS_MAP = [
  { prefix: "@/", target: "src", exact: false },
  { prefix: "@omniroute/open-sse/", target: "open-sse", exact: false },
  { prefix: "@omniroute/open-sse", target: "open-sse", exact: true },
];

/** @deprecated Use ALIAS_MAP instead. Kept for backward compat. */
export const ALIAS_PREFIX = "@/";

// This file is ESM (no CJS __dirname global) — derive it from import.meta.url
// so the pathToFileURL(join(__dirname, ...)) call below resolves correctly
// regardless of the caller's cwd.
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Resolve an alias specifier to an absolute file URL.
 *
 * Rules mirror tsconfig.json `paths` via `ALIAS_MAP`:
 *   "@/..."                     → <root>/src/...
 *   "@omniroute/open-sse/..."   → <root>/open-sse/...
 *   "@omniroute/open-sse"       → <root>/open-sse/index.*
 *
 * - Strips the matched alias prefix and joins the remainder against the
 *   corresponding target directory.
 * - Probes the underlying filesystem for the actual source file: the specifier
 *   itself, then with common source extensions (`.ts`, `.tsx`, `.js`, `.mjs`,
 *   `.cjs`, `.json`), then `<dir>/index.*`. Returns the first existing match
 *   as a `file://` URL.
 * - Returns `null` for specifiers that do not match any alias, for malformed
 *   escapes, for path-traversal attempts, or when no corresponding source
 *   file exists on disk. The caller treats `null` as "defer to the default
 *   resolver".
 *
 * @param {string} specifier  Module specifier from an `import` statement.
 * @param {string} root       Absolute path to the package root.
 * @returns {string|null}     Absolute `file://` URL, or `null` when unresolved.
 */
const SOURCE_EXTENSIONS = [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json"];

export function resolveAlias(specifier, root) {
  if (typeof specifier !== "string" || !root || typeof root !== "string") {
    return null;
  }

  // Find the first matching alias entry (top-to-bottom order).
  let matchedEntry = null;
  let rest = null;
  for (const entry of ALIAS_MAP) {
    if (specifier.startsWith(entry.prefix)) {
      // For non-exact entries, require at least one char after the prefix
      // to avoid matching bare "@/" as "nothing".
      const after = specifier.slice(entry.prefix.length);
      if (after.length === 0 && !entry.exact) continue;
      matchedEntry = entry;
      rest = after;
      break;
    }
  }
  if (!matchedEntry) return null;

  const targetDir = join(root, matchedEntry.target);

  // Exact match (e.g. `@omniroute/open-sse` with no trailing path) →
  // resolve to `<target>/index.*`.
  if (rest === "" || rest === undefined) {
    return probeIndex(targetDir);
  }

  // Guard against absolute-ish escapes (`@//etc/passwd`, `@/\x00`).
  if (rest.startsWith("/") || rest.startsWith("\\")) {
    return null;
  }
  // Guard against path-traversal escapes (`@/../../../etc/hostname`).
  const segments = rest.split(/[\\\/]+/);
  if (segments.includes("..")) {
    return null;
  }
  const base = join(targetDir, rest);
  if (!isWithinRoot(targetDir, base)) {
    return null;
  }
  return probeFile(base) ?? probeIndex(base) ?? null;
}

/**
 * Probe a bare path and its extension variants. Returns the first existing
 * match as a `file://` URL, or `null`.
 */
function probeFile(base) {
  // Try extension variants first — a bare `base` that happens to be a directory
  // would match existsSync() but should NOT be returned as a file URL (the
  // caller expects a file, not a directory). Extension-probing avoids this
  // false positive (e.g. `usage` vs `usage.ts` vs `usage/`).
  for (const ext of SOURCE_EXTENSIONS) {
    const candidate = base + ext;
    if (existsSync(candidate)) return pathToFileURL(candidate).href;
  }
  // Only accept the bare path if it is NOT a directory.
  if (existsSync(base)) {
    try {
      const st = statSync(base);
      if (!st.isDirectory()) return pathToFileURL(base).href;
    } catch {}
  }
  return null;
}

/**
 * Probe a directory for an `index.*` entry. Returns the first existing
 * match as a `file://` URL, or `null`.
 */
function probeIndex(dir) {
  const indexBase = join(dir, "index");
  for (const ext of SOURCE_EXTENSIONS) {
    const candidate = indexBase + ext;
    if (existsSync(candidate)) return pathToFileURL(candidate).href;
  }
  return null;
}

/**
 * True when `candidate` resolves to a location inside `ancestor` (or is
 * `ancestor` itself). Used as a second, path-normalization-aware layer of
 * defense against traversal beyond the literal `..` segment check above.
 *
 * @param {string} ancestor
 * @param {string} candidate
 * @returns {boolean}
 */
function isWithinRoot(ancestor, candidate) {
  const rel = relative(ancestor, candidate);
  return rel === "" || (!rel.startsWith("..") && !isAbsolute(rel));
}

/**
 * Register the ESM resolve hook for the current process. Safe to call multiple
 * times — subsequent calls are no-ops once the hook is installed.
 *
 * Uses Node's stable `module.register()` API (available since Node 20.6,
 * required Node 22+ here). The hook runs in a worker thread but only reads the
 * captured `root`, so no shared-state hazards.
 *
 * @param {string} root  Absolute path to the package root.
 * @returns {Promise<boolean>}  Resolves `true` once registered (or if already
 *   registered), `false` on environments where `module.register` is unavailable.
 */
let _registered = false;
export async function registerAliasResolver(root) {
  // Validate input FIRST, before the _registered short-circuit. Otherwise the
  // second call in the same process (e.g. a test suite that already registered
  // once) would silently return `true` for invalid input instead of rejecting,
  // masking programmer errors. Input validation must be unconditional.
  if (!root || typeof root !== "string") {
    throw new TypeError("registerAliasResolver: root must be a non-empty string");
  }
  if (_registered) return true;
  // if the directory does not exist we would only mask a real misconfiguration
  // by installing a hook that rewrites to nowhere.
  if (!existsSync(join(root, "src"))) {
    return false;
  }

  try {
    const { register } = await import("node:module");
    // #7808: load the hook from a real file on disk via pathToFileURL() instead
    // of building a `data:text/javascript,...` URL dynamically. CodeQL's
    // `js/incomplete-url-substring-sanitization` flagged the interpolated
    // `new URL(...)` call; a file URL produced by pathToFileURL() is a trusted,
    // fully-parsed URL — no sanitization ambiguity. The hook source lives in
    // `bin/aliasResolverHook.mjs` (sibling of this file), shipped via
    // package.json "files": ["bin/"].
    const hookPath = join(__dirname, "aliasResolverHook.mjs");
    const hookUrl = pathToFileURL(hookPath);
    register(hookUrl, { data: { root } });
    _registered = true;
    return true;
  } catch {
    // Older Node or sandboxed env without module.register — fall back to the
    // default resolver. The bug will resurface only in the exact global-install
    // scenario, which is what we explicitly patched; other entry points still
    // work because they import via relative paths.
    return false;
  }
}

// #7808: the ESM loader hook source now lives in `bin/aliasResolverHook.mjs`,
// loaded via `pathToFileURL()` above. The previous inline `HOOK_SOURCE` template
// literal was removed because its `new URL(\`data:text/javascript,...\`)` wrapper
// triggered CodeQL `js/incomplete-url-substring-sanitization`. The hook logic
// itself is unchanged — see aliasResolverHook.mjs for the resolver behaviour.
