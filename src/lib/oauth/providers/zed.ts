import { ZED_CONFIG } from "../constants/oauth";

export const zed = {
  config: ZED_CONFIG,
  flowType: "import_token",
  mapTokens: (tokens) => ({
    accessToken: tokens.accessToken,
    refreshToken: null,
    expiresIn: tokens.expiresIn || 3600,
    email: tokens.email || null,
    name: tokens.displayName || tokens.githubLogin || tokens.userId || "Zed",
    displayName: tokens.displayName || tokens.githubLogin || null,
    providerSpecificData: {
      userId: tokens.userId || null,
      githubLogin: tokens.githubLogin || null,
      avatarUrl: tokens.avatarUrl || null,
      cloudBaseUrl: tokens.cloudBaseUrl || ZED_CONFIG.cloudBaseUrl,
      baseUrl: tokens.baseUrl || ZED_CONFIG.aiBaseUrl,
      authMethod: "imported",
      userRaw: tokens.userRaw || null,
    },
  }),
};
