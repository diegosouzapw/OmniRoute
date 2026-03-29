import { NextResponse } from "next/server";
import { getApiKeyById } from "@/lib/localDb";
import { isApiKeyRevealEnabled } from "@/lib/apiKeyExposure";

// GET /api/keys/[id]/reveal - Reveal full API key for explicit copy actions
export async function GET(_request, { params }) {
  try {
    if (!isApiKeyRevealEnabled()) {
      return NextResponse.json({ error: "API key reveal is disabled" }, { status: 403 });
    }

    const { id } = await params;
    const key = await getApiKeyById(id);

    if (!key || typeof key.key !== "string") {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    return NextResponse.json({ key: key.key });
  } catch (error) {
    console.log("Error revealing key:", error);
    return NextResponse.json({ error: "Failed to reveal key" }, { status: 500 });
  }
}
