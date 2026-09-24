import { NextResponse } from "next/server";
import { getApiKeyById } from "@/lib/db/apiKeys";
import { isApiKeyRevealEnabled } from "@/lib/apiKeyExposure";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import * as log from "@/sse/utils/logger";

// GET /api/keys/[id]/reveal - Reveal full API key for explicit copy actions
export async function GET(request, { params }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    if (!isApiKeyRevealEnabled()) {
      return NextResponse.json({ error: "API key reveal is disabled" }, { status: 403 });
    }

    const { id } = await params;
    const key = await getApiKeyById(id);

    if (!key || typeof key.key !== "string") {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    // SSO shadow keys read back blank (getApiKeyById redacts them). Say so
    // instead of answering 200 with an empty string the caller would copy.
    if (key.key === "") {
      return NextResponse.json(
        { error: "This key is managed by SSO and has no secret to reveal" },
        { status: 403 }
      );
    }

    return NextResponse.json({ key: key.key });
  } catch (error) {
    log.error("keys", "Error revealing key", error);
    return NextResponse.json({ error: "Failed to reveal key" }, { status: 500 });
  }
}
