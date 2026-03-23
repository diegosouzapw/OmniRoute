import { NextResponse } from "next/server";
import { getProviderNodeById } from "@/models";
import {
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";
import { validateProviderApiKey } from "@/lib/providers/validation";
import { validateProviderApiKeySchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

// POST /api/providers/validate - Validate API key with provider
export async function POST(request) {
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(validateProviderApiKeySchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { provider, apiKey, validationModelId } = validation.data;

    let providerSpecificData: any = { validationModelId };

    if (isOpenAICompatibleProvider(provider) || isAnthropicCompatibleProvider(provider)) {
      const node: any = await getProviderNodeById(provider);
      if (!node) {
        const typeName = isOpenAICompatibleProvider(provider) ? "OpenAI" : "Anthropic";
        return NextResponse.json(
          { error: `${typeName} Compatible node not found` },
          { status: 404 }
        );
      }
      providerSpecificData = {
        ...providerSpecificData,
        baseUrl: node.baseUrl,
        apiType: node.apiType,
      };
    }

    const result = await validateProviderApiKey({
      provider,
      apiKey,
      providerSpecificData,
    });

    if (result.unsupported) {
      return NextResponse.json({ error: "Provider validation not supported" }, { status: 400 });
    }

    return NextResponse.json({
      valid: !!result.valid,
      error: result.valid ? null : result.error || "Invalid API key",
      warning: result.warning || null,
      method: result.method || null,
    });
  } catch (error) {
    console.log("Error validating API key:", error);
    return NextResponse.json({ error: "Validation failed" }, { status: 500 });
  }
}
