import {
  getAllCustomModels,
  getAllSyncedAvailableModels,
  getCombos,
  getModelIsHidden,
  getProviderConnections,
  getProviderNodes,
  getSettings,
} from "@/lib/localDb";
import { getAccountDisplayName, getProviderDisplayName } from "@/lib/display/names";
import { getCompatibleFallbackModels } from "@/lib/providers/managedAvailableModels";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import { getSyncedCapabilities } from "@/lib/modelsDevSync";
import { getModelsByProviderId } from "@/shared/constants/models";
import {
  AI_PROVIDERS,
  NOAUTH_PROVIDERS,
  isAnthropicCompatibleProvider,
  isClaudeCodeCompatibleProvider,
  isOpenAICompatibleProvider,
} from "@/shared/constants/providers";
import type { RegistryModel } from "@omniroute/open-sse/config/providerRegistry.ts";
import { appendSyncedEffortVariants } from "@omniroute/open-sse/utils/syncedEffortVariants";

type JsonRecord = Record<string, unknown>;

type BuilderModelSource = "imported" | "system" | "custom" | "fallback";
type BuilderConnectionStatus = "active" | "inactive" | "rate-limited" | "error";
type ProviderVisual = { icon: string; color: string; source: "system" | "provider-node" };

type CustomModelLike = {
  id?: string;
  name?: string;
  source?: string;
  apiFormat?: string;
  supportedEndpoints?: string[];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  supportsThinking?: boolean;
  isHidden?: boolean;
};

type SyncedModelLike = {
  id?: string;
  name?: string;
  source?: string;
  supportedEndpoints?: string[];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  description?: string;
  supportsThinking?: boolean;
  supportedThinkingEfforts?: string[];
};

type ProviderConnectionLike = {
  id?: string;
  provider?: string;
  authType?: string;
  name?: string;
  displayName?: string;
  email?: string;
  priority?: number;
  isActive?: boolean;
  defaultModel?: string;
  rateLimitedUntil?: number | null;
  lastError?: string | null;
  lastTested?: string | null;
  updatedAt?: string | null;
  testStatus?: string | null;
  providerSpecificData?: Record<string, unknown> | null;
};

type ProviderNodeLike = {
  id?: string;
  type?: string;
  name?: string;
  prefix?: string;
};

export interface ComboBuilderModelOption {
  id: string;
  qualifiedModel: string;
  name: string;
  source: BuilderModelSource;
  sources: BuilderModelSource[];
  supportedEndpoints?: string[];
  apiFormat?: string;
  contextLength?: number;
  outputTokenLimit?: number;
  supportsThinking?: boolean;
}

export interface ComboBuilderConnectionOption {
  id: string;
  label: string;
  type: string;
  status: BuilderConnectionStatus;
  priority: number;
  isActive: boolean;
  defaultModel?: string | null;
  rateLimitedUntil?: number | null;
  lastError?: string | null;
  lastTested?: string | null;
}

export interface ComboBuilderProviderOption {
  providerId: string;
  providerType: string;
  displayName: string;
  alias: string;
  prefix?: string | null;
  icon: string;
  color: string;
  source: "system" | "provider-node";
  acceptsArbitraryModel: boolean;
  connectionCount: number;
  activeConnectionCount: number;
  modelCount: number;
  connections: ComboBuilderConnectionOption[];
  models: ComboBuilderModelOption[];
}

export interface ComboBuilderComboRefOption {
  id: string;
  name: string;
  strategy: string;
  stepCount: number;
  version: number;
  sortOrder?: number;
}

export interface ComboBuilderOptionsPayload {
  schemaVersion: number;
  generatedAt: string;
  providers: ComboBuilderProviderOption[];
  comboRefs: ComboBuilderComboRefOption[];
}

