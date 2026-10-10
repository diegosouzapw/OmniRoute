import { inheritTrustedLocalRateLimitResponse } from "@omniroute/open-sse/services/rateLimitManager/errors.ts";
import { OMNIROUTE_RESPONSE_HEADERS } from "@/shared/constants/headers";
import * as log from "../utils/logger";

/**
 * Mark a response that was served by the budget-exhaustion emergency fallback
 * (`OMNIROUTE_EMERGENCY_FALLBACK`). Without it the reroute is only visible by
 * diffing `X-OmniRoute-Provider` / `X-OmniRoute-Model` against the request, so a
 * caller that must keep roles on distinct providers cannot tell a 200 from the
 * requested model apart from one served by the free fallback. The value only
 * carries the two `provider/model` ids (never the upstream error text).
 */
export function withEmergencyFallbackHeader(
  response: Response,
  fromModel: string,
  toModel: string
): Response {
  if (!response) return response;
  // Header values must be ByteStrings: a non-Latin-1 model id would make
  // Headers#set throw and turn a served 200 into an error, so keep printable ASCII.
  const clean = (value: string) => value.replace(/[^\x20-\x7e]/g, "");
  const value = `from=${clean(fromModel)}; to=${clean(toModel)}`;

  try {
    response.headers.set(OMNIROUTE_RESPONSE_HEADERS.emergencyFallback, value);
    return response;
  } catch {
    const cloned = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    cloned.headers.set(OMNIROUTE_RESPONSE_HEADERS.emergencyFallback, value);
    return inheritTrustedLocalRateLimitResponse(response, cloned);
  }
}

/**
 * Call-site helper for chat.ts (#14956): log that the emergency fallback served
 * the request and stamp the response. Kept here so the chat.ts hunk stays one line.
 */
export function markEmergencyFallback(
  response: Response,
  fromModel: string,
  toModel: string
): Response {
  log.warn("EMERGENCY_FALLBACK", `Served by emergency fallback: ${fromModel} -> ${toModel}`);
  return withEmergencyFallbackHeader(response, fromModel, toModel);
}
