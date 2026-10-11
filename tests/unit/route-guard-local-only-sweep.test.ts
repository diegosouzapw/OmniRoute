/**
 * Hard Rules #15 + #17 — filesystem sweep of the spawn-capable route surface.
 *
 * Routes that spawn child processes (`npm install`, `node`, MCP stdio bridges,
 * embedded-service UIs) MUST be classified LOCAL_ONLY by `isLocalOnlyPath()` in
 * src/server/authz/routeGuard.ts, so a leaked JWT over a tunnel cannot reach a
 * spawn (GHSA-fhh6-4qxv-rpqj class). See docs/security/ROUTE_GUARD_TIERS.md.
 *
 * `npm run check:route-guard-membership` already enumerates the API roots. This
 * test is the LTS proof layer and covers what the gate does not:
 *   - the dashboard embed reverse proxy (`/dashboard/providers/services/<name>/embed/**`),
 *     which lives outside `src/app/api/` and so outside the gate's walk;
 *   - every write method, plus a pinned list of the GET exemptions inside these roots;
 *   - reachability: every LOCAL_ONLY route is classified MANAGEMENT, the only route
 *     class whose policy evaluates `isLocalOnlyPath()` (a PUBLIC- or CLIENT_API-classified
 *     path would never reach the loopback gate);
 *   - the manage-scope carve-out cannot cover the subprocess-spawning roots;
 *   - direct spawns in ANY file under src/app/api (helper modules next to route.ts
 *     included) plus `fork(` / `execSync(` / `spawnSync(`, which the gate's regex skips.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import {
  isLocalOnlyPath,
  LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES,
} from "../../src/server/authz/routeGuard.ts";
import { classifyRoute } from "../../src/server/authz/classify.ts";
import { SPAWN_CAPABLE_PREFIXES } from "../../src/shared/constants/spawnCapablePrefixes.ts";
import {
  KNOWN_UNCLASSIFIED_SOURCE_SPAWN,
  SPAWN_CAPABLE_ROUTE_ROOTS,
} from "../../scripts/check/check-route-guard-membership.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

/** Hard Rule #15 (`/api/mcp/`, `/api/cli-tools/runtime/`) + #17 (`/api/services/`) API roots. */
const API_ROOTS = ["src/app/api/mcp", "src/app/api/cli-tools/runtime", "src/app/api/services"];
/** Hard Rule #17 dashboard root; only its `<name>/embed/**` subtree is in scope. */
const EMBED_PARENT = "src/app/(dashboard)/dashboard/providers/services";

/**
 * GET/HEAD exemptions that legitimately sit inside the roots above
 * (LOCAL_ONLY_API_GET_EXEMPTIONS, #13941). Pinned so a new exemption under a
 * spawn-capable root is a deliberate, reviewed change.
 */
const EXPECTED_GET_EXEMPT = ["/api/mcp/audit", "/api/mcp/audit/stats"];

const WRITE_METHODS = ["POST", "PUT", "PATCH", "DELETE"];
const READ_METHODS = ["GET", "HEAD"];

function toPosix(p: string): string {
  return p.replace(/\\/g, "/");
}

function walk(dir: string, accept: (name: string) => boolean, acc: string[] = []): string[] {
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return acc;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, accept, acc);
    else if (accept(entry.name)) acc.push(toPosix(path.relative(repoRoot, full)));
  }
  return acc;
}

const isRouteFile = (name: string) => name === "route.ts" || name === "route.tsx";

/**
 * Map an App Router file to the public URL path(s) it serves, in the shape
 * `isLocalOnlyPath()` receives (`request.nextUrl.pathname`). Route groups
 * `(group)` vanish; `[param]` / `[...param]` become a concrete `_param_`
 * segment; an optional catch-all `[[...param]]` yields BOTH the bare path and
 * a filled sub-path, since Next serves the route for either URL.
 */
