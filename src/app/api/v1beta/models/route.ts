import {
  PROVIDER_MODELS,
  PROVIDER_ID_TO_ALIAS,
  getProviderModels,
} from "@/shared/constants/models";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import {
  getAllCustomModels,
  getAllSyncedAvailableModels,
  getSyncedAvailableModels,
} from "@/lib/db/models";
import { getProviderConnections } from "@/lib/localDb";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { getSyncedCapabilities } from "@/lib/modelsDevSync";

function readNestedCapabilities(model: Record<string, unknown>): Record<string, unknown> {
  const capabilities = model.capabilities;
  return capabilities && typeof capabilities === "object" && !Array.isArray(capabilities)
    ? (capabilities as Record<string, unknown>)
    : {};
}

function readNumericCapability(
  model: Record<string, unknown>,
  keys: readonly string[]
): number | undefined {
  const capabilities = readNestedCapabilities(model);
  for (const key of keys) {
    const value = capabilities[key] ?? model[key];
    if (typeof value === "number" && Number.isFinite(value)) return value;
  }
  return undefined;
}

function readThinkingCapability(
  model: Record<string, unknown>,
  resolved: ReturnType<typeof getResolvedModelCapabilities>
): boolean {
  const capabilities = readNestedCapabilities(model);
  return (
    capabilities.supportsReasoning === true ||
    capabilities.supportsThinking === true ||
    model.supportsReasoning === true ||
    model.supportsThinking === true ||
    resolved.supportsReasoning === true ||
    resolved.supportsThinking === true
  );
}

function buildGeminiModelEntry(params: {
  provider: string;
  id: string;
  displayName: unknown;
  description?: unknown;
  resolved: ReturnType<typeof getResolvedModelCapabilities>;
  metadata?: Record<string, unknown>;
}) {
  const metadata = params.metadata ?? {};
  const inputTokenLimit =
    readNumericCapability(metadata, ["maxInputTokens", "contextWindow", "inputTokenLimit"]) ??
    params.resolved.maxInputTokens ??
    params.resolved.contextWindow ??
    undefined;
  const outputTokenLimit =
    readNumericCapability(metadata, ["maxOutputTokens", "outputTokenLimit"]) ??
    params.resolved.maxOutputTokens ??
    undefined;

  return {
    name: `models/${params.provider}/${params.id}`,
    displayName:
      typeof params.displayName === "string" && params.displayName ? params.displayName : params.id,
    ...(typeof params.description === "string" ? { description: params.description } : {}),
    supportedGenerationMethods: ["generateContent"],
    ...(typeof inputTokenLimit === "number" ? { inputTokenLimit } : {}),
    ...(typeof outputTokenLimit === "number" ? { outputTokenLimit } : {}),
    ...(readThinkingCapability(metadata, params.resolved) ? { thinking: true } : {}),
  };
}

function getStaticProviderModelKeys(activeKeys: Set<string>): string[] {
  const keys = new Set<string>();
  for (const provider of Object.keys(PROVIDER_MODELS)) {
    if (activeKeys.has(provider)) keys.add(provider);
  }
  for (const provider of activeKeys) {
    if (PROVIDER_MODELS[provider]) continue;
    const alias = (PROVIDER_ID_TO_ALIAS as Record<string, string>)[provider];
    if (alias && activeKeys.has(alias) && PROVIDER_MODELS[alias]) continue;
    if (getProviderModels(provider).length > 0) keys.add(provider);
  }
  return [...keys];
}

/**
 * Build the set of provider keys (raw id + alias) that have at least one active/validated
 * connection. Mirrors the active-provider filter used by the OpenAI-format /v1/models
 * catalog so /v1beta/models only lists models the user can actually call (#2483).
 */
async function getActiveProviderKeys(): Promise<Set<string>> {
  const keys = new Set<string>();
  try {
    const connections = await getProviderConnections();
    for (const conn of connections) {
      if (conn.isActive === false) continue;
      const provider = conn.provider;
      if (!provider) continue;
      keys.add(provider);
      const alias = (PROVIDER_ID_TO_ALIAS as Record<string, string>)[provider];
      if (alias) keys.add(alias);
    }
  } catch (e) {
    // DB unavailable — return empty set (safe default: list nothing provider-gated)
    console.error("[v1beta/models] Could not fetch provider connections:", e);
  }
  return keys;
}

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  });
}

