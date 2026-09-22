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

test("default chat metadata on a legacy custom row does not erase static image metadata", async () => {
  await modelsDb.addCustomModel(
    "openrouter",
    "black-forest-labs/flux.2-pro",
    "Custom FLUX.2 Pro",
    "manual",
    "chat-completions",
    ["chat"]
  );

  const payload = await getComboBuilderOptions();
  const provider = payload.providers.find((entry) => entry.providerId === "openrouter");
  assert.ok(provider);

  const matches = provider.models.filter((model) => model.id === "black-forest-labs/flux.2-pro");
  assert.equal(matches.length, 1, "the static and custom rows must deduplicate");
  assert.equal(matches[0]?.name, "Custom FLUX.2 Pro", "custom display metadata still wins");
  assert.deepEqual(matches[0]?.supportedEndpoints, ["images"]);
  assert.equal(matches[0]?.apiFormat, "images");
  assert.deepEqual(matches[0]?.sources, ["system", "custom"]);
});

test("intentional non-default custom routing metadata still overrides static media metadata", async () => {
  await modelsDb.addCustomModel(
    "openrouter",
    "black-forest-labs/flux.2-flex",
    "Custom FLUX.2 Flex",
    "manual",
    "responses",
    ["chat"]
  );

  const payload = await getComboBuilderOptions();
  const provider = payload.providers.find((entry) => entry.providerId === "openrouter");
  const model = provider?.models.find((entry) => entry.id === "black-forest-labs/flux.2-flex");
  assert.ok(model);
  assert.deepEqual(model.supportedEndpoints, ["chat"]);
  assert.equal(model.apiFormat, "responses");
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
