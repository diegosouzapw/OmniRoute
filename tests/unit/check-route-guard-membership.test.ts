import { test } from "node:test";
import assert from "node:assert";
import {
  routeFileToApiPath,
  findUnclassifiedSpawnRoutes,
} from "../../scripts/check/check-route-guard-membership.ts";

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
