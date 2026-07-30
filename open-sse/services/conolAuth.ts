export const CONOL_SESSION_COOKIE_NAME = "__Secure-better-auth.session_token";

export interface ConolCredentialInput {
  apiKey?: unknown;
  accessToken?: unknown;
  cookie?: unknown;
  providerSpecificData?: unknown;
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readStoredValue(value: unknown): string {
  const raw = readString(value);
  if (!raw || !raw.startsWith("{")) return raw;
  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return (
      readString(parsed.cookie) ||
      readString(parsed[CONOL_SESSION_COOKIE_NAME]) ||
      readString(parsed.sessionToken)
    );
  } catch {
    return raw;
  }
}

export function normalizeConolCookie(rawValue: string): string {
  const raw = readStoredValue(rawValue).replace(/^Cookie:\s*/i, "").trim();
  if (!raw) return "";
  if (raw.includes("=")) return raw;
  return `${CONOL_SESSION_COOKIE_NAME}=${raw}`;
}

export function resolveConolCredentials(credentials?: ConolCredentialInput): {
  cookie: string;
} {
  const providerData =
    credentials?.providerSpecificData &&
    typeof credentials.providerSpecificData === "object" &&
    !Array.isArray(credentials.providerSpecificData)
      ? (credentials.providerSpecificData as Record<string, unknown>)
      : {};

  const raw =
    readStoredValue(providerData.cookie) ||
    readStoredValue(providerData[CONOL_SESSION_COOKIE_NAME]) ||
    readStoredValue(providerData.sessionToken) ||
    readStoredValue(credentials?.cookie) ||
    readStoredValue(credentials?.apiKey) ||
    readStoredValue(credentials?.accessToken);

  return { cookie: normalizeConolCookie(raw) };
}
