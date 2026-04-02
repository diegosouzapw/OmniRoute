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
  _model?: string
): Promise<RequestLogger> {
  const streamChunks = createEmptyStreamChunks();
  const payloads: RequestPipelinePayloads = {
    streamChunks,
  };

  return {
    sessionPath: null,

    logClientRawRequest(endpoint, body, headers = {}) {
      payloads.clientRawRequest = {
        timestamp: new Date().toISOString(),
        endpoint,
        headers: maskSensitiveHeaders(headers),
        body,
      };
    },

    logOpenAIRequest(body) {
      payloads.openaiRequest = {
        timestamp: new Date().toISOString(),
        body,
      };
    },

    logTargetRequest(url, headers, body) {
      payloads.providerRequest = {
        timestamp: new Date().toISOString(),
        url,
        headers: maskSensitiveHeaders(headers),
        body,
      };
    },

    logProviderResponse(status, statusText, headers, body) {
      payloads.providerResponse = {
        timestamp: new Date().toISOString(),
        status,
        statusText,
        headers: maskSensitiveHeaders(headers),
        body,
      };
    },

    appendProviderChunk(chunk) {
      if (typeof chunk === "string" && chunk.length > 0) {
        streamChunks.provider.push(chunk);
      }
    },

    appendOpenAIChunk(chunk) {
      if (typeof chunk === "string" && chunk.length > 0) {
        streamChunks.openai.push(chunk);
      }
    },

    logConvertedResponse(body) {
      payloads.clientResponse = {
        timestamp: new Date().toISOString(),
        body,
      };
    },

    appendConvertedChunk(chunk) {
      if (typeof chunk === "string" && chunk.length > 0) {
        streamChunks.client.push(chunk);
      }
    },

    logError(error, requestBody = null) {
      payloads.error = {
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        requestBody,
      };
    },

    getPipelinePayloads() {
      return compactPipelinePayloads(payloads);
    },
  };
}

export function logError(_provider: string, _entry: unknown) {}
