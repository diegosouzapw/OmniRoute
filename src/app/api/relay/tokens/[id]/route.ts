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
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const relayTokenPatchSchema = z
  .object({
    enabled: z.boolean().optional(),
    name: z.string().trim().min(1).optional(),
    description: z.string().optional(),
    comboId: z.string().trim().min(1).optional(),
    allowedModels: z.array(z.string().trim().min(1)).optional(),
    maxTokensPerRequest: z.number().int().positive().optional(),
    maxRequestsPerMinute: z.number().int().positive().optional(),
    maxRequestsPerDay: z.number().int().positive().optional(),
    maxCostPerDay: z.number().nonnegative().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, "At least one update field is required");

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
  const rawBody = await request.json();
  const validation = validateBody(relayTokenPatchSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }
  const body = validation.data;

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
