/**
 * Provider-page "Free" badge (#13645).
 *
 * A. Flag off (default): `isModelFreeBadge` is the historical dashboard rule — every badge
 *    the dashboard showed before still shows (compatible nodes with `:free`, name-labelled
 *    models, truthy `free` fields).
 * B. Flag on (FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER): only badges that cannot be right are
 *    removed; `:free` stays on free-tier providers and on compatible/custom nodes.
 * C. Catalog cross-check, derived from FREE_MODEL_BUDGETS (no hand-kept allowlist): every
 *    live catalogued free model keeps its badge under both rules; retired-only entries do
 *    not get one from the catalog alone.
 * D. Auth bypass lock: the `credits_exhausted` exemption for free models in
 *    `src/sse/services/auth.ts` stays scoped to openrouter + free models.
 */
import { describe, it, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  FREE_BADGE_STRICT_FLAG,
  isModelFreeBadge,
  providerHasFreeModels,
} from "../../src/shared/utils/freeModels.ts";
import { FREE_MODEL_BUDGETS, grantsFreeAccess } from "../../open-sse/config/freeModelCatalog.ts";
import { getProviderById } from "../../src/shared/constants/providers.ts";
import { FEATURE_FLAG_DEFINITIONS } from "../../src/shared/constants/featureFlagDefinitions.ts";

const PAID_REGISTERED = "openai"; // registered provider, no documented free tier
const FREE_TIER = "openrouter"; // documented free tier, implements `:free`
const COMPATIBLE_NODE = "openai-compatible-chat-7f3a"; // custom node, upstream unknown

const LIVE = FREE_MODEL_BUDGETS.filter((m) => grantsFreeAccess(m.freeType));
const liveIds = new Set(LIVE.map((m) => `${m.provider}/${m.modelId}`));

describe("fixtures", () => {
  it("the providers used below have the properties the cases rely on", () => {
    assert.ok(getProviderById(PAID_REGISTERED), `${PAID_REGISTERED} is registered`);
    assert.equal(providerHasFreeModels(PAID_REGISTERED), false);
    assert.ok(getProviderById(FREE_TIER), `${FREE_TIER} is registered`);
    assert.equal(providerHasFreeModels(FREE_TIER), true);
    assert.equal(getProviderById(COMPATIBLE_NODE), undefined);
    assert.equal(providerHasFreeModels(COMPATIBLE_NODE), false);
  });

  it("the strict rule ships as an opt-in flag", () => {
    const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === FREE_BADGE_STRICT_FLAG);
    assert.ok(def, "flag defined");
    assert.equal(def.defaultValue, "false");
    assert.equal(def.type, "boolean");
  });
});

describe("A. flag off: historical badge rule unchanged", () => {
  const legacy = (provider: string, model: Parameters<typeof isModelFreeBadge>[1]) =>
    isModelFreeBadge(provider, model);

  it("keeps the badge on compatible nodes pointing at :free models", () => {
    assert.equal(legacy(COMPATIBLE_NODE, { id: "meta-llama/llama-3.3-70b:free" }), true);
  });

  it("keeps name-labelled and truthy-field badges", () => {
    assert.equal(legacy(PAID_REGISTERED, { id: "chat-x", name: "Chat X (Free)" }), true);
    assert.equal(legacy(PAID_REGISTERED, { id: "chat-y", name: "Modelo grátis" }), true);
    assert.equal(legacy(PAID_REGISTERED, { id: "chat-z", free: "yes" }), true);
    assert.equal(legacy(PAID_REGISTERED, { id: "gpt-9:free" }), true);
  });

  it("does not badge a plain paid model", () => {
    assert.equal(legacy(PAID_REGISTERED, { id: "gpt-9", name: "GPT 9" }), false);
    assert.equal(legacy(PAID_REGISTERED, { id: "gpt-9", name: "Freeform writer" }), false);
  });
});

