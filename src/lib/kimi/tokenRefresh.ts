import { getProviderConnectionById, updateProviderConnection } from "@/lib/db/providers";
import { getKimiWebBaseUrl } from "@omniroute/open-sse/executors/kimi-web.ts";
import { parseKimiJwt } from "@omniroute/open-sse/utils/kimiJwt.ts";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

export interface KimiRefreshResult {
  success: boolean;
  accessToken?: string;
  refreshToken?: string;
  expiresAtSec?: number;
  error?: string;
}

export async function exchangeKimiRefreshToken(
  refreshToken: string,
  baseUrl?: string
): Promise<KimiRefreshResult> {
  const cleanRefresh = String(refreshToken ?? "").trim();
  if (!cleanRefresh) {
    return { success: false, error: "No refresh_token provided" };
  }

  const effectiveBaseUrl = (baseUrl || getKimiWebBaseUrl()).replace(/\/+$/, "");
  const refreshUrl = `${effectiveBaseUrl}/api/auth/token/refresh`;

  try {
    const resp = await fetch(refreshUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${cleanRefresh}`,
        Accept: "application/json, text/plain, */*",
        Origin: effectiveBaseUrl,
        Referer: `${effectiveBaseUrl}/`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
      },
    });

    if (!resp.ok) {
      const errText = await resp.text().catch(() => "");
      return {
        success: false,
        error: `Kimi refresh returned HTTP ${resp.status}: ${sanitizeErrorMessage(errText)}`,
      };
    }

    const data = await resp.json();
    const newAccess = data?.access_token;
    const newRefresh = data?.refresh_token || cleanRefresh;

    if (!newAccess || typeof newAccess !== "string") {
      return { success: false, error: "Invalid response from Kimi: missing access_token" };
    }

    const parsedJwt = parseKimiJwt(newAccess);
    const expiresAtSec = parsedJwt?.exp || Math.floor(Date.now() / 1000) + 900;

    return {
      success: true,
      accessToken: newAccess,
      refreshToken: newRefresh,
      expiresAtSec,
    };
  } catch (err) {
    return {
      success: false,
      error: `Network error refreshing Kimi token: ${err instanceof Error ? err.message : "unknown"}`,
    };
  }
}

export async function refreshKimiProviderConnection(
  connectionId: string
): Promise<KimiRefreshResult> {
  const conn = await getProviderConnectionById(connectionId);
  if (!conn) {
    return { success: false, error: `Connection ${connectionId} not found` };
  }

  const providerData = conn.providerSpecificData as Record<string, unknown> | undefined;
  const refreshToken: string =
    typeof conn.refreshToken === "string" && conn.refreshToken
      ? conn.refreshToken
      : typeof providerData?.refreshToken === "string"
        ? providerData.refreshToken
        : "";
  if (!refreshToken) {
    return { success: false, error: "Connection does not contain a refresh_token" };
  }

  const result = await exchangeKimiRefreshToken(refreshToken);
  if (!result.success || !result.accessToken) {
    return result;
  }

  await updateProviderConnection(connectionId, {
    apiKey: result.accessToken,
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
    expiresAt: result.expiresAtSec ? new Date(result.expiresAtSec * 1000).toISOString() : undefined,
    testStatus: "active",
    lastError: null,
    errorCode: null,
  });

  return result;
}
