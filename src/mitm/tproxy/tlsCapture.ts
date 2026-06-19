/**
 * Fase 3 / Epic A — TLS-terminating capture for the TPROXY mode (decrypt 2/N).
 *
 * The transparent listener (#4169 `captureMode.ts`) intercepts LOCAL outbound
 * connections and, so far, raw-pipes them to the original destination — bodies
 * stay opaque. This module is the decrypt engine: given a raw intercepted socket
 * plus its original destination, it
 *
 *   1. TLS-terminates the CLIENT side with a per-SNI leaf issued on demand by the
 *      dynamic CA (`dynamicCert.ts`, #4173) — the client must trust that CA;
 *   2. feeds the decrypted plaintext to an internal `http.Server` (Node parses the
 *      request automatically, exactly like `inspector/httpProxyServer.ts`);
 *   3. captures the exchange into the Traffic Inspector buffer with
 *      `source: "tproxy"` (sanitized headers + masked bodies);
 *   4. forwards the request to the original destination, RE-encrypted. The forward
 *      seam is injected so the real path can mark its upstream socket with the
 *      bypass SO_MARK (`connectMarked`) — without that, the OUTPUT-based TPROXY
 *      rule would re-intercept the proxy's own forward and loop.
 *
 * Every effectful seam (`buffer`, `forward`, `now`, `randomId`) is injected so the
 * decrypt + capture path is unit-testable with a real local TLS round-trip — no
 * root, no iptables, no native addon. The anti-loop forward (`realForward`, which
 * needs `connectMarked`) is the only kernel-dependent piece and is validated e2e
 * on the VPS when wired into the transparent listener (3/N).
 */
import http from "node:http";
import https from "node:https";
import net from "node:net";
import tls from "node:tls";
import { randomUUID } from "node:crypto";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error";
import { sanitizeHeaders } from "../sanitizeHeaders.ts";
import { maskSecret } from "../maskSecrets.ts";
import { MITM_IDLE_TIMEOUT_MS } from "../socketTimeouts.ts";
import { globalTrafficBuffer } from "../inspector/buffer.ts";
import type { InterceptedRequest } from "../inspector/types.ts";
import type { DynamicCertStore } from "./dynamicCert.ts";
import { connectMarked } from "./transparentSocket.ts";

/** Default bypass SO_MARK for the forward path (anti-loop). Matches captureMode. */
export const DEFAULT_BYPASS_MARK = 0x539;

/** First byte of a TLS record carrying a handshake (ClientHello) — RFC 8446 §5.1. */
export function isTlsClientHello(firstByte: number): boolean {
  return firstByte === 0x16;
}

/**
 * Host to display/route as: prefer the SNI servername the client requested, then
 * the `Host` header (port stripped), then the raw destination IP as a last resort.
 */
export function resolveCaptureHost(
  sniServername: string | undefined,
  hostHeader: string | undefined,
  destIp: string
): string {
  const sni = (sniServername ?? "").trim();
  if (sni) return sni;
  const host = (hostHeader ?? "").trim();
  if (host) return host.replace(/:\d+$/, "");
  return destIp;
}

/** Original destination of an intercepted connection (TPROXY preserves it). */
export interface DecryptedDest {
  ip: string;
  port: number;
  /** SNI servername, when already known (otherwise read off the TLS socket). */
  sni?: string;
}

export interface ForwardInit {
  method: string;
  path: string;
  headers: Record<string, string>;
  body: Buffer;
}

export interface ForwardResult {
  status: number;
  headers: Record<string, string>;
  body: Buffer;
}

export interface TlsCaptureDeps {
  buffer: Pick<typeof globalTrafficBuffer, "push" | "update">;
  /** Forward the decrypted request to `dest`, re-encrypted. Injectable for tests
   * and so the real path can SO_MARK its upstream socket (anti-loop). */
  forward: (dest: DecryptedDest, init: ForwardInit) => Promise<ForwardResult>;
  /** Monotonic clock for latency (default `performance.now`). */
  now: () => number;
  /** Request id generator (default `randomUUID`). */
  randomId: () => string;
}

function defaultDeps(overrides: Partial<TlsCaptureDeps>): TlsCaptureDeps {
  return {
    buffer: globalTrafficBuffer,
    forward: realForward,
    now: () => performance.now(),
    randomId: () => randomUUID(),
    ...overrides,
  };
}

