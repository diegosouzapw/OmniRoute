import test from "node:test";
import assert from "node:assert/strict";

// ═══════════════════════════════════════════════════════════════
//  Registry Utilities Unit Tests
//  Tests for parseModelFromRegistry, getAllModelsFromRegistry,
//  buildAuthHeaders — shared abstractions from PR #167
// ═══════════════════════════════════════════════════════════════

const { parseModelFromRegistry, getAllModelsFromRegistry, buildAuthHeaders } =
  await import("../../open-sse/config/registryUtils.ts");

// ─── Test fixtures ────────────────────────────────────────────

const MOCK_REGISTRY = {
  elevenlabs: {
    id: "elevenlabs",
    baseUrl: "https://api.elevenlabs.io/v1",
    authType: "apikey",
    authHeader: "xi-api-key",
    models: [
      { id: "eleven_multilingual_v2", name: "Multilingual V2" },
      { id: "eleven_turbo_v2_5", name: "Turbo V2.5" },
    ],
  },
  comfyui: {
    id: "comfyui",
    baseUrl: "http://localhost:8188",
    authType: "none",
    authHeader: "none",
    models: [
      { id: "flux-dev", name: "FLUX Dev" },
      { id: "sdxl", name: "SDXL" },
    ],
  },
  nvidia: {
    id: "nvidia",
    baseUrl: "https://integrate.api.nvidia.com/v1",
    authType: "apikey",
    authHeader: "bearer",
    models: [{ id: "parakeet-ctc-1.1b-asr", name: "Parakeet CTC 1.1B" }],
  },
};

// ═══════════════════════════════════════════════════════════════
//  parseModelFromRegistry
// ═══════════════════════════════════════════════════════════════

test("parseModelFromRegistry: returns null provider for null input", () => {
  const result = parseModelFromRegistry(null, MOCK_REGISTRY);
  assert.deepEqual(result, { provider: null, model: null });
});

test("parseModelFromRegistry: returns null provider for empty string", () => {
  const result = parseModelFromRegistry("", MOCK_REGISTRY);
  assert.deepEqual(result, { provider: null, model: null });
});

test("parseModelFromRegistry: parses provider/model prefix correctly", () => {
  const result = parseModelFromRegistry("elevenlabs/eleven_multilingual_v2", MOCK_REGISTRY);
  assert.deepEqual(result, {
    provider: "elevenlabs",
    model: "eleven_multilingual_v2",
  });
});

test("parseModelFromRegistry: parses comfyui/flux-dev correctly", () => {
  const result = parseModelFromRegistry("comfyui/flux-dev", MOCK_REGISTRY);
  assert.deepEqual(result, { provider: "comfyui", model: "flux-dev" });
});

test("parseModelFromRegistry: finds bare model ID without provider prefix", () => {
  const result = parseModelFromRegistry("sdxl", MOCK_REGISTRY);
  assert.deepEqual(result, { provider: "comfyui", model: "sdxl" });
});

test("parseModelFromRegistry: finds bare model in first matching provider", () => {
  const result = parseModelFromRegistry("parakeet-ctc-1.1b-asr", MOCK_REGISTRY);
  assert.deepEqual(result, { provider: "nvidia", model: "parakeet-ctc-1.1b-asr" });
});

test("parseModelFromRegistry: returns null provider for unknown model", () => {
  const result = parseModelFromRegistry("nonexistent-model", MOCK_REGISTRY);
  assert.deepEqual(result, { provider: null, model: "nonexistent-model" });
});

test("parseModelFromRegistry: handles model ID that looks like a provider prefix but isn't", () => {
  const result = parseModelFromRegistry("unknown-provider/some-model", MOCK_REGISTRY);
  assert.deepEqual(result, { provider: null, model: "unknown-provider/some-model" });
});

test("parseModelFromRegistry: handles provider prefix with no matching model", () => {
  // Provider exists but model doesn't — still returns the provider from prefix match
  const result = parseModelFromRegistry("nvidia/nonexistent", MOCK_REGISTRY);
  assert.deepEqual(result, { provider: "nvidia", model: "nonexistent" });
});

// ═══════════════════════════════════════════════════════════════
//  getAllModelsFromRegistry
// ═══════════════════════════════════════════════════════════════

test("getAllModelsFromRegistry: returns all models with prefixed IDs", () => {
  const models = getAllModelsFromRegistry(MOCK_REGISTRY);

  // Total: elevenlabs(2) + comfyui(2) + nvidia(1) = 5
  assert.equal(models.length, 5);

  // Check IDs are prefixed
  const ids = models.map((m) => m.id);
  assert.ok(ids.includes("elevenlabs/eleven_multilingual_v2"));
  assert.ok(ids.includes("comfyui/flux-dev"));
  assert.ok(ids.includes("nvidia/parakeet-ctc-1.1b-asr"));
});

