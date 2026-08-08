/**
 * @file raycast.ts
 * @description Raycast Pro credential validation via live models API probe.
 *
 * @changes
 * - [2026-07-27] [Composer] - Initial Raycast import validation service
 */

import {
  decodeAidFromRaycastJwt,
  fetchRaycastModels,
  type RaycastModelEntry,
} from "@omniroute/open-sse/services/raycast.ts";

export class RaycastService {
  validateCredentials(input: {
    accessToken: string;
    deviceId: string;
    aid?: string;
    signatureJwt?: string;
    sigSecret?: string;
  }): { aid: string } {
    const accessToken = input.accessToken.trim();
    const deviceId = input.deviceId.trim();
    let aid = (input.aid || "").trim();

    if (!aid && input.signatureJwt?.trim()) {
      aid = decodeAidFromRaycastJwt(input.signatureJwt.trim()) || "";
    }

    if (!accessToken) throw new Error("Bearer token is required");
    if (!deviceId) throw new Error("Device ID is required");

    // AID is optional for current Raycast API — fall back to deviceId when not captured manually.
    if (!aid) aid = deviceId;

    return { aid };
  }

  async probeModels(credentials: {
    accessToken: string;
    deviceId: string;
    aid: string;
    sigSecret?: string;
  }): Promise<RaycastModelEntry[]> {
    return fetchRaycastModels({
      accessToken: credentials.accessToken,
      providerSpecificData: {
        deviceId: credentials.deviceId,
        aid: credentials.aid,
        sigSecret: credentials.sigSecret,
      },
    });
  }

  getCaptureInstructions(): string[] {
    return [
      "Easiest: click Auto-Import (macOS) — reads Keychain + local Raycast DB.",
      "Manual fallback: Proxyman/Charles SSL proxy on backend.raycast.com.",
      "Bearer token lives in Keychain: Raycast / raycast-store_credentials.",
      "Device ID = analyticsId in ~/Library/Application Support/com.raycast.macos/posthog.distinctId.",
      "Signature JWT is optional with current Raycast builds.",
    ];
  }
}
