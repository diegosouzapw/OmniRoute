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
} from "../utils.ts";
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
