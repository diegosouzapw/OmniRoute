const ZED_USER_INFO_PATH = "/client/users/me";

export const ZED_DEFAULT_CLOUD_BASE_URL = "https://cloud.zed.dev";
export const ZED_DEFAULT_AI_BASE_URL = "https://ai.zed.dev/completion";

export type ZedQuotaSnapshot = {
  planRaw: string | null;
  isAccountTooYoung: boolean | null;
  tokenSpendUsedCents: number | null;
  tokenSpendLimitCents: number | null;
  tokenSpendRemainingCents: number | null;
  editPredictionsUsed: number | null;
  editPredictionsLimitRaw: string | null;
  editPredictionsRemainingRaw: string | null;
  billingPortalUrl: string | null;
};

function normalizeNonEmptyString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function normalizeUrl(rawValue: unknown, fallback: string): string {
  const value = normalizeNonEmptyString(rawValue) || fallback;

  try {
    const url = new URL(value.includes("://") ? value : `https://${value}`);
    url.hash = "";
    url.search = "";
    return url.toString().replace(/\/+$/, "");
  } catch {
    return fallback;
  }
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

function pickValue(root: unknown, paths: string[][]): unknown {
  if (!root || typeof root !== "object") return null;

  for (const path of paths) {
    let current: unknown = root;
    for (const key of path) {
      if (!current || typeof current !== "object" || Array.isArray(current)) {
        current = null;
        break;
      }
      current = (current as Record<string, unknown>)[key];
    }

    if (current !== null && current !== undefined) {
      return current;
    }
  }

  return null;
}

function toInteger(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.round(value);
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Number.parseInt(value.trim(), 10);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function toBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") return value;
  if (typeof value === "string" && value.trim()) {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "1" || normalized === "yes") return true;
    if (normalized === "false" || normalized === "0" || normalized === "no") return false;
  }
  if (typeof value === "number") return value !== 0;
  return null;
}

function toStringValue(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return toStringValue((value as Record<string, unknown>).limited);
  }
  return null;
}

export function extractZedQuotaSnapshot(payload: unknown): ZedQuotaSnapshot {
  return {
    planRaw:
      pickString(payload, [
        ["plan", "plan_v3"],
        ["plan", "plan"],
        ["plan", "name"],
        ["subscription", "name"],
        ["name"],
      ]) || null,
    isAccountTooYoung: toBoolean(
      pickValue(payload, [["is_account_too_young"], ["plan", "is_account_too_young"]])
    ),
    tokenSpendUsedCents: toInteger(
      pickValue(payload, [
        ["current_usage", "token_spend", "spend_in_cents"],
        ["current_usage", "token_spend", "used"],
        ["token_spend", "spend_in_cents"],
        ["token_spend", "used"],
      ])
    ),
    tokenSpendLimitCents: toInteger(
      pickValue(payload, [
        ["current_usage", "token_spend", "limit_in_cents"],
        ["current_usage", "token_spend", "limit"],
        ["token_spend", "limit_in_cents"],
        ["token_spend", "limit"],
      ])
    ),
    tokenSpendRemainingCents: toInteger(
      pickValue(payload, [
        ["current_usage", "token_spend", "remaining_in_cents"],
        ["current_usage", "token_spend", "remaining"],
        ["token_spend", "remaining_in_cents"],
        ["token_spend", "remaining"],
      ])
    ),
    editPredictionsUsed: toInteger(
      pickValue(payload, [
        ["current_usage", "edit_predictions", "used"],
        ["edit_predictions", "used"],
        ["plan", "usage", "edit_predictions", "used"],
      ])
    ),
    editPredictionsLimitRaw: toStringValue(
      pickValue(payload, [
        ["current_usage", "edit_predictions", "limit"],
        ["edit_predictions", "limit"],
        ["plan", "usage", "edit_predictions", "limit"],
      ])
    ),
    editPredictionsRemainingRaw: toStringValue(
      pickValue(payload, [
        ["current_usage", "edit_predictions", "remaining"],
        ["edit_predictions", "remaining"],
        ["plan", "usage", "edit_predictions", "remaining"],
      ])
    ),
    billingPortalUrl:
      pickString(payload, [["portal_url"], ["plan", "portal_url"], ["billing", "portal_url"]]) ||
      null,
  };
}

