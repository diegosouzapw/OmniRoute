/**
 * Claude Web executor orchestration.
 *
 * Request state, browser identity, direct TLS, and SSE parsing are owned by
 * focused leaf modules. This host validates credentials and organization
 * provenance, prepares one turn, selects a transport, and commits state only
 * after the strict stream parser observes message_stop.
 */
import { normalizeSessionCookieHeader } from "@/lib/providers/webCookieAuth";

import { CLAUDE_WEB_FINGERPRINT } from "../config/claudeWebFingerprint.ts";
import { FETCH_TIMEOUT_MS } from "../config/constants.ts";
import { tlsFetchClaude } from "../services/claudeTlsClient.ts";
import { buildErrorBody, sanitizeErrorMessage } from "../utils/error.ts";
import {
  BaseExecutor,
  mergeAbortSignals,
  type ExecuteInput,
  type ExecutorLog,
  type ProviderCredentials,
} from "./base.ts";
import {
  applyClaudeWebBrowserTemplate,
  sendClaudeWebBrowser,
  type ClaudeWebTransportRequest,
  type ClaudeWebTransportResult,
} from "./claude-web/browserTransport.ts";
import type { ClaudeWebRequestPayload } from "./claude-web/payload.ts";
import {
  commitClaudeWebTurn,
  invalidateClaudeWebTurn,
  prepareClaudeWebTurn,
  type PreparedClaudeWebTurn,
} from "./claude-web/session.ts";
import { createClaudeWebResponse } from "./claude-web/stream.ts";
import { isClaudeWebChallenge, sendClaudeWebDirect } from "./claude-web/transport.ts";

const CLAUDE_WEB_API_BASE = "https://claude.ai/api";
const CLAUDE_WEB_ORGS_URL = `${CLAUDE_WEB_API_BASE}/organizations`;
const CLAUDE_SESSION_COOKIE_NAME = "sessionKey";
const MAX_ERROR_BODY_BYTES = 64 * 1024;
const CLAUDE_USER_AGENT = CLAUDE_WEB_FINGERPRINT.userAgent;

type SendClaudeWebTransport = (
  request: ClaudeWebTransportRequest
) => Promise<ClaudeWebTransportResult>;

type OrganizationResolution = {
  organizationId: string | null;
  failure: "authentication" | "challenge" | "unavailable" | null;
};

export interface ClaudeWebExecutorDeps {
  sendDirect?: SendClaudeWebTransport;
  sendBrowser?: SendClaudeWebTransport;
}

function readCredentialString(credentials: unknown, key: string): string | undefined {
  if (!credentials || typeof credentials !== "object") return undefined;
  const record = credentials as Record<string, unknown>;
  const direct = record[key];
  if (typeof direct === "string" && direct.trim()) return direct.trim();
  const providerData = record.providerSpecificData;
  if (providerData && typeof providerData === "object" && !Array.isArray(providerData)) {
    const nested = (providerData as Record<string, unknown>)[key];
    if (typeof nested === "string" && nested.trim()) return nested.trim();
  }
  return undefined;
}

function readClaudeWebCookie(credentials: unknown): string {
  const direct = readCredentialString(credentials, "cookie");
  if (direct) return direct;
  return readCredentialString(credentials, "apiKey") ?? "";
}

function readClaudeWebDeviceId(credentials: unknown): string | undefined {
  return readCredentialString(credentials, "deviceId");
}

function readClaudeWebOrganizationId(credentials: unknown): string | undefined {
  return readCredentialString(credentials, "orgId");
}

function normalizeClaudeSessionCookie(rawValue: string): string {
  return normalizeSessionCookieHeader(rawValue, CLAUDE_SESSION_COOKIE_NAME);
}

function getBrowserHeaders(
  deviceId?: string,
  referer = "https://claude.ai/new",
  locale = "en-US"
): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: "text/event-stream",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": `${locale},en;q=0.9`,
    "Cache-Control": "no-cache",
    "Content-Type": "application/json",
    Origin: "https://claude.ai",
    Pragma: "no-cache",
    Priority: "u=1, i",
    Referer: referer,
    "Sec-Ch-Ua": CLAUDE_WEB_FINGERPRINT.secChUa,
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": CLAUDE_WEB_FINGERPRINT.secChUaPlatform,
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": CLAUDE_USER_AGENT,
    "anthropic-client-platform": "web_claude_ai",
  };
  if (deviceId) headers["anthropic-device-id"] = deviceId;
  return headers;
}

