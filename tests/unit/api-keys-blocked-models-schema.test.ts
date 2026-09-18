/**
 * `blockedModels` is plumbed end-to-end but unreachable through the API.
 *
 * `PATCH /api/keys/[id]` destructures `blockedModels` from `validation.data`
 * (src/app/api/keys/[id]/route.ts), forwards it into the payload, and
 * `updateApiKeyPermissions()` writes it to the `blocked_models` column
 * (src/lib/db/apiKeys.ts). Every link exists EXCEPT the first one:
 * `updateKeyPermissionsSchema` never declared the field, so Zod stripped it
 * from the parsed body and the destructured value was always `undefined`.
 * The request answered 200 and wrote nothing — a silent no-op.
 *
 * Observed on a live gateway: PATCH with
 *   { modelAccessMode: "all", allowedModels: [], blockedModels: [<any pattern>] }
 * returned 200 and echoed modelAccessMode/allowedModels back, while the
 * `blocked_models` column stayed NULL.
 *
 * `blockedModels` is the deny-list half of the model policy — it is read by
 * `isModelAllowedForKey()` (src/lib/db/apiKeys.ts) BEFORE the allow-list and
 * wins over it, which is what lets an operator keep a broad scope like `cc/*`
 * while excluding specific families. With the field unsettable, that half of
 * the policy could only ever be written by seeding the database by hand.
 *
 * Rules:
 *   R1 The schema preserves `blockedModels` verbatim.
 *   R2 `blockedModels` alone is a valid update (the "No valid fields" guard counts it).
 *   R3 It coexists with the allow-list, including under modelAccessMode "all".
 *   R4 Entry-level validation matches `allowedModels` (trimmed, non-empty, max 1000).
 *   R5 An empty array is preserved — that is how a deny-list is cleared.
 *   R6 The update route still forwards the field it destructures.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const schemas = await import("../../src/shared/validation/schemas.ts");

test("R1: the PATCH schema preserves blockedModels verbatim", () => {
  const parsed = schemas.updateKeyPermissionsSchema.safeParse({
    modelAccessMode: "restricted",
    allowedModels: ["cc/*"],
    blockedModels: ["*/*", "gpt-5.6-sol-xhigh"],
  });
  assert.equal(parsed.success, true, "a body carrying blockedModels must parse");
  if (!parsed.success) return;
  assert.deepEqual(
    parsed.data.blockedModels,
    ["*/*", "gpt-5.6-sol-xhigh"],
    "blockedModels must survive parsing — stripping it makes the PATCH a silent no-op"
  );
});

test("R2: blockedModels on its own is a valid update", () => {
  const parsed = schemas.updateKeyPermissionsSchema.safeParse({
    blockedModels: ["anthropic/*"],
  });
  assert.equal(
    parsed.success,
    true,
    "the 'No valid fields to update' guard must count blockedModels as a field"
  );
  if (!parsed.success) return;
  assert.deepEqual(parsed.data.blockedModels, ["anthropic/*"]);
});

test("R3: blockedModels coexists with the allow-list and with modelAccessMode 'all'", () => {
  // The allow-list must stay empty under "all"; the deny-list has no such rule,
  // because deny-over-broad-scope is exactly its purpose.
  const parsed = schemas.updateKeyPermissionsSchema.safeParse({
    modelAccessMode: "all",
    allowedModels: [],
    blockedModels: ["openai/*"],
  });
  assert.equal(parsed.success, true, "a deny-list must be settable on an allow-all key");
  if (!parsed.success) return;
  assert.deepEqual(parsed.data.blockedModels, ["openai/*"]);
  assert.deepEqual(parsed.data.allowedModels, []);
});

test("R4: entry validation matches allowedModels", () => {
  const trimmed = schemas.updateKeyPermissionsSchema.safeParse({
    blockedModels: ["  openai/*  "],
  });
  assert.equal(trimmed.success, true);
  if (trimmed.success) {
    assert.deepEqual(trimmed.data.blockedModels, ["openai/*"], "entries must be trimmed");
  }

  assert.equal(
    schemas.updateKeyPermissionsSchema.safeParse({ blockedModels: [""] }).success,
    false,
    "an empty pattern must be rejected"
  );
  assert.equal(
    schemas.updateKeyPermissionsSchema.safeParse({ blockedModels: "openai/*" }).success,
    false,
    "a bare string must be rejected — the column stores a list"
  );
  assert.equal(
    schemas.updateKeyPermissionsSchema.safeParse({
      blockedModels: Array.from({ length: 1001 }, (_, i) => `m${i}`),
    }).success,
    false,
    "more than 1000 entries must be rejected, as for allowedModels"
  );
});

test("R5: an empty blockedModels array is preserved so a deny-list can be cleared", () => {
  const parsed = schemas.updateKeyPermissionsSchema.safeParse({ blockedModels: [] });
  assert.equal(parsed.success, true, "clearing the deny-list must be a valid update");
  if (!parsed.success) return;
  assert.deepEqual(
    parsed.data.blockedModels,
    [],
    "an empty array must survive as [] — undefined would skip the column write"
  );
});

test("R6: the update route forwards the blockedModels it destructures", () => {
  const route = fs.readFileSync(path.join(process.cwd(), "src/app/api/keys/[id]/route.ts"), "utf8");
  assert.ok(
    route.includes("if (blockedModels !== undefined) payload.blockedModels = blockedModels"),
    "the route must keep forwarding blockedModels into the update payload"
  );
});
