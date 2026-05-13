import { PROVIDER_MODELS, PROVIDER_ID_TO_ALIAS } from "@/shared/constants/models";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import {
  getProviderConnections,
  getCombos,
  getAllCustomModels,
  getSettings,
  getProviderNodes,
  getModelIsHidden,
} from "@/lib/localDb";
import { getAllEmbeddingModels } from "@omniroute/open-sse/config/embeddingRegistry";
import { getAllImageModels } from "@omniroute/open-sse/config/imageRegistry";
import { getAllRerankModels } from "@omniroute/open-sse/config/rerankRegistry";
import { getAllAudioModels } from "@omniroute/open-sse/config/audioRegistry";
import { getAllModerationModels } from "@omniroute/open-sse/config/moderationRegistry";
import { getAllVideoModels } from "@omniroute/open-sse/config/videoRegistry";
import { getAllMusicModels } from "@omniroute/open-sse/config/musicRegistry";
import { REGISTRY } from "@omniroute/open-sse/config/providerRegistry";
import { CODEX_NATIVE_UNPREFIXED_MODELS } from "@omniroute/open-sse/services/model";
import { resolveNestedComboTargets } from "@omniroute/open-sse/services/combo";
import { getAllSyncedAvailableModels } from "@/lib/db/models";
import { getCompatibleFallbackModels } from "@/lib/providers/managedAvailableModels";
import { hasEligibleConnectionForModel } from "@/domain/connectionModelRules";
import {
  INTERNAL_PROXY_ERROR,
  enrichCatalogModelEntry,
  getCanonicalModelMetadata,
  getCatalogDiagnosticsHeaders,
} from "@/lib/modelMetadataRegistry";
import { getSyncedCapability } from "@/lib/modelsDevSync";
import { getModelSpec } from "@/shared/constants/modelSpecs";
import { isAuthRequired, isDashboardSessionAuthenticated } from "@/shared/utils/apiAuth";
import { parseModel } from "@omniroute/open-sse/services/model";
import { getTokenLimit } from "@omniroute/open-sse/services/contextManager";
import type { ComboModelStep } from "@/lib/combos/steps";

interface CustomModelEntry {
  id?: string;
  name?: string;
  source?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  inputTokenLimit?: number;
  isHidden?: boolean;
}

const FALLBACK_ALIAS_TO_PROVIDER = {
  ag: "antigravity",
  cc: "claude",
  cl: "cline",
  cu: "cursor",
  cx: "codex",
  gc: "gemini-cli",
  gh: "github",
  kc: "kilocode",
  kmc: "kimi-coding",
  kr: "kiro",
  qw: "qwen",
};

type ComboCatalogTarget = {
  modelStr?: string;
  provider?: string | null;
};

type ComboTargetCatalogMetadata = {
  contextLength?: number;
  maxInputTokens?: number;
  maxOutputTokens?: number;
  inputModalities?: string[];
  outputModalities?: string[];
  capabilities: Record<string, boolean>;
};

function isPositiveFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function parseJsonStringArray(value: unknown): string[] {
  if (typeof value !== "string" || value.trim().length === 0) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((entry): entry is string => typeof entry === "string" && entry.length > 0)
      : [];
  } catch {
    return [];
  }
}

function intersectStringArrays(arrays: string[][]): string[] {
  if (arrays.length === 0 || arrays.some((values) => values.length === 0)) return [];
  const [first, ...rest] = arrays;
  return first.filter((value, index) => {
    if (first.indexOf(value) !== index) return false;
    return rest.every((values) => values.includes(value));
  });
}

function minKnownNumber(values: Array<number | undefined>): number | undefined {
  if (values.length === 0 || !values.every(isPositiveFiniteNumber)) return undefined;
  return Math.min(...values);
}

const VISION_MODEL_KEYWORDS = [
  "gpt-4o",
  "gpt-4.1",
  "gpt-4-vision",
  "gpt-4-turbo",
  "claude-3",
  "claude-3.5",
  "claude-3-5",
  "claude-4",
  "claude-opus",
  "claude-sonnet",
  "claude-haiku",
  "gemini",
  "gemma",
  "llava",
  "bakllava",
  "pixtral",
  "mistral-pixtral",
  "qwen-vl",
  "qvq",
  "glm-4.6v",
  "glm-4.5v",
  "vision",
  "multimodal",
];

function isVisionModelId(modelId: string): boolean {
  const normalized = String(modelId || "").toLowerCase();
  if (!normalized) return false;
  return VISION_MODEL_KEYWORDS.some((keyword) => normalized.includes(keyword));
}

function getVisionCapabilityFields(modelId: string) {
  if (!isVisionModelId(modelId)) return null;
  return {
    capabilities: { vision: true },
    input_modalities: ["text", "image"],
    output_modalities: ["text"],
  };
}

function extractBearer(headers: Headers): string | null {
  const authHeader = headers.get("authorization") || headers.get("Authorization");
  if (!authHeader?.trim().toLowerCase().startsWith("bearer ")) return null;
  return authHeader.trim().slice(7).trim() || null;
}

