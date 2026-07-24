/**
 * Browser-TLS-impersonating HTTP client for lmarena.ai.
 *
 * Thin wrapper — all logic lives in `tlsClientBase.ts`.
 *
 * NOTE: proxy domain uses `arena.ai` (not `lmarena.ai`) to match the
 * original implementation. No per-provider env-var overrides exist.
 */

import { createTlsClientModule } from "./tlsClientBase.ts";

// ---------------------------------------------------------------------------
// Module singleton (no per-provider env-var overrides)
// ---------------------------------------------------------------------------
const module = createTlsClientModule({
  providerName: "LMArena",
  tlsProfile: "chrome_146",
  domain: "https://lmarena.ai",
  proxyDomainOverride: "https://arena.ai",
  tempDirPrefix: "LMArena-stream-",
  defaultTimeoutMs: 60_000,
  hardTimeoutGraceMs: 10_000,
  tailFileVariant: "B2",
  responseValidation: "cf",
  exportCloudflareCheck: true,
});

// ---------------------------------------------------------------------------
// Public API — backward-compatible names
// ---------------------------------------------------------------------------
export const tlsFetchLMArena = module.tlsFetch;
export const __setTlsFetchOverrideForTesting = module.__setTlsFetchOverrideForTesting;
export const isCloudflareChallenge = module.isCloudflareChallenge!;

export type { TlsFetchOptions, TlsFetchResult } from "./tlsClientBase.ts";
export { TlsClientUnavailableError, TlsClientHangError } from "./tlsClientBase.ts";
