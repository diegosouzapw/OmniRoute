import net from "node:net";

// ioredis pipelines handshake commands. TCP chunks are not command boundaries:
// reply once per complete RESP command, retaining partial commands for later data.
export async function startRedisProbeServer(
  reply: (command: string, socket: net.Socket) => string
) {
  const sockets = new Set<net.Socket>();
  let connections = 0;
  let closed = false;
  const server = net.createServer((socket) => {
    connections++;
    sockets.add(socket);
    let pending = Buffer.alloc(0);
    socket.on("error", () => {});
    socket.on("close", () => {
      closed = true;
      sockets.delete(socket);
    });
    socket.on("data", (chunk) => {
      pending = Buffer.concat([pending, chunk]);
      while (pending.length > 0) {
        const headerEnd = pending.indexOf("\r\n");
        if (headerEnd === -1) return;
        const count = Number(pending.subarray(1, headerEnd).toString());
        if (pending[0] !== 42 || !Number.isSafeInteger(count) || count < 1) {
          socket.destroy(new Error("Expected a RESP command array"));
          return;
        }
        const args: string[] = [];
        let offset = headerEnd + 2;
        for (let index = 0; index < count; index++) {
          const end = pending.indexOf("\r\n", offset);
          if (end === -1) return;
          const size = Number(pending.subarray(offset + 1, end).toString());
          if (pending[offset] !== 36 || !Number.isSafeInteger(size) || size < 0) {
            socket.destroy(new Error("Expected a RESP bulk string"));
            return;
          }
          if (pending.length < end + 2 + size + 2) return;
          args.push(pending.subarray(end + 2, end + 2 + size).toString());
          offset = end + 2 + size + 2;
        }
        pending = pending.subarray(offset);
        const response = reply(args[0].toLowerCase(), socket);
        if (socket.destroyed) return;
        socket.write(response);
      }
    });
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  return {
    port: (server.address() as net.AddressInfo).port,
    connections: () => connections,
    socketClosed: () => closed,
    close: () => {
      for (const socket of sockets) socket.destroy();
      server.close();
    },
  };
}

export function redisHandshakeReply(command: string): string {
  if (command === "info") {
    const body = "redis_version:7.0.0\r\n";
    return `$${Buffer.byteLength(body)}\r\n${body}\r\n`;
  }
  return command === "ping" ? "+PONG\r\n" : "+OK\r\n";
}
