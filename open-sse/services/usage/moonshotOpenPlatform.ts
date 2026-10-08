/**
 * Moonshot Open Platform host recognition.
 *
 * Distinguishes prepaid Open Platform keys (api.moonshot.cn / api.moonshot.ai)
 * from Kimi Coding Plan (api.kimi.com/coding). Custom compatible nodes are
 * identified by baseUrl host, not by provider id (those ids are uuids).
 */

import { moonshotProvider } from "../../config/providers/registry/moonshot/index.ts";
import { kimiProvider } from "../../config/providers/registry/kimi/index.ts";

export const MOONSHOT_OPEN_PLATFORM_HOSTS: ReadonlySet<string> = new Set([
  "api.moonshot.cn",
  "api.moonshot.ai",
]);

export type MoonshotOriginConnection = {
  provider?: string;
  providerSpecificData?: unknown;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function parseMoonshotOrigin(baseUrl: string | null | undefined): string | null {
  if (typeof baseUrl !== "string" || baseUrl.trim() === "") return null;
  let url: URL;
  try {
    url = new URL(baseUrl.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  const host = url.hostname.toLowerCase();
  if (!MOONSHOT_OPEN_PLATFORM_HOSTS.has(host)) return null;
  const port = url.port ? `:${url.port}` : "";
  return `${url.protocol}//${host}${port}`;
}

export function moonshotBalanceUrl(origin: string): string {
  return `${origin}/v1/users/me/balance`;
}

function registryDefaultOrigin(provider: string | undefined): string | null {
  if (provider === "moonshot") return parseMoonshotOrigin(moonshotProvider.baseUrl);
  if (provider === "kimi") return parseMoonshotOrigin(kimiProvider.baseUrl);
  return null;
}

function explicitBaseUrl(
  connection: MoonshotOriginConnection,
  nodeBaseUrl?: string | null
): string | null {
  const psd = asRecord(connection.providerSpecificData);
  if (typeof psd.baseUrl === "string" && psd.baseUrl.trim()) return psd.baseUrl.trim();
  if (typeof nodeBaseUrl === "string" && nodeBaseUrl.trim()) return nodeBaseUrl.trim();
  return null;
}

/**
 * True when the connection (or node) is pointed at Kimi Coding Plan
 * (`api.kimi.com/coding`), not Moonshot Open Platform prepaid balance.
 */
export function isKimiCodingBaseUrl(baseUrl: string | null | undefined): boolean {
  if (typeof baseUrl !== "string" || baseUrl.trim() === "") return false;
  let url: URL;
  try {
    url = new URL(baseUrl.trim());
  } catch {
    return false;
  }
  if (url.protocol !== "https:" && url.protocol !== "http:") return false;
  if (url.hostname.toLowerCase() !== "api.kimi.com") return false;
  return url.pathname === "/coding" || url.pathname.startsWith("/coding/");
}

export function isKimiCodingConnection(
  connection: MoonshotOriginConnection,
  nodeBaseUrl?: string | null
): boolean {
  return isKimiCodingBaseUrl(explicitBaseUrl(connection, nodeBaseUrl));
}

export function resolveMoonshotOrigin(
  connection: MoonshotOriginConnection,
  nodeBaseUrl?: string | null
): string | null {
  const explicit = explicitBaseUrl(connection, nodeBaseUrl);
  if (explicit) return parseMoonshotOrigin(explicit);
  return registryDefaultOrigin(connection.provider);
}

export function isMoonshotOpenPlatformConnection(
  connection: MoonshotOriginConnection,
  nodeBaseUrl?: string | null
): boolean {
  return resolveMoonshotOrigin(connection, nodeBaseUrl) !== null;
}

/** Account-level empty wallet on Open Platform. Narrower than any compatible 429. */
export function isMoonshotAccountBalanceExhausted(errorText: string | null | undefined): boolean {
  const lower = String(errorText || "").toLowerCase();
  return lower.includes("insufficient balance") || lower.includes("exceeded_current_quota");
}
