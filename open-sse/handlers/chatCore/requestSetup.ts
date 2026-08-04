/**
 * chatCore request-setup resolvers (Quality Gate v2 / Fase 9 — chatCore god-file decomposition).
 *
 * The first pure slice of handleChatCore's request-setup phase: the per-request model-routing
 * metadata resolved at the very top of the handler. Side-effect-free; future increments grow this
 * into the full ChatCoreContext carrier (setup / dispatch / streaming phases).
 */

export type ChatCoreRequestSetup = {
  /**
   * Optional custom-model wire-format marker injected by getModelInfo for providers whose models
   * can route to /chat/completions or /responses (Azure AI Foundry, OCI generic OpenAI). Not on
   * the base ModelInfo shape, so read via structural narrowing (never `as any`).
   */
  apiFormat: string | undefined;
  /**
   * #2905: per-model wire-format override for custom models, injected by getModelInfo. Custom
   * models aren't in the static registry, so getModelTargetFormat() can't see this — used before
   * the provider default.
   */
  customModelTargetFormat: string | undefined;
  /** The client-requested model string, falling back to the resolved model id when absent/blank. */
  requestedModel: string;
};

/**
 * Resolve the per-request model-routing metadata at the top of handleChatCore. Pure: a function of
 * the injected modelInfo, the request body, and the resolved model id. Behaviour is byte-identical
 * to the previous inline code.
 */
export function resolveChatCoreRequestSetup(
  modelInfo: unknown,
  body: { model?: unknown } | null | undefined,
  model: string
): ChatCoreRequestSetup {
  const apiFormat: string | undefined =
    modelInfo && typeof modelInfo === "object" && "apiFormat" in modelInfo
      ? typeof (modelInfo as { apiFormat?: unknown }).apiFormat === "string"
        ? ((modelInfo as { apiFormat?: string }).apiFormat as string)
        : undefined
      : undefined;
  const customModelTargetFormat: string | undefined =
    modelInfo && typeof modelInfo === "object" && "targetFormat" in modelInfo
      ? typeof (modelInfo as { targetFormat?: unknown }).targetFormat === "string"
        ? ((modelInfo as { targetFormat?: string }).targetFormat as string)
        : undefined
      : undefined;
  const requestedModel =
    typeof body?.model === "string" && body.model.trim().length > 0 ? body.model : model;
  return { apiFormat, customModelTargetFormat, requestedModel };
}
