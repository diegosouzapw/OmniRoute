import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";

const HEADER_SIZE = 13;
const REGULAR_MESSAGE = 1;
const INITIALIZE_MESSAGE = 200;
const RESPONSE_MESSAGE = 201;
const ERROR_MESSAGE = 202;
const CANCELED_MESSAGE = 203;
const MAX_FRAME_BYTES = 32 * 1024 * 1024;

type JsonRecord = Record<string, unknown>;

export interface ZcodeAppServerClientOptions {
  command: string;
  args?: string[];
  cwd?: string;
  env?: NodeJS.ProcessEnv;
  startupTimeoutMs?: number;
  requestTimeoutMs?: number;
}

export interface ZcodeClientLike {
  start(): Promise<void>;
  call(channel: string, method: string, args: unknown[]): Promise<unknown>;
  close(): Promise<void>;
}

interface PendingRequest {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout>;
}

interface DecodedValue {
  value: unknown;
  offset: number;
}

function encodeVql(value: number): Buffer {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`ZCode protocol requires a non-negative integer, got ${String(value)}`);
  }
  const bytes: number[] = [];
  let remaining = value;
  do {
    let next = remaining % 128;
    remaining = Math.floor(remaining / 128);
    if (remaining > 0) next |= 0x80;
    bytes.push(next);
  } while (remaining > 0);
  return Buffer.from(bytes);
}

function decodeVql(data: Uint8Array, offset: number): { value: number; offset: number } {
  let value = 0;
  let multiplier = 1;
  let cursor = offset;
  for (let i = 0; i < 8; i += 1) {
    if (cursor >= data.byteLength) throw new Error("Truncated ZCode variable-length quantity");
    const next = data[cursor++];
    value += (next & 0x7f) * multiplier;
    if ((next & 0x80) === 0) return { value, offset: cursor };
    multiplier *= 128;
  }
  throw new Error("Invalid ZCode variable-length quantity");
}

/** Serialize one value using ZCode's SocketProtocol value encoding. */
export function encodeZcodeValue(value: unknown): Buffer {
  if (value === undefined) return Buffer.from([0]);
  if (typeof value === "string") {
    const bytes = Buffer.from(value, "utf8");
    return Buffer.concat([Buffer.from([1]), encodeVql(bytes.byteLength), bytes]);
  }
  if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
    const bytes = Buffer.from(value);
    return Buffer.concat([Buffer.from([2]), encodeVql(bytes.byteLength), bytes]);
  }
  if (Array.isArray(value)) {
    return Buffer.concat([
      Buffer.from([4]),
      encodeVql(value.length),
      ...value.map((item) => encodeZcodeValue(item)),
    ]);
  }
  if (typeof value === "number" && Number.isSafeInteger(value) && value >= 0) {
    return Buffer.concat([Buffer.from([6]), encodeVql(value)]);
  }
  if (typeof value === "bigint" || typeof value === "function" || typeof value === "symbol") {
    throw new Error(`Unsupported ZCode protocol value type: ${typeof value}`);
  }
  const bytes = Buffer.from(JSON.stringify(value), "utf8");
  return Buffer.concat([Buffer.from([5]), encodeVql(bytes.byteLength), bytes]);
}

