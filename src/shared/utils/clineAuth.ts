/**
 * Cline (cline.bot) auth-shape helpers.
 *
 * Cline's API expects the bearer token to be prefixed with `workos:` (the
 * upstream auth provider), and a set of Cline client-identification headers
 * (HTTP-Referer / X-Title / X-CLIENT-* / X-PLATFORM*). Plain `Bearer <token>`
 * without the `workos:` prefix is rejected upstream, so every Cline request
 * must route its headers through `buildClineHeaders()`.
 */

import { randomUUID } from "node:crypto";

import { APP_CONFIG } from "../constants/appConfig";

const APP_VERSION = APP_CONFIG.version;

export interface ClineHeaderContext {
  taskId?: string;
  clientType?: string;
  clientVersion?: string;
  platform?: string;
  platformVersion?: string;
  coreVersion?: string;
  isMultiRoot?: boolean;
}

function cleanHeaderValue(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > 256 || /[\r\n\0]/.test(cleaned)) return undefined;
  return cleaned;
}

function getHeaderCaseInsensitive(
  headers: Record<string, string> | null | undefined,
  name: string
): string | undefined {
  const key = Object.keys(headers ?? {}).find((candidate) => candidate.toLowerCase() === name);
  return key ? cleanHeaderValue(headers?.[key]) : undefined;
}

/** Keep an inbound Cline task id when supplied; otherwise create one per request. */
export function resolveClineTaskId(clientHeaders?: Record<string, string> | null): string {
  return getHeaderCaseInsensitive(clientHeaders, "x-task-id") ?? randomUUID();
}

/**
 * Apply the required Cline billing headers with case-insensitive replacement.
 * These fields are authoritative in the official client and must win over
 * stored/configured header layers.
 */
export function applyClineProtocolHeaders(
  headers: Record<string, string>,
  context: ClineHeaderContext = {}
): Record<string, string> {
  const taskId =
    cleanHeaderValue(context.taskId) ??
    getHeaderCaseInsensitive(headers, "x-task-id") ??
    randomUUID();
  const clientVersion = cleanHeaderValue(context.clientVersion) ?? APP_VERSION;
  const required: Record<string, string> = {
    "HTTP-Referer": "https://cline.bot",
    "X-Title": "Cline",
    "User-Agent": `Cline/${clientVersion}`,
    "X-IS-MULTIROOT": context.isMultiRoot === true ? "true" : "false",
    "X-CLIENT-TYPE": cleanHeaderValue(context.clientType) ?? "omniroute",
    "X-CLIENT-VERSION": clientVersion,
    "X-PLATFORM": cleanHeaderValue(context.platform) ?? process.platform ?? "unknown",
    "X-PLATFORM-VERSION": cleanHeaderValue(context.platformVersion) ?? process.version ?? "unknown",
    "X-CORE-VERSION": cleanHeaderValue(context.coreVersion) ?? APP_VERSION,
    "X-Task-ID": taskId,
  };

  for (const [name, value] of Object.entries(required)) {
    for (const existing of Object.keys(headers)) {
      if (existing !== name && existing.toLowerCase() === name.toLowerCase()) {
        delete headers[existing];
      }
    }
    headers[name] = value;
  }
  return headers;
}

/**
 * Normalize a raw Cline token into the `workos:`-prefixed access-token shape
 * Cline expects. Idempotent: a token that already carries the prefix is
 * returned untouched. Non-string / empty input yields an empty string.
 */
export function getClineAccessToken(token: unknown): string {
  if (typeof token !== "string") return "";
  const trimmed = token.trim();
  if (!trimmed) return "";
  return trimmed.startsWith("workos:") ? trimmed : `workos:${trimmed}`;
}

/**
 * Build the full `Authorization` header value for a Cline request, or an empty
 * string when no usable token is present.
 */
export function getClineAuthorizationHeader(token: unknown): string {
  const accessToken = getClineAccessToken(token);
  return accessToken ? `Bearer ${accessToken}` : "";
}

/**
 * Build the complete Cline client header set, optionally merged with caller
 * extras. The `Authorization` header is only added when a usable token is
 * present (so callers can build probe headers without a token).
 */
export function buildClineHeaders(
  token: unknown,
  extraHeaders: Record<string, string> = {},
  context: ClineHeaderContext = {}
): Record<string, string> {
  const authorization = getClineAuthorizationHeader(token);
  const headers = applyClineProtocolHeaders({ ...extraHeaders }, context);

  if (authorization) {
    headers.Authorization = authorization;
  }

  return headers;
}

/**
 * Build headers for a ClinePass request. ClinePass is dual-auth: an OAuth
 * connection (workos:-prefixed token in `accessToken`) needs the full Cline
 * client header set from `buildClineHeaders()`; a BYOK API-key connection
 * (`sk_...` key, #5942) sends the key as a plain Bearer token — no `workos:`
 * prefix — alongside the Cline identification headers.
 */
export function buildClinepassHeaders(
  credentials: { accessToken?: unknown; apiKey?: unknown } | null | undefined,
  effectiveKey?: string,
  context: ClineHeaderContext = {}
): Record<string, string> {
  if (credentials?.accessToken) {
    return buildClineHeaders(credentials.accessToken, {}, context);
  }
  const headers = applyClineProtocolHeaders({}, context);
  const byokKey = effectiveKey || (credentials?.apiKey as string | undefined);
  if (byokKey) headers.Authorization = `Bearer ${byokKey}`;
  return headers;
}

/**
 * Executor call-site helper: merge the Cline/ClinePass auth headers directly
 * into an in-progress `headers` record, mutating it in place. Keeps the
 * `case "cline"` / `case "clinepass"` branches in the executor down to a
 * single call each — `isClinepass` selects `buildClinepassHeaders()`'s
 * dual-auth (OAuth or BYOK) shape vs. `buildClineHeaders()`'s single-token
 * `workos:`-prefixed shape.
 */
export function applyClineAuthHeaders(
  headers: Record<string, string>,
  credentials: { accessToken?: unknown; apiKey?: unknown } | null | undefined,
  effectiveKey: string | undefined,
  clientHeaders: Record<string, string> | null | undefined,
  isClinepass: boolean
): Record<string, string> {
  const context: ClineHeaderContext = { taskId: resolveClineTaskId(clientHeaders) };
  const built = isClinepass
    ? buildClinepassHeaders(credentials, effectiveKey, context)
    : buildClineHeaders(effectiveKey || credentials?.accessToken, {}, context);
  Object.assign(headers, built);
  return headers;
}
