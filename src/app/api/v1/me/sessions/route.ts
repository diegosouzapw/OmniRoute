import { NextResponse } from "next/server";
import { z } from "zod";

import { buildApiKeySelfServiceSessions } from "@/lib/usage/apiKeySelfService";
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

const isoTimestamp = z
  .string()
  .datetime({ offset: true })
  .transform((value) => new Date(value).toISOString());

const sessionsQuerySchema = z.object({
  project: z.string().trim().min(1).optional(),
  client: z.string().trim().min(1).optional(),
  from: isoTimestamp.optional(),
  to: isoTimestamp.optional(),
  sort: z.enum(["lastSeen", "firstSeen", "requests", "tokens", "cost"]).optional(),
  order: z.enum(["asc", "desc"]).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

export async function GET(request: Request) {
  const apiKey = extractBearerToken(request);
  if (!apiKey) return authError(401);

  const { validateApiKey, getApiKeyMetadata } = await import("@/lib/db/apiKeys");

  const valid = await validateApiKey(apiKey);
  if (!valid) return authError(401);

  const metadata = await getApiKeyMetadata(apiKey);
  if (!metadata || metadata.id === "env-key") return authError(401);

  if (!hasSelfUsageScope(metadata.scopes)) return authError(403);

  const { searchParams } = new URL(request.url);
  const rawParams = {
    project: searchParams.get("project") ?? undefined,
    client: searchParams.get("client") ?? undefined,
    from: searchParams.get("from") ?? undefined,
    to: searchParams.get("to") ?? undefined,
    sort: searchParams.get("sort") ?? undefined,
    order: searchParams.get("order") ?? undefined,
    limit: searchParams.get("limit") ?? undefined,
    offset: searchParams.get("offset") ?? undefined,
  };

  const parsed = sessionsQuerySchema.safeParse(rawParams);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: parsed.error.issues },
      { status: 400 }
    );
  }

  try {
    const result = await buildApiKeySelfServiceSessions(
      { id: metadata.id, scopes: metadata.scopes },
      parsed.data
    );

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof Error && error.message === "missing_self_usage_scope") {
      return authError(403);
    }
    return NextResponse.json({ error: "Failed to list sessions" }, { status: 500 });
  }
}
