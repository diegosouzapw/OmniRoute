import { NextResponse } from "next/server";
import { buildClaudeAuthFile, ClaudeAuthFileError } from "@/lib/oauth/utils/claudeAuthFile";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

function toErrorResponse(error: unknown) {
  if (error instanceof ClaudeAuthFileError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.status }
    );
  }

  const message = sanitizeErrorMessage(error) || "Failed to export Claude auth file";
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(_request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const built = await buildClaudeAuthFile(id);

    return new Response(built.content, {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Content-Disposition": `attachment; filename="${built.fileName}"`,
        "Cache-Control": "no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("[Claude Auth Export] Failed:", error);
    return toErrorResponse(error);
  }
}
