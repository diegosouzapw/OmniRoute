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
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { isLocalOnlyPath } from "@/server/authz/routeGuard.ts";

// Spawn-capable route roots (relative to repo root). Mirrors the spawn-capable
// prefixes documented in routeGuard.ts (SPAWN_CAPABLE_PREFIXES) and CLAUDE.md
// Hard Rules #15/#17 for the dirs that physically exist under src/app/api/.
export const SPAWN_CAPABLE_ROUTE_ROOTS: ReadonlyArray<string> = [
  "src/app/api/services",
  "src/app/api/mcp",
  "src/app/api/cli-tools/runtime",
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
  const apiPaths = SPAWN_CAPABLE_ROUTE_ROOTS.flatMap(collectRouteFiles)
    .map(routeFileToApiPath)
    .sort();

  const unclassified = findUnclassifiedSpawnRoutes(apiPaths, isLocalOnlyPath, KNOWN_UNCLASSIFIED);

  if (unclassified.length) {
    console.error(
      `[route-guard-membership] CRITICAL — ${unclassified.length} spawn-capable route(s) NOT classified local-only by isLocalOnlyPath() (RCE-via-tunnel risk, Hard Rules #15/#17):\n` +
        unclassified.map((p) => `  ✗ ${p}`).join("\n") +
        `\n  → add a matching prefix to LOCAL_ONLY_API_PREFIXES or a pattern to LOCAL_ONLY_API_PATTERNS in src/server/authz/routeGuard.ts (loopback enforcement must run before auth), or — only with written justification — freeze it in KNOWN_UNCLASSIFIED (scripts/check/check-route-guard-membership.ts).`
    );
    process.exit(1);
  }

  console.log(
    `[route-guard-membership] OK — ${apiPaths.length} spawn-capable route(s) across ${SPAWN_CAPABLE_ROUTE_ROOTS.length} root(s) all classified local-only, ${Object.keys(KNOWN_UNCLASSIFIED).length} frozen exception(s)`
  );
  // Explicit exit: importing routeGuard.ts pulls in runtime settings, which opens
  // the SQLite DB and starts a background health-check timer that would otherwise
  // keep the process alive. The gate's work is done — exit cleanly.
  process.exit(0);
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) main();
