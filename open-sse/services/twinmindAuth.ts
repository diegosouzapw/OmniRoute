import { resolvePublicCred } from "../utils/publicCreds.ts";

const FIREBASE_REFRESH_URL = "https://securetoken.googleapis.com/v1/token";
const ACCESS_TOKEN_REFRESH_LEAD_MS = 5 * 60 * 1000;

type JsonRecord = Record<string, unknown>;

export function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

export function toStringOrEmpty(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function stripBearerPrefix(token: string): string {
  return token.replace(/^Bearer\s+/i, "").trim();
}

export function looksLikeJwt(token: string): boolean {
  const raw = stripBearerPrefix(token);
  if (!raw.startsWith("eyJ")) return false;
  return raw.split(".").length === 3;
}

export function decodeJwtExpMs(token: string): number {
  try {
    const payload = JSON.parse(Buffer.from(stripBearerPrefix(token).split(".")[1] || "", "base64").toString("utf8"));
    return typeof payload.exp === "number" ? payload.exp * 1000 : 0;
  } catch {
    return 0;
  }
}

export function isTwinmindAccessTokenFresh(token: string, nowMs = Date.now()): boolean {
  if (!looksLikeJwt(token)) return false;
  const expMs = decodeJwtExpMs(token);
  return expMs === 0 ? true : expMs - nowMs > ACCESS_TOKEN_REFRESH_LEAD_MS;
}

export function resolveTwinmindFirebaseApiKey(): string {
  return resolvePublicCred("twinmind_fb", "TWINMIND_FIREBASE_API_KEY");
}

export function resolveTwinmindRefreshToken(credentials: {
  apiKey?: string;
  accessToken?: string;
  refreshToken?: string;
  providerSpecificData?: unknown;
}): string {
  const psd = asRecord(credentials.providerSpecificData);
  const fromPsd =
    toStringOrEmpty(psd.refreshToken) ||
    toStringOrEmpty(psd.refresh_token) ||
    toStringOrEmpty(psd.firebaseRefreshToken);
  const fromCreds = stripBearerPrefix(toStringOrEmpty(credentials.refreshToken));
  if (fromCreds) return fromCreds;
  if (fromPsd) return fromPsd;
  const pasted = stripBearerPrefix(toStringOrEmpty(credentials.apiKey));
  if (pasted && !looksLikeJwt(pasted)) return pasted;
  return "";
}

export function resolveTwinmindAccessToken(credentials: {
  apiKey?: string;
  accessToken?: string;
}): string {
  const fromAccess = stripBearerPrefix(toStringOrEmpty(credentials.accessToken));
  if (fromAccess && looksLikeJwt(fromAccess)) return fromAccess;
  const fromKey = stripBearerPrefix(toStringOrEmpty(credentials.apiKey));
  if (fromKey && looksLikeJwt(fromKey)) return fromKey;
  return "";
}

export type TwinmindFirebaseRefreshResult = {
  idToken: string;
  refreshToken: string;
};

export async function refreshTwinmindIdToken(
  refreshToken: string,
  fetchImpl: typeof fetch = fetch
): Promise<TwinmindFirebaseRefreshResult | null> {
  const key = resolveTwinmindFirebaseApiKey();
  if (!refreshToken || !key) return null;
  const url = `${FIREBASE_REFRESH_URL}?key=${encodeURIComponent(key)}`;
  const response = await fetchImpl(url, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`,
  });
  const json = (await response.json().catch(() => ({}))) as Record<string, unknown>;
  const idToken = toStringOrEmpty(json.id_token) || toStringOrEmpty(json.access_token);
  if (!response.ok || !idToken || !looksLikeJwt(idToken)) return null;
  const rotated = toStringOrEmpty(json.refresh_token) || refreshToken;
  return { idToken, refreshToken: rotated };
}

export type TwinmindCredentialPatch = {
  apiKey?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
  providerSpecificData?: JsonRecord;
};

export async function ensureTwinmindAccessToken(options: {
  apiKey?: string;
  accessToken?: string;
  refreshToken?: string;
  providerSpecificData?: unknown;
  fetchImpl?: typeof fetch;
  onCredentialsRefreshed?: (patch: TwinmindCredentialPatch) => Promise<void> | void;
}): Promise<{ token: string; refreshToken: string }> {
  const fetchImpl = options.fetchImpl ?? fetch;
  const refreshToken = resolveTwinmindRefreshToken(options);
  const current = resolveTwinmindAccessToken(options);
  if (current && isTwinmindAccessTokenFresh(current)) {
    return { token: current, refreshToken };
  }
  if (refreshToken) {
    const refreshed = await refreshTwinmindIdToken(refreshToken, fetchImpl).catch(() => null);
    if (refreshed?.idToken) {
      const expMs = decodeJwtExpMs(refreshed.idToken);
      const patch: TwinmindCredentialPatch = {
        apiKey: refreshed.idToken,
        accessToken: refreshed.idToken,
        refreshToken: refreshed.refreshToken,
        expiresAt: expMs ? new Date(expMs).toISOString() : undefined,
        providerSpecificData: {
          ...asRecord(options.providerSpecificData),
          refreshToken: refreshed.refreshToken,
        },
      };
      try {
        await options.onCredentialsRefreshed?.(patch);
      } catch {
        // Chat can still proceed with the in-memory token.
      }
      return { token: refreshed.idToken, refreshToken: refreshed.refreshToken };
    }
    // Do not send an expired JWT (or the refresh token itself) as Bearer.
    return { token: "", refreshToken };
  }
  return { token: looksLikeJwt(current) ? current : "", refreshToken };
}
