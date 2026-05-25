/**
 * Live Dashboard WebSocket Server
 *
 * Separate process (runs alongside Next.js on port 20129).
 * Forwards EventBus events to subscribed dashboard clients.
 *
 * Protocol:
 *   Client → Server: { type: "subscribe", channels: ["requests", "combo"] }
 *   Server → Client: { type: "event", channel: "requests", event: "request.started", data: {...} }
 *   Client → Server: { type: "ping" }
 *   Server → Client: { type: "pong" }
 *   Server → Client: { type: "welcome", version, sessionId, channels, backlog }
 *   Server → Client: { type: "error", code, message }
 */

import { WebSocketServer, WebSocket } from "ws";
import { createServer } from "http";
import { randomUUID } from "crypto";

// ── Types ─────────────────────────────────────────────────────────────────

import type { WsClientMessage, WsServerMessage, WsAuthResult } from "./types";

import { emit, on, onAny, getEventHistory, type HistoryEntry } from "@/lib/events/eventBus";

import type { DashboardEventName, DashboardEventMap, DashboardChannel } from "@/lib/events/types";

import { CHANNEL_EVENTS, getChannelForEvent } from "@/lib/events/types";

// ── Config ────────────────────────────────────────────────────────────────

const DEFAULT_PORT = 20129;
const HEARTBEAT_INTERVAL_MS = 15_000;
const HEARTBEAT_TIMEOUT_MS = 35_000;
const MAX_CLIENTS = 500;
const MAX_EVENTS_PER_SECOND = 100;

// ── Client State ──────────────────────────────────────────────────────────

interface ClientState {
  ws: WebSocket;
  sessionId: string;
  subscribedChannels: Set<DashboardChannel>;
  lastActivity: number;
  /** Per-second rate limit counter */
  eventCounter: number;
  eventCounterReset: number;
  /** Current IP for rate limiting */
  remoteAddress: string;
}

const clients = new Map<string, ClientState>();
let eventHistoryBacklog: HistoryEntry[] = [];
const BACKLOG_MAX = 500;

// ── Auth ──────────────────────────────────────────────────────────────────

async function authorizeConnection(request: import("http").IncomingMessage): Promise<WsAuthResult> {
  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  const token = url.searchParams.get("token") || extractBearerToken(request);

  const sessionId = randomUUID().slice(0, 8);

  if (!token) {
    return { authorized: false, sessionId, error: "Missing token" };
  }

  try {
    // Validate API key via the existing auth system
    const { extractApiKey, isValidApiKey } = await import("../services/auth");
    const apiKey = extractApiKey({ headers: { authorization: `Bearer ${token}` } } as any);

    if (!apiKey || !isValidApiKey(apiKey)) {
      return { authorized: false, sessionId, error: "Invalid API key" };
    }

    return { authorized: true, sessionId };
  } catch {
    return { authorized: false, sessionId, error: "Auth system unavailable" };
  }
}

function extractBearerToken(request: import("http").IncomingMessage): string | null {
  const auth = request.headers["authorization"];
  if (!auth || typeof auth !== "string") return null;
  const match = auth.match(/^Bearer\s+(.+)$/i);
  return match?.[1] || null;
}

// ── Protocol Handler ──────────────────────────────────────────────────────

function handleMessage(clientId: string, raw: string): void {
  const client = clients.get(clientId);
  if (!client) return;

  // Rate limiting
  const now = Date.now();
  if (now - client.eventCounterReset > 1000) {
    client.eventCounter = 0;
    client.eventCounterReset = now;
  }
  client.eventCounter++;
  if (client.eventCounter > MAX_EVENTS_PER_SECOND) {
    sendTo(client.ws, { type: "error", code: "RATE_LIMITED", message: "Too many messages" });
    return;
  }

  let msg: WsClientMessage;
  try {
    msg = JSON.parse(raw);
  } catch {
    sendTo(client.ws, { type: "error", code: "PARSE_ERROR", message: "Invalid JSON" });
    return;
  }

  client.lastActivity = now;

  switch (msg.type) {
    case "subscribe": {
      client.subscribedChannels = new Set(msg.channels);

      // Send buffered events that match subscribed channels
      const relevantHistory = eventHistoryBacklog.filter((h) => {
        const ch = getChannelForEvent(h.event as DashboardEventName);
        return ch && msg.channels.includes(ch);
      });

      sendTo(client.ws, {
        type: "welcome",
        version: "1.0.0",
        sessionId: client.sessionId,
        serverTime: now,
        channels: msg.channels,
        backlog: relevantHistory.length,
        data: relevantHistory.map((h) => ({
          event: h.event,
          channel: getChannelForEvent(h.event as DashboardEventName),
          data: h.payload,
          timestamp: h.timestamp,
        })),
      } as any);
      break;
    }

    case "ping":
      sendTo(client.ws, { type: "pong" } as WsServerMessage);
      break;
  }
}

