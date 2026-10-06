import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

/**
 * POST /api/providers/volcengine-plan/connect/[sessionId]/cancel
 * Cancel an auto phone login session and close its headless browser.
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ sessionId: string }> }
): Promise<NextResponse> {
  const auth = await requireManagementAuth(request);
  if (auth) return auth;

  const { sessionId } = await params;

  try {
    const { volcengineConsoleAutoLoginService } =
      await import("@omniroute/open-sse/services/volcengineConsoleAutoLogin.ts");
    const session = await volcengineConsoleAutoLoginService.cancel(sessionId);
    if (!session) {
      return NextResponse.json(
        { success: false, error: "Unknown or expired Volcano login session" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, session });
  } catch {
    return NextResponse.json({ success: false, error: "Cancel failed" }, { status: 500 });
  }
}
