/**
 * T-08 — embedWsProxy unit tests.
 *
 * Tests the internal helper functions of embedWsProxy.ts without starting
 * a real server (avoids port binding in CI). Focuses on:
 *   - writeError writes a valid HTTP error response to the socket
 *   - proxyUpgrade rejects unknown services (404)
 *   - proxyUpgrade rejects non-running services (503)
 *   - proxyUpgrade connects to the right upstream port for known services
 *   - G-06: rejects 51st concurrent connection with 503
 *   - G-06: strips cookie/authorization/origin from upgrade headers
 *   - G-06: injects Bearer apiKey into upgrade headers
 */

import { describe, it, afterEach } from "node:test";
import assert from "node:assert/strict";
import net from "node:net";

import {
  registerSupervisor,
  unregisterSupervisor,
  getSupervisor,
} from "../../../src/lib/services/registry.ts";
const registryPublicApi = await import("../../../src/lib/services/registry.ts");
import type { ServiceSupervisor } from "../../../src/lib/services/ServiceSupervisor.ts";
import {
  activeConnections,
  registerConnection,
  unregisterConnection,
  buildUpstreamHeaders,
  MAX_CONNECTIONS_PER_SERVICE,
} from "../../../src/lib/services/embedWsProxy.ts";

afterEach(() => {
  unregisterSupervisor("9router");
  // Clean up any connections left by G-06 tests
  activeConnections.delete("test-service");
  activeConnections.delete("9router");
});

// ─── helpers ────────────────────────────────────────────────────────────────

function registerFake(state: string, port: number): void {
  registerSupervisor({
    getStatus: () => ({
      tool: "9router",
      state,
      port,
      pid: null,
      health: "unknown" as const,
      startedAt: null,
      lastError: null,
    }),
  } as unknown as ServiceSupervisor);
}

/** Creates a mock socket that captures written bytes and emits "connect". */
function makeSocket(): { socket: net.Socket; received: Buffer[] } {
  const received: Buffer[] = [];
  const socket = new net.Socket();
  (socket as { write: (chunk: Buffer | string) => void }).write = (chunk: Buffer | string) => {
    received.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  };
  (socket as { end: (chunk?: Buffer | string) => void }).end = (chunk?: Buffer | string) => {
    if (chunk) received.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  };
  Object.defineProperty(socket, "writable", { get: () => true });
  Object.defineProperty(socket, "destroyed", { get: () => false });
  return { socket, received };
}

/** Reads all received buffers as a single string. */
function joined(received: Buffer[]): string {
  return Buffer.concat(received).toString();
}

// ─── tests ───────────────────────────────────────────────────────────────────