function routeFileToPublicPaths(relFile: string): string[] {
  const segments = toPosix(relFile)
    .replace(/^src\/app\//, "")
    .replace(/\/route\.tsx?$/, "")
    .split("/")
    .filter((seg) => !/^\(.+\)$/.test(seg));

  let variants: string[][] = [[]];
  for (const seg of segments) {
    const optionalCatchAll = /^\[\[\.\.\.([^\]]+)\]\]$/.exec(seg);
    if (optionalCatchAll) {
      variants = variants.flatMap((v) => [v, [...v, `_${optionalCatchAll[1]}_`, "nested"]]);
      continue;
    }
    const dynamic = /^\[(?:\.\.\.)?([^\]]+)\]$/.exec(seg);
    const mapped = dynamic ? `_${dynamic[1]}_` : seg;
    variants = variants.map((v) => [...v, mapped]);
  }
  return variants.map((v) => "/" + v.join("/"));
}

function collectInScopeRoutes(): { file: string; paths: string[] }[] {
  const apiFiles = API_ROOTS.flatMap((root) => walk(path.join(repoRoot, root), isRouteFile));
  const embedFiles = walk(path.join(repoRoot, EMBED_PARENT), isRouteFile).filter((f) =>
    /\/dashboard\/providers\/services\/[^/]+\/embed\//.test(f)
  );
  return [...apiFiles, ...embedFiles]
    .sort()
    .map((file) => ({ file, paths: routeFileToPublicPaths(file) }));
}

const IN_SCOPE = collectInScopeRoutes();
const IN_SCOPE_PATHS = IN_SCOPE.flatMap((r) => r.paths);

test("path mapper handles route groups, dynamic segments and optional catch-alls", () => {
  assert.deepEqual(routeFileToPublicPaths("src/app/api/services/[name]/logs/route.ts"), [
    "/api/services/_name_/logs",
  ]);
  assert.deepEqual(
    routeFileToPublicPaths(
      "src/app/(dashboard)/dashboard/providers/services/[name]/embed/[[...path]]/route.ts"
    ),
    [
      "/dashboard/providers/services/_name_/embed",
      "/dashboard/providers/services/_name_/embed/_path_/nested",
    ]
  );
});

test("every in-scope root contributes route files (the sweep is not vacuous)", () => {
  for (const root of API_ROOTS) {
    const count = IN_SCOPE.filter((r) => r.file.startsWith(root + "/")).length;
    assert.ok(count > 0, `${root} has no route.ts — root moved? update API_ROOTS`);
  }
  const embed = IN_SCOPE.filter((r) => r.file.startsWith(EMBED_PARENT + "/"));
  assert.ok(embed.length > 0, "no dashboard embed route found under " + EMBED_PARENT);
});

test("every mcp / cli-tools runtime / services / embed route is LOCAL_ONLY for every write method", () => {
  const misses: string[] = [];
  for (const { file, paths } of IN_SCOPE) {
    for (const p of paths) {
      if (!isLocalOnlyPath(p)) misses.push(`${p} (${file}) [no method]`);
      for (const method of WRITE_METHODS) {
        if (!isLocalOnlyPath(p, method)) misses.push(`${p} (${file}) [${method}]`);
      }
    }
  }
  assert.deepEqual(
    misses,
    [],
    "spawn-capable route(s) NOT classified local-only — add a prefix/pattern in " +
      "src/server/authz/routeGuard.ts (Hard Rules #15/#17)"
  );
});

