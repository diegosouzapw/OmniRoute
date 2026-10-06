import { getCachedProviderConnectionById } from "@/lib/db/readCache";
import { isOfficialAnthropicBaseUrl } from "../../utils/anthropicHost.ts";

/** Only the selected first-party Anthropic connection can complete without content blocks. */
export async function isTrustedEmptyTurn(
  provider: string | null,
  response: Response,
  fallbackConnectionId?: string | null
): Promise<boolean> {
  if (provider !== null && provider !== "claude" && provider !== "anthropic") return false;

  const selectedConnectionId = response.headers.get("X-OmniRoute-Selected-Connection-Id");
  // An unresolved alias cannot use a planned connection as proof of actual dispatch.
  const connectionId = selectedConnectionId || (provider === null ? null : fallbackConnectionId);
  if (!connectionId) return false;

  try {
    const connection = await getCachedProviderConnectionById(connectionId);
    if (connection?.provider !== "claude" && connection?.provider !== "anthropic") return false;
    if (provider !== null && connection.provider !== provider) return false;
    const data = connection.providerSpecificData;
    if (data != null && (typeof data !== "object" || Array.isArray(data))) return false;
    const baseUrl = (data as Record<string, unknown> | null)?.baseUrl;
    if (baseUrl != null && typeof baseUrl !== "string") return false;
    return isOfficialAnthropicBaseUrl(typeof baseUrl === "string" ? baseUrl : "");
  } catch {
    return false;
  }
}
