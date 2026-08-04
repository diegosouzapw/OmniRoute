// Integration test (relocated from tests/unit/cli): it spawns the real
// start-ws-server.mjs subprocess, which boots a full WebSocket server + SQLite
// and eagerly warms the SSE auth module (~7s under tsx). Running it in the unit
// suite under --test-concurrency=20 made it flaky/red because the heavy subprocess
// boot contended for CPU; it belongs in the serial (--test-concurrency=1)
// integration runner. It still guards #4004's same-origin cookie-parse fix on
// every PR via the integration CI job.
import assert from "node:assert/strict";
import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import { SignJWT } from "jose";
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
    // Startup eagerly warms the SSE auth module (see liveServer.ts), which takes
    // several seconds under tsx, so "listening" can appear ~7s after spawn. 30s
    // leaves headroom for a loaded CI runner.
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
  "LiveWS startup script boots on current Node and accepts API-key WebSocket clients",
  { timeout: 45_000 },
  async () => {
    const port = await getFreePort();
    const apiKey = "test-live-ws-key";
    const jwtSecret = "test-live-ws-jwt-secret";
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

      assert.doesNotMatch(output, /tsx must be loaded with --import/i);
      assert.doesNotMatch(output, /EADDRINUSE/i);

      async function expectLiveWsOpen(headers: Record<string, string>): Promise<void> {
        await new Promise<void>((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error(`Timed out waiting for LiveWS connection. Output:\n${output}`));
          }, 4_000);

          const ws = new WebSocket(`ws://127.0.0.1:${port}/live-ws`, { headers });

          ws.once("open", () => {
            clearTimeout(timeout);
            ws.close(1000);
            resolve();
          });

          ws.once("error", (error) => {
            clearTimeout(timeout);
            reject(new Error(`LiveWS client failed: ${error.message}. Output:\n${output}`));
          });
        });
      }

      await expectLiveWsOpen({
        Authorization: `Bearer ${apiKey}`,
        Origin: origin,
      });

      const dashboardToken = await new SignJWT({ authenticated: true })
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("5m")
        .sign(new TextEncoder().encode(jwtSecret));

      // Send auth_token preceded by another cookie (the real browser case: "a=1; auth_token=…").
      // Guards #4004's cookie-parse regex: a literal-"s" bug (\s vs \\s) only matched auth_token
      // when it was the FIRST cookie, silently breaking same-origin reverse-proxy auth otherwise.
      await expectLiveWsOpen({
        Cookie: `omni_pref=dark; auth_token=${dashboardToken}`,
        Origin: origin,
      });
    } finally {
      terminateTree(child);
    }
  }
);
