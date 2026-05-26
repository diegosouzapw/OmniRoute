import { NextResponse } from "next/server";
import { getRelayToken, updateRelayToken, deleteRelayToken, toggleRelayToken, getRelayLogs, getRelayUsage } from "@/lib/db/relayProxies";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = getRelayToken(id);
  if (!token) return NextResponse.json({ error: "Token not found" }, { status: 404 });

  // Get usage stats
  const now = Math.floor(Date.now() / 1000);
  const lastHour = getRelayUsage(id, now - 3600);
  const lastDay = getRelayUsage(id, now - 86400);
  const logs = getRelayLogs(id, 20);

  return NextResponse.json({
    ...token,
    usage: { lastHour, lastDay },
    logs,
  });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();

  if (body.enabled !== undefined) {
    const token = toggleRelayToken(id, body.enabled);
    if (!token) return NextResponse.json({ error: "Token not found" }, { status: 404 });
    return NextResponse.json(token);
  }

  const token = updateRelayToken(id, {
    name: body.name,
    description: body.description,
    comboId: body.comboId,
    allowedModels: body.allowedModels,
    maxTokensPerRequest: body.maxTokensPerRequest,
    maxRequestsPerMinute: body.maxRequestsPerMinute,
    maxRequestsPerDay: body.maxRequestsPerDay,
    maxCostPerDay: body.maxCostPerDay,
  });

  if (!token) return NextResponse.json({ error: "Token not found" }, { status: 404 });
  return NextResponse.json(token);
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  deleteRelayToken(id);
  return NextResponse.json({ success: true });
}
