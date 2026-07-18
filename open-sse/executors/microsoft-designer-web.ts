// MicrosoftDesignerWebExecutor — chat-completions guard for the
// microsoft-designer-web web-cookie provider (#6672).
//
// Microsoft Designer (designerapp.officeapps.live.com/DallE.ashx) is an
// image-generation-only upstream: it has no chat/completions surface at all.
// The real request/response flow lives entirely in the image-generation
// handler (open-sse/handlers/imageGeneration/providers/designerWeb.ts),
// dispatched from open-sse/handlers/imageGeneration.ts by
// providerConfig.format === "designer-web" — NOT through getExecutor().
//
// microsoft-designer-web is still listed in WEB_COOKIE_PROVIDERS (it uses
// the same unofficial, DevTools-sourced bearer-token credential UX and
// subscription-risk notice as the other web-cookie providers — see
// tests/unit/microsoft-designer-web-6672.test.ts). Without a registered
// executor here, getExecutor("microsoft-designer-web") silently falls
// through to DefaultExecutor's `PROVIDERS[provider] || PROVIDERS.openai`
// fallback (open-sse/executors/index.ts:176 comment, #6699) — which would
// send the user's real Designer bearer token to api.openai.com, mislabeled
// as an OpenAI request, if anything ever mis-routes a chat/completions call
// to this provider.
//
// This executor closes that gap cheaply: it never calls the network. Any
// chat/completions attempt against microsoft-designer-web is rejected
// immediately with a clean, sanitized 400 telling the caller to use
// /v1/images/generations instead — satisfying the executor wrapper
// contract (tests/unit/executor-web-cookie-sweep.test.ts) without ever
// forwarding credentials anywhere.
import { BaseExecutor, type ExecuteInput } from "./base.ts";
import { makeExecutorErrorResult } from "../utils/error.ts";

const DESIGNER_WEB_BASE_URL =
  "https://designerapp.officeapps.live.com/designerapp/DallE.ashx?action=GetDallEImagesCogSci";

export class MicrosoftDesignerWebExecutor extends BaseExecutor {
  constructor() {
    super("microsoft-designer-web", { id: "microsoft-designer-web", baseUrl: DESIGNER_WEB_BASE_URL });
  }

  async execute(_input: ExecuteInput) {
    return makeExecutorErrorResult(
      400,
      "microsoft-designer-web is an image-generation-only provider and does not support " +
        "chat completions. Use POST /v1/images/generations with model " +
        '"microsoft-designer-web/dall-e-3" instead.',
      _input.body,
      DESIGNER_WEB_BASE_URL
    );
  }
}

export default MicrosoftDesignerWebExecutor;
