import { BaseExecutor, type ProviderCredentials } from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getModelTargetFormat, PROVIDER_ID_TO_ALIAS } from "../config/providerModels.ts";

/**
 * CheaperInferenceExecutor — api.cheaperinference.com.
 *
 * The gateway is OpenAI-compatible on both surfaces, so everything else comes from
 * BaseExecutor. Two provider-specific facts need handling (both measured against the
 * live API on 2026-07-31, not inferred from docs):
 *
 *  1. `/v1/responses` is STATELESS and REQUIRES `store:false`. Omitting it returns
 *     HTTP 400 ("This Responses-compatible endpoint is stateless. Send store=false…").
 *     chatCore.ts deletes `store` for every provider except "openai" — a strip shared
 *     by ~290 providers that must not be special-cased — so we re-add it here, after
 *     that strip has run. A client-supplied `store:true` is overwritten rather than
 *     forwarded: the endpoint cannot honour it, and forwarding would 400.
 *
 *  2. Chat and Responses live at DIFFERENT URLs (unlike providers that switch on a
 *     path suffix). The per-model `targetFormat` registry tag is the single source of
 *     truth for which surface a model uses — the same tag chatCore reads to translate
 *     the body — so resolving the URL from it keeps URL and payload in lockstep.
 *     Same pattern as executors/xai.ts (9router#2439).
 */
export class CheaperInferenceExecutor extends BaseExecutor {
  constructor(provider = "cheaperinference") {
    super(provider, PROVIDERS[provider]);
  }

  /**
   * True when this model is served by the native /v1/responses endpoint.
   *
   * PROVIDER_MODELS is keyed by provider ALIAS ("cinf"), while PROVIDERS is keyed by
   * provider ID ("cheaperinference") — so `this.provider` cannot be passed straight
   * through the way executors/xai.ts does (there the alias equals the id, which hides
   * the distinction). Resolve the alias first or every lookup silently returns null
   * and every Responses request 400s upstream.
   */
  private usesResponsesEndpoint(model: string): boolean {
    const alias = PROVIDER_ID_TO_ALIAS[this.provider] || this.provider;
    return getModelTargetFormat(alias, model) === "openai-responses";
  }

  buildUrl(model: string, _stream: boolean, _urlIndex = 0): string {
    if (this.usesResponsesEndpoint(model)) {
      return this.config.responsesBaseUrl || this.config.baseUrl;
    }
    return this.config.baseUrl;
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    credentials: ProviderCredentials
  ): unknown {
    const cleanedBody = super.transformRequest(model, body, stream, credentials);
    if (!cleanedBody || typeof cleanedBody !== "object" || Array.isArray(cleanedBody)) {
      return cleanedBody;
    }
    if (!this.usesResponsesEndpoint(model)) {
      // Chat Completions rejects unknown params — never add `store` on that surface.
      return cleanedBody;
    }
    return { ...(cleanedBody as Record<string, unknown>), store: false };
  }
}

export default CheaperInferenceExecutor;
