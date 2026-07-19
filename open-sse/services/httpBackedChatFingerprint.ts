/**
 * Header fingerprint resolution for `httpBackedChat()`.
 *
 * claude.ai MUST reuse the exact fingerprint the Turnstile solver used to
 * mint `cf_clearance` (see `open-sse/config/claudeWebFingerprint.ts`) —
 * otherwise Cloudflare rejects the replayed cookie and every request 429s
 * (#7548). Other `httpBackedChat` callers (e.g. duckduckgo-web) keep their
 * own independent fingerprint, which never needs to match a solved cookie.
 */
import { CLAUDE_WEB_FINGERPRINT } from "../config/claudeWebFingerprint.ts";

export interface HttpBackedChatFingerprint {
  userAgent: string;
  secChUa: string;
  secChUaPlatform: string;
}

const DUCKDUCKGO_FALLBACK_FINGERPRINT: HttpBackedChatFingerprint = {
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
  secChUa: '"Chromium";v="149", "Google Chrome";v="149", "Not-A.Brand";v="99"',
  secChUaPlatform: '"macOS"',
};

export function resolveHttpBackedChatFingerprint(
  chatUrlMatchDomain: string
): HttpBackedChatFingerprint {
  return chatUrlMatchDomain === "claude.ai" ? CLAUDE_WEB_FINGERPRINT : DUCKDUCKGO_FALLBACK_FINGERPRINT;
}
