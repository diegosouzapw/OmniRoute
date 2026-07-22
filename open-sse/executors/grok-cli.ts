/**
 * GrokCliExecutor — Grok Build Provider
 *
 * Routes Responses API requests through Grok's chat proxy using OAuth authentication.
 * The standard BaseExecutor transport provides streaming, retries, abort propagation,
 * proxy-aware fetch dispatch, upstream-header merging, and credential-refresh persistence.
 */

import { PROVIDERS } from "../config/constants.ts";
import {
  getGrokBuildSessionHeaders,
  GROK_BUILD_DEFAULT_REASONING_EFFORT,
  GROK_BUILD_REASONING_INCLUDE,
  GROK_BUILD_RESPONSES_URL,
  GROK_BUILD_TOKEN_URL,
} from "../config/grokBuild.ts";
import { resolvePublicCred } from "../utils/publicCreds.ts";
import { BaseExecutor, type ExecutorLog, type ProviderCredentials } from "./base.ts";

const GROK_BUILD_MAX_TOOLS = 200;
const GROK_BUILD_SUPPORTED_REASONING_EFFORTS = new Set(["low", "medium", "high"]);
const GROK_BUILD_REFRESH_MAX_ATTEMPTS = 3;
const GROK_BUILD_REFRESH_MIN_DELAY_MS = 200;
const GROK_BUILD_TERMINAL_REFRESH_ERRORS = new Set(["invalid_grant", "invalid_client"]);
const GROK_BUILD_UNSUPPORTED_PARAMS = [
  "presencePenalty",
  "frequencyPenalty",
  "logprobs",
  "topLogprobs",
  "presence_penalty",
  "frequency_penalty",
  "top_logprobs",
  "reasoning_effort",
];

type GrokBuildRefreshResult = Partial<ProviderCredentials> | null | undefined;

function nonEmptyString(value: unknown): string | null {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : null;
}

function getRefreshRetryDelayMs(retryNumber: number): number {
  const baseDelay = Math.min(
    2_000,
    GROK_BUILD_REFRESH_MIN_DELAY_MS * 2 ** Math.max(0, retryNumber - 1)
  );
  return Math.max(1, Math.round(baseDelay * (0.5 + Math.random())));
}

function asRequestRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value)
    ? { ...(value as Record<string, unknown>) }
    : {};
}

function ensureReasoningInclude(value: unknown): unknown[] {
  const include = Array.isArray(value) ? [...value] : [];
  if (!include.includes(GROK_BUILD_REASONING_INCLUDE)) {
    include.push(GROK_BUILD_REASONING_INCLUDE);
  }
  return include;
}

function normalizeGrokBuildReasoning(
  value: unknown,
  model: string
): Record<string, unknown> | null {
  const reasoning = asRequestRecord(value);
  const hasExplicitEffort = Object.prototype.hasOwnProperty.call(reasoning, "effort");
  if (!GROK_BUILD_SUPPORTED_REASONING_EFFORTS.has(String(reasoning.effort))) {
    delete reasoning.effort;
  }
  if (model === "grok-composer-2.5-fast") {
    delete reasoning.effort;
  } else if (model === "grok-4.5" && !hasExplicitEffort) {
    reasoning.effort = GROK_BUILD_DEFAULT_REASONING_EFFORT;
  }
  return Object.keys(reasoning).length > 0 ? reasoning : null;
}

function stripUnsupportedGrokBuildParams(request: Record<string, unknown>): void {
  for (const param of GROK_BUILD_UNSUPPORTED_PARAMS) {
    delete request[param];
  }
}

async function refreshGrokBuildCredentialsOnce(
  body: URLSearchParams,
  credentials: ProviderCredentials,
  attempt: number,
  log?: ExecutorLog | null
): Promise<GrokBuildRefreshResult> {
  try {
    const response = await fetch(GROK_BUILD_TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      signal: AbortSignal.timeout(15_000),
    });
    const data = (await response.json().catch(() => ({}))) as Record<string, unknown>;

    if (!response.ok) {
      const errorCode = nonEmptyString(data.error);
      const isTerminal =
        attempt === GROK_BUILD_REFRESH_MAX_ATTEMPTS ||
        (errorCode !== null && GROK_BUILD_TERMINAL_REFRESH_ERRORS.has(errorCode));
      log?.warn?.("TOKEN_REFRESH", `Grok Build: refresh failed with status ${response.status}`);
      return isTerminal ? null : undefined;
    }

    const accessToken = nonEmptyString(data.access_token);
    if (!accessToken) {
      log?.warn?.("TOKEN_REFRESH", "Grok Build: no access_token in refresh response");
      return attempt === GROK_BUILD_REFRESH_MAX_ATTEMPTS ? null : undefined;
    }

    const expiresIn =
      typeof data.expires_in === "number" && Number.isFinite(data.expires_in) && data.expires_in > 0
        ? data.expires_in
        : 21600;
    const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

    log?.info?.("TOKEN_REFRESH", `Grok Build: token refreshed, expires ${expiresAt}`);

    return {
      accessToken,
      refreshToken: nonEmptyString(data.refresh_token) || credentials.refreshToken,
      expiresAt,
    };
  } catch (error) {
    log?.warn?.(
      "TOKEN_REFRESH",
      `Grok Build: refresh error: ${error instanceof Error ? error.message : String(error)}`
    );
    return attempt === GROK_BUILD_REFRESH_MAX_ATTEMPTS ? null : undefined;
  }
}

