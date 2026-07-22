#!/usr/bin/env node
// scripts/check/check-route-guard-membership.ts
// Quality gate: route-guard membership (CLAUDE.md Hard Rules #15 + #17).
//
// WHY: routes that spawn child processes (`npm install`, `node`, MITM/Playwright,
// worker_threads) MUST be classified loopback-only by `isLocalOnlyPath()` in
// src/server/authz/routeGuard.ts. Loopback enforcement runs unconditionally
// BEFORE any auth check — so a leaked JWT over a tunnel cannot reach a spawn.
// A single spawn-capable `route.ts` that `isLocalOnlyPath()` does NOT match is an
// RCE-via-tunnel hole (the GHSA-fhh6-4qxv-rpqj surface the LOCAL_ONLY tier closes).
//
// This gate enumerates every `route.ts` under the spawn-capable prefixes and
// asserts each resolved URL path is classified local-only by the REAL predicate.
//
// Ratchet: any pre-existing unclassified route is frozen in KNOWN_UNCLASSIFIED
// with a justification so the gate exits 0 today; only NEW spawn-capable routes
// that slip past the guard fail. KNOWN_UNCLASSIFIED is empty today (clean
// baseline) — keep it that way; an entry here is a documented security debt.
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { pathToFileURL } from "node:url";
import { isLocalOnlyPath } from "@/server/authz/routeGuard.ts";

// Inline stale-allowlist helper (mirrors scripts/check/lib/allowlist.mjs).
// The TypeScript gate cannot import the .mjs helper directly; keep this in sync.
function assertNoStaleEntries(
  allowlist: string[] | Record<string, string>,
  liveItems: string[],
  gateName: string
): void {
  const liveSet = new Set(liveItems);
  const keys = Array.isArray(allowlist) ? allowlist : Object.keys(allowlist);
  const stale = keys.filter((k) => !liveSet.has(k));
  if (stale.length > 0) {
    console.error(
      `[${gateName}] ${stale.length} entrada(s) obsoleta(s) na allowlist ` +
        `— a violação foi corrigida; REMOVA a entrada para travar a correção:\n` +
        stale.map((e) => `  ✗ ${e}`).join("\n")
    );
    process.exitCode = 1;
  }
}

// Spawn-capable route roots (relative to repo root). Mirrors the spawn-capable
// prefixes documented in routeGuard.ts (SPAWN_CAPABLE_PREFIXES) and CLAUDE.md
// Hard Rules #15/#17 for the dirs that physically exist under src/app/api/.
export const SPAWN_CAPABLE_ROUTE_ROOTS: ReadonlyArray<string> = [
  "src/app/api/services",
  "src/app/api/mcp",
  "src/app/api/cli-tools/runtime",
  "src/app/api/local", // T-12: 1-click local service launchers (Redis today) — every child here spawns podman/docker (Hard Rules #15 + #17)
  "src/app/api/skills/collect", // Skill Collector CLI detection: GET .../detect spawns a child process per CLI_TOOL_IDS entry via getCliRuntimeStatus() (Hard Rules #15 + #17, PR #6294 review)
  "src/app/api/cli-tools/forge-settings", // GET calls getCliRuntimeStatus() to detect the `forge` CLI install (Hard Rules #15 + #17, #7263)
  "src/app/api/cli-tools/jcode-settings", // GET calls getCliRuntimeStatus() to detect the `jcode` CLI install (Hard Rules #15 + #17, #7263)
  "src/app/api/cli-tools/qwen-settings", // GET calls getCliRuntimeStatus("qwen") and writes local ~/.qwen config files (Hard Rules #15 + #17)
];

// Frozen pre-existing exceptions: spawn-capable routes NOT yet classified
// local-only. Each entry is a documented security debt — the route is reachable
// past the loopback gate. Empty today (every spawn-capable route is classified).
// Adding an entry here REQUIRES a justification + a follow-up to classify it in
// LOCAL_ONLY_API_PREFIXES / LOCAL_ONLY_API_PATTERNS (src/server/authz/routeGuard.ts).
export const KNOWN_UNCLASSIFIED: Record<string, string> = {};

/**
 * Map a Next.js App Router `route.ts` file path to the URL path the route
 * serves, in the exact shape `isLocalOnlyPath()` expects (a plain `/api/...`
 * path). Dynamic `[param]` segments become a concrete `_param_` placeholder —
 * `isLocalOnlyPath` matches prefixes via `startsWith`, so any non-empty segment
 * satisfies the classification (e.g. `/api/services/_name_/logs` still starts
 * with `/api/services/`).
 */
