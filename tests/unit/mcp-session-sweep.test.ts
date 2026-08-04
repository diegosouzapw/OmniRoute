import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcPath = resolve(__dirname, "../../open-sse/mcp-server/httpTransport.ts");
const src = readFileSync(srcPath, "utf-8");

const mod = await import("../../open-sse/mcp-server/httpTransport.ts");

// ── Module exports ───────────────────────────────────────────────────────────

test("module exports handleMcpStreamableHTTP", () => {
  assert.equal(typeof mod.handleMcpStreamableHTTP, "function");
});

test("module exports handleMcpSSE", () => {
  assert.equal(typeof mod.handleMcpSSE, "function");
});

test("module exports getMcpHttpStatus", () => {
  assert.equal(typeof mod.getMcpHttpStatus, "function");
});

test("module exports shutdownMcpHttp", () => {
  assert.equal(typeof mod.shutdownMcpHttp, "function");
});

test("module exports isMcpHttpTransportReady", () => {
  assert.equal(typeof mod.isMcpHttpTransportReady, "function");
});

test("module exports isMcpHttpActive", () => {
  assert.equal(typeof mod.isMcpHttpActive, "function");
});

// ── Source-level invariant: StreamableSession type has lastActivityAt ─────────

test("StreamableSession type includes lastActivityAt field", () => {
  const typeBlock = src.match(/type StreamableSession\s*=\s*\{([^}]+)\}/);
  assert.ok(typeBlock, "StreamableSession type definition must exist");
  assert.ok(
    typeBlock[1].includes("lastActivityAt"),
    "StreamableSession must have lastActivityAt field"
  );
});

// ── Source-level invariant: sweep uses lastActivityAt not startedAt ───────────

test("sweep interval compares against lastActivityAt, not startedAt", () => {
  const sweepBlock = src.match(
    /_mcpSessionSweep\s*=\s*setInterval\(\(\)\s*=>\s*\{([\s\S]*?)\},\s*60_000\)/
  );
  assert.ok(sweepBlock, "sweep interval block must exist");
  assert.ok(
    sweepBlock[1].includes("session.lastActivityAt"),
    "sweep must check session.lastActivityAt"
  );
  assert.ok(!sweepBlock[1].includes("session.startedAt"), "sweep must NOT check session.startedAt");
});

// ── Source-level invariant: MCP_SESSION_IDLE_MS constant ─────────────────────

test("MCP_SESSION_IDLE_MS is 5 minutes (5 * 60 * 1000)", () => {
  assert.ok(src.includes("5 * 60 * 1000"), "idle timeout should be 5 * 60 * 1000");
});

// ── Source-level invariant: createStreamableSession sets lastActivityAt ───────

test("createStreamableSession initializes lastActivityAt to Date.now()", () => {
  const fnBlock = src.match(/function createStreamableSession\(\)[\s\S]*?return session;\s*\}/);
  assert.ok(fnBlock, "createStreamableSession function must exist");
  assert.ok(
    fnBlock[0].includes("lastActivityAt: Date.now()"),
    "createStreamableSession must set lastActivityAt: Date.now()"
  );
});

// ── Source-level invariant: handleStreamableRequest updates lastActivityAt ────

test("handleStreamableRequest updates lastActivityAt on every request", () => {
  const fnBlock = src.match(
    /async function handleStreamableRequest[\s\S]*?(?=\n(?:async )?function |\nexport )/
  );
  assert.ok(fnBlock, "handleStreamableRequest function must exist");
  assert.ok(
    fnBlock[0].includes("session.lastActivityAt = Date.now()"),
    "handleStreamableRequest must update session.lastActivityAt on each request"
  );
});

// ── Behavioral: getMcpHttpStatus returns expected shape when idle ─────────────

test("getMcpHttpStatus returns active-session state with no active sessions", () => {
  mod.shutdownMcpHttp();
  const status = mod.getMcpHttpStatus();
  assert.equal(typeof status.online, "boolean");
  assert.equal(status.online, false);
  assert.equal(status.transport, null);
  assert.equal(status.startedAt, null);
  assert.equal(status.uptime, null);
});

test("isMcpHttpTransportReady treats enabled lazy HTTP transports as ready", () => {
  mod.shutdownMcpHttp();
  const status = mod.getMcpHttpStatus();
  assert.equal(status.online, false);
  assert.equal(mod.isMcpHttpTransportReady(true, "streamable-http"), true);
  assert.equal(mod.isMcpHttpTransportReady(true, "sse"), true);
  assert.equal(mod.isMcpHttpTransportReady(true, "stdio"), false);
  assert.equal(mod.isMcpHttpTransportReady(false, "streamable-http"), false);
});

// ── Behavioral: isMcpHttpActive is false after shutdown ──────────────────────

