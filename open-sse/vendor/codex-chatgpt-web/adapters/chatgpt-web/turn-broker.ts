/* Adapted from miuuyy/codex-chatgpt-web commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT). */
import { randomBytes } from "node:crypto";
import { chmodSync, existsSync, lstatSync, mkdirSync, unlinkSync } from "node:fs";
import { createConnection, createServer, type Server, type Socket } from "node:net";
import { dirname } from "node:path";
import type { ChatGptTurnEnvironment } from "./environment";

interface PendingTurn extends ChatGptTurnEnvironment {
  expiresAt: number;
}

export interface BrokerToolRequest {
  callId: string;
  wireName: string;
  freeform: boolean;
  arguments?: Record<string, unknown>;
  input?: string;
}

export interface BrokerToolResult {
  content: unknown[];
  structuredContent?: unknown;
  isError?: boolean;
  _meta?: unknown;
}

interface PendingInvocation {
  request: BrokerToolRequest;
  resolve: (result: BrokerToolResult) => void;
  reject: (error: Error) => void;
}

interface ToolWaiter {
  resolve: (requests: BrokerToolRequest[]) => void;
  reject: (error: Error) => void;
  signal?: AbortSignal;
  onAbort?: () => void;
}

interface TurnChannel {
  traceId: string;
  environment: PendingTurn;
  bindingId?: string;
  queuedCallIds: string[];
  invocations: Map<string, PendingInvocation>;
  waiters: Set<ToolWaiter>;
  batchTimer?: ReturnType<typeof setTimeout>;
}

interface BrokerRequest {
  id: string;
  method: "claim" | "resolve" | "release" | "invoke";
  token?: string;
  bindingId?: string;
  wireName?: string;
  freeform?: boolean;
  arguments?: Record<string, unknown>;
  input?: string;
}

interface BrokerResponse {
  id: string;
  result?: unknown;
  error?: string;
}

const brokers = new Map<string, TurnBroker>();
const MAX_BROKER_LINE_CHARS = 67_108_864;

function opaqueId(prefix: string): string {
  return `${prefix}_${randomBytes(24).toString("base64url")}`;
}

