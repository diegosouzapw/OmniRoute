import { AsyncLocalStorage } from "node:async_hooks";

import { updatePendingScope, type PendingRequestScope } from "@/lib/usage/pendingRequestScope";

export type ProviderRequestPrepared = {
  url: string;
  headers: Record<string, string>;
  body: unknown;
  bodyString: string;
};

export type Capture = {
  capture: (request: ProviderRequestPrepared) => Promise<void> | void;
  body: (fallback: unknown) => unknown;
  latest?: () => ProviderRequestPrepared | null;
};

type RequestLoggerLike = {
  logTargetRequest: (url: unknown, headers: Record<string, string>, body: unknown) => void;
};

type WarnLog = {
  warn?: (tag: string, message: string) => void;
};

type FetchInput = Parameters<typeof fetch>[0];
type FetchInit = Parameters<typeof fetch>[1];

type CaptureState = {
  context: AsyncLocalStorage<Capture>;
  wrappedFetch: typeof fetch | null;
  wrappedInnerFetch: typeof fetch | null;
};

const CAPTURE_STATE_KEY = Symbol.for("omniroute.providerRequestCapture.state");

function getCaptureState(): CaptureState {
  const scopedGlobal = globalThis as typeof globalThis & {
    [CAPTURE_STATE_KEY]?: CaptureState;
  };

  if (!scopedGlobal[CAPTURE_STATE_KEY]) {
    scopedGlobal[CAPTURE_STATE_KEY] = {
      context: new AsyncLocalStorage<Capture>(),
      wrappedFetch: null,
      wrappedInnerFetch: null,
    };
  }
  return scopedGlobal[CAPTURE_STATE_KEY];
}

const captureState = getCaptureState();
const BODY_METHODS = new Set(["POST", "PUT", "PATCH"]);
const AUTH_BODY_KEYS = new Set([
  "access_token",
  "client_secret",
  "grant_type",
  "id_token",
  "refresh_token",
]);
const REQUEST_BODY_KEYS = new Set([
  "conversationId",
  "conversation_id",
  "contents",
  "input",
  "messages",
  "model",
  "prompt",
  "request",
  "tools",
  "userSelectedModel",
]);

export function parseBody(bodyString: string): unknown {
  try {
    return JSON.parse(bodyString);
  } catch {
    return bodyString;
  }
}

