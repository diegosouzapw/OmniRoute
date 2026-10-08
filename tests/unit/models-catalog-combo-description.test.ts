/**
 * Combos advertise their own description in `GET /v1/models`.
 *
 * A combo's description is stored in its record and returned by
 * `GET /api/combos`, but the catalog row built in
 * `src/app/api/v1/models/catalog.ts` never copied it, so no client could see it.
 *
 * Claude Code's gateway model discovery reads exactly `id`, `display_name` and
 * `description` from each entry in the `/v1/models` `data` array and renders the
 * description in the `/model` picker; an entry without one reads "From gateway"
 * instead. Other OpenAI-compatible clients surface it too. See
 * https://code.claude.com/docs/en/llm-gateway-protocol.md#model-discovery
 *
 * Rules:
 *   R1 The combo row emits `description` when the combo has one.
 *   R2 It is omitted entirely when the combo has none, rather than sent empty.
 *   R3 The value is read defensively — a non-string description cannot leak through.
 *   R4 `comboMetadata` still spreads last, so it keeps precedence over the literal.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

// catalog.ts contains a NUL byte, so read it explicitly as UTF-8 text rather
// than relying on tools that sniff it as binary.
const catalog = fs.readFileSync(
  path.join(process.cwd(), "src/app/api/v1/models/catalog.ts"),
  "utf8"
);

test("R1/R2: the combo row emits description only when the combo has one", () => {
  assert.ok(
    catalog.includes("...(comboDescription ? { description: comboDescription } : {})"),
    "the combo row must spread description conditionally, so a combo without one is unchanged"
  );
});

test("R3: the description is narrowed to a trimmed string before use", () => {
  assert.match(
    catalog,
    /const comboDescription\s*=\s*\n?\s*typeof combo\.description === "string" \? combo\.description\.trim\(\) : "";/,
    "ComboRecord is Record<string, unknown>, so the value must be typeof-narrowed and trimmed — " +
      "a non-string must collapse to the empty string and be omitted"
  );
});

test("R5: an operator-set display_name is advertised, and omitted when unset", () => {
  assert.ok(
    catalog.includes("...(comboDisplayName ? { display_name: comboDisplayName } : {})"),
    "display_name must be spread conditionally so combos without one are unchanged"
  );
  assert.match(
    catalog,
    /const comboDisplayName\s*=\s*\n?\s*typeof combo\.displayName === "string" \? combo\.displayName\.trim\(\) : "";/,
    "display_name must come from an operator-set field, typeof-narrowed and trimmed — " +
      "never derived heuristically from the combo name"
  );
});

test("R6: the combo schemas accept displayName and count it as a real update", async () => {
  const schemas = await import("../../src/shared/validation/schemas.ts");

  // Without this the field is stripped by Zod and can never be set — the same
  // silent no-op that made blockedModels unreachable through the API.
  const upd = schemas.updateComboSchema.safeParse({ displayName: "Codex Sol" });
  assert.equal(upd.success, true, "displayName alone must be a valid combo update");
  if (upd.success) assert.equal(upd.data.displayName, "Codex Sol");

  const created = schemas.createComboSchema.safeParse({
    name: "claude-codex-sol",
    displayName: "Codex Sol",
    models: [{ kind: "model", model: "codex/gpt-5.6-sol-xhigh", providerId: "codex" }],
  });
  assert.equal(created.success, true, "create must accept displayName");
  if (created.success) assert.equal(created.data.displayName, "Codex Sol");

  // Clearing it must be expressible, and a non-string rejected.
  assert.equal(schemas.updateComboSchema.safeParse({ displayName: null }).success, true);
  assert.equal(schemas.updateComboSchema.safeParse({ displayName: 42 }).success, false);
});

test("R4: comboMetadata still spreads after the literal fields", () => {
  // Bound the slice by the block itself rather than a byte count, so adding
  // another field to the row cannot silently make this assertion vacuous.
  const rowStart = catalog.indexOf("listedIds.add(combo.name);");
  assert.ok(rowStart > -1, "combo row builder must exist");
  const rowEnd = catalog.indexOf("maybeYieldCatalogBuild", rowStart);
  assert.ok(rowEnd > rowStart, "combo row builder must be followed by the yield call");
  const row = catalog.slice(rowStart, rowEnd);
  const descIndex = row.indexOf("description: comboDescription");
  const metaIndex = row.indexOf("...comboMetadata");
  assert.ok(descIndex > -1 && metaIndex > -1, "both spreads must be present in the row");
  assert.ok(
    metaIndex > descIndex,
    "comboMetadata must spread last so context/capability metadata keeps precedence"
  );
});
