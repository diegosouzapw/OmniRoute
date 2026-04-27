import { NextResponse } from "next/server";

import { getApiKeyMetadata } from "@/lib/localDb";
import { CORS_HEADERS } from "@/shared/utils/cors";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";

export interface ApiKeyRequestScope {
  apiKey: string | null;
  apiKeyId: string | null;
  apiKeyMetadata: Awaited<ReturnType<typeof getApiKeyMetadata>>;
  rejection: Response | null;
}

export async function getApiKeyRequestScope(request: Request): Promise<ApiKeyRequestScope> {
  const apiKey = extractApiKey(request);

  if (process.env.REQUIRE_API_KEY === "true") {
    if (!apiKey) {
      return {
        apiKey: null,
        apiKeyId: null,
        apiKeyMetadata: null,
        rejection: NextResponse.json(
          { error: { message: "Missing API key", type: "invalid_request_error" } },
          { status: 401, headers: CORS_HEADERS }
        ),
      };
    }

    if (!(await isValidApiKey(apiKey))) {
      return {
        apiKey: null,
        apiKeyId: null,
        apiKeyMetadata: null,
        rejection: NextResponse.json(
          { error: { message: "Invalid API key", type: "invalid_request_error" } },
          { status: 401, headers: CORS_HEADERS }
        ),
      };
    }
  }

  if (apiKey && !(await isValidApiKey(apiKey))) {
    return {
      apiKey: null,
      apiKeyId: null,
      apiKeyMetadata: null,
      rejection: NextResponse.json(
        { error: { message: "Invalid API key", type: "invalid_request_error" } },
        { status: 401, headers: CORS_HEADERS }
      ),
    };
  }

  const apiKeyMetadata = await getApiKeyMetadata(apiKey);
  return {
    apiKey,
    apiKeyId: apiKeyMetadata?.id || null,
    apiKeyMetadata,
    rejection: null,
  };
}
