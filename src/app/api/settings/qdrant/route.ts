import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSettings, updateSettings } from "@/lib/localDb";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const qdrantSettingsSchema = z
  .object({
    enabled: z.boolean().optional(),
    host: z.string().optional(),
    port: z.number().int().min(1).max(65535).optional(),
    apiKey: z.string().optional(), // never returned back to client
    collection: z.string().min(1).optional(),
    embeddingModel: z.string().min(1).optional(),
  })
  .strict();

function maskApiKey(value: unknown): string | null {
  const raw = typeof value === "string" ? value.trim() : "";
  if (!raw) return null;
  const tail = raw.slice(-4);
  return `***${tail}`;
}

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = (await getSettings()) as Record<string, unknown>;
    const enabled = settings.qdrantEnabled === true;
    const host = typeof settings.qdrantHost === "string" ? settings.qdrantHost : "";
    const port =
      typeof settings.qdrantPort === "number" && Number.isFinite(settings.qdrantPort)
        ? Math.round(settings.qdrantPort)
        : 6333;
    const collection =
      typeof settings.qdrantCollection === "string" && settings.qdrantCollection.trim().length > 0
        ? settings.qdrantCollection
        : "omniroute_memory";
    const embeddingModel =
      typeof settings.qdrantEmbeddingModel === "string" &&
      settings.qdrantEmbeddingModel.trim().length > 0
        ? settings.qdrantEmbeddingModel
        : "openai/text-embedding-3-small";
    const apiKeyMasked = maskApiKey(settings.qdrantApiKey);

    return NextResponse.json({
      enabled,
      host,
      port,
      collection,
      embeddingModel,
      hasApiKey: Boolean(apiKeyMasked),
      apiKeyMasked,
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const validation = validateBody(qdrantSettingsSchema, rawBody);
    if (isValidationFailure(validation)) {
      return validation.response;
    }

    const body = validation.data;
    const updates: Record<string, unknown> = {};

    if (body.enabled !== undefined) updates.qdrantEnabled = body.enabled;
    if (body.host !== undefined) updates.qdrantHost = body.host.trim();
    if (body.port !== undefined) updates.qdrantPort = body.port;
    if (body.collection !== undefined) updates.qdrantCollection = body.collection.trim();
    if (body.embeddingModel !== undefined)
      updates.qdrantEmbeddingModel = body.embeddingModel.trim();
    if (body.apiKey !== undefined) {
      const trimmed = body.apiKey.trim();
      updates.qdrantApiKey = trimmed.length > 0 ? trimmed : null;
    }

    const settings = (await updateSettings(updates)) as Record<string, unknown>;

    return NextResponse.json({
      enabled: settings.qdrantEnabled === true,
      host: typeof settings.qdrantHost === "string" ? settings.qdrantHost : "",
      port:
        typeof settings.qdrantPort === "number" && Number.isFinite(settings.qdrantPort)
          ? Math.round(settings.qdrantPort)
          : 6333,
      collection:
        typeof settings.qdrantCollection === "string" && settings.qdrantCollection.trim().length > 0
          ? settings.qdrantCollection
          : "omniroute_memory",
      embeddingModel:
        typeof settings.qdrantEmbeddingModel === "string" &&
        settings.qdrantEmbeddingModel.trim().length > 0
          ? settings.qdrantEmbeddingModel
          : "openai/text-embedding-3-small",
      hasApiKey: Boolean(maskApiKey(settings.qdrantApiKey)),
      apiKeyMasked: maskApiKey(settings.qdrantApiKey),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
