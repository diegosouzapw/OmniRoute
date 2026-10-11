/**
 * TDD regression: the Alibaba ModelStudio free-quota-drain branch inside
 * `markAccountUnavailable` (src/sse/services/auth.ts) persists the drained
 * model by writing `providerSpecificData` MIXED with runtime error fields in a
 * single `updateProviderConnection()` call.
 *
 * `invalidateConnectionUpdate()` classifies an update as runtime-state-only
 * (and therefore skips the model-catalog invalidation, #13389) only when EVERY
 * key in the payload is in CONNECTION_RUNTIME_STATE_FIELDS. `providerSpecificData`
 * is deliberately not whitelisted — for compatible provider nodes it carries
 * structural data (model lists) — so the mixed payload fails the check and the
 * whole `/v1/models` response cache is dropped.
 *
 * Effect: every time a free-tier model drains (once per model per quota
 * window), the unified catalog pays a full multi-second cold rebuild and
 * concurrent catalog callers can hit the 503 admission budget — the same
 * failure mode #13389 fixed for routine backoff writes.
 *
 * The catalog builder never reads `alibabaFreeDrainedModels`, so the drained-
 * models persistence must not bump `modelCatalogCacheVersion`.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-alibaba-drain-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getModelCatalogCacheVersion } = await import("../../src/lib/db/readCache.ts");
const { markAccountUnavailable } = await import("../../src/sse/services/auth.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("alibaba free-quota drain persists the model without dropping the model catalog cache", async () => {
  const conn = await providersDb.createProviderConnection({
    provider: "alibaba",
    authType: "api_key",
    name: "Alibaba drain test",
    providerSpecificData: { alibabaBillingMode: "free" },
  });
  const connId = (conn as { id: string }).id;

  const versionBefore = getModelCatalogCacheVersion();

  const result = await markAccountUnavailable(
    connId,
    403,
    "Your free quota has been exhausted for this model. Upgrade to a paid plan to continue.",
    "alibaba",
    "qwen3-coder-plus"
  );

  // The branch must have actually run: the model is persisted as drained and
  // the runtime error fields are recorded.
  const after = await providersDb.getProviderConnectionById(connId);
  const drained = ((after?.providerSpecificData as Record<string, unknown>) ?? {})[
    "alibabaFreeDrainedModels"
  ];
  assert.ok(
    Array.isArray(drained) && drained.includes("qwen3-coder-plus"),
    `expected drained model persisted, got ${JSON.stringify(drained)} (result=${JSON.stringify(result)})`
  );
  assert.equal(after?.lastErrorType, "free_quota_exhausted");

  // THE REGRESSION: persisting the drained model must not bump the model
  // catalog cache version — nothing the catalog builder reads has changed.
  const versionAfter = getModelCatalogCacheVersion();
  assert.equal(
    versionAfter,
    versionBefore,
    `alibaba free-quota drain dropped the model catalog cache (version ${versionBefore} -> ${versionAfter})`
  );
});
