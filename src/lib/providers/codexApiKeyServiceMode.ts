import { parseApiKeyCodexServiceMode } from "../../shared/constants/codexServiceMode";

// Request-local metadata, never accepted from a client body or persisted credentials.
const SERVICE_TIER_OVERRIDE = Symbol.for("omniroute.apiKeyCodexServiceTier");

export function applyApiKeyCodexServiceMode<T>(provider: string, body: T, mode: unknown): T {
  const tier = parseApiKeyCodexServiceMode(mode);
  if (provider !== "codex" || tier === "inherit" || !body || typeof body !== "object") {
    return body;
  }
  return { ...body, service_tier: tier };
}

export function withApiKeyCodexServiceMode<T>(provider: string, credentials: T, mode: unknown): T {
  const tier = parseApiKeyCodexServiceMode(mode);
  if (provider !== "codex" || tier === "inherit" || !credentials) return credentials;
  return { ...credentials, [SERVICE_TIER_OVERRIDE]: tier };
}

export function getApiKeyCodexServiceTier(
  credentials: unknown
): "default" | "priority" | "flex" | null {
  if (!credentials || typeof credentials !== "object") return null;
  const tier = parseApiKeyCodexServiceMode(
    (credentials as Record<symbol, unknown>)[SERVICE_TIER_OVERRIDE]
  );
  return tier === "inherit" ? null : tier;
}
