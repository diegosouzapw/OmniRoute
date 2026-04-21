import { createHash } from "node:crypto";
import {
  BaseExecutor,
  type CountTokensInput,
  type ExecuteInput,
  type ProviderCredentials,
} from "./base.ts";
import { DefaultExecutor } from "./default.ts";
import { PROVIDERS } from "../config/constants.ts";
import { getAccessToken } from "../services/tokenRefresh.ts";

const DEFAULT_GITLAB_BASE_URL = "https://gitlab.com";
const DIRECT_ACCESS_ENDPOINT = "/api/v4/code_suggestions/direct_access";
const DIRECT_ACCESS_EXPIRY_BUFFER_MS = 60_000;

type DirectAccessResponse = {
  base_url?: string;
  token?: string;
  expires_at?: number;
  headers?: Record<string, unknown>;
  model_details?: {
    model_provider?: string;
    model_name?: string;
  };
};

type CachedDirectAccess = {
  baseUrl: string;
  token: string;
  expiresAt: number;
  headers: Record<string, string>;
  modelProvider: string | null;
  modelName: string | null;
};

const directAccessCache = new Map<string, CachedDirectAccess>();

function normalizeGitLabBaseUrl(rawBaseUrl: unknown): string {
  let value =
    typeof rawBaseUrl === "string" && rawBaseUrl.trim()
      ? rawBaseUrl.trim()
      : DEFAULT_GITLAB_BASE_URL;

  if (!value.includes("://")) {
    value = `https://${value}`;
  }

  value = value.replace(/\/+$/, "");
  const suffixes = [
    "/api/v4/ai/chat/completions",
    "/api/v4/chat/completions",
    "/api/v4/code_suggestions/completions",
    "/api/v4/code_suggestions/direct_access",
    "/api/v4/ai",
    "/api/v4",
  ];

  const lowerValue = value.toLowerCase();
  for (const suffix of suffixes) {
    if (lowerValue.endsWith(suffix)) {
      return value.slice(0, -suffix.length) || DEFAULT_GITLAB_BASE_URL;
    }
  }

  return value || DEFAULT_GITLAB_BASE_URL;
}

function buildGatewayBaseUrl(rawBaseUrl: string, gatewayProvider: "openai" | "anthropic"): string {
  try {
    const url = new URL(rawBaseUrl);
    const path = url.pathname.replace(/\/+$/, "");
    const isGitlabDotCom = url.host.toLowerCase().includes("gitlab.com");

    if (gatewayProvider === "anthropic") {
      if (path.endsWith("/ai/v1/proxy/anthropic") || path.endsWith("/v1/proxy/anthropic")) {
        return url.toString().replace(/\/+$/, "");
      }
      if (path === "/ai") {
        url.pathname = "/ai/v1/proxy/anthropic";
      } else if (path) {
        url.pathname = `${path}/v1/proxy/anthropic`;
      } else {
        url.pathname = isGitlabDotCom ? "/ai/v1/proxy/anthropic" : "/v1/proxy/anthropic";
      }
      return url.toString().replace(/\/+$/, "");
    }

    if (path.endsWith("/ai/v1/proxy/openai/v1") || path.endsWith("/v1/proxy/openai/v1")) {
      return url.toString().replace(/\/+$/, "");
    }
    if (path === "/ai") {
      url.pathname = "/ai/v1/proxy/openai/v1";
    } else if (path) {
      url.pathname = `${path}/v1/proxy/openai/v1`;
    } else {
      url.pathname = isGitlabDotCom ? "/ai/v1/proxy/openai/v1" : "/v1/proxy/openai/v1";
    }
    return url.toString().replace(/\/+$/, "");
  } catch {
    return rawBaseUrl.replace(/\/+$/, "");
  }
}

function inferGatewayProvider(
  model: string,
  providerHint: unknown,
  modelNameHint: unknown
): "openai" | "anthropic" {
  const normalizedHint =
    typeof providerHint === "string" && providerHint.trim()
      ? providerHint.trim().toLowerCase()
      : "";
  if (normalizedHint === "anthropic" || normalizedHint === "openai") {
    return normalizedHint;
  }

  const candidate = `${modelNameHint || ""} ${model || ""}`.toLowerCase();
  if (candidate.includes("claude")) return "anthropic";
  if (
    candidate.includes("gpt") ||
    candidate.includes("codex") ||
    candidate.includes("o1") ||
    candidate.includes("o3") ||
    candidate.includes("o4")
  ) {
    return "openai";
  }
  return "openai";
}

function sanitizeHeaders(headers: unknown): Record<string, string> {
  if (!headers || typeof headers !== "object" || Array.isArray(headers)) {
    return {};
  }

  const normalized: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    if (typeof key === "string" && key.trim() && typeof value === "string" && value.trim()) {
      normalized[key] = value.trim();
    }
  }
  return normalized;
}

function getPrimaryToken(credentials: ProviderCredentials): string {
  return (
    (typeof credentials.accessToken === "string" && credentials.accessToken.trim()) ||
    (typeof credentials.apiKey === "string" && credentials.apiKey.trim()) ||
    ""
  );
}

function buildCacheKey(
  provider: string,
  credentials: ProviderCredentials,
  baseUrl: string
): string {
  if (typeof credentials.connectionId === "string" && credentials.connectionId.trim()) {
    return `${provider}:${credentials.connectionId}:${baseUrl}`;
  }

  return `${provider}:${createHash("sha256")
    .update(`${baseUrl}:${getPrimaryToken(credentials)}`)
    .digest("hex")}`;
}

