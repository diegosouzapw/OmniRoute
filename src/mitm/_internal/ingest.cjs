"use strict";

// =========================================================================
// Inspector ingest shim (D4 fallback) — used by the standalone CommonJS
// `server.cjs` proxy, which cannot import the TypeScript `agentBridgeHook.ts`.
//
// The proxy intercepts AgentBridge traffic inline (no MitmHandlerBase), so it
// never reaches the TS hook that pushes into `globalTrafficBuffer`. To make the
// Traffic Inspector show AgentBridge traffic, `server.cjs` posts a captured
// entry to the local-only `/api/tools/traffic-inspector/internal/ingest`
// endpoint, which pushes it into the buffer (and sanitizes it server-side).
//
// This module holds the pure payload builder + the fire-and-forget poster so
// both are unit-testable without standing up the proxy. Mirrors the entry
// shape produced by `inspector/agentBridgeHook.ts::recordRequestStart`.
// =========================================================================

const { randomUUID } = require("node:crypto");

const INGEST_PATH = "/api/tools/traffic-inspector/internal/ingest";

/**
 * Build a schema-valid `InterceptedRequest` entry for the ingest endpoint.
 * Pure: the caller injects `id`/`timestamp` so the result is deterministic and
 * testable. `source` is always "agent-bridge" — this shim is only used by the
 * AgentBridge MITM proxy. Optional fields are omitted/defaulted so the result
 * satisfies `InterceptedRequestSchema` (and the partial ingest schema).
 */
function buildIngestEntry(opts) {
  const o = opts || {};
  const entry = {
    id: o.id || randomUUID(),
    source: "agent-bridge",
    timestamp: o.timestamp || new Date().toISOString(),
    method: o.method || "GET",
    host: o.host || "",
    path: o.path || "/",
    requestHeaders: o.requestHeaders || {},
    requestBody: o.requestBody != null ? o.requestBody : null,
    requestSize: Number.isFinite(o.requestSize) ? o.requestSize : 0,
    responseHeaders: o.responseHeaders || {},
    responseBody: o.responseBody != null ? o.responseBody : null,
    responseSize: Number.isFinite(o.responseSize) ? o.responseSize : 0,
    status: o.status,
  };
  if (o.agentId) entry.agent = o.agentId;
  if (o.sourceModel !== undefined) entry.sourceModel = o.sourceModel;
  if (o.mappedModel) entry.mappedModel = o.mappedModel;
  if (typeof o.error === "string") entry.error = o.error;
  if (typeof o.proxyLatencyMs === "number") entry.proxyLatencyMs = o.proxyLatencyMs;
  if (typeof o.upstreamLatencyMs === "number") entry.upstreamLatencyMs = o.upstreamLatencyMs;
  if (typeof o.proxyLatencyMs === "number" && typeof o.upstreamLatencyMs === "number") {
    entry.totalLatencyMs = o.proxyLatencyMs + o.upstreamLatencyMs;
  }
  return entry;
}

/**
 * Fire-and-forget POST of a captured entry to the ingest endpoint. NEVER throws
 * and NEVER rejects — inspector capture must not be able to break proxy
 * traffic. Returns true only on a 2xx response (used by tests); false on a
 * missing token/base/fetch, a non-2xx, or any network error.
 */
async function postIngestEntry(baseUrl, token, entry, fetchImpl) {
  const doFetch = fetchImpl || globalThis.fetch;
  if (!token || !baseUrl || typeof doFetch !== "function") return false;
  try {
    const res = await doFetch(`${baseUrl}${INGEST_PATH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(entry),
    });
    return !!(res && res.ok === true);
  } catch {
    return false;
  }
}

module.exports = { buildIngestEntry, postIngestEntry, INGEST_PATH };
