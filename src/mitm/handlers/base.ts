/**
 * MitmHandlerBase — abstract base class for all AgentBridge MITM handlers.
 *
 * Contract: `_tasks/features-v3.8.6/refactorpages/_orchestration/master-plan-group-A.md` §3.5.
 *
 * The base handles the cross-cutting concerns shared by every IDE-agent handler:
 *   - request body capture + secret masking
 *   - source model extraction
 *   - forwarding to the OmniRoute router (Next.js API)
 *   - SSE piping
 *   - optional Traffic Inspector hook (F4 — loaded via dynamic import; no-op when
 *     `agentBridgeHook.ts` is not yet present in the build)
 *
 * Concrete handlers live in `src/mitm/handlers/<agentId>.ts`.
 */
import type { IncomingHttpHeaders, IncomingMessage, ServerResponse } from "node:http";
import { randomUUID } from "node:crypto";
import { performance } from "node:perf_hooks";
import { maskSecret } from "../maskSecrets";
import { sanitizeHeaders } from "../sanitizeHeaders";
import type { AgentId } from "../types";
import type { InterceptedRequest } from "../inspector/types";

/**
 * Best-effort error sanitizer.
 * Routes through `@omniroute/open-sse/utils/error.sanitizeErrorMessage` (Hard Rule #12)
 * when available; falls back to a safe `String(err)` if the module is not present
 * (e.g. unit tests that don't load the full open-sse barrel).
 */
async function safeErrorMessage(err: unknown): Promise<string> {
  try {
    const mod = (await import("@omniroute/open-sse/utils/error")) as {
      sanitizeErrorMessage?: (m: unknown) => string;
    };
    if (typeof mod.sanitizeErrorMessage === "function") {
      return mod.sanitizeErrorMessage(err);
    }
  } catch {
    // Module not available — fall back to plain coercion.
  }
  if (err instanceof Error) return err.message || err.name;
  return String(err);
}

/**
 * Dynamic-import hook into the Traffic Inspector buffer (F4).
 * Returns `null` if the inspector module has not been merged yet — handlers
 * remain fully functional standalone.
 */
async function loadAgentBridgeHook(): Promise<{
  recordRequestStart?: (opts: {
    req: IncomingMessage;
    body: Buffer;
    agentId: AgentId;
    mappedModel: string;
    sourceModel?: string | null;
  }) => Promise<InterceptedRequest>;
  recordRequestComplete?: (
    intercepted: InterceptedRequest,
    opts: {
      status: number;
      responseHeaders: Record<string, string>;
      responseBody: string | null;
      responseSize: number;
      proxyLatencyMs: number;
      upstreamLatencyMs: number;
    },
  ) => void;
  recordRequestError?: (intercepted: InterceptedRequest, err: unknown) => void;
} | null> {
  try {
    const mod = await import("../inspector/agentBridgeHook");
    return mod;
  } catch {
    return null;
  }
}

/**
 * Ceiling for the per-request SSE text a MITM handler retains for the Traffic
 * Inspector (#13395). The inspector buffer re-clamps per body
 * (`INSPECTOR_MAX_BODY_KB`, default 1 MiB), but the handler-side `collected`
 * string grew without bound BEFORE reaching that clamp — one long-lived stream
 * kept the whole transcript in the handler closure for the request lifetime.
 * Aligned with the inspector default so the bound never hides data the UI shows.
 */
export const MITM_PIPE_MAX_COLLECT_BYTES = 1 * 1024 * 1024;

/**
 * Bounded string accumulator for piped SSE transcripts. Stops retaining past
 * `maxBytes` but keeps counting true bytes, so the inspector still reports
 * the exact `responseSize` it reported before (`Buffer.byteLength` of the
 * full transcript) and the pipe itself is unaffected — every chunk is still
 * written downstream regardless of the cap.
 */
