import {
  getCustomModels,
  getAllCustomModels,
  addCustomModel,
  removeCustomModel,
  replaceCustomModels,
  deleteSyncedAvailableModelsForProvider,
  removeSyncedAvailableModel,
  updateCustomModel,
  getModelCompatOverrides,
  mergeModelCompatOverride,
  type ModelCompatPatch,
} from "@/lib/localDb";
import {
  getModelContextOverrideRecord,
  setModelContextOverride,
  removeModelContextOverride,
} from "@/lib/db/modelContextOverrides";
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
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { providerModelMutationSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

function normalizeRequestedModelIds(
  searchParams: URLSearchParams,
  body: Record<string, unknown>
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
    const modelCompatOverrides = provider ? getModelCompatOverrides(provider) : [];
    // #4125: surface the manual/auto context-window override (Feature 5004 table) on
    // each custom-model row so the UI can show/edit it without a second round trip.
    const modelsWithContextOverride =
      provider && Array.isArray(models)
        ? models.map((model: Record<string, unknown>) => {
            const modelId = typeof model?.id === "string" ? model.id : null;
            const record = modelId ? getModelContextOverrideRecord(provider, modelId) : null;
            return record
              ? {
                  ...model,
                  contextWindowOverride: record.realContext,
                  contextWindowOverrideSource: record.source,
                }
              : model;
          })
        : models;

    return Response.json({ models: modelsWithContextOverride, modelCompatOverrides });
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
      targetFormat,
      // #1294: persist the per-model token limits set in the add-model form.
      max_input_tokens: maxInputTokens,
      max_output_tokens: maxOutputTokens,
      // #1904: manual vision-capability override set in the add-model form.
      supportsVision,
    } = validation.data;

    const model = await addCustomModel(
      provider,
      modelId,
      modelName,
      source || "manual",
      apiFormat,
      supportedEndpoints,
      targetFormat,
      {
        ...(maxInputTokens != null ? { inputTokenLimit: maxInputTokens } : {}),
        ...(maxOutputTokens != null ? { outputTokenLimit: maxOutputTokens } : {}),
      },
      typeof supportsVision === "boolean" ? supportsVision : undefined
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

    const {
      provider,
      modelId,
      modelName,
      apiFormat,
      supportedEndpoints,
      targetFormat,
      normalizeToolCallId,
      preserveOpenAIDeveloperRole,
      upstreamHeaders,
      compatByProtocol,
      contextWindowOverride,
      supportsVision,
    } = validation.data;

    const raw = rawBody as Record<string, unknown>;
    const updates: Record<string, unknown> = {};
    if ("modelName" in raw) updates.modelName = modelName;
    if ("apiFormat" in raw) updates.apiFormat = apiFormat;
    if ("supportedEndpoints" in raw) updates.supportedEndpoints = supportedEndpoints;
    if ("targetFormat" in raw) updates.targetFormat = targetFormat;
    if ("normalizeToolCallId" in raw) updates.normalizeToolCallId = normalizeToolCallId;
    if ("preserveOpenAIDeveloperRole" in raw)
      updates.preserveOpenAIDeveloperRole = preserveOpenAIDeveloperRole;
    if ("upstreamHeaders" in raw) updates.upstreamHeaders = upstreamHeaders;
    // #1904: manual vision-capability override — null clears back to heuristic.
    if ("supportsVision" in raw) updates.supportsVision = supportsVision;
    if ("compatByProtocol" in raw && compatByProtocol !== undefined) {
      updates.compatByProtocol = compatByProtocol;
    }

    // #4125: manual context-window override — persisted in the Feature-5004
    // `model_context_overrides` table (source="manual"), independent of the
    // customModels JSON row, so it applies whether or not other fields changed.
    let contextWindowOverrideResult: number | null | undefined;
    if ("contextWindowOverride" in raw) {
      if (contextWindowOverride == null) {
        removeModelContextOverride(provider, modelId);
        contextWindowOverrideResult = null;
      } else {
        setModelContextOverride(provider, modelId, contextWindowOverride, "manual");
        contextWindowOverrideResult = contextWindowOverride;
      }
    }

    const model = await updateCustomModel(provider, modelId, updates);

    if (!model) {
      const rawKeys = Object.keys(raw);
      const compatOnly =
        rawKeys.length > 0 &&
        rawKeys.every((k) =>
          [
            "provider",
            "modelId",
            "normalizeToolCallId",
            "preserveOpenAIDeveloperRole",
            "upstreamHeaders",
            "compatByProtocol",
            "contextWindowOverride",
          ].includes(k)
        ) &&
        ("normalizeToolCallId" in raw ||
          "preserveOpenAIDeveloperRole" in raw ||
          "upstreamHeaders" in raw ||
          "compatByProtocol" in raw ||
          "contextWindowOverride" in raw);
      if (compatOnly) {
        const knownProvider =
          !!provider &&
          (Object.prototype.hasOwnProperty.call(
            AI_PROVIDERS as Record<string, unknown>,
            provider
          ) ||
            isOpenAICompatibleProvider(provider) ||
            isAnthropicCompatibleProvider(provider));
        if (!knownProvider) {
          return Response.json(
            { error: { message: "Unknown provider", type: "validation_error" } },
            { status: 400 }
          );
        }
        const patch: ModelCompatPatch = {};
        if ("normalizeToolCallId" in raw && typeof normalizeToolCallId === "boolean") {
          patch.normalizeToolCallId = normalizeToolCallId;
        }
        if ("preserveOpenAIDeveloperRole" in raw) {
          patch.preserveOpenAIDeveloperRole =
            preserveOpenAIDeveloperRole === null || typeof preserveOpenAIDeveloperRole === "boolean"
              ? preserveOpenAIDeveloperRole
              : undefined;
        }
        if ("compatByProtocol" in raw && compatByProtocol && typeof compatByProtocol === "object") {
          patch.compatByProtocol = compatByProtocol;
        }
        if ("upstreamHeaders" in raw) {
          patch.upstreamHeaders =
            upstreamHeaders === null || typeof upstreamHeaders === "object"
              ? upstreamHeaders
              : undefined;
        }
        if (Object.keys(patch).length > 0) {
          mergeModelCompatOverride(provider, modelId, patch);
        }
        return Response.json({
          ok: true,
          modelCompatOverrides: getModelCompatOverrides(provider),
          ...(contextWindowOverrideResult !== undefined
            ? { contextWindowOverride: contextWindowOverrideResult }
            : {}),
        });
      }
      return Response.json(
        { error: { message: "Model not found", type: "not_found" } },
        { status: 404 }
      );
    }

    return Response.json({
      model,
      ...(contextWindowOverrideResult !== undefined
        ? { contextWindowOverride: contextWindowOverrideResult }
        : {}),
    });
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
    const body =
      rawBody && typeof rawBody === "object" && !Array.isArray(rawBody)
        ? (rawBody as Record<string, unknown>)
        : {};

    if (!provider) {
      return Response.json(
        { error: { message: "provider query param is required", type: "validation_error" } },
        { status: 400 }
      );
    }

    if (typeof body.isHidden !== "boolean") {
      return Response.json(
        { error: { message: "isHidden boolean is required", type: "validation_error" } },
        { status: 400 }
      );
    }

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

    const aliasChanges =
      body.isHidden === true
        ? { removed: await deleteManagedAvailableModelAliases(provider, modelIds), assigned: [] }
        : {
            removed: [],
            assigned: (
              await syncManagedAvailableModelAliases(provider, modelIds, { pruneMissing: false })
            ).assignedAliases,
          };

    return Response.json({
      ok: true,
      updated: modelIds.length,
      aliasChanges,
      models: await getCustomModels(provider),
      modelCompatOverrides: getModelCompatOverrides(provider),
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
    const removedSynced = await removeSyncedAvailableModel(provider, modelId);
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
