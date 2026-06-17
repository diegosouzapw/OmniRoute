import crypto from "node:crypto";

import { getEmbeddingProvider } from "@omniroute/open-sse/config/embeddingRegistry.ts";

import { getRerankProvider } from "@omniroute/open-sse/config/rerankRegistry.ts";

import { getRegistryEntry } from "@omniroute/open-sse/config/providerRegistry.ts";

import { selectProxyForValidation } from "@omniroute/open-sse/services/proxyAutoSelector.ts";

import {
  buildClaudeCodeCompatibleHeaders,
  buildClaudeCodeCompatibleValidationPayload,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_CHAT_PATH,
  CLAUDE_CODE_COMPATIBLE_DEFAULT_MODELS_PATH,
  joinClaudeCodeCompatibleUrl,
  joinBaseUrlAndPath,
  stripClaudeCodeCompatibleEndpointSuffix,
  stripAnthropicMessagesSuffix,
} from "@omniroute/open-sse/services/claudeCodeCompatible.ts";

import {
  buildGrokCookieHeader,
  extractCookieValue,
  normalizeSessionCookieHeader,
} from "@/lib/providers/webCookieAuth";

import { buildJulesApiUrl } from "@/lib/cloudAgent/julesApi.ts";

import { getGigachatAccessToken } from "@omniroute/open-sse/services/gigachatAuth.ts";

import { validateQoderCliPat } from "@omniroute/open-sse/services/qoderCli.ts";

import {
  AZURE_AI_DEFAULT_BASE_URL,
  buildAzureAiChatUrl,
  buildAzureAiModelsUrl,
} from "@omniroute/open-sse/config/azureAi.ts";

import {
  discoverBedrockNativeModels,
  isBedrockNativeApiError,
  isBedrockNativeAuthError,
} from "@omniroute/open-sse/services/bedrock.ts";

import {
  DATAROBOT_DEFAULT_BASE_URL,
  buildDataRobotCatalogUrl,
  buildDataRobotChatUrl,
  isDataRobotDeploymentUrl,
} from "@omniroute/open-sse/config/datarobot.ts";

import {
  OCI_DEFAULT_BASE_URL,
  buildOciChatUrl,
  buildOciModelsUrl,
} from "@omniroute/open-sse/config/oci.ts";

import {
  SAP_DEFAULT_BASE_URL,
  buildSapChatUrl,
  buildSapModelsUrl,
  getSapResourceGroup,
  isSapDeploymentUrl,
} from "@omniroute/open-sse/config/sap.ts";

import {
  WATSONX_DEFAULT_BASE_URL,
  buildWatsonxChatUrl,
  buildWatsonxModelsUrl,
} from "@omniroute/open-sse/config/watsonx.ts";

import {
  buildRunwayApiUrl,
  buildRunwayHeaders,
  normalizeRunwayBaseUrl,
} from "@omniroute/open-sse/config/runway.ts";

import {
  buildMaritalkChatUrl,
  buildMaritalkModelsUrl,
} from "@omniroute/open-sse/config/maritalk.ts";

import { signAwsRequest } from "@omniroute/open-sse/utils/awsSigV4.ts";

import {
  toValidationErrorResult,
  applyCustomUserAgent,
  validationRead,
  validationWrite,
} from "./utils.ts";

// See open-sse/executors/muse-spark-web.ts for the rationale: Meta migrated
// from the "Abra" mutation (doc_id 078dfdff…, type RewriteOptionsInput now
// missing from schema) to the "Ecto" subscription. POST graphql still
// streams the response; only the persisted-query identifier and operation
// shape changed.
const META_AI_SEND_MESSAGE_DOC_ID = "29ae946c82d1f301196c6ca2226400b5";

const META_AI_FRIENDLY_NAME = "useEctoSendMessageSubscription";

const META_AI_REQUEST_ANALYTICS_TAGS = "graphservice";

const META_AI_ASBD_ID = "129477";

const META_AI_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36";

const META_AI_BASE62_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function encodeMetaAiBase62(value: bigint, padLength: number): string {
  let remaining = value;
  let encoded = "";

  while (remaining > 0n) {
    encoded = META_AI_BASE62_ALPHABET[Number(remaining % 62n)] + encoded;
    remaining /= 62n;
  }

  return encoded.padStart(padLength, "0");
}

