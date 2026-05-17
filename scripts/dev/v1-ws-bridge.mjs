import { createHash, randomUUID } from "node:crypto";
import { STATUS_CODES } from "node:http";

export const WS_PUBLIC_PATHS = new Set(["/v1/ws", "/api/v1/ws"]);
export const WS_ALLOWED_ENDPOINTS = new Set([
  "/v1/chat/completions",
  "/api/v1/chat/completions",
  "/v1/messages",
  "/api/v1/messages",
  "/v1/responses",
  "/api/v1/responses",
  "/v1/completions",
  "/api/v1/completions",
]);

const HANDSHAKE_PATH = "/api/v1/ws";
const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const WS_QUERY_TOKEN_KEYS = ["api_key", "token", "access_token"];
const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function isText(value) {
  return typeof value === "string" && value.length > 0;
}

function jsonStringifySafe(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return JSON.stringify({
      type: "protocol.error",
      code: "serialization_failed",
      message: "Failed to serialize WebSocket payload",
    });
  }
}

function encodeWsFrame(opcode, payload = Buffer.alloc(0)) {
  const payloadBuffer = Buffer.isBuffer(payload) ? payload : Buffer.from(payload);
  const length = payloadBuffer.length;

  let header;
  if (length < 126) {
    header = Buffer.allocUnsafe(2);
    header[1] = length;
  } else if (length <= 0xffff) {
    header = Buffer.allocUnsafe(4);
    header[1] = 126;
    header.writeUInt16BE(length, 2);
  } else {
    header = Buffer.allocUnsafe(10);
    header[1] = 127;
    header.writeBigUInt64BE(BigInt(length), 2);
  }

  header[0] = 0x80 | (opcode & 0x0f);
  return Buffer.concat([header, payloadBuffer]);
}

function decodeClientFrames(buffer) {
  const frames = [];
  let offset = 0;

  while (buffer.length - offset >= 2) {
    const byte1 = buffer[offset];
    const byte2 = buffer[offset + 1];
    const fin = (byte1 & 0x80) !== 0;
    const opcode = byte1 & 0x0f;
    const masked = (byte2 & 0x80) !== 0;
    let payloadLength = byte2 & 0x7f;
    let headerLength = 2;

    if (!masked) {
      throw new Error("Client WebSocket frames must be masked");
    }

    if (payloadLength === 126) {
      if (buffer.length - offset < 4) break;
      payloadLength = buffer.readUInt16BE(offset + 2);
      headerLength = 4;
    } else if (payloadLength === 127) {
      if (buffer.length - offset < 10) break;
      const bigLength = buffer.readBigUInt64BE(offset + 2);
      if (bigLength > BigInt(Number.MAX_SAFE_INTEGER)) {
        throw new Error("WebSocket payload too large");
      }
      payloadLength = Number(bigLength);
      headerLength = 10;
    }

    const totalLength = headerLength + 4 + payloadLength;
    if (buffer.length - offset < totalLength) break;

    const mask = buffer.subarray(offset + headerLength, offset + headerLength + 4);
    const payload = Buffer.from(buffer.subarray(offset + headerLength + 4, offset + totalLength));
    for (let index = 0; index < payload.length; index += 1) {
      payload[index] ^= mask[index % 4];
    }

    frames.push({ fin, opcode, payload });
    offset += totalLength;
  }

  return {
    frames,
    remaining: buffer.subarray(offset),
  };
}

function writeHttpError(socket, status, body, headers = {}) {
  if (!socket.writable || socket.destroyed) return;

  const bodyBuffer = Buffer.from(body || "", "utf8");
  const statusText = STATUS_CODES[status] || "Error";
  const responseHeaders = {
    Connection: "close",
    "Content-Length": String(bodyBuffer.length),
    "Content-Type": "application/json; charset=utf-8",
    ...headers,
  };

  const head = [
    `HTTP/1.1 ${status} ${statusText}`,
    ...Object.entries(responseHeaders).map(([name, value]) => `${name}: ${value}`),
    "",
    "",
  ].join("\r\n");

  socket.write(head);
  socket.end(bodyBuffer);
}

function isWsPath(pathname) {
  return WS_PUBLIC_PATHS.has(pathname);
}

function normalizeEndpoint(rawEndpoint) {
  const endpoint = isText(rawEndpoint) ? rawEndpoint : "/v1/chat/completions";

  let parsed;
  try {
    parsed = new URL(endpoint, "http://omniroute.local");
  } catch {
    return null;
  }

  if (parsed.origin !== "http://omniroute.local") {
    return null;
  }

  if (!WS_ALLOWED_ENDPOINTS.has(parsed.pathname)) {
    return null;
  }

  return `${parsed.pathname}${parsed.search}`;
}

