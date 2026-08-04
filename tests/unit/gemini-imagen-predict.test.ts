/**
 * Google AI Studio (Gemini API) Imagen support on /v1/images/generations.
 *
 * Imagen uses the dedicated ":predict" endpoint (instances/parameters body,
 * base64 predictions), NOT generateContent. Before this, `gemini/imagen-4.0-*`
 * was advertised in /v1/models but unroutable — the image route rejected it with
 * "Invalid image model" because `gemini` was not in the image registry.
 *
 * These cover the pure request-builder / response-parser and the registry wiring.
 * The live Google call is not exercised (Imagen needs a billing-enabled key).
 */
import test from "node:test";
import assert from "node:assert/strict";

import { IMAGE_PROVIDERS, parseImageModel } from "../../open-sse/config/imageRegistry.ts";
import {
  buildImagenPredictBody,
  parseImagenPredictResponse,
  isImagenModel,
} from "../../open-sse/handlers/imageGeneration/providers/googleImagen.ts";

test("gemini image provider is registered for the Imagen family via google-imagen format", () => {
  const gemini = IMAGE_PROVIDERS.gemini;
  assert.ok(gemini, "gemini image provider must exist");
  assert.equal(gemini.format, "google-imagen");
  assert.equal(gemini.authHeader, "x-goog-api-key");
  assert.equal(gemini.baseUrl, "https://generativelanguage.googleapis.com/v1beta/models");
  assert.deepEqual(
    gemini.models.map((m) => m.id),
    ["imagen-4.0-generate-001", "imagen-4.0-ultra-generate-001", "imagen-4.0-fast-generate-001"]
  );
});

test("parseImageModel resolves gemini/imagen-4.0-* to the gemini provider", () => {
  assert.deepEqual(parseImageModel("gemini/imagen-4.0-generate-001"), {
    provider: "gemini",
    model: "imagen-4.0-generate-001",
  });
});

test("isImagenModel gates only the Imagen family (flash-image belongs on the chat route)", () => {
  assert.equal(isImagenModel("imagen-4.0-generate-001"), true);
  assert.equal(isImagenModel("imagen-4.0-ultra-generate-001"), true);
  assert.equal(isImagenModel("gemini-2.5-flash-image"), false);
  assert.equal(isImagenModel("nano-banana-pro"), false);
  assert.equal(isImagenModel(""), false);
  assert.equal(isImagenModel(undefined), false);
});

test("buildImagenPredictBody produces the :predict instances/parameters shape", () => {
  const body = buildImagenPredictBody({ prompt: "a red apple", n: 2, size: "1792x1024" });
  assert.deepEqual(body, {
    instances: [{ prompt: "a red apple" }],
    parameters: { sampleCount: 2, aspectRatio: "16:9" },
  });
});

test("buildImagenPredictBody clamps sampleCount to [1,4] and defaults aspectRatio to 1:1", () => {
  assert.equal(buildImagenPredictBody({ prompt: "x" }).parameters.sampleCount, 1);
  assert.equal(buildImagenPredictBody({ prompt: "x", n: 0 }).parameters.sampleCount, 1);
  assert.equal(buildImagenPredictBody({ prompt: "x", n: 99 }).parameters.sampleCount, 4);
  assert.equal(buildImagenPredictBody({ prompt: "x" }).parameters.aspectRatio, "1:1");
  // Native aspect ratio passes through.
  assert.equal(buildImagenPredictBody({ prompt: "x", aspect_ratio: "9:16" }).parameters.aspectRatio, "9:16");
});

test("parseImagenPredictResponse normalizes predictions[].bytesBase64Encoded to OpenAI shape", () => {
  const out = parseImagenPredictResponse(
    {
      predictions: [
        { bytesBase64Encoded: "AAAA", mimeType: "image/png" },
        { bytesBase64Encoded: "BBBB", mimeType: "image/png" },
      ],
    },
    "a red apple"
  );
  assert.equal(out.data.length, 2);
  assert.deepEqual(out.data[0], { b64_json: "AAAA", revised_prompt: "a red apple" });
  assert.equal(typeof out.created, "number");
});

test("parseImagenPredictResponse tolerates empty/absent predictions", () => {
  assert.deepEqual(parseImagenPredictResponse({}, "x").data, []);
  assert.deepEqual(parseImagenPredictResponse({ predictions: [] }, "x").data, []);
  assert.deepEqual(parseImagenPredictResponse({ predictions: [{}] }, "x").data, []);
});
