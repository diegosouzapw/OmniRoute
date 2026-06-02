import { randomUUID } from "node:crypto";
import { parseModel } from "@omniroute/open-sse/services/model.ts";
import { getModelInfo } from "@/sse/services/model";
import { getModelAliases } from "@/lib/db/models";
import { getResolvedModelCapabilities } from "@/lib/modelCapabilities";
import {
  getModelSpec,
  resolveModelAlias as resolveStaticModelAlias,
} from "@/shared/constants/modelSpecs";
import { AI_PROVIDERS } from "@/shared/constants/providers";
import { PROVIDER_ID_TO_ALIAS, PROVIDER_MODELS } from "@/shared/constants/models";
import { getSyncStatus, getSyncedCapability } from "@/lib/modelsDevSync";

const MODEL_METADATA_SCHEMA_VERSION = "model-metadata-v1";

export const MODEL_ALIAS_AMBIGUOUS = "MODEL_ALIAS_AMBIGUOUS";
export const MODEL_NOT_MAPPED = "MODEL_NOT_MAPPED";
export const INTERNAL_PROXY_ERROR = "INTERNAL_PROXY_ERROR";

type JsonRecord = Record<string, unknown>;

interface CatalogDiagnosticsOptions {
  request?: Request | null;
  requestId?: string | null;
  resolvedAlias?: string | null;
}

export interface CanonicalModelMetadata {
  provider: string | null;
  providerAlias: string | null;
  providerLabel: string | null;
  model: string;
  qualifiedId: string | null;
  displayName: string;
  aliases: string[];
  capabilities: {
    toolCalling: boolean;
    reasoning: boolean;
    supportsThinking: boolean | null;
    supportsTools: boolean | null;
    vision: boolean | null;
    attachment: boolean | null;
    structuredOutput: boolean | null;
    temperature: boolean | null;
  };
  limits: {
    contextWindow: number | null;
    maxInputTokens: number | null;
    maxOutputTokens: number;
    defaultThinkingBudget: number;
    thinkingBudgetCap: number | null;
    thinkingOverhead: number | null;
    adaptiveMaxTokens: number | null;
  };
  metadata: {
    family: string | null;
    status: string | null;
    knowledgeCutoff: string | null;
    releaseDate: string | null;
    lastUpdated: string | null;
    openWeights: boolean | null;
    source: {
      providerRegistry: boolean;
      staticSpec: boolean;
      syncedCapability: boolean;
    };
  };
  modalities: {
    input: string[];
    output: string[];
    interleavedField: string | null;
  };
}

export interface ResolvedAliasLookup {
  alias: string;
  resolvedAlias: string;
  source: "stored_alias" | "direct_model" | "catalog_match";
  provider: string;
  providerAlias: string;
  model: string;
  target: unknown;
  metadata: CanonicalModelMetadata;
}

export interface AliasResolutionError {
  status: number;
  code: string;
  message: string;
  candidates?: string[];
}

function asNonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function uniqueStrings(values: Array<string | null | undefined>) {
  return [
    ...new Set(values.filter((value): value is string => Boolean(value && value.length > 0))),
  ];
}

function toQualifiedId(
  providerAlias: string | null,
  provider: string | null,
  model: string | null
) {
  if (!model) return null;
  if (providerAlias) return `${providerAlias}/${model}`;
  if (provider) return `${provider}/${model}`;
  return model;
}

function getRegistryModel(providerOrAlias: string | null, modelId: string | null) {
  if (!providerOrAlias || !modelId) return null;
  const alias = PROVIDER_ID_TO_ALIAS[providerOrAlias] || providerOrAlias;
  const models = PROVIDER_MODELS[alias] || PROVIDER_MODELS[providerOrAlias] || [];
  return models.find((entry) => entry?.id === modelId) || null;
}

function buildModalities(
  input: string[],
  output: string[],
  supportsVision: boolean | null
): { input: string[]; output: string[] } {
  if (input.length > 0 || output.length > 0) {
    return { input, output };
  }
  if (supportsVision) {
    return { input: ["text", "image"], output: ["text"] };
  }
  return { input: [], output: [] };
}

