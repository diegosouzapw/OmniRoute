type JsonRecord = Record<string, unknown>;

type RememberedFunctionCall = {
  call_id: string;
  name: string;
  arguments: string;
};

type RememberedResponseToolState = {
  functionCalls: RememberedFunctionCall[];
  conversationItems: unknown[];
  expiresAt: number;
  updatedAt: number;
};

type RememberedFunctionCallByIdState = RememberedFunctionCall & {
  expiresAt: number;
  updatedAt: number;
};

const RESPONSE_TOOL_CALL_TTL_MS = 30 * 60 * 1000;
const RESPONSE_TOOL_CALL_CACHE_MAX_ENTRIES = 512;

const rememberedResponseToolCalls = new Map<string, RememberedResponseToolState>();
const rememberedFunctionCallsById = new Map<string, RememberedFunctionCallByIdState>();

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function isResponsesMessageItem(record: JsonRecord): boolean {
  return record.type === "message" || (!record.type && typeof record.role === "string");
}

function isInternalAssistantMessage(record: JsonRecord): boolean {
  if (!isResponsesMessageItem(record)) return false;
  if (record.role !== "assistant") return false;

  const phase = typeof record.phase === "string" ? record.phase.trim().toLowerCase() : "";
  if (!phase) return false;

  // OpenCode can send assistant-side commentary/analysis frames in Responses
  // shape. Those frames are local runtime state, not durable conversation turns
  // for Codex replay. Re-injecting them makes the model continue hidden notes.
  return phase !== "final";
}

function sanitizeRememberedConversationItems(items: readonly unknown[]): unknown[] {
  const sanitized: unknown[] = [];

  for (const item of items) {
    const record = toRecord(item);
    if (record && isInternalAssistantMessage(record)) {
      continue;
    }

    sanitized.push(structuredClone(item));
  }

  return sanitized;
}

function cleanupRememberedResponseToolCalls(now: number = Date.now()) {
  for (const [responseId, entry] of rememberedResponseToolCalls.entries()) {
    if (entry.expiresAt <= now) {
      rememberedResponseToolCalls.delete(responseId);
    }
  }

  for (const [callId, entry] of rememberedFunctionCallsById.entries()) {
    if (entry.expiresAt <= now) {
      rememberedFunctionCallsById.delete(callId);
    }
  }

  if (rememberedResponseToolCalls.size <= RESPONSE_TOOL_CALL_CACHE_MAX_ENTRIES) {
    if (rememberedFunctionCallsById.size <= RESPONSE_TOOL_CALL_CACHE_MAX_ENTRIES) {
      return;
    }
  }

  if (rememberedResponseToolCalls.size > RESPONSE_TOOL_CALL_CACHE_MAX_ENTRIES) {
    const oldestEntries = [...rememberedResponseToolCalls.entries()].sort(
      (a, b) => a[1].updatedAt - b[1].updatedAt
    );

    while (rememberedResponseToolCalls.size > RESPONSE_TOOL_CALL_CACHE_MAX_ENTRIES) {
      const oldest = oldestEntries.shift();
      if (!oldest) break;
      rememberedResponseToolCalls.delete(oldest[0]);
    }
  }

  if (rememberedFunctionCallsById.size > RESPONSE_TOOL_CALL_CACHE_MAX_ENTRIES) {
    const oldestCallEntries = [...rememberedFunctionCallsById.entries()].sort(
      (a, b) => a[1].updatedAt - b[1].updatedAt
    );

    while (rememberedFunctionCallsById.size > RESPONSE_TOOL_CALL_CACHE_MAX_ENTRIES) {
      const oldest = oldestCallEntries.shift();
      if (!oldest) break;
      rememberedFunctionCallsById.delete(oldest[0]);
    }
  }
}

