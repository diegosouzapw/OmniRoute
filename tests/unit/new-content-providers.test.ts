import test from "node:test";
import assert from "node:assert/strict";

// ─── Provider Registrations ─────────────────────────────────────────────────

test("haiper provider is registered", async () => {
  const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
  assert.ok(APIKEY_PROVIDERS.haiper, "haiper should be in APIKEY_PROVIDERS");
  assert.equal(APIKEY_PROVIDERS.haiper.id, "haiper");
  assert.equal(APIKEY_PROVIDERS.haiper.alias, "hp");
});

test("leonardo provider is registered", async () => {
  const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
  assert.ok(APIKEY_PROVIDERS.leonardo, "leonardo should be in APIKEY_PROVIDERS");
  assert.equal(APIKEY_PROVIDERS.leonardo.id, "leonardo");
});

test("ideogram provider is registered", async () => {
  const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
  assert.ok(APIKEY_PROVIDERS.ideogram, "ideogram should be in APIKEY_PROVIDERS");
  assert.equal(APIKEY_PROVIDERS.ideogram.id, "ideogram");
});

test("suno provider is registered", async () => {
  const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
  assert.ok(APIKEY_PROVIDERS.suno, "suno should be in APIKEY_PROVIDERS");
  assert.equal(APIKEY_PROVIDERS.suno.id, "suno");
});

test("udio provider is registered", async () => {
  const { APIKEY_PROVIDERS } = await import("../../src/shared/constants/providers.ts");
  assert.ok(APIKEY_PROVIDERS.udio, "udio should be in APIKEY_PROVIDERS");
  assert.equal(APIKEY_PROVIDERS.udio.id, "udio");
});

// ─── VIDEO_PROVIDER_IDS ─────────────────────────────────────────────────────

test("VIDEO_PROVIDER_IDS includes haiper and leonardo", async () => {
  const { VIDEO_PROVIDER_IDS } = await import("../../src/shared/constants/providers.ts");
  assert.ok(VIDEO_PROVIDER_IDS.has("haiper"), "haiper should be in VIDEO_PROVIDER_IDS");
  assert.ok(VIDEO_PROVIDER_IDS.has("leonardo"), "leonardo should be in VIDEO_PROVIDER_IDS");
});

// ─── Video Registry ─────────────────────────────────────────────────────────

test("haiper video provider is in video registry", async () => {
  const { VIDEO_PROVIDERS } = await import("../../open-sse/config/videoRegistry.ts");
  assert.ok(VIDEO_PROVIDERS.haiper, "haiper should be in VIDEO_PROVIDERS");
  assert.equal(VIDEO_PROVIDERS.haiper.format, "haiper-video");
  assert.ok(VIDEO_PROVIDERS.haiper.models.length > 0);
});

test("leonardo video provider is in video registry", async () => {
  const { VIDEO_PROVIDERS } = await import("../../open-sse/config/videoRegistry.ts");
  assert.ok(VIDEO_PROVIDERS.leonardo, "leonardo should be in VIDEO_PROVIDERS");
  assert.equal(VIDEO_PROVIDERS.leonardo.format, "leonardo-video");
});

// ─── Image Registry ─────────────────────────────────────────────────────────

test("haiper image provider is in image registry", async () => {
  const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistry.ts");
  assert.ok(IMAGE_PROVIDERS.haiper, "haiper should be in IMAGE_PROVIDERS");
  assert.equal(IMAGE_PROVIDERS.haiper.format, "haiper-image");
});

test("leonardo image provider is in image registry", async () => {
  const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistry.ts");
  assert.ok(IMAGE_PROVIDERS.leonardo, "leonardo should be in IMAGE_PROVIDERS");
  assert.equal(IMAGE_PROVIDERS.leonardo.format, "leonardo-image");
});

test("ideogram image provider is in image registry", async () => {
  const { IMAGE_PROVIDERS } = await import("../../open-sse/config/imageRegistry.ts");
  assert.ok(IMAGE_PROVIDERS.ideogram, "ideogram should be in IMAGE_PROVIDERS");
  assert.equal(IMAGE_PROVIDERS.ideogram.format, "ideogram-image");
});

// ─── Music Registry ─────────────────────────────────────────────────────────

test("suno music provider is in music registry", async () => {
  const { MUSIC_PROVIDERS } = await import("../../open-sse/config/musicRegistry.ts");
  assert.ok(MUSIC_PROVIDERS.suno, "suno should be in MUSIC_PROVIDERS");
  assert.equal(MUSIC_PROVIDERS.suno.format, "suno-music");
});

test("udio music provider is in music registry", async () => {
  const { MUSIC_PROVIDERS } = await import("../../open-sse/config/musicRegistry.ts");
  assert.ok(MUSIC_PROVIDERS.udio, "udio should be in MUSIC_PROVIDERS");
  assert.equal(MUSIC_PROVIDERS.udio.format, "udio-music");
});

// ─── Handler Functions Exist ─────────────────────────────────────────────────

test("videoGeneration handler has haiper-video dispatch", async () => {
  const mod = await import("../../open-sse/handlers/videoGeneration.ts");
  assert.equal(typeof mod.handleVideoGeneration, "function");
});

test("imageGeneration handler has ideogram-image dispatch", async () => {
  const mod = await import("../../open-sse/handlers/imageGeneration.ts");
  assert.equal(typeof mod.handleImageGeneration, "function");
});

test("musicGeneration handler has suno-music dispatch", async () => {
  const mod = await import("../../open-sse/handlers/musicGeneration.ts");
  assert.equal(typeof mod.handleMusicGeneration, "function");
});
