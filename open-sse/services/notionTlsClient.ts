/**
 * Browser-TLS-impersonating HTTP client for app.notion.com.
 *
 * Thin re-export over the shared `tlsClientBase.ts` factory
 * (`createTlsClientModule`). All provider-agnostic logic (wreq-js transport
 * pooling, direct streaming, proxy resolution, deadlines, SSE detection,
 * Cloudflare challenge detection) lives in the base module; this file supplies
 * only Notion-specific config and preserves the original public export surface.
 */

import {
  createTlsClientModule,
  type TlsFetchOptions,
  type TlsFetchResult,
} from "./tlsClientBase.ts";

const DEFAULT_TIMEOUT_MS =
  Number.parseInt(process.env.OMNIROUTE_NOTION_TLS_TIMEOUT_MS || "", 10) || 30_000;
const HARD_TIMEOUT_GRACE_MS =
  Number.parseInt(process.env.OMNIROUTE_NOTION_TLS_GRACE_MS || "", 10) || 10_000;

export const tlsClientModule = createTlsClientModule({
  providerName: "Notion",
  tlsProfile: "chrome_146",
  emulationOs: "windows",
  domain: "https://app.notion.com",
  streamEofPolicy: "include",
  responseValidation: "sse",
  exportCloudflareCheck: true,
  defaultTimeoutMs: DEFAULT_TIMEOUT_MS,
  hardTimeoutGraceMs: HARD_TIMEOUT_GRACE_MS,
});

export const tlsFetchNotion = (
  url: string,
  options: TlsFetchOptions = {}
): Promise<TlsFetchResult> => tlsClientModule.tlsFetch(url, options);

export const __setTlsFetchOverrideForTesting = tlsClientModule.__setTlsFetchOverrideForTesting;

export { TlsClientHangError, TlsClientUnavailableError } from "./tlsClientBase.ts";
export type { TlsFetchOptions, TlsFetchResult } from "./tlsClientBase.ts";
export { looksLikeSse, isCloudflareChallenge } from "./tlsClientBase.ts";
