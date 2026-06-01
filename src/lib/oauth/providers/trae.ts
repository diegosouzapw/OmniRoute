import { TRAE_CONFIG } from "../constants/oauth";

/**
 * Trae SOLO OAuth provider — token-import flow (no public OAuth client).
 *
 * ByteDance has not published a public OAuth client_id/secret or a device-code
 * flow for third-party integrations, so the credential is the Cloud-IDE-JWT
 * captured either via the browser /authorize popup (src/app/authorize/route.ts)
 * or by signing in to solo.trae.ai and pasting the token sent in the
 * `Authorization: Cloud-IDE-JWT <token>` header (~14-day lifetime).
 *
 * mapTokens enriches providerSpecificData with the identity fields the SOLO
 * remote agent requires inside its `common_params` payload (web_id /
 * biz_user_id / user_unique_id / scope / tenant / region). The dedicated import
 * route and /authorize callback also build this record directly; mapTokens keeps
 * the device-code / exchange code paths consistent if Trae ever exposes one.
 *
 * TODO(trae-auth): if ByteDance publishes a public OAuth application for Trae,
 *   upgrade flowType to "device_code" or "authorization_code_pkce" and embed
 *   the client credentials via resolvePublicCred() (Hard Rule #11).
 */
type TraeRawTokens = {
  accessToken?: string;
  access_token?: string;
  expiresIn?: number;
  refreshToken?: string | null;
  machineId?: string;
  webId?: string;
  web_id?: string;
  bizUserId?: string;
  biz_user_id?: string;
  userUniqueId?: string;
  user_unique_id?: string;
  scope?: string;
  tenant?: string;
  region?: string;
  aiRegion?: string;
  ai_region?: string;
  appLanguage?: string;
  app_language?: string;
  appVersion?: string;
  app_version?: string;
  userRegion?: string;
  user_region?: string;
  userIdentity?: string;
  user_identity?: string;
};

export const trae = {
  config: TRAE_CONFIG,
  flowType: "import_token",
  mapTokens: (tokens: TraeRawTokens) => ({
    accessToken: tokens.accessToken || tokens.access_token,
    // Pasted/solo JWTs have no refresh token; the /authorize callback persists
    // its own RefreshToken directly (see parseCallback.ts) rather than via here.
    refreshToken: tokens.refreshToken ?? null,
    // Default to the observed ~14-day Cloud-IDE-JWT lifetime when the caller did
    // not supply an explicit expiry, so connection cooldown / expiry hints behave
    // sensibly out of the box (TRAE_CONFIG.tokenLifetimeDays).
    expiresIn: tokens.expiresIn || TRAE_CONFIG.tokenLifetimeDays * 24 * 60 * 60,
    providerSpecificData: {
      webId: tokens.webId || tokens.web_id || "",
      bizUserId: tokens.bizUserId || tokens.biz_user_id || "",
      userUniqueId: tokens.userUniqueId || tokens.user_unique_id || "",
      scope: tokens.scope || "marscode-us",
      tenant: tokens.tenant || "marscode",
      region: tokens.region || "US-East",
      aiRegion: tokens.aiRegion || tokens.ai_region || tokens.region || "US-East",
      appLanguage: tokens.appLanguage || tokens.app_language || "en",
      appVersion: tokens.appVersion || tokens.app_version || "1.0.0.1229",
      userRegion: tokens.userRegion || tokens.user_region || "US",
      userIdentity: tokens.userIdentity || tokens.user_identity || "Free",
      // Preserved for callers that key off a machine id (e.g. the IDE flow).
      machineId: tokens.machineId,
      authMethod: "imported",
    },
  }),
};
