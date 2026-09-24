/**
 * Per-key control over the built-in `auto/*` combos.
 *
 * `auto/*` combos are virtual — they are synthesised in the catalog, not stored
 * as rows — so `resolveRequestedComboName()` returns null for them and
 * `isComboAllowedForKey()` FAILS OPEN (`src/shared/utils/apiKeyPolicy.ts`:
 * `if (!comboName) return { allowed: true, comboName: null }`). Because
 * `validateModelAccess()` then returns early on a resolved combo name, the
 * `allowedModels` / `blockedModels` check is never reached for an `auto/*` id
 * either.
 *
 * Net effect before this change: `auto/*` bypassed per-key authorisation
 * completely. A key scoped via `allowedCombos` to a single cheap lane could
 * still send `auto/best-coding` and reach every model on the gateway. Observed
 * on a live gateway: a key whose `allowedCombos` held 24 named combos and no
 * `auto` entry dispatched `auto/best-fast` successfully (HTTP 200).
 *
 * `blockedModels: ["auto/*"]` only hides the ids from `/v1/models`; it cannot
 * deny them, for the early-return reason above.
 *
 * The fix is an explicit per-key flag, `allowAutoCombos`, defaulting to TRUE so
 * every existing key keeps working. Setting it to false denies `auto/*` at
 * dispatch and drops the ids from that key's catalog.
 *
 * Rules:
 *   R1 The column is declared with DEFAULT 1 (allowed) for legacy rows.
 *   R2 The row parser treats anything but an explicit falsy value as allowed.
 *   R3 The deny predicate fires only for auto/* ids on a key that opted out.
 *   R4 The PATCH schema preserves the flag and counts it as a real update.
 *   R5 The update route forwards it into the payload.
 *   R6 The catalog skips the auto/* synthesis loop for an opted-out key.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const { API_KEY_COLUMN_FALLBACKS } = await import("../../src/lib/db/apiKeyColumnFallbacks.ts");
const { parseAllowAutoCombos } = await import("../../src/lib/db/apiKeys/rowParsers.ts");
const { isAutoComboDeniedForKey } = await import("../../src/shared/utils/apiKeyPolicy.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

test("R1: allow_auto_combos is declared NOT NULL DEFAULT 1 so legacy keys keep auto/*", () => {
  const column = API_KEY_COLUMN_FALLBACKS.find(
    (c: { name: string }) => c.name === "allow_auto_combos"
  );
  assert.ok(column, "api_keys must gain an allow_auto_combos column");
  assert.match(
    column.definition,
    /NOT NULL DEFAULT 1/,
    "default must be 1 — an existing key must not silently lose auto/* access"
  );
});

test("R2: the row parser defaults to allowed and opts out only on an explicit falsy value", () => {
  // Legacy rows predating the column, and rows that never set it.
  assert.equal(parseAllowAutoCombos(undefined), true);
  assert.equal(parseAllowAutoCombos(null), true);
  assert.equal(parseAllowAutoCombos(1), true);
  assert.equal(parseAllowAutoCombos("1"), true);
  assert.equal(parseAllowAutoCombos(true), true);
  // Explicit opt-out, in every shape SQLite / JSON round-trips produce.
  assert.equal(parseAllowAutoCombos(0), false);
  assert.equal(parseAllowAutoCombos("0"), false);
  assert.equal(parseAllowAutoCombos(false), false);
});

test("R3: the deny predicate fires only for auto/* on a key that opted out", () => {
  const optedOut = { allowAutoCombos: false };
  const optedIn = { allowAutoCombos: true };
  const legacy = {}; // flag absent entirely

  assert.equal(isAutoComboDeniedForKey(optedOut, "auto/best-coding"), true);
  assert.equal(isAutoComboDeniedForKey(optedOut, "auto/coding:fast"), true);

  // Opted in, or never configured — never denied.
  assert.equal(isAutoComboDeniedForKey(optedIn, "auto/best-coding"), false);
  assert.equal(isAutoComboDeniedForKey(legacy, "auto/best-coding"), false);
  assert.equal(isAutoComboDeniedForKey(undefined, "auto/best-coding"), false);
  assert.equal(isAutoComboDeniedForKey(null, "auto/best-coding"), false);

  // Never touches anything that is not an auto/* id, even when opted out.
  assert.equal(isAutoComboDeniedForKey(optedOut, "claude-haiku"), false);
  assert.equal(isAutoComboDeniedForKey(optedOut, "codex/gpt-5.6-sol-xhigh"), false);
  assert.equal(isAutoComboDeniedForKey(optedOut, "qtSd/pool-1"), false);
  // A combo whose name merely starts with the word "auto" is not an auto/* id.
  assert.equal(isAutoComboDeniedForKey(optedOut, "auto-router"), false);
  assert.equal(isAutoComboDeniedForKey(optedOut, ""), false);
});

test("R4: the PATCH schema preserves allowAutoCombos and counts it as a real update", () => {
  const parsed = schemas.updateKeyPermissionsSchema.safeParse({ allowAutoCombos: false });
  assert.equal(
    parsed.success,
    true,
    "allowAutoCombos alone must be a valid update — the 'No valid fields' guard must count it"
  );
  if (!parsed.success) return;
  assert.equal(parsed.data.allowAutoCombos, false, "the flag must survive parsing");

  const on = schemas.updateKeyPermissionsSchema.safeParse({ allowAutoCombos: true });
  assert.equal(on.success, true);
  if (on.success) assert.equal(on.data.allowAutoCombos, true);

  assert.equal(
    schemas.updateKeyPermissionsSchema.safeParse({ allowAutoCombos: "no" }).success,
    false,
    "a non-boolean must be rejected"
  );
});

test("R5: the update route forwards allowAutoCombos into the payload", () => {
  const route = read("src/app/api/keys/[id]/route.ts");
  assert.ok(
    route.includes("if (allowAutoCombos !== undefined) payload.allowAutoCombos = allowAutoCombos"),
    "PATCH /api/keys/[id] must forward allowAutoCombos to updateApiKeyPermissions"
  );
});

test("R7: the API Manager wires the toggle and defaults it ON", () => {
  const client = read("src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx");

  assert.ok(
    client.includes("ApiKeyAutoCombosToggle"),
    "the permissions modal must render the auto-combos toggle"
  );
  assert.ok(
    client.includes("apiKey?.allowAutoCombos !== false"),
    "state must default ON via `!== false` — `=== true` would render a key that predates the field as disabled"
  );
  // Positional plumbing: the save handler signature, the onSave call and the
  // PATCH payload must each carry the field, or later arguments shift by one.
  assert.ok(
    client.includes("allowAutoCombos: boolean,"),
    "the save handler and modal prop signatures must declare it"
  );
  assert.match(
    client,
    /body: JSON\.stringify\(\{[\s\S]*?allowAutoCombos,[\s\S]*?\}\)/,
    "the PATCH body must include allowAutoCombos"
  );
});

test("R8: the toggle's UI strings exist in English and Vietnamese", () => {
  // en.json is the source of truth; vi is the one locale whose completeness is
  // asserted by tests/unit/i18n-vi-completeness.test.ts (it bans placeholders).
  for (const locale of ["en", "vi"]) {
    const messages = JSON.parse(read(`src/i18n/messages/${locale}.json`));
    for (const key of ["autoCombosTitle", "autoCombosDesc"]) {
      const value = messages?.settings?.[key];
      assert.equal(typeof value, "string", `${locale}.json settings.${key} must exist`);
      assert.ok(value.trim().length > 0, `${locale}.json settings.${key} must not be empty`);
      assert.ok(
        !/__(?:MISSING|TODO)__/i.test(value),
        `${locale}.json settings.${key} must be translated, not a placeholder`
      );
    }
  }
});

test("R6: the catalog skips auto/* synthesis for a key that opted out", () => {
  const catalog = read("src/app/api/v1/models/catalog.ts");
  assert.ok(
    catalog.includes("autoCombosDisallowedForKey"),
    "catalog must compute a per-key auto/* suppression flag"
  );
  assert.ok(
    /if \(hideAuto \|\| autoCombosDisallowedForKey\) break;/.test(catalog),
    "the auto/* synthesis loop must break for an opted-out key, as it already does for hideAuto"
  );
});
