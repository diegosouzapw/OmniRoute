export const REASONING_TAG_NAMES = ["think", "thinking", "thought", "internal_thought"];
export const REASONING_TAG_PATTERN = REASONING_TAG_NAMES.join("|");
// Matches complete <think>/<thinking>/<thought>/<internal_thought> blocks.
export const THINK_TAG_REGEX = new RegExp(
  `<(${REASONING_TAG_PATTERN})\\b[^>]*>([\\s\\S]*?)<\\/\\1>`,
  "gi"
);
export const REASONING_CLOSE_TAG_REGEX = new RegExp(`</(${REASONING_TAG_PATTERN})>`, "i");
export const REASONING_TAG_FRAGMENT_REGEX = new RegExp(
  `</?(${REASONING_TAG_PATTERN})\\b[^>]*>`,
  "gi"
);
export const CONTENT_OPEN_TAG_REGEX = /<content\b[^>]*>/i;
// Matches an unclosed reasoning tag at the end of a message. Some providers can
// emit malformed/open reasoning wrappers (for example "<thought\n...") before a
// tool call. Treat that tail as reasoning instead of visible assistant text.
export const UNCLOSED_REASONING_TAG_REGEX = new RegExp(
  `<(${REASONING_TAG_PATTERN})(?:\\s[^>]*)?(?:>|\\r?\\n)([\\s\\S]*)$`,
  "i"
);

// #638, #727: Collapse runs of 2+ consecutive newlines into \n\n
// Tool call responses from thinking models often accumulate excessive newlines
export const EXCESSIVE_NEWLINES = /\n{2,}/g;
export function collapseExcessiveNewlines(text: string): string {
  return text.replace(EXCESSIVE_NEWLINES, "\n\n");
}

export function cleanReasoningFragment(text: string): string {
  return text.replace(REASONING_TAG_FRAGMENT_REGEX, "").trim();
}

export function splitClosingOnlyReasoningPrefix(text: string): {
  content: string;
  thinking: string | null;
} | null {
  const closeMatch = text.match(REASONING_CLOSE_TAG_REGEX);
  if (!closeMatch || closeMatch.index === undefined || closeMatch.index === 0) return null;
  const closeIndex = closeMatch.index;

  const suffix = text.slice(closeIndex + closeMatch[0].length);
  if (!CONTENT_OPEN_TAG_REGEX.test(suffix)) return null;

  const thinking = cleanReasoningFragment(text.slice(0, closeIndex));
  if (!thinking) return null;
  return { content: suffix.trim(), thinking };
}

export function movePrefixBeforeContentTagToThinking(
  cleaned: string,
  thinkingParts: string[]
): string {
  const contentMatch = cleaned.match(CONTENT_OPEN_TAG_REGEX);
  if (!contentMatch || contentMatch.index === undefined || contentMatch.index <= 0) return cleaned;
  const contentIndex = contentMatch.index;

  const prefix = cleanReasoningFragment(cleaned.slice(0, contentIndex));
  if (prefix) thinkingParts.unshift(prefix);
  return cleaned.slice(contentIndex);
}

/**
 * Extract <think> blocks from text content and return separated parts.
 * @returns {{ content: string, thinking: string | null }}
 */
export function extractThinkingFromContent(text: string): {
  content: string;
  thinking: string | null;
} {
  if (!text || typeof text !== "string") {
    return { content: text || "", thinking: null };
  }

  const thinkingParts: string[] = [];
  let hasThinkTags = false;

  let cleaned = text.replace(THINK_TAG_REGEX, (_match, _tagName, thinkContent) => {
    hasThinkTags = true;
    const trimmed = thinkContent.trim();
    if (trimmed) {
      thinkingParts.push(trimmed);
    }
    return "";
  });

  if (!hasThinkTags) {
    const closingOnly = splitClosingOnlyReasoningPrefix(cleaned);
    if (closingOnly) {
      return closingOnly;
    }
  }

  const unclosedMatch = cleaned.match(UNCLOSED_REASONING_TAG_REGEX);
  if (unclosedMatch?.index !== undefined) {
    hasThinkTags = true;
    const reasoning = String(unclosedMatch[2] || "").trim();
    if (reasoning) thinkingParts.push(reasoning);
    const prefix = cleaned.slice(0, unclosedMatch.index);
    cleaned = /^(?:\s|§\d+§)*$/.test(prefix) ? "" : prefix;
  }

  if (!hasThinkTags) {
    return { content: text, thinking: null };
  }

  cleaned = movePrefixBeforeContentTagToThinking(cleaned, thinkingParts);

  return {
    content: cleaned.trim(),
    thinking: thinkingParts.length > 0 ? thinkingParts.join("\n\n") : null,
  };
}

export function normalizeReasoningRouteId(value: unknown): string {
  return typeof value === "string" ? value.toLowerCase() : "";
}

export function isAntigravityReasoningRoute(providerId: string, modelId: string): boolean {
  return (
    providerId.includes("antigravity") ||
    providerId === "agy" ||
    modelId.includes("antigravity/") ||
    modelId.startsWith("agy/")
  );
}

export function isTextualReasoningTagNativeRoute(providerId: string, modelId: string): boolean {
  const routeId = `${providerId}/${modelId}`;
  return (
    /deepseek[-_/]?r1\b/.test(routeId) ||
    /r1[-_/]?distill\b/.test(routeId) ||
    /(?:^|[/:_-])qwq(?:[/._:-]|$)/.test(routeId) ||
    // 9router#2231: MiniMax M3 leaks raw <think>...</think> into `content` on its
    // OpenAI-format provider tiers (trae, huggingchat, bazaarlink, ollama-cloud,
    // opencode, cline, opencode-zen, codebuddy-cn). The direct minimax/minimax-cn
    // tiers stay on Anthropic's Messages format (targetFormat: "claude") and
    // already surface reasoning natively, so they are excluded here.
    (providerId !== "minimax" && providerId !== "minimax-cn" && /minimax[-_]?m3\b/.test(routeId))
  );
}

export function shouldParseTextualReasoningTags(provider?: unknown, model?: unknown): boolean {
  const providerId = normalizeReasoningRouteId(provider);
  const modelId = normalizeReasoningRouteId(model);
  return (
    !isAntigravityReasoningRoute(providerId, modelId) &&
    isTextualReasoningTagNativeRoute(providerId, modelId)
  );
}
