/**
 * Zed Hosted Models — auth + model-catalog helpers.
 *
 * Zed's cloud aggregator (cloud.zed.dev) authenticates native apps with a
 * self-generated RSA keypair instead of a registered OAuth client_id/secret:
 *
 *   1. The client (OmniRoute) generates an ephemeral RSA keypair.
 *   2. It sends the public key to zed.dev/native_app_signin (as a URL param).
 *   3. The user signs in inside their browser (Zed itself brokers GitHub/Google).
 *   4. Zed's browser flow redirects to a local "native app" callback
 *      (`http://127.0.0.1:<port>/?user_id=...&access_token=...`) with the
 *      access token RSA-encrypted against the public key we sent in step 2.
 *   5. OmniRoute decrypts the access token locally with the private key that
 *      never left the server (or the operator's browser/paste flow).
 *
 * No client_id/client_secret/Firebase key is embedded anywhere in this file —
 * the "credential" is a keypair generated fresh per login attempt, so
 * CLAUDE.md Hard Rule #11 (resolvePublicCred for embedded upstream secrets)
 * does not apply here.
 *
 * Ported from decolua/9router PR #2328 (open-sse/shared/zedAuth.js),
 * adapted to TypeScript + OmniRoute conventions. `fetch` is intentionally the
 * global one — open-sse/utils/proxyFetch.ts monkey-patches `globalThis.fetch`
 * with the proxy-aware dispatcher at module load, so every plain `fetch()`
 * call in this codebase already goes through it.
 */

import crypto from "node:crypto";

export const ZED_WEB_BASE_URL = "https://zed.dev";
export const ZED_CLOUD_BASE_URL = "https://cloud.zed.dev";
export const ZED_LLM_BASE_URL = "https://cloud.zed.dev";

export const ZED_HEADERS = {
  expiredToken: "x-zed-expired-token",
  outdatedToken: "x-zed-outdated-token",
  clientSupportsStatus: "x-zed-client-supports-status-messages",
  clientSupportsStreamEnded: "x-zed-client-supports-stream-ended-request-completion-status",
  serverSupportsStatus: "x-zed-server-supports-status-messages",
  clientSupportsXai: "x-zed-client-supports-x-ai",
  systemId: "x-zed-system-id",
} as const;

const PRIVATE_KEY_PREFIX = "zed-rsa-pkcs1:";
const LLM_TOKEN_TTL_MS = 50 * 60 * 1000;
const MODEL_CACHE_TTL_MS = 60 * 60 * 1000;

export type ZedRawModel = Record<string, unknown>;

export type ZedModel = {
  id: string;
  name: string;
  provider: unknown;
  isLatest: boolean;
  contextLength: unknown;
  contextLengthInMaxMode: unknown;
  maxOutputTokens: unknown;
  supportsTools: boolean;
  supportsImages: boolean;
  supportsThinking: boolean;
  supportsDisablingThinking: boolean;
  supportsFastMode: boolean;
  supportsServerSideCompaction: boolean;
  supportedEffortLevels: unknown;
  supportsStreamingTools: boolean;
  supportsParallelToolCalls: boolean;
  isDisabled: boolean;
  disabledReason: unknown;
};

export type ZedModelCatalog = {
  expiresAt: number;
  models: ZedModel[];
  rawModels: ZedRawModel[];
  rawById: Map<string, ZedRawModel>;
  defaultModel: string;
  defaultFastModel: string;
  recommendedModels: string[];
};

export type ZedCredentials = {
  accessToken?: string;
  apiKey?: string;
  providerSpecificData?: {
    userId?: string;
    systemId?: string;
    organizationId?: unknown;
    defaultOrganizationId?: unknown;
    [key: string]: unknown;
  } | null;
  [key: string]: unknown;
};

export type ZedRequestConfig = {
  webBaseUrl?: string;
  cloudBaseUrl?: string;
  llmBaseUrl?: string;
  defaultNativeAppPort?: number;
  [key: string]: unknown;
};

