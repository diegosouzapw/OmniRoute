/**
 * Proxy tunnelling for the Cursor executor's raw HTTP/2 transport.
 *
 * Every other egress path in OmniRoute is proxy-aware because it goes through
 * `fetch` (patched globally) or the undici dispatcher. The Cursor agent
 * transport is the exception: it calls `http2.connect()` directly, which opens
 * its own TCP/TLS socket and therefore ignores the provider proxy configured in
 * the dashboard as well as HTTPS_PROXY/ALL_PROXY. The result is a silent egress
 * leak — requests the operator believes are proxied go out on the host IP.
 *
 * This module builds the socket `http2.connect()` should use instead:
 *   HTTP(S) proxy -> CONNECT tunnel, SOCKS proxy -> SocksClient, then the
 *   caller wraps the returned socket in TLS with ALPN "h2".
 *
 * Proxy selection is delegated to `resolveProxyForRequest()` so the Cursor path
 * honours exactly the same precedence as the rest of the codebase (per-request
 * proxy context from the dashboard assignment -> environment -> direct) and the
 * same NO_PROXY / local-address bypasses.
 */
import net from "node:net";
import tls from "node:tls";

import { resolveProxyForRequest } from "../../utils/proxyFetch.ts";

const DEFAULT_TUNNEL_TIMEOUT_MS = 15_000;
const HEADER_TERMINATOR = "\r\n\r\n";

export type ProxyTunnelOptions = {
  targetHost: string;
  targetPort: number;
  proxyUrl: string;
  signal?: AbortSignal;
  timeoutMs?: number;
};

export type ConnectResponse = {
  status: number;
  /** Byte offset just past the CONNECT response header block. */
  headerEnd: number;
};

/**
 * Resolve the proxy URL that a Cursor HTTP/2 request to `targetUrl` must use,
 * or `null` for a direct connection. Thin wrapper over the shared resolver so
 * the executor never re-implements precedence or bypass rules.
 */
export function resolveCursorH2ProxyUrl(targetUrl: string): string | null {
  try {
    const resolved = resolveProxyForRequest(targetUrl) as {
      proxyUrl?: string | null;
    } | null;
    const proxyUrl = resolved?.proxyUrl;
    return typeof proxyUrl === "string" && proxyUrl.length > 0 ? proxyUrl : null;
  } catch {
    // Proxy resolution must never break the request: fall back to direct.
    return null;
  }
}

/** Split an https URL into the host/port pair the CONNECT hop must target. */
export function parseH2Authority(targetUrl: string): { host: string; port: number } {
  const url = new URL(targetUrl);
  return { host: url.hostname, port: Number(url.port) || 443 };
}

/**
 * Wrap an established tunnel socket in TLS negotiated for HTTP/2, which is what
 * `http2.connect({ createConnection })` expects to receive.
 */
export function tlsConnectOverTunnel(socket: net.Socket, servername: string): tls.TLSSocket {
  return tls.connect({
    socket,
    servername,
    ALPNProtocols: ["h2"],
  });
}

/** Build the CONNECT request for an HTTP proxy hop, with optional Basic auth. */
export function buildConnectRequest(host: string, port: number, proxy: URL): Buffer {
  const authority = `${host}:${port}`;
  const lines = [`CONNECT ${authority} HTTP/1.1`, `Host: ${authority}`];

  if (proxy.username || proxy.password) {
    // URL components arrive percent-encoded; the wire value must be the raw pair.
    const user = decodeURIComponent(proxy.username);
    const pass = decodeURIComponent(proxy.password);
    const token = Buffer.from(`${user}:${pass}`, "utf8").toString("base64");
    lines.push(`Proxy-Authorization: Basic ${token}`);
  }

  lines.push("Proxy-Connection: keep-alive");
  return Buffer.from(`${lines.join("\r\n")}${HEADER_TERMINATOR}`, "utf8");
}

/**
 * Parse a CONNECT response. Returns `null` while the header block is still
 * incomplete so the caller can keep buffering.
 */
export function parseConnectResponse(buffer: Buffer): ConnectResponse | null {
  const text = buffer.toString("latin1");
  const terminator = text.indexOf(HEADER_TERMINATOR);
  if (terminator === -1) return null;

  const statusLine = text.slice(0, text.indexOf("\r\n"));
  const match = /^HTTP\/\d(?:\.\d)?\s+(\d{3})/.exec(statusLine);
  return {
    status: match ? Number(match[1]) : 0,
    headerEnd: terminator + HEADER_TERMINATOR.length,
  };
}

