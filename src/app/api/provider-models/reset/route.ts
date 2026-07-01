import { getCustomModels, getModelCompatOverrides, resetProviderModelConfig } from "@/lib/localDb";
import { canonicalizeModelConfigRow } from "@/lib/db/modelConfigRows";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { getProviderModels } from "@omniroute/open-sse/config/providerModels.ts";
import { z } from "zod";

const resetProviderModelConfigSchema = z
  .object({
    provider: z.string().trim().min(1),
    modelId: z.string().trim().min(1),
  })
  .strict();

function serializeModelCompatOverrides(provider: string) {
  return getModelCompatOverrides(provider).map((entry) =>
    canonicalizeModelConfigRow(entry as Record<string, unknown>)
  );
}

function getRegistryModelBaseline(
  provider: string,
  modelId: string
): Record<string, unknown> | null {
  const model = getProviderModels(provider).find((entry) => entry.id === modelId);
  return model ? canonicalizeModelConfigRow(model as unknown as Record<string, unknown>) : null;
}

export async function POST(request: Request) {
  let rawBody: unknown;
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

    const parsed = resetProviderModelConfigSchema.safeParse(rawBody);
    if (!parsed.success) {
      return Response.json(
        { error: { message: "provider and modelId are required", type: "validation_error" } },
        { status: 400 }
      );
    }

    const { provider, modelId } = parsed.data;
    const model =
      (await resetProviderModelConfig(provider, modelId)) ||
      getRegistryModelBaseline(provider, modelId);
    return Response.json({
      ok: true,
      model,
      models: await getCustomModels(provider),
      modelCompatOverrides: serializeModelCompatOverrides(provider),
    });
  } catch (error) {
    console.error("Error resetting provider model config:", error);
    return Response.json(
      { error: { message: "Failed to reset provider model config", type: "server_error" } },
      { status: 500 }
    );
  }
}