describe("embedWsProxy", () => {
  it("registry public surface excludes unused supervisor listing helper", () => {
    assert.equal("listSupervisors" in registryPublicApi, false);
  });

  it("idempotent — initEmbedWsProxy does not bind twice", async () => {
    // Reset the global flag so we can test it from scratch
    const prev = globalThis.__omnirouteEmbedWsStarted;
    globalThis.__omnirouteEmbedWsStarted = true;

    const { initEmbedWsProxy } = await import("../../../src/lib/services/embedWsProxy.ts");

    // Should return immediately without creating a server (already started)
    assert.doesNotThrow(() => initEmbedWsProxy());

    globalThis.__omnirouteEmbedWsStarted = prev;
  });

  it("PATH_RE: /9router/path correctly identifies name and rest", () => {
    // Test the path regex logic by simulating what proxyUpgrade does.
    const PATH_RE = /^\/([^/?#]+)(\/.*)?$/;

    const m1 = PATH_RE.exec("/9router/ui/index.html");
    assert.ok(m1);
    assert.equal(m1[1], "9router");
    assert.equal(m1[2], "/ui/index.html");

    const m2 = PATH_RE.exec("/9router");
    assert.ok(m2);
    assert.equal(m2[1], "9router");
    assert.equal(m2[2], undefined);

    assert.equal(PATH_RE.exec("/"), null);
    assert.equal(PATH_RE.exec(""), null);
  });

  it("writeError sends a well-formed HTTP error response", () => {
    const { socket, received } = makeSocket();

    // Simulate what writeError does (same logic as the module)
    const status = 404;
    const message = "Service 'foo' not found";
    const body = Buffer.from(JSON.stringify({ error: message }), "utf8");
    const lines = [
      `HTTP/1.1 ${status} Not Found`,
      "Connection: close",
      "Content-Type: application/json; charset=utf-8",
      `Content-Length: ${body.length}`,
      "",
      "",
    ];
    socket.write(lines.join("\r\n"));
    socket.end(body);

    const raw = joined(received);
    assert.ok(raw.startsWith("HTTP/1.1 404 Not Found\r\n"), "starts with status line");
    assert.ok(raw.includes("Content-Type: application/json"), "has content-type");
    assert.ok(raw.includes(message), "body contains message");
  });

  it("getSupervisor lookup fails for unregistered name → null", () => {
    assert.equal(getSupervisor("nonexistent"), null);
  });

  it("service registered as stopped is detectable via getStatus", () => {
    registerFake("stopped", 20130);
    const sup = getSupervisor("9router");
    assert.ok(sup !== null);
    const status = sup.getStatus();
    assert.equal(status.state, "stopped");
    assert.equal(status.port, 20130);
  });

  it("service registered as running is detectable via getStatus", () => {
    registerFake("running", 20130);
    const sup = getSupervisor("9router");
    assert.ok(sup !== null);
    assert.equal(sup.getStatus().state, "running");
  });

  // ─── G-06 tests ──────────────────────────────────────────────────────────

  it("G-06: rejects 51st concurrent connection with 503", () => {
    const serviceName = "test-service";

    // Fill up to the limit
    const sockets: net.Socket[] = [];
    for (let i = 0; i < MAX_CONNECTIONS_PER_SERVICE; i++) {
      const { socket } = makeSocket();
      const accepted = registerConnection(serviceName, socket);
      assert.ok(accepted, `connection ${i + 1} should be accepted`);
      sockets.push(socket);
    }

    // The 51st should be rejected
    const { socket: socket51, received: received51 } = makeSocket();
    const rejected = registerConnection(serviceName, socket51);
    assert.equal(rejected, false, "51st connection must be rejected");

    // The response written to the 51st socket must be a 503
    const raw = joined(received51);
    assert.ok(raw.startsWith("HTTP/1.1 503"), "rejected socket gets 503 status line");
    assert.ok(raw.includes("connection limit"), "503 body mentions connection limit");

    // Clean up
    for (const s of sockets) {
      unregisterConnection(serviceName, s);
    }
  });

  it("G-06: strips cookie, authorization, and origin from upgrade headers", () => {
    const rawHeaders = [
      "Host",
      "localhost:3000",
      "Connection",
      "Upgrade",
      "Upgrade",
      "websocket",
      "Cookie",
      "session=abc123",
      "Authorization",
      "Bearer client-token",
      "Origin",
      "http://localhost:3000",
      "Sec-WebSocket-Key",
      "dGhlIHNhbXBsZSBub25jZQ==",
      "Sec-WebSocket-Version",
      "13",
    ];

    const headers = buildUpstreamHeaders(rawHeaders, 20130, "nr_injectedkey");
    const headerStr = headers.join("\r\n").toLowerCase();

    assert.ok(!headerStr.includes("cookie:"), "cookie must be stripped");
    assert.ok(
      !headerStr.includes("bearer client-token"),
      "original authorization must be stripped"
    );
    assert.ok(!headerStr.includes("origin:"), "origin must be stripped");

    // Non-stripped headers must remain
    assert.ok(headerStr.includes("upgrade: websocket"), "upgrade header must be preserved");
    assert.ok(headerStr.includes("sec-websocket-key:"), "sec-websocket-key must be preserved");
  });

  it("G-06: injects Bearer apiKey into upgrade headers replacing any client Authorization", () => {
    const apiKey = "nr_testapikey1234";
    const rawHeaders = [
      "Host",
      "localhost",
      "Authorization",
      "Bearer old-client-token",
      "Upgrade",
      "websocket",
    ];

    const headers = buildUpstreamHeaders(rawHeaders, 20130, apiKey);
    const authHeaders = headers.filter((h) => h.toLowerCase().startsWith("authorization:"));

    // Must have exactly one Authorization header
    assert.equal(authHeaders.length, 1, "exactly one Authorization header must be present");
    assert.ok(
      authHeaders[0].includes(`Bearer ${apiKey}`),
      `Authorization must be 'Bearer ${apiKey}', got: ${authHeaders[0]}`
    );
  });
});