/** Decode one value from ZCode's SocketProtocol value encoding. */
export function decodeZcodeValue(data: Uint8Array, offset = 0): DecodedValue {
  if (offset >= data.byteLength) throw new Error("Truncated ZCode serialized value");
  const type = data[offset++];
  if (type === 0) return { value: undefined, offset };
  if (type === 1 || type === 2) {
    const length = decodeVql(data, offset);
    const end = length.offset + length.value;
    if (end > data.byteLength) throw new Error("Truncated ZCode byte/string value");
    const bytes = data.slice(length.offset, end);
    return {
      value: type === 1 ? Buffer.from(bytes).toString("utf8") : Buffer.from(bytes),
      offset: end,
    };
  }
  if (type === 4) {
    const length = decodeVql(data, offset);
    const values: unknown[] = [];
    let cursor = length.offset;
    for (let i = 0; i < length.value; i += 1) {
      const decoded = decodeZcodeValue(data, cursor);
      values.push(decoded.value);
      cursor = decoded.offset;
    }
    return { value: values, offset: cursor };
  }
  if (type === 5) {
    const length = decodeVql(data, offset);
    const end = length.offset + length.value;
    if (end > data.byteLength) throw new Error("Truncated ZCode JSON value");
    return {
      value: JSON.parse(Buffer.from(data.slice(length.offset, end)).toString("utf8")),
      offset: end,
    };
  }
  if (type === 6) {
    const decoded = decodeVql(data, offset);
    return { value: decoded.value, offset: decoded.offset };
  }
  throw new Error(`Unknown ZCode serialized value type ${type}`);
}

export function encodeZcodeRpcCall(
  id: number,
  channel: string,
  method: string,
  args: unknown[]
): Buffer {
  const body = Buffer.concat([
    encodeZcodeValue([100, id, channel, method]),
    encodeZcodeValue(args),
  ]);
  const frame = Buffer.alloc(HEADER_SIZE + body.byteLength);
  frame.writeUInt8(REGULAR_MESSAGE, 0);
  frame.writeUInt32BE(0, 1);
  frame.writeUInt32BE(0, 5);
  frame.writeUInt32BE(body.byteLength, 9);
  body.copy(frame, HEADER_SIZE);
  return frame;
}

function errorFromPayload(payload: unknown, fallback: string): Error {
  if (payload && typeof payload === "object") {
    const record = payload as JsonRecord;
    const message = typeof record.message === "string" ? record.message : fallback;
    const error = new Error(message);
    if (typeof record.code === "string") Object.assign(error, { code: record.code });
    if (record.data !== undefined) Object.assign(error, { data: record.data });
    return error;
  }
  return new Error(fallback);
}

/**
 * Local stdio client for the ZCode app-server. The protocol starts with a JSON
 * hello line and then switches to 13-byte length-prefixed binary frames.
 */
export class ZcodeAppServerClient implements ZcodeClientLike {
  private readonly command: string;
  private readonly args: string[];
  private readonly cwd?: string;
  private readonly env?: NodeJS.ProcessEnv;
  private readonly startupTimeoutMs: number;
  private readonly requestTimeoutMs: number;
  private child?: ChildProcessWithoutNullStreams;
  private pendingChunks: Buffer[] = [];
  private handshakeDone = false;
  private ready = false;
  private startPromise?: Promise<void>;
  private serverReady?: () => void;
  private serverReadyError?: (error: Error) => void;
  private nextRequestId = 1;
  private readonly pending = new Map<number, PendingRequest>();

  constructor(options: ZcodeAppServerClientOptions) {
    this.command = options.command;
    this.args = options.args ?? [];
    this.cwd = options.cwd;
    this.env = options.env;
    this.startupTimeoutMs = options.startupTimeoutMs ?? 10_000;
    this.requestTimeoutMs = options.requestTimeoutMs ?? 30_000;
  }

  async start(): Promise<void> {
    if (this.ready) return;
    if (this.startPromise) return this.startPromise;
    this.startPromise = this.startInternal().finally(() => {
      this.startPromise = undefined;
    });
    return this.startPromise;
  }

