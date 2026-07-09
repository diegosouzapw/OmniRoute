// Regression test for #6457 — huggingface/stabilityai/stable-diffusion-xl-base-1.0
// (an image/diffusion model) was listed as a CHAT model in GET /v1/models, so firing
// POST /v1/chat/completions with it hit the upstream and returned a raw HuggingFace
// "[400] The requested model '...' is not a chat model." error.
//
// Root cause: the synced-provider-models loop in catalog.ts (fed by live discovery —
// e.g. HuggingFace's own `/v1/models`) defaults a model's `endpoints` to `["chat"]`
// whenever the upstream discovery payload carries no modality/endpoint info, which is
// exactly what HuggingFace's live catalog returns for image models. That produced a
// second, bogus chat-typed entry for the SAME id already correctly listed with
// `type: "image"` by the imageRegistry loop — and catalogDedupe.ts keys on
// (id, type, subtype), so the two distinct-`type` entries both survived.
//
// Fix: skip a synced model in the chat-catalog loop when it is already a registered
// image model for that exact provider (open-sse/config/imageRegistry.ts
// isRegisteredImageModel()) — the imageRegistry loop still adds the correctly-typed
// `type: "image"` entry.

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-image-chat-6457-"));
process.env.DATA_DIR = TEST_DATA_DIR;
process.env.API_KEY_SECRET = process.env.API_KEY_SECRET || "catalog-test-secret-6457";

const core = await import("../../src/lib/db/core.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const v1ModelsCatalog = await import("../../src/app/api/v1/models/catalog.ts");

async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

test.beforeEach(async () => {
  await resetStorage();
});

test.after(async () => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
});

async function seedHuggingFaceConnection() {
  return providersDb.createProviderConnection({
    provider: "huggingface",
    authType: "apikey",
    name: `huggingface-${Math.random().toString(16).slice(2, 8)}`,
    apiKey: "hf-key",
    isActive: true,
    testStatus: "active",
  });
}

test("#6457 image/diffusion model discovered via live sync is NOT listed as a chat model", async () => {
  const connection = await seedHuggingFaceConnection();

  // Simulate what HuggingFace's live `/v1/models` discovery persists for an
  // image/diffusion model: no supportedEndpoints/modality info at all — the exact
  // upstream shape that made the synced-models loop default to `["chat"]`.
  await modelsDb.replaceSyncedAvailableModelsForConnection("huggingface", connection.id, [
    { id: "stabilityai/stable-diffusion-xl-base-1.0", name: "Stable Diffusion XL (HF)" },
    { id: "meta-llama/llama-3.1-8b-instruct", name: "Llama 3.1 8B" },
  ]);

  const response = await v1ModelsCatalog.getUnifiedModelsResponse(
    new Request("http://localhost/api/v1/models")
  );
  assert.equal(response.status, 200);

  const body = (await response.json()) as {
    data: Array<{ id: string; type?: string }>;
  };

  const imageModelEntries = body.data.filter((m) =>
    m.id.includes("stabilityai/stable-diffusion-xl-base-1.0")
  );

  assert.ok(imageModelEntries.length > 0, "the image model must still be listed somewhere");
  for (const entry of imageModelEntries) {
    assert.equal(
      entry.type,
      "image",
      `every listing of the diffusion model must be type:"image", got ${JSON.stringify(entry)}`
    );
  }

  // A real chat model synced alongside it must still be listed as chat (no `type`,
  // per the OpenAI-compatible convention used throughout this catalog).
  const chatModelEntries = body.data.filter((m) =>
    m.id.includes("meta-llama/llama-3.1-8b-instruct")
  );
  assert.ok(chatModelEntries.length > 0, "the real chat model must still be listed");
  for (const entry of chatModelEntries) {
    assert.equal(entry.type, undefined, "the real chat model must not carry a non-chat type");
  }
});
