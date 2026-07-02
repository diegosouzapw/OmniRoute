import { NextResponse } from "next/server";
import { z } from "zod";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { setProviderKeyLimit, getProviderKeyLimit } from "@/lib/db/registeredKeys";

const limitsSchema = z.object({
  maxActiveKeys: z.number().int().positive().nullable().optional(),
  dailyIssueLimit: z.number().int().positive().nullable().optional(),
  hourlyIssueLimit: z.number().int().positive().nullable().optional(),
});

/**
 * GET /api/v1/providers/[provider]/limits
 * Get the current issuance limits for a provider.
 */
export async function GET(request: Request, { params }: { params: Promise<{ provider: string }> }) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  const { provider } = await params;
  const limits = getProviderKeyLimit(provider);
  return NextResponse.json({ provider, limits: limits ?? null });
}

/**
 * PUT /api/v1/providers/[provider]/limits
 * Configure issuance limits for a provider.
 */
export async function PUT(request: Request, { params }: { params: Promise<{ provider: string }> }) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: { message: "Authentication required" } }, { status: 401 });
  }

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const validation = validateBody(limitsSchema, rawBody);
  if (isValidationFailure(validation)) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const { provider } = await params;
  setProviderKeyLimit(provider, validation.data);
  const updated = getProviderKeyLimit(provider);
  return NextResponse.json({ provider, limits: updated });
}
