type JsonRecord = Record<string, unknown>;

type RememberedFunctionCall = {
  call_id: string;
  name: string;
  arguments: string;
};

type RememberedResponseToolState = {
  functionCalls: RememberedFunctionCall[];
  expiresAt: number;
  updatedAt: number;
};

const RESPONSE_TOOL_CALL_TTL_MS = 30 * 60 * 1000;
const RESPONSE_TOOL_CALL_CACHE_MAX_ENTRIES = 512;

const rememberedResponseToolCalls = new Map<string, RememberedResponseToolState>();

function toRecord(value: unknown): JsonRecord | null {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : null;
}

function cleanupRememberedResponseToolCalls(now: number = Date.now()) {
  for (const [responseId, entry] of rememberedResponseToolCalls.entries()) {
    if (entry.expiresAt <= now) {
      rememberedResponseToolCalls.delete(responseId);
    }
  }

  if (rememberedResponseToolCalls.size <= RESPONSE_TOOL_CALL_CACHE_MAX_ENTRIES) {
    return;
  }

  const oldestEntries = [...rememberedResponseToolCalls.entries()].sort(
    (a, b) => a[1].updatedAt - b[1].updatedAt
  );

  while (rememberedResponseToolCalls.size > RESPONSE_TOOL_CALL_CACHE_MAX_ENTRIES) {
    const oldest = oldestEntries.shift();
    if (!oldest) break;
    rememberedResponseToolCalls.delete(oldest[0]);
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

  rememberedResponseToolCalls.set(normalizedResponseId, {
    functionCalls,
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

export function clearRememberedResponseFunctionCallsForTesting() {
  rememberedResponseToolCalls.clear();
}