  private async startInternal(): Promise<void> {
    let child: ChildProcessWithoutNullStreams;
    try {
      child = spawn(this.command, this.args, {
        cwd: this.cwd,
        env: this.env ? { ...process.env, ...this.env } : process.env,
        stdio: ["pipe", "pipe", "pipe"],
        shell: false,
        windowsHide: true,
      });
    } catch (error) {
      throw error instanceof Error ? error : new Error(String(error));
    }

    this.child = child;
    this.pendingChunks = [];
    this.handshakeDone = false;
    this.ready = false;
    child.stdin.on("error", () => {
      // EPIPE is expected when timeout/abort closes an already-exited runtime.
    });

    let settled = false;
    const readyPromise = new Promise<void>((resolve, reject) => {
      this.serverReady = () => {
        if (settled) return;
        settled = true;
        resolve();
      };
      this.serverReadyError = (error) => {
        if (settled) return;
        settled = true;
        reject(error);
      };
    });

    child.stdout.on("data", (chunk: Buffer) => this.onStdout(chunk));
    child.stderr.on("data", () => {
      // ZCode stderr is intentionally not forwarded: it can contain provider
      // diagnostics or credentials from the user's local runtime.
    });
    child.on("error", (error) => {
      this.serverReadyError?.(error);
      this.rejectPending(error);
    });
    child.on("exit", (code, signal) => {
      const error = new Error(`ZCode app-server exited: ${code ?? signal ?? "unknown"}`);
      this.ready = false;
      this.handshakeDone = false;
      this.serverReadyError?.(error);
      this.rejectPending(error);
      if (this.child === child) this.child = undefined;
    });

    try {
      await this.withTimeout(readyPromise, this.startupTimeoutMs, "ZCode app-server handshake timed out");
      this.ready = true;
    } catch (error) {
      await this.disposeChild(child);
      throw error instanceof Error ? error : new Error(String(error));
    } finally {
      this.serverReady = undefined;
      this.serverReadyError = undefined;
    }
  }

  // Buffer accumulated stdout bytes. Chunks are collected in an array and
  // collapsed into one contiguous buffer only when a complete frame (or the
  // hello line) might be present — the previous `concat(prev, chunk)` per data
  // event re-allocated the whole buffer on every chunk, i.e. O(n²) total.
  private onStdout(chunk: Buffer): void {
    this.pendingChunks.push(chunk);
    let total = 0;
    for (const part of this.pendingChunks) total += part.byteLength;
    const buffer = total === chunk.byteLength && this.pendingChunks.length > 0
      ? chunk
      : Buffer.concat(this.pendingChunks);
    this.pendingChunks = [buffer];

    if (!this.handshakeDone) {
      const newline = buffer.indexOf(0x0a);
      if (newline < 0) {
        if (buffer.byteLength > 64 * 1024) {
          this.serverReadyError?.(new Error("ZCode hello line is too large"));
        }
        return;
      }
      const line = buffer.subarray(0, newline).toString("utf8").trim();
      this.pendingChunks = [buffer.subarray(newline + 1)];
      let hello: unknown;
      try {
        hello = JSON.parse(line);
      } catch {
        this.serverReadyError?.(new Error("Invalid ZCode app-server hello"));
        return;
      }
      if (!hello || typeof hello !== "object" || (hello as JsonRecord).type !== "zcode-hello") {
        this.serverReadyError?.(new Error("Unexpected ZCode app-server hello"));
        return;
      }
      const child = this.child;
      if (!child) return;
      child.stdin.write(`${JSON.stringify({
        type: "zcode-hello-ack",
        version: "omniroute",
        clientId: `omniroute-${process.pid}`,
      })}\n`);
      this.handshakeDone = true;
    }
    this.consumeFrames();
  }

  private consumeFrames(): void {
    // Collapse to one buffer for frame scanning (only happens once per data
    // event since onStdout already deduped), then drop consumed frames.
    const buffer = this.pendingChunks[0];
    let offset = 0;
    while (buffer.byteLength - offset >= HEADER_SIZE) {
      const type = buffer.readUInt8(offset);
      const length = buffer.readUInt32BE(offset + 9);
      if (length > MAX_FRAME_BYTES) {
        const error = new Error("ZCode frame exceeds the configured safety limit");
        this.serverReadyError?.(error);
        this.rejectPending(error);
        return;
      }
      const frameLength = HEADER_SIZE + length;
      if (buffer.byteLength - offset < frameLength) break;
      const body = buffer.subarray(offset + HEADER_SIZE, offset + frameLength);
      offset += frameLength;
      if (type !== REGULAR_MESSAGE) continue;
      try {
        const header = decodeZcodeValue(body, 0);
        const payload = decodeZcodeValue(body, header.offset);
        this.handleMessage(header.value, payload.value);
      } catch (error) {
        const normalized = error instanceof Error ? error : new Error(String(error));
        this.serverReadyError?.(normalized);
        this.rejectPending(normalized);
      }
    }
    if (offset > 0) this.pendingChunks = [buffer.subarray(offset)];
  }

