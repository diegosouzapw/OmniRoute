/**
 * Cursor CLI passthrough.
 *
 * cursor-agent honours `--endpoint` / CURSOR_API_ENDPOINT and, with
 * `network.useHttp1ForAgent: true`, talks to that endpoint exclusively over
 * HTTP/1.1: unary Connect-RPC POSTs (`/aiserver.v1.*`, `/agent.v1.*`,
 * `/aiserver.v1.BidiService/BidiAppend`), the agent turn as
 * `/agent.v1.AgentService/RunSSE` (text/event-stream), OTLP traces on
 * `/v1/traces`, and the API-key bootstrap `POST /auth/exchange_user_api_key`.
 *
 * Pointing the CLI at OmniRoute therefore only needs a thin forwarder:
 *   1. `/auth/exchange_user_api_key` authenticates the CLI with an OmniRoute
 *      API key and hands back an OmniRoute-minted session JWT. The CLI reads
 *      `exp` from whatever JWT it receives and re-exchanges when the token is
 *      opaque or expired, so the minted token must be a real JWT with `exp`.
 *   2. Every other path verifies that JWT, resolves an active `cursor-api`
 *      connection (the crsr_ key is exchanged for a session token), swaps the
 *      Authorization header and streams the upstream reply back unchanged.
 *      Each hop is recorded in call_logs.
 */

import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { z } from "zod";
import { getApiKeyById, getApiKeyMetadata, validateApiKey } from "@/lib/db/apiKeys";
import { getProviderConnections } from "@/lib/db/providers";
import { saveCallLog } from "@/lib/usage/callLogs";
import { isRequireApiKeyEnabled } from "@/shared/utils/featureFlags";
import { HTTP_STATUS } from "../config/constants.ts";
import {
  CURSOR_API_BASE_URL,
  CURSOR_API_KEY_EXCHANGE_PATH,
  CursorApiKeyExchangeError,
  invalidateCursorSessionToken,
  isCursorApiKey,
  resolveCursorBearerToken,
} from "../services/cursorApiKeyAuth.ts";
import { sanitizeErrorMessage } from "../utils/error.ts";

export const CURSOR_CLI_PROXY_PREFIX = "/api/cursor-cli";
export const CURSOR_CLI_SESSION_ISSUER = "omniroute";
export const CURSOR_CLI_SESSION_AUDIENCE = "cursor-cli";
export const CURSOR_CLI_SESSION_TTL_SECONDS = 60 * 60;
export const CURSOR_CLI_REQUEST_TYPE = "cursor-cli";
const ANONYMOUS_SUBJECT = "anonymous";
const PROVIDER_ID = "cursor-api";

const REQUEST_HEADER_DENYLIST = new Set([
  "authorization",
  "host",
  "connection",
  "content-length",
  "accept-encoding",
  "keep-alive",
  "proxy-authorization",
  "proxy-connection",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "x-forwarded-for",
  "x-forwarded-host",
  "x-forwarded-proto",
  "x-real-ip",
  "cookie",
]);

const RESPONSE_HEADER_DENYLIST = new Set([
  "connection",
  "content-encoding",
  "content-length",
  "keep-alive",
  "transfer-encoding",
  "set-cookie",
]);

const exchangeBodySchema = z.object({}).passthrough();

const sessionClaimsSchema = z.object({
  sub: z.string().min(1),
  iss: z.literal(CURSOR_CLI_SESSION_ISSUER),
  aud: z.union([
    z.literal(CURSOR_CLI_SESSION_AUDIENCE),
    z.array(z.string()).refine((list) => list.includes(CURSOR_CLI_SESSION_AUDIENCE)),
  ]),
  exp: z.number(),
  name: z.string().nullable().optional(),
});

export type CursorCliPrincipal = {
  apiKeyId: string | null;
  apiKeyName: string | null;
};

export type CursorCliConnectionLike = {
  id?: unknown;
  apiKey?: unknown;
  accessToken?: unknown;
  priority?: unknown;
  rateLimitedUntil?: unknown;
};

export type CursorCliProxyDeps = {
  fetchImpl: typeof fetch;
  now: () => number;
  getSecret: () => string | undefined;
  validateApiKey: (key: string) => Promise<boolean>;
  getApiKeyMetadata: (key: string) => Promise<{ id: string; name: string } | null>;
  getApiKeyById: (id: string) => Promise<{ isActive?: unknown; revokedAt?: unknown } | null>;
  requireApiKey: () => boolean;
  listCursorConnections: () => Promise<CursorCliConnectionLike[]>;
  resolveBearer: (credentials: {
    apiKey?: string | null;
    accessToken?: string | null;
  }) => Promise<string>;
  invalidateBearer: (apiKey: string) => void;
  saveCallLog: (entry: Record<string, unknown>) => Promise<void>;
  upstreamBaseUrl: string;
};

