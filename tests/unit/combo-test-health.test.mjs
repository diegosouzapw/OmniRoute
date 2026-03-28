import test from "node:test";
import assert from "node:assert/strict";

const { buildComboTestRequestBody, shouldProbeComboTestReachability, probeComboModelReachability } =
  await import("../../src/lib/combos/testHealth.ts");

test("combo test helper builds a realistic smoke payload", () => {
  const body = buildComboTestRequestBody("openrouter/openai/gpt-5.4");

  assert.equal(body.model, "openrouter/openai/gpt-5.4");
  assert.equal(body.messages[0].content, "Reply with OK only.");
  assert.equal(body.max_tokens, 16);
  assert.equal(body.stream, false);
});

test("combo test helper probes only soft 4xx responses", () => {
  assert.equal(shouldProbeComboTestReachability(400), true);
  assert.equal(shouldProbeComboTestReachability(422), true);
  assert.equal(shouldProbeComboTestReachability(401), false);
  assert.equal(shouldProbeComboTestReachability(404), false);
  assert.equal(shouldProbeComboTestReachability(429), false);
});

test("combo reachability probe reuses resolved provider credentials and model id", async () => {
  let validationInput = null;

  const result = await probeComboModelReachability("openrouter/openai/gpt-5.4", {
    getModelInfo: async () => ({ provider: "openrouter", model: "openai/gpt-5.4" }),
    getProviderCredentials: async () => ({
      apiKey: "test-key",
      providerSpecificData: { baseUrl: "https://openrouter.ai/api/v1" },
    }),
    validateProviderApiKey: async (input) => {
      validationInput = input;
      return { valid: true, method: "models_endpoint" };
    },
  });

  assert.equal(result.reachable, true);
  assert.equal(result.provider, "openrouter");
  assert.equal(result.model, "openai/gpt-5.4");
  assert.equal(result.method, "models_endpoint");
  assert.deepEqual(validationInput, {
    provider: "openrouter",
    apiKey: "test-key",
    providerSpecificData: {
      baseUrl: "https://openrouter.ai/api/v1",
      validationModelId: "openai/gpt-5.4",
    },
  });
});
