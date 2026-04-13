import crypto, { randomUUID } from "crypto";
import { BaseExecutor, mergeUpstreamExtraHeaders } from "./base.ts";
import { PROVIDERS, OAUTH_ENDPOINTS, HTTP_STATUS } from "../config/constants.ts";

const MAX_RETRY_AFTER_MS = 60_000;
const LONG_RETRY_THRESHOLD_MS = 60_000;
const CREDITS_EXHAUSTED_TTL_MS = 5 * 60 * 60 * 1000; // 5 hours

const BARE_PRO_IDS = new Set(["gemini-3.1-pro"]);

/**
 * Per-account GOOGLE_ONE_AI credits-exhausted tracker.
 * Key: accountId (OAuth subject / email). Value: expiry timestamp.
 * When credits hit 0 we skip the credit retry for CREDITS_EXHAUSTED_TTL_MS.
 */
const creditsExhaustedUntil = new Map<string, number>();

/**
 * Per-account GOOGLE_ONE_AI remaining credit balance cache.
 * Populated from the final SSE chunk's `remainingCredits` field after every
 * successful credit-injected request. Keyed by accountId.
 */
const creditBalanceCache = new Map<string, number>();

/** Read the last-known GOOGLE_ONE_AI credit balance for a given account. */
export function getAntigravityRemainingCredits(accountId: string): number | null {
  const balance = creditBalanceCache.get(accountId);
  return balance !== undefined ? balance : null;
}

/** Update the balance cache — called when we parse `remainingCredits` from an SSE stream. */
export function updateAntigravityRemainingCredits(accountId: string, balance: number): void {
  creditBalanceCache.set(accountId, balance);
}

function isCreditsExhausted(accountId: string): boolean {
  const until = creditsExhaustedUntil.get(accountId);
  if (!until) return false;
  if (Date.now() >= until) {
    creditsExhaustedUntil.delete(accountId);
    return false;
  }
  return true;
}

function markCreditsExhausted(accountId: string): void {
  creditsExhaustedUntil.set(accountId, Date.now() + CREDITS_EXHAUSTED_TTL_MS);
}

/**
 * Strip provider prefixes (e.g. "antigravity/model" → "model").
 * Ensures the model name sent to the upstream API never contains a routing prefix.
 */
function cleanModelName(model: string): string {
  if (!model) return model;
  let clean = model.includes("/") ? model.split("/").pop()! : model;
  // Normalize bare Pro IDs to the Low tier (matching OpenClaw convention).
  // The upstream API requires an explicit tier suffix; bare IDs cause errors.
  if (BARE_PRO_IDS.has(clean)) {
    clean = `${clean}-low`;
  }
  return clean;
}

export class AntigravityExecutor extends BaseExecutor {
  constructor() {
    super("antigravity", PROVIDERS.antigravity);
  }

  buildUrl(model, stream, urlIndex = 0) {
    const baseUrls = this.getBaseUrls();
    const baseUrl = baseUrls[urlIndex] || baseUrls[0];
    // Always use streaming endpoint — the non-streaming `generateContent` causes
    // upstream 400 errors for some models (e.g. gpt-oss-120b-medium) because the
    // Cloud Code API internally converts to OpenAI format and injects
    // stream_options without setting stream=true.  chatCore already handles
    // SSE→JSON conversion for non-streaming client requests.
    return `${baseUrl}/v1internal:streamGenerateContent?alt=sse`;
  }

