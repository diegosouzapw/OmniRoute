/**
 * GrokCliExecutor — Grok Build Provider
 *
 * Routes requests through Grok's chat proxy endpoint using OAuth authentication.
 * Uses Node.js https module directly with IPv4 forced to bypass Cloudflare blocking
 * (only for the no-proxy direct path — see resolveGrokRequestDispatch below).
 * Supports automatic token refresh via refresh_token.
 */

import {
  BaseExecutor,
  type ExecuteInput,
  type ExecutorLog,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import { resolvePublicCred } from "../utils/publicCreds.ts";
import { resolveProxyForRequest } from "../utils/proxyFetch.ts";
import { runWithOnPersist, isUnrecoverableRefreshError } from "../services/tokenRefresh.ts";
import https from "node:https";
import { HttpsProxyAgent } from "https-proxy-agent";

const GROK_TOKEN_URL = "https://auth.x.ai/oauth2/token";
const REQUEST_TIMEOUT_MS = 60_000;
// xAI cli-chat-proxy hard limit on tools per request.
const MAX_TOOLS = 200;

type ProxyResolution = { source: string; proxyUrl: string | null };
type GrokRequestDispatch = { agent?: https.Agent; family?: 4 };

/**
 * Resolve how a Grok Build request to `targetUrl` should egress: through the
 * operator's configured proxy (connection/provider/global — whatever the caller
 * already pinned via `runWithProxyContext` upstream in chatHelpers.ts) when one
 * is set, or direct with the existing forced-IPv4 workaround when none is.
 *
 * This executor talks to Grok via raw `https.request()` instead of the global
 * patched `fetch()` (every other executor's path), so it never consulted the
 * proxy context at all — a configured proxy was silently ignored and the
 * request always egressed on the host's real IP. Only HTTP/HTTPS (CONNECT)
 * proxies are supported here; an explicitly configured proxy of another kind
 * (e.g. SOCKS5) fails closed rather than silently falling back to direct,
 * matching the "fail closed for OAuth usage account proxies" convention (#3051).
 *
 * `resolveProxy` is injectable for tests; defaults to the shared
 * `resolveProxyForRequest` used by the patched global fetch.
 */
export function resolveGrokRequestDispatch(
  targetUrl: string,
  resolveProxy: (url: string) => ProxyResolution = resolveProxyForRequest
): GrokRequestDispatch {
  const { proxyUrl } = resolveProxy(targetUrl);

  if (!proxyUrl) {
    return { family: 4 };
  }

  let protocol: string;
  try {
    protocol = new URL(proxyUrl).protocol;
  } catch {
    throw new Error("Grok Build: configured proxy URL could not be parsed");
  }

  if (protocol === "http:" || protocol === "https:") {
    return { agent: new HttpsProxyAgent(proxyUrl) as unknown as https.Agent };
  }

  throw new Error(
    "Grok Build: configured proxy protocol is not supported for this provider (HTTP/HTTPS proxies only)"
  );
}

export class GrokCliExecutor extends BaseExecutor {
  constructor() {
    super("grok-cli", PROVIDERS["grok-cli"]);
  }

  async execute(input: ExecuteInput) {
    const { model, body, stream, credentials, signal, log, onCredentialsRefreshed } = input;

    // #7610: unlike BaseExecutor.execute() (which most executors inherit or
    // delegate to via super.execute()), this executor talks upstream via raw
    // https.request() (nativePost) instead of the shared fetch path, so it
    // never picked up the base class's proactive refresh gate. Without it,
    // xAI's rotating refresh_token idled until real expiry — the only refresh
    // that fired was the reactive one on a 401/403 from upstream — matching
    // the "unusable within minutes" report. Apply the same gate here.
    const activeCredentials = await this.applyProactiveRefresh(
      credentials,
      log,
      onCredentialsRefreshed
    );

    const url = this.buildUrl(model, stream, 0, activeCredentials);
    const headers = this.buildHeaders(activeCredentials, stream);
    const transformedBody = this.transformRequest(model, body, stream, activeCredentials);
    const bodyStr = JSON.stringify(transformedBody);

    const response = await this.nativePost(url, headers, bodyStr, signal);
    return { response, url, headers, transformedBody };
  }

  /**
   * Proactive-refresh gate mirroring BaseExecutor.execute()'s (base.ts:599-685),
   * scoped to grok-cli's single-URL nativePost dispatch (no fallback-URL retry
   * loop to thread through). xAI uses rotating refresh tokens (same family as
   * Codex/Claude) — `runWithOnPersist` keeps the [refresh + persist] atomic
   * under the same per-connection mutex `getAccessToken` uses, and
   * `isUnrecoverableRefreshError` keeps a reused/invalid sentinel from being
   * spread into the outgoing credentials — see base.ts:622-673 for the full
   * regression history this mirrors.
   */
  private async applyProactiveRefresh(
    credentials: ProviderCredentials,
    log?: ExecutorLog | null,
    onCredentialsRefreshed?: ExecuteInput["onCredentialsRefreshed"]
  ): Promise<ProviderCredentials> {
    if (!this.needsRefresh(credentials)) return credentials;

    try {
      let persistRan = false;
      const onPersist = onCredentialsRefreshed
        ? async (refreshResult: Record<string, unknown>) => {
            persistRan = true;
            await onCredentialsRefreshed(refreshResult as Partial<ProviderCredentials>);
          }
        : null;

      const refreshed = await runWithOnPersist(onPersist, () =>
        this.refreshCredentials(credentials, log || null)
      );

      if (!refreshed || isUnrecoverableRefreshError(refreshed)) {
        return credentials;
      }

      const merged = { ...credentials, ...refreshed };
      if (onCredentialsRefreshed && !persistRan) {
        await onCredentialsRefreshed(refreshed);
      }
      return merged;
    } catch (error) {
      log?.error?.(
        "TOKEN",
        `Credential refresh failed for ${this.provider}: ${error instanceof Error ? error.message : String(error)}`
      );
      return credentials;
    }
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

    try {
      const body = new URLSearchParams({
        grant_type: "refresh_token",
        client_id: clientId,
        refresh_token: credentials.refreshToken,
      });

      const result = await this.nativeHttpsPost(
        GROK_TOKEN_URL,
        {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body.toString(),
        10_000
      );

      if (result.status !== 200) {
        log?.warn?.("TOKEN_REFRESH", `Grok Build: refresh failed with status ${result.status}`);
        return null;
      }

      const data = JSON.parse(result.body);
      if (!data.access_token) {
        log?.warn?.("TOKEN_REFRESH", "Grok Build: no access_token in refresh response");
        return null;
      }

      const expiresIn = data.expires_in || 21600;
      const expiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

      log?.info?.("TOKEN_REFRESH", `Grok Build: token refreshed, expires ${expiresAt}`);

      return {
        accessToken: data.access_token,
        refreshToken: data.refresh_token || credentials.refreshToken,
        expiresAt,
      };
    } catch (error) {
      log?.warn?.(
        "TOKEN_REFRESH",
        `Grok Build: refresh error: ${error instanceof Error ? error.message : String(error)}`
      );
      return null;
    }
  }

  private nativeHttpsPost(
    url: string,
    headers: Record<string, string>,
    bodyStr: string,
    timeoutMs = 10_000
  ): Promise<{ status: number; body: string }> {
    const urlObj = new URL(url);
    const dispatch = resolveGrokRequestDispatch(url);

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => req.destroy(new Error("Timeout")), timeoutMs);

      const req = https.request(
        {
          hostname: urlObj.hostname,
          port: 443,
          path: urlObj.pathname + urlObj.search,
          method: "POST",
          ...(dispatch.family ? { family: dispatch.family } : {}),
          ...(dispatch.agent ? { agent: dispatch.agent } : {}),
          headers: {
            ...headers,
            "Content-Length": Buffer.byteLength(bodyStr),
          },
        },
        (res) => {
          const chunks: Buffer[] = [];
          res.on("data", (chunk: Buffer) => chunks.push(chunk));
          res.on("end", () => {
            clearTimeout(timer);
            resolve({
              status: res.statusCode ?? 500,
              body: Buffer.concat(chunks).toString("utf-8"),
            });
          });
        }
      );

      req.on("error", (err) => {
        clearTimeout(timer);
        reject(err);
      });
      req.write(bodyStr);
      req.end();
    });
  }

  private nativePost(
    url: string,
    headers: Record<string, string>,
    bodyStr: string,
    signal?: AbortSignal | null
  ): Promise<Response> {
    const urlObj = new URL(url);
    const dispatch = resolveGrokRequestDispatch(url);

    if (signal?.aborted) {
      return Promise.reject(new Error("Aborted"));
    }

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => req.destroy(new Error("Timeout")), REQUEST_TIMEOUT_MS);
      let settled = false;

      const settle = (fn: () => void) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        fn();
      };

      const req = https.request(
        {
          hostname: urlObj.hostname,
          port: 443,
          path: urlObj.pathname + urlObj.search,
          method: "POST",
          ...(dispatch.family ? { family: dispatch.family } : {}),
          ...(dispatch.agent ? { agent: dispatch.agent } : {}),
          headers: {
            ...headers,
            "Content-Length": Buffer.byteLength(bodyStr),
          },
        },
        (res) => {
          const chunks: Buffer[] = [];
          res.on("data", (chunk: Buffer) => chunks.push(chunk));
          res.on("end", () => {
            settle(() => {
              const responseBody = Buffer.concat(chunks).toString("utf-8");
              const responseHeaders: Record<string, string> = {};
              for (const [key, value] of Object.entries(res.headers)) {
                if (typeof value === "string") responseHeaders[key] = value;
                else if (Array.isArray(value)) responseHeaders[key] = value.join(", ");
              }
              resolve(
                new Response(responseBody, {
                  status: res.statusCode ?? 500,
                  headers: responseHeaders,
                })
              );
            });
          });
        }
      );

      if (signal) {
        const onAbort = () => settle(() => reject(new Error("Aborted")));
        signal.addEventListener("abort", onAbort, { once: true });
        // Clean up listener when request finishes naturally
        req.on("close", () => signal.removeEventListener("abort", onAbort));
      }

      req.on("error", (err) => settle(() => reject(err)));
      req.write(bodyStr);
      req.end();
    });
  }

  buildHeaders(credentials: ProviderCredentials, stream = true) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (credentials.accessToken) {
      headers["Authorization"] = `Bearer ${credentials.accessToken}`;
    } else if (credentials.apiKey) {
      headers["Authorization"] = `Bearer ${credentials.apiKey}`;
    }

    headers["Accept"] = stream ? "text/event-stream" : "application/json";
    headers["x-grok-client-version"] = "0.2.72";
    headers["x-grok-client-identifier"] = "grok_cli_rs";
    headers["User-Agent"] = "grok-cli/0.2.72 (Windows 10.0.26200; x64)";

    return headers;
  }

  transformRequest(
    model: string,
    body: unknown,
    stream: boolean,
    _credentials: ProviderCredentials
  ) {
    const transformed =
      body && typeof body === "object" ? { ...(body as Record<string, unknown>) } : {};
    if (!transformed.model) {
      transformed.model = model || "grok-composer-2.5-fast";
    }
    transformed.stream = !!stream;

    // Grok Build rejects unsupported parameters with 400. `reasoning_effort`/`reasoning`
    // are sent by clients like Claude Code (routing the Opus slot) but are not accepted
    // by Grok Build's upstream chat-proxy endpoint — see #6288.
    const UNSUPPORTED = [
      "presencePenalty",
      "frequencyPenalty",
      "logprobs",
      "topLogprobs",
      "reasoning_effort",
      "reasoning",
    ];
    for (const param of UNSUPPORTED) {
      if (param in transformed) {
        delete transformed[param];
      }
    }

    // xAI's cli-chat-proxy enforces a maximum of 200 tools per request and
    // 400s above that ceiling. Clients that fan a large MCP toolset through
    // Grok Build/Composer (e.g. Claude Code with many registered tools) can
    // exceed it — cap defensively rather than let the request fail upstream.
    if (Array.isArray(transformed.tools) && transformed.tools.length > MAX_TOOLS) {
      transformed.tools = transformed.tools.slice(0, MAX_TOOLS);
    }

    return transformed;
  }
}
