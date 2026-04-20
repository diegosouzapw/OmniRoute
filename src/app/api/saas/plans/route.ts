import { NextResponse } from "next/server";
import { z } from "zod";
import { deleteSaasPlan, listSaasPlans, upsertSaasPlan } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const planSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().trim().min(1).max(120),
    slug: z.string().trim().max(120).optional(),
    monthlyTokenLimit: z.number().int().min(0).max(10_000_000_000),
    priceMonthlyCents: z.number().int().min(0).max(100_000_000).optional(),
    isActive: z.boolean().optional(),
    allowAllModels: z.boolean().optional(),
    allowAllCombos: z.boolean().optional(),
  })
  .strict();

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    return NextResponse.json({ plans: listSaasPlans() });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const id = new URL(request.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing plan id" }, { status: 400 });
    const deleted = deleteSaasPlan(id);
    if (!deleted) return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 409 });
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();
    const validation = validateBody(planSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(validation.error, { status: 400 });
    }
    const plan = upsertSaasPlan(validation.data);
    return NextResponse.json({ plan }, { status: validation.data.id ? 200 : 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const status = message.includes("UNIQUE constraint failed") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
