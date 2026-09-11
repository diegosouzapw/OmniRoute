import type { Logger } from "./shared/index.js";

/** What the catalog loses when a given gateway source cannot be read. */
function consequenceOf(endpoint: string): string {
  if (endpoint.includes("/api/providers")) {
    return "the usable-provider filter is disabled for this refresh, so unprovisioned providers stay listed";
  }
  return "model names, provider tags, canonical dedupe and pricing are degraded";
}

/**
 * A source the gateway refuses is not fatal — the catalog still publishes —
 * but staying quiet about it is: the picker then shows raw ids, or lists
 * providers that cannot serve, with nothing telling the user why. Say it once
 * per endpoint so a refresh loop cannot spam the log.
 *
 * `usingFallbackToken` is true when no `managementReadToken` was configured and
 * the inference key stands in for it, which is the usual reason a gateway
 * answers 401/403 on `/api/*` — the advice differs from a token that was set
 * and still got rejected.
 */
export function createSourceErrorReporter(
  log: Logger,
  usingFallbackToken: boolean
): (endpoint: string, reason: string) => void {
  const warned = new Set<string>();
  return (endpoint, reason) => {
    if (warned.has(endpoint)) return;
    warned.add(endpoint);
    const unauthorized = reason.includes("401") || reason.includes("403");
    const hint = !unauthorized
      ? ""
      : usingFallbackToken
        ? ` These endpoints need a management token: set "managementReadToken" in the plugin options ` +
          `(it currently falls back to "apiKey", which a gateway usually rejects here).`
        : ` The configured "managementReadToken" was rejected — check it grants read access to /api/*.`;
    log.warn(
      `[omniroute-v2] gateway source ${endpoint} unavailable (${reason}): ${consequenceOf(endpoint)}.${hint}`
    );
  };
}
