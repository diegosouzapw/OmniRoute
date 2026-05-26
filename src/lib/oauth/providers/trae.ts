import { TRAE_CONFIG } from "../constants/oauth";

// #2658: Trae IDE (ByteDance) — imported-token flow.
// Token format mirrors Cursor (the user signs into Trae and pastes the API
// token). If ByteDance publishes a public OAuth/device-code flow, change
// flowType to "device_code" or "authorization_code_pkce" and route any
// public client_id/secret through resolvePublicCred() per Hard Rule #11.
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
