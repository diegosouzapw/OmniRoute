// Web-cookie provider key validators (part B): muse-spark-web, adapta-web, claude-web, gemini-web,
// copilot-web, t3-web, jules, devin (cloud-agent), inner-ai. Extracted from validation.ts (god-file
// decomposition) — top-level functions with no dispatcher-state captures; behavior is byte-identical
// to the inline defs.
import { applyCustomUserAgent } from "./headers";
import {
  isSecurityBlockError,
  toValidationErrorResult,
  validationRead,
  validationWrite,
} from "./transport";
import { SafeOutboundFetchError } from "@/shared/network/safeOutboundFetch";
import { normalizeSessionCookieHeader } from "@/lib/providers/webCookieAuth";
import { buildJulesApiUrl } from "@/lib/cloudAgent/julesApi.ts";
import {
  META_AI_ASBD_ID,
  META_AI_FRIENDLY_NAME,
  META_AI_REQUEST_ANALYTICS_TAGS,
  META_AI_USER_AGENT,
  buildMetaAiValidationBody,
} from "./metaAi";

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
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
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
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36",
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
    // #7859: gemini.google.com/app answers EVERY session probe (valid or not) with a
    // 302 redirect (typically onward to accounts.google.com). validationRead() uses the
    // no-redirect preset, so safeOutboundFetch throws REDIRECT_BLOCKED before the
    // "200/302 = valid" status check above ever runs. A redirect to a PUBLIC host means
    // the redirect was never followed (no SSRF) and is exactly what a valid Gemini
    // session looks like here, so treat it as success. A redirect to a private/internal
    // host is a genuine SSRF signal and must stay invalid — isSecurityBlockError()
    // already makes that distinction.
    if (
      error instanceof SafeOutboundFetchError &&
      error.code === "REDIRECT_BLOCKED" &&
      !isSecurityBlockError(error)
    ) {
      return { valid: true, error: null };
    }
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

export function extractM365CredentialParts(raw: string, providerSpecificData: Record<string, unknown>) {
  const text = raw.trim();
  const parts: Record<string, string> = {};

  for (const segment of text.split(/[;\n]/)) {
    const index = segment.indexOf("=");
    if (index <= 0) continue;
    const key = segment.slice(0, index).trim();
    const value = segment.slice(index + 1).trim();
    if (key && value) parts[key] = value;
  }

  // Accept the current M365 web endpoint (m365.cloud.microsoft, including
  // regional subdomains) plus the two legacy hosts (substrate.office.com,
  // copilot.microsoft.com). The path still carries /m365Copilot/Chathub/<tenant>,
  // so extraction is unchanged. (OmniRoute issue #7078)
  if (/^wss:\/\//i.test(text)) {
    try {
      const url = new URL(text);
      const hostOk = /^(?:[\w-]+\.)*(?:m365\.cloud\.microsoft|copilot\.microsoft\.com|substrate\.office\.com)$/i.test(
        url.hostname
      );
      if (hostOk && url.pathname.startsWith("/m365Copilot/Chathub/")) {
        parts.access_token ||= url.searchParams.get("access_token") || "";
        parts.chathubPath ||= decodeURIComponent(
          url.pathname.split("/m365Copilot/Chathub/")[1] || ""
        );
      }
    } catch {
      // Fall through to the structured key/value parser result.
    }
  }

  return {
    accessToken:
      parts.access_token ||
      parts.accessToken ||
      (typeof providerSpecificData.access_token === "string"
        ? providerSpecificData.access_token
        : "") ||
      (typeof providerSpecificData.accessToken === "string" ? providerSpecificData.accessToken : ""),
    chathubPath:
      parts.chathubPath ||
      parts.userTenant ||
      (typeof providerSpecificData.chathubPath === "string"
        ? providerSpecificData.chathubPath
        : "") ||
      (typeof providerSpecificData.userTenant === "string" ? providerSpecificData.userTenant : ""),
  };
}

// ── Microsoft 365 Copilot Web token validator ──
export async function validateCopilotM365WebProvider({
  apiKey,
  providerSpecificData = {},
}: any) {
  const { accessToken, chathubPath } = extractM365CredentialParts(
    String(apiKey || ""),
    providerSpecificData
  );

  if (!accessToken) {
    return {
      valid: false,
      error: "Could not extract access_token from the Microsoft 365 Copilot credential",
    };
  }

  if (!chathubPath || !chathubPath.includes("@")) {
    return {
      valid: false,
      error: "Could not extract the account-specific Chathub path from the credential",
    };
  }

  // The live provider uses a SignalR WebSocket. The generic web-cookie /models
  // probe builds an invalid wss://.../models URL, so validation here confirms
  // the captured credential shape and lets the executor perform the live check.
  return {
    valid: true,
    error: null,
    warning: "Credential format accepted. The session is verified when the provider sends a chat.",
  };
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

/**
 * Devin cloud-agent (Cognition) — GET /v1/sessions with Bearer auth
 * (see docs.devin.ai/api-reference/sessions/list-sessions). Distinct from the
 * "devin-cli" LLM provider (ACP), which is already wired via providerRegistry.
 */
export async function validateDevinCloudAgentProvider({ apiKey }: { apiKey: string }) {
  try {
    const response = await validationWrite("https://api.devin.ai/v1/sessions?limit=1", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${apiKey}`,
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
      error: errorText.trim() || `Devin API returned ${response.status}`,
    };
  } catch (error: unknown) {
    return toValidationErrorResult(error);
  }
}

// ── Notion AI Web (Unofficial/Experimental) cookie validator ──
// #6758: no public Notion inference API exists; validate by probing a stable,
// low-privilege authenticated Notion endpoint (getSpaces) with the session
// cookie rather than the experimental runInferenceTranscript endpoint itself
// (a live inference call is expensive and unnecessary just to confirm the
// session is valid).
export async function validateNotionWebProvider({ apiKey, providerSpecificData = {} }: any) {
  try {
    const raw = String(apiKey || "").trim();
    if (!raw) {
      return { valid: false, error: "Paste your token_v2 cookie value from notion.so" };
    }

    const cookieHeader = raw.includes("=") ? raw : `token_v2=${raw}`;

    const response = await validationWrite("https://www.notion.so/api/v3/getSpaces", {
      method: "POST",
      headers: applyCustomUserAgent(
        {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: cookieHeader,
          Origin: "https://www.notion.so",
          Referer: "https://www.notion.so/",
        },
        providerSpecificData
      ),
      body: "{}",
    });

    if (response.status === 401 || response.status === 403) {
      return {
        valid: false,
        error: "Invalid or expired token_v2 cookie — re-paste from notion.so DevTools → Cookies",
      };
    }

    if (response.status >= 500) {
      return { valid: false, error: `Notion unavailable (${response.status})` };
    }

    if (response.ok) {
      return { valid: true, error: null };
    }

    return { valid: false, error: `Notion validation failed (${response.status})` };
  } catch (error: any) {
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