async function validateCatalogBearer(apiKey: string): Promise<boolean> {
  const { validateApiKey } = await import("@/lib/db/apiKeys");
  return validateApiKey(apiKey);
}

async function getModelCatalogAuthRejection(
  request: Request,
  settings: Record<string, any>,
  headers: Record<string, string>
): Promise<Response | null> {
  if (settings.requireAuthForModels !== true || !(await isAuthRequired(request))) return null;

  const bearer = extractBearer(request.headers);
  if (bearer) {
    if (await validateCatalogBearer(bearer)) return null;
    return Response.json(
      {
        error: {
          message: "Invalid API key",
          type: "invalid_api_key",
          code: "invalid_api_key",
        },
      },
      {
        status: 401,
        headers,
      }
    );
  }

  if (await isDashboardSessionAuthenticated(request)) return null;

  return Response.json(
    {
      error: {
        message: "Authentication required",
        type: "invalid_api_key",
        code: "invalid_api_key",
      },
    },
    {
      status: 401,
      headers,
    }
  );
}

function buildAliasMaps() {
  const aliasToProviderId: Record<string, string> = {};
  const providerIdToAlias: Record<string, string> = {};

  // Canonical source for ID/alias pairs used across dashboard/provider config.
  for (const provider of Object.values(AI_PROVIDERS)) {
    const providerId = provider?.id;
    const alias = provider?.alias || providerId;
    if (!providerId) continue;
    aliasToProviderId[providerId] = providerId;
    aliasToProviderId[alias] = providerId;
    if (!providerIdToAlias[providerId]) {
      providerIdToAlias[providerId] = alias;
    }
  }

  for (const [left, right] of Object.entries(PROVIDER_ID_TO_ALIAS)) {
    // Handle both possible directions:
    // - providerId -> alias
    // - alias -> providerId
    if (PROVIDER_MODELS[left]) {
      aliasToProviderId[left] = aliasToProviderId[left] || right;
      continue;
    }
    if (PROVIDER_MODELS[right]) {
      aliasToProviderId[right] = aliasToProviderId[right] || left;
      continue;
    }
    aliasToProviderId[right] = aliasToProviderId[right] || left;
  }

  for (const alias of Object.keys(PROVIDER_MODELS)) {
    if (!aliasToProviderId[alias]) {
      aliasToProviderId[alias] = alias;
    }
  }

  for (const [alias, providerId] of Object.entries(aliasToProviderId)) {
    if (!providerIdToAlias[providerId]) {
      providerIdToAlias[providerId] = alias;
    }
  }

  // Safety net for environments where alias maps are partially loaded during
  // module initialization/circular imports.
  for (const [alias, providerId] of Object.entries(FALLBACK_ALIAS_TO_PROVIDER)) {
    if (!aliasToProviderId[alias]) aliasToProviderId[alias] = providerId;
    if (!aliasToProviderId[providerId]) aliasToProviderId[providerId] = providerId;
    if (!providerIdToAlias[providerId]) providerIdToAlias[providerId] = alias;
  }

  return { aliasToProviderId, providerIdToAlias };
}

/**
 * Build unified OpenAI-compatible model catalog response.
 * Reused by `/api/v1/models` and `/api/v1` to avoid semantic drift (T09).
 */
