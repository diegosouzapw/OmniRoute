/** The only additional server environment inputs allowed into the isolated exporter. */
export const EXPORT_PROXY_TLS_ENV = [
  "HTTP_PROXY",
  "HTTPS_PROXY",
  "ALL_PROXY",
  "NO_PROXY",
  "http_proxy",
  "https_proxy",
  "all_proxy",
  "no_proxy",
  "OMNIROUTE_LOCAL_PROVIDER_NODE_HOSTS",
  "NODE_EXTRA_CA_CERTS",
  "SSL_CERT_FILE",
  "SSL_CERT_DIR",
] as const;

/** Redact both full proxy URLs and encoded/decoded userinfo, even in bare diagnostics. */
export function exportProxySecretValues(): string[] {
  const values = new Set<string>();
  for (const name of [
    "HTTP_PROXY",
    "HTTPS_PROXY",
    "ALL_PROXY",
    "http_proxy",
    "https_proxy",
    "all_proxy",
  ]) {
    const raw = process.env[name];
    if (!raw) continue;
    values.add(raw);
    try {
      const url = new URL(raw);
      for (const value of [url.username, url.password]) {
        if (!value) continue;
        values.add(value);
        try {
          values.add(decodeURIComponent(value));
        } catch {
          /* Invalid escape: encoded form is still redacted. */
        }
      }
      if (url.username || url.password) {
        values.add(
          Buffer.from(
            `${decodeURIComponent(url.username)}:${decodeURIComponent(url.password)}`
          ).toString("base64")
        );
      }
    } catch {
      /* Malformed proxy URL: redact the raw value without logging it. */
    }
  }
  return [...values].sort((a, b) => b.length - a.length);
}
