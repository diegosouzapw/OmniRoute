import { randomUUID } from "crypto";

type GigachatTokenResult = {
  accessToken: string;
  expiresAt: string;
};

type GigachatTokenOptions = {
  credentials?: string | null;
  scope?: string;
  authUrl?: string;
  signal?: AbortSignal;
};

const DEFAULT_GIGACHAT_AUTH_URL = "https://ngw.devices.sberbank.ru:9443/api/v2/oauth";
const DEFAULT_GIGACHAT_SCOPE = "GIGACHAT_API_PERS";
const CACHE_SKEW_MS = 60_000;

const tokenCache = new Map<string, GigachatTokenResult>();
const inflightRequests = new Map<string, Promise<GigachatTokenResult>>();

function getCacheKey(credentials: string, authUrl: string, scope: string) {
  return `${authUrl}::${scope}::${credentials}`;
}

function isFreshToken(token: GigachatTokenResult | undefined) {
  if (!token?.accessToken || !token?.expiresAt) return false;
  const expiresAtMs = new Date(token.expiresAt).getTime();
  return Number.isFinite(expiresAtMs) && expiresAtMs - Date.now() > CACHE_SKEW_MS;
}

function normalizeExpiry(rawExpiry: unknown) {
  if (typeof rawExpiry === "number" && Number.isFinite(rawExpiry)) {
    return new Date(rawExpiry).toISOString();
  }
  if (typeof rawExpiry === "string" && rawExpiry.trim().length > 0) {
    const numericValue = Number(rawExpiry);
    if (Number.isFinite(numericValue)) {
      return new Date(numericValue).toISOString();
    }
    const dateMs = Date.parse(rawExpiry);
    if (Number.isFinite(dateMs)) {
      return new Date(dateMs).toISOString();
    }
  }
  return new Date(Date.now() + 30 * 60 * 1000).toISOString();
}

export async function getGigachatAccessToken(
  options: GigachatTokenOptions = {}
): Promise<GigachatTokenResult> {
  const credentials = (options.credentials || "").trim();
  if (!credentials) {
    throw new Error("Missing GigaChat credentials");
  }

  const authUrl = (options.authUrl || DEFAULT_GIGACHAT_AUTH_URL).trim();
  const scope = (options.scope || DEFAULT_GIGACHAT_SCOPE).trim();
  const cacheKey = getCacheKey(credentials, authUrl, scope);

  const cached = tokenCache.get(cacheKey);
  if (isFreshToken(cached)) {
    return cached;
  }

  const inflight = inflightRequests.get(cacheKey);
  if (inflight) {
    return inflight;
  }

  const requestPromise = (async () => {
    const response = await fetch(authUrl, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        RqUID: randomUUID(),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ scope }).toString(),
      signal: options.signal,
    });

    if (!response.ok) {
      const bodyText = await response.text();
      throw new Error(`GigaChat token request failed: ${response.status} ${bodyText}`.trim());
    }

    const data = (await response.json()) as Record<string, unknown>;
    const accessToken =
      typeof data.tok === "string"
        ? data.tok
        : typeof data.access_token === "string"
          ? data.access_token
          : "";
    if (!accessToken) {
      throw new Error("GigaChat token response missing access token");
    }

    const token = {
      accessToken,
      expiresAt: normalizeExpiry(data.exp ?? data.expires_at),
    };
    tokenCache.set(cacheKey, token);
    return token;
  })();

  inflightRequests.set(cacheKey, requestPromise);
  try {
    return await requestPromise;
  } finally {
    inflightRequests.delete(cacheKey);
  }
}
