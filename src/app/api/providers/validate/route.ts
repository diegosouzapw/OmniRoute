import { NextResponse } from "next/server";
import { getProviderNodeById } from "@/models";
import {
  isOpenAICompatibleProvider,
  isAnthropicCompatibleProvider,
} from "@/shared/constants/providers";
import { validateProviderApiKey } from "@/lib/providers/validation";

// POST /api/providers/validate - Validate API key with provider
export async function POST(request) {
  try {
    const body = await request.json();
    const { provider, apiKey } = body;

    if (!provider || !apiKey) {
      return NextResponse.json({ error: "Provider and API key required" }, { status: 400 });
    }

    let providerSpecificData = {};

    if (isOpenAICompatibleProvider(provider) || isAnthropicCompatibleProvider(provider)) {
      const node = await getProviderNodeById(provider);
      if (!node) {
        const typeName = isOpenAICompatibleProvider(provider) ? "OpenAI" : "Anthropic";
        return NextResponse.json(
          { error: `${typeName} Compatible node not found` },
          { status: 404 }
        );
      }
      providerSpecificData = {
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
    });
  } catch (error) {
    console.log("Error validating API key:", error);
    return NextResponse.json({ error: "Validation failed" }, { status: 500 });
  }
}
