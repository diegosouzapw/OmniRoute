// Web-cookie provider key validators (part A): deepseek-web, kimi-web, grok-web,
// perplexity-web, blackbox-web. Extracted from validation.ts (god-file decomposition) — top-level
// functions with no dispatcher-state captures; behavior is byte-identical to the original inline defs.
import { applyCustomUserAgent } from "./headers";
import { toValidationErrorResult, validationRead, validationWrite } from "./transport";
import {
  buildGrokCookieHeader,
  extractCookieValue,
  extractKimiAccessToken,
  normalizeSessionCookieHeader,
} from "@/lib/providers/webCookieAuth";

// kimi-web uses the international (west-facing) `www.kimi.ai` Connect-RPC API by
// default. `www.kimi.com` is the China-region endpoint — it serves China users but
// the China region is not reliably reachable from outside CN, so it is not the
// default. The legacy `kimi.moonshot.cn` domain now 307-redirects every non-CN
// visitor, and even if you bypass the redirect the old `/api/chat` REST endpoint is
// gone. The SPA exposes a profile probe at `GET /api/user` that returns the user
// object at the top level when the `Authorization: Bearer <access_token>` header is
// valid. Override the endpoint with KIMI_WEB_BASE_URL (opt-in).
export async function validateKimiWebProvider({ apiKey }: any) {
  const rawCred = String(apiKey ?? "").trim();
  if (!rawCred) {
    return {
      valid: false,
      error: "Missing Kimi access_token from www.kimi.ai localStorage",
    };
  }

  const accessToken = extractKimiAccessToken(rawCred);
  if (!accessToken) {
    return {
      valid: false,
      error:
        "Could not find a Kimi access_token. Re-login at https://www.kimi.ai and copy it from localStorage.",
    };
  }

  try {
    const resp = await fetch("https://www.kimi.ai/api/user", {
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: `Bearer ${accessToken}`,
        Origin: "https://www.kimi.ai",
        Referer: "https://www.kimi.ai/",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
      },
    });

    if (resp.status === 401 || resp.status === 403) {
      return {
        valid: false,
        error:
          "Kimi session is invalid or expired — re-login at https://www.kimi.ai and paste a fresh access_token",
      };
    }
    if (!resp.ok) {
      return { valid: false, error: `Kimi returned HTTP ${resp.status}` };
    }

    // Profile response: `{ id, name, email, region, ... }` at the top level.
    try {
      const data = await resp.json();
      if (!data?.id) {
        return {
          valid: false,
          error:
            "Kimi session token is invalid or expired — re-login at https://www.kimi.ai and paste a fresh access_token",
        };
      }
    } catch {
      return { valid: false, error: "Kimi returned invalid JSON response" };
    }

    return { valid: true, error: null };
  } catch (error) {
    return toValidationErrorResult(error);
  }
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
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
        // Match the current chat.deepseek.com web client (v2.0.0): the legacy
        // X-App-Version build stamp was dropped, X-Client-Bundle-Id was added.
        // Keep aligned with FAKE_HEADERS in open-sse/executors/deepseek-web.ts.
        "X-Client-Bundle-Id": "com.deepseek.chat",
        "X-Client-Platform": "web",
        "X-Client-Version": "2.0.0",
      },
    });
    if (resp.status === 401 || resp.status === 403) {
      return {
        valid: false,
        error: "userToken is invalid or expired — get a fresh one from localStorage",
        statusCode: resp.status,
      };
    }
    if (!resp.ok) {
      return { valid: false, error: `DeepSeek returned HTTP ${resp.status}` };
    }
    const json = await resp.json();
    const bizData = json?.data?.biz_data || json?.biz_data;

    // DeepSeek's web endpoint can report auth rejection as HTTP 200 with an
    // application-level error envelope. Code 40003 is the observed
    // "Authorization Failed" signal. Preserve the real HTTP behavior while
    // returning an auth-classifiable status to OmniRoute's connection-test
    // layer so it is not collapsed into a generic upstream_error.
    if (Number(json?.code) === 40003) {
      return {
        valid: false,
        error: "userToken is invalid or expired — get a fresh one from localStorage",
        statusCode: 401,
      };
    }

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

/**
 * Heuristic for a Grok 403 that is an anti-bot / IP-reputation block rather than
 * a genuine upstream API error (issue #3474).
 *
 * Returns true when the body reads like an anti-bot rejection — Grok's literal
 * "Request rejected by anti-bot rules." text, or a bare/non-structured forbidden
 * body that carries no parseable upstream `error.message`. Returns false for a
 * structured upstream API error (e.g. `{"error":{"message":"Model is not found"}}`),
 * which must keep surfacing its body to the user/maintainer.
 *
 * Callers should run `isCloudflareChallenge()` first; this covers the non-HTML
 * anti-bot cases that Cloudflare-challenge detection does not.
 */