function getForwardHeaders(requestUrl, requestHeaders) {
  const headers = {
    accept: "text/event-stream",
    "content-type": "application/json",
  };

  const authorization = requestHeaders.authorization;
  if (isText(authorization)) {
    headers.authorization = authorization;
  } else {
    const url = new URL(requestUrl, "http://omniroute.local");
    for (const key of WS_QUERY_TOKEN_KEYS) {
      const value = url.searchParams.get(key);
      if (isText(value)) {
        headers.authorization = `Bearer ${value.trim()}`;
        break;
      }
    }
  }

  const cookie = requestHeaders.cookie;
  if (isText(cookie)) {
    headers.cookie = cookie;
  }

  const origin = requestHeaders.origin;
  if (isText(origin)) {
    headers.origin = origin;
  }

  return headers;
}

async function performHandshake(fetchImpl, baseUrl, requestUrl, requestHeaders) {
  const incomingUrl = new URL(requestUrl, baseUrl);
  const handshakeUrl = new URL(HANDSHAKE_PATH, baseUrl);

  for (const [key, value] of incomingUrl.searchParams.entries()) {
    handshakeUrl.searchParams.set(key, value);
  }
  handshakeUrl.searchParams.set("handshake", "1");

  const response = await fetchImpl(handshakeUrl, {
    method: "GET",
    headers: {
      authorization: requestHeaders.authorization || "",
      cookie: requestHeaders.cookie || "",
      origin: requestHeaders.origin || "",
      "x-forwarded-for": requestHeaders["x-forwarded-for"] || "",
    },
  });

  const bodyText = await response.text();
  let bodyJson = null;
  try {
    bodyJson = bodyText ? JSON.parse(bodyText) : null;
  } catch {
    bodyJson = null;
  }

  return {
    status: response.status,
    headers: Object.fromEntries(response.headers.entries()),
    bodyText,
    bodyJson,
    ok: response.ok,
  };
}

class WebSocketSession {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.fetchImpl = options.fetchImpl;
    this.idleTimeoutMs = options.idleTimeoutMs;
    this.pingIntervalMs = options.pingIntervalMs;
    this.socket = options.socket;
    this.requestHeaders = options.requestHeaders;
    this.requestUrl = options.requestUrl;
    this.sessionId = randomUUID();
    this.closed = false;
    this.buffer = Buffer.alloc(0);
    this.fragmentOpcode = null;
    this.fragmentParts = [];
    this.activeRequests = new Map();
    this.lastSeenAt = Date.now();

    this.pingTimer = setInterval(() => {
      if (this.closed) return;
      const idleForMs = Date.now() - this.lastSeenAt;
      if (idleForMs >= this.idleTimeoutMs) {
        this.close(1001, "idle_timeout");
        return;
      }
      this.sendFrame(0x9);
    }, this.pingIntervalMs);

