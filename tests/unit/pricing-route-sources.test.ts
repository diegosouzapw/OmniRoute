import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-pricing-route-"));
const ORIGINAL_INITIAL_PASSWORD = process.env.INITIAL_PASSWORD;
const ORIGINAL_JWT_SECRET = process.env.JWT_SECRET;
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.INITIAL_PASSWORD = "";
delete process.env.JWT_SECRET;

interface PricingWithSourcesPayload {
  pricing: Record<string, Record<string, Record<string, number>>>;
  sourceMap: Record<string, Record<string, "default" | "litellm" | "modelsDev" | "user">>;
}

const core = await import("../../src/lib/db/core.ts");
const settingsDb = await import("../../src/lib/db/settings.ts");
const pricingRoute = await import("../../src/app/api/pricing/route.ts");

async function resetDb() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  await settingsDb.updateSettings({ requireLogin: false });
}

test.beforeEach(async () => {
  await resetDb();
});

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  if (ORIGINAL_INITIAL_PASSWORD === undefined) {
    delete process.env.INITIAL_PASSWORD;
  } else {
    process.env.INITIAL_PASSWORD = ORIGINAL_INITIAL_PASSWORD;
  }
  if (ORIGINAL_JWT_SECRET === undefined) {
    delete process.env.JWT_SECRET;
  } else {
    process.env.JWT_SECRET = ORIGINAL_JWT_SECRET;
  }
});

test("pricing GET keeps legacy payload by default and exposes source metadata on demand", async () => {
  const db = core.getDbInstance();

  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "pricing_synced",
    "route-provider",
    JSON.stringify({
      "model-litellm": { prompt: 1 },
      "model-user": { prompt: 2 },
    })
  );
  db.prepare("INSERT INTO key_value (namespace, key, value) VALUES (?, ?, ?)").run(
    "models_dev_pricing",
    "route-provider",
    JSON.stringify({
      "model-modelsdev": { prompt: 3 },
      "model-user": { completion: 4 },
    })
  );

  await settingsDb.updatePricing({
    "route-provider": {
      "model-user": { cached: 5 },
    },
  });

  const legacyResponse = await pricingRoute.GET(
    new Request("http://localhost/api/pricing", {
      headers: { "x-omniroute-peer-locality": "loopback" },
    })
  );
  assert.equal(legacyResponse.status, 200);
  const legacyPayload = await legacyResponse.json();

  assert.equal("sourceMap" in legacyPayload, false);
  assert.deepEqual(legacyPayload["route-provider"]["model-user"], {
    prompt: 2,
    completion: 4,
    cached: 5,
  });

  const sourceResponse = await pricingRoute.GET(
    new Request("http://localhost/api/pricing?includeSources=1", {
      headers: { "x-omniroute-peer-locality": "loopback" },
    })
  );
  assert.equal(sourceResponse.status, 200);

  const payload = (await sourceResponse.json()) as PricingWithSourcesPayload;
  assert.deepEqual(payload.pricing["route-provider"]["model-user"], {
    prompt: 2,
    completion: 4,
    cached: 5,
  });
  assert.equal(payload.sourceMap["route-provider"]["model-litellm"], "litellm");
  assert.equal(payload.sourceMap["route-provider"]["model-modelsdev"], "modelsDev");
  assert.equal(payload.sourceMap["route-provider"]["model-user"], "user");
  assert.equal(payload.sourceMap.openai["gpt-4o"], "default");
});
