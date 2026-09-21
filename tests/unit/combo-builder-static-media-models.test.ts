/**
 * The Combo Builder consumes the chat/provider model registries, while media
 * registries are intentionally kept out of those chat catalogs.  That left a
 * configured OpenRouter account unable to select native video models unless an
 * operator switched to expert mode and typed the exact slug manually.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-combo-media-"));
process.env.DATA_DIR = TEST_DATA_DIR;

const core = await import("../../src/lib/db/core.ts");
const modelsDb = await import("../../src/lib/db/models.ts");
const providersDb = await import("../../src/lib/db/providers.ts");
const { getComboBuilderOptions } = await import("../../src/lib/combos/builderOptions.ts");

test.after(() => {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});

test("static media registry models are selectable for a configured provider without duplicate ids", async () => {
  await providersDb.createProviderConnection({
    provider: "openrouter",
    authType: "apikey",
    name: "openrouter-combo-media",
    apiKey: "openrouter-key-combo-media",
    isActive: true,
    testStatus: "active",
  });

  const payload = await getComboBuilderOptions();
  const provider = payload.providers.find((entry) => entry.providerId === "openrouter");
  assert.ok(provider, "configured OpenRouter must appear in the combo builder");

  const videoModels = provider.models.filter((model) => model.id === "google/veo-3.1");
  assert.equal(videoModels.length, 1, "the static video id must appear exactly once");
  assert.deepEqual(videoModels[0]?.supportedEndpoints, ["videos"]);
  assert.equal(videoModels[0]?.qualifiedModel, "openrouter/google/veo-3.1");

  const image = provider.models.find((model) => model.id === "openai/gpt-5.4-image-2");
  assert.ok(image, "a configured provider's static image model must be selectable");

  const transcription = provider.models.find((model) => model.id === "deepgram/nova-3");
  assert.ok(transcription, "a configured provider's static audio model must be selectable");
});

test("a video-only visibility override hides the matching Combo Builder media option", async () => {
  modelsDb.setModelIsHidden("openrouter", "google/veo-3.1", true, "videos");

  const payload = await getComboBuilderOptions();
  const provider = payload.providers.find((entry) => entry.providerId === "openrouter");
  assert.ok(provider, "OpenRouter setup from the first test must remain available");
  assert.equal(
    provider.models.some((model) => model.id === "google/veo-3.1"),
    false,
    "a video visibility override must suppress the static video option"
  );
});