export function routeFileToApiPath(routeFile: string): string {
  return routeFile
    .replace(/\\/g, "/")
    .replace(/^src\/app/, "")
    .replace(/\/route\.ts$/, "")
    .replace(/\[([^\]]+)\]/g, "_$1_");
}

/**
 * Pure matching core: given resolved URL paths, a classifier predicate, and an
 * allowlist, return the paths that are NEITHER classified local-only NOR
 * allowlisted (input order preserved). These are the RCE-via-tunnel holes.
 */
export function findUnclassifiedSpawnRoutes(
  apiPaths: string[],
  isLocalOnly: (path: string) => boolean,
  allowlist: Record<string, string>
): string[] {
  return apiPaths.filter((p) => !isLocalOnly(p) && !(p in allowlist));
}

// --- 6A.8: source-based spawn detection ---

// Patterns that indicate a route.ts spawns child processes.
// Matches: import from "child_process" / "node:child_process" / "worker_threads" /
//          "node:worker_threads" or a spawn( / execFile( / exec( call.
const SPAWN_SOURCE_RE =
  /\b(?:from\s+["'](?:node:)?(?:child_process|worker_threads)["']|require\s*\(\s*["'](?:node:)?(?:child_process|worker_threads)["']\s*\)|spawn\s*\(|execFile\s*\(|execFileSync\s*\(|exec\s*\()/;

/**
 * Returns true if the given source text of a route.ts file directly imports
 * from child_process / worker_threads or calls spawn()/execFile()/exec().
 * Used by the 6A.8 source-scan subcheck to find spawn-capable routes outside
 * the static SPAWN_CAPABLE_ROUTE_ROOTS list.
 */
export function isSpawnCapableSource(source: string): boolean {
  return SPAWN_SOURCE_RE.test(source);
}

/**
 * Walk all route.ts files under src/app/api/ from repoRoot and return those whose
 * source matches isSpawnCapableSource. Returns relative paths (forward slashes).
 */
export function findSpawnCapableRoutes(repoRoot: string): string[] {
  const apiDir = join(repoRoot, "src", "app", "api");
  const out: string[] = [];

  function walk(dir: string): void {
    let entries: string[];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const entry of entries) {
      const full = join(dir, entry);
      try {
        if (statSync(full).isDirectory()) {
          walk(full);
        } else if (entry === "route.ts") {
          const src = readFileSync(full, "utf8");
          if (isSpawnCapableSource(src)) {
            out.push(relative(repoRoot, full).replace(/\\/g, "/"));
          }
        }
      } catch {
        // skip unreadable
      }
    }
  }

  walk(apiDir);
  return out.sort();
}

/**
 * 6A.8: pre-existing spawn-capable route.ts files that live OUTSIDE
 * SPAWN_CAPABLE_ROUTE_ROOTS but are NOT yet classified local-only.
 * Each entry is documented security debt (Hard Rules #15/#17):
 * the route can spawn child processes and is reachable past the loopback gate.
 *
 * TODO(6A.8): classify these in LOCAL_ONLY_API_PREFIXES / LOCAL_ONLY_API_PATTERNS
 * or add specific auth-only enforcement (no loopback, but require-auth before spawn).
 * Adding an entry here requires a justification + follow-up issue.
 */
export const KNOWN_UNCLASSIFIED_SOURCE_SPAWN: Record<string, string> = {
  // RESOLVED (6A.8 P1, 2026-06-13): /api/system/version and /api/db-backups/exportAll
  // are now classified in LOCAL_ONLY_API_PREFIXES (loopback-enforced before auth).
  // The stale-enforcement guard requires this set to stay empty until a NEW
  // unclassified spawn-capable route appears.
  // NOTE: cli-tools/antigravity-mitm/route.ts triggers child_process INDIRECTLY via
  // dynamic import to @/mitm/manager.runtime, but does NOT directly import child_process.
  // The source-scan gate covers DIRECT imports/calls only; this route is NOT in the
  // spawn-capable set by source analysis. Kept as a comment for documentation but
  // NOT in the allowlist (stale-enforcement would flag it). The route has requireCliToolsAuth()
  // for auth gating; the underlying spawn happens in mitm/manager.runtime.
  // If /api/cli-tools/ is ever added to LOCAL_ONLY_API_PREFIXES, revisit this note.
};

/** Recursively collect every `route.ts` under `dir` (returns [] if dir absent). */
function collectRouteFiles(dir: string): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return []; // dir does not exist — nothing to enumerate
  }
  const out: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...collectRouteFiles(full));
    } else if (entry === "route.ts") {
      out.push(full);
    }
  }
  return out;
}

