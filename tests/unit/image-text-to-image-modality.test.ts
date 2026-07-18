/**
 * Two image-generation regressions:
 *
 *  1. Dual-modality text-to-image models (inputModalities === ["text","image"]) were
 *     rejected on /v1/images/generations with "Image input is required" because the
 *     gate treated any "image" modality as mandatory. 41 models (Together, Stability,
 *     LMArena, NVIDIA, BFL, NanoGPT) could not do pure text-to-image as a result.
 *
 *     Follow-up carve-out: 10 of those Stability AI models (inpaint, outpaint,
 *     search-and-replace, search-and-recolor, replace-background-and-relight,
 *     creative, sketch, structure, style, style-transfer) are Stability's dedicated
 *     /v2beta/stable-image/{edit,control,upscale}/* endpoints (STABILITY_EDIT_ENDPOINTS
 *     in open-sse/handlers/imageGeneration.ts) — they accept a text prompt too, but
 *     mechanically REQUIRE an input image. modalitiesRequireImageInput() alone can't
 *     distinguish them from the flexible dual-modality generation models (BFL Kontext,
 *     Together, NVIDIA, LMArena, NanoGPT), so the registry carries an explicit
 *     `imageRequired: true` flag on exactly those 10 entries, and the route gate
 *     (src/app/api/v1/images/generations/route.ts) combines both signals:
 *     `imageModelEntry?.imageRequired || modalitiesRequireImageInput(inputModalities)`.
 *
 *  2. The HuggingFace image provider pointed at the retired api-inference.huggingface.co
 *     host (DNS-dead → "fetch failed" 502). Text-to-image now routes through
 *     router.huggingface.co with the hf-inference provider pinned in the path.
 */
import test from "node:test";
import assert from "node:assert/strict";

import {
  IMAGE_PROVIDERS,
  getImageModelEntry,
  modalitiesRequireImageInput,
} from "../../open-sse/config/imageRegistry.ts";

// The 10 Stability AI edit/control/upscale endpoints that mechanically require an
// input image even though they also accept a text prompt — STABILITY_EDIT_ENDPOINTS
// in open-sse/handlers/imageGeneration.ts, minus the image-only entries (erase,
// remove-background, fast, conservative) which were never affected by this bug
// because their inputModalities never included "text" in the first place.
const STABILITY_IMAGE_REQUIRED_MODELS = [
  "inpaint",
  "outpaint",
  "search-and-replace",
  "search-and-recolor",
  "replace-background-and-relight",
  "creative",
  "sketch",
  "structure",
  "style",
  "style-transfer",
];

// Mirrors the combined gate in src/app/api/v1/images/generations/route.ts.
function effectiveRequiresImageInput(entry, inputModalities) {
  return Boolean(entry?.imageRequired) || modalitiesRequireImageInput(inputModalities);
}

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

test("dual-modality (text+image) registry models allow pure text-to-image, EXCEPT the Stability edit/control/upscale set flagged imageRequired", () => {
  const wronglyBlocked = [];
  const wronglyAllowed = [];
  for (const [providerId, config] of Object.entries(IMAGE_PROVIDERS)) {
    for (const model of config.models || []) {
      const im = model.inputModalities || ["text"];
      if (!im.includes("text") || !im.includes("image")) continue;
      const effective = effectiveRequiresImageInput(model, im);
      if (model.imageRequired) {
        if (!effective) wronglyAllowed.push(`${providerId}/${model.id}`);
      } else if (effective) {
        wronglyBlocked.push(`${providerId}/${model.id}`);
      }
    }
  }
  assert.deepEqual(
    wronglyBlocked,
    [],
    "dual text+image models without imageRequired must allow pure text-to-image"
  );
  assert.deepEqual(
    wronglyAllowed,
    [],
    "dual text+image models flagged imageRequired must still gate on image input"
  );
});

test("stability-ai edit/control/upscale models still REQUIRE an image despite accepting a text prompt", () => {
  for (const modelId of STABILITY_IMAGE_REQUIRED_MODELS) {
    const entry = getImageModelEntry(`stability-ai/${modelId}`);
    assert.ok(entry, `stability-ai/${modelId} must resolve to a registry entry`);
    assert.equal(
      entry.imageRequired,
      true,
      `stability-ai/${modelId} must be flagged imageRequired`
    );
    assert.equal(
      effectiveRequiresImageInput(entry, entry.inputModalities),
      true,
      `stability-ai/${modelId} must still gate on image input (mechanically requires one upstream)`
    );
  }
});

test("true dual-modality generation models (BFL Kontext, NVIDIA, NanoGPT) accept text-only", () => {
  const dualModalitySamples = [
    "black-forest-labs/flux-kontext-pro",
    "nvidia/black-forest-labs/flux.1-dev",
    "nanogpt/qwen-image",
  ];
  for (const modelStr of dualModalitySamples) {
    const entry = getImageModelEntry(modelStr);
    assert.ok(entry, `${modelStr} must resolve to a registry entry`);
    assert.ok(!entry.imageRequired, `${modelStr} must not be flagged imageRequired`);
    assert.equal(
      effectiveRequiresImageInput(entry, entry.inputModalities),
      false,
      `${modelStr} must accept pure text-to-image`
    );
  }
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
