import {
  getCustomModels,
  getAllCustomModels,
  addCustomModel,
  removeCustomModel,
  replaceCustomModels,
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
    const { provider, modelId, modelName, source, apiFormat, supportedEndpoints } = validation.data;

    const model = await addCustomModel(
      provider,
      modelId,
      modelName,
      source || "manual",
      apiFormat,
      supportedEndpoints
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
      normalizeToolCallId,
      preserveOpenAIDeveloperRole,
      upstreamHeaders,
      compatByProtocol,
    } = validation.data;

    const raw = rawBody as Record<string, unknown>;
    const updates: Record<string, unknown> = {};
    if ("modelName" in raw) updates.modelName = modelName;
    if ("apiFormat" in raw) updates.apiFormat = apiFormat;
    if ("supportedEndpoints" in raw) updates.supportedEndpoints = supportedEndpoints;
    if ("normalizeToolCallId" in raw) updates.normalizeToolCallId = normalizeToolCallId;
    if ("preserveOpenAIDeveloperRole" in raw)
      updates.preserveOpenAIDeveloperRole = preserveOpenAIDeveloperRole;
    if ("upstreamHeaders" in raw) updates.upstreamHeaders = upstreamHeaders;
    if ("compatByProtocol" in raw && compatByProtocol !== undefined) {
      updates.compatByProtocol = compatByProtocol;
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
          ].includes(k)
        ) &&
        ("normalizeToolCallId" in raw ||
          "preserveOpenAIDeveloperRole" in raw ||
          "upstreamHeaders" in raw ||
          "compatByProtocol" in raw);
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
      const removedAliases = await deleteManagedAvailableModelAliasesForProvider(provider);
      return Response.json({ cleared: true, aliasChanges: { removed: removedAliases } });
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

    const removed = await removeCustomModel(provider, modelId);
    const removedAliases = await deleteManagedAvailableModelAliases(provider, [modelId]);
    return Response.json({ removed, aliasChanges: { removed: removedAliases } });
  } catch (error) {
    console.error("Error removing provider model:", error);
    return Response.json(
      { error: { message: "Failed to remove provider model", type: "server_error" } },
      { status: 500 }
    );
  }
}
