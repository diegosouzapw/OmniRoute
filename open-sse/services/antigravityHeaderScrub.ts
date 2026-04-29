/**
 * Antigravity header scrubbing.
 *
 * Real Antigravity is a Node.js app. Its outbound HTTP requests never include
 * proxy tracing headers, Stainless SDK headers, or Chromium Sec-Ch-* headers.
 * Sending any of these reveals the request came through a third-party proxy.
 *
 * Based on CLIProxyAPI's ScrubProxyAndFingerprintHeaders (misc/header_utils.go).
 */

const HEADERS_TO_REMOVE = [
  // Proxy tracing
  "x-forwarded-for",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-forwarded-port",
  "x-real-ip",
  "forwarded",
  "via",
  // Client identity (Stainless SDK — Claude Code specific, not Antigravity)
  "x-title",
  "x-stainless-lang",
  "x-stainless-package-version",
  "x-stainless-os",
  "x-stainless-arch",
  "x-stainless-runtime",
  "x-stainless-runtime-version",
  "x-stainless-timeout",
  "x-stainless-retry-count",
  "x-stainless-helper-method",
  "http-referer",
  "referer",
  // Browser / Chromium fingerprint (Electron clients, NOT Node.js)
  "sec-ch-ua",
  "sec-ch-ua-mobile",
  "sec-ch-ua-platform",
  "sec-fetch-mode",
  "sec-fetch-site",
  "sec-fetch-dest",
  "priority",
  // Encoding: Antigravity (Node.js) sends "gzip, deflate, br" by default;
  // Electron clients add "zstd" which is a fingerprint mismatch.
  "accept-encoding",
];

/**
 * Remove headers that reveal proxy infrastructure or non-native client identity
 * from an outgoing request to Antigravity's upstream API.
 */
export function scrubProxyAndFingerprintHeaders(
  headers: Record<string, string>
): Record<string, string> {
  const cleaned: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    const lowerKey = key.toLowerCase();
    if (!lowerKey.startsWith("x-omniroute-") && !HEADERS_TO_REMOVE.includes(lowerKey)) {
      cleaned[key] = value;
    }
  }
  // Set the standard Node.js accept-encoding
  cleaned["Accept-Encoding"] = "gzip, deflate, br";
  return cleaned;
}
