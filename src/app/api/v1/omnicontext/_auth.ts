import { errorResponse } from "@omniroute/open-sse/utils/error.ts";
import { HTTP_STATUS } from "@omniroute/open-sse/config/constants.ts";
import { getApiKeyMetadata } from "@/lib/db/apiKeys";
import { extractApiKey, isValidApiKey } from "@/sse/services/auth";

/** Resolve authenticated API key id for OmniContext client routes. */
export async function requireOmniContextApiKeyId(
  request: Request
): Promise<{ apiKeyId: string } | Response> {
  const apiKey = extractApiKey(request);
  if (!apiKey || !(await isValidApiKey(apiKey))) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "Authentication required");
  }
  const meta = await getApiKeyMetadata(apiKey);
  if (!meta?.id) {
    return errorResponse(HTTP_STATUS.UNAUTHORIZED, "API key metadata unavailable");
  }
  return { apiKeyId: meta.id };
}
