import { DefaultExecutor } from "./default.ts";
import type { ExecutorLog, ProviderCredentials } from "./base.ts";
import { getAccessToken } from "../services/tokenRefresh.ts";

export const NOUS_RESEARCH_DEFAULT_PORTAL_URL = "https://portal.nousresearch.com";
export const NOUS_RESEARCH_DEFAULT_INFERENCE_URL = "https://inference-api.nousresearch.com/v1";
export const NOUS_RESEARCH_DEFAULT_AGENT_KEY_MIN_TTL_SECONDS = 30 * 60;

function toRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

function toNonEmptyString(value: unknown): string {
  return typeof value === "string" && value.trim() ? value.trim() : "";
}

function normalizeBaseUrl(baseUrl: string, fallback: string): string {
  const normalized = toNonEmptyString(baseUrl || fallback).replace(/\/+$/, "");
  return normalized || fallback;
}

function parseDateMs(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value > 1e12 ? value : value * 1000;
  }
  if (typeof value === "string" && value.trim()) {
    const trimmed = value.trim();
    const numeric = Number(trimmed);
    if (Number.isFinite(numeric)) {
      return numeric > 1e12 ? numeric : numeric * 1000;
    }
    const parsed = Date.parse(trimmed);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function toPositiveInteger(value: unknown, fallback: number): number {
  const numeric =
    typeof value === "number" && Number.isFinite(value)
      ? value
      : typeof value === "string" && value.trim()
        ? Number(value)
        : NaN;
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(1, Math.floor(numeric));
}

function isExpiring(expiresAt: unknown, skewMs = 2 * 60 * 1000): boolean {
  const expiresAtMs = parseDateMs(expiresAt);
  if (!expiresAtMs) return false;
  return expiresAtMs - Date.now() <= skewMs;
}

export function getNousResearchPortalBaseUrl(providerSpecificData: unknown = {}): string {
  const psd = toRecord(providerSpecificData);
  return normalizeBaseUrl(toNonEmptyString(psd.portalBaseUrl), NOUS_RESEARCH_DEFAULT_PORTAL_URL);
}

export function getNousResearchInferenceBaseUrl(providerSpecificData: unknown = {}): string {
  const psd = toRecord(providerSpecificData);
  const baseUrl = normalizeBaseUrl(
    toNonEmptyString(psd.inferenceBaseUrl) || toNonEmptyString(psd.baseUrl),
    NOUS_RESEARCH_DEFAULT_INFERENCE_URL
  );

  if (baseUrl.endsWith("/chat/completions")) {
    return baseUrl.slice(0, -"/chat/completions".length);
  }

  return baseUrl;
}

export function buildNousResearchAgentKeyUrl(portalBaseUrl: string): string {
  return `${normalizeBaseUrl(portalBaseUrl, NOUS_RESEARCH_DEFAULT_PORTAL_URL)}/api/oauth/agent-key`;
}

export function buildNousResearchChatUrl(credentials: ProviderCredentials | null = null): string {
  return `${getNousResearchInferenceBaseUrl(credentials?.providerSpecificData)}/chat/completions`;
}

export function buildNousResearchHeaders(
  credentials: ProviderCredentials,
  stream = true
): Record<string, string> {
  const psd = toRecord(credentials?.providerSpecificData);
  const agentKey = toNonEmptyString(psd.agentKey);
  const token = agentKey || credentials?.apiKey || credentials?.accessToken || "";
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
    Accept: stream ? "text/event-stream" : "application/json",
  };
}