async function readBody(req: http.IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

/**
 * Headers for the upstream forward: drop hop-by-hop/framing fields (so Node sets
 * its own) but KEEP auth so the upstream still authenticates, and pin `host` to
 * the resolved capture host. Mirrors `httpProxyServer.buildFetchHeaders`.
 */
export function buildForwardHeaders(
  raw: http.IncomingHttpHeaders,
  host: string
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, value] of Object.entries(raw)) {
    if (value === undefined || value === null) continue;
    const lower = name.toLowerCase();
    if (
      lower === "host" ||
      lower === "connection" ||
      lower === "keep-alive" ||
      lower === "proxy-authenticate" ||
      lower === "proxy-authorization" ||
      lower === "te" ||
      lower === "trailer" ||
      lower === "transfer-encoding" ||
      lower === "upgrade" ||
      lower === "content-length"
    ) {
      continue;
    }
    out[lower] = Array.isArray(value) ? value.join(", ") : String(value);
  }
  out.host = host;
  return out;
}

/**
 * Handle one decrypted request: capture it (source "tproxy"), forward it to the
 * original destination, relay the response, and record the full exchange. Mirrors
 * `httpProxyServer.handleHttp` but the destination comes from TPROXY (not an
 * absolute proxy URL) and bodies are visible because the TLS was terminated.
 */
export function handleDecryptedRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse,
  dest: DecryptedDest,
  deps: TlsCaptureDeps
): void {
  const startedAt = deps.now();
  const socket = req.socket as tls.TLSSocket;
  const sni =
    dest.sni ?? (typeof socket.servername === "string" ? socket.servername : undefined);
  const host = resolveCaptureHost(sni, req.headers.host, dest.ip);
  const path = req.url ?? "/";

  const intercepted: InterceptedRequest = {
    id: deps.randomId(),
    source: "tproxy",
    timestamp: new Date().toISOString(),
    method: req.method ?? "GET",
    host,
    path,
    requestHeaders: sanitizeHeaders(req.headers),
    requestBody: null,
    requestSize: 0,
    responseHeaders: {},
    responseBody: null,
    responseSize: 0,
    status: "in-flight",
  };

  deps.buffer.push(intercepted);

  void (async () => {
    try {
      const body = await readBody(req);
      intercepted.requestSize = body.length;
      intercepted.requestBody = body.length > 0 ? maskSecret(body.toString("utf8")) : null;

      const result = await deps.forward(
        { ip: dest.ip, port: dest.port, sni },
        { method: req.method ?? "GET", path, headers: buildForwardHeaders(req.headers, host), body }
      );

      const totalLatencyMs = deps.now() - startedAt;
      intercepted.responseHeaders = sanitizeHeaders(result.headers);
      intercepted.responseBody = maskSecret(result.body.toString("utf8"));
      intercepted.responseSize = result.body.length;
      intercepted.status = result.status;
      intercepted.totalLatencyMs = totalLatencyMs;
      intercepted.upstreamLatencyMs = totalLatencyMs;
      intercepted.proxyLatencyMs = 0;

      const safeRespHeaders: Record<string, string> = {};
      for (const [k, v] of Object.entries(result.headers)) {
        const lk = k.toLowerCase();
        if (lk === "content-length" || lk === "transfer-encoding") continue;
        safeRespHeaders[k] = v;
      }
      res.writeHead(result.status, safeRespHeaders);
      res.end(result.body);

      deps.buffer.update(intercepted.id, intercepted);
    } catch (err) {
      intercepted.status = "error";
      intercepted.error = sanitizeErrorMessage(err);
      intercepted.totalLatencyMs = deps.now() - startedAt;
      deps.buffer.update(intercepted.id, intercepted);
      if (!res.headersSent) {
        res.writeHead(502, { "content-type": "text/plain" });
        res.end("Bad Gateway");
      } else {
        res.end();
      }
    }
  })();
}

export interface TlsCaptureServer {
  /** Internal HTTP server that parses the decrypted plaintext. */
  server: http.Server;
  /** TLS-terminate a raw intercepted socket and capture/forward the exchange. */
  terminate(rawClient: net.Socket, dest: DecryptedDest): void;
  /** Close the internal server. */
  close(): Promise<void>;
}

/**
 * Build the decrypt engine: an internal `http.Server` whose request handler
 * captures + forwards, plus `terminate()` to feed it a raw intercepted socket.
 */