const defaultDeps: CursorCliProxyDeps = {
  fetchImpl: (input, init) => fetch(input, init),
  now: () => Date.now(),
  getSecret: () => process.env.JWT_SECRET,
  validateApiKey: (key) => validateApiKey(key),
  getApiKeyMetadata: async (key) => {
    const meta = await getApiKeyMetadata(key);
    return meta ? { id: meta.id, name: meta.name } : null;
  },
  getApiKeyById: (id) => getApiKeyById(id),
  requireApiKey: () => isRequireApiKeyEnabled(),
  listCursorConnections: async () =>
    (await getProviderConnections({
      provider: PROVIDER_ID,
      isActive: true,
    })) as CursorCliConnectionLike[],
  resolveBearer: (credentials) => resolveCursorBearerToken(credentials),
  invalidateBearer: (apiKey) => invalidateCursorSessionToken(apiKey),
  saveCallLog: (entry) => saveCallLog(entry),
  upstreamBaseUrl: CURSOR_API_BASE_URL,
};

function jsonResponse(status: number, body: Record<string, unknown>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function connectError(status: number, code: string, message: string): Response {
  return jsonResponse(status, { code, message: sanitizeErrorMessage(message) });
}

function extractBearer(request: Request): string | null {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header.trim());
  return match ? match[1].trim() : null;
}

function secretKey(secret: string): Uint8Array {
  return new TextEncoder().encode(secret);
}

export function normalizeCursorCliPath(segments: readonly string[]): string {
  return "/" + segments.map((segment) => encodeURIComponent(decodeURIComponent(segment))).join("/");
}

async function authenticateExchange(
  request: Request,
  deps: CursorCliProxyDeps
): Promise<CursorCliPrincipal | Response> {
  const bearer = extractBearer(request);
  if (bearer && (await deps.validateApiKey(bearer))) {
    const meta = await deps.getApiKeyMetadata(bearer);
    return { apiKeyId: meta?.id ?? null, apiKeyName: meta?.name ?? null };
  }
  if (!deps.requireApiKey()) {
    return { apiKeyId: null, apiKeyName: null };
  }
  return connectError(
    HTTP_STATUS.UNAUTHORIZED,
    "unauthenticated",
    "CURSOR_API_KEY must be an OmniRoute API key when OmniRoute requires API keys"
  );
}

export async function mintCursorCliSessionToken(
  principal: CursorCliPrincipal,
  secret: string,
  nowMs: number
): Promise<string> {
  const nowSeconds = Math.floor(nowMs / 1000);
  return new SignJWT({ name: principal.apiKeyName })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuer(CURSOR_CLI_SESSION_ISSUER)
    .setAudience(CURSOR_CLI_SESSION_AUDIENCE)
    .setSubject(principal.apiKeyId ?? ANONYMOUS_SUBJECT)
    .setIssuedAt(nowSeconds)
    .setExpirationTime(nowSeconds + CURSOR_CLI_SESSION_TTL_SECONDS)
    .sign(secretKey(secret));
}

async function verifyCursorCliSessionToken(
  token: string,
  secret: string,
  nowMs: number
): Promise<CursorCliPrincipal | null> {
  let payload: JWTPayload;
  try {
    ({ payload } = await jwtVerify(token, secretKey(secret), {
      issuer: CURSOR_CLI_SESSION_ISSUER,
      audience: CURSOR_CLI_SESSION_AUDIENCE,
      currentDate: new Date(nowMs),
    }));
  } catch {
    return null;
  }
  const claims = sessionClaimsSchema.safeParse(payload);
  if (!claims.success) return null;
  return {
    apiKeyId: claims.data.sub === ANONYMOUS_SUBJECT ? null : claims.data.sub,
    apiKeyName: claims.data.name ?? null,
  };
}

async function isPrincipalStillValid(
  principal: CursorCliPrincipal,
  deps: CursorCliProxyDeps
): Promise<boolean> {
  if (!principal.apiKeyId) return !deps.requireApiKey();
  const row = await deps.getApiKeyById(principal.apiKeyId);
  if (!row) return false;
  if (row.isActive === false) return false;
  return !(typeof row.revokedAt === "string" && row.revokedAt.trim() !== "");
}

