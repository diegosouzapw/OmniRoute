import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createApiKey,
  createSaasCustomer,
  getSaasCustomerById,
  linkApiKeyToSaasCustomer,
  listSaasPlans,
  updateApiKeyPermissions,
} from "@/lib/localDb";
import { getConsistentMachineId } from "@/shared/utils/machineId";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const signupSchema = z
  .object({
    name: z.string().trim().min(2).max(160),
    email: z.string().trim().email().max(240),
    company: z.string().trim().max(160).optional(),
    planId: z.string().trim().min(1),
  })
  .strict();

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validation = validateBody(signupSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(validation.error, { status: 400 });
    }

    const data = validation.data;
    const plan = listSaasPlans().find((item) => item.id === data.planId && item.isActive);
    if (!plan) {
      return NextResponse.json({ error: "Plano indisponivel." }, { status: 404 });
    }

    const customer = createSaasCustomer({
      name: data.name,
      email: data.email,
      company: data.company || "",
      status: "active",
      billingStatus: "active",
      planId: plan.id,
      allowedModels: [],
      // The commercial product exposes combos as the sellable model layer.
      allowedCombos: ["*"],
      notes: "Cadastro originado pela landing page.",
    });

    const machineId = await getConsistentMachineId();
    const apiKey = await createApiKey(`${customer.name} - Portal`, machineId);
    await updateApiKeyPermissions(apiKey.id, {
      allowedModels: [],
      noLog: false,
      isActive: true,
    });
    linkApiKeyToSaasCustomer({
      customerId: customer.id,
      apiKeyId: apiKey.id,
      label: "Principal",
      isActive: true,
    });

    return NextResponse.json(
      {
        customer: getSaasCustomerById(customer.id),
        apiKey: apiKey.key,
        message: "Conta criada. Guarde sua API key em local seguro.",
      },
      { status: 201 }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const status = message.includes("UNIQUE constraint failed") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