export async function mintNousResearchAgentKey({
  accessToken,
  portalBaseUrl,
  minTtlSeconds = NOUS_RESEARCH_DEFAULT_AGENT_KEY_MIN_TTL_SECONDS,
}: {
  accessToken: string;
  portalBaseUrl?: string;
  minTtlSeconds?: number;
}): Promise<Record<string, unknown>> {
  const response = await fetch(buildNousResearchAgentKeyUrl(portalBaseUrl || ""), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      min_ttl_seconds: Math.max(60, toPositiveInteger(minTtlSeconds, 1800)),
    }),
  });

  const payload = await response.json().catch(async () => {
    const text = await response.text().catch(() => "");
    return { error: text || `HTTP ${response.status}` };
  });

  if (!response.ok) {
    const message =
      toNonEmptyString((payload as Record<string, unknown>).error_description) ||
      toNonEmptyString((payload as Record<string, unknown>).error) ||
      `Nous Research agent-key exchange failed (${response.status})`;
    throw new Error(message);
  }

  if (!toNonEmptyString((payload as Record<string, unknown>).api_key)) {
    throw new Error("Nous Research agent-key exchange returned no api_key");
  }

  return payload as Record<string, unknown>;
}

export class NousResearchExecutor extends DefaultExecutor {
  constructor(provider = "nous-research") {
    super(provider);
  }

  buildUrl(
    model: string,
    stream: boolean,
    urlIndex = 0,
    credentials: ProviderCredentials | null = null
  ) {
    void model;
    void stream;
    void urlIndex;
    return buildNousResearchChatUrl(credentials);
  }

  buildHeaders(credentials: ProviderCredentials, stream = true): Record<string, string> {
    return buildNousResearchHeaders(credentials, stream);
  }

  needsRefresh(credentials?: ProviderCredentials | null): boolean {
    const psd = toRecord(credentials?.providerSpecificData);
    if (!toNonEmptyString(psd.agentKey)) return true;
    if (isExpiring(psd.agentKeyExpiresAt)) return true;
    return super.needsRefresh(credentials);
  }

  async refreshCredentials(credentials: ProviderCredentials, log: ExecutorLog | null) {
    const currentProviderData = {
      ...toRecord(credentials?.providerSpecificData),
    };
    let activeCredentials: ProviderCredentials = {
      ...credentials,
      providerSpecificData: currentProviderData,
    };

    if (super.needsRefresh(credentials) && credentials.refreshToken) {
      const refreshed = await getAccessToken(this.provider, credentials, log || null);
      if (refreshed?.accessToken) {
        activeCredentials = {
          ...activeCredentials,
          ...refreshed,
        };
      }
    }

    const accessToken = toNonEmptyString(activeCredentials.accessToken);
    if (!accessToken) {
      return activeCredentials === credentials ? null : activeCredentials;
    }

    const portalBaseUrl = getNousResearchPortalBaseUrl(currentProviderData);
    const minTtlSeconds = toPositiveInteger(
      currentProviderData.agentKeyMinTtlSeconds,
      NOUS_RESEARCH_DEFAULT_AGENT_KEY_MIN_TTL_SECONDS
    );
    const minted = await mintNousResearchAgentKey({
      accessToken,
      portalBaseUrl,
      minTtlSeconds,
    });

    const nextProviderSpecificData = {
      ...currentProviderData,
      portalBaseUrl,
      inferenceBaseUrl: getNousResearchInferenceBaseUrl(currentProviderData),
      agentKey: toNonEmptyString(minted.api_key),
      agentKeyId: toNonEmptyString(minted.key_id) || null,
      agentKeyExpiresAt:
        toNonEmptyString(minted.expires_at) ||
        (typeof minted.expires_in === "number" && Number.isFinite(minted.expires_in)
          ? new Date(Date.now() + Math.max(1, Number(minted.expires_in)) * 1000).toISOString()
          : null),
      agentKeyExpiresIn:
        typeof minted.expires_in === "number" && Number.isFinite(minted.expires_in)
          ? Number(minted.expires_in)
          : null,
      agentKeyReused: Boolean(minted.reused),
      agentKeyObtainedAt: new Date().toISOString(),
    };

    return {
      accessToken,
      refreshToken: activeCredentials.refreshToken,
      ...(activeCredentials.expiresIn != null ? { expiresIn: activeCredentials.expiresIn } : {}),
      ...(activeCredentials.expiresAt ? { expiresAt: activeCredentials.expiresAt } : {}),
      providerSpecificData: nextProviderSpecificData,
    };
  }
}