  private handleMessage(headerValue: unknown, payload: unknown): void {
    if (!Array.isArray(headerValue)) return;
    const type = headerValue[0];
    if (type === INITIALIZE_MESSAGE) {
      this.serverReady?.();
      return;
    }
    if (type !== RESPONSE_MESSAGE && type !== ERROR_MESSAGE && type !== CANCELED_MESSAGE) return;
    const requestId = headerValue[1];
    if (typeof requestId !== "number") return;
    const request = this.pending.get(requestId);
    if (!request) return;
    this.pending.delete(requestId);
    clearTimeout(request.timer);
    if (type === RESPONSE_MESSAGE) {
      request.resolve(payload);
    } else {
      request.reject(errorFromPayload(
        payload,
        type === ERROR_MESSAGE ? "ZCode RPC request failed" : "ZCode RPC request canceled"
      ));
    }
  }

  async call(channel: string, method: string, args: unknown[]): Promise<unknown> {
    await this.start();
    const child = this.child;
    if (!child || !this.ready) throw new Error("ZCode app-server is not ready");
    const requestId = this.nextRequestId++;
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(requestId);
        reject(new Error(`ZCode RPC request timed out: ${channel}.${method}`));
      }, this.requestTimeoutMs);
      timer.unref?.();
      this.pending.set(requestId, { resolve, reject, timer });
      try {
        child.stdin.write(encodeZcodeRpcCall(requestId, channel, method, args));
      } catch (error) {
        clearTimeout(timer);
        this.pending.delete(requestId);
        reject(error instanceof Error ? error : new Error(String(error)));
      }
    });
  }

  async close(): Promise<void> {
    const child = this.child;
    this.ready = false;
    this.handshakeDone = false;
    this.child = undefined;
    this.serverReadyError?.(new Error("ZCode app-server closed"));
    this.rejectPending(new Error("ZCode app-server closed"));
    if (child) await this.disposeChild(child);
  }

  private rejectPending(error: Error): void {
    for (const [id, pending] of this.pending) {
      clearTimeout(pending.timer);
      pending.reject(error);
      this.pending.delete(id);
    }
  }

  private async disposeChild(child: ChildProcessWithoutNullStreams): Promise<void> {
    if (child.exitCode !== null || child.signalCode !== null) return;
    const exited = new Promise<void>((resolve) => child.once("close", () => resolve()));
    try {
      child.stdin.end();
    } catch {
      // The process may already have closed stdin.
    }
    if (!child.killed) child.kill("SIGTERM");
    let timer: ReturnType<typeof setTimeout> | undefined;
    await Promise.race([
      exited,
      new Promise<void>((resolve) => {
        timer = setTimeout(resolve, 1500);
        timer.unref?.();
      }),
    ]);
    if (timer) clearTimeout(timer);
    if (child.exitCode === null && child.signalCode === null) {
      child.kill("SIGKILL");
      await exited;
    }
  }

  private async withTimeout<T>(promise: Promise<T>, timeoutMs: number, message: string): Promise<T> {
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([
        promise,
        new Promise<T>((_, reject) => {
          timer = setTimeout(() => reject(new Error(message)), timeoutMs);
          timer.unref?.();
        }),
      ]);
    } finally {
      if (timer) clearTimeout(timer);
    }
  }
}
