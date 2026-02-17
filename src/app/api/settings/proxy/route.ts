import {
  getProxyConfig,
  setProxyConfig,
  getProxyForLevel,
  deleteProxyForLevel,
  resolveProxyForConnection,
} from "../../../../lib/localDb";

const BASE_SUPPORTED_PROXY_TYPES = new Set(["http", "https"]);

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

function createInvalidProxyError(message: string) {
  const error: any = new Error(message);
  error.status = 400;
  error.type = "invalid_request";
  return error;
}

function normalizeAndValidateProxy(proxy, pathLabel) {
  if (proxy === null || proxy === undefined) return proxy;
  if (typeof proxy !== "object" || Array.isArray(proxy)) {
    throw createInvalidProxyError(`${pathLabel} must be an object`);
  }

  const type = String(proxy.type || "http").toLowerCase();
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

  return { ...proxy, type };
}

function normalizeAndValidateProxyMap(proxyMap, mapName) {
  if (proxyMap === undefined) return undefined;
  if (proxyMap === null || typeof proxyMap !== "object" || Array.isArray(proxyMap)) {
    throw createInvalidProxyError(`${mapName} must be an object`);
  }

  const normalizedMap = { ...proxyMap };
  for (const [id, proxy] of Object.entries(proxyMap)) {
    normalizedMap[id] = normalizeAndValidateProxy(proxy, `${mapName}.${id}`);
  }
  return normalizedMap;
}

function normalizeProxyPayload(body) {
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
export async function GET(request) {
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

    // Get proxy for a specific level
    if (level) {
      const proxy = await getProxyForLevel(level, id);
      return Response.json({ level, id, proxy });
    }

    // Get full config
    const config = await getProxyConfig();
    return Response.json(config);
  } catch (error) {
    return Response.json(
      { error: { message: error.message, type: "server_error" } },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/settings/proxy — update proxy configuration
 * Body: { level, id?, proxy } or legacy { global?, providers? }
 */
export async function PUT(request) {
  try {
    const body = await request.json();
    const normalizedBody = normalizeProxyPayload(body);
    const updated = await setProxyConfig(normalizedBody);
    return Response.json(updated);
  } catch (error) {
    const status = Number(error?.status) || 500;
    const type = error?.type || (status === 400 ? "invalid_request" : "server_error");
    return Response.json({ error: { message: error.message, type } }, { status });
  }
}

/**
 * DELETE /api/settings/proxy — remove proxy at a level
 * Query: ?level=provider&id=xxx
 */
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get("level");
    const id = searchParams.get("id");

    if (!level) {
      return Response.json(
        { error: { message: "level is required", type: "invalid_request" } },
        { status: 400 }
      );
    }

    const updated = await deleteProxyForLevel(level, id);
    return Response.json(updated);
  } catch (error) {
    return Response.json(
      { error: { message: error.message, type: "server_error" } },
      { status: 500 }
    );
  }
}