export function rememberResponseFunctionCalls(
  responseId: unknown,
  outputItems: readonly unknown[]
) {
  const normalizedResponseId = typeof responseId === "string" ? responseId.trim() : "";
  if (!normalizedResponseId || !Array.isArray(outputItems) || outputItems.length === 0) {
    return;
  }

  const existingEntry = rememberedResponseToolCalls.get(normalizedResponseId);

  const functionCalls: RememberedFunctionCall[] = [];

  for (const item of outputItems) {
    const record = toRecord(item);
    if (!record || record.type !== "function_call") continue;

    const callId = typeof record.call_id === "string" ? record.call_id.trim() : "";
    const name = typeof record.name === "string" ? record.name.trim() : "";
    const argumentsValue =
      typeof record.arguments === "string"
        ? record.arguments
        : JSON.stringify(record.arguments ?? {});

    if (!callId || !name) continue;

    functionCalls.push({
      call_id: callId,
      name,
      arguments: argumentsValue,
    });
  }

  if (functionCalls.length === 0) {
    return;
  }

  cleanupRememberedResponseToolCalls();

  const now = Date.now();
  for (const functionCall of functionCalls) {
    rememberedFunctionCallsById.set(functionCall.call_id, {
      ...functionCall,
      updatedAt: now,
      expiresAt: now + RESPONSE_TOOL_CALL_TTL_MS,
    });
  }

  rememberedResponseToolCalls.set(normalizedResponseId, {
    functionCalls,
    conversationItems: sanitizeRememberedConversationItems(existingEntry?.conversationItems || []),
    updatedAt: now,
    expiresAt: now + RESPONSE_TOOL_CALL_TTL_MS,
  });
}

export function rememberResponseConversationState(
  responseId: unknown,
  requestInput: readonly unknown[],
  outputItems: readonly unknown[]
) {
  const normalizedResponseId = typeof responseId === "string" ? responseId.trim() : "";
  if (!normalizedResponseId) {
    return;
  }

  const normalizedRequestInput = Array.isArray(requestInput) ? requestInput : [];
  const normalizedOutputItems = Array.isArray(outputItems) ? outputItems : [];
  const conversationItems = sanitizeRememberedConversationItems([
    ...normalizedRequestInput,
    ...normalizedOutputItems,
  ]);
  if (conversationItems.length === 0) {
    return;
  }

  cleanupRememberedResponseToolCalls();

  const existingEntry = rememberedResponseToolCalls.get(normalizedResponseId);
  rememberedResponseToolCalls.set(normalizedResponseId, {
    functionCalls: existingEntry?.functionCalls?.map((functionCall) => ({ ...functionCall })) || [],
    conversationItems,
    updatedAt: Date.now(),
    expiresAt: Date.now() + RESPONSE_TOOL_CALL_TTL_MS,
  });
}

export function getRememberedResponseFunctionCalls(responseId: unknown): RememberedFunctionCall[] {
  cleanupRememberedResponseToolCalls();

  const normalizedResponseId = typeof responseId === "string" ? responseId.trim() : "";
  if (!normalizedResponseId) {
    return [];
  }

  const entry = rememberedResponseToolCalls.get(normalizedResponseId);
  if (!entry) {
    return [];
  }

  return entry.functionCalls.map((functionCall) => ({ ...functionCall }));
}

export function getRememberedResponseConversationItems(responseId: unknown): unknown[] {
  cleanupRememberedResponseToolCalls();

  const normalizedResponseId = typeof responseId === "string" ? responseId.trim() : "";
  if (!normalizedResponseId) {
    return [];
  }

  const entry = rememberedResponseToolCalls.get(normalizedResponseId);
  if (!entry) {
    return [];
  }

  return sanitizeRememberedConversationItems(entry.conversationItems);
}

export function getRememberedFunctionCallsByIds(
  callIds: readonly string[]
): RememberedFunctionCall[] {
  cleanupRememberedResponseToolCalls();

  if (!Array.isArray(callIds) || callIds.length === 0) {
    return [];
  }

  const remembered: RememberedFunctionCall[] = [];
  for (const rawCallId of callIds) {
    const callId = typeof rawCallId === "string" ? rawCallId.trim() : "";
    if (!callId) continue;
    const entry = rememberedFunctionCallsById.get(callId);
    if (!entry) continue;
    remembered.push({
      call_id: entry.call_id,
      name: entry.name,
      arguments: entry.arguments,
    });
  }

  return remembered;
}

export function clearRememberedResponseFunctionCallsForTesting() {
  rememberedResponseToolCalls.clear();
  rememberedFunctionCallsById.clear();
}
