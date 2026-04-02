type ResponsesStateEntry = {
  responseId: string;
  updatedAt: number;
};

type ClaudeMessage = {
  role?: string;
  content?: unknown;
};

const SESSION_TTL_MS = 30 * 60 * 1000;
const UNSUPPORTED_PREVIOUS_RESPONSE_ID_PROVIDERS = new Set(["codex"]);

declare global {
  var __omnirouteResponsesState:
    | {
        entries: Map<string, ResponsesStateEntry>;
        cleanupTimer: ReturnType<typeof setInterval> | null;
      }
    | undefined;
}

function getState() {
  if (!globalThis.__omnirouteResponsesState) {
    const entries = new Map<string, ResponsesStateEntry>();
    const cleanupTimer = setInterval(() => {
      const cutoff = Date.now() - SESSION_TTL_MS;
      for (const [sessionId, entry] of entries) {
        if (entry.updatedAt < cutoff) {
          entries.delete(sessionId);
        }
      }
    }, 60_000);
    cleanupTimer.unref?.();
    globalThis.__omnirouteResponsesState = { entries, cleanupTimer };
  }
  return globalThis.__omnirouteResponsesState;
}

function cloneJson<T>(value: T): T {
  return value === undefined ? value : JSON.parse(JSON.stringify(value));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function extractDeltaClaudeMessages(messages: ClaudeMessage[]): ClaudeMessage[] | null {
  let lastAssistantIndex = -1;
  for (let i = messages.length - 1; i >= 0; i -= 1) {
    if (messages[i]?.role === "assistant") {
      lastAssistantIndex = i;
      break;
    }
  }

  if (lastAssistantIndex === -1) return null;

  const delta = messages.slice(lastAssistantIndex + 1).filter(Boolean);
  return delta.length > 0 ? delta : null;
}

export function getPreviousResponseId(sessionId: string | null | undefined): string | null {
  if (!sessionId) return null;
  const entry = getState().entries.get(sessionId);
  if (!entry) return null;
  if (Date.now() - entry.updatedAt > SESSION_TTL_MS) {
    getState().entries.delete(sessionId);
    return null;
  }
  return entry.responseId;
}

export function rememberPreviousResponseId(
  sessionId: string | null | undefined,
  responseId: string | null | undefined
): void {
  const cleanSessionId = typeof sessionId === "string" ? sessionId.trim() : "";
  const cleanResponseId = typeof responseId === "string" ? responseId.trim() : "";
  if (!cleanSessionId || !cleanResponseId) return;

  getState().entries.set(cleanSessionId, {
    responseId: cleanResponseId,
    updatedAt: Date.now(),
  });
}

export function clearPreviousResponseId(sessionId: string | null | undefined): void {
  if (!sessionId) return;
  getState().entries.delete(sessionId);
}

export function extractResponsesResponseId(payload: unknown): string | null {
  if (!isRecord(payload)) return null;

  if (typeof payload.id === "string" && payload.id.trim()) {
    return payload.id.trim();
  }

  if (isRecord(payload.response)) {
    const nested = extractResponsesResponseId(payload.response);
    if (nested) return nested;
  }

  if (isRecord(payload.summary)) {
    const nested = extractResponsesResponseId(payload.summary);
    if (nested) return nested;
  }

  return null;
}

export function supportsPreviousResponseId(provider: string | null | undefined): boolean {
  const normalizedProvider = typeof provider === "string" ? provider.trim().toLowerCase() : "";
  if (!normalizedProvider) return true;
  return !UNSUPPORTED_PREVIOUS_RESPONSE_ID_PROVIDERS.has(normalizedProvider);
}

export function buildStatefulResponsesBody(
  body: Record<string, unknown> | null | undefined,
  sessionId: string | null | undefined
): {
  body: Record<string, unknown>;
  previousResponseId: string | null;
  trimmedMessages: boolean;
} {
  const cloned = cloneJson(body || {});
  const previousResponseId = getPreviousResponseId(sessionId);
  const result: Record<string, unknown> = {
    ...cloned,
    store: true,
  };

  if (!previousResponseId) {
    return { body: result, previousResponseId: null, trimmedMessages: false };
  }

  result.previous_response_id = previousResponseId;

  if (Array.isArray(cloned.messages)) {
    const deltaMessages = extractDeltaClaudeMessages(cloned.messages as ClaudeMessage[]);
    if (deltaMessages) {
      result.messages = cloneJson(deltaMessages);
      return { body: result, previousResponseId, trimmedMessages: true };
    }
  }

  return { body: result, previousResponseId, trimmedMessages: false };
}
