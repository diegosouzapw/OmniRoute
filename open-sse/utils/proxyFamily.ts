import { isIP } from "node:net";

export type ProxyFamily = "auto" | "ipv4" | "ipv6";

/** Remove the surrounding brackets from an IPv6 literal host (`[::1]` -> `::1`). */
export function stripIpv6Brackets(host: string): string {
  if (typeof host !== "string") return "";
  if (host.startsWith("[") && host.endsWith("]")) {
    return host.slice(1, -1);
  }
  return host;
}

/** 4 / 6 if the host is an IP literal (brackets tolerated), null if it is a hostname. */
export function detectIpLiteralFamily(host: string): 4 | 6 | null {
  const bare = stripIpv6Brackets(host);
  const v = isIP(bare);
  return v === 0 ? null : (v as 4 | 6);
}

/** Normalize a stored family directive; anything unknown means "auto". */
export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
