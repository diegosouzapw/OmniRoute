// Tests that LiveWS authorizeConnection() allows anonymous connections when
// requireLogin=false (issue #14256). Before this fix, the WebSocket always
// returned UNAUTHORIZED in no-password mode because no auth_token cookie is
// ever issued without a login flow.
//
// Importing liveServer.ts is safe: the module-level auto-start guard is
// short-circuited by isBuildOrTest() because the Node test runner passes
// "--test" in process.argv.
import { after, before, describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import net from "node:net";
import os from "node:os";
import path from "node:path";

import { WebSocket } from "ws";

// ── Env setup ─────────────────────────────────────────────────────────────
// Must be done before importing the DB, which reads DATA_DIR at import time.
const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-live-ws-require-login-"));
const ORIG_DATA_DIR = process.env.DATA_DIR;
const ORIG_JWT_SECRET = process.env.JWT_SECRET;
const ORIG_LIVE_WS_HOST = process.env.LIVE_WS_HOST;
const ORIG_API_KEY_SECRET = process.env.API_KEY_SECRET;

process.env.DATA_DIR = TEST_DATA_DIR;
process.env.JWT_SECRET = "test-jwt-secret-live-ws-require-login-14256";
process.env.API_KEY_SECRET =
  process.env.API_KEY_SECRET || "test-api-key-secret-live-ws-require-login";
delete process.env.LIVE_WS_HOST; // keep default loopback (127.0.0.1)

// Import DB modules after DATA_DIR is set.
const { resetDbInstance } = await import("../../src/lib/db/core.ts");
const { updateSettings } = await import("@/lib/db/settings");
const { startLiveDashboardServer } = await import("../../src/server/ws/liveServer.ts");

// ── Helpers ───────────────────────────────────────────────────────────────

function getFreePort(host: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.once("error", reject);
    srv.listen(0, host, () => {
      const addr = srv.address();
      const port = addr && typeof addr === "object" ? addr.port : null;
      srv.close(() => {
        if (port) resolve(port);
        else reject(new Error("Could not allocate a port"));
      });
    });
  });
}

/**
 * Connect to the WS server at ws://127.0.0.1:<port>/live-ws, subscribe to
 * the "requests" channel, and return the first "welcome" or "error" message.
 * `extraHeaders` go out on the upgrade request, simulating a reverse proxy
 * in front of the dashboard that stamps x-forwarded-for / x-real-ip.
 */
function connectAndWait(
  port: number,
  extraHeaders: Record<string, string> = {}
): Promise<{ type: string; code?: string; message?: string }> {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:${port}/live-ws`, {
      origin: "http://127.0.0.1:20128",
      headers: extraHeaders,
    });
    const timer = setTimeout(() => {
      ws.terminate();
      reject(new Error("Timed out waiting for WebSocket message"));
    }, 5000);

    ws.once("open", () => {
      ws.send(JSON.stringify({ type: "subscribe", channels: ["requests"] }));
    });

    ws.once("message", (data) => {
      clearTimeout(timer);
      try {
        resolve(JSON.parse(String(data)));
      } catch {
        reject(new Error("Invalid JSON from server"));
      } finally {
        ws.close();
      }
    });

    ws.once("error", (err) => {
      clearTimeout(timer);
      reject(err);
    });
  });
}

// ── Tests ─────────────────────────────────────────────────────────────────

describe("LiveWS authorizeConnection — requireLogin=false bypass (#14256)", () => {
  before(async () => {
    // Fresh DB for each describe block.
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
  });

  after(() => {
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5 });

    if (ORIG_DATA_DIR === undefined) delete process.env.DATA_DIR;
    else process.env.DATA_DIR = ORIG_DATA_DIR;

    if (ORIG_JWT_SECRET === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = ORIG_JWT_SECRET;

    if (ORIG_LIVE_WS_HOST === undefined) delete process.env.LIVE_WS_HOST;
    else process.env.LIVE_WS_HOST = ORIG_LIVE_WS_HOST;

    if (ORIG_API_KEY_SECRET === undefined) delete process.env.API_KEY_SECRET;
    else process.env.API_KEY_SECRET = ORIG_API_KEY_SECRET;
  });

  test("anonymous connection is accepted when requireLogin=false", async () => {
    // Configure the DB: requireLogin explicitly disabled, no password.
    await updateSettings({ requireLogin: false });

    const port = await getFreePort("127.0.0.1");
    const server = await startLiveDashboardServer(port, "127.0.0.1");
    try {
      const msg = await connectAndWait(port);
      // The first message after a successful subscribe must be "welcome",
      // not "error" with code UNAUTHORIZED.
      assert.equal(
        msg.type,
        "welcome",
        `Expected welcome but got type=${msg.type} code=${msg.code ?? ""} message=${msg.message ?? ""}`
      );
    } finally {
      await new Promise<void>((r) => server.close(() => r()));
    }
  });

  test("anonymous connection is rejected when requireLogin=true and no credentials", async () => {
    // Reset the DB with a password set, so auth IS required.
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

    await updateSettings({ requireLogin: true, password: "hashed-password-for-test" });

    const port = await getFreePort("127.0.0.1");
    const server = await startLiveDashboardServer(port, "127.0.0.1");
    try {
      const msg = await connectAndWait(port);
      assert.equal(msg.type, "error", `Expected error but got type=${msg.type}`);
      assert.equal(msg.code, "UNAUTHORIZED");
    } finally {
      await new Promise<void>((r) => server.close(() => r()));
    }
  });

  test("fresh-install bypass still welcomes a genuinely local client", async () => {
    // Fresh install: no password, no OIDC, no INITIAL_PASSWORD, setup not
    // complete, loopback bind. The pre-setup anonymous window must keep
    // working for real local dashboard clients (control for the proxy test).
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

    await updateSettings({ requireLogin: true });

    const port = await getFreePort("127.0.0.1");
    const server = await startLiveDashboardServer(port, "127.0.0.1");
    try {
      const msg = await connectAndWait(port);
      assert.equal(msg.type, "welcome", `Expected welcome but got type=${msg.type}`);
    } finally {
      await new Promise<void>((r) => server.close(() => r()));
    }
  });

  test("fresh-install bypass is refused through forwarding headers (tunnel/proxy)", async () => {
    // Same fresh-install state, but the upgrade carries x-forwarded-for /
    // x-real-ip — the signature of a reverse proxy or tunnel hop. The peer is
    // not the local dashboard user, so the pre-setup anonymous window must
    // NOT open (same discipline as isLoopbackRequest on the HTTP routes).
    resetDbInstance();
    fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true });
    fs.mkdirSync(TEST_DATA_DIR, { recursive: true });

    await updateSettings({ requireLogin: true });

    const port = await getFreePort("127.0.0.1");
    const server = await startLiveDashboardServer(port, "127.0.0.1");
    try {
      const msg = await connectAndWait(port, {
        "x-forwarded-for": "203.0.113.7",
        "x-real-ip": "203.0.113.7",
      });
      assert.equal(msg.type, "error", `Expected error but got type=${msg.type}`);
      assert.equal(msg.code, "UNAUTHORIZED");
    } finally {
      await new Promise<void>((r) => server.close(() => r()));
    }
  });
});
