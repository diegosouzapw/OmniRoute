import { request as undiciRequest } from "undici";
import {
  createProxyDispatcher,
  isSocks5ProxyEnabled,
  proxyConfigToUrl,
  proxyUrlForLogs,
} from "@omniroute/open-sse/utils/proxyDispatcher.ts";

const BASE_SUPPORTED_PROXY_TYPES = new Set(["http", "https"]);

function getSupportedProxyTypes() {
  if (isSocks5ProxyEnabled()) {
    return new Set([...BASE_SUPPORTED_PROXY_TYPES, "socks5"]);
  }
  return BASE_SUPPORTED_PROXY_TYPES;
}

function supportedTypesMessage() {
  return isSocks5ProxyEnabled() ? "http, https, or socks5" : "http or https";
}

/**
 * POST /api/settings/proxy/test — test proxy connectivity
 * Body: { proxy: { type, host, port, username?, password? } }
 * Returns: { success, publicIp?, latencyMs?, error? }
 */
export async function POST(request) {
  try {
    const { proxy } = await request.json();

    if (!proxy || !proxy.host || !proxy.port) {
      return Response.json(
        { error: { message: "proxy.host and proxy.port are required", type: "invalid_request" } },
        { status: 400 }
      );
    }

    const proxyType = String(proxy.type || "http").toLowerCase();
    if (proxyType === "socks5" && !isSocks5ProxyEnabled()) {
      return Response.json(
        {
          error: {
            message: "SOCKS5 proxy is disabled (set ENABLE_SOCKS5_PROXY=true to enable)",
            type: "invalid_request",
          },
        },
        { status: 400 }
      );
    }
    if (proxyType.startsWith("socks") && proxyType !== "socks5") {
      return Response.json(
        {
          error: {
            message: `proxy.type must be ${supportedTypesMessage()}`,
            type: "invalid_request",
          },
        },
        { status: 400 }
      );
    }
    if (!getSupportedProxyTypes().has(proxyType)) {
      return Response.json(
        {
          error: {
            message: `proxy.type must be ${supportedTypesMessage()}`,
            type: "invalid_request",
          },
        },
        { status: 400 }
      );
    }

    let proxyUrl;
    try {
      proxyUrl = proxyConfigToUrl(
        {
          type: proxyType,
          host: proxy.host,
          port: proxy.port,
          username: proxy.username || "",
          password: proxy.password || "",
        },
        { allowSocks5: isSocks5ProxyEnabled() }
      );
    } catch (proxyError) {
      return Response.json(
        {
          error: {
            message: proxyError.message || "Invalid proxy configuration",
            type: "invalid_request",
          },
        },
        { status: 400 }
      );
    }

    const publicProxyUrl = proxyUrlForLogs(proxyUrl);

    const startTime = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const dispatcher = createProxyDispatcher(proxyUrl);

    try {
      const result = await undiciRequest("https://api.ipify.org?format=json", {
        method: "GET",
        dispatcher,
        signal: controller.signal,
        headersTimeout: 10000,
        bodyTimeout: 10000,
      });

      const rawBody = await result.body.text();
      let parsed;
      try {
        parsed = JSON.parse(rawBody);
      } catch {
        parsed = { ip: rawBody.trim() };
      }

      return Response.json({
        success: true,
        publicIp: parsed.ip || null,
        latencyMs: Date.now() - startTime,
        proxyUrl: publicProxyUrl,
      });
    } catch (fetchError) {
      return Response.json({
        success: false,
        error:
          fetchError.name === "AbortError"
            ? "Connection timeout (10s)"
            : fetchError.message || "Connection failed",
        latencyMs: Date.now() - startTime,
        proxyUrl: publicProxyUrl,
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    return Response.json(
      { error: { message: error.message, type: "server_error" } },
      { status: 500 }
    );
  }
}
