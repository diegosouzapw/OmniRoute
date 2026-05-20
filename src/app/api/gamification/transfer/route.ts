import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { transferTokens, getBalance, getHistory } from "@/lib/gamification/sharing";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { z } from "zod";

export async function OPTIONS() {
  return handleCorsOptions();
}

export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const apiKeyId = url.searchParams.get("apiKeyId");
  if (!apiKeyId) {
    return NextResponse.json(
      { error: "apiKeyId required" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const balance = await getBalance(apiKeyId);
  const history = await getHistory(apiKeyId);

  return NextResponse.json({ balance, history }, { headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const schema = z.object({
    fromApiKeyId: z.string().min(1),
    toApiKeyId: z.string().min(1),
    amount: z.number().positive(),
    reason: z.string().optional(),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.issues },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const result = await transferTokens(
    parsed.data.fromApiKeyId,
    parsed.data.toApiKeyId,
    parsed.data.amount,
    parsed.data.reason
  );

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400, headers: CORS_HEADERS });
  }

  return NextResponse.json(
    { success: true, idempotencyKey: result.idempotencyKey },
    { headers: CORS_HEADERS }
  );
}
