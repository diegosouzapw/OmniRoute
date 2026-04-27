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
};

const DEFAULT_MAX_STREAM_CHUNK_BYTES = 128 * 1024;
const MAX_LOG_STRING_LENGTH = 64 * 1024;
const MAX_LOG_ARRAY_ITEMS = 24;
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

function cloneBoundedForLog(value: unknown, depth = 0): unknown {
  if (value === null || value === undefined) return value;
  if (typeof value === "string") return truncateLogString(value);
  if (typeof value !== "object") return value;
  if (depth >= 6) return "[MaxDepth]";

  if (Array.isArray(value)) {
    const source = value.length > MAX_LOG_ARRAY_ITEMS ? value.slice(-MAX_LOG_ARRAY_ITEMS) : value;
    const mapped = source.map((item) => cloneBoundedForLog(item, depth + 1));
    if (value.length > MAX_LOG_ARRAY_ITEMS) {
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
  for (const [key, item] of entries.slice(0, MAX_LOG_OBJECT_KEYS)) {
    result[key] = cloneBoundedForLog(item, depth + 1);
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
  maxBytes: number
) {
  if (typeof chunk !== "string" || chunk.length === 0) {
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
  chunks.push(`[stream chunk log truncated after ${maxBytes} bytes]`);
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
        result.streamChunks = compactedChunks as RequestPipelinePayloads["streamChunks"];
      }
      continue;
    }

    result[key as keyof RequestPipelinePayloads] = value as never;
  }

  return hasOwnValues(result) ? result : null;
}

function createNoOpLogger(): RequestLogger {
  return {
    sessionPath: null,
    logClientRawRequest() {},
    logOpenAIRequest() {},
    logTargetRequest() {},
    logProviderResponse() {},
    appendProviderChunk() {},
    appendOpenAIChunk() {},
    logConvertedResponse() {},
    appendConvertedChunk() {},
    logError() {},
    getPipelinePayloads() {
      return null;
    },
  };
}

export async function createRequestLogger(
  _sourceFormat?: string,
  _targetFormat?: string,
  _model?: string,
  options: RequestLoggerOptions = {}
): Promise<RequestLogger> {
  if (options.enabled === false) {
    return createNoOpLogger();
  }

  const captureStreamChunks = options.captureStreamChunks !== false;
  const maxStreamChunkBytes =
    Number.isInteger(options.maxStreamChunkBytes) && Number(options.maxStreamChunkBytes) > 0
      ? Number(options.maxStreamChunkBytes)
      : DEFAULT_MAX_STREAM_CHUNK_BYTES;
  const streamChunks = createEmptyStreamChunks();
  const streamChunkBytes = {
    provider: { value: 0, truncated: false },
    openai: { value: 0, truncated: false },
    client: { value: 0, truncated: false },
  };
  const payloads: RequestPipelinePayloads = {
    ...(captureStreamChunks ? { streamChunks } : {}),
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

    appendProviderChunk(chunk) {
      if (!captureStreamChunks) return;
      appendBoundedChunk(
        streamChunks.provider,
        streamChunkBytes.provider,
        chunk,
        maxStreamChunkBytes
      );
    },

    appendOpenAIChunk(chunk) {
      if (!captureStreamChunks) return;
      appendBoundedChunk(streamChunks.openai, streamChunkBytes.openai, chunk, maxStreamChunkBytes);
    },

    logConvertedResponse(body) {
      payloads.clientResponse = {
        timestamp: new Date().toISOString(),
        body: cloneBoundedForLog(body),
      };
    },

    appendConvertedChunk(chunk) {
      if (!captureStreamChunks) return;
      appendBoundedChunk(streamChunks.client, streamChunkBytes.client, chunk, maxStreamChunkBytes);
    },

    logError(error, requestBody = null) {
      payloads.error = {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        requestBody: cloneBoundedForLog(requestBody),
      };
    },

    getPipelinePayloads() {
      return compactPipelinePayloads(payloads);
    },
  };
}

export function logError(_provider: string, _entry: unknown) {}
