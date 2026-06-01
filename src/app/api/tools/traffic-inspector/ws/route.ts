/**
 * WebSocket endpoint for the Traffic Inspector live stream.
 *
 * Clients connect here to receive real-time `WsEvent` frames
 * (snapshot, new, update, clear) from the `globalTrafficBuffer`.
 *
 * LOCAL_ONLY enforcement happens unconditionally in the authz pipeline via
 * `isLocalOnlyPath("/api/tools/traffic-inspector/")` — this route does not
 * need to repeat that check. The WS upgrade uses the raw socket injected by
 * Next.js / the standalone server.
 *
 * Protocol:
 *   1. Client connects with `Upgrade: websocket`.
 *   2. Server immediately emits `{type:"snapshot", data:[...]}`.
 *   3. Subsequent mutations produce `{type:"new"|"update"|"clear", data?}`.
 *   4. Server sends ping frames every 30s; client may pong (ignored here).
 *   5. Closing the connection removes the subscriber.
 */

import { createHash } from "node:crypto";
import { globalTrafficBuffer } from "@/mitm/inspector/buffer";
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

const WS_GUID = "258EAFA5-E914-47DA-95CA-C5AB0DC85B11";
const PING_INTERVAL_MS = 30_000;

function acceptKey(clientKey: string): string {
  return createHash("sha1")
    .update(clientKey + WS_GUID)
    .digest("base64");
}

function encodeWsFrame(opcode: number, payload: Buffer = Buffer.alloc(0)): Buffer {
  const length = payload.length;
  let header: Buffer;
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
  return Buffer.concat([header, payload]);
}

function sendText(socket: import("node:net").Socket, data: unknown): void {
  try {
    const json = JSON.stringify(data);
    const payload = Buffer.from(json, "utf8");
    socket.write(encodeWsFrame(0x01, payload));
  } catch {
    // socket may be destroyed; ignore
  }
}

function sendClose(socket: import("node:net").Socket): void {
  try {
    socket.write(encodeWsFrame(0x08));
    socket.end();
  } catch {
    // already closed
  }
}

export async function GET(request: Request): Promise<Response> {
  const upgrade = request.headers.get("upgrade");
  if (!upgrade || upgrade.toLowerCase() !== "websocket") {
    return new Response(JSON.stringify(buildErrorBody(426, "Upgrade Required")), {
      status: 426,
      headers: { "content-type": "application/json", Upgrade: "websocket" },
    });
  }

  const clientKey = request.headers.get("sec-websocket-key");
  if (!clientKey) {
    return new Response(JSON.stringify(buildErrorBody(400, "Missing Sec-WebSocket-Key")), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // @ts-expect-error — Next.js standalone server exposes the raw socket via
  // `request.socket` but the Request type does not declare it.
  const socket = (request as unknown as { socket?: import("node:net").Socket }).socket;
  if (!socket) {
    return new Response(JSON.stringify(buildErrorBody(500, "WebSocket upgrade unavailable")), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  const acceptHeader = acceptKey(clientKey);
  socket.write(
    [
      "HTTP/1.1 101 Switching Protocols",
      "Upgrade: websocket",
      "Connection: Upgrade",
      `Sec-WebSocket-Accept: ${acceptHeader}`,
      "\r\n",
    ].join("\r\n")
  );

  const unsubscribe = globalTrafficBuffer.subscribe((ev) => {
    sendText(socket, ev);
  });

  const pingTimer = setInterval(() => {
    try {
      socket.write(encodeWsFrame(0x09)); // ping
    } catch {
      cleanup();
    }
  }, PING_INTERVAL_MS);

  function cleanup(): void {
    clearInterval(pingTimer);
    unsubscribe();
    try {
      socket.destroy();
    } catch {
      // already gone
    }
  }

  socket.once("close", cleanup);
  socket.once("error", cleanup);

  // Never resolve — the socket is the response channel.
  await new Promise<void>((resolve) => {
    socket.once("close", resolve);
    socket.once("error", resolve);
  });

  cleanup();
  return new Response(null, { status: 101 });
}