// ── Send ──────────────────────────────────────────────────────────────────

function sendTo(ws: WebSocket, msg: WsServerMessage | Record<string, unknown>): void {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify(msg));
  }
}

// ── Event Bus → WebSocket Bridge ──────────────────────────────────────────

function subscribeToEventBus(): () => void {
  return onAny((event: DashboardEventName, payload: unknown) => {
    const channel = getChannelForEvent(event);
    if (!channel) return;

    // Store in backlog
    eventHistoryBacklog.push({ event, payload, timestamp: Date.now() });
    if (eventHistoryBacklog.length > BACKLOG_MAX) {
      eventHistoryBacklog.shift();
    }

    // Forward to subscribed clients
    const msg: WsEventMessage = {
      type: "event",
      channel,
      event,
      data: payload,
    };

    for (const [clientId, client] of clients) {
      if (client.ws.readyState !== WebSocket.OPEN) {
        clients.delete(clientId);
        continue;
      }
      if (client.subscribedChannels.has(channel)) {
        sendTo(client.ws, msg);
      }
    }
  });
}

// ── Heartbeat ─────────────────────────────────────────────────────────────

function startHeartbeat(server: WebSocketServer): void {
  const interval = setInterval(() => {
    const now = Date.now();
    for (const [clientId, client] of clients) {
      if (client.ws.readyState !== WebSocket.OPEN) {
        clients.delete(clientId);
        continue;
      }
      // Check heartbeat timeout
      if (now - client.lastActivity > HEARTBEAT_TIMEOUT_MS) {
        client.ws.terminate();
        clients.delete(clientId);
        continue;
      }
      // Send ping
      sendTo(client.ws, { type: "pong" } as WsServerMessage);
    }
  }, HEARTBEAT_INTERVAL_MS);

  server.on("close", () => clearInterval(interval));
}

// ── Server Start ──────────────────────────────────────────────────────────

/**
 * Start the live dashboard WebSocket server.
 */
export async function startLiveDashboardServer(
  port = DEFAULT_PORT
): Promise<import("http").Server> {
  const server = createServer();
  const wss = new WebSocketServer({ server });

  // Subscribe to EventBus
  const unsubscribe = subscribeToEventBus();

  wss.on("connection", async (ws, request) => {
    // Enforce max clients
    if (clients.size >= MAX_CLIENTS) {
      sendTo(ws, { type: "error", code: "SERVER_FULL", message: "Max clients reached" });
      ws.close(1013, "Server full");
      return;
    }

    // Authorize
    const auth = await authorizeConnection(request);
    if (!auth.authorized) {
      sendTo(ws, { type: "error", code: "UNAUTHORIZED", message: auth.error || "Unauthorized" });
      ws.close(4001, "Unauthorized");
      return;
    }

    const clientId = auth.sessionId;
    const client: ClientState = {
      ws,
      sessionId: clientId,
      subscribedChannels: new Set(),
      lastActivity: Date.now(),
      eventCounter: 0,
      eventCounterReset: Date.now(),
      remoteAddress: request.socket?.remoteAddress || "unknown",
    };

    clients.set(clientId, client);

    console.log(
      `[LiveWS] Client connected: ${clientId} (${client.remoteAddress}) [${clients.size} total]`
    );

    // Handle messages
    ws.on("message", (data) => {
      handleMessage(clientId, data.toString());
    });

    // Handle close
    ws.on("close", () => {
      clients.delete(clientId);
      console.log(`[LiveWS] Client disconnected: ${clientId} [${clients.size} remaining]`);
    });

    // Handle errors
    ws.on("error", (err) => {
      console.error(`[LiveWS] Client error ${clientId}:`, err.message);
      clients.delete(clientId);
    });
  });

  // Heartbeat
  startHeartbeat(wss);

  // Cleanup on close
  wss.on("close", () => {
    unsubscribe();
    clients.clear();
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`[LiveWS] Dashboard WebSocket server listening on port ${port}`);
      resolve(server);
    });
  });
}

// ── Auto-start on import (if not in build/test) ───────────────────────────

function isBuildOrTest(): boolean {
  return (
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.NODE_ENV === "test" ||
    process.env.VITEST !== undefined ||
    process.argv.some((arg) => arg.includes("test")) ||
    process.env.OMNIROUTE_DISABLE_LIVE_WS === "1" ||
    process.env.OMNIROUTE_DISABLE_LIVE_WS === "true"
  );
}

// Auto-start unless disabled
if (!isBuildOrTest()) {
  const port = parseInt(process.env.LIVE_WS_PORT || String(DEFAULT_PORT), 10);
  startLiveDashboardServer(port).catch((err) => {
    console.error("[LiveWS] Failed to start:", err);
  });
}
