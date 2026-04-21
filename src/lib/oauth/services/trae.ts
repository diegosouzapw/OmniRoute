const TRAE_DEFAULT_USER_AGENT = "Trae/1.0.0 OmniRoute";
const TRAE_EXCHANGE_CLIENT_ID = "ono9krqynydwx5";
const TRAE_EXCHANGE_CLIENT_SECRET = "-";
const TRAE_EXCHANGE_TOKEN_PATH = "/cloudide/api/v3/trae/oauth/ExchangeToken";
const TRAE_GET_USER_INFO_PATH = "/cloudide/api/v3/trae/GetUserInfo";

export const TRAE_DEFAULT_LOGIN_HOST = "https://www.trae.ai";
export const TRAE_DEFAULT_API_ORIGIN = "https://api.trae.ai";
export const TRAE_SUGGESTED_CHAT_BASE_URL = `${TRAE_DEFAULT_API_ORIGIN}/v1/chat/completions`;

const TRAE_KNOWN_INVALID_CHAT_BASE_URLS = new Set([
  TRAE_SUGGESTED_CHAT_BASE_URL,
  "https://api.trae.ai/chat/completions",
  "https://www.trae.ai/v1/chat/completions",
  "https://www.trae.ai/chat/completions",
]);

function normalizeNonEmptyString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function ensureHttpsUrl(rawValue: unknown, fallback: string): URL {
  const value = normalizeNonEmptyString(rawValue) || fallback;
  const withScheme = value.includes("://") ? value : `https://${value}`;
  return new URL(withScheme);
}

function dedupeKeepOrder(values: string[]): string[] {
  const output: string[] = [];
  const seen = new Set<string>();

  for (const value of values) {
    const normalized = value.trim();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    output.push(normalized);
  }

  return output;
}

function pickString(root: unknown, paths: string[][]): string {
  if (!root || typeof root !== "object") return "";

  for (const path of paths) {
    let current: unknown = root;
    for (const key of path) {
      if (!current || typeof current !== "object" || Array.isArray(current)) {
        current = null;
        break;
      }
      current = (current as Record<string, unknown>)[key];
    }

    const normalized = normalizeNonEmptyString(current);
    if (normalized) return normalized;
  }

  return "";
}

export function normalizeTraeLoginHost(loginHost?: unknown): string {
  try {
    const url = ensureHttpsUrl(loginHost, TRAE_DEFAULT_LOGIN_HOST);
    return `${url.protocol}//${url.host}`;
  } catch {
    return TRAE_DEFAULT_LOGIN_HOST;
  }
}

export function getTraeCandidateApiOrigins(loginHost?: unknown): string[] {
  const origins: string[] = [];

  try {
    const url = ensureHttpsUrl(loginHost, TRAE_DEFAULT_LOGIN_HOST);
    if (url.host) {
      origins.push(`${url.protocol}//${url.host}`);
      if (url.host.startsWith("www.")) {
        origins.push(`${url.protocol}//api.${url.host.slice(4)}`);
      }
    }
  } catch {
    // ignore
  }

  origins.push(
    TRAE_DEFAULT_API_ORIGIN,
    "https://api.marscode.com",
    "https://www.trae.ai",
    "https://www.marscode.com"
  );
  return dedupeKeepOrder(origins);
}

export function buildTraeApiUrls(loginHost: string | undefined, path: string): string[] {
  return getTraeCandidateApiOrigins(loginHost).map(
    (origin) => `${origin.replace(/\/+$/, "")}${path}`
  );
}

export function normalizeTraeChatBaseUrl(baseUrl?: unknown): string {
  const explicitBaseUrl = normalizeNonEmptyString(baseUrl);
  if (!explicitBaseUrl) return "";

  try {
    const url = ensureHttpsUrl(explicitBaseUrl, TRAE_SUGGESTED_CHAT_BASE_URL);
    const path = url.pathname.replace(/\/+$/, "");

    if (path.endsWith("/chat/completions")) {
      url.pathname = path;
    } else if (path.endsWith("/v1")) {
      url.pathname = `${path}/chat/completions`;
    } else {
      return "";
    }

    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/+$/, "");
  } catch {
    return "";
  }
}

export function getTraeBaseUrl(
  providerSpecificData: Record<string, unknown> | undefined = {}
): string {
  return normalizeTraeChatBaseUrl(providerSpecificData?.baseUrl);
}

