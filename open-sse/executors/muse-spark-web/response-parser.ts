// Pure Meta AI SSE/JSON response parsing + content/reasoning/error extraction.
// Extracted verbatim from muse-spark-web.ts. No host state/fetch/auth.

export type MetaSseFrame = {
  event: string;
  data: string;
};

export type ParsedMetaAiResponse = {
  content: string;
  deltas: string[];
  reasoningContent: string;
  reasoningDeltas: string[];
  errorCode: string | null;
  errorMessage: string | null;
  status: number;
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

export function parseMetaSseFrames(text: string): MetaSseFrame[] {
  const frames: MetaSseFrame[] = [];
  const lines = text.split(/\r?\n/);
  let currentEvent = "message";
  let dataLines: string[] = [];

  const flush = () => {
    if (dataLines.length === 0 && currentEvent === "message") {
      return;
    }

    frames.push({
      event: currentEvent,
      data: dataLines.join("\n").trim(),
    });

    currentEvent = "message";
    dataLines = [];
  };

  for (const line of lines) {
    if (!line) {
      flush();
      continue;
    }

    if (line.startsWith(":")) {
      continue;
    }

    if (line.startsWith("event:")) {
      currentEvent = line.slice("event:".length).trim() || "message";
      continue;
    }

    if (line.startsWith("data:")) {
      dataLines.push(line.slice("data:".length).trimStart());
    }
  }

  flush();
  return frames;
}

export function readMetaJsonPayloads(text: string): Array<Record<string, unknown>> {
  const trimmed = text.trim();
  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed);
      return isRecord(parsed) ? [parsed] : [];
    } catch {
      return [];
    }
  }

  return parseMetaSseFrames(text)
    .filter((frame) => frame.data)
    .map((frame) => {
      try {
        const parsed = JSON.parse(frame.data);
        return isRecord(parsed) ? parsed : null;
      } catch {
        return null;
      }
    })
    .filter((frame): frame is Record<string, unknown> => !!frame);
}

export const META_AI_REASONING_KEYS = [
  "reasoning",
  "reasoningContent",
  "reasoning_content",
  "reasoningText",
  "thinking",
  "thinkingContent",
  "thinkingText",
  "thought",
  "thoughtText",
  "thoughts",
  "internalThoughts",
  "chainOfThought",
  "thinkingTrace",
  "thinking_trace",
] as const;

export const META_AI_NESTED_RENDERER_KEYS = [
  "contentRenderer",
  "textContent",
  "message",
  "mediaContent",
  "unified_response",
  "unifiedResponseContent",
  "sections",
  "view_model",
  "primitive",
  "primitives",
  "nested_responses",
] as const;

export function collectRendererTexts(value: unknown, seen: Set<string>, depth = 0): string[] {
  if (depth > 8) {
    return [];
  }

  if (typeof value === "string") {
    const normalized = value.trim();
    if (!normalized || seen.has(normalized)) {
      return [];
    }
    seen.add(normalized);
    return [normalized];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectRendererTexts(item, seen, depth + 1));
  }

  if (!isRecord(value)) {
    return [];
  }

  const parts: string[] = [];
  if (typeof value.text === "string") {
    parts.push(...collectRendererTexts(value.text, seen, depth + 1));
  }

  for (const key of [
    "contentRenderer",
    "textContent",
    "message",
    "mediaContent",
    "unified_response",
    "unifiedResponseContent",
    "sections",
    "view_model",
    "primitive",
    "primitives",
    "nested_responses",
  ]) {
    if (key in value) {
      parts.push(...collectRendererTexts(value[key], seen, depth + 1));
    }
  }

  return parts;
}

export function collectReasoningTexts(
  value: unknown,
  seen: Set<string>,
  depth = 0,
  force = false
): string[] {
  if (depth > 8) {
    return [];
  }

  if (typeof value === "string") {
    const normalized = value.trim();
    if (!force || !normalized || seen.has(normalized)) {
      return [];
    }
    seen.add(normalized);
    return [normalized];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectReasoningTexts(item, seen, depth + 1, force));
  }

  if (!isRecord(value)) {
    return [];
  }

  const typename = typeof value.__typename === "string" ? value.__typename : "";
  const localForce = force || /reasoning|thinking|thought/i.test(typename);
  const parts: string[] = [];

  if (typeof value.text === "string" && localForce) {
    parts.push(...collectReasoningTexts(value.text, seen, depth + 1, true));
  }

  for (const key of META_AI_REASONING_KEYS) {
    if (key in value) {
      parts.push(...collectReasoningTexts(value[key], seen, depth + 1, true));
    }
  }

  for (const key of META_AI_NESTED_RENDERER_KEYS) {
    if (key in value) {
      parts.push(...collectReasoningTexts(value[key], seen, depth + 1, localForce));
    }
  }

  return parts;
}

