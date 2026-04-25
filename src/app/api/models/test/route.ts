import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { buildComboTestRequestBody, extractComboTestResponseText } from "@/lib/combos/testHealth";
import { z } from "zod";

const testModelSchema = z.object({
  providerId: z.string().min(1),
  modelId: z.string().min(1),
});

/**
 * Get the base URL for internal requests (VPS-safe: respects reverse proxy headers)
 */
function getBaseUrl(request: Request) {
  const fwdHost = request.headers.get("x-forwarded-host");
  const fwdProto = request.headers.get("x-forwarded-proto") || "https";
  if (fwdHost) return `${fwdProto}://${fwdHost}`;
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}

export async function POST(request: Request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = testModelSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.format() }, { status: 400 });
    }
    const { providerId, modelId } = validation.data;

    // Construct target format (providerId/modelId)
    // Some models (like free alias models) might not need the prefix if it's an alias.
    // However, the wildcard router expects provider/model.
    let fullModelStr = modelId;
    if (!fullModelStr.includes("/")) {
      fullModelStr = `${providerId}/${modelId}`;
    }

    const baseInternalUrl = getBaseUrl(request);
    const startTime = Date.now();
    const isEmbedding =
      fullModelStr.toLowerCase().includes("embedding") ||
      fullModelStr.toLowerCase().includes("bge-") ||
      fullModelStr.toLowerCase().includes("text-embed");

    const internalUrl = `${baseInternalUrl}/v1/${isEmbedding ? "embeddings" : "chat/completions"}`;
    const testBody = buildComboTestRequestBody(fullModelStr, isEmbedding);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    let res: Response;
    try {
      res = await fetch(internalUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Internal-Test": "model-health-check",
          "X-OmniRoute-No-Cache": "true",
          "X-Request-Id": `model-test-${randomUUID()}`,
        },
        body: JSON.stringify(testBody),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    const latencyMs = Date.now() - startTime;

    if (res.ok) {
      let responseBody = null;
      try {
        responseBody = await res.json();
      } catch {
        responseBody = null;
      }

      const responseText = extractComboTestResponseText(responseBody);
      if (!responseText && !isEmbedding) {
        return NextResponse.json(
          {
            status: "error",
            statusCode: res.status,
            error: "Provider returned HTTP 200 but no text content.",
            latencyMs,
          },
          { status: 400 }
        );
      }

      return NextResponse.json({ status: "ok", latencyMs, responseText });
    }

    let errorMsg = "";
    try {
      const errBody = await res.json();
      errorMsg = errBody?.error?.message || errBody?.error || res.statusText;
    } catch {
      errorMsg = res.statusText;
    }

    return NextResponse.json(
      {
        status: "error",
        statusCode: res.status,
        error: errorMsg,
        latencyMs,
      },
      { status: res.status }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        error: error.name === "AbortError" ? "Timeout (20s)" : error.message,
      },
      { status: 500 }
    );
  }
}
