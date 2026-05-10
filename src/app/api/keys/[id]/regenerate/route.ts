import { NextResponse } from "next/server";
import { regenerateApiKey } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import * as log from "@/sse/utils/logger";

/**
 * POST /api/keys/[id]/regenerate
 *
 * Regenerates the API key value for a given ID.
 * The old key is immediately invalidated.
 */
export async function POST(request, { params }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Missing key ID" }, { status: 400 });
    }

    const result = await regenerateApiKey(id);
    if (!result) {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "API key regenerated successfully",
      key: result.key,
      id: result.id,
    });
  } catch (error) {
    log.error("keys", "Error regenerating key", error);
    return NextResponse.json({ error: "Failed to regenerate key" }, { status: 500 });
  }
}
