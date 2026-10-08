import { getGitHubCopilotChatUserAgent } from "@omniroute/open-sse/config/providerHeaderProfiles.ts";
import { GHE_COPILOT_CONFIG } from "../constants/oauth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { SafeOutboundFetchError, safeOutboundFetch } from "@/shared/network/safeOutboundFetch";
import { getProviderOutboundGuard } from "@/shared/network/outboundUrlGuardPolicy";

/**
 * GHE Copilot OAuth provider.
 *
 * Reuses the GitHub device-code flow but targets the GitHub Enterprise host
 * configured per-connection via `gheUrl` (stored in providerSpecificData).
 * The device-code / token / user-info / copilot-token endpoints are derived
 * from gheUrl at request time.
 */

function normalizeGheUrl(value: unknown): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error("gheUrl is required for GHE Copilot OAuth");
  }
  return value.trim().replace(/\/+$/, "");
}

// gheUrl is supplied by whoever starts the device flow, and the route only checks that it is
// https. Send every request built from it through the provider outbound guard and refuse
// redirects, otherwise an https host can bounce the request to an internal or metadata
// address over plain http and the response is handed back to the caller. A GHE host is never
// a cloud metadata endpoint, so that block stays on even when private provider URLs are allowed.
function gheFetch(url: string, init: RequestInit) {
  const guard = getProviderOutboundGuard();
  return safeOutboundFetch(url, { ...init, guard: guard === "none" ? "block-metadata" : guard });
}

// The device-flow responses are relayed to the browser, so only the fields the flow uses are
// passed on instead of whatever the host chose to send.
const DEVICE_CODE_STRING_FIELDS = [
  "device_code",
  "user_code",
  "verification_uri",
  "verification_uri_complete",
] as const;
const DEVICE_CODE_NUMBER_FIELDS = ["expires_in", "interval"] as const;
const TOKEN_STRING_FIELDS = ["access_token", "refresh_token", "token_type", "scope"] as const;
const DEVICE_FLOW_ERRORS = new Set([
  "authorization_pending",
  "slow_down",
  "expired_token",
  "access_denied",
  "incorrect_device_code",
  "incorrect_client_credentials",
  "device_flow_disabled",
  "unsupported_grant_type",
]);

function pickFields(source: any, strings: readonly string[], numbers: readonly string[]) {
  const picked: Record<string, string | number> = {};
  if (!source || typeof source !== "object") return picked;
  for (const key of strings) {
    if (typeof source[key] === "string") picked[key] = source[key];
  }
  for (const key of numbers) {
    if (typeof source[key] === "number") picked[key] = source[key];
  }
  return picked;
}

// Lookups that only enrich the connection: a host that refuses them, or redirects them, just
// leaves the extra fields empty.
async function optionalJson(url: string, init: RequestInit) {
  try {
    const response = await gheFetch(url, init);
    return response.ok ? await response.json() : {};
  } catch (error) {
    if (error instanceof SafeOutboundFetchError) return {};
    throw error;
  }
}

export const gheCopilot = {
  config: GHE_COPILOT_CONFIG,
  flowType: "device_code" as const,
  requestDeviceCode: async (config: any) => {
    const gheUrl = normalizeGheUrl(config.gheUrl);
    const response = await gheFetch(`${gheUrl}/login/device/code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        scope: config.scopes,
      }),
    });
    if (!response.ok) {
      throw new Error(`Device code request failed (HTTP ${response.status})`);
    }
    return pickFields(await response.json(), DEVICE_CODE_STRING_FIELDS, DEVICE_CODE_NUMBER_FIELDS);
  },
  pollToken: async (config: any, deviceCode: string, _codeVerifier?: string, extraData?: any) => {
    const gheUrl = normalizeGheUrl(extraData?.gheUrl || config.gheUrl);
    const response = await gheFetch(`${gheUrl}/login/oauth/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        client_id: config.clientId,
        device_code: deviceCode,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      }),
    });
    const text = await response.text();
    let raw: any;
    try {
      raw = JSON.parse(text);
    } catch {
      return {
        ok: response.ok,
        data: { error: "invalid_response", error_description: "Unexpected response from GHE host" },
      };
    }
    const data: Record<string, unknown> = pickFields(raw, TOKEN_STRING_FIELDS, ["expires_in"]);
    if (typeof raw?.error === "string") {
      data.error = DEVICE_FLOW_ERRORS.has(raw.error) ? raw.error : "invalid_response";
      if (typeof raw.error_description === "string") {
        data.error_description = sanitizeErrorMessage(raw.error_description);
      }
    }
    return {
      ok: response.ok,
      data,
    };
  },
  postExchange: async (tokens: any, extra?: any) => {
    const gheUrl = normalizeGheUrl(extra?.gheUrl);
    const lookupInit = {
      headers: {
        Authorization: `Bearer ${tokens.access_token}`,
        Accept: "application/json",
        "X-GitHub-Api-Version": GHE_COPILOT_CONFIG.apiVersion,
        "User-Agent": getGitHubCopilotChatUserAgent(),
      },
    };
    const copilotToken = await optionalJson(
      `${gheUrl}/api/v3/copilot_internal/v2/token`,
      lookupInit
    );
    const userInfo = await optionalJson(`${gheUrl}/api/v3/user`, lookupInit);
    return {
      copilotToken,
      userInfo,
      gheUrl: extra?.gheUrl,
      // endpoints.api → chat/completions + /models catalog (real chat models).
      // endpoints.proxy → NES/autocomplete only. Capture both; chat + discovery
      // use the api host.
      copilotApiUrl: copilotToken?.endpoints?.api,
      copilotProxyUrl: copilotToken?.endpoints?.proxy,
    };
  },
  mapTokens: (tokens: any, extra?: any) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    providerSpecificData: {
      autoSync: true,
      gheUrl: extra?.gheUrl,
      copilotApiUrl: extra?.copilotApiUrl || extra?.copilotToken?.endpoints?.api,
      copilotProxyUrl: extra?.copilotProxyUrl || extra?.copilotToken?.endpoints?.proxy,
      copilotToken: extra?.copilotToken?.token,
      copilotTokenExpiresAt: extra?.copilotToken?.expires_at,
      githubUserId: extra?.userInfo?.id,
      githubLogin: extra?.userInfo?.login,
      githubName: extra?.userInfo?.name,
      githubEmail: extra?.userInfo?.email,
    },
  }),
};
