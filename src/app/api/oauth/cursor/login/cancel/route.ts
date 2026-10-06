import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { cancelCursorLoginSession } from "@/lib/oauth/services/cursorLogin";

const cancelSchema = z.object({
  sessionId: z.string().trim().min(1, "sessionId is required"),
});

async function requireOAuthAuth(request: Request) {
  return requireManagementAuth(request, { invalidApiKeyStatus: 401 });
}

/**
 * POST /api/oauth/cursor/login/cancel
 * Drop an in-progress deep-control login session.
 */
export async function POST(request: Request) {
  const authResponse = await requireOAuthAuth(request);
  if (authResponse) return authResponse;

  let rawBody: unknown;
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

  const validation = validateBody(cancelSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const cancelled = cancelCursorLoginSession(validation.data.sessionId);
  return NextResponse.json({ success: true, cancelled });
}
