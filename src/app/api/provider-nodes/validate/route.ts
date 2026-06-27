import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getAuditRequestContext, logAuditEvent } from "@/lib/compliance/index";
import { validateClaudeCodeCompatibleProvider } from "@/lib/providers/validation";
import {
  SAFE_OUTBOUND_FETCH_PRESETS,
  SafeOutboundFetchError,
  getSafeOutboundFetchErrorStatus,
  safeOutboundFetch,
} from "@/shared/network/safeOutboundFetch";
import {
  PROVIDER_URL_BLOCKED_MESSAGE,
  getProviderOutboundGuard,
} from "@/shared/network/outboundUrlGuard";
import { isCcCompatibleProviderEnabled } from "@/shared/utils/featureFlags";
import { providerNodeValidateSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";

// Matches a base URL whose host is localhost / 127.0.0.1 (with an optional port).
const LOCALHOST_BASE_URL_RE = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?(?:[/?#]|$)/i;

// Extract the underlying network error code from a SafeOutboundFetchError chain.
// safeOutboundFetch wraps fetch failures and preserves the original error as `cause`,
// so a connection-refused surfaces as cause.code === "ECONNREFUSED".
function getOutboundCauseCode(error: unknown): string | undefined {
  const cause = (error as { cause?: unknown })?.cause;
  if (cause && typeof cause === "object") {
    const direct = (cause as { code?: unknown }).code;
    if (typeof direct === "string") return direct;
    const nested = (cause as { cause?: { code?: unknown } }).cause?.code;
    if (typeof nested === "string") return nested;
  }
  return undefined;
}

// When a connection error happens against a localhost base URL, the most common
// cause is running OmniRoute in Docker — `localhost` then points at the container,
// not the host. Augment the surfaced message with an actionable hint in that case.
// Ported from decolua/9router#642.
export function augmentDockerLocalhostHint(
  error: unknown,
  baseUrl: string | undefined,
  fallbackMessage: string
): string {
  if (!baseUrl || !LOCALHOST_BASE_URL_RE.test(baseUrl)) return fallbackMessage;

  const code =
    error instanceof SafeOutboundFetchError && error.code === "TIMEOUT"
      ? "ETIMEDOUT"
      : getOutboundCauseCode(error);

  if (code === "ECONNREFUSED") {
    return "Connection refused — are you running OmniRoute in Docker? localhost points to the container, not your host. Use your host IP (e.g. http://192.168.x.x:11434) or http://host.docker.internal:11434 on Linux/Mac.";
  }
  if (code === "ETIMEDOUT") {
    return "Connection timeout — are you running OmniRoute in Docker? Use your host IP (e.g. http://192.168.x.x:11434) or http://host.docker.internal:11434 on Linux/Mac.";
  }
  return fallbackMessage;
}

function sanitizeAnthropicBaseUrl(baseUrl: string) {
  return (baseUrl || "")
    .trim()
    .replace(/\/$/, "")
    .replace(/\/messages(?:\?[^#]*)?$/i, "");
}

function sanitizeClaudeCodeCompatibleBaseUrl(baseUrl: string) {
  return (baseUrl || "")
    .trim()
    .replace(/\/$/, "")
    .replace(/\/(?:v\d+\/)?messages(?:\?[^#]*)?$/i, "");
}

// Status-specific error message for /models probe failures.
function getModelsErrorMessage(status: number) {
  if (status === 401 || status === 403) return "API key unauthorized";
  if (status === 404) {
    return "/models endpoint not found - enter a Model ID to validate via chat/completions instead";
  }
  if (status >= 500) return "Server error - try again later";
  return `Unexpected response (${status})`;
}

// Status-specific error message for the /chat/completions fallback probe.
function getChatErrorMessage(status: number) {
  if (status === 401 || status === 403) return "API key unauthorized";
  if (status === 400) return "Invalid model or bad request";
  if (status === 404) return "Chat endpoint not found";
  if (status >= 500) return "Server error - try again later";
  return `Chat request failed (${status})`;
}

async function probeChatFallback({
  baseUrl,
  apiKey,
  modelId,
  extraHeaders = {},
}: {
  baseUrl: string;
  apiKey: string;
  modelId: string;
  extraHeaders?: Record<string, string>;
}) {
  const chatUrl = `${baseUrl.replace(/\/$/, "")}/chat/completions`;
  return safeOutboundFetch(chatUrl, {
    ...SAFE_OUTBOUND_FETCH_PRESETS.validationRead,
    guard: getProviderOutboundGuard(),
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      ...extraHeaders,
    },
    body: JSON.stringify({
      model: modelId,
      messages: [{ role: "user", content: "ping" }],
      max_tokens: 1,
    }),
  });
}

function sanitizeAuditBaseUrl(baseUrl: string) {
  if (!baseUrl) return null;
  try {
    const parsed = new URL(baseUrl);
    return `${parsed.origin}${parsed.pathname}`.replace(/\/$/, "") || parsed.origin;
  } catch {
    return baseUrl;
  }
}

// POST /api/provider-nodes/validate - Validate API key against base URL
export async function POST(request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const auditContext = getAuditRequestContext(request);
  let rawBody;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      {
        error: {
          message: "Invalid request",
          details: [{ field: "body", message: "Invalid JSON body" }],
        },
      },
      { status: 400 }
    );
  }

  try {
    const validation = validateBody(providerNodeValidateSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }
    const { baseUrl, apiKey, type, compatMode, chatPath, modelsPath, modelId } = validation.data;
    const trimmedModelId = typeof modelId === "string" ? modelId.trim() : "";

    // Anthropic Compatible Validation
    if (type === "anthropic-compatible") {
      if (compatMode === "cc") {
        if (!isCcCompatibleProviderEnabled()) {
          return NextResponse.json(
            { valid: false, error: "CC Compatible provider is disabled" },
            { status: 403 }
          );
        }

        const result = await validateClaudeCodeCompatibleProvider({
          apiKey,
          providerSpecificData: {
            baseUrl: sanitizeClaudeCodeCompatibleBaseUrl(baseUrl),
            chatPath: chatPath || undefined,
          },
        });

        return NextResponse.json({
          valid: !!result.valid,
          error: result.valid ? null : result.error || "Invalid API key",
          warning: result.warning || null,
          method: result.method || null,
        });
      }

      // Robustly construct URL: remove trailing slash, and remove trailing /messages if user added it
      const normalizedBase = sanitizeAnthropicBaseUrl(baseUrl);

      // Use /models endpoint for validation as many compatible providers support it (like OpenAI)
      const modelsUrl = `${normalizedBase}${modelsPath || "/models"}`;

      const res = await safeOutboundFetch(modelsUrl, {
        ...SAFE_OUTBOUND_FETCH_PRESETS.validationRead,
        guard: getProviderOutboundGuard(),
        method: "GET",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          Authorization: `Bearer ${apiKey}`, // Add Bearer token for hybrid proxies
        },
      });

      if (res.ok) return NextResponse.json({ valid: true, error: null });
      // Auth errors: chat fallback would not recover. Skip and surface clear message.
      if (res.status === 401 || res.status === 403) {
        return NextResponse.json({ valid: false, error: "API key unauthorized" });
      }
      // Optional /chat/completions fallback when caller supplied a model ID
      // (some Anthropic-compatible proxies expose only the chat endpoint).
      if (trimmedModelId) {
        const chatRes = await probeChatFallback({
          baseUrl: normalizedBase,
          apiKey: apiKey ?? "",
          modelId: trimmedModelId,
          extraHeaders: { "x-api-key": apiKey ?? "", "anthropic-version": "2023-06-01" },
        });
        if (chatRes.ok) return NextResponse.json({ valid: true, error: null, method: "chat" });
        return NextResponse.json({
          valid: false,
          error: getChatErrorMessage(chatRes.status),
          method: "chat",
        });
      }
      return NextResponse.json({ valid: false, error: getModelsErrorMessage(res.status) });
    }

    // OpenAI Compatible Validation (Default)
    const openAiBase = baseUrl.replace(/\/$/, "");
    const modelsUrl = `${openAiBase}${modelsPath || "/models"}`;
    const res = await safeOutboundFetch(modelsUrl, {
      ...SAFE_OUTBOUND_FETCH_PRESETS.validationRead,
      guard: getProviderOutboundGuard(),
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (res.ok) return NextResponse.json({ valid: true, error: null });
    if (res.status === 401 || res.status === 403) {
      return NextResponse.json({ valid: false, error: "API key unauthorized" });
    }
    if (trimmedModelId) {
      const chatRes = await probeChatFallback({
        baseUrl: openAiBase,
        apiKey: apiKey ?? "",
        modelId: trimmedModelId,
      });
      if (chatRes.ok) return NextResponse.json({ valid: true, error: null, method: "chat" });
      return NextResponse.json({
        valid: false,
        error: getChatErrorMessage(chatRes.status),
        method: "chat",
      });
    }
    return NextResponse.json({ valid: false, error: getModelsErrorMessage(res.status) });
  } catch (error) {
    const attemptedBaseUrl =
      rawBody && typeof rawBody === "object" && "baseUrl" in rawBody
        ? String((rawBody as { baseUrl?: unknown }).baseUrl || "")
        : "";
    const status = getSafeOutboundFetchErrorStatus(error);
    if (status) {
      const rawMessage = error instanceof Error ? error.message : "Validation failed";
      const message = augmentDockerLocalhostHint(error, attemptedBaseUrl, rawMessage);
      if (
        error instanceof SafeOutboundFetchError &&
        error.code === "URL_GUARD_BLOCKED" &&
        message.includes(PROVIDER_URL_BLOCKED_MESSAGE)
      ) {
        logAuditEvent({
          action: "provider.validation.ssrf_blocked",
          actor: "admin",
          target: "provider-node",
          resourceType: "provider_validation",
          status: "blocked",
          ipAddress: auditContext.ipAddress || undefined,
          requestId: auditContext.requestId,
          metadata: {
            route: "/api/provider-nodes/validate",
            reason: message,
            baseUrl: sanitizeAuditBaseUrl(attemptedBaseUrl),
          },
        });
      }
      return NextResponse.json({ error: message }, { status });
    }
    console.log("Error validating provider node:", error);
    const message = augmentDockerLocalhostHint(error, attemptedBaseUrl, "Validation failed");
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
