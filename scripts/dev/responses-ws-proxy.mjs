import { createHash, randomUUID } from "node:crypto";
import { STATUS_CODES } from "node:http";
import { websocket } from "wreq-js";

export const RESPONSES_WS_PUBLIC_PATHS = new Set([
  "/responses",
  "/v1/responses",
  "/api/v1/responses",
]);

const INTERNAL_ROUTE = "/api/internal/codex-responses-ws";
const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const WS_QUERY_TOKEN_KEYS = ["api_key", "token", "access_token"];
const textDecoder = new TextDecoder();
const DEFAULT_MAX_WS_BUFFER_BYTES = 16 * 1024 * 1024;
const DEFAULT_MAX_WS_MESSAGE_BYTES = 16 * 1024 * 1024;

class WebSocketInputTooLargeError extends Error {
  constructor(message, reason = "message_too_large") {
    super(message);
    this.name = "WebSocketInputTooLargeError";
    this.closeCode = 1009;
    this.reason = reason;
  }
}

function normalizePositiveInteger(value, fallback) {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function isText(value) {
  return typeof value === "string" && value.length > 0;
}

function jsonStringifySafe(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return JSON.stringify({
      type: "response.failed",
      response: {
        status: "failed",
        error: {
          code: "serialization_failed",
          message: "Failed to serialize WebSocket payload",
        },
      },
    });
  }
}

export function isResponsesWsPath(pathname) {
  return RESPONSES_WS_PUBLIC_PATHS.has(pathname);
}

export function encodeWsFrame(opcode, payload = Buffer.alloc(0)) {
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

export function decodeClientFrames(
  buffer,
  { maxPayloadBytes = DEFAULT_MAX_WS_MESSAGE_BYTES } = {}
) {
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
        throw new WebSocketInputTooLargeError("WebSocket payload too large");
      }
      payloadLength = Number(bigLength);
      headerLength = 10;
    }

    if (payloadLength > maxPayloadBytes) {
      throw new WebSocketInputTooLargeError("WebSocket payload exceeds configured limit");
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

function getAuthHeaders(requestUrl, requestHeaders) {
  const headers = {};
  if (isText(requestHeaders.authorization)) {
    headers.authorization = requestHeaders.authorization;
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

  if (isText(requestHeaders.cookie)) headers.cookie = requestHeaders.cookie;
  if (isText(requestHeaders.origin)) headers.origin = requestHeaders.origin;
  if (isText(requestHeaders["x-forwarded-for"])) {
    headers["x-forwarded-for"] = requestHeaders["x-forwarded-for"];
  }
  return headers;
}

function getResponseCreatePayload(message) {
  if (!message || typeof message !== "object" || Array.isArray(message)) return null;
  if (message.type !== "response.create") return null;
  if (
    message.response &&
    typeof message.response === "object" &&
    !Array.isArray(message.response)
  ) {
    return message.response;
  }
  if (message.body && typeof message.body === "object" && !Array.isArray(message.body)) {
    return message.body;
  }
  if (message.payload && typeof message.payload === "object" && !Array.isArray(message.payload)) {
    return message.payload;
  }
  const { type, ...payload } = message;
  return payload;
}

function withPreparedResponseCreate(message, preparedBody) {
  const next = { ...message };
  if (
    message.response &&
    typeof message.response === "object" &&
    !Array.isArray(message.response)
  ) {
    next.response = preparedBody;
  } else if (message.body && typeof message.body === "object" && !Array.isArray(message.body)) {
    next.body = preparedBody;
  } else if (
    message.payload &&
    typeof message.payload === "object" &&
    !Array.isArray(message.payload)
  ) {
    next.payload = preparedBody;
  } else {
    return { type: "response.create", ...preparedBody };
  }
  return next;
}

async function callInternal(fetchImpl, baseUrl, bridgeSecret, action, payload) {
  const response = await fetchImpl(new URL(INTERNAL_ROUTE, baseUrl), {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-omniroute-ws-bridge-secret": bridgeSecret,
    },
    body: JSON.stringify({ action, ...payload }),
  });
  const text = await response.text();
  let json = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    json = null;
  }
  return { ok: response.ok, status: response.status, text, json, headers: response.headers };
}

