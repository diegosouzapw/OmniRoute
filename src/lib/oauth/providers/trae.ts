import { TRAE_CONFIG } from "../constants/oauth";

export const trae = {
  config: TRAE_CONFIG,
  flowType: "import_token",
  mapTokens: (tokens) => ({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken || null,
    expiresIn: tokens.expiresIn || 3600,
    email: tokens.email || null,
    name: tokens.nickname || tokens.email || tokens.userId || "Trae",
    displayName: tokens.nickname || null,
    providerSpecificData: {
      userId: tokens.userId || null,
      loginHost: tokens.loginHost || TRAE_CONFIG.defaultLoginHost,
      tokenType: tokens.tokenType || "Bearer",
      status: tokens.status || null,
      baseUrl: tokens.baseUrl || null,
      authMethod: "imported",
      traeProfileRaw: tokens.profileRaw || null,
      traeAuthRaw: tokens.exchangeRaw || null,
    },
  }),
};
