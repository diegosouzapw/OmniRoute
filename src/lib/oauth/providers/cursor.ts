import { CURSOR_CONFIG } from "../constants/oauth";

export const cursor = {
  config: CURSOR_CONFIG,
  flowType: "import_token",
  mapTokens: (tokens: {
    accessToken: string;
    refreshToken?: string | null;
    expiresIn?: number;
    machineId?: string;
    authMethod?: string;
  }) => ({
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken ?? null,
    expiresIn: tokens.expiresIn || 86400,
    providerSpecificData: {
      machineId: tokens.machineId,
      authMethod: tokens.authMethod || (tokens.refreshToken ? "deep_control" : "imported"),
    },
  }),
};