const llmTokenCache = new Map<string, { token: string; expiresAt: number }>();
const modelCache = new Map<string, ZedModelCatalog>();
const modelInflight = new Map<string, Promise<ZedModelCatalog>>();

function b64url(value: string): string {
  return Buffer.from(value).toString("base64url");
}

function b64urlPadded(value: Buffer): string {
  return value.toString("base64").replace(/\+/g, "-").replace(/\//g, "_");
}

function fromB64url(value: string): string {
  return Buffer.from(String(value || ""), "base64url").toString("utf8");
}

function normalizeBaseUrl(baseUrl: unknown, fallback: string): string {
  return String(baseUrl || fallback).replace(/\/+$/, "");
}

function zedUrl(
  config: ZedRequestConfig | undefined,
  key: "cloudBaseUrl" | "llmBaseUrl" | "webBaseUrl",
  path: string,
  fallbackBase: string
): string {
  const base = normalizeBaseUrl(config?.[key], fallbackBase);
  return `${base}${path}`;
}

/** Encode a PEM private key as an opaque verifier string that can flow through the
 * generic OAuth `codeVerifier` slot (mirrors PKCE's code_verifier plumbing). */
export function encodeZedPrivateKeyVerifier(privateKeyPem: string): string {
  return `${PRIVATE_KEY_PREFIX}${b64url(privateKeyPem)}`;
}

export function decodeZedPrivateKeyVerifier(verifier: unknown): string {
  const value = String(verifier || "");
  if (!value.startsWith(PRIVATE_KEY_PREFIX)) {
    throw new Error("Missing Zed private key verifier; restart the login flow");
  }
  return fromB64url(value.slice(PRIVATE_KEY_PREFIX.length));
}

export type ZedNativeAuthData = {
  authUrl: string;
  privateKeyVerifier: string;
  nativeAppPort: number;
  systemId: string;
  publicKey: string;
};

/** Generate a fresh RSA keypair + the zed.dev native_app_signin URL for it. */
export function createZedNativeAuthData(
  config: ZedRequestConfig = {},
  options: { nativeAppPort?: number; systemId?: string } = {}
): ZedNativeAuthData {
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: { type: "pkcs1", format: "der" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
  });

  const nativeAppPort = Number(options.nativeAppPort || config.defaultNativeAppPort || 58443);
  const systemId = options.systemId || crypto.randomUUID();
  const publicKeyString = b64urlPadded(publicKey as unknown as Buffer);
  const signInUrl = new URL(
    `${normalizeBaseUrl(config.webBaseUrl, ZED_WEB_BASE_URL)}/native_app_signin`
  );
  signInUrl.searchParams.set("native_app_port", String(nativeAppPort));
  signInUrl.searchParams.set("native_app_public_key", publicKeyString);
  if (systemId) signInUrl.searchParams.set("system_id", systemId);

  return {
    authUrl: signInUrl.toString(),
    privateKeyVerifier: encodeZedPrivateKeyVerifier(privateKey as unknown as string),
    nativeAppPort,
    systemId,
    publicKey: publicKeyString,
  };
}

export type ZedCallbackPayload = {
  userId: string;
  encryptedAccessToken: string;
};

/** Parse the pasted native-app callback URL/JSON/query string into userId + encrypted token. */
export function parseZedCallbackPayload(input: unknown): ZedCallbackPayload {
  const raw = String(input || "").trim();
  if (!raw) throw new Error("Missing Zed callback URL");

  let data: Record<string, unknown> = {};
  try {
    data = JSON.parse(raw);
  } catch {
    let url: URL;
    try {
      url = new URL(raw);
    } catch {
      try {
        url = new URL(`http://127.0.0.1/?${raw.replace(/^\?/, "")}`);
      } catch {
        throw new Error("Invalid Zed callback URL");
      }
    }
    url.searchParams.forEach((value, key) => {
      data[key] = value;
    });
  }

  const userId = data.user_id || data.userId;
  const encryptedAccessToken = data.access_token || data.accessToken || data.token;
  if (!userId || !encryptedAccessToken) {
    throw new Error("Zed callback must include user_id and access_token");
  }
  return {
    userId: String(userId),
    encryptedAccessToken: String(encryptedAccessToken),
  };
}

