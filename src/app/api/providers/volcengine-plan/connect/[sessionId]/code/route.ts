import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { bindVolcenginePlansFromConsoleCredentials } from "@/lib/providers/volcenginePlanBinding";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";
import { formatValidationMessage, validateBody } from "@/shared/validation/helpers";
import { volcenginePlanCodeSchema } from "@/shared/validation/schemas/volcenginePlan";

/**
 * POST /api/providers/volcengine-plan/connect/[sessionId]/code
 * Submit the SMS verification code (plus image captcha when required) for an
 * auto phone login session. Returns the session view; binding runs lazily on
 * the next status poll once credentials are extracted.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse> {
  const auth = await requireManagementAuth(request);
  if (auth) return auth;

  const { sessionId } = await params;
  const raw = await request.json().catch(() => ({}));
  // Validate BEFORE the session lookup: a malformed body is the caller's bug
  // regardless of whether the session happens to exist, and answering 404 for
  // it (the previous behavior) hides the real cause.
  const validation = validateBody(volcenginePlanCodeSchema, raw);
  if (validation.success === false) {
    return NextResponse.json(
      { success: false, error: formatValidationMessage(validation.error) },
      { status: 400 }
    );
  }
  const { code, captcha, timeout } = validation.data;

  try {
    const { volcengineConsoleAutoLoginService } = await import(
      "@omniroute/open-sse/services/volcengineConsoleAutoLogin.ts"
    );

    if (!volcengineConsoleAutoLoginService.getStatus(sessionId)) {
      return NextResponse.json(
        { success: false, error: "Unknown or expired Volcano login session" },
        { status: 404 }
      );
    }

    const session = await volcengineConsoleAutoLoginService.submitCode(sessionId, code, captcha, {
      timeout,
    });
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unknown or expired Volcano login session" },
        { status: 404 }
      );
    }

    // Credentials ready → bind immediately so the response carries the outcome.
    if (session.phase === "success") {
      const bound = await volcengineConsoleAutoLoginService.withBinding(sessionId, (credentials) =>
        bindVolcenginePlansFromConsoleCredentials(credentials)
      );
      return NextResponse.json({ success: true, session: bound ?? session });
    }

    return NextResponse.json({ success: false, session });
  } catch (error) {
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : error);
    return NextResponse.json(
      { success: false, error: `Volcano code submission failed: ${message}` },
      { status: 500 }
    );
  }
}