function errorOf(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

function environmentIdentity(environment: ChatGptTurnEnvironment): string {
  return JSON.stringify({
    cwd: environment.cwd,
    roots: environment.roots,
    writableRoots: environment.writableRoots,
    sandboxPolicy: environment.sandboxPolicy,
  });
}

export class TurnBroker {
  static forSocket(path: string): TurnBroker {
    let broker = brokers.get(path);
    if (!broker) {
      broker = new TurnBroker(path);
      brokers.set(path, broker);
    }
    return broker;
  }

  private readonly channels = new Map<string, TurnChannel>();
  private readonly pending = new Map<string, TurnChannel>();
  private readonly bindings = new Map<string, { token: string; channel: TurnChannel }>();
  private server?: Server;
  private startPromise?: Promise<void>;

  private constructor(readonly socketPath: string) {}

  async register(
    environment: ChatGptTurnEnvironment,
    ttlMs: number,
    traceId = "unknown"
  ): Promise<string> {
    await this.start();
    this.prune();
    const token = opaqueId("turn");
    const channel: TurnChannel = {
      traceId,
      environment: { ...environment, expiresAt: Date.now() + ttlMs },
      queuedCallIds: [],
      invocations: new Map(),
      waiters: new Set(),
    };
    this.channels.set(token, channel);
    this.pending.set(token, channel);
    return token;
  }

  updateEnvironment(token: string, environment: ChatGptTurnEnvironment): void {
    this.prune();
    const channel = this.channels.get(token);
    if (!channel) throw new Error("turn token is invalid or expired");
    if (environmentIdentity(channel.environment) !== environmentIdentity(environment)) {
      throw new Error("Codex turn environment changed during an active ChatGPT tool loop");
    }
    channel.environment = { ...environment, expiresAt: channel.environment.expiresAt };
  }

  async nextToolBatch(token: string, signal?: AbortSignal): Promise<BrokerToolRequest[]> {
    this.prune();
    const channel = this.channels.get(token);
    if (!channel) throw new Error("turn token is invalid or expired");
    const ready = this.takeQueued(channel);
    if (ready.length > 0) return ready;
    if (signal?.aborted) throw new DOMException("tool wait aborted", "AbortError");
    return new Promise<BrokerToolRequest[]>((resolveWait, rejectWait) => {
      const waiter: ToolWaiter = {
        resolve: resolveWait,
        reject: rejectWait,
        ...(signal ? { signal } : {}),
      };
      if (signal) {
        waiter.onAbort = () => {
          channel.waiters.delete(waiter);
          rejectWait(new DOMException("tool wait aborted", "AbortError"));
        };
        signal.addEventListener("abort", waiter.onAbort, { once: true });
      }
      channel.waiters.add(waiter);
    });
  }

  completeTool(token: string, callId: string, result: BrokerToolResult): void {
    this.prune();
    const channel = this.channels.get(token);
    if (!channel) throw new Error("turn token is invalid or expired");
    const invocation = channel.invocations.get(callId);
    if (!invocation) throw new Error(`tool call is not pending: ${callId}`);
    if (channel.queuedCallIds.includes(callId))
      throw new Error(`tool call was completed before it was delivered: ${callId}`);
    channel.invocations.delete(callId);
    console.info(
      `[chatgpt-web] broker trace=${channel.traceId} completed call=${callId.slice(0, 17)} pending=${channel.invocations.size}`
    );
    invocation.resolve(result);
  }

  revoke(token: string): void {
    const channel = this.channels.get(token);
    if (!channel) return;
    this.channels.delete(token);
    this.pending.delete(token);
    if (channel.bindingId) this.bindings.delete(channel.bindingId);
    this.rejectChannel(channel, new Error("Codex turn binding was revoked"));
  }

  async close(): Promise<void> {
    for (const token of [...this.channels.keys()]) this.revoke(token);
    const server = this.server;
    this.server = undefined;
    this.startPromise = undefined;
    brokers.delete(this.socketPath);
    if (server?.listening) {
      await new Promise<void>((resolveClose, rejectClose) =>
        server.close((error) => {
          if (!error || (error as NodeJS.ErrnoException).code === "ERR_SERVER_NOT_RUNNING")
            resolveClose();
          else rejectClose(error);
        })
      );
    }
    if (existsSync(this.socketPath) && lstatSync(this.socketPath).isSocket())
      unlinkSync(this.socketPath);
  }

  private start(): Promise<void> {
    if (this.startPromise) return this.startPromise;
    this.startPromise = new Promise<void>((resolveStart, rejectStart) => {
      mkdirSync(dirname(this.socketPath), { recursive: true, mode: 0o700 });
      const listen = () => {
        const server = createServer((socket) => this.handleSocket(socket));
        this.server = server;
        server.once("error", rejectStart);
        server.listen(this.socketPath, () => {
          server.off("error", rejectStart);
          chmodSync(this.socketPath, 0o600);
          resolveStart();
        });
      };

      if (!existsSync(this.socketPath)) {
        listen();
        return;
      }
      if (!lstatSync(this.socketPath).isSocket()) {
        rejectStart(
          new Error(`ChatGPT web broker path exists and is not a socket: ${this.socketPath}`)
        );
        return;
      }
      const probe = createConnection(this.socketPath);
      probe.once("connect", () => {
        probe.destroy();
        rejectStart(
          new Error(
            `ChatGPT web broker socket is already owned by another process: ${this.socketPath}`
          )
        );
      });
      probe.once("error", () => {
        unlinkSync(this.socketPath);
        listen();
      });
    });
    return this.startPromise;
  }

  private handleSocket(socket: Socket): void {
    let buffered = "";
    let handled = false;
    socket.setEncoding("utf8");
    socket.on("error", () => {});
    socket.on("data", (chunk) => {
      if (handled) return;
      buffered += chunk;
      if (
        buffered.length > MAX_BROKER_LINE_CHARS &&
        !buffered.slice(0, MAX_BROKER_LINE_CHARS + 1).includes("\n")
      ) {
        handled = true;
        this.writeSocketResponse(socket, {
          id: "unknown",
          error: "turn broker request exceeds size limit",
        });
        return;
      }
      const newline = buffered.indexOf("\n");
      if (newline < 0) return;
      handled = true;
      const line = buffered.slice(0, newline);
      let request: BrokerRequest | undefined;
      try {
        if (line.length > MAX_BROKER_LINE_CHARS)
          throw new Error("turn broker request exceeds size limit");
        request = JSON.parse(line) as BrokerRequest;
        this.validateRequest(request);
      } catch (error) {
        this.writeSocketResponse(socket, {
          id: request?.id ?? "unknown",
          error: errorOf(error).message,
        });
        return;
      }
      void Promise.resolve()
        .then(() => this.dispatch(request!))
        .then(
          (result) => this.writeSocketResponse(socket, { id: request!.id, result }),
          (error) =>
            this.writeSocketResponse(socket, { id: request!.id, error: errorOf(error).message })
        );
    });
  }

  private writeSocketResponse(socket: Socket, response: BrokerResponse): void {
    const line = `${JSON.stringify(response)}\n`;
    if (line.length > MAX_BROKER_LINE_CHARS) {
      socket.end(
        `${JSON.stringify({ id: response.id, error: "turn broker response exceeds size limit" } satisfies BrokerResponse)}\n`
      );
      return;
    }
    socket.end(line);
  }

  private validateRequest(request: BrokerRequest): void {
    if (
      !request ||
      typeof request !== "object" ||
      typeof request.id !== "string" ||
      request.id.length === 0 ||
      request.id.length > 256
    ) {
      throw new Error("turn broker request id is invalid");
    }
    if (
      request.method !== "claim" &&
      request.method !== "resolve" &&
      request.method !== "release" &&
      request.method !== "invoke"
    ) {
      throw new Error("turn broker method is invalid");
    }
  }

  private dispatch(request: BrokerRequest): unknown | Promise<unknown> {
    this.prune();
    if (request.method === "claim") {
      const token = request.token?.trim();
      if (!token) throw new Error("turn token is required");
      const channel = this.channels.get(token);
      console.error(
        `[chatgpt-web] broker claim received (tokenChars=${token.length}, valid=${Boolean(channel)})`
      );
      if (!channel) throw new Error("turn token is invalid, expired, or revoked");
      if (channel.bindingId) {
        const existing = this.bindings.get(channel.bindingId);
        if (!existing || existing.token !== token || existing.channel !== channel) {
          throw new Error("turn token binding state is inconsistent");
        }
        return { bindingId: channel.bindingId, environment: channel.environment };
      }
      this.pending.delete(token);
      const bindingId = opaqueId("binding");
      channel.bindingId = bindingId;
      this.bindings.set(bindingId, { token, channel });
      return { bindingId, environment: channel.environment };
    }

    const bindingId = request.bindingId?.trim();
    if (!bindingId) throw new Error("binding id is required");
    const binding = this.bindings.get(bindingId);
    if (!binding) throw new Error("binding id is invalid or expired");
    if (request.method === "release") {
      this.revoke(binding.token);
      return { released: true };
    }
    if (request.method === "resolve") return { environment: binding.channel.environment };

    const wireName = request.wireName?.trim();
    if (!wireName) throw new Error("wire tool name is required");
    const callId = opaqueId("call");
    const toolRequest: BrokerToolRequest = {
      callId,
      wireName,
      freeform: request.freeform === true,
      ...(request.freeform === true
        ? { input: request.input ?? "" }
        : { arguments: request.arguments ?? {} }),
    };
    return new Promise<BrokerToolResult>((resolveInvoke, rejectInvoke) => {
      binding.channel.invocations.set(callId, {
        request: toolRequest,
        resolve: resolveInvoke,
        reject: rejectInvoke,
      });
      binding.channel.queuedCallIds.push(callId);
      console.info(
        `[chatgpt-web] broker trace=${binding.channel.traceId} queued call=${callId.slice(0, 17)} tool=${wireName} waiters=${binding.channel.waiters.size}`
      );
      this.scheduleToolWaiters(binding.channel);
    });
  }

  private takeQueued(channel: TurnChannel): BrokerToolRequest[] {
    const ids = channel.queuedCallIds.splice(0);
    return ids
      .map((id) => channel.invocations.get(id)?.request)
      .filter((request): request is BrokerToolRequest => Boolean(request));
  }

  private scheduleToolWaiters(channel: TurnChannel): void {
    if (channel.queuedCallIds.length === 0 || channel.waiters.size === 0) return;
    if (channel.batchTimer) return;
    channel.batchTimer = setTimeout(() => {
      channel.batchTimer = undefined;
      this.wakeToolWaiters(channel);
    }, 15);
  }

  private wakeToolWaiters(channel: TurnChannel): void {
    if (channel.queuedCallIds.length === 0 || channel.waiters.size === 0) return;
    const batch = this.takeQueued(channel);
    console.info(
      `[chatgpt-web] broker trace=${channel.traceId} delivered calls=${batch.length} tools=${batch.map((request) => request.wireName).join(",")}`
    );
    const waiters = [...channel.waiters];
    channel.waiters.clear();
    const first = waiters.shift();
    if (first) {
      if (first.signal && first.onAbort) first.signal.removeEventListener("abort", first.onAbort);
      first.resolve(batch);
    }
    for (const waiter of waiters) {
      if (waiter.signal && waiter.onAbort)
        waiter.signal.removeEventListener("abort", waiter.onAbort);
      waiter.reject(new Error("another adapter waiter already claimed the queued tool batch"));
    }
  }

  private rejectChannel(channel: TurnChannel, error: Error): void {
    if (channel.batchTimer) clearTimeout(channel.batchTimer);
    channel.batchTimer = undefined;
    for (const waiter of channel.waiters) {
      if (waiter.signal && waiter.onAbort)
        waiter.signal.removeEventListener("abort", waiter.onAbort);
      waiter.reject(error);
    }
    channel.waiters.clear();
    for (const invocation of channel.invocations.values()) invocation.reject(error);
    channel.invocations.clear();
    channel.queuedCallIds = [];
  }

  private prune(): void {
    const now = Date.now();
    for (const [token, channel] of this.channels) {
      if (channel.environment.expiresAt > now) continue;
      this.revoke(token);
    }
  }
}

export async function callTurnBroker<T>(
  socketPath: string,
  request: Omit<BrokerRequest, "id">,
  timeoutMs = 5_000
): Promise<T> {
  const id = opaqueId("request");
  return new Promise<T>((resolveCall, rejectCall) => {
    const socket = createConnection(socketPath);
    let buffered = "";
    let settled = false;
    const finishError = (error: Error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      socket.destroy();
      rejectCall(error);
    };
    const timer = setTimeout(
      () => finishError(new Error("ChatGPT web turn broker timed out")),
      timeoutMs
    );
    socket.setEncoding("utf8");
    socket.once("error", (error) =>
      finishError(new Error(`ChatGPT web turn broker unavailable: ${error.message}`))
    );
    socket.once("connect", () => socket.write(`${JSON.stringify({ id, ...request })}\n`));
    socket.on("data", (chunk) => {
      if (settled) return;
      buffered += chunk;
      if (buffered.length > MAX_BROKER_LINE_CHARS) {
        finishError(new Error("ChatGPT web turn broker response exceeds size limit"));
        return;
      }
      const newline = buffered.indexOf("\n");
      if (newline < 0) return;
      let response: BrokerResponse;
      try {
        response = JSON.parse(buffered.slice(0, newline)) as BrokerResponse;
      } catch (error) {
        finishError(
          new Error(`ChatGPT web turn broker returned invalid JSON: ${errorOf(error).message}`)
        );
        return;
      }
      if (response.id !== id) {
        finishError(new Error("ChatGPT web turn broker response id mismatch"));
        return;
      }
      settled = true;
      clearTimeout(timer);
      socket.end();
      if (response.error) rejectCall(new Error(response.error));
      else resolveCall(response.result as T);
    });
  });
}
