import { inheritTrustedLocalRateLimitResponse } from "@omniroute/open-sse/services/rateLimitManager/errors.ts";
import { inheritProviderProbeResponse } from "../../../shared/utils/providerProbeResult";

export function withSelectedConnectionHeader(
  response: Response,
  connectionId: string | null | undefined
): Response {
  if (!response || !connectionId) return response;

  try {
    response.headers.set("X-OmniRoute-Selected-Connection-Id", connectionId);
    return response;
  } catch {
    const cloned = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    cloned.headers.set("X-OmniRoute-Selected-Connection-Id", connectionId);
    // #15594: a cloned response must keep both the trusted local rate-limit marker and
    // the provider-probe marker of the original, or the probe fence loses track of it.
    const trusted = inheritTrustedLocalRateLimitResponse(response, cloned);
    return inheritProviderProbeResponse(response, trusted);
  }
}
