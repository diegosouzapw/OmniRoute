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

    // SECURITY: createApiKey()/regenerateApiKey() no longer persist a
    // recoverable plaintext secret — the raw value is shown once, at
    // creation/regeneration time, and never again. A `redacted:<id>` row
    // means exactly that: there is nothing left to reveal, not an error.
    if (key.key.startsWith("redacted:")) {
      return NextResponse.json(
        {
          error:
            "This key's value was only shown once, when it was created or last regenerated, and cannot be revealed again. Regenerate it to get a new value.",
          redacted: true,
        },
        { status: 410 },
      );
    }

    return NextResponse.json({ key: key.key });
  } catch (error) {
    log.error("keys", "Error revealing key", error);
    return NextResponse.json({ error: "Failed to reveal key" }, { status: 500 });
  }
}
