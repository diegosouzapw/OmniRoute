/**
 * FingerprintRotator — Browser fingerprint profiles for session diversity
 *
 * Each profile mimics a real browser user-agent + Sec-CH-UA headers.
 * Rotating through these prevents providers from associating requests
 * to a single browser identity for rate-limiting purposes.
 */

import { type Fingerprint } from "./types.ts";

// ─── Profiles ──────────────────────────────────────────────────────────────

const PROFILES: Fingerprint[] = [
  {
    id: "chrome-mac",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    acceptLanguage: "en-US,en;q=0.9",
    secChUa: '"Not-A.Brand";v="99", "Chromium";v="149", "Google Chrome";v="149"',
    secChUaPlatform: '"macOS"',
    secChUaMobile: "?0",
  },
  {
    id: "chrome-linux",
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    acceptLanguage: "en-US,en;q=0.9",
    secChUa: '"Not-A.Brand";v="99", "Chromium";v="149", "Google Chrome";v="149"',
    secChUaPlatform: '"Linux"',
    secChUaMobile: "?0",
  },
  {
    id: "chrome-win",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
    acceptLanguage: "en-US,en;q=0.9",
    secChUa: '"Not-A.Brand";v="99", "Chromium";v="149", "Google Chrome";v="149"',
    secChUaPlatform: '"Windows"',
    secChUaMobile: "?0",
  },
  {
    id: "firefox-mac",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:152.0) Gecko/20100101 Firefox/152.0",
    acceptLanguage: "en-US,en;q=0.9",
  },
  {
    id: "firefox-linux",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64; rv:152.0) Gecko/20100101 Firefox/152.0",
    acceptLanguage: "en-US,en;q=0.9",
  },
  {
    id: "safari-mac",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.4 Safari/605.1.15",
    acceptLanguage: "en-US,en;q=0.9",
  },
  {
    id: "edge-mac",
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0",
    acceptLanguage: "en-US,en;q=0.9",
    secChUa: '"Not-A.Brand";v="99", "Chromium";v="149", "Microsoft Edge";v="149"',
    secChUaPlatform: '"macOS"',
    secChUaMobile: "?0",
  },
  {
    id: "edge-win",
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0",
    acceptLanguage: "en-US,en;q=0.9",
    secChUa: '"Not-A.Brand";v="99", "Chromium";v="149", "Microsoft Edge";v="149"',
    secChUaPlatform: '"Windows"',
    secChUaMobile: "?0",
  },
];

// ─── FingerprintRotator ────────────────────────────────────────────────────

export class FingerprintRotator {
  private index = 0;

  /** Get the next profile in round-robin order */
  next(): Fingerprint {
    const profile = PROFILES[this.index % PROFILES.length];
    this.index++;
    return profile;
  }

  /** Get a random profile */
  random(): Fingerprint {
    return PROFILES[Math.floor(Math.random() * PROFILES.length)];
  }

  /** Reset the round-robin counter */
  reset(): void {
    this.index = 0;
  }

  /** Number of available profiles */
  get count(): number {
    return PROFILES.length;
  }

  /** Build a Headers object from a fingerprint (with optional extras) */
  buildHeaders(fingerprint: Fingerprint, extra?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
      "Accept-Language": fingerprint.acceptLanguage ?? "en-US,en;q=0.9",
      "User-Agent": fingerprint.userAgent,
      ...extra,
    };
    if (fingerprint.secChUa) {
      headers["Sec-CH-UA"] = fingerprint.secChUa;
      headers["Sec-CH-UA-Mobile"] = fingerprint.secChUaMobile ?? "?0";
      headers["Sec-CH-UA-Platform"] = fingerprint.secChUaPlatform ?? '"Windows"';
    }
    return headers;
  }

  /** List all profiles */
  listAll(): Fingerprint[] {
    return [...PROFILES];
  }
}