export function extractAssistantContent(message: Record<string, unknown>): string {
  if (typeof message.content === "string" && message.content.length > 0) {
    return message.content;
  }

  const contentRenderer = isRecord(message.contentRenderer) ? message.contentRenderer : null;
  if (!contentRenderer) {
    return "";
  }

  const parts = collectRendererTexts(contentRenderer, new Set());
  return parts.join("\n\n").trim();
}

export function extractAssistantReasoning(message: Record<string, unknown>): string {
  const parts = collectReasoningTexts(message, new Set());
  return parts.join("\n\n").trim();
}

export function extractAssistantError(message: Record<string, unknown>) {
  const error = isRecord(message.error) ? message.error : null;
  const streamingState =
    typeof message.streamingState === "string" ? message.streamingState.toUpperCase() : null;
  return {
    code: typeof error?.code === "string" ? error.code : null,
    message:
      typeof error?.message === "string"
        ? error.message.trim()
        : streamingState === "ERROR" &&
            typeof message.content === "string" &&
            message.content.trim()
          ? message.content.trim()
          : null,
  };
}

export function classifyMetaAiError(errorMessage: string | null, content: string) {
  const combined = `${errorMessage || ""}\n${content}`.trim();
  if (!combined) {
    return null;
  }

  if (/authentication required to send messages|login is required|sign in/i.test(combined)) {
    return {
      status: 401,
      message: "Meta AI auth failed — your meta.ai ecto_1_sess cookie may be missing or expired.",
    };
  }

  if (/limit exceeded|rate limit|too many requests/i.test(combined)) {
    return {
      status: 429,
      message: "Meta AI rate limited the session. Wait a moment and retry.",
    };
  }

  if (/blocked by our security system|security system/i.test(combined)) {
    return {
      status: 403,
      message:
        "Meta AI blocked the request through its web security checks. Refresh the session cookie and retry.",
    };
  }

  return null;
}

export function parseMetaAiResponseText(
  text: string,
  isThinkingModel: boolean
): ParsedMetaAiResponse {
  let lastContent = "";
  const deltas: string[] = [];
  let lastReasoning = "";
  const reasoningDeltas: string[] = [];
  let errorCode: string | null = null;
  let errorMessage: string | null = null;

  for (const payload of readMetaJsonPayloads(text)) {
    if (Array.isArray(payload.errors) && payload.errors.length > 0) {
      const firstError = payload.errors.find(
        (item) => isRecord(item) && typeof item.message === "string"
      );
      if (isRecord(firstError) && typeof firstError.message === "string") {
        errorMessage = firstError.message.trim();
      }
    }

    const data = isRecord(payload.data) ? payload.data : null;
    const sendMessageStream = isRecord(data?.sendMessageStream) ? data?.sendMessageStream : null;
    if (!sendMessageStream || sendMessageStream.__typename !== "AssistantMessage") {
      continue;
    }

    const content = extractAssistantContent(sendMessageStream);
    if (content && content !== lastContent) {
      deltas.push(content.startsWith(lastContent) ? content.slice(lastContent.length) : content);
      lastContent = content;
    }

    if (isThinkingModel) {
      const reasoning = extractAssistantReasoning(sendMessageStream);
      if (reasoning && reasoning !== content && reasoning !== lastReasoning) {
        reasoningDeltas.push(
          reasoning.startsWith(lastReasoning) ? reasoning.slice(lastReasoning.length) : reasoning
        );
        lastReasoning = reasoning;
      }
    }

    const upstreamError = extractAssistantError(sendMessageStream);
    if (upstreamError.message) {
      errorMessage = upstreamError.message;
      errorCode = upstreamError.code;
    }
  }

  const classifiedError = classifyMetaAiError(errorMessage, lastContent);
  if (classifiedError) {
    return {
      content: lastContent,
      deltas,
      reasoningContent: lastReasoning,
      reasoningDeltas,
      errorCode,
      errorMessage: classifiedError.message,
      status: classifiedError.status,
    };
  }

  if (errorMessage) {
    return {
      content: lastContent,
      deltas,
      reasoningContent: lastReasoning,
      reasoningDeltas,
      errorCode,
      errorMessage: `Meta AI returned an error: ${errorMessage}`,
      status: 502,
    };
  }

  if (!lastContent) {
    return {
      content: "",
      deltas: [],
      reasoningContent: lastReasoning,
      reasoningDeltas,
      errorCode: null,
      errorMessage: "Meta AI returned no assistant content",
      status: 502,
    };
  }

  return {
    content: lastContent,
    deltas: deltas.filter((delta) => delta.length > 0),
    reasoningContent: lastReasoning,
    reasoningDeltas: reasoningDeltas.filter((delta) => delta.length > 0),
    errorCode: null,
    errorMessage: null,
    status: 200,
  };
}
