import { test } from "node:test";
import assert from "node:assert";
import {
  resolveApiPathToRoute,
  resolveApiPathToRouteFile,
  resolveApiPrefixToRoute,
  routeExportsMethod,
} from "../../scripts/check/check-fetch-targets.mjs";

// ─── existing: static path resolution ────────────────────────────────────────

test("matches a static route file", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/usage", files), true);
});

test("matches a dynamic [param] segment", () => {
  const files = new Set(["src/app/api/providers/[id]/models/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/providers/abc-123/models", files), true);
});

test("rejects a hallucinated route", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/providers/refresh", files), false);
});

test("does not match when segment counts differ", () => {
  const files = new Set(["src/app/api/providers/[id]/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/providers/abc/models", files), false);
});

test("strips query string before resolving", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  assert.equal(resolveApiPathToRoute("/api/usage?range=7d", files), true);
});

// ─── subcheck 1: static preferred over dynamic (expanded scope support) ──────

test("resolveApiPathToRouteFile prefers static route over dynamic", () => {
  const files = new Set([
    "src/app/api/combos/[id]/route.ts",
    "src/app/api/combos/test/route.ts",
  ]);
  const rf = resolveApiPathToRouteFile("/api/combos/test", files);
  assert.equal(rf, "src/app/api/combos/test/route.ts");
});

test("resolveApiPathToRouteFile falls back to dynamic when no static match", () => {
  const files = new Set(["src/app/api/combos/[id]/route.ts"]);
  const rf = resolveApiPathToRouteFile("/api/combos/abc-123", files);
  assert.equal(rf, "src/app/api/combos/[id]/route.ts");
});

test("resolveApiPathToRouteFile returns null for hallucinated routes", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  const rf = resolveApiPathToRouteFile("/api/hallucinated", files);
  assert.equal(rf, null);
});

// ─── subcheck 2: template literal prefix matching ────────────────────────────

test("resolveApiPrefixToRoute: prefix with exact depth resolves", () => {
  const files = new Set(["src/app/api/providers/[id]/route.ts"]);
  // fetch(`/api/providers/${id}`) → prefix "/api/providers/" → depth 2
  assert.equal(resolveApiPrefixToRoute("/api/providers/", files), true);
});

test("resolveApiPrefixToRoute: deeper route satisfies shallow prefix", () => {
  // fetch(`/api/providers/${id}/models`) → prefix "/api/providers/" → route with 3 segs also matches
  const files = new Set(["src/app/api/providers/[id]/models/route.ts"]);
  assert.equal(resolveApiPrefixToRoute("/api/providers/", files), true);
});

test("resolveApiPrefixToRoute: rejects hallucinated prefix", () => {
  const files = new Set(["src/app/api/usage/route.ts"]);
  assert.equal(resolveApiPrefixToRoute("/api/hallucinated/", files), false);
});

test("resolveApiPrefixToRoute: strips query params from prefix", () => {
  const files = new Set(["src/app/api/usage/analytics/route.ts"]);
  assert.equal(resolveApiPrefixToRoute("/api/usage/analytics?since=", files), true);
});

// ─── subcheck 3: HTTP method validation ──────────────────────────────────────

test("routeExportsMethod: detects direct export function", () => {
  const src = `export async function POST(request: Request) { return new Response(); }`;
  assert.equal(routeExportsMethod(src, "POST"), true);
});

test("routeExportsMethod: detects export const", () => {
  const src = `export const DELETE = async (req: Request) => {};`;
  assert.equal(routeExportsMethod(src, "DELETE"), true);
});

test("routeExportsMethod: detects re-exported method", () => {
  const src = `export { GET, PUT } from "@/app/api/settings/compression/route";`;
  assert.equal(routeExportsMethod(src, "PUT"), true);
});

test("routeExportsMethod: returns false when method not present", () => {
  const src = `export async function GET(request: Request) { return new Response(); }`;
  assert.equal(routeExportsMethod(src, "PUT"), false);
});

test("routeExportsMethod: re-export does not match absent method", () => {
  const src = `export { GET, POST } from "@/app/api/other/route";`;
  assert.equal(routeExportsMethod(src, "DELETE"), false);
});
