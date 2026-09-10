import { NextResponse } from "next/server";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { createDefaultEmbeddingGenerator } from "@omniroute/open-sse/services/cache/embeddingClient.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { z } from "zod";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { resolveProviderConnectionDetails } from "@/lib/cache/semanticCacheDbBridge";

const testEmbeddingSchema = z.object({
  provider: z.string().trim().min(1),
  model: z.string().trim().min(1),
  baseUrl: z.string().trim().optional(),
  apiKey: z.string().trim().optional(),
  dimensions: z.number().positive().optional(),
});

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(testEmbeddingSchema, rawBody);
  if (isValidationFailure(validation)) {
    return validation.response;
  }

  const { provider, model, baseUrl, apiKey } = validation.data;

  // Resolve connection details from DB if not explicitly passed
  const conn = resolveProviderConnectionDetails(provider);
  const effectiveBaseUrl = baseUrl || conn.baseUrl;
  const effectiveApiKey = apiKey || conn.apiKey;

  try {
    const generator = createDefaultEmbeddingGenerator({
      embeddingProvider: provider,
      embeddingModel: model,
      embeddingBaseUrl: effectiveBaseUrl,
      embeddingApiKey: effectiveApiKey,
    });

    const start = Date.now();
    const result = await generator("OmniRoute semantic cache live probe test");
    const latencyMs = Date.now() - start;

    if (!result || !Array.isArray(result.embedding)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Failed to generate embedding (empty response or unsupported endpoint)",
        },
        { status: 200 }
      );
    }

    return NextResponse.json({
      ok: true,
      latencyMs,
      dimensions: result.embedding.length,
      resolvedBaseUrl: effectiveBaseUrl,
    });
  } catch (error: unknown) {
    const message = sanitizeErrorMessage(error);
    return NextResponse.json(
      { ok: false, error: message },
      { status: 200 } // Return 200 with ok: false so the UI can display test error cleanly
    );
  }
}
