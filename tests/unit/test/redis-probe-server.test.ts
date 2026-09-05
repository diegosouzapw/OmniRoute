import test from "node:test";
import assert from "node:assert/strict";
import net from "node:net";
import { once } from "node:events";
import { startRedisProbeServer, redisHandshakeReply } from "../../helpers/redisProbeServer.ts";

test(
  "Redis fixture replies to fragmented and pipelined commands individually",
  { timeout: 5000 },
  async (t) => {
    const commands: string[] = [];
    const server = await startRedisProbeServer((command) => {
      commands.push(command);
      return redisHandshakeReply(command);
    });
    t.after(() => server.close());
    const client = net.createConnection(server.port, "127.0.0.1");
    t.after(() => client.destroy());
    await once(client, "connect");
    const replies = new Promise<string>((resolve, reject) => {
      let received = "";
      client.on("error", reject);
      client.on("data", (chunk) => {
        received += chunk.toString();
        if (received.split("\r\n").length === 4) resolve(received);
      });
    });

    // PING is incomplete. The remaining bytes and two more commands share a write.
    client.write("*1\r\n$4\r\nPI");
    await new Promise<void>((resolve) => setImmediate(resolve));
    client.write("NG\r\n*2\r\n$6\r\nCLIENT\r\n$7\r\nSETINFO\r\n*1\r\n$4\r\nPING\r\n");

    assert.equal(await replies, "+PONG\r\n+OK\r\n+PONG\r\n");
    assert.deepEqual(commands, ["ping", "client", "ping"]);
    assert.equal(server.connections(), 1);
  }
);
