// Generic "POST /chat/completions auth probe" used by several provider validators (command-code,
// nlpcloud + the enterprise-cloud validators). Extracted from validation.ts (god-file decomposition)
// into its own leaf so both the host dispatcher and validation/cloudProviders.ts can share it without
// a cycle. Behavior is byte-identical to the original inline def.
import { applyCustomUserAgent } from "./headers";
import { toValidationErrorResult, validationWrite } from "./transport";

export async function validateDirectChatProvider({
  url,
  headers,
  body,
  providerSpecificData = {},
  isLocal = false,
}: any) {
  try {
    const response = await validationWrite(
      url,
      {
        method: "POST",
        headers: applyCustomUserAgent(headers, providerSpecificData),
        body: JSON.stringify(body),
      },
      isLocal
    );

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (
      response.ok ||
      response.status === 400 ||
      response.status === 422 ||
      response.status === 429
    ) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Provider unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
