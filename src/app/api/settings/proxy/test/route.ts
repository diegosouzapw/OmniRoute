import { request as undiciRequest } from "undici";
import {
  createProxyDispatcher,
  isSocks5ProxyEnabled,
  proxyConfigToUrl,
  proxyUrlForLogs,
} from "@omniroute/open-sse/utils/proxyDispatcher.ts";
import { testProxySchema } from "@/shared/validation/schemas";
import { isValidationFailure, validateBody } from "@/shared/validation/helpers";
import { createErrorResponse, createErrorResponseFromUnknown } from "@/lib/api/errorResponse";
import { getProxyById } from "@/lib/localDb";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

const BASE_SUPPORTED_PROXY_TYPES = new Set(["http", "https"]);

function getErrorMessage(error: unknown, fallbackMessage: string): string {
  return sanitizeErrorMessage(error) || fallbackMessage;
}

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
export async function POST(request: Request) {
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
    const validation = validateBody(testProxySchema, rawBody);
    if (isValidationFailure(validation)) {
      return createErrorResponse({
        status: 400,
        message: validation.error.message,
        details: validation.error.details,
        type: "invalid_request",
      });
    }
    let { proxy } = validation.data;

    // If a proxyId is provided, look up the real (non-redacted) credentials from DB.
    // The frontend sends redacted credentials (***) from listProxies(), so we need
    // the actual secrets for testing.
    const body = rawBody as Record<string, unknown>;
    const proxyId = typeof body.proxyId === "string" ? body.proxyId.trim() : null;
    let dbProxyNotes: string | null = null;
    if (proxyId) {
      const dbProxy = await getProxyById(proxyId, { includeSecrets: true });
      if (dbProxy) {
        proxy = {
          ...proxy,
          host: proxy.host || dbProxy.host,
          port: proxy.port || String(dbProxy.port),
          type: proxy.type || dbProxy.type,
          username: dbProxy.username,
          password: dbProxy.password,
        };
        dbProxyNotes = dbProxy.notes ?? null;
      }
    }

    const proxyType = String(proxy.type || "http").toLowerCase();

    // Vercel Relay: test by hitting ipify via the relay headers
    if (proxyType === "vercel") {
      const relayHost = proxy.host;
      // relayAuth lives in notes JSON: { relayAuth } stored by the vercel-deploy route.
      // proxy.password is empty for relay entries; parse notes instead.
      let relayAuth = "";
      if (dbProxyNotes) {
        try {
          const parsed = JSON.parse(dbProxyNotes) as { relayAuth?: string };
          relayAuth = parsed.relayAuth ?? "";
        } catch {}
      }
      // Fallback: ad-hoc callers may pass relayAuth in the password field
      if (!relayAuth) relayAuth = proxy.password ?? "";
      const relayUrl = `https://${relayHost}`;
      const start = Date.now();
      const controller2 = new AbortController();
      const timeout2 = setTimeout(() => controller2.abort(), 10000);
      try {
        // Send request to the relay URL with relay headers; relay forwards to ipify
        const res = await undiciRequest(`${relayUrl}/`, {
          method: "GET",
          signal: controller2.signal,
          headersTimeout: 10000,
          bodyTimeout: 10000,
          headers: {
            "x-relay-target": "https://api64.ipify.org",
            "x-relay-path": "/?format=json",
            "x-relay-auth": relayAuth,
          },
        });
        const text = await res.body.text();
        let parsedIp: { ip?: string } = {};
        try {
          parsedIp = JSON.parse(text) as { ip?: string };
        } catch {}
        return Response.json({
          success: res.statusCode === 200,
          publicIp: parsedIp.ip || null,
          latencyMs: Date.now() - start,
          proxyUrl: relayUrl,
        });
      } catch (relayErr) {
        return Response.json({
          success: false,
          error:
            relayErr instanceof Error && relayErr.name === "AbortError"
              ? "Connection timeout (10s)"
              : getErrorMessage(relayErr, "Relay test failed"),
          latencyMs: Date.now() - start,
          proxyUrl: relayUrl,
        });
      } finally {
        clearTimeout(timeout2);
      }
    }

    if (proxyType === "socks5" && !isSocks5ProxyEnabled()) {
      return createErrorResponse({
        status: 400,
        message: "SOCKS5 proxy is disabled (set ENABLE_SOCKS5_PROXY=true to enable)",
        type: "invalid_request",
      });
    }
    if (proxyType.startsWith("socks") && proxyType !== "socks5") {
      return createErrorResponse({
        status: 400,
        message: `proxy.type must be ${supportedTypesMessage()}`,
        type: "invalid_request",
      });
    }
    if (!getSupportedProxyTypes().has(proxyType)) {
      return createErrorResponse({
        status: 400,
        message: `proxy.type must be ${supportedTypesMessage()}`,
        type: "invalid_request",
      });
    }

    let proxyUrl: string;
    try {
      const normalizedProxyUrl = proxyConfigToUrl(
        {
          type: proxyType,
          host: proxy.host,
          port: proxy.port,
          username: proxy.username || "",
          password: proxy.password || "",
        },
        { allowSocks5: isSocks5ProxyEnabled() }
      );
      if (!normalizedProxyUrl) {
        return createErrorResponse({
          status: 400,
          message: "Invalid proxy configuration",
          type: "invalid_request",
        });
      }
      proxyUrl = normalizedProxyUrl;
    } catch (proxyError) {
      return createErrorResponse({
        status: 400,
        message: getErrorMessage(proxyError, "Invalid proxy configuration"),
        type: "invalid_request",
      });
    }

    const publicProxyUrl = proxyUrlForLogs(proxyUrl);

    const startTime = Date.now();
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const dispatcher = createProxyDispatcher(proxyUrl);

    try {
      const result = await undiciRequest("https://api64.ipify.org?format=json", {
        method: "GET",
        dispatcher,
        signal: controller.signal,
        headersTimeout: 10000,
        bodyTimeout: 10000,
      });

      const responseText = await result.body.text();
      let parsed: { ip?: string };
      try {
        const parsedJson = JSON.parse(responseText);
        if (parsedJson && typeof parsedJson === "object") {
          parsed = parsedJson as { ip?: string };
        } else {
          parsed = { ip: String(parsedJson) };
        }
      } catch {
        parsed = { ip: responseText.trim() };
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
          fetchError instanceof Error && fetchError.name === "AbortError"
            ? "Connection timeout (10s)"
            : getErrorMessage(fetchError, "Connection failed"),
        latencyMs: Date.now() - startTime,
        proxyUrl: publicProxyUrl,
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    return createErrorResponseFromUnknown(error, "Unexpected server error");
  }
}