test("getAllModelsFromRegistry: each model has provider field", () => {
  const models = getAllModelsFromRegistry(MOCK_REGISTRY);

  for (const model of models) {
    assert.ok(model.provider, `Model ${model.id} missing provider field`);
    assert.ok(model.name, `Model ${model.id} missing name field`);
  }
});

test("getAllModelsFromRegistry: extra callback adds fields per provider", () => {
  const models = getAllModelsFromRegistry(MOCK_REGISTRY, (providerId, config) => ({
    authType: config.authType,
  }));

  const elevenlabsModel = models.find((m) => m.id === "elevenlabs/eleven_multilingual_v2");
  assert.equal(elevenlabsModel.authType, "apikey");

  const comfyuiModel = models.find((m) => m.id === "comfyui/flux-dev");
  assert.equal(comfyuiModel.authType, "none");
});

test("getAllModelsFromRegistry: returns empty array for empty registry", () => {
  const models = getAllModelsFromRegistry({});
  assert.deepEqual(models, []);
});

// ═══════════════════════════════════════════════════════════════
//  buildAuthHeaders
// ═══════════════════════════════════════════════════════════════

test("buildAuthHeaders: returns Bearer header for bearer authHeader", () => {
  const headers = buildAuthHeaders(MOCK_REGISTRY.nvidia, "my-api-key");
  assert.deepEqual(headers, { Authorization: "Bearer my-api-key" });
});

test("buildAuthHeaders: returns xi-api-key header for ElevenLabs", () => {
  const headers = buildAuthHeaders(MOCK_REGISTRY.elevenlabs, "eleven-key-123");
  assert.deepEqual(headers, { "xi-api-key": "eleven-key-123" });
});

test("buildAuthHeaders: returns empty object for authType none", () => {
  const headers = buildAuthHeaders(MOCK_REGISTRY.comfyui, "any-token");
  assert.deepEqual(headers, {});
});

test("buildAuthHeaders: returns empty object for null token", () => {
  const headers = buildAuthHeaders(MOCK_REGISTRY.nvidia, null);
  assert.deepEqual(headers, {});
});

test("buildAuthHeaders: returns Token header for token authHeader", () => {
  const provider = { ...MOCK_REGISTRY.nvidia, authHeader: "token", authType: "apikey" };
  const headers = buildAuthHeaders(provider, "hf-token");
  assert.deepEqual(headers, { Authorization: "Token hf-token" });
});

test("buildAuthHeaders: returns x-api-key header", () => {
  const provider = { ...MOCK_REGISTRY.nvidia, authHeader: "x-api-key", authType: "apikey" };
  const headers = buildAuthHeaders(provider, "custom-key");
  assert.deepEqual(headers, { "x-api-key": "custom-key" });
});

test("buildAuthHeaders: returns empty object for authHeader none", () => {
  const provider = { ...MOCK_REGISTRY.nvidia, authHeader: "none", authType: "apikey" };
  const headers = buildAuthHeaders(provider, "some-token");
  assert.deepEqual(headers, {});
});

// ═══════════════════════════════════════════════════════════════
//  Integration: Video/Music/Audio registry utils
// ═══════════════════════════════════════════════════════════════

test("parseVideoModel: works via video registry", async () => {
  const { parseVideoModel } = await import("../../open-sse/config/videoRegistry.ts");
  const result = parseVideoModel("comfyui/animatediff");
  assert.deepEqual(result, { provider: "comfyui", model: "animatediff" });
});

test("parseMusicModel: works via music registry", async () => {
  const { parseMusicModel } = await import("../../open-sse/config/musicRegistry.ts");
  const result = parseMusicModel("comfyui/stable-audio-open");
  assert.deepEqual(result, { provider: "comfyui", model: "stable-audio-open" });
});

test("getAllVideoModels: returns video models with provider prefix", async () => {
  const { getAllVideoModels } = await import("../../open-sse/config/videoRegistry.ts");
  const models = getAllVideoModels();
  assert.ok(models.length >= 3, `Expected at least 3 video models, got ${models.length}`);
  assert.ok(models.some((m) => m.id === "comfyui/animatediff"));
});

test("getAllMusicModels: returns music models with provider prefix", async () => {
  const { getAllMusicModels } = await import("../../open-sse/config/musicRegistry.ts");
  const models = getAllMusicModels();
  assert.ok(models.length >= 2, `Expected at least 2 music models, got ${models.length}`);
  assert.ok(models.some((m) => m.id === "comfyui/stable-audio-open"));
});
