import { NextResponse } from "next/server";
import { validateClaudeCodeCompatibleProvider } from "@/lib/providers/validation";
import { isCcCompatibleProviderEnabled } from "@/shared/utils/featureFlags";
import { providerNodeValidateSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

function sanitizeAnthropicBaseUrl(baseUrl: string) {
  return (baseUrl || "")
    .trim()
    .replace(/\/$/, "")
    .replace(/\/messages(?:\?[^#]*)?$/i, "");
}

// POST /api/provider-nodes/validate - Validate API key against base URL
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
    const validation = validateBody(providerNodeValidateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, apiKey, type, compatMode, chatPath, modelsPath } = validation.data;

    // Anthropic Compatible Validation
    if (type === "anthropic-compatible") {
      if (compatMode === "cc") {
        if (!isCcCompatibleProviderEnabled()) {
          return NextResponse.json(
            { valid: false, error: "CC Compatible provider is disabled" },
            { status: 403 }
          );
        }

        const result = await validateClaudeCodeCompatibleProvider({
          apiKey,
          providerSpecificData: {
            baseUrl: sanitizeAnthropicBaseUrl(baseUrl),
            chatPath: chatPath || undefined,
            modelsPath: modelsPath || undefined,
          },
        });

        return NextResponse.json({
          valid: !!result.valid,
          error: result.valid ? null : result.error || "Invalid API key",
          warning: result.warning || null,
          method: result.method || null,
        });
      }

      // Robustly construct URL: remove trailing slash, and remove trailing /messages if user added it
      const normalizedBase = sanitizeAnthropicBaseUrl(baseUrl);

      // Use /models endpoint for validation as many compatible providers support it (like OpenAI)
      const modelsUrl = `${normalizedBase}${modelsPath || "/models"}`;

      const res = await fetch(modelsUrl, {
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          Authorization: `Bearer ${apiKey}`, // Add Bearer token for hybrid proxies
        },
      });

      return NextResponse.json({ valid: res.ok, error: res.ok ? null : "Invalid API key" });
    }

    // OpenAI Compatible Validation (Default)
    const modelsUrl = `${baseUrl.replace(/\/$/, "")}${modelsPath || "/models"}`;
    const res = await fetch(modelsUrl, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    return NextResponse.json({ valid: res.ok, error: res.ok ? null : "Invalid API key" });
  } catch (error) {
    console.log("Error validating provider node:", error);
    return NextResponse.json({ error: "Validation failed" }, { status: 500 });
  }
}
