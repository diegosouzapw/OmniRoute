/**
 * #4072 — one shared vision-detection source.
 *
 * Three code paths kept independent vision-model lists and drifted apart, giving
 * the same model id up to three different verdicts:
 *   - `src/lib/modelCapabilities.ts` (`modelIdLikelyVision`) — routing fallback (#4071)
 *   - `src/app/api/v1/models/catalog.ts` (`isVisionModelId`) — /v1/models listing
 *   - `open-sse/services/compression/lite.ts` (`replaceImageUrls`) — lite image strip
 *
 * The two concrete bugs:
 *   - lite stripped images for real vision models it didn't know (pixtral, llava,
 *     qwen-vl, glm-4v, kimi-vl, mistral-medium-3) → blinded them;
 *   - catalog flagged text models as vision (`gemma`, bare `kimi` like `kimi-k2`).
 *
 * After unification all three delegate to `@/shared/constants/visionModels`.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";

import { isVisionModelId } from "../../src/shared/constants/visionModels.ts";
import { isVisionModelId as catalogIsVisionModelId } from "../../src/app/api/v1/models/catalog.ts";
import { modelIdLikelyVision } from "../../src/lib/modelCapabilities.ts";
import { replaceImageUrls } from "../../open-sse/services/compression/lite.ts";

const VISION = [
  "mistral/pixtral-12b-latest",
  "llava-1.5-7b",
  "qwen-vl-max",
  "gpt-4o",
  "claude-fable-5",
  "glm-4v",
  "kimi-vl-a3b",
  "mistral-medium-3",
];
const NOT_VISION = ["ministral-14b-latest", "mistral-large-latest", "gemma-2-9b", "kimi-k2"];

function imageBody() {
  return {
    messages: [
      {
        role: "user",
        content: [{ type: "image_url", image_url: { url: "data:image/png;base64,iVBOR" } }],
      },
    ],
  };
}

// `replaceImageUrls` strips the image (applied=true) only when the model is NOT a
// vision model. So `applied === !isVision`.
function liteStripsImage(modelId: string): boolean {
  return replaceImageUrls(imageBody(), modelId).applied;
}

describe("#4072 vision detection is consistent across all three sources", () => {
  for (const id of VISION) {
    it(`treats ${id} as vision everywhere`, () => {
      assert.equal(isVisionModelId(id), true, `shared isVisionModelId(${id})`);
      assert.equal(catalogIsVisionModelId(id), true, `catalog isVisionModelId(${id})`);
      assert.equal(modelIdLikelyVision(id), true, `modelCapabilities modelIdLikelyVision(${id})`);
      assert.equal(liteStripsImage(id), false, `lite must KEEP the image for ${id}`);
    });
  }

  for (const id of NOT_VISION) {
    it(`treats ${id} as non-vision everywhere`, () => {
      assert.equal(isVisionModelId(id), false, `shared isVisionModelId(${id})`);
      assert.equal(catalogIsVisionModelId(id), false, `catalog isVisionModelId(${id})`);
      assert.equal(modelIdLikelyVision(id), false, `modelCapabilities modelIdLikelyVision(${id})`);
      assert.equal(liteStripsImage(id), true, `lite must STRIP the image for ${id}`);
    });
  }

  it("preserves the MiniMax M3 #3328 carve-out and Gemini 3 multimodal", () => {
    for (const id of ["minimax-m3", "minimax-m3-free", "oc/minimax-m3-free", "gemini-3-pro"]) {
      assert.equal(isVisionModelId(id), true, `${id} should be vision`);
      assert.equal(liteStripsImage(id), false, `lite must keep the image for ${id}`);
    }
  });
});
