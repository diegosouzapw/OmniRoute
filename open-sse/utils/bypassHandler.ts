import { CORS_HEADERS } from "./cors.ts";
import { detectFormat } from "../services/provider.ts";
import { SKIP_PATTERNS } from "../config/constants.ts";
import { createNonStreamingResponse, createStreamingResponse } from "./bypassResponse.ts";

/**
 * Check for bypass patterns — return fake response without calling provider.
 *
 * Intentionally limited to Claude CLI requests only because:
 * 1. The bypass patterns (title extraction, warmup, count) are specific to
 *    Claude CLI's internal protocol — other clients don't send these patterns.
 * 2. False-positive bypasses would silently break real requests.
 * 3. The SKIP_PATTERNS config allows user-defined patterns for every client.
 *
 * @param {object} body - Request body
 * @param {string} model - Model name
 * @param {string} userAgent - User-Agent header
 * @returns {object|null} Bypass response or null to proceed normally
 */
export function handleBypassRequest(body, model, userAgent = "") {
  const normalizedUserAgent = typeof userAgent === "string" ? userAgent : "";
  if (!normalizedUserAgent.includes("claude-cli")) return null;
  if (!body.messages?.length) return null;

  const messages = body.messages;
  const getText = (content) => {
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      return content
        .filter((c) => c.type === "text")
        .map((c) => c.text)
        .join(" ");
    }
    return "";
  };

  let shouldBypass = false;

  // Pattern 1: Title extraction (assistant message = "{")
  const lastMsg = messages[messages.length - 1];
  if (lastMsg?.role === "assistant" && lastMsg.content?.[0]?.text === "{") {
    shouldBypass = true;
  }

  // Pattern 2: Warmup
  if (!shouldBypass) {
    const firstText = getText(messages[0]?.content);
    if (firstText === "Warmup") {
      shouldBypass = true;
    }
  }

  // Pattern 3: Count
  if (!shouldBypass && messages.length === 1 && messages[0]?.role === "user") {
    const firstText = getText(messages[0]?.content);
    if (firstText === "count") {
      shouldBypass = true;
    }
  }

  // Pattern 4: Skip patterns
  if (!shouldBypass && SKIP_PATTERNS?.length) {
    const userMessages = messages.filter((m) => m.role === "user");
    const userText = userMessages.map((m) => getText(m.content)).join(" ");
    if (SKIP_PATTERNS.some((p) => userText.includes(p))) {
      shouldBypass = true;
    }
  }

  // Pattern 5: Quota probe — max_tokens=1 + "quota" keyword (FCC try_quota_mock).
  if (!shouldBypass && body.max_tokens === 1) {
    const userText = messages
      .filter((m) => m.role === "user")
      .map((m) => getText(m.content))
      .join(" ")
      .toLowerCase();
    if (userText.includes("quota")) {
      shouldBypass = true;
    }
  }

  if (!shouldBypass) return null;

  const sourceFormat = detectFormat(body);
  const stream = body.stream !== false;

  return stream
    ? createStreamingResponse(sourceFormat, model)
    : createNonStreamingResponse(sourceFormat, model);
}
