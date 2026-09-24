/**
 * Statuses a caller may write on a proxy registry row. `error` is deliberately not
 * listed: only pool validation sets it, and no import or update may send it.
 */
export const PROXY_REGISTRY_STATUS_VALUES = ["active", "inactive", "dead"] as const;

export type ProxyRegistryStatus = (typeof PROXY_REGISTRY_STATUS_VALUES)[number];

export function isProxyRegistryStatus(value: unknown): value is ProxyRegistryStatus {
  return (
    typeof value === "string" && (PROXY_REGISTRY_STATUS_VALUES as readonly string[]).includes(value)
  );
}
