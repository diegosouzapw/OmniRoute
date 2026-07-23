// AdobeFireflyExecutor — chat-completions guard for the adobe-firefly
// web-cookie media provider.
//
// Adobe Firefly is image/video generation only (Firefly 3P async APIs). There
// is no chat/completions surface. Real work lives in:
//   open-sse/handlers/imageGeneration/providers/adobeFirefly.ts
//   open-sse/handlers/videoGeneration/adobeFireflyHandler.ts
//
// Without this executor, getExecutor("adobe-firefly") would fall through to
// DefaultExecutor and mis-route the user's IMS token / cookie to api.openai.com.

import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult } from "../utils/error.ts";

const ADOBE_FIREFLY_BASE_URL = "https://firefly-3p.ff.adobe.io/v2/3p-images/generate-async";

export class AdobeFireflyExecutor extends BaseExecutor {
  constructor() {
    super("adobe-firefly", { id: "adobe-firefly", baseUrl: ADOBE_FIREFLY_BASE_URL });
  }

  async execute(_input: ExecuteInput) {
    return makeExecutorErrorResult(
      400,
      "adobe-firefly is a media-generation provider and does not support chat completions. " +
        "Use POST /v1/images/generations (e.g. model \"adobe-firefly/nano-banana-pro\") " +
        "or POST /v1/videos/generations (e.g. model \"adobe-firefly/sora-2\").",
      _input.body,
      ADOBE_FIREFLY_BASE_URL
    );
  }
}

export default AdobeFireflyExecutor;
