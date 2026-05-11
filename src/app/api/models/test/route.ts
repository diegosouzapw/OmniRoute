import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { POST as postChatCompletion } from "@/app/api/v1/chat/completions/route";
import { handleValidatedEmbeddingRequestBody } from "@/app/api/v1/embeddings/route";
import { POST as postRerank } from "@/app/api/v1/rerank/route";
import { buildComboTestRequestBody, extractComboTestResponseText } from "@/lib/combos/testHealth";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCustomModels } from "@/lib/localDb";
import { z } from "zod";

const testModelSchema = z.object({
  providerId: z.string().min(1),
  modelId: z.string().min(1),
});

const MODEL_TEST_TIMEOUT_MS = 20_000;
const INTERNAL_ORIGIN = "http://omniroute.internal";

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return typeof error === "string" ? error : "Unknown error";
}

function getErrorName(error: unknown): string {
  return error instanceof Error ? error.name : "";
}

function extractProviderErrorMessage(body: unknown, fallback: string) {
  const record = asRecord(body);
  const error = record.error;
  if (typeof error === "string" && error.trim()) return error;

  const errorRecord = asRecord(error);
  const message = errorRecord.message;
  return typeof message === "string" && message.trim() ? message : fallback;
}

async function runWithTimeout<T>(operation: (signal: AbortSignal) => Promise<T>): Promise<T> {
  const controller = new AbortController();
  const timeoutPromise = new Promise<never>((_, reject) => {
    const timeoutError = new Error("Timeout (20s)");
    timeoutError.name = "AbortError";
    const timeout = setTimeout(() => {
      controller.abort();
      reject(timeoutError);
    }, MODEL_TEST_TIMEOUT_MS);
    controller.signal.addEventListener("abort", () => clearTimeout(timeout), { once: true });
  });

  try {
    return await Promise.race([operation(controller.signal), timeoutPromise]);
  } finally {
    controller.abort();
  }
}

function buildInternalChatRequest(testBody: Record<string, unknown>, signal: AbortSignal) {
  return new Request(`${INTERNAL_ORIGIN}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Reuse the existing strict-mode internal bypass for live health checks.
      "X-Internal-Test": "combo-health-check",
      "X-OmniRoute-No-Cache": "true",
      "X-Request-Id": `model-test-${randomUUID()}`,
    },
    body: JSON.stringify(testBody),
    signal,
  });
}

function buildInternalRerankRequest(testBody: Record<string, unknown>, signal: AbortSignal) {
  return new Request(`${INTERNAL_ORIGIN}/v1/rerank`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Test": "combo-health-check",
      "X-OmniRoute-No-Cache": "true",
      "X-Request-Id": `model-test-${randomUUID()}`,
    },
    body: JSON.stringify(testBody),
    signal,
  });
}

function stripFirstSegment(modelId: string): string | null {
  const slashIdx = modelId.indexOf("/");
  return slashIdx > 0 ? modelId.slice(slashIdx + 1) : null;
}

async function findCustomModelMetadata(providerId: string, modelId: string) {
  try {
    const customModels = await getCustomModels(providerId);
    if (!Array.isArray(customModels)) return null;

    const candidates = new Set([modelId]);
    const stripped = stripFirstSegment(modelId);
    if (stripped) candidates.add(stripped);
    if (modelId.startsWith(`${providerId}/`)) candidates.add(modelId.slice(providerId.length + 1));

    return (
      customModels.find(
        (model: any) => typeof model?.id === "string" && candidates.has(model.id)
      ) || null
    );
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

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

    const startTime = Date.now();
    const customModel = await findCustomModelMetadata(providerId, fullModelStr);
    const supportedEndpoints = Array.isArray(customModel?.supportedEndpoints)
      ? customModel.supportedEndpoints
      : [];
    const apiFormat = typeof customModel?.apiFormat === "string" ? customModel.apiFormat : "";
    const lowerModel = fullModelStr.toLowerCase();
    const isRerank =
      apiFormat === "rerank" ||
      supportedEndpoints.includes("rerank") ||
      lowerModel.includes("rerank");
    const isEmbedding =
      !isRerank &&
      (apiFormat === "embeddings" ||
        supportedEndpoints.includes("embeddings") ||
        lowerModel.includes("embedding") ||
        lowerModel.includes("bge-") ||
        lowerModel.includes("text-embed") ||
        lowerModel.includes("jina-clip") ||
        lowerModel.includes("colbert"));

    const testBody = isRerank
      ? {
          model: fullModelStr,
          query: "What is OmniRoute?",
          documents: [
            "OmniRoute routes AI requests across configured providers.",
            "This document is unrelated to the test query.",
          ],
          top_n: 1,
          return_documents: false,
        }
      : buildComboTestRequestBody(fullModelStr, isEmbedding);

    const res = await runWithTimeout((signal) =>
      isEmbedding
        ? handleValidatedEmbeddingRequestBody(
            testBody as Record<string, unknown> & { model: string }
          )
        : isRerank
          ? postRerank(buildInternalRerankRequest(testBody, signal))
          : postChatCompletion(buildInternalChatRequest(testBody, signal))
    );

    const latencyMs = Date.now() - startTime;

    if (res.ok) {
      let responseBody = null;
      try {
        responseBody = await res.json();
      } catch {
        responseBody = null;
      }

      const responseText = extractComboTestResponseText(responseBody);
      if (isRerank) {
        return NextResponse.json({
          status: "ok",
          latencyMs,
          responseText: "[Rerank completed successfully]",
        });
      }
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
      errorMsg = extractProviderErrorMessage(errBody, res.statusText);
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
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: "error",
        error: getErrorName(error) === "AbortError" ? "Timeout (20s)" : getErrorMessage(error),
      },
      { status: 500 }
    );
  }
}
