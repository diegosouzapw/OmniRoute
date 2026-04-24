import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { deleteSaasCustomer, getSaasCustomerById, updateSaasCustomer } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import {
  friendlyCustomerAdminError,
  summarizeValidationError,
} from "@/lib/saas/userFacingMessages";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const updateCustomerSchema = z
  .object({
    name: z.string().trim().min(1).max(160).optional(),
    email: z.string().trim().email().max(240).optional(),
    company: z.string().trim().max(160).optional(),
    status: z.enum(["active", "inactive", "blocked"]).optional(),
    billingStatus: z.enum(["active", "past_due", "canceled"]).optional(),
    paidUntil: z.string().trim().max(80).nullable().optional(),
    extraTokenCredits: z.number().int().min(0).max(10_000_000_000).optional(),
    planId: z.string().trim().min(1).nullable().optional(),
    password: z.string().min(6).max(200).optional(),
    notes: z.string().trim().max(2000).optional(),
    allowedModels: z.array(z.string().trim().min(1).max(240)).max(500).optional(),
    allowedCombos: z.array(z.string().trim().min(1).max(240)).max(200).optional(),
  })
  .strict();

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const customer = getSaasCustomerById(id);
    if (!customer) {
      return NextResponse.json(
        { error: friendlyCustomerAdminError("Customer not found") },
        { status: 404 }
      );
    }
    return NextResponse.json({ customer });
  } catch (error) {
    return NextResponse.json({ error: friendlyCustomerAdminError(error) }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const rawBody = await request.json();
    const validation = validateBody(updateCustomerSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(
        {
          error: summarizeValidationError(
            validation.error,
            "Revise os dados do cliente antes de salvar."
          ),
        },
        { status: 400 }
      );
    }
    const customer = updateSaasCustomer(id, {
      ...validation.data,
      passwordHash: validation.data.password
        ? bcrypt.hashSync(validation.data.password, 10)
        : undefined,
    });
    if (!customer) {
      return NextResponse.json(
        { error: friendlyCustomerAdminError("Customer not found") },
        { status: 404 }
      );
    }
    return NextResponse.json({ customer });
  } catch (error) {
    return NextResponse.json({ error: friendlyCustomerAdminError(error) }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const deleted = deleteSaasCustomer(id);
    if (!deleted) {
      return NextResponse.json(
        { error: friendlyCustomerAdminError("Customer not found") },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: friendlyCustomerAdminError(error) }, { status: 500 });
  }
}
