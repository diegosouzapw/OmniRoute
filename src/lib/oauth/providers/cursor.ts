import { CURSOR_CONFIG } from "../constants/oauth";

export const cursor = {
  config: CURSOR_CONFIG,
  flowType: "import_token",
  mapTokens: (tokens) => ({
    accessToken: tokens.accessToken,
    refreshToken: null,
    expiresIn: tokens.expiresIn || 86400,
    providerSpecificData: {
      machineId: tokens.machineId,
      authMethod: "imported",
    },
  }),
};
