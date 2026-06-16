import { BaseExecutor, type ExecuteInput, type ProviderCredentials } from "../base.ts";
import { OMNIROUTE_VERSION } from "@/shared/constants/version.ts";
import { getProxyForAccount } from "../../utils/proxyFallback.ts";
import { HttpsProxyAgent } from "https-proxy-agent";
import crypto from "node:crypto";
import { createHash } from "node:crypto";
import { saveCallLog } from "@/lib/usage/callLogArtifacts.ts";
import { streamWithTimeout } from "../../utils/stream.ts";
import { ANTIGRAVITY_CONFIG } from "../../config/errorConfig.ts";
import {
  storeChatGptImage,
  getChatGptImageConversationContext,
  __resetChatGptImageCacheForTesting,
  type ChatGptImageConversationContext,
} from "../../services/chatgptImageCache.ts";

import { ENTITY_RE } from "./constants.ts";

export function normalizePublicBaseUrl(value?: string | null): string | null {
  const trimmed = value?.trim();
  if (!trimmed) return null;
  return trimmed.replace(/\/+$/, "").replace(/\/v1$/i, "");
}

export function firstForwardedValue(value?: string | null): string | null {
  const first = value?.split(",")[0]?.trim();
  return first || null;
}

export function isLocalBaseUrl(baseUrl: string): boolean {
  try {
    const host = new URL(baseUrl).hostname.toLowerCase();
    return host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "0.0.0.0";
  } catch {
    console.warn("[chatgpt-web] URL parse failed, falling back to regex");
    return /\b(?:localhost|127\.0\.0\.1|0\.0\.0\.0)\b/i.test(baseUrl);
  }
}

export function deriveHeaderBaseUrl(clientHeaders?: Record<string, string> | null): string | null {
  const headers = clientHeaders ?? {};
  const lower: Record<string, string> = {};
  for (const [k, v] of Object.entries(headers)) lower[k.toLowerCase()] = v;

  const forwardedHost = firstForwardedValue(lower["x-forwarded-host"]);
  const forwardedProto = firstForwardedValue(lower["x-forwarded-proto"]);
  const host = forwardedHost || firstForwardedValue(lower["host"]);
  if (!host) return null;

  // Default to http for IPs, localhost, and explicit host:port values where
  // TLS is not a safe assumption. Reverse proxies can override via
  // x-forwarded-proto, and deployments can force the exact value with
  // OMNIROUTE_PUBLIC_BASE_URL.
  const isPlain =
    host.includes("localhost") ||
    /^\d+\.\d+\.\d+\.\d+(:\d+)?$/.test(host) ||
    host.endsWith(".local") ||
    host.includes(":");
  const proto = forwardedProto || (isPlain ? "http" : "https");
  return `${proto}://${host}`;
}

/**
 * Build the absolute base URL the client should use to fetch our cached
 * images at /v1/chatgpt-web/image/<id>. The most reliable value is an
 * explicit browser-facing origin because relay clients such as Open WebUI
 * often reach OmniRoute from a container while the user's browser needs a
 * LAN, tunnel, or reverse-proxy URL.
 */
export function derivePublicBaseUrl(
  clientHeaders?: Record<string, string> | null,
  log?: { debug?: (tag: string, msg: string) => void }
): string {
  const explicitPublicBase = normalizePublicBaseUrl(process.env.OMNIROUTE_PUBLIC_BASE_URL);
  if (explicitPublicBase) {
    log?.debug?.("CGPT-WEB", `derivePublicBaseUrl: using OMNIROUTE_PUBLIC_BASE_URL`);
    return explicitPublicBase;
  }

  const headerBase = deriveHeaderBaseUrl(clientHeaders);
  const configuredBase =
    normalizePublicBaseUrl(process.env.OMNIROUTE_BASE_URL) ||
    normalizePublicBaseUrl(process.env.NEXT_PUBLIC_BASE_URL);

  log?.debug?.(
    "CGPT-WEB",
    `derivePublicBaseUrl: configured=${configuredBase ?? "-"} header=${headerBase ?? "-"}`
  );

  if (configuredBase && (!headerBase || !isLocalBaseUrl(configuredBase))) return configuredBase;
  if (headerBase) return headerBase;
  if (configuredBase) return configuredBase;

  return `http://localhost:${process.env.PORT || 20128}`;
}

export function cleanChatGptText(text: string): string {
  return text.replace(ENTITY_RE, "$1");
}

export function stringToStream(text: string): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  return new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(encoder.encode(text));
      controller.close();
    },
  });
}

export const __derivePublicBaseUrlForTesting = derivePublicBaseUrl;