/** Decrypt the RSA-encrypted access token Zed returned, using our stored private key. */
export function decryptZedAccessToken(encryptedAccessToken: unknown, privateKeyVerifier: unknown): string {
  const privateKey = decodeZedPrivateKeyVerifier(privateKeyVerifier);
  const encrypted = Buffer.from(String(encryptedAccessToken), "base64url");
  try {
    return crypto
      .privateDecrypt(
        { key: privateKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: "sha256" },
        encrypted
      )
      .toString("utf8");
  } catch (oaepError) {
    try {
      return crypto
        .privateDecrypt({ key: privateKey, padding: crypto.constants.RSA_PKCS1_PADDING }, encrypted)
        .toString("utf8");
    } catch {
      const message = oaepError instanceof Error ? oaepError.message : String(oaepError);
      throw new Error(`Failed to decrypt Zed access token: ${message}`);
    }
  }
}

export function buildZedUserAuthHeader(credentials: ZedCredentials | null | undefined): string {
  const psd = credentials?.providerSpecificData || {};
  const userId = psd.userId || (credentials as Record<string, unknown> | null)?.userId;
  const accessToken = credentials?.accessToken || credentials?.apiKey;
  if (!userId || !accessToken) {
    throw new Error("Zed credential is missing userId or accessToken");
  }
  return `${userId} ${accessToken}`;
}

function getSystemId(credentials: ZedCredentials | null | undefined): string {
  return String(
    credentials?.providerSpecificData?.systemId ||
      (credentials as Record<string, unknown> | null)?.systemId ||
      ""
  );
}

async function fetchJson(url: string, options: RequestInit) {
  const res = await fetch(url, options);
  const text = await res.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }
  }
  if (!res.ok) {
    const message = data?.message || data?.error?.message || data?.error || text || `HTTP ${res.status}`;
    const err = new Error(String(message)) as Error & { status?: number; body?: unknown };
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}

export async function fetchZedAuthenticatedUser(
  credentials: ZedCredentials,
  options: { config?: ZedRequestConfig; signal?: AbortSignal | null } = {}
) {
  const config = options.config || {};
  const headers: Record<string, string> = {
    Accept: "application/json",
    Authorization: buildZedUserAuthHeader(credentials),
  };
  const systemId = getSystemId(credentials);
  if (systemId) headers[ZED_HEADERS.systemId] = systemId;

  return fetchJson(zedUrl(config, "cloudBaseUrl", "/client/users/me", ZED_CLOUD_BASE_URL), {
    method: "GET",
    headers,
    signal: options.signal ?? undefined,
  });
}

function normalizeOrganizationId(value: unknown): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (typeof value === "object" && value !== null) {
    const rec = value as Record<string, unknown>;
    if (typeof rec[0] === "string") return rec[0] as string;
    if (typeof rec.id === "string") return rec.id;
  }
  return String(value);
}

export function resolveZedOrganizationId(
  credentials: ZedCredentials,
  userInfo = null
): string {
  const psd = credentials?.providerSpecificData || {};
  const explicit = normalizeOrganizationId(psd.organizationId || psd.defaultOrganizationId);
  if (explicit) return explicit;
  const fromUser = normalizeOrganizationId(
    userInfo?.default_organization_id || userInfo?.defaultOrganizationId
  );
  if (fromUser) return fromUser;
  const org =
    (userInfo?.organizations || []).find((item: Record<string, unknown>) => item?.is_personal) ||
    userInfo?.organizations?.[0];
  return normalizeOrganizationId(org?.id);
}

