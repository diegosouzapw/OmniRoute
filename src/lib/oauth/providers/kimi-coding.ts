import { KIMI_CODING_CONFIG } from "../constants/oauth";
import { randomUUID } from "crypto";
import fs from "fs";
import { arch, hostname, release, type as osType, version as osVersion } from "os";
import path from "path";
import { resolveDataDir } from "../../dataPaths";

const PLATFORM = "kimi_cli";
const VERSION = process.env.KIMI_CLI_VERSION || "1.36.0";
const DEVICE_ID_FILE = "kimi-coding-device-id";

function sanitizeHeaderValue(value, fallback = "unknown") {
  const text = String(value ?? "").trim();
  if (!text) return fallback;

  return text.replace(/[^\x20-\x7e]/g, "").trim() || fallback;
}

function getDeviceModel() {
  return [osType() || process.platform, release(), arch()].filter(Boolean).join(" ");
}

function generateDeviceId() {
  return randomUUID().replace(/-/g, "");
}

function getKimiDeviceId() {
  const configured = process.env.KIMI_CODING_DEVICE_ID?.trim();
  if (configured) return configured;

  try {
    const oauthDir = path.join(resolveDataDir(), "oauth");
    const devicePath = path.join(oauthDir, DEVICE_ID_FILE);
    if (fs.existsSync(devicePath)) {
      const existing = fs.readFileSync(devicePath, "utf8").trim();
      if (existing) return existing;
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
    "X-Msh-Platform": PLATFORM,
    "X-Msh-Version": VERSION,
    "X-Msh-Device-Name": sanitizeHeaderValue(hostname()),
    "X-Msh-Device-Model": sanitizeHeaderValue(getDeviceModel()),
    "X-Msh-Os-Version": sanitizeHeaderValue(osVersion()),
    "X-Msh-Device-Id": sanitizeHeaderValue(getKimiDeviceId()),
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
    const verificationUri = data.verification_uri || "https://www.kimi.com/code/authorize_device";
    return {
      device_code: data.device_code,
      user_code: data.user_code,
      verification_uri: verificationUri,
      verification_uri_complete: data.verification_uri_complete || verificationUri,
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
  }),
};
