import { getPendingById } from "@/lib/usage/usageHistory";
import { sanitizeErrorMessage } from "./error.ts";

type JsonRecord = Record<string, unknown>;

type HeaderInput =
  | Headers
  | Record<string, unknown>
  | { entries?: () => IterableIterator<[string, string]> }
  | null
  | undefined;

export type RequestPipelinePayloads = {
  clientRawRequest?: JsonRecord;
  openaiRequest?: JsonRecord;
  providerRequest?: JsonRecord;
  providerResponse?: JsonRecord;
  clientResponse?: JsonRecord;
  error?: JsonRecord;
  streamChunks?: {
    provider?: string[];
    openai?: string[];
    client?: string[];
  };
};

type RequestLogger = {
  sessionPath: null;
  logClientRawRequest: (endpoint: unknown, body: unknown, headers?: HeaderInput) => void;
  logOpenAIRequest: (body: unknown) => void;
  logTargetRequest: (url: unknown, headers: HeaderInput, body: unknown) => void;
  logProviderResponse: (
    status: unknown,
    statusText: unknown,
    headers: HeaderInput,
    body: unknown
  ) => void;
  appendProviderChunk: (chunk: string) => void;
  appendOpenAIChunk: (chunk: string) => void;
  logConvertedResponse: (body: unknown) => void;
  appendConvertedChunk: (chunk: string) => void;
  logError: (error: unknown, requestBody?: unknown) => void;
  getPipelinePayloads: () => RequestPipelinePayloads | null;
};

type RequestLoggerOptions = {
  enabled?: boolean;
  captureStreamChunks?: boolean;
  maxStreamChunkBytes?: number;
  maxStreamChunkItems?: number;
  requestId?: string | null;
  model?: string;
  provider?: string;
  connectionId?: string | null;
};

const DEFAULT_MAX_STREAM_CHUNK_BYTES = 128 * 1024;
const DEFAULT_MAX_STREAM_CHUNK_ITEMS = 10_240;
const MAX_LOG_STRING_LENGTH = 64 * 1024;
export const MAX_LOG_ARRAY_ITEMS = 24;
const MAX_LOG_OBJECT_KEYS = 80;

function maskSensitiveHeaders(headers: HeaderInput): Record<string, unknown> {
  if (!headers) return {};

  const headerEntries =
    typeof (headers as Headers).entries === "function"
      ? Object.fromEntries((headers as Headers).entries())
      : { ...(headers as Record<string, unknown>) };

  const masked = { ...headerEntries };
  const sensitiveKeys = ["authorization", "x-api-key", "cookie", "token"];

  for (const key of Object.keys(masked)) {
    const lowerKey = key.toLowerCase();
    // Whitelist x-ratelimit- headers from redaction
    if (lowerKey.startsWith("x-ratelimit-")) {
      continue;
    }
    if (!sensitiveKeys.some((candidate) => lowerKey.includes(candidate))) {
      continue;
    }

    const value = masked[key];
    if (typeof value === "string" && value.length > 20) {
      masked[key] = `${value.slice(0, 10)}...${value.slice(-5)}`;
    } else if (value) {
      masked[key] = "[REDACTED]";
    }
  }

  return masked;
}

function createEmptyStreamChunks() {
  return {
    provider: [] as string[],
    openai: [] as string[],
    client: [] as string[],
  };
}

