/**
 * Browser-TLS-impersonating HTTP client for grok.com.
 *
 * Thin wrapper — all logic lives in `tlsClientBase.ts`.
 */

import { createTlsClientModule } from "./tlsClientBase.ts";

// ---------------------------------------------------------------------------
// Env-var overrides (Grok-specific names)
// ---------------------------------------------------------------------------
const DEFAULT_TIMEOUT_MS =
  Number.parseInt(process.env.OMNIROUTE_GROK_TLS_TIMEOUT_MS || "", 10) || 60_000;
const HARD_TIMEOUT_GRACE_MS =
  Number.parseInt(process.env.OMNIROUTE_GROK_TLS_GRACE_MS || "", 10) || 10_000;

// ---------------------------------------------------------------------------
// Module singleton
// ---------------------------------------------------------------------------
const module = createTlsClientModule({
  providerName: "Grok",
  tlsProfile: "chrome_146",
  domain: "https://grok.com",
  tempDirPrefix: "grok-stream-",
  defaultTimeoutMs: DEFAULT_TIMEOUT_MS,
  hardTimeoutGraceMs: HARD_TIMEOUT_GRACE_MS,
  tailFileVariant: "B1",
  responseValidation: "cf",
  exportCloudflareCheck: true,
});

// ---------------------------------------------------------------------------
// Public API — backward-compatible names
// ---------------------------------------------------------------------------
export const tlsFetchGrok = module.tlsFetch;
export const __setTlsFetchOverrideForTesting = module.__setTlsFetchOverrideForTesting;
export const isCloudflareChallenge = module.isCloudflareChallenge!;

export type { TlsFetchOptions, TlsFetchResult } from "./tlsClientBase.ts";
export { TlsClientUnavailableError, TlsClientHangError } from "./tlsClientBase.ts";
