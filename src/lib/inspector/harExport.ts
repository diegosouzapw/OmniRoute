/**
 * HAR (HTTP Archive) v1.2 export for the Traffic Inspector.
 *
 * HAR is the standard format consumed by Chrome DevTools, Charles, Fiddler,
 * Postman, and most observability tools. Exporting lets users carry the
 * trace out of OmniRoute into their existing workflow.
 *
 * Secrets are *always* masked on export, regardless of the UI state — see
 * Hard Rule #1 (no credentials in artefacts). The OmniRoute capture source
 * (agent-bridge / custom-host / http-proxy / system-proxy) is preserved as
 * `_source`, a custom field allowed by the HAR spec's underscore convention.
 */

import { maskSecret } from "@/mitm/maskSecrets";
import type { InterceptedRequest } from "@/mitm/inspector/types";

const HAR_VERSION = "1.2";
const CREATOR_NAME = "OmniRoute Traffic Inspector";
const CREATOR_VERSION = "3.8.6";

interface HarNameValue {
  name: string;
  value: string;
}

interface HarPostData {
  mimeType: string;
  text: string;
}

interface HarRequest {
  method: string;
  url: string;
  httpVersion: string;
  headers: HarNameValue[];
  queryString: HarNameValue[];
  cookies: HarNameValue[];
  headersSize: number;
  bodySize: number;
  postData?: HarPostData;
}

interface HarContent {
  size: number;
  mimeType: string;
  text?: string;
}

interface HarResponse {
  status: number;
  statusText: string;
  httpVersion: string;
  headers: HarNameValue[];
  cookies: HarNameValue[];
  content: HarContent;
  redirectURL: string;
  headersSize: number;
  bodySize: number;
}

interface HarTimings {
  send: number;
  wait: number;
  receive: number;
}

interface HarEntry {
  startedDateTime: string;
  time: number;
  request: HarRequest;
  response: HarResponse;
  cache: Record<string, never>;
  timings: HarTimings;
  serverIPAddress?: string;
  _source?: string;
  _agent?: string;
  _detectedKind?: string;
  _contextKey?: string;
  _sessionId?: string;
  _annotation?: string;
  _note?: string;
  _omniRouteId?: string;
}

export interface HarFile {
  log: {
    version: string;
    creator: { name: string; version: string };
    entries: HarEntry[];
  };
}

function headersToList(headers: Record<string, string>): HarNameValue[] {
  return Object.entries(headers).map(([name, value]) => ({
    name,
    value: maskSecret(value),
  }));
}

function buildUrl(host: string, path: string): string {
  // CONNECT entries carry path ":443" — treat them as opaque pseudo-URL.
  if (path.startsWith(":")) return `https://${host}${path}`;
  if (!host) return path;
  return `https://${host}${path}`;
}

function buildPostData(req: InterceptedRequest): HarPostData | undefined {
  if (!req.requestBody) return undefined;
  const ct =
    req.requestHeaders["content-type"] ??
    req.requestHeaders["Content-Type"] ??
    "application/octet-stream";
  return { mimeType: ct, text: maskSecret(req.requestBody) };
}

function buildResponseContent(req: InterceptedRequest): HarContent {
  const ct =
    req.responseHeaders["content-type"] ??
    req.responseHeaders["Content-Type"] ??
    "application/octet-stream";
  if (req.responseBody == null) {
    return { size: req.responseSize, mimeType: ct };
  }
  return { size: req.responseSize, mimeType: ct, text: maskSecret(req.responseBody) };
}

function buildEntry(req: InterceptedRequest): HarEntry {
  const numericStatus = typeof req.status === "number" ? req.status : 0;
  const statusText = typeof req.status === "string" ? req.status : "";

  const entry: HarEntry = {
    startedDateTime: req.timestamp,
    time: req.totalLatencyMs ?? 0,
    request: {
      method: req.method,
      url: buildUrl(req.host, req.path),
      httpVersion: "HTTP/1.1",
      headers: headersToList(req.requestHeaders),
      queryString: [],
      cookies: [],
      headersSize: -1,
      bodySize: req.requestSize,
      postData: buildPostData(req),
    },
    response: {
      status: numericStatus,
      statusText,
      httpVersion: "HTTP/1.1",
      headers: headersToList(req.responseHeaders),
      cookies: [],
      content: buildResponseContent(req),
      redirectURL: "",
      headersSize: -1,
      bodySize: req.responseSize,
    },
    cache: {},
    timings: {
      send: 0,
      wait: req.upstreamLatencyMs ?? 0,
      receive: (req.totalLatencyMs ?? 0) - (req.upstreamLatencyMs ?? 0),
    },
    _source: req.source,
    _omniRouteId: req.id,
  };

  if (req.agent) entry._agent = req.agent;
  if (req.detectedKind) entry._detectedKind = req.detectedKind;
  if (req.contextKey) entry._contextKey = req.contextKey;
  if (req.sessionId) entry._sessionId = req.sessionId;
  if (req.annotation) entry._annotation = req.annotation;
  if (req.note) entry._note = req.note;

  return entry;
}

/**
 * Convert intercepted requests into a HAR v1.2 file. Always masks secrets in
 * headers and bodies — callers do not need to pre-mask.
 */
export function toHar(requests: InterceptedRequest[]): HarFile {
  return {
    log: {
      version: HAR_VERSION,
      creator: { name: CREATOR_NAME, version: CREATOR_VERSION },
      entries: requests.map(buildEntry),
    },
  };
}