export function isKnownInvalidTraeChatBaseUrl(baseUrl?: unknown): boolean {
  const normalized = normalizeTraeChatBaseUrl(baseUrl);
  return !!normalized && TRAE_KNOWN_INVALID_CHAT_BASE_URLS.has(normalized);
}

export function requireTraeBaseUrl(
  providerSpecificData: Record<string, unknown> | undefined = {}
): string {
  const baseUrl = getTraeBaseUrl(providerSpecificData);
  if (!baseUrl) {
    throw new Error(
      "Trae requires an explicit chat base URL ending in /v1 or /chat/completions. Capture the verified endpoint from Trae logs or network traffic and save it in the provider settings."
    );
  }

  if (isKnownInvalidTraeChatBaseUrl(baseUrl)) {
    throw new Error(
      "The public Trae chat URL guess currently returns 404/HTML. Capture the verified endpoint from Trae logs or network traffic and save it in the provider settings."
    );
  }

  return baseUrl;
}

export function buildTraeSessionHeaders(
  credentials: {
    accessToken?: string;
    apiKey?: string;
    providerSpecificData?: Record<string, unknown>;
  },
  stream = true
): Record<string, string> {
  const accessToken =
    normalizeNonEmptyString(credentials?.accessToken) ||
    normalizeNonEmptyString(credentials?.apiKey);
  const cookie = normalizeNonEmptyString(credentials?.providerSpecificData?.cookie);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: stream ? "text/event-stream" : "application/json",
    "User-Agent": TRAE_DEFAULT_USER_AGENT,
  };

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
    headers["x-cloudide-token"] = accessToken;
  }
  if (cookie) {
    headers.Cookie = cookie;
  }

  return headers;
}

export async function exchangeTraeRefreshToken({
  loginHost,
  refreshToken,
  accessToken,
}: {
  loginHost?: string;
  refreshToken: string;
  accessToken?: string;
}) {
  const normalizedRefreshToken = normalizeNonEmptyString(refreshToken);
  if (!normalizedRefreshToken) {
    throw new Error("Trae refresh token is required");
  }

  const urls = buildTraeApiUrls(loginHost, TRAE_EXCHANGE_TOKEN_PATH);
  const requestBody = {
    ClientID: TRAE_EXCHANGE_CLIENT_ID,
    RefreshToken: normalizedRefreshToken,
    ClientSecret: TRAE_EXCHANGE_CLIENT_SECRET,
    UserID: "",
    refreshToken: normalizedRefreshToken,
    refresh_token: normalizedRefreshToken,
    token: normalizeNonEmptyString(accessToken),
  };

  const errors: string[] = [];
  for (const url of urls) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(normalizeNonEmptyString(accessToken)
          ? { "x-cloudide-token": normalizeNonEmptyString(accessToken) }
          : {}),
      },
      body: JSON.stringify(requestBody),
    }).catch((error) => {
      errors.push(`${url} => ${error instanceof Error ? error.message : String(error)}`);
      return null;
    });

    if (!response) continue;

    const payload = await response.json().catch(async () => {
      const text = await response.text().catch(() => "");
      return { error: text || `HTTP ${response.status}` };
    });

    if (!response.ok) {
      errors.push(
        `${url} => ${pickString(payload, [["error"], ["message"]]) || `HTTP ${response.status}`}`
      );
      continue;
    }

    const nextAccessToken = pickString(payload, [
      ["Token"],
      ["accessToken"],
      ["access_token"],
      ["token"],
      ["data", "access_token"],
      ["result", "access_token"],
      ["Result", "access_token"],
    ]);

    if (!nextAccessToken) {
      errors.push(`${url} => response missing access token`);
      continue;
    }

    return {
      accessToken: nextAccessToken,
      refreshToken:
        pickString(payload, [
          ["RefreshToken"],
          ["refreshToken"],
          ["refresh_token"],
          ["data", "refresh_token"],
          ["result", "refresh_token"],
          ["Result", "refresh_token"],
        ]) || normalizedRefreshToken,
      tokenType: pickString(payload, [["TokenType"], ["tokenType"], ["token_type"]]) || "Bearer",
      expiresIn:
        Number.parseInt(
          pickString(payload, [["ExpiresIn"], ["expiresIn"], ["expires_in"]]) || "3600",
          10
        ) || 3600,
      exchangeRaw: payload,
    };
  }

  throw new Error(
    errors.length > 0
      ? `Trae ExchangeToken failed: ${errors.join(" | ")}`
      : "Trae ExchangeToken failed"
  );
}

