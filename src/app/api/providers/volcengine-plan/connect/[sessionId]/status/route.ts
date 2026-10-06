import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { bindVolcenginePlansFromConsoleCredentials } from "@/lib/providers/volcenginePlanBinding";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

/**
 * GET /api/providers/volcengine-plan/connect/[sessionId]/status
 * Poll an auto phone login session. When credentials have been extracted, the
 * plan binding runs lazily (deduped) and its result is attached to the view.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse> {
  const auth = await requireManagementAuth(request);
  if (auth) return auth;

  const { sessionId } = await params;

  try {
    const { volcengineConsoleAutoLoginService } =
      await import("@omniroute/open-sse/services/volcengineConsoleAutoLogin.ts");

    const session = await volcengineConsoleAutoLoginService.withBinding(sessionId, (credentials) =>
      bindVolcenginePlansFromConsoleCredentials(credentials)
    );

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unknown or expired Volcano login session" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: session.phase === "success", session });
  } catch (error) {
    const message = sanitizeErrorMessage(error instanceof Error ? error.message : error);
    return NextResponse.json(
      { success: false, error: `Volcano login status failed: ${message}` },
      { status: 500 }
    );
  }
}
