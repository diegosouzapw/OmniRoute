/**
 * tests/unit/quota-key-models-route.test.ts
 *
 * Task 2 (quota-share-v2) — source-level assertions for:
 *   GET /api/quota/keys/[id]/models
 *
 * Uses the same source-scan technique as:
 *   tests/unit/quota-groups-route.test.ts
 *   tests/unit/quota-pool-log-route.test.ts
 *
 * This allows the test to run with the Node.js native test runner without a
 * Next.js / DOM setup, while providing strong structural coverage of:
 *   - Auth guard pattern (requireManagementAuth, 401 gate)
 *   - Error sanitization (buildErrorBody, no raw err.stack / err.message leaks)
 *   - Quota model resolution imports (resolveQuotaKeyScope, filterModelsToQuotaPools)
 *   - Response shape ({ models })
 *   - 404 on missing key (buildErrorBody(404, ...))
 *   - force-dynamic export
 *   - await params (Next 16 async params pattern)
 *   - DB imports sourced from @/lib/localDb
 *
 * The behavioral path (allowedQuotas → scope → filterModelsToQuotaPools → models)
 * is covered by:
 *   - tests/unit/quota-catalog-filter.test.ts — filterModelsToQuotaPools unit tests
 *   - tests/unit/quota-key-resolve.test.ts   — resolveQuotaKeyScope unit tests
 *   - tests/unit/quota-group-scope.test.ts   — group-scoped pool resolution
 * Re-testing the same logic inline here would duplicate DB-setup boilerplate
 * without additional signal. Source-scan matches the project's established
 * convention for route test files (quota-groups-route.test.ts, etc.).
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const ROUTE_PATH = join(ROOT, "src/app/api/quota/keys/[id]/models/route.ts");

const src = readFileSync(ROUTE_PATH, "utf8");

// ── Auth guard ────────────────────────────────────────────────────────────────

test("quota/keys/[id]/models: imports requireManagementAuth", () => {
  assert.ok(
    src.includes("requireManagementAuth"),
    "route must import and call requireManagementAuth",
  );
});

test("quota/keys/[id]/models: GET calls requireManagementAuth before data access", () => {
  const getIdx = src.indexOf("export async function GET");
  assert.ok(getIdx >= 0, "GET handler must exist");
  const getBody = src.slice(getIdx);
  const authIdx = getBody.indexOf("requireManagementAuth(request)");
  const dataIdx = getBody.indexOf("getApiKeyById(");
  assert.ok(authIdx >= 0, "requireManagementAuth call must be present in GET handler");
  assert.ok(dataIdx >= 0, "getApiKeyById call must be present in GET handler");
  assert.ok(authIdx < dataIdx, "auth check must come before getApiKeyById call");
});

test("quota/keys/[id]/models: GET returns early when authError is truthy", () => {
  const getIdx = src.indexOf("export async function GET");
  const getBody = src.slice(getIdx);
  assert.ok(
    getBody.includes("if (authError) return authError"),
    "GET must return authError immediately — 401 without auth",
  );
});

// ── Error sanitization ────────────────────────────────────────────────────────

test("quota/keys/[id]/models: imports buildErrorBody from @omniroute/open-sse/utils/error", () => {
  assert.ok(
    src.includes("buildErrorBody"),
    "route must use buildErrorBody — Hard Rule #12",
  );
  assert.ok(
    src.includes("@omniroute/open-sse/utils/error"),
    "route must import buildErrorBody from @omniroute/open-sse/utils/error",
  );
});

test("quota/keys/[id]/models: does NOT leak raw err.stack in response", () => {
  assert.ok(!src.includes("err.stack"), "route must not leak err.stack in response body");
});

test("quota/keys/[id]/models: does NOT leak raw err.message outside buildErrorBody", () => {
  // The only use of err.message must be inside the buildErrorBody(...) call, never
  // passed raw to NextResponse.json() or similar.
  const rawMessageLeak = /NextResponse\.json\s*\(\s*err\.message/.test(src);
  assert.ok(!rawMessageLeak, "route must not pass raw err.message to NextResponse.json");
});

// ── Quota resolution imports ──────────────────────────────────────────────────

test("quota/keys/[id]/models: imports resolveQuotaKeyScope from @/lib/quota/quotaKey", () => {
  assert.ok(
    src.includes("resolveQuotaKeyScope"),
    "route must call resolveQuotaKeyScope to compute pool scope",
  );
  assert.ok(
    src.includes("@/lib/quota/quotaKey"),
    "route must import resolveQuotaKeyScope from @/lib/quota/quotaKey",
  );
});

test("quota/keys/[id]/models: imports filterModelsToQuotaPools from @/lib/quota/quotaCombos", () => {
  assert.ok(
    src.includes("filterModelsToQuotaPools"),
    "route must call filterModelsToQuotaPools to filter combo candidates",
  );
  assert.ok(
    src.includes("@/lib/quota/quotaCombos"),
    "route must import filterModelsToQuotaPools from @/lib/quota/quotaCombos",
  );
});

test("quota/keys/[id]/models: passes scope.poolSlugs to filterModelsToQuotaPools", () => {
  assert.ok(
    src.includes("scope.poolSlugs"),
    "route must pass scope.poolSlugs to filterModelsToQuotaPools (same as catalog.ts approach)",
  );
});

// ── DB imports from localDb ───────────────────────────────────────────────────

test("quota/keys/[id]/models: imports getApiKeyById from @/lib/localDb", () => {
  assert.ok(src.includes("getApiKeyById"), "route must call getApiKeyById");
  assert.ok(
    src.includes("@/lib/localDb"),
    "route must import from @/lib/localDb (not from @/lib/db/apiKeys directly)",
  );
});

test("quota/keys/[id]/models: imports getCombos from @/lib/localDb", () => {
  assert.ok(src.includes("getCombos"), "route must call getCombos to build combo candidates");
});

// ── Response shape ────────────────────────────────────────────────────────────

test("quota/keys/[id]/models: GET returns { models } shape", () => {
  assert.ok(
    src.includes("{ models }") || src.includes("{models}") || src.includes("models:"),
    "GET must return { models } in the response body",
  );
});

test("quota/keys/[id]/models: maps filtered combos to model id strings (.map(m => m.id))", () => {
  assert.ok(
    src.includes(".map(") && src.includes("m.id"),
    "route must map filtered combo entries to their id strings",
  );
});

// ── 404 on missing key ────────────────────────────────────────────────────────

test("quota/keys/[id]/models: returns buildErrorBody(404, ...) when key not found", () => {
  assert.ok(
    src.includes("buildErrorBody(404"),
    "route must use buildErrorBody(404, ...) when the API key is not found",
  );
  assert.ok(src.includes("404"), "route must return HTTP 404 on missing key");
});

// ── force-dynamic ─────────────────────────────────────────────────────────────

test("quota/keys/[id]/models: has dynamic = 'force-dynamic' export", () => {
  assert.ok(
    src.includes('dynamic = "force-dynamic"') || src.includes("dynamic = 'force-dynamic'"),
    "route must export dynamic = 'force-dynamic'",
  );
});

// ── Next 16 async params ──────────────────────────────────────────────────────

test("quota/keys/[id]/models: reads id via await params (Next 16 pattern)", () => {
  assert.ok(
    src.includes("await params"),
    "route must use await params — Next 16 async params pattern",
  );
});

test("quota/keys/[id]/models: params typed as Promise<{ id: string }>", () => {
  assert.ok(
    src.includes("Promise<") && src.includes("id: string"),
    "params type must be Promise<{ id: string }> — matching groups/[id] pattern",
  );
});

// ── exports GET ───────────────────────────────────────────────────────────────

test("quota/keys/[id]/models: exports GET handler", () => {
  assert.ok(
    src.includes("export async function GET"),
    "route must export the GET handler",
  );
});