/**
 * GET /v1beta/models - Gemini compatible models list
 * Returns models in Gemini API format with real token limits when available.
 */
export async function GET() {
  try {
    getSyncedCapabilities();
    const models = [];
    const existingNames = new Set<string>();

    // Only list models whose provider has an active/validated connection (#2483).
    const activeKeys = await getActiveProviderKeys();

    // Built-in models (hardcoded defaults)
    for (const provider of getStaticProviderModelKeys(activeKeys)) {
      const providerModels = getProviderModels(provider);
      for (const model of providerModels) {
        const name = `models/${provider}/${model.id}`;
        if (existingNames.has(name)) continue;
        const resolved = getResolvedModelCapabilities({ provider, model: model.id });
        models.push(
          buildGeminiModelEntry({
            provider,
            id: model.id,
            displayName: model.name,
            description: `${provider} model: ${model.name || model.id}`,
            resolved,
          })
        );
        existingNames.add(name);
      }
    }

    // Gemini: always replace hardcoded entries with synced models (no fallback)
    // Always remove hardcoded gemini entries — even if sync returns empty
    for (let i = models.length - 1; i >= 0; i--) {
      if (
        typeof (models[i] as any).name === "string" &&
        (models[i] as any).name.startsWith("models/gemini/")
      ) {
        models.splice(i, 1);
      }
    }
    try {
      const syncedGeminiModels = activeKeys.has("gemini")
        ? await getSyncedAvailableModels("gemini")
        : [];
      for (const m of syncedGeminiModels) {
        const metadata = m as Record<string, unknown>;
        models.push(
          buildGeminiModelEntry({
            provider: "gemini",
            id: m.id,
            displayName: m.name,
            description: m.description,
            metadata,
            resolved: getResolvedModelCapabilities({ provider: "gemini", model: m.id }),
          })
        );
      }
    } catch (err) {
      console.error("[v1beta/models] Error fetching synced Gemini models:", err);
    }

    // Synced/imported models for non-Gemini providers
    try {
      const syncedModelsMap = await getAllSyncedAvailableModels();
      for (const [providerId, syncedModels] of Object.entries(syncedModelsMap)) {
        if (providerId === "gemini") continue;
        if (!activeKeys.has(providerId)) continue;
        if (!Array.isArray(syncedModels)) continue;
        for (const m of syncedModels) {
          if (!m || typeof m.id !== "string") continue;
          const name = `models/${providerId}/${m.id}`;
          if (existingNames.has(name)) continue;
          const resolved = getResolvedModelCapabilities({
            provider: providerId,
            model: m.id,
          });
          const metadata = m as Record<string, unknown>;
          models.push(
            buildGeminiModelEntry({
              provider: providerId,
              id: m.id,
              displayName: m.name,
              description: m.description,
              metadata,
              resolved,
            })
          );
          existingNames.add(name);
        }
      }
    } catch {
      // Synced models are optional — skip on error
    }

    // Custom models (use stored metadata from provider APIs)
    try {
      const customModelsMap = (await getAllCustomModels()) as Record<string, unknown>;
      for (const [providerId, rawModels] of Object.entries(customModelsMap)) {
        if (!Array.isArray(rawModels)) continue;
        // Skip Gemini — handled by syncedAvailableModels above
        if (providerId === "gemini") continue;
        if (!activeKeys.has(providerId)) continue;
        for (const model of rawModels) {
          if (!model || typeof model !== "object" || typeof (model as any).id !== "string")
            continue;
          const m = model as Record<string, unknown>;
          if (m.isHidden === true) continue;
          const resolved = getResolvedModelCapabilities({
            provider: providerId,
            model: String(m.id),
          });
          const name = `models/${providerId}/${m.id}`;
          if (existingNames.has(name)) continue;
          models.push(
            buildGeminiModelEntry({
              provider: providerId,
              id: String(m.id),
              displayName: m.name,
              description: m.description,
              metadata: m,
              resolved,
            })
          );
          existingNames.add(name);
        }
      }
    } catch {
      // Custom models are optional — skip on error
    }

    return Response.json({ models });
  } catch (error: any) {
    console.log("Error fetching models:", error);
    return Response.json({ error: { message: sanitizeErrorMessage(error) } }, { status: 500 });
  }
}
