export type TrustProxyMode = "none" | "loopback" | "private";

/**
 * How far a reverse proxy in front of OmniRoute is trusted to report the client, from
 * `OMNIROUTE_TRUST_PROXY`: unset or falsy trusts none, `true` / `loopback` a proxy on the
 * loopback interface, `private` / `lan` also a proxy on a private-LAN address.
 */
export function getTrustProxyMode(): TrustProxyMode {
  const raw = process.env.OMNIROUTE_TRUST_PROXY?.trim().toLowerCase();
  if (!raw || ["0", "false", "none", "off", "no", "disable", "disabled"].includes(raw)) {
    return "none";
  }
  if (["true", "1", "loopback"].includes(raw)) return "loopback";
  if (raw === "private" || raw === "lan") return "private";
  return "none";
}
