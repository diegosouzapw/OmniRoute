/**
 * Inspector hook called from `MitmHandlerBase` (F3) on every intercepted
 * AgentBridge request. Centralises buffer push/update so handlers do not need
 * to know the inspector internals.
 *
 * Contract: see `_orchestration/master-plan-group-A.md` §3.11.
 */

import { randomUUID } from "node:crypto";
import type { IncomingMessage } from "node:http";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { maskSecret } from "../maskSecrets.ts";
import { sanitizeHeaders } from "../sanitizeHeaders.ts";
import type { AgentId } from "../types.ts";
import { globalTrafficBuffer } from "./buffer.ts";
import type { InterceptedRequest } from "./types.ts";
import { isCustomHost } from "@/lib/db/inspectorCustomHosts";

export interface RecordRequestStartOpts {
  req: IncomingMessage;
  body: Buffer;
  agentId: AgentId;
  mappedModel: string;
  sourceModel?: string | null;
  sessionId?: string;
}

export interface RecordRequestCompleteOpts {
  status: number;
  responseHeaders: Record<string, string>;
  responseBody: string | null;
  responseSize: number;
  proxyLatencyMs: number;
  upstreamLatencyMs: number;
}

/**
 * Build the initial buffer entry and push it. Returned object is mutable by
 * design — handlers call `recordRequestComplete()` (or `recordRequestError`)
 * with the same reference once the upstream call resolves.
 */
export async function recordRequestStart(
  opts: RecordRequestStartOpts
): Promise<InterceptedRequest> {
  const requestBody = opts.body.length > 0 ? maskSecret(opts.body.toString("utf8")) : null;

  // Determine whether this request originates from a custom-host intercept
  // (Mode 2 / Custom Hosts) or a standard agent-bridge intercept (Mode 1).
  //
  // Both modes reach this hook via the same MITM server path: custom hosts are
  // added to inspector_custom_hosts by the Mode 2 UI and are spoofed to
  // 127.0.0.1 by /etc/hosts entries, so they arrive here just like agent
  // targets. The DB lookup below is the cheapest reliable way to distinguish
  // them without touching server.cjs — it costs one SQLite read per request.
  //
  // If the host resolves as a custom-host entry, source="custom-host" and
  // agent is left undefined so the "Custom" profile filter matches correctly.
  const host = opts.req.headers.host ?? "";
  const customHost = isCustomHost(host);

  const intercepted: InterceptedRequest = {
    id: randomUUID(),
    source: customHost ? "custom-host" : "agent-bridge",
    agent: customHost ? undefined : opts.agentId,
    timestamp: new Date().toISOString(),
    method: opts.req.method ?? "GET",
    host,
    path: opts.req.url ?? "/",
    requestHeaders: sanitizeHeaders(opts.req.headers),
    requestBody,
    requestSize: opts.body.length,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: "in-flight",
    sourceModel: opts.sourceModel ?? null,
    mappedModel: opts.mappedModel,
  };
  if (opts.sessionId) intercepted.sessionId = opts.sessionId;

  // Best-effort process attribution (Linux only; no-op elsewhere). The proxy's
  // inbound socket remotePort is the client process's local ephemeral port,
  // which is what appears in that process's /proc/net/tcp local_address. Never
  // blocks capture — any failure leaves pid/processName unset. (Gap 1.)
  try {
    const { attributeProcess } = await import("./processAttribution.ts");
    const remotePort = opts.req.socket?.remotePort;
    if (typeof remotePort === "number") {
      const info = attributeProcess(remotePort);
      if (info) {
        intercepted.pid = info.pid;
        intercepted.processName = info.processName;
      }
    }
  } catch {
    // attribution is best-effort — never block capture
  }

  globalTrafficBuffer.push(intercepted);
  return intercepted;
}

/**
 * Finalise the buffer entry with the upstream response data. Latencies are
 * stored as-given and combined into `totalLatencyMs`.
 */
export function recordRequestComplete(
  intercepted: InterceptedRequest,
  opts: RecordRequestCompleteOpts
): void {
  intercepted.status = opts.status;
  // SECURITY_AUDIT M6: mask secret-bearing upstream response headers (Set-Cookie,
  // Authorization, …) before they land in inspector JSON. The request side already
  // sanitizes (line ~69); the response side was storing headers verbatim.
  intercepted.responseHeaders = sanitizeHeaders(opts.responseHeaders);
  intercepted.responseBody =
    opts.responseBody != null ? maskSecret(opts.responseBody) : null;
  intercepted.responseSize = opts.responseSize;
  intercepted.proxyLatencyMs = opts.proxyLatencyMs;
  intercepted.upstreamLatencyMs = opts.upstreamLatencyMs;
  intercepted.totalLatencyMs = opts.proxyLatencyMs + opts.upstreamLatencyMs;

  globalTrafficBuffer.update(intercepted.id, intercepted);
}

/**
 * Mark the buffer entry as failed. Error messages are sanitized so stack
 * traces or absolute paths cannot leak to dashboards/exports (Hard Rule #12).
 */
export function recordRequestError(
  intercepted: InterceptedRequest,
  err: unknown
): void {
  intercepted.status = "error";
  intercepted.error = sanitizeErrorMessage(err);
  globalTrafficBuffer.update(intercepted.id, intercepted);
}
