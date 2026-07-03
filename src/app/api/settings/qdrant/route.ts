import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { QdrantSettingsUpdateSchema } from "@/shared/schemas/qdrant";
import { getQdrantConfig, normalizeQdrantConfig } from "@/lib/memory/qdrant";
import { updateSettings, getSettings } from "@/lib/localDb";
import { invalidateMemorySettingsCache } from "@/lib/memory/settings";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

function maskApiKey(apiKey: string | null): { hasApiKey: boolean; apiKeyMasked: string | null } {
  if (!apiKey || apiKey.trim().length === 0) {
    return { hasApiKey: false, apiKeyMasked: null };
  }
  const trimmed = apiKey.trim();
  const last4 = trimmed.slice(-4);
  return { hasApiKey: true, apiKeyMasked: `***${last4}` };
}

function buildQdrantSettingsResponse(settings: Record<string, unknown>) {
  const cfg = normalizeQdrantConfig(settings);
  const { hasApiKey, apiKeyMasked } = maskApiKey(cfg.apiKey);
  return {
    enabled: cfg.enabled,
    host: cfg.host,
    port: cfg.port,
    collection: cfg.collection,
    embeddingModel: cfg.embeddingModel,
    quantization: cfg.quantization,
    hasApiKey,
    apiKeyMasked,
  };
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = (await getSettings()) as Record<string, unknown>;
    return NextResponse.json(buildQdrantSettingsResponse(settings));
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { error: { message: "Invalid JSON body", details: [] } },
      { status: 400 },
    );
  }

  const validation = validateBody(QdrantSettingsUpdateSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  const body = validation.data;

  try {
    const updates: Record<string, unknown> = {};
    if (body.enabled !== undefined) {
      updates.qdrantEnabled = body.enabled;
      // #5597: enabling Qdrant here was inert — retrieval only routes to Qdrant when
      // memoryVectorStore === "qdrant" (the default "auto" never selects it), and no UI
      // wrote that. Activate/deactivate the engine alongside the toggle so "enabled"
      // actually means "Qdrant is the primary vector store" (matching the UI copy).
      updates.memoryVectorStore = body.enabled ? "qdrant" : "auto";
    }
    if (body.host !== undefined) updates.qdrantHost = body.host;
    if (body.port !== undefined) updates.qdrantPort = body.port;
    if (body.collection !== undefined) updates.qdrantCollection = body.collection;
    if (body.embeddingModel !== undefined) updates.qdrantEmbeddingModel = body.embeddingModel;
    if (body.quantization !== undefined) updates.qdrantQuantization = body.quantization;
    if (body.apiKey !== undefined) {
      // Empty string = remove key
      updates.qdrantApiKey = body.apiKey === "" ? null : body.apiKey;
    }

    const newSettings = (await updateSettings(updates)) as Record<string, unknown>;
    // #5597 follow-up: bust the module-level memory-settings cache so the retrieval
    // layer (getMemorySettings) picks up the new vectorStore/qdrant config without a
    // process restart — mirrors src/app/api/settings/memory/route.ts.
    invalidateMemorySettingsCache();
    return NextResponse.json(buildQdrantSettingsResponse(newSettings));
  } catch (err: unknown) {
    const message = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: { message } }, { status: 500 });
  }
}
