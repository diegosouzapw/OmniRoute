import assert from "node:assert/strict";
import test from "node:test";

import { beatapiProvider } from "../../open-sse/config/providers/registry/beatapi/index.ts";

test("BeatAPI routes through the standard authenticated OpenAI endpoints", async () => {
  const { REGISTRY } = await import("../../open-sse/config/providerRegistry.ts");
  const { PROVIDER_ENDPOINTS } = await import("../../src/shared/constants/config.ts");
  const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers/apikey/index.ts");
  const { AGGREGATOR_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");

  assert.equal(REGISTRY.beatapi, beatapiProvider);
  assert.equal(beatapiProvider.format, "openai");
  assert.equal(beatapiProvider.executor, "default");
  assert.equal(beatapiProvider.authType, "apikey");
  assert.equal(beatapiProvider.authHeader, "bearer");
  assert.equal(beatapiProvider.baseUrl, "https://api.beatapi.io/v1/chat/completions");
  assert.equal(beatapiProvider.responsesBaseUrl, "https://api.beatapi.io/v1/responses");
  assert.equal(beatapiProvider.modelsUrl, "https://api.beatapi.io/v1/models");
  assert.equal(PROVIDER_ENDPOINTS.beatapi, beatapiProvider.baseUrl);
  assert.equal(APIKEY_PROVIDERS.beatapi.passthroughModels, true);
  assert.equal(AGGREGATOR_PROVIDER_IDS.has("beatapi"), true);
  assert.deepEqual(beatapiProvider.models, []);
});