function decodeMetaAiBase62(value: string): bigint {
  let decoded = 0n;
  for (const char of value) {
    const index = META_AI_BASE62_ALPHABET.indexOf(char);
    if (index < 0) {
      throw new Error(`Invalid Meta AI base62 character: ${char}`);
    }
    decoded = decoded * 62n + BigInt(index);
  }
  return decoded;
}

function randomMetaAiBigInt(byteLength: number): bigint {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  let result = 0n;
  for (const byte of bytes) {
    result = (result << 8n) | BigInt(byte);
  }
  return result;
}

function generateMetaAiConversationId(): string {
  const timestamp = BigInt(Date.now()) & ((1n << 44n) - 1n);
  const random = randomMetaAiBigInt(8) & ((1n << 64n) - 1n);
  return `c.${encodeMetaAiBase62((timestamp << 64n) | random, 19)}`;
}

function generateMetaAiEventId(conversationId: string): string | null {
  if (!conversationId.startsWith("c.")) {
    return null;
  }

  try {
    const packedConversation = decodeMetaAiBase62(conversationId.slice(2));
    const conversationRandom = packedConversation & ((1n << 64n) - 1n);
    const timestamp = BigInt(Date.now()) & ((1n << 44n) - 1n);
    const eventRandom = randomMetaAiBigInt(4) & ((1n << 32n) - 1n);
    return `e.${encodeMetaAiBase62((timestamp << (64n + 32n)) | (conversationRandom << 32n) | eventRandom, 25)}`;
  } catch {
    return null;
  }
}

function generateMetaAiNumericMessageId(): string {
  return (
    BigInt(Date.now()) * 1000n +
    BigInt(Math.floor(Math.random() * 1000)) +
    (randomMetaAiBigInt(2) & 0xfffn)
  ).toString();
}

function buildMetaAiValidationBody() {
  const conversationId = generateMetaAiConversationId();
  return {
    doc_id: META_AI_SEND_MESSAGE_DOC_ID,
    variables: {
      assistantMessageId: crypto.randomUUID(),
      attachments: null,
      clientLatitude: null,
      clientLongitude: null,
      clientTimezone:
        typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC",
      clippyIp: null,
      content: "test",
      conversationId,
      conversationStarterId: null,
      currentBranchPath: "0",
      developerOverridesForMessage: null,
      devicePixelRatio: 1,
      entryPoint: "KADABRA__CHAT__UNIFIED_INPUT_BAR",
      imagineOperationRequest: null,
      isNewConversation: true,
      mentions: null,
      mode: "mode_fast",
      promptEditType: null,
      promptSessionId: crypto.randomUUID(),
      promptType: null,
      qplJoinId: null,
      requestedToolCall: null,
      // See muse-spark-web executor: RewriteOptionsInput was removed from
      // Meta's schema; sending `rewriteOptions` (even null) breaks the
      // persisted-query validation. Omit the field.
      turnId: crypto.randomUUID(),
      userAgent: META_AI_USER_AGENT,
      userEventId: generateMetaAiEventId(conversationId),
      userLocale: "en_US",
      userMessageId: crypto.randomUUID(),
      userUniqueMessageId: generateMetaAiNumericMessageId(),
    },
  };
}

