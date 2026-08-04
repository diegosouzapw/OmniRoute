import { createHash } from "crypto";

import {
  acquireBrowserContext,
  openPage,
  type BrowserPoolContextOptions,
  type PooledContext,
} from "../../services/browserPool.ts";
import type { ClaudeWebRequestPayload } from "./payload.ts";

const CLAUDE_WEB_TEMPLATE_TTL_MS = 30 * 60 * 1000;
const CLAUDE_WEB_TEMPLATE_MAX = 5000;
const MAX_CLAUDE_WEB_BROWSER_RESPONSE_BYTES = 16 * 1024 * 1024;
const CLAUDE_WEB_INPUT_SELECTOR = "div[contenteditable='true']";

type Page = import("playwright").Page;

type BrowserTemplate = {
  tools: ClaudeWebRequestPayload["tools"];
  toolStates?: unknown[];
  personalizedStyles: ClaudeWebRequestPayload["personalized_styles"];
};

type CachedBrowserTemplate = {
  template: BrowserTemplate;
  context: PooledContext["context"];
  expiresAt: number;
};

const browserTemplateCache = new Map<string, CachedBrowserTemplate>();
let testNow: number | null = null;

export interface ClaudeWebTransportRequest {
  scopeKey: string;
  organizationId: string;
  conversationId: string;
  endpointSuffix: "completion" | "retry_completion";
  pageUrl: string;
  url: string;
  cookieString: string;
  headers: Record<string, string>;
  payload: ClaudeWebRequestPayload;
  locale: string;
  timezone: string;
  signal?: AbortSignal | null;
}

export interface ClaudeWebTransportResult {
  status: number;
  headers: Headers;
  body: ReadableStream<Uint8Array> | null;
  /** Buffered only for non-success responses; never returned directly to clients. */
  bodyText?: string;
}

export interface ClaudeWebBrowserDeps {
  acquireContext(key: string, options: BrowserPoolContextOptions): Promise<PooledContext>;
  openPage(pooled: PooledContext): Promise<Page>;
  fetchResponse(
    page: Page,
    input: ClaudeWebBrowserFetchInput
  ): Promise<{
    status: number;
    headers: Record<string, string>;
    body: Uint8Array;
  }>;
}

export interface ClaudeWebBrowserFetchInput {
  url: string;
  headers: Record<string, string>;
  body: string;
  maxBytes: number;
}

const defaultDeps: ClaudeWebBrowserDeps = {
  acquireContext: acquireBrowserContext,
  openPage,
  fetchResponse: fetchClaudeWebPageResponse,
};

function now(): number {
  return testNow ?? Date.now();
}

function cloneValue<T>(value: T): T {
  return structuredClone(value);
}

function expectedRequestUrl(request: ClaudeWebTransportRequest): string {
  return (
    "https://claude.ai/api/organizations/" +
    `${encodeURIComponent(request.organizationId)}/chat_conversations/` +
    `${encodeURIComponent(request.conversationId)}/${request.endpointSuffix}`
  );
}

function verifyRequestUrl(request: ClaudeWebTransportRequest): void {
  if (request.url !== expectedRequestUrl(request)) {
    throw new Error("Claude Web browser request endpoint does not match prepared state");
  }
}

function extractBrowserTemplate(uiPayload: Record<string, unknown>): BrowserTemplate {
  return {
    tools: Array.isArray(uiPayload.tools)
      ? cloneValue(uiPayload.tools as ClaudeWebRequestPayload["tools"])
      : [],
    ...(Array.isArray(uiPayload.tool_states)
      ? { toolStates: cloneValue(uiPayload.tool_states) }
      : {}),
    personalizedStyles: Array.isArray(uiPayload.personalized_styles)
      ? cloneValue(uiPayload.personalized_styles as ClaudeWebRequestPayload["personalized_styles"])
      : [],
  };
}

function pruneExpiredTemplates(): void {
  const currentTime = now();
  for (const [key, entry] of browserTemplateCache) {
    if (currentTime >= entry.expiresAt) browserTemplateCache.delete(key);
  }
}

