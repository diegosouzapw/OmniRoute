// Integration test for #10452 and its follow-up: a server-emitted application pong must
// not keep a half-open client alive (#10452), and a subscriber that never sends anything
// at the application level must not be evicted either. The server now also sends a
// protocol-level ping (RFC 6455 §5.5.2) that conformant clients auto-answer, which
// separates a client that stopped reading frames (simulated below by pausing the
// underlying socket) from one that is alive but silent at the application level.
//
// Uses the real server harness from tests/integration/live-ws-startup.test.ts (serial,
// --test-concurrency=1 integration runner — needs a ~50s window to cross the server's
// HEARTBEAT_TIMEOUT_MS, intentionally NOT inflated here).
import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import net from "node:net";
import test from "node:test";
import WebSocket from "ws";

function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => {
        if (address && typeof address === "object") resolve(address.port);
        else reject(new Error("Failed to allocate a local port"));
      });
    });
  });
}

function terminateTree(child: ChildProcessWithoutNullStreams): void {
  if (!child.pid) return;
  try {
    process.kill(-child.pid, "SIGTERM");
  } catch {
    child.kill("SIGTERM");
  }
}

function waitForStartup(
  child: ChildProcessWithoutNullStreams,
  getOutput: () => string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      reject(new Error(`LiveWS startup timed out. Output:\n${getOutput()}`));
    }, 30_000);

    const onData = () => {
      const output = getOutput();
      if (output.includes("Dashboard WebSocket server listening")) {
        cleanup();
        resolve();
      }
    };

    const onExit = (code: number | null, signal: NodeJS.Signals | null) => {
      cleanup();
      reject(
        new Error(`LiveWS exited before listening: code=${code} signal=${signal}\n${getOutput()}`)
      );
    };

    const cleanup = () => {
      clearTimeout(timeout);
      child.stdout.off("data", onData);
      child.stderr.off("data", onData);
      child.off("exit", onExit);
    };

    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.once("exit", onExit);
    onData();
  });
}

test(
  "LiveWS reaps a socket that stops reading frames, but keeps a quiet-but-alive subscriber",
  // A fresh DATA_DIR can spend up to the server-startup allowance running the
  // complete migration set before the 50s heartbeat observation window.
  { timeout: 95_000 },
  async () => {
    const port = await getFreePort();
    const apiKey = "test-live-ws-heartbeat-key";
    const jwtSecret = "test-live-ws-heartbeat-jwt-secret";
    const origin = "http://localhost";
    let output = "";

    const child = spawn(process.execPath, ["scripts/start-ws-server.mjs"], {
      cwd: process.cwd(),
      detached: process.platform !== "win32",
      env: {
        ...process.env,
        NODE_ENV: "test",
        OMNIROUTE_API_KEY: apiKey,
        JWT_SECRET: jwtSecret,
        LIVE_WS_HOST: "127.0.0.1",
        LIVE_WS_PORT: String(port),
        LIVE_WS_ALLOWED_ORIGINS: origin,
      },
    });

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      output += chunk;
    });
    child.stderr.on("data", (chunk) => {
      output += chunk;
    });

    try {
      await waitForStartup(child, () => output);

      type ConnectMode = "appHeartbeat" | "quiet" | "deadSocket";

      const connect = (mode: ConnectMode) => {
        const ws = new WebSocket(`ws://127.0.0.1:${port}/live-ws`, {
          headers: { Authorization: `Bearer ${apiKey}`, Origin: origin },
        });
        let heartbeat: NodeJS.Timeout | undefined;
        let sessionId: string | undefined;
        const welcome = new Promise<string>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error(`Timed out waiting for welcome. Output:\n${output}`));
          }, 5_000);

          ws.once("open", () => {
            ws.send(JSON.stringify({ type: "subscribe", channels: ["requests"] }));
            if (mode === "appHeartbeat") {
              heartbeat = setInterval(() => {
                if (ws.readyState === WebSocket.OPEN) {
                  ws.send(JSON.stringify({ type: "ping" }));
                }
              }, 10_000);
            }
          });

          ws.on("message", (data) => {
            const message = JSON.parse(data.toString());
            if (message.type === "welcome") {
              clearTimeout(timeout);
              sessionId = message.sessionId;
              // "deadSocket": pause the underlying TCP socket so the `ws` receiver never
              // sees (and auto-answers) the server's ping. It also cannot observe its own
              // closure, so the assertion checks the server's disconnect log instead.
              if (mode === "deadSocket") {
                (ws as unknown as { _socket: import("net").Socket })._socket.pause();
              }
              resolve(sessionId as string);
            }
          });

          ws.once("error", (error) => {
            clearTimeout(timeout);
            reject(new Error(`LiveWS client failed: ${error.message}. Output:\n${output}`));
          });
        });

        return { ws, welcome, stop: () => clearInterval(heartbeat) };
      };

      const deadSocket = connect("deadSocket");
      const quiet = connect("quiet");
      const appHeartbeat = connect("appHeartbeat");
      const [deadSocketId] = await Promise.all([
        deadSocket.welcome,
        quiet.welcome,
        appHeartbeat.welcome,
      ]);

      // Wait past HEARTBEAT_TIMEOUT_MS (35s) plus one heartbeat interval (15s).
      await new Promise((resolve) => setTimeout(resolve, 50_000));

      assert.ok(
        output.includes(`Client disconnected: ${deadSocketId}`),
        `Server never disconnected the socket that stopped reading frames — protocol ` +
          `ping/pong must not mask a truly half-open connection (#10452). Output:\n${output}`
      );
      assert.notEqual(
        quiet.ws.readyState,
        WebSocket.CLOSED,
        `A real subscriber that sent no application-level messages was evicted — the protocol ` +
          `ping/pong (auto-answered by every conformant client) must keep it alive. Output:\n${output}`
      );
      assert.notEqual(
        appHeartbeat.ws.readyState,
        WebSocket.CLOSED,
        `Application-heartbeat client was terminated. Output:\n${output}`
      );

      deadSocket.stop();
      quiet.stop();
      appHeartbeat.stop();
      quiet.ws.close();
      appHeartbeat.ws.close();
      deadSocket.ws.terminate();
    } finally {
      terminateTree(child);
    }
  }
);
