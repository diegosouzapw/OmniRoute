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
    // The hook source is inlined via a data URL so it runs in the loader worker
    // without needing an extra file on disk (keeps `bin/` flat and lets tests
    // stub `module.register` without touching the filesystem).
    const hookUrl = new URL(`data:text/javascript,${encodeURIComponent(HOOK_SOURCE)}`);
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

/**
 * Source of the ESM loader hook. Runs in the loader worker, so it must not
 * capture variables from this module — all inputs come via `data`.
 *
 * The hook only resolves specifiers starting with `@/`. Everything else returns
 * `shortCircuit: false` so Node's default resolver (and tsx's hook, already
 * installed before this one) handles it normally.
 */
const HOOK_SOURCE = `
import { pathToFileURL } from "node:url";
import { join } from "node:path";
import { existsSync } from "node:fs";

let ROOT = "";

export function initialize(data) {
  ROOT = (data && data.root) || "";
}

// When tsconfig paths are unavailable (e.g. global npm installs under
// node_modules/), rewrite \`@/...\` specifiers to the underlying TypeScript
// source file. The file may be imported without an extension, so probe the
// usual candidates and return the one that exists. Falls through to the
// default resolver when no candidate is found (lets tsx/Node error with the
// canonical message).
const EXTENSIONS = [".ts", ".tsx", ".js", ".mjs", ".cjs", ".json"];

function tryResolveAliasFsPath(specifier) {
  if (!ROOT || typeof specifier !== "string" || !specifier.startsWith("@/")) {
    return null;
  }
  const rest = specifier.slice(2);
  if (rest.startsWith("/") || rest.startsWith("\\\\")) return null;
  const base = join(ROOT, "src", rest);
  if (existsSync(base)) return base;
  for (const ext of EXTENSIONS) {
    const candidate = base + ext;
    if (existsSync(candidate)) return candidate;
  }
  // directory import: \`@/shared/utils\` → \`.../utils/index.ts\`
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
`;