function rememberBrowserTemplate(
  poolKey: string,
  template: BrowserTemplate,
  context: PooledContext["context"]
): void {
  pruneExpiredTemplates();
  if (browserTemplateCache.has(poolKey)) browserTemplateCache.delete(poolKey);
  while (browserTemplateCache.size >= CLAUDE_WEB_TEMPLATE_MAX) {
    const oldestKey = browserTemplateCache.keys().next().value;
    if (typeof oldestKey !== "string") break;
    browserTemplateCache.delete(oldestKey);
  }
  browserTemplateCache.set(poolKey, {
    template: cloneValue(template),
    context,
    expiresAt: now() + CLAUDE_WEB_TEMPLATE_TTL_MS,
  });
}

function lookupBrowserTemplate(poolKey: string): CachedBrowserTemplate | null {
  const entry = browserTemplateCache.get(poolKey);
  if (!entry) return null;
  if (now() >= entry.expiresAt) {
    browserTemplateCache.delete(poolKey);
    return null;
  }
  return {
    template: cloneValue(entry.template),
    context: entry.context,
    expiresAt: entry.expiresAt,
  };
}

export function buildClaudeWebBrowserPoolKey(input: {
  scopeKey: string;
  organizationId: string;
  cookieString: string;
  locale: string;
  timezone: string;
}): string {
  const digest = createHash("sha256")
    .update(
      [input.scopeKey, input.organizationId, input.cookieString, input.locale, input.timezone].join(
        String.fromCharCode(31)
      )
    )
    .digest("hex");
  return `claude-web:${digest}`;
}

export function mergeClaudeWebBrowserPayload(
  uiPayload: Record<string, unknown>,
  preparedPayload: ClaudeWebRequestPayload
): ClaudeWebRequestPayload {
  const template = extractBrowserTemplate(uiPayload);
  const merged = {
    ...uiPayload,
    ...preparedPayload,
    tools: template.tools,
    personalized_styles: template.personalizedStyles,
    ...(template.toolStates ? { tool_states: template.toolStates } : {}),
  } as unknown as ClaudeWebRequestPayload;

  if (!("parent_message_uuid" in preparedPayload)) {
    delete merged.parent_message_uuid;
  }
  if (!("create_conversation_params" in preparedPayload)) {
    delete merged.create_conversation_params;
  }
  if (!template.toolStates && !("tool_states" in preparedPayload)) {
    delete merged.tool_states;
  }
  return merged;
}

function mergeTemplateIntoPrepared(
  template: BrowserTemplate,
  preparedPayload: ClaudeWebRequestPayload
): ClaudeWebRequestPayload {
  return {
    ...preparedPayload,
    tools: cloneValue(template.tools),
    personalized_styles: cloneValue(template.personalizedStyles),
    ...(!("tool_states" in preparedPayload) && template.toolStates
      ? { tool_states: cloneValue(template.toolStates) }
      : {}),
  };
}

export function applyClaudeWebBrowserTemplate(
  request: ClaudeWebTransportRequest
): ClaudeWebTransportRequest {
  if (request.payload.tools.length > 0) return request;
  const cached = lookupBrowserTemplate(buildClaudeWebBrowserPoolKey(request));
  if (!cached) return request;
  return {
    ...request,
    payload: mergeTemplateIntoPrepared(cached.template, request.payload),
  };
}

function browserFetchHeaders(headers: Record<string, string>): Record<string, string> {
  const forbidden = new Set([
    "accept-encoding",
    "connection",
    "content-length",
    "cookie",
    "host",
    "origin",
    "referer",
    "user-agent",
  ]);
  const filtered: Record<string, string> = {};
  for (const [name, value] of Object.entries(headers)) {
    const normalized = name.toLowerCase();
    if (forbidden.has(normalized) || normalized.startsWith("sec-")) continue;
    filtered[name] = value;
  }
  return filtered;
}

function makeBrowserFetchInput(
  request: ClaudeWebTransportRequest,
  payload: ClaudeWebRequestPayload,
  capturedHeaders: Record<string, string> = {}
): ClaudeWebBrowserFetchInput {
  return {
    url: request.url,
    headers: browserFetchHeaders({ ...capturedHeaders, ...request.headers }),
    body: JSON.stringify(payload),
    maxBytes: MAX_CLAUDE_WEB_BROWSER_RESPONSE_BYTES,
  };
}

