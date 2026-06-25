/**
 * GrokCliExecutor — Grok Build Provider
 *
 * Routes requests through Grok's chat proxy endpoint using OAuth authentication.
 * Uses Node.js https module directly with IPv4 forced to bypass Cloudflare blocking.
 * Supports automatic token refresh via refresh_token.
 */

import {
  BaseExecutor,
  type ExecuteInput,
  type ExecutorLog,
  type ProviderCredentials,
} from "./base.ts";
import { PROVIDERS } from "../config/constants.ts";
import https from "node:https";

const GROK_TOKEN_URL = "https://auth.x.ai/oauth2/token";
const REQUEST_TIMEOUT_MS = 60_000;

export class GrokCliExecutor extends BaseExecutor {
  constructor() {
    super("grok-cli", PROVIDERS["grok-cli"]);
  }

  async execute(input: ExecuteInput) {
    const { model, body, stream, credentials, signal } = input;

    const url = this.buildUrl(model, stream, 0, credentials);
    const headers = this.buildHeaders(credentials, stream);
    const transformedBody = this.transformRequest(model, body, stream, credentials);
    const bodyStr = JSON.stringify(transformedBody);

    const response = await this.nativePost(url, headers, bodyStr, signal);
    return { response, url, headers, transformedBody };
  }

  async refreshCredentials(
    credentials: ProviderCredentials,
    log?: ExecutorLog | null
  ): Promise<Partial<ProviderCredentials> | null> {
    if (!credentials?.refreshToken) {
      log?.warn?.("TOKEN_REFRESH", "Grok Build: no refresh token available");
      return null;
    }

    const clientId = process.env.GROK_OAUTH_CLIENT_ID || "b1a00492-073a-47ea-816f-4c329264a828";

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

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => req.destroy(new Error("Timeout")), timeoutMs);

      const req = https.request(
        {
          hostname: urlObj.hostname,
          port: 443,
          path: urlObj.pathname + urlObj.search,
          method: "POST",
          family: 4,
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
          family: 4,
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
    headers["x-grok-client-version"] = "0.2.64";
    headers["x-grok-client-identifier"] = "grok_cli_rs";
    headers["User-Agent"] = "grok-cli/0.2.64 (Windows 10.0.26200; x64)";

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
    return transformed;
  }
}
