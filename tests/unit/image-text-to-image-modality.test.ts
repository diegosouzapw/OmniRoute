/**
 * Two image-generation regressions:
 *
 *  1. Dual-modality text-to-image models (inputModalities === ["text","image"]) were
 *     rejected on /v1/images/generations with "Image input is required" because the
 *     gate treated any "image" modality as mandatory. 41 models (Together, Stability,
 *     LMArena, NVIDIA, BFL, NanoGPT) could not do pure text-to-image as a result.
 *
 *  2. The HuggingFace image provider pointed at the retired api-inference.huggingface.co
 *     host (DNS-dead → "fetch failed" 502). Text-to-image now routes through
 *     router.huggingface.co with the hf-inference provider pinned in the path.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  IMAGE_PROVIDERS,
  modalitiesRequireImageInput,
} from "../../open-sse/config/imageRegistry.ts";

test("modalitiesRequireImageInput: only edit-only models require an image input", () => {
  // Edit-only → image is mandatory.
  assert.equal(modalitiesRequireImageInput(["image"]), true);
  // Dual text-to-image + image-to-image → image optional (the bug: these were blocked).
  assert.equal(modalitiesRequireImageInput(["text", "image"]), false);
  // Text-only → never requires an image.
  assert.equal(modalitiesRequireImageInput(["text"]), false);
  // Defensive: undefined/non-array defaults to text-only behavior.
  assert.equal(modalitiesRequireImageInput(undefined), false);
  assert.equal(modalitiesRequireImageInput(null), false);
});

test("no dual-modality (text+image) registry model is gated as image-required", () => {
  const blocked = [];
  for (const [providerId, config] of Object.entries(IMAGE_PROVIDERS)) {
    for (const model of config.models || []) {
      const im = model.inputModalities || ["text"];
      if (im.includes("text") && im.includes("image") && modalitiesRequireImageInput(im)) {
        blocked.push(`${providerId}/${model.id}`);
      }
    }
  }
  assert.deepEqual(blocked, [], "dual text+image models must allow pure text-to-image");
});

test("HuggingFace image provider uses the live router host, not the retired api-inference host", () => {
  const hf = IMAGE_PROVIDERS.huggingface;
  assert.ok(hf, "huggingface image provider must exist");
  assert.equal(hf.baseUrl, "https://router.huggingface.co/hf-inference/models");
  assert.ok(
    !hf.baseUrl.includes("api-inference.huggingface.co"),
    "must not use the DNS-dead api-inference.huggingface.co host"
  );
  // The handler builds `${baseUrl}/${model}` — assert the resulting URL is the router form.
  const model = hf.models[0].id;
  assert.equal(
    `${hf.baseUrl}/${model}`,
    `https://router.huggingface.co/hf-inference/models/${model}`
  );
});
