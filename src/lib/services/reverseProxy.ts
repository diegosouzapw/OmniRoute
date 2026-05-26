/**
 * Generic reverse-proxy helper for embedded service UIs.
 *
 * Forwards HTTP traffic to a locally-running embedded service so its web UI
 * can be iframed inside the OmniRoute dashboard without CORS issues.
 *
 * Security:
 *   - Target URL is constructed from the service's registered port — never
 *     from user input — eliminating SSRF risk.
 *   - Routes that use this helper must be classified LOCAL_ONLY in routeGuard.ts;
 *     loopback enforcement blocks all non-loopback access before any handler runs.
 *   - Client cookies and Authorization headers are stripped before forwarding
 *     to prevent credential leakage between OmniRoute and the embedded service.
 *   - Upstream set-cookie, x-frame-options, content-security-policy, and
 *     cross-origin-* headers are stripped from responses so the iframe is not
 *     broken by the embedded service's own security policies.
 *   - HTML responses are rewritten (parse5) so path-absolute URLs work through
 *     the proxy prefix.
 */

import { getSupervisor } from "@/lib/services/registry";
import { getOrCreateApiKey } from "@/lib/services/apiKey";
import { rewriteHtml } from "@/lib/services/htmlRewriter";
import { createErrorResponse } from "@/lib/api/errorResponse";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";

// ─── constants ────────────────────────────────────────────────────────────────

/** Standard hop-by-hop headers that must never be forwarded. */
export const HOP_BY_HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
]);

/**
 * Request headers stripped before forwarding to the embedded service.
 * Prevents OmniRoute session cookies and Authorization from leaking upstream.
 */
export const STRIPPED_REQUEST_HEADERS = new Set(["cookie", "authorization"]);

/**
 * Response headers stripped before returning to the browser.
 *
 * - set-cookie: prevents the embedded service from setting cookies in the
 *   OmniRoute origin, which would conflict with session management.
 * - content-security-policy / content-security-policy-report-only: the
 *   embedded service's CSP is irrelevant inside the OmniRoute iframe.
 * - x-frame-options: would block the iframe entirely if set to DENY/SAMEORIGIN
 *   by the embedded service (OmniRoute controls framing via its own CSP).
 * - cross-origin-*: remove COOP/COEP/CORP that could break the framed page.
 */
export const STRIPPED_RESPONSE_HEADERS = new Set([
  "set-cookie",
  "content-security-policy",
  "content-security-policy-report-only",
  "x-frame-options",
  "cross-origin-embedder-policy",
  "cross-origin-opener-policy",
  "cross-origin-resource-policy",
]);

export const PROXY_TIMEOUT_MS = 30_000;

// ─── public interface ─────────────────────────────────────────────────────────

export interface ReverseProxyConfig {
  /** Service name used for supervisor lookup and API key retrieval. */
  name: string;
  /** Proxy prefix path (e.g. "/dashboard/providers/services/9router/embed"). */
  publicPrefix: string;
  /** When true, HTML responses are rewritten via htmlRewriter. Default: true. */
  htmlRewrite?: boolean;
  // Future: stripCookies, injectHeaders, etc.
}

/**
 * Proxy a request through to the locally-running embedded service identified
 * by `config.name`.
 *
 * Resolves the upstream port from the registered supervisor, builds the
 * upstream URL from `pathSegments`, forwards safe headers, injects the
 * service's own API key, and returns the upstream response with
 * security-conflicting headers stripped.
 *
 * @param request      The incoming Next.js route Request.
 * @param pathSegments The `[...path]` catch-all segments, e.g. `["ui", "index.html"]`.
 * @param config       Proxy configuration (service name + public prefix).
 */
export async function proxyRequest(
  request: Request,
  pathSegments: string[],
  config: ReverseProxyConfig
): Promise<Response> {
  const { name, publicPrefix, htmlRewrite = true } = config;

  const supervisor = getSupervisor(name);
  if (!supervisor) {
    return createErrorResponse({ status: 404, message: `Service '${name}' not found.` });
  }

  const { state, port } = supervisor.getStatus();
  if (state !== "running") {
    return createErrorResponse({
      status: 503,
      message: `Service '${name}' is not running (state: ${state}).`,
    });
  }

  const incomingUrl = new URL(request.url);
  const upstreamPath = pathSegments.length > 0 ? "/" + pathSegments.join("/") : "/";
  const upstreamUrl = `http://127.0.0.1:${port}${upstreamPath}${incomingUrl.search}`;

  // Build forwarded headers: strip hop-by-hop AND sensitive client headers.
  const forwardHeaders = new Headers();
  for (const [k, v] of request.headers.entries()) {
    const lower = k.toLowerCase();
    if (!HOP_BY_HOP.has(lower) && !STRIPPED_REQUEST_HEADERS.has(lower)) {
      forwardHeaders.set(k, v);
    }
  }
  forwardHeaders.set("host", `127.0.0.1:${port}`);

  // Inject the embedded service's own API key so upstream can authenticate.
  const apiKey = await getOrCreateApiKey(name);
  forwardHeaders.set("authorization", `Bearer ${apiKey}`);

  const hasBody = request.method !== "GET" && request.method !== "HEAD";

  try {
    const upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers: forwardHeaders,
      body: hasBody ? request.body : undefined,
      // @ts-expect-error -- duplex is required by the Fetch spec for streaming
      // request bodies but is not yet in the TS DOM lib (Node.js 18+ supports it).
      duplex: hasBody ? "half" : undefined,
      signal: AbortSignal.timeout(PROXY_TIMEOUT_MS),
    });

    // Build response headers: strip hop-by-hop and security-conflicting headers.
    const responseHeaders = new Headers();
    for (const [k, v] of upstream.headers.entries()) {
      const lower = k.toLowerCase();
      if (!HOP_BY_HOP.has(lower) && !STRIPPED_RESPONSE_HEADERS.has(lower)) {
        responseHeaders.set(k, v);
      }
    }
    // Prevent Next.js from caching the proxied response.
    responseHeaders.set("cache-control", "no-store");

    const contentType = upstream.headers.get("content-type") ?? "";

    // HTML responses: buffer, rewrite links, return as string.
    if (htmlRewrite && contentType.startsWith("text/html")) {
      const html = await upstream.text();
      const rewritten = rewriteHtml(html, publicPrefix);
      return new Response(rewritten, {
        status: upstream.status,
        headers: responseHeaders,
      });
    }

    // All other content types: stream through unchanged.
    return new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });
  } catch (err) {
    const msg = sanitizeErrorMessage(err instanceof Error ? err.message : String(err));
    return createErrorResponse({ status: 502, message: `Proxy error: ${msg}` });
  }
}
