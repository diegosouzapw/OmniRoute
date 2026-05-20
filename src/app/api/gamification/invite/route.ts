import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { createInvite, listInvites, revokeInvite } from "@/lib/gamification/invites";
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

  const invites = await listInvites(apiKeyId);
  return NextResponse.json({ invites }, { headers: CORS_HEADERS });
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
    apiKeyId: z.string().min(1),
    serverUrl: z.string().optional(),
    maxUses: z.number().positive().default(1),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.issues },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const { code, token } = await createInvite(
    parsed.data.apiKeyId,
    parsed.data.serverUrl,
    parsed.data.maxUses
  );

  return NextResponse.json({ code, token }, { status: 201, headers: CORS_HEADERS });
}

export async function DELETE(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const inviteId = url.searchParams.get("id");
  if (!inviteId) {
    return NextResponse.json({ error: "id required" }, { status: 400, headers: CORS_HEADERS });
  }

  await revokeInvite(inviteId);
  return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
}
