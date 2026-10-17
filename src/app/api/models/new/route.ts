import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { getNewModelsInbox } from "@/lib/newModelsInbox";

export const dynamic = "force-dynamic";

// GET /api/models/new — unread models recorded by model sync, grouped by provider.
export async function GET(request: Request) {
  try {
    const authError = await requireManagementAuth(request);
    if (authError) return authError;

    return NextResponse.json(await getNewModelsInbox());
  } catch (error) {
    console.error(
      "[API] GET /api/models/new failed:",
      error instanceof Error ? error.name : "unknown error"
    );
    return createErrorResponse({ status: 500, message: "Failed to load new models" });
  }
}
