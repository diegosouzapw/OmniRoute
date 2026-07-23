import { getUnifiedModelsResponse } from "@/app/api/v1/models/catalog";
import { getCanonicalModelMetadata } from "@/lib/modelMetadataRegistry";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import {
  buildReasoningConfigSchema,
  buildSupportedReasoningEfforts,
  getDefaultReasoningEffort,
  getReasoningEffortValues,
  inferSelectedReasoningEffort,
  type VscodeCatalogModel,
} from "@/app/api/v1/vscode/[token]/reasoningMetadata";
import { getVscodeModelDisplayName } from "@/app/api/v1/vscode/[token]/modelPresentation";
import {
  expandVscodeServiceTierModels,
  parseVscodeServiceTierVariantModelId,
} from "@/app/api/v1/vscode/[token]/serviceTierVariants";
import { getFamilyFirstModelCandidates, getFamilyFirstPublishedModelId } from "@/app/api/v1/vscode/[token]/familyFirstModelIds";
import { withPathTokenApiKey } from "@/app/api/v1/vscode/[token]/tokenizedRequest";

type OpenAiCatalogModel = {
  id?: string;
  name?: string;
  root?: string;
  parent?: string | null;
  owned_by?: string;
  type?: string;
  api_format?: string;
  context_length?: number;
  max_output_tokens?: number;
  capabilities?: Record<string, boolean>;
  input_modalities?: string[];
  output_modalities?: string[];
  supported_endpoints?: string[];
};

function isUsableChatModel(model: OpenAiCatalogModel) {
  if (typeof model.owned_by === "string" && model.owned_by.trim().toLowerCase() === "combo") {
    return false;
  }
  if (typeof model.parent === "string" && model.parent.length > 0) return false;
  if (typeof model.type === "string" && model.type !== "chat") return false;

  const apiFormat = typeof model.api_format === "string" ? model.api_format : "chat-completions";
  if (apiFormat !== "chat-completions") return false;

  if (
    Array.isArray(model.supported_endpoints) &&
    model.supported_endpoints.length > 0 &&
    !model.supported_endpoints.includes("chat")
  ) {
    return false;
  }

  if (
    Array.isArray(model.output_modalities) &&
    model.output_modalities.length > 0 &&
    !model.output_modalities.includes("text")
  ) {
    return false;
  }

  return true;
}

function getCatalogModelId(model: OpenAiCatalogModel) {
  return model.id || model.name || model.root || "unknown";
}

function normalizeArchitectureKey(value: string) {
  const normalized = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "");
  return normalized || "model";
}

function normalizeArchitectureSource(value: string) {
  const normalized = value.trim().toLowerCase();
  if (normalized === "cx") return "codex";
  if (normalized === "gh") return "github";
  return value;
}

function getRequestedModelName(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;
  const candidate = record.name ?? record.model;
  return typeof candidate === "string" && candidate.trim().length > 0 ? candidate.trim() : null;
}

function getOllamaModelFamily(model: OpenAiCatalogModel, canonicalFamily?: string | null) {
  const rawModelId = getCatalogModelId(model).trim();
  const { baseModelId } = parseVscodeServiceTierVariantModelId(rawModelId);
  const modelFamily = baseModelId.includes("/") ? baseModelId.split("/").slice(1).join("/") : baseModelId;

  if (modelFamily) {
    return modelFamily;
  }

  if (canonicalFamily && canonicalFamily.trim().length > 0) {
    return canonicalFamily.trim();
  }

  return typeof model.owned_by === "string" && model.owned_by.trim().length > 0
    ? model.owned_by.trim()
    : "omniroute";
}

function matchesRequestedModel(model: OpenAiCatalogModel, requestedName: string): boolean {
  const canonicalMetadata = getCanonicalModelMetadata({
    provider: model.owned_by || null,
    model: model.root || model.id || model.name || null,
  });
  const family = getOllamaModelFamily(model, canonicalMetadata?.metadata.family || null);
  const actualModelId = getCatalogModelId(model);

  return [
    model.id,
    model.name,
    model.root,
    canonicalMetadata?.qualifiedId,
    canonicalMetadata?.model,
    ...getFamilyFirstModelCandidates(actualModelId, family),
  ].some((value) => value === requestedName);
}

function buildCapabilities(model: OpenAiCatalogModel): string[] {
  const capabilities = ["completion"];
  if (model.capabilities?.vision) capabilities.push("vision");
  if (model.capabilities?.tool_calling) capabilities.push("tools");
  if (model.capabilities?.reasoning || model.capabilities?.thinking) capabilities.push("thinking");
  return capabilities;
}

