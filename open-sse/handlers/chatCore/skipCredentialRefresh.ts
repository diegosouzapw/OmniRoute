import { isNoAuthProviderKey } from "@/shared/utils/noAuthProviders";
import { isOpencodeFreeTierRefusalForProvider } from "../../executors/opencodeGeoBlock.ts";

/**
 * True when a 401/403 from `provider` cannot be cured by refreshing credentials.
 *
 * - A no-auth provider holds nothing to refresh: each attempt fails after its
 *   retries, and repeated failures open the provider-wide refresh breaker.
 * - A refusal scoped to the request (same verdict from every account) says nothing
 *   about the token, so a refresh only adds latency before the same answer.
 *
 * The body is read from a clone so the caller can still consume the response.
 */
export async function shouldSkipCredentialRefresh(
  provider: string | null | undefined,
  response: Response
): Promise<boolean> {
  if (isNoAuthProviderKey(provider)) return true;
  if (!provider || !provider.toLowerCase().startsWith("opencode")) return false;
  const bodyText = await response
    .clone()
    .text()
    .catch(() => null);
  return isOpencodeFreeTierRefusalForProvider(provider, response.status, bodyText);
}
