import { ZED_CONFIG } from "../constants/oauth";

/**
 * Zed IDE credential bridge — import_token flow only.
 *
 * Zed stores AI provider API keys (Anthropic, OpenAI, Google, …) in the OS
 * keychain. OmniRoute reads them via POST /api/providers/zed/import (keychain)
 * or POST /api/providers/zed/manual-import (Docker / paste fallback).
 *
 * There is no standard OAuth browser flow for "zed" itself.  Registering it
 * here with flowType "import_token" prevents getProvider("zed") from throwing
 * "Unknown provider: zed" when the OAuth capability endpoint is probed, and
 * lets generateAuthData() return a clean { supported: false, error } instead
 * of a 500.  The actual import UI lives at
 *   /dashboard/providers/zed  →  ZedImportCard component.
 */
export const zed = {
  config: ZED_CONFIG,
  flowType: "import_token" as const,

  validateImportToken(token: string): { valid: boolean; reason?: string } {
    const trimmed = (token ?? "").trim();
    if (!trimmed) return { valid: false, reason: "Token is empty" };
    if (trimmed.length < 8) return { valid: false, reason: "Token is too short" };
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
