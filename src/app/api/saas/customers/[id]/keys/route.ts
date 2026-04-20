import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createApiKey,
  getSaasCustomerById,
  linkApiKeyToSaasCustomer,
  updateApiKeyPermissions,
} from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const createCustomerKeySchema = z
  .object({
    label: z.string().trim().min(1).max(120).optional(),
  })
  .strict();

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { id } = await params;
    const customer = getSaasCustomerById(id);
    if (!customer) return NextResponse.json({ error: "Customer not found" }, { status: 404 });

    const rawBody = await request.json().catch(() => ({}));
    const validation = validateBody(createCustomerKeySchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(validation.error, { status: 400 });
    }

    const label = validation.data.label || "API Key";
    const machineId = await getConsistentMachineId();
    const apiKey = await createApiKey(`${customer.name} - ${label}`, machineId);
    await updateApiKeyPermissions(apiKey.id, {
      allowedModels: customer.allowedModels || [],
      noLog: false,
      isActive: customer.status === "active",
    });
    linkApiKeyToSaasCustomer({
      customerId: customer.id,
      apiKeyId: apiKey.id,
      label,
      isActive: customer.status === "active",
    });

    return NextResponse.json(
      { customer: getSaasCustomerById(customer.id), apiKey: apiKey.key },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const status = message.includes("UNIQUE constraint failed") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