export function getZedCloudBaseUrl(baseUrl?: unknown): string {
  return normalizeUrl(baseUrl, ZED_DEFAULT_CLOUD_BASE_URL);
}

export function getZedChatUrl(
  providerSpecificData: Record<string, unknown> | undefined = {}
): string {
  const configured = normalizeNonEmptyString(providerSpecificData?.baseUrl);
  const normalized = normalizeUrl(configured, ZED_DEFAULT_AI_BASE_URL);

  try {
    const url = new URL(normalized);
    const path = url.pathname.replace(/\/+$/, "");
    if (!path || path === "/") {
      url.pathname = "/completion";
    } else if (!path.endsWith("/completion")) {
      url.pathname = `${path}/completion`;
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    return ZED_DEFAULT_AI_BASE_URL;
  }
}

export function buildZedAuthorizationHeader(userId: string, accessToken: string): string {
  const normalizedUserId = normalizeNonEmptyString(userId);
  const normalizedToken = normalizeNonEmptyString(accessToken);
  return normalizedUserId ? `${normalizedUserId} ${normalizedToken}` : `Bearer ${normalizedToken}`;
}

export function buildZedAccountHeaders(
  userId: string,
  accessToken: string
): Record<string, string> {
  return {
    Accept: "application/json",
    Authorization: buildZedAuthorizationHeader(userId, accessToken),
  };
}

export function buildZedChatHeaders(
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
  const userId = normalizeNonEmptyString(credentials?.providerSpecificData?.userId);
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: stream ? "text/event-stream" : "application/json",
  };

  if (accessToken) {
    headers.Authorization = buildZedAuthorizationHeader(userId, accessToken);
  }

  return headers;
}

export class ZedService {
  async validateImportToken(accessToken: string, userId: string, cloudBaseUrl?: string) {
    const normalizedToken = normalizeNonEmptyString(accessToken);
    const normalizedUserId = normalizeNonEmptyString(userId);
    if (!normalizedToken) {
      throw new Error("Zed access token is required");
    }
    if (!normalizedUserId) {
      throw new Error("Zed user ID is required");
    }

    const baseUrl = getZedCloudBaseUrl(cloudBaseUrl);
    const response = await fetch(`${baseUrl}${ZED_USER_INFO_PATH}`, {
      method: "GET",
      headers: buildZedAccountHeaders(normalizedUserId, normalizedToken),
    });

    const payload = await response.json().catch(async () => {
      const text = await response.text().catch(() => "");
      return { error: text || `HTTP ${response.status}` };
    });

    if (!response.ok) {
      const message =
        pickString(payload, [["error"], ["message"], ["error_description"]]) ||
        `Zed validation failed (${response.status})`;
      throw new Error(message);
    }

    const resolvedUserId =
      pickString(payload, [["id"], ["user_id"], ["user", "id"], ["user", "user_id"]]) ||
      normalizedUserId;
    const quota = extractZedQuotaSnapshot(payload);

    return {
      accessToken: normalizedToken,
      userId: resolvedUserId,
      githubLogin: pickString(payload, [
        ["github_login"],
        ["githubLogin"],
        ["github", "login"],
        ["login"],
        ["username"],
      ]),
      displayName: pickString(payload, [
        ["display_name"],
        ["displayName"],
        ["name"],
        ["user", "name"],
      ]),
      email: pickString(payload, [["email"], ["user", "email"]]),
      avatarUrl: pickString(payload, [["avatar_url"], ["avatarUrl"], ["user", "avatar_url"]]),
      cloudBaseUrl: baseUrl,
      quota,
      userRaw: payload,
    };
  }

  getImportInstructions() {
    return {
      title: "How to import your Zed session",
      steps: [
        "1. Obtain a current Zed access token and matching user ID from your local Zed credential store or account export.",
        "2. Paste the raw access token exactly as stored and the user ID that Zed uses for cloud API calls.",
        `3. OmniRoute validates the session against ${ZED_DEFAULT_CLOUD_BASE_URL}${ZED_USER_INFO_PATH} and extracts the current plan/quota snapshot when present.`,
        `4. Optional: override the AI base URL if you proxy ${ZED_DEFAULT_AI_BASE_URL} through a custom gateway.`,
      ],
    };
  }
}
