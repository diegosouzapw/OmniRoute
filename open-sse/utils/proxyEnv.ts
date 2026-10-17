/** Environment routing only: no feature flags, server state or DB imports. */
import { normalizeProxyUrl } from "./proxyDispatcher.ts";

export function noProxyMatch(targetUrl: string): boolean {
  const noProxy = process.env.NO_PROXY || process.env.no_proxy;
  if (!noProxy) return false;
  let target: URL;
  try {
    target = new URL(targetUrl);
  } catch {
    return false;
  }
  const hostname = target.hostname.toLowerCase();
  const port = target.port || (target.protocol === "https:" ? "443" : "80");
  const patterns = noProxy
    .split(",")
    .map((p) => p.trim().toLowerCase())
    .filter(Boolean);
  return patterns.some((pattern) => {
    if (pattern === "*") return true;
    const [patternHost, patternPort] = pattern.split(":");
    if (patternPort && patternPort !== port) return false;
    if (!patternHost) return false;
    // Same linear glob scan used by proxyFetch; intentionally retain its matching semantics.
    if (patternHost.includes("*")) {
      const parts = patternHost.split("*");
      let pos = 0;
      let ok = hostname.startsWith(parts[0]);
      if (ok) {
        pos = parts[0].length;
        for (let i = 1; i < parts.length && ok; i++) {
          const seg = parts[i];
          if (i === parts.length - 1) {
            ok = seg === "" || (hostname.endsWith(seg) && hostname.length - seg.length >= pos);
          } else {
            const idx = seg ? hostname.indexOf(seg, pos) : pos;
            if (idx === -1) ok = false;
            else pos = idx + seg.length;
          }
        }
      }
      if (ok) return true;
    }
    if (patternHost.startsWith(".")) {
      return hostname.endsWith(patternHost) || hostname === patternHost.slice(1);
    }
    return hostname === patternHost || hostname.endsWith(`.${patternHost}`);
  });
}

export function resolveEnvProxyUrl(targetUrl: string): string | null {
  if (noProxyMatch(targetUrl)) return null;
  let protocol: string;
  try {
    protocol = new URL(targetUrl).protocol;
  } catch {
    return null;
  }
  const proxyUrl =
    protocol === "https:"
      ? process.env.HTTPS_PROXY ||
        process.env.https_proxy ||
        process.env.ALL_PROXY ||
        process.env.all_proxy
      : process.env.HTTP_PROXY ||
        process.env.http_proxy ||
        process.env.ALL_PROXY ||
        process.env.all_proxy;
  if (!proxyUrl) return null;
  return normalizeProxyUrl(proxyUrl, "environment proxy");
}
