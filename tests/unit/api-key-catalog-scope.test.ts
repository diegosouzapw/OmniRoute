/**
 * Per-key control over what `GET /v1/models` advertises.
 *
 * A key may want only its curated combos listed (a client that builds its model
 * picker from the catalog), only provider models, or both. There was no way to
 * express that: the catalog always advertised whatever the key's model and combo
 * policies permitted, mixed together.
 *
 * `catalogScope` is a LISTING preference, not an access control. Narrowing it
 * never changes what the key may dispatch — the model policy and `allowedCombos`
 * still decide that. Default `"all"` keeps every existing key unchanged.
 *
 * Rules:
 *   R1 The column defaults to 'all' and constrains itself to the three values.
 *   R2 The parser defaults to 'all', and widens rather than narrows on junk.
 *   R3 The PATCH schema accepts the enum, alone, and rejects anything else.
 *   R4 The route forwards it into the update payload.
 *   R5 The catalog skips the rows the scope excludes, and only those.
 *   R6 The API Manager wires the control and defaults it to 'all'.
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const { API_KEY_COLUMN_FALLBACKS } = await import("../../src/lib/db/apiKeyColumnFallbacks.ts");
const { parseCatalogScope } = await import("../../src/lib/db/apiKeys/rowParsers.ts");
const schemas = await import("../../src/shared/validation/schemas.ts");

const read = (p: string) => fs.readFileSync(path.join(process.cwd(), p), "utf8");

test("R1: the column defaults to 'all' and constrains its values", () => {
  const column = API_KEY_COLUMN_FALLBACKS.find((c: { name: string }) => c.name === "catalog_scope");
  assert.ok(column, "api_keys must gain a catalog_scope column");
  assert.match(column.definition, /NOT NULL DEFAULT 'all'/, "default must be 'all'");
  assert.match(
    column.definition,
    /CHECK \(catalog_scope IN \('all', 'combos', 'models'\)\)/,
    "the column must reject values outside the enum"
  );
});

test("R2: the parser defaults to 'all' and widens on anything unrecognised", () => {
  assert.equal(parseCatalogScope("combos"), "combos");
  assert.equal(parseCatalogScope("models"), "models");
  assert.equal(parseCatalogScope("all"), "all");
  // A key predating the column, or a value that somehow got past the CHECK,
  // must show MORE rather than silently hide rows the operator expects.
  assert.equal(parseCatalogScope(undefined), "all");
  assert.equal(parseCatalogScope(null), "all");
  assert.equal(parseCatalogScope(""), "all");
  assert.equal(parseCatalogScope("COMBOS"), "all");
  assert.equal(parseCatalogScope(7), "all");
});

test("R3: the PATCH schema accepts the enum, alone, and rejects the rest", () => {
  for (const scope of ["all", "combos", "models"]) {
    const parsed = schemas.updateKeyPermissionsSchema.safeParse({ catalogScope: scope });
    assert.equal(parsed.success, true, `${scope} alone must be a valid update`);
    if (parsed.success) assert.equal(parsed.data.catalogScope, scope);
  }
  assert.equal(
    schemas.updateKeyPermissionsSchema.safeParse({ catalogScope: "combo" }).success,
    false,
    "a near-miss value must be rejected rather than silently coerced"
  );
  assert.equal(schemas.updateKeyPermissionsSchema.safeParse({ catalogScope: true }).success, false);
});

test("R4: the route forwards catalogScope into the payload", () => {
  const route = read("src/app/api/keys/[id]/route.ts");
  assert.ok(
    route.includes("if (catalogScope !== undefined) payload.catalogScope = catalogScope"),
    "PATCH /api/keys/[id] must forward catalogScope to updateApiKeyPermissions"
  );
});

test("R5: the catalog skips exactly the rows the scope excludes", () => {
  const catalog = read("src/app/api/v1/models/catalog.ts");
  assert.ok(
    catalog.includes('const catalogScope = keyMeta.catalogScope ?? "all"'),
    "the filter must read the key's scope, defaulting to all"
  );
  assert.ok(
    catalog.includes('if (catalogScope === "combos" && !isComboRow) continue;'),
    "'combos' must drop provider-model rows"
  );
  assert.ok(
    catalog.includes('if (catalogScope === "models" && isComboRow) continue;'),
    "'models' must drop combo rows"
  );
});

test("R6: the API Manager wires the control and defaults it to 'all'", () => {
  const client = read("src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx");
  assert.ok(client.includes("ApiKeyCatalogScopeSelect"), "the modal must render the control");
  assert.ok(
    client.includes('useState<CatalogScope>(apiKey?.catalogScope ?? "all")'),
    "state must default to 'all' so a key predating the field is unchanged"
  );
  assert.match(
    client,
    /body: JSON\.stringify\(\{[\s\S]*?catalogScope,[\s\S]*?\}\)/,
    "the PATCH body must include catalogScope"
  );
});
