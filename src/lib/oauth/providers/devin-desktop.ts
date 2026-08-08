import { DEVIN_DESKTOP_CONFIG } from "../constants/oauth";

/** Devin Desktop import-token provider. */
export const devinDesktop = {
  config: DEVIN_DESKTOP_CONFIG,
  flowType: "import_token" as const,

  validateImportToken(token: string): { valid: boolean; reason?: string } {
    const trimmed = (token ?? "").trim();
    if (!trimmed) return { valid: false, reason: "Token is empty" };
    if (trimmed.length < 16) return { valid: false, reason: "Token is too short" };
    return { valid: true };
  },

  mapTokens(tokens: { accessToken: string }) {
    return {
      accessToken: tokens.accessToken,
      refreshToken: null,
      expiresIn: null as number | null,
    };
  },
};
