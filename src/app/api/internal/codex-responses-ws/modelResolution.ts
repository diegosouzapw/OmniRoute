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
