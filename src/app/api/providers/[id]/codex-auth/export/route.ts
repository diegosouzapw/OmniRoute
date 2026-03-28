import { NextResponse } from "next/server";
import { buildCodexAuthFile, CodexAuthFileError } from "@/lib/oauth/utils/codexAuthFile";

function toErrorResponse(error: unknown) {
  if (error instanceof CodexAuthFileError) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
      },
      { status: error.status }
    );
  }

  const message = error instanceof Error ? error.message : "Failed to export Codex auth file";
  return NextResponse.json({ error: message }, { status: 500 });
}

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const built = await buildCodexAuthFile(id);

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
    console.error("[Codex Auth Export] Failed:", error);
    return toErrorResponse(error);
  }
}