export function createTlsCaptureServer(
  certStore: Pick<DynamicCertStore, "createSNICallback">,
  deps: Partial<TlsCaptureDeps> = {}
): TlsCaptureServer {
  const resolved = defaultDeps(deps);
  const pending = new WeakMap<object, DecryptedDest>();
  const server = http.createServer();

  // Bound lifetimes so a hung decrypted tunnel cannot exhaust file descriptors.
  server.requestTimeout = MITM_IDLE_TIMEOUT_MS * 5;
  server.headersTimeout = MITM_IDLE_TIMEOUT_MS;
  server.keepAliveTimeout = MITM_IDLE_TIMEOUT_MS;

  server.on("request", (req, res) => {
    const dest = pending.get(req.socket) ?? { ip: "", port: 0 };
    handleDecryptedRequest(req, res, dest, resolved);
  });

  const sniCallback = certStore.createSNICallback();

  return {
    server,
    terminate(rawClient, dest) {
      const tlsSocket = new tls.TLSSocket(rawClient, {
        isServer: true,
        SNICallback: sniCallback,
      });
      pending.set(tlsSocket, dest);
      tlsSocket.on("error", () => {
        try {
          rawClient.destroy();
        } catch {
          // already gone
        }
      });
      // Hand the decrypted stream to the HTTP parser (the MITM termination trick).
      server.emit("connection", tlsSocket);
    },
    close: () =>
      new Promise<void>((resolve) => {
        // Destroy any lingering decrypted sockets so their idle timers don't keep
        // the event loop alive past close (Node 18.2+).
        server.closeAllConnections?.();
        server.close(() => resolve());
      }),
  };
}

/**
 * Build a forward function that opens its upstream TCP socket via `connectRaw`,
 * then re-encrypts to the original destination over TLS. `connectRaw` is the
 * anti-loop seam: the real path marks the socket (`connectMarked`) so the
 * OUTPUT-based TPROXY rule excludes the proxy's own forward; tests pass a plain
 * `net.connect`.
 *
 * `rejectUnauthorized` defaults to `true` (secure by default): the upstream cert
 * is validated against `servername` (the SNI/Host the client requested), mirroring
 * what the original client would do — the proxy must not silently accept an
 * upstream cert the client itself would reject. Callers talking to a self-signed
 * upstream (e.g. tests) must opt in explicitly with `{ rejectUnauthorized: false }`.
 */
export function createForward(
  connectRaw: (ip: string, port: number) => net.Socket,
  opts: { rejectUnauthorized?: boolean } = {}
): TlsCaptureDeps["forward"] {
  const rejectUnauthorized = opts.rejectUnauthorized ?? true;
  return (dest, init) =>
    new Promise<ForwardResult>((resolve, reject) => {
      const servername = dest.sni || String(init.headers.host || dest.ip);
      // The bypass-marked socket MUST live on the Agent's `createConnection`:
      // `https.request({ createConnection })` is silently IGNORED whenever an
      // agent is present — and `agent: false` still installs a fresh default
      // Agent, so the request option never runs and the forward would open its
      // own UNMARKED socket, breaking the anti-loop (TPROXY would re-intercept
      // the proxy's own forward → infinite loop). Verified e2e on the VPS.
      const agent = new https.Agent({ maxSockets: 1, keepAlive: false });
      (agent as unknown as { createConnection: () => net.Socket }).createConnection = () =>
        tls.connect({
          socket: connectRaw(dest.ip, dest.port),
          servername,
          rejectUnauthorized,
        }) as unknown as net.Socket;
      let req: http.ClientRequest;
      try {
        req = https.request(
          {
            host: dest.ip,
            port: dest.port,
            method: init.method,
            path: init.path,
            headers: init.headers,
            servername,
            rejectUnauthorized,
            agent,
          },
          (upstream) => {
            const chunks: Buffer[] = [];
            upstream.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
            upstream.on("end", () => {
              const headers: Record<string, string> = {};
              for (const [k, v] of Object.entries(upstream.headers)) {
                if (v === undefined) continue;
                headers[k] = Array.isArray(v) ? v.join(", ") : String(v);
              }
              resolve({ status: upstream.statusCode ?? 0, headers, body: Buffer.concat(chunks) });
            });
          }
        );
      } catch (err) {
        reject(err);
        return;
      }
      req.once("error", reject);
      if (init.body.length > 0) req.write(init.body);
      req.end();
    });
}

/**
 * Production forward: re-encrypt to the original destination over a socket marked
 * with the bypass SO_MARK BEFORE connect, so the OUTPUT-based TPROXY rule excludes
 * it (anti-loop). Requires the native addon — exercised e2e on the VPS (3/N).
 * The upstream cert is verified (`rejectUnauthorized` defaults to `true`), so the
 * proxy rejects exactly what the original client would have rejected.
 */
export const realForward: TlsCaptureDeps["forward"] = createForward(
  (ip, port) => new net.Socket({ fd: connectMarked(ip, port, DEFAULT_BYPASS_MARK) })
);