    this.socket.setNoDelay(true);
    this.socket.on("data", (chunk) => {
      this.onData(chunk).catch((error) => {
        this.sendProtocolError(
          "frame_decode_failed",
          error instanceof Error ? error.message : String(error)
        );
      });
    });
    this.socket.on("close", () => this.dispose());
    this.socket.on("end", () => this.dispose());
    this.socket.on("error", () => this.dispose());
  }

  sendFrame(opcode, payload) {
    if (this.closed || this.socket.destroyed) return;
    this.socket.write(encodeWsFrame(opcode, payload));
  }

  sendJson(payload) {
    this.sendFrame(0x1, Buffer.from(jsonStringifySafe(payload), "utf8"));
  }

  sendProtocolError(code, message, id = null) {
    this.sendJson({
      type: "protocol.error",
      code,
      id,
      message,
    });
  }

  async onData(chunk) {
    this.lastSeenAt = Date.now();
    this.buffer = Buffer.concat([this.buffer, chunk]);
    const parsed = decodeClientFrames(this.buffer);
    this.buffer = parsed.remaining;

    for (const frame of parsed.frames) {
      await this.handleFrame(frame);
    }
  }

  async handleFrame(frame) {
    switch (frame.opcode) {
      case 0x0:
        if (this.fragmentOpcode === null) {
          this.sendProtocolError("unexpected_continuation", "Unexpected continuation frame");
          return;
        }
        this.fragmentParts.push(frame.payload);
        if (frame.fin) {
          const payload = Buffer.concat(this.fragmentParts);
          const opcode = this.fragmentOpcode;
          this.fragmentOpcode = null;
          this.fragmentParts = [];
          await this.handleDataFrame(opcode, payload);
        }
        return;
      case 0x1:
      case 0x2:
        if (!frame.fin) {
          this.fragmentOpcode = frame.opcode;
          this.fragmentParts = [frame.payload];
          return;
        }
        await this.handleDataFrame(frame.opcode, frame.payload);
        return;
      case 0x8:
        this.close();
        return;
      case 0x9:
        this.sendFrame(0xa, frame.payload);
        return;
      case 0xa:
        this.lastSeenAt = Date.now();
        return;
      default:
        this.sendProtocolError("unsupported_opcode", `Unsupported opcode ${frame.opcode}`);
    }
  }

  async handleDataFrame(opcode, payload) {
    if (opcode !== 0x1) {
      this.sendProtocolError("unsupported_payload", "Only UTF-8 text messages are supported");
      return;
    }

    const raw = textDecoder.decode(payload);
    let message;
    try {
      message = JSON.parse(raw);
    } catch {
      this.sendProtocolError("invalid_json", "WebSocket message must be valid JSON");
      return;
    }

    await this.handleMessage(message);
  }

  async handleMessage(message) {
    if (!message || typeof message !== "object" || Array.isArray(message)) {
      this.sendProtocolError("invalid_envelope", "WebSocket message must be an object");
      return;
    }

    if (message.type === "ping") {
      this.sendJson({ type: "pong", sessionId: this.sessionId });
      return;
    }

    if (message.type === "cancel") {
      const requestId = isText(message.id) ? message.id : null;
      if (!requestId) {
        this.sendProtocolError("invalid_cancel", "cancel envelopes require a string id");
        return;
      }
      const active = this.activeRequests.get(requestId);
      if (!active) {
        this.sendProtocolError(
          "unknown_request",
          "No active request matches the provided id",
          requestId
        );
        return;
      }
      active.abortController.abort();
      return;
    }

    if (message.type !== "request") {
      this.sendProtocolError(
        "unsupported_type",
        "Supported message types are request, cancel, and ping"
      );
      return;
    }

    const requestId = isText(message.id) ? message.id : null;
    if (!requestId) {
      this.sendProtocolError("invalid_request_id", "request envelopes require a non-empty id");
      return;
    }

    if (this.activeRequests.has(requestId)) {
      this.sendProtocolError(
        "duplicate_request",
        "A request with this id is already in flight",
        requestId
      );
      return;
    }

    if (!message.payload || typeof message.payload !== "object" || Array.isArray(message.payload)) {
      this.sendProtocolError(
        "invalid_payload",
        "request envelopes require an object payload",
        requestId
      );
      return;
    }

    const endpoint = normalizeEndpoint(message.endpoint);
    if (!endpoint) {
      this.sendProtocolError(
        "invalid_endpoint",
        "Endpoint must target a supported /v1 chat surface",
        requestId
      );
      return;
    }

    const requestPayload = {
      ...message.payload,
      stream: message.payload.stream === undefined ? true : message.payload.stream,
    };

    const abortController = new AbortController();
    this.activeRequests.set(requestId, { abortController });
    this.executeRequest(requestId, endpoint, requestPayload, abortController).catch((error) => {
      this.sendJson({
        type: abortController.signal.aborted ? "response.cancelled" : "response.error",
        id: requestId,
        code: abortController.signal.aborted ? "client_cancelled" : "request_failed",
        message: error instanceof Error ? error.message : String(error),
      });
      this.activeRequests.delete(requestId);
    });
  }

  async executeRequest(requestId, endpoint, payload, abortController) {
    const headers = {
      ...this.requestHeaders,
      accept: payload.stream === false ? "application/json" : "text/event-stream",
      "content-type": "application/json",
      "x-omniroute-ws-session-id": this.sessionId,
      "x-omniroute-ws-request-id": requestId,
    };

    const response = await this.fetchImpl(new URL(endpoint, this.baseUrl), {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: abortController.signal,
    });

    const contentType = response.headers.get("content-type") || "";
    this.sendJson({
      type: "response.start",
      id: requestId,
      status: response.status,
      ok: response.ok,
      contentType,
      endpoint,
    });

    if (contentType.includes("text/event-stream") && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          if (chunk) {
            this.sendJson({
              type: "response.chunk",
              id: requestId,
              chunk,
            });
          }
        }

        const tail = decoder.decode();
        if (tail) {
          this.sendJson({
            type: "response.chunk",
            id: requestId,
            chunk: tail,
          });
        }
      } finally {
        this.activeRequests.delete(requestId);
      }

      this.sendJson({
        type: response.ok ? "response.completed" : "response.error",
        id: requestId,
        status: response.status,
        ok: response.ok,
      });
      return;
    }

    const bodyText = await response.text();
    let body = bodyText;
    try {
      body = bodyText ? JSON.parse(bodyText) : null;
    } catch {
      body = bodyText;
    }

    this.activeRequests.delete(requestId);
    this.sendJson({
      type: response.ok ? "response.output" : "response.error",
      id: requestId,
      status: response.status,
      ok: response.ok,
      body,
    });
    this.sendJson({
      type: "response.completed",
      id: requestId,
      status: response.status,
      ok: response.ok,
    });
  }

  close(code = 1000, reason = "normal_closure") {
    if (this.closed) return;
    this.closed = true;

    clearInterval(this.pingTimer);
    for (const active of this.activeRequests.values()) {
      active.abortController.abort();
    }
    this.activeRequests.clear();

    const reasonBuffer = Buffer.from(reason, "utf8");
    const payload = Buffer.allocUnsafe(2 + reasonBuffer.length);
    payload.writeUInt16BE(code, 0);
    reasonBuffer.copy(payload, 2);
    this.sendFrame(0x8, payload);
    this.socket.end();
    setTimeout(() => {
      if (!this.socket.destroyed) {
        this.socket.destroy();
      }
    }, 50).unref?.();
  }

  dispose() {
    if (this.closed) return;
    this.closed = true;
    clearInterval(this.pingTimer);
    for (const active of this.activeRequests.values()) {
      active.abortController.abort();
    }
    this.activeRequests.clear();
  }
}