function extractCandidateMatches(modelId: string) {
  const matches: Array<{ provider: string; providerAlias: string; model: string }> = [];
  for (const [providerAlias, models] of Object.entries(PROVIDER_MODELS)) {
    for (const entry of models || []) {
      if (entry?.id !== modelId) continue;
      const providerId =
        Object.entries(PROVIDER_ID_TO_ALIAS).find(([, alias]) => alias === providerAlias)?.[0] ||
        providerAlias;
      matches.push({
        provider: providerId,
        providerAlias: PROVIDER_ID_TO_ALIAS[providerId] || providerAlias,
        model: entry.id,
      });
    }
  }
  return matches;
}

function getResolvedRequestId(request?: Request | null, requestId?: string | null) {
  const incomingId =
    asNonEmptyString(requestId) || asNonEmptyString(request?.headers.get("x-request-id"));
  return incomingId || randomUUID();
}

export function getModelCatalogVersion() {
  const syncStatus = getSyncStatus();
  return syncStatus.lastSync
    ? `${MODEL_METADATA_SCHEMA_VERSION}:${syncStatus.lastSync}`
    : `${MODEL_METADATA_SCHEMA_VERSION}:static`;
}

export function getCatalogDiagnosticsHeaders(
  options: CatalogDiagnosticsOptions = {}
): Record<string, string> {
  const resolvedRequestId = getResolvedRequestId(options.request, options.requestId);
  return {
    "X-Request-Id": resolvedRequestId,
    "X-Model-Catalog-Version": getModelCatalogVersion(),
    ...(options.resolvedAlias ? { "X-Model-Alias-Resolved": options.resolvedAlias } : {}),
  };
}

export function getCanonicalModelMetadata(input: {
  provider?: string | null;
  model?: string | null;
}): CanonicalModelMetadata | null {
  const modelId = asNonEmptyString(input.model);
  if (!modelId) return null;

  const resolved = getResolvedModelCapabilities({
    provider: input.provider || null,
    model: modelId,
  });
  const provider = resolved.provider;
  const providerAlias = provider ? PROVIDER_ID_TO_ALIAS[provider] || provider : null;
  const registryModel = getRegistryModel(providerAlias || provider, resolved.model || modelId);
  const staticSpec = getModelSpec(resolved.model || modelId);
  const syncedCapability =
    provider && resolved.model ? getSyncedCapability(provider, resolved.model) : null;
  const canonicalStaticAlias = resolveStaticModelAlias(resolved.model || modelId);
  const modalities = buildModalities(
    resolved.modalitiesInput,
    resolved.modalitiesOutput,
    resolved.supportsVision
  );

  return {
    provider,
    providerAlias,
    providerLabel:
      (provider && (AI_PROVIDERS as Record<string, JsonRecord>)[provider]?.name?.toString()) ||
      null,
    model: resolved.model || modelId,
    qualifiedId: toQualifiedId(providerAlias, provider, resolved.model || modelId),
    displayName: registryModel?.name || resolved.model || modelId,
    aliases: uniqueStrings([
      canonicalStaticAlias !== (resolved.model || modelId) ? canonicalStaticAlias : null,
      ...(staticSpec?.aliases || []),
    ]),
    capabilities: {
      toolCalling: resolved.toolCalling,
      reasoning: resolved.reasoning,
      supportsThinking: resolved.supportsThinking,
      supportsTools: resolved.supportsTools,
      vision: resolved.supportsVision,
      attachment: resolved.attachment,
      structuredOutput: resolved.structuredOutput,
      temperature: resolved.temperature,
    },
    limits: {
      contextWindow: resolved.contextWindow,
      maxInputTokens: resolved.maxInputTokens,
      maxOutputTokens: resolved.maxOutputTokens,
      defaultThinkingBudget: resolved.defaultThinkingBudget,
      thinkingBudgetCap: resolved.thinkingBudgetCap,
      thinkingOverhead: resolved.thinkingOverhead,
      adaptiveMaxTokens: resolved.adaptiveMaxTokens,
    },
    metadata: {
      family: resolved.family,
      status: resolved.status,
      knowledgeCutoff: resolved.knowledgeCutoff,
      releaseDate: resolved.releaseDate,
      lastUpdated: resolved.lastUpdated,
      openWeights: resolved.openWeights,
      source: {
        providerRegistry: Boolean(registryModel),
        staticSpec: Boolean(staticSpec),
        syncedCapability: Boolean(syncedCapability),
      },
    },
    modalities: {
      input: modalities.input,
      output: modalities.output,
      interleavedField: resolved.interleavedField,
    },
  };
}

