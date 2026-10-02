import { NextResponse } from "next/server";

import { buildApiKeySelfServiceSessionDetail } from "@/lib/usage/apiKeySelfService";
import { hasSelfUsageScope } from "@/shared/constants/selfServiceScopes";

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

  try {
    const detail = await buildApiKeySelfServiceSessionDetail(
      { id: metadata.id, scopes: metadata.scopes },
      id
    );

    if (!detail) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    return NextResponse.json(detail);
  } catch (error) {
    if (error instanceof Error && error.message === "missing_self_usage_scope") {
      return authError(403);
    }
    return NextResponse.json({ error: "Failed to fetch session detail" }, { status: 500 });
  }
}