export async function fetchClaudeWebPageResponse(
  page: Page,
  input: ClaudeWebBrowserFetchInput
): Promise<{ status: number; headers: Record<string, string>; body: Uint8Array }> {
  const captured = await page.evaluate(async ({ url, headers, body, maxBytes }) => {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
      credentials: "include",
    });
    const responseHeaders = Object.fromEntries(response.headers.entries());
    const declaredLength = Number.parseInt(response.headers.get("content-length") ?? "", 10);
    if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
      await response.body?.cancel().catch(() => {});
      throw new Error("Claude Web browser response exceeded the size limit");
    }

    const reader = response.body?.getReader();
    const bodyChunks: string[] = [];
    let totalBytes = 0;
    const encodeBase64 = (bytes: Uint8Array): string => {
      let binary = "";
      const sliceSize = 32 * 1024;
      for (let offset = 0; offset < bytes.byteLength; offset += sliceSize) {
        binary += String.fromCharCode(...bytes.subarray(offset, offset + sliceSize));
      }
      return btoa(binary);
    };

    try {
      while (reader) {
        const { value, done } = await reader.read();
        if (done) break;
        if (!value) continue;
        totalBytes += value.byteLength;
        if (totalBytes > maxBytes) {
          await reader.cancel().catch(() => {});
          throw new Error("Claude Web browser response exceeded the size limit");
        }
        bodyChunks.push(encodeBase64(value));
      }
    } finally {
      try {
        reader?.releaseLock();
      } catch {
        // The reader may already be released after cancellation.
      }
    }

    return {
      status: response.status,
      headers: responseHeaders,
      bodyChunks,
    };
  }, input);

  const chunks = captured.bodyChunks.map((chunk) => Buffer.from(chunk, "base64"));
  return {
    status: captured.status,
    headers: captured.headers,
    body: Buffer.concat(chunks),
  };
}

function throwIfAborted(signal?: AbortSignal | null): void {
  if (signal?.aborted) throw new DOMException("Aborted", "AbortError");
}

async function withAbort<T>(promise: Promise<T>, signal?: AbortSignal | null): Promise<T> {
  if (!signal) return promise;
  throwIfAborted(signal);
  let abortListener: (() => void) | undefined;
  const aborted = new Promise<never>((_, reject) => {
    abortListener = () => reject(new DOMException("Aborted", "AbortError"));
    signal.addEventListener("abort", abortListener, { once: true });
  });
  try {
    return await Promise.race([promise, aborted]);
  } finally {
    if (abortListener) signal.removeEventListener("abort", abortListener);
  }
}