test("isMcpHttpActive returns false when no transports are active", () => {
  mod.shutdownMcpHttp();
  assert.equal(mod.isMcpHttpActive(), false);
});

// ── Behavioral: shutdownMcpHttp is idempotent ────────────────────────────────

test("shutdownMcpHttp can be called multiple times without error", () => {
  mod.shutdownMcpHttp();
  mod.shutdownMcpHttp();
  mod.shutdownMcpHttp();
  assert.equal(mod.isMcpHttpActive(), false);
});

// ── Source-level invariant: sweep interval is 60 seconds ─────────────────────

test("sweep interval runs every 60 seconds", () => {
  assert.ok(
    src.includes("}, 60_000)") || src.includes("}, 60000)"),
    "sweep interval must be 60_000ms (60 seconds)"
  );
});

// ── Source-level invariant: sweep timer is unref'd so it doesn't block exit ───

test("sweep timer is unref'd to avoid preventing process exit", () => {
  assert.ok(
    src.includes("_mcpSessionSweep") && src.includes(".unref?.()"),
    "sweep timer must be unref'd"
  );
});

// ── Source-level invariant: sweep calls closeStreamableSession for idle ───────

test("sweep closes idle sessions via closeStreamableSession", () => {
  const sweepBlock = src.match(
    /_mcpSessionSweep\s*=\s*setInterval\(\(\)\s*=>\s*\{([\s\S]*?)\},\s*60_000\)/
  );
  assert.ok(sweepBlock, "sweep block must exist");
  assert.ok(
    sweepBlock[1].includes("closeStreamableSession(sessionId)"),
    "sweep must call closeStreamableSession for idle sessions"
  );
});

// ── Behavioral: shutdownMcpHttp clears all sessions ─────────────────────────

test("shutdownMcpHttp clears all sessions and makes isMcpHttpActive false", () => {
  mod.shutdownMcpHttp();
  assert.equal(mod.isMcpHttpActive(), false);
  const before = mod.getMcpHttpStatus();
  assert.equal(before.online, false);
  assert.equal(before.transport, null);
});

// ── Behavioral: handleMcpStreamableHTTP rejects request without session id ───

test("handleMcpStreamableHTTP rejects non-initialize request without session id", async () => {
  mod.shutdownMcpHttp();
  const req = new Request("http://localhost/api/mcp/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "tools/list", id: 1 }),
  });
  const res = await mod.handleMcpStreamableHTTP(req);
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.ok(body.error);
  assert.ok(body.error.message.includes("Mcp-Session-Id"));
});

// ── Behavioral: handleMcpStreamableHTTP creates session on initialize ────────

test("handleMcpStreamableHTTP creates a session on initialize request", async () => {
  mod.shutdownMcpHttp();
  assert.equal(mod.isMcpHttpActive(), false);

  const initReq = new Request("http://localhost/api/mcp/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "initialize",
      id: 1,
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "test-client", version: "1.0.0" },
      },
    }),
  });
  const res = await mod.handleMcpStreamableHTTP(initReq);
  assert.ok(res.status >= 200, "should get a response");
  if (res.headers.get("mcp-session-id")) {
    assert.equal(mod.isMcpHttpActive(), true);
    const status = mod.getMcpHttpStatus();
    assert.equal(status.online, true);
    assert.equal(status.transport, "streamable-http");
    assert.ok(status.startedAt !== null);
    mod.shutdownMcpHttp();
    assert.equal(mod.isMcpHttpActive(), false);
  }
});

// ── Behavioral: getMcpHttpStatus reflects transport state ────────────────────

test("getMcpHttpStatus returns streamable-http transport when session exists", async () => {
  mod.shutdownMcpHttp();
  const initReq = new Request("http://localhost/api/mcp/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "initialize",
      id: 1,
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "test-client", version: "1.0.0" },
      },
    }),
  });
  const res = await mod.handleMcpStreamableHTTP(initReq);
  const sessionId = res.headers.get("mcp-session-id");
  if (sessionId) {
    const status = mod.getMcpHttpStatus();
    assert.equal(status.online, true);
    assert.equal(status.transport, "streamable-http");
    assert.ok(typeof status.uptime === "string");
    assert.ok(status.uptime.endsWith("s"));
  }
  mod.shutdownMcpHttp();
});

// ── Behavioral: shutdownMcpHttp cleans up sessions created via initialize ────