function zedUserCacheKey(credentials: ZedCredentials, organizationId: string): string {
  const psd = credentials?.providerSpecificData || {};
  const userId = psd.userId || (credentials as Record<string, unknown>).userId || "unknown";
  const token = credentials?.accessToken || credentials?.apiKey || "";
  return `${userId}:${organizationId || "default"}:${token.slice(-16)}`;
}

function zedModelCacheKey(credentials: ZedCredentials): string {
  const psd = credentials?.providerSpecificData || {};
  const org = psd.organizationId || psd.defaultOrganizationId || "default";
  const token = credentials?.accessToken || credentials?.apiKey || "";
  return `${psd.userId || "unknown"}:${org}:${token.slice(-16)}`;
}

export async function fetchZedLlmToken(
  credentials: ZedCredentials,
  options: {
    config?: ZedRequestConfig;
    organizationId?: string;
    forceRefresh?: boolean;
    signal?: AbortSignal | null;
  } = {}
): Promise<string> {
  const config = options.config || {};
  let organizationId = options.organizationId || resolveZedOrganizationId(credentials);
  if (!organizationId) {
    const userInfo = await fetchZedAuthenticatedUser(credentials, options);
    organizationId = resolveZedOrganizationId(credentials, userInfo);
  }
  if (!organizationId) throw new Error("No Zed organization selected");

  const cacheKey = zedUserCacheKey(credentials, organizationId);
  const cached = llmTokenCache.get(cacheKey);
  if (!options.forceRefresh && cached && cached.expiresAt > Date.now()) return cached.token;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: buildZedUserAuthHeader(credentials),
  };
  const systemId = getSystemId(credentials);
  if (systemId) headers[ZED_HEADERS.systemId] = systemId;

  const data = await fetchJson(zedUrl(config, "cloudBaseUrl", "/client/llm_tokens", ZED_CLOUD_BASE_URL), {
    method: "POST",
    headers,
    body: JSON.stringify({ organization_id: organizationId }),
    signal: options.signal ?? undefined,
  });
  const token =
    typeof data?.token === "string" ? data.token : data?.token?.[0] || data?.token?.value;
  if (!token) throw new Error("Zed did not return an LLM token");
  llmTokenCache.set(cacheKey, { token, expiresAt: Date.now() + LLM_TOKEN_TTL_MS });
  return token;
}

export function shouldRefreshZedLlmToken(response: Response | null | undefined): boolean {
  return (
    response?.status === 401 ||
    !!response?.headers?.has?.(ZED_HEADERS.expiredToken) ||
    !!response?.headers?.has?.(ZED_HEADERS.outdatedToken)
  );
}

export async function zedLlmFetch(
  credentials: ZedCredentials,
  path: string,
  options: {
    config?: ZedRequestConfig;
    signal?: AbortSignal | null;
    fetchOptions?: RequestInit;
    organizationId?: string;
    forceRefresh?: boolean;
  } = {}
): Promise<Response> {
  const config = options.config || {};
  const url = zedUrl(config, "llmBaseUrl", path, ZED_LLM_BASE_URL);
  const buildRequest = async (forceRefresh: boolean) => {
    const token = await fetchZedLlmToken(credentials, { ...options, forceRefresh });
    return fetch(url, {
      ...options.fetchOptions,
      headers: {
        ...(options.fetchOptions?.headers || {}),
        Authorization: `Bearer ${token}`,
      },
      signal: options.signal ?? undefined,
    });
  };

  let response = await buildRequest(false);
  if (shouldRefreshZedLlmToken(response)) {
    response = await buildRequest(true);
  }
  return response;
}

