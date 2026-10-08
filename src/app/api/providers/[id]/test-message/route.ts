import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getProviderConnectionById, updateProviderConnection } from "@/lib/db/providers";
import { getSettings } from "@/lib/db/settings";
import { runSingleModelTest } from "@/lib/api/modelTestRunner";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { DEFAULT_CONNECTION_TEST_PROMPT } from "@/shared/constants/connectionTest";
import { isFreeModel, providerHasFreeModels } from "@/shared/utils/freeModels";
import { getProviderAlias } from "@/shared/constants/providers";

const modelSchema = z
  .object({
    modelId: z
      .string()
      .trim()
      .min(1)
      .max(256)
      .regex(/^[a-zA-Z0-9][a-zA-Z0-9._:/@+-]*$/),
  })
  .strict();
const sending = new Set<string>();
type Context = { params: Promise<{ id: string }> };

function errorResponse(message: unknown, status: number) {
  return Response.json({ error: { message: sanitizeErrorMessage(message) } }, { status });
}

function configuredModel(connection: Record<string, unknown>) {
  const data = connection.providerSpecificData as Record<string, unknown> | undefined;
  return typeof data?.connectionTestModel === "string" ? data.connectionTestModel : "";
}

export async function GET(request: Request, context: Context) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  try {
    const { id } = await context.params;
    const connection = await getProviderConnectionById(id);
    if (!connection) return errorResponse("Connection not found", 404);
    const settings = await getSettings();
    return Response.json({
      modelId: configuredModel(connection),
      prompt: settings.connectionTestPrompt || DEFAULT_CONNECTION_TEST_PROMPT,
    });
  } catch (error) {
    return errorResponse(error, 500);
  }
}

export async function PUT(request: Request, context: Context) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const parsed = modelSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return errorResponse("Choose a valid chat model", 400);
  try {
    const { id } = await context.params;
    const connection = await getProviderConnectionById(id);
    if (!connection) return errorResponse("Connection not found", 404);
    await updateProviderConnection(id, {
      providerSpecificData: {
        ...((connection.providerSpecificData as Record<string, unknown> | undefined) || {}),
        connectionTestModel: parsed.data.modelId,
      },
    });
    return Response.json({ modelId: parsed.data.modelId });
  } catch (error) {
    return errorResponse(error, 500);
  }
}

export async function POST(request: Request, context: Context) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;
  const { id } = await context.params;
  if (sending.has(id))
    return errorResponse("A test message is already running for this account", 409);
  sending.add(id);
  try {
    const connection = await getProviderConnectionById(id);
    if (!connection) return errorResponse("Connection not found", 404);
    if (connection.isActive === false)
      return errorResponse("Activate this account before sending a test message", 409);
    const modelId = configuredModel(connection);
    if (!modelSchema.safeParse({ modelId }).success)
      return errorResponse("Choose a test model for this account first", 400);
    const provider = connection.provider as string;
    const prefix = [provider, getProviderAlias(provider)].find(
      (p) => p && modelId.startsWith(`${p}/`)
    );
    const upstreamModel = prefix ? modelId.slice(prefix.length + 1) : modelId;
    const settings = await getSettings();
    if (
      settings.hidePaidModels === true &&
      !(providerHasFreeModels(provider) && isFreeModel(provider, { id: upstreamModel }))
    ) {
      return errorResponse("Paid model blocked while hidePaidModels is enabled", 403);
    }
    const prompt =
      (settings.connectionTestPrompt as string | undefined) || DEFAULT_CONNECTION_TEST_PROMPT;
    const result = await runSingleModelTest({
      providerId: provider,
      modelId: `${provider}/${upstreamModel}`,
      connectionId: id,
      prompt,
      timeoutMs: 60_000,
      streamChat: true,
    });
    if (result.status !== "ok")
      return errorResponse(result.error || "Test message failed", result.httpStatus);
    return Response.json({
      modelId,
      prompt,
      responseText: result.responseText,
      latencyMs: result.latencyMs,
    });
  } catch (error) {
    return errorResponse(error, 500);
  } finally {
    sending.delete(id);
  }
}
