/**
 * tests/unit/quota-exclusive-catalog-4806.test.ts
 *
 * Regression for #4806 — "[BUG] Cota Exclusiva: modelos virtuais param de
 * listar após ativação".
 *
 * When an API key is scoped to a quota pool (allowedQuotas non-empty — the
 * "Cota exclusiva" state), GET /v1/models must list that pool's
 * qtSd/<group>/<provider>/<model> virtual models. Clients such as Claude
 * Desktop build their model picker from /v1/models, so an empty list shows
 * "0 modelo encontrado" and the key cannot be used.
 *
 * Root cause (before the fix): getUnifiedModelsResponse filtered the *base*
 * catalog list with filterModelsToQuotaPools(), but the base list never
 * contains qtSd/* combos — they are isHidden:true and skipped while the base
 * list is built (catalog.ts: `if (combo.isHidden === true) continue;`). The
 * filter only KEEPS qtSd/* names, so filtering a list that has none returns
 * [] → 0 models for every quota-exclusive key.
 *
 * Uses "glm" as the provider because it has a small, stable model list in the
 * static registry (same convention as quota-combos-sync.test.ts).
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-quota-exclusive-catalog-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "quota-exclusive-catalog-secret";

const core = await import("../../src/lib/db/core.ts");
const apiKeysDb = await import("../../src/lib/db/apiKeys.ts");
const poolsDb = await import("../../src/lib/db/quotaPools.ts");
const groupsDb = await import("../../src/lib/db/quotaGroups.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");
const { syncQuotaCombos } = await import("../../src/lib/quota/quotaCombos.ts");
const { quotaGroupSlug, isQuotaModelName, parseQuotaModelName } =
  await import("../../src/lib/quota/quotaModelNaming.ts");

async function resetStorage() {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  for (let attempt = 0; attempt < 10; attempt++) {
    try {
      if (fs.existsSync(TEST_DATA_DIR)) {
        fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
      }
      break;
    } catch (error: unknown) {
      const err = error as NodeJS.ErrnoException;
      if ((err?.code === "EBUSY" || err?.code === "EPERM") && attempt < 9) {
        await new Promise((resolve) => setTimeout(resolve, 50 * (attempt + 1)));
      } else {
        throw error;
      }
    }
  }
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  apiKeysDb.resetApiKeyState();
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

test("#4806 quota-exclusive key lists its qtSd/* virtual models in GET /v1/models", async () => {
  // Group "Times" → slug "times"; combos will be qtSd/times/glm/<model>.
  const group = groupsDb.createGroup("Times");

  const conn = await providersDb.createProviderConnection({
    provider: "glm",
    authType: "apikey",
    name: "quota-4806-glm",
    apiKey: "sk-glm-4806",
  });
  const connId = (conn as Record<string, unknown>).id as string;
  assert.ok(connId, "connection should have an id");

  const pool = poolsDb.createPool({ connectionId: connId, name: "Times", groupId: group.id });
  await syncQuotaCombos(pool.id); // mint the hidden qtSd/times/glm/* combos

  // Make the key "quota exclusive" by scoping it to the pool.
  const created = await apiKeysDb.createApiKey("Quota-4806 Key", "machine-4806");
  await apiKeysDb.updateApiKeyPermissions(created.id, { allowedQuotas: [pool.id] });

  const res = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models", {
      headers: { Authorization: `Bearer ${created.key}` },
    })
  );
  assert.equal(res.status, 200);
  const body = (await res.json()) as { data: Array<{ id: string }> };

  const slug = quotaGroupSlug("Times"); // "times"
  const qtsdForKey = body.data.filter(
    (m) => isQuotaModelName(m.id) && parseQuotaModelName(m.id)?.groupSlug === slug
  );

  assert.ok(
    qtsdForKey.length > 0,
    `quota-exclusive key must see its qtSd/${slug}/glm/* models in /v1/models; ` +
      `got ${body.data.length} total, ${qtsdForKey.length} qtSd. ` +
      `ids=${JSON.stringify(body.data.map((m) => m.id).slice(0, 8))}`
  );

  // Every returned model must belong to the key's group (no leakage of other pools/raw models).
  for (const m of body.data) {
    assert.ok(
      isQuotaModelName(m.id) && parseQuotaModelName(m.id)?.groupSlug === slug,
      `quota-exclusive key should only see its own qtSd/${slug}/* models; leaked: ${m.id}`
    );
  }
});