function toStringOrNull(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function toNumberOrNull(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function toStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const normalized = value
    .map((item) => toStringOrNull(item))
    .filter((item): item is string => Boolean(item));
  return normalized.length > 0 ? normalized : undefined;
}

function getSourcePriority(source: BuilderModelSource): number {
  switch (source) {
    case "imported":
      return 0;
    case "system":
      return 1;
    case "custom":
      return 2;
    case "fallback":
      return 3;
    default:
      return 99;
  }
}

function getCompatibleProviderVisual(providerNodeType: string | null): ProviderVisual {
  if (providerNodeType === "openai-compatible") {
    return { icon: "api", color: "#10A37F", source: "provider-node" };
  }
  if (providerNodeType === "anthropic-compatible") {
    return { icon: "api", color: "#D97757", source: "provider-node" };
  }
  if (providerNodeType === "anthropic-compatible-cc") {
    return { icon: "smart_toy", color: "#D97757", source: "provider-node" };
  }
  return { icon: "api", color: "#6B7280", source: "provider-node" };
}

function getProviderVisual(
  providerId: string,
  providerNode: ProviderNodeLike | null
): ProviderVisual & { alias: string; providerType: string } {
  const providerEntry = AI_PROVIDERS[providerId];
  if (providerEntry) {
    return {
      alias: providerEntry.alias || providerEntry.id,
      providerType: providerEntry.id,
      icon: providerEntry.icon || "hub",
      color: providerEntry.color || "#6B7280",
      source: "system",
    };
  }

  const providerNodeType = toStringOrNull(providerNode?.type);
  const compatibleVisual = getCompatibleProviderVisual(providerNodeType);
  return {
    alias: toStringOrNull(providerNode?.prefix) || providerId,
    providerType: providerNodeType || providerId,
    ...compatibleVisual,
  };
}

function deriveConnectionStatus(connection: ProviderConnectionLike): BuilderConnectionStatus {
  if (connection.isActive === false) return "inactive";
  const rateLimitedUntil = toNumberOrNull(connection.rateLimitedUntil);
  if (typeof rateLimitedUntil === "number" && rateLimitedUntil > Date.now()) {
    return "rate-limited";
  }
  if (typeof connection.testStatus === "string" && /error|fail/i.test(connection.testStatus)) {
    return "error";
  }
  return "active";
}

/**
 * Expand a list of raw DB connection rows into `ComboBuilderConnectionOption` items.
 *
 * No-auth account providers (opencode, mimocode) pack multiple "accounts" as UUIDs in
 * `providerSpecificData.fingerprints` of a single DB row (#6087). This helper inflates
 * them: each fingerprint becomes a separate option labeled "Account N" with an id of
 * `${rowId}|fp|${fingerprint}` so the combo step can pin a specific account.
 * Rows without fingerprints are converted 1:1 via buildConnectionOption as before.
 */
export function expandConnectionOptions(
  connections: ProviderConnectionLike[]
): ComboBuilderConnectionOption[] {
  const result: ComboBuilderConnectionOption[] = [];
  for (const connection of connections) {
    const fingerprints = Array.isArray(connection.providerSpecificData?.fingerprints)
      ? (connection.providerSpecificData.fingerprints as unknown[]).filter(
          (fp): fp is string => typeof fp === "string" && fp.length > 0
        )
      : [];
    if (fingerprints.length > 0) {
      const baseStatus = deriveConnectionStatus(connection);
      const basePriority = typeof connection.priority === "number" ? connection.priority : 0;
      for (let i = 0; i < fingerprints.length; i++) {
        result.push({
          id: `${toStringOrNull(connection.id) || ""}|fp|${fingerprints[i]}`,
          label: `Account ${i + 1}`,
          type: toStringOrNull(connection.authType) || "unknown",
          status: baseStatus,
          priority: basePriority,
          isActive: connection.isActive !== false,
          defaultModel: toStringOrNull(connection.defaultModel),
          rateLimitedUntil: toNumberOrNull(connection.rateLimitedUntil),
          lastError: toStringOrNull(connection.lastError),
          lastTested: toStringOrNull(connection.lastTested),
        });
      }
    } else {
      const opt = buildConnectionOption(connection);
      if (opt) result.push(opt);
    }
  }
  return result;
}

function buildConnectionOption(
  connection: ProviderConnectionLike
): ComboBuilderConnectionOption | null {
  const id = toStringOrNull(connection.id);
  if (!id) return null;

  return {
    id,
    label: getAccountDisplayName(connection),
    type: toStringOrNull(connection.authType) || "unknown",
    status: deriveConnectionStatus(connection),
    priority: typeof connection.priority === "number" ? connection.priority : 0,
    isActive: connection.isActive !== false,
    defaultModel: toStringOrNull(connection.defaultModel),
    rateLimitedUntil: toNumberOrNull(connection.rateLimitedUntil),
    lastError: toStringOrNull(connection.lastError),
    lastTested: toStringOrNull(connection.lastTested),
  };
}

function addModelOption(
  modelMap: Map<string, ComboBuilderModelOption>,
  providerId: string,
  input: {
    id: string | null;
    name?: string | null;
    source: BuilderModelSource;
    supportedEndpoints?: string[];
    apiFormat?: string | null;
    contextLength?: number | null;
    outputTokenLimit?: number | null;
    supportsThinking?: boolean;
  }
) {
  const modelId = toStringOrNull(input.id);
  if (!modelId) return;
  if (getModelIsHidden(providerId, modelId)) return;

  const nextSourcePriority = getSourcePriority(input.source);
  const existing = modelMap.get(modelId);
  if (!existing) {
    modelMap.set(modelId, {
      id: modelId,
      qualifiedModel: `${providerId}/${modelId}`,
      name: toStringOrNull(input.name) || modelId,
      source: input.source,
      sources: [input.source],
      ...(input.supportedEndpoints && input.supportedEndpoints.length > 0
        ? { supportedEndpoints: input.supportedEndpoints }
        : {}),
      ...(toStringOrNull(input.apiFormat) ? { apiFormat: input.apiFormat || undefined } : {}),
      ...(typeof input.contextLength === "number" ? { contextLength: input.contextLength } : {}),
      ...(typeof input.outputTokenLimit === "number"
        ? { outputTokenLimit: input.outputTokenLimit }
        : {}),
      ...(typeof input.supportsThinking === "boolean"
        ? { supportsThinking: input.supportsThinking }
        : {}),
    });
    return;
  }

  const existingPriority = getSourcePriority(existing.source);
  const mergedSources = new Set<BuilderModelSource>([...existing.sources, input.source]);

  if (nextSourcePriority < existingPriority) {
    existing.source = input.source;
  }
  if (!existing.name || existing.name === existing.id) {
    existing.name = toStringOrNull(input.name) || existing.name;
  }
  if (!existing.supportedEndpoints && input.supportedEndpoints?.length) {
    existing.supportedEndpoints = input.supportedEndpoints;
  }
  if (!existing.apiFormat && toStringOrNull(input.apiFormat)) {
    existing.apiFormat = input.apiFormat || undefined;
  }
  if (existing.contextLength == null && typeof input.contextLength === "number") {
    existing.contextLength = input.contextLength;
  }
  if (existing.outputTokenLimit == null && typeof input.outputTokenLimit === "number") {
    existing.outputTokenLimit = input.outputTokenLimit;
  }
  if (existing.supportsThinking == null && typeof input.supportsThinking === "boolean") {
    existing.supportsThinking = input.supportsThinking;
  }
  existing.sources = Array.from(mergedSources).sort(
    (left, right) => getSourcePriority(left) - getSourcePriority(right)
  );
}

function buildModelOptions(
  providerId: string,
  builtInModels: RegistryModel[],
  syncedModels: SyncedModelLike[],
  customModels: CustomModelLike[]
): Map<string, ComboBuilderModelOption> {
  const modelMap = new Map<string, ComboBuilderModelOption>();
  const fallbackModels = getCompatibleFallbackModels(providerId, builtInModels);

  for (const model of syncedModels) {
    const resolved = getResolvedModelCapabilities({
      provider: providerId,
      model: toStringOrNull(model.id),
    });
    addModelOption(modelMap, providerId, {
      id: toStringOrNull(model.id),
      name: toStringOrNull(model.name),
      source: "imported",
      supportedEndpoints: toStringArray(model.supportedEndpoints),
      contextLength: toNumberOrNull(model.inputTokenLimit) ?? resolved.contextWindow,
      outputTokenLimit: toNumberOrNull(model.outputTokenLimit) ?? resolved.maxOutputTokens,
      supportsThinking:
        typeof model.supportsThinking === "boolean"
          ? model.supportsThinking
          : (resolved.supportsThinking ?? undefined),
    });
  }

  // #8072: expose reasoning-effort variants (e.g. model-high, model-medium)
  // in the Combo Builder picker, matching the catalog/Playground behaviour.
  // Convert synced models with supportedThinkingEfforts into catalog-shaped
  // entries, run the shared appendSyncedEffortVariants utility, and add any
  // new variant ids that aren't already in the model map.
  const catalogShaped = syncedModels
    .filter(
      (m): m is SyncedModelLike & { id: string; supportedThinkingEfforts: string[] } =>
        typeof m.id === "string" &&
        Array.isArray(m.supportedThinkingEfforts) &&
        m.supportedThinkingEfforts.length > 0
    )
    .map((m) => ({
      id: `${providerId}/${m.id}`,
      owned_by: providerId,
      root: m.id,
      name: m.name || m.id,
      capabilities: { effort_tiers: m.supportedThinkingEfforts },
    }));
  if (catalogShaped.length > 0) {
    // Track each tier variant's true base model id (the synced model's own raw,
    // unsuffixed id) directly while iterating tiers here. We can't re-derive the
    // base id from `variant.root` after calling appendSyncedEffortVariants: that
    // utility sets a variant's `root` to `${baseRoot}-${tier}` (still tier-suffixed,
    // see open-sse/utils/syncedEffortVariants.ts), not the base model id, so a
    // lookup keyed on it never matches an entry in modelMap and variants silently
    // fail to inherit contextLength/outputTokenLimit/supportedEndpoints/supportsThinking.
    const baseRawIdByVariantId = new Map<string, string>();
    for (const shaped of catalogShaped) {
      for (const tier of shaped.capabilities.effort_tiers) {
        if (typeof tier === "string" && tier.length > 0) {
          baseRawIdByVariantId.set(`${shaped.id}-${tier}`, shaped.root);
        }
      }
    }

    const withVariants = appendSyncedEffortVariants(catalogShaped);
    for (const variant of withVariants) {
      if (typeof variant.id !== "string") continue;
      // Strip the provider prefix to get the raw model id for the builder
      const rawId = variant.id.startsWith(`${providerId}/`)
        ? variant.id.slice(providerId.length + 1)
        : variant.id;
      if (modelMap.has(rawId)) continue;
      const baseId = baseRawIdByVariantId.get(variant.id) ?? rawId;
      const base = modelMap.get(baseId);
      addModelOption(modelMap, providerId, {
        id: rawId,
        name: base ? `${base.name} (${rawId.slice(baseId.length + 1)})` : rawId,
        source: "imported",
        supportedEndpoints: base?.supportedEndpoints,
        contextLength: base?.contextLength ?? null,
        outputTokenLimit: base?.outputTokenLimit ?? null,
        supportsThinking: base?.supportsThinking,
      });
    }
  }

  for (const model of builtInModels) {
    const resolved = getResolvedModelCapabilities({
      provider: providerId,
      model: toStringOrNull(model.id),
    });
    addModelOption(modelMap, providerId, {
      id: toStringOrNull(model.id),
      name: toStringOrNull(model.name),
      source: "system",
      contextLength: toNumberOrNull(model.contextLength) ?? resolved.contextWindow,
      outputTokenLimit: resolved.maxOutputTokens,
      supportsThinking: resolved.supportsThinking ?? undefined,
    });
  }

  for (const model of customModels) {
    if (model.isHidden === true) continue;
    const source = ["api-sync", "auto-sync", "imported"].includes(
      toStringOrNull(model.source)?.toLowerCase() || ""
    )
      ? "imported"
      : ("custom" as BuilderModelSource);
    const resolved = getResolvedModelCapabilities({
      provider: providerId,
      model: toStringOrNull(model.id),
    });
    addModelOption(modelMap, providerId, {
      id: toStringOrNull(model.id),
      name: toStringOrNull(model.name),
      source,
      supportedEndpoints: toStringArray(model.supportedEndpoints),
      apiFormat: toStringOrNull(model.apiFormat),
      contextLength: toNumberOrNull(model.inputTokenLimit) ?? resolved.contextWindow,
      outputTokenLimit: toNumberOrNull(model.outputTokenLimit) ?? resolved.maxOutputTokens,
      supportsThinking:
        typeof model.supportsThinking === "boolean"
          ? model.supportsThinking
          : (resolved.supportsThinking ?? undefined),
    });
  }

  if (Array.isArray(fallbackModels)) {
    for (const model of fallbackModels) {
      const resolved = getResolvedModelCapabilities({
        provider: providerId,
        model: toStringOrNull(model.id),
      });
      addModelOption(modelMap, providerId, {
        id: toStringOrNull(model.id),
        name: toStringOrNull(model.name),
        source: "fallback",
        contextLength:
          typeof (model as { contextLength?: number }).contextLength === "number"
            ? (model as { contextLength?: number }).contextLength || null
            : resolved.contextWindow,
        outputTokenLimit: resolved.maxOutputTokens,
        supportsThinking: resolved.supportsThinking ?? undefined,
      });
    }
  }

  disambiguateCollidingModelNames(modelMap);
  return modelMap;
}

/**
 * #6957: some providers' own catalogs assign the identical display `name` to
 * several distinct model ids (e.g. Mistral's "codestral-latest" alias renders
 * under the same upstream name as its base "codestral-2508" model). Since the
 * builder picker renders `model.name` as the visible option text, two colliding
 * names make genuinely different models look like duplicates and hide aliases.
 * Run this after all merge loops have populated `modelMap`: for any name shared
 * by 2+ distinct ids, fall back every entry in that group to its own `id` as the
 * display name (display-only — `id`/`qualifiedModel` used for routing untouched).
 */
function disambiguateCollidingModelNames(modelMap: Map<string, ComboBuilderModelOption>): void {
  const idsByName = new Map<string, string[]>();
  for (const option of modelMap.values()) {
    const bucket = idsByName.get(option.name) || [];
    bucket.push(option.id);
    idsByName.set(option.name, bucket);
  }
  for (const [name, ids] of idsByName) {
    if (ids.length < 2) continue;
    for (const id of ids) {
      const option = modelMap.get(id);
      if (option && option.name === name) option.name = option.id;
    }
  }
}

function compareConnections(
  left: ComboBuilderConnectionOption,
  right: ComboBuilderConnectionOption
): number {
  if (left.isActive !== right.isActive) return left.isActive ? -1 : 1;
  if (left.priority !== right.priority) return left.priority - right.priority;
  return left.label.localeCompare(right.label, undefined, { sensitivity: "base" });
}

function compareModels(left: ComboBuilderModelOption, right: ComboBuilderModelOption): number {
  const sourceDelta = getSourcePriority(left.source) - getSourcePriority(right.source);
  if (sourceDelta !== 0) return sourceDelta;
  const nameDelta = left.name.localeCompare(right.name, undefined, { sensitivity: "base" });
  if (nameDelta !== 0) return nameDelta;
  return left.id.localeCompare(right.id, undefined, { sensitivity: "base" });
}

function compareProviders(
  left: ComboBuilderProviderOption,
  right: ComboBuilderProviderOption
): number {
  if (left.activeConnectionCount !== right.activeConnectionCount) {
    return right.activeConnectionCount - left.activeConnectionCount;
  }
  return left.displayName.localeCompare(right.displayName, undefined, { sensitivity: "base" });
}

function normalizeCustomModels(raw: unknown): CustomModelLike[] {
  return Array.isArray(raw)
    ? raw.filter(
        (model): model is CustomModelLike =>
          Boolean(model) && typeof model === "object" && !Array.isArray(model)
      )
    : [];
}

function normalizeSyncedModels(raw: unknown): SyncedModelLike[] {
  return Array.isArray(raw)
    ? raw.filter(
        (model): model is SyncedModelLike =>
          Boolean(model) && typeof model === "object" && !Array.isArray(model)
      )
    : [];
}

export async function getComboBuilderOptions(): Promise<ComboBuilderOptionsPayload> {
  getSyncedCapabilities();
  const [connections, providerNodes, customModelsMap, syncedModelsMap, combos, settings] =
    await Promise.all([
      getProviderConnections(),
      getProviderNodes(),
      getAllCustomModels(),
      getAllSyncedAvailableModels(),
      getCombos(),
      getSettings().catch(() => ({}) as Record<string, unknown>),
    ]);
  const blockedProviders = new Set(
    Array.isArray((settings as Record<string, unknown>).blockedProviders)
      ? ((settings as Record<string, unknown>).blockedProviders as string[])
      : []
  );

  const providerNodeMap = new Map<string, ProviderNodeLike>();
  for (const providerNode of providerNodes as ProviderNodeLike[]) {
    const providerId = toStringOrNull(providerNode.id);
    if (!providerId) continue;
    providerNodeMap.set(providerId, providerNode);
  }

  const connectionsByProvider = new Map<string, ProviderConnectionLike[]>();
  for (const connection of connections as ProviderConnectionLike[]) {
    const providerId = toStringOrNull(connection.provider);
    if (!providerId) continue;
    const list = connectionsByProvider.get(providerId) || [];
    list.push(connection);
    connectionsByProvider.set(providerId, list);
  }

  const providers: ComboBuilderProviderOption[] = [];

  for (const [providerId, providerConnections] of connectionsByProvider) {
    const providerNode = providerNodeMap.get(providerId) || null;
    const providerVisual = getProviderVisual(providerId, providerNode);
    const builtInModels = getModelsByProviderId(providerId);
    const syncedModels = normalizeSyncedModels(
      (syncedModelsMap as Record<string, unknown>)[providerId]
    );
    const customModels = normalizeCustomModels(
      (customModelsMap as Record<string, unknown>)[providerId]
    );
    const acceptsArbitraryModel =
      Boolean((AI_PROVIDERS[providerId] as JsonRecord | undefined)?.passthroughModels) ||
      isOpenAICompatibleProvider(providerId) ||
      isAnthropicCompatibleProvider(providerId) ||
      isClaudeCodeCompatibleProvider(providerId);
    const modelMap = buildModelOptions(
      providerId,
      builtInModels as RegistryModel[],
      syncedModels,
      customModels
    );

    const normalizedConnections =
      expandConnectionOptions(providerConnections).sort(compareConnections);

    const activeConnectionCount = normalizedConnections.filter(
      (connection) => connection.isActive
    ).length;
    const displayName = (providerEntryName(providerId) ||
      getProviderDisplayName(providerId, providerNode) ||
      providerId) as string;

    providers.push({
      providerId,
      providerType: providerVisual.providerType,
      displayName,
      alias: providerVisual.alias,
      prefix: toStringOrNull(providerNode?.prefix),
      icon: providerVisual.icon,
      color: providerVisual.color,
      source: providerVisual.source,
      acceptsArbitraryModel,
      connectionCount: normalizedConnections.length,
      activeConnectionCount,
      modelCount: modelMap.size,
      connections: normalizedConnections,
      models: Array.from(modelMap.values()).sort(compareModels),
    });
  }

  // No-auth providers have no rows in provider_connections, so they are never included in the
  // connectionsByProvider loop above. Add them unless the provider is explicitly blocked.
  for (const noAuthProvider of Object.values(NOAUTH_PROVIDERS)) {
    const providerId = noAuthProvider.id;
    if (
      blockedProviders.has(providerId) ||
      (typeof noAuthProvider.alias === "string" && blockedProviders.has(noAuthProvider.alias))
    )
      continue;
    // Skip if already covered (defensive: shouldn't happen for true no-auth providers)
    if (connectionsByProvider.has(providerId)) continue;

    const providerVisual = getProviderVisual(providerId, null);
    const builtInModels = getModelsByProviderId(providerId);
    const syncedModels = normalizeSyncedModels(
      (syncedModelsMap as Record<string, unknown>)[providerId]
    );
    const customModels = normalizeCustomModels(
      (customModelsMap as Record<string, unknown>)[providerId]
    );
    const acceptsArbitraryModel =
      Boolean((AI_PROVIDERS[providerId] as JsonRecord | undefined)?.passthroughModels) ||
      isOpenAICompatibleProvider(providerId) ||
      isAnthropicCompatibleProvider(providerId) ||
      isClaudeCodeCompatibleProvider(providerId);
    const modelMap = buildModelOptions(
      providerId,
      builtInModels as RegistryModel[],
      syncedModels,
      customModels
    );

    // #2901: no-auth providers must route under their alias (e.g. "oc"), not
    // their id — "opencode/<model>" misroutes to the opencode-zen api-key tier
    // (manual ALIAS_TO_PROVIDER_ID override), while "oc/<model>" resolves to the
    // no-auth "opencode" provider. Rewrite qualifiedModel to the alias prefix.
    const routingPrefix = noAuthProvider.alias || providerId;
    if (routingPrefix !== providerId) {
      for (const opt of modelMap.values()) {
        opt.qualifiedModel = `${routingPrefix}/${opt.id}`;
      }
    }

    const displayName = (providerEntryName(providerId) ||
      getProviderDisplayName(providerId, null) ||
      providerId) as string;

    providers.push({
      providerId,
      providerType: providerVisual.providerType,
      displayName,
      alias: providerVisual.alias,
      prefix: null,
      icon: providerVisual.icon,
      color: providerVisual.color,
      source: providerVisual.source,
      acceptsArbitraryModel,
      connectionCount: 0,
      activeConnectionCount: 0,
      modelCount: modelMap.size,
      connections: [],
      models: Array.from(modelMap.values()).sort(compareModels),
    });
  }

  const comboRefs = (combos as JsonRecord[])
    .filter((combo) => combo.isHidden !== true && combo.isActive !== false)
    .map((combo) => ({
      id: toStringOrNull(combo.id) || toStringOrNull(combo.name) || "combo",
      name: toStringOrNull(combo.name) || "combo",
      strategy: toStringOrNull(combo.strategy) || "priority",
      stepCount: Array.isArray(combo.models) ? combo.models.length : 0,
      version: typeof combo.version === "number" ? combo.version : 2,
      ...(typeof combo.sortOrder === "number" ? { sortOrder: combo.sortOrder } : {}),
    }))
    .sort((left, right) => {
      const leftSort =
        typeof left.sortOrder === "number" ? left.sortOrder : Number.MAX_SAFE_INTEGER;
      const rightSort =
        typeof right.sortOrder === "number" ? right.sortOrder : Number.MAX_SAFE_INTEGER;
      if (leftSort !== rightSort) return leftSort - rightSort;
      return left.name.localeCompare(right.name, undefined, { sensitivity: "base" });
    });

  return {
    schemaVersion: 2,
    generatedAt: new Date().toISOString(),
    providers: providers.sort(compareProviders),
    comboRefs,
  };
}

function providerEntryName(providerId: string): string | null {
  const providerEntry = AI_PROVIDERS[providerId] as { name?: string } | undefined;
  return toStringOrNull(providerEntry?.name);
}
