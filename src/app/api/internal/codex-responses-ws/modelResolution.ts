/**
 * Model resolution for the Codex Responses-over-WebSocket bridge.
 *
 * The bridge is codex-only, but the OpenAI Codex CLI rejects provider-prefixed
 * model ids (e.g. "codex/gpt-5.5") client-side when `supports_websockets` is
 * enabled — it only accepts bare ChatGPT model ids (e.g. "gpt-5.5"). Those bare
 * ids can resolve to a different default provider (openai / openrouter) under
 * OmniRoute's global model routing, which the bridge would then reject with
 * `codex_ws_provider_required` (or fail the credentials lookup).
 *
 * Since this endpoint only ever talks to the Codex upstream, re-resolve a bare
 * id under the `codex/` prefix so it is treated as codex. Provider-prefixed ids
 * (already containing a "/") are left untouched.
 *
 * See docs/reference/API_REFERENCE.md → "Responses over WebSocket (Codex)".
 */

export interface ResolvedModelInfo {
  provider?: string;
  model?: string;
  [key: string]: unknown;
}

export type ModelResolver = (modelStr: string) => Promise<ResolvedModelInfo>;

/**
 * Resolve a Responses-WebSocket model id, preferring the codex provider.
 *
 * @param requestedModel the bare/prefixed model id sent by the client
 * @param resolve a `getModelInfo`-style resolver
 * @returns the codex-preferred resolution, or the original resolution if the
 *          model genuinely does not map to codex.
 */
export async function resolveCodexWsModelInfo(
  requestedModel: string,
  resolve: ModelResolver
): Promise<ResolvedModelInfo> {
  const info = await resolve(requestedModel);

  // Already codex, or explicitly provider-prefixed → respect it.
  if (info?.provider === "codex" || requestedModel.includes("/")) {
    return info;
  }

  // Bare id resolved to a non-codex provider; retry as a codex model.
  const codexInfo = await resolve(`codex/${requestedModel}`);
  return codexInfo?.provider === "codex" ? codexInfo : info;
}

/**
 * Resolve a model ID for the HTTP Responses path, applying codex preference
 * for bare ChatGPT-style model IDs (those without a provider prefix).
 *
 * When the Codex CLI falls back from WebSocket to HTTP (#15492), it sends bare
 * model IDs like "gpt-5.5" to /v1/responses. Without this resolution, OmniRoute
 * routes them to openrouter/openai instead of the configured codex OAuth
 * connections, producing "No credentials for provider: openrouter".
 *
 * @param requestedModel the model id from the Responses API request body
 * @param resolve a getModelInfo-style resolver
 * @param isCombo optional predicate — when the bare id is a combo name, skip the codex
 *        rewrite so downstream combo routing resolves it (#3227/#3233).
 * @returns { model, changed } — model is the (possibly rewritten) id;
 *          changed=true means a codex/ prefix was applied.
 */
export async function resolveResponsesApiModel(
  requestedModel: string,
  resolve: ModelResolver,
  isCombo?: (name: string) => Promise<boolean> | boolean
): Promise<{ model: string; changed: boolean }> {
  if (!requestedModel || requestedModel.includes("/")) {
    return { model: requestedModel, changed: false };
  }

  // #3227/#3233: a bare combo name (e.g. "n8n-text", "paid-premium") must NOT be
  // force-prefixed to codex/ — Codex accepts arbitrary model strings, so the rewrite
  // would shadow the combo and route to codex. Let downstream combo routing handle it.
  if (isCombo) {
    try {
      if (await isCombo(requestedModel)) return { model: requestedModel, changed: false };
    } catch {
      // combo lookup unavailable — fall through to normal codex-preference resolution
    }
  }

  try {
    const resolved = await resolveCodexWsModelInfo(requestedModel, resolve);
    if (resolved?.provider !== "codex") {
      return { model: requestedModel, changed: false };
    }

    const prefixed = `codex/${resolved.model || requestedModel}`;
    return { model: prefixed, changed: true };
  } catch {
    return { model: requestedModel, changed: false };
  }
}
