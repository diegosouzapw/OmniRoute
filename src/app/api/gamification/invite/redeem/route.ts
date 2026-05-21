import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { redeemInvite } from "@/lib/gamification/invites";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { z } from "zod";

export async function OPTIONS() {
  return handleCorsOptions();
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
    code: z.string().min(1),
    apiKeyId: z.string().min(1),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.issues },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const result = await redeemInvite(parsed.data.code, parsed.data.apiKeyId);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400, headers: CORS_HEADERS });
  }

  return NextResponse.json(
    { success: true, serverUrl: result.serverUrl },
    { headers: CORS_HEADERS }
  );
}