async function captureCompletion(
  page: Page,
  request: ClaudeWebTransportRequest,
  poolKey: string,
  context: PooledContext["context"]
): Promise<ClaudeWebBrowserFetchInput> {
  let resolveInterception: ((input: ClaudeWebBrowserFetchInput) => void) | undefined;
  let rejectInterception: ((error: Error) => void) | undefined;
  const intercepted = new Promise<ClaudeWebBrowserFetchInput>((resolve, reject) => {
    resolveInterception = resolve;
    rejectInterception = reject;
  });

  const matchesPreparedRoute = (url: URL): boolean => {
    if (!("create_conversation_params" in request.payload)) {
      return url.toString() === request.url;
    }
    if (url.origin !== "https://claude.ai" || url.search || url.hash) return false;
    const segments = url.pathname.split("/").filter(Boolean);
    if (
      segments.length !== 6 ||
      segments[0] !== "api" ||
      segments[1] !== "organizations" ||
      segments[3] !== "chat_conversations" ||
      !segments[4] ||
      segments[5] !== "completion"
    ) {
      return false;
    }
    try {
      return decodeURIComponent(segments[2]) === request.organizationId;
    } catch {
      return false;
    }
  };

  await page.route(matchesPreparedRoute, async (route) => {
    try {
      const outgoing = route.request();
      if (outgoing.method() !== "POST" || !matchesPreparedRoute(new URL(outgoing.url()))) {
        throw new Error("Claude Web browser interception target changed");
      }
      const rawPayload = outgoing.postData();
      if (!rawPayload) throw new Error("Claude Web browser request body is missing");
      const uiPayload = JSON.parse(rawPayload) as unknown;
      if (!uiPayload || typeof uiPayload !== "object" || Array.isArray(uiPayload)) {
        throw new Error("Claude Web browser request body is invalid");
      }
      const capturedHeaders = await outgoing.allHeaders();
      const template = extractBrowserTemplate(uiPayload as Record<string, unknown>);
      const merged = mergeClaudeWebBrowserPayload(
        uiPayload as Record<string, unknown>,
        request.payload
      );
      await route.abort();
      rememberBrowserTemplate(poolKey, template, context);
      resolveInterception?.(makeBrowserFetchInput(request, merged, capturedHeaders));
    } catch {
      await route.abort().catch(() => {});
      rejectInterception?.(new Error("Claude Web browser request interception failed"));
    }
  });

  const guardedInterception = withAbort(intercepted, request.signal);
  void guardedInterception.catch(() => {});
  const input = page.locator(CLAUDE_WEB_INPUT_SELECTOR).first();
  try {
    await withAbort(input.waitFor({ state: "visible", timeout: 10000 }), request.signal);
    await withAbort(input.fill(request.payload.prompt), request.signal);
    await withAbort(page.keyboard.press("Enter"), request.signal);
    return await guardedInterception;
  } catch (error) {
    rejectInterception?.(new Error("Claude Web browser request capture failed"));
    await guardedInterception.catch(() => {});
    throw error;
  } finally {
    await page.unroute(matchesPreparedRoute).catch(() => {});
  }
}

function captureRetry(
  request: ClaudeWebTransportRequest,
  template: BrowserTemplate
): ClaudeWebBrowserFetchInput {
  const payload = mergeTemplateIntoPrepared(template, request.payload);
  return makeBrowserFetchInput(request, payload);
}

function toTransportResult(captured: {
  status: number;
  headers: Record<string, string>;
  body: Uint8Array;
}): ClaudeWebTransportResult {
  const bytes = new Uint8Array(captured.body);
  return {
    status: captured.status,
    headers: new Headers(captured.headers),
    body: new Response(bytes).body,
  };
}

export async function sendClaudeWebBrowser(
  request: ClaudeWebTransportRequest,
  deps: ClaudeWebBrowserDeps = defaultDeps
): Promise<ClaudeWebTransportResult> {
  verifyRequestUrl(request);
  throwIfAborted(request.signal);
  const poolKey = buildClaudeWebBrowserPoolKey(request);
  const retryEntry =
    request.endpointSuffix === "retry_completion" ? lookupBrowserTemplate(poolKey) : null;
  if (request.endpointSuffix === "retry_completion" && !retryEntry) {
    throw new Error("Claude Web browser retry requires a scoped UI template");
  }

  const pooled = await deps.acquireContext(poolKey, {
    cookieDomain: ".claude.ai",
    cookieString: request.cookieString,
    warmupUrl: request.pageUrl,
    locale: request.locale,
    timezone: request.timezone,
    proxyProviderKey: "claude-web",
  });
  const page = await deps.openPage(pooled);
  try {
    if (retryEntry && retryEntry.context !== pooled.context) {
      throw new Error("Claude Web browser context no longer matches scoped UI template");
    }
    await page.goto(request.pageUrl, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    throwIfAborted(request.signal);
    const fetchInput = retryEntry
      ? captureRetry(request, retryEntry.template)
      : await captureCompletion(page, request, poolKey, pooled.context);
    const captured = await withAbort(deps.fetchResponse(page, fetchInput), request.signal);
    if (captured.body.byteLength > MAX_CLAUDE_WEB_BROWSER_RESPONSE_BYTES) {
      throw new Error("Claude Web browser response exceeded the size limit");
    }
    return toTransportResult(captured);
  } finally {
    await page.close().catch(() => {});
  }
}

export function __resetClaudeWebBrowserTemplatesForTesting(): void {
  browserTemplateCache.clear();
}

export function __setClaudeWebBrowserNowForTesting(value: number | null): void {
  testNow = value;
}
