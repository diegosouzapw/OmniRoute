import { NextResponse } from "next/server";

import { buildApiKeySelfServiceStatus } from "@/lib/usage/apiKeySelfService";
import { hasSelfUsageScope } from "@/shared/constants/selfServiceScopes";

function extractBearerToken(request: Request): string | null {
  const authorization = request.headers.get("Authorization") ?? "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1]?.trim();
  return token ? token : null;
}

function authError(status = 401) {
  return NextResponse.json({ error: status === 401 ? "Unauthorized" : "Forbidden" }, { status });
}

export async function GET(request: Request) {
  const apiKey = extractBearerToken(request);
  if (!apiKey) return authError(401);

  const { validateApiKey, getApiKeyMetadata } = await import("@/lib/localDb");

  const valid = await validateApiKey(apiKey);
  if (!valid) return authError(401);

  const metadata = await getApiKeyMetadata(apiKey);
  if (!metadata || metadata.id === "env-key") return authError(401);

  if (!hasSelfUsageScope(metadata.scopes)) return authError(403);

  try {
    const status = await buildApiKeySelfServiceStatus({
      id: metadata.id,
      name: metadata.name,
      scopes: metadata.scopes,
      allowedConnections: metadata.allowedConnections,
    });

    return NextResponse.json(status);
  } catch (error) {
    if (error instanceof Error && error.message === "missing_self_usage_scope") {
      return authError(403);
    }
    return NextResponse.json({ error: "Failed to build API key status" }, { status: 500 });
  }
}