function main(): void {
  const cwd = process.cwd();

  // --- Subcheck 1 (original): SPAWN_CAPABLE_ROUTE_ROOTS ---
  const apiPaths = SPAWN_CAPABLE_ROUTE_ROOTS.flatMap(collectRouteFiles)
    .map(routeFileToApiPath)
    .sort();

  const unclassified = findUnclassifiedSpawnRoutes(apiPaths, isLocalOnlyPath, KNOWN_UNCLASSIFIED);

  // --- Subcheck 2 (6A.8): source-based scan — ALL route.ts files ---
  // Find every route.ts that imports child_process / worker_threads and verify it is
  // either classified local-only or frozen in KNOWN_UNCLASSIFIED_SOURCE_SPAWN.
  const spawnCapableFiles = findSpawnCapableRoutes(cwd);

  // Stale-enforcement: if a route was fixed (no longer spawn-capable, or was classified),
  // the KNOWN_UNCLASSIFIED_SOURCE_SPAWN entry must be removed.
  assertNoStaleEntries(
    KNOWN_UNCLASSIFIED_SOURCE_SPAWN,
    spawnCapableFiles,
    "route-guard-membership/source-spawn"
  );

  // Find spawn-capable routes outside SPAWN_CAPABLE_ROUTE_ROOTS that are not classified
  // local-only and not in the source-spawn allowlist.
  const unclassifiedSourceSpawn = spawnCapableFiles.filter((rel) => {
    const apiPath = routeFileToApiPath(rel);
    // Already covered by subcheck 1 (in a SPAWN_CAPABLE_ROUTE_ROOT)? Skip.
    if (SPAWN_CAPABLE_ROUTE_ROOTS.some((root) => rel.startsWith(root + "/"))) return false;
    // In the source-spawn allowlist? Skip.
    if (rel in KNOWN_UNCLASSIFIED_SOURCE_SPAWN) return false;
    // Classified local-only? Skip.
    if (isLocalOnlyPath(apiPath)) return false;
    return true;
  });

  // Report
  let failed = false;

  if (unclassified.length) {
    console.error(
      `[route-guard-membership] CRITICAL — ${unclassified.length} spawn-capable route(s) in SPAWN_CAPABLE_ROUTE_ROOTS NOT classified local-only (RCE-via-tunnel risk, Hard Rules #15/#17):\n` +
        unclassified.map((p) => `  ✗ ${p}`).join("\n") +
        `\n  → add a matching prefix to LOCAL_ONLY_API_PREFIXES or a pattern to LOCAL_ONLY_API_PATTERNS in src/server/authz/routeGuard.ts, or freeze in KNOWN_UNCLASSIFIED with justification.`
    );
    failed = true;
  }

  if (unclassifiedSourceSpawn.length) {
    console.error(
      `[route-guard-membership] CRITICAL — ${unclassifiedSourceSpawn.length} route.ts file(s) contain child_process/worker_threads but are NOT classified local-only (Hard Rules #15/#17):\n` +
        unclassifiedSourceSpawn.map((p) => `  ✗ ${p} (${routeFileToApiPath(p)})`).join("\n") +
        `\n  → classify in LOCAL_ONLY_API_PREFIXES / LOCAL_ONLY_API_PATTERNS, or freeze in KNOWN_UNCLASSIFIED_SOURCE_SPAWN with justification.`
    );
    failed = true;
  }

  if (failed) process.exit(1);
  if (process.exitCode === 1) return; // stale entries already logged

  console.log(
    `[route-guard-membership] OK — ` +
      `${apiPaths.length} route(s) in ${SPAWN_CAPABLE_ROUTE_ROOTS.length} root(s) all local-only; ` +
      `${spawnCapableFiles.length} source-spawn route(s) scanned, ` +
      `${Object.keys(KNOWN_UNCLASSIFIED_SOURCE_SPAWN).length} frozen as security debt, ` +
      `0 new gaps`
  );
  // Explicit exit: importing routeGuard.ts pulls in runtime settings, which opens
  // the SQLite DB and starts a background health-check timer that would otherwise
  // keep the process alive. The gate's work is done — exit cleanly.
  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
