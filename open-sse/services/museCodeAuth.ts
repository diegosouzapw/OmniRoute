import {
  MUSE_CODE_MINT_URL,
  museCodeHeaders,
  normalizeMuseBaseUrl,
} from "../config/museCode.ts";

export type MuseMintedKey = {
  apiKey: string;
  baseUrl: string;
  email?: string;
  name?: string;
  subsTierName?: string;
  subsTierId?: string;
  isSubsActive?: boolean;
  hasPaymentMethod?: boolean;
  requirePayment?: boolean;
  canSubscribe?: boolean;
};

/**
 * Exchange a Meta device-client access token (`dca:…`) for the subscription
 * inference key. Matches CLIProxyAPI MintAPIKey.
 */
export async function mintMuseApiKey(
  dcaToken: string,
  mintUrl = MUSE_CODE_MINT_URL
): Promise<MuseMintedKey> {
  const token = dcaToken.trim();
  if (!token) {
    throw new Error("Muse Code mint requires a device access token.");
  }
  const response = await fetch(mintUrl, {
    method: "POST",
    headers: museCodeHeaders({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    }),
    body: JSON.stringify({ dca_token: token }),
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(`Muse Code key mint failed (HTTP ${response.status}).`);
  }
  let data: Record<string, unknown>;
  try {
    data = text ? (JSON.parse(text) as Record<string, unknown>) : {};
  } catch {
    throw new Error("Muse Code key mint response was not JSON.");
  }
  const apiKey =
    (typeof data.api_key === "string" && data.api_key.trim()) ||
    (typeof data.apiKey === "string" && data.apiKey.trim()) ||
    "";
  if (!apiKey) {
    throw new Error("Muse Code key mint response missing api_key.");
  }
  return {
    apiKey,
    baseUrl: normalizeMuseBaseUrl(
      (typeof data.base_url === "string" && data.base_url) ||
        (typeof data.baseUrl === "string" && data.baseUrl) ||
        ""
    ),
    email:
      (typeof data.user_email === "string" && data.user_email.trim()) ||
      (typeof data.email === "string" && data.email.trim()) ||
      undefined,
    name:
      (typeof data.user_full_name === "string" && data.user_full_name.trim()) ||
      (typeof data.name === "string" && data.name.trim()) ||
      undefined,
    subsTierName: typeof data.subs_tier_name === "string" ? data.subs_tier_name : undefined,
    subsTierId: typeof data.subs_tier_id === "string" ? data.subs_tier_id : undefined,
    isSubsActive: typeof data.is_subs_active === "boolean" ? data.is_subs_active : undefined,
    hasPaymentMethod:
      typeof data.has_payment_method === "boolean" ? data.has_payment_method : undefined,
    requirePayment: typeof data.require_payment === "boolean" ? data.require_payment : undefined,
    canSubscribe: typeof data.can_subscribe === "boolean" ? data.can_subscribe : undefined,
  };
}