export async function validateDeepSeekWebProvider({ apiKey }: any) {
  if (!apiKey) {
    return {
      valid: false,
      error:
        "Missing userToken — paste the value from DevTools → Application → Local Storage → chat.deepseek.com → userToken",
    };
  }
  let token = apiKey;
  try {
    const parsed = JSON.parse(token);
    if (typeof parsed?.value === "string") token = parsed.value;
  } catch {
    // not JSON, use as-is
  }

  try {
    const resp = await fetch("https://chat.deepseek.com/api/v0/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
        Origin: "https://chat.deepseek.com",
        Referer: "https://chat.deepseek.com/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
        "X-App-Version": "20241129.1",
        "X-Client-Platform": "web",
      },
    });
    if (resp.status === 401 || resp.status === 403) {
      return {
        valid: false,
        error: "userToken is invalid or expired — get a fresh one from localStorage",
      };
    }
    if (!resp.ok) {
      return { valid: false, error: `DeepSeek returned HTTP ${resp.status}` };
    }
    const json = await resp.json();
    const bizData = json?.data?.biz_data || json?.biz_data;
    if (!bizData?.token) {
      return {
        valid: false,
        error: `DeepSeek did not return an access token: ${json?.msg || "unknown error"}`,
      };
    }
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateGrokWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const token = extractCookieValue(apiKey, "sso");
    if (!token) {
      return {
        valid: false,
        error: "Missing sso cookie — paste the value (or the full grok.com cookie line)",
      };
    }

    // Use the TLS-impersonating client — Cloudflare on grok.com pins
    // cf_clearance to JA3/JA4 + HTTP/2 SETTINGS, so plain Node fetch always
    // gets "Request rejected by anti-bot rules." regardless of cookies (#3180).
    const { tlsFetchGrok, TlsClientUnavailableError, isCloudflareChallenge } =
      await import("@omniroute/open-sse/services/grokTlsClient.ts");

    // Generate the same Cloudflare-bypass headers the GrokWebExecutor uses.
    const randomHex = (n: number) => {
      const a = new Uint8Array(n);
      crypto.getRandomValues(a);
      return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
    };
    const statsigMsg = `e:TypeError: Cannot read properties of null (reading 'children')`;
    const traceId = randomHex(16);
    const spanId = randomHex(8);

    let response;
    try {
      response = await tlsFetchGrok("https://grok.com/rest/app-chat/conversations/new", {
        method: "POST",
        headers: applyCustomUserAgent(
          {
            Accept: "*/*",
            "Accept-Encoding": "gzip, deflate, br, zstd",
            "Accept-Language": "en-US,en;q=0.9",
            Baggage:
              "sentry-environment=production,sentry-release=d6add6fb0460641fd482d767a335ef72b9b6abb8,sentry-public_key=b311e0f2690c81f25e2c4cf6d4f7ce1c",
            "Cache-Control": "no-cache",
            "Content-Type": "application/json",
            Cookie: buildGrokCookieHeader(apiKey),
            Origin: "https://grok.com",
            Pragma: "no-cache",
            Referer: "https://grok.com/",
            "Sec-Ch-Ua": '"Google Chrome";v="147", "Chromium";v="147", "Not(A:Brand";v="24"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"macOS"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36",
            "x-statsig-id": btoa(statsigMsg),
            "x-xai-request-id": crypto.randomUUID(),
            traceparent: `00-${traceId}-${spanId}-00`,
          },
          providerSpecificData
        ),
        body: JSON.stringify({
          temporary: true,
          modeId: "fast",
          message: "test",
          fileAttachments: [],
          imageAttachments: [],
          disableSearch: true,
          enableImageGeneration: false,
          returnImageBytes: false,
          returnRawGrokInXaiRequest: false,
          enableImageStreaming: false,
          imageGenerationCount: 0,
          forceConcise: true,
          toolOverrides: {},
          enableSideBySide: false,
          sendFinalMetadata: false,
          isReasoning: false,
          disableTextFollowUps: true,
          disableMemory: true,
          forceSideBySide: false,
          isAsyncChat: false,
          disableSelfHarmShortCircuit: false,
        }),
        timeoutMs: 15_000,
      });
    } catch (err: any) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `TLS impersonation client unavailable: ${err.message}`,
        };
      }
      throw err;
    }

    let errorDetail = "";
    try {
      errorDetail = (response.text || "").slice(0, 240);
    } catch {}

    // Detect Cloudflare challenge pages even with a 200 status from tls-client-node
    if (isCloudflareChallenge(errorDetail)) {
      return {
        valid: false,
        error: "Grok validation blocked by Cloudflare anti-bot. Try a residential IP or proxy.",
      };
    }

    if (response.status >= 200 && response.status < 300) {
      return { valid: true, error: null };
    }

    if (response.status === 401) {
      return {
        valid: false,
        error: "Invalid SSO cookie — re-paste from grok.com DevTools → Cookies → sso",
      };
    }

    if (response.status === 403) {
      // Grok uses 403 for auth failures, entitlement issues, geo blocks, and
      // resource errors. Default-deny: only the auth-shaped 403 gets the
      // re-paste hint; anything else surfaces the upstream body so the user
      // (or maintainer, if upstream renames the probe model) sees the real
      // cause instead of a misleading "valid" verdict.
      if (/invalid-credentials|unauthenticated|unauthorized/i.test(errorDetail)) {
        return {
          valid: false,
          error: "Invalid SSO cookie — re-paste from grok.com DevTools → Cookies → sso",
        };
      }
      return {
        valid: false,
        error: `Grok rejected validation (403)${errorDetail ? `: ${errorDetail.slice(0, 160)}` : ""}`,
      };
    }

    if (response.status === 429) {
      return { valid: false, error: "Grok rate limited during validation (429)" };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Grok unavailable (${response.status})` };
    }

    return {
      valid: false,
      error: `Grok validation failed (${response.status})${errorDetail ? `: ${errorDetail}` : ""}`,
    };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateChatGptWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    // Accept bare value, unchunked cookie, chunked (.0/.1) cookies, or full
    // "Cookie: ..." DevTools line. Pass through verbatim once recognised.
    let cookieHeader = String(apiKey || "").trim();
    if (/^cookie\s*:\s*/i.test(cookieHeader)) {
      cookieHeader = cookieHeader.replace(/^cookie\s*:\s*/i, "");
    }
    if (!/__Secure-next-auth\.session-token(?:\.\d+)?\s*=/.test(cookieHeader)) {
      cookieHeader = `__Secure-next-auth.session-token=${cookieHeader}`;
    }

    // Use the TLS-impersonating client — Cloudflare on chatgpt.com pins
    // cf_clearance to JA3/JA4 + HTTP/2 SETTINGS, so plain Node fetch always
    // gets cf-mitigated: challenge regardless of cookies.
    const { tlsFetchChatGpt, TlsClientUnavailableError } =
      await import("@omniroute/open-sse/services/chatgptTlsClient.ts");

    let response;
    try {
      response = await tlsFetchChatGpt("https://chatgpt.com/api/auth/session", {
        method: "GET",
        headers: applyCustomUserAgent(
          {
            Accept: "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            Cookie: cookieHeader,
            Origin: "https://chatgpt.com",
            Pragma: "no-cache",
            Referer: "https://chatgpt.com/",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0",
          },
          providerSpecificData
        ),
        timeoutMs: 30_000,
      });
    } catch (err: any) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `${err.message} (chatgpt-web requires this — without it, Cloudflare blocks every request)`,
        };
      }
      throw err;
    }

    const contentType = response.headers.get("content-type") || "";
    const cfRay = response.headers.get("cf-ray");
    const cfMitigated = response.headers.get("cf-mitigated");

    if (response.status === 401 || response.status === 403) {
      const bodyText = response.text || "";
      if (cfMitigated || /just a moment|cloudflare|cf-chl|attention required/i.test(bodyText)) {
        return {
          valid: false,
          error:
            "Cloudflare blocked the validator — open chatgpt.com in your browser, then copy the FULL Cookie line from DevTools (Network → request → Cookie) including cf_clearance, __cf_bm, _cfuvid, and the session-token chunks.",
        };
      }
      return {
        valid: false,
        error:
          "Invalid ChatGPT session cookie — re-paste __Secure-next-auth.session-token from chatgpt.com DevTools → Cookies",
      };
    }

    if (response.status >= 500) {
      return { valid: false, error: `ChatGPT unavailable (${response.status})` };
    }

    if (response.status >= 400) {
      return { valid: false, error: `Validation failed: ${response.status}` };
    }

    if (!contentType.includes("json")) {
      return {
        valid: false,
        error: `ChatGPT returned non-JSON (${contentType || "no content-type"}${cfRay ? `, cf-ray=${cfRay}` : ""}) — paste the FULL Cookie line including cf_clearance, __cf_bm, _cfuvid alongside the session-token chunks.`,
      };
    }

    let data: any = {};
    try {
      data = JSON.parse(response.text || "{}");
    } catch {
      return {
        valid: false,
        error:
          "ChatGPT session response was not JSON — paste the FULL Cookie line including cf_clearance and __cf_bm.",
      };
    }
    if (!data?.accessToken) {
      return {
        valid: false,
        error: "ChatGPT session expired — log into chatgpt.com and copy a fresh cookie",
      };
    }
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validatePerplexityWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    let sessionToken = apiKey;
    let bearerToken: string | null = null;

    if (sessionToken.startsWith("__Secure-next-auth.session-token=")) {
      sessionToken = sessionToken.slice("__Secure-next-auth.session-token=".length);
    } else if (/^bearer\s+/i.test(sessionToken)) {
      bearerToken = sessionToken.replace(/^bearer\s+/i, "").trim();
      sessionToken = "";
    }

    const timezone =
      typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "UTC";
    const headers = applyCustomUserAgent(
      {
        "Content-Type": "application/json",
        Accept: "text/event-stream",
        Origin: "https://www.perplexity.ai",
        Referer: "https://www.perplexity.ai/",
        // Firefox 148 — must match the firefox_148 TLS profile of perplexityTlsClient (issue #2459).
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:148.0) Gecko/20100101 Firefox/148.0",
        "X-App-ApiClient": "default",
        "X-App-ApiVersion": "client-1.11.0",
        ...(bearerToken
          ? { Authorization: `Bearer ${bearerToken}` }
          : sessionToken
            ? { Cookie: `__Secure-next-auth.session-token=${sessionToken}` }
            : {}),
      },
      providerSpecificData
    );

    // Perplexity is behind Cloudflare Enterprise which pins JA3/JA4 to a real
    // browser handshake — plain fetch is challenged with a 403 page from
    // VPS/datacenter IPs even with a valid cookie. Use the Firefox-fingerprinted
    // TLS client so the validator's verdict reflects the cookie, not the IP (issue #2459).
    const { tlsFetchPerplexity, isCloudflareChallenge, TlsClientUnavailableError } =
      await import("@omniroute/open-sse/services/perplexityTlsClient.ts");

    let response: { status: number; text: string | null };
    try {
      response = await tlsFetchPerplexity("https://www.perplexity.ai/rest/sse/perplexity_ask", {
        method: "POST",
        headers,
        body: JSON.stringify({
          query_str: "test",
          params: {
            query_str: "test",
            search_focus: "internet",
            mode: "concise",
            model_preference: "default",
            sources: ["web"],
            attachments: [],
            frontend_uuid: crypto.randomUUID(),
            frontend_context_uuid: crypto.randomUUID(),
            version: "client-1.11.0",
            language: "en-US",
            timezone,
            search_recency_filter: null,
            is_incognito: true,
            use_schematized_api: true,
            last_backend_uuid: null,
          },
        }),
        timeoutMs: 30_000,
      });
    } catch (err) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `${err.message} perplexity-web requires it — without it Cloudflare blocks every request.`,
        };
      }
      throw err;
    }

    if (response.status === 401 || response.status === 403) {
      if (isCloudflareChallenge(response.text)) {
        return {
          valid: false,
          error:
            "Cloudflare is blocking connections from this server's IP (TLS fingerprint rejected). " +
            "The session cookie may still be valid — install tls-client-node's native binary or route " +
            "perplexity-web through a residential proxy.",
        };
      }
      return {
        valid: false,
        error:
          "Invalid Perplexity session cookie — re-paste __Secure-next-auth.session-token from perplexity.ai",
      };
    }

    if (response.status === 200 || (response.status >= 400 && response.status < 500)) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Perplexity unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateBlackboxWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const cookieHeader = normalizeSessionCookieHeader(apiKey, "next-auth.session-token");
    const sessionHeaders = applyCustomUserAgent(
      {
        Accept: "application/json",
        Cookie: cookieHeader,
        Origin: "https://app.blackbox.ai",
        Referer: "https://app.blackbox.ai/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/147.0.0.0",
      },
      providerSpecificData
    );

    const sessionResponse = await validationRead("https://app.blackbox.ai/api/auth/session", {
      method: "GET",
      headers: sessionHeaders,
    });

    const sessionText = await sessionResponse.text();
    const sessionPayload = sessionText ? JSON.parse(sessionText) : null;
    const userEmail = sessionPayload?.user?.email;

    if (!sessionResponse.ok || !userEmail) {
      return {
        valid: false,
        error:
          "Invalid Blackbox session cookie — re-paste __Secure-authjs.session-token from app.blackbox.ai",
      };
    }

    const subscriptionHeaders = applyCustomUserAgent(
      {
        "Content-Type": "application/json",
        Accept: "application/json",
        Cookie: cookieHeader,
        Origin: "https://app.blackbox.ai",
        Referer: "https://app.blackbox.ai/",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/147.0.0.0",
      },
      providerSpecificData
    );

    const subscriptionResponse = await validationWrite(
      "https://app.blackbox.ai/api/check-subscription",
      {
        method: "POST",
        headers: subscriptionHeaders,
        body: JSON.stringify({ email: userEmail }),
      }
    );

    const subscriptionText = await subscriptionResponse.text();
    const subscriptionPayload = subscriptionText ? JSON.parse(subscriptionText) : null;
    const explicitActive =
      subscriptionPayload?.hasActiveSubscription === true ||
      subscriptionPayload?.isTrialSubscription === true ||
      subscriptionPayload?.status === "PREMIUM";
    const explicitInactive =
      subscriptionPayload?.hasActiveSubscription === false ||
      subscriptionPayload?.status === "FREE";
    const requiresAuthentication =
      subscriptionPayload?.requiresAuthentication === true ||
      /login is required/i.test(subscriptionText || "");

    if (subscriptionResponse.status === 401 || subscriptionResponse.status === 403) {
      return {
        valid: false,
        error:
          "Invalid Blackbox session cookie — re-paste __Secure-authjs.session-token from app.blackbox.ai",
      };
    }

    if (requiresAuthentication) {
      return {
        valid: false,
        error:
          "Blackbox session expired — re-paste __Secure-authjs.session-token from app.blackbox.ai",
      };
    }

    if (subscriptionResponse.ok && explicitActive) {
      return { valid: true, error: null };
    }

    if (
      (subscriptionResponse.ok && explicitInactive) ||
      subscriptionPayload?.previouslySubscribed
    ) {
      return {
        valid: false,
        error:
          "Blackbox account authenticated, but no active paid subscription was detected for premium web models.",
      };
    }

    if (subscriptionResponse.ok) {
      return { valid: true, error: null };
    }

    if (subscriptionResponse.status >= 500) {
      return { valid: false, error: `Blackbox unavailable (${subscriptionResponse.status})` };
    }

    return { valid: false, error: `Validation failed: ${subscriptionResponse.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateMuseSparkWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const cookieHeader = normalizeSessionCookieHeader(apiKey, "ecto_1_sess");
    const response = await validationWrite("https://www.meta.ai/api/graphql", {
      method: "POST",
      headers: applyCustomUserAgent(
        {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          "Accept-Language": "en-US,en;q=0.9",
          Cookie: cookieHeader,
          Origin: "https://www.meta.ai",
          Referer: "https://www.meta.ai/",
          "Sec-Fetch-Dest": "empty",
          "Sec-Fetch-Mode": "cors",
          "Sec-Fetch-Site": "same-origin",
          "User-Agent": META_AI_USER_AGENT,
          "X-ASBD-ID": META_AI_ASBD_ID,
          "X-FB-Friendly-Name": META_AI_FRIENDLY_NAME,
          "X-FB-Request-Analytics-Tags": META_AI_REQUEST_ANALYTICS_TAGS,
        },
        providerSpecificData
      ),
      body: JSON.stringify(buildMetaAiValidationBody()),
    });

    const responseText = await response.text();
    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error: "Invalid Meta AI session cookie — re-paste abra_sess from meta.ai",
      };
    }

    if (/authentication required to send messages|login is required|sign in/i.test(responseText)) {
      return {
        valid: false,
        error: "Invalid Meta AI session cookie — re-paste abra_sess from meta.ai",
      };
    }

    if (
      response.status === 429 ||
      /limit exceeded|rate limit|too many requests/i.test(responseText)
    ) {
      return { valid: true, error: null };
    }

    if (response.ok) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Meta AI unavailable (${response.status})` };
    }

    return { valid: false, error: `Validation failed: ${response.status}` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateAdaptaWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = typeof apiKey === "string" ? apiKey.trim() : "";
    if (!raw)
      return { valid: false, error: "Paste your __client cookie from .clerk.agent.adapta.one" };
    const eqIdx = raw.indexOf("=");
    const clientJwt = eqIdx > 0 && !raw.startsWith("eyJ") ? raw.slice(eqIdx + 1).trim() : raw;

    const response = await validationRead("https://clerk.agent.adapta.one/v1/client", {
      headers: applyCustomUserAgent(
        {
          Cookie: `__client=${clientJwt}`,
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          Origin: "https://agent.adapta.one",
        },
        providerSpecificData
      ),
    });

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error: "Invalid or expired __client cookie — re-paste from .clerk.agent.adapta.one",
      };
    }

    if (!response.ok) {
      return { valid: false, error: `Adapta Clerk returned HTTP ${response.status}` };
    }

    const body = await response.json().catch(() => null);
    const sessions: Array<{ id: string; status: string }> = body?.response?.sessions ?? [];
    const hasActive = sessions.some((s) => s.status === "active");
    if (!hasActive) {
      return {
        valid: false,
        error: "No active Adapta session — your __client cookie may be expired",
      };
    }

    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

export async function validateClaudeWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const cookieHeader = normalizeSessionCookieHeader(String(apiKey || ""), "sessionKey");
    if (!cookieHeader) {
      return { valid: false, error: "Paste your sessionKey cookie from claude.ai" };
    }

    const { tlsFetchClaude, TlsClientUnavailableError } =
      await import("@omniroute/open-sse/services/claudeTlsClient.ts");

    let response: { status: number; text: string | null };
    try {
      response = await tlsFetchClaude("https://claude.ai/api/organizations", {
        method: "GET",
        headers: applyCustomUserAgent(
          {
            Accept: "application/json",
            "Accept-Language": "en-US,en;q=0.9",
            "Cache-Control": "no-cache",
            Cookie: cookieHeader,
            Origin: "https://claude.ai",
            Pragma: "no-cache",
            Referer: "https://claude.ai/new",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "anthropic-client-platform": "web_claude_ai",
          },
          providerSpecificData
        ),
        timeoutMs: 30_000,
      });
    } catch (err: any) {
      if (err instanceof TlsClientUnavailableError) {
        return {
          valid: false,
          error: `${err.message} (claude-web requires this — without it, Cloudflare blocks every request)`,
        };
      }
      throw err;
    }

    if (response.status === 200) {
      return { valid: true, error: null };
    }

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error:
          "Invalid or expired session cookie — re-paste sessionKey from claude.ai DevTools → Cookies",
      };
    }

    if (response.status === 429) {
      return { valid: true, error: null };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Claude.ai unavailable (${response.status})` };
    }

    return { valid: false, error: `Claude.ai validation failed (${response.status})` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// ── Gemini Web cookie validator ──
export async function validateGeminiWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = String(apiKey || "").trim();
    if (!raw) {
      return { valid: false, error: "Paste your __Secure-1PSID cookie from gemini.google.com" };
    }

    // Accept full cookie blob or bare value
    let cookieHeader = raw;
    if (!raw.includes("=")) {
      cookieHeader = `__Secure-1PSID=${raw}`;
    }

    const response = await validationRead("https://gemini.google.com/app", {
      headers: applyCustomUserAgent(
        {
          Accept: "text/html,application/xhtml+xml",
          Cookie: cookieHeader,
          Origin: "https://gemini.google.com",
          Referer: "https://gemini.google.com/",
        },
        providerSpecificData
      ),
    });

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error:
          "Invalid or expired __Secure-1PSID cookie — re-paste from gemini.google.com DevTools → Cookies",
      };
    }

    // 200/302 = valid, anything < 500 that isn't auth failure is acceptable
    if (response.status < 500) {
      return { valid: true, error: null };
    }

    return { valid: false, error: `Gemini validation failed (${response.status})` };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// ── Copilot Web token validator ──
