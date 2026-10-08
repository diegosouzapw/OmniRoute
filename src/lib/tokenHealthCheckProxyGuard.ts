import { resolveProxyForConnection } from "@/lib/db/settings";
import { hasBlockingProxyAssignment } from "@/lib/db/proxies";

/**
 * #13470: fail-closed guard for the token-health-check sweep, mirroring the #6246
 * contract the interactive chat/executor path enforces via
 * `safeResolveProxy`/`hasBlockingProxyAssignment` (src/sse/handlers/chatHelpers.ts).
 * Before this guard, the sweep called `resolveProxyForConnection` directly and a
 * connection whose assigned proxy pool had gone fully dead resolved silently to
 * direct/env-proxy egress — leaking the refresh-token exchange on the real IP.
 * Callers must skip (log + return) rather than throw: this sweeps many connections
 * per tick and one blocked connection must not abort the rest.
 */
export async function resolveGuardedProxyConfig(
  connectionId: string,
  provider?: string
): Promise<{ proxyConfig: unknown; blocked: boolean }> {
  const resolved = (await resolveProxyForConnection(connectionId)) as { proxy?: unknown } | null;
  const proxyConfig = resolved?.proxy ?? null;
  if (!proxyConfig && hasBlockingProxyAssignment(connectionId, provider)) {
    return { proxyConfig: null, blocked: true };
  }
  return { proxyConfig, blocked: false };
}