describe("B. flag on: only provably wrong badges are removed", () => {
  const strict = (provider: string, model: Parameters<typeof isModelFreeBadge>[1]) =>
    isModelFreeBadge(provider, model, { strict: true });

  it("keeps :free on compatible nodes and on free-tier providers", () => {
    assert.equal(strict(COMPATIBLE_NODE, { id: "meta-llama/llama-3.3-70b:free" }), true);
    assert.equal(strict(FREE_TIER, { id: "meta-llama/llama-3.3-70b:free" }), true);
  });

  it("keeps explicit boolean free signals on any provider", () => {
    assert.equal(strict(PAID_REGISTERED, { id: "promo", isFree: true }), true);
    assert.equal(strict(PAID_REGISTERED, { id: "promo", free: true }), true);
    assert.equal(strict(COMPATIBLE_NODE, { id: "local-model", free: true }), true);
  });

  it("drops the name heuristic, non-boolean free fields and :free on paid registered providers", () => {
    assert.equal(strict(PAID_REGISTERED, { id: "chat-x", name: "Chat X (Free)" }), false);
    assert.equal(strict(PAID_REGISTERED, { id: "chat-z", free: "false" }), false);
    assert.equal(strict(PAID_REGISTERED, { id: "gpt-9:free" }), false);
    assert.equal(strict(COMPATIBLE_NODE, { id: "chat-x", name: "Free chat" }), false);
  });

  it("never adds a badge the historical rule did not show", () => {
    const cases: Array<[string, Parameters<typeof isModelFreeBadge>[1]]> = [
      [PAID_REGISTERED, { id: "gpt-9" }],
      [PAID_REGISTERED, { id: "gpt-9", isFree: "true" }],
      [COMPATIBLE_NODE, { id: "x", free: 0 }],
      [FREE_TIER, { id: "paid/model", name: "paid" }],
      ...LIVE.slice(0, 20).map((m) => [m.provider, { id: m.modelId }] as [string, { id: string }]),
    ];
    for (const [provider, model] of cases) {
      if (isModelFreeBadge(provider, model, { strict: true })) {
        assert.equal(isModelFreeBadge(provider, model), true, `${provider}/${model.id}`);
      }
    }
  });
});

describe("C. catalog cross-check (derived from FREE_MODEL_BUDGETS)", () => {
  it("every live catalogued free model keeps its badge under both rules", () => {
    assert.ok(LIVE.length > 0, "catalog has live free entries");
    for (const entry of LIVE) {
      const model = { id: entry.modelId };
      assert.equal(
        isModelFreeBadge(entry.provider, model),
        true,
        `${entry.provider}/${entry.modelId}`
      );
      assert.equal(
        isModelFreeBadge(entry.provider, model, { strict: true }),
        true,
        `strict ${entry.provider}/${entry.modelId}`
      );
    }
  });

  it("a retired-only catalog entry earns no badge from the catalog itself", () => {
    const retiredOnly = FREE_MODEL_BUDGETS.filter(
      (m) =>
        !grantsFreeAccess(m.freeType) &&
        !liveIds.has(`${m.provider}/${m.modelId}`) &&
        !m.modelId.endsWith(":free") &&
        !/\bgr[aá]tis\b|\bfree\b/i.test(m.modelId)
    );
    assert.ok(retiredOnly.length > 0, "catalog has retired-only entries");
    for (const entry of retiredOnly) {
      assert.equal(
        isModelFreeBadge(entry.provider, { id: entry.modelId }, { strict: true }),
        false,
        `${entry.provider}/${entry.modelId}`
      );
    }
  });
});

describe("D. auth bypass lock", () => {
  const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-free-badge-gate-"));
  process.env.DATA_DIR = TEST_DATA_DIR;

  let core: typeof import("../../src/lib/db/core.ts");
  let providersDb: typeof import("../../src/lib/db/providers.ts");
  let auth: typeof import("../../src/sse/services/auth.ts");

  test.before(async () => {
    core = await import("../../src/lib/db/core.ts");
    providersDb = await import("../../src/lib/db/providers.ts");
    auth = await import("../../src/sse/services/auth.ts");
  });

  test.after(() => {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  });

  async function resetStorage() {
    core.resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  }

  test("catalogued free id without :free suffix is still served on credits_exhausted", async () => {
    await resetStorage();
    const live = LIVE.find((m) => m.provider === "openrouter" && !m.modelId.endsWith(":free"));
    assert.ok(live, "openrouter must have a live catalogued id without :free suffix");
    await providersDb.createProviderConnection({
      provider: "openrouter",
      authType: "apikey",
      apiKey: "sk-or-exhausted-catalog",
      isActive: true,
      testStatus: "credits_exhausted",
    });
    const selected = await auth.getProviderCredentials("openrouter", null, null, live.modelId);
    assert.ok(selected && "connectionId" in selected, "catalogued free id must bypass the lock");
  });

  test("expired status still refuses a :free model", async () => {
    await resetStorage();
    await providersDb.createProviderConnection({
      provider: "openrouter",
      authType: "apikey",
      apiKey: "sk-or-expired",
      isActive: true,
      testStatus: "expired",
    });
    const selected = await auth.getProviderCredentials(
      "openrouter",
      null,
      null,
      "meta-llama/llama-3.1-8b-instruct:free"
    );
    assert.deepEqual(selected, {
      allExpired: true,
      expiredCount: 1,
      expiredStatus: "expired",
    });
  });
});