test("read-method exemptions inside these roots are only the pinned read-only MCP audit routes", () => {
  const exempt = IN_SCOPE_PATHS.filter((p) =>
    READ_METHODS.some((method) => !isLocalOnlyPath(p, method))
  ).sort();
  assert.deepEqual(exempt, EXPECTED_GET_EXEMPT);

  for (const p of EXPECTED_GET_EXEMPT) {
    const route = IN_SCOPE.find((r) => r.paths.includes(p));
    assert.ok(route, `${p} has no route file`);
    const source = fs.readFileSync(path.join(repoRoot, route.file), "utf8");
    const handlers = [...source.matchAll(/export\s+(?:async\s+)?function\s+([A-Z]+)\s*\(/g)].map(
      (m) => m[1]
    );
    assert.deepEqual(handlers, ["GET"], `${route.file} must stay read-only (GET only)`);
    assert.equal(
      SPAWN_SOURCE_RE.test(stripLineComments(source)),
      false,
      `${route.file} is GET-exempt and must not spawn`
    );
  }
});

test("every in-scope route is classified MANAGEMENT, the route class whose policy runs the loopback gate", () => {
  // isLocalOnlyPath() is evaluated by the MANAGEMENT policy only; prove that wiring
  // so a LOCAL_ONLY prefix cannot be silently neutralised by a PUBLIC/CLIENT_API
  // classification (the /api/oauth/ trap documented in routeGuard.ts).
  const pipeline = fs.readFileSync(path.join(repoRoot, "src/server/authz/pipeline.ts"), "utf8");
  assert.match(pipeline, /MANAGEMENT:\s*managementPolicy/);
  const policy = fs.readFileSync(
    path.join(repoRoot, "src/server/authz/policies/management.ts"),
    "utf8"
  );
  assert.match(policy, /isLocalOnlyPath\(path,/);

  const misrouted: string[] = [];
  for (const p of IN_SCOPE_PATHS) {
    for (const method of ["GET", "POST"]) {
      const { routeClass } = classifyRoute(p, method);
      if (routeClass !== "MANAGEMENT") misrouted.push(`${method} ${p} -> ${routeClass}`);
    }
  }
  assert.deepEqual(misrouted, []);
});

test("the manage-scope carve-out can never cover the subprocess-spawning roots", () => {
  // Only /api/mcp/ is bypassable by default; /api/services/ and
  // /api/cli-tools/runtime/ are in the compile-time spawn-capable deny-list, which
  // the settings schema and isLocalOnlyBypassableByManageScope() both enforce.
  assert.deepEqual([...LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES], ["/api/mcp/"]);
  for (const prefix of ["/api/services/", "/api/cli-tools/runtime/"]) {
    assert.ok(SPAWN_CAPABLE_PREFIXES.includes(prefix), `${prefix} missing from deny-list`);
  }
});

test("the route-guard-membership gate walks the same Hard Rule #15/#17 API roots", () => {
  for (const root of API_ROOTS) {
    assert.ok(
      SPAWN_CAPABLE_ROUTE_ROOTS.includes(root),
      `${root} dropped from SPAWN_CAPABLE_ROUTE_ROOTS in check-route-guard-membership.ts`
    );
  }
});

// Direct process-spawn evidence in source. Broader than the gate's regex: adds
// spawnSync / execSync / fork and dynamic `import("child_process")`. `.exec(` (RegExp)
// is excluded by requiring a non-identifier, non-dot character before `exec`.
const SPAWN_SOURCE_RE =
  /(?:from\s+["'](?:node:)?(?:child_process|worker_threads)["']|(?:require|import)\s*\(\s*["'](?:node:)?(?:child_process|worker_threads)["']\s*\)|(?:^|[^.\w])(?:spawn|spawnSync|execFile|execFileSync|execSync|exec|fork)\s*\()/m;

/** Drop full-line comments so prose such as "uses child_process" is not evidence. */
function stripLineComments(source: string): string {
  return source
    .split("\n")
    .filter((line) => !/^\s*(?:\/\/|\/\*|\*)/.test(line))
    .join("\n");
}

test("every src/app/api file that spawns a process directly is owned by a LOCAL_ONLY route", () => {
  const files = walk(path.join(repoRoot, "src/app/api"), (name) =>
    /\.(?:ts|tsx|mjs|js)$/.test(name)
  );
  const spawning = files.filter((f) =>
    SPAWN_SOURCE_RE.test(stripLineComments(fs.readFileSync(path.join(repoRoot, f), "utf8")))
  );
  assert.ok(spawning.length > 0, "spawn scan matched nothing — regex or tree layout broke");

  const unclassified: string[] = [];
  for (const file of spawning) {
    if (file in KNOWN_UNCLASSIFIED_SOURCE_SPAWN) continue; // frozen + justified in the gate
    // A helper module next to route.ts belongs to the route directory that holds it.
    const owner = isRouteFile(path.basename(file)) ? file : path.dirname(file) + "/route.ts";
    for (const p of routeFileToPublicPaths(owner)) {
      if (!isLocalOnlyPath(p)) unclassified.push(`${file} -> ${p}`);
    }
  }
  assert.deepEqual(
    unclassified,
    [],
    "direct spawn in a route NOT classified local-only (Hard Rules #15/#17)"
  );
});
