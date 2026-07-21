// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { pbkdf2Sync } from "node:crypto";
import { hostname, release } from "node:os";
import { PROVIDERS } from "../../../config/constants.ts";
import {
  buildKimiCodeIdentityHeaders,
  normalizeKimiDeviceId,
} from "../../../config/providers/registry/kimi/coding/runtime.ts";
import { getKimiDeviceModel } from "../../../utils/kimiDevice.ts";
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import type { RefreshLogger } from "../shared.ts";

/**
 * Specialized refresh for Kimi Coding OAuth tokens.
 * Uses custom X-Msh-* headers required by Kimi OAuth API.
 *
 * Uses a stable device_id from providerSpecificData (stored at login) to avoid
 * anti-bot detection from ephemeral IDs. If absent, derives a deterministic ID
 * from the refresh token hash so it is at least stable across refreshes for the
 * same token.
 */
export async function refreshKimiCodingToken(
  refreshToken: string,
  providerSpecificData: Record<string, unknown> | null | undefined,
  log: RefreshLogger,
  proxyConfig: unknown = null
) {
  const endpoint = PROVIDERS["kimi-coding"]?.refreshUrl || PROVIDERS["kimi-coding"]?.tokenUrl;
  if (!endpoint) {
    log?.warn?.("TOKEN_REFRESH", "No refresh URL configured for Kimi Coding");
    return null;
  }

  // Prefer stable device_id persisted at login time; fall back to a
  // deterministic hash of the refresh token so it is at least consistent
  // across refreshes for the same session.
  const stableDeviceId =
    normalizeKimiDeviceId(providerSpecificData?.deviceId) ||
    normalizeKimiDeviceId(
      pbkdf2Sync(refreshToken, "kimi-device-id", 1000, 16, "sha256").toString("hex")
    );

  const osRelease = release();
  const persistedDeviceModel =
    typeof providerSpecificData?.deviceModel === "string"
      ? providerSpecificData.deviceModel.trim()
      : "";
  const deviceModel = persistedDeviceModel || getKimiDeviceModel();

  try {
    const params = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: PROVIDERS["kimi-coding"]?.clientId || "",
    });

    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          ...buildKimiCodeIdentityHeaders({
            deviceId: stableDeviceId,
            deviceName: providerSpecificData?.deviceName || hostname(),
            deviceModel,
            osVersion: providerSpecificData?.osVersion || osRelease,
          }),
        },
        body: params,
      })
    );

    if (!response.ok) {
      const errorText = await response.text();

      // Detect unrecoverable errors
      try {
        const parsed = JSON.parse(errorText);
        const errorCode = parsed?.error;
        if (errorCode === "invalid_grant" || errorCode === "invalid_request") {
          log?.error?.(
            "TOKEN_REFRESH",
            "Kimi Coding refresh token invalid. Re-authentication required.",
            {
              errorCode,
            }
          );
          return { error: "unrecoverable_refresh_error", code: errorCode };
        }
      } catch {
        // not JSON — fall through
      }

      log?.error?.("TOKEN_REFRESH", "Failed to refresh Kimi Coding token", {
        status: response.status,
        error: errorText.slice(0, 200),
      });
      return null;
    }

    const tokens = await response.json();
    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Kimi Coding token", {
      hasNewAccessToken: !!tokens.access_token,
      hasNewRefreshToken: !!tokens.refresh_token,
      expiresIn: tokens.expires_in,
    });

    return {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || refreshToken,
      expiresIn: tokens.expires_in,
      tokenType: tokens.token_type,
      scope: tokens.scope,
    };
  } catch (error) {
    log?.error?.(
      "TOKEN_REFRESH",
      `Network error refreshing Kimi Coding token: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
}