test("shutdownMcpHttp removes sessions created via handleMcpStreamableHTTP", async () => {
  mod.shutdownMcpHttp();
  const initReq = new Request("http://localhost/api/mcp/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "initialize",
      id: 1,
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "test-client", version: "1.0.0" },
      },
    }),
  });
  const res = await mod.handleMcpStreamableHTTP(initReq);
  const sessionId = res.headers.get("mcp-session-id");
  if (sessionId) {
    assert.equal(mod.isMcpHttpActive(), true);
    mod.shutdownMcpHttp();
    assert.equal(mod.isMcpHttpActive(), false);
    const status = mod.getMcpHttpStatus();
    assert.equal(status.online, false);
    assert.equal(status.transport, null);
    const staleReq = new Request("http://localhost/api/mcp/stream", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "mcp-session-id": sessionId,
      },
      body: JSON.stringify({ jsonrpc: "2.0", method: "tools/list", id: 2 }),
    });
    const staleRes = await mod.handleMcpStreamableHTTP(staleReq);
    // MCP spec (2025-03-26 / 2025-11-25, Session Management): a terminated/unknown
    // session id MUST return 404 Not Found so the client re-initializes (issue #5169).
    assert.equal(staleRes.status, 404);
  }
});

// ── Behavioral: handleMcpStreamableHTTP rejects unknown session id ───────────

test("handleMcpStreamableHTTP rejects request with unknown session id", async () => {
  mod.shutdownMcpHttp();
  const req = new Request("http://localhost/api/mcp/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "mcp-session-id": "nonexistent-session-id",
    },
    body: JSON.stringify({ jsonrpc: "2.0", method: "tools/list", id: 1 }),
  });
  const res = await mod.handleMcpStreamableHTTP(req);
  // Per MCP spec, a present-but-unknown session id MUST yield 404 (not 400), so
  // the client knows to start a fresh session rather than hard-fail (issue #5169).
  assert.equal(res.status, 404);
  const body = await res.json();
  assert.ok(body.error);
  assert.ok(body.error.message.includes("Unknown"));
});

// ── Regression #5169: unknown/expired session → HTTP 404 (not 400) ───────────

test("handleMcpStreamableHTTP returns 404 (not 400) for an unknown session id", async () => {
  mod.shutdownMcpHttp();
  const req = new Request("http://localhost/api/mcp/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "mcp-session-id": "expired-or-unknown-session",
    },
    body: JSON.stringify({ jsonrpc: "2.0", method: "tools/list", id: 7 }),
  });
  const res = await mod.handleMcpStreamableHTTP(req);
  // The 400-vs-404 distinction is the whole bug: clients only re-initialize on 404.
  assert.equal(res.status, 404);
  const body = await res.json();
  assert.equal(body.jsonrpc, "2.0");
  assert.equal(body.error.code, -32000);
  assert.ok(body.error.message.includes("Mcp-Session-Id"));
});

// ── Guard: a *missing* session id on a non-initialize request stays 400 ───────

test("handleMcpStreamableHTTP keeps 400 for a missing session id (non-initialize)", async () => {
  mod.shutdownMcpHttp();
  const req = new Request("http://localhost/api/mcp/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", method: "tools/list", id: 8 }),
  });
  const res = await mod.handleMcpStreamableHTTP(req);
  // Spec reserves 400 for a *missing* session id on non-initialize requests —
  // only the *present-but-unknown* case changed to 404. This must NOT regress.
  assert.equal(res.status, 400);
});

test("handleMcpStreamableHTTP auto-recovers when stale session id is sent with initialize", async () => {
  mod.shutdownMcpHttp();

  const initReq = new Request("http://localhost/api/mcp/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "initialize",
      id: 1,
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "test-client", version: "1.0.0" },
      },
    }),
  });

  const firstRes = await mod.handleMcpStreamableHTTP(initReq);
  const staleSessionId = firstRes.headers.get("mcp-session-id");
  if (!staleSessionId) {
    mod.shutdownMcpHttp();
    return;
  }

  mod.shutdownMcpHttp();
  assert.equal(mod.isMcpHttpActive(), false);

  const reinitReq = new Request("http://localhost/api/mcp/stream", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json, text/event-stream",
      "mcp-session-id": staleSessionId,
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "initialize",
      id: 2,
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "test-client", version: "1.0.0" },
      },
    }),
  });

  const recoveryRes = await mod.handleMcpStreamableHTTP(reinitReq);

  assert.notEqual(
    recoveryRes.status,
    404,
    "Stale session + initialize must NOT return 404 — server should auto-recover"
  );
  assert.ok(
    recoveryRes.status >= 200 && recoveryRes.status < 300,
    `Expected 2xx response on auto-recovery, got ${recoveryRes.status}`
  );

  const newSessionId = recoveryRes.headers.get("mcp-session-id");
  assert.ok(newSessionId, "Server must issue a new mcp-session-id on auto-recovery");
  assert.equal(
    mod.isMcpHttpActive(),
    true,
    "Server must have an active session after auto-recovery"
  );

  mod.shutdownMcpHttp();
});