function buildShowPayload(model: OpenAiCatalogModel, responseModelId?: string) {
  const actualModelId = getCatalogModelId(model);
  const displayName = getVscodeModelDisplayName(model);
  const canonicalMetadata = getCanonicalModelMetadata({
    provider: model.owned_by || null,
    model: model.root || model.id || model.name || null,
  });
  const family = getOllamaModelFamily(model, canonicalMetadata?.metadata.family || null);
  const modelId = responseModelId || getFamilyFirstPublishedModelId(actualModelId, family);
  const architectureSource =
    normalizeArchitectureSource(
      canonicalMetadata?.providerAlias || canonicalMetadata?.provider || model.owned_by || family || "model"
    );
  const architecture = normalizeArchitectureKey(
    architectureSource
  );
  const reasoningEffortValues = getReasoningEffortValues(model as VscodeCatalogModel);
  const selectedReasoningEffort = reasoningEffortValues
    ? inferSelectedReasoningEffort(model as VscodeCatalogModel, reasoningEffortValues) || "none"
    : undefined;
  const defaultReasoningEffort = reasoningEffortValues
    ? getDefaultReasoningEffort(model as VscodeCatalogModel, reasoningEffortValues)
    : undefined;
  const supportedReasoningEfforts =
    reasoningEffortValues && reasoningEffortValues.length > 0
      ? buildSupportedReasoningEfforts(reasoningEffortValues)
      : undefined;
  const configSchema =
    reasoningEffortValues && defaultReasoningEffort
      ? buildReasoningConfigSchema(reasoningEffortValues, defaultReasoningEffort)
      : undefined;
  let modelCapabilities = model.capabilities ? { ...model.capabilities } : undefined;

  if (reasoningEffortValues) {
    modelCapabilities = modelCapabilities || {};
    Object.assign(modelCapabilities, {
      reasoning: true,
      thinking: true,
      supports_reasoning_effort: reasoningEffortValues,
      supportsReasoningEffort: reasoningEffortValues,
      supportedReasoningEfforts,
      defaultReasoningEffort,
      selected_reasoning_effort: selectedReasoningEffort,
      selectedReasoningEffort: selectedReasoningEffort,
      ...(configSchema ? { configurationSchema: configSchema } : {}),
      ...(configSchema ? { configSchema } : {}),
    });
  }

  return {
    model: modelId,
    remote_model: displayName,
    ...(reasoningEffortValues
      ? {
          supports_reasoning_effort: reasoningEffortValues,
          supportsReasoningEffort: reasoningEffortValues,
          supportedReasoningEfforts,
          defaultReasoningEffort,
          selected_reasoning_effort: selectedReasoningEffort,
          selectedReasoningEffort: selectedReasoningEffort,
          ...(configSchema ? { configurationSchema: configSchema } : {}),
          ...(configSchema ? { configSchema } : {}),
        }
      : {}),
    license: "proprietary",
    modelfile: `FROM ${modelId}`,
    parameters: "",
    template: "",
    details: {
      parent_model: model.root || actualModelId || "",
      format: "openai",
      family,
      families: [family],
      parameter_size: "unknown",
      quantization_level: "dynamic",
      ...(reasoningEffortValues
        ? {
            supports_reasoning_effort: reasoningEffortValues,
            supportsReasoningEffort: reasoningEffortValues,
            supportedReasoningEfforts,
            defaultReasoningEffort,
            selected_reasoning_effort: selectedReasoningEffort,
            selectedReasoningEffort: selectedReasoningEffort,
            ...(configSchema ? { configurationSchema: configSchema } : {}),
            ...(configSchema ? { configSchema } : {}),
          }
        : {}),
    },
    model_info: {
      "general.architecture": architecture,
      "general.basename": displayName,
      ...(typeof model.context_length === "number" ? { context_length: model.context_length } : {}),
      ...(typeof model.context_length === "number"
        ? { [`${architecture}.context_length`]: model.context_length }
        : {}),
      ...(typeof model.max_output_tokens === "number"
        ? { max_output_tokens: model.max_output_tokens }
        : {}),
      ...(Array.isArray(model.input_modalities)
        ? { input_modalities: model.input_modalities }
        : {}),
      ...(Array.isArray(model.output_modalities)
        ? { output_modalities: model.output_modalities }
        : {}),
      ...(Array.isArray(model.supported_endpoints)
        ? { supported_endpoints: model.supported_endpoints }
        : {}),
      ...(modelCapabilities ? { capabilities: modelCapabilities } : {}),
      ...(reasoningEffortValues
        ? {
            supports_reasoning_effort: reasoningEffortValues,
            supportsReasoningEffort: reasoningEffortValues,
            supportedReasoningEfforts,
            defaultReasoningEffort,
            selected_reasoning_effort: selectedReasoningEffort,
            selectedReasoningEffort: selectedReasoningEffort,
            ...(configSchema ? { configurationSchema: configSchema } : {}),
            ...(configSchema ? { configSchema } : {}),
          }
        : {}),
    },
    capabilities: buildCapabilities(model),
  };
}

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function POST(
  request: Request,
  { params }: { params?: Promise<{ token: string }> | { token: string } } = {}
) {
  const resolvedParams = params ? await params : undefined;
  const authorizedRequest = withPathTokenApiKey(request, resolvedParams?.token);
  const payload = await request
    .clone()
    .json()
    .catch(() => null);
  const requestedName = getRequestedModelName(payload);

  if (!requestedName) {
    return Response.json(
      {
        error: "Model name is required",
      },
      {
        status: 400,
        headers: {
          ...CORS_HEADERS,
        },
      }
    );
  }

  const catalogResponse = await getUnifiedModelsResponse(authorizedRequest, {
    "Content-Type": "application/json",
    ...CORS_HEADERS,
  });
  const catalogBody = (await catalogResponse.json()) as { data?: OpenAiCatalogModel[] };

  if (!catalogResponse.ok) {
    return Response.json(catalogBody, {
      status: catalogResponse.status,
      headers: {
        ...CORS_HEADERS,
      },
    });
  }

  const expandedModels = Array.isArray(catalogBody.data)
    ? expandVscodeServiceTierModels(catalogBody.data.filter(isUsableChatModel))
    : [];

  const model = Array.isArray(expandedModels)
  ? expandedModels.find((entry) => matchesRequestedModel(entry, requestedName))
    : undefined;

  if (!model) {
    return Response.json(
      {
        error: `Model not found: ${requestedName}`,
      },
      {
        status: 404,
        headers: {
          ...CORS_HEADERS,
        },
      }
    );
  }

  return Response.json(buildShowPayload(model, requestedName), {
    headers: {
      ...CORS_HEADERS,
    },
  });
}
