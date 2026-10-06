/**
 * Optional runtime pack resolution (Stage 7 of the Electron efficiency roadmap,
 * issue #10321).
 *
 * The desktop bundle ships WITHOUT the heavy optional ML/browser dependency
 * closure; users install versioned packs (`omniroute packs install ml-runtime`)
 * into `${DATA_DIR}/packs/<name>/node_modules`. `electron/main.js` prepends
 * those directories to the spawned server's NODE_PATH, which is how dynamic
 * imports (`await import("playwright")`, the LLMLingua worker) resolve pack
 * members at runtime.
 *
 * This module is the runtime side and deliberately does NOT import the
 * build-side manifest (`scripts/packs/optionalPackManifest.mjs`) — the
 * standalone server must stay decoupled from build tooling. It embeds only the
 * pack names and the index filename.
 *
 * Fail-open: every helper returns "absent" rather than throwing, so a missing
 * or corrupt pack degrades the optional feature instead of the server.
 */

import os from "node:os";
import path from "node:path";
import fs from "node:fs";

/** Pack names — must match OPTIONAL_PACKS in scripts/packs/optionalPackManifest.mjs. */
export const OPTIONAL_PACK_NAMES = ["ml-runtime", "browser-runtime"] as const;

export type OptionalPackName = (typeof OPTIONAL_PACK_NAMES)[number];

/** Index filename — must match PACK_INDEX_FILENAME in the manifest module. */
export const PACK_INDEX_FILENAME = "optional-packs.index.json";

/** Resolve DATA_DIR exactly like the rest of the runtime (modelStore.ts precedent). */
function resolveDataDir(override?: string): string {
  return override || process.env.DATA_DIR || path.join(os.homedir(), ".omniroute");
}

/** `${DATA_DIR}/packs` — root of installed packs. */
export function packsRootDir(dataDirOverride?: string): string {
  return path.join(resolveDataDir(dataDirOverride), "packs");
}

/** Install dir for one pack: `${DATA_DIR}/packs/<name>` (contains node_modules/). */
export function packInstallDir(name: string, dataDirOverride?: string): string {
  return path.join(packsRootDir(dataDirOverride), name);
}

/** `node_modules` dir of an installed pack, whether or not it exists. */
export function packNodeModulesDir(name: string, dataDirOverride?: string): string {
  return path.join(packInstallDir(name, dataDirOverride), "node_modules");
}

/**
 * NODE_PATH entries for every INSTALLED pack (manifest order, deterministic).
 * `electron/main.js` consumes this via its own plain-JS mirror — keep the
 * semantics identical (existence check, no throw).
 */
export function installedPackNodePaths(dataDirOverride?: string): string[] {
  const entries: string[] = [];
  for (const name of OPTIONAL_PACK_NAMES) {
    const dir = packNodeModulesDir(name, dataDirOverride);
    try {
      if (fs.statSync(dir).isDirectory()) entries.push(dir);
    } catch {
      // Not installed (or unreadable) — absent, not an error.
    }
  }
  return entries;
}

/**
 * Probe a pack member by its path relative to a `node_modules` root, e.g.
 * `@atjsh/llmlingua-2/package.json`. A single leading `node_modules` segment is
 * accepted because existing filesystem probes express the same member from an
 * install root. Checks every installed pack first, so an installed pack lights
 * the feature up even though the bundle tree no longer carries the member.
 */
export function packMemberInstalled(memberRelPath: string, dataDirOverride?: string): boolean {
  const segments = memberRelPath.split(/[\\/]/).filter(Boolean);
  if (segments[0] === "node_modules") segments.shift();
  if (segments.length === 0) return false;

  for (const nodeModulesDir of installedPackNodePaths(dataDirOverride)) {
    if (fs.existsSync(path.join(nodeModulesDir, ...segments))) return true;
  }
  return false;
}