export async function getUnifiedModelsResponse(
  request: Request,
  corsHeaders: Record<string, string> = {}
) {
  const diagnosticHeaders = getCatalogDiagnosticsHeaders({ request });
  try {
    let settings: Record<string, any> = {};
    try {
      settings = await getSettings();
    } catch {}

    const authRejection = await getModelCatalogAuthRejection(request, settings, {
      ...corsHeaders,
      ...diagnosticHeaders,
    });
    if (authRejection) return authRejection;

    const { aliasToProviderId, providerIdToAlias } = buildAliasMaps();
    const resolveCanonicalProviderId = (aliasOrProviderId: string, fallbackProviderId?: string) =>
      aliasToProviderId[aliasOrProviderId] ||
      (fallbackProviderId ? aliasToProviderId[fallbackProviderId] : undefined) ||
      FALLBACK_ALIAS_TO_PROVIDER[aliasOrProviderId] ||
      fallbackProviderId ||
      aliasOrProviderId;

    // Issue #96: Allow blocking specific providers from the models list
    const blockedProviders: Set<string> = new Set(
      Array.isArray(settings.blockedProviders) ? settings.blockedProviders : []
    );

    // Get active provider connections
    let connections = [];
    let totalConnectionCount = 0; // Track if DB has ANY connections (even disabled)
    try {
      connections = await getProviderConnections();
      totalConnectionCount = connections.length;
      // Filter to only active connections
      connections = connections.filter((c) => c.isActive !== false);
    } catch (e) {
      // If database not available, show no provider models (safe default)
      console.log("[catalog] Could not fetch providers:", e);
    }

    // Get provider nodes (for compatible providers with custom prefixes)
    let providerNodes = [];
    try {
      providerNodes = await getProviderNodes();
    } catch (e) {
      console.log("Could not fetch provider nodes");
    }

    // Build map of provider node ID to prefix and type for compatible providers
    const providerIdToPrefix: Record<string, string> = {};
    const nodeIdToProviderType: Record<string, string> = {};
    for (const node of providerNodes) {
      if (node.prefix) {
        providerIdToPrefix[node.id] = node.prefix;
      }
      if (node.type) {
        nodeIdToProviderType[node.id] = node.type;
      }
    }

    // Get combos
    let combos = [];
    try {
      combos = await getCombos();
    } catch (e) {
      console.log("Could not fetch combos");
    }

    // Build set of active provider aliases
    const activeAliases = new Set();
    const connectionsByProvider = new Map<string, typeof connections>();
    const registerConnectionKey = (
      key: string | null | undefined,
      connection: (typeof connections)[number]
    ) => {
      if (!key) return;
      const existing = connectionsByProvider.get(key) || [];
      existing.push(connection);
      connectionsByProvider.set(key, existing);
    };
    for (const conn of connections) {
      const alias = providerIdToAlias[conn.provider] || conn.provider;
      activeAliases.add(alias);
      activeAliases.add(conn.provider);
      registerConnectionKey(alias, conn);
      registerConnectionKey(conn.provider, conn);
    }

    const getConnectionsForProvider = (...keys: Array<string | null | undefined>) => {
      const seen = new Set<string>();
      const collected: typeof connections = [];
      for (const key of keys) {
        if (!key) continue;
        for (const connection of connectionsByProvider.get(key) || []) {
          if (!connection?.id || seen.has(connection.id)) continue;
          seen.add(connection.id);
          collected.push(connection);
        }
      }
      return collected;
    };

    const providerSupportsModel = (providerKey: string, modelId: string) => {
      const providerId = aliasToProviderId[providerKey] || providerKey;
      const alias = providerIdToAlias[providerId] || providerKey;
      return hasEligibleConnectionForModel(
        getConnectionsForProvider(providerKey, providerId, alias),
        modelId
      );
    };

    const getRegistryModel = (providerId: string, modelId: string) => {
      const alias = providerIdToAlias[providerId] || PROVIDER_ID_TO_ALIAS[providerId] || providerId;
      const providerModels = PROVIDER_MODELS[alias] || PROVIDER_MODELS[providerId] || [];
      return providerModels.find((model) => model?.id === modelId) || null;
    };

    const getProviderPrefixes = (providerId: string, rawProvider: string) => {
      const prefixes = new Set<string>([providerId, rawProvider, providerIdToAlias[providerId]]);
      for (const [alias, mappedProviderId] of Object.entries(aliasToProviderId)) {
        if (mappedProviderId === providerId) prefixes.add(alias);
      }
      return [...prefixes].filter(
        (prefix): prefix is string => typeof prefix === "string" && prefix.length > 0
      );
    };

    const getComboTargetModelId = (target: ComboCatalogTarget) => {
      const rawProvider = typeof target.provider === "string" ? target.provider.trim() : "";
      const modelStr = typeof target.modelStr === "string" ? target.modelStr.trim() : "";
      if (!rawProvider || rawProvider === "unknown" || !modelStr) return null;

      const providerId = resolveCanonicalProviderId(rawProvider);
      if (!providerId || providerId === "unknown") return null;

      for (const prefix of getProviderPrefixes(providerId, rawProvider)) {
        const prefixWithSlash = `${prefix}/`;
        if (modelStr.startsWith(prefixWithSlash)) {
          const modelId = modelStr.slice(prefixWithSlash.length).trim();
          return modelId ? { providerId, modelId } : null;
        }
      }

      return { providerId, modelId: modelStr };
    };

    const getComboTargetCatalogMetadata = (
      target: ComboCatalogTarget
    ): ComboTargetCatalogMetadata | null => {
      const targetModel = getComboTargetModelId(target);
      if (!targetModel) return null;

      const canonical = getCanonicalModelMetadata({
        provider: targetModel.providerId,
        model: targetModel.modelId,
      });
      if (!canonical) return null;

      const source = canonical.metadata.source;
      if (!source.providerRegistry && !source.staticSpec && !source.syncedCapability) return null;

      const providerId = canonical.provider || targetModel.providerId;
      const modelId = canonical.model || targetModel.modelId;
      const synced = getSyncedCapability(providerId, modelId);
      const spec = getModelSpec(modelId);
      const registryModel = getRegistryModel(providerId, modelId);
      const syncedInputModalities = parseJsonStringArray(synced?.modalities_input);
      const syncedOutputModalities = parseJsonStringArray(synced?.modalities_output);

      const syncedContext = isPositiveFiniteNumber(synced?.limit_context)
        ? synced.limit_context
        : undefined;
      const registryContext = isPositiveFiniteNumber(registryModel?.contextLength)
        ? registryModel.contextLength
        : undefined;
      const specContext = isPositiveFiniteNumber(spec?.contextWindow)
        ? spec.contextWindow
        : undefined;
      const contextLength = syncedContext ?? registryContext ?? specContext;
      const maxInputTokens = isPositiveFiniteNumber(synced?.limit_input)
        ? synced.limit_input
        : contextLength;
      const maxOutputTokens = isPositiveFiniteNumber(synced?.limit_output)
        ? synced.limit_output
        : isPositiveFiniteNumber(spec?.maxOutputTokens)
          ? spec.maxOutputTokens
          : undefined;

      const syncedVision =
        typeof synced?.attachment === "boolean"
          ? synced.attachment
          : syncedInputModalities.length > 0 || syncedOutputModalities.length > 0
            ? [...syncedInputModalities, ...syncedOutputModalities].some((entry) =>
                entry.toLowerCase().includes("image")
              )
            : undefined;
      const registryVision =
        typeof registryModel?.supportsVision === "boolean"
          ? registryModel.supportsVision
          : undefined;
      const specVision =
        typeof spec?.supportsVision === "boolean" ? spec.supportsVision : undefined;
      const knownVision = syncedVision ?? registryVision ?? specVision;

      const inputModalities =
        syncedInputModalities.length > 0
          ? syncedInputModalities
          : knownVision === true
            ? ["text", "image"]
            : undefined;
      const outputModalities =
        syncedOutputModalities.length > 0
          ? syncedOutputModalities
          : knownVision === true
            ? ["text"]
            : undefined;

      const capabilities: Record<string, boolean> = {};
      if (typeof synced?.tool_call === "boolean") {
        capabilities.tool_calling = synced.tool_call;
      } else if (typeof registryModel?.toolCalling === "boolean") {
        capabilities.tool_calling = registryModel.toolCalling;
      } else if (typeof spec?.supportsTools === "boolean") {
        capabilities.tool_calling = spec.supportsTools;
      }
      if (typeof synced?.reasoning === "boolean") {
        capabilities.reasoning = synced.reasoning;
      } else if (typeof registryModel?.supportsReasoning === "boolean") {
        capabilities.reasoning = registryModel.supportsReasoning;
      } else if (typeof spec?.supportsThinking === "boolean") {
        capabilities.reasoning = spec.supportsThinking;
      }
      if (typeof knownVision === "boolean") capabilities.vision = knownVision;
      if (typeof synced?.attachment === "boolean") capabilities.attachment = synced.attachment;
      if (typeof synced?.structured_output === "boolean") {
        capabilities.structured_output = synced.structured_output;
      }
      if (typeof synced?.temperature === "boolean") capabilities.temperature = synced.temperature;
      if (typeof synced?.reasoning === "boolean") {
        capabilities.thinking = synced.reasoning;
      } else if (typeof spec?.supportsThinking === "boolean") {
        capabilities.thinking = spec.supportsThinking;
      }

      return {
        ...(contextLength ? { contextLength } : {}),
        ...(maxInputTokens ? { maxInputTokens } : {}),
        ...(maxOutputTokens ? { maxOutputTokens } : {}),
        ...(inputModalities && inputModalities.length > 0 ? { inputModalities } : {}),
        ...(outputModalities && outputModalities.length > 0 ? { outputModalities } : {}),
        capabilities,
      };
    };

    const buildComboCatalogMetadata = (combo: Record<string, any>, allCombos: any[]) => {
      const explicitContextLength = isPositiveFiniteNumber(combo.context_length)
        ? combo.context_length
        : undefined;

      const baseMetadata = explicitContextLength ? { context_length: explicitContextLength } : {};
      const targets = resolveNestedComboTargets(combo, allCombos) as ComboCatalogTarget[];
      if (targets.length === 0) return baseMetadata;

      const targetMetadata = targets.map((target) => getComboTargetCatalogMetadata(target));
      if (targetMetadata.some((metadata) => metadata === null)) return baseMetadata;

      const knownMetadata = targetMetadata as ComboTargetCatalogMetadata[];
      const contextLength =
        explicitContextLength ??
        minKnownNumber(knownMetadata.map((metadata) => metadata.contextLength));
      const maxInputTokens = minKnownNumber(
        knownMetadata.map((metadata) => metadata.maxInputTokens)
      );
      const maxOutputTokens = minKnownNumber(
        knownMetadata.map((metadata) => metadata.maxOutputTokens)
      );

      const inputModalities = knownMetadata.every(
        (metadata) => Array.isArray(metadata.inputModalities) && metadata.inputModalities.length > 0
      )
        ? intersectStringArrays(knownMetadata.map((metadata) => metadata.inputModalities || []))
        : [];
      const outputModalities = knownMetadata.every(
        (metadata) =>
          Array.isArray(metadata.outputModalities) && metadata.outputModalities.length > 0
      )
        ? intersectStringArrays(knownMetadata.map((metadata) => metadata.outputModalities || []))
        : [];

      const capabilities: Record<string, boolean> = {};
      for (const key of [
        "tool_calling",
        "reasoning",
        "vision",
        "attachment",
        "structured_output",
        "temperature",
        "thinking",
      ]) {
        const values = knownMetadata.map((metadata) => metadata.capabilities[key]);
        if (values.every((value): value is boolean => typeof value === "boolean")) {
          const [first] = values;
          if (values.every((value) => value === first)) capabilities[key] = first;
        }
      }

      return {
        ...baseMetadata,
        ...(contextLength ? { context_length: contextLength } : {}),
        ...(maxInputTokens ? { max_input_tokens: maxInputTokens } : {}),
        ...(maxOutputTokens ? { max_output_tokens: maxOutputTokens } : {}),
        ...(inputModalities.length > 0 ? { input_modalities: inputModalities } : {}),
        ...(outputModalities.length > 0 ? { output_modalities: outputModalities } : {}),
        ...(Object.keys(capabilities).length > 0 ? { capabilities } : {}),
      };
    };

    // Collect models from active providers (or all if none active)
    const models = [];
    const timestamp = Math.floor(Date.now() / 1000);

    // Add combos first (they appear at the top) — only active ones
    for (const combo of combos) {
      if (combo.isActive === false || combo.isHidden === true) continue;
      const comboMetadata = buildComboCatalogMetadata(combo, combos);

      models.push({
        id: combo.name,
        object: "model",
        created: timestamp,
        owned_by: "combo",
        permission: [],
        root: combo.name,
        parent: null,
        ...comboMetadata,
      });
    }

    // Add provider models (chat)
    for (const [alias, providerModels] of Object.entries(PROVIDER_MODELS)) {
      const providerId = aliasToProviderId[alias] || alias;
      const canonicalProviderId = resolveCanonicalProviderId(alias, providerId);

      // Skip blocked providers (Issue #96)
      if (blockedProviders.has(alias) || blockedProviders.has(canonicalProviderId)) continue;

      // Only include models from providers with active connections
      if (!activeAliases.has(alias) && !activeAliases.has(canonicalProviderId)) {
        continue;
      }

      for (const model of providerModels) {
        if (!providerSupportsModel(canonicalProviderId, model.id)) continue;
        const aliasId = `${alias}/${model.id}`;
        if (getModelIsHidden(canonicalProviderId, model.id)) continue;

        const visionFields =
          getVisionCapabilityFields(aliasId) || getVisionCapabilityFields(model.id);

        models.push({
          id: aliasId,
          object: "model",
          created: timestamp,
          owned_by: canonicalProviderId,
          permission: [],
          root: model.id,
          parent: null,
          ...(visionFields || {}),
        });

        // Add provider-id prefix in addition to short alias (ex: kiro/model + kr/model).
        // This improves compatibility for clients that expect full provider names.
        if (canonicalProviderId !== alias) {
          const providerIdModel = `${canonicalProviderId}/${model.id}`;
          const providerVisionFields =
            getVisionCapabilityFields(providerIdModel) || getVisionCapabilityFields(model.id);
          models.push({
            id: providerIdModel,
            object: "model",
            created: timestamp,
            owned_by: canonicalProviderId,
            permission: [],
            root: model.id,
            parent: aliasId,
            ...(providerVisionFields || {}),
          });
        }
      }
    }

    for (const modelId of CODEX_NATIVE_UNPREFIXED_MODELS) {
      if (!providerSupportsModel("codex", modelId)) continue;
      if (getModelIsHidden("codex", modelId)) continue;

      const alias = providerIdToAlias.codex || "cx";
      const aliasId = `${alias}/${modelId}`;
      const providerIdModel = `codex/${modelId}`;
      const entries = [
        { id: aliasId, parent: null },
        { id: providerIdModel, parent: aliasId },
        { id: modelId, parent: providerIdModel },
      ];

      for (const entry of entries) {
        if (models.some((existingModel) => existingModel.id === entry.id)) continue;
        models.push({
          id: entry.id,
          object: "model",
          created: timestamp,
          owned_by: "codex",
          permission: [],
          root: modelId,
          parent: entry.parent,
        });
      }
    }

    try {
      const syncedModelsByProvider = await getAllSyncedAvailableModels();
      for (const [providerId, syncedModels] of Object.entries(syncedModelsByProvider)) {
        if (!Array.isArray(syncedModels) || syncedModels.length === 0) continue;
        if (blockedProviders.has(providerId)) continue;
        if (providerId === "reka") continue;

        const prefix = providerIdToPrefix[providerId];
        const alias = prefix || providerIdToAlias[providerId] || providerId;
        const canonicalProviderId = resolveCanonicalProviderId(alias, providerId);
        const parentProviderType = nodeIdToProviderType[providerId];

        if (
          !activeAliases.has(alias) &&
          !activeAliases.has(canonicalProviderId) &&
          !activeAliases.has(providerId) &&
          !(parentProviderType && activeAliases.has(parentProviderType))
        ) {
          continue;
        }

        for (const sm of syncedModels) {
          if (!providerSupportsModel(canonicalProviderId, sm.id)) continue;
          if (getModelIsHidden(providerId, sm.id)) continue;

          const aliasId = `${alias}/${sm.id}`;
          const endpoints = Array.isArray(sm.supportedEndpoints) ? sm.supportedEndpoints : ["chat"];
          const apiFormat = typeof sm.apiFormat === "string" ? sm.apiFormat : "chat-completions";
          let modelType: string | undefined;
          if (endpoints.includes("embeddings")) modelType = "embedding";
          else if (endpoints.includes("rerank")) modelType = "rerank";
          else if (endpoints.includes("images")) modelType = "image";
          else if (endpoints.includes("audio")) modelType = "audio";
          const syncedFields = {
            ...(modelType ? { type: modelType } : {}),
            ...(apiFormat !== "chat-completions" ? { api_format: apiFormat } : {}),
            ...(modelType === "audio" ? { subtype: "transcription" } : {}),
            ...(sm.inputTokenLimit ? { context_length: sm.inputTokenLimit } : {}),
            ...(endpoints.length > 1 || !endpoints.includes("chat")
              ? { supported_endpoints: endpoints }
              : {}),
          };

          const existingAliasModel = models.find((model) => model.id === aliasId);
          if (existingAliasModel) {
            Object.assign(existingAliasModel, syncedFields);
            continue;
          }

          models.push({
            id: aliasId,
            object: "model",
            created: timestamp,
            owned_by: canonicalProviderId,
            permission: [],
            root: sm.id,
            parent: null,
            ...syncedFields,
          });

          if (modelType === "audio") {
            models.push({
              id: aliasId,
              object: "model",
              created: timestamp,
              owned_by: canonicalProviderId,
              permission: [],
              root: sm.id,
              parent: null,
              type: "audio",
              subtype: "speech",
              ...(sm.inputTokenLimit ? { context_length: sm.inputTokenLimit } : {}),
              ...(endpoints.length > 1 || !endpoints.includes("chat")
                ? { supported_endpoints: endpoints }
                : {}),
            });
          }

          if (canonicalProviderId !== alias && !prefix) {
            const providerPrefixedId = `${canonicalProviderId}/${sm.id}`;
            if (!models.some((model) => model.id === providerPrefixedId)) {
              models.push({
                id: providerPrefixedId,
                object: "model",
                created: timestamp,
                owned_by: canonicalProviderId,
                permission: [],
                root: sm.id,
                parent: aliasId,
                ...syncedFields,
              });
            }
          }
        }
      }
    } catch (err) {
      console.error("[catalog] Error fetching synced provider models:", err);
    }

    // Helper: check if a provider is active (by provider id or alias)
    const isProviderActive = (provider: string) => {
      if (activeAliases.size === 0) return false; // No active connections = show nothing
      const alias = providerIdToAlias[provider] || provider;
      const canonicalProviderId = resolveCanonicalProviderId(alias, provider);

      // FIX #1752: Ensure blocked providers are not returned for non-chat models
      if (
        blockedProviders.has(alias) ||
        blockedProviders.has(canonicalProviderId) ||
        blockedProviders.has(provider)
      ) {
        return false;
      }

      return activeAliases.has(alias) || activeAliases.has(provider);
    };

    const hasEquivalentSpecialtyModel = (
      providerId: string,
      rawModelId: string,
      type: string,
      scopedModelId: string
    ) =>
      models.some((model: any) => {
        if (model?.id === scopedModelId) return true;
        if (model?.owned_by !== providerId || model?.type !== type) return false;
        const existingRoot =
          typeof model?.root === "string"
            ? model.root
            : typeof model?.id === "string"
              ? model.id.split("/").pop()
              : null;
        return existingRoot === rawModelId;
      });

    // Add embedding models (filtered by active providers)
    for (const embModel of getAllEmbeddingModels()) {
      if (!isProviderActive(embModel.provider)) continue;
      const rawModelId = embModel.id.split("/").pop() || embModel.id;
      if (!providerSupportsModel(embModel.provider, rawModelId)) continue;
      if (hasEquivalentSpecialtyModel(embModel.provider, rawModelId, "embedding", embModel.id)) {
        continue;
      }
      models.push({
        id: embModel.id,
        object: "model",
        created: timestamp,
        owned_by: embModel.provider,
        root: rawModelId,
        type: "embedding",
        dimensions: embModel.dimensions,
      });
    }

    // Add image models (filtered by active providers)
    for (const imgModel of getAllImageModels()) {
      if (!isProviderActive(imgModel.provider)) continue;
      const rawModelId = imgModel.id.split("/").pop() || imgModel.id;
      if (!providerSupportsModel(imgModel.provider, rawModelId)) continue;
      models.push({
        id: imgModel.id,
        object: "model",
        created: timestamp,
        owned_by: imgModel.provider,
        type: "image",
        supported_sizes: imgModel.supportedSizes,
        input_modalities: imgModel.inputModalities || ["text"],
        output_modalities: ["image"],
        ...(imgModel.description ? { description: imgModel.description } : {}),
      });
    }

    // Add rerank models (filtered by active providers)
    for (const rerankModel of getAllRerankModels()) {
      if (!isProviderActive(rerankModel.provider)) continue;
      const rawModelId = rerankModel.id.split("/").pop() || rerankModel.id;
      if (!providerSupportsModel(rerankModel.provider, rawModelId)) continue;
      if (hasEquivalentSpecialtyModel(rerankModel.provider, rawModelId, "rerank", rerankModel.id)) {
        continue;
      }
      models.push({
        id: rerankModel.id,
        object: "model",
        created: timestamp,
        owned_by: rerankModel.provider,
        root: rawModelId,
        type: "rerank",
      });
    }

    // Add audio models (filtered by active providers)
    for (const audioModel of getAllAudioModels()) {
      if (!isProviderActive(audioModel.provider)) continue;
      const rawModelId = audioModel.id.split("/").pop() || audioModel.id;
      if (!providerSupportsModel(audioModel.provider, rawModelId)) continue;
      models.push({
        id: audioModel.id,
        object: "model",
        created: timestamp,
        owned_by: audioModel.provider,
        type: "audio",
        subtype: audioModel.subtype,
      });
    }

    // Add moderation models (filtered by active providers)
    for (const modModel of getAllModerationModels()) {
      if (!isProviderActive(modModel.provider)) continue;
      const rawModelId = modModel.id.split("/").pop() || modModel.id;
      if (!providerSupportsModel(modModel.provider, rawModelId)) continue;
      models.push({
        id: modModel.id,
        object: "model",
        created: timestamp,
        owned_by: modModel.provider,
        type: "moderation",
      });
    }

    // Add video models (filtered by active providers)
    for (const videoModel of getAllVideoModels()) {
      if (!isProviderActive(videoModel.provider)) continue;
      const rawModelId = videoModel.id.split("/").pop() || videoModel.id;
      if (!providerSupportsModel(videoModel.provider, rawModelId)) continue;
      models.push({
        id: videoModel.id,
        object: "model",
        created: timestamp,
        owned_by: videoModel.provider,
        type: "video",
      });
    }

    // Add music models (filtered by active providers)
    for (const musicModel of getAllMusicModels()) {
      if (!isProviderActive(musicModel.provider)) continue;
      const rawModelId = musicModel.id.split("/").pop() || musicModel.id;
      if (!providerSupportsModel(musicModel.provider, rawModelId)) continue;
      models.push({
        id: musicModel.id,
        object: "model",
        created: timestamp,
        owned_by: musicModel.provider,
        type: "music",
      });
    }

    // Add custom models (user-defined)
    try {
      const customModelsMap = (await getAllCustomModels()) as Record<string, unknown>;
      for (const [providerId, rawProviderCustomModels] of Object.entries(customModelsMap)) {
        // Skip Gemini — handled by syncedAvailableModels above
        if (providerId === "gemini") continue;
        if (providerId === "reka") continue;
        const providerCustomModels: CustomModelEntry[] = Array.isArray(rawProviderCustomModels)
          ? rawProviderCustomModels.filter(
              (model): model is CustomModelEntry =>
                !!model && typeof model === "object" && !Array.isArray(model)
            )
          : [];
        // For compatible providers, use the prefix from provider nodes
        const prefix = providerIdToPrefix[providerId];
        const alias = prefix || providerIdToAlias[providerId] || providerId;
        const canonicalProviderId = resolveCanonicalProviderId(alias, providerId);

        // Only include if provider is active — check alias, canonical ID, raw providerId,
        // or the parent provider type (for compatible providers whose node ID is a UUID)
        const parentProviderType = nodeIdToProviderType[providerId];
        if (
          !activeAliases.has(alias) &&
          !activeAliases.has(canonicalProviderId) &&
          !activeAliases.has(providerId) &&
          !(parentProviderType && activeAliases.has(parentProviderType))
        )
          continue;

        for (const model of providerCustomModels) {
          const modelId = typeof model.id === "string" ? model.id : null;
          if (!modelId) continue;
          if (model.isHidden === true) continue;
          if (
            !hasEligibleConnectionForModel(
              getConnectionsForProvider(alias, canonicalProviderId, providerId, parentProviderType),
              modelId
            )
          ) {
            continue;
          }

          // Skip if already added as built-in
          const aliasId = `${alias}/${modelId}`;
          if (models.some((m) => m.id === aliasId)) continue;

          // Determine type from supportedEndpoints
          const endpoints = Array.isArray(model.supportedEndpoints)
            ? model.supportedEndpoints
            : ["chat"];
          const apiFormat =
            typeof model.apiFormat === "string" ? model.apiFormat : "chat-completions";
          let modelType: string | undefined;
          if (endpoints.includes("embeddings")) modelType = "embedding";
          else if (endpoints.includes("rerank")) modelType = "rerank";
          else if (endpoints.includes("images")) modelType = "image";
          else if (endpoints.includes("audio")) modelType = "audio";
          if (
            modelType &&
            hasEquivalentSpecialtyModel(canonicalProviderId, modelId, modelType, aliasId)
          ) {
            continue;
          }
          const visionFields =
            modelType === "chat"
              ? getVisionCapabilityFields(aliasId) || getVisionCapabilityFields(modelId)
              : null;

          models.push({
            id: aliasId,
            object: "model",
            created: timestamp,
            owned_by: canonicalProviderId,
            permission: [],
            root: modelId,
            parent: null,
            custom: true,
            ...(modelType ? { type: modelType } : {}),
            ...(apiFormat !== "chat-completions" ? { api_format: apiFormat } : {}),
            ...(endpoints.length > 1 || !endpoints.includes("chat")
              ? { supported_endpoints: endpoints }
              : {}),
            ...(typeof model.inputTokenLimit === "number"
              ? { context_length: model.inputTokenLimit }
              : {}),
            ...(visionFields || {}),
          });

          // Only add provider-prefixed version if different from alias
          if (canonicalProviderId !== alias && !prefix) {
            const providerPrefixedId = `${canonicalProviderId}/${modelId}`;
            if (models.some((m) => m.id === providerPrefixedId)) continue;
            const providerVisionFields =
              modelType === "chat"
                ? getVisionCapabilityFields(providerPrefixedId) ||
                  getVisionCapabilityFields(modelId)
                : null;
            models.push({
              id: providerPrefixedId,
              object: "model",
              created: timestamp,
              owned_by: canonicalProviderId,
              permission: [],
              root: modelId,
              parent: aliasId,
              custom: true,
              ...(modelType ? { type: modelType } : {}),
              ...(typeof model.inputTokenLimit === "number"
                ? { context_length: model.inputTokenLimit }
                : {}),
              ...(providerVisionFields || {}),
            });
          }
        }
      }
    } catch (e) {
      console.log("Could not fetch custom models");
    }

    // Add managed fallback models for compatible providers that don't import a model list.
    for (const conn of connections) {
      const providerId = typeof conn.provider === "string" ? conn.provider : null;
      if (!providerId) continue;
      if (blockedProviders.has(providerId)) continue;

      const fallbackModels = getCompatibleFallbackModels(providerId);
      if (!Array.isArray(fallbackModels) || fallbackModels.length === 0) continue;

      const prefix = providerIdToPrefix[providerId];
      const alias = prefix || providerIdToAlias[providerId] || providerId;

      for (const model of fallbackModels) {
        const modelId = typeof model.id === "string" ? model.id : null;
        if (!modelId) continue;
        if (getModelIsHidden(providerId, modelId)) continue;
        if (!hasEligibleConnectionForModel([conn], modelId)) continue;

        const aliasId = `${alias}/${modelId}`;
        if (models.some((m) => m.id === aliasId)) continue;

        const visionFields =
          getVisionCapabilityFields(aliasId) || getVisionCapabilityFields(modelId);
        const contextLength =
          typeof model.contextLength === "number" ? model.contextLength : undefined;

        models.push({
          id: aliasId,
          object: "model",
          created: timestamp,
          owned_by: providerId,
          permission: [],
          root: modelId,
          parent: null,
          ...(contextLength ? { context_length: contextLength } : {}),
          ...(visionFields || {}),
        });
      }
    }

    // Filter by API key permissions if requested
    const apiKey = extractBearer(request.headers);
    let finalModels = models;
    if (apiKey) {
      const { isModelAllowedForKey } = await import("@/lib/db/apiKeys");

      const filtered = [];
      for (const m of models) {
        // m.id is the full identifier (e.g. openai/gpt-4o), m.root is the raw model string
        // check either one as the config could use either patterns
        if (
          (await isModelAllowedForKey(apiKey, m.id)) ||
          (await isModelAllowedForKey(apiKey, m.root))
        ) {
          filtered.push(m);
        }
      }
      finalModels = filtered;
    }

    const getDefaultContextFallback = (model: any): number | undefined => {
      if (typeof model.context_length === "number") return undefined;
      if (model.owned_by === "combo") return undefined;
      if (model.type && model.type !== "chat") return undefined;

      const provider = typeof model.owned_by === "string" ? model.owned_by : null;
      if (!provider) return undefined;
      const canonicalId = aliasToProviderId[provider] || provider;

      const registryFallback = REGISTRY[canonicalId]?.defaultContextLength;
      if (registryFallback) return registryFallback;

      const modelId =
        model.root || (typeof model.id === "string" ? model.id.split("/").pop() : undefined);
      return modelId ? getTokenLimit(canonicalId, modelId) : getTokenLimit(canonicalId);
    };

    const enrichedModels = finalModels.map((model) => {
      if (model.owned_by === "combo") return model;
      const enriched = enrichCatalogModelEntry(model);
      const fallbackContextLength = getDefaultContextFallback(enriched);
      return fallbackContextLength
        ? { ...enriched, context_length: fallbackContextLength }
        : enriched;
    });

    return Response.json(
      {
        object: "list",
        data: enrichedModels,
      },
      {
        headers: {
          ...corsHeaders,
          ...diagnosticHeaders,
        },
      }
    );
  } catch (error) {
    console.log("Error fetching models:", error);
    return Response.json(
      {
        error: {
          message: error instanceof Error ? error.message : String(error),
          type: "server_error",
          code: INTERNAL_PROXY_ERROR,
        },
      },
      {
        status: 500,
        headers: {
          ...corsHeaders,
          ...diagnosticHeaders,
        },
      }
    );
  }
}
