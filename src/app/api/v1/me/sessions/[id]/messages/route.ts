import { NextResponse } from "next/server";
import { z } from "zod";

import { hasSelfUsageScope } from "@/shared/constants/selfServiceScopes";
import { isFeatureFlagEnabled } from "@/shared/utils/featureFlags";

export const dynamic = "force-dynamic";

function extractBearerToken(request: Request): string | null {
  const authorization = request.headers.get("Authorization") ?? "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1]?.trim();
  return token ? token : null;
}

function authError(status = 401) {
  return NextResponse.json({ error: status === 401 ? "Unauthorized" : "Forbidden" }, { status });
}

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
  cursor: z.coerce.number().int().min(1).optional(),
  order: z.enum(["asc", "desc"]).optional(),
});

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const apiKey = extractBearerToken(request);
  if (!apiKey) return authError(401);

  const { validateApiKey, getApiKeyMetadata } = await import("@/lib/db/apiKeys");

  const valid = await validateApiKey(apiKey);
  if (!valid) return authError(401);

  const metadata = await getApiKeyMetadata(apiKey);
  if (!metadata || metadata.id === "env-key") return authError(401);

  if (!hasSelfUsageScope(metadata.scopes)) return authError(403);

  const { id } = await context.params;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Session ID required" }, { status: 400 });
  }

  const { searchParams } = new URL(request.url);
  const parsed = querySchema.safeParse({
    limit: searchParams.get("limit") ?? undefined,
    cursor: searchParams.get("cursor") ?? undefined,
    order: searchParams.get("order") ?? undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const { getDbInstance } = await import("@/lib/db/core");
    const { getAgentSessionById } = await import("@/lib/db/agentSessions");
    const { listAgentSessionMessages } = await import("@/lib/db/agentSessionMessages");

    const db = getDbInstance();
    // Strict isolation: session must exist AND belong to the calling API key.
    const session = getAgentSessionById(db, id, metadata.id);
    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const { messages, nextCursor } = listAgentSessionMessages(db, id, parsed.data);
    const capturing = isFeatureFlagEnabled("AGENT_SESSION_MESSAGES_ENABLED");

    return NextResponse.json({
      sessionId: id,
      capturing,
      messages,
      nextCursor,
    });
  } catch (error) {
    console.error("[me/sessions/messages] failed:", error);
    return NextResponse.json({ error: "Failed to fetch session messages" }, { status: 500 });
  }
}
