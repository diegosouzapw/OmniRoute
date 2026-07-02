import {
  getCustomModels,
  getAllCustomModels,
  addCustomModel,
  removeCustomModel,
  replaceCustomModels,
  deleteSyncedAvailableModelsForProvider,
  getSyncedAvailableModels,
  updateCustomModel,
  getModelCompatOverrides,
  mergeModelCompatOverride,
  type ModelCompatPatch,
} from "@/lib/localDb";
import {
  deleteManagedAvailableModelAliases,
  deleteManagedAvailableModelAliasesForProvider,
  syncManagedAvailableModelAliases,
} from "@/lib/providerModels/managedAvailableModels";
import {
  AI_PROVIDERS,
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";
import { canonicalizeModelConfigRow } from "@/lib/db/modelConfigRows";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { providerModelMutationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { z } from "zod";

const providerModelVisibilityPatchSchema = z
  .object({
    isHidden: z.boolean({ error: "isHidden boolean is required" }),
    modelIds: z.array(z.string().trim().min(1)).optional(),
  })
  .strict();

type ProviderModelMutationData = z.infer<typeof providerModelMutationSchema>;

type CompatRequestFields = {
  targetFormat: { present: boolean; value: ProviderModelMutationData["targetFormat"] };
  unsupportedParams: {
    present: boolean;
    value: ProviderModelMutationData["unsupportedParams"];
  };
  normalizeToolCallId: {
    present: boolean;
    value: ProviderModelMutationData["normalizeToolCallId"];
  };
  preserveOpenAIDeveloperRole: {
    present: boolean;
    value: ProviderModelMutationData["preserveOpenAIDeveloperRole"];
  };
  upstreamHeaders: { present: boolean; value: ProviderModelMutationData["upstreamHeaders"] };
  compatByProtocol: { present: boolean; value: ProviderModelMutationData["compatByProtocol"] };
};

const COMPAT_ONLY_KEYS = new Set([
  "provider",
  "modelId",
  "compat",
  "normalizeToolCallId",
  "preserveOpenAIDeveloperRole",
  "upstreamHeaders",
  "compatByProtocol",
  "targetFormat",
  "capabilities",
  "supportsVision",
  "supportsTools",
  "supportsThinking",
  "supportsReasoning",
  "supportsXHighEffort",
  "supportsMaxEffort",
  "max_input_tokens",
  "max_output_tokens",
  "unsupportedParams",
]);

function normalizeRequestedModelIds(
  searchParams: URLSearchParams,
  body: { modelIds?: unknown }
): string[] {
  const bodyModelIds = Array.isArray(body.modelIds)
    ? body.modelIds
        .filter((value): value is string => typeof value === "string")
        .map((value) => value.trim())
        .filter(Boolean)
    : [];
  const singleModelId = searchParams.get("modelId") || searchParams.get("model");
  const allModelIds = [...bodyModelIds, ...(singleModelId ? [singleModelId.trim()] : [])];
  return Array.from(new Set(allModelIds)).filter(Boolean);
}

function serializeModelCompatOverrides(provider: string) {
  return getModelCompatOverrides(provider).map((entry) =>
    canonicalizeModelConfigRow(entry as Record<string, unknown>)
  );
}

function buildCapabilitiesPatch(
  data: Record<string, unknown>,
  raw: Record<string, unknown>
): Record<string, unknown> | null | undefined {
  const rawCapabilities =
    raw.capabilities && typeof raw.capabilities === "object" && !Array.isArray(raw.capabilities)
      ? (raw.capabilities as Record<string, unknown>)
      : {};
  const hasExplicitNull = (records: readonly Record<string, unknown>[], keys: readonly string[]) =>
    records.some((record) =>
      keys.some((key) => Object.prototype.hasOwnProperty.call(record, key) && record[key] === null)
    );
  const contextHasNull = hasExplicitNull(
    [raw, rawCapabilities],
    ["contextWindow", "contextLength", "maxInputTokens", "inputTokenLimit", "max_input_tokens"]
  );
  const outputHasNull = hasExplicitNull(
    [raw, rawCapabilities],
    ["maxOutputTokens", "outputTokenLimit", "max_output_tokens"]
  );
  const capabilities =
    data.capabilities && typeof data.capabilities === "object" && !Array.isArray(data.capabilities)
      ? { ...(data.capabilities as Record<string, unknown>) }
      : {};
  if (contextHasNull) {
    capabilities.contextWindow = null;
    capabilities.maxInputTokens = null;
  }
  if (outputHasNull) {
    capabilities.maxOutputTokens = null;
  }
  if (hasExplicitNull([raw, rawCapabilities], ["supportsTools", "toolCalling"])) {
    capabilities.supportsTools = null;
  }
  if (hasExplicitNull([raw, rawCapabilities], ["supportsReasoning", "supportsThinking"])) {
    capabilities.supportsReasoning = null;
  }
  if (!contextHasNull && "max_input_tokens" in raw && typeof data.max_input_tokens === "number") {
    capabilities.contextWindow = data.max_input_tokens;
    capabilities.maxInputTokens = data.max_input_tokens;
  }
  if (!outputHasNull && "max_output_tokens" in raw && typeof data.max_output_tokens === "number") {
    capabilities.maxOutputTokens = data.max_output_tokens;
  }
  if (
    "supportsThinking" in raw &&
    !hasExplicitNull([raw, rawCapabilities], ["supportsReasoning", "supportsThinking"])
  ) {
    capabilities.supportsReasoning = data.supportsThinking;
  }
  for (const [key, aliases] of [
    ["supportsVision", ["supportsVision"]],
    ["supportsTools", ["supportsTools", "toolCalling"]],
    ["supportsReasoning", ["supportsReasoning", "supportsThinking"]],
    ["supportsXHighEffort", ["supportsXHighEffort"]],
    ["supportsMaxEffort", ["supportsMaxEffort"]],
  ] as const) {
    if (hasExplicitNull([raw, rawCapabilities], aliases)) {
      capabilities[key] = null;
      continue;
    }
    if (key in raw) capabilities[key] = data[key];
  }
  if (raw.capabilities === null) return null;
  return Object.keys(capabilities).length > 0 ? capabilities : undefined;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function hasOwn(record: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function readCompatRequestFields(
  raw: Record<string, unknown>,
  data: ProviderModelMutationData
): CompatRequestFields {
  const rawCompat = asRecord(raw.compat);
  const choose = <T>(key: string, topValue: T, nestedValue: T) => {
    const hasTop = hasOwn(raw, key);
    const hasNested = hasOwn(rawCompat, key);
    return {
      present: hasTop || hasNested,
      value: hasTop ? topValue : hasNested ? nestedValue : undefined,
    };
  };

  return {
    targetFormat: choose("targetFormat", data.targetFormat, data.compat?.targetFormat),
    unsupportedParams: choose(
      "unsupportedParams",
      data.unsupportedParams,
      data.compat?.unsupportedParams
    ),
    normalizeToolCallId: choose(
      "normalizeToolCallId",
      data.normalizeToolCallId,
      data.compat?.normalizeToolCallId
    ),
    preserveOpenAIDeveloperRole: choose(
      "preserveOpenAIDeveloperRole",
      data.preserveOpenAIDeveloperRole,
      data.compat?.preserveOpenAIDeveloperRole
    ),
    upstreamHeaders: choose("upstreamHeaders", data.upstreamHeaders, data.compat?.upstreamHeaders),
    compatByProtocol: choose(
      "compatByProtocol",
      data.compatByProtocol,
      data.compat?.compatByProtocol
    ),
  };
}

function buildAddCompatPayload(
  fields: CompatRequestFields,
  capabilities: Record<string, unknown> | null | undefined
) {
  return {
    ...(capabilities !== undefined ? { capabilities: capabilities || undefined } : {}),
    compat: {
      ...(typeof fields.targetFormat.value === "string"
        ? { targetFormat: fields.targetFormat.value }
        : {}),
      ...(Array.isArray(fields.unsupportedParams.value)
        ? { unsupportedParams: fields.unsupportedParams.value }
        : {}),
      ...(typeof fields.normalizeToolCallId.value === "boolean"
        ? { normalizeToolCallId: fields.normalizeToolCallId.value }
        : {}),
      ...(typeof fields.preserveOpenAIDeveloperRole.value === "boolean"
        ? { preserveOpenAIDeveloperRole: fields.preserveOpenAIDeveloperRole.value }
        : {}),
      ...(fields.upstreamHeaders.value && typeof fields.upstreamHeaders.value === "object"
        ? { upstreamHeaders: fields.upstreamHeaders.value }
        : {}),
      ...(fields.compatByProtocol.value && typeof fields.compatByProtocol.value === "object"
        ? { compatByProtocol: fields.compatByProtocol.value }
        : {}),
    },
  };
}

function buildModelUpdates(
  raw: Record<string, unknown>,
  data: ProviderModelMutationData,
  fields: CompatRequestFields,
  capabilities: Record<string, unknown> | null | undefined
): Record<string, unknown> {
  const updates: Record<string, unknown> = {};
  if ("modelName" in raw) updates.modelName = data.modelName;
  if ("apiFormat" in raw) updates.apiFormat = data.apiFormat;
  if ("supportedEndpoints" in raw) updates.supportedEndpoints = data.supportedEndpoints;
  if (fields.targetFormat.present) updates.targetFormat = fields.targetFormat.value;
  if (capabilities !== undefined) updates.capabilities = capabilities;
  if (fields.unsupportedParams.present) updates.unsupportedParams = fields.unsupportedParams.value;
  if (fields.normalizeToolCallId.present) {
    updates.normalizeToolCallId = fields.normalizeToolCallId.value;
  }
  if (fields.preserveOpenAIDeveloperRole.present) {
    updates.preserveOpenAIDeveloperRole = fields.preserveOpenAIDeveloperRole.value;
  }
  if (fields.upstreamHeaders.present) updates.upstreamHeaders = fields.upstreamHeaders.value;
  if (fields.compatByProtocol.present && fields.compatByProtocol.value !== undefined) {
    updates.compatByProtocol = fields.compatByProtocol.value;
  }
  return updates;
}

function isKnownProvider(provider: string): boolean {
  return (
    Object.prototype.hasOwnProperty.call(AI_PROVIDERS as Record<string, unknown>, provider) ||
    isOpenAICompatibleProvider(provider) ||
    isAnthropicCompatibleProvider(provider)
  );
}

function hasCompatOnlyPatch(
  fields: CompatRequestFields,
  capabilities: Record<string, unknown> | null | undefined
): boolean {
  return (
    fields.normalizeToolCallId.present ||
    fields.preserveOpenAIDeveloperRole.present ||
    fields.upstreamHeaders.present ||
    fields.compatByProtocol.present ||
    fields.targetFormat.present ||
    capabilities !== undefined ||
    fields.unsupportedParams.present
  );
}

function isCompatOnlyRequest(
  raw: Record<string, unknown>,
  fields: CompatRequestFields,
  capabilities: Record<string, unknown> | null | undefined
): boolean {
  const rawKeys = Object.keys(raw);
  return (
    rawKeys.length > 0 &&
    rawKeys.every((key) => COMPAT_ONLY_KEYS.has(key)) &&
    hasCompatOnlyPatch(fields, capabilities)
  );
}

function assignPreserveDeveloperPatch(patch: ModelCompatPatch, fields: CompatRequestFields) {
  if (!fields.preserveOpenAIDeveloperRole.present) return;
  const value = fields.preserveOpenAIDeveloperRole.value;
  patch.preserveOpenAIDeveloperRole =
    value === null || typeof value === "boolean" ? value : undefined;
}

function assignCompatByProtocolPatch(patch: ModelCompatPatch, fields: CompatRequestFields) {
  const value = fields.compatByProtocol.value;
  if (fields.compatByProtocol.present && value && typeof value === "object") {
    patch.compatByProtocol = value;
  }
}

function assignTargetFormatPatch(patch: ModelCompatPatch, fields: CompatRequestFields) {
  if (!fields.targetFormat.present) return;
  patch.targetFormat =
    typeof fields.targetFormat.value === "string" ? fields.targetFormat.value : null;
}

function assignUnsupportedParamsPatch(patch: ModelCompatPatch, fields: CompatRequestFields) {
  if (!fields.unsupportedParams.present) return;
  patch.unsupportedParams = Array.isArray(fields.unsupportedParams.value)
    ? fields.unsupportedParams.value
    : null;
}

function assignUpstreamHeadersPatch(patch: ModelCompatPatch, fields: CompatRequestFields) {
  if (!fields.upstreamHeaders.present) return;
  const value = fields.upstreamHeaders.value;
  patch.upstreamHeaders = value === null || typeof value === "object" ? value : undefined;
}

function buildModelCompatPatch(
  fields: CompatRequestFields,
  capabilities: Record<string, unknown> | null | undefined
): ModelCompatPatch {
  const patch: ModelCompatPatch = {};
  if (fields.normalizeToolCallId.present && typeof fields.normalizeToolCallId.value === "boolean") {
    patch.normalizeToolCallId = fields.normalizeToolCallId.value;
  }
  assignPreserveDeveloperPatch(patch, fields);
  assignCompatByProtocolPatch(patch, fields);
  if (capabilities !== undefined) patch.capabilities = capabilities;
  assignTargetFormatPatch(patch, fields);
  assignUnsupportedParamsPatch(patch, fields);
  assignUpstreamHeadersPatch(patch, fields);
  return patch;
}

function buildVisibilityValidationError(validation: {
  error: { message: string; details: Array<{ field: string; message: string }> };
}) {
  const missingVisibility = validation.error.details.find((detail) => detail.field === "isHidden");
  return Response.json(
    {
      error: {
        ...validation.error,
        message: missingVisibility?.message || validation.error.message,
        type: "validation_error",
      },
    },
    { status: 400 }
  );
}

async function syncVisibilityAliases(provider: string, modelIds: string[], isHidden: boolean) {
  if (isHidden) {
    return {
      removed: await deleteManagedAvailableModelAliases(provider, modelIds),
      assigned: [],
    };
  }
  return {
    removed: [],
    assigned: (await syncManagedAvailableModelAliases(provider, modelIds, { pruneMissing: false }))
      .assignedAliases,
  };
}

/**
 * GET /api/provider-models?provider=<id>
 * List custom models (all providers if no provider param)
 */
export async function GET(request) {
  try {
    // Require authentication for security
    if (!(await isAuthenticated(request))) {
      return Response.json(
        { error: { message: "Authentication required", type: "invalid_api_key" } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");

    const models = provider ? await getCustomModels(provider) : await getAllCustomModels();
    const modelCompatOverrides = provider ? serializeModelCompatOverrides(provider) : [];

    return Response.json({ models, modelCompatOverrides });
  } catch {
    return Response.json(
      { error: { message: "Failed to fetch provider models", type: "server_error" } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/provider-models
 * Body: { provider, modelId, modelName? }
 */
export async function POST(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json(
      { error: { message: "Invalid JSON body", type: "validation_error" } },
      { status: 400 }
    );
  }

  try {
    // Require authentication for security
    if (!(await isAuthenticated(request))) {
      return Response.json(
        { error: { message: "Authentication required", type: "invalid_api_key" } },
        { status: 401 }
      );
    }

    const validation = validateBody(providerModelMutationSchema, rawBody);
    if (isValidationFailure(validation)) {
      return Response.json({ error: validation.error }, { status: 400 });
    }
    const {
      provider,
      modelId,
      modelName,
      source,
      apiFormat,
      supportedEndpoints,
      // #1294: persist the per-model token limits set in the add-model form.
      max_input_tokens: maxInputTokens,
      max_output_tokens: maxOutputTokens,
    } = validation.data;
    const raw = rawBody as Record<string, unknown>;
    const fields = readCompatRequestFields(raw, validation.data);
    const capabilities = buildCapabilitiesPatch(validation.data as Record<string, unknown>, raw);
    const capabilitiesRecord = capabilities && typeof capabilities === "object" ? capabilities : {};
    const inputLimitMasked =
      capabilitiesRecord.contextWindow === null || capabilitiesRecord.maxInputTokens === null;
    const outputLimitMasked = capabilitiesRecord.maxOutputTokens === null;

    const model = await addCustomModel(
      provider,
      modelId,
      modelName,
      source || "manual",
      apiFormat,
      supportedEndpoints,
      typeof fields.targetFormat.value === "string" ? fields.targetFormat.value : undefined,
      {
        ...(!inputLimitMasked && maxInputTokens != null ? { inputTokenLimit: maxInputTokens } : {}),
        ...(!outputLimitMasked && maxOutputTokens != null
          ? { outputTokenLimit: maxOutputTokens }
          : {}),
      },
      buildAddCompatPayload(fields, capabilities)
    );
    return Response.json({ model });
  } catch (error) {
    console.error("Error adding provider model:", error);
    return Response.json(
      { error: { message: "Failed to add provider model", type: "server_error" } },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/provider-models
 * Body: { provider, modelId, modelName?, apiFormat?, supportedEndpoints? }
 */
export async function PUT(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json(
      { error: { message: "Invalid JSON body", type: "validation_error" } },
      { status: 400 }
    );
  }

  try {
    if (!(await isAuthenticated(request))) {
      return Response.json(
        { error: { message: "Authentication required", type: "invalid_api_key" } },
        { status: 401 }
      );
    }

    const validation = validateBody(providerModelMutationSchema, rawBody);
    if (isValidationFailure(validation)) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const { provider, modelId } = validation.data;

    const raw = rawBody as Record<string, unknown>;
    const fields = readCompatRequestFields(raw, validation.data);
    const capabilities = buildCapabilitiesPatch(validation.data as Record<string, unknown>, raw);
    const updates = buildModelUpdates(raw, validation.data, fields, capabilities);

    const model = await updateCustomModel(provider, modelId, updates);

    if (!model) {
      if (isCompatOnlyRequest(raw, fields, capabilities)) {
        if (!provider || !isKnownProvider(provider)) {
          return Response.json(
            { error: { message: "Unknown provider", type: "validation_error" } },
            { status: 400 }
          );
        }
        const patch = buildModelCompatPatch(fields, capabilities);
        if (Object.keys(patch).length > 0) {
          mergeModelCompatOverride(provider, modelId, patch);
        }
        return Response.json({
          ok: true,
          modelCompatOverrides: serializeModelCompatOverrides(provider),
        });
      }
      return Response.json(
        { error: { message: "Model not found", type: "not_found" } },
        { status: 404 }
      );
    }

    return Response.json({ model });
  } catch (error) {
    console.error("Error updating provider model:", error);
    return Response.json(
      { error: { message: "Failed to update provider model", type: "server_error" } },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/provider-models?provider=<id>&modelId=<modelId>
 * Body: { isHidden: boolean, modelIds?: string[] }
 */
export async function PATCH(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return Response.json(
      { error: { message: "Invalid JSON body", type: "validation_error" } },
      { status: 400 }
    );
  }

  try {
    if (!(await isAuthenticated(request))) {
      return Response.json(
        { error: { message: "Authentication required", type: "invalid_api_key" } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");
    const validation = validateBody(providerModelVisibilityPatchSchema, rawBody);

    if (!provider) {
      return Response.json(
        { error: { message: "provider query param is required", type: "validation_error" } },
        { status: 400 }
      );
    }

    if (isValidationFailure(validation)) {
      return buildVisibilityValidationError(validation);
    }

    const body = validation.data;
    const modelIds = normalizeRequestedModelIds(searchParams, body);
    if (modelIds.length === 0) {
      return Response.json(
        {
          error: {
            message: "modelId query param or body.modelIds is required",
            type: "validation_error",
          },
        },
        { status: 400 }
      );
    }

    for (const modelId of modelIds) {
      const updatedModel = await updateCustomModel(provider, modelId, { isHidden: body.isHidden });
      if (!updatedModel) {
        mergeModelCompatOverride(provider, modelId, { isHidden: body.isHidden });
      }
    }

    const aliasChanges = await syncVisibilityAliases(provider, modelIds, body.isHidden);

    return Response.json({
      ok: true,
      updated: modelIds.length,
      aliasChanges,
      models: await getCustomModels(provider),
      modelCompatOverrides: serializeModelCompatOverrides(provider),
    });
  } catch (error) {
    console.error("Error patching provider models:", error);
    return Response.json(
      { error: { message: "Failed to update provider models", type: "server_error" } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/provider-models?provider=<id>&model=<modelId>
 */
export async function DELETE(request) {
  try {
    // Require authentication for security
    if (!(await isAuthenticated(request))) {
      return Response.json(
        { error: { message: "Authentication required", type: "invalid_api_key" } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");
    const modelId = searchParams.get("model");

    if (!provider) {
      return Response.json(
        {
          error: {
            message: "provider query param is required",
            type: "validation_error",
          },
        },
        { status: 400 }
      );
    }

    // DELETE /api/provider-models?provider=<id>&all=true — clear all models
    const all = searchParams.get("all");
    if (all === "true") {
      await replaceCustomModels(provider, [], { allowEmpty: true });
      const syncedAvailableModelListsRemoved =
        await deleteSyncedAvailableModelsForProvider(provider);
      const removedAliases = await deleteManagedAvailableModelAliasesForProvider(provider);
      return Response.json({
        cleared: true,
        syncedAvailableModelListsRemoved,
        aliasChanges: { removed: removedAliases, assigned: [] },
      });
    }

    if (!modelId) {
      return Response.json(
        {
          error: {
            message: "model query param is required (or use all=true)",
            type: "validation_error",
          },
        },
        { status: 400 }
      );
    }

    const removedCustom = await removeCustomModel(provider, modelId);
    const removedSynced = (await getSyncedAvailableModels(provider)).some(
      (model) => model.id === modelId
    );
    if (removedSynced) {
      // #3199 + #3782: mark the deleted synced model with the DISTINCT `isDeleted`
      // marker so a later auto-fetch re-import does not re-add it. We also keep
      // `isHidden:true` so existing UI/visibility behavior is unchanged. The sync
      // filter keys on `isDeleted` (not `isHidden`), which is what lets an
      // eye/visibility-hidden model (`isHidden` only) survive a re-sync while a
      // deleted one stays dropped.
      mergeModelCompatOverride(provider, modelId, { isDeleted: true, isHidden: true });
    }
    const removed = removedCustom || removedSynced;
    const removedAliases = await deleteManagedAvailableModelAliases(provider, [modelId]);
    return Response.json({ removed, aliasChanges: { removed: removedAliases, assigned: [] } });
  } catch (error) {
    console.error("Error removing provider model:", error);
    return Response.json(
      { error: { message: "Failed to remove provider model", type: "server_error" } },
      { status: 500 }
    );
  }
}
