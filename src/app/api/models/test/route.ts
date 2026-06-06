import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { runSingleModelTest } from "@/lib/api/modelTestRunner";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const testModelSchema = z.object({
  providerId: z.string().min(1),
  modelId: z.string().min(1),
  connectionId: z.string().min(1).optional(),
});

const SINGLE_TEST_TIMEOUT_MS = 20_000;

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
    const { providerId, modelId, connectionId } = validation.data;

    const result = await runSingleModelTest({
      providerId,
      modelId,
      ...(connectionId ? { connectionId } : {}),
      timeoutMs: SINGLE_TEST_TIMEOUT_MS,
    });

    if (result.status === "ok") {
      return NextResponse.json({
        status: "ok",
        latencyMs: result.latencyMs,
        responseText: result.responseText,
      });
    }

    const body: Record<string, unknown> = {
      status: "error",
      latencyMs: result.latencyMs,
      error: result.error || "Unknown error",
    };
    if (result.statusCode !== undefined) body.statusCode = result.statusCode;
    if (result.rateLimited) body.rateLimited = true;
    if (result.retryAfter !== undefined) body.retryAfter = result.retryAfter;

    return NextResponse.json(body, { status: result.httpStatus });
  } catch (error: unknown) {
    return NextResponse.json(
      {
        status: "error",
        error: sanitizeErrorMessage(error) || "Unknown error",
      },
      { status: 500 }
    );
  }
}