function combineWithTimeout(signal?: AbortSignal | null): AbortSignal {
  const timeoutSignal = AbortSignal.timeout(FETCH_TIMEOUT_MS);
  return signal ? mergeAbortSignals(signal, timeoutSignal) : timeoutSignal;
}

async function verifyCookieValidity(
  cookieHeader: string,
  deviceId: string | undefined,
  signal?: AbortSignal
): Promise<boolean> {
  try {
    const response = await tlsFetchClaude(CLAUDE_WEB_ORGS_URL, {
      method: "GET",
      headers: { ...getBrowserHeaders(deviceId), Cookie: cookieHeader },
      timeoutMs: FETCH_TIMEOUT_MS,
      signal: combineWithTimeout(signal),
    });
    return response.status === 200;
  } catch {
    return false;
  }
}

async function getOrganizationId(
  cookieHeader: string,
  deviceId: string | undefined,
  signal?: AbortSignal | null
): Promise<OrganizationResolution> {
  try {
    const response = await tlsFetchClaude(CLAUDE_WEB_ORGS_URL, {
      method: "GET",
      headers: { ...getBrowserHeaders(deviceId), Cookie: cookieHeader },
      timeoutMs: FETCH_TIMEOUT_MS,
      signal: combineWithTimeout(signal),
    });
    if (response.status === 401) {
      return { organizationId: null, failure: "authentication" };
    }
    if (response.status === 403) {
      const bodyText = response.text ?? "";
      if (
        isClaudeWebChallenge({
          status: response.status,
          headers: response.headers,
          body: null,
          bodyText,
        })
      ) {
        return { organizationId: null, failure: "challenge" };
      }
      return { organizationId: null, failure: "authentication" };
    }
    if (response.status !== 200) {
      return { organizationId: null, failure: "unavailable" };
    }
    const parsed = JSON.parse(response.text ?? "[]") as unknown;
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return { organizationId: null, failure: "unavailable" };
    }
    const organization = parsed[0];
    if (!organization || typeof organization !== "object" || Array.isArray(organization)) {
      return { organizationId: null, failure: "unavailable" };
    }
    const record = organization as Record<string, unknown>;
    const identifier = record.uuid ?? record.id;
    return typeof identifier === "string" && identifier.trim()
      ? { organizationId: identifier.trim(), failure: null }
      : { organizationId: null, failure: "unavailable" };
  } catch {
    return { organizationId: null, failure: "unavailable" };
  }
}

function isEnabledFlag(value: string | undefined): boolean {
  return value === "1" || value === "true" || value === "on";
}

function forceBrowserTransport(): boolean {
  return isEnabledFlag(process.env.WEB_COOKIE_USE_BROWSER);
}

function browserFallbackEnabled(): boolean {
  return forceBrowserTransport() || isEnabledFlag(process.env.OMNIROUTE_BROWSER_POOL);
}

function makeCompletionUrl(turn: PreparedClaudeWebTurn, organizationId: string): string {
  return (
    `${CLAUDE_WEB_API_BASE}/organizations/${encodeURIComponent(organizationId)}` +
    `/chat_conversations/${encodeURIComponent(turn.conversationId)}/${turn.endpointSuffix}`
  );
}

