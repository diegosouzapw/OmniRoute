/**
 * Pure parser for the Trae SOLO /authorize callback query string. Extracted
 * from route.ts so it can be unit-tested without touching the DB layer.
 *
 * Returns the credential bundle that the route hands to createProviderConnection,
 * or a structured error if the payload is missing/malformed.
 */
export type ParsedTraeCallback = {
  ok: true;
  record: {
    provider: "trae";
    authType: "oauth";
    accessToken: string;
    refreshToken: string | null;
    expiresAt: string | null;
    email: string | null;
    providerSpecificData: {
      userId: string;
      tenantId: string;
      bizUserId: string;
      userUniqueId: string;
      webId: string;
      scope: "marscode-us";
      tenant: "marscode";
      region: string;
      aiRegion: string;
      host: string;
      screenName: string | null;
      clientId: string;
      refreshExpireAt: number | null;
      authMethod: "oauth_callback";
    };
    testStatus: "active";
  };
};

export type ParseError = { ok: false; error: string };

export function parseTraeCallbackQuery(q: URLSearchParams): ParsedTraeCallback | ParseError {
  const userJwtRaw = q.get("userJwt");
  if (!userJwtRaw) return { ok: false, error: "Missing userJwt in callback" };

  let userJwt: Record<string, unknown>;
  try {
    userJwt = JSON.parse(userJwtRaw);
  } catch {
    return { ok: false, error: "Malformed userJwt payload" };
  }

  const token = userJwt.Token as string | undefined;
  if (!token) return { ok: false, error: "userJwt.Token missing" };
  const refresh = (userJwt.RefreshToken as string) || q.get("refreshToken") || null;
  const tokenExpiresAtMs = Number(userJwt.TokenExpireAt) || 0;
  const refreshExpiresAtMs = Number(userJwt.RefreshExpireAt || q.get("refreshExpireAt")) || 0;

  let info: Record<string, unknown> = {};
  const userInfoRaw = q.get("userInfo");
  if (userInfoRaw) {
    try {
      info = JSON.parse(userInfoRaw);
    } catch {
      // userInfo is best-effort metadata — fall back to defaults silently.
    }
  }

  const userId = (info.UserID as string) || "";
  const region = (info.Region as string) || "US-East";

  return {
    ok: true,
    record: {
      provider: "trae",
      authType: "oauth",
      accessToken: token,
      refreshToken: refresh,
      expiresAt: tokenExpiresAtMs ? new Date(tokenExpiresAtMs).toISOString() : null,
      email: (info.NonPlainTextEmail as string) || null,
      providerSpecificData: {
        userId,
        tenantId: (info.TenantID as string) || "",
        bizUserId: userId,
        userUniqueId: userId,
        webId: userId,
        scope: "marscode-us",
        tenant: "marscode",
        region,
        aiRegion: (info.AIRegion as string) || region,
        host: q.get("host") || "https://api-us-east.trae.ai",
        screenName: (info.ScreenName as string) || null,
        clientId: (userJwt.ClientID as string) || "en1oxy7wnw8j9n",
        refreshExpireAt: refreshExpiresAtMs || null,
        authMethod: "oauth_callback",
      },
      testStatus: "active",
    },
  };
}
