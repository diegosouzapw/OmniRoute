/**
 * #6328 (follow-up to #6495) — the dashboard `/api/models` endpoint must also
 * REMOVE paid models when `hidePaidModels` is on (the public `/v1/models`
 * catalog already did via #6495). `openai` has no curated free roster, so its
 * chat models are paid-tier and must disappear when the toggle is on.
 * Rule #18 regression guard for the added filter in src/app/api/models/route.ts.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-api-models-hidepaid-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const customModelsDb = await import("../../src/lib/db/models.ts");
const modelCapabilities = await import("../../src/lib/modelCapabilities.ts");
const modelsRoute = await import("../../src/app/api/models/route.ts");

async function fetchModels(): Promise<
  Array<{ provider: string; model: string; supportsVision?: boolean }>
> {
  const res = await modelsRoute.GET(new Request("http://localhost/api/models?all=true"));
  const body = (await res.json()) as { models: Array<{ provider: string; model: string }> };
  return body.models;
}

test.after(() => {
  core.resetDbInstance();
  try {
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  } catch {
    /* best-effort */
  }
});

test("/api/models retains genuine resolved vision capability for the Video Bridge picker", async () => {
  await settingsDb.updateSettings({ hidePaidModels: false });
  const db = core.getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) " + "VALUES ('customModels', ?, ?)"
  ).run("openai", JSON.stringify([{ id: "gpt-4o", supportsVision: false }]));
  const originalPrepare = db.prepare;
  const callPrepare = originalPrepare.bind(db);
  let customModelReads = 0;
  (db as unknown as { prepare: typeof db.prepare }).prepare = ((sql: string) => {
    const normalized = String(sql).replace(/\s+/g, " ").trim();
    if (normalized.includes("FROM key_value WHERE namespace = 'customModels'")) {
      customModelReads++;
    }
    return callPrepare(sql);
  }) as typeof db.prepare;

  let models: Awaited<ReturnType<typeof fetchModels>>;
  try {
    models = await fetchModels();
  } finally {
    (db as unknown as { prepare: typeof db.prepare }).prepare = originalPrepare;
  }
  const vision = models.find(
    (model) => model.provider === "openai" && model.model === "gpt-4o-mini"
  );
  const textOnly = models.find((model) => model.provider === "deepgram");
  const explicitlyDowngraded = models.find(
    (model) => model.provider === "openai" && model.model === "gpt-4o"
  );

  assert.ok(vision, "known static vision model must be present in the real producer response");
  assert.equal(vision.supportsVision, true);
  if (textOnly) assert.notEqual(textOnly.supportsVision, true);
  assert.ok(explicitlyDowngraded, "custom-overridden model must remain in the real producer");
  assert.equal(
    explicitlyDowngraded.supportsVision,
    false,
    "request snapshot must preserve the explicit custom supportsVision override"
  );
  assert.equal(
    customModelReads,
    1,
    "one request-level capability snapshot must bulk-read custom vision overrides once"
  );
});

test("custom-model vision DB failures fail open through point, bulk, snapshot, and route reads", async () => {
  const failure = new Error("private sqlite failure");
  const pointFactories: Array<() => unknown> = [
    () => {
      throw failure;
    },
    () => ({
      prepare() {
        throw failure;
      },
    }),
    () => ({
      prepare() {
        return {
          get() {
            throw failure;
          },
        };
      },
    }),
  ];
  for (const getDatabase of pointFactories) {
    assert.equal(
      customModelsDb.getCustomModelVisionOverride("openai", "gpt-4o", undefined, {
        getDatabase,
      }),
      null
    );
  }

  const bulkFactories: Array<() => unknown> = [
    ...pointFactories.slice(0, 2),
    () => ({
      prepare() {
        return {
          all() {
            throw failure;
          },
        };
      },
    }),
    () => ({
      prepare() {
        return {
          all() {
            return [
              {
                get key() {
                  throw failure;
                },
                value: "[]",
              },
            ];
          },
        };
      },
    }),
  ];
  for (const getDatabase of bulkFactories) {
    const overrides = customModelsDb.listCustomModelVisionOverrides({ getDatabase });
    assert.equal(overrides.size, 0);
  }

  const customDbFailure = {
    getDatabase: () => {
      throw failure;
    },
  };
  const snapshot = modelCapabilities.createModelCapabilityResolutionSnapshot({
    customModelVision: customDbFailure,
  });
  assert.equal(snapshot.customVisionOverrides.size, 0);
  assert.equal(
    modelCapabilities.getResolvedModelCapabilities("openai/gpt-4o-mini", undefined, snapshot)
      .supportsVision,
    true,
    "ordinary static capability fallback must survive the optional DB read"
  );

  const response = await modelsRoute.handleGetModels(
    new Request("http://localhost/api/models?all=true"),
    {
      createCapabilitySnapshot: () =>
        modelCapabilities.createModelCapabilityResolutionSnapshot({
          customModelVision: customDbFailure,
        }),
    }
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    models: Array<{ provider: string; model: string; supportsVision?: boolean }>;
  };
  assert.equal(
    body.models.find((model) => model.provider === "openai" && model.model === "gpt-4o-mini")
      ?.supportsVision,
    true
  );
});

test("#6328 /api/models removes paid models when hidePaidModels is on", async () => {
  await providersDb.createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "openai-main",
    apiKey: "sk-test",
    isActive: true,
  });

  const hasPaidOpenAi = (list: Array<{ provider: string; model: string }>) =>
    list.some((m) => m.provider === "openai" && /^gpt-/.test(m.model));

  await settingsDb.updateSettings({ hidePaidModels: false });
  assert.equal(
    hasPaidOpenAi(await fetchModels()),
    true,
    "paid OpenAI models visible when toggle is off"
  );

  await settingsDb.updateSettings({ hidePaidModels: true });
  assert.equal(
    hasPaidOpenAi(await fetchModels()),
    false,
    "paid OpenAI models must be removed when hidePaidModels is on (#6328)"
  );
});
