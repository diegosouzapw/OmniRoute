import { NextResponse } from "next/server";
import { z } from "zod";
import { ensureCustomerPrimaryApiKey } from "@/lib/saas/ensureCustomerApiKey";
import { getSaasCustomerByEmail, verifySaasCustomerPassword } from "@/lib/localDb";
import { friendlyPortalLoginError, summarizeValidationError } from "@/lib/saas/userFacingMessages";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const portalLoginSchema = z
  .object({
    email: z.string().trim().email().max(240),
    password: z.string().min(6).max(200),
  })
  .strict();

function redactCustomerKey(key: unknown) {
  if (!key || typeof key !== "string") return null;
  return `${key.slice(0, 10)}...${key.slice(-8)}`;
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validation = validateBody(portalLoginSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(
        {
          error: summarizeValidationError(
            validation.error,
            "Revise email e senha para entrar no portal."
          ),
        },
        { status: 400 }
      );
    }

    const auth = verifySaasCustomerPassword(validation.data.email, validation.data.password);
    if (!auth) {
      const customer = getSaasCustomerByEmail(validation.data.email, { includeUsage: false });
      const errorMessage = customer
        ? "Email ou senha invalidos."
        : "Cliente nao encontrado para este email.";
      return NextResponse.json({ error: friendlyPortalLoginError(errorMessage) }, { status: 401 });
    }

    const primaryApiKey = await ensureCustomerPrimaryApiKey(auth.customer.id);
    const refreshed = verifySaasCustomerPassword(validation.data.email, validation.data.password);
    const customer = refreshed?.customer || auth.customer;

    return NextResponse.json({
      customer: {
        ...customer,
        apiKeys: (customer.apiKeys || []).map((key) => ({
          ...key,
          key: key.id === primaryApiKey?.id ? primaryApiKey?.key || key.key || null : null,
          keyPreview: redactCustomerKey(key.key || key.keyPreview),
        })),
      },
      plan: customer.planId
        ? {
            id: customer.planId,
            name: customer.planName || "Plano",
            priceMonthlyCents: customer.priceMonthlyCents || 0,
          }
        : null,
      usage: customer.usage,
      allowedCombos: customer.allowedCombos || [],
      auth: {
        email: customer.email,
        apiKey: primaryApiKey?.key || null,
        customerId: customer.id,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: friendlyPortalLoginError(message) }, { status: 500 });
  }
}
