import { NextResponse } from "next/server";
import { z } from "zod";
import { getApiKeyMetadata, getSaasPolicyForApiKeyId } from "@/lib/localDb";
import {
  friendlyPortalSessionError,
  summarizeValidationError,
} from "@/lib/saas/userFacingMessages";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

const portalAuthSchema = z
  .object({
    email: z.string().trim().email().max(240),
    apiKey: z.string().trim().min(12).max(500),
  })
  .strict();

function redactCustomerKey(key: unknown) {
  if (!key || typeof key !== "string") return null;
  return `${key.slice(0, 10)}...${key.slice(-8)}`;
}

export async function POST(request: Request) {
  try {
    const rawBody = await request.json();
    const validation = validateBody(portalAuthSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(
        {
          error: summarizeValidationError(
            validation.error,
            "Nao foi possivel validar a sessao do portal."
          ),
        },
        { status: 400 }
      );
    }

    const { email, apiKey } = validation.data;
    const metadata = await getApiKeyMetadata(apiKey);
    if (!metadata?.id) {
      return NextResponse.json(
        { error: friendlyPortalSessionError("API key ou email invalido.") },
        { status: 401 }
      );
    }

    const policy = getSaasPolicyForApiKeyId(metadata.id);
    if (!policy || policy.customer.email.toLowerCase() !== email.toLowerCase()) {
      return NextResponse.json(
        { error: friendlyPortalSessionError("API key ou email invalido.") },
        { status: 401 }
      );
    }

    const customer = {
      ...policy.customer,
      apiKeys: (policy.customer.apiKeys || []).map((key) => ({
        ...key,
        key: key.key === apiKey ? apiKey : null,
        keyPreview: redactCustomerKey(key.key || key.keyPreview),
      })),
    };

    return NextResponse.json({
      customer,
      plan: policy.plan,
      usage: policy.usage,
      allowedCombos: policy.allowedCombos,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: friendlyPortalSessionError(message) }, { status: 500 });
  }
}
