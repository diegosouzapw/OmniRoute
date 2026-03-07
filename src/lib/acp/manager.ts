/**
 * ACP (Agent Client Protocol) — Process Spawner & Manager
 *
 * Spawns CLI agents as child processes and manages their lifecycle.
 * Communication happens via stdin/stdout (JSON-RPC style) or piped HTTP.
 *
 * This module provides a "CLI-as-backend" transport: instead of intercepting
 * HTTP API calls, OmniRoute spawns the CLI directly and feeds prompts through
 * its native interface.
 */

import { spawn, ChildProcess } from "child_process";
import { EventEmitter } from "events";

export interface AcpSession {
  /** Unique session ID */
  id: string;
  /** Agent ID (e.g., "codex", "claude") */
  agentId: string;
  /** Child process handle */
  process: ChildProcess;
  /** Whether the process is alive */
  alive: boolean;
  /** Accumulated stdout buffer */
  stdoutBuffer: string;
  /** Accumulated stderr buffer */
  stderrBuffer: string;
  /** Created timestamp */
  createdAt: Date;
}

/**
 * ACP Session Manager
 *
 * Manages the lifecycle of CLI agent processes.
 * Each session represents one running CLI agent instance.
 */
export class AcpManager extends EventEmitter {
  private sessions: Map<string, AcpSession> = new Map();

  /**
   * Spawn a new CLI agent process.
   */
  spawn(
    agentId: string,
    binary: string,
    args: string[] = [],
    env: Record<string, string> = {}
  ): AcpSession {
    const sessionId = `acp-${agentId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const child = spawn(binary, args, {
      stdio: ["pipe", "pipe", "pipe"],
      env: { ...process.env, ...env },
      shell: false,
    });

    const session: AcpSession = {
      id: sessionId,
      agentId,
      process: child,
      alive: true,
      stdoutBuffer: "",
      stderrBuffer: "",
      createdAt: new Date(),
    };

    child.stdout?.on("data", (chunk: Buffer) => {
      session.stdoutBuffer += chunk.toString();
      this.emit("stdout", { sessionId, data: chunk.toString() });
    });

    child.stderr?.on("data", (chunk: Buffer) => {
      session.stderrBuffer += chunk.toString();
      this.emit("stderr", { sessionId, data: chunk.toString() });
    });

    child.on("exit", (code, signal) => {
      session.alive = false;
      this.emit("exit", { sessionId, code, signal });
    });

    child.on("error", (err) => {
      session.alive = false;
      this.emit("error", { sessionId, error: err });
    });

    this.sessions.set(sessionId, session);
    return session;
  }

  /**
   * Send input to a running session's stdin.
   */
  sendInput(sessionId: string, input: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session?.alive || !session.process.stdin?.writable) return false;

    session.process.stdin.write(input);
    return true;
  }

  /**
   * Send a prompt to a CLI agent and collect the response.
   * This is a higher-level method that handles the send/receive cycle.
   */
  async sendPrompt(sessionId: string, prompt: string, timeoutMs: number = 120000): Promise<string> {
    const session = this.sessions.get(sessionId);
    if (!session?.alive) throw new Error(`Session ${sessionId} is not alive`);

    // Clear buffer before sending
    session.stdoutBuffer = "";

    // Send prompt
    this.sendInput(sessionId, prompt + "\n");

    // Wait for response (collect until process goes idle or timeout)
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`ACP timeout after ${timeoutMs}ms`));
      }, timeoutMs);

      let idleTimer: ReturnType<typeof setTimeout>;

      const onData = ({ sessionId: sid }: { sessionId: string }) => {
        if (sid !== sessionId) return;
        // Reset idle timer on new data
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
          clearTimeout(timer);
          this.removeListener("stdout", onData);
          this.removeListener("exit", onExit);
          resolve(session.stdoutBuffer);
        }, 2000); // 2s idle = response complete
      };

      const onExit = ({ sessionId: sid }: { sessionId: string }) => {
        if (sid !== sessionId) return;
        clearTimeout(timer);
        clearTimeout(idleTimer);
        this.removeListener("stdout", onData);
        this.removeListener("exit", onExit);
        resolve(session.stdoutBuffer);
      };

      this.on("stdout", onData);
      this.on("exit", onExit);
    });
  }

  /**
   * Kill a session and clean up.
   */
  kill(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;

    if (session.alive) {
      session.process.kill("SIGTERM");
      // Force kill after 5s
      setTimeout(() => {
        if (session.alive) {
          session.process.kill("SIGKILL");
        }
      }, 5000);
    }

    this.sessions.delete(sessionId);
    return true;
  }

  /**
   * Get all active sessions.
   */
  getActiveSessions(): AcpSession[] {
    return Array.from(this.sessions.values()).filter((s) => s.alive);
  }

  /**
   * Get a specific session.
   */
  getSession(sessionId: string): AcpSession | undefined {
    return this.sessions.get(sessionId);
  }

  /**
   * Kill all sessions.
   */
  killAll(): void {
    for (const [id] of this.sessions) {
      this.kill(id);
    }
  }
}

// Singleton manager instance
export const acpManager = new AcpManager();
