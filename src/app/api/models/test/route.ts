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
    // Keep `error` a plain string — the dashboard renders it directly in a toast,
    // and an object here throws React #31 ("Objects are not valid as a React
    // child"), freezing the whole page instead of showing the message.
    return NextResponse.json({ status: "error", error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const validation = testModelSchema.safeParse(rawBody);
    if (!validation.success) {
      // Flatten the Zod issues to a string (never return the object — see above).
      const detail = validation.error.issues
        .map((i) => `${i.path.join(".") || "body"}: ${i.message}`)
        .join("; ");
      return NextResponse.json(
        { status: "error", error: `Invalid request: ${detail}` },
        { status: 400 }
      );
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