class ResponsesWsSession {
  constructor({
    baseUrl,
    bridgeSecret,
    fetchImpl,
    socket,
    requestHeaders,
    requestUrl,
    wsFactory,
    pingIntervalMs,
    idleTimeoutMs,
    maxBufferBytes,
    maxMessageBytes,
  }) {
    this.baseUrl = baseUrl;
    this.bridgeSecret = bridgeSecret;
    this.fetchImpl = fetchImpl;
    this.socket = socket;
    this.requestHeaders = requestHeaders;
    this.requestUrl = requestUrl;
    this.wsFactory = wsFactory;
    this.pingIntervalMs = pingIntervalMs;
    this.idleTimeoutMs = idleTimeoutMs;
    this.maxBufferBytes = normalizePositiveInteger(maxBufferBytes, DEFAULT_MAX_WS_BUFFER_BYTES);
    this.maxMessageBytes = normalizePositiveInteger(maxMessageBytes, DEFAULT_MAX_WS_MESSAGE_BYTES);
    this.sessionId = randomUUID();
    this.closed = false;
    this.buffer = Buffer.alloc(0);
    this.fragmentOpcode = null;
    this.fragmentParts = [];
    this.fragmentBytes = 0;
    this.processing = Promise.resolve();
    this.upstream = null;
    this.upstreamReady = null;
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
    this.socket.on("data", (chunk) => this.enqueueData(chunk));
    this.socket.on("close", () => this.dispose());
    this.socket.on("end", () => this.dispose());
    this.socket.on("error", () => this.dispose());
  }

  enqueueData(chunk) {
    this.processing = this.processing
      .then(() => this.onData(chunk))
      .catch((error) => {
        if (this.closed) return;
        const isTooLarge =
          error instanceof WebSocketInputTooLargeError || error?.closeCode === 1009;
        this.sendFailure(
          isTooLarge ? "message_too_large" : "frame_decode_failed",
          error instanceof Error ? error.message : String(error)
        );
        this.close(
          isTooLarge ? 1009 : 1011,
          isTooLarge ? error.reason || "message_too_large" : "frame_decode_failed"
        );
      });
  }

  cleanupBuffers() {
    this.buffer = Buffer.alloc(0);
    this.fragmentOpcode = null;
    this.fragmentParts = [];
    this.fragmentBytes = 0;
  }

  sendFrame(opcode, payload) {
    if (this.closed || this.socket.destroyed) return;
    this.socket.write(encodeWsFrame(opcode, payload));
  }

  sendJson(payload) {
    this.sendFrame(0x1, Buffer.from(jsonStringifySafe(payload), "utf8"));
  }

  sendFailure(code, message) {
    this.sendJson({
      type: "response.failed",
      response: {
        id: null,
        status: "failed",
        error: {
          code,
          message,
        },
      },
    });
  }

  async onData(chunk) {
    if (this.closed) return;
    this.lastSeenAt = Date.now();
    if (this.buffer.length + chunk.length > this.maxBufferBytes) {
      throw new WebSocketInputTooLargeError("WebSocket input buffer exceeds configured limit");
    }
    this.buffer = Buffer.concat([this.buffer, chunk]);
    const parsed = decodeClientFrames(this.buffer, { maxPayloadBytes: this.maxMessageBytes });
    this.buffer = parsed.remaining;

    if (this.buffer.length > this.maxBufferBytes) {
      throw new WebSocketInputTooLargeError("WebSocket input buffer exceeds configured limit");
    }

    for (const frame of parsed.frames) {
      if (this.closed) return;
      await this.handleFrame(frame);
    }
  }