const SOCKS_PROTOCOLS: ReadonlySet<string> = new Set([
  "socks:",
  "socks4:",
  "socks4a:",
  "socks5:",
  "socks5h:",
]);

/**
 * True for every SOCKS spelling the proxy settings accept. `socks5h`/`socks4a`
 * (remote DNS) used to fall through to the HTTP CONNECT path and fail.
 */
export function isSocksProxyProtocol(protocol: string): boolean {
  return SOCKS_PROTOCOLS.has(protocol);
}

async function createSocksTunnel(options: ProxyTunnelOptions, proxy: URL): Promise<net.Socket> {
  const { SocksClient } = await import("socks");
  const type = proxy.protocol === "socks4:" || proxy.protocol === "socks4a:" ? 4 : 5;
  const { socket } = await SocksClient.createConnection({
    proxy: {
      host: proxy.hostname,
      port: Number(proxy.port) || 1080,
      type,
      ...(proxy.username ? { userId: decodeURIComponent(proxy.username) } : {}),
      ...(proxy.password ? { password: decodeURIComponent(proxy.password) } : {}),
    },
    command: "connect",
    destination: { host: options.targetHost, port: options.targetPort },
    timeout: options.timeoutMs ?? DEFAULT_TUNNEL_TIMEOUT_MS,
  });
  return socket;
}

/**
 * Open a TCP tunnel to `targetHost:targetPort` through `proxyUrl`. The returned
 * socket carries plain bytes; the caller is responsible for the TLS handshake
 * (ALPN "h2") on top of it.
 */
export function createProxyTunnelSocket(options: ProxyTunnelOptions): Promise<net.Socket> {
  const proxy = new URL(options.proxyUrl);
  if (isSocksProxyProtocol(proxy.protocol)) {
    return createSocksTunnel(options, proxy);
  }

  const timeoutMs = options.timeoutMs ?? DEFAULT_TUNNEL_TIMEOUT_MS;

  return new Promise<net.Socket>((resolve, reject) => {
    let settled = false;
    let buffered = Buffer.alloc(0);

    const isTlsProxy = proxy.protocol === "https:";
    const port = Number(proxy.port) || (isTlsProxy ? 443 : 80);
    // An https:// proxy speaks TLS before CONNECT. Writing CONNECT in cleartext
    // makes it drop the connection and would expose Proxy-Authorization.
    const socket: net.Socket = isTlsProxy
      ? tls.connect({ host: proxy.hostname, port, servername: proxy.hostname })
      : net.connect({ host: proxy.hostname, port });
    const readyEvent = isTlsProxy ? "secureConnect" : "connect";

    const timer = setTimeout(() => {
      fail(new Error(`Proxy CONNECT to ${options.targetHost} timed out after ${timeoutMs}ms`));
    }, timeoutMs);

    const cleanup = () => {
      clearTimeout(timer);
      socket.removeListener("data", onData);
      socket.removeListener("error", onError);
      socket.removeListener("close", onClose);
      if (options.signal) options.signal.removeEventListener("abort", onAbort);
    };

    function fail(error: Error) {
      if (settled) return;
      settled = true;
      cleanup();
      socket.destroy();
      reject(error);
    }

    function onError(error: Error) {
      fail(error);
    }

    function onClose() {
      fail(new Error("Proxy closed the connection before the CONNECT tunnel was established"));
    }

    function onAbort() {
      fail(new Error("aborted"));
    }

    function onData(chunk: Buffer) {
      buffered = buffered.length === 0 ? Buffer.from(chunk) : Buffer.concat([buffered, chunk]);
      const parsed = parseConnectResponse(buffered);
      if (!parsed) return;

      if (parsed.status !== 200) {
        fail(new Error(`Proxy refused CONNECT with HTTP ${parsed.status}`));
        return;
      }

      settled = true;
      cleanup();
      // Bytes past the header block already belong to the tunnelled stream
      // (a fast proxy can coalesce them into the same TCP segment). Push them
      // back so the TLS layer above does not lose the ServerHello.
      const leftover = buffered.subarray(parsed.headerEnd);
      if (leftover.length > 0) socket.unshift(leftover);
      resolve(socket);
    }

    socket.on("data", onData);
    socket.on("error", onError);
    socket.on("close", onClose);
    if (options.signal) {
      if (options.signal.aborted) {
        fail(new Error("aborted"));
        return;
      }
      options.signal.addEventListener("abort", onAbort, { once: true });
    }

    socket.once(readyEvent, () => {
      socket.write(buildConnectRequest(options.targetHost, options.targetPort, proxy));
    });
  });
}
