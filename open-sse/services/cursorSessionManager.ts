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
import {
  encodePiExecResult,
  isPiExecEvent,
  type PiExecEvent,
} from "../utils/cursorAgentProtobuf/pi.ts";
import { encodeGitDiffResult } from "../utils/cursorAgentProtobuf/gitDiff.ts";
import { encodeCursorExecThrow } from "../utils/cursorAgentProtobuf/extraExec.ts";
import {
  ECM_MINI_SWE_BASH_RESULT,
  encodeExecMcpResult,
  encodeExecFetchSuccess,
  encodeExecGrepSuccess,
  encodeExecLsSuccess,
  encodeExecReadFileNotFound,
  encodeExecReadSuccess,
  encodeExecShellStreamResult,
  encodeExecShellSuccess,
  encodeExecWriteSuccess,
  encodeExecWriteError,
  looksLikeFileNotFound,
  messageContentToText,
  type ChatMessage,
} from "../utils/cursorAgentProtobuf.ts";

const DEFAULT_IDLE_TTL_MS = 5 * 60 * 1000;

export type CursorSession = {
  conversationId: string;
  h2Client: ClientHttp2Session;
  h2Req: ClientHttp2Stream;
  blobStore: Map<string, Buffer>;
  pendingToolCalls: Map<string, { execMsgId: number; execId: string; toolName: string }>;
  /**
   * Built-in Cursor execs (Read / Shell / Write) that were bridged to a declared
   * client tool and are still awaiting that client's output. They are answered
   * with a typed SUCCESS carrying the client's result — answering with a
   * rejection instead makes the model believe its own tool never ran and retry
   * the same step forever.
   */
  /** Unconsumed bytes from the previous run, replayed as the next run's prefix. */
  leftoverBytes: Buffer;
  pendingBuiltinExecs: Map<
    string,
    {
      execMsgId: number;
      execId: string;
      kind:
        | "read"
        | "shell"
        | "shell_stream"
        | "mini_swe_bash"
        | "git_diff"
        | "write"
        | "grep"
        | "ls"
        | "fetch"
        | PiExecEvent["kind"];
      path: string;
      command: string;
      workingDir: string;
      /** Exact text Cursor asked to write, echoed back in WriteSuccess. */
      fileText: string;
      returnFileContentAfterWrite?: boolean;
      /** Pattern Cursor searched for, echoed back in GrepSuccess. */
      pattern: string;
      outputMode?: string;
      url?: string;
    }
  >;
  state: "running" | "awaiting_tool_result" | "closed";
  lastActivityTs: number;
  idleTimer?: ReturnType<typeof setTimeout>;
};

export class CursorSessionManager {
  private sessions = new Map<string, CursorSession>();
  private idleTtlMs: number;
  private maxSessions: number;