export class GitLabExecutor extends BaseExecutor {
  private readonly openaiDelegate = new DefaultExecutor("openai-compatible-gitlab-duo");
  private readonly anthropicDelegate = new DefaultExecutor("anthropic-compatible-gitlab-duo");

  constructor(provider: string) {
    super(
      provider,
      PROVIDERS[provider] || PROVIDERS["gitlab-duo-oauth"] || PROVIDERS["gitlab-duo"]
    );
  }

  async execute(input: ExecuteInput) {
    let activeCredentials = input.credentials;

    if (this.needsRefresh(input.credentials)) {
      const refreshed = await this.refreshCredentials(input.credentials, input.log || null);
      if (refreshed) {
        activeCredentials = {
          ...input.credentials,
          ...refreshed,
          providerSpecificData: {
            ...(input.credentials.providerSpecificData || {}),
            ...(refreshed.providerSpecificData || {}),
          },
        };
        if (input.onCredentialsRefreshed) {
          await input.onCredentialsRefreshed(refreshed);
        }
      }
    }

    const directAccess = await this.fetchDirectAccess(activeCredentials);
    const gatewayProvider = inferGatewayProvider(
      input.model,
      directAccess.modelProvider,
      directAccess.modelName
    );
    const delegate = gatewayProvider === "anthropic" ? this.anthropicDelegate : this.openaiDelegate;
    const delegateCredentials = this.buildDelegateCredentials(
      activeCredentials,
      directAccess,
      gatewayProvider
    );
    const mergedHeaders = {
      ...(input.upstreamExtraHeaders || {}),
      ...directAccess.headers,
    };

    return delegate.execute({
      ...input,
      credentials: delegateCredentials,
      upstreamExtraHeaders: mergedHeaders,
    });
  }

  async countTokens(input: CountTokensInput) {
    const directAccess = await this.fetchDirectAccess(input.credentials);
    const gatewayProvider = inferGatewayProvider(
      input.model,
      directAccess.modelProvider,
      directAccess.modelName
    );
    const delegate = gatewayProvider === "anthropic" ? this.anthropicDelegate : this.openaiDelegate;
    const delegateCredentials = this.buildDelegateCredentials(
      input.credentials,
      directAccess,
      gatewayProvider
    );

    return delegate.countTokens({
      ...input,
      credentials: delegateCredentials,
    });
  }

  async refreshCredentials(credentials: ProviderCredentials, log) {
    if (!credentials.refreshToken) return null;
    try {
      return await getAccessToken(this.provider, credentials, log);
    } catch (error) {
      log?.error?.(
        "TOKEN",
        `gitlab duo refresh error: ${error instanceof Error ? error.message : String(error)}`
      );
      return null;
    }
  }

  needsRefresh(credentials?: ProviderCredentials | null) {
    return !!credentials?.refreshToken && super.needsRefresh(credentials);
  }

  private buildDelegateCredentials(
    credentials: ProviderCredentials,
    directAccess: CachedDirectAccess,
    gatewayProvider: "openai" | "anthropic"
  ): ProviderCredentials {
    const providerSpecificData = {
      ...(credentials.providerSpecificData || {}),
      baseUrl: buildGatewayBaseUrl(directAccess.baseUrl, gatewayProvider),
    };

    return {
      connectionId: credentials.connectionId,
      providerSpecificData,
      accessToken: gatewayProvider === "openai" ? directAccess.token : undefined,
      apiKey: gatewayProvider === "anthropic" ? directAccess.token : undefined,
    };
  }

  private async fetchDirectAccess(credentials: ProviderCredentials): Promise<CachedDirectAccess> {
    const baseUrl = normalizeGitLabBaseUrl(
      credentials.providerSpecificData?.baseUrl || this.config.baseUrl
    );
    const token = getPrimaryToken(credentials);
    if (!token) {
      throw new Error("GitLab Duo credentials missing access token or personal access token");
    }

    const cacheKey = buildCacheKey(this.provider, credentials, baseUrl);
    const cached = directAccessCache.get(cacheKey);
    if (cached && cached.expiresAt - DIRECT_ACCESS_EXPIRY_BUFFER_MS > Date.now()) {
      return cached;
    }

    const response = await fetch(`${baseUrl}${DIRECT_ACCESS_ENDPOINT}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    const payloadText = await response.text();
    if (!response.ok) {
      throw new Error(
        `GitLab direct_access failed (${response.status}): ${payloadText || response.statusText}`
      );
    }

    let payload: DirectAccessResponse;
    try {
      payload = payloadText ? JSON.parse(payloadText) : {};
    } catch (error) {
      throw new Error(
        `GitLab direct_access returned invalid JSON: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }

    const normalized: CachedDirectAccess = {
      baseUrl:
        typeof payload.base_url === "string" && payload.base_url.trim()
          ? payload.base_url.trim()
          : baseUrl,
      token: typeof payload.token === "string" ? payload.token.trim() : "",
      expiresAt:
        typeof payload.expires_at === "number" && Number.isFinite(payload.expires_at)
          ? payload.expires_at * 1000
          : Date.now() + 5 * 60 * 1000,
      headers: sanitizeHeaders(payload.headers),
      modelProvider:
        typeof payload.model_details?.model_provider === "string"
          ? payload.model_details.model_provider.trim().toLowerCase()
          : null,
      modelName:
        typeof payload.model_details?.model_name === "string"
          ? payload.model_details.model_name.trim()
          : null,
    };

    if (!normalized.baseUrl || !normalized.token) {
      throw new Error("GitLab direct_access response is missing base_url or token");
    }

    directAccessCache.set(cacheKey, normalized);
    return normalized;
  }
}

export default GitLabExecutor;