function truncateLogString(value: string, maxLength = MAX_LOG_STRING_LENGTH): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, Math.floor(maxLength / 2))}\n[...truncated ${value.length - maxLength} chars...]\n${value.slice(-Math.ceil(maxLength / 2))}`;
}

/**
 * Recursively clone `value` for logging, with size bounds applied:
 * - Arrays longer than MAX_LOG_ARRAY_ITEMS are truncated to the tail with a
 *   sentinel marker prepended.
 * - The `tools` field is exempt from array truncation: the full tool inventory
 *   is debug-critical for understanding which tools the model had access to,
 *   and individual tool descriptions are independently bounded by
 *   truncateLogString, so the total size remains naturally capped.
 *
 * The optional `key` parameter carries the parent object's field name when
 * recursing into an object's values, enabling the per-field exemption above.
 * Top-level arrays (no key context) remain subject to truncation.
 */
export function cloneBoundedForLog(value: unknown, depth = 0, key: string | null = null): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === "string") return truncateLogString(value);
  if (typeof value !== "object") return value;
  if (depth >= 6) return "[MaxDepth]";

  if (Array.isArray(value)) {
    const exempt = key === "tools";
    const shouldTruncate = !exempt && value.length > MAX_LOG_ARRAY_ITEMS;
    const source = shouldTruncate ? value.slice(-MAX_LOG_ARRAY_ITEMS) : value;
    const mapped = source.map((item) => cloneBoundedForLog(item, depth + 1));
    if (shouldTruncate) {
      return [
        {
          _omniroute_truncated_array: true,
          originalLength: value.length,
          retainedTailItems: MAX_LOG_ARRAY_ITEMS,
        },
        ...mapped,
      ];
    }
    return mapped;
  }

  const result: JsonRecord = {};
  const entries = Object.entries(value as JsonRecord);
  for (const [k, item] of entries.slice(0, MAX_LOG_OBJECT_KEYS)) {
    result[k] = cloneBoundedForLog(item, depth + 1, k);
  }
  if (entries.length > MAX_LOG_OBJECT_KEYS) {
    result._omniroute_truncated_keys = entries.length - MAX_LOG_OBJECT_KEYS;
  }
  return result;
}

function appendBoundedChunk(
  chunks: string[],
  bytes: { value: number; truncated: boolean },
  chunk: string,
  maxBytes: number,
  maxItems = DEFAULT_MAX_STREAM_CHUNK_ITEMS
) {
  if (typeof chunk !== "string" || chunk.length === 0) {
    return;
  }
  if (chunks.length >= maxItems) {
    bytes.truncated = true;
    chunks[maxItems - 1] = `[stream chunk log truncated after ${maxItems} chunks]`;
    return;
  }
  if (bytes.value >= maxBytes) {
    bytes.truncated = true;
    return;
  }

  const remaining = maxBytes - bytes.value;
  if (chunk.length <= remaining) {
    chunks.push(chunk);
    bytes.value += chunk.length;
    return;
  }

  chunks.push(chunk.slice(0, remaining));
  if (chunks.length < maxItems) {
    chunks.push(`[stream chunk log truncated after ${maxBytes} bytes]`);
  }
  bytes.value = maxBytes;
  bytes.truncated = true;
}

function hasOwnValues(value: unknown): boolean {
  return Boolean(value && typeof value === "object" && Object.keys(value as JsonRecord).length > 0);
}

function compactPipelinePayloads(
  payloads: RequestPipelinePayloads
): RequestPipelinePayloads | null {
  const result: RequestPipelinePayloads = {};

  for (const [key, value] of Object.entries(payloads)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (key === "streamChunks" && value && typeof value === "object") {
      const chunkRecord = value as Record<string, unknown>;
      const compactedChunks = Object.fromEntries(
        Object.entries(chunkRecord).filter(
          ([, chunkValue]) => Array.isArray(chunkValue) && chunkValue.length > 0
        )
      );
      if (Object.keys(compactedChunks).length > 0) {
        result.streamChunks = compactedChunks;
      }
      continue;
    }

    result[key as keyof RequestPipelinePayloads] = value;
  }

  return hasOwnValues(result) ? result : null;
}
function makeStreamChunkMethods(options: RequestLoggerOptions, captureChunks: boolean) {
  const streamChunks = createEmptyStreamChunks();
  const streamChunkBytes = {
    provider: { value: 0, truncated: false },
    openai: { value: 0, truncated: false },
    client: { value: 0, truncated: false },
  };
  const maxBytes =
    Number.isInteger(options.maxStreamChunkBytes) && Number(options.maxStreamChunkBytes) > 0
      ? Number(options.maxStreamChunkBytes)
      : DEFAULT_MAX_STREAM_CHUNK_BYTES;
  const maxItems =
    Number.isInteger(options.maxStreamChunkItems) && Number(options.maxStreamChunkItems) > 0
      ? Number(options.maxStreamChunkItems)
      : DEFAULT_MAX_STREAM_CHUNK_ITEMS;
  let pendingPushed = false;

  const push = () => {
    if (pendingPushed) return;
    if (!options.requestId && (!options.connectionId || !options.model)) return;
    pendingPushed = true;
    try {
      const pending = getPendingById();
      const exactEntry = options.requestId ? pending.get(options.requestId) : null;
      if (exactEntry) {
        exactEntry.streamChunks = { ...streamChunks };
        return;
      }

      for (const entry of pending.values()) {
        if (
          entry?.connectionId === options.connectionId &&
          entry?.model === options.model &&
          entry?.provider === (options.provider || "")
        ) {
          entry.streamChunks = { ...streamChunks };
          return;
        }
      }
    } catch (e) {
      // Do not allow logging failures to disrupt request handling
      try {
        console.warn("[requestLogger] updatePendingRequestStreamChunks failed:", e);
      } catch {}
    }
  };

  const append = (arr: string[], bytes: { value: number; truncated: boolean }, chunk: string) => {
    if (!captureChunks) return;
    push();
    appendBoundedChunk(arr, bytes, chunk, maxBytes, maxItems);
  };

  return {
    streamChunks,
    streamChunkBytes,
    appendProviderChunk(chunk: string) {
      append(streamChunks.provider, streamChunkBytes.provider, chunk);
    },
    appendOpenAIChunk(chunk: string) {
      append(streamChunks.openai, streamChunkBytes.openai, chunk);
    },
    appendConvertedChunk(chunk: string) {
      append(streamChunks.client, streamChunkBytes.client, chunk);
    },
  };
}

export async function createRequestLogger(
  _sourceFormat?: string,
  _targetFormat?: string,
  _model?: string,
  options: RequestLoggerOptions = {}
): Promise<RequestLogger> {
  const captureStreamChunks = options.captureStreamChunks !== false;
  // Stream chunk capture is always set up — even when the logger is disabled,
  // so that active requests always have real-time stream data available via
  // the /api/logs/active endpoint.
  const chunkMethods = makeStreamChunkMethods(options, captureStreamChunks);

  if (options.enabled === false) {
    return {
      sessionPath: null,
      logClientRawRequest() {},
      logOpenAIRequest() {},
      logTargetRequest() {},
      logProviderResponse() {},
      appendProviderChunk: chunkMethods.appendProviderChunk,
      appendOpenAIChunk: chunkMethods.appendOpenAIChunk,
      logConvertedResponse() {},
      appendConvertedChunk: chunkMethods.appendConvertedChunk,
      logError() {},
      getPipelinePayloads() {
        return null;
      },
    };
  }

  const payloads: RequestPipelinePayloads = {
    ...(captureStreamChunks ? { streamChunks: chunkMethods.streamChunks } : {}),
  };

  return {
    sessionPath: null,

    logClientRawRequest(endpoint, body, headers = {}) {
      payloads.clientRawRequest = {
        timestamp: new Date().toISOString(),
        endpoint,
        headers: maskSensitiveHeaders(headers),
        body: cloneBoundedForLog(body),
      };
    },

    logOpenAIRequest(body) {
      payloads.openaiRequest = {
        timestamp: new Date().toISOString(),
        body: cloneBoundedForLog(body),
      };
    },

    logTargetRequest(url, headers, body) {
      payloads.providerRequest = {
        timestamp: new Date().toISOString(),
        url,
        headers: maskSensitiveHeaders(headers),
        body: cloneBoundedForLog(body),
      };
    },

    logProviderResponse(status, statusText, headers, body) {
      payloads.providerResponse = {
        timestamp: new Date().toISOString(),
        status,
        statusText,
        headers: maskSensitiveHeaders(headers),
        body: cloneBoundedForLog(body),
      };
    },

    appendProviderChunk: chunkMethods.appendProviderChunk,
    appendOpenAIChunk: chunkMethods.appendOpenAIChunk,
    logConvertedResponse(body) {
      payloads.clientResponse = {
        timestamp: new Date().toISOString(),
        body: cloneBoundedForLog(body),
      };
    },
    appendConvertedChunk: chunkMethods.appendConvertedChunk,

    logError(error, requestBody = null) {
      payloads.error = {
        timestamp: new Date().toISOString(),
        error: sanitizeErrorMessage(error instanceof Error ? error.message : String(error)),
        requestBody: cloneBoundedForLog(requestBody),
      };
    },

    getPipelinePayloads() {
      return compactPipelinePayloads(payloads);
    },
  };
}