  constructor(opts: { idleTtlMs?: number; maxSessions?: number } = {}) {
    this.idleTtlMs = opts.idleTtlMs ?? DEFAULT_IDLE_TTL_MS;
    this.maxSessions = opts.maxSessions ?? 100;
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
    this.clearIdleTimer(session);
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
      leftoverBytes: Buffer.alloc(0),
      pendingBuiltinExecs: new Map(),
      state: "running",
      lastActivityTs: Date.now(),
    };
    this.sessions.set(conversationId, session);
    this.attachCloseHandlers(session);
    this.enforceMaxSessions();
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
      this.armIdleTimer(session);
      return;
    }
    this.close(session);
  }

  close(session: CursorSession): void {
    if (session.state === "closed") return;
    session.state = "closed";
    this.clearIdleTimer(session);
    try {
      session.h2Req.close();
    } catch {}
    try {
      session.h2Client.close();
    } catch {}
    // Drop any unanswered tool-call mappings so a closed session doesn't pin
    // their (small) entries for the lifetime of the lingering object.
    session.pendingToolCalls.clear();
    session.pendingBuiltinExecs.clear();
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
    content: ChatMessage["content"],
    isError: boolean
  ): boolean {
    const text = messageContentToText(content);
    const builtin = session.pendingBuiltinExecs.get(openAIToolCallId);
    if (builtin) {
      try {
        // Chat Completions tool messages carry only text, not MCP's isError bit.
        const writeFailed =
          isError ||
          (builtin.kind === "write" && text.trimStart().slice(0, 6).toLowerCase() === "error:");
        const frame =
          builtin.kind === "git_diff"
            ? isError
              ? encodeCursorExecThrow(builtin.execMsgId, "Client git diff command failed")
              : encodeGitDiffResult(builtin.execMsgId, builtin.execId, text)
            : isPiExecEvent(builtin)
              ? encodePiExecResult(builtin, text, isError)
              : builtin.kind === "fetch"
                ? encodeExecFetchSuccess(builtin.execMsgId, builtin.execId, builtin.url ?? "", text)
                : builtin.kind === "grep"
                  ? encodeExecGrepSuccess(
                      builtin.execMsgId,
                      builtin.execId,
                      builtin.pattern,
                      builtin.path,
                      text,
                      builtin.outputMode
                    )
                  : builtin.kind === "ls"
                    ? encodeExecLsSuccess(builtin.execMsgId, builtin.execId, builtin.path, text)
                    : builtin.kind === "read"
                      ? looksLikeFileNotFound(text)
                        ? encodeExecReadFileNotFound(
                            builtin.execMsgId,
                            builtin.execId,
                            builtin.path
                          )
                        : encodeExecReadSuccess(
                            builtin.execMsgId,
                            builtin.execId,
                            builtin.path,
                            text
                          )
                      : builtin.kind === "write"
                        ? writeFailed
                          ? encodeExecWriteError(builtin.execMsgId, builtin.execId, builtin.path)
                          : encodeExecWriteSuccess(
                              builtin.execMsgId,
                              builtin.execId,
                              builtin.path,
                              builtin.fileText,
                              builtin.returnFileContentAfterWrite
                            )
                        : builtin.kind === "shell_stream"
                          ? encodeExecShellStreamResult(
                              builtin.execMsgId,
                              builtin.execId,
                              text,
                              builtin.workingDir
                            )
                          : encodeExecShellSuccess(
                              builtin.execMsgId,
                              builtin.execId,
                              builtin.command,
                              builtin.workingDir,
                              text,
                              0,
                              builtin.kind === "mini_swe_bash"
                                ? ECM_MINI_SWE_BASH_RESULT
                                : undefined
                            );
        session.h2Req.write(frame);
        session.pendingBuiltinExecs.delete(openAIToolCallId);
        session.lastActivityTs = Date.now();
        return true;
      } catch {
        return false;
      }
    }

    const pending = session.pendingToolCalls.get(openAIToolCallId);
    if (!pending) return false;
    try {
      session.h2Req.write(encodeExecMcpResult(pending.execMsgId, pending.execId, text, isError));
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

  private armIdleTimer(session: CursorSession): void {
    this.clearIdleTimer(session);
    session.idleTimer = setTimeout(() => this.close(session), this.idleTtlMs);
    session.idleTimer.unref?.();
  }

  private clearIdleTimer(session: CursorSession): void {
    if (session.idleTimer) {
      clearTimeout(session.idleTimer);
      session.idleTimer = undefined;
    }
  }

  private attachCloseHandlers(session: CursorSession): void {
    const closeSession = () => this.close(session);
    session.h2Req.once?.("close", closeSession);
    session.h2Req.once?.("error", closeSession);
    session.h2Client.once?.("close", closeSession);
    session.h2Client.once?.("error", closeSession);
  }

  private enforceMaxSessions(): void {
    if (this.sessions.size <= this.maxSessions) return;
    const oldest = Array.from(this.sessions.values()).sort(
      (a, b) => a.lastActivityTs - b.lastActivityTs
    )[0];
    if (oldest) this.close(oldest);
  }

  /**
   * Find a session that has one of the specified tool call IDs pending.
   * Only matches sessions in "awaiting_tool_result" state.
   * Transitions the found session to "running" (same as acquire).
   * This is used when the client doesn't provide conversation_id
   * (OpenAI-compatible clients), so we match by content instead of key.
   * Returns undefined if no session has any of the given IDs pending.
   */
  findByToolCallIds(toolCallIds: string[]): CursorSession | undefined {
    this.evictExpired();
    for (const id of toolCallIds) {
      for (const session of this.sessions.values()) {
        if (
          session.state === "awaiting_tool_result" &&
          (session.pendingToolCalls.has(id) || session.pendingBuiltinExecs.has(id))
        ) {
          this.clearIdleTimer(session);
          session.state = "running";
          session.lastActivityTs = Date.now();
          return session;
        }
      }
    }
    return undefined;
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