export function enrichCatalogModelEntry<T extends JsonRecord>(
  entry: T,
  input?: { provider?: string | null; model?: string | null }
): T {
  const provider =
    input?.provider ||
    (typeof entry.owned_by === "string" && entry.owned_by !== "combo" ? entry.owned_by : null);
  const model =
    input?.model ||
    asNonEmptyString(entry.root) ||
    (() => {
      const id = asNonEmptyString(entry.id);
      if (!id) return null;
      if (id.includes("/")) return id.slice(id.indexOf("/") + 1);
      return id;
    })();

  const metadata = getCanonicalModelMetadata({ provider, model });
  if (!metadata) return entry;

  const nextEntry: JsonRecord = { ...entry };
  const existingName = asNonEmptyString(entry.name);
  const capabilityFields = {
    ...(typeof metadata.capabilities.vision === "boolean"
      ? { vision: metadata.capabilities.vision }
      : {}),
    tool_calling: metadata.capabilities.toolCalling,
    reasoning: metadata.capabilities.reasoning,
    ...(typeof metadata.capabilities.supportsThinking === "boolean"
      ? { thinking: metadata.capabilities.supportsThinking }
      : {}),
    ...(typeof metadata.capabilities.attachment === "boolean"
      ? { attachment: metadata.capabilities.attachment }
      : {}),
    ...(typeof metadata.capabilities.structuredOutput === "boolean"
      ? { structured_output: metadata.capabilities.structuredOutput }
      : {}),
    ...(typeof metadata.capabilities.temperature === "boolean"
      ? { temperature: metadata.capabilities.temperature }
      : {}),
  };

  nextEntry.capabilities = {
    ...(entry.capabilities && typeof entry.capabilities === "object"
      ? (entry.capabilities as JsonRecord)
      : {}),
    ...capabilityFields,
  };

  if (!Array.isArray(entry.input_modalities) && metadata.modalities.input.length > 0) {
    nextEntry.input_modalities = metadata.modalities.input;
  }

  if (!Array.isArray(entry.output_modalities) && metadata.modalities.output.length > 0) {
    nextEntry.output_modalities = metadata.modalities.output;
  }

  if (
    typeof nextEntry.context_length !== "number" &&
    typeof metadata.limits.contextWindow === "number"
  ) {
    nextEntry.context_length = metadata.limits.contextWindow;
  }

  if (typeof metadata.limits.maxOutputTokens === "number" && metadata.limits.maxOutputTokens > 0) {
    nextEntry.max_output_tokens = metadata.limits.maxOutputTokens;
  }

  if (typeof metadata.limits.maxInputTokens === "number") {
    nextEntry.max_input_tokens = metadata.limits.maxInputTokens;
  }

  if (metadata.metadata.family) nextEntry.family = metadata.metadata.family;
  if (metadata.metadata.status) nextEntry.status = metadata.metadata.status;
  if (metadata.metadata.knowledgeCutoff)
    nextEntry.knowledge_cutoff = metadata.metadata.knowledgeCutoff;
  if (metadata.metadata.releaseDate) nextEntry.release_date = metadata.metadata.releaseDate;
  if (metadata.metadata.lastUpdated) nextEntry.last_updated = metadata.metadata.lastUpdated;
  if (typeof metadata.metadata.openWeights === "boolean") {
    nextEntry.open_weights = metadata.metadata.openWeights;
  }
  if (!existingName && metadata.displayName) {
    nextEntry.name = metadata.displayName;
  }

  return nextEntry as T;
}

function buildAliasCandidates(alias: string) {
  const parsed = parseModel(alias);
  const modelId = asNonEmptyString(parsed.model) || asNonEmptyString(alias);
  if (!modelId) return [];
  const canonicalModel = resolveStaticModelAlias(modelId);
  const candidateModelIds = uniqueStrings([modelId, canonicalModel]);
  const candidates = new Map<string, { provider: string; providerAlias: string; model: string }>();

  for (const candidateModelId of candidateModelIds) {
    for (const match of extractCandidateMatches(candidateModelId)) {
      candidates.set(`${match.provider}/${match.model}`, match);
    }
  }

  return [...candidates.values()];
}

