import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getRelayToken,
  updateRelayToken,
  deleteRelayToken,
  toggleRelayToken,
  getRelayLogs,
  getRelayUsage,
} from "@/lib/db/relayProxies";

const patchRelayTokenSchema = z.object({
  enabled: z.boolean().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  comboId: z.string().optional(),
  allowedModels: z.array(z.string()).optional(),
  maxTokensPerRequest: z.number().int().nonnegative().optional(),
  maxRequestsPerMinute: z.number().int().nonnegative().optional(),
  maxRequestsPerDay: z.number().int().nonnegative().optional(),
  maxCostPerDay: z.number().nonnegative().optional(),
});

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
  const raw = await request.json();
  const parsed = patchRelayTokenSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid request" },
      { status: 400 }
    );
  }
  const body = parsed.data;

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
