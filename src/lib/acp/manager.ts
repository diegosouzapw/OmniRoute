/** Registered CLI launch contracts, native ACP and legacy stdio lifecycle. */
import { spawn, type ChildProcess } from "node:child_process";
import { EventEmitter } from "node:events";
import { resolve } from "node:path";
import { getRegisteredAgentById } from "./registry";
import { appendCapped } from "./buffers";
import { withDeadline } from "./deadline";
import { buildAcpChildEnv, parseSpawnOptions, type AcpSpawnOptions } from "./launchConfig";
import { NativeAcpClient } from "./nativeClient";

export type { AcpSpawnOptions } from "./launchConfig";

export interface AcpSession {
  id: string;
  agentId: string;
  process: ChildProcess;
  alive: boolean;
  stdoutBuffer: string;
  stderrBuffer: string;
  createdAt: Date;
  backendMode: "acp" | "stdio-adapter";
  nativeReady?: Promise<void>;
  nativeRuntime?: NativeAcpClient;
  activePrompt?: boolean;
  stopping?: boolean;
}

export class AcpManager extends EventEmitter {
  private sessions = new Map<string, AcpSession>();

  spawn(agentId: string, options: AcpSpawnOptions = {}): AcpSession {
    options = parseSpawnOptions(options);
    const definition = getRegisteredAgentById(agentId);
    if (!definition) throw new Error(`Unknown agent: ${agentId}`);
    if (definition.protocol !== "stdio")
      throw new Error("Agent does not declare a stdio launch contract");
    const cwd = resolve(options.cwd || process.cwd());
    const child = spawn(definition.binary, [...definition.spawnArgs], {
      stdio: ["pipe", "pipe", "pipe"],
      cwd,
      env: buildAcpChildEnv(options.env),
      shell: false,
    });
    const session: AcpSession = {
      id: `acp-${definition.id}-${crypto.randomUUID()}`,
      agentId: definition.id,
      process: child,
      alive: true,
      stdoutBuffer: "",
      stderrBuffer: "",
      createdAt: new Date(),
      backendMode: definition.backendMode || "stdio-adapter",
    };
    this.sessions.set(session.id, session);
    this.observeProcess(session);
    if (session.backendMode === "acp") this.initializeNative(session, cwd);
    else
      child.stdout?.on("data", (chunk: Buffer) =>
        this.collectOutput(session, "stdout", chunk.toString())
      );
    return session;
  }

  private collectOutput(session: AcpSession, stream: "stdout" | "stderr", data: string): void {
    const key = stream === "stdout" ? "stdoutBuffer" : "stderrBuffer";
    session[key] = appendCapped(session[key], data);
    this.emit(stream, { sessionId: session.id, data });
  }

  private reportError(session: AcpSession): void {
    const event = { sessionId: session.id, error: new Error("ACP agent transport failed") };
    this.emit("sessionError", event);
    // EventEmitter's special error event must never crash a server without a subscriber.
    if (this.listenerCount("error") > 0) this.emit("error", event);
  }

  private observeProcess(session: AcpSession): void {
    const child = session.process;
    child.stderr?.on("data", (chunk: Buffer) =>
      this.collectOutput(session, "stderr", chunk.toString())
    );
    child.on("exit", (code, signal) => {
      session.alive = false;
      session.nativeRuntime?.close();
      this.sessions.delete(session.id);
      this.emit("exit", { sessionId: session.id, code, signal });
    });
    child.on("error", () => {
      session.alive = false;
      this.kill(session.id);
      this.reportError(session);
    });
    child.stdin?.on("error", () => {
      this.reportError(session);
      this.kill(session.id);
    });
  }

  private initializeNative(session: AcpSession, cwd: string): void {
    const runtime = new NativeAcpClient(session.process, (text) =>
      this.collectOutput(session, "stdout", text)
    );
    session.nativeRuntime = runtime;
    session.nativeReady = withDeadline(runtime.initialize(cwd), 10_000, () =>
      this.kill(session.id)
    );
    void session.nativeReady.catch(() => {
      if (!session.stopping) this.reportError(session);
      this.kill(session.id);
    });
    void runtime.connection.closed.then(() => this.kill(session.id));
  }

