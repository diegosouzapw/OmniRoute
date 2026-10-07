/**
 * Policy-aware host eligibility for OpenAI-compatible `provider_nodes`.
 *
 * Modality routes that dispatch to provider nodes (rerank today, audio via its own
 * selection step) answer two questions before forwarding a request:
 *
 *  1. Is the node loopback (operator's machine / Docker network)? Always eligible.
 *     See `./loopbackNodeHost.ts`.
 *
 *  2. Otherwise, may the route dispatch to a REMOTE node (a LAN box, a Tailscale peer,
 *     a public host)? Two conditions, both required:
 *       - the route's operator opt-in flag is set (e.g. `RERANK_REMOTE_PROVIDER_NODES`,
 *         mirroring `AUDIO_REMOTE_PROVIDER_NODES` — routing to a remote host changes
 *         egress identity and must be an explicit decision, cf. #3963), and
 *       - the node's base URL passes the same outbound URL policy that already governs
 *         provider-node creation and use (`getProviderOutboundGuard()`, #5066 / #9123).
 *         A node that was allowed to be created is therefore allowed to be routed to,
 *         and a URL the policy blocks (cloud-metadata always; any private host under
 *         strict `public-only`) is never routed to, whatever the flag says.
 */

import { isLoopbackNodeHost } from "./loopbackNodeHost";
import {
  parseAndValidateNonMetadataUrl,
  parseAndValidatePublicUrl,
  parseOutboundUrl,
} from "./outboundUrlGuard";
import { getProviderOutboundGuard } from "./outboundUrlGuardPolicy";

export { isLoopbackNodeHost };

/**
 * Whether a non-loopback provider-node base URL passes the provider outbound URL policy.
 * Mirrors `guardProviderNodeBaseUrl()` on the node-creation path so routing and creation
 * agree: `none` → protocol/credential checks only; `block-metadata` (local-first default)
 * → LAN allowed, cloud-metadata blocked; `public-only` → private hosts blocked.
 */
export function isRemoteNodeHostAllowedByPolicy(baseUrl: string): boolean {
  try {
    const guard = getProviderOutboundGuard();
    if (guard === "none") {
      parseOutboundUrl(baseUrl);
    } else if (guard === "block-metadata") {
      parseAndValidateNonMetadataUrl(baseUrl);
    } else {
      parseAndValidatePublicUrl(baseUrl);
    }
    return true;
  } catch {
    return false;
  }
}

/**
 * Combined eligibility used by modality routes: loopback nodes are always eligible;
 * remote nodes are eligible only when the route's operator opt-in is set AND the URL
 * passes the outbound policy.
 */
export function isEligibleProviderNodeHost(
  baseUrl: string,
  { allowRemote }: { allowRemote: boolean }
): boolean {
  if (isLoopbackNodeHost(baseUrl)) return true;
  if (!allowRemote) return false;
  return isRemoteNodeHostAllowedByPolicy(baseUrl);
}