export function createBoundedCollector(maxBytes: number = MITM_PIPE_MAX_COLLECT_BYTES): {
  push: (chunk: string) => void;
  text: string;
  totalBytes: number;
  truncated: boolean;
} {
  let collected = "";
  let totalBytes = 0;
  const acc = {
    push(chunk: string): void {
      totalBytes += Buffer.byteLength(chunk);
      if (collected.length < maxBytes) {
        collected += chunk.slice(0, maxBytes - collected.length);
      }
    },
    get text(): string {
      return collected;
    },
    get totalBytes(): number {
      return totalBytes;
    },
    get truncated(): boolean {
      return totalBytes > Buffer.byteLength(collected);
    },
  };
  return acc;
}

export abstract class MitmHandlerBase {
  abstract readonly agentId: AgentId;

  /**
   * Intercept a single MITM request.
   * Concrete handlers must:
   *   1. Optionally call `this.hookBufferStart(req, body, mappedModel)`.
   *   2. Build the upstream-bound payload (translate model, format, etc.).
   *   3. Call `this.fetchRouter(...)` for the OmniRoute router round-trip.
   *   4. Pipe the response back via `this.pipeSSE(...)` for streaming
   *      or write the JSON body directly for non-streaming flows.
   *   5. Call `this.hookBufferUpdate(intercepted)` on completion / error.
   */
  abstract intercept(
    req: IncomingMessage,
    res: ServerResponse,
    body: Buffer,
    mappedModel: string,
  ): Promise<void>;

  /**
   * Whether to capture the request body for the Traffic Inspector.
   * Override to return `false` for endpoints that never need body capture
   * (e.g. health probes).
   */
  protected shouldCaptureBody(): boolean {
    return true;
  }

  /**
   * Extract the requested model from the upstream-bound body.
   * Default: parses JSON and reads the `model` property. Override for non-JSON
   * payloads or providers that nest the model elsewhere (e.g. Gemini uses
   * the URL path, but those handlers can override).
   */
  protected extractSourceModel(body: Buffer): string | null {
    try {
      const json = JSON.parse(body.toString());
      if (json && typeof json === "object" && typeof json.model === "string") {
        return json.model;
      }
    } catch {
      // Non-JSON body — caller may have a custom extractor.
    }
    return null;
  }