async function capturePreparedRequest(
  requestCapture: Capture | null | undefined,
  url: string,
  headers: Record<string, string>,
  body: unknown,
  bodyString: string,
  log?: WarnLog | null
) {
  if (!requestCapture) return;
  const latest = requestCapture.latest?.();
  if (latest?.url === url && latest.bodyString === bodyString) return;

  try {
    await requestCapture.capture({ url, headers, body, bodyString });
  } catch (error) {
    log?.warn?.(
      "REQUEST_LOG",
      `Provider request logging hook failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

export function captureCurrentProviderRequest(
  url: string,
  headers: Record<string, string>,
  body: unknown,
  bodyString: string,
  log?: WarnLog | null
) {
  return capturePreparedRequest(
    captureState.context.getStore(),
    url,
    headers,
    body,
    bodyString,
    log
  );
}

export function captureCurrentProviderBody(
  url: string,
  headers: Record<string, string>,
  bodyString: string,
  log?: WarnLog | null
) {
  return captureCurrentProviderRequest(url, headers, parseBody(bodyString), bodyString, log);
}

export function runWithCapture<T>(requestCapture: Capture, fn: () => Promise<T>): Promise<T> {
  installFetchCapture();
  return captureState.context.run(requestCapture, fn);
}

function installFetchCapture() {
  if (globalThis.fetch === captureState.wrappedFetch) return;

  captureState.wrappedInnerFetch = globalThis.fetch.bind(globalThis);
  captureState.wrappedFetch = (async (input: FetchInput, init?: FetchInit) => {
    const activeCapture = captureState.context.getStore();
    if (activeCapture) {
      await captureFetchRequest(activeCapture, input, init);
    }
    return captureState.wrappedInnerFetch!(input, init);
  }) as typeof fetch;
  globalThis.fetch = captureState.wrappedFetch;
}

async function captureFetchRequest(requestCapture: Capture, input: FetchInput, init?: FetchInit) {
  const method = getFetchMethod(input, init);
  if (!BODY_METHODS.has(method)) return;

  const bodyString = bodyToString(init?.body);
  if (!bodyString) return;

  const body = parseBody(bodyString);
  if (!looksLikeProviderRequestBody(body)) return;

  await capturePreparedRequest(
    requestCapture,
    getFetchUrl(input),
    getFetchHeaders(input, init),
    body,
    bodyString
  );
}

function getFetchMethod(input: FetchInput, init?: FetchInit) {
  const method = init?.method || (isRequest(input) ? input.method : "GET");
  return String(method || "GET").toUpperCase();
}

function getFetchUrl(input: FetchInput) {
  if (typeof input === "string") return input;
  if (input instanceof URL) return input.toString();
  if (isRequest(input)) return input.url;
  return String(input);
}

function getFetchHeaders(input: FetchInput, init?: FetchInit) {
  const headers = new Headers(isRequest(input) ? input.headers : undefined);
  if (init?.headers) {
    new Headers(init.headers).forEach((value, key) => headers.set(key, value));
  }

  const result: Record<string, string> = {};
  headers.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

function bodyToString(body: BodyInit | null | undefined): string | null {
  if (typeof body === "string") return body;
  if (body instanceof URLSearchParams) return body.toString();
  if (body instanceof ArrayBuffer) return new TextDecoder().decode(body);
  if (ArrayBuffer.isView(body)) {
    return new TextDecoder().decode(
      body.buffer.slice(body.byteOffset, body.byteOffset + body.byteLength)
    );
  }
  return null;
}

function isRequest(input: FetchInput): input is Request {
  return typeof Request !== "undefined" && input instanceof Request;
}

function looksLikeProviderRequestBody(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return false;
  const record = body as Record<string, unknown>;

  if (Object.keys(record).some((key) => AUTH_BODY_KEYS.has(key))) return false;
  if (Object.keys(record).some((key) => REQUEST_BODY_KEYS.has(key))) return true;

  return (
    typeof record.query === "string" && !!record.variables && typeof record.variables === "object"
  );
}

export function createPreparedRequestLogger(
  reqLogger: RequestLoggerLike,
  scope: PendingRequestScope
): Capture {
  let latest: ProviderRequestPrepared | null = null;
  return {
    capture(request) {
      latest = request;
      reqLogger.logTargetRequest(request.url, request.headers, request.body);
      updatePendingScope(scope, {
        providerRequest: request.body,
        providerUrl: request.url,
        stage: "sending_to_provider",
      });
    },
    body(fallback) {
      const resolved = latest?.body ?? fallback;
      // #4091: the captured body is rebuilt from the serialized upstream payload
      // (the fetch-capture does `JSON.parse(JSON.stringify(...))`), which drops
      // non-enumerable properties. The native-Claude tool-name cloak stashes its
      // per-request alias→original map as a NON-ENUMERABLE `_toolNameMap` on the
      // real (fallback) transformed body; without it the response-side un-cloak
      // (`mergeResponseToolNameMap` → `remapToolNamesInResponse`) can't restore
      // MCP / snake_case tool names, so Claude Code receives the cloaked
      // PascalCase name and rejects every call with "No such tool available".
      // Re-attach the map onto the resolved (captured) body — kept non-enumerable
      // so it still never re-serializes into an upstream request.
      if (
        resolved !== fallback &&
        resolved &&
        typeof resolved === "object" &&
        fallback &&
        typeof fallback === "object"
      ) {
        const map = (fallback as Record<string, unknown>)._toolNameMap;
        const target = resolved as Record<string, unknown>;
        if (map instanceof Map && !(target._toolNameMap instanceof Map)) {
          Object.defineProperty(target, "_toolNameMap", {
            value: map,
            enumerable: false,
            configurable: true,
            writable: true,
          });
        }
      }
      return resolved;
    },
    latest() {
      return latest;
    },
  };
}
