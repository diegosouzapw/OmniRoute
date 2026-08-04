/**
 * WebSocket Live Dashboard — Protocol Types
 *
 * Wire format for the real-time dashboard WebSocket.
 */

// ── Client → Server ───────────────────────────────────────────────────────

export interface WsSubscribeMessage {
  type: "subscribe";
  channels: Array<"requests" | "combo" | "credentials" | "compression">;
}

export interface WsPingMessage {
  type: "ping";
}

export type WsClientMessage = WsSubscribeMessage | WsPingMessage;

// ── Server → Client ───────────────────────────────────────────────────────

export interface WsEventMessage {
  type: "event";
  channel: "requests" | "combo" | "credentials" | "compression";
  event: string;
  data: unknown;
}

export interface WsPongMessage {
  type: "pong";
}

export interface WsWelcomeMessage {
  type: "welcome";
  version: string;
  sessionId: string;
  serverTime: number;
  channels: Array<"requests" | "combo" | "credentials" | "compression">;
  /** Number of buffered events since last reconnect */
  backlog: number;
}

export interface WsErrorMessage {
  type: "error";
  code: string;
  message: string;
}

export type WsServerMessage = WsEventMessage | WsPongMessage | WsWelcomeMessage | WsErrorMessage;

// ── Auth ─────────────────────────────────────────────────────────────────

export interface WsAuthResult {
  authorized: boolean;
  sessionId: string;
  error?: string;
}
