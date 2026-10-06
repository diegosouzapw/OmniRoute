/**
 * Adobe Firefly key/cookie validation (#10522).
 *
 * validateProviderApiKey() previously had no SPECIALTY_VALIDATORS entry for
 * "firefly"/"adobe-firefly" and the generic WEB_COOKIE_PROVIDERS fallback used a raw,
 * unaliased lookup — so a Firefly connection always fell through to the "Provider
 * validation not supported" branch regardless of whether the pasted cookie/JWT was
 * valid. This reuses the already-working credits/balance probe
 * (getAdobeFireflyUsage, used today by the Limits/quota page) as a real auth check:
 * a successful balance fetch means the token is valid, a `{ message }` result means
 * it was rejected (expired/guest/invalid), and thrown transport errors are mapped
 * through the shared toValidationErrorResult() helper.
 */
import { getAdobeFireflyUsage } from "@omniroute/open-sse/services/usage/adobeFirefly.ts";
import { toValidationErrorResult } from "./transport";

export async function validateAdobeFireflyProvider({
  apiKey,
  providerSpecificData,
  fetchImpl = fetch,
}: {
  apiKey?: unknown;
  providerSpecificData?: Record<string, unknown> | null;
  fetchImpl?: typeof fetch;
}) {
  try {
    const key = typeof apiKey === "string" ? apiKey : undefined;
    const result = await getAdobeFireflyUsage(key, undefined, providerSpecificData, fetchImpl);

    if ("message" in result) {
      return { valid: false, error: result.message };
    }

    return { valid: true, error: null };
  } catch (error) {
    return toValidationErrorResult(error);
  }
}