function normalizeZedModelId(id: unknown): string {
  if (!id) return "";
  if (typeof id === "string") return id;
  if (typeof id === "object" && id !== null) {
    const rec = id as Record<string, unknown>;
    if (typeof rec[0] === "string") return rec[0] as string;
    if (typeof rec.id === "string") return rec.id;
  }
  return String(id);
}

export function mapZedModel(model: ZedRawModel): ZedModel | null {
  const id = normalizeZedModelId(model?.id);
  if (!id) return null;
  return {
    id,
    name: (model.display_name as string) || (model.displayName as string) || id,
    provider: model.provider,
    isLatest: !!model.is_latest,
    contextLength: model.max_token_count ?? model.maxTokenCount,
    contextLengthInMaxMode: model.max_token_count_in_max_mode ?? model.maxTokenCountInMaxMode,
    maxOutputTokens: model.max_output_tokens ?? model.maxOutputTokens,
    supportsTools: !!model.supports_tools,
    supportsImages: !!model.supports_images,
    supportsThinking: !!model.supports_thinking,
    supportsDisablingThinking: !!model.supports_disabling_thinking,
    supportsFastMode: !!model.supports_fast_mode,
    supportsServerSideCompaction: !!model.supports_server_side_compaction,
    supportedEffortLevels: model.supported_effort_levels ?? model.supportedEffortLevels ?? [],
    supportsStreamingTools: !!model.supports_streaming_tools,
    supportsParallelToolCalls: !!model.supports_parallel_tool_calls,
    isDisabled: !!model.is_disabled,
    disabledReason: model.disabled_reason ?? null,
  };
}

/** Resolve (and cache) the live Zed model catalog. Never hardcoded — always a live fetch. */
export async function resolveZedModels(
  credentials: ZedCredentials,
  options: {
    config?: ZedRequestConfig;
    signal?: AbortSignal | null;
    forceRefresh?: boolean;
  } = {}
): Promise<ZedModelCatalog | null> {
  if (!credentials?.accessToken) return null;
  const key = zedModelCacheKey(credentials);
  const cached = modelCache.get(key);
  if (!options.forceRefresh && cached && cached.expiresAt > Date.now()) return cached;

  const existing = modelInflight.get(key);
  if (existing && !options.forceRefresh) return existing;

  const promise = (async (): Promise<ZedModelCatalog> => {
    const response = await zedLlmFetch(credentials, "/models", {
      ...options,
      fetchOptions: {
        method: "GET",
        headers: {
          Accept: "application/json",
          [ZED_HEADERS.clientSupportsXai]: "true",
        },
      },
    });
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      throw new Error(`Zed models failed: ${response.status} ${text}`);
    }
    const data = await response.json();
    const rawModels: ZedRawModel[] = Array.isArray(data?.models) ? data.models : [];
    const models = rawModels
      .map(mapZedModel)
      .filter((m): m is ZedModel => !!m)
      .filter((model) => !model.isDisabled);
    const rawById = new Map<string, ZedRawModel>();
    for (const raw of rawModels) {
      const id = normalizeZedModelId(raw?.id);
      if (id) rawById.set(id, raw);
    }
    const entry: ZedModelCatalog = {
      expiresAt: Date.now() + MODEL_CACHE_TTL_MS,
      models,
      rawModels,
      rawById,
      defaultModel: normalizeZedModelId(data?.default_model ?? data?.defaultModel),
      defaultFastModel: normalizeZedModelId(data?.default_fast_model ?? data?.defaultFastModel),
      recommendedModels: (data?.recommended_models || data?.recommendedModels || [])
        .map(normalizeZedModelId)
        .filter(Boolean),
    };
    modelCache.set(key, entry);
    return entry;
  })();

  modelInflight.set(key, promise);
  try {
    return await promise;
  } finally {
    if (modelInflight.get(key) === promise) modelInflight.delete(key);
  }
}

export function clearZedCaches(): void {
  llmTokenCache.clear();
  modelCache.clear();
  modelInflight.clear();
}