export function isGrokAntiBotBlock(body: string | null | undefined): boolean {
  const text = (body || "").trim();
  if (!text) return true; // empty 403 body — pre-auth block, treat as anti-bot
  if (/anti-bot|forbidden|access denied|blocked|rate.?limit/i.test(text)) return true;
  // A structured upstream API error has a parseable JSON `error.message`; if one
  // is present this is a real upstream error, not an anti-bot block.
  try {
    const parsed = JSON.parse(text);
    if (parsed && typeof parsed?.error?.message === "string") return false;
  } catch {
    // Non-JSON 403 body with no recognizable structure → treat as anti-bot block.
    return true;
  }
  return false;
}

// Shared IP-reputation / anti-bot guidance (#3474, #5350). The request was rejected
// before (or independently of) auth — the cookie itself is likely fine. cf_clearance
// is pinned to the IP + TLS fingerprint + User-Agent that earned it and cannot be
// replayed from a different machine/IP, so an auth-shaped rejection after a
// cf_clearance was supplied is almost always this block, not a bad cookie.
const GROK_IP_REPUTATION_GUIDANCE =
  "Your sso cookie is likely fine — this is an IP-reputation block on the request, not an " +
  "auth failure. cf_clearance is pinned to the IP + TLS fingerprint + User-Agent that earned " +
  "it and cannot be replayed from a different machine/IP. Retry from a residential IP or " +
  "configure a proxy for grok-web.";

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
            "Sec-Ch-Ua": '"Google Chrome";v="149", "Chromium";v="149", "Not(A:Brand";v="24"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": '"macOS"',
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
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

    // Detect Cloudflare challenge pages even when the browser transport reports status 200.
    if (isCloudflareChallenge(errorDetail)) {
      return {
        valid: false,
        error: "Grok validation blocked by Cloudflare anti-bot. Try a residential IP or proxy.",
      };
    }

    if (response.status >= 200 && response.status < 300) {
      return { valid: true, error: null };
    }

    // Did the user actually supply a cf_clearance cookie? Detect it from the raw
    // input blob via a real cookie-pair match — NOT extractCookieValue, which
    // returns the whole bare value for any name when the input has no ";" (#5350).
    const suppliedCfClearance = /(?:^|;\s*)cf_clearance=[^;\s]+/.test(String(apiKey || ""));

    if (response.status === 401) {
      // With a cf_clearance supplied, a 401 is almost always an IP-reputation block
      // (the clearance can't be replayed from a different machine), not a bad cookie.
      if (suppliedCfClearance) {
        return { valid: false, error: `Grok returned 401. ${GROK_IP_REPUTATION_GUIDANCE}` };
      }
      return {
        valid: false,
        error: "Invalid SSO cookie — re-paste from grok.com DevTools → Cookies → sso",
      };
    }

    if (response.status === 403) {
      // Grok uses 403 for auth failures, entitlement issues, geo blocks,
      // anti-bot/IP-reputation rejections, and resource errors. Classify before
      // messaging — a misleading "invalid cookie" verdict on an IP-reputation
      // block (issue #3474) sends users chasing a cookie that is actually fine.
      //
      // 1. Auth-shaped → the cookie/session is the problem; re-paste it. But when a
      //    cf_clearance was supplied, this is almost always an IP-reputation block the
      //    edge surfaced as an auth failure — the clearance can't be replayed from a
      //    different machine, so re-pasting the cookie will not help (#5350).
      if (/invalid-credentials|unauthenticated|unauthorized/i.test(errorDetail)) {
        if (suppliedCfClearance) {
          return { valid: false, error: `Grok returned 403. ${GROK_IP_REPUTATION_GUIDANCE}` };
        }
        return {
          valid: false,
          error: "Invalid SSO cookie — re-paste from grok.com DevTools → Cookies → sso",
        };
      }
      // 2. Anti-bot / Cloudflare / IP-reputation block → the cookie is likely
      //    fine; the request was rejected before auth was even evaluated. This is
      //    not code-fixable: the datacenter/VPS IP is flagged. A Cloudflare
      //    challenge body, Grok's "anti-bot rules" rejection, or a bare/non-JSON
      //    forbidden body (no structured upstream `error.message`) all map here.
      if (isCloudflareChallenge(errorDetail) || isGrokAntiBotBlock(errorDetail)) {
        return {
          valid: false,
          error: `Grok returned 403 (anti-bot/Cloudflare block). ${GROK_IP_REPUTATION_GUIDANCE}`,
        };
      }
      // 3. Structured upstream error (e.g. probe model renamed) → surface the body
      //    so the user/maintainer sees the real cause instead of a wrong verdict.
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
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:152.0) Gecko/20100101 Firefox/152.0",
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
            "The session cookie may still be valid — verify the wreq-js 3.2 native binding or route " +
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
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
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
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
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