type ResolvedConnection = {
  connectionId: string | null;
  bearer: string;
  apiKey: string | null;
};

function connectionPriority(connection: CursorCliConnectionLike): number {
  return typeof connection.priority === "number" ? connection.priority : Number.MAX_SAFE_INTEGER;
}

function isCoolingDown(connection: CursorCliConnectionLike, nowMs: number): boolean {
  if (typeof connection.rateLimitedUntil !== "string") return false;
  const until = Date.parse(connection.rateLimitedUntil);
  return Number.isFinite(until) && until > nowMs;
}

async function resolveUpstreamConnection(
  deps: CursorCliProxyDeps
): Promise<ResolvedConnection | Response> {
  const connections = (await deps.listCursorConnections())
    .filter((connection) => !isCoolingDown(connection, deps.now()))
    .sort((a, b) => connectionPriority(a) - connectionPriority(b));
  if (connections.length === 0) {
    return connectError(
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      "unavailable",
      "No active Cursor API connection configured in OmniRoute"
    );
  }
  let lastError: unknown = null;
  for (const connection of connections) {
    const apiKey = isCursorApiKey(connection.apiKey) ? connection.apiKey : null;
    const accessToken = typeof connection.accessToken === "string" ? connection.accessToken : null;
    try {
      const bearer = await deps.resolveBearer({ apiKey, accessToken });
      return {
        connectionId: typeof connection.id === "string" ? connection.id : null,
        bearer,
        apiKey,
      };
    } catch (err) {
      lastError = err;
    }
  }
  const status =
    lastError instanceof CursorApiKeyExchangeError ? lastError.status : HTTP_STATUS.BAD_GATEWAY;
  const message = lastError instanceof Error ? lastError.message : "Cursor credential unavailable";
  return connectError(
    status,
    status === HTTP_STATUS.UNAUTHORIZED ? "unauthenticated" : "unavailable",
    message
  );
}

function buildUpstreamHeaders(request: Request, bearer: string): Headers {
  const headers = new Headers();
  request.headers.forEach((value, name) => {
    if (!REQUEST_HEADER_DENYLIST.has(name.toLowerCase())) headers.set(name, value);
  });
  headers.set("authorization", `Bearer ${bearer}`);
  return headers;
}

function buildDownstreamHeaders(upstream: Response): Headers {
  const headers = new Headers();
  upstream.headers.forEach((value, name) => {
    if (!RESPONSE_HEADER_DENYLIST.has(name.toLowerCase())) headers.set(name, value);
  });
  return headers;
}

type CallLogInput = {
  method: string;
  path: string;
  status: number;
  startedAt: number;
  principal: CursorCliPrincipal | null;
  connectionId: string | null;
  error?: string | null;
};

function recordCall(deps: CursorCliProxyDeps, input: CallLogInput): void {
  void deps
    .saveCallLog({
      method: input.method,
      path: `${CURSOR_CLI_PROXY_PREFIX}${input.path}`,
      status: input.status,
      model: "-",
      provider: PROVIDER_ID,
      connectionId: input.connectionId,
      duration: Math.max(0, deps.now() - input.startedAt),
      apiKeyId: input.principal?.apiKeyId ?? null,
      apiKeyName: input.principal?.apiKeyName ?? null,
      requestType: CURSOR_CLI_REQUEST_TYPE,
      sourceFormat: CURSOR_CLI_REQUEST_TYPE,
      targetFormat: CURSOR_CLI_REQUEST_TYPE,
      error: input.error ? { message: sanitizeErrorMessage(input.error) } : null,
    })
    .catch(() => undefined);
}

function streamWithCompletionLog(
  body: ReadableStream<Uint8Array>,
  onDone: (error?: string) => void
): ReadableStream<Uint8Array> {
  const reader = body.getReader();
  let settled = false;
  const settle = (error?: string) => {
    if (settled) return;
    settled = true;
    onDone(error);
  };
  return new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        const { done, value } = await reader.read();
        if (done) {
          settle();
          controller.close();
          return;
        }
        controller.enqueue(value);
      } catch (err) {
        settle(err instanceof Error ? err.message : "upstream stream failed");
        controller.error(err);
      }
    },
    cancel(reason) {
      settle(reason instanceof Error ? reason.message : "stream cancelled");
      return reader.cancel(reason);
    },
  });
}

