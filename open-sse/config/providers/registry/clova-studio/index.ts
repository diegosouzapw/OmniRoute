import type { RegistryEntry } from "../../shared.ts";

/**
 * Naver CLOVA Studio — Chat Completions **v3** (native API).
 *
 * Previously this entry pointed at Naver's OpenAI-compatibility shim
 * (`/v1/openai/chat/completions`), which meant `format: "openai"` and a
 * pass-through `DefaultExecutor`. The v3 API is Naver's own wire format, so the
 * entry now uses `format: "clova"` and the translator pair
 * (`openai-to-clova` / `clova-to-openai`).
 *
 * v3 moves the model into the URL path (`/v3/chat-completions/{modelName}`), uses
 * camelCase sampling params, and returns a `{status, result}` envelope instead of
 * an OpenAI `choices[]` body — see the translators for the exact mapping.
 *
 * All three v3 models are live-verified against the real API (2026-09-01):
 *
 * | Model         | Surface  | Notes                                                    |
 * | ------------- | -------- | -------------------------------------------------------- |
 * | HCX-007       | thinking | rejects `maxTokens` (use `maxCompletionTokens`); no vision |
 * | HCX-005       | text+img | vision via public URL **or** inline base64 data URI        |
 * | HCX-DASH-002  | text     | lightweight, text only                                    |
 *
 * Docs: https://api.ncloud-docs.com/docs/clovastudio-chatcompletionsv3
 *       https://api.ncloud-docs.com/docs/clovastudio-chatcompletionsv3-thinking
 */
export const clova_studioProvider: RegistryEntry = {
  id: "clova-studio",
  alias: "clova",
  format: "clova",
  executor: "clova-studio",
  baseUrl: "https://clovastudio.stream.ntruss.com/v3/chat-completions",
  authType: "apikey",
  authHeader: "bearer",
  /**
   * The v3 API does answer non-streaming requests (`Accept: application/json`),
   * but only the streaming surface is expressed in the translator: CLOVA's SSE
   * frames carry incremental `token` events plus a terminal `result` event that
   * repeats the full text. Forcing the upstream stream lets OmniRoute consume
   * that single, well-tested path and accumulate it into a JSON body for
   * non-streaming clients, instead of maintaining a second parser for the
   * `{status, result}` envelope.
   */
  forceStream: true,
  models: [
    {
      // Reasoning flagship. Input+output ≤ 128000 tokens; the output cap counts
      // thinking tokens too, so `maxCompletionTokens` may be up to 32768.
      id: "HCX-007",
      name: "HCX-007",
      contextLength: 128000,
      maxOutputTokens: 32768,
      supportsReasoning: true,
    },
    {
      // HyperCLOVA X vision model. Input+output ≤ 128000 tokens, output ≤ 4096,
      // up to 5 images per request (1 per turn). Accepts a public URL or an
      // inline base64 data URI — the data URI must keep its
      // `data:<mime>;base64,` prefix inside `dataUri.data` or the request is
      // rejected with `40001 Invalid parameter`.
      id: "HCX-005",
      name: "HCX-005",
      contextLength: 128000,
      maxOutputTokens: 4096,
      supportsVision: true,
    },
    {
      // Lightweight model. Input+output ≤ 32000 tokens, output ≤ 4096, text only.
      id: "HCX-DASH-002",
      name: "HCX-DASH-002",
      contextLength: 32000,
      maxOutputTokens: 4096,
    },
  ],
};
