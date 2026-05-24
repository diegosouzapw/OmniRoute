import { NextResponse } from "next/server";
import { getRelayTokens, createRelayToken } from "@/lib/db/relayProxies";

export async function GET() {
  const tokens = getRelayTokens();
  // Strip hash from response
  const safe = tokens.map((t) => ({
    id: t.id,
    name: t.name,
    tokenPrefix: t.tokenPrefix,
    description: t.description,
    comboId: t.comboId,
    allowedModels: t.allowedModels,
    maxTokensPerRequest: t.maxTokensPerRequest,
    maxRequestsPerMinute: t.maxRequestsPerMinute,
    maxRequestsPerDay: t.maxRequestsPerDay,
    maxCostPerDay: t.maxCostPerDay,
    enabled: t.enabled,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
    expiresAt: t.expiresAt,
    lastUsedAt: t.lastUsedAt,
  }));
  return NextResponse.json(safe);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = createRelayToken({
      name: body.name,
      description: body.description,
      comboId: body.comboId,
      allowedModels: body.allowedModels,
      maxTokensPerRequest: body.maxTokensPerRequest,
      maxRequestsPerMinute: body.maxRequestsPerMinute,
      maxRequestsPerDay: body.maxRequestsPerDay,
      maxCostPerDay: body.maxCostPerDay,
      expiresAt: body.expiresAt,
      metadata: body.metadata,
    });

    return NextResponse.json({
      id: token.id,
      name: token.name,
      rawToken: token.rawToken,
      tokenPrefix: token.tokenPrefix,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
