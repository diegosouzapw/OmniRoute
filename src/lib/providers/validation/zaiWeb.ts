import { extractZaiToken } from "@omniroute/open-sse/services/zaiWebCredentials.ts";
import { toValidationErrorResult, validationRead } from "./transport";

const ZAI_SESSION_PROBE_URL = "https://chat.z.ai/api/v1/users/user/settings";

export async function validateZaiWebProvider({ apiKey }: { apiKey?: string }) {
  const token = extractZaiToken(String(apiKey || ""));

  if (!token) {
    return {
      valid: false,
      error:
        'Invalid Z.ai web-session credential — copy the "token" value from chat.z.ai Local Storage.',
    };
  }

  try {
    const response = await validationRead(ZAI_SESSION_PROBE_URL, {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${token}`,
        Origin: "https://chat.z.ai",
        Referer: "https://chat.z.ai/",
      },
    });

    if (response.status >= 200 && response.status < 300) {
      return {
        valid: true,
        error: null,
      };
    }

    if (response.status === 401) {
      return {
        valid: false,
        error:
          'Invalid or expired Z.ai web-session credential — copy a fresh "token" value from chat.z.ai Local Storage.',
        statusCode: 401,
      };
    }

    return {
      valid: false,
      error: `Z.ai session validation returned HTTP ${response.status}`,
      statusCode: response.status,
    };
  } catch (error: unknown) {
    return toValidationErrorResult(error);
  }
}
