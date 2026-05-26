import { TRAE_CONFIG } from "../constants/oauth";

/**
 * Trae IDE OAuth Provider (Import Token)
 *
 * Trae is an AI-native IDE by ByteDance. Authentication relies on a personal
 * API token that the user copies from the Trae account settings page and pastes
 * into the OmniRoute connection form.
 *
 * Why import_token and not device_code / authorization_code:
 *   ByteDance has not published a public OAuth client_id/secret for the Trae
 *   IDE, nor documented a device-code or browser-redirect flow for third-party
 *   integrations. The authHint in providers.ts (see IDE_PROVIDER_IDS) confirms
 *   that "paste your API token" is the supported onboarding path.
 *
 * TODO(trae-auth): if ByteDance publishes a public OAuth application for Trae,
 *   upgrade flowType to "device_code" or "authorization_code_pkce" and embed
 *   the client credentials via resolvePublicCred() (Hard Rule #11).
 *   Reference: https://docs.trae.ai (check for OAuth / CLI integration docs)
 */
export const trae = {
  config: TRAE_CONFIG,
  flowType: "import_token",
  mapTokens: (tokens: { accessToken: string; expiresIn?: number; machineId?: string }) => ({
    accessToken: tokens.accessToken,
    refreshToken: null,
    expiresIn: tokens.expiresIn || 86400,
    providerSpecificData: {
      machineId: tokens.machineId,
      authMethod: "imported",
    },
  }),
};