export function createOmnirouteWsBridge({
  baseUrl,
  fetchImpl = fetch,
  pingIntervalMs = 25000,
  idleTimeoutMs = 90000,
} = {}) {
  if (!isText(baseUrl)) {
    throw new Error("createOmnirouteWsBridge requires a baseUrl");
  }

  return {
    isWsPath,
    async handleUpgrade(req, socket, head) {
      const pathname = new URL(req.url || "/", baseUrl).pathname;
      if (!isWsPath(pathname)) {
        return false;
      }

      const upgradeHeader = String(req.headers.upgrade || "").toLowerCase();
      if (upgradeHeader !== "websocket") {
        writeHttpError(
          socket,
          426,
          JSON.stringify({
            error: {
              message: "Upgrade Required",
              code: "upgrade_required",
            },
          }),
          { Upgrade: "websocket" }
        );
        return true;
      }

      try {
        const handshake = await performHandshake(fetchImpl, baseUrl, req.url || "/", req.headers);
        if (!handshake.ok) {
          writeHttpError(socket, handshake.status, handshake.bodyText || "{}", handshake.headers);
          return true;
        }

        const wsKey = req.headers["sec-websocket-key"];
        if (!isText(wsKey)) {
          writeHttpError(
            socket,
            400,
            JSON.stringify({
              error: {
                message: "Missing sec-websocket-key header",
                code: "bad_websocket_handshake",
              },
            })
          );
          return true;
        }

        const acceptKey = createHash("sha1").update(`${wsKey}${WS_GUID}`).digest("base64");

        const headers = [
          "HTTP/1.1 101 Switching Protocols",
          "Upgrade: websocket",
          "Connection: Upgrade",
          `Sec-WebSocket-Accept: ${acceptKey}`,
          "",
          "",
        ].join("\r\n");

        socket.write(headers);
        if (head && head.length > 0) {
          socket.unshift(head);
        }

        const session = new WebSocketSession({
          baseUrl,
          fetchImpl,
          idleTimeoutMs,
          pingIntervalMs,
          socket,
          requestUrl: req.url || pathname,
          requestHeaders: getForwardHeaders(req.url || pathname, req.headers),
        });
        session.sendJson({
          type: "session.ready",
          sessionId: session.sessionId,
          path: handshake.bodyJson?.path || pathname,
          wsAuth: handshake.bodyJson?.wsAuth === true,
          authenticated: handshake.bodyJson?.authenticated === true,
          authType: handshake.bodyJson?.authType || "none",
        });
        return true;
      } catch (error) {
        writeHttpError(
          socket,
          500,
          JSON.stringify({
            error: {
              message: error instanceof Error ? error.message : String(error),
              code: "websocket_bridge_failed",
            },
          })
        );
        return true;
      }
    },
  };
}