export class GrokCliExecutor extends BaseExecutor {
  constructor() {
    super("grok-cli", PROVIDERS["grok-cli"]);
  }

  buildUrl(
    _model: string,
    _stream: boolean,
    _urlIndex = 0,
    _credentials: ProviderCredentials | null = null
  ) {
    return GROK_BUILD_RESPONSES_URL;
  }

  async refreshCredentials(
    credentials: ProviderCredentials,
    log?: ExecutorLog | null
  ): Promise<Partial<ProviderCredentials> | null> {
    if (!credentials?.refreshToken) {
      log?.warn?.("TOKEN_REFRESH", "Grok Build: no refresh token available");
      return null;
    }

    const clientId = resolvePublicCred("grok_id", "GROK_OAUTH_CLIENT_ID");

    const body = new URLSearchParams({
      grant_type: "refresh_token",
      client_id: clientId,
      refresh_token: credentials.refreshToken,
    });

    const providerData = credentials.providerSpecificData || {};
    const principalType = nonEmptyString(providerData.principalType);
    const principalId = nonEmptyString(providerData.principalId);
    if (principalType) body.set("principal_type", principalType);
    if (principalId) body.set("principal_id", principalId);

    for (let attempt = 1; attempt <= GROK_BUILD_REFRESH_MAX_ATTEMPTS; attempt++) {
      if (attempt > 1) {
        const delayMs = getRefreshRetryDelayMs(attempt - 1);
        log?.debug?.(
          "TOKEN_REFRESH",
          `Grok Build: retrying token refresh (${attempt}/${GROK_BUILD_REFRESH_MAX_ATTEMPTS})`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      const refreshed = await refreshGrokBuildCredentialsOnce(body, credentials, attempt, log);
      if (refreshed !== undefined) return refreshed;
    }

    return null;
  }

  buildHeaders(
    credentials: ProviderCredentials,
    stream = true,
    clientHeaders?: Record<string, string> | null,
    model?: string
  ) {
    const headers = super.buildHeaders(credentials, stream, clientHeaders, model);
    const providerData = credentials.providerSpecificData || {};
    const principalType = nonEmptyString(providerData.principalType);
    const sessionHeaders = getGrokBuildSessionHeaders({
      model,
      stream,
      userId: nonEmptyString(providerData.userId),
      email: nonEmptyString(credentials.email) || nonEmptyString(providerData.email),
      principalType,
    });

    // Preserve the standard GROK_CLI_USER_AGENT override produced by BaseExecutor.
    if (headers["User-Agent"] || headers["user-agent"]) {
      delete sessionHeaders["User-Agent"];
    }

    return { ...headers, ...sessionHeaders };
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    _credentials: ProviderCredentials
  ) {
    const base = super.transformRequest(model, body, stream, _credentials);
    const transformed = asRequestRecord(base);
    if (!transformed.model) {
      transformed.model = model || "grok-composer-2.5-fast";
    }
    transformed.stream = !!stream;

    // Grok Build applies these Responses defaults before every request.
    if (transformed.store === undefined) transformed.store = false;
    transformed.include = ensureReasoningInclude(transformed.include);

    // OpenAI-compatible clients may carry fields the Grok Responses endpoint rejects.
    stripUnsupportedGrokBuildParams(transformed);

    const reasoning = normalizeGrokBuildReasoning(transformed.reasoning, model);
    if (reasoning) {
      transformed.reasoning = reasoning;
    } else {
      delete transformed.reasoning;
    }

    // xAI's cli-chat-proxy rejects requests containing more than 200 tools.
    if (Array.isArray(transformed.tools) && transformed.tools.length > GROK_BUILD_MAX_TOOLS) {
      transformed.tools = transformed.tools.slice(0, GROK_BUILD_MAX_TOOLS);
    }

    return transformed;
  }
}
