/**
 * chatCore executor client-header normalizer (Quality Gate v2 / Fase 9 — chatCore god-file
 * decomposition, #3501).
 *
 * Pure helper extracted from chatCore: normalizes a Headers instance or a plain header object into a
 * lowercased-tolerant Record<string,string>, and backfills the client User-Agent (both casings) when
 * one is supplied and not already present. Returns null when nothing was collected. Side-effect-free;
 * OpenCode additionally retains explicit conversation identity before body translation.
 */
import { preserveOpencodeSessionIdentity } from "../../utils/opencodeSessionIdentity.ts";

export function buildExecutorClientHeaders(
  headers: Headers | Record<string, unknown> | null | undefined,
  userAgent?: string | null,
  request?: { provider?: string; body?: unknown }
) {
  const normalized: Record<string, string> = {};
  const isLeaseControlHeader = (key: string) => {
    const lowerKey = key.toLowerCase();
    return (
      lowerKey === "x-omniroute-lease-owner" ||
      lowerKey === "x-omniroute-lease-generation" ||
      lowerKey === "x-deadline-token"
    );
  };

  if (headers instanceof Headers) {
    headers.forEach((value, key) => {
      if (isLeaseControlHeader(key)) return;
      normalized[key] = value;
    });
  } else if (headers && typeof headers === "object") {
    for (const [key, value] of Object.entries(headers)) {
      if (isLeaseControlHeader(key)) continue;
      if (typeof value === "string") {
        normalized[key] = value;
      }
    }
  }

  const normalizedUserAgent = typeof userAgent === "string" ? userAgent.trim() : "";
  if (normalizedUserAgent && !normalized["user-agent"] && !normalized["User-Agent"]) {
    normalized["user-agent"] = normalizedUserAgent;
    normalized["User-Agent"] = normalizedUserAgent;
  }

  preserveOpencodeSessionIdentity(normalized, request);
  return Object.keys(normalized).length > 0 ? normalized : null;
}