export async function requestTraeUserInfo({
  loginHost,
  accessToken,
}: {
  loginHost?: string;
  accessToken: string;
}) {
  const normalizedAccessToken = normalizeNonEmptyString(accessToken);
  if (!normalizedAccessToken) {
    throw new Error("Trae access token is required");
  }

  const urls = buildTraeApiUrls(loginHost, TRAE_GET_USER_INFO_PATH);
  const errors: string[] = [];

  for (const url of urls) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${normalizedAccessToken}`,
        "Content-Type": "application/json",
        "User-Agent": TRAE_DEFAULT_USER_AGENT,
        "x-cloudide-token": normalizedAccessToken,
      },
      body: JSON.stringify({}),
    }).catch((error) => {
      errors.push(`${url} => ${error instanceof Error ? error.message : String(error)}`);
      return null;
    });

    if (!response) continue;

    const payload = await response.json().catch(async () => {
      const text = await response.text().catch(() => "");
      return { error: text || `HTTP ${response.status}` };
    });

    if (!response.ok) {
      errors.push(
        `${url} => ${pickString(payload, [["error"], ["message"]]) || `HTTP ${response.status}`}`
      );
      continue;
    }

    return payload;
  }

  throw new Error(
    errors.length > 0 ? `Trae GetUserInfo failed: ${errors.join(" | ")}` : "Trae GetUserInfo failed"
  );
}

export class TraeService {
  async validateImportToken({
    accessToken,
    refreshToken,
    loginHost,
    baseUrl,
  }: {
    accessToken?: string;
    refreshToken?: string;
    loginHost: string;
    baseUrl?: string;
  }) {
    const normalizedLoginHost = normalizeTraeLoginHost(loginHost);
    let activeAccessToken = normalizeNonEmptyString(accessToken);
    let activeRefreshToken = normalizeNonEmptyString(refreshToken);
    let exchangeRaw: unknown = null;

    if (activeRefreshToken) {
      const refreshed = await exchangeTraeRefreshToken({
        loginHost: normalizedLoginHost,
        refreshToken: activeRefreshToken,
        accessToken: activeAccessToken,
      });
      activeAccessToken = refreshed.accessToken;
      activeRefreshToken = refreshed.refreshToken;
      exchangeRaw = refreshed.exchangeRaw;
    }

    if (!activeAccessToken) {
      throw new Error("Trae access token is required");
    }

    const normalizedBaseUrl = requireTraeBaseUrl({
      baseUrl,
    });

    const profile = await requestTraeUserInfo({
      loginHost: normalizedLoginHost,
      accessToken: activeAccessToken,
    });

    return {
      accessToken: activeAccessToken,
      refreshToken: activeRefreshToken || null,
      email:
        pickString(profile, [
          ["email"],
          ["data", "email"],
          ["result", "email"],
          ["Result", "email"],
          ["user", "email"],
        ]) || null,
      userId:
        pickString(profile, [
          ["userID"],
          ["userId"],
          ["uid"],
          ["data", "userID"],
          ["data", "userId"],
          ["result", "userID"],
          ["result", "userId"],
          ["Result", "userID"],
          ["Result", "userId"],
        ]) || null,
      nickname:
        pickString(profile, [
          ["nickname"],
          ["name"],
          ["data", "nickname"],
          ["data", "name"],
          ["result", "nickname"],
          ["result", "name"],
          ["Result", "nickname"],
          ["Result", "name"],
        ]) || null,
      status:
        pickString(profile, [
          ["status"],
          ["data", "status"],
          ["result", "status"],
          ["Result", "status"],
        ]) || null,
      loginHost: normalizedLoginHost,
      baseUrl: normalizedBaseUrl,
      profileRaw: profile,
      exchangeRaw,
    };
  }

  getImportInstructions() {
    return {
      title: "How to import your Trae session",
      steps: [
        "1. Obtain your Trae access token from local storage or the callback payload used by the desktop client.",
        "2. Paste the login host shown by Trae (for example https://www.trae.ai or https://www.marscode.com).",
        "3. Optional: paste the refresh token as well so OmniRoute can rotate expired sessions automatically.",
        `4. OmniRoute validates the session via ${TRAE_GET_USER_INFO_PATH} and can refresh it via ${TRAE_EXCHANGE_TOKEN_PATH}.`,
        "5. Paste the verified Trae chat base URL from desktop logs or a network trace. Root hosts are not enough because OmniRoute does not guess the completions path anymore.",
      ],
    };
  }
}