  sendInput(sessionId: string, input: string): boolean {
    const session = this.sessions.get(sessionId);
    if (
      !session?.alive ||
      session.stopping ||
      session.backendMode === "acp" ||
      !session.process.stdin?.writable
    )
      return false;
    session.process.stdin.write(input);
    return true;
  }

  async sendPrompt(sessionId: string, prompt: string, timeoutMs = 120_000): Promise<string> {
    const session = this.sessions.get(sessionId);
    if (!session?.alive || session.stopping) throw new Error(`Session ${sessionId} is not alive`);
    if (session.activePrompt) throw new Error("ACP session already has an active prompt");
    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0)
      throw new TypeError("ACP timeout must be positive");
    session.activePrompt = true;
    session.stdoutBuffer = "";
    session.stderrBuffer = "";
    try {
      if (session.backendMode === "acp") return await this.promptNative(session, prompt, timeoutMs);
      return await this.promptLegacy(session, prompt, timeoutMs);
    } finally {
      session.activePrompt = false;
    }
  }

  private async promptNative(
    session: AcpSession,
    prompt: string,
    timeoutMs: number
  ): Promise<string> {
    const operation = (async () => {
      await session.nativeReady;
      if (session.stopping) throw new Error("ACP session was terminated");
      await session.nativeRuntime!.prompt(prompt);
      return session.stdoutBuffer;
    })();
    return withDeadline(operation, timeoutMs, () => {
      session.stopping = true;
      // Give the cancellation notification a bounded opportunity to flush before SIGTERM.
      void session.nativeRuntime?.cancel().catch(() => {});
      const timer = setTimeout(() => this.kill(session.id), 100);
      timer.unref();
    });
  }

  private promptLegacy(session: AcpSession, prompt: string, timeoutMs: number): Promise<string> {
    return new Promise((resolvePrompt, reject) => {
      let idleTimer: ReturnType<typeof setTimeout> | undefined;
      const settle = (finish: () => void) => {
        clearTimeout(timer);
        clearTimeout(idleTimer);
        this.removeListener("stdout", onData);
        this.removeListener("exit", onExit);
        this.removeListener("sessionError", onError);
        finish();
      };
      const timer = setTimeout(
        () => settle(() => reject(new Error(`ACP timeout after ${timeoutMs}ms`))),
        timeoutMs
      );
      const onData = ({ sessionId }: { sessionId: string }) => {
        if (sessionId !== session.id) return;
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => settle(() => resolvePrompt(session.stdoutBuffer)), 2000);
      };
      const onExit = ({ sessionId }: { sessionId: string }) => {
        if (sessionId === session.id) settle(() => resolvePrompt(session.stdoutBuffer));
      };
      const onError = ({ sessionId }: { sessionId: string }) => {
        if (sessionId === session.id) settle(() => reject(new Error("ACP agent transport failed")));
      };
      this.on("stdout", onData);
      this.on("exit", onExit);
      this.on("sessionError", onError);
      if (!this.sendInput(session.id, prompt + "\n"))
        settle(() => reject(new Error("ACP stdin is unavailable")));
    });
  }

  kill(sessionId: string): boolean {
    const session = this.sessions.get(sessionId);
    if (!session) return false;
    session.stopping = true;
    this.sessions.delete(sessionId);
    session.nativeRuntime?.close();
    if (session.alive) {
      session.process.kill("SIGTERM");
      const timer = setTimeout(() => {
        if (session.alive) session.process.kill("SIGKILL");
      }, 5000);
      timer.unref();
      session.process.once("exit", () => clearTimeout(timer));
    }
    return true;
  }

  getActiveSessions(): AcpSession[] {
    return [...this.sessions.values()].filter((session) => session.alive && !session.stopping);
  }
  getSession(sessionId: string): AcpSession | undefined {
    return this.sessions.get(sessionId);
  }
  killAll(): void {
    for (const id of this.sessions.keys()) this.kill(id);
  }
}

export const acpManager = new AcpManager();
