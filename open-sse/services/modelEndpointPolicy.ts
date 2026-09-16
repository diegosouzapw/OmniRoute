/**
 * Provider model endpoint policy.
 *
 * Upstream `/models` responses often omit endpoint/modality metadata. In that
 * case, specialty models can otherwise be imported as chat models simply
 * because "chat" is OmniRoute's historical default. Keep the exceptional
 * provider knowledge here so discovery, import, and catalog projection agree.
 */

export type ModelEndpointKind = "chat" | "image" | "video" | "non-chat" | "unknown";

export type ModelEndpointDecision = {
  kind: ModelEndpointKind;
  chatSelectable: boolean;
  reason: "explicit-endpoints" | "provider-policy" | "unclassified";
};

type EndpointAwareModel = {
  id: string;
  supportedEndpoints?: readonly string[];
};

const CHAT_ENDPOINTS = new Set([
  "chat",
  "chat-completions",
  "chat/completions",
  "messages",
  "responses",
]);
const IMAGE_ENDPOINTS = new Set(["image", "images", "images/generations"]);
const VIDEO_ENDPOINTS = new Set(["video", "videos", "videos/generations"]);

function normalizeEndpoint(endpoint: string): string {
  return endpoint.trim().toLowerCase().replace(/^\/+/, "").replace(/^v1\//, "");
}

function classifyExplicitEndpoints(
  supportedEndpoints: readonly string[] | undefined
): ModelEndpointDecision | null {
  if (!supportedEndpoints?.length) return null;

  const endpoints = supportedEndpoints.map(normalizeEndpoint).filter(Boolean);
  if (endpoints.some((endpoint) => CHAT_ENDPOINTS.has(endpoint))) {
    return { kind: "chat", chatSelectable: true, reason: "explicit-endpoints" };
  }
  if (endpoints.some((endpoint) => IMAGE_ENDPOINTS.has(endpoint))) {
    return { kind: "image", chatSelectable: false, reason: "explicit-endpoints" };
  }
  if (endpoints.some((endpoint) => VIDEO_ENDPOINTS.has(endpoint))) {
    return { kind: "video", chatSelectable: false, reason: "explicit-endpoints" };
  }
  return { kind: "non-chat", chatSelectable: false, reason: "explicit-endpoints" };
}

function normalizeOpenAiModelId(modelId: string): string {
  return modelId.startsWith("openai/") ? modelId.slice("openai/".length) : modelId;
}

function classifyOpenAiModel(modelId: string): ModelEndpointDecision | null {
  const normalized = normalizeOpenAiModelId(modelId).toLowerCase();
  if (
    normalized.startsWith("gpt-image-") ||
    normalized.startsWith("dall-e-") ||
    normalized === "chatgpt-image-latest"
  ) {
    return { kind: "image", chatSelectable: false, reason: "provider-policy" };
  }
  if (normalized.startsWith("sora-")) {
    return { kind: "video", chatSelectable: false, reason: "provider-policy" };
  }
  return null;
}

/**
 * OpenRouter appends a variant suffix to a base model id: `:free`, `:nitro`,
 * `:floor`, `:online`, `:extended`, `:thinking`. Almost all of them are routing
 * hints on the same chat model and stay chat-selectable. `:batch` is the
 * exception -- it names the Batch-API-only variant, and a chat completion
 * against it is rejected upstream with
 * `404 This model is only available through the Batch API. Use the
 * /api/beta/batches endpoint instead.` (issue #13596: 91 of those in 41 hours,
 * plus the `model not found - locking mode` failover churn behind them).
 *
 * OpenRouter's `/models` carries no endpoint metadata that separates the two,
 * so `classifyExplicitEndpoints` cannot decide it and the knowledge belongs
 * here with the rest of the exceptional provider policy. Deliberately an exact
 * suffix rather than "has a variant suffix": the other suffixes above are chat
 * models and excluding them would silently shrink the routable catalogue.
 */
const OPENROUTER_BATCH_SUFFIX = ":batch";

function classifyOpenRouterModel(modelId: string): ModelEndpointDecision | null {
  return modelId.trim().toLowerCase().endsWith(OPENROUTER_BATCH_SUFFIX)
    ? { kind: "non-chat", chatSelectable: false, reason: "provider-policy" }
    : null;
}

export function getModelEndpointDecision(
  provider: string | null | undefined,
  modelId: string,
  supportedEndpoints?: readonly string[]
): ModelEndpointDecision {
  const explicit = classifyExplicitEndpoints(supportedEndpoints);
  if (provider?.trim().toLowerCase() === "openrouter") {
    // Unconditional, unlike the OpenAI branch below: there is no "batch"
    // endpoint name an upstream could declare alongside a chat one, and the
    // rows already stored for these carry the synthetic `["chat"]` default --
    // letting that win would keep importing exactly the variants this excludes.
    const openRouterDecision = classifyOpenRouterModel(modelId);
    if (openRouterDecision) return openRouterDecision;
  }
  if (provider?.trim().toLowerCase() === "openai") {
    const openAiDecision = classifyOpenAiModel(modelId);
    if (openAiDecision) {
      // Old imported rows were persisted with `["chat"]` as a synthetic default
      // even when upstream `/models` supplied no endpoint metadata. Do not let
      // that default reclassify a known specialty model. A genuinely
      // multi-endpoint model can opt in by explicitly naming both its specialty
      // endpoint and a chat/Responses endpoint.
      const normalizedEndpoints = supportedEndpoints?.map(normalizeEndpoint) ?? [];
      const hasSpecialtyEndpoint =
        openAiDecision.kind === "image"
          ? normalizedEndpoints.some((endpoint) => IMAGE_ENDPOINTS.has(endpoint))
          : normalizedEndpoints.some((endpoint) => VIDEO_ENDPOINTS.has(endpoint));
      if (explicit?.chatSelectable && hasSpecialtyEndpoint) return explicit;
      return openAiDecision;
    }
  }

  if (explicit) return explicit;
  return { kind: "unknown", chatSelectable: true, reason: "unclassified" };
}

export function isChatSelectableModel(
  provider: string | null | undefined,
  model: EndpointAwareModel
): boolean {
  return getModelEndpointDecision(provider, model.id, model.supportedEndpoints).chatSelectable;
}

export function filterChatSelectableModels<T extends EndpointAwareModel>(
  provider: string | null | undefined,
  models: readonly T[]
): T[] {
  return models.filter((model) => isChatSelectableModel(provider, model));
}
