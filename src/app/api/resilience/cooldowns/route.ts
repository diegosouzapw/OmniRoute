import { NextResponse } from "next/server";
import { z } from "zod";

import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  clearConnectionCooldowns,
  listConnectionCooldowns,
} from "@/lib/resilience/cooldownManager";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { buildErrorBody, sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const providerSchema = z.string().trim().min(1).max(128);

const clearSchema = z
  .object({
    connectionIds: z.array(z.string().trim().min(1).max(128)).max(1000).optional(),
    all: z.boolean().optional(),
    provider: providerSchema.optional(),
  })
  .strict()
  .refine((value) => value.all === true || (value.connectionIds?.length ?? 0) > 0, {
    message: "Provide connectionIds or set all to true",
  });

/**
 * GET /api/resilience/cooldowns — every connection with its cooldown, model lockouts and
 * terminal state (no credentials), for the bulk cooldown manager.
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const provider = new URL(request.url).searchParams.get("provider") || undefined;
  const parsedProvider = provider === undefined ? undefined : providerSchema.safeParse(provider);
  if (parsedProvider && !parsedProvider.success) {
    return NextResponse.json(buildErrorBody(400, "Invalid provider"), { status: 400 });
  }

  try {
    const connections = await listConnectionCooldowns(parsedProvider?.data);
    return NextResponse.json({ connections, generatedAt: new Date().toISOString() });
  } catch (err) {
    console.error("[API] GET /api/resilience/cooldowns error:", err);
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(err)), { status: 500 });
  }
}

/**
 * POST /api/resilience/cooldowns — lift connection cooldowns and model lockouts for the
 * given connections, or for all of them (optionally within one provider). Terminal states
 * (banned / expired / credits_exhausted) are skipped.
 */
export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(buildErrorBody(400, "Invalid JSON body"), { status: 400 });
  }

  const validation = validateBody(clearSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  try {
    const result = await clearConnectionCooldowns(validation.data);
    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[API] POST /api/resilience/cooldowns error:", err);
    return NextResponse.json(buildErrorBody(500, sanitizeErrorMessage(err)), { status: 500 });
  }
}
