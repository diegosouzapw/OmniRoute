/**
 * ESM path-alias resolver for global installs.
 *
 * Problem (#7791): when OmniRoute is installed via `npm i -g omniroute`, the
 * package files live under `node_modules/omniroute/`. tsx's tsconfig-path
 * resolution does not apply there, so specifiers like `@/shared/utils/featureFlags`
 * (declared in tsconfig.json `paths` as `@/* → ./src/*`) fail with
 * `ERR_MODULE_NOT_FOUND`. The CLI crashes before any command can run.
 *
 * Fix: register a Node ESM `resolve` hook that rewrites `@/...` specifiers to
 * absolute file URLs pointing at the package's `src/` directory. The hook runs
 * after tsx so `.ts` extensions are already handled, and only intercepts `@/`
 * specifiers — everything else falls through to Node's default resolver.
 *
 * Exposed as pure functions so the mapping logic is unit-testable without a
 * running module loader.
 */

import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

/** Prefix that triggers alias rewriting. Exported for tests/consumers. */
export const ALIAS_PREFIX = "@/";

/**
 * Resolve a `@/...` specifier to an absolute file URL under `<root>/src/`.
 *
 * Rules mirror tsconfig.json `paths`:
 *   "@/*": ["./src/*"]
 *
 * - Strips the `@/` prefix and joins against `<root>/src/`.
 * - Probes the underlying filesystem for the actual source file: the specifier
 *   itself, then with common source extensions (`.ts`, `.tsx`, `.js`, `.mjs`,
 *   `.cjs`, `.json`), then `<dir>/index.*`. Returns the first existing match
 *   as a `file://` URL.
 * - Returns `null` for specifiers that do not start with `@/`, for malformed
 *   escapes (`@//etc/...`), or when no corresponding source file exists on
 *   disk. The caller (the ESM loader, or test code) treats `null` as "defer
 *   to the default resolver".
 *
 * This is the exact same logic the loader hook in HOOK_SOURCE runs, factored
 * out so it can be unit-tested without spawning a worker.
 *
 * @param {string} specifier  Module specifier from an `import` statement.
 * @param {string} root       Absolute path to the package root (where `src/` lives).
 * @returns {string|null}     Absolute `file://` URL, or `null` when unresolved.
 */
const SOURCE_EXTENSIONS = [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json"];

export function resolveAlias(specifier, root) {
  if (typeof specifier !== "string" || !specifier.startsWith(ALIAS_PREFIX)) {
    return null;
  }
  if (!root || typeof root !== "string") return null;
  const rest = specifier.slice(ALIAS_PREFIX.length);
  // Guard against absolute-ish escapes (`@//etc/passwd`, `@/\\x00`).
  if (rest.startsWith("/") || rest.startsWith("\\")) {
    return null;
  }
  const base = join(root, "src", rest);
  if (existsSync(base)) return pathToFileURL(base).href;
  for (const ext of SOURCE_EXTENSIONS) {
    const candidate = base + ext;
    if (existsSync(candidate)) return pathToFileURL(candidate).href;
  }
  // Directory import: `@/shared/utils` → `.../utils/index.ts`
  const indexBase = join(base, "index");
  for (const ext of SOURCE_EXTENSIONS) {
    const candidate = indexBase + ext;
    if (existsSync(candidate)) return pathToFileURL(candidate).href;
  }
  return null;
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
