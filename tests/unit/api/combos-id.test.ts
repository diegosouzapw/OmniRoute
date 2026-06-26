/**
 * T-22 follow-up: PUT /api/combos/[id] — COMBO_002 surface (#5084).
 *
 * PR #5084 made the COMBO_002 (zod schema failure) response carry the FIRST
 * field-level issue at the top of `details` so a dashboard toast can render
 * a specific message ("config.compressionMode: …") instead of the generic
 * catalog "One or more combo fields are invalid". The full structured list
 * is preserved under `details.issues` for callers that need the complete
 * picture.
 *
 * This file pins the new shape so a future change to the validation glue
 * (in `src/app/api/combos/[id]/route.ts`) cannot silently drop the
 * first-issue fields — the dashboard toast and any i18n messages depend on
 * them.
 *
 * Auth + isolation pattern mirrors `tests/unit/api/context-combos-default-route.test.ts`:
 *  - `makeManagementSessionRequest()` for JWT cookie auth.
 *  - Temp DATA_DIR + `resetDbInstance()` per test, cleanup in `test.after()`.
 *  - Real DB (no mocks) — the project convention; the PUT handler returns
 *    400 BEFORE the DB is touched when the body fails zod validation, so
 *    DB isolation is cheap, and the happy-path test seeds a real combo.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { makeManagementSessionRequest } from "../../helpers/managementSession.ts";

// ─── isolated temp DB ─────────────────────────────────────────────────────

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combos-id-route-"));
const originalDataDir = process.env.DATA_DIR;
const originalJwtSecret = process.env.JWT_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../../src/lib/db/core.ts");
const settingsDb = await import("../../../src/lib/db/settings.ts");
const combosDb = await import("../../../src/lib/db/combos.ts");
const combosRoute = await import("../../../src/app/api/combos/[id]/route.ts");

// ─── helpers ──────────────────────────────────────────────────────────────

async function setupAuth(): Promise<void> {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({
    requireLogin: true,
    setupComplete: true,
    password: "test-password-hash",
  });
}

async function putCombo(id: string, body: unknown): Promise<Response> {
  const req = await makeManagementSessionRequest(`http://localhost/api/combos/${id}`, {
    method: "PUT",
    body,
  });
  // Next.js 15 dynamic route handlers receive `{ params }` as a Promise.
  return combosRoute.PUT(req, { params: Promise.resolve({ id }) });
}

// ─── lifecycle ────────────────────────────────────────────────────────────

test.beforeEach(async () => {
  process.env.DATA_DIR = TEST_DATA_DIR;
  await setupAuth();
});

test.after(() => {
  if (originalDataDir === undefined) delete process.env.DATA_DIR;
  else process.env.DATA_DIR = originalDataDir;
  if (originalJwtSecret === undefined) delete process.env.JWT_SECRET;
  else process.env.JWT_SECRET = originalJwtSecret;
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// ─── COMBO_002 surface — invalid body (#5084) ─────────────────────────────

test("PUT /api/combos/{id} with invalid body returns COMBO_002 with firstField/firstMessage populated", async () => {
  // `name` is a required string on the updateComboSchema; sending a number
  // is the most reliable way to make zod fail on the FIRST field without
  // relying on schema internals. Whatever the schema's first error is, the
  // #5084 surface must surface it under `firstField` + `firstMessage`.
  const res = await putCombo("any-id", { name: 42 });
  assert.equal(res.status, 400, `Expected 400, got ${res.status}`);

  const body = (await res.json()) as {
    error: {
      code: string;
      message: string;
      details?: {
        issues?: { message: string; details: Array<{ field: string; message: string }> };
        firstField?: string;
        firstMessage?: string;
      };
    };
  };
  assert.equal(body.error.code, "COMBO_002");
  assert.ok(body.error.details, "COMBO_002 must carry a details payload");
  assert.equal(
    typeof body.error.details!.firstField,
    "string",
    "firstField must be a string for the dashboard toast to render a path"
  );
  assert.ok(
    body.error.details!.firstField!.length > 0,
    "firstField must be non-empty when the schema has a field-level issue"
  );
  assert.equal(
    typeof body.error.details!.firstMessage,
    "string",
    "firstMessage must be a string for the dashboard toast to render text"
  );
  assert.ok(
    body.error.details!.firstMessage!.length > 0,
    "firstMessage must be non-empty when the schema has a field-level issue"
  );

  // Backwards-compat: the full structured issue list must still be present
  // under `issues` for any caller that needs every field-level error.
  assert.ok(body.error.details!.issues, "details.issues must still be present");
  assert.ok(
    Array.isArray(body.error.details!.issues!.details),
    "details.issues.details must be an array of {field, message} entries"
  );
  assert.ok(
    body.error.details!.issues!.details.length >= 1,
    "details.issues must contain the failing field(s)"
  );
});

test("PUT /api/combos/{id} COMBO_002 firstField matches the first issue in details.issues", async () => {
  // The #5084 surface promises "the FIRST field-level issue" — pin that
  // invariant explicitly. The toast copy must line up with the structured
  // list, otherwise the user sees one error message in the toast and a
  // different one in the validation panel.
  const res = await putCombo("any-id", { name: 42 });
  assert.equal(res.status, 400);

  const body = (await res.json()) as {
    error: {
      details?: {
        firstField?: string;
        firstMessage?: string;
        issues?: { details: Array<{ field: string; message: string }> };
      };
    };
  };
  const first = body.error.details!.issues!.details[0];
  assert.equal(body.error.details!.firstField, first.field);
  assert.equal(body.error.details!.firstMessage, first.message);
});

test("PUT /api/combos/{id} with multiple invalid fields: firstField is the FIRST failing field", async () => {
  // Two failures: zod reports them in order, so the first one wins. We
  // pick two fields that are guaranteed to fail (wrong types). The
  // dashboard needs to show the FIRST one in the toast; the full list
  // under `issues` covers the rest.
  const res = await putCombo("any-id", { name: 42, strategy: 99 });
  assert.equal(res.status, 400);

  const body = (await res.json()) as {
    error: { details?: { firstField?: string; firstMessage?: string } };
  };
  assert.ok(body.error.details!.firstField);
  // The field is `name` because it's defined first in updateComboSchema.
  // (If the schema order ever changes, this test should be updated — the
  // invariant we care about is "firstField matches issues[0].field".)
  assert.equal(body.error.details!.firstField, "name");
});

// ─── valid body — happy path returns 200 ──────────────────────────────────

test("PUT /api/combos/{id} with valid body returns 200", async () => {
  // Seed a real combo via the DB so the route can find it and update it.
  // We use the same path other tests use (db-combos-crud.test.ts) and a
  // minimal config so the composite tier + DAG validation passes.
  const id = "abc-123";
  await combosDb.createCombo({
    id,
    name: "seed-combo",
    isActive: false,
    strategy: "ordered",
    models: [],
    config: {},
  } as never);

  const res = await putCombo(id, { name: "renamed" });
  assert.equal(res.status, 200, `Expected 200, got ${res.status}`);
  const body = (await res.json()) as { id: string; name: string };
  assert.equal(body.id, id);
  assert.equal(body.name, "renamed");
});

// ─── guards: anonymous request still 401/403 ─────────────────────────────

test("PUT /api/combos/{id} without auth returns 401/403 (COMBO_002 surface is auth-gated)", async () => {
  // The COMBO_002 surface only fires AFTER `requireManagementAuth` passes.
  // An anonymous caller must not be able to probe the validation surface.
  const req = new Request("http://localhost/api/combos/abc-123", {
    method: "PUT",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify({ name: 42 }),
  });
  const res = await combosRoute.PUT(req, { params: Promise.resolve({ id: "abc-123" }) });
  assert.ok(res.status === 401 || res.status === 403, `Expected 401/403, got ${res.status}`);
  const body = (await res.json()) as { error?: { details?: { firstField?: string } } };
  // Anonymous must NOT receive the firstField/firstMessage surface — it
  // would let a probe enumerate the schema.
  assert.ok(!body.error?.details?.firstField, "firstField must NOT leak to anonymous");
});