  async handleFrame(frame) {
    switch (frame.opcode) {
      case 0x0:
        if (this.fragmentOpcode === null) {
          this.sendFailure("unexpected_continuation", "Unexpected continuation frame");
          return;
        }
        this.fragmentBytes += frame.payload.length;
        if (this.fragmentBytes > this.maxMessageBytes) {
          throw new WebSocketInputTooLargeError(
            "Fragmented WebSocket message exceeds configured limit"
          );
        }
        this.fragmentParts.push(frame.payload);
        if (frame.fin) {
          const payload = Buffer.concat(this.fragmentParts);
          const opcode = this.fragmentOpcode;
          this.fragmentOpcode = null;
          this.fragmentParts = [];
          this.fragmentBytes = 0;
          await this.handleDataFrame(opcode, payload);
        }
        return;
      case 0x1:
      case 0x2:
        if (!frame.fin) {
          this.fragmentOpcode = frame.opcode;
          this.fragmentParts = [frame.payload];
          this.fragmentBytes = frame.payload.length;
          if (this.fragmentBytes > this.maxMessageBytes) {
            throw new WebSocketInputTooLargeError(
              "Fragmented WebSocket message exceeds configured limit"
            );
          }
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
        this.sendFailure("unsupported_opcode", `Unsupported opcode ${frame.opcode}`);
    }
  }

  async handleDataFrame(opcode, payload) {
    if (payload.length > this.maxMessageBytes) {
      throw new WebSocketInputTooLargeError("WebSocket message exceeds configured limit");
    }
    if (opcode !== 0x1) {
      this.sendFailure("unsupported_payload", "Only UTF-8 text messages are supported");
      return;
    }

    const raw = textDecoder.decode(payload);
    let message;
    try {
      message = JSON.parse(raw);
    } catch {
      this.sendFailure("invalid_json", "WebSocket message must be valid JSON");
      return;
    }

    await this.forwardClientMessage(message);
  }

  async ensureUpstream(firstMessage) {
    if (this.upstreamReady) return this.upstreamReady;

    this.upstreamReady = (async () => {
      const responseBody = getResponseCreatePayload(firstMessage);
      if (responseBody === null) {
        throw new Error("First Responses WebSocket message must be response.create");
      }

      const prepared = await callInternal(
        this.fetchImpl,
        this.baseUrl,
        this.bridgeSecret,
        "prepare",
        {
          requestUrl: this.requestUrl,
          headers: getAuthHeaders(this.requestUrl, this.requestHeaders),
          message: firstMessage,
          response: responseBody,
        }
      );

      if (!prepared.ok) {
        const message =
          prepared.json?.error?.message ||
          prepared.json?.message ||
          prepared.text ||
          "Codex WS prepare failed";
        const code = prepared.json?.error?.code || "codex_ws_prepare_failed";
        const error = new Error(message);
        error.code = code;
        throw error;
      }

      const upstream = await this.wsFactory(prepared.json.upstreamUrl, {
        browser: prepared.json.browser || "chrome_142",
        os: prepared.json.os || "windows",
        headers: prepared.json.headers || {},
      });

      upstream.onmessage = (event) => {
        if (this.closed) return;
        const data =
          typeof event.data === "string" ? event.data : Buffer.from(event.data).toString("utf8");
        this.sendFrame(0x1, Buffer.from(data, "utf8"));
      };
      upstream.onerror = (event) => {
        if (this.closed) return;
        this.sendFailure(
          "upstream_websocket_error",
          event.message || "Codex upstream WebSocket error"
        );
      };
      upstream.onclose = (event) => {
        if (this.closed) return;
        this.close(event.code || 1000, event.reason || "upstream_closed");
      };

      this.upstream = upstream;
      return {
        upstream,
        firstMessage: withPreparedResponseCreate(firstMessage, prepared.json.response),
      };
    })();

    return this.upstreamReady;
  }

  async forwardClientMessage(message) {
    try {
      if (!this.upstream) {
        const { upstream, firstMessage } = await this.ensureUpstream(message);
        upstream.send(jsonStringifySafe(firstMessage));
        return;
      }
      this.upstream.send(jsonStringifySafe(message));
    } catch (error) {
      const code = error?.code || "upstream_websocket_connect_failed";
      const messageText = error instanceof Error ? error.message : String(error);
      this.sendFailure(code, messageText);
      this.close(1011, "upstream_connect_failed");
    }
  }

  close(code = 1000, reason = "normal_closure") {
    if (this.closed) return;
    this.closed = true;

    clearInterval(this.pingTimer);
    this.cleanupBuffers();
    try {
      this.upstream?.close?.(code, reason);
    } catch {
      // ignore close races
    }

    const reasonBuffer = Buffer.from(reason, "utf8");
    const payload = Buffer.allocUnsafe(2 + reasonBuffer.length);
    payload.writeUInt16BE(code, 0);
    reasonBuffer.copy(payload, 2);
    if (!this.socket.destroyed && this.socket.writable) {
      this.socket.write(encodeWsFrame(0x8, payload));
    }
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
    this.cleanupBuffers();
    try {
      this.upstream?.close?.(1000, "downstream_closed");
    } catch {
      // ignore close races
    }
  }
}

export function createResponsesWsProxy({
  baseUrl,
  bridgeSecret,
  fetchImpl = fetch,
  wsFactory = websocket,
  pingIntervalMs = 25000,
  idleTimeoutMs = 90000,
  maxBufferBytes = DEFAULT_MAX_WS_BUFFER_BYTES,
  maxMessageBytes = DEFAULT_MAX_WS_MESSAGE_BYTES,
} = {}) {
  if (!isText(baseUrl)) {
    throw new Error("createResponsesWsProxy requires a baseUrl");
  }
  if (!isText(bridgeSecret)) {
    throw new Error("createResponsesWsProxy requires a bridgeSecret");
  }

  return {
    isResponsesWsPath,
    async handleUpgrade(req, socket, head) {
      const pathname = new URL(req.url || "/", baseUrl).pathname;
      if (!isResponsesWsPath(pathname)) {
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
        const auth = await callInternal(fetchImpl, baseUrl, bridgeSecret, "authenticate", {
          requestUrl: req.url || pathname,
          headers: getAuthHeaders(req.url || pathname, req.headers),
        });
        if (!auth.ok) {
          writeHttpError(
            socket,
            auth.status,
            auth.text || "{}",
            Object.fromEntries(auth.headers.entries())
          );
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

        new ResponsesWsSession({
          baseUrl,
          bridgeSecret,
          fetchImpl,
          socket,
          requestUrl: req.url || pathname,
          requestHeaders: req.headers,
          wsFactory,
          pingIntervalMs,
          idleTimeoutMs,
          maxBufferBytes,
          maxMessageBytes,
        });
        return true;
      } catch (error) {
        writeHttpError(
          socket,
          500,
          JSON.stringify({
            error: {
              message: error instanceof Error ? error.message : String(error),
              code: "responses_websocket_proxy_failed",
            },
          })
        );
        return true;
      }
    },
  };
}
