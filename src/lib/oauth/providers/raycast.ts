/**
 * @file raycast.ts
 * @description Raycast Pro token-import OAuth provider (reverse-engineered, local dev only).
 *
 * @changes
 * - [2026-07-27] [Composer] - Initial Raycast Pro import_token provider
 */

import { RAYCAST_CONFIG } from "../constants/oauth";

type RaycastRawTokens = {
  accessToken?: string;
  access_token?: string;
  deviceId?: string;
  device_id?: string;
  aid?: string;
  sigSecret?: string;
  signatureSecret?: string;
  signatureJwt?: string;
  expiresIn?: number;
};

export const raycast = {
  config: RAYCAST_CONFIG,
  flowType: "import_token",
  mapTokens: (tokens: RaycastRawTokens) => ({
    accessToken: tokens.accessToken || tokens.access_token,
    refreshToken: null,
    expiresIn: tokens.expiresIn || 30 * 24 * 60 * 60,
    providerSpecificData: {
      deviceId: tokens.deviceId || tokens.device_id || "",
      aid: tokens.aid || "",
      sigSecret: tokens.sigSecret || tokens.signatureSecret || "",
      authMethod: "imported",
    },
  }),
};
