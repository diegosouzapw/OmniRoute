import { NextRequest, NextResponse } from "next/server";
import { CORS_HEADERS, handleCorsOptions } from "@/shared/utils/cors";
import { connectServer, disconnectServer, listServers } from "@/lib/gamification/servers";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { z } from "zod";

export async function OPTIONS() {
  return handleCorsOptions();
}

/**
 * GET /api/gamification/servers — List connected servers
 */
export async function GET(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const servers = await listServers();
  return NextResponse.json({ servers }, { headers: CORS_HEADERS });
}

/**
 * POST /api/gamification/servers — Connect to a server
 */
export async function POST(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const body = await request.json();
  const schema = z.object({
    name: z.string().min(1),
    url: z.string().url(),
    apiKey: z.string().min(1),
  });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.issues },
      { status: 400, headers: CORS_HEADERS }
    );
  }

  const server = await connectServer(parsed.data.name, parsed.data.url, parsed.data.apiKey);
  return NextResponse.json({ server }, { status: 201, headers: CORS_HEADERS });
}

/**
 * DELETE /api/gamification/servers — Disconnect from a server
 */
export async function DELETE(request: NextRequest) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const url = new URL(request.url);
  const serverId = url.searchParams.get("id");
  if (!serverId) {
    return NextResponse.json({ error: "id required" }, { status: 400, headers: CORS_HEADERS });
  }

  await disconnectServer(serverId);
  return NextResponse.json({ success: true }, { headers: CORS_HEADERS });
}