  buildHeaders(credentials, stream = true) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${credentials.accessToken}`,
      "User-Agent": this.config.headers?.["User-Agent"] || "antigravity/1.104.0 darwin/arm64",
      "X-OmniRoute-Source": "omniroute",
      Accept: "text/event-stream",
    };
  }

  transformRequest(model, body, stream, credentials) {
    // TODO: Consider removing project override like gemini-cli.ts — stored projectId
    // can become stale for Cloud Code accounts, causing 403 "has not been used in project X".
    // Antigravity accounts may have more stable project IDs, but the risk exists.
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

        const hasFunctionCall = c.parts?.some((p) => p.functionCall) || false;

        // Antigravity rejects synthetic thought text, but Gemini 3+ requires any
        // returned thoughtSignature metadata to survive model tool-call turns.
        const parts =
          c.parts?.filter((p) => !p.thought && (hasFunctionCall || !p.thoughtSignature)) || [];
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
    return `-${parseInt(randomUUID().replace(/-/g, "").substring(0, 8), 16) % 9_000_000_000_000_000_000}`;
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

  /**
   * Collect an SSE streaming response into a single non-streaming JSON response.
   * Parses Gemini-format SSE chunks and assembles text content + usage into one
   * OpenAI-format chat.completion payload.
   */
  collectStreamToResponse(response, model, url, headers, transformedBody, log?, signal?) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const SSE_COLLECT_TIMEOUT_MS = 120_000;

    const collect = async () => {
      const chunks: string[] = [];
      let timedOut = false;
      const timeout = AbortSignal.timeout(SSE_COLLECT_TIMEOUT_MS);
      try {
        while (true) {
          if (signal?.aborted) throw new Error("Request aborted during SSE collection");
          const { done, value } = await Promise.race([
            reader.read(),
            new Promise<never>((_, reject) =>
              timeout.addEventListener(
                "abort",
                () => reject(new Error("SSE collection timed out")),
                { once: true }
              )
            ),
          ]);
          if (done) break;
          chunks.push(decoder.decode(value, { stream: true }));
        }
      } catch (err) {
        const msg = err?.message || String(err);
        timedOut = msg.includes("timed out");
        log?.warn?.("SSE_COLLECT", `Error collecting SSE stream: ${msg}`);
        // Fall through — return whatever was collected so far
      }
      const rawSSE = chunks.join("");

      // Parse Gemini SSE: each line is "data: {json}"
      let textContent = "";
      let finishReason = "stop";
      let usage: Record<string, unknown> | null = null;
      let remainingCredits: Array<{ creditType: string; creditAmount: string }> | null = null;
      const lines = rawSSE.split("\n");
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const parsed = JSON.parse(payload);
          const candidate = parsed?.response?.candidates?.[0];
          if (candidate?.content?.parts) {
            for (const part of candidate.content.parts) {
              if (typeof part.text === "string" && !part.thought && !part.thoughtSignature) {
                textContent += part.text;
              }
            }
          }
          if (candidate?.finishReason) {
            finishReason =
              candidate.finishReason.toLowerCase() === "stop"
                ? "stop"
                : candidate.finishReason.toLowerCase();
          }
          if (parsed?.response?.usageMetadata) {
            const um = parsed.response.usageMetadata;
            usage = {
              prompt_tokens: um.promptTokenCount || 0,
              completion_tokens: um.candidatesTokenCount || 0,
              total_tokens: um.totalTokenCount || 0,
            };
          }
          // Credit balance — arrives in the final chunk alongside consumedCredits
          if (Array.isArray(parsed?.remainingCredits)) {
            remainingCredits = parsed.remainingCredits;
          }
        } catch (e) {
          log?.debug?.("SSE_PARSE", `Skipping malformed SSE line: ${payload.slice(0, 80)}`);
        }
      }

      const result = {
        id: `chatcmpl-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`,
        object: "chat.completion",
        created: Math.floor(Date.now() / 1000),
        model,
        choices: [
          {
            index: 0,
            message: { role: "assistant", content: textContent },
            finish_reason: timedOut ? "length" : finishReason,
          },
        ],
        ...(usage && { usage }),
        // Expose credit balance for upstream consumers (usage service, dashboard)
        ...(remainingCredits && { _remainingCredits: remainingCredits }),
      };

      const syntheticStatus = timedOut ? 504 : response.status;
      const syntheticResponse = new Response(JSON.stringify(result), {
        status: syntheticStatus,
        statusText: timedOut ? "Gateway Timeout" : response.statusText,
        headers: [["Content-Type", "application/json"]],
      });

      return { response: syntheticResponse, url, headers, transformedBody };
    };

    return collect();
  }

  async execute({ model, body, stream, credentials, signal, log, upstreamExtraHeaders }) {
    const fallbackCount = this.getFallbackCount();
    let lastError = null;
    let lastStatus = 0;
    const MAX_AUTO_RETRIES = 3;
    const retryAttemptsByUrl = {}; // Track retry attempts per URL

    // Always stream upstream — buildUrl always returns the streaming endpoint.
    // For non-streaming clients, we collect the SSE below and return a synthetic
    // non-streaming Response so chatCore's non-streaming path stays unchanged.
    const upstreamStream = true;

    // Account ID for credits-exhausted tracking.
    // Key must match getAntigravityUsage() in fetcher.ts (providerSpecificData?.email || sub).
    // credentials.email and credentials.sub are populated from the same OAuth token store,
    // so the cache keys written here and read in the fetcher will always match.
    const accountId: string = credentials?.email || credentials?.sub || "unknown";

    for (let urlIndex = 0; urlIndex < fallbackCount; urlIndex++) {
      const url = this.buildUrl(model, upstreamStream, urlIndex);
      const headers = this.buildHeaders(credentials, upstreamStream);
      mergeUpstreamExtraHeaders(headers, upstreamExtraHeaders);
      const transformedBody = await this.transformRequest(model, body, upstreamStream, credentials);

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
              const lowerMsg = errorMessage.toLowerCase();

              // ── AI Credits Overages fallback ─────────────────────────────────
              // MUST run BEFORE parseRetryFromErrorMessage: the API embeds the
              // reset time in the same message ("reset after 141h22m11s"), so
              // parseRetryFromErrorMessage fills retryMs and the !retryMs guard
              // below would silently skip the credit injection.
              if (
                lowerMsg.includes("exhausted your capacity") ||
                lowerMsg.includes("exhausted your") ||
                lowerMsg.includes("daily limit") ||
                lowerMsg.includes("quota exceeded")
              ) {
                if (!isCreditsExhausted(accountId) && !transformedBody?.enabledCreditTypes) {
                  log?.info?.(
                    "CREDITS",
                    `Quota exhausted for ${model} — retrying with GOOGLE_ONE_AI credits (account: ${accountId})`
                  );
                  const creditBody = { ...transformedBody, enabledCreditTypes: ["GOOGLE_ONE_AI"] };
                  const creditRes = await fetch(url, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(creditBody),
                    signal,
                  });

                  if (creditRes.ok) {
                    if (!stream) {
                      const collected = await this.collectStreamToResponse(
                        creditRes,
                        model,
                        url,
                        headers,
                        creditBody,
                        log,
                        signal
                      );
                      // Parse _remainingCredits from the synthetic response and cache
                      try {
                        const syntheticJson = await collected.response.clone().json();
                        const rc = syntheticJson?._remainingCredits;
                        if (Array.isArray(rc)) {
                          const googleCredit = rc.find((c) => c.creditType === "GOOGLE_ONE_AI");
                          if (googleCredit) {
                            const balance = parseInt(googleCredit.creditAmount, 10);
                            if (!isNaN(balance))
                              updateAntigravityRemainingCredits(accountId, balance);
                          }
                        }
                      } catch {
                        /**/
                      }
                      return collected;
                    }
                    return { response: creditRes, url, headers, transformedBody: creditBody };
                  }

                  // Credit retry also failed — check if credits are exhausted
                  try {
                    const creditErrText = await creditRes.clone().text();
                    const creditErrJson = JSON.parse(creditErrText);
                    const creditErrMsg = (creditErrJson?.error?.message || "").toLowerCase();
                    if (
                      creditErrMsg.includes("credit") ||
                      creditErrMsg.includes("insufficient") ||
                      creditErrMsg.includes("exhausted")
                    ) {
                      log?.warn?.(
                        "CREDITS",
                        `GOOGLE_ONE_AI credits exhausted for account ${accountId} — caching for 5h`
                      );
                      markCreditsExhausted(accountId);
                    }
                  } catch {
                    /**/
                  }
                  // Fall through to normal fallback logic below
                } else if (!isCreditsExhausted(accountId) && transformedBody?.enabledCreditTypes) {
                  // Already had credits injected and still failed — mark exhausted
                  markCreditsExhausted(accountId);
                  log?.warn?.("CREDITS", `Credits exhausted for account ${accountId}`);
                }

                // Hard quota limit — force fallback to next account regardless
                retryMs = 24 * 60 * 60 * 1000;
              } else {
                // Not a quota-exhaustion error — try to parse a Retry-After from the message
                retryMs = this.parseRetryFromErrorMessage(errorMessage);

                if (!retryMs) {
                  if (lowerMsg.includes("free tier") || lowerMsg.includes("free")) {
                    retryMs = 24 * 60 * 60 * 1000;
                  } else if (
                    lowerMsg.includes("pro") ||
                    lowerMsg.includes("per minute") ||
                    lowerMsg.includes("rpm")
                  ) {
                    retryMs = 60 * 1000;
                  }
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

        // For non-streaming clients, collect the SSE stream and return a synthetic
        // non-streaming Response so chatCore doesn't need to handle SSE conversion.
        if (!stream) {
          return this.collectStreamToResponse(
            response,
            model,
            url,
            headers,
            transformedBody,
            log,
            signal
          );
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
