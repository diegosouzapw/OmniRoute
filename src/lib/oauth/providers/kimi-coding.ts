import { randomUUID } from "crypto";
import fs from "fs";
import { hostname, release } from "os";
import path from "path";
import {
  buildKimiCodeIdentityHeaders,
  normalizeKimiDeviceId,
  sanitizeKimiHeaderValue,
} from "@omniroute/open-sse/config/providers/registry/kimi/coding/runtime.ts";
import { getKimiDeviceModel } from "@omniroute/open-sse/utils/kimiDevice.ts";
import { resolveDataDir } from "../../dataPaths";
import { KIMI_CODING_CONFIG } from "../constants/oauth";

const DEVICE_ID_FILE = "kimi-coding-device-id";

function generateDeviceId() {
  return randomUUID();
}

function getKimiDeviceId() {
  const configured = process.env.KIMI_CODING_DEVICE_ID?.trim();
  if (configured) return configured;

  try {
    const oauthDir = path.join(resolveDataDir(), "oauth");
    const devicePath = path.join(oauthDir, DEVICE_ID_FILE);
    if (fs.existsSync(devicePath)) {
      const existing = fs.readFileSync(devicePath, "utf8").trim();
      if (existing) return normalizeKimiDeviceId(existing);
    }

    fs.mkdirSync(oauthDir, { recursive: true });
    const deviceId = generateDeviceId();
    fs.writeFileSync(devicePath, deviceId, { encoding: "utf8", mode: 0o600 });
    try {
      fs.chmodSync(devicePath, 0o600);
    } catch {}
    return deviceId;
  } catch {
    return generateDeviceId();
  }
}

// Custom headers required by Kimi OAuth
function getKimiOAuthHeaders() {
  return {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    ...buildKimiCodeIdentityHeaders({
      deviceId: getKimiDeviceId(),
      deviceName: hostname(),
      deviceModel: getKimiDeviceModel(),
      osVersion: release(),
    }),
  };
}

export const kimiCoding = {
  config: KIMI_CODING_CONFIG,
  flowType: "device_code",
  requestDeviceCode: async (config) => {
    const response = await fetch(config.deviceCodeUrl, {
      method: "POST",
      headers: getKimiOAuthHeaders(),
      body: new URLSearchParams({
        client_id: config.clientId,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Device code request failed: ${error}`);
    }

    const data = await response.json();
    if (!data?.device_code) throw new Error("Device authorization response missing device_code");
    if (!data?.user_code) throw new Error("Device authorization response missing user_code");
    if (!data?.verification_uri_complete) {
      throw new Error("Device authorization response missing verification_uri_complete");
    }
    return {
      device_code: data.device_code,
      user_code: data.user_code,
      verification_uri: data.verification_uri || "",
      verification_uri_complete: data.verification_uri_complete,
      expires_in: data.expires_in,
      interval: data.interval || 5,
    };
  },
  pollToken: async (config, deviceCode) => {
    const response = await fetch(config.tokenUrl, {
      method: "POST",
      headers: getKimiOAuthHeaders(),
      body: new URLSearchParams({
        client_id: config.clientId,
        device_code: deviceCode,
        grant_type: "urn:ietf:params:oauth:grant-type:device_code",
      }),
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      const text = await response.text();
      data = { error: "invalid_response", error_description: text };
    }

    return {
      ok: response.ok,
      data: data,
    };
  },
  mapTokens: (tokens) => ({
    accessToken: tokens.access_token,
    refreshToken: tokens.refresh_token,
    expiresIn: tokens.expires_in,
    tokenType: tokens.token_type,
    scope: tokens.scope,
    // Persist the device identity at login so refreshes use the SAME deviceId
    // the device-code grant was issued against. Without this, tokenRefresh.ts
    // falls back to pbkdf2(refresh_token, ...) — and Kimi rotates refresh_tokens
    // per refresh, so the derived id changes every cycle and the anti-bot
    // pipeline treats each refresh as a new device.
    providerSpecificData: {
      deviceId: getKimiDeviceId(),
      deviceName: sanitizeKimiHeaderValue(hostname()),
      deviceModel: sanitizeKimiHeaderValue(getKimiDeviceModel()),
      osVersion: sanitizeKimiHeaderValue(release()),
    },
  }),
};