function normalizeAliasCandidates(candidates: string[] | undefined) {
  return uniqueStrings(
    (candidates || []).map((candidate) => {
      const parsed = parseModel(candidate);
      if (!parsed.provider || !parsed.model) return candidate;
      const providerAlias = PROVIDER_ID_TO_ALIAS[parsed.provider] || parsed.provider;
      return `${providerAlias}/${parsed.model}`;
    })
  );
}

export async function resolveModelAliasLookup(
  alias: string
): Promise<{ ok: true; value: ResolvedAliasLookup } | { ok: false; error: AliasResolutionError }> {
  const normalizedAlias = asNonEmptyString(alias);
  if (!normalizedAlias) {
    return {
      ok: false,
      error: {
        status: 400,
        code: MODEL_NOT_MAPPED,
        message: "Alias is required",
      },
    };
  }

  const aliases = await getModelAliases();
  const explicitTarget = aliases[normalizedAlias];

  if (explicitTarget !== undefined) {
    const modelInfo = await getModelInfo(normalizedAlias);
    if (!modelInfo.provider || !modelInfo.model) {
      const candidates = normalizeAliasCandidates(
        (modelInfo as JsonRecord).candidateAliases as string[]
      );
      return {
        ok: false,
        error: {
          status: 409,
          code: MODEL_ALIAS_AMBIGUOUS,
          message:
            (modelInfo as JsonRecord).errorMessage?.toString() ||
            `Alias '${normalizedAlias}' is ambiguous.`,
          ...(candidates.length > 0 ? { candidates } : {}),
        },
      };
    }

    const providerAlias = PROVIDER_ID_TO_ALIAS[modelInfo.provider] || modelInfo.provider;
    return {
      ok: true,
      value: {
        alias: normalizedAlias,
        resolvedAlias: `${providerAlias}/${modelInfo.model}`,
        source: "stored_alias",
        provider: modelInfo.provider,
        providerAlias,
        model: modelInfo.model,
        target: explicitTarget,
        metadata: getCanonicalModelMetadata({
          provider: modelInfo.provider,
          model: modelInfo.model,
        })!,
      },
    };
  }

  const parsed = parseModel(normalizedAlias);
  if (parsed.provider && parsed.model) {
    const modelInfo = await getModelInfo(normalizedAlias);
    if (!modelInfo.provider || !modelInfo.model) {
      return {
        ok: false,
        error: {
          status: 404,
          code: MODEL_NOT_MAPPED,
          message: `Model '${normalizedAlias}' is not mapped.`,
        },
      };
    }

    const providerAlias = PROVIDER_ID_TO_ALIAS[modelInfo.provider] || modelInfo.provider;
    return {
      ok: true,
      value: {
        alias: normalizedAlias,
        resolvedAlias: `${providerAlias}/${modelInfo.model}`,
        source: "direct_model",
        provider: modelInfo.provider,
        providerAlias,
        model: modelInfo.model,
        target: `${providerAlias}/${modelInfo.model}`,
        metadata: getCanonicalModelMetadata({
          provider: modelInfo.provider,
          model: modelInfo.model,
        })!,
      },
    };
  }

  const candidates = buildAliasCandidates(normalizedAlias);
  if (candidates.length === 0) {
    return {
      ok: false,
      error: {
        status: 404,
        code: MODEL_NOT_MAPPED,
        message: `Alias '${normalizedAlias}' is not mapped.`,
      },
    };
  }

  if (candidates.length > 1) {
    return {
      ok: false,
      error: {
        status: 409,
        code: MODEL_ALIAS_AMBIGUOUS,
        message: `Alias '${normalizedAlias}' is ambiguous. Use provider/model prefix.`,
        candidates: candidates.map((candidate) => `${candidate.providerAlias}/${candidate.model}`),
      },
    };
  }

  const match = candidates[0];
  const metadata = getCanonicalModelMetadata({
    provider: match.provider,
    model: match.model,
  });

  return {
    ok: true,
    value: {
      alias: normalizedAlias,
      resolvedAlias: `${match.providerAlias}/${match.model}`,
      source: "catalog_match",
      provider: match.provider,
      providerAlias: match.providerAlias,
      model: match.model,
      target: `${match.providerAlias}/${match.model}`,
      metadata: metadata!,
    },
  };
}