async function handleExchange(
  request: Request,
  startedAt: number,
  deps: CursorCliProxyDeps
): Promise<Response> {
  if (request.method !== "POST") {
    return connectError(405, "unimplemented", "Use POST");
  }
  const rawBody = await request.text();
  if (rawBody.trim().length > 0) {
    let parsed: unknown;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return connectError(HTTP_STATUS.BAD_REQUEST, "invalid_argument", "Body must be JSON");
    }
    if (!exchangeBodySchema.safeParse(parsed).success) {
      return connectError(
        HTTP_STATUS.BAD_REQUEST,
        "invalid_argument",
        "Body must be a JSON object"
      );
    }
  }

  const principal = await authenticateExchange(request, deps);
  if (principal instanceof Response) {
    recordCall(deps, {
      method: request.method,
      path: CURSOR_API_KEY_EXCHANGE_PATH,
      status: principal.status,
      startedAt,
      principal: null,
      connectionId: null,
      error: "OmniRoute API key rejected",
    });
    return principal;
  }

  const secret = deps.getSecret();
  if (!secret || secret.trim().length === 0) {
    return connectError(
      HTTP_STATUS.SERVICE_UNAVAILABLE,
      "unavailable",
      "JWT_SECRET is not configured; the Cursor CLI passthrough cannot mint session tokens"
    );
  }

  const token = await mintCursorCliSessionToken(principal, secret, deps.now());
  recordCall(deps, {
    method: request.method,
    path: CURSOR_API_KEY_EXCHANGE_PATH,
    status: 200,
    startedAt,
    principal,
    connectionId: null,
  });
  return jsonResponse(200, { accessToken: token, refreshToken: token });
}

async function handleForward(
  request: Request,
  path: string,
  startedAt: number,
  deps: CursorCliProxyDeps
): Promise<Response> {
  const secret = deps.getSecret();
  const bearer = extractBearer(request);
  const principal =
    bearer && secret ? await verifyCursorCliSessionToken(bearer, secret, deps.now()) : null;
  if (!principal || !(await isPrincipalStillValid(principal, deps))) {
    return connectError(
      HTTP_STATUS.UNAUTHORIZED,
      "unauthenticated",
      "Missing or expired OmniRoute Cursor CLI session token"
    );
  }

  const resolved = await resolveUpstreamConnection(deps);
  if (resolved instanceof Response) {
    recordCall(deps, {
      method: request.method,
      path,
      status: resolved.status,
      startedAt,
      principal,
      connectionId: null,
      error: "No usable Cursor connection",
    });
    return resolved;
  }

  const search = new URL(request.url).search;
  const upstreamUrl = `${deps.upstreamBaseUrl}${path}${search}`;
  const hasBody = request.method !== "GET" && request.method !== "HEAD";
  let upstream: Response;
  try {
    upstream = await deps.fetchImpl(upstreamUrl, {
      method: request.method,
      headers: buildUpstreamHeaders(request, resolved.bearer),
      body: hasBody ? request.body : undefined,
      signal: request.signal,
      redirect: "manual",
      ...(hasBody ? { duplex: "half" } : {}),
    } as RequestInit);
  } catch (err) {
    const message = err instanceof Error ? err.message : "upstream request failed";
    recordCall(deps, {
      method: request.method,
      path,
      status: HTTP_STATUS.BAD_GATEWAY,
      startedAt,
      principal,
      connectionId: resolved.connectionId,
      error: message,
    });
    return connectError(HTTP_STATUS.BAD_GATEWAY, "unavailable", message);
  }

  if (upstream.status === HTTP_STATUS.UNAUTHORIZED && resolved.apiKey) {
    deps.invalidateBearer(resolved.apiKey);
  }

  const logInput: CallLogInput = {
    method: request.method,
    path,
    status: upstream.status,
    startedAt,
    principal,
    connectionId: resolved.connectionId,
  };
  const headers = buildDownstreamHeaders(upstream);
  if (!upstream.body) {
    recordCall(deps, logInput);
    return new Response(null, { status: upstream.status, headers });
  }
  const body = streamWithCompletionLog(upstream.body, (error) =>
    recordCall(deps, { ...logInput, error: error ?? null })
  );
  return new Response(body, { status: upstream.status, headers });
}

export async function handleCursorCliProxy(
  request: Request,
  segments: readonly string[],
  overrides: Partial<CursorCliProxyDeps> = {}
): Promise<Response> {
  const deps: CursorCliProxyDeps = { ...defaultDeps, ...overrides };
  const startedAt = deps.now();
  const path = normalizeCursorCliPath(segments);
  if (path === CURSOR_API_KEY_EXCHANGE_PATH) {
    return handleExchange(request, startedAt, deps);
  }
  return handleForward(request, path, startedAt, deps);
}
