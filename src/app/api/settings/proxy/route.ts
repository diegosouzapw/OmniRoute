import {
  getProxyConfig,
  setProxyConfig,
  getProxyForLevel,
  deleteProxyForLevel,
  resolveProxyForConnection,
  getProxyAssignments,
  getProxyById,
} from "../../../../lib/localDb";
import { clearDispatcherCache } from "@omniroute/open-sse/utils/proxyDispatcher";
import { updateProxyConfigSchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import {
  createErrorResponse,
  createErrorResponseFromUnknown,
  type ApiErrorType,
} from "@/lib/api/errorResponse";
import type { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

const BASE_SUPPORTED_PROXY_TYPES = new Set(["http", "https"]);
type UpdateProxyConfigInput = z.infer<typeof updateProxyConfigSchema>;
type ProxyConfigInput = NonNullable<UpdateProxyConfigInput["proxy"]>;
type ProxyMapInput = Record<string, ProxyConfigInput | null>;
type ApiRouteError = Error & { status?: number; type?: string };

function isSocks5Enabled() {
  return process.env.ENABLE_SOCKS5_PROXY === "true";
}

function getSupportedProxyTypes() {
  if (isSocks5Enabled()) {
    return new Set([...BASE_SUPPORTED_PROXY_TYPES, "socks5"]);
  }
  return BASE_SUPPORTED_PROXY_TYPES;
}

function supportedTypesMessage() {
  return isSocks5Enabled() ? "http, https, or socks5" : "http or https";
}

function createInvalidProxyError(message: string): ApiRouteError {
  const error = new Error(message) as ApiRouteError;
  error.status = 400;
  error.type = "invalid_request";
  return error;
}

function toApiRouteError(error: unknown): ApiRouteError {
  if (error instanceof Error) {
    return error as ApiRouteError;
  }
  return new Error("Unexpected error") as ApiRouteError;
}

function normalizeAndValidateProxy(
  proxy: ProxyConfigInput | null | undefined,
  pathLabel: string
): ProxyConfigInput | null | undefined {
  if (proxy === null || proxy === undefined) return proxy;
  if (typeof proxy !== "object" || Array.isArray(proxy)) {
    throw createInvalidProxyError(`${pathLabel} must be an object`);
  }

  const type = String(proxy.type || "http").toLowerCase() as NonNullable<ProxyConfigInput["type"]>;
  if (type === "socks5" && !isSocks5Enabled()) {
    throw createInvalidProxyError(
      "SOCKS5 proxy is disabled (set ENABLE_SOCKS5_PROXY=true to enable)"
    );
  }
  if (type.startsWith("socks") && type !== "socks5") {
    throw createInvalidProxyError(`${pathLabel}.type must be ${supportedTypesMessage()}`);
  }
  if (!getSupportedProxyTypes().has(type)) {
    throw createInvalidProxyError(`${pathLabel}.type must be ${supportedTypesMessage()}`);
  }

  return { ...proxy, type } as ProxyConfigInput;
}

function normalizeAndValidateProxyMap(
  proxyMap: ProxyMapInput | undefined,
  mapName: string
): ProxyMapInput | undefined {
  if (proxyMap === undefined) return undefined;
  if (proxyMap === null || typeof proxyMap !== "object" || Array.isArray(proxyMap)) {
    throw createInvalidProxyError(`${mapName} must be an object`);
  }

  const normalizedMap: ProxyMapInput = { ...proxyMap };
  for (const [id, proxy] of Object.entries(proxyMap) as Array<[string, ProxyConfigInput | null]>) {
    const normalizedProxy = normalizeAndValidateProxy(proxy, `${mapName}.${id}`);
    normalizedMap[id] = normalizedProxy ?? null;
  }
  return normalizedMap;
}

function normalizeProxyPayload(body: UpdateProxyConfigInput): UpdateProxyConfigInput {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw createInvalidProxyError("Request body must be an object");
  }

  const normalized = { ...body };
  if (Object.prototype.hasOwnProperty.call(body, "proxy")) {
    normalized.proxy = normalizeAndValidateProxy(body.proxy, "proxy");
  }
  if (Object.prototype.hasOwnProperty.call(body, "global")) {
    normalized.global = normalizeAndValidateProxy(body.global, "global");
  }
  for (const key of ["providers", "combos", "keys"]) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      normalized[key] = normalizeAndValidateProxyMap(body[key], key);
    }
  }
  return normalized;
}

/**
 * GET /api/settings/proxy — get proxy configuration
 * Optional query params: ?level=global|provider|combo|key&id=xxx
 * Or: ?resolve=connectionId to resolve effective proxy
 */
export async function GET(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");
    const id = searchParams.get("id");
    const resolveId = searchParams.get("resolve");

    // Resolve effective proxy for a connection
    if (resolveId) {
      const result = await resolveProxyForConnection(resolveId);
      return Response.json(result);
    }

    // Get proxy for a specific level - check Proxy Registry first
    if (level === "global") {
      const assignments = await getProxyAssignments({ scope: "global" });
      if (assignments.length > 0 && assignments[0].proxyId) {
        const proxyData = await getProxyById(assignments[0].proxyId, { includeSecrets: true });
        if (proxyData) {
          return Response.json({
            level: "global",
            id: null,
            proxy: {
              type: proxyData.type,
              host: proxyData.host,
              port: proxyData.port,
              username: proxyData.username,
              password: proxyData.password,
            },
          });
        }
      }
      // Fallback to old system
      const proxy = await getProxyForLevel(level, id);
      return Response.json({ level, id, proxy });
    }

    if (level) {
      const proxy = await getProxyForLevel(level, id);
      return Response.json({ level, id, proxy });
    }

    // Get full config
    const config = await getProxyConfig();
    return Response.json(config);
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to load proxy config");
  }
}

/**
 * PUT /api/settings/proxy — update proxy configuration
 * Body: { level, id?, proxy } or legacy { global?, providers? }
 */
export async function PUT(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return createErrorResponse({
      status: 400,
      message: "Invalid JSON body",
      type: "invalid_request",
    });
  }

  try {
    const validation = validateBody(updateProxyConfigSchema, rawBody);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }
    const body = validation.data;
    const normalizedBody = normalizeProxyPayload(body);
    const updated = await setProxyConfig(normalizedBody);
    clearDispatcherCache();
    return Response.json(updated);
  } catch (error) {
    const routeError = toApiRouteError(error);
    const status = Number(routeError.status) || 500;
    const type = (routeError.type ||
      (status === 400 ? "invalid_request" : "server_error")) as ApiErrorType;
    return createErrorResponse({ status, message: routeError.message, type });
  }
}

/**
 * DELETE /api/settings/proxy — remove proxy at a level
 * Query: ?level=provider&id=xxx
 */
export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");
    const id = searchParams.get("id");

    if (!level) {
      return createErrorResponse({
        status: 400,
        message: "level is required",
        type: "invalid_request",
      });
    }

    const updated = await deleteProxyForLevel(level, id);
    clearDispatcherCache();
    return Response.json(updated);
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Failed to delete proxy");
  }
}
