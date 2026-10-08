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
  // GHSA-35fw-cv32-2373: the 14 cli-tools routes that reach the same spawn as the siblings
  // above via getCliRuntimeStatus() (13) or detectAllTools() -> execFile (detect).
  "src/app/api/cli-tools/all-statuses", // GET calls getCliRuntimeStatus() per CLI_TOOL_IDS entry (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/claude-settings", // GET calls getCliRuntimeStatus() to detect the `claude` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/cline-settings", // GET calls getCliRuntimeStatus() to detect the `cline` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/codewhale-settings", // GET calls getCliRuntimeStatus() to detect the `codewhale` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/codex-settings", // GET calls getCliRuntimeStatus() to detect the `codex` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/crush-settings", // GET calls getCliRuntimeStatus() to detect the `crush` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/deepseek-tui-settings", // GET calls getCliRuntimeStatus() to detect the `deepseek-tui` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/detect", // GET calls detectAllTools() -> execFile(binary, --version) + execFile("which") per tool via src/lib/cli-helper/tool-detector.ts (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/droid-settings", // GET calls getCliRuntimeStatus() to detect the `droid` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/kilo-settings", // GET calls getCliRuntimeStatus() to detect the `kilo` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/openclaw-settings", // GET calls getCliRuntimeStatus() to detect the `openclaw` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/pi-settings", // GET calls getCliRuntimeStatus() to detect the `pi` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/smelt-settings", // GET calls getCliRuntimeStatus() to detect the `smelt` CLI install (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  "src/app/api/cli-tools/status", // GET calls getCliRuntimeStatus() per CLI_TOOL_IDS entry (Hard Rules #15 + #17, GHSA-35fw-cv32-2373)
  // GHSA-jx89-f37j-pq89: skills install + execute reach childProcess.spawn transitively
  // (executor.ts -> builtins.ts -> sandbox.ts) — invisible to the source-scan subcheck.
  "src/app/api/skills/install", // POST stores handlerCode verbatim; a built-in name aliases execute_command / eval_code (Hard Rules #15 + #17, GHSA-jx89-f37j-pq89)
  "src/app/api/skills/executions", // POST runs skillExecutor.execute() -> sandbox container spawn (Hard Rules #15 + #17, GHSA-jx89-f37j-pq89)
  // install / start / restart / stop reach the CLIProxyAPI download + ServiceSupervisor spawn
  // transitively, which the source-scan subcheck cannot see.
  "src/app/api/version-manager", // downloads, unpacks and runs the CLIProxyAPI binary (Hard Rules #15 + #17)
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
 * G-09 (#15159): follow spawn capability through the IMPORT GRAPH.
 *
 * The source-scan subcheck above reads one `route.ts` in isolation, so it cannot
 * see `route.ts -> fetchCursorAgentModels() -> runCursorAgent() -> spawn()`. That
 * blind spot is why `src/app/api/providers/[id]/models/route.ts` sits frozen in
 * KNOWN_UNCLASSIFIED_SOURCE_SPAWN: its own comment names G-09 as the reason.
 *
 * The functions below build a bounded import graph over the repo's three alias
 * conventions and answer "does this route reach a spawn-capable module?".
 */

// Extensions tried, in order, when an import specifier has no extension.
const RESOLVE_EXTENSIONS = [".ts", ".tsx", ".js", ".mjs", ".cjs", ".mts"];
const RESOLVE_INDEX_FILES = ["index.ts", "index.tsx", "index.js", "index.mjs"];

/** Default ceiling on import-graph hops. Deep enough for real chains, bounded for CI. */
export const DEFAULT_IMPORT_WALK_DEPTH = 6;

/**
 * Spawn detection for a MODULE reached through the import graph.
 *
 * Deliberately STRICTER than SPAWN_SOURCE_RE above, and both differences are
 * load-bearing. Each was found by RUNNING the graph walk against the real repo,
 * not by reasoning about the regex:
 *
 * 1. SPAWN_SOURCE_RE's `exec\s*\(` also matches a REGEX literal's member call
 *    (`.exec(`), because `\b` matches between `.` and `e`. Tolerable scanning
 *    route.ts files; catastrophic across a module graph, where every file using
 *    a regex would look spawn-capable. The bare-call forms here use a
 *    `(?<![.\w])` lookbehind, exactly like the error-helper gate's RAW_ERR
 *    pattern: only an UNQUALIFIED call counts, never a method call.
 *
 * 2. COMMENTS must be stripped. `src/server/authz/routeGuard.ts` documents the
 *    spawn surface extensively in prose ("… -> spawn() — but sat on Tier 3 …"),
 *    and without stripping, every route importing it looked spawn-capable. The
 *    first two graph runs reported ~1,000 then 710 routes for this reason.
 *
 * String literals are deliberately NOT stripped: a `spawn(` inside a template
 * literal is rare, and erring toward a false positive here is the safe
 * direction for a security gate.
 */
const MODULE_SPAWN_RE =
  /(?:\bfrom\s+["'](?:node:)?(?:child_process|worker_threads)["']|\brequire\s*\(\s*["'](?:node:)?(?:child_process|worker_threads)["']\s*\)|(?<![.\w])(?:spawn|execFile|execFileSync|exec|spawnSync|fork)\s*\()/;

/**
 * True if a MODULE (not a route.ts) is spawn-capable. Uses the strict pattern
 * above — see MODULE_SPAWN_RE for why it differs from SPAWN_SOURCE_RE.
 */
export function isSpawnCapableModuleSource(source: string): boolean {
  // Strip block and line comments before matching. The `[^:]` guard on line
  // comments preserves `://` inside a URL string literal.
  const code = source.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
  return MODULE_SPAWN_RE.test(code);
}

/**
 * Extract the module specifiers a source file imports at RUNTIME.
 *
 * Handles static `import ... from "x"`, side-effect `import "x"`, `require("x")`
 * and dynamic `await import("x")`. Type-only imports are skipped: they carry no
 * runtime edge, and following them would pull the type graph into a gate about
 * process spawning.
 */
export function resolveImportSpecifiers(source: string): string[] {
  const specs = new Set<string>();
  const withoutComments = source
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");

  const patterns = [
    // import type { T } from "x"  -> deliberately NOT matched (see above)
    /\bimport\s+(?!type\b)[\s\S]*?from\s*["']([^"']+)["']/g,
    /\bimport\s+["']([^"']+)["']/g, // side-effect import
    /\brequire\s*\(\s*["']([^"']+)["']\s*\)/g,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/g, // dynamic import
  ];
  for (const pattern of patterns) {
    for (const match of withoutComments.matchAll(pattern)) {
      if (match[1]) specs.add(match[1]);
    }
  }
  return [...specs];
}

/** Repo-relative POSIX path, or null when the path escapes the repo. */
function toRepoRelative(repoRoot: string, absolute: string): string | null {
  const rel = relative(repoRoot, absolute);
  if (!rel || rel.startsWith("..") || /^[A-Za-z]:/.test(rel)) return null;
  return rel.replace(/\\/g, "/");
}

/**
 * Resolve one import specifier to a repo-relative file path, or null when it
 * cannot be resolved to a real source file.
 *
 * Handles the three alias conventions this repo uses:
 *   "@/x"                    -> src/x
 *   "@omniroute/open-sse[/x]" -> open-sse[/x]
 *   "./x" / "../x"            -> relative to the importer's directory
 *
 * Bare "node:*" specifiers and unresolvable paths return null (not an error —
 * node builtins cannot spawn through an import graph walk we care about here,
 * and a null is simply "no edge").
 */
export function resolveImportToRepoFile(
  specifier: string,
  importerRelPath: string,
  repoRoot: string,
  existsSyncFn: (p: string) => boolean
): string | null {
  let base: string | null = null;

  if (specifier.startsWith("@/")) {
    base = `src/${specifier.slice(2)}`;
  } else if (specifier === "@omniroute/open-sse") {
    base = "open-sse";
  } else if (specifier.startsWith("@omniroute/open-sse/")) {
    base = `open-sse/${specifier.slice("@omniroute/open-sse/".length)}`;
  } else if (specifier.startsWith("./") || specifier.startsWith("../")) {
    const importerDir = importerRelPath.slice(0, importerRelPath.lastIndexOf("/"));
    base = `${importerDir}/${specifier}`;
  } else {
    return null; // bare package or node: builtin
  }

  // Collapse "./" and "../" segments without touching the filesystem.
  const segments: string[] = [];
  for (const segment of base.split("/")) {
    if (segment === "." || segment === "") continue;
    if (segment === "..") {
      segments.pop();
      continue;
    }
    segments.push(segment);
  }
  const normalized = segments.join("/");
  if (!normalized || normalized.startsWith("..")) return null;

  const absoluteBase = join(repoRoot, normalized);
  const candidates = [
    normalized,
    ...RESOLVE_EXTENSIONS.map((ext) => `${normalized}${ext}`),
    ...RESOLVE_INDEX_FILES.map((file) => `${normalized}/${file}`),
  ];
  for (const candidate of candidates) {
    if (existsSyncFn(join(repoRoot, candidate))) return candidate;
  }
  return null;
}

/**
 * Build a bounded import graph (adjacency: repo-relative path -> resolved
 * repo-relative imports) starting from `entryFiles`.
 *
 * Bounded by `maxDepth` hops so one route cannot pull the entire module graph
 * into memory. Cycles are handled by the visited set, so a mutual-import pair
 * terminates instead of hanging the gate.
 */
export function buildImportGraph(opts: {
  repoRoot: string;
  entryFiles: string[];
  maxDepth?: number;
}): Map<string, Set<string>> {
  const { repoRoot, entryFiles } = opts;
  const maxDepth = opts.maxDepth ?? DEFAULT_IMPORT_WALK_DEPTH;
  const existsSyncFn = (p: string) => {
    try {
      return statSync(p).isFile();
    } catch {
      return false;
    }
  };

  const graph = new Map<string, Set<string>>();
  const queue: { file: string; depth: number }[] = entryFiles.map((file) => ({
    file,
    depth: 0,
  }));
  const seen = new Set<string>();

  while (queue.length) {
    const { file, depth } = queue.shift()!;
    if (seen.has(file)) continue;
    seen.add(file);

    let source: string;
    try {
      source = readFileSync(join(repoRoot, file), "utf8");
    } catch {
      continue; // unreadable / vanished between walk steps
    }

    const edges = new Set<string>();
    graph.set(file, edges);
    if (depth >= maxDepth) continue;

    for (const specifier of resolveImportSpecifiers(source)) {
      const resolved = resolveImportToRepoFile(specifier, file, repoRoot, existsSyncFn);
      if (!resolved) continue;
      edges.add(resolved);
      if (!seen.has(resolved)) queue.push({ file: resolved, depth: depth + 1 });
    }
  }

  return graph;
}

/**
 * Does `entryFile` reach a spawn-capable module through the import graph?
 * Returns the path walked so a report can name the actual chain.
 */
export function reachesSpawnCapableModule(
  graph: Map<string, Set<string>>,
  repoRoot: string,
  entryFile: string,
  opts: { maxDepth?: number } = {}
): { reachable: boolean; via: string[] } {
  const maxDepth = opts.maxDepth ?? DEFAULT_IMPORT_WALK_DEPTH;
  const existsSyncFn = (p: string) => {
    try {
      return statSync(p).isFile();
    } catch {
      return false;
    }
  };

  // Breadth-first so `via` is a genuine shortest chain, which is what makes a
  // report readable ("route -> a -> b -> spawn module"). The predecessor map is
  // what reconstructs that chain — tracking a mutable path across a frontier
  // would be wrong, since a frontier holds many nodes at the same depth.
  const visited = new Set<string>([entryFile]);
  const parent = new Map<string, string>();
  let frontier = [entryFile];

  for (let depth = 0; depth < maxDepth && frontier.length; depth++) {
    const nextFrontier: string[] = [];
    for (const current of frontier) {
      for (const neighbor of graph.get(current) ?? []) {
        if (visited.has(neighbor)) continue;
        visited.add(neighbor);
        parent.set(neighbor, current);

        let source = "";
        try {
          source = readFileSync(join(repoRoot, neighbor), "utf8");
        } catch {
          continue;
        }
        if (isSpawnCapableModuleSource(source)) {
          // Reconstruct the chain from the predecessor map.
          const via = [neighbor];
          let cursor = current;
          while (cursor !== entryFile) {
            via.unshift(cursor);
            const previous = parent.get(cursor);
            if (previous === undefined) break;
            cursor = previous;
          }
          via.unshift(entryFile);
          return { reachable: true, via };
        }
        nextFrontier.push(neighbor);
      }
    }
    frontier = nextFrontier;
  }

  return { reachable: false, via: [] };
}

/** Every route.ts under src/app/api that reaches a spawn module with no direct spawn. */
export function findTransitivelySpawnCapableRoutes(opts: {
  repoRoot: string;
  maxDepth?: number;
}): { route: string; via: string[] }[] {
  const { repoRoot } = opts;
  const apiDir = join(repoRoot, "src", "app", "api");
  const routeFiles: string[] = [];

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
        if (statSync(full).isDirectory()) walk(full);
        else if (entry === "route.ts") {
          const rel = toRepoRelative(repoRoot, full);
          if (rel) routeFiles.push(rel);
        }
      } catch {
        // skip unreadable
      }
    }
  }
  walk(apiDir);
  routeFiles.sort();

  // Only routes WITHOUT a direct spawn are interesting — the source scan already
  // covers the rest, and reporting those again would be noise.
  const indirect = routeFiles.filter((rel) => {
    try {
      return !isSpawnCapableSource(readFileSync(join(repoRoot, rel), "utf8"));
    } catch {
      return false;
    }
  });

  if (!indirect.length) return [];
  const graph = buildImportGraph({
    repoRoot,
    entryFiles: indirect,
    maxDepth: opts.maxDepth ?? DEFAULT_IMPORT_WALK_DEPTH,
  });

  const found: { route: string; via: string[] }[] = [];
  for (const route of indirect) {
    const result = reachesSpawnCapableModule(graph, repoRoot, route, {
      maxDepth: opts.maxDepth ?? DEFAULT_IMPORT_WALK_DEPTH,
    });
    if (result.reachable) found.push({ route, via: result.via });
  }
  return found;
}

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
  // S-01 (audit #15159, 2026-09-30): NOT unclassified security debt — the spawn IS
  // classified, just not at the path level, so this freeze records a deliberate
  // design decision rather than an open gap.
  //
  // `src/app/api/providers/[id]/models/route.ts` transitively spawns via
  // fetchCursorAgentModels() -> runCursorAgent() -> spawn() at
  // src/lib/providerModels/cursorAgent.ts:17, but ONLY on the `provider === "cursor"`
  // branch. `{id}` is a CONNECTION id, never a provider name, so NO path pattern can
  // separate the Cursor spawn from the ~50 other providers' pure-HTTP discovery in
  // this same route. Gating `/api/providers/[^/]+/models` as a LOCAL_ONLY pattern
  // would lock remote model discovery for every non-Cursor provider — precisely the
  // over-broadening the `/api/providers/[^/]+/login` precedent exists to avoid.
  //
  // Enforced instead at the spawn call site: the route requires
  // `x-omniroute-peer-locality === "loopback"` (stamped by the authz pipeline from the
  // real TCP peer, never the spoofable Host header) before calling
  // fetchCursorAgentModels(), and fails closed to the cached/local catalog otherwise —
  // the same pattern as handleCursorAgentImageGeneration in
  // open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts.
  // Regression guard: tests/unit/authz/route-guard-providers-spawn-local-only.test.ts
  // (asserts the guard exists, precedes the spawn, and fails closed).
  //
  // G-09 (same audit) RESOLVED differently than assumed: the gate DID detect this
  // route, but only because SPAWN_SOURCE_RE matches `spawn(` inside the COMMENT at
  // route.ts:1454 ("-> spawn() at src/lib/providerModels/cursorAgent.ts:17"). The
  // route's own code has no spawn — reachability is genuinely transitive. So the
  // import-graph walk (resolveImportSpecifiers / buildImportGraph /
  // reachesSpawnCapableModule) is now in place and reaches
  // src/lib/providerModels/cursorAgent.ts independently of any comment.
  //
  // The freeze therefore STAYS, on its original S-01 merits (provider-conditional
  // spawn, call-site loopback gate, fail-closed) — NOT on a detection gap.
  // NOTE: do not "fix" this by rewording the comment; the entry documents a real
  // security decision, and the comment match is what kept the route classified
  // while the graph walk was missing.
  "src/app/api/providers/[id]/models/route.ts":
    'S-01 #15159: cursor-agent spawn is provider-conditional (provider === "cursor") and `{id}` is a connection id, ' +
    "so it cannot be path-classified without locking every other provider's remote model discovery. " +
    "Gated at the call site on the trusted x-omniroute-peer-locality loopback stamp instead (fail-closed). " +
    "G-09 closed: the gate now follows this chain via the import graph (was previously matching a comment).",
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
