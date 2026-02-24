import {
  getCustomModels,
  getAllCustomModels,
  addCustomModel,
  removeCustomModel,
} from "@/lib/localDb";
import { isAuthenticated } from "@/shared/utils/apiAuth";

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

    return Response.json({ models });
  } catch (error) {
    return Response.json(
      { error: { message: error.message, type: "server_error" } },
      { status: 500 }
    );
  }
}

/**
 * POST /api/provider-models
 * Body: { provider, modelId, modelName? }
 */
export async function POST(request) {
  try {
    // Require authentication for security
    if (!(await isAuthenticated(request))) {
      return Response.json(
        { error: { message: "Authentication required", type: "invalid_api_key" } },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { provider, modelId, modelName, source } = body;

    if (!provider || !modelId) {
      return Response.json(
        { error: { message: "provider and modelId are required", type: "validation_error" } },
        { status: 400 }
      );
    }

    const model = await addCustomModel(provider, modelId, modelName, source || "manual");
    return Response.json({ model });
  } catch (error) {
    return Response.json(
      { error: { message: error.message, type: "server_error" } },
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

    if (!provider || !modelId) {
      return Response.json(
        {
          error: {
            message: "provider and model query params are required",
            type: "validation_error",
          },
        },
        { status: 400 }
      );
    }

    const removed = await removeCustomModel(provider, modelId);
    return Response.json({ removed });
  } catch (error) {
    return Response.json(
      { error: { message: error.message, type: "server_error" } },
      { status: 500 }
    );
  }
}
