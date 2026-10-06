/**
 * chatCore noAuth-provider echoModel aliasing (PR #10571).
 *
 * Pure helper extracted from chatCore: for a bare (unprefixed) requested model
 * routed to a no-auth catalog provider (e.g. `opencode`), returns the
 * `<alias>/<model>` listing-valid form so that clients validating
 * `response.model` against the provider's entry in `/v1/models` (which lists
 * models under the provider's alias prefix) don't warn/reject. Returns null
 * when the request does not match that shape, leaving any existing echoModel
 * decision (e.g. the #1311 opt-in echo) untouched.
 */
import { REGISTRY } from "../../config/providerRegistry.ts";
import { isNoAuthProviderKey } from "@/shared/utils/noAuthProviders.ts";

export function resolveNoAuthEchoModel(
  requestedModel: unknown,
  provider: string | null | undefined
): string | null {
  if (typeof requestedModel !== "string" || !requestedModel) return null;
  if (requestedModel.includes("/")) return null;
  if (!isNoAuthProviderKey(provider)) return null;

  const alias = (provider && REGISTRY[provider]?.alias) || provider;
  return `${alias}/${requestedModel}`;
}
