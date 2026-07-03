// Pure, stateless helpers for the OpenAI Responses <-> Chat response translator.
// Extracted verbatim from response/openai-responses.ts (no host imports, no stream state).

export function normalizeToolName(value) {
  return typeof value === "string" ? value.trim() : "";
}

export function stripEmptyOptionalToolArgs(value, toolName) {
  if (value == null) return value;

  if (typeof value === "string") {
    // JSON-string cleanup is intentionally scoped to Claude Code's Read tool.
    // For arbitrary tools, empty strings/arrays may be valid user payloads.
    if (toolName !== "Read") return value;
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed) || typeof parsed !== "object" || parsed === null) return value;
      const cleaned = stripEmptyOptionalToolArgs(parsed, toolName);
      return JSON.stringify(cleaned ?? {});
    } catch {
      return value;
    }
  }

  if (Array.isArray(value) || typeof value !== "object") return value;

  const cleaned = { ...value };
  for (const [key, entry] of Object.entries(cleaned)) {
    if (entry === "" || (Array.isArray(entry) && entry.length === 0)) {
      delete cleaned[key];
    }
  }
  return cleaned;
}

export function normalizeOutputIndex(outputIndex) {
  const normalized = Number(outputIndex);
  return Number.isInteger(normalized) && normalized >= 0 ? normalized : 0;
}

export function normalizeUpstreamFailure(data, fallbackType = "server_error") {
  const response = data?.response && typeof data.response === "object" ? data.response : null;
  const error =
    response?.error && typeof response.error === "object"
      ? response.error
      : data?.error && typeof data.error === "object"
        ? data.error
        : null;

  const code = typeof error?.code === "string" ? error.code : "";
  const message =
    typeof error?.message === "string"
      ? error.message
      : typeof data?.message === "string"
        ? data.message
        : "Upstream failure";

  // Preserve upstream error semantics:
  // - context_length_exceeded → 400 (client can retry with smaller context)
  // - rate_limit_exceeded → 429 (client should back off)
  // - Everything else → 502 (upstream failure)
  const isContextOverflow = code === "context_length_exceeded";
  const isRateLimit = code === "rate_limit_exceeded" || code === "rate_limited";
  let status: number;
  let type: string;
  if (isRateLimit) {
    status = 429;
    type = "rate_limit_error";
  } else if (isContextOverflow) {
    status = 400;
    type = "invalid_request_error";
  } else {
    status = 502;
    type = fallbackType;
  }

  return {
    status,
    type,
    code: code || (isRateLimit ? "rate_limit_exceeded" : "bad_gateway"),
    message,
  };
}

export function extractResponsesReasoningSummaryText(item) {
  if (!item || !Array.isArray(item.summary)) return "";
  return item.summary
    .map((part) =>
      part && typeof part === "object" && typeof part.text === "string" ? part.text : ""
    )
    .join("");
}
