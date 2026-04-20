import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createApiKey,
  createSaasCustomer,
  getSaasCustomerById,
  linkApiKeyToSaasCustomer,
  listSaasCustomers,
  updateApiKeyPermissions,
} from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const customerSchema = z
  .object({
    name: z.string().trim().min(1).max(160),
    email: z.string().trim().email().max(240),
    company: z.string().trim().max(160).optional(),
    status: z.enum(["active", "inactive", "blocked"]).optional(),
    billingStatus: z.enum(["active", "past_due", "canceled"]).optional(),
    paidUntil: z.string().trim().max(80).nullable().optional(),
    extraTokenCredits: z.number().int().min(0).max(10_000_000_000).optional(),
    planId: z.string().trim().min(1).nullable().optional(),
    notes: z.string().trim().max(2000).optional(),
    allowedModels: z.array(z.string().trim().min(1).max(240)).max(500).optional(),
    allowedCombos: z.array(z.string().trim().min(1).max(240)).max(200).optional(),
    apiKeyLabel: z.string().trim().max(120).optional(),
    createApiKey: z.boolean().optional(),
  })
  .strict();

export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    return NextResponse.json({ customers: listSaasCustomers() });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const rawBody = await request.json();
    const validation = validateBody(customerSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(validation.error, { status: 400 });
    }
    const data = validation.data;

    const customer = createSaasCustomer({
      name: data.name,
      email: data.email,
      company: data.company || "",
      status: data.status || "active",
      billingStatus: data.billingStatus || "active",
      paidUntil: data.paidUntil || null,
      extraTokenCredits: data.extraTokenCredits || 0,
      planId: data.planId || null,
      notes: data.notes || "",
      allowedModels: data.allowedModels || [],
      allowedCombos: data.allowedCombos || [],
    });

    const machineId = await getConsistentMachineId();
    const keyName = data.apiKeyLabel || `${data.name} API Key`;
    const apiKey = await createApiKey(keyName, machineId);
    const keyIsActive =
      data.status !== "blocked" &&
      data.status !== "inactive" &&
      (data.billingStatus || "active") === "active";
    await updateApiKeyPermissions(apiKey.id, {
      allowedModels: data.allowedModels || [],
      noLog: false,
      isActive: keyIsActive,
    });
    linkApiKeyToSaasCustomer({
      customerId: customer.id,
      apiKeyId: apiKey.id,
      label: data.apiKeyLabel || "Principal",
      isActive: keyIsActive,
    });

    return NextResponse.json(
      { customer: getSaasCustomerById(customer.id), apiKey: apiKey.key },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
