import assert from "node:assert/strict";
import test from "node:test";

import {
  generateProviderPluginManifest,
  getProviderPluginManifestEntry,
  getProviderPluginManifestEntryForModel,
} from "../../open-sse/config/providerPluginManifestRegistry.ts";

test("provider plugin manifest registry resolves providers by id", () => {
  const openaiById = getProviderPluginManifestEntry("openai");

  assert.ok(openaiById);
  assert.equal(openaiById.id, "openai");
});

test("provider plugin manifest registry resolves model to owning provider", () => {
  const entryByModel = getProviderPluginManifestEntryForModel("gpt-5.6");

  assert.ok(entryByModel);
  assert.equal(entryByModel.id, "openai");
  assert.equal(entryByModel.models.some((model) => model.id === "gpt-5.6"), true);
});

test("provider plugin manifest registry prefers model-prefix provider mapping when present", () => {
  const prefixed = getProviderPluginManifestEntryForModel("openai/gpt-5");

  assert.ok(prefixed);
  assert.equal(prefixed.id, "openai");
});

test("provider plugin manifest registry returns null for unknown models", () => {
  assert.equal(getProviderPluginManifestEntryForModel("nonexistent/provider"), null);
  assert.equal(getProviderPluginManifestEntryForModel("unknown-model"), null);
});

test("provider plugin manifest registry preserves first-provider precedence for duplicate models", () => {
  const manifest = generateProviderPluginManifest();
  const duplicateModel = manifest.providers
    .flatMap((provider) =>
      provider.models.map((model) => model.id).filter((modelId) =>
        manifest.providers.some(
          (otherProvider) =>
            otherProvider.id !== provider.id &&
            otherProvider.models.some((otherModel) => otherModel.id === modelId)
        )
      )
    )
    .find((modelId) => Boolean(modelId));
  assert.ok(duplicateModel);

  const expectedProvider = manifest.providers.find((provider) =>
    provider.models.some((model) => model.id === duplicateModel)
  );
  assert.ok(expectedProvider);

  const resolvedProvider = getProviderPluginManifestEntryForModel(duplicateModel);
  assert.ok(resolvedProvider);
  assert.equal(resolvedProvider.id, expectedProvider.id);
});
