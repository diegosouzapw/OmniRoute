import assert from "node:assert/strict";
import test from "node:test";

import { handleImageGeneration } from "../../open-sse/handlers/imageGeneration.ts";

test("central image handler retires cgpt-web and reports clean-room chatgpt-web as unsupported", async () => {
  const originalFetch = globalThis.fetch;
  let fetchCalls = 0;
  globalThis.fetch = async () => {
    fetchCalls += 1;
    throw new Error("Retired image providers must not reach the network");
  };

  try {
    for (const provider of ["cgpt-web"]) {
      const viaRequestedModel = await handleImageGeneration({
        body: { model: `${provider}/gpt-5.5`, prompt: "draw a lighthouse" },
        credentials: { apiKey: "unused" },
        log: null,
      });
      assert.deepEqual(viaRequestedModel, {
        success: false,
        status: 410,
        error: "Provider is retired and unavailable.",
        code: "PROVIDER_RETIRED",
      });

      const viaBareProviderId = await handleImageGeneration({
        body: { model: provider, prompt: "draw a lighthouse" },
        credentials: { apiKey: "unused" },
        log: null,
      });
      assert.deepEqual(viaBareProviderId, viaRequestedModel);

      const viaResolvedProvider = await handleImageGeneration({
        body: { model: `${provider}/gpt-5.5`, prompt: "draw a lighthouse" },
        credentials: { apiKey: "unused" },
        resolvedProvider: provider,
        log: null,
      });
      assert.deepEqual(viaResolvedProvider, viaRequestedModel);
    }

    const cleanRoomTextOnly = await handleImageGeneration({
      body: { model: "chatgpt-web/gpt-5-5-thinking", prompt: "draw a lighthouse" },
      credentials: { apiKey: "unused" },
      log: null,
    });
    assert.equal(cleanRoomTextOnly.status, 400);
    assert.match(cleanRoomTextOnly.error, /invalid image model/i);
    assert.notEqual((cleanRoomTextOnly as { code?: string }).code, "PROVIDER_RETIRED");

    const similarButDistinct = await handleImageGeneration({
      body: { model: "chatgpt-web-preview/gpt-5.5", prompt: "draw a lighthouse" },
      credentials: { apiKey: "unused" },
      log: null,
    });
    assert.equal(similarButDistinct.status, 400);
    assert.notEqual((similarButDistinct as { code?: string }).code, "PROVIDER_RETIRED");
    assert.equal(fetchCalls, 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
