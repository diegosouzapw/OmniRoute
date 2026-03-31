import crypto from "crypto";
import { BaseExecutor, mergeUpstreamExtraHeaders } from "./base.ts";
import { PROVIDERS, OAUTH_ENDPOINTS, HTTP_STATUS } from "../config/constants.ts";

const MAX_RETRY_AFTER_MS = 60_000;
const LONG_RETRY_THRESHOLD_MS = 60_000;

/**
 * Strip provider prefixes (e.g. "antigravity/model" → "model").
 * Ensures the model name sent to the upstream API never contains a routing prefix.
 */
function cleanModelName(model: string): string {
  if (!model) return model;
  return model.includes("/") ? model.split("/").pop()! : model;
}

export class AntigravityExecutor extends BaseExecutor {
  constructor() {
    super("antigravity", PROVIDERS.antigravity);
  }

  buildUrl(model, stream, urlIndex = 0) {
    const baseUrls = this.getBaseUrls();
    const baseUrl = baseUrls[urlIndex] || baseUrls[0];
    const action = stream ? "streamGenerateContent?alt=sse" : "generateContent";
    return `${baseUrl}/v1internal:${action}`;
  }

  buildHeaders(credentials, stream = true) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials.accessToken}`,
      "User-Agent": this.config.headers?.["User-Agent"] || "antigravity/1.104.0 darwin/arm64",
      "X-OmniRoute-Source": "omniroute",
      ...(stream && { Accept: "text/event-stream" }),
    };
  }

  transformRequest(model, body, stream, credentials) {
    const bodyProjectId = body?.project;
    const credentialsProjectId = credentials?.projectId;
    const allowBodyProjectOverride = process.env.OMNIROUTE_ALLOW_BODY_PROJECT_OVERRIDE === "1";

    // Default: prefer OAuth-stored projectId over incoming body.project to avoid
    // stale/wrong client-side values causing 404/403 from Cloud Code endpoints.
    // Opt-in escape hatch: set OMNIROUTE_ALLOW_BODY_PROJECT_OVERRIDE=1.
    const projectId =
      allowBodyProjectOverride && bodyProjectId
        ? bodyProjectId
        : credentialsProjectId || bodyProjectId;

    if (!projectId) {
      // (#489) Return a structured error instead of throwing — gives the client a clear signal
      // to show a "Reconnect OAuth" prompt rather than an opaque "Internal Server Error".
      const errorMsg =
        "Missing Google projectId for Antigravity account. Please reconnect OAuth in Providers → Antigravity so OmniRoute can fetch your Cloud Code project.";
      const errorBody = {
        error: {
          message: errorMsg,
          type: "oauth_missing_project_id",
          code: "missing_project_id",
        },
      };
      const resp = new Response(JSON.stringify(errorBody), {
        status: 422,
        headers: { "Content-Type": "application/json" },
      });
      // Returning a Response object signals the executor to stop and forward it
      return resp as unknown as never;
    }

    // Fix contents for Claude models via Antigravity
    const normalizedContents =
      body.request?.contents?.map((c) => {
        let role = c.role;
        // functionResponse must be role "user" for Claude models
        if (c.parts?.some((p) => p.functionResponse)) {
          role = "user";
        }

        // Strip thought parts (no valid signature -> provider rejects).
        // Also drop entries that become empty after filtering, which can trigger
        // 400 invalid argument on Gemini 3 Flash through Antigravity.
        const parts = c.parts?.filter((p) => !p.thought && !p.thoughtSignature) || [];
        return { ...c, role, parts };
      }) || [];

    const contents = normalizedContents.filter((c) =>
      Array.isArray(c.parts) ? c.parts.length > 0 : true
    );

    const transformedRequest = {
      ...body.request,
      ...(contents.length > 0 && { contents }),
      sessionId: body.request?.sessionId || this.generateSessionId(),
      safetySettings: undefined,
      toolConfig:
        body.request?.tools?.length > 0
          ? { functionCallingConfig: { mode: "VALIDATED" } }
          : body.request?.toolConfig,
    };

    const upstreamModel = cleanModelName(model);

    return {
      ...body,
      project: projectId,
      model: upstreamModel,
      userAgent: "antigravity",
      requestType: "agent",
      requestId: `agent-${crypto.randomUUID()}`,
      request: transformedRequest,
    };
  }

  async refreshCredentials(credentials, log) {
    if (!credentials.refreshToken) return null;

    try {
      const response = await fetch(OAUTH_ENDPOINTS.google.token, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: credentials.refreshToken,
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
        }),
      });

      if (!response.ok) return null;

      const tokens = await response.json();
      log?.info?.("TOKEN", "Antigravity refreshed");

      return {
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token || credentials.refreshToken,
        expiresIn: tokens.expires_in,
        projectId: credentials.projectId,
      };
    } catch (error) {
      log?.error?.("TOKEN", `Antigravity refresh error: ${error.message}`);
      return null;
    }
  }

  generateSessionId() {
    return `-${Math.floor(Math.random() * 9_000_000_000_000_000_000)}`;
  }

  parseRetryHeaders(headers) {
    if (!headers?.get) return null;

    const retryAfter = headers.get("retry-after");
    if (retryAfter) {
      const seconds = parseInt(retryAfter, 10);
      if (!isNaN(seconds) && seconds > 0) return seconds * 1000;

      const date = new Date(retryAfter);
      if (!isNaN(date.getTime())) {
        const diff = date.getTime() - Date.now();
        return diff > 0 ? diff : null;
      }
    }

    const resetAfter = headers.get("x-ratelimit-reset-after");
    if (resetAfter) {
      const seconds = parseInt(resetAfter, 10);
      if (!isNaN(seconds) && seconds > 0) return seconds * 1000;
    }

    const resetTimestamp = headers.get("x-ratelimit-reset");
    if (resetTimestamp) {
      const ts = parseInt(resetTimestamp, 10) * 1000;
      const diff = ts - Date.now();
      return diff > 0 ? diff : null;
    }

    return null;
  }

  // Parse retry time from Antigravity error message body
  // Format: "Your quota will reset after 2h7m23s" or "1h30m" or "45m" or "30s"
  parseRetryFromErrorMessage(errorMessage) {
    if (!errorMessage || typeof errorMessage !== "string") return null;

    const match = errorMessage.match(/reset (?:after|in) (\d+h)?(\d+m)?(\d+s)?/i);
    if (!match) return null;

    let totalMs = 0;
    if (match[1]) totalMs += parseInt(match[1]) * 3600 * 1000; // hours
    if (match[2]) totalMs += parseInt(match[2]) * 60 * 1000; // minutes
    if (match[3]) totalMs += parseInt(match[3]) * 1000; // seconds

    return totalMs > 0 ? totalMs : null;
  }

  async execute({ model, body, stream, credentials, signal, log, upstreamExtraHeaders }) {
    const fallbackCount = this.getFallbackCount();
    let lastError = null;
    let lastStatus = 0;
    const MAX_AUTO_RETRIES = 3;
    const retryAttemptsByUrl = {}; // Track retry attempts per URL

    for (let urlIndex = 0; urlIndex < fallbackCount; urlIndex++) {
      const url = this.buildUrl(model, stream, urlIndex);
      const headers = this.buildHeaders(credentials, stream);
      mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);
      const transformedBody = this.transformRequest(model, body, stream, credentials);

      // Initialize retry counter for this URL
      if (!retryAttemptsByUrl[urlIndex]) {
        retryAttemptsByUrl[urlIndex] = 0;
      }

      try {
        const response = await fetch(url, {
          method: "POST",
          headers,
          body: JSON.stringify(transformedBody),
          signal,
        });

        // Parse retry time for 429/503 responses
        let retryMs = null;

        if (
          response.status === HTTP_STATUS.RATE_LIMITED ||
          response.status === HTTP_STATUS.SERVICE_UNAVAILABLE
        ) {
          // Try to get retry time from headers first
          retryMs = this.parseRetryHeaders(response.headers);

          // If no retry time in headers, try to parse from error message body
          if (!retryMs) {
            try {
              const errorBody = await response.clone().text();
              const errorJson = JSON.parse(errorBody);
              const errorMessage = errorJson?.error?.message || errorJson?.message || "";
              retryMs = this.parseRetryFromErrorMessage(errorMessage);

              if (!retryMs) {
                // Dynamic quota interpretation logic for Free vs Pro accounts
                const lowerMsg = errorMessage.toLowerCase();

                if (
                  lowerMsg.includes("free tier") ||
                  lowerMsg.includes("exhausted your capacity") ||
                  lowerMsg.includes("daily limit") ||
                  lowerMsg.includes("quota exceeded")
                ) {
                  // Hard limit hit for Free accounts (or exhausting general capacity), fallback immediately.
                  // Setting a massive retryMs forces an instant fallback.
                  retryMs = 24 * 60 * 60 * 1000; // 24 hours
                } else if (
                  lowerMsg.includes("pro") ||
                  lowerMsg.includes("per minute") ||
                  lowerMsg.includes("rpm")
                ) {
                  // RPM limit for Pro counts, backoff up to 1 minute, then fallback
                  retryMs = 60 * 1000; // 60s
                }
              }
            } catch (e) {
              // Ignore parse errors, will fall back to exponential backoff
            }
          }

          if (retryMs && retryMs <= LONG_RETRY_THRESHOLD_MS) {
            const effectiveRetryMs = Math.min(retryMs, MAX_RETRY_AFTER_MS);
            log?.debug?.(
              "RETRY",
              `${response.status} with Retry-After: ${Math.ceil(effectiveRetryMs / 1000)}s, waiting...`
            );
            await new Promise((resolve) => setTimeout(resolve, effectiveRetryMs));
            urlIndex--;
            continue;
          }

          // Auto retry only for 429 when retryMs is 0 or undefined
          if (
            response.status === HTTP_STATUS.RATE_LIMITED &&
            (!retryMs || retryMs === 0) &&
            retryAttemptsByUrl[urlIndex] < MAX_AUTO_RETRIES
          ) {
            retryAttemptsByUrl[urlIndex]++;
            // Exponential backoff: 2s, 4s, 8s...
            const backoffMs = Math.min(
              1000 * 2 ** retryAttemptsByUrl[urlIndex],
              MAX_RETRY_AFTER_MS
            );
            log?.debug?.(
              "RETRY",
              `429 auto retry ${retryAttemptsByUrl[urlIndex]}/${MAX_AUTO_RETRIES} after ${backoffMs / 1000}s`
            );
            await new Promise((resolve) => setTimeout(resolve, backoffMs));
            urlIndex--;
            continue;
          }

          log?.debug?.(
            "RETRY",
            `${response.status}, Retry-After ${retryMs ? `too long (${Math.ceil(retryMs / 1000)}s)` : "missing"}, trying fallback`
          );
          lastStatus = response.status;

          if (urlIndex + 1 < fallbackCount) {
            continue;
          }
        }

        if (this.shouldRetry(response.status, urlIndex)) {
          log?.debug?.("RETRY", `${response.status} on ${url}, trying fallback ${urlIndex + 1}`);
          lastStatus = response.status;
          continue;
        }

        // If we have a 429 with long retry time, embed it in response body
        if (
          response.status === HTTP_STATUS.RATE_LIMITED &&
          retryMs &&
          retryMs > LONG_RETRY_THRESHOLD_MS
        ) {
          try {
            const respBody = await response.clone().text();
            let obj;
            try {
              obj = JSON.parse(respBody);
            } catch {
              obj = {};
            }
            obj.retryAfterMs = retryMs;
            const modifiedBody = JSON.stringify(obj);
            const modifiedResponse = new Response(modifiedBody, {
              status: response.status,
              headers: response.headers,
            });
            return { response: modifiedResponse, url, headers, transformedBody };
          } catch (err) {
            log?.warn?.("RETRY", `Failed to embed retryAfterMs: ${err}`);
            // Fall back to original response
          }
        }

        return { response, url, headers, transformedBody };
      } catch (error) {
        lastError = error;
        if (urlIndex + 1 < fallbackCount) {
          log?.debug?.("RETRY", `Error on ${url}, trying fallback ${urlIndex + 1}`);
          continue;
        }
        throw error;
      }
    }

    throw lastError || new Error(`All ${fallbackCount} URLs failed with status ${lastStatus}`);
  }
}

export default AntigravityExecutor;
