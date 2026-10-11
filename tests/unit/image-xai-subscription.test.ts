import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { buildXaiImageRequest } from "../../open-sse/handlers/imageGeneration/providers/xaiImage.ts";
import {
  getAllImageModels,
  getImageProvider,
  parseImageModel,
} from "../../open-sse/config/imageRegistry.ts";

process.env.DATA_DIR ??= mkdtempSync(join(tmpdir(), "omniroute-xai-images-"));
process.env.GROK_SUBSCRIPTION_IMAGES_ENABLED = "true";

const model = "grok-imagine-image-2.0";
const prompt = "A chef preparing pho";

test("xAI image catalog supports API keys and both OAuth connection identities", () => {
  for (const [prefix, provider] of [
    ["xai", "xai"],
    ["gc", "grok-cli"],
    ["xao", "xai-oauth"],
  ]) {
    assert.deepEqual(parseImageModel(`${prefix}/${model}`), { provider, model });
    assert.equal(getImageProvider(prefix)?.baseUrl, "https://api.x.ai/v1/images/generations");
    assert.equal(getImageProvider(prefix)?.authType, provider === "xai" ? "apikey" : "oauth");
    assert.ok(getAllImageModels().some((entry) => entry.id === `${provider}/${model}`));
  }
  assert.deepEqual(parseImageModel(model), { provider: "xai", model });
});

test("xAI preserves native options and strips unsupported OpenAI style", () => {
  assert.deepEqual(
    buildXaiImageRequest(model, {
      prompt,
      n: 2,
      aspect_ratio: "19.5:9",
      resolution: "2k",
      quality: "medium",
      response_format: "b64_json",
      style: "vivid",
      size: "1024x1024",
    }),
    {
      success: true,
      body: {
        model,
        prompt,
        n: 2,
        aspect_ratio: "19.5:9",
        resolution: "2k",
        quality: "medium",
        response_format: "b64_json",
      },
    }
  );
  assert.deepEqual(buildXaiImageRequest(model, { prompt }), {
    success: true,
    body: { model, prompt },
  });
});

test("xAI maps OpenAI sizes and qualities without sending unsupported high quality", () => {
  for (const [size, ratio, resolution] of [
    ["1536x1024", "3:2", undefined],
    ["1024x1536", "2:3", undefined],
    ["1792x1024", "16:9", undefined],
    ["1024x1792", "9:16", undefined],
    ["2048x2048", "1:1", "2k"],
    ["auto", "auto", undefined],
    ["21:9", "21:9", undefined],
  ]) {
    const result = buildXaiImageRequest(model, { prompt, size });
    assert.ok(result.success);
    assert.equal(result.body.aspect_ratio, ratio);
    assert.equal(result.body.resolution, resolution);
    assert.equal(result.body.size, undefined);
  }
  for (const [quality, expected] of [
    ["high", "medium"],
    ["hd", "medium"],
    ["standard", "low"],
    ["auto", "auto"],
    ["low", "low"],
  ]) {
    const result = buildXaiImageRequest(model, { prompt, quality });
    assert.ok(result.success);
    assert.equal(result.body.quality, expected);
  }
  const explicit = buildXaiImageRequest(model, { prompt, size: "2048x2048", resolution: "1k" });
  assert.ok(explicit.success);
  assert.equal(explicit.body.resolution, "1k");
});

test("xAI rejects invalid options without leaking input into errors", () => {
  for (const options of [
    { n: 0 },
    { n: 11 },
    { n: 1.5 },
    { n: "2" },
    { prompt: "" },
    { size: "bad-secret" },
    { aspect_ratio: "bad-secret" },
    { resolution: "4k" },
    { quality: "ultra" },
    { response_format: "png" },
  ]) {
    const result = buildXaiImageRequest(model, { prompt, ...options });
    assert.equal(result.success, false);
    if ("error" in result) assert.doesNotMatch(result.error, /bad-secret|at \//);
  }
  assert.equal(
    buildXaiImageRequest("grok-imagine-image", { prompt, quality: "medium" }).success,
    false
  );
  assert.equal(buildXaiImageRequest("grok-imagine-image", { prompt }).success, true);
});
