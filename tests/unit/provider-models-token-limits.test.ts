import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(
  path.join(os.tmpdir(), "omniroute-provider-model-token-limits-")
);
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providerModelsRoute = await import("../../src/app/api/provider-models/route.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

function buildPostRequest(body) {
  return new Request("http://localhost/api/provider-models", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

// #1294: POST /api/provider-models must persist max_input_tokens / max_output_tokens
// (stored as inputTokenLimit / outputTokenLimit) so the token limits set in the
// "add custom model" form survive into the catalog round-trip.
test("POST persists max_input_tokens / max_output_tokens as inputTokenLimit / outputTokenLimit", async () => {
  const response = await providerModelsRoute.POST(
    buildPostRequest({
      provider: "openai-compatible-demo",
      modelId: "custom-long-context",
      modelName: "Custom Long Context",
      max_input_tokens: 200000,
      max_output_tokens: 16384,
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.model?.id, "custom-long-context");
  assert.equal(body.model?.inputTokenLimit, 200000);
  assert.equal(body.model?.outputTokenLimit, 16384);

  const stored = await modelsDb.getCustomModels("openai-compatible-demo");
  const persisted = stored.find((model) => model.id === "custom-long-context");
  assert.ok(persisted, "custom model should be persisted");
  assert.equal(persisted.inputTokenLimit, 200000);
  assert.equal(persisted.outputTokenLimit, 16384);
});

test("POST omits token limits when they are not provided", async () => {
  const response = await providerModelsRoute.POST(
    buildPostRequest({
      provider: "openai-compatible-demo",
      modelId: "custom-no-limits",
      modelName: "Custom No Limits",
    })
  );
  const body = (await response.json()) as any;

  assert.equal(response.status, 200);
  assert.equal(body.model?.id, "custom-no-limits");
  assert.equal("inputTokenLimit" in body.model, false);
  assert.equal("outputTokenLimit" in body.model, false);
});