function makeErrorResponse(
  status: number,
  message: string,
  options?: {
    details?: unknown;
    type?: string;
    code?: string;
  }
): Response {
  const body = buildErrorBody(status, message, options?.details);
  if (options?.type) body.error.type = options.type;
  if (options?.code) body.error.code = options.code;
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function makeExecutionResult(
  response: Response,
  transformedBody: Record<string, unknown> | ClaudeWebRequestPayload,
  url = "",
  headers: Record<string, string> = {}
) {
  return { response, url, headers, transformedBody };
}

function makeAuditUrl(turn: PreparedClaudeWebTurn): string {
  return (
    `${CLAUDE_WEB_API_BASE}/organizations/<organization>/chat_conversations/` +
    `<conversation>/${turn.endpointSuffix}`
  );
}

function makeAuditHeaders(): Record<string, string> {
  return {
    Accept: "text/event-stream",
    "Content-Type": "application/json",
    "anthropic-client-platform": "web_claude_ai",
  };
}

function makeAuditBody(
  model: string,
  stream: boolean,
  operation?: PreparedClaudeWebTurn["operation"]
): Record<string, unknown> {
  return {
    model,
    stream,
    claude_web: {
      provider: "claude-web",
      ...(operation ? { operation } : {}),
    },
  };
}

async function readTransportErrorText(result: ClaudeWebTransportResult): Promise<string> {
  if (result.bodyText !== undefined) return result.bodyText;
  if (!result.body) return "";
  const reader = result.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let output = "";
  try {
    while (total < MAX_ERROR_BODY_BYTES) {
      const { value, done } = await reader.read();
      if (done || !value) break;
      const remaining = MAX_ERROR_BODY_BYTES - total;
      const chunk = value.byteLength > remaining ? value.slice(0, remaining) : value;
      total += chunk.byteLength;
      output += decoder.decode(chunk, { stream: total < MAX_ERROR_BODY_BYTES });
      if (chunk.byteLength < value.byteLength) break;
    }
    output += decoder.decode();
    return output;
  } finally {
    await reader.cancel().catch(() => {});
    try {
      reader.releaseLock();
    } catch {
      // The reader may already be released by cancel().
    }
  }
}

async function errorResponseForTransport(
  result: ClaudeWebTransportResult,
  turn: PreparedClaudeWebTurn
): Promise<Response> {
  const bodyText = await readTransportErrorText(result);
  if (result.status === 401) {
    invalidateClaudeWebTurn(turn, "conversation");
    return makeErrorResponse(401, "Session expired or invalid");
  }
  if (result.status === 429) {
    return makeErrorResponse(429, "Rate limited by Claude Web API");
  }
  if (isClaudeWebChallenge({ ...result, bodyText })) {
    return makeErrorResponse(403, "Claude Web returned a Cloudflare browser challenge", {
      type: "cloudflare_challenge",
      code: "cf_mitigated_challenge",
    });
  }
  return makeErrorResponse(
    result.status >= 400 && result.status <= 599 ? result.status : 502,
    `Claude Web API error (${result.status || 502})`
  );
}

export class ClaudeWebExecutor extends BaseExecutor {
  private readonly sendDirect: SendClaudeWebTransport;
  private readonly sendBrowser: SendClaudeWebTransport;

  constructor(deps: ClaudeWebExecutorDeps = {}) {
    super("claude-web", { baseUrl: CLAUDE_WEB_API_BASE });
    this.sendDirect = deps.sendDirect ?? sendClaudeWebDirect;
    this.sendBrowser = deps.sendBrowser ?? sendClaudeWebBrowser;
  }

  async testConnection(
    credentials: Record<string, unknown>,
    signal?: AbortSignal
  ): Promise<boolean> {
    try {
      const rawCookie = readClaudeWebCookie(credentials);
      if (!rawCookie.trim()) return false;
      const cookieHeader = normalizeClaudeSessionCookie(rawCookie);
      return verifyCookieValidity(cookieHeader, readClaudeWebDeviceId(credentials), signal);
    } catch {
      return false;
    }
  }

  async execute({ model, body, stream, credentials, signal, log }: ExecuteInput) {
    const initialAuditBody = makeAuditBody(model, stream);
    const bodyObj =
      body && typeof body === "object" && !Array.isArray(body)
        ? (body as Record<string, unknown>)
        : null;
    if (!bodyObj) {
      return makeExecutionResult(makeErrorResponse(400, "Invalid request body"), {});
    }
    if (!credentials || typeof credentials !== "object") {
      return makeExecutionResult(makeErrorResponse(400, "Invalid credentials"), initialAuditBody);
    }

    const rawCookie = readClaudeWebCookie(credentials);
    if (!rawCookie.trim()) {
      return makeExecutionResult(
        makeErrorResponse(401, "Missing session cookie"),
        initialAuditBody
      );
    }

    let cookieHeader: string;
    try {
      cookieHeader = normalizeClaudeSessionCookie(rawCookie);
    } catch (error) {
      return makeExecutionResult(
        makeErrorResponse(401, sanitizeErrorMessage(error)),
        initialAuditBody
      );
    }

    const deviceId = readClaudeWebDeviceId(credentials);
    let organizationId = readClaudeWebOrganizationId(credentials);
    if (!organizationId) {
      const resolution = await getOrganizationId(cookieHeader, deviceId, signal);
      organizationId = resolution.organizationId ?? undefined;
      if (resolution.failure === "authentication") {
        log?.warn?.("CLAUDE-WEB", "Organization discovery rejected the authenticated session");
        return makeExecutionResult(
          makeErrorResponse(401, "Session expired or invalid"),
          initialAuditBody,
          CLAUDE_WEB_ORGS_URL,
          makeAuditHeaders()
        );
      }
      if (resolution.failure === "challenge") {
        log?.warn?.("CLAUDE-WEB", "Organization discovery encountered a browser challenge");
        return makeExecutionResult(
          makeErrorResponse(403, "Claude Web returned a Cloudflare browser challenge", {
            type: "cloudflare_challenge",
            code: "cf_mitigated_challenge",
          }),
          initialAuditBody,
          CLAUDE_WEB_ORGS_URL,
          makeAuditHeaders()
        );
      }
    }
    if (!organizationId) {
      log?.warn?.("CLAUDE-WEB", "Authenticated organization could not be resolved");
      return makeExecutionResult(
        makeErrorResponse(502, "Unable to determine the authenticated Claude Web organization"),
        initialAuditBody,
        CLAUDE_WEB_ORGS_URL,
        makeAuditHeaders()
      );
    }

    let turn: PreparedClaudeWebTurn;
    try {
      turn = prepareClaudeWebTurn({
        body: bodyObj,
        model,
        credentials: credentials as ProviderCredentials,
        organizationId,
        normalizedCookie: cookieHeader,
      });
    } catch (error) {
      return makeExecutionResult(
        makeErrorResponse(400, sanitizeErrorMessage(error)),
        initialAuditBody
      );
    }

    const url = makeCompletionUrl(turn, organizationId);
    const headers = getBrowserHeaders(deviceId, turn.pageUrl, turn.payload.locale);
    const transportRequest: ClaudeWebTransportRequest = {
      scopeKey: turn.accountScope,
      organizationId,
      conversationId: turn.conversationId,
      endpointSuffix: turn.endpointSuffix,
      pageUrl: turn.pageUrl,
      url,
      cookieString: cookieHeader,
      headers,
      payload: turn.payload,
      locale: turn.payload.locale,
      timezone: turn.payload.timezone,
      signal,
    };
    const auditBody = makeAuditBody(model, stream, turn.operation);
    const auditUrl = makeAuditUrl(turn);
    const auditHeaders = makeAuditHeaders();

    try {
      let transportResult: ClaudeWebTransportResult;
      if (forceBrowserTransport()) {
        transportResult = await this.sendBrowser(transportRequest);
      } else {
        const directRequest = applyClaudeWebBrowserTemplate(transportRequest);
        transportResult = await this.sendDirect(directRequest);
        if (isClaudeWebChallenge(transportResult) && browserFallbackEnabled()) {
          transportResult = await this.sendBrowser(directRequest);
        }
      }

      if (transportResult.status < 200 || transportResult.status >= 300) {
        return makeExecutionResult(
          await errorResponseForTransport(transportResult, turn),
          auditBody,
          auditUrl,
          auditHeaders
        );
      }
      if (!transportResult.body) {
        invalidateClaudeWebTurn(turn);
        return makeExecutionResult(
          makeErrorResponse(502, "Claude Web returned no response body"),
          auditBody,
          auditUrl,
          auditHeaders
        );
      }

      const response = await createClaudeWebResponse(transportResult.body, {
        model,
        stream,
        responseMetadata: turn.responseMetadata,
        onComplete: ({ assistantText }) => commitClaudeWebTurn(turn, assistantText),
        onFailure: () => invalidateClaudeWebTurn(turn),
        log,
      });
      return makeExecutionResult(response, auditBody, auditUrl, auditHeaders);
    } catch {
      invalidateClaudeWebTurn(turn);
      log?.error?.("CLAUDE-WEB", "Transport failed");
      return makeExecutionResult(
        makeErrorResponse(502, "Claude Web connection failed"),
        auditBody,
        auditUrl,
        auditHeaders
      );
    }
  }
}
