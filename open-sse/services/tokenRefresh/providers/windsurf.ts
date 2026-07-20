// @ts-nocheck
// Extracted from open-sse/services/tokenRefresh.ts — see ../shared.ts for
// provenance notes (ported idea from KooshaPari's PR #7338, redone on tip).
import { runWithProxyContext } from "../../../utils/proxyFetch.ts";
import { WINDSURF_CONFIG } from "@/lib/oauth/constants/oauth";
import { buildFormParams, type RefreshLogger } from "../shared.ts";

/**
 * Refresh Windsurf (Devin CLI / Codeium) tokens.
 *
 * Windsurf uses Firebase Secure Token Service (STS) for token refresh.
 * If the token is a long-lived Codeium API key (import flow), it never
 * expires and refresh is a no-op returning the same token.
 * If the token is a Firebase ID token (device-code flow), it expires after
 * ~1 hour and can be refreshed with the stored Firebase refresh token.
 */
export async function refreshWindsurfToken(
  refreshToken: string,
  providerSpecificData: Record<string, unknown> | null | undefined,
  log: RefreshLogger,
  proxyConfig: unknown = null
) {
  if (!refreshToken) {
    log?.warn?.(
      "TOKEN_REFRESH",
      "No refresh token stored for Windsurf — token may be a long-lived API key"
    );
    return null;
  }

  const authMethod = (providerSpecificData?.authMethod as string) || "import";

  // Long-lived Codeium API keys (import flow) have no expiry — nothing to refresh.
  if (authMethod === "import") {
    log?.debug?.("TOKEN_REFRESH", "Windsurf import token is long-lived — no refresh needed");
    return null;
  }

  // Firebase STS refresh for browser-flow tokens.
  // Resolves via WINDSURF_CONFIG.firebaseApiKey, which honors the
  // WINDSURF_FIREBASE_API_KEY env override and falls back to the embedded
  // public default in publicCreds.ts. See docs/security/PUBLIC_CREDS.md.
  const firebaseApiKey = WINDSURF_CONFIG.firebaseApiKey || "";
  if (!firebaseApiKey) {
    log?.warn?.(
      "TOKEN_REFRESH",
      "Windsurf Firebase API key unavailable — skipping Firebase token refresh"
    );
    return null;
  }
  const tokenUrl = `https://securetoken.googleapis.com/v1/token?key=${firebaseApiKey}`;

  try {
    const response = await runWithProxyContext(proxyConfig, () =>
      fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: buildFormParams({ grant_type: "refresh_token", refresh_token: refreshToken }),
      })
    );

    if (!response.ok) {
      const errorText = await response.text();
      log?.error?.("TOKEN_REFRESH", "Failed to refresh Windsurf Firebase token", {
        status: response.status,
        error: errorText.slice(0, 200),
      });

      // Firebase STS returns structured errors. Detect unrecoverable token states.
      try {
        const fbError = JSON.parse(errorText);
        const fbCode =
          typeof fbError?.error?.message === "string"
            ? fbError.error.message
            : typeof fbError?.error === "string"
              ? fbError.error
              : null;
        if (
          typeof fbCode === "string" &&
          (fbCode.includes("USER_DISABLED") ||
            fbCode.includes("TOKEN_EXPIRED") ||
            fbCode.includes("INVALID_REFRESH_TOKEN") ||
            fbCode.includes("USER_NOT_FOUND"))
        ) {
          log?.error?.(
            "TOKEN_REFRESH",
            "Windsurf Firebase token is permanently invalid. Re-authentication required.",
            {
              fbCode,
            }
          );
          return { error: "unrecoverable_refresh_error", code: fbCode };
        }
      } catch {
        // not JSON — fall through
      }

      return null;
    }

    const data = await response.json();
    const expiresIn = parseInt(data.expires_in ?? "3600", 10);

    log?.info?.("TOKEN_REFRESH", "Successfully refreshed Windsurf Firebase token", {
      expiresIn,
      hasNewIdToken: !!data.id_token,
    });

    return {
      accessToken: data.id_token,
      refreshToken: data.refresh_token || refreshToken,
      expiresIn,
    };
  } catch (error) {
    log?.error?.(
      "TOKEN_REFRESH",
      `Network error refreshing Windsurf token: ${error instanceof Error ? error.message : String(error)}`
    );
    return null;
  }
}
