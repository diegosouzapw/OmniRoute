/**
 * CursorSessionManager — keeps cursor's h2 streams alive across OpenAI calls
 * so a tool-using turn can complete inline.
 *
 * cursor's `agent.v1.AgentService/Run` is bidirectional. When the model
 * invokes an MCP tool it pauses and waits for a `ExecClientMessage.McpResult`
 * on the SAME stream. Closing the stream between the OpenAI tool_calls
 * response and the role:"tool" follow-up loses the exec_id mapping cursor
 * needs to resume.
 *
 * This manager solves that by retaining the open h2 stream (keyed by
 * conversation_id) when the executor reports endReason="tool_calls". The
 * next OpenAI call with role:"tool" reacquires the session, replies via
 * encodeExecMcpResult on the live stream, and continues driving until
 * turn_ended.
 *
 * Multi-instance considerations: sessions live in process memory. If a
 * follow-up call lands on a different OmniRoute instance, acquire() returns
 * undefined and the executor falls back to cold-resume (fresh RunRequest
 * with all history flattened into UserText). Cold-resume is correctness-
 * preserving but loses the inline efficiency.
 *
 * Concurrency: one in-flight call per session. The acquire/release pattern
 * keeps a session in "awaiting_tool_result" between calls; if a second call
 * arrives while the first is still running, acquire() returns undefined and
 * the second falls back to cold-resume.
 *
 * TTL: sessions evict after CURSOR_SESSION_IDLE_TTL_MS (default 5min). The
 * sweep runs lazily on every acquire/release rather than via setInterval to
 * keep this module test-friendly.
 */

import type { ClientHttp2Session, ClientHttp2Stream } from "node:http2";
import { encodeExecMcpResult } from "../utils/cursorAgentProtobuf.ts";

const DEFAULT_IDLE_TTL_MS = 5 * 60 * 1000;

export type CursorSession = {
  conversationId: string;
  h2Client: ClientHttp2Session;
  h2Req: ClientHttp2Stream;
  blobStore: Map<string, Buffer>;
  pendingToolCalls: Map<string, { execMsgId: number; execId: string; toolName: string }>;
  state: "running" | "awaiting_tool_result" | "closed";
  lastActivityTs: number;
};

export class CursorSessionManager {
  private sessions = new Map<string, CursorSession>();
  private idleTtlMs: number;

  constructor(opts: { idleTtlMs?: number } = {}) {
    this.idleTtlMs = opts.idleTtlMs ?? DEFAULT_IDLE_TTL_MS;
  }

  /**
   * Try to reacquire an existing session for this conversation. Returns
   * undefined if there isn't one, if it's still running, or if it's idle
   * past the TTL (in which case it's closed as a side-effect).
   */
  acquire(conversationId: string): CursorSession | undefined {
    this.evictExpired();
    const session = this.sessions.get(conversationId);
    if (!session) return undefined;
    if (session.state !== "awaiting_tool_result") return undefined;
    session.state = "running";
    session.lastActivityTs = Date.now();
    return session;
  }

  /**
   * Register a freshly-opened h2 stream as the session for this conversation.
   * Any pre-existing session for the same conversation is closed first.
   */
  open(
    conversationId: string,
    h2Client: ClientHttp2Session,
    h2Req: ClientHttp2Stream,
    blobStore: Map<string, Buffer>
  ): CursorSession {
    const existing = this.sessions.get(conversationId);
    if (existing) this.close(existing);
    const session: CursorSession = {
      conversationId,
      h2Client,
      h2Req,
      blobStore,
      pendingToolCalls: new Map(),
      state: "running",
      lastActivityTs: Date.now(),
    };
    this.sessions.set(conversationId, session);
    return session;
  }

  /**
   * Mark a session as no longer in-flight. If finalState is
   * "awaiting_tool_result" the h2 stream stays open and the next acquire()
   * for this conversation_id can reuse it. If "idle" or "closed" the
   * h2 is torn down here.
   */
  release(session: CursorSession, finalState: "awaiting_tool_result" | "idle" | "closed"): void {
    session.lastActivityTs = Date.now();
    if (finalState === "awaiting_tool_result") {
      session.state = "awaiting_tool_result";
      return;
    }
    this.close(session);
  }

  close(session: CursorSession): void {
    session.state = "closed";
    try {
      session.h2Req.close();
    } catch {}
    try {
      session.h2Client.close();
    } catch {}
    this.sessions.delete(session.conversationId);
  }

  /**
   * Send an MCP tool result on this session's open h2 stream. Returns true
   * if the openAIToolCallId matched a pending call we'd previously seen
   * mcp_args for; false otherwise (caller should fall back to cold-resume).
   */
  sendToolResult(
    session: CursorSession,
    openAIToolCallId: string,
    content: string,
    isError: boolean
  ): boolean {
    const pending = session.pendingToolCalls.get(openAIToolCallId);
    if (!pending) return false;
    try {
      session.h2Req.write(encodeExecMcpResult(pending.execMsgId, pending.execId, content, isError));
      session.pendingToolCalls.delete(openAIToolCallId);
      session.lastActivityTs = Date.now();
      return true;
    } catch {
      return false;
    }
  }

  private evictExpired(): void {
    const now = Date.now();
    for (const session of this.sessions.values()) {
      if (now - session.lastActivityTs > this.idleTtlMs) {
        this.close(session);
      }
    }
  }

  // ─── Test / introspection helpers ────────────────────────────────────────

  size(): number {
    return this.sessions.size;
  }

  has(conversationId: string): boolean {
    return this.sessions.has(conversationId);
  }
}

// Module-level singleton — one manager per OmniRoute process. The executor
// imports this directly. For testing, construct a fresh CursorSessionManager.
export const cursorSessionManager = new CursorSessionManager();
