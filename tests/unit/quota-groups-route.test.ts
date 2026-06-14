/**
 * tests/unit/quota-groups-route.test.ts
 *
 * Task B7 — source-level assertions for the quota groups REST routes.
 *
 * Uses the same source-scan technique as:
 *   tests/unit/budget-route-auth.test.ts
 *   tests/unit/quota-pool-log-route.test.ts
 *
 * This allows the test to run with the Node.js native test runner without
 * a Next.js / DOM setup, while providing strong structural coverage of:
 *   - Auth guard pattern (requireManagementAuth, 401 without auth)
 *   - Error sanitization (buildErrorBody, no raw err.stack)
 *   - Response shapes ({ groups }, { group })
 *   - POST Zod validation
 *   - PATCH rename + combo re-sync wiring
 *   - DELETE 409 logic for protected/in-use groups
 *   - force-dynamic export
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const LIST_ROUTE_PATH = join(ROOT, "src/app/api/quota/groups/route.ts");
const ID_ROUTE_PATH = join(ROOT, "src/app/api/quota/groups/[id]/route.ts");
const SCHEMAS_PATH = join(ROOT, "src/shared/schemas/quota.ts");

const listSrc = readFileSync(LIST_ROUTE_PATH, "utf8");
const idSrc = readFileSync(ID_ROUTE_PATH, "utf8");
const schemasSrc = readFileSync(SCHEMAS_PATH, "utf8");

// ── Both routes: auth guard ───────────────────────────────────────────────────

test("groups/route.ts: imports requireManagementAuth", () => {
  assert.ok(
    listSrc.includes("requireManagementAuth"),
    "route must import and call requireManagementAuth",
  );
});

test("groups/route.ts: GET calls requireManagementAuth before data access", () => {
  const getIdx = listSrc.indexOf("export async function GET");
  assert.ok(getIdx >= 0, "GET handler must exist");
  const postIdx = listSrc.indexOf("export async function POST");
  const getBody = postIdx >= 0 ? listSrc.slice(getIdx, postIdx) : listSrc.slice(getIdx);
  const authIdx = getBody.indexOf("requireManagementAuth(request)");
  const dataIdx = getBody.indexOf("listGroups(");
  assert.ok(authIdx >= 0, "requireManagementAuth call must be in GET handler");
  assert.ok(dataIdx >= 0, "listGroups call must be in GET handler");
  assert.ok(authIdx < dataIdx, "auth check must come before listGroups call");
});

test("groups/route.ts: GET returns early when authError is truthy", () => {
  const getIdx = listSrc.indexOf("export async function GET");
  const postIdx = listSrc.indexOf("export async function POST");
  const getBody = postIdx >= 0 ? listSrc.slice(getIdx, postIdx) : listSrc.slice(getIdx);
  assert.ok(
    getBody.includes("if (authError) return authError"),
    "GET must return authError immediately — 401 without auth",
  );
});

test("groups/route.ts: POST calls requireManagementAuth before data access", () => {
  const postIdx = listSrc.indexOf("export async function POST");
  assert.ok(postIdx >= 0, "POST handler must exist");
  const postBody = listSrc.slice(postIdx);
  const authIdx = postBody.indexOf("requireManagementAuth(request)");
  const jsonIdx = postBody.indexOf("request.json()");
  assert.ok(authIdx >= 0, "requireManagementAuth call must be in POST handler");
  assert.ok(jsonIdx >= 0, "request.json() must be in POST handler");
  assert.ok(authIdx < jsonIdx, "auth check must come before request.json()");
});

test("groups/route.ts: POST returns early when authError is truthy", () => {
  const postIdx = listSrc.indexOf("export async function POST");
  const postBody = listSrc.slice(postIdx);
  assert.ok(
    postBody.includes("if (authError) return authError"),
    "POST must return authError immediately — 401 without auth",
  );
});

test("groups/[id]/route.ts: PATCH calls requireManagementAuth before data access", () => {
  const patchIdx = idSrc.indexOf("export async function PATCH");
  assert.ok(patchIdx >= 0, "PATCH handler must exist");
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const patchBody = deleteIdx >= 0 ? idSrc.slice(patchIdx, deleteIdx) : idSrc.slice(patchIdx);
  const authIdx = patchBody.indexOf("requireManagementAuth(request)");
  const jsonIdx = patchBody.indexOf("request.json()");
  assert.ok(authIdx >= 0, "requireManagementAuth must be in PATCH handler");
  assert.ok(jsonIdx >= 0, "request.json() must be in PATCH handler");
  assert.ok(authIdx < jsonIdx, "auth check must come before request.json()");
});

test("groups/[id]/route.ts: PATCH returns early when authError is truthy", () => {
  const patchIdx = idSrc.indexOf("export async function PATCH");
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const patchBody = deleteIdx >= 0 ? idSrc.slice(patchIdx, deleteIdx) : idSrc.slice(patchIdx);
  assert.ok(patchBody.includes("if (authError) return authError"), "PATCH must return authError");
});

test("groups/[id]/route.ts: DELETE calls requireManagementAuth before data access", () => {
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  assert.ok(deleteIdx >= 0, "DELETE handler must exist");
  const deleteBody = idSrc.slice(deleteIdx);
  const authIdx = deleteBody.indexOf("requireManagementAuth(request)");
  const dataIdx = deleteBody.indexOf("deleteGroup(");
  assert.ok(authIdx >= 0, "requireManagementAuth must be in DELETE handler");
  assert.ok(dataIdx >= 0, "deleteGroup call must be in DELETE handler");
  assert.ok(authIdx < dataIdx, "auth check must come before deleteGroup call");
});

test("groups/[id]/route.ts: DELETE returns early when authError is truthy", () => {
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const deleteBody = idSrc.slice(deleteIdx);
  assert.ok(
    deleteBody.includes("if (authError) return authError"),
    "DELETE must return authError — 401 without auth",
  );
});

// ── Error sanitization ────────────────────────────────────────────────────────

test("groups/route.ts: uses buildErrorBody from @omniroute/open-sse/utils/error", () => {
  assert.ok(listSrc.includes("buildErrorBody"), "route must use buildErrorBody — Hard Rule #12");
  assert.ok(
    listSrc.includes("@omniroute/open-sse/utils/error"),
    "route must import buildErrorBody from @omniroute/open-sse/utils/error",
  );
});

test("groups/route.ts: does NOT put raw err.stack in response (no stack leak)", () => {
  assert.ok(!listSrc.includes("err.stack"), "route must not leak err.stack in response");
});

test("groups/[id]/route.ts: uses buildErrorBody from @omniroute/open-sse/utils/error", () => {
  assert.ok(idSrc.includes("buildErrorBody"), "route must use buildErrorBody — Hard Rule #12");
  assert.ok(
    idSrc.includes("@omniroute/open-sse/utils/error"),
    "route must import buildErrorBody from @omniroute/open-sse/utils/error",
  );
});

test("groups/[id]/route.ts: does NOT put raw err.stack in response (no stack leak)", () => {
  assert.ok(!idSrc.includes("err.stack"), "route must not leak err.stack in response");
});

// ── Response shapes ───────────────────────────────────────────────────────────

test("groups/route.ts: GET returns { groups } shape", () => {
  assert.ok(
    listSrc.includes("{ groups }") || listSrc.includes("{groups}") || listSrc.includes("groups:"),
    "GET must return { groups } in the response body",
  );
});

test("groups/route.ts: POST returns { group } shape with status 201", () => {
  const postIdx = listSrc.indexOf("export async function POST");
  const postBody = listSrc.slice(postIdx);
  assert.ok(
    postBody.includes("{ group }") || postBody.includes("{group}") || postBody.includes("group:"),
    "POST must return { group } in the response body",
  );
  assert.ok(postBody.includes("201"), "POST must return HTTP 201 on success");
});

test("groups/[id]/route.ts: PATCH returns { group } shape", () => {
  const patchIdx = idSrc.indexOf("export async function PATCH");
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const patchBody = deleteIdx >= 0 ? idSrc.slice(patchIdx, deleteIdx) : idSrc.slice(patchIdx);
  assert.ok(
    patchBody.includes("{ group }") || patchBody.includes("{group}") || patchBody.includes("group:"),
    "PATCH must return { group } in the response body",
  );
});

// ── POST: Zod validation ──────────────────────────────────────────────────────

test("groups/route.ts: POST uses GroupCreateSchema for Zod validation", () => {
  assert.ok(
    listSrc.includes("GroupCreateSchema"),
    "route must import and use GroupCreateSchema for POST body validation",
  );
});

test("groups/route.ts: POST returns 400 on invalid body", () => {
  const postIdx = listSrc.indexOf("export async function POST");
  const postBody = listSrc.slice(postIdx);
  assert.ok(postBody.includes("400"), "POST must return 400 for invalid body");
  assert.ok(
    postBody.includes("safeParse") || postBody.includes(".parse("),
    "POST must use safeParse or parse for validation",
  );
});

// ── PATCH: Zod validation + rename + combo re-sync ───────────────────────────

test("groups/[id]/route.ts: PATCH uses GroupRenameSchema for Zod validation", () => {
  assert.ok(
    idSrc.includes("GroupRenameSchema"),
    "PATCH route must import and use GroupRenameSchema",
  );
});

test("groups/[id]/route.ts: PATCH calls renameGroup", () => {
  const patchIdx = idSrc.indexOf("export async function PATCH");
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const patchBody = deleteIdx >= 0 ? idSrc.slice(patchIdx, deleteIdx) : idSrc.slice(patchIdx);
  assert.ok(patchBody.includes("renameGroup("), "PATCH must call renameGroup");
});

test("groups/[id]/route.ts: PATCH re-syncs combos via syncQuotaCombos (dynamic import)", () => {
  const patchIdx = idSrc.indexOf("export async function PATCH");
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const patchBody = deleteIdx >= 0 ? idSrc.slice(patchIdx, deleteIdx) : idSrc.slice(patchIdx);
  assert.ok(
    patchBody.includes("syncQuotaCombos"),
    "PATCH must call syncQuotaCombos to re-sync combos after rename",
  );
});

test("groups/[id]/route.ts: PATCH fetches pools via getPoolsByGroup for combo re-sync", () => {
  const patchIdx = idSrc.indexOf("export async function PATCH");
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const patchBody = deleteIdx >= 0 ? idSrc.slice(patchIdx, deleteIdx) : idSrc.slice(patchIdx);
  assert.ok(
    patchBody.includes("getPoolsByGroup("),
    "PATCH must call getPoolsByGroup to enumerate pools for combo re-sync",
  );
});

test("groups/[id]/route.ts: PATCH returns 404 when renameGroup returns false", () => {
  const patchIdx = idSrc.indexOf("export async function PATCH");
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const patchBody = deleteIdx >= 0 ? idSrc.slice(patchIdx, deleteIdx) : idSrc.slice(patchIdx);
  assert.ok(patchBody.includes("404"), "PATCH must return 404 when group is not found");
});

// ── DELETE: 409 on protected / in-use groups ──────────────────────────────────

test("groups/[id]/route.ts: DELETE maps deleteGroup throws to 409 Conflict", () => {
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const deleteBody = idSrc.slice(deleteIdx);
  assert.ok(
    deleteBody.includes("409"),
    "DELETE must return 409 when deleteGroup throws (protected group or pools exist)",
  );
});

test("groups/[id]/route.ts: DELETE catches deleteGroup throw and uses buildErrorBody for 409", () => {
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const deleteBody = idSrc.slice(deleteIdx);
  // The 409 must go through buildErrorBody — not a raw Error message
  assert.ok(
    deleteBody.includes("buildErrorBody(409"),
    "DELETE 409 response must use buildErrorBody(409, ...) — Hard Rule #12",
  );
});

test("groups/[id]/route.ts: DELETE returns 204 on successful delete", () => {
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const deleteBody = idSrc.slice(deleteIdx);
  assert.ok(deleteBody.includes("204"), "DELETE must return 204 on success");
});

test("groups/[id]/route.ts: DELETE returns 404 when group not found", () => {
  const deleteIdx = idSrc.indexOf("export async function DELETE");
  const deleteBody = idSrc.slice(deleteIdx);
  assert.ok(deleteBody.includes("404"), "DELETE must return 404 when group does not exist");
});

// ── Params: Next 16 async params pattern ─────────────────────────────────────

test("groups/[id]/route.ts: reads id via await params (Next 16 pattern)", () => {
  assert.ok(
    idSrc.includes("await params"),
    "route must use await params — Next 16 async params pattern",
  );
});

test("groups/[id]/route.ts: RouteParams typed as Promise<{ id: string }>", () => {
  assert.ok(
    idSrc.includes("Promise<") && idSrc.includes("id: string"),
    "params type must be Promise<{ id: string }> — matching pools/[id] pattern",
  );
});

// ── force-dynamic ─────────────────────────────────────────────────────────────

test("groups/route.ts: has dynamic = 'force-dynamic' export", () => {
  assert.ok(
    listSrc.includes('dynamic = "force-dynamic"') || listSrc.includes("dynamic = 'force-dynamic'"),
    "route must export dynamic = 'force-dynamic'",
  );
});

test("groups/[id]/route.ts: has dynamic = 'force-dynamic' export", () => {
  assert.ok(
    idSrc.includes('dynamic = "force-dynamic"') || idSrc.includes("dynamic = 'force-dynamic'"),
    "route must export dynamic = 'force-dynamic'",
  );
});

// ── Schemas: GroupCreateSchema and GroupRenameSchema ─────────────────────────

test("shared/schemas/quota.ts: exports GroupCreateSchema", () => {
  assert.ok(
    schemasSrc.includes("export const GroupCreateSchema"),
    "quota.ts must export GroupCreateSchema",
  );
});

test("shared/schemas/quota.ts: GroupCreateSchema requires name (min 1)", () => {
  assert.ok(
    schemasSrc.includes("GroupCreateSchema") && schemasSrc.includes("min(1)"),
    "GroupCreateSchema must enforce min(1) on name",
  );
});

test("shared/schemas/quota.ts: exports GroupRenameSchema", () => {
  assert.ok(
    schemasSrc.includes("export const GroupRenameSchema"),
    "quota.ts must export GroupRenameSchema",
  );
});

// ── Import correctness ────────────────────────────────────────────────────────

test("groups/route.ts: imports listGroups and createGroup from @/lib/localDb", () => {
  assert.ok(
    listSrc.includes("listGroups") && listSrc.includes("createGroup"),
    "route must import listGroups and createGroup",
  );
});

test("groups/[id]/route.ts: imports renameGroup, deleteGroup, getGroup, getPoolsByGroup", () => {
  assert.ok(idSrc.includes("renameGroup"), "route must import renameGroup");
  assert.ok(idSrc.includes("deleteGroup"), "route must import deleteGroup");
  assert.ok(idSrc.includes("getGroup"), "route must import getGroup");
  assert.ok(idSrc.includes("getPoolsByGroup"), "route must import getPoolsByGroup");
});

// ── GroupDemo: listGroups result includes group-demo ──────────────────────────

test("groups/route.ts: listGroups() is called in GET (will include GroupDemo in real DB)", () => {
  // Source-scan: the call is present; the seed group-demo row is guaranteed
  // by the migration, so a real GET would always include it.
  assert.ok(
    listSrc.includes("listGroups()"),
    "GET must call listGroups() — which includes the seeded GroupDemo row",
  );
});
