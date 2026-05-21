import test from "node:test";
import assert from "node:assert/strict";

const { detectIntent } = await import("../../open-sse/executors/veoaifree-web.ts");

// ─── detectIntent: model-based ──────────────────────────────────────────────

test("detectIntent returns 'video' for veo models", () => {
  assert.equal(detectIntent("veo-3.1"), "video");
  assert.equal(detectIntent("veo-3.0"), "video");
  assert.equal(detectIntent("seedance"), "video");
  assert.equal(detectIntent("VEO-3.1"), "video");
});

test("detectIntent returns 'image' for image models", () => {
  assert.equal(detectIntent("image-gen"), "image");
  assert.equal(detectIntent("banana"), "image");
  assert.equal(detectIntent("imagen-4"), "image");
  assert.equal(detectIntent("nano-banana"), "image");
});

test("detectIntent returns 'tts' for audio models", () => {
  assert.equal(detectIntent("tts"), "tts");
  assert.equal(detectIntent("speech"), "tts");
  assert.equal(detectIntent("audio-gen"), "tts");
});

test("detectIntent returns 'enhance' for prompt models", () => {
  assert.equal(detectIntent("enhance"), "enhance");
  assert.equal(detectIntent("prompt-helper"), "enhance");
});

// ─── detectIntent: prompt-based ─────────────────────────────────────────────

test("detectIntent returns 'image' for image prompts", () => {
  assert.equal(detectIntent(undefined, "generate image of a cat"), "image");
  assert.equal(detectIntent(undefined, "create image of sunset"), "image");
  assert.equal(detectIntent(undefined, "draw a horse"), "image");
});

test("detectIntent returns 'enhance' for enhance prompts", () => {
  assert.equal(detectIntent(undefined, "enhance my prompt"), "enhance");
  assert.equal(detectIntent(undefined, "improve prompt for video"), "enhance");
});

test("detectIntent defaults to 'video' for generic prompts", () => {
  assert.equal(detectIntent(undefined, "a cat walking on the moon"), "video");
  assert.equal(detectIntent(undefined, ""), "video");
  assert.equal(detectIntent(undefined, undefined), "video");
});

// ─── detectIntent: case insensitive ─────────────────────────────────────────

test("detectIntent is case-insensitive for model names", () => {
  assert.equal(detectIntent("VEO-3.1"), "video");
  assert.equal(detectIntent("TTS"), "tts");
  assert.equal(detectIntent("Image-Gen"), "image");
  assert.equal(detectIntent("ENHANCE"), "enhance");
});

// ─── detectIntent: model takes precedence over prompt ───────────────────────

test("detectIntent model takes precedence over prompt", () => {
  assert.equal(detectIntent("tts", "generate video of cat"), "tts");
  assert.equal(detectIntent("veo-3.1", "create image"), "video");
});

// ─── Integration: executor class exists ─────────────────────────────────────

test("VeoAIFreeWebExecutor class can be imported", async () => {
  const { VeoAIFreeWebExecutor } = await import("../../open-sse/executors/veoaifree-web.ts");
  const executor = new VeoAIFreeWebExecutor();
  assert.ok(executor);
  assert.equal(typeof executor.execute, "function");
});