export async function validateCopilotWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = String(apiKey || "").trim();
    if (!raw) {
      return {
        valid: false,
        error: "Paste your access_token from copilot.microsoft.com DevTools → Cookies",
      };
    }

    // Extract token — may be bare JWT, cookie string with access_token=, or Bearer prefix
    const { extractAccessToken } = await import("@omniroute/open-sse/executors/copilot-web.ts");
    const token = extractAccessToken(raw);
    if (!token) {
      return { valid: false, error: "Could not extract access_token from input" };
    }

    // Probe Copilot's conversation API to verify token
    const response = await validationWrite(
      "https://copilot.microsoft.com/c/api/conversations?language=en",
      {
        method: "GET",
        headers: applyCustomUserAgent(
          {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            Origin: "https://copilot.microsoft.com",
            Referer: "https://copilot.microsoft.com/",
          },
          providerSpecificData
        ),
      }
    );

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error:
          "Invalid or expired access_token — re-paste from copilot.microsoft.com DevTools → Cookies",
      };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Copilot unavailable (${response.status})` };
    }

    // 200, 400, 404 etc. all indicate the token was accepted
    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

// ── t3.chat Web cookie validator ──
export async function validateT3WebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = String(apiKey || "").trim();
    if (!raw) {
      return {
        valid: false,
        error: "Paste your Cookie header and convex-session-id from t3.chat",
      };
    }

    // The cookie field may contain "cookies=<Cookie header>\nconvexSessionId=<id>"
    // or just the Cookie header value. Try to parse.
    let cookieHeader = raw;
    let convexSessionId = "";

    if (raw.includes("convexSessionId") || raw.includes("convex-session-id")) {
      // Structured format: "cookies=...; convexSessionId=..."
      const parts = raw.split(/[,;\n]/).map((s: string) => s.trim());
      const cookieParts: string[] = [];
      for (const part of parts) {
        if (part.startsWith("convexSessionId=") || part.startsWith("convex-session-id=")) {
          convexSessionId = part.split("=").slice(1).join("=");
        } else if (part.startsWith("cookies=")) {
          cookieParts.push(part.slice("cookies=".length));
        } else if (part.includes("=")) {
          cookieParts.push(part);
        }
      }
      if (cookieParts.length) cookieHeader = cookieParts.join("; ");
    }

    // Build final cookie with convex-session-id if found
    const finalCookie = convexSessionId
      ? `${cookieHeader}; convex-session-id=${convexSessionId}`
      : cookieHeader;

    const response = await validationRead("https://t3.chat", {
      headers: applyCustomUserAgent(
        {
          Accept: "text/html",
          Cookie: finalCookie,
        },
        providerSpecificData
      ),
    });

    // t3.chat returns 200/302/404 for valid sessions, 5xx for down
    if (response.status >= 500) {
      return { valid: false, error: `t3.chat unavailable (${response.status})` };
    }

    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}

/** Jules API — GET /v1alpha/sources with X-Goog-Api-Key (see developers.google.com/jules/api). */
export async function validateJulesProvider({ apiKey }: { apiKey: string }) {
  try {
    const response = await validationWrite(buildJulesApiUrl("/sources"), {
      method: "GET",
      headers: {
        "X-Goog-Api-Key": apiKey,
      },
    });

    if (response.status === 401 || response.status === 403) {
      return { valid: false, error: "Invalid API key" };
    }

    if (response.ok) {
      return { valid: true, error: null };
    }

    const errorText = await response.text().catch(() => "");
    return {
      valid: false,
      error: errorText.trim() || `Jules API returned ${response.status}`,
    };
  } catch (error: unknown) {
    return toValidationErrorResult(error);
  }
}

export async function validateInnerAiProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = typeof apiKey === "string" ? apiKey.trim() : "";
    if (!raw) {
      return {
        valid: false,
        error: "Paste your token cookie and email — format: eyJ... user@example.com",
      };
    }

    // Parse token and optional email (format: "TOKEN EMAIL")
    const eqIdx = raw.indexOf("=");
    const stripped = eqIdx > 0 && !raw.startsWith("eyJ") ? raw.slice(eqIdx + 1).trim() : raw;
    const lastSpace = stripped.lastIndexOf(" ");
    let token = stripped;
    let credEmail = "";
    if (lastSpace > 0) {
      const possibleEmail = stripped.slice(lastSpace + 1).trim();
      if (possibleEmail.includes("@")) {
        token = stripped.slice(0, lastSpace).trim();
        credEmail = possibleEmail;
      }
    }

    if (!credEmail) {
      return {
        valid: false,
        error:
          "Email is required — paste token followed by a space and your email: eyJ... user@example.com",
      };
    }

    // Validate JWT structure (3 parts separated by dots)
    const parts = token.split(".");
    if (parts.length < 3) {
      return {
        valid: false,
        error:
          "Invalid token format — paste only the token cookie value from .innerai.com (starts with eyJ…)",
      };
    }

    // Decode payload and check expiry
    const b64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    let payload: Record<string, unknown> = {};
    try {
      payload = JSON.parse(Buffer.from(b64, "base64").toString("utf8"));
    } catch {
      return { valid: false, error: "Could not parse Inner.ai token — re-paste from DevTools" };
    }

    if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) {
      return {
        valid: false,
        error:
          "Inner.ai token has expired — re-login at app.innerai.com and re-paste the token cookie",
      };
    }

    // Verify the token carries at least one known Inner.ai identity field
    const hasIdentity =
      payload.device_id ??
      payload.deviceId ??
      payload["device-id"] ??
      payload.did ??
      payload.user_id ??
      payload.userId ??
      payload.sub;
    if (!hasIdentity) {
      return {
        valid: false,
        error:
          "Token does not look like an Inner.ai session token — re-paste from DevTools → Cookies → .innerai.com",
      };
    }

    return { valid: true, error: null };
  } catch (error: any) {
    return toValidationErrorResult(error);
  }
}
