import { test } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  routeFileToApiPath,
  findUnclassifiedSpawnRoutes,
  isSpawnCapableSource,
  findSpawnCapableRoutes,
  KNOWN_UNCLASSIFIED_SOURCE_SPAWN,
} from "../../scripts/check/check-route-guard-membership.ts";
import { isLocalOnlyPath } from "../../src/server/authz/routeGuard.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// Synthetic isLocalOnlyPath: classifies anything under the three spawn-capable
// prefixes via startsWith. Mirrors the real predicate's prefix semantics without
// importing routeGuard.ts (keeps this test DB-free / pure).
const SYNTHETIC_PREFIXES = ["/api/mcp/", "/api/cli-tools/runtime/", "/api/services/"];
const isLocalOnly = (path: string): boolean =>
  SYNTHETIC_PREFIXES.some((p) => path === p || path.startsWith(p));

test("routeFileToApiPath maps a Next App Router route.ts to its URL path", () => {
  assert.equal(
    routeFileToApiPath("src/app/api/services/9router/install/route.ts"),
    "/api/services/9router/install"
  );
});

test("routeFileToApiPath resolves dynamic [param] segments to a concrete placeholder", () => {
  assert.equal(
    routeFileToApiPath("src/app/api/services/[name]/logs/route.ts"),
    "/api/services/_name_/logs"
  );
  assert.equal(
    routeFileToApiPath("src/app/api/cli-tools/runtime/[toolId]/route.ts"),
    "/api/cli-tools/runtime/_toolId_"
  );
});

test("routeFileToApiPath normalizes Windows backslash separators before stripping prefixes", () => {
  // On Windows, node:path join() yields backslash-separated paths; without the
  // leading `.replace(/\\/g, "/")` the `^src\/app` strip never matches and the
  // route-guard gate produces wrong API paths (false negatives that miss
  // RCE-capable spawn routes). See PR #5613.
  assert.equal(
    routeFileToApiPath("src\\app\\api\\services\\9router\\install\\route.ts"),
    "/api/services/9router/install"
  );
});

test("no unclassified routes when every spawn-capable route is local-only", () => {
  const routes = [
    "/api/mcp/tools",
    "/api/services/9router/start",
    "/api/cli-tools/runtime/_toolId_",
  ];
  assert.deepEqual(findUnclassifiedSpawnRoutes(routes, isLocalOnly, {}), []);
});

test("flags a spawn-capable route that is NOT classified local-only (RCE-via-tunnel gap)", () => {
  // Synthetic predicate that forgot to cover /api/services/ — the exact regression
  // this gate guards against.
  const leaky = (path: string): boolean => path.startsWith("/api/mcp/");
  assert.deepEqual(
    findUnclassifiedSpawnRoutes(
      ["/api/mcp/tools", "/api/services/cliproxy/install"],
      leaky,
      {}
    ),
    ["/api/services/cliproxy/install"]
  );
});

test("allowlisted routes are not flagged (frozen pre-existing exceptions)", () => {
  const leaky = (path: string): boolean => path.startsWith("/api/mcp/");
  assert.deepEqual(
    findUnclassifiedSpawnRoutes(
      ["/api/mcp/tools", "/api/services/legacy/route"],
      leaky,
      { "/api/services/legacy/route": "frozen pre-existing exception" }
    ),
    []
  );
});

test("flags multiple unclassified routes, preserves input order", () => {
  const leaky = (): boolean => false;
  assert.deepEqual(
    findUnclassifiedSpawnRoutes(["/api/services/a", "/api/mcp/b", "/api/services/c"], leaky, {}),
    ["/api/services/a", "/api/mcp/b", "/api/services/c"]
  );
});

// --- 6A.8: new subcheck — source-based spawn detection ---

test("6A.8 isSpawnCapableSource: detects child_process import in route source", () => {
  const src = `import { execFile } from "child_process";\nexport async function GET() {}`;
  assert.ok(isSpawnCapableSource(src), "should detect child_process import");
});

test("6A.8 isSpawnCapableSource: detects node:child_process import", () => {
  const src = `import { execFileSync } from "node:child_process";\nexport async function GET() {}`;
  assert.ok(isSpawnCapableSource(src), "should detect node:child_process import");
});

test("6A.8 isSpawnCapableSource: detects worker_threads import", () => {
  const src = `import { Worker } from "worker_threads";\nexport async function GET() {}`;
  assert.ok(isSpawnCapableSource(src), "should detect worker_threads import");
});

test("6A.8 isSpawnCapableSource: detects spawn( in source", () => {
  const src = `const { spawn } = require("child_process");\nspawn("npm", ["install"]);`;
  assert.ok(isSpawnCapableSource(src), "should detect spawn(");
});

test("6A.8 isSpawnCapableSource: returns false for normal route source", () => {
  const src = `import { NextResponse } from "next/server";\nexport async function GET() { return NextResponse.json({}); }`;
  assert.ok(!isSpawnCapableSource(src), "should not flag normal route");
});

test("6A.8 findSpawnCapableRoutes: detects real spawn-capable route.ts files", () => {
  // system/version and db-backups/exportAll are known spawn-capable outside SPAWN_CAPABLE_ROUTE_ROOTS
  const knownSpawnRoutes = [
    "src/app/api/system/version/route.ts",
    "src/app/api/db-backups/exportAll/route.ts",
  ];
  const found = findSpawnCapableRoutes(repoRoot);
  for (const r of knownSpawnRoutes) {
    assert.ok(found.includes(r), `expected ${r} in spawn-capable routes, found: ${found.join(", ")}`);
  }
});

test("6A.8 P1 RESOLVED: spawn-capable system/db-backups routes are classified local-only, not frozen", () => {
  // RESOLVED 2026-06-13: these 2 spawn-capable routes were moved from KNOWN_UNCLASSIFIED
  // into LOCAL_ONLY_API_PREFIXES (loopback-enforced before auth). The freeze set must now
  // be empty, and isLocalOnlyPath must match their api paths.
  assert.equal(
    Object.keys(KNOWN_UNCLASSIFIED_SOURCE_SPAWN).length,
    0,
    "KNOWN_UNCLASSIFIED_SOURCE_SPAWN must be empty once the routes are classified (stale-enforcement)"
  );
  assert.equal(isLocalOnlyPath("/api/system/version"), true);
  assert.equal(isLocalOnlyPath("/api/db-backups/exportAll"), true);
});

test("#7948: /api/acp/agents (transitive execFileSync via registry) is classified local-only", () => {
  // /api/acp/agents is spawn-capable only transitively (route.ts imports
  // src/lib/acp/registry.ts, which calls execFileSync) — the source-scan
  // subcheck above only greps the route file itself, so it cannot catch this
  // class of gap. This assertion is the direct regression guard for #7948.
  assert.equal(isLocalOnlyPath("/api/acp/agents"), true);
});

test("6A.8: spawn-capable routes in SPAWN_CAPABLE_ROUTE_ROOTS are still all classified local-only", async () => {
  // The original subcheck (SPAWN_CAPABLE_ROUTE_ROOTS) must still pass.
  // This test is a regression guard — the new source-scan does not break the old check.
  const { isLocalOnlyPath } = await import("../../src/server/authz/routeGuard.ts");
  const rootPrefixes = ["/api/services/", "/api/mcp/", "/api/cli-tools/runtime/"];
  for (const prefix of rootPrefixes) {
    assert.ok(isLocalOnlyPath(prefix + "test"), `expected ${prefix} to be local-only`);
  }
});