  /**
   * Forward the prepared body to the OmniRoute router (Next.js API).
   * Adds AgentBridge correlation headers (`x-omniroute-source`, `x-omniroute-agent`)
   * and forwards a sanitized copy of the original request headers (secrets masked,
   * hop-by-hop stripped).
   */
  protected async fetchRouter(
    body: unknown,
    path: string,
    headers: IncomingHttpHeaders,
  ): Promise<Response> {
    const base = process.env.OMNIROUTE_BASE_URL ?? "http://127.0.0.1:20128";
    const url = `${base.replace(/\/+$/, "")}${path}`;
    const apiKey = process.env.ROUTER_API_KEY ?? "";

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        "x-omniroute-source": "agent-bridge",
        "x-omniroute-agent": this.agentId,
        ...sanitizeHeaders(headers),
      },
      body: typeof body === "string" ? body : JSON.stringify(body),
    });
  }

  protected async pipeSSE(
    upstream: Response,
    res: ServerResponse,
    onChunk?: (c: Buffer) => void,
  ): Promise<void> {
    if (!upstream.body) {
      if (!res.headersSent) res.writeHead(upstream.status, { "Content-Type": "application/json" });
      res.end();
      return;
    }

    if (!res.headersSent) {
      res.writeHead(upstream.status, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      });
    }

    const reader = upstream.body.getReader();
    // #13395: a downstream disconnect must stop the upstream read — otherwise an
    // abandoned stream keeps the reader (and its buffers) alive for the full
    // upstream lifetime and the handler closure retains the transcript.
    let downstreamClosed = false;
    const onClose = () => {
      downstreamClosed = true;
      reader.cancel().catch(() => {});
    };
    res.once("close", onClose);
    try {
      while (true) {
        if (downstreamClosed) break;
        const { done, value } = await reader.read();
        if (done) break;
        const buf = Buffer.from(value);
        if (onChunk) {
          try {
            onChunk(buf);
          } catch {
            // Inspector hook must never break the upstream pipe.
          }
        }
        if (downstreamClosed || res.closed || res.destroyed) break;
        res.write(buf);
      }
    } finally {
      res.off("close", onClose);
      try {
        reader.releaseLock();
      } catch {
        // Reader already cancelled or released.
      }
      try {
        res.end();
      } catch {
        // Response may already be closed by client disconnect.
      }
    }
  }

  /**
   * Start a Traffic Inspector entry for this request. Always succeeds — if the
   * inspector module is not present (F4 not yet merged), this returns a local
   * stub entry without publishing to the buffer.
   */
  protected async hookBufferStart(
    req: IncomingMessage,
    body: Buffer,
    mappedModel: string,
  ): Promise<InterceptedRequest> {
    const hook = await loadAgentBridgeHook();
    if (hook?.recordRequestStart) {
      try {
        return await hook.recordRequestStart({
          req,
          body,
          agentId: this.agentId,
          mappedModel,
          sourceModel: this.extractSourceModel(body),
        });
      } catch {
        // Hook should never break interception — fall through to local stub.
      }
    }

    // Local stub when F4 hook is unavailable.
    return {
      id: randomUUID(),
      source: "agent-bridge",
      agent: this.agentId,
      timestamp: new Date().toISOString(),
      method: req.method ?? "POST",
      host: typeof req.headers.host === "string" ? req.headers.host : "",
      path: req.url ?? "/",
      requestHeaders: sanitizeHeaders(req.headers),
      requestBody: this.shouldCaptureBody() ? maskSecret(body.toString()) : null,
      requestSize: body.length,
      responseHeaders: {},
      responseBody: null,
      responseSize: 0,
      sourceModel: this.extractSourceModel(body),
      mappedModel,
      status: "in-flight",
    };
  }

  /**
   * Update a previously published Traffic Inspector entry with completion data.
   * No-op when the inspector module is not present.
   *
   * Per master-plan §3.5: the canonical no-arg form `hookBufferUpdate(intercepted)`
   * must update the buffer using completion fields already present on `intercepted`
   * (status, responseBody, responseHeaders, responseSize, *LatencyMs). When the
   * extended `opts` form is used (legacy internal callers), it overrides those
   * fields explicitly. Both forms route through `recordRequestComplete` so the
   * inspector receives a consistent shape.
   */
  protected hookBufferUpdate(
    intercepted: InterceptedRequest,
    opts?: {
      status: number;
      responseHeaders: Record<string, string>;
      responseBody: string | null;
      responseSize: number;
      proxyLatencyMs: number;
      upstreamLatencyMs: number;
    },
  ): void {
    const finalOpts = opts ?? {
      status: typeof intercepted.status === "number" ? intercepted.status : 0,
      responseHeaders: intercepted.responseHeaders,
      responseBody: intercepted.responseBody,
      responseSize: intercepted.responseSize,
      proxyLatencyMs: intercepted.proxyLatencyMs ?? 0,
      upstreamLatencyMs: intercepted.upstreamLatencyMs ?? 0,
    };
    void loadAgentBridgeHook().then((hook) => {
      if (hook?.recordRequestComplete) {
        try {
          hook.recordRequestComplete(intercepted, finalOpts);
        } catch {
          // Hook should never break interception.
        }
      }
    });
  }

  /**
   * Report a failed request to the Traffic Inspector.
   * No-op when the inspector module is not present.
   */
  protected async hookBufferError(
    intercepted: InterceptedRequest,
    err: unknown,
  ): Promise<void> {
    const hook = await loadAgentBridgeHook();
    if (hook?.recordRequestError) {
      try {
        hook.recordRequestError(intercepted, err);
      } catch {
        // Hook should never break interception.
      }
    }
  }

  /**
   * Render a Hard-Rule-#12-compliant error JSON body and send via `res`.
   * Returns the sanitized error string so callers may also log it.
   */
  protected async writeError(
    res: ServerResponse,
    err: unknown,
    statusCode = 500,
  ): Promise<string> {
    const safe = await safeErrorMessage(err);
    if (!res.headersSent) {
      res.writeHead(statusCode, { "Content-Type": "application/json" });
    }
    res.end(JSON.stringify({ error: { message: safe, type: "mitm_error" } }));
    return safe;
  }

  /**
   * Convenience helper for handlers that want a single performance.now() reading.
   */
  protected now(): number {
    return performance.now();
  }
}
